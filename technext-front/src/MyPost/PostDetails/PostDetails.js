import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './PostDetails.css';
import Comments from './Comments/Comments';
import Spinner from '../../Spinner/Spinner';

const PostDetails = () => {
  const { postId } = useParams();
  const [postDetails, setPostDetails] = useState();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/posts/${postId}`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    })
      .then(data => {
        setPostDetails(data.data);
      });
  }, [postId])

  return (
    <div className="container p-3">
      {
        postDetails ?
          <div>
            <div className="post-details">
              <h2>{postDetails.title}</h2>
              <p>{postDetails.description}</p>
            </div>
            <Comments></Comments>
          </div>
          :
          <Spinner></Spinner>
      }
    </div>
  );
};

export default PostDetails;