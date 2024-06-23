import axios from "axios"
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import "./detail.css"
import { FaRegUserCircle } from "react-icons/fa";

const Detail = () => {
  const {id} = useParams()
  const [post, setPost] = useState({})
  const date = new Date(post.updatedAt)
  useEffect(()=> {
    const fetchData = async ()=> {
      const {data} = await axios.get(`http://localhost:7000/api/v1/posts/post/${id}`)
      setPost(data)
    }
    fetchData()
  }, [])
  return (
    <div className="view_post_wrapper">
      <h1>{post.title}</h1>
      <div className="view_post_header">
        <div className="view_post_info">
        <FaRegUserCircle style={{fontSize: "22px", color: "grey"}}/>
        <p className="view_post_author" style={{fontSize: "14px"}}>{post.author?.name}</p>
        </div>
        <p className="view_post_date" style={{fontSize: "13px"}}>{date.toDateString()}</p>
      </div>
      <div className="view_body" dangerouslySetInnerHTML={{ __html: `${post.body}` }}></div>

    </div>
  )
}

export default Detail
