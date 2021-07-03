import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';

const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  let history = useHistory();
  let { id } = useParams();

  const getPostDetails = (postId) => {
    history.push(`/postDetails/${postId}`);
  }

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/getAllPostByUser/${id}`)
      .then(data => {
        setPosts(data.data);
      });
  }, [id])

  const handlePostPerPage = (e) => {
    e === "" ? setItemsPerPage(itemsPerPage) : setItemsPerPage(e)
  }

  const postData = useMemo(() => {
    let computedPosts = posts;
    setTotalItems(computedPosts.length);

    return computedPosts.slice((currentPage - 1) * itemsPerPage, (currentPage - 1) * itemsPerPage + itemsPerPage);
  }, [posts, currentPage, itemsPerPage])

  return (
    <div>
      <div className="container user-post-container my-5">
        {
          postData.length !== 0 ?
            postData.map(post => (
              <div className="user-post" key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <button onClick={() => getPostDetails(post.id)} className="btn btn-sm btn-outline-success m-2">Details</button>
              </div>
            )) :
            <h3 className="text-center">No Post Available.</h3>
        }
        <Pagination total={totalItems} itemsPerPage={itemsPerPage} cureentPage={currentPage} onPageChange={page => setCurrentPage(page)} handlePostPerPage={(e) => handlePostPerPage(e)}></Pagination>
      </div>
    </div>
  );
};

export default UserPosts;