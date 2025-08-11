const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const { connectDatabase } = require('./database/db.js');
const bookRouter = require('./routers/book-routes.js');
const authRouter = require('./routers/auth-routers.js');
const homeRouter = require('./routers/home.js');
const imageRouter = require('./routers/imageRouter.js');
const videoRouter = require('./routers/VideoRouter.js');
const pdfRouter =  require('./routers/pdf-routers.js');

const app = express();

const PORT = process.env.PORT || 5001;

// connect to the database
connectDatabase();

// middleware -> express middleware to parse the json
app.use(express.json());

// routes here
app.use('/api/books',bookRouter);
app.use('/api/auth',authRouter);
app.use('/api',homeRouter);
app.use('/api/image',imageRouter);
app.use('/api/video',videoRouter);
app.use('/api/pdf/',pdfRouter);

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}....`);
});