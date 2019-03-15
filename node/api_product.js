var express = require('express');
var router = express.Router();
var Products = require('./models/product_schema');
var jwt = require('./jwt');

// intercept = (req,res,next)=>{
//   res.end("555");
// };

router.get('/product', jwt.verify //intetcept
, (req,res)=>{
  
  //query
  Products.find((err,doc)=>{
    if(err){
      res.json({result:'error', message: err})
    }else{
      res.json(doc);
    }
  })
})

module.exports = router;

