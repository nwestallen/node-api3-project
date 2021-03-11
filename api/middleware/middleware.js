const User = require('../users/users-model');

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log({
    method: req.method,
    url: req.url,
    timestamp: Date.now()
  });
  next();
}

function validateUserId(req, res, next) {
  // DO YOUR MAGIC
  const id = req.params.id;
  User.getById(id)
    .then(user => {
      if(!user) {
        res.status(404).json({ message: "user not found"})
      } else {
        req.user = user
        next()
      }
    })
    .catch(err => next(err));
  }

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const user = req.body
  console.log(user)
  if(Object.keys(user).length === 0) {
    res.status(400).json({ message: "missing user data" });
  } else if (!user.name) {
    res.status(400).json({ message: "missing required name field" });
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {logger, validateUserId, validateUser};
