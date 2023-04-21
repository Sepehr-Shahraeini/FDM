'use strict';
app.controller('fdmRegDailyController', ['$http', '$scope', '$location', '$routeParams', '$rootScope', 'flightService', 'fdmService', 'aircraftService', 'authService', 'notificationService', '$route', function ($http, $scope, $location, $routeParams, $rootScope, flightService, fdmService, aircraftService, authService, notificationService, $route) {
    $scope.prms = $routeParams.prms;
    var lowColor = '#00b3b3';
    var medColor = '#ffcc00';
    var highColor = '#e63900';
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
            if ($scope.reg != null)
                $scope.bind();
            else
                alert("Select a Register")

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


    $scope.df = "2021-12-01";
    $scope.dt = "2021-12-31";
    $scope.date_from = {
        type: "date",
        placeholder: 'From',
        width: '100%',

        bindingOptions: {
            value: 'df',

        }
    };
    $scope.date_to = {
        type: "date",
        placeholder: 'To',
        width: '100%',

        bindingOptions: {
            value: 'dt',

        }
    };

    $scope.getEventsPerFlightTotal = function () {
        //ds_cptEventsGeneral.TotalEvent * 1.0 / ds_cptEventsGeneral.TotalFilght
        if (!$scope.ds_regEventsGeneral)
            return 0;
        if (!$scope.ds_regEventsGeneral.TotalEvent)
            return 0;
        if (!$scope.ds_regEventsGeneral.TotalFilght)
            return 0;
        return ($scope.ds_regEventsGeneral.TotalEvent * 1.0 / $scope.ds_regEventsGeneral.TotalFilght).toFixed(2);


    };
    $scope.isContentVisible = false;
    $scope.bind = function () {
        $scope.isContentVisible = true;
        fdmService.getFDMRegDaily($scope.df, $scope.dt, $scope.reg).then(function (response) {
            $scope.ds_regEventsDaily = response.Result.Data.data;
            $scope.ds_regEventsGeneral = response.Result.Data;

            $.each($scope.ds_regEventsDaily, function (i, d) {
                d.AVG = $scope.ds_regEventsGeneral.AverageScores;
            })

            $scope.ds_resTotalEvents = [{ level: 'Low', Count: response.Result.Data.TotalLowLevel }, { level: 'High', Count: response.Result.Data.TotalHighLevel }, { level: 'Medium', Count: response.Result.Data.TotalMediumLevel }];
        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });


        fdmService.getRegEventsDaily($scope.df, $scope.dt, $scope.reg).then(function (response) {
            $scope.ds_regEventsName = response.Result.Data;
            $scope.arr = [];
            $.each($scope.ds_regEventsName, function (_i, _d) {
                $scope.arr.push({ name: _d.EventName, value: _d.EventCount });
            });


            $scope.ds_eventsNameTree = [{ name: 'Events', items: $scope.arr }];
            console.log($scope.ds_regEventsName);
        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

        fdmService.getFDMRegCptDaily($scope.df, $scope.dt, $scope.reg).then(function (response) {
            $scope.ds_RegCptEvents = response.Result.Data;
            console.log($scope.ds_RegCptEvents);
        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
    };
    //////////////////////////////////////////



    ///////////////////////////////////
    $scope.getEventsByDate = function (df, dt, callback) {
        $scope.date_from = $scope.formatDateYYYYMMDD(df);
        $scope.date_to = $scope.formatDateYYYYMMDD(dt);
        $scope.p1Id = $scope.crewId;
        $scope.regId = -1;
        $scope.typeId = -1;

        fdmService.getAllFDM($scope.p1Id, $scope.regId, $scope.typeId, $scope.date_from, $scope.date_to).then(function (response) {
            console.log(response.Result);
            $scope.dg_events_ds = response.Result.Data;
            if (callback) callback();
        });
    }
    $scope.showEvents = function () {

        $scope.getEventsByDate($scope.df, $scope.dt, function () { $scope.popup_visible = true; });

    };

    //////////////////////////////////



    $scope.popup_visible = false;
    $scope.popup_title = 'Events';
    $scope.popup_instance = null;
    $scope.popup = {

        fullScreen: true,
        showTitle: true,

        toolbarItems: [

            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'danger', text: 'Close', icon: 'remove', onClick: function (e) {
                        //  $scope.dg_monthly2_instance.refresh();
                        $scope.popup_visible = false;
                    }
                }, toolbar: 'bottom'
            }
        ],

        visible: false,
        dragEnabled: true,
        closeOnOutsideClick: false,
        onShowing: function (e) {
            $scope.popup_instance.repaint();

            $scope.dg_height = $(window).height() - 170;

        },
        onShown: function (e) {
            // $scope.bindMaster();

            if ($scope.dg_events_instance)
                $scope.dg_events_instance.refresh();


        },
        onHiding: function () {
            //$scope.dg_master_ds = [];

            $scope.popup_visible = false;

        },
        onContentReady: function (e) {
            if (!$scope.popup_instance)
                $scope.popup_instance = e.component;

        },

        bindingOptions: {
            visible: 'popup_visible',

            title: 'popup_title',

        }
    };


    /////////////// Charts ////////////////

    $scope.formatDateYYYYMMDD = function (dt) {
        return moment(dt).format('YYYY-MM-DD');
    };


    $scope.regEventsChart = {
        size: { height: 450, width: $(window).width() - 60 },
        tooltip: {
            enabled: true,
            location: 'edge',
            customizeTooltip(arg) {
                return {
                    text: arg.seriesName + ': ' + arg.valueText,//`${arg.seriesName} years: ${arg.valueText}`,
                };
            },
        },
        commonSeriesSettings: {
            argumentField: 'FlightDate',
            type: 'stackedbar',

        },

        palette: 'bright',

        series: [

            { valueField: 'LowCount', name: 'Low', color: lowColor, barWidth: 30 },
            { valueField: 'MediumCount', name: 'Medium', color: medColor, barWidth: 30 },
            { valueField: 'HighCount', name: 'High', color: highColor, barWidth: 30 },

        ],
        title: 'Events',
        legend: {
            verticalAlignment: 'bottom',
            horizontalAlignment: 'center',
        },
        export: {
            enabled: true,
        },
        onPointClick(e) {
            e.target.select();
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
        valueAxis: [{

            grid: {
                visible: true
            },


        }

        ],

        bindingOptions:
        {
            dataSource: 'ds_regEventsDaily'
        },
    };

    $scope.scoresChart = {
        size: { height: 700, width: $(window).width() - 60 },
        palette: 'Harmony Light',
        commonSeriesSettings: {
            argumentField: 'FlightDate',
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
        panes: [{
            name: 'topPane',
        },
        {
            name: 'middlePane',

        },
        {
            name: 'bottomPane',
        }],
        series: [
            { valueField: 'ScorePercentage', name: 'Scores/Flights', pane: 'topPane', barWidth: 50 },
            { valueField: 'Scores', name: 'Scores', pane: 'middlePane', barWidth: 50 },
            { valueField: 'FlightCount', name: 'Flights', pane: 'bottomPane', barWidth: 50 },
            { valueField: 'AVG', pane: 'middlePane', type: 'spline', },

        ],

        title: 'Scores',
        legend: {
            verticalAlignment: 'bottom',
            horizontalAlignment: 'center',
        },
        export: {
            enabled: true,
        },
        onPointClick(e) {
            e.target.select();
        },
        valueAxis: [{
            pane: 'topPane',
            grid: {
                visible: true,
            },
            title: {
                text: 'Scores/Flights',
            },
        },
        {
            pane: 'middlePane',
            grid: {
                visible: true,
            },
            title: {
                text: 'Scores',
            },
        },
        {
            pane: 'bottomPane',
            grid: {
                visible: true,
            },
            title: {
                text: 'Flights',
            },
        }],

        argumentAxis: {
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
            dataSource: 'ds_regEventsDaily'
        },
    };

    $scope.eventsChart = {
        size: {
            height: 414,
        },
        palette: [lowColor, medColor, highColor],
        series: [
            {
                argumentField: 'level',
                valueField: 'Count',
                label: {
                    visible: true,
                    //customizeText(arg) {
                    //    return `${arg.argumentText} (${arg.valueText})`;
                    //},
                    connector: {
                        visible: true,
                        width: 1,
                    },
                    customizeText(arg) {
                        return arg.percentText;
                    },
                    position: 'columns',
                },
            },
        ],

        export: {
            enabled: true,
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
            dataSource: 'ds_resTotalEvents'
        },
    };

    $scope.cptEventsCountChart = {
        size: { height: 700, width: $(window).width() - 60 },
        palette: 'Harmony Light',
        commonSeriesSettings: {
            argumentField: 'CptCode',
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
            { valueField: 'EventCount', name: 'EventCount', barWidth: 50},
        ],

        title: 'CPT Events/Reg',
        legend: {
            verticalAlignment: 'bottom',
            horizontalAlignment: 'center',
        },
        export: {
            enabled: true,
        },
        onPointClick(e) {
            e.target.select();
        },
        valueAxis: [{
            grid: {
                visible: true,
            },
        }],

        argumentAxis: {
            label: {
                overlappingBehavior: "rotate",
                rotationAngle: 0,

            }
        },
        bindingOptions:
        {
            dataSource: 'ds_RegCptEvents'
        },
    };

    $scope.cptScoresChart = {
        size: { height: 700, width: $(window).width() - 60 },
        palette: 'Harmony Light',
        commonSeriesSettings: {
            argumentField: 'CptCode',
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
            { valueField: 'Scores', name: 'Scores', barWidth: 50 },
        ],

        title: 'CPT Scores/Reg',
        legend: {
            verticalAlignment: 'bottom',
            horizontalAlignment: 'center',
        },
        export: {
            enabled: true,
        },
        onPointClick(e) {
            e.target.select();
        },
        valueAxis: [{
            grid: {
                visible: true,
            },
        }],

        argumentAxis: {
            label: {
                overlappingBehavior: "rotate",
                rotationAngle: 0,

            }
        },
        bindingOptions:
        {
            dataSource: 'ds_RegCptEvents'
        },
    };

    $scope.cptFlightCountChart = {
        size: { height: 700, width: $(window).width() - 60 },
        palette: 'Harmony Light',
        commonSeriesSettings: {
            argumentField: 'CptCode',
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
            { valueField: 'FlightCount', name: 'FlightCount', barWidth: 50 },
        ],

        title: 'CPT Flights/Reg',
        legend: {
            verticalAlignment: 'bottom',
            horizontalAlignment: 'center',
        },
        export: {
            enabled: true,
        },
        onPointClick(e) {
            e.target.select();
        },
        valueAxis: [{
            grid: {
                visible: true,
            },
        }],

        argumentAxis: {
            label: {
                overlappingBehavior: "rotate",
                rotationAngle: 0,

            }
        },
        bindingOptions:
        {
            dataSource: 'ds_RegCptEvents'
        },
    };

    $scope.cptSctFltChart = {
        size: { height: 700, width: $(window).width() - 60 },
        palette: 'Harmony Light',
        commonSeriesSettings: {
            argumentField: 'CptCode',
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
            { valueField: 'ScorePercentage', name: 'Score/Flight', barWidth: 50 },
        ],

        title: 'CPT Scores/Flights',
        legend: {
            verticalAlignment: 'bottom',
            horizontalAlignment: 'center',
        },
        export: {
            enabled: true,
        },
        onPointClick(e) {
            e.target.select();
        },
        valueAxis: [{
            grid: {
                visible: true,
            },
        }],

        argumentAxis: {
            label: {
                overlappingBehavior: "rotate",
                rotationAngle: 0,

            }
        },
        bindingOptions:
        {
            dataSource: 'ds_RegCptEvents'
        },
    };

    $scope.eventsCountChart = {
        palette: 'Office',
        size: { height: 600, width: $(window).width() - 60 },
        commonSeriesSettings: {
            argumentField: 'EventName',
            type: 'bar',
            //  hoverMode: 'allArgumentPoints',
            //  selectionMode: 'allArgumentPoints',
            label: {
                visible: true,
                format: {
                    type: 'fixedPoint',
                    precision: 0,
                },
            },
        },
        series: [
            { valueField: 'EventCount', name: 'Events Ccount', barWidth: 50 },

        ],
        title: 'Events Count',
        legend: {
            verticalAlignment: 'bottom',
            horizontalAlignment: 'center',
        },
        export: {
            enabled: true,
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
                font: { size: 16 }

            }
        },
        bindingOptions:
        {
            dataSource: 'ds_regEventsName'
        },
    };


    $scope.eventsScoreChart = {
        palette: 'Office',
        size: { height: 600, width: $(window).width() - 60 },
        commonSeriesSettings: {
            argumentField: 'EventName',
            type: 'bar',
            //  hoverMode: 'allArgumentPoints',
            //  selectionMode: 'allArgumentPoints',
            label: {
                visible: true,
                format: {
                    type: 'fixedPoint',
                    precision: 0,
                },
            },
        },
        series: [
            { valueField: 'Scores', name: 'Events SCore', barWidth: 50 },

        ],
        title: 'Events Score',
        legend: {
            verticalAlignment: 'bottom',
            horizontalAlignment: 'center',
        },
        export: {
            enabled: true,
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
                font: { size: 16 }

            }
        },
        bindingOptions:
        {
            dataSource: 'ds_regEventsName'
        },
    };

    $scope.eventsTreeMap = {
        title: 'Events',
        size: { height: 600, width: $(window).width() - 63 },

        tooltip: {
            enabled: true,
            format: 'thousands',
            customizeTooltip(arg) {
                const { data } = arg.node;
                let result = null;

                if (arg.node.isLeaf()) {
                    result = `<span class='city'>${data.name}</span> <br/>Event count: ${arg.value}`;
                }

                return {
                    text: result,
                };
            },
        },

        bindingOptions:
        {
            dataSource: 'ds_eventsNameTree'
        },
    };


    ////////////////// scroll ////////////////

    $scope.rightHeight = $(window).height() - 114;
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


    $scope.bindRegData = function (reg) {
        $scope.reg = reg;
        $scope.bind();
    }



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
        $rootScope.page_title = '> FDM Dashboard Register';


        $('.fdmRegister').fadeIn(400, function () {

        });
    }





}]);