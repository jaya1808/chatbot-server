/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getUser: function(req, res){

		User.find({}).then(function (response){
		 
		  sails.log.debug('--->>>');
		  sails.log.debug(response);

		  return res.json(response);
		}).catch(function(error){
			sails.log.debug(error);
		});
	},
	
	createUser: function(req, res){

		User.create({
			name : req.body('name'),
			email : req.body('email'),
			}).exec(function(err, result){
            if (err) {
                sails.log.debug('Some error occured ' + err);
                return res.json({ 
                	status: 400,
                	success:false,
                	error: err,
                	data:null });
            }
            sails.log.debug('Success', JSON.stringify(result));
            return res.json({ 
            	status: 200,
                success:true,
                error:null,
                data: null
            });
        });
		
	
	}

	

	
};


