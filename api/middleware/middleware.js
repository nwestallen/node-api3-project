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
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {logger, validateUserId};
