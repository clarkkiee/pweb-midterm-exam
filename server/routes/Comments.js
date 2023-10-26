const express = require('express')
const router = express.Router()
const { Comments } = require("../models")
const {validateToken} = require("../middleware/AuthMiddleware")

router.get("/:postId", async (req, res) => {
    const postId = req.params.postId;
    // res.send(postId)
    const comments = await Comments.findAll({ where: { PostId: postId } })
    res.send(comments);
})

router.post("/", validateToken, async (req, res) => {
    const comment = req.body
    const username = req.user.username
    console.log(username)
    comment.username = username
    await Comments.create(comment)
    res.json(comment)
})  

router.delete("/:commentId", validateToken, async (req, res) => {
    const commentId = req.params.commentId
    console.log("komen id di db" ,commentId)
    const comments = await Comments.findAll({ where: { id: commentId } })
    console.log(comments)
    await Comments.destroy({ 
        where: {
            id: commentId,
        }
    })
    res.json("DELETED SUCCESS")
})

module.exports = router;