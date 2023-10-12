import React from "react";
import PostsList from "../features/posts/PostsList";
import PostDetails from "../features/posts/PostDetails";
import { Route, Routes } from "react-router-dom";
import NewPostForm from "../features/posts/NewPostForm";
import PostEditForm from "../features/posts/PostEditForm";

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<PostsList />} />
      <Route path='posts/:id' element={<PostDetails />} />
      <Route path='posts/:id/edit' element={<PostEditForm />} />
      <Route path='/new' element={<NewPostForm />} />
    </Routes>
  );
}

export default AppRoutes;
