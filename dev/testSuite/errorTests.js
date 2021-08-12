// test saving an object as an async function and if it fails, passing next to the .catch. does it work?.
const mongoose = require('mongoose');

const Items = require('../models/item').items;

var ItemHandler = {
		dataGet1 : async ( value ) => {
				try {
						return await Items.findOne( { name : 'brad' });
				}
				catch ( err ) {
						throw new Error( 'couldnt save to db 1' );
				}
		} ,
		dataGet2 : async ( ) => {
					try {
							return await Items.findOne( { name : 'brad' });
					}
					catch ( err ) {
							throw new Error( 'couldnt save to db 2');
					}
		} ,
	  dataGetLoop :  async ( ) => {
				  var data = [ ];

					for ( var i = 0; i < 2; i++ ) {
						  console.log( 'a loop' , i );
							try {
								 let data1 = await dataGet1();
								 data.push( data1 );
							} catch ( err ) {
							  	throw new Error(` ${ err } at loop ${ i }`);
							}
					}
					return data;
		}
}

const saveAlldata = async ( id ) => {
			try {
				   let check = await ItemHandler.dataGetLoop();
   				 let data1 = await ItemHandler.dataGet1();
           let data2 = await ItemHandler.dataGet2();
           return 'data';
      }
      catch(err) {
				   console.log('revert any changes to id:' , id );
           throw new Error( err );
      }
}

const asyncHandleError = ( callback ) => {
    return ( req , res , next ) => {
        callback( req , res , next )
          .catch( next )
    }
}

const calculateCost = async( ) => {

    return new Promise( async( resolve , reject ) => {

          for ( let i = 0; i < 3; i++ ) {
						    console.log( 'loop: ' , i );
                if ( i = 1 ) {
										return reject('calculate error');
								}
          }
          resolve( totalCost );
    });
}

module.exports.errorMultiple = asyncHandleError( async( req, res , next ) => {
    // let data = await saveAlldata( 'order 1');
		await calculateCost();
    res.status( 200 ).send( data );
});

module.exports.asyncHandle = asyncHandleError( async( req , res , next ) => {
		let data1 = await ItemHandler.dataGet1()
												.then( data => {
													  let newData = data.toObject();
														newData.changed = true;
														return newData;
												});
		let data2 = await ItemHandler.dataGet2();
		res.status( 200 ).send( { data1 , data2 } );
});

const saveToDb = ( obj ) => {
				return obj.save()
									.then( objNew => {
											let objMutated = objNew.toObject();
													objMutated.changed = true;
											return objMutated;
									})
									.catch( err => {
												throw new Error('couldnt save object to db');
									});
}

const findObj = async ( model , obj ) => {
		try {
			  const Model = model;
				return await Model.find( obj );
		} catch ( err ) {
				throw new Error('couldnt find something in Items at route ...');
		}
}

module.exports.saveToDb = asyncHandleError( async( req , res , next ) => {
		let newObj = new Items( { name: 'gennna' , age: 'brad' } );
	  let saved = await saveToDb( newObj );

		// let look = await findObj( Items , { name : 'renna' });
		res.status( 200 ).send( saved );
});
