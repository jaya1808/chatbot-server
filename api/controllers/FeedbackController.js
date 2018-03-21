/**
 * FeedbackController
 *
 * @description :: Server-side logic for managing feedbacks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	

	sendFeedback: function(req, res){

		Feedback.create({
            feedback : req.body.feedback,
            rating : req.body.rating,
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

    getFeedback: function(req, res){

        if(req.session && req.session.userId){

             sails.log.debug("Authenticated");

    		Feedback.find({}).exec(function(err, result){
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


};

