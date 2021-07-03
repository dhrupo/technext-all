import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import './Users.css';
import Pagination from './Pagination/Pagination';
import Search from './Search/Search';
import TableHeader from './TableHeader/TableHeader';
import Spinner from '../Spinner/Spinner';
import { useHistory } from 'react-router-dom';

const Users = () => {
  let history = useHistory();
  const [users, setUsers] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState({ field: "", order: "" })

  const headers = [
    { name: "username", field: "username", sortable: true },
    { name: "email", field: "email", sortable: true },
    { name: "Action", field: "action", sortable: false }
  ]

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/allUsers/`)
      .then(data => {
        setUsers(data.data);
      });
  }, [])

  const goToUserDetails = (id) => {
    history.push(`/userDetails/${id}`);
  }

  const handlePostPerPage = (e) => {
    e === "" ? setItemsPerPage(itemsPerPage) : setItemsPerPage(e)
  }

  const userData = useMemo(() => {
    let computedUser = users;

    if (search) {
      computedUser = computedUser.filter(
        user =>
          user.username.toLowerCase().includes(search.toLowerCase()) ||
          user.email.toLowerCase().includes(search.toLowerCase())
      )
    }

    setTotalItems(computedUser.length);

    if (sorting.field) {
      const reversed = sorting.order === "asc" ? 1 : -1;
      computedUser = computedUser.sort((a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field]))
    }

    return computedUser.slice((currentPage - 1) * itemsPerPage, (currentPage - 1) * itemsPerPage + itemsPerPage);
  }, [users, currentPage, search, sorting, itemsPerPage])

  return (
    <div className="my-5 container">
      <Search onSearch={(value) => {
        setSearch(value);
        setCurrentPage(1);
      }}></Search>
      {
        userData ?
          <table className="table table-striped table-hover m-3">
            <TableHeader headers={headers} onSorting={(field, order) => setSorting({ field, order })}>
            </TableHeader>
            <tbody>
              {
                userData.map((user) => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td><button className="btn btn-primary" onClick={() => { goToUserDetails(user.id) }}>View</button></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          : <Spinner></Spinner>}
      <Pagination total={totalItems} itemsPerPage={itemsPerPage} cureentPage={currentPage} onPageChange={page => setCurrentPage(page)} handlePostPerPage={(e) => handlePostPerPage(e)}></Pagination>
    </div>
  );
};

export default Users;