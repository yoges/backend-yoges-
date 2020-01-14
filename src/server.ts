import app from './app'
import mongoose from 'mongoose'

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/', { useNewUrlParser: true});

let db: any = mongoose.connection;

// Added check for DB connection

if(!db)
    console.log("Error connecting db")
else
    console.log("DB connected successfully")

const port: any = process.env.PORT || 3000

const server = new app().Start(port)
  .then(port => console.log(`Server running on port ${port}`))
  .catch(error => {
    console.log(error)
    process.exit(1);
  });

export default server;