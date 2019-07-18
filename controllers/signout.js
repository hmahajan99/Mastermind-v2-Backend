const redisClient = require('./signin').redisClient;

const removeToken = (token) => {
  redisClient.del(token);	
}

const handleSignOut = (req, res) => {
  const { authorization } = req.headers;
  removeToken(authorization);
  return res.send('Signed Out');
}

module.exports = {
  handleSignOut: handleSignOut,
  removeToken: removeToken
};
