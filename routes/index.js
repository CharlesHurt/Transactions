var express = require('express');
var path = require('path')
var fs = require('fs')
var Transaction = require('../models/transaction')

var router = express.Router();
const INDEX_HTML = path.join(__dirname, 'index.html')
const TRANSACTION_DATA = path.join(__dirname, '../data/transactions.json')

router.get('/transactions', function(req, res, next) {
  // [{"date":"2","desc":"3","amount":"42"}]
  Transaction.get((err, transactions) => {
    if (err) {
      res.status(400)
      res.send(err)
    } else {
      res.send(transactions)
    }
  })
});

router.post('/transactions', function(req, res, next) {
  var newTransaction = req.body
  Transaction.create(newTransaction, function(err) {
    if (err) {
      res.status(400)
      res.send(err)
    } else {
      res.send()
    }
  })
});

router.put('/transactions/:id', function(req, res, next) {
  var id = req.params.id
  var updatesObj = req.body

  Transaction.update(id, updatesObj, function(err, updatesObj) {
    if (err) {
      res.status(400)
      res.send(err)
    } else {
      res.send(updatesObj)
    }
  })
});

router.delete('/transactions/:id', function(req, res, next) {
  var id = req.params.id
  Transaction.delete(id, function(err) {
    if (err) {
      res.status(400)
      res.send(err)
    } else {
      res.send()
    }
  })
});

router.get('/', function(req, res, next) {
  console.log('returning from root');
  res.sendFile(INDEX_HTML)

});

module.exports = router;
