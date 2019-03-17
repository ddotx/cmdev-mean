const express = require("express");
const router = express.Router();
const Trans = require("./models/trans_schema");
const jwt = require("./jwt");

router.get("/report", function(req, res) {
  var report = { product: [100, 70, 80, 81, 56, 55, 40] };
  res.json(report);
});

router.post("/transaction/", jwt.verify, function(req, res) {
  console.log("transaction post");
  req.body.staff_id = req.userId;
  Trans.create(req.body, (err, result) => {
    if (err) {
      res.json(err);
    }else{
    res.json(req.body);
    }
  });
});

router.get("/transaction/", function(req, res) {
  Trans.aggregate([
    { $match: {} },
    {
      $lookup: {
        from: "users",
        localField: "staff_id",
        foreignField: "_id",
        as: "staff_id"
      }
    },
    {
      $project: {
        "staff_id.password": 0
      }
    },
    { $unwind: "$staff_id" }
  ])
    .sort({ timestamp: -1 })
    .then(transaction => {
      const resObj = transaction.map(value => {
        value.staff_id = value.staff_id.username;
        return value;
      });
      res.json(resObj);
    })
    .catch(err => {
      res.status(400).json({ err: err.message });
    });
});

router.get("/transaction/id/:id", function(req, res) {
  Trans.aggregate([
    { $match: { transaction_id: Number(req.params.id) } },
    { $lookup: {
        from: "users",
        localField: "staff_id",
        foreignField: "_id",
        as: "staff_id"
      }
    },
    { $project: {  "staff_id.password": 0 } },
    { $unwind: "$staff_id" }
  ]).then(transaction => {
      const resObj = transaction.map(value => {
        value.staff_id = value.staff_id.username;
        return value;
      });
      res.json(resObj[0]);
    })
});

module.exports = router;