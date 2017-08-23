var express = require('express');
var router = express.Router();
var fs = require('fs');
var async = require('async');

/* GET home page. */
router.get('/', function(req, res, next) {
	var work = {
		Guests: async.apply(fs.readFile, './data/Guests.json'),
		Companies: async.apply(fs.readFile, './data/Companies.json'),
		Messages: async.apply(fs.readFile, './data/Messages.json')

	};
	async.parallel(work, function(error, results){
		if(error){
			res.status(500).send(error);
			return
		}
		res.render('index', {title:'CRM Admin Portal', guests: JSON.parse(results['Guests']), companies: JSON.parse(results['Companies']), messages: JSON.parse(results['Messages'])})
	})

});

/*GET message. */
router.get('/getMessage/:idMessage/:guestFirst/:companyName', function(req,res,next){
	var idMessage = req.params.idMessage
	var guestFirst = req.params.guestFirst
	var companyName = req.params.companyName

	fs.readFile('./data/Messages.json', 'utf8', function (err, data) {
    	if (err) throw err;
    	var messages = JSON.parse(data)
    	var selectedMessage = messages.filter(function(message){
    		console.log(message.id)
    		return message.id == idMessage
    	})[0];
    	
    	res.send({message: personalize(selectedMessage.text)});
	
	});

	var personalize = function(msg){
		var today = new Date()
		var curHr = today.getHours()
		var timeAppGreet;
		
		//replace first name and company name
		msg = msg.replace("firstName", guestFirst)
		msg = msg.replace("companyName", companyName)

		//replace greeting with time-appropriate
		if (curHr < 12) {
		  timeAppGreet = 'Good morning'
		} else if (curHr < 18) {
		  timeAppGreet = 'Good afternoon'
		} else {
		  timeAppGreet = 'Good evening'
		}
		msg = msg.replace("greetingType", timeAppGreet)

		return msg
	}
})

/*POST message */
router.post('/addMessage', function (req, res) {
	var type = req.body.type
	var tone = req.body.tone
	var message = req.body.message

	//get the ID to enter
	fs.readFile('./data/Messages.json', 'utf8', function(err,data){
		if (err) throw err
		var messages = JSON.parse(data)
		var newID = messages.length + 1

		//add the new object to our array
		messages.push({"id" : newID, "tone" : tone, "type" : type, "text" : message})

		//overwrite the current messages.json file with our new one
		fs.writeFile('./data/Messages.json', JSON.stringify(messages, null, 4), function(err){
			if (err) throw err
			console.log('writing new messages file')
			res.redirect('/')
		})
	})
})

module.exports = router;
