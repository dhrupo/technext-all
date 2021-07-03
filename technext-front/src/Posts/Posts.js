import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Posts.css';
import Spinner from '../Spinner/Spinner';
import { useHistory } from 'react-router-dom';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(10);
  let history = useHistory();

  const getPostDetails = (postId) => {
    history.push(`/postDetails/${postId}`);
  }

  const loadMore = () => {
    setCount(count + 10);
  }

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/posts/`)
      .then(data => {
        setPosts(data.data);
      });
  }, [])

  return (
    <div className="container">
      {
        posts.length !== 0 ?
          <div className="my-3 row row-cols-1 row-cols-md-3 g-4">
            {
              posts.slice(0, count).map(post => (
                <div className="col" key={post.id}>
                  <div className="card text-center" onClick={() => getPostDetails(post.id)}>
                    <div className="card-body">
                      <h4 className="card-title">{post.title}</h4>
                      <p>Posted By: {post.username}</p>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
          : <Spinner></Spinner>
      }
      <div className="row">
        {
          count < posts.length &&
          <button onClick={loadMore} className="my-3 btn btn-lg btn-outline-primary">Load More</button>
        }
      </div>
    </div >
  );
};

export default Posts;