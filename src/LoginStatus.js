import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginStatus = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkToken = async () => {
            // 从 localStorage 和 sessionStorage 中读取 token
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');

            if (token) {
                // 发送 token 到指定 API
                try {
                    const response = await axios.post('https://api.cloudepot.cn/api/tokencheck', { token });
                    console.log(response.data);
                } catch (error) {
                    console.error('Error sending token:', error);
                }
            } else {
                // 当 token 不存在且当前页面不是 /login 或 /register 时，跳转到 /login
                if (location.pathname !== '/login' && location.pathname !== '/register') {
                    navigate('/login');
                }
            }
        };

        checkToken();
    }, [location, navigate]);

    return null;
};

export default LoginStatus;
