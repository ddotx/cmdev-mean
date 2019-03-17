var express = require('express');
var router = express.Router();
var Products = require('./models/product_schema');
var jwt = require('./jwt');
var formidable = require('formidable');
const path = require('path');
const fs = require('fs-extra');

// intercept = (req,res,next)=>{
//   res.end("555");
// };

router.get('/product', jwt.verify //intetcept
// router.get('/product'
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

//Upload
router.post('/product', (req,res)=>{
  try {
    var form = new formidable.IncomingForm();
    var newname = Date.now();
    form.parse(req, async(err, fields, files) => {
               
      var fileExtention = files.upload_file.name.split(".")[1];
      newname = `${newname}.${fileExtention}`
      var newpath = path.resolve(__dirname + "/uploaded/images/") +  "/" + newname;      
      
      var oldpath = files.upload_file.path;
      await fs.move(oldpath, newpath);
      //then
      fields.image = newname
      var result = await Products.create(fields);
      //then
      console.log("Add product with file: " + JSON.stringify(result))
      res.json(result)
    });
  } catch (err) {
    console.log("err : " + err);
  }
})

router.get("/product/id/:id", jwt.verify, function(req, res) {
  console.log("Show product with id v2 ");

  Products.findOne({ product_id: req.params.id }, (err, result) => {
    if (err) throw err;

    if (result) {
      res.json(result);
    } else {
      res.json([]);
    }
  });
})

//Delete
router.delete('/product/id/:id', async (req,res)=>{
  var productID = req.params.id;
  console.log("delete: " + productID);
  await Products.findOneAndDelete({product_id: productID});
  //then
  res.json({result: 'OK'});
})

router.put("/product", (req, res)=>{
  try {
    var form = new formidable.IncomingForm();
    var newname = Date.now();
    form.parse(req, async(err, fields, files) => {


      // Check if there is uploaded image file
      if (files.upload_file != null){       
        var oldpath = files.upload_file.path;
        var fileExtention = files.upload_file.name.split(".")[1];
        newname = `${newname}.${fileExtention}`
        var newpath = path.resolve(__dirname + "/uploaded/images/") +  "/" + newname;      
        await fs.move(oldpath, newpath);      
        fields.image = newname            
      }       

      // Update Product
      var result = await Products.findOneAndUpdate({product_id: fields.product_id},fields);      
      res.json({result:"success"});
    });
  } catch (err) {
    console.log("err : " + err);
  }
  })


  //search
router.get('/product/name/:keyword', (req,res)=>{
  let query = { name: new RegExp("^.*" + req.params.keyword + ".*$", "i") };
  Products.find(query, (err,doc)=>{
    if(err){
      res.json({"result":'error!!'});
    }else{
      if(doc){
        res.json(doc);
      }else{
        res.json([]);
      }
    }
  })
})

module.exports = router;