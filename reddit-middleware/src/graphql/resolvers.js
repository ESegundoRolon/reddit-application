
import { RedditAPIClient } from '../client/redditAPIClient.js';
const client = new RedditAPIClient();
export default {
    Query: {
        subreddit: async (parent, args, { models }) => {
            // /r/Home
            const { url } = args
            // find all subreddits on database
            let localSubreddit = await models.Subreddit.findOne({ url });
            const subreddit = await client.getSubreddit(url);
            if (localSubreddit) {
                return { ...subreddit, favourite: localSubreddit, url };
            } else {
                return subreddit;
            }

        },
        subreddits: async (parent, args, { models }) => {
            // find all subreddits on database
            let subreddits = await models.Subreddit.find({});
            // fetch 50 subreddits from subreddit api
            const newSubreddits = await client.getNewSubreddits();
            const popularSubreddits = await client.getPopularSubreddits();

            // initialize new and popular values
            const newPosts = newSubreddits.map(e => { return { ...e, new: true } })
            const popularPosts = popularSubreddits.map(e => { return { ...e, popular: true } })

            // concatenate both results
            const posts = [...newPosts, ...popularPosts]

            // add favourite attribute if it is set locally
            return posts.map(subreddit => {
                // find on local by url unique key
                let localSubreddit = subreddits.find(e => e.url === subreddit.url)

                //if found then override/initialize favourite attribute
                if (localSubreddit) {
                    return { ...subreddit, favourite: localSubreddit.favourite }
                } else {
                    return subreddit
                }
            })
        },
        comments: async (parent, args) => {
            // /r/Home
            const { url } = args
            return await client.getComments(url)
        },
        replies: async (parent, args) => {
            // /r/Home/comments/id/name.json
            const { permalink } = args
            return await client.getReplies(permalink);
        }
    },
    Mutation: {
        updateSubreddit: async (parent, { url, favourite }, { models }) => {
            let subreddit = await models.Subreddit.findOne({ url });

            if (subreddit) {
                // update the subreddit
                subreddit = { ...subreddit, favourite }
                try {
                    await models.Subreddit.findOneAndUpdate(
                        { "url": url },
                        { "$set": { favourite } },
                        { "new": true } //returns new document
                    ).exec()
                } catch (e) {
                    console.log(e);
                    throw new Error('Cannot update newSubreddit!!!');
                }
                const freshSubreddit = (await client.getSubreddit(url))[0];
                return { ...freshSubreddit, favourite, url }

            }

            // create a new subreddit
            const newSubreddit = new models.Subreddit({
                url,
                favourite
            });

            // save the subreddit
            try {
                await newSubreddit.save();
            } catch (e) {
                throw new Error('Cannot Save newSubreddit!!!');
            }

            const freshSubreddit = (await client.getSubreddit(url))[0];
            return { ...freshSubreddit, favourite, url }
        },
    },
};