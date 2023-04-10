import React, { useState, useEffect} from 'react';
import { Box, Card, CardContent, CardActions, IconButton, Typography, Avatar } from '@mui/material';
import { ThumbUp, Star, Repeat } from '@mui/icons-material';
import axios from 'axios';

const Tweets = ()  => {
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
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', p: 4 }}>
    {tweets.map(({ id, avatar_url, name, content, hours_since_post, likes, favorites, retweets }) => (
      <Card key={id} sx={{ p: 2, borderRadius: '12px', boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)', width: '100%' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Avatar src={avatar_url} alt={`${name}'s avatar`} sx={{mr: 1 }}/>
            <Typography component="div" variant="subtitle2" sx={{ color: 'primary.main', fontSize: '1.5rem' }}>
              {name}
            </Typography>
            <Typography component="div" variant="caption" sx={{ color: 'secondary.main', fontSize: '1.12rem'}}>
              @{id}
            </Typography>
            <Typography component="div" variant="caption" sx={{ color: '#999', fontSize: '1.12rem'}}>
              {hours_since_post}h
            </Typography>
          </Box>
        </Box>
        <CardContent>
          <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>{content}</Typography>
          </CardContent>
    <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <IconButton aria-label="like" sx={{ flexGrow: 1 }}>
          <ThumbUp />
          <Typography variant="body2" sx={{ fontSize: '1.2rem' }}>
            {likes}
          </Typography>
        </IconButton>
        <IconButton aria-label="favorite" sx={{ flexGrow: 1 }}>
          <Star />
          <Typography variant="body2" sx={{ fontSize: '1.2rem' }}>
            {favorites}
          </Typography>
        </IconButton>
        <IconButton aria-label="retweet" sx={{ flexGrow: 1 }}>
          <Repeat />
          <Typography variant="body2" sx={{ fontSize: '1.2rem' }}>
            {retweets}
          </Typography>
        </IconButton>
      </Box>
    </CardActions>
  </Card>
))}
</Box>
      );
}
export default Tweets;
