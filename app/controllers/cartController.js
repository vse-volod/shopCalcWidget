var app = angular.module('Calc', []);
app.controller('cartController', ['$scope', invoice]);

function invoice($scope) {
    $scope.items = [{
        name: 'Телефон',
        price: 100
    }, {
        name: 'Магнитофон',
        price: 200
    }, {
        name: 'Миелофон',
        price: 400
    }];

    $scope.addItem = function () {
        var itemsCopy = $scope.items;
        var addMeCopy = angular.copy($scope.addMe);
        itemsCopy.push(addMeCopy);
        $scope.items = itemsCopy;
        $scope.setTotals();
    }
    $scope.discount = 7;
    $scope.invoiceModulo = 0;
    $scope.invoiceTotal = 0;

    $scope.getMaxOfArray = function(numArray) {
  return Math.max.apply(null, numArray);
}

    $scope.setModulus = function(){
        $scope.invoiceModulo = 0;
        $scope.items.forEach(function(item, i, items) {
          item.dpriceModulus = (item.price - item.price/$scope.invoiceTotal * $scope.discount) - Math.floor(item.price - item.price/$scope.invoiceTotal * $scope.discount);
            $scope.invoiceModulo += item.dpriceModulus;
    }); 
        var allPrices = $scope.items.map(function(item, i, items) {
            return item.price;
        });
        var maxPrice = $scope.getMaxOfArray(allPrices);
        var i = allPrices.indexOf(maxPrice);
        var o = $scope.items[i].dprice;
        $scope.items[i].dprice += $scope.invoiceModulo;

    }
    $scope.setTotals = function(){
        $scope.invoiceTotal = 0;
        $scope.items.forEach(function(item, i, items){
            $scope.invoiceTotal += item.price;
    });
        
    }
    $scope.setTotals();

    $scope.setDiscount = function(item){
        $scope.items.forEach(function(item, i, items) {
         item.dprice = Math.floor(item.price - ((item.price/$scope.invoiceTotal) * $scope.discount));
    }); 
        $scope.setModulus();
    }
    
       
}