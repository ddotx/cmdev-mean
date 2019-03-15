var express = require('express');
var router = express.Router();
var Users = require('./models/user_schema');
var bcrypt = require('bcryptjs');
var jwt = require('./jwt')

router.post('/login', (req, res)=>{
    console.log("login: " + JSON.stringify(req.body))

    Users.findOne({username: req.body.username}, (err, doc)=>{
        if (err){
            res.status(500).json({result: "not found", message: err})
        }else{
            // verify password
            const isValidPassword = bcrypt.compareSync(req.body.password, doc.password)
            if (isValidPassword){
                const payload = { id: doc._id, level: doc.level, username: doc.username };
                const token = jwt.sign(payload);
                res.json({ auth: true, token: token, msg: "success" });    
            }else{
                res.status(502).json({ auth: false, token: "", msg: "Invalid password" });
            }  
        }  
    })
})

router.post('/register',(req,res)=>{
    console.log("register:" + JSON.stringify(req.body));
    
    req.body.password = bcrypt.hashSync(req.body.password, 8);

    Users.create(req.body ,(err, doc)=>{
        if(err){
            res.status(500).json({result: 'failed', message: err})
        }else{
            res.json({result: 'register ok', message:doc})
        }
    })
   
});

module.exports = router;

