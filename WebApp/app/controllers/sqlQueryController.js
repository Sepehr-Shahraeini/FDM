'use strict';
app.controller('sqlQueryController', ['$scope', '$http', '$location', '$routeParams', '$rootScope', 'flightService', 'aircraftService', 'authService', 'notificationService', '$route', function ($scope, $http, $location, $routeParams, $rootScope, flightService, aircraftService, authService, notificationService, $route) {

    $scope.value = '';
    $scope.result = '';
    $scope.ta_sql = {
        height: 100,
        bindingOptions: {
            maxLength: 'maxLength',
            value: 'value',
        },
    };

    $scope.ta_result = {
        height: 400,
        bindingOptions: {
            maxLength: 'maxLength',
            value: 'result',
        },
    };




    $scope.btn_send = {
        text: 'send',
        //type: 'danger',
        //icon: 'clear',
        width: 120,

        onClick: function (e) {

            $scope.sqlCommand =
            {
                "query": $scope.value,
                "type": 1
            }

            $http.post('http://localhost:9090/api/test', $scope.sqlCommand).then(function (response) {
                $scope.result = JSON.stringify(response.data);
            });

        }
    };



}]);