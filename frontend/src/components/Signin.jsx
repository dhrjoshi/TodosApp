import React, { useState } from 'react'
import './Signin.css'
import HeadingComp from './HeadingComp'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';

const Signin = () => {
    const [inputs,setInputs] = useState({email:"",password:""});
    const change = (e) => {
        const {name,value} = e.target;
        setInputs({...inputs, [name]: value});
    }

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const submit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:4000/api/signin', inputs).then((response) => {
            console.log(response.data.data.token);
            console.log(response.data.data.user._id);
            const userId = response.data.data.user._id;
            localStorage.setItem('userid', userId);
            const token = response.data.data.token;
            localStorage.setItem('authToken', token);
            dispatch(authActions.login());
            navigate('/todo');
        });
    }

  return (
    <div>
      <div className="signup">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 column col-left d-none d-lg-flex justify-content-center align-items-center">
              <HeadingComp first="Sign" second="In" />
            </div>
            <div className="col-lg-8 column d-flex justify-content-center align-items-center ">
              <div className="d-flex flex-column  w-100 p-3">
                <input
                  className="p-2  my-3 input-signup"
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  value={inputs.email}
                  onChange={change}
                />

                <input
                  className="p-2 my-3 input-signup"
                  type="password"
                  name="password"
                  placeholder="Enter Your Password"
                  value={inputs.password}
                  onChange={change}
                />

                <button className="btn-signup p-2" onClick={submit}>
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin