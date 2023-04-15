import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:9000/api/v1/user/register",
        input
      );
      alert(res.data.message);
      navigate("/login");
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <>
      <div className="container shadow">
        <h2 className="text-center my-3">Login</h2>
        <div className="col-md-12 my-3 d-flex items-center justify-content-center">
          <div className="row">
            <form onSubmit={handleSubmit}>
              <div class="mb-3">
                <label for="exampleInputEmail1">Name</label>
                <input
                  type="text"
                  name="username"
                  value={input.username}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  class="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter Name"
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  class="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
              </div>

              <div className="mb-3">
                <button type="submit" class="btn btn-primary">
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
