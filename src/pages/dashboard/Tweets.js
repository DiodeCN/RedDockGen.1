import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Avatar,
  Snackbar,
  Alert
} from '@mui/material';
import {
  ThumbUp,
  Star,
  Repeat,
  Visibility,
  Comment
} from '@mui/icons-material';
import axios from 'axios';

const Tweets = () => {
  const [tweets, setTweets] = useState([]);
  const [hotCount, setHotCount] = useState(0);
  const [comment, setcomment] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://192.168.1.6:10628/api/tweets");
        setTweets(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setSnackbarOpen(true);
          }
    };

    fetchData();
  }, []);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const increaseHotCount = () => {
    setHotCount(hotCount + 1);
    // Implement API call to update hot count in the backend.
  };

  return (
    <>
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem", p: 4 }}>
      {tweets.map(
        ({
          id,
          avatar_url,
          name,
          content,
          hours_since_post,
          likes,
          favorites,
          retweets
        }) => (
          <Card
            key={id}
            sx={{
              p: 2,
              borderRadius: "12px",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
              width: "100%"
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <Avatar
                  src={avatar_url}
                  alt={`${name}'s avatar`}
                  sx={{ mr: 1 }}
                />
                <Typography
                  component="div"
                  variant="subtitle2"
                  sx={{ color: "primary.main", fontSize: "1.5rem" }}
                >
                  {name}
                </Typography>
                <Typography
                  component="div"
                  variant="caption"
                  sx={{ color: "secondary.main", fontSize: "1.12rem" }}
                >
                  @{id}
                </Typography>
                <Typography
                  component="div"
                  variant="caption"
                  sx={{ color: "#999", fontSize: "1.12rem" }}
                >
                  {hours_since_post}h
                </Typography>
              </Box>
            </Box>
            <CardContent>
              <Typography variant="body1" sx={{ fontSize: "1.2rem" }}>
                {content}
              </Typography>
            </CardContent>
            <CardActions
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%"
                }}
              >
                <IconButton aria-label="like" sx={{ flexGrow: 1 }}>
                  <ThumbUp />
                  <Typography variant="body2" sx={{ fontSize: "1.2rem" }}>
                    {likes}
                  </Typography>
                </IconButton>
                <IconButton aria-label="favorite" sx={{ flexGrow: 1 }}>
                  <Star />
                  <Typography variant="body2" sx={{ fontSize: "1.2rem" }}>
                    {favorites}
                  </Typography>
                </IconButton>
                <IconButton aria-label="retweet" sx={{ flexGrow: 1 }}>
                  <Repeat />
                  <Typography variant="body2" sx={{ fontSize: "1.2rem" }}>
                    {retweets}
                  </Typography>
                </IconButton>
                <IconButton aria-label="comment" sx={{ flexGrow: 1 }}>
                  <Comment />
                  {comment}
                </IconButton>
                <IconButton
                  aria-label="hot count"
                  sx={{ flexGrow: 1 }}
                  onClick={increaseHotCount}
                >
                  <Visibility />
                  <Typography variant="body2" sx={{ fontSize: "1.2rem" }}>
                    {hotCount}
                  </Typography>
                </IconButton>
              </Box>
            </CardActions>
          </Card>
        )
      )}
    </Box>
          <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          An error occurred while fetching tweets.
        </Alert>
      </Snackbar>
    </>
  );
};
export default Tweets;
