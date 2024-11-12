'use strict';
app.controller('fdmFoDashboardMonthlyController', ['$http', '$scope', '$location', '$routeParams', '$rootScope', 'flightService', 'fdmService', 'aircraftService', 'authService', 'notificationService', '$route', function ($http, $scope, $location, $routeParams, $rootScope, flightService, fdmService, aircraftService, authService, notificationService, $route) {
    $scope.prms = $routeParams.prms;
    var lowColor = '#0099cc';
    var medColor = '#ffcc66';
    var highColor = '#ff1a1a';
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

            // $scope.df = $scope.formatDateYYYYMMDD($scope.dt_from);
            // $scope.dt = $scope.formatDateYYYYMMDD($scope.dt_to);
            if ($scope.crewId != null)
                $scope.bind();
            else
                alert("Select a first officer")

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


    $scope.df = "2021-01-01";
    $scope.dt = "2021-09-30";
    $scope.isContentVisible = false;
    $scope.bind = function () {
        $scope.isContentVisible = true;

        fdmService.getFoEventsMonthly($scope.year, $scope.month_from + 1, $scope.month_to + 1, $scope.crewId).then(function (response) {
            $scope.ds_foEventsNameMonthly = response.Result.Data;
            console.log($scope.ds_foEventsNameMonthly);
            $scope.arr = [];
            $.each($scope.ds_foEventsNameMonthly, function (_i, _d) {
                $scope.arr.push({ name: _d.EventName, value: _d.EventCount });
            });


            $scope.ds_eventsNameTree = [{ name: 'Events', items: $scope.arr }];

        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

        fdmService.getFDMFoMonthly($scope.crewId, $scope.month_from + 1, $scope.month_to + 1, $scope.year).then(function (response) {
            $scope.ds_foEventsMonthly = response.Result.Data.data;
            $scope.ds_foEventsMonthlyGeneral = response.Result.Data;
            console.log('monthly', $scope.ds_foEventsMonthly);
            $scope.ds_foTotalEvents = [{ level: 'Low', Count: response.Result.Data.TotalLowLevel }, { level: 'Medium', Count: response.Result.Data.TotalMediumLevel }, { level: 'High', Count: response.Result.Data.TotalHighLevel }];

        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

        //fdmService.getCptFoEventsMonthly($scope.year, $scope.month_from + 1, $scope.month_to + 1, $scope.crewId).then(function (response) {
        //    $scope.ds_cptFoEventsMonthly = response.Result.Data;
        //}, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

        fdmService.getFDMFoRegMonthly($scope.crewId, $scope.month_from + 1, $scope.month_to + 1, $scope.year).then(function (response) {
            $scope.ds_foRegEventsMonthly = response.Result.Data;
        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

        //fdmService.getFdmEventsNameCPTMonthly($scope.year, $scope.month_from+1, $scope.month_to+1, $scope.crewId).then(function(response) {
        //    $scope.EventsNameData = response.Result.Data.data;
        //    //console.log('EventsNameData',$scope.EventsNameData);
        //    $scope.EventsNameDataNoZero = Enumerable.From(response.Result.Data.data).Where('Number($.IncidentCount)>0').ToArray();
        //}, function(err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });



    };
    //////////////////////////////////////////
    var MonthDataSource = [
        { Id: 0, Title: 'January' },
        { Id: 1, Title: 'February' },
        { Id: 2, Title: 'March' },
        { Id: 3, Title: 'April' },
        { Id: 4, Title: 'May' },
        { Id: 5, Title: 'June' },
        { Id: 6, Title: 'July' },
        { Id: 7, Title: 'August' },
        { Id: 8, Title: 'September' },
        { Id: 9, Title: 'October' },
        { Id: 10, Title: 'November' },
        { Id: 11, Title: 'December' },

    ];

    $scope.year = 2021;
    $scope.month_from = 0;
    $scope.month_to = 11;
    $scope.sb_year = {
        placeholder: 'Year',
        showClearButton: false,
        searchEnabled: false,
        dataSource: [2018, 2019, 2020, 2021, 2022, 2023, 2024],

        onSelectionChanged: function (arg) {

        },

        bindingOptions: {
            value: 'year',


        }
    };
    $scope.sb_month_from = {
        placeholder: 'Month',
        showClearButton: false,
        searchEnabled: false,
        dataSource: MonthDataSource,
        displayExpr: 'Title',
        valueExpr: 'Id',
        onSelectionChanged: function (arg) {

        },

        bindingOptions: {
            value: 'month_from',


        }
    };
    $scope.sb_month_to = {
        placeholder: 'Month',
        showClearButton: false,
        searchEnabled: false,
        dataSource: MonthDataSource,
        displayExpr: 'Title',
        valueExpr: 'Id',
        onSelectionChanged: function (arg) {

        },

        bindingOptions: {
            value: 'month_to',


        }
    };

    $scope.getEventsPerFlightTotal = function () {
        //{{ds_foEventsMonthlyGeneral.TotalEvent * 1.0 / ds_foEventsMonthlyGeneral.TotalFilght.toFixed(2)}}
        if (!$scope.ds_foEventsMonthlyGeneral)
            return 0;
        if (!$scope.ds_foEventsMonthlyGeneral.TotalEvent)
            return 0;
        if (!$scope.ds_foEventsMonthlyGeneral.TotalFilght)
            return 0;
        return ($scope.ds_foEventsMonthlyGeneral.TotalEvent * 1.0 / $scope.ds_foEventsMonthlyGeneral.TotalFilght).toFixed(2);


    };


    /////////////// Charts ////////////////

    $scope.formatDateYYYYMMDD = function (dt) {
        return moment(dt).format('YYYY-MM-DD');
    };

    $scope.monthConvert = function (monthNo) {
        $.each(MonthDataSource, function (_i, _d) {
            if (_d.Id == monthNo - 1)
                $scope._title = _d.Title
        });

        return $scope._title;

    }


    $scope.foEventsMonthlyChart = {
        size: { height: 650, width: $(window).width() - $(window).width() * 0.17 - 70 },
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
            argumentField: 'Month',
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

            { valueField: 'LowCount', name: 'Low', color: lowColor, barWidth: 40 },
            { valueField: 'MediumCount', name: 'Medium', color: medColor, barWidth: 40 },
            { valueField: 'HighCount', name: 'High', color: highColor, barWidth: 40 },

        ],
        title: 'Events',
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

        argumentAxis: { // or valueAxis, or commonAxisSettings
            label: {
                overlappingBehavior: "rotate",

            }
        },
        valueAxis: [{
            tickInterval: 1,
            grid: {
                visible: true,
            }
        }],
        argumentAxis: {
            tickInterval: 1,
            label: {
                customizeText: function () {

                    return $scope.monthConvert(this.value);

                },
            }
        },


        bindingOptions:
        {
            dataSource: 'ds_foEventsMonthly'
        },
    };

    $scope.foRegEventsChart = {
        size: { height: 600, width: $(window).width() - $(window).width() * 0.17 - 70 },
        commonSeriesSettings: {
            argumentField: 'Register',
            type: 'bar',

        },
        series: [

            { valueField: 'LowLevelCount', name: 'Low', color: lowColor, barWidth: 40 },
            { valueField: 'MediumLevelCount', name: 'Medium', color: medColor, barWidth: 40 },
            { valueField: 'HighLevelCount', name: 'High', color: highColor, barWidth: 40 },

        ],

        palette: 'bright',

        title: 'By Register',
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

        argumentAxis: { // or valueAxis, or commonAxisSettings
            label: {
                overlappingBehavior: "rotate",

            }
        },
        valueAxis: [{
            tickInterval: 1,
            grid: {
                visible: true
            },


        }

        ],

        bindingOptions:
        {
            dataSource: 'ds_foRegEventsMonthly'
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
            dataSource: 'ds_foTotalEvents'
        },
    };

    $scope.eventsScoreChart = {
        palette: 'Office',
        size: { height: 600, width: $(window).width() - $(window).width() * 0.17 - 70 },
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
            enabled: false,
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

            }
        },
        bindingOptions:
        {
            dataSource: 'ds_foEventsNameMonthly'
        },
    };

    $scope.eventsCountChart = {
        palette: 'Office',
        size: { height: 600, width: $(window).width() - $(window).width() * 0.17 - 70 },
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
        title: 'Events Count',
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
            tickInterval: 1,

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
            dataSource: 'ds_foEventsNameMonthly'
        },
    };

    $scope.scoresChart = {
        size: { height: 700, width: $(window).width() - $(window).width() * 0.17 - 70 },
        palette: 'Harmony Light',
        commonSeriesSettings: {
            argumentField: 'Month',
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
            { valueField: 'scoresPerFlight', name: 'Scores/Flights', pane: 'topPane', barWidth: 50 },
            { valueField: 'Score', name: 'Scores', pane: 'middlePane', barWidth: 50 },
            { valueField: 'FlightCount', name: 'Flights', pane: 'bottomPane', barWidth: 50 },
        ],
        title: 'Scores',
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
        valueAxis: [{
            tickInterval: 1,
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
            tickInterval: 1,
        },
        {
            pane: 'bottomPane',
            grid: {
                visible: true,
            },
            title: {
                text: 'Flights',
            },
            tickInterval: 1,
        }],

        argumentAxis: {
            tickInterval: 1,
            label: {
                customizeText: function () {

                    return $scope.monthConvert(this.value);

                },
            }
        },
        bindingOptions:
        {
            dataSource: 'ds_foEventsMonthly'
        },
    };


    $scope.eventsTreeMap = {
        title: 'Events',
        size: { height: 600, width: $(window).width() - $(window).width() * 0.17 - 88 },

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


    ///////////////////crew //////////////////


    $scope.dg_crew_columns = [
        // { dataField: 'Selected', caption: '', allowResizing: true, alignment: 'center', dataType: 'boolean', allowEditing: false, width:45},
        { dataField: 'ScheduleName', caption: 'Schedule Name', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, sortIndex: 1, sortOrder: 'asc' },
        { dataField: 'JobGroup', caption: 'GRP', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 90 },
        { dataField: '_ORDER', caption: 'ORD', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 90, visible: false, sortIndex: 0, sortOrder: 'asc' },

    ];
    $scope.dg_crew_selected = null;
    $scope.dg_crew_instance = null;
    $scope.ds_crew = null;
    $scope.dg_crew = {
        headerFilter: {
            visible: false
        },
        filterRow: {
            visible: true,
            showOperationChooser: true,
        },
        showRowLines: true,
        showColumnLines: true,
        sorting: { mode: 'none' },
        keyExpr: 'Id',
        noDataText: '',

        allowColumnReordering: true,
        allowColumnResizing: true,
        scrolling: { mode: 'infinite' },
        paging: { pageSize: 100 },
        showBorders: true,
        selection: { mode: 'single' },

        columnAutoWidth: false,
        height: function () {
            return $(window).height() - 114;
        },

        columns: $scope.dg_crew_columns,
        onContentReady: function (e) {
            if (!$scope.dg_crew_instance)
                $scope.dg_crew_instance = e.component;

        },
        onSelectionChanged: function (e) {
            var data = e.selectedRowsData[0];

            if (!data) {
                $scope.dg_crew_selected = null;

            }
            else {
                $scope.dg_crew_selected = data;
                $scope.bindCrewData();
            }

        },
        onRowPrepared: function (e) {
            //if (e.data && e.data.AvailabilityId != 1)
            //    e.rowElement.css('background', '#ffcccc');

        },

        bindingOptions: {
            dataSource: 'ds_crew'
        },
    };

    $scope.bindCrew = function () {
        var _dt = moment(new Date()).format('YYYY-MM-DDTHH:mm:ss');
        $scope.loadingVisible = true;

        flightService.getCrewForRosterByDate(1, _dt).then(function (response) {
            $scope.loadingVisible = false;
            var _ds = Enumerable.From(response).Where(function (x) { return ['P2'].indexOf(x.JobGroup) != -1; }).ToArray();
            $.each(_ds, function (_i, _d) {
                if (_d.JobGroup == 'P2') _d._ORDER = 4;
            });
            $scope.ds_crew = _ds;
        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

    };

    $scope.bindCrewData = function () {

        $scope.crewId = $scope.dg_crew_selected.Id;
        console.log($scope.crewId);
        //do something
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
        $rootScope.page_title = '> FDM Dashboard Capitan monthly';


        $('.fdmFoDashboardMonthly').fadeIn(400, function () {

        });
    }

    $scope.bindCrew();




}]);