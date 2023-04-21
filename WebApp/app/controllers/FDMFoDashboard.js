'use strict';
app.controller('fdmFoDashboardController', ['$http', '$scope', '$location', '$routeParams', '$rootScope', 'flightService', 'fdmService', 'aircraftService', 'authService', 'notificationService', '$route', function ($http, $scope, $location, $routeParams, $rootScope, flightService, fdmService, aircraftService, authService, notificationService, $route) {
    
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

    $scope.getEventsPerFlightTotal = function () {
        //ds_foEventsGeneral.TotalEvent * 1.0 / ds_foEventsGeneral.TotalFilght
        if (!$scope.ds_foGeneralInfo)
            return 0;
        if (!$scope.ds_foGeneralInfo.TotalEvent)
            return 0;
        if (!$scope.ds_foGeneralInfo.TotalFilght)
            return 0;
        return ($scope.ds_foGeneralInfo.TotalEvent * 1.0 / $scope.ds_foGeneralInfo.TotalFilght).toFixed(2);


    };
    $scope.isContentVisible = false;
    $scope.bind = function () {
        $scope.isContentVisible = true;
        fdmService.getFDMFoDaily($scope.crewId, $scope.df, $scope.dt,).then(function (response) {
            $scope.ds_foEventsDaily = response.Result.Data.data;
            console.log('daily',response.Result.Data);
            $scope.ds_foGeneralInfo = response.Result.Data;
            $.each($scope.ds_foEventsDaily, function (i, d) {

                d.AVG = $scope.ds_foGeneralInfo.AverageScores;
                console.log($scope.AverageScores);
            })





            $scope.ds_foTotalEvents = [{ level: 'Low', Count: response.Result.Data.TotalLowLevel }, { level: 'Medium', Count: response.Result.Data.TotalMediumLevel }, { level: 'High', Count: response.Result.Data.TotalHighLevel }];
        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

        //fdmService.getCptEventsDaily($scope.df, $scope.dt, $scope.crewId).then(function (response) {

        //}, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

        fdmService.getFoEventsDaily($scope.df, $scope.dt, $scope.crewId).then(function (response) {
            $scope.ds_foEvents = response.Result.Data;
            $scope.arr = [];
            $.each($scope.ds_foEvents, function (_i, _d) {


                $scope.arr.push({ name: _d.EventName, value: _d.EventCount });
            });


            $scope.ds_eventsNameTree = [{ name: 'Events', items: $scope.arr }];


        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

        fdmService.getFDMFoReg($scope.crewId, $scope.df, $scope.dt).then(function (response) {
            $scope.ds_regFoEvents = response.Result.Data;
        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

        //fdmService.getFdmEventsNameCPT($scope.df, $scope.dt, $scope.crewId).then(function (response) {
        //    $scope.EventsNameData = response.Result.Data.data;
        //    //console.log('EventsNameData',$scope.EventsNameData);
        //    $scope.EventsNameDataNoZero = Enumerable.From(response.Result.Data.data).Where('Number($.IncidentCount)>0').ToArray();
        //}, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });


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
    $scope.dg_events_columns = [
        //{
        //    cellTemplate: function (container, options) {
        //        $("<div style='text-align:center'/>")
        //            .html(options.rowIndex + 1)
        //            .appendTo(container);
        //    }, name: 'row', caption: '#', width: 50, fixed: true, fixedPosition: 'left', allowResizing: false, cssClass: 'rowHeader'
        //}, 
        { dataField: 'Date', caption: 'Date', allowResizing: true, alignment: 'center', dataType: 'datetime', allowEditing: false, width: 120, format: 'yy-MMM-dd', sortIndex: 0, sortOrder: 'asc', fixed: false, fixedPosition: 'left' },

        { dataField: 'StateName', caption: 'NO', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 100 },
        { dataField: 'FromAirportIATA', caption: 'From', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 100 },
        { dataField: 'ToAirportIATA', caption: 'To', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 100 },

        { dataField: 'AircraftType', caption: 'A/C Type', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 115 },
        { dataField: 'Register', caption: 'Register', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 115 },

        { dataField: 'P1Name', caption: 'P1', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 200 },
        { dataField: 'P2Name', caption: 'P2', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 200 },
        { dataField: 'IPName', caption: 'IP', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 200 },

        { dataField: 'Severity', caption: 'Severity', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 150 },
        { dataField: 'EventName', caption: 'Even tName', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 350 },
        // { dataField: 'Duration', caption: 'Duration', allowResizing: true, alignment: 'center', dataType: 'number', allowEditing: false, width: 115,  },
        // { dataField: 'Value', caption: 'Value', allowResizing: true, alignment: 'center', dataType: 'number', allowEditing: false, width: 115,  },



        { dataField: 'BlockOff', caption: 'BlockOff', allowResizing: true, alignment: 'center', dataType: 'datetime', allowEditing: false, width: 115, format: 'HH:mm' },
        { dataField: 'BlockOn', caption: 'BlockOn', allowResizing: true, alignment: 'center', dataType: 'datetime', allowEditing: false, width: 115, format: 'HH:mm' },
        { dataField: 'TakeOff', caption: 'TakeOff', allowResizing: true, alignment: 'center', dataType: 'datetime', allowEditing: false, width: 115, format: 'HH:mm' },
        { dataField: 'Landing', caption: 'Landing', allowResizing: true, alignment: 'center', dataType: 'datetime', allowEditing: false, width: 115, format: 'HH:mm' },
        { dataField: 'STD', caption: 'STD', allowResizing: true, alignment: 'center', dataType: 'datetime', allowEditing: false, width: 115, format: 'HH:mm', },
        { dataField: 'STA', caption: 'STA', allowResizing: true, alignment: 'center', dataType: 'datetime', allowEditing: false, width: 115, format: 'HH:mm' },

    ];
    $scope.dg_events_selected = null;
    $scope.dg_events_instance = null;
    $scope.dg_events_ds = null;

    $scope.dg_events = {
        wordWrapEnabled: true,
        rowAlternationEnabled: false,
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

        noDataText: '',

        allowColumnReordering: true,
        allowColumnResizing: true,
        scrolling: { mode: 'infinite' },
        paging: { pageSize: 100 },
        showBorders: true,
        selection: { mode: 'multiple' },

        columnAutoWidth: false,


        columns: [],
        onContentReady: function (e) {
            if (!$scope.dg_events_instance)
                $scope.dg_events_instance = e.component;

        },
        onSelectionChanged: function (e) {
            //var data = e.selectedRowsData[0];

            //if (!data) {
            //    $scope.dg_master_selected = null;
            //}
            //else
            //    $scope.dg_master_selected = data;


        },

        "export": {
            enabled: true,
            fileName: "File",
            allowExportSelectedData: false
        },

        onToolbarPreparing: function (e) {
            var dataGrid = e.component;

            e.toolbarOptions.items.unshift(
                {
                    location: "before",
                    template: "titleTemplate"
                },

            );
        },
        onExporting: function (e) {
            e.component.beginUpdate();
            e.component.columnOption("row", "visible", false);
        },
        onExported: function (e) {
            e.component.columnOption("row", "visible", true);
            e.component.endUpdate();
        },
        onRowPrepared: function (e) {
            if (e.data && e.data.Severity && e.data.Severity == 'High') e.rowElement.css('background', '#ff8566');
            if (e.data && e.data.Severity && e.data.Severity == 'Medium') e.rowElement.css('background', '#ffd480');
            //  e.rowElement.css('background', '#ffccff');

        },

        onCellPrepared: function (options) {
            var data = options.data;
            var column = options.column;
            var fieldHtml = "";

            if (data && options.value && column.caption == 'Current') {
                fieldHtml += "<span style='font-weight:bold'>" + options.value + "</span>";
                options.cellElement.html(fieldHtml);
            }
            if (data && options.value && column.caption == 'Delayed') {
                fieldHtml += "<span style='color:#cc5200'>" + options.value + "</span>";
                options.cellElement.html(fieldHtml);
            }
            if (data && options.value && column.dataField.includes('Diff')) {
                var cls = options.value <= 0 ? 'pos' : 'neg';
                fieldHtml += "<div class='" + cls + "'>"
                    + "<span style='font-size:12px'>" + options.value + "%" + "</span>"
                    + (options.value <= 0 ? "<i class='fa fa-caret-down fsymbol-small'></i>" : "<i class='fa fa-caret-up fsymbol-small'></i>")
                    + "</div>";
                options.cellElement.html(fieldHtml);
            }



        },
        columns: $scope.dg_events_columns,

        bindingOptions: {
            "dataSource": "dg_events_ds",
            "height": "dg_height",
            //columns: 'dg_monthly_columns',
        },
        //keyExpr: ['Year', 'Month', 'Airport'],
        columnChooser: {
            enabled: false
        },

    };


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
            dataSource: 'ds_foEvents'
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
            { valueField: 'Scores', name: 'Events Ccount', barWidth: 50 },

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

            }
        },
        bindingOptions:
        {
            dataSource: 'ds_foEvents'
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





    $scope.scoresChart = {
        size: { height: 700, width: $(window).width() - $(window).width() * 0.17 - 70 },
        palette: 'Harmony Light',
        commonSeriesSettings: {
            argumentField: 'Day',
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
            { valueField: 'Score', name: 'Scores', pane: 'middlePane', barWidth: 50 },
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
            dataSource: 'ds_foEventsDaily'
        },
    };


    $scope.foEventsDailyChart = {
        size: { height: 450, width: $(window).width() - $(window).width() * 0.17 - 70 },
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
            argumentField: 'Day',
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
            tickInterval: 1,
            grid: {
                visible: true
            },


        }

        ],

        bindingOptions:
        {
            dataSource: 'ds_foEventsDaily'
        },
    };

    $scope.foRegEventsChart = {
        size: { height: 600, width: $(window).width() - $(window).width() * 0.17 - 70 },
        commonSeriesSettings: {
            argumentField: 'Register',
            type: 'bar',
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
            tickInterval: 1,
            grid: {
                visible: true
            },


        }

        ],
       
        bindingOptions:
        {
            dataSource: 'ds_regFoEvents'
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
            dataSource: 'ds_foTotalEvents'
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
        $scope.bind();
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
        $rootScope.page_title = '> FDM Dashboard Capitan';


        $('.fdmFoDashboard').fadeIn(400, function () {

        });
    }

    $scope.bindCrew();

}]);