import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {AuthContext} from "../helpers/AuthContext"
import { useNavigate } from 'react-router-dom'


function Post() {
    
    let history = useNavigate()
    let { id } = useParams()
    const [postById, setPostById] = useState([])
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")
    const {authState} = useContext(AuthContext) 
    
    useEffect (() => {
        axios.get(`http://localhost:8000/posts/byId/${id}`).then((response) => {
            // console.log(response)
            setPostById(response.data)
        })
        
        axios.get(`http://localhost:8000/comments/${id}`).then((response) => {
            setComments(response.data)
        })

    }, [])
    
    const addComment = () => {
        axios.post("http://localhost:8000/comments", {
            commentBody: newComment,
            PostId: id,
        },
        {
            headers: {
                accessToken: localStorage.getItem("accessToken"),          
            }
        })
        .then((response) => {
            if(response.data.error){
                console.log(response.data.error);
            } else {
                const commentAdd = {
                    commentBody: newComment,
                    username: response.data.username
                }
                setComments([...comments, commentAdd])
                setNewComment("")
                window.location.reload();
            }
        })
    }

    const deleteComment = (id) => {
        axios
          .delete(`http://localhost:8000/comments/${id}`, {
            headers: { accessToken: localStorage.getItem("accessToken") },
          })
          .then(() => {
            setComments(
              comments.filter((val) => {
                return val.id != id;
              })
            );
          });
      };

      const deletePost = (id) => {
        axios.delete(`http://localhost:8000/posts/${id}`, {
            headers: { accessToken: localStorage.getItem("accessToken") }
        }).then(() => {
            history("/")
        })
      }

  return (
    <div className='postPage'>
        <div className='leftSide'>
            <div className='post' id='individual'>
                <div className='title'>{postById.title} </div>
                <div className='postText'> {postById.postText} </div>
                <div className='footer'>
                     @{postById.username} 
                     {authState.username === postById.username && (
                        <button onClick={() => deletePost(postById.id)}>Delete Post</button>
                     )}
                </div>
            </div>
        </div>
           
        <div className='rightSide'>
            <div className='addCommentContainer'>
                <input type="text"  value={newComment} onChange={(event) => setNewComment(event.target.value)} className=''/> 
                <button onClick={addComment} className=''>Add Comment</button>
            <div className='listOfComments'> 
               {
                comments.map((comment, index) => {
                    return (
                        <div key={index} className='comment'>
                            {comment.commentBody}<br></br>
                            <label>Username : {comment.username}</label>
                            {authState.username === comment.username && (
                                <button className='xbtn' onClick={() => deleteComment(comment.id)}>X</button>)}
                        </div>
                        
                    )
                })
               }
            </div>
                
            </div>
        </div>
    </div>
  )
}

export default Post