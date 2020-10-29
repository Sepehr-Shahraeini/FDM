'use strict';
app.factory('biService', ['$http', '$q', 'ngAuthSettings', '$rootScope', function ($http, $q, ngAuthSettings, $rootScope) {
    var serviceFactory = {};

    var _getFuelMonthly = function (year) {

        var deferred = $q.defer();
        $http.get(serviceBase + 'bi/fuel/monthly/' + year).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };

    var _getFuelRoutesYearly = function (year) {

        var deferred = $q.defer();
        $http.get(serviceBase + 'bi/fuel/routes/year/' + year).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };




    serviceFactory.getFuelMonthly = _getFuelMonthly;
    serviceFactory.getFuelRoutesYearly = _getFuelRoutesYearly;



    return serviceFactory;

}]);