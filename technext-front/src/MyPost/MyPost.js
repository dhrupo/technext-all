import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Pagination from '../Users/Pagination/Pagination';
import Spinner from '../Spinner/Spinner';
import './MyPost.css';

const MyPost = () => {
  const [posts, setPosts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  let history = useHistory();

  const getPostDetails = (postId) => {
    history.push(`/postDetails/${postId}`);
  }

  const goToEdit = (postId) => {
    history.push(`/editpost/${postId}`);
  }

  const handleDelete = (postId) => {
    const action = window.confirm(`Are you want to delete the post?`);
    if (action) {
      axios.delete(`http://127.0.0.1:8000/api/posts/${postId}`, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      })
        .then(data => {
          setTotalItems(data.data.length);
          window.location.replace("/mypost");
        });
    }
  }

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/getPostByUser/`, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    })
      .then(data => {
        setPosts(data.data);
      });
  }, [])

  const handlePostPerPage = (e) => {
    e === "" ? setItemsPerPage(itemsPerPage) : setItemsPerPage(e)
  }

  const postData = useMemo(() => {
    let computedPosts = posts;
    setTotalItems(computedPosts.length);

    return computedPosts.slice((currentPage - 1) * itemsPerPage, (currentPage - 1) * itemsPerPage + itemsPerPage);
  }, [posts, currentPage, itemsPerPage])

  return (
    <div className="container mypost-container my-5">
      {postData.length !== 0 ?
        <div>
          {
            postData.map(post => (
              <div className="my-post" key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <button onClick={() => getPostDetails(post.id)} className="btn btn-sm btn-outline-success m-2">Details</button>
                <button onClick={() => goToEdit(post.id)} className="btn btn-sm btn-outline-warning  m-2">Edit</button>
                <button onClick={() => handleDelete(post.id)} className="btn btn-sm btn-outline-danger m-2">Delete</button>
              </div>
            ))
          }
          <Pagination total={totalItems} itemsPerPage={itemsPerPage} cureentPage={currentPage} onPageChange={page => setCurrentPage(page)} handlePostPerPage={(e) => handlePostPerPage(e)}></Pagination>
        </div>
        : <h3 className="text-center">No Posts Available.</h3>
      }
    </div >
  );
};

export default MyPost;