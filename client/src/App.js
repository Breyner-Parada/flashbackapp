import React from "react";
import { Container } from "@mui/material";
import { Navbar } from "./Components/Navbar.js";
import { Home } from "./Components/Home.js";
import { Auth } from "./Components/Auth/Auth.js";
import { PostDetails } from "./Components/PostDetails.js";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {

  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <HashRouter forceRefresh={false}>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to='/posts' />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/posts/search" element={<Home />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/auth" element={!user ? <Auth />  : <Navigate to='/posts' />} />
        </Routes>
      </Container>
    </HashRouter>
  );
}

export default App;
