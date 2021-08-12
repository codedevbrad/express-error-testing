
module.exports.errors = function( app ) {

  // error 404

  app.use( ( req , res , next ) => {
    res.status(404).send('hey');
  });

  // error 500
  app.use( ( err , req , res , next ) => {

     res.status( err.status || 500 );
     res.send( { msg : err.message || err ,
                 portMsg : 'the app doesnt seem to be working as intended. please refresh your broweser.'
             });
  });
}
