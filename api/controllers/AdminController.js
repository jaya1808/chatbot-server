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
            id: req.body.id,
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
    },

    adminLogin: function(req, res){
        
       Admin.find({id: req.body.id}).exec(function (err,result){
        
        if (err) {
                sails.log.debug('Some error occured ' + err);
                return res.json(200,{ 
                    status: 400,
                    success:false,
                    error: err,
                    data: null });
            }

        if(result){
            if(result.length == 0)
            {
                sails.log.debug('Id not found');
                return res.json(200,{ 
                    status: 400,
                    success:false,
                    error: 'Id Not Found',
                    data: null });
            }
            else{
            sails.log.debug('Success', JSON.stringify(result));
            req.session.userId = result[0].id;   // returned from a database
            return res.json(200,{ 
                status: 200,
                success:true,
                error:null,
                data: result[0].name
            });
                }
        }
        });


    }
       

	
};

