import { Schema, model, Document } from 'mongoose';

interface IPost extends Document {
  title: string;
  content: string;
  authorId: Schema.Types.ObjectId;
  createdAt: Date;
}

const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  authorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Post = model<IPost>('Post', postSchema);
