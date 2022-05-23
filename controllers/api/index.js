const router = require('express').Router()
const dashboardRoute = require('./dashboardRoute')
const userRoute = require('./userRoute')

router.use('/dashboard', dashboardRoute);
router.use('user', userRoute);

module.exports =router;