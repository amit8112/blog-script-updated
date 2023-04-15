import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const fetchAllBlogs = async () => {
      const res = await axios.get("http://localhost:9000/api/v1/get/allblogs", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBlogs(res.data);
    };
    fetchAllBlogs();
  }, []);
  return (
    <>
      <main class="my-5">
        <div class="container shadow-lg">
          <section class="text-center">
            <strong>Latest Posts</strong>
          </section>
          <div class="row">
            {blogs && blogs.length > 0 ? (
              blogs.map((item) => {
                return (
                  <div class="col-lg-4 col-md-12 mb-4">
                    <Card style={{ width: "18rem" }}>
                      <Card.Img
                        variant="top"
                        src={`http://localhost:9000/${item.thumbnail}`}
                      />
                      <Card.Body>
                        <Card.Text>{item.username}</Card.Text>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Text>{item.description}</Card.Text>
                        <Link to={`/blog/${item._id}`}>
                          <Button variant="primary">Read More </Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })
            ) : (
              <h2>Loading..</h2>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
