'use strict';
app.controller('matchListController', ['$http', '$scope', '$location', '$routeParams', '$rootScope', 'flightService', 'fdmService', 'aircraftService', 'authService', 'notificationService', '$route', function ($http, $scope, $location, $routeParams, $rootScope, flightService, fdmService, aircraftService, authService, notificationService, $route) {
   


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
            var _ds = Enumerable.From(response).Where(function (x) { return ['TRI', 'TRE', 'P1', 'P2'].indexOf(x.JobGroup) != -1; }).ToArray();
            $.each(_ds, function (_i, _d) {
                if (_d.JobGroup == 'TRE') _d._ORDER = 1;
                if (_d.JobGroup == 'TRI') _d._ORDER = 2;
                if (_d.JobGroup == 'P1') _d._ORDER = 3;
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
        $rootScope.page_title = '> Match List';


        $('.MatchList').fadeIn(400, function () {

        });
    }

    $scope.bindCrew();







}]);