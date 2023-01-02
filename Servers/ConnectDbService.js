const mongoose = require("mongoose");

mongoose.set('strictQuery', true);
async function connectDatabase (){
    try {
        await mongoose.connect(`mongodb://0.0.0.0:${process.env.PORT_MONGODB}/${process.env.DATABASE_NAME}`);
        console.log('Connected to Mongo');

    } catch(error){
            console.log('connect database error',error);
    }

}

module.exports = connectDatabase;