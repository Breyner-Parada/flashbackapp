import React from "react";
import { Container } from "@mui/material";
import { Navbar } from "./Components/Navbar.js";
import { Home } from "./Components/Home.js";
import { Auth } from "./Components/Auth/Auth.js";
import { PostDetails } from "./Components/PostDetails.js";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {

  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter forceRefresh={false}>
      <Container maxWidth="xl">
        <Navbar />
        <Routes>
          <Route path="/flashback" element={<Navigate to='/flashback/posts' />} />
          <Route path="/flashback/posts" element={<Home />} />
          <Route path="/flashback/posts/search" element={<Home />} />
          <Route path="/flashback/posts/:id" element={<PostDetails />} />
          <Route path="/auth" element={!user ? <Auth />  : <Navigate to='/flashback/posts' />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
