'use strict'

var bankingApp = angular.module("bankingApp", [])

bankingApp.controller("statementController", function($scope, $window) {
  //$scope.newDate = ''
  $scope.addTransaction = function() {
     if ($scope.newDate === undefined) {
       $window.document.getElementById('idNewDate').focus()
       return
     }
     if ($scope.newDescription === undefined) {
       $window.document.getElementById('idNewDescription').focus()
       return
     }
     if ($scope.newAmount === undefined) {
       $window.document.getElementById('idNewAmount').focus()
       return
     }

     $scope.newDate = undefined
     $scope.newDescription = undefined
     $scope.newAmount = undefined

  }


  $scope.statement = [
    {
       date : "12-12-12",
       description : "Initial deposit  " ,
       credit : "42",
       debit : "",
       balance : "42"
    }
  ]

})
