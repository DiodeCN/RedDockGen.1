import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Avatar
} from "@mui/material";
import { ThumbUp, Star, Repeat, Visibility, Comment } from "@mui/icons-material";

const TweetCard = ({ tweet, increaseHotCount, hotCount, comment }) => {
  const {
    id,
    avatar_url,
    name,
    content,
    hour,
    minute,
    likes,
    favorites,
    tittle,
    sign,
    retweets
  } = tweet;

  return (
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
    alignItems: "flex-start",
    justifyContent: "space-between",
    mb: 1
  }}
>
<Box sx={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
    <Avatar src={avatar_url} alt={`${name}'s avatar`} sx={{ mr: 1, width: 75, height: 75 }} />
    <Box sx={{ display: "flex", flexDirection: "row" ,gap: "0.5rem"  }}>
      <Typography
        component="div"
        variant="subtitle2"
        sx={{ color: "primary.main", fontSize: "1.25rem" }}
      >
        &nbsp;{name}
        <br />   
        <span style={{ backgroundColor: 'yellow', borderRadius: '5px', padding: '2px 5px' }}>
        {tittle}
      </span>
      
      </Typography>
      <Typography
        component="div"
        variant="caption"
        sx={{ color: "secondary.main", fontSize: "1.25rem" }}
      >
       &nbsp;  UID{id}     &nbsp;     {hour}:{minute}

        <br />               
        &nbsp;    “{sign}”  
      </Typography>
      <Typography
        component="div"
        variant="caption"
        sx={{ color: "#999", fontSize: "1.25rem" }}
      >
      </Typography>
    </Box>
  </Box>
</Box>
<Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "0.5rem" }}>

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
  </Box>
</Card>
);
};

export default TweetCard;
