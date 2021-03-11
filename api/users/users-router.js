const express = require('express');

// You will need `users-model.js` and `posts-model.js` both
const User = require('./users-model');
const Post = require('../posts/posts-model');
// The middleware functions also need to be required
const {logger, validateUserId, validateUser, validatePost} = require('../middleware/middleware');

const router = express.Router();
router.use(logger);

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  User.get()
    .then(users => {
      res.json(users)
    })
    .catch(err => res.status(500).json({message: "Error"}))
});

router.get('/:id', validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user);
});

router.post('/', validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  User.insert(req.body)
    .then(user => res.status(201).json(user))
    .catch(err => res.status(500).json({message: "Error"}));
});

router.put('/:id', validateUserId, validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  User.update(req.params.id, req.user)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({message: "Error"}));
});

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  User.remove(req.params.id)
    .then(user => res.status(202).json(user))
    .catch(err => res.status(500).json({message: "Error"}));
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  User.getUserPosts(req.user.id)
    .then(posts => {
      res.json(posts);
    })
    .catch(err => res.status(500).json({message: "Error"}));
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  Post.insert({...req.body, user_id: req.params.id})
    .then(post => {
      res.status(201).json(post)
    })
    .catch(err => res.json({message: "Error"}));
});

// do not forget to export the router
module.exports = router;
