import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#ebd" }}>
      <div className="container-fluid">
        <a className="navbar-brand fw-bold fs-3" href="/">Post It</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item mx-3">
              <a className="nav-link fw-bold" href="/post">All Posts</a>
            </li>
            <li className="nav-item mx-1">
              <a className="nav-link fw-bold" href="/mypost">My Posts</a>
            </li>
            <li className="nav-item mx-1">
              <a className="nav-link fw-bold" href="/addpost">Add Post</a>
            </li>
            <li className="nav-item mx-1">
              <a className="nav-link fw-bold" href="/users">All Users</a>
            </li>
            {
              sessionStorage.getItem('token') ?
                <li className="nav-item mx-1">
                  <a className="nav-link fw-bold" href="/" onClick={() => { sessionStorage.removeItem('token') }}>Logout</a>
                </li> :
                <React.Fragment>
                  <li className="nav-item mx-1">
                    <a className="nav-link fw-bold" href="/register">Register</a>
                  </li>
                  <li className="nav-item mx-1">
                    <a className="nav-link fw-bold" href="/login">Login</a>
                  </li>
                </React.Fragment>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;