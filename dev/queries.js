
const TestModel = require('./models/item').items;

const getItems = ( ) => {
    return TestModel.find();
};

const getItemById = ( id ) => {
    return TestModel.find();
}

const getItemByField = ( object , selection  ) => {
    return TestModel.find( object )
                    .select( selection );
}

module.exports = {
    getItems , getItemById , getItemByField
}
