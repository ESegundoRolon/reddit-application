
import fetch from 'isomorphic-unfetch';

class RedditAPIClient {
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
            if (Array.isArray(data)) {
                const response = data[1].data.children.map(e => e.data)
                response.pop()
                return response
            } else {
                return data.data.children.map(e => e.data)
            }

        })
    }

    async getSubreddit(subreddit) {
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
        // parse url to getch comments
        return this.request(url, config)
    }

    async getComments(resourceUrl) {
        // resourceUrl = /r/Home
        let qs = "?limit=3";
        let url = `${resourceUrl}/comments.json` + qs
        let config = {
            method: 'GET'
        }
        // parse link_title to display, permalink full access to replies
        return this.request(url, config)
    }

    async getReplies(commentPermalink) {

        let qs = "?limit=5";
        let index = commentPermalink.slice(0, -1).lastIndexOf('/');
        let finalUrl = commentPermalink.substring(0, index)

        // /r/Home/comments/{id}/{link}.json
        let config = {
            method: 'GET'
        }
        return this.request(finalUrl + ".json" + qs, config)
    }

}

export { RedditAPIClient };