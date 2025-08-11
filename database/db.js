const mongoose  = require('mongoose');

const connectDatabase = async() => {
    try {

        mongoose.connect(process.env.MONGO_URI);

        console.log('Database connected successfully....');
    }catch(e) {
        console.log("Error in connecting the database...",e);
        process.exit(1)
    }
};

module.exports = { connectDatabase };