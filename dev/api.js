
// spa routes ( food admin )
const express  = require('express');
const mongoose = require('mongoose');
const api      = express.Router();
const config   = require('../config/settings.js');

const {
  getItems , getItemById , getItemByField
} = require('./queries');

// route
const Route1 = require('./controllers/routeHandle');
const Tests  = require( './testSuite/routeTests');
const ErrorRoutes  = require( './testSuite/errorTests');

const Items = require('./models/item').items;

const asyncHandler = ( callback ) => {
    return ( req , res , next ) => {
        callback( req , res , next )
          .catch( next )
    }
}

const asyncRun = async ( ) => {
    try {
        return await Items.find( { age: 'brad' } );
    } catch ( err ) {
        throw new Error( 'error with query' );
    }
}

const testFunction__reject = ( ) => new Promise( ( resolve , reject ) => {
      reject( 'err' );
});

const testFunction__resolve = ( ) => new Promise( ( resolve , reject ) => {
      resolve( 'succ' );
});

const testFunction__inner = ( user ) => new Promise( async ( resolve , reject ) => {
      try {
          console.log( user );
          await testFunction__reject();
          resolve('correct');
      }
      catch( err ) {
          reject( 'some error' );
      }
});

api.get( '/function' , async ( req , res , next ) => {
      try {
          await testFunction__inner( { name: 'brad' } );
          console.log( 'after inner');
          res.status( 200 ).send( 'success' );
      }
      catch ( err ) {
          res.status( 500 ).send( { status: 'error' , msg: err } );
      }
});

api.get( '/data' , asyncHandler ( async (  req , res , next ) => {
      let test = await asyncRun( );
      res.status( 200 ).send( test );
}));

api.get( '/modeldata' , ( req , res , next ) => {
    getItemByField( { name : 'brad' } , 'age' )
        .then( data => res.send( data ) )
        .catch( next );
});

api.get('/home' , Route1.testRoute );

api.route('/test')
   .get ( Tests.testSuite_get )
   .post( Tests.testSuite );

api.get('/test1' , ErrorRoutes.errorMultiple );
api.get('/test2' , ErrorRoutes.asyncHandle );
api.get('/test3' , ErrorRoutes.saveToDb );


module.exports = api;
