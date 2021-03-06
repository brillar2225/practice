import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: { type: String, trim: true, maxLength: 50, required: true },
  description: { type: String, trim: true, minLength: 20, required: true },
  fileUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, default: 0, required: true },
  },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

videoSchema.static('formatHashtags', function (hashtags) {
  return hashtags
    .split(',')
    .map((word) => (word.startsWith('#') ? word : `#${word}`));
});

const Video = mongoose.model('Video', videoSchema);
export default Video;
