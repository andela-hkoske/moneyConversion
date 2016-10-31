(function() {
    angular.module("currencyConversion.controllers", []);
    angular.module("currencyConversion.services", []);

    // Services
    angular.module('currencyConversion.services')
        .service("FixerConverter", ['$http', function($http) {
            return {
                convert: function(symbol, callback) {
                    $http.get("http://api.fixer.io/latest?base=" + symbol)
                        .then(
                            function(resp) {
                                callback(resp, null);
                            },
                            function(err) {
                                callback(null, err);
                            });
                }
            };
        }]);

    // controllers
    angular.module("currencyConversion.controllers")
        .controller("CurrencyCtrl", ["FixerConverter", "$scope",
            function(FixerConverter, $scope) {
                $scope.symbol = "AUD";
                $scope.convert = function() {
                    FixerConverter.convert("USD",
                        function(resp, err) {
                            if (resp !== null) {
                                $scope.USDValue = "$" + resp.data.rates[$scope.symbol].toString();
                                return
                            }
                            $scope.USDValue = "Problem fetching the conversion rate you requested.";
                        });

                };
            }
        ]);

    // Application
    window.app = angular.module('currencyConversion', [
        "currencyConversion.services",
        "currencyConversion.controllers"
    ]);

})();