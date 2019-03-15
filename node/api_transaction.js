var express = require('express');
var router = express.Router();

router.get('/transection',(req,res)=>{
  res.json({result:'transection ok'})
})

module.exports = router;

