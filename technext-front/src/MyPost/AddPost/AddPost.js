import axios from 'axios';
import React, { useState } from 'react';
import './AddPost.css';

const AddPost = () => {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [error, setError] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://127.0.0.1:8000/api/posts`, { title, description }, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      })
      // history.replace(from);
      window.location.replace("/mypost");
    }
    catch (err) {
      setError("please provide valid data");
    }
  }
  return (
    <div className="container my-5 form-back">
      <h4 className="text-center mb-3">Add Post</h4>
      <form onSubmit={handleSubmit} className="w-75 mx-auto" id="addPost">
        <p className="text-danger fw-bold">{error}</p>
        <input className="form-control mb-2" type="text" name="title" onChange={handleTitleChange} placeholder="Set a title" required />
        <textarea className="form-control mb-2" rows="4" cols="50" name="description" type="text" onChange={handleDescriptionChange} placeholder="Write..." form="addPost"></textarea>
        <button className="btn w-100 btn-outline-primary mx-auto" type="submit">Post Now!</button>
      </form>
    </div>
  );
};

export default AddPost;