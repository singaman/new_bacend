const Post = require('../models/post');

exports.getPosts = async (req, res) => {
  try {
    const query = {};
    if (req.query.device) {
      query.device = req.query.device;
    }
    const posts = await Post.find(query).populate('user', 'name email');
    res.status(200).json({ success: true, count: posts.length, data: posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, body, device } = req.body;
    const post = new Post({ title, body, device, user: req.user._id });
    await post.save();
    res.status(201).json({ success: true, data: post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { title, body, device } = req.body;
    let post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    if (post.user.toString() !== req.user._id) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    post.title = title;
    post.body = body;
    post.device = device;
    await post.save();
    res.status(200).json({ success: true, data: post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: 'Post not found' });
    }
    if (post.user.toString() !== req.user._id) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    await post.remove();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
