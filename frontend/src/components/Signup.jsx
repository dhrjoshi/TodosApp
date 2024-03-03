import React, { useState } from 'react'
import './Signup.css'
import HeadingComp from './HeadingComp'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

    const [inputs,setInputs] = useState({email:"",username:"",password:""});
    const change = (e) => {
        const {name,value} = e.target;
        setInputs({...inputs, [name]: value});
    }

    const navigate = useNavigate()
    const submit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:4000/api/signUp', inputs).then((response) => {
            console.log(response);
            if(response.data.message === 'Not able to sign-up'){
                // alert(response.data.message);
                alert('User already exists');
            } else{
                alert(response.data.message);
                setInputs({email:"",username:"",password:""});
                navigate('/signin');
            }
        });
    }

  return (
    <div className="signup">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 column d-flex justify-content-center align-items-center ">
            <div className="d-flex flex-column  w-100 p-3">
              <input
                className="p-2  my-3 input-signup"
                type="email"
                name="email"
                placeholder="Enter Your Email"
                onChange={change}
                value={inputs.email}
              />
              <input
                className="p-2 my-3 input-signup"
                type="username"
                name="username"
                placeholder="Enter Your Username"
                onChange={change}
                value={inputs.username}
              />
              <input
                className="p-2 my-3 input-signup"
                type="password"
                name="password"
                placeholder="Enter Your Password"
                onChange={change}
                value={inputs.password}
              />

              <button className="btn-signup p-2" onClick={submit}>
                Sign Up
              </button>
            </div>
          </div>
          <div className=" col-lg-4 column col-left d-lg-flex justify-content-center align-items-center  d-none">
            {/* <Heading first="Sign" second="Up" /> */}
            <HeadingComp first='Sign' second='Up'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup