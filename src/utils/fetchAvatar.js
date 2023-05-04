import React, { useState, useEffect } from 'react';
import fetchAvatar from './fetchAvatar';

// Your component
const YourComponent = (props) => {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const userId = props.userId; // Replace this line with the appropriate user ID retrieval method

  useEffect(() => {
    const fetchAndSetAvatar = async () => {
      const cachedAvatarUrl = sessionStorage.getItem(`avatar_${userId}`);
      if (cachedAvatarUrl) {
        setAvatarUrl(cachedAvatarUrl);
      } else {
        const fetchedAvatarUrl = await fetchAvatar(userId);
        setAvatarUrl(fetchedAvatarUrl);
      }
    };

    fetchAndSetAvatar();
  }, [userId]);

  // Rest of your component
};
