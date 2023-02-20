const express = require('express');
const mongoose =  require("mongoose");
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutesauth')
const postRoutes = require('./routes/postRoutes')
const authMiddleware = require('./middleware/authMiddleware')
const port = process.env.PORT;
const mongoBD= process.env.MongoDbURI

const app = express();
app.use(express.json());

//connect to mongo db
mongoose.connect(`mongoDB`,{
   useNewUrlparser:true,
   useUnifiedTopology:true,
})
.then(()=> console.log("MongoDb connected"))
.catch(err => console.log(err));

// connnect to routes

//user routes
 
app.use('./user',userRoutes);

//Authnetication routes
app.use('/auth',authRoutes);

//post Routes
app.use('/post',authMiddleware)


app.listen(port, () => {
  console.log(`Server is working in ${port}`);
});