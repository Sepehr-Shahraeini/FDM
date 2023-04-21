'use strict';
app.controller('fdmDashboardPilotController', ['$http', '$scope', '$location', '$routeParams', '$rootScope', 'flightService', 'fdmService', 'aircraftService', 'authService', 'notificationService', '$route', function ($http, $scope, $location, $routeParams, $rootScope, flightService, fdmService, aircraftService, authService, notificationService, $route) {
    $scope.prms = $routeParams.prms;
    var lowColor = '#00b3b3';
    var medColor = '#ffcc00';
    var highColor = '#e63900';
    $scope.btn_search = {
        text: 'Search',
        type: 'success',
        icon: 'search',
        width: 120,
        bindingOptions: {},
        onClick: function (e) {
            $scope.selectedCrewId = $scope.ds_crew[$scope.sb_crew_index].crewId;
            if ($scope.selectedCrewId != null)
                $scope.bind();
            else
                alert("Select a Cpt")

        }


    };

    $scope.popup_date_visible = false;
    $scope.popup_date_title = 'Date Picker';
    var pd1 = null;
    var pd2 = null;
    $scope.popup_date = {
        title: 'Shamsi Date Picker',
        shading: true,
        height: 200,
        width: 300,
        fullScreen: false,
        showTitle: true,
        dragEnabled: true,


        visible: false,

        closeOnOutsideClick: false,
        onTitleRendered: function (e) {
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


    $scope.df = "2022-01-01";
    $scope.dt = "2022-12-31";
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


    $scope.isContentVisible = false;
    $scope.bind = function () {
        $scope.isContentVisible = true;
        fdmService.getCptDaily($scope.df, $scope.dt, $scope.selectedCrewId).then(function (response) {
            $scope.ds_cptEventsDaily = response.Result.Data.data;
            console.log('$scope.ds_cptEventsDaily', $scope.ds_cptEventsDaily);
            $scope.ds_cptEventsGeneral = response.Result.Data;
            $.each($scope.ds_cptEventsDaily, function (i, d) {

                d.AVG = $scope.ds_cptEventsGeneral.AverageScores;
            })





            $scope.ds_cptTotalEvents = [{ level: 'Low', Count: response.Result.Data.TotalLowLevel }, { level: 'Medium', Count: response.Result.Data.TotalMediumLevel }, { level: 'High', Count: response.Result.Data.TotalHighLevel }];
        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });


        fdmService.getCptFoEventsDaily($scope.df, $scope.dt, $scope.selectedCrewId).then(function (response) {
            $scope.ds_cptFoEvents = response.Result.Data;
            console.log(response);
        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

        fdmService.getCptEvents($scope.df, $scope.dt, $scope.selectedCrewId).then(function (response) {
            $scope.ds_cptEvents = response.Result.Data;
            $scope.arr = [];
            $.each($scope.ds_cptEvents, function (_i, _d) {


                $scope.arr.push({ name: _d.EventName, value: _d.EventCount });
            });


            $scope.ds_eventsNameTree = [{ name: 'Events', items: $scope.arr }];



        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

        fdmService.getCptIpEventsDaily($scope.df, $scope.dt, $scope.selectedCrewId).then(function (response) {
            $scope.ds_cptIpEvents = response.Result.Data;
        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

        fdmService.getIpCptEventsDaily($scope.df, $scope.dt, $scope.selectedCrewId).then(function (response) {
            $scope.ds_ipCptEvents = response.Result.Data;
        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

        fdmService.getRegCptEvents($scope.df, $scope.dt, $scope.selectedCrewId).then(function (response) {
            $scope.ds_regCptEvents = response.Result.Data;
        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });



    };
    //////////////////////////////////////////

    $scope.getEventsByDate = function (df, dt, callback) {
        $scope.date_from = $scope.formatDateYYYYMMDD(df);
        $scope.date_to = $scope.formatDateYYYYMMDD(dt);
        $scope.p1Id = $scope.selectedCrewId;
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


    //$scope.popup_visible = false;
    //$scope.popup_title = 'Events';
    //$scope.popup_instance = null;
    //$scope.popup = {

    //    fullScreen: true,
    //    showTitle: true,

    //    toolbarItems: [

    //        {
    //            widget: 'dxButton', location: 'after', options: {
    //                type: 'danger', text: 'Close', icon: 'remove', onClick: function (e) {
    //                    //  $scope.dg_monthly2_instance.refresh();
    //                    $scope.popup_visible = false;
    //                }
    //            }, toolbar: 'bottom'
    //        }
    //    ],

    //    visible: false,
    //    dragEnabled: true,
    //    closeOnOutsideClick: false,
    //    onShowing: function (e) {
    //        $scope.popup_instance.repaint();

    //        $scope.dg_height = $(window).height() - 170;

    //    },
    //    onShown: function (e) {
    //        // $scope.bindMaster();

    //        if ($scope.dg_events_instance)
    //            $scope.dg_events_instance.refresh();


    //    },
    //    onHiding: function () {
    //        //$scope.dg_master_ds = [];

    //        $scope.popup_visible = false;

    //    },
    //    onContentReady: function (e) {
    //        if (!$scope.popup_instance)
    //            $scope.popup_instance = e.component;

    //    },

    //    bindingOptions: {
    //        visible: 'popup_visible',

    //        title: 'popup_title',

    //    }
    //};


    /////////////// Charts ////////////////

    $scope.formatDateYYYYMMDD = function (dt) {
        return moment(dt).format('YYYY-MM-DD');
    };

    $scope.eventsCountChart = {
        palette: 'Office',
        size: { height: 450, width: $(window).width() - 70 },
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
            { valueField: 'EventCount', name: 'Events Count', barWidth: 50 },

        ],
        title: 'Events Name',
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
            tickInterval: 1,

        },

        argumentAxis: { // or valueAxis, or commonAxisSettings
            label: {
                overlappingBehavior: "rotate",
                rotationAngle: -45,
                font: { size: 16 }

            },

        },
        bindingOptions:
        {
            dataSource: 'ds_cptEvents'
        },
    };


    $scope.eventsScoreChart = {
        palette: 'Office',
        size: { height: 450, width: $(window).width() - 70 },
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
            { valueField: 'Scores', name: 'Events Score', barWidth: 50 },

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
            tickInterval: 1,

        },

        argumentAxis: { // or valueAxis, or commonAxisSettings
            label: {
                overlappingBehavior: "rotate",
                rotationAngle: -45,
                font: { size: 16 }

            },

        },
        bindingOptions:
        {
            dataSource: 'ds_cptEvents'
        },
    };



    $scope.scoresChart = {
        size: { height: 700, width: $(window).width() - 70 },
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
            tickInterval: 1,
        },
        {
            pane: 'middlePane',
            tickInterval: 1,
            grid: {
                visible: true,
            },
            title: {
                text: 'Scores',
            },
            tickInterval: 1,
        },
        {
            pane: 'bottomPane',
            tickInterval: 1,
            grid: {
                visible: true,
            },
            title: {
                text: 'Flights',

            },
            tickInterval: 1,
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
            dataSource: 'ds_cptEventsDaily'
        },
    };


    $scope.cptEventsDailyChart = {
        size: { height: 450, width: $(window).width() - 70 },
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
            hoverMode: 'allArgumentPoints',
            selectionMode: 'allArgumentPoints',
            label: {
                visible: false,
                format: {
                    type: 'fixedPoint',
                    precision: 0,
                },
            },
        },

        palette: 'bright',

        series: [

            { valueField: 'LowLevelCount', name: 'Low', color: lowColor, barWidth: 50 },
            { valueField: 'MediumLevelCount', name: 'Medium', color: medColor, barWidth: 50 },
            { valueField: 'HighLevelCount', name: 'High', color: highColor, barWidth: 50 },

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
            tickInterval: 1,

        }

        ],

        bindingOptions:
        {
            dataSource: 'ds_cptEventsDaily'
        },
    };

    $scope.regCptEventsChart = {
        size: { height: 450, width: $(window).width() - 70 },
        commonSeriesSettings: {
            argumentField: 'Register',
            type: 'bar',
            hoverMode: 'allArgumentPoints',
            selectionMode: 'allArgumentPoints',
            label: {
                visible: false,
                format: {
                    type: 'fixedPoint',
                    precision: 0,
                },
            },
        },
        series: [

            { valueField: 'LowLevelCount', name: 'Low', color: lowColor, barWidth: 50 },
            { valueField: 'MediumLevelCount', name: 'Medium', color: medColor, barWidth: 50 },
            { valueField: 'HighLevelCount', name: 'High', color: highColor, barWidth: 50 },

        ],

        palette: 'bright',

        title: 'By Register',
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

            }
        },
        valueAxis: [{

            grid: {
                visible: true
            },
            tickInterval: 1,

        }

        ],

        bindingOptions:
        {
            dataSource: 'ds_regCptEvents'
        },
    };

    $scope.cptFoEventsChart = {
        size: { height: 450, width: $(window).width() - 70 },
        commonSeriesSettings: {
            argumentField: 'P2Name',
            type: 'bar',
            hoverMode: 'allArgumentPoints',
            selectionMode: 'allArgumentPoints',
            label: {
                visible: false,
                format: {
                    type: 'fixedPoint',
                    precision: 0,
                },
            },
        },
        series: [

            { valueField: 'LowCount', name: 'Low', color: lowColor, barWidth: 50 },
            { valueField: 'MediumCount', name: 'Medium', color: medColor, barWidth: 50 },
            { valueField: 'HighCount', name: 'High', color: highColor, barWidth: 50 },

        ],

        palette: 'bright',

        title: 'By FO/CPT',
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

            }
        },
        valueAxis: [{

            grid: {
                visible: true
            },
            tickInterval: 1,

        }

        ],

        bindingOptions:
        {
            dataSource: 'ds_cptFoEvents'
        },
    };


    $scope.cptIpEventsChart = {
        size: { height: 450, width: $(window).width() - 70 },
        commonSeriesSettings: {
            argumentField: 'IpName',
            type: 'bar',
            barPadding: 0.1,
            hoverMode: 'allArgumentPoints',
            selectionMode: 'allArgumentPoints',
            label: {
                visible: false,
                format: {
                    type: 'fixedPoint',
                    precision: 0,
                },
            },
        },
        series: [

            { valueField: 'LowCount', name: 'Low', color: lowColor, barWidth: 50 },
            { valueField: 'MediumCount', name: 'Medium', color: medColor, barWidth: 50 },
            { valueField: 'HighCount', name: 'High', color: highColor, barWidth: 50 },

        ],

        palette: 'bright',

        title: 'By IP/CPT',
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

            }
        },
        valueAxis: [{

            grid: {
                visible: true
            },

            tickInterval: 1,
        }

        ],

        bindingOptions:
        {
            dataSource: 'ds_cptIpEvents'
        },
    };

    $scope.ipCptEventsChart = {
        size: { height: 450, width: $(window).width() - 70 },
        commonSeriesSettings: {
            argumentField: 'P1Name',
            type: 'bar',
            barPadding: 0.1,
            hoverMode: 'allArgumentPoints',
            selectionMode: 'allArgumentPoints',
            label: {
                visible: false,
                format: {
                    type: 'fixedPoint',
                    precision: 0,
                },
            },
        },
        series: [

            { valueField: 'LowCount', name: 'Low', color: lowColor, barWidth: 50 },
            { valueField: 'MediumCount', name: 'Medium', color: medColor, barWidth: 50 },
            { valueField: 'HighCount', name: 'High', color: highColor, barWidth: 50 },

        ],

        palette: 'bright',

        title: 'By IP/CPT',
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

            }
        },
        valueAxis: [{

            grid: {
                visible: true
            },

            tickInterval: 1,
        }

        ],

        bindingOptions:
        {
            dataSource: 'ds_ipCptEvents'
        },
    };





    $scope.eventsTreeMap = {
        title: 'Events',
        size: { height: 600, width: $(window).width() - 88 },

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
    $scope.fdm_scroll = {
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


    ///////////////////crew //////////////////

    $scope.sb_crew_selected = null;
    $scope.sb_cpt = {
        placeholder: 'Captian',
        showClearButton: false,
        searchEnabled: false,
        width: 300,
        displayExpr: 'Title',
        valueExpr: 'Id',
        onSelectionChanged: function (arg) {

        },

        bindingOptions: {
            value: 'sb_crew_index',
            dataSource: 'ds_crew',
        }
    };


    var _dt = moment(new Date()).format('YYYY-MM-DDTHH:mm:ss');


    $scope.loadingVisible = true;
    flightService.getCrewForRosterByDate(1, _dt).then(function (response) {
        $scope.loadingVisible = false;
        var _ds = Enumerable.From(response).Where(function (x) { return ['TRI', 'TRE', 'P1', 'P2'].indexOf(x.JobGroup) != -1; }).ToArray();
        $scope.ds_crew = []
        $.each(_ds, function (_i, _d) {
            $scope.ds_crew.push({ Id: _i, Title: _d.LastName + " (" + (_d.JobGroup) + ")", crewId: _d.Id })
        });
    }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });




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
        $rootScope.page_title = '> FDM Dashboard Capitan';


        $('.fdmDashboardPilot').fadeIn(400, function () {

        });
    }


}]);