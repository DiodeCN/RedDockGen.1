import React, { useState, useEffect } from 'react';
import {
  Box,
  Snackbar,
  Alert
} from '@mui/material';
import axios from 'axios';
import TweetCard from "./TweetCard";


const Tweets = () => {
  const [tweets, setTweets] = useState([]);
  const [hotCount, setHotCount] = useState(0);
  const [comment, setcomment] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.cloudepot.cn/api/tweets");
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
  };

  return (
    
    <>      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem", p: 4 }}>
    {tweets.map((tweet) => (
      <TweetCard
        key={tweet.id}
        tweet={tweet}
        increaseHotCount={increaseHotCount}
        hotCount={hotCount}
        comment={comment}
      />
    ))}
  </Box><Snackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          An error occurred while fetching tweets.
        </Alert>
      </Snackbar></>

  );
};
export default Tweets;
