'use strict';
app.controller('fdmDashboardController', ['$http', '$scope', '$location', '$routeParams', '$rootScope', 'flightService', 'fdmService', 'aircraftService', 'authService', 'notificationService', '$route', function ($http, $scope, $location, $routeParams, $rootScope, flightService, fdmService, aircraftService, authService, notificationService, $route) {
    $scope.prms = $routeParams.prms;

    $scope.btn_search = {
        text: 'Search',
        type: 'success',
        icon: 'search',
        width: 120,
        // validationGroup: 'ctrsearch',
        bindingOptions: {},
        onClick: function (e) {
            $scope.dg_flight_ds = null;
            $scope.doRefresh = true;
            $scope.bind();
        }

    };

    $scope.popup_date_visible = false;
    $scope.popup_date_title = 'Date Picker';
    var pd1 = null;
    var pd2 = null;
    $scope.popup_date = {
        title: 'Shamsi Date Picker',
        shading: true,
        //position: { my: 'left', at: 'left', of: window, offset: '5 0' },
        height: 200,
        width: 300,
        fullScreen: false,
        showTitle: true,
        dragEnabled: true,


        visible: false,

        closeOnOutsideClick: false,
        onTitleRendered: function (e) {
            // $(e.titleElement).addClass('vahid');
            // $(e.titleElement).css('background-color', '#f2552c');
        },
        onShowing: function (e) {




        },
        onShown: function (e) {

            pd1 = $(".date1").pDatepicker({
                format: 'l',
                autoClose: true,
                calendar: {
                    persian: {
                        locale: 'en'
                    }
                },
                onSelect: function (unix) {

                    //console.log(new Date(unix));
                    $scope.$apply(function () {

                        $scope.dt_from = new Date(unix);
                    });

                },

            });
            pd1.setDate(new Date($scope.dt_from.getTime()));
            pd2 = $(".date2").pDatepicker({
                format: 'l',
                autoClose: true,
                calendar: {
                    persian: {
                        locale: 'en'
                    }
                },
                onSelect: function (unix) {
                    $scope.$apply(function () {
                        $scope.dt_to = new Date(unix);
                    });
                },

            });
            pd2.setDate(new Date($scope.dt_to.getTime()));

        },
        onHiding: function () {
            pd1.destroy();
            pd2.destroy();
            $scope.popup_date_visible = false;

        },
        showCloseButton: true,
        bindingOptions: {
            visible: 'popup_date_visible',



        }
    };
    /////////////////////////////////////////
    $scope.df = "2021-03-01";
    $scope.dt = "2021-03-30";
    $scope.count = 5;
    $scope.bind = function () {

        fdmService.getFdmIncidentType($scope.df, $scope.dt).then(function (response) {
            $scope.dataType = response.Result.Data.data;
            $scope.totalIncidentsPie = [{ level: 'Low', Count: response.Result.Data.TotalLowLevel }, { level: 'High', Count: response.Result.Data.TotalHighLevel }, { level: 'Medium', Count: response.Result.Data.TotalMediumLevel }];

        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

        fdmService.getFdmEventsName($scope.df, $scope.dt).then(function (response) {
            $scope.EventsNameData = response.Result.Data.data;
        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

        fdmService.getFdmRegisterEvent($scope.df, $scope.dt).then(function (response) {
            $scope.registerEventData = response.Result.Data.data;
        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

        fdmService.getCptScores($scope.count, $scope.df, $scope.dt).then(function (response) {
            $scope.cptScoresData = response.Result.Data;
        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

        fdmService.getCptLastScores($scope.count, $scope.df, $scope.dt).then(function (response) {
            $scope.cptLastScoresData = response.Result.Data;
        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

        fdmService.getTopCptEvents(10, $scope.df, $scope.dt).then(function (response) {
            $scope.topCptEventsData = response.Result.Data;
        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

        fdmService.getEventsDaily($scope.df, $scope.dt).then(function (response) {
            $scope.eventsDailyData = response.Result.Data.data;
            $scope.ds_EventsDailyGeneral = response.Result.Data;
            console.log($scope.ds_cptEventsGeneral);
        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

        
    };
    //////////////////////////////////////////
    $scope.dt_to = new Date().addDays(0);
    $scope.dt_from = new Date().addDays(-30);
    var startDate = new Date(2019, 10, 30);
    if (startDate > $scope.dt_from)
        $scope.dt_from = startDate;

    $scope.date_from = {
        type: "date",
        placeholder: 'From',
        width: '100%',

        bindingOptions: {
            value: 'dt_from',

        }
    };
    $scope.date_to = {
        type: "date",
        placeholder: 'To',
        width: '100%',

        bindingOptions: {
            value: 'dt_to',

        }
    };



    $scope.formatDateYYYYMMDD = function (dt) {
        return moment(dt).format('YYYY-MM-DD');
    };
    /////////////// Charts ////////////////

    $scope.acTypeEventsChart = {
        commonPaneSettings: {
            backgroundColor:'white',
        },
        commonSeriesSettings: {
            argumentField: 'AircraftType',
            type: 'bar',
            hoverMode: 'allArgumentPoints',
            selectionMode: 'allArgumentPoints',
            label: {
                visible: true,
                format: {
                    type: 'fixedPoint',
                    precision: 0,
                },
            },
        },
        series: [
            { valueField: 'HighLevelCount', name: 'High' },
            { valueField: 'MediumLevelCount', name: 'Medium' },
            { valueField: 'LowLevelCount', name: 'Low' },
        ],
        title: ' Aircraft Type events',
        legend: {
            verticalAlignment: 'bottom',
            horizontalAlignment: 'center',
        },
        export: {
            enabled: false,
        },
        onPointClick(e) {
            e.target.select();
        },
        valueAxis: {
            tickInterval: 10,

        },
        size: {
            height: 400,
          //  width:'80%',
        },
        bindingOptions:
        {
            dataSource: 'dataType'
        },
    };

    $scope.acTypeScoresChart = {
        commonSeriesSettings: {
            argumentField: 'AircraftType',
            type: 'bar',
            hoverMode: 'allArgumentPoints',
            selectionMode: 'allArgumentPoints',
            label: {
                visible: true,
                format: {
                    type: 'fixedPoint',
                    precision: 0,
                },
            },
        },
        series: [
            { valueField: 'Scores', name: 'Scores' },
            { valueField: 'ScorePercentage', name: 'ScorePercentage' },
            { valueField: 'FlightCount', name: 'FlightCount' },
        ],
        title: 'Aircraft Type scores',
        legend: {
            verticalAlignment: 'bottom',
            horizontalAlignment: 'center',
        },
        export: {
            enabled: false,
        },
        onPointClick(e) {
            e.target.select();
        },
        valueAxis: {
            tickInterval: 10,

        },
        bindingOptions:
        {
            dataSource: 'dataType'
        },
    };

    $scope.eventsNameChart = {
        commonSeriesSettings: {
            argumentField: 'EventName',
            type: 'line',
            //  hoverMode: 'allArgumentPoints',
            //  selectionMode: 'allArgumentPoints',
            //label: {
            //    visible: true,
            //    format: {
            //        type: 'fixedPoint',
            //        precision: 0,
            //    },
            //},
        },
        series: [
            { valueField: 'IncidentCount', name: 'Events count' },

        ],
        title: 'Events count',
        legend: {
            verticalAlignment: 'bottom',
            horizontalAlignment: 'center',
        },
        export: {
            enabled: false,
        },
        onPointClick(e) {
            e.target.select();
        },
        valueAxis: {
            tickInterval: 10,

        },
        argumentAxis: { // or valueAxis, or commonAxisSettings
            label: {
                overlappingBehavior: "rotate",
                rotationAngle: 90
            }
        },
        bindingOptions:
        {
            dataSource: 'EventsNameData'
        },
    };

    $scope.totalEventsPie = {
        size: {
            height:500,
        },
        palette: 'bright',
        series: [
            {
                argumentField: 'level',
                valueField: 'Count',
                label: {
                    visible: true,
                    connector: {
                        visible: true,
                        width: 1,
                    },
                },
            },
        ],
        title: 'Events',
        export: {
            enabled: false,
        },
        onPointClick(e) {
            const point = e.target;

            toggleVisibility(point);
        },
        onLegendClick(e) {
            const arg = e.target;

            toggleVisibility(e.component.getAllSeries()[0].getPointsByArg(arg)[0]);
        },

        bindingOptions:
        {
            dataSource: 'totalIncidentsPie'
        },
    };

    $scope.registerEventsChart = {
        commonSeriesSettings: {
            argumentField: 'Register',
            type: 'bar',
            hoverMode: 'allArgumentPoints',
            selectionMode: 'allArgumentPoints',
            label: {
                visible: true,
                format: {
                    type: 'fixedPoint',
                    precision: 0,
                },
            },
        },
        series: [
            { valueField: 'HighLevelCount', name: 'High' },
            { valueField: 'MediumLevelCount', name: 'Medium' },
            { valueField: 'LowLevelCount', name: 'Low' },
        ],
        title: 'Total Register events',
        legend: {
            verticalAlignment: 'bottom',
            horizontalAlignment: 'center',
        },
        export: {
            enabled: false,
        },
        onPointClick(e) {
            e.target.select();
        },
        valueAxis: {
            tickInterval: 10,

        },
        argumentAxis: {
            label: {
                overlappingBehavior: "rotate",
                rotationAngle: 90
            }
        },
        bindingOptions:
        {
            dataSource: 'registerEventData'
        },
    };

    $scope.registerScoresChart = {
        commonSeriesSettings: {
            argumentField: 'Register',
            type: 'bar',
            hoverMode: 'allArgumentPoints',
            selectionMode: 'allArgumentPoints',
            label: {
                visible: true,
                format: {
                    type: 'fixedPoint',
                    precision: 0,
                },
            },
        },
        series: [
            { valueField: 'Scores', name: 'Scores' },
            { valueField: 'ScorePercentage', name: 'ScorePercentage' },
            { valueField: 'FlightCount', name: 'FlightCount' },
        ],
        title: 'Register scores',
        legend: {
            verticalAlignment: 'bottom',
            horizontalAlignment: 'center',
        },
        export: {
            enabled: false,
        },
        onPointClick(e) {
            e.target.select();
        },
        valueAxis: {
            tickInterval: 10,

        },
        argumentAxis: {
            label: {
                overlappingBehavior: "rotate",
                rotationAngle: 90
            }
        },
        bindingOptions:
        {
            dataSource: 'registerEventData'
        },
    };

    $scope.cptScoresChart = {
        commonSeriesSettings: {
            argumentField: 'P1Code',
            type: 'bar',
            hoverMode: 'allArgumentPoints',
            selectionMode: 'allArgumentPoints',
            label: {
                visible: true,
                format: {
                    type: 'fixedPoint',
                    precision: 0,
                },
            },
        },
        series: [
            { valueField: 'Scores', name: 'Scores' },
            { valueField: 'ScorePercentage', name: 'ScorePercentage' },
            { valueField: 'FlightCount', name: 'FlightCount' },
        ],
        title: 'Highest scores CPT',
        legend: {
            verticalAlignment: 'bottom',
            horizontalAlignment: 'center',
        },
        export: {
            enabled: false,
        },
        onPointClick(e) {
            e.target.select();
        },
        valueAxis: {
            tickInterval: 10,

        },
        argumentAxis: {
            label: {
                overlappingBehavior: "rotate",
                rotationAngle: 90
            }
        },
        bindingOptions:
        {
            dataSource: 'cptScoresData'
        },
    };

    $scope.cptlastScoresChart = {
        commonSeriesSettings: {
            argumentField: 'P1Code',
            type: 'bar',
            hoverMode: 'allArgumentPoints',
            selectionMode: 'allArgumentPoints',
            label: {
                visible: true,
                format: {
                    type: 'fixedPoint',
                    precision: 0,
                },
            },
        },
        series: [
            { valueField: 'Scores', name: 'Scores' },
            { valueField: 'ScorePercentage', name: 'ScorePercentage' },
            { valueField: 'FlightCount', name: 'FlightCount' },
        ],
        title: 'Lowest scores CPT',
        legend: {
            verticalAlignment: 'bottom',
            horizontalAlignment: 'center',
        },
        export: {
            enabled: false,
        },
        onPointClick(e) {
            e.target.select();
        },
        valueAxis: {
            tickInterval: 10,

        },
        argumentAxis: {
            label: {
                overlappingBehavior: "rotate",
                rotationAngle: 90
            }
        },
        bindingOptions:
        {
            dataSource: 'cptLastScoresData'
        },
    };

    $scope.topCptEventsChart = {
        commonSeriesSettings: {
            argumentField: 'P1Code',
            type: 'stackedBar',
            hoverMode: 'allArgumentPoints',
            selectionMode: 'allArgumentPoints',
            label: {
                visible: false,
                //format: {
                //    type: 'fixedPoint',
                //    precision: 0,
                //},
            },
        },
        series: [
            { valueField: 'HighLevelCount', name: 'High' },
            { valueField: 'MediumLevelCount', name: 'Medium' },
            { valueField: 'LowLevelCount', name: 'Low' },
        ],
        title: 'Highest Levels CPT',
        legend: {
            verticalAlignment: 'bottom',
            horizontalAlignment: 'center',
        },
        export: {
            enabled: false,
        },
        onPointClick(e) {
            e.target.select();
        },
        valueAxis: {
            tickInterval: 10,

        },
        argumentAxis: {
            label: {
                overlappingBehavior: "rotate",
                rotationAngle: 90
            }
        },
        rotated: true,
        bindingOptions:
        {
            dataSource: 'topCptEventsData'
        },
    };
    
    $scope.eventsDailyChart = {
        commonSeriesSettings: {
            argumentField: 'FlightDate',
            type: 'spline',
            //  hoverMode: 'allArgumentPoints',
            //  selectionMode: 'allArgumentPoints',
            //label: {
            //    visible: false,
            //    format: {
            //        type: 'fixedPoint',
            //        precision: 0,
            //    },
            //},
        },
        series: [
            { valueField: 'EventsCount', name: 'Events count' },
            { valueField: 'HighLevelCount', name: 'High count' },
            { valueField: 'MediumLevelCount', name: 'Medium count' },
            { valueField: 'LowLevelCount', name: 'Low count' },

        ],
        title: 'Events count Daily',
        legend: {
            verticalAlignment: 'bottom',
            horizontalAlignment: 'center',
        },
        export: {
            enabled: false,
        },
        onPointClick(e) {
            e.target.select();
        },
        valueAxis: {
            tickInterval: 10,

        },
        argumentAxis: { // or valueAxis, or commonAxisSettings
            label: {
                overlappingBehavior: "rotate",
                rotationAngle: -45,
                customizeText: function () {

                    return $scope.formatDateYYYYMMDD(this.value);


                }
            }
        },
        bindingOptions:
        {
            dataSource: 'eventsDailyData'
        },
    };

    $scope.eventsDailyPercentageChart = {
        commonSeriesSettings: {
            argumentField: 'FlightDate',
            type: 'spline',
            //  hoverMode: 'allArgumentPoints',
            //  selectionMode: 'allArgumentPoints',
            //label: {
            //    visible: false,
            //    format: {
            //        type: 'fixedPoint',
            //        precision: 0,
            //    },
            //},
        },
        series: [
            { valueField: 'ScorePercentage', name: 'Score percentage' },
            { valueField: 'HighPercentage', name: 'High percentage' },
            { valueField: 'MediumPercentage', name: 'Medium percentage' },
            { valueField: 'LowPercentage', name: 'Low percentage' },

        ],
        title: 'Events Percentage Daily',
        legend: {
            verticalAlignment: 'bottom',
            horizontalAlignment: 'center',
        },
        export: {
            enabled: false,
        },
        onPointClick(e) {
            e.target.select();
        },
        valueAxis: {
            tickInterval: 10,

        },
        argumentAxis: { // or valueAxis, or commonAxisSettings
            label: {
                overlappingBehavior: "rotate",
                rotationAngle: -45,
                customizeText: function () {

                    return $scope.formatDateYYYYMMDD(this.value);


                }
            }
        },
        bindingOptions:
        {
            dataSource: 'eventsDailyData'
        },
    };




    ////////////////// scroll ////////////////


    //$scope.scroll_1 = {
    //    scrollByContent: true,
    //    scrollByThumb: true,
    //};
    $scope.rightHeight = $(window).height() - 114 ;
    $scope.scroll_1 = {
        width: '100%',
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
            height: 'rightHeight'
        }

    };


    //////////////////////////////////
    $scope.loadingVisible = false;
    $scope.loadPanel = {
        message: 'Please wait...',

        showIndicator: true,
        showPane: true,
        shading: true,
        closeOnOutsideClick: false,
        shadingColor: "rgba(0,0,0,0.4)",
        // position: { of: "body" },
        onShown: function () {

        },
        onHidden: function () {

        },
        bindingOptions: {
            visible: 'loadingVisible'
        }
    };

    if (!authService.isAuthorized()) {

        authService.redirectToLogin();
    }
    else {
        $rootScope.page_title = '> FDM Dashboard';


        $('.fdmDashboard').fadeIn(400, function () {

        });
    }

    $scope.bind();


}]);