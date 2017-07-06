var express = require('express');
var router = express.Router();



router.get('/', function(req, res){
	res.render('shop');
	console.log("rendered shop");
})

router.get('/item', function(req, res) {
	res.render('item');
	console.log("rendered item")
})
router.get('/personalize', function(req, res) {
	res.render('personalize');
	console.log("rendered item")
})

module.exports = router;