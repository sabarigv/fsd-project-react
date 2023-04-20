import logo from "./logo.svg";
import "./App.css";
import { Formik, useFormik } from "formik";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [users, setUser] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editUser, setEditUser] = useState({});
  let fetchData = async () => {
    try {
      let res = await axios
      .get("http://localhost:3001/students")
      setUser(res.data);
    }catch (error) {
      console.log(error)
    }
  };
  fetchData();
  // useEffect(()=> {
  //   fetchData();
  // }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        if(!isEdit){
          await axios.post("http://localhost:3001/student", values);
        }else{
          await axios.put(`http://localhost:3001/student/${editUser.id}`, values);
          setIsEdit(false);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  let handleEdit = async (id) =>{
    try {
     let student = await axios.get(`http://localhost:3001/student/${id}`);
     formik.setValues(student.data);
     setEditUser(student.data);
     setIsEdit(true);
    } catch (error) { 
    }
  };

let handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:3001/student/${id}`);
    fetchData();
  } catch (error) {
    
  }
}

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <form onSubmit={formik.handleSubmit}>
            <div className="col-lg-12">
              <label>Email</label>
              <input
                type="text"
                placeholder="Search"
                className="form-control"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
            </div>
            <div className="col-lg-12">
              <label>Password</label>
              <input
                type="text"
                placeholder="Search"
                className="form-control"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </div>
            <div>
              <input
                className="btn btn-primary mt-2"
                type="submit"
                value="Submit"
              />
            </div>
          </form>
        </div>
        <div className="col-lg-6">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Password</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index)=> {
                return(
                  <tr>
                    <th scope="row">{user.id}</th>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>
                      <button className="btn btn-primary" onClick={ () => handleEdit(user._id)}>Edit</button>
                      <button className="btn btn-danger" onClick={ () => handleDelete(user._id)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
