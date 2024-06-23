import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("http://localhost:7000/api/v1/posts/");
      setPosts(data);
      console.log(data);
    };
    fetchData();
  }, []);
  return (
    <div className="posts_container">
      {posts.map((post, index) => {
        const date = new Date(post.updatedAt);
        return (
          <Link to={`/view/${post._id}`} className="post_wrapper" key={index}>
            <div className="post_container">
              <div className="post_header">
                <div className="post_info">
                  <FaRegUserCircle style={{fontSize: "25px", color: "grey"}}/>
                  <p className="post_author" style={{fontSize: "14px"}}>{post.author.name}</p>
                </div>
                <p className="post_date" style={{fontSize: "13px"}}>{date.toDateString()}</p>
              </div>
              <h1 className="post_title">{post.title}</h1>
              <div className="body" dangerouslySetInnerHTML={{ __html: `${post.body.length > 89 ? post.body.substring(0, 90).concat("..."): post.body}` }}></div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Home;
