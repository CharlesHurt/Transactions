'user strict'

var fs = require("fs")
var path = require("path")
var uuid = require("uuid")

const TRANSACTION_FILE = path.join('__dirname', '../data/transactions.json')

exports.get = function(callback) {
  fs.readFile(TRANSACTION_FILE, function(err, raw_transactions) {
    if (err) {
      callback(err)
      return
    } else {
      var transactions = JSON.parse(raw_transactions)
      callback(err, transactions)
    }
  })
}

exports.create = function(newTransaction, callback) {
  this.get((err, transactions) => {
    if (err) {
      callback(err)
    } else {
      newTransaction.id = uuid()
      transactions.push(newTransaction)
      this.write(transactions, callback)
    }
  })
}

exports.write = function(transactions, callback) {
  fs.writeFile(TRANSACTION_FILE, JSON.stringify(transactions), callback)
}

exports.update = function(id, updatesObj, callback) {
  this.get((err, transactions) => {
    var beforeLength = transactions.length
    if (err) {
      callback(err)
    } else {
      var updatedTransactions = transactions.map(function(transaction) {
        if (transaction.id === id) {
          console.log('finish update the transaction here')
          //by going throught he keys of the updatesObj
          for (var key in updatesObj) {
            transaction[key] = updatesObj[key]
          }
          return transaction
        } else {
          return transaction
        }
      })
      this.write(updatedTransactions, callback)
    }
  })
}


exports.delete = function(id, callback) {
  this.get((err, transactions) => {
    var beforeLength = transactions.length
    if (err) {
      callback(err)
    } else {
      var remainingTransactions = transactions.filter(function(transaction) {
        if (transaction.id !== id) {
          return true
        } else {
          return false
        }
      })
      this.write(remainingTransactions, callback)
    }
  })
}
