import mongoose from 'mongoose';

const SubredditSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        unique: true,
    },
    favourite: {
        type: Boolean,
        required: true,
    },
    createdOn: {
        type: Date,
        default: Date.now
    },
});

export default mongoose.model('Subreddit', SubredditSchema);