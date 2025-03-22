const { Sequelize } = require("sequelize");

//declare database configuration for connection

const sequelize=new Sequelize("UserManagement","root","root",{
    dialect:"mysql",
    host:"localhost"
})

 async function connectDb(){
    try{
       await sequelize.authenticate();
        console.log("Database Connectd Succesfully");

        //creating tables
        await sequelize.sync({ force: false });
    console.log("Tables created successfully (if not exist)");
    }
    catch(err){
        console.log("Unable to connect to the Database", err)
    }

}
module.exports={connectDb,sequelize}