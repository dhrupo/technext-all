import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AddComment from './AddComment/AddComment';
import "./Commnets.css";

const Comments = () => {
  const { postId } = useParams();
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/getComments/${postId}`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    })
      .then(data => {
        setComments(data.data);
      });
  }, [postId])

  return (
    <div className="comment-container">
      {comments &&
        comments.map(com => (
          <div className="comment" key={com.id}>
            <p>{com.username}: {com.comment}</p>
          </div>
        ))
      }
      {
        sessionStorage.getItem('token') ?
          <AddComment></AddComment>
          : <h5 className="text-center">You need to login to comment.</h5>
      }
    </div>
  );
};

export default Comments;