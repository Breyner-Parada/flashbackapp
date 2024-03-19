/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import { getPost, getPostsBySearch } from "../Redux/Slice";
import { CommentsSection } from "./Comments";
import styles from "../Styles/PostDetails.module.css";

export const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  React.useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  React.useEffect(() => {
    if(post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
    }
  }, [post]);

  if (!post) return null;

  if (isLoading) {
    return (
      <Paper elevation={6} className={styles.loadingPaper}>
        <CircularProgress size={60} />
      </Paper>
    );
  }
  const recommendedPosts = posts.filter(({_id}) => _id !== post._id);

  const openPost = (_id) => {
    navigate(`/flashback/posts/${_id}`);
  }

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={styles.card}>
        <div className={styles.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <CommentsSection post={post} />
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={styles.imageSection}>
          <img className={styles.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>
      {recommendedPosts.length && (
        <div className={styles.section}>
          <Typography gutterBottom variant='h5'>You might also like:</Typography>
          <Divider />
          <div className={styles.recommendedPosts}>
            {recommendedPosts.map(({title, message, name, likes, selectedFile, _id}) => (
              <div style={{margin: '20px', cursor: 'pointer', display: 'grid'}} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <Typography gutterBottom variant="subtitle">Likes: {likes.length}</Typography>
                <img src={selectedFile} width='200px' alt={title} />
              </div>
            ))}
          </div>
        </div>
      )}
    </ Paper>
  );
};
