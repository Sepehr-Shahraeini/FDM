'use strict';
app.controller('qaCyberSecurity', ['$scope', '$location', 'qaService', 'authService', '$routeParams', '$rootScope', '$window', function ($scope, $location, qaService, authService, $routeParams, $rootScope, $window) {
    $scope.isNew = true;
    $scope.isEditable = false;
    $scope.isLockVisible = false;
    $scope.isContentVisible = false;
    $scope.isFullScreen = false;
    var detector = new MobileDetect(window.navigator.userAgent);

    $scope.isFullScreen = true;

    $scope.entity = {
        Id: -1,
        Status: null,
        StatusEmployeeId: null,
        DateStatus: null,
        DateSign: null
    };

    $scope.followUpEntity = {
        Type: 7,
    }

  




    ////////////////////////

   


    /////////////////////////////////
    $scope.flight = null;

    $scope.chkIncidentBy = function (obj) {
        var _id = obj.Id;
        var _val = obj.checked;

        $.each($scope.incident, function (_i, _d) {

            if (_d.Id == _id) {
                _d.checked = _val;
                if (_val)
                    $scope.entity.IncidentId = _id;
            }
            else
                _d.checked = false;
        });
    }

    $scope.chkMethodBy = function (obj) {
        var _id = obj.Id;
        var _val = obj.checked;

        $.each($scope.method, function (_i, _d) {

            if (_d.Id == _id) {
                _d.checked = _val;
                if (_val)
                    $scope.entity.MethodId = _id;
            }
            else
                _d.checked = false;
        });
    }

    $scope.chkAccessBy = function (obj) {
        var _id = obj.Id;
        var _val = obj.checked;

        $.each($scope.access, function (_i, _d) {

            if (_d.Id == _id) {
                _d.checked = _val;
                if (_val)
                    $scope.entity.AccessId = _id;
            }
            else
                _d.checked = false;
        });
    }

   
    $scope.fill = function (data) {
        $scope.entity = data;

        $.each($scope.incident, function (_i, _d) {
            if (_d.Id == data.IncidentId)
                _d.checked = true;
        });

        $.each($scope.access, function (_i, _d) {
            if (_d.Id == data.AccessId)
                _d.checked = true;
        });

        $.each($scope.method, function (_i, _d) {
            if (_d.Id == data.MethodId)
                _d.checked = true;
        });
       

    };
    $scope.isLockVisible = false;
    $scope.bind = function () {
        $scope.entity.FlightId = $scope.tempData.FlightId;


        qaService.getCyberAccess().then(function (res) {
            $scope.access = res.Data;
            console.log(res.Data);
        });

        qaService.getCyberMethod().then(function (res) {
            $scope.method = res.Data;
        });

        qaService.getCyberIncident().then(function (res) {
            $scope.incident = res.Data;
            qaService.getCyberById($scope.followUpEntity.Id).then(function (res) {
               
                    $scope.fill(res.Data);
                
            });
        });

      


    };
    ////////////////////////////////
    $scope.scroll_qaCyber_height = $(window).height() - 130;
    $scope.scroll_qaCyber = {
       /* width: '100%',*/
        bounceEnabled: false,
        showScrollbar: 'never',
        pulledDownText: '',
        pullingDownText: '',
        useNative: true,
        refreshingText: 'Updating...',
        onPullDown: function (options) {

            options.component.release();

        },
        onInitialized: function (e) {


        },
        bindingOptions: {
            height: 'scroll_qaCyber_height'
        }

    };

    /////////////////////////////////


    $scope.txt_name = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.Name',
        }
    }

    $scope.txt_jobTitle = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.JobTitle',
        }
    }

    $scope.txt_contactInfo = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.ContactInfo',
        }
    }

    $scope.txt_dateEvent = {
        hoverStateEnabled: false,
        useMaskBehavior: true,

        type: 'datetime',
        pickerType: "rollers",
        displayFormat: "yyyy-MMM-dd  HH:mm",
        bindingOptions: {
            value: 'entity.DateOccurrence',
        }
    }

    $scope.txt_dateIncident = {
        hoverStateEnabled: false,
        useMaskBehavior: true,
        type: 'datetime',
        pickerType: "rollers",
        displayFormat: "yyyy-MMM-dd  HH:mm",
        bindingOptions: {
            value: 'entity.DateIncident',
        }
    }

    $scope.txt_attack = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.AttackDescriptipn',
        }
    }

    $scope.txt_impacted = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.ImpactDescription',
        }
    }
    $scope.txt_breached = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.BreachedDescription',
        }
    }
    $scope.txt_containment = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.AccessDescription',
        }
    }
    $scope.txt_other = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.Other',
        }
    }


    ////////////////////////////////

    $scope.tempData = null;

    $scope.$on('InitQACyberSecurity', function (event, prms) {


        $scope.tempData = prms;

        $scope.followUpEntity.Category = $scope.tempData.Category;
        $scope.followUpEntity.Id = $scope.tempData.Id;
        $scope.followUpEntity.Type = $scope.tempData.Type;
        $scope.followUpEntity.EmployeeId = $scope.tempData.EmployeeId;
        $scope.isNotLocked = $scope.tempData.isNotLocked;

        console.log($scope.followUpEntity);
        $scope.bind();
     

    });


    $scope.testLoaded = function () {
        $rootScope.$broadcast('InitTest', $scope.tempData);
    }



}]);

