import mongoose from 'mongoose';
import Subreddit from './subreddit.js';

mongoose.Promise = global.Promise;

// when running on IDE , no authentication is used
const mongoUrl = ({ user, pwd, url, db }) => process.env.MONGODB_HOST ? `mongodb://${user}:${pwd}@${url}/${db}` : `mongodb://${url}/${db}` 

// connect
export const startDB = ({ user, pwd, url, db }) => mongoose.connect(mongoUrl({ user, pwd, url, db }) , { useNewUrlParser: true });

export const models = {
    Subreddit,
}

export default { startDB, models }