import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likedPost } from "../../../Redux/Slice";
import {useNavigate} from 'react-router-dom';
import styles from "../../../Styles/Post.module.css";

export const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [likes, setLikes] = React.useState(post?.likes);
  const user = JSON.parse(localStorage.getItem("profile"));
  const userId = user?.sub || user?.id;
  const hasLikedPost = post.likes.find((like) => like === userId);

  const handleLikes = async () => {
    dispatch(likedPost(post._id));

    if(hasLikedPost) {
      setLikes(post.likes.filter(id => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlinedIcon fontSize="small" />
          &nbsp;{post.likes.length} {post.likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <ThumbUpAltOutlinedIcon fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const openPost = () => navigate(`/flashback/posts/${post._id}`);

  return (
    <Card className={styles.card} raised elevation={6} sx={{borderRadius: '20px'}}>
      <ButtonBase sx={{display: 'block', textAlign: 'initial'}} onClick={openPost}>
        <CardMedia
          className={styles.media}
          image={post.selectedFile}
          title={post.title}
        />
        <div className={styles.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        {(user?.sub === post?.creator || user?.id === post?.creator) && (
          <div className={styles.overlay2}>
            <Button
              sx={{ color: "white" }}
              size="small"
              onClick={() => setCurrentId(post._id)}
            >
              <MoreHorizIcon fontSize="medium" />
            </Button>
          </div>
        )}
        <div className={styles.details}>
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography className={styles.title} variant="h5" gutterBottom>
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={styles.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user}
          onClick={handleLikes}
        >
          <Likes />
        </Button>
        {(user?.sub === post?.creator || user?.id === post?.creator) && (
          <Button
            size="small"
            color="error"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize="small" sx={{color: 'red'}}/>
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
