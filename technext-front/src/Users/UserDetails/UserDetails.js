import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserPosts from '../UserPosts/UserPosts';
import './UserDetails.css';
import Spinner from '../../Spinner/Spinner';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/users/${id}`)
      .then(data => {
        setUser(data.data);
      });
  }, [id])

  return (
    <React.Fragment>
      {user ?
        <div>
          <div className="container user-container my-5">
            <h5 className="fw-bold">{user && user.username}</h5>
            <p className="fw-bold">email: {user && user.email}</p>
          </div>
          <div className="post-container">
            <UserPosts></UserPosts>
          </div>
        </div> :
        <Spinner></Spinner>
      }
    </React.Fragment>
  );
};

export default UserDetails;