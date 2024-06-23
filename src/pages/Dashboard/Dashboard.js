import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { IoIosAddCircle } from "react-icons/io";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Model from "../../components/Modal"

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false)
  const [eidtablePost, setIsEditablePost] = useState([])
  const handleClose = () => setShow(false);
  const handleShow = () => {setShow(true); setIsEditing(false)};
  const token = localStorage.getItem("blog_token");
  const decode = jwtDecode(token);

  const handleUpdate = (post) => {
    setIsEditablePost(post)
    setIsEditing(true);
    setShow(true)
  }
  const handleDelete = async (id) => {
    await axios({
        method: 'delete',
        url: `http://localhost:7000/api/v1/posts/delete/${id}`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    location.reload()
  }

  useEffect(() => {
    const fetcheData = async () => {
      const { data } = await axios.get(
        `http://localhost:7000/api/v1/posts/${decode.id}`
      );
      console.log(data)
      setPosts(data);
    };
    fetcheData();
  }, []);
  return (
    <div className="dashboard_container">
      <div className="top">
        <div className="create_post_button" onClick={handleShow}>
          Create Post <IoIosAddCircle />
        </div>
        <Model show={show} setShow={setShow} handleClose={handleClose} handleShow={handleShow}  isEditing={isEditing} eidtablePost={eidtablePost}/>
        <div className="Welcome_message">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum impedit,
          eum culpa iure iusto sit nobis obcaecati odio facere! Maxime quo
          temporibus nisi qui accusantium beatae consectetur recusandae odio
          repudiandae.
        </div>
      </div>
      <div className="user_posts">
        {posts.map((post) => (
          <div className="user_post">
            <p>{post.title}</p>

            <div className="buttons">
            <p onClick={()=>handleUpdate(post)}>Edit</p>
            <p onClick={()=> handleDelete(post._id)}>Delete</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
