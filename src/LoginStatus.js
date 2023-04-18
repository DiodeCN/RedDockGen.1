
import { useEffect } from 'react';
import axios from 'axios';

const LoginStatus = () => {
    useEffect(() => {
        const checkToken = async () => {
            // 从 localStorage 和 sessionStorage 中读取 token
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');

            if (token) {
                // 发送 token 到指定 API
                try {
                    const response = await axios.post('https://api.cloudepot.cn/api/token', { token });
                    console.log(response.data);
                } catch (error) {
                    console.error('Error sending token:', error);
                }
            }
        };

        checkToken();
    }, []);

    return null;
};

export default LoginStatus;
