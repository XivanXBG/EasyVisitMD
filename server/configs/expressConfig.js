const express = require('express');
const cookieParser = require('cookie-parser')

const expressConfig = (app)=>{
   
    app.use(express.urlencoded({extended:false}));
    app.use(cookieParser());
} 

module.exports = expressConfig;