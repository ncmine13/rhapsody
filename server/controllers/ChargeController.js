var express = require('express');
var router = express.Router();

var stripe = require("stripe")("sk_test_7gBl1JgWsgWYgMauAq2mSqOE");


router.get('/', function(req, res){
	res.render('charge');
	console.log("rendered");
})


router.post('/', function(req, res){
	//console.log(req.body, "this req.body")
	if(req.body.isChecked === 'true'){
		console.log("okay")
		req.body.sname = req.body.name;
		req.body.semail = req.body.email;
		req.body.scity = req.body.city;
		req.body.saddress = req.body.address;
		req.body.saddress_zip = req.body.address_zip;
		req.body.saddress_country = req.body.address_country;
	} 
	var token = req.body.stripeToken;
	stripe.charges.create({
		source: token,
		currency: 'USD',
		amount: "500",
		metadata: {
			'name': req.body.name,
			'email': req.body.email,
			'city': req.body.city,
			'address': req.body.address,
			'address_zip': req.body.zip,
			'address_country': req.body.country,
			'sname' : req.body.sname,
			'semail': req.body.semail,
			'scity': req.body.scity,
			'saddress': req.body.saddress,
			'saddress_zip': req.body.saddress_zip,
			'saddress_country': req.body.saddress_country
		}
	})
	//console.log(req.body, "req body after")
	res.render('submission');
})

module.exports = router;

