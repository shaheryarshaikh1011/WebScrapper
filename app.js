const express = require('express');
const puppeteer = require('puppeteer');
var mongoose=require("mongoose");
const Product=require("./models/product")
const { crawler } = require('./crawler');

const app = express();
require('dotenv').config()
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
//MongoDb configuration
mongoose.connect(process.env.CloudDB,function(err) {
	if(err)
	{
		//if connection fails
		console.log(err);
	}
	else
	{
		console.log("we are connected to Database");
	}
},);

 app.get("/",(req,res)=>
 {
    res.render("home.ejs")
 })

 app.post("/scrapData",(req,res)=>
 {
    var url=req.body.fullurl;
    async function adddata()
    {
        newProduct = await crawler(url);
        Product.create(newProduct,function(err,newlyCreated) {
		// body...if(err)
		if(err)
		{
			console.log(err);
		}
		else
		{	
			
			res.redirect("/");
		}
	})
    }
    adddata();
     
 })



 module.exports = app;
