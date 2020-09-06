import mongoose from 'mongoose';
import Subreddit from './subreddit.js';

// SET UP Mongoose Promises.
mongoose.Promise = global.Promise;

const mongoUrl = ({ user, pwd, url, db }) => process.env.MONGODB_HOST ? `mongodb://${user}:${pwd}@${url}/${db}` : `mongodb://${url}/${db}` 
export const startDB = ({ user, pwd, url, db }) => mongoose.connect(mongoUrl({ user, pwd, url, db }) , { useNewUrlParser: true });

export const models = {
    Subreddit,
}

export default { startDB, models }