const postModel = require("../Models/PostModel");

const getPosts = async (req, res) => {
  try {
    const posts = await postModel.find();
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const createPost = async (req, res) => {
  try {
    const newPost = req.body;
    const post = new postModel(newPost);
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const updatePost = async (req, res) => {
  try {
    const updatePost = req.body;
    const post = await postModel.findOneAndUpdate(
      {
        _id: updatePost._id,
      },
      updatePost,
      { new: true }
    );
  } catch (error) {
    res.status(400).json({ error: error});
  }
};


module.exports = {
    getPosts:getPosts,
    createPost:createPost,
    updatePost:updatePost
}