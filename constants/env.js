const envCheck = () => {
    if (process.env.NODE_ENV === 'production') {
      return true;
    }
    return false;
  };
  
  module.exports = envCheck;
  