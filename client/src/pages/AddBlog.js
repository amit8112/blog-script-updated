import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AddBlog = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    description: "",
    category: "",
  });

  const [file, setFile] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchAllCategories = async () => {
      const res = await axios.get(
        "http://localhost:9000/api/v1/get/categories",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCategories(res.data);
    };
    fetchAllCategories();
  }, []);

  //creating a form data
  const formdata = new FormData();
  formdata.append("title", input.title);
  formdata.append("category", input.category);
  formdata.append("description", input.description);
  formdata.append("thumbnail", file);
  formdata.append("user", localStorage.getItem("id"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:9000/api/v1/add/blog",
        formdata,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert(res.data.message);
      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <>
      <div className="container shadow">
        <h2 className="text-center my-3">Add New Blog</h2>
        <div className="col-md-12 my-3 d-flex items-center justify-content-center">
          <div className="row">
            <form onSubmit={handleSubmit}>
              <div class="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={input.title}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Title"
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" className="form-label">
                  Category
                </label>
                <select
                  className="form-control"
                  name="category"
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  id="category"
                >
                  <option disabled>Select Category</option>
                  {categories &&
                    categories.map((item) => {
                      return <option value={item._id}>{item.title}</option>;
                    })}
                </select>
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Title
                </label>
                <textarea
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Blog Description"
                />
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Thumbnail
                </label>
                <input
                  type="file"
                  name="thumbnail"
                  onChange={(e) => setFile(e.target.files[0])}
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Select thumbnail"
                />
              </div>

              <div className="mb-3">
                <button type="submit" class="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBlog;
