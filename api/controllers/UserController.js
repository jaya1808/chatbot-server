/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getUser: function(req, res){

		User.find().then(function (response){
		 
		  sails.log.debug('--->>>');
		  sails.log.debug(response);

		  return res.json(response);
		}).catch(function(error){
			sails.log.debug(error);
		});
	},
	createUser: function(req, res){

		User.create({
			name : req.param('name'),
			password : req.param('password'),
			gender : req.param('gender'),
			}).exec(function(err, result){
            if (err) {
                sails.log.debug('Some error occured ' + err);
                return res.json(500, { error: 'Some error occured' });
            }
            sails.log.debug('Success', JSON.stringify(result));
            return res.json(200, { success: 'Success' });
        });
		// sails.log.debug("req data---->>>>");
		// sails.log.debug(req.body);
		// var response= {
		// 	data: req.body,
		// 	status:{
		// 		code: 200, 
		// 		msg:"successful"
		// 	}
		// };
	

	//return res.json(response);
	
	}

	

	
};


