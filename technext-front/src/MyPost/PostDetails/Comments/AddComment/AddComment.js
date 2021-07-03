import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const AddComment = () => {
  const [comment, setComment] = useState(null);
  const [error, setError] = useState("");
  const { postId } = useParams();

  const handleComment = (e) => {
    setComment(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res;
    try {
      res = await axios.post(`http://127.0.0.1:8000/api/addComment/${postId}`, { comment }, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      })
      // history.replace(from);
      window.location.reload();
    }
    catch (err) {
      setError("Please enter a valid comment.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-danger fw-bold">{error}</p>
      <div className="input-group">
        <input type="text" name="comment" onChange={handleComment} className="form-control" placeholder="Write Comments" required />
        <button type="submit" className="btn btn-outline-primary">Add Comment</button>
      </div>
    </form>
  );
};

export default AddComment;