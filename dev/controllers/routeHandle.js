
const TestModel = require('../models/item');

module.exports.testRoute = ( req , res , next ) => {
   TestModel.find()
            .then( data => res.status( 200 ).send( data ))
            .catch( next );
};
