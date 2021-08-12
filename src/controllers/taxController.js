const Tax = require('../models/Tax');
var Long = require('mongodb').Long;

exports.saveTax = function(req, res) {
  var current_millies = new Date().getTime();

  const tax = new Tax({ ...req.body, user: req.user._id, timestamp: Long.fromNumber(current_millies) });
  tax.save((err, doc) => {
    if(err) {
      console.log(err);
      return res.status(400).json({ success : false, message: "Something went wrong" });
    }

    res.status(200).json({
      succes: true,
      taxCalculation: {
        age: tax.age,
        year: tax.year,
        income: tax.income,
        declaredInvestment: tax.declaredInvestment
      }
    });
  })
};

exports.getTaxes = function(req, res){
  Tax.find({ user: req.user._id },
      null,
      { sort: { 'timestamp': -1 },
      limit: 4,
      projection: { 'year': 1, 'age': 1, 'income': 1, 'declaredInvestment': 1, '_id': 0 }
    }, (err, taxes) => {

    if(err) return res.status(400).json({ isAuth: false, message: "Something went wrong" });

    res.status(200).json({
      succes: true,
      calculatedTaxes: taxes
    });
  })
}