import { useState } from 'react';
import Tweets from './Tweets';

const DashboardDefault = () => {
  const [tweets, setTweets] = useState([]);



  return (

    <Tweets />


  );
};

export default DashboardDefault;
