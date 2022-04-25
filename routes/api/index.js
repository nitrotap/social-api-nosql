const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

router.use('/comments', userRoutes);
router.use('/pizzas', thoughtRoutes);

module.exports = router;
