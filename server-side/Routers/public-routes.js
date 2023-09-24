const PublicController=require('../Controllers/public');

const express=require('express');

const router=express.Router();

/* POST Methods */
router.route('/sendNewsletter').post(PublicController.sendNewsletter);


/* GET Methods */
router.route('/getPizzas').get(PublicController.getPizzas);
//router.route('/resetSession').get(AuthController.resetSession);

/* PUT Methods */

module.exports = router;

