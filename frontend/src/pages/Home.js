
import React, { useContext } from 'react'
import axios from "axios";
import{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom"
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import {AuthContext} from "../helpers/AuthContext"


function Home() {

    const [listOfPosts, setListOfPosts] = useState([])
    const [likedPosts, setLikedPosts] = useState([])
    const {authState} = useContext(AuthContext)
    let history = useNavigate()
  
    useEffect(()=>{

      if(!authState.status){
        history("/login")
      } else {
        axios.get("http://localhost:8000/posts",
        {
          headers: {
            accessToken: localStorage.getItem("accessToken")
          }
        }).then((response) => {
          setListOfPosts(response.data.listOfPosts);
          setLikedPosts(response.data.likedPosts.map((like) => {
            return like.PostId
          }))
        })
      }
    }, [])


    const likePost = (postId) => {
      axios.post("http://localhost:8000/likes", 
      { PostId: postId },
      {
        headers: {
          accessToken: localStorage.getItem("accessToken")
        }
      }
      ).then((response) => {
        // alert(response.data)
        setListOfPosts(listOfPosts.map((post) => {
          if(post.id === postId){
            if(response.data.liked){
              return {...post, Likes: [...post.Likes, 0]}
            } else {
              const likesArray = post.Likes
              likesArray.pop()
              return {...post, Likes: likesArray}
            }
          } else {
            return post
          }
        }))

        if(likedPosts.includes(postId)){
          setLikedPosts(
            likedPosts.filter((id) => {
              return id != postId
            })
          )
        } else {
          setLikedPosts([...likedPosts, postId])
        }
      })
    }

  return (
    <div>{
        listOfPosts.map((datas, index) => {
          return (
           <div key={index} className=''>
            <div className='post'>
              <div className='title'>{datas.title}</div>
              <div className='body' onClick = {() => { history(`/post/${datas.id}`)}}>{datas.postText}</div>
              <div className='footer'>
                @{datas.username}
                <div className='like'>
                  <ThumbUpAltIcon
                    onClick={() => {
                      likePost(datas.id);
                    }}
                    className={
                      likedPosts.includes(datas.id) ? "unlikeBttn" : "likeBttn"
                    }
                  />
                  <label>{datas.Likes.length}</label>
                </div>
              </div> 
            </div>
           </div>
          )
        })
      }</div>
  )
}

export default Home