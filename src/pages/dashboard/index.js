import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DashboardDefault.css';

const DashboardDefault = () => {
    const [tweets, setTweets] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('your-go-backend-api-url');
                setTweets(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="dashboard">
            {tweets.map((tweet) => (
                <div key={tweet.id} className="tweet-container">
                    <div className="tweet-header">
                        <img className="tweet-avatar" src={tweet.avatar_url} alt={`${tweet.name}'s avatar`} />
                        <div className="tweet-info">
                            <div className="tweet-name">{tweet.name}</div>
                            <div className="tweet-id">@{tweet.id}</div>
                            <div className="tweet-time">{tweet.hours_since_post}h</div>
                        </div>
                    </div>
                    <div className="tweet-content">{tweet.content}</div>
                    <div className="tweet-actions">
                        <div className="tweet-action">👍 {tweet.likes}</div>
                        <div className="tweet-action">⭐ {tweet.favorites}</div>
                        <div className="tweet-action">🔁 {tweet.retweets}</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DashboardDefault;
