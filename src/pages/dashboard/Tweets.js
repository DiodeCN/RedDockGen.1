import React, { useState, useEffect } from 'react';
import {
  Box,
  Snackbar,
  Alert,
  Card
} from '@mui/material';
import axios from 'axios';
import TweetCard from "./TweetCard";

const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return width;
};

const Tweets = () => {
  const [tweets, setTweets] = useState([]);
  const [hotCount, setHotCount] = useState(0);
  const [comment, setComment] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const windowWidth = useWindowWidth();
  
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

  const isDesktopOrTablet = windowWidth >= 768;
  
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: isDesktopOrTablet ? "row" : "column", gap: "1rem", p: 4 }}>
        <Box sx={{ flex: 2, display: "flex", flexDirection: "column", gap: "1rem" }}>
          {tweets.map((tweet) => (
            <TweetCard
              key={tweet.id}
              tweet={tweet}
              increaseHotCount={increaseHotCount}
              hotCount={hotCount}
              comment={comment}
            />
          ))}
        </Box>
        {isDesktopOrTablet && (
          <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: "1rem" }}>
             <Card sx={{
        p: 2,
        borderRadius: "12px",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        width: "100%"
      }}
    >
      <h2>ddd</h2>
      </Card> 
          </Box>
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
