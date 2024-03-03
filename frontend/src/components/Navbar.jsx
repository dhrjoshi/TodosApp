import React from 'react'
import './Navbar.css'
import { FcTodoList } from "react-icons/fc"; 
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';

const Navbar = () => {
    const isLoggedIn = useSelector((state) => state.isLoggedIn)
    console.log(isLoggedIn);

    const dispatch = useDispatch();
    const logout = () => {
        // sessionStorage.clear('id');
        localStorage.clear();
        dispatch(authActions.logout());
    }

  return (
    <div>
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <b><FcTodoList/> &nbsp; TODO</b>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link active mx-2" aria-current="page" to="/about">About Us</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link active mx-2" aria-current="page" to="/todo">TODO</Link>
                    </li>
                    {!isLoggedIn && 
                    <>
                        <li className="nav-item">
                        <Link className="nav-link active mx-2 btn-nav" aria-current="page" to="/signup">SignUp</Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link active mx-2 btn-nav" aria-current="page" to="/signin">SignIn</Link>
                        </li>
                    </>}
                    {isLoggedIn && 
                    <>
                        <li className="nav-item">
                        <Link className="nav-link active mx-2 btn-nav" aria-current="page" to="#" onClick={logout}>Logout</Link>
                        </li>
                    </>}
                    {/* <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="#">
                        <img className='image-fluid user-png'
                        src='data:image/png;base64,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'
                        alt='/'/>
                    </Link>
                    </li> */}
                </ul>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar