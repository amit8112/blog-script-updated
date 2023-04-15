import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

import { Link } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchAllBlogs = async () => {
      const userId = localStorage.getItem("id") || "";
      const res = await axios.get(
        "http://localhost:9000/api/v1/get/allblogs/" + userId,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setBlogs(res.data);
    };
    fetchAllBlogs();
  }, []);
  return (
    <>
      <div id="cards_landscape_wrap-2">
        <div className="container">
          <div className="row">
            {blogs && blogs.length > 0 ? (
              blogs.map((item) => {
                return (
                  <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                    <a href="">
                      <div className="card-flyer">
                        <div className="text-box">
                          <div className="image-box">
                            <img
                              src={`http://localhost:9000/${item.thumbnail}`}
                              alt=""
                            />
                          </div>
                          <div className="text-container">
                            <h6>{item.title}</h6>
                            <p>{item.description}</p>
                            <p style={{ fontWeight: "bold" }}>
                              Author: {item.user?.username}
                            </p>
                          </div>
                          <Link to={`/blog/${item._id}`}>
                            <Button variant="primary mb-5">Read More </Button>
                          </Link>
                        </div>
                      </div>
                    </a>
                  </div>
                );
              })
            ) : (
              <h2>Loading..</h2>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
