/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	getUser: function(req, res){

        if(req.session && req.session.userId){

            sails.log.debug("Authenticated");

    		User.find({}).exec(function(err, result){
                if (err) {
                    sails.log.debug('Some error occured ' + err);
                    return res.json(200,{ 
                    	status: 400,
                    	success:false,
                    	error: err,
                    	data: null });
                }
                sails.log.debug('Success', JSON.stringify(result));
                return res.json(200,{ 
                	status: 200,
                    success:true,
                    error:null,
                    data: result
                });
            });
        }
        else{

        sails.log.debug("Unauthenticated");
            return res.json(200,{ 
                    status: 401,
                    success:false,
                    error:'Session Expired',
                    data: null
                });

        }
	},
	
	createUser: function(req, res){

		User.create({
			name : req.body.name,
			email : req.body.email,
			}).exec(function(err, result){
            if (err) {
                sails.log.debug('Some error occured ' + err);
                return res.json(200,{ 
                	status: 400,
                	success:false,
                	error: err,
                	data: null });
            }
            sails.log.debug('Success', JSON.stringify(result));
            return res.json(200,{ 
            	status: 200,
                success:true,
                error:null,
                data: result.name
            });
        });
		
	
	}

	

	
};


