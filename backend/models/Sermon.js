import mongoose from 'mongoose';

const sermonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  type: { type: String, enum: ['text', 'image', 'video'], required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', },
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

export default mongoose.model('Sermon', sermonSchema);