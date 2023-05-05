import axios from 'axios';

const fetchAvatar = async (userId) => {
  const token = sessionStorage.getItem('token') || localStorage.getItem('token');

  try {
    const response = await axios.post(`https://avatar.cloudepot.cn/api/avatar/${userId}`, {
      token: token,
    });
    const fetchedAvatarUrl = response.request.responseURL;
    sessionStorage.setItem(`avatar_${userId}`, fetchedAvatarUrl);
    return fetchedAvatarUrl;
  } catch (error) {
    console.log('Error fetching avatar:', error);
    return null;
  }
};

export default fetchAvatar;
