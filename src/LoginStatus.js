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

                    // 如果响应状态不是 200，则清除缓存并导航至 404 页面
                    if (response.status !== 200) {
                        localStorage.removeItem('token');
                        sessionStorage.removeItem('token');
                        
                        // 将 response.status 写入浏览器缓存
                        localStorage.setItem('responseStatus', "你被封号啦");
                        
                        navigate('/404');
                    }
                } catch (error) {
                    console.error('Error sending token:', error);
                    
                    // 清除缓存并导航至 404 页面
                    localStorage.removeItem('token');
                    sessionStorage.removeItem('token');
                    localStorage.setItem('responseStatus', "你被封号啦");
                    navigate('/404');
                }
            } else {
                // 当 token 不存在且当前页面不是 /login 或 /register 或 /404 时，跳转到 /login
                if (location.pathname !== '/login' && location.pathname !== '/register' && location.pathname !== '/404') {
                    navigate('/login');
                }
            }
        };

        checkToken();
    }, [location, navigate]);

    return null;
};

export default LoginStatus;
