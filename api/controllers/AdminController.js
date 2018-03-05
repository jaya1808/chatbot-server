/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	getAdmin: function(req, res){

		Admin.find({}).exec(function(err, result){
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
	},
	
	createAdmin: function(req, res){

		Admin.create({
			name : req.body.name,
			password : req.body.password,
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

