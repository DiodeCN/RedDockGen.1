import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DashboardDefault.css';
import { Box, Card, CardContent, CardActions, IconButton, Typography, Avatar } from '@mui/material';
import { ThumbUp, Star, Repeat } from '@mui/icons-material';

const DashboardDefault = () => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.1.6:8080/api/tweets');
        setTweets(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {tweets.map(({ id, avatar_url, name, content, hours_since_post, likes, favorites, retweets }) => (
        <Card key={id} sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Avatar src={avatar_url} alt={`${name}'s avatar`} />
              <Typography component="div" variant="subtitle2" sx={{ color: '#4FC3F7' }}>
                {name}
              </Typography>
              <Typography component="div" variant="caption" sx={{ color: '#F7A8B8', mr: 1 }}>
                @{id}
              </Typography>
              <Typography component="div" variant="caption" sx={{ color: '#999' }}>
                {hours_since_post}h
              </Typography>
            </Box>
          </Box>
          <CardContent>
            <Typography variant="body1">{content}</Typography>
          </CardContent>
          <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton aria-label="like" sx={{ flexGrow: 1 }}>
                <ThumbUp />
                <Typography variant="body2">
                  {likes}
                </Typography>
              </IconButton>
              <IconButton aria-label="favorite" sx={{ flexGrow: 1 }}>
                <Star />
                <Typography variant="body2">
                  {favorites}
                </Typography>
              </IconButton>
              <IconButton aria-label="retweet" sx={{ flexGrow: 1 }}>
                <Repeat />
                <Typography variant="body2">
                  {retweets}
                </Typography>
              </IconButton>
            </Box>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default DashboardDefault;
