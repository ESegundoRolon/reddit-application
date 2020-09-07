
import fetch from 'isomorphic-unfetch';

/**
 * 
 Reddit API client to fetch subreddits, its comments and its replies
 */
class RedditAPIClient {

    // base url of reddit graphql API
    constructor(config) {
        this.basePath = "https://www.reddit.com"
    }

    request(endpoint = "", options = {}) {

        let url = this.basePath + endpoint

        let headers = {
            'api_key': this.api_key,
            'Content-type': 'application/json'
        }

        let config = {
            ...options,
            ...headers
        }


        return fetch(url, config).then(r => {
            if (r.ok) {

                return r.json()
            }
            throw new Error(r)
        }).then(data => {
            // deserialise get subreddit by title response
            if (Array.isArray(data)) {
                const response = data[1].data.children.map(e => e.data)
                // last element does not respect contract (mainly information)
                response.pop()
                return response
                // in all other cases the following deserialization can be applied
            } else {
                return data.data.children.map(e => e.data)
            }

        })
    }

    async getSubreddit(subreddit) {
        // for example /Home.json
        let url = `${subreddit}.json`
        let config = {
            method: 'GET'
        }
        return this.request(url, config)
    }

    async getNewSubreddits() {
        let qs = "?limit=50"
        let url = `/subreddits/new.json` + qs
        let config = {
            method: 'GET'
        }
        return this.request(url, config)
    }

    async getPopularSubreddits() {
        let qs = "?limit=50";
        let url = `/subreddits/popular.json` + qs
        let config = {
            method: 'GET'
        }
        return this.request(url, config)
    }

    async getComments(resourceUrl) {
        let qs = "?limit=3";
        // for example /r/Home/comments.json where /r/Home is the link attribute of a subreddit
        let url = `${resourceUrl}/comments.json` + qs
        let config = {
            method: 'GET'
        }
        return this.request(url, config)
    }

    async getReplies(commentPermalink) {

        let qs = "?limit=5";
         // for example /r/Home/comments/t3_id52s/custom_title_article.json/ where all this value is the permalink attribute of a comment
        let index = commentPermalink.slice(0, -1).lastIndexOf('/');
        // remove last slash
        let finalUrl = commentPermalink.substring(0, index)

        let config = {
            method: 'GET'
        }
        // add json extension adn query param
        return this.request(finalUrl + ".json" + qs, config)
    }

}

export { RedditAPIClient };