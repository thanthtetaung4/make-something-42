import React from 'react';

const Home = () => {
  console.log('====================================');
  console.log("from home");
  console.log('====================================');
  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <p>This content is only accessible to logged-in users.</p>
    </div>
  );
};

export default Home;
