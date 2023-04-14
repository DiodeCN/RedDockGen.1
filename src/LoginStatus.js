import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LoginStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // 用您的实际 API 端点替换以下 URL
        const response = await axios.get('https://api.cloudepot.cn/', {
          headers: {
            // 用您的实际 token 替换以下字符串
            Authorization: 'Bearer your-token',
          },
        });

        if (response.status === 200) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <div>{isLoggedIn ? 'Logged in' : 'Not logged in'}</div>;
};

export default LoginStatus;
