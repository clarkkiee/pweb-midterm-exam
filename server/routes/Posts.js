const express = require('express')
const router = express.Router()
const { Posts, Likes } = require("../models")
const { validateToken } = require("../middleware/AuthMiddleware")

router.get("/", validateToken, async (req, res) => {
    const posts = await Posts.findAll({include: [Likes]});
    const likedPosts = await Likes.findAll({ where: {UserId: req.user.id} });
    // console.log(posts.every(post => post instanceof Posts)) return boolean
    res.json({ listOfPosts: posts, likedPosts: likedPosts }) // return datas
})

router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id);
    res.json(post);
})

router.post("/", validateToken, async (req, res) => {
    const post = req.body;
    post.username = req.user.username
    await Posts.create(post);
    res.json(post)
})

router.delete("/:postId", validateToken, async (req, res) => {
    const postId = req.params.postId
    await Posts.destroy({
        where: {
            id: postId, 
        }
    })
    res.json("DELETED SUCCESS")
})

module.exports = router;    