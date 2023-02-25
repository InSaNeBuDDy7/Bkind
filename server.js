const express = require('express')
const CORS = require('cors');
const mongoose = require('mongoose');
const Razorpay = require('razorpay');
const UserModel = require('./Models/User');
const User = require('./Models/User');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
const Donations = {"123" : 10000,"884" : 9586,"885" : 9382,"886" : 6434,"9976" : 5645};
console.log(typeof(Donations))
app.use(CORS())

const razorpayInstance = new Razorpay({
  
    // Replace with your key_id
    key_id: 'rzp_test_EA78F546jVbeUE',
  
    // Replace with your key_secret
    key_secret: '8GZdSzapFRVFKKx5jwDZks7J'
});

const URI = 'mongodb+srv://itsatharvasuryavanshi7:RDJ0DWUF0RBbk8E6@cluster0.gifylhz.mongodb.net/User?retryWrites=true&w=majority';
mongoose.connect(URI,{
    useNewUrlParser : true,
    useUnifiedTopology : true
},err => {
    if(err) throw err;
    console.log('Connected to MONGODB')
})


const db = mongoose.connection
const UserAtlas = db.collection('User')
const Payment  = db.collection('Payment')
console.log(Payment)
console.log(UserAtlas)
// app.get('/register',async(req,res)=>{
//     res.status(200).sendFile('C:/Users/Atharva Suryavanshi/Desktop/NGO/ngoSite/index.html');
// })
app.post('/register',async(req,res)=>{
    
    const {Fullname,Username,Email,Password} = req.body;
    const tempFullName = Fullname;
    const tempUserName = Username;
    const tempEmail = Email;
    const tempPass = Password;
    const UserIsPresent = UserModel.findOne({UserName: tempUserName});
    const newUser = new UserModel({FullName : tempFullName,UserName : tempUserName,Email : tempEmail,Password : tempPass});
    UserSave = await newUser.save();
    if(UserSave)
    {
        res.json({message : "Done"})
    }
})
app.post('/login',async(req,res)=>{
    const {Email,Password} = req.body;
    const UserIsPresent = UserModel.findOne({Email : Email});
    if(!UserIsPresent)
    {
        res.status(400).json({'message' : 'Doesnt exist'})
    }
    res.status(200).json({'message' : 'login Successful'})
})
app.get('/DonationPerks',async(req,res)=>{
    Limit = 10

    /*//db.collection('Payment').find().sort({Donations : -1}).limit(Limit).toArray(function(err,result){
        if(err){
            res.send({status : false,message : 'Not found'})
        }
        res.send({status:true,msg : Results})
        
    })*/

    res.json({status : true,message : Donations})
})

app.get('/',(req,res)=>{
    res.sendFile('C:/Users/Atharva Suryavanshi/Desktop/NGO/views/index.html');
})
app.get('/login',(req,res)=>{
    res.sendFile('C:/Users/Atharva Suryavanshi/Desktop/NGO/views/login.html')
})
app.get('/Events.html',(req,res)=>{
    res.sendFile('C:/Users/Atharva Suryavanshi/Desktop/NGO/views/Events.html')
})
app.get('/aboutus.html',(req,res)=>{
    res.sendFile('C:/Users/Atharva Suryavanshi/Desktop/NGO/views/aboutus.html')
})
app.get('/register',(req,res)=>{
    res.sendFile('C:/Users/Atharva Suryavanshi/Desktop/NGO/views/register.html')
})
//Inside app.js
app.get('/Donation.html',(req,res)=>{
    res.status(200).sendFile('C:/Users/Atharva Suryavanshi/Desktop/NGO/views/Donation.html')
})
app.post('/Donation.html', (req, res)=>{

	// STEP 1:
	const {UserID,amount,currency,receipt, notes} = req.body;	
	console.log(UserID,amount,currency,receipt,notes)
	// STEP 2:	
	razorpayInstance.orders.create({amount, currency, receipt, notes},
		(err, order)=>{
		
		//STEP 3 & 4:
		if(!err)
            res.sendFile('C:/Users/Atharva Suryavanshi/Desktop/NGO/views/success.html')
		else
        
			res.send(err);
		}
	)
    
});

const PORT = 5000;
app.listen(PORT,() => {
    console.log('Server is listening at port : ',PORT)
})