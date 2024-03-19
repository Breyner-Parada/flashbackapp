import React from "react";
import { Grid, CircularProgress, Box } from "@mui/material";
import { Post } from "./Post/Post.js";
import { useSelector } from "react-redux";
import styles from "../../Styles/Posts.module.css";

export const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  if(!posts?.length && !isLoading) return 'No Posts';

  return isLoading ? (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <CircularProgress size={70} />
    </Box>
  ) : (
    <Grid
      className={styles.mainContainer}
      container
      alignItems="stretch"
      spacing={3}
    >
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};
