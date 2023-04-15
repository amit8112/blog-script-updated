import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Header from "./components/Header";
import Register from "./pages/Register";
import AddBlog from "./pages/AddBlog";
import AddCategory from "./pages/AddCategory";
import PrivateRoute from "./Services/ProtectedRoutes.js";
import SingleBlog from "./pages/SingleBlog";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* PrivateRoute */}
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/add-blog" element={<AddBlog />} />
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/blog/:id" element={<SingleBlog />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
