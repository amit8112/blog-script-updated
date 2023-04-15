import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleBlog = () => {
  const Navigate = useNavigate();
  const { id } = useParams();
  const [blog, setBlog] = useState({});

  useEffect(() => {
    const fetchSingleBlog = async () => {
      const res = await axios.get(
        `http://localhost:9000/api/v1/get/blog/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setBlog(res.data);
    };
    fetchSingleBlog();
  }, [id]);
  return (
    <>
      <div className="container shadow my-3">
        <div className="col-md-12 d-flex items-center justify-content-center bg-light">
          <div className="row">
            <h1 className="my-3">{blog.title}</h1>
            <p className="my-3">
              Published Date:{new Date(blog.createdAt).toLocaleDateString()}
            </p>

            <img
              src={`http://localhost:9000/${blog.thumbnail}`}
              className="img img-responsive img-rounded my-3"
              alt=""
            />
            <p className="my-3">{blog.description}</p>
          </div>
        </div>
        <div className="my-3">
          <button onClick={() => Navigate("/")} className="btn btn-primary">
            Back to Post{" "}
          </button>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
