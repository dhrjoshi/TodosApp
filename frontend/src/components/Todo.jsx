import React, { useEffect, useState } from 'react'
import './Todo.css'
import TodoCards from './TodoCards';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import Update from './Update';
import axios from 'axios';

let id = localStorage.getItem('userid');
let toUpdateArray = [];

const Todo = () => {
    const show = () => {
        document.getElementById("textarea").style.display = "block";
    };

    const [inputs,setInputs] = useState({title: "", body: ""});
    const change = (e) => {
        const {name,value} = e.target;
        setInputs({ ...inputs, [name]: value});
    }

    const [tasks,setTasks] = useState([]);
    const submit = () => {
        if(inputs.title === "" || inputs.body === "")
            toast.error('Fill all details');
        else{
            const token = localStorage.getItem('authToken');
            if(token){
                const send = {
                    title: inputs.title,
                    body: inputs.body,
                    token
                }
                axios.post('http://localhost:4000/api/createTask', send).then((response) => {
                    console.log(response);
                })
                setTasks([...tasks, inputs]);
                setInputs({title:'',body:''});
                toast.success('Your Task is Added');
            } else{
                setTasks([...tasks, inputs]);
                setInputs({title:'',body:''});
                toast.success('Your Task is Added');
                toast.error('Your Task is not Saved! Please Sign up')
            }
        }
    }

    useEffect(() => {
        if(id){
            const fetch = async () => {
                await axios
                    .get(`http://localhost:4000/api/getTask/${id}`)
                    .then((response) => {
                        // console.log(response.data.data);
                        setTasks(response.data.data);
                });
            };
            fetch();
        }
    },[]);

    const del = async (Cardid) => {
        const token = localStorage.getItem('authToken');
        console.log(token);
        if (token) {
            const send = {token};
            const id = Cardid;
            await axios
            .delete(`http://localhost:4000/api/deleteTask/${id}`, {
                data: {token: token}
            })
            .then(() => {
                toast.success("Your Task Is Deleted");
            });
        } else {
            toast.error("Please SignUp First");
        }
    };

    const dis = (value) => {
        document.getElementById("todo-update").style.display = value;
    };

    const update = (value) => {
        console.log(tasks[value]._id);
        toUpdateArray = tasks[value];
        console.log(toUpdateArray);
    };

  return (
    <>
      <div className="todo">
        <ToastContainer />
        <div className="todo-main container d-flex justify-content-center align-items-center my-4 flex-column">
          <div className="d-flex flex-column todo-inputs-div w-lg-50 w-100 p-1">
            <input
              type="text"
              placeholder="TITLE"
              className="my-2 p-2 todo-inputs"
              onClick={show}
              name="title"
              value={inputs.title}
              onChange={change}
            />
            <textarea
              id="textarea"
              type="text"
              placeholder="BODY"
              name="body"
              className=" p-2 todo-inputs"
              value={inputs.body}
              onChange={change}
            />
          </div>
          <div className=" w-50 w-100 d-flex justify-content-end my-3">
            <button className="home-btn px-2 py-1" onClick={submit}>
              Add
            </button>
          </div>
        </div>

        {/* <div className='todo-body'>
            <div className='container-fluid'>
                {tasks && tasks.map((item,index) => (
                    <TodoCards key={index} title={item.title} body={item.body} id={index}/>
                ))}
            </div>
        </div> */}
        <div className="todo-body">
          <div className="container-fluid">
            <div className="row ">
              {tasks &&  
                tasks.map((item, index) => (
                  <div
                    className="col-lg-3 col-11 mx-lg-5 mx-3 my-2"
                    key={index}
                  >
                    <TodoCards
                      title={item.title}
                      body={item.body}
                      id={item._id}
                      delid={del}
                      display={dis}
                      updateId={index}
                      toBeUpdate={update}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="todo-update " id="todo-update">
        <div className="container update">
          <Update display={dis} update={toUpdateArray} />
        </div>
      </div>
    </>
  )
}

export default Todo