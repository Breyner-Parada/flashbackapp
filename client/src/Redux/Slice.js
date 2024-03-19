import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPosts,
  createPosts,
  updatedPost,
  deletedPost,
  likePost,
  signIn,
  signUp,
  fetchPostsBySearch,
  fetchPost,
  comment
} from "../Api";

const postsSlice = createSlice({
  name: "posts",
  initialState: {isLoading: true, posts: []},
  reducers: {
    getPosts(state, action) {
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages
      }
    },
    getOnePost(state, action) {
      return {
        ...state,
        post: action.payload
      }
    },
    addPosts(state, action) {
      return {...state, posts: [...state.posts, action.payload]};
    },
    upgradePosts(state, action) {
      return {...state, posts: state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      )}
    },
    deletePosts(state, action) {
      return {...state, posts: state.posts.filter((post) => post._id !== action.payload)};
    },
    signUpUser(state, action) {
      localStorage.setItem("profile", JSON.stringify(action.payload));
      return state;
    },
    postsBySearch(state, action) {
      return {
        ...state,
        posts: action.payload
      }
    },
    start_loading(state, action) {
      return {
        ...state,
        isLoading: true,
      }
    },
    end_loading(state, action) {
      return {
        ...state,
        isLoading: false,
      }
    },
    getComments(state, action) {
      return {
        ...state,
        posts: state.posts.map(post => {
          if(post._id === action.payload._id) {
            return action.payload;
          }
          return post;
        })
      }
    }
  },
});

export const getAllPosts = (page) => {
  return async (dispatch) => {
    try {
      dispatch(start_loading());
      const { data } = await fetchPosts(page);
      dispatch(getPosts(data));
      dispatch(end_loading());
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPost = (id) => {
  return async (dispatch) => {
    try {
      dispatch(start_loading());
      const { data } = await fetchPost(id);
      dispatch(getOnePost(data));
      dispatch(end_loading());
    } catch (error) {
      console.log(error);
    }
  };
};

export const newPosts = (post, navigate) => {
  return async (dispatch) => {
    try {
      dispatch(start_loading());
      const { data } = await createPosts(post);
      navigate(`/flashback/posts/${data._id}`);
      dispatch(addPosts(data));
      dispatch(end_loading());
    } catch (error) {
      console.log(error);
    }
  };
};

export const updatePost = (id, post) => {
  return async (dispatch) => {
    try {
      const { data } = await updatedPost(id, post);
      dispatch(upgradePosts(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const deletePost = (id) => {
  return async (dispatch) => {
    try {
      await deletedPost(id);
      dispatch(deletePosts(id));
    } catch (error) {
      console.log(error);
    }
  };
};

export const commentPost = (value, id) => {
  return async (dispatch) => {
    try {
      const {data} = await comment(value, id);
      return data.comments;
    } catch (error) {
      console.log(error);
    }
  };
};

export const likedPost = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await likePost(id);
      dispatch(upgradePosts(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const signin = (formData, Navigate) => {
  return async (dispatch) => {
    try {
      const { data } = await signIn(formData);
      dispatch(signUpUser(data));
      Navigate("/flashback");
    } catch (error) {
      console.log(error);
    }
  };
};

export const signup = (formData, Navigate) => {
  return async (dispatch) => {
    try {
      const { data } = await signUp(formData);
      dispatch(signUpUser(data));
      Navigate("/flashback");
    } catch (error) {
      console.log(error);
    }
  };
};

export const getPostsBySearch = (searchQuery) => {
  return async (dispatch) => {
    try {
      dispatch(start_loading());
      const {
        data: { data },
      } = await fetchPostsBySearch(searchQuery);
      dispatch(postsBySearch(data));
      dispatch(end_loading());
    } catch (error) {
      console.log(error);
    }
  };
};

export const { addPosts, getPosts, upgradePosts, deletePosts, signUpUser, postsBySearch, start_loading, end_loading, getOnePost  } =
  postsSlice.actions;
export default postsSlice.reducer;
