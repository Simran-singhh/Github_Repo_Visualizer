const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homepageController');

router.get('/', homeController.homepage_view);
router.post('/', homeController.homepage_git_username);
router.get('/:username', homeController.homepage_render_profile);


module.exports = router;