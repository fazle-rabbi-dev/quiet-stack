import mongoose, { type InferRawDocType, type Model } from "mongoose";
import slugify from "slugify";
import { nanoid } from "nanoid";

// ==============================
// Post Model - Blog Post Definition
// ==============================

/** Available post statuses */
export const POST_STATUSES = ["published", "draft"] as const;
export type PostStatus = (typeof POST_STATUSES)[number];

/** Available post cover colors */
export const POST_COVERS = [
  "violet",
  "blue",
  "green",
  "pink",
  "indigo",
  "orange",
] as const;
export type PostCover = (typeof POST_COVERS)[number];

// TODO: add more index if needed
// Post Schema Definition
const postSchemaDef = {
  title: { type: String, required: true, trim: true, maxlength: 160 },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
  },
  excerpt: { type: String, required: true, maxlength: 300 },
  content: { type: String, required: true }, // Markdown from rich text editor
  cover: { type: String, enum: POST_COVERS, default: "violet" },
  coverText: { type: String, trim: true, maxlength: 120, default: "" },
  tags: { type: [String], default: [] },
  status: { type: String, enum: POST_STATUSES, default: "draft" },
  featured: { type: Boolean, default: false },
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  readingTime: { type: Number, default: 1 }, // Minutes, computed from content
} as const;

const postSchema = new mongoose.Schema(postSchemaDef, { timestamps: true });

// Indexes for query optimization
postSchema.index({ title: "text", excerpt: "text", content: "text" }); // Full-text search
postSchema.index({ tags: 1 }); // Multikey index: one entry per tag element
// slug is unique, so no need to index it manually

postSchema.pre("save", function () {
  if (this.isModified("title")) {
    // also can use counter like: learn-nextjs-2 ...
    this.slug = `${slugify(this.title, { lower: true, strict: true })}-${nanoid(6)}`;
  }
});

export type IPost = InferRawDocType<typeof postSchemaDef> & {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  slug: string;
};

export const Post: Model<IPost> =
  mongoose.models.Posts ?? mongoose.model<IPost>("Posts", postSchema);

// ==============================
// Like Model - Anonymous Likes Tracking
// ==============================

/**
 * One document per (post, fingerprint) combination.
 * Prevents duplicate anonymous likes from the same browser/device.
 */
const likeSchemaDef = {
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true,
    index: true,
  },
  fingerprint: { type: String, required: true, trim: true },
} as const;

const likeSchema = new mongoose.Schema(likeSchemaDef, { timestamps: true });

// Unique compound index ensures one like per post per fingerprint
likeSchema.index({ post: 1, fingerprint: 1 }, { unique: true });

export type ILike = InferRawDocType<typeof likeSchemaDef> & {
  _id: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export const Like: Model<ILike> =
  mongoose.models.Like ?? mongoose.model<ILike>("Like", likeSchema);
