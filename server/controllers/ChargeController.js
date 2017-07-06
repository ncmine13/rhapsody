var express = require('express');
var router = express.Router();

var stripe = require("stripe")("sk_test_TfH0L8yjeCoB18vhmGAzIFcz");


router.get('/', function(req, res){
	res.render('charge');
	console.log("rendered");
})


router.post('/', function(req, res){
	console.log(req.body, "this req.body")
	var token = req.body.stripeToken;
	console.log(token)
	stripe.charges.create({
		source: token,
		currency: 'USD',
		amount: "500",
		metadata: {
			'name': req.body.name,
			'email': req.body.email,
			'city': req.body.city,
			'address': req.body.address,
			'zip': req.body.zip,
			'country': req.body.country,
			'sname' : req.body.sname,
			'semail': req.body.semail,
			'scity': req.body.scity,
			'saddress': req.body.sadress,
			'szip': req.body.szip,
			'scountry': req.body.scountry
		}
	})
	res.render('submission');
})

module.exports = router;

