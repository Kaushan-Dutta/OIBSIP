const mongoose=require('mongoose');
const {userModel}=require('../Models/usermodel')
const {customPizzaModel}=require('../Models/ordermodel');
const {orderModel}=require('../Models/ordermodel');

/* async function verifyUser(req, res, next) {
    try{
        const {username}=req.params.username;
        if(await userModel.findOne(username)){
            next();
        }
        else{return res.status(404).json({message:"Cannot get url"})}
    }
    catch(err){
        return res.status(500).json({message: err.message});
    }
} */
async function getUserDetails(req, res) {
    try{
        const {username}=req.params.username || req.body.username;
        const getUser=await userModel.findOne(username).populate('favourites').populate('cart');
        if(!getUser) return res.status(404).json({message:'User not found'});
        return res.status(200).json({message:getUser})
    }
    catch(err){
        return res.status(500).json({message: err.message});  
    }
}
async function getCustomPizzas(req,res){
    try{
        const getUser=await customPizzaModel.find({madeBy:req.body._id});
        return res.status(200).json({message:getUser});
    }
    catch(err){
        return res.status(500).json({message: err.message});  
    }
}
async function createCustomPizzas(req,res){
    try{
        const {_id,name,description,size}=req.body;
        const createPizza=new customPizzaModel({madeBy:_id,name,description,size});
        await createPizza.save();
        return res.status(200).json({message:createPizza});
    }
    catch(err){
        return res.status(500).json({message: err.message});  
    }
}
async function addtoFavourite(req,res){
    try{
        const {_id,pizzaId}=req.body;
        const addItem=await userModel.updateOne({_id},{$push:{favourites:pizzaId}});
        
        return res.status(200).json({message:addItem});
    }
    catch(err){
        return res.status(500).json({message: err.message});  
    }
}
async function userOrders(req,res){
    try{
        const orderedItems=await orderModel.find({orderedBy:req.body._id});        
        return res.status(200).json({message:orderedItems});
    }
    catch(err){
        return res.status(500).json({message: err.message});  
    }
}
async function makeOrder(req,res){
    //list of items
    //integration of razorpay
    //update in admin portal
    //integration of socketio
}
module.exports={getUserDetails,createCustomPizzas,getCustomPizzas,addtoFavourite,userOrders,makeOrder};