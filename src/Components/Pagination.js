/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Pagination, PaginationItem } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../Redux/Slice";
import styles from "../Styles/Pagination.module.css";

export const Paginate = ({ page }) => {
  const dispatch = useDispatch();
  const {numberOfPages} = useSelector((state) => state.posts);

  React.useEffect(() => {
    if(page) dispatch(getAllPosts(page));
    
  }, [page]);

  return (
    <Pagination
      classes={{ ul: styles.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/flashback/posts?page=${item.page}`} />
      )}
    />
  );
};
