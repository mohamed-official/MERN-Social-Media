import Post from "../Models/Post.js";
import User from "../Models/User.js";

export const addPost = async (req, res) => {
  try {
    const { userId, text, picturePath } = req.body;
    const newPost = new Post({
      userId,
      text,
      imagePath,
      likes: {},
      comments: [],
    });
    await newPost.save();
    const posts = await Post.find();

    res.status(201).json(posts);
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    let posts = await Post.find().sort({ createdAt: "desc" });
    let users = [];
    for (let i = 0; i < posts.length; i++) {
      const user = await User.findById(posts[i].userId);
      posts[i] = { ...posts[i], user };
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    isLikes ? post.likes.delete(userId) : post.likes.set(userId, true);
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};
