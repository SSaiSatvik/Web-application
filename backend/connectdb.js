const mongoose=require('mongoose')

const connectdatabase = async () => {
    mongoose.set('strictQuery',true);
    await mongoose    
        .connect("mongodb://mongo-db/App",{
            useNewUrlParser: true,
        })
        .then(()=>console.log("connected to database"))
        .catch((err)=>console.log(err))
}

module.exports=connectdatabase;
