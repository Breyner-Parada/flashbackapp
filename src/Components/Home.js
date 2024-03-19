import React from "react";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { Form } from "./Form.js";
import { Posts } from "./Posts/Posts.js";
import { useDispatch } from "react-redux";
import { getPostsBySearch } from "../Redux/Slice";
import { Paginate } from "./Pagination.js";
import { ChipInput } from "../Utils/ChipInput.js";
import styles from "../Styles/Home.module.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const Home = () => {
  const [currentId, setCurrentId] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  
  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      navigate(`/flashback/posts/search?searchQuery=${ search || 'none' }&tags=${ tags.join(',') }`);
    } else {
      navigate("/flashback");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          sx={{
            flexDirection: {
              xs: "column-reverse",
              sm: "row",
              md: "row",
              lg: "row",
              xl: "row",
            },
          }}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={styles.gridContainer}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={styles.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Flashback By Title"
                placeholder="Press Enter or Search"
                fullWidth
                onKeyDown={handleKeyPress}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                id="Tags"
                options={[]}
                defaultValue={[]}
                onChange={(e, value) => setTags(value)}
              />
              <Button onClick={searchPost} color="primary" variant="contained">
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery && !tags.length) && (
              <Paper elevation={6} className={styles.pagination}>
                <Paginate page={page}/>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};
