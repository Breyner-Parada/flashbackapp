import React from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { newPosts, updatePost } from "../Redux/Slice";
import {useNavigate} from 'react-router-dom';
import Resizer from 'react-image-file-resizer';
import styles from "../Styles/Form.module.css";

export const Form = ({ currentId, setCurrentId }) => {
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [postData, setPostData] = React.useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  React.useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1000,
      1000,
      "JPEG",
      90,
      0,
      (uri) => {
        resolve(setPostData({...postData, selectedFile: uri  }));
      },
      "base64"
    );
  });

  const onChange = async (event) => {
    try {
      const file = event.target.files[0];
      const image = await resizeFile(file);
      console.log(image);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, {...postData, name: user?.name}));
    } else {
      dispatch(newPosts({...postData, name: user?.name}, navigate));
    }
    clear();
  };
  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  if(!user?.name) {
    return (
      <Paper className={styles.paper}>
        <Typography variant='h6' align='center'>
          Please Sign In to create your own flashbacks and like other's flashbacks.
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper className={styles.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Edit" : "Create"} your FlashBack
        </Typography>
        <TextField
          sx={{ marginBottom: 2 }}
          name="title"
          variant="outlined"
          label="Title"
          size="small"
          fullWidth
          value={postData.title}
          onChange={(event) =>
            setPostData({ ...postData, title: event.target.value })
          }
        />
        <TextField
          sx={{ marginBottom: 2 }}
          name="message"
          variant="outlined"
          label="Message"
          multiline
          rows={3}
          fullWidth
          value={postData.message}
          onChange={(event) =>
            setPostData({ ...postData, message: event.target.value })
          }
        />
        <TextField
          sx={{ marginBottom: 2 }}
          name="tags"
          variant="outlined"
          label="Tags(coma separated, no spaces)"
          size="small"
          fullWidth
          value={postData.tags}
          onChange={(event) =>
            setPostData({ ...postData, tags: event.target.value.split(",") })
          }
        />
        <div className={styles.fileInput}>
         <input type='file' onChange={event => onChange(event)} />
        </div>
        <Button
          sx={{ marginBottom: 1.5 }}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};
