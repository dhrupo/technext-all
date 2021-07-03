import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EditPost = () => {
  const { postId } = useParams();
  const [postDetails, setPostDetails] = useState();
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [error, setError] = useState("");

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

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://127.0.0.1:8000/api/posts/${postId}`, { title, description }, {
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
    <div>{
      postDetails ?
        <div className="container my-5 form-back">
          <h4 className="text-center mb-3">Edit Post</h4>
          <p className="text-danger fw-bold">{error}</p>
          <form onSubmit={handleSubmit} className="w-75 mx-auto" id="EditPost">
            <input className="form-control mb-2" type="text" name="title" defaultValue={postDetails.title} onChange={handleTitleChange} placeholder="Set a title" required />
            <textarea className="form-control mb-2" rows="4" cols="50" name="description" defaultValue={postDetails.description} type="text" onChange={handleDescriptionChange} placeholder="Write..." form="EditPost"></textarea>
            <button className="btn w-100 btn-primary mx-auto" type="submit">Edit Post</button>
          </form>
        </div>
        : <p>loading...</p>}
    </div>

  );
};

export default EditPost;