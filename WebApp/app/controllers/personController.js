'use strict';
app.controller('personController', ['$scope', '$location', '$routeParams', '$rootScope', 'personService', 'authService', 'notificationService', 'flightService', '$route', function ($scope, $location, $routeParams, $rootScope, personService, authService, notificationService, flightService, $route) {
    $scope.prms = $routeParams.prms;
    $scope.IsEditable = $rootScope.IsProfileEditable(); //$rootScope.roles.indexOf('Admin') != -1;
    $scope.IsAccountEdit = $rootScope.roles.indexOf('Crew Scheduler') != -1;
    $scope.editButtonIcon = 'edit';
    $scope.editButtonText = 'Edit';
    $scope.isCrew = $route.current.isCrew;
    if (!$scope.IsEditable) {
        $scope.editButtonText = 'View';
        $scope.editButtonIcon = 'card';
    }
    //////////////////////////////////
    $scope.dsUrl = null;
    $scope.filterVisible = false;
    $scope.btn_delete = {
        text: 'Delete',
        type: 'danger',
        icon: 'clear',
        width: 120,
        bindingOptions: {
            visible: 'IsEditable'
        },
        onClick: function (e) {
           
            $scope.dg_selected = $rootScope.getSelectedRow($scope.dg_instance);
            if (!$scope.dg_selected) {
                General.ShowNotify(Config.Text_NoRowSelected, 'error');
                return;
            }

            General.Confirm(Config.Text_DeleteConfirm, function (res) {
                if (res) {

                    var dto = { PersonId: $scope.dg_selected.PersonId, };
                    $scope.loadingVisible = true;
                    personService.delete(dto).then(function (response) {
                        $scope.loadingVisible = false;
                        General.ShowNotify(Config.Text_SavedOk, 'success');
                        $scope.doRefresh = true;
                        $scope.bind();



                    }, function (err) {  $scope.loadingVisible = false; General.ShowNotify2(err.message, 'error',5000); });

                }
            });
        }
    };
    $scope.btn_view = {
        text: 'View',
        type: 'default',
        icon: 'card',
        width: 120,
        visible:false,
        bindingOptions: {},
        onClick: function (e) {
            $scope.dg_selected = $rootScope.getSelectedRow($scope.dg_instance);
            if (!$scope.dg_selected) {
                General.ShowNotify(Config.Text_NoRowSelected, 'error');
                return;
            }
            var data = $scope.dg_selected;
            $rootScope.$broadcast('InitViewPerson', data);
        }

    };
    $scope.btn_new = {
        text: 'New',
        type: 'default',
        icon: 'plus',
        width: 120,
        onClick: function (e) {

            var data = { Id: null };

            $rootScope.$broadcast('InitAddPerson', data);
        },
        bindingOptions: {
            visible:'IsEditable'
        }

    };
   
    $scope.btn_edit = {
       // text: 'Edit',
        type: 'default',
       // icon: 'edit',
        width: 120,
        bindingOptions:{
            icon: 'editButtonIcon',
            text:'editButtonText',
        },
        onClick: function (e) {
            $scope.dg_selected = $rootScope.getSelectedRow($scope.dg_instance);
            if (!$scope.dg_selected) {
                General.ShowNotify(Config.Text_NoRowSelected, 'error');
                return;
            }
            var data = $scope.dg_selected;
            $rootScope.$broadcast('InitAddPerson', data);
        }

    };
    //$scope.btn_view = {
    //    text: 'View',
    //    type: 'default',
    //    icon: 'doc',
    //    width: 120,
    //    onClick: function (e) {
    //        $scope.dg_selected = $rootScope.getSelectedRow($scope.dg_instance);
    //        if (!$scope.dg_selected) {
    //            General.ShowNotify(Config.Text_NoRowSelected, 'error');
    //            return;
    //        }
    //        var data = $scope.dg_selected;
    //        $scope.InitAddAirport(data);
    //    }

    //};
    $scope.btn_search = {
        text: 'Search',
        type: 'success',
        icon: 'search',
        width: 120,

        bindingOptions: {},
        onClick: function (e) {

            $scope.$broadcast('getFilterQuery', null);
        }

    };
    $scope.btn_print = {
        text: 'Print',
        type: 'default',
        icon: 'print',
        width: 120,

    };
    $scope.btn_filter = {
        text: '',
        type: 'default',
        icon: 'filter',
        width: 40,
        onClick: function (e) {
            if ($scope.filterVisible) {
                $scope.filterVisible = false;
                $('.filter').fadeOut();
            }
            else {
                $scope.filterVisible = true;
                $('.filter').fadeIn();
            }
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
    ///////////////////////////////////

    ///////////////////////////////////
    $scope.filters = [];

    $scope.dg_columns = [
        //{
        //    cellTemplate: function (container, options) {
        //        $("<div style='text-align:center'/>")
        //            .html(options.rowIndex + 1)
        //            .appendTo(container);
        //    }, caption: '#', width: 60, fixed: true, fixedPosition: 'left', allowResizing: false, cssClass: 'rowHeader'
        //},
        {
            dataField: "ImageUrl",
            width: 80,
            alignment: 'center',
            caption: '',
            allowFiltering: false,
            allowSorting: false,
            cellTemplate: function (container, options) {
                $("<div>")
                    .append($("<img>", { "src": $rootScope.clientsFilesUrl + (options.value ? options.value : 'imguser.png'), "css": { height: '50px',width:'50px', borderRadius: '100%' } }))
                    .appendTo(container);
            }
        },
        {
            caption: 'Base',
            columns: [
               // { dataField: 'FirstName', caption: 'First Name', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false,width:150 },
                //{
                //    dataField: "ImageUrl",
                //    width: 100,
                //    allowFiltering: false,
                //    allowSorting: false,
                //    cellTemplate: function (container, options) {
                //        $("<div>")
                //            .append($("<img>", { "src": (options.value ? $rootScope.clientsFilesUrl + options.value:'../../content/images/imguser.png') }))
                //            .css('width','50px')
                //            .appendTo(container);
                //    }
                //},
                { dataField: 'Name', caption: 'Name', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 250 },
                 { dataField: 'ScheduleName', caption: 'Schedule', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 150 },
                { dataField: 'NID', caption: 'National Code', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 130 },
                { dataField: 'Mobile', caption: 'Mobile', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 130 },
                { dataField: 'Email', caption: 'Email', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 200 },
                { dataField: 'DateJoinAvation', caption: 'Join Aviation', allowResizing: true, alignment: 'center', dataType: 'date', allowEditing: false, width: 130 },
                { dataField: 'Age', caption: 'Age', allowResizing: true, alignment: 'center', dataType: 'number', allowEditing: false, width: 50 },
            ]
        },
        {
            caption: 'Organizational',
            columns: [
                { dataField: 'PID', caption: 'Personnel Id', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 130 },
                { dataField: 'Location', caption: 'Department', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 150 },
                { dataField: 'JobGroup', caption: 'Group', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 130 },
                { dataField: 'DateJoinCompany', caption: 'Join Company', allowResizing: true, alignment: 'center', dataType: 'date', allowEditing: false, width: 130 },

            ]
        },
        {
            caption: 'Passport',
            columns: [
               // { dataField: 'PassportNumber', caption: 'No.', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 130 },
               // { dataField: 'DatePassportIssue', caption: 'Issue', allowResizing: true, alignment: 'center', dataType: 'date', allowEditing: false, width: 130 },
               // { dataField: 'DatePassportExpire', caption: 'Expire', allowResizing: true, alignment: 'center', dataType: 'date', allowEditing: false, width: 130 },
                 { dataField: 'RemainPassport', caption: 'Remain', allowResizing: true, alignment: 'center', dataType: 'number', allowEditing: false, width: 90 },
                //{ dataField: 'IsPassportExpired', caption: 'Expired', allowResizing: true, alignment: 'center', dataType: 'boolean', allowEditing: false, width: 80 },
            ]
        },
        {
            caption: 'Medical Checkup',
            columns: [
               
               // { dataField: 'DateLastCheckUP', caption: 'Last', allowResizing: true, alignment: 'center', dataType: 'date', allowEditing: false, width: 150 },
               // { dataField: 'DateNextCheckUP', caption: 'Next', allowResizing: true, alignment: 'center', dataType: 'date', allowEditing: false, width: 150 },
                { dataField: 'RemainMedical', caption: 'Remain', allowResizing: true, alignment: 'center', dataType: 'number', allowEditing: false, width: 90 },
               // { dataField: 'IsMedicalExpired', caption: 'Expired', allowResizing: true, alignment: 'center', dataType: 'boolean', allowEditing: false, width: 80 },
            ]
        },
        {
            caption: 'CAO',
            columns: [
               // { dataField: 'CaoCardNumber', caption: 'No.', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 130 },
                 
              //  { dataField: 'DateCaoCardIssue', caption: 'Issue', allowResizing: true, alignment: 'center', dataType: 'date', allowEditing: false, width: 130 },
               // { dataField: 'DateCaoCardExpire', caption: 'Expire', allowResizing: true, alignment: 'center', dataType: 'date', allowEditing: false, width: 130 },
                { dataField: 'RemainCAO', caption: 'Remain', allowResizing: true, alignment: 'center', dataType: 'number', allowEditing: false, width: 90 },
               // { dataField: 'IsCAOExpired', caption: 'Expired', allowResizing: true, alignment: 'center', dataType: 'boolean', allowEditing: false, width: 80 },

            ]
        }
        ,
        {
            caption: 'NDT',
            columns: [
               // { dataField: 'NDTNumber', caption: 'No.', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 130 },

               // { dataField: 'DateIssueNDT', caption: 'Issue', allowResizing: true, alignment: 'center', dataType: 'date', allowEditing: false, width: 130 },
                //{ dataField: 'DateExpireNDT', caption: 'Expire', allowResizing: true, alignment: 'center', dataType: 'date', allowEditing: false, width: 130 },
                { dataField: 'RemainNDT', caption: 'Remain', allowResizing: true, alignment: 'center', dataType: 'number', allowEditing: false, width: 90 },
               // { dataField: 'IsNDTExpired', caption: 'Expired', allowResizing: true, alignment: 'center', dataType: 'boolean', allowEditing: false, width: 80 },

            ]
        }
        //{ dataField: 'Name', caption: 'Name', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, },
        //{ dataField: 'IATA', caption: 'IATA', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 100 },
        //{ dataField: 'ICAO', caption: 'ICAO', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 100 },
        //{ dataField: 'City', caption: 'City', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 200 },
        //{ dataField: 'SortName', caption: 'Sort Name', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 200 },
        //{ dataField: 'Country', caption: 'Country', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 200 },
    ];

    $scope.rankDs = ['TRI', 'TRE', 'LTC', 'P1', 'P2', 'ISCCM', 'SCCM', 'CCM'];
    $scope.groupDs = ['Cockpit', 'Cabin' ];
    $scope.dg_columns2 = [
       
       //{
       //    dataField: "ImageUrl",
       //    width: 60,
       //    alignment: 'center',
       //    caption: '',
       //    allowFiltering: false,
       //    allowSorting: false,
       //    cellTemplate: function (container, options) {
       //        $("<div>")
       //            .append($("<img>", { "src": $rootScope.clientsFilesUrl + (options.value ? options.value : 'imguser.png'), "css": { height: '40px', width: '40px', borderRadius: '100%' } }))
       //            .appendTo(container);
       //    }
       //},
        { dataField: 'InActive', caption: 'InActive', allowResizing: true, alignment: 'center', dataType: 'boolean', allowEditing: true, width: 70, fixed: true, fixedPosition: 'left' },
        {
            dataField: 'JobGroupRoot', caption: 'Group', allowResizing: true
                     , lookup: {

                         dataSource: $scope.groupDs

                     } 
            , alignment: 'center', dataType: 'string', allowEditing: false, width: 150, fixed: true, fixedPosition: 'left'
        },
        {
            dataField: 'JobGroup', caption: 'Rank', allowResizing: true
                     ,    lookup: {

                             dataSource:$scope.rankDs

                         }
            , alignment: 'center', dataType: 'string', allowEditing: false, width: 150, fixed: true, fixedPosition: 'left'
        },
       { dataField: 'Name', caption: 'Name', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, width: 350, fixed: true, fixedPosition: 'left' },
                { dataField: 'ScheduleName', caption: 'Schedule', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 200 },

               { dataField: 'Mobile', caption: 'Mobile', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 130 },
        { dataField: 'RemainMedical', caption: 'Medical', allowResizing: true, alignment: 'center', dataType: 'number', allowEditing: false, width: 90 },
         { dataField: 'RemainPassport', caption: 'Passport', allowResizing: true, alignment: 'center', dataType: 'number', allowEditing: false, width: 90 },

          { dataField: 'RemainLicence', caption: 'Licence', allowResizing: true, alignment: 'center', dataType: 'number', allowEditing: false, width: 90 },
           { dataField: 'RemainProficiency', caption: 'LPC', allowResizing: true, alignment: 'center', dataType: 'number', allowEditing: false, width: 90 },
            { dataField: 'RemainProficiencyOPC', caption: 'OPC', allowResizing: true, alignment: 'center', dataType: 'number', allowEditing: false, width: 90 },
             { dataField: 'RemainLPR', caption: 'LPR', allowResizing: true, alignment: 'center', dataType: 'number', allowEditing: false, width: 90 },

             { dataField: 'RemainAvSec', caption: 'AvSec', allowResizing: true, alignment: 'center', dataType: 'number', allowEditing: false, width: 90 },
              { dataField: 'RemainSMS', caption: 'SMS', allowResizing: true, alignment: 'center', dataType: 'number', allowEditing: false, width: 90 },

        //7-12
        { dataField: 'RemainSEPTP', caption: 'SEPT-P', allowResizing: true, alignment: 'center', dataType: 'number', allowEditing: false, width: 90 },
        { dataField: 'RemainSEPT', caption: 'SEPT-T', allowResizing: true, alignment: 'center', dataType: 'number', allowEditing: false, width: 90 },


        { dataField: 'RemainDG', caption: 'DG', allowResizing: true, alignment: 'center', dataType: 'number', allowEditing: false, width: 90 },
                { dataField: 'RemainCRM', caption: 'CRM', allowResizing: true, alignment: 'center', dataType: 'number', allowEditing: false, width: 90 },
                { dataField: 'RemainCCRM', caption: 'CCRM', allowResizing: true, alignment: 'center', dataType: 'number', allowEditing: false, width: 90 },
        //moradi
        { dataField: 'RemainFirstAid', caption: 'FirstAid', name: 'FirstAid', allowResizing: true, alignment: 'center', dataType: 'number', allowEditing: false, width: 90, visible:false },
        { dataField: 'RemainLine', caption: 'Line',name:'Line', allowResizing: true, alignment: 'center', dataType: 'number', allowEditing: false, width: 100 },
        { dataField: 'RemainRecurrent', caption: 'Recurrent',name:'Recurrent', allowResizing: true, alignment: 'center', dataType: 'number', allowEditing: false, width: 100,visible:false },
        //moradi2
        { dataField: 'RemainCMC', caption: 'CMC', allowResizing: true, alignment: 'center', dataType: 'number', allowEditing: false, width: 90 },
        
    ];

    $scope.dg_selected = null;
    $scope.dg_instance = null;
    $scope.dg_ds = null;
    $scope.dg = {
        headerFilter: {
            visible: false
        },
        filterRow: {
            visible: true,
            showOperationChooser: true,
        },
        showRowLines: true,
        showColumnLines: true,
        sorting: {
            mode: "multiple"
        },

        noDataText: '',

        allowColumnReordering: true,
        allowColumnResizing: true,
        scrolling: { mode: 'infinite' },
        paging: { pageSize: 100 },
        showBorders: true,
        //3-16
        selection: { mode: 'multiple' },

        columnAutoWidth: false,
        height: $(window).height() - 135,

        columns: $scope.dg_columns2,
        onContentReady: function (e) {
            if (!$scope.dg_instance)
                $scope.dg_instance = e.component;

        },
        onSelectionChanged: function (e) {
            var data = e.selectedRowsData[0];

            if (!data) {
                $scope.dg_selected = null;
            }
            else
                $scope.dg_selected = data;


        },
        //"export": {
        //    enabled: true,
        //    fileName: "Employees",
        //    allowExportSelectedData: true
        //},
        onCellPrepared: function (e) {
            
            if (e.rowType === "data" && e.column.dataField == "RemainMedical") {
                $scope.styleCell(e, e.data.RemainMedical);
            }
            if (e.rowType === "data" && e.column.dataField == "RemainPassport") {
                $scope.styleCell(e, e.data.RemainPassport);
            }
            if (e.rowType === "data" && e.column.dataField == "RemainLicence") {
                $scope.styleCell(e, e.data.RemainLicence);
            }
            if (e.rowType === "data" && e.column.dataField == "RemainProficiency") {
                $scope.styleCell(e, e.data.RemainProficiency);
            }
            if (e.rowType === "data" && e.column.dataField == "RemainProficiencyOPC") {
                $scope.styleCell(e, e.data.RemainProficiencyOPC);
            }
            if (e.rowType === "data" && e.column.dataField == "RemainLPR") {
                $scope.styleCell(e, e.data.RemainLPR);
            }
            if (e.rowType === "data" && e.column.dataField == "RemainAvSec") {
                $scope.styleCell(e, e.data.RemainAvSec);
            }
            if (e.rowType === "data" && e.column.dataField == "RemainSMS") {
                $scope.styleCell(e, e.data.RemainSMS);
            }

            if (e.rowType === "data" && e.column.dataField == "RemainCRM") {
                $scope.styleCell(e, e.data.RemainCRM);
            }
            if (e.rowType === "data" && e.column.dataField == "RemainCCRM") {
                $scope.styleCell(e, e.data.RemainCCRM);
            }
            if (e.rowType === "data" && e.column.dataField == "RemainSEPT") {
                $scope.styleCell(e, e.data.RemainSEPT);
            }
            //7-12
            if (e.rowType === "data" && e.column.dataField == "RemainSEPTP") {
                $scope.styleCell(e, e.data.RemainSEPTP);
            }
            if (e.rowType === "data" && e.column.dataField == "RemainDG") {
                $scope.styleCell(e, e.data.RemainDG);
            }
            if (e.rowType === "data" && e.column.dataField == "RemainFirstAid") {
                $scope.styleCell(e, e.data.RemainFirstAid);
            }

            


            if (e.rowType === 'data'
                && ((e.column.dataField == "RemainMedical")
                 || (e.column.dataField == "RemainPassport")
                  || (e.column.dataField == "RemainLicence")
                 || (e.column.dataField == "RemainProficiency")
                 || (e.column.dataField == "RemainProficiencyOPC")
                || (e.column.dataField == "RemainLPR")
                || (e.column.dataField == "RemainAvSec")
                || (e.column.dataField == "RemainSMS")

                || (e.column.dataField == "RemainCRM")
                || (e.column.dataField == "RemainCCRM")
                || (e.column.dataField == "RemainSEPT")
                //7-12
                || (e.column.dataField == "RemainSEPTP")
                || (e.column.dataField == "RemainDG")
                || (e.column.dataField == "RemainFirstAid")
              
                || (e.column.dataField == "RemainLine")
                || (e.column.dataField == "RemainRecurrent")
                //moradi2
                || (e.column.dataField == "RemainCMC")
                )
                && ((!e.value && e.value!=0) || e.value == '-100000')) {
                 
                e.cellElement.html('?');
            }

            if (e.rowType === 'data' && e.value == '1000000')
            {
                e.cellElement.html('N/A');
            }
               
        },
        onCellClick:function(e){
            if (e.column.dataField=='InActive')
            {
                var newvalue = !e.value;
                e.data.InActive = newvalue;
                personService.active({Id:e.data.Id}).then(function (response) {
                     
                    $scope.dg_instance.refresh(true);

                }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
               
            }
        },
        editing: {
            allowUpdating: false,
            mode: 'cell'
        },
        bindingOptions: {
            dataSource: 'dg_ds'
        }
    };

    $scope.styleCell = function (e, value) {
        if (value && value == 1000000) {
            //#a6a6a6

            return;
        }
        if (value>45)
            return;
        //moradi2
         
        if ((!value && value!==0) || value == -100000) {
            //#a6a6a6
            e.cellElement.css("backgroundColor", "#a6a6a6");
            e.cellElement.css("color", "#fff");
            return;
        }
        if (value>30 && value<=45){
            e.cellElement.css("backgroundColor", "#ffd633");
            e.cellElement.css("color", "#000");
        }
        else if (value > 0 && value <= 30) {
            e.cellElement.css("backgroundColor", "#ffa64d");
            e.cellElement.css("color", "#000");
        }
        else if (value <= 0) {
            e.cellElement.css("backgroundColor", "#ff471a");
            e.cellElement.css("color", "#fff");
        }
        //e.cellElement.css("backgroundColor", "#ffcccc");
    }
    $scope.doRefresh = false;
    $scope.showActive = false;
    $scope.rankGroup ='Cockpit';
    $scope.sb_rankgroup = {
        width:150,
        showClearButton: false,
        searchEnabled: false,
        dataSource: ['Cockpit','Cabin','All'],
        //readOnly:true,
        onValueChanged: function (e) {
            //moradi
            if (e.value == 'Cockpit') {
                $scope.dg_instance.columnOption('FirstAid', 'visible', false);
                $scope.dg_instance.columnOption('LPC', 'visible', true);
                $scope.dg_instance.columnOption('OPC', 'visible', true);
                $scope.dg_instance.columnOption('Licence', 'visible', true);
                $scope.dg_instance.columnOption('LPR', 'visible', true);
                $scope.dg_instance.columnOption('Line', 'visible', true);
                $scope.dg_instance.columnOption('Recurrent', 'visible', false);
            }
            //if (e.value == 'Cabin')
        else
            {
                $scope.dg_instance.columnOption('FirstAid', 'visible', true);
                $scope.dg_instance.columnOption('LPC', 'visible', false);
                $scope.dg_instance.columnOption('OPC', 'visible', false);
                $scope.dg_instance.columnOption('Licence', 'visible', false);
                $scope.dg_instance.columnOption('LPR', 'visible', false);
                $scope.dg_instance.columnOption('Line', 'visible', false);
                $scope.dg_instance.columnOption('Recurrent', 'visible', true);
            }
            $scope.$broadcast('getFilterQuery', null);
        },
        bindingOptions: {
            value: 'rankGroup',
            
        }
    };
    $scope.chk_active = {
        text: 'Only Active Employees',
        onValueChanged:function(e){
            $scope.$broadcast('getFilterQuery', null);
        },
        bindingOptions: {
            value: 'showActive',
             
        }
    };

    ////////////////////
    //3-16
    $scope.btn_sms = {
        text: 'Notify',
        type: 'default',
        //icon: 'plus',
        width: 120,
        onClick: function (e) {
            var selected = $rootScope.getSelectedRows($scope.dg_instance);
            if (!selected) {
                General.ShowNotify(Config.Text_NoRowSelected, 'error');
                return;
            }
           
            $scope.popup_sms_visible = true;
        },
        bindingOptions: {
           
        }

    };
    //moradi2
    $scope.btn_training = {
        text: 'Training',
        type: 'default',
        //icon: 'plus',
        width: 140,
        onClick: function (e) {
            $window.open('#!/training/', '_blank');
        },
        bindingOptions: {

        }

    };
    $scope.txt_sms_message = {
        height: 300,
        bindingOptions: {
            value: 'sms_message',

        }
    };
    $scope.popup_sms_visible = false;
    $scope.popup_sms_title = 'Notification';
    $scope.popup_sms = {
        elementAttr: {
            //  id: "elementId",
            class: "popup_sms"
        },
        shading: true,
        //position: { my: 'left', at: 'left', of: window, offset: '5 0' },
        height: 450,
        width: 600,
        fullScreen: false,
        showTitle: true,
        dragEnabled: true,

        toolbarItems: [

            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'success', text: 'Send', validationGroup: "smsmessageperson", onClick: function (arg) {

                        var result = arg.validationGroup.validate();

                        if (!result.isValid ) {
                            General.ShowNotify(Config.Text_FillRequired, 'error');
                            return;
                        }
                        var selected = $rootScope.getSelectedRows($scope.dg_instance);

                        var names = Enumerable.From(selected).Select('$.Name').ToArray().join('_');
                        var mobiles = Enumerable.From(selected).Select('$.Mobile').ToArray().join('_');
                        var dto = { names: names, mobiles: mobiles, message: $scope.sms_message, sender: $rootScope.userName };
                        $scope.loadingVisible = true;

                        flightService.sendSMS(dto).then(function (response) {
                            $scope.loadingVisible = false;
                            General.ShowNotify(Config.Text_SavedOk, 'success');
                            $scope.popup_sms_visible = false;

                        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });



                    }
                }, toolbar: 'bottom'
            },

            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'danger', text: 'Close', icon: 'remove', onClick: function (arg) {

                        $scope.popup_sms_visible = false;

                    }
                }, toolbar: 'bottom'
            }
        ],
        visible: false,

        closeOnOutsideClick: false,
        onTitleRendered: function (e) {
            // $(e.titleElement).addClass('vahid');
            // $(e.titleElement).css('background-color', '#f2552c');
        },
        onShowing: function (e) {

        },
        onShown: function (e) {
             
        },
        onHiding: function () {
           
            $scope.popup_sms_visible = false;

        },
        bindingOptions: {
            visible: 'popup_sms_visible',

            title: 'popup_sms_title',

        }
    };
    //////////////////////
    //2021-06-29
    //USER
    //////////////////////////////////////
    $scope.btn_user = {
        text: 'User',
        type: 'default',
        icon: 'user',
        width: 120,
        onClick: function (e) {
            $scope.dg_selected = $rootScope.getSelectedRow($scope.dg_instance);
            if (!$scope.dg_selected) {
                General.ShowNotify(Config.Text_NoRowSelected, 'error');
                return;
            }
            var isCrew = $scope.dg_selected.JobGroupCode.startsWith('00101') || $scope.dg_selected.JobGroupCode.startsWith('00102');
            if (!isCrew) {
                return;
            }
            $scope.getUsers(function () {
                $scope.loadingVisible = true;
                personService.getCrewLight(Config.CustomerId, $scope.dg_selected.Id).then(function (response) {
                    $scope.loadingVisible = false;
                    var _data = response[0];
                    $scope.employee = _data;
                    $scope.dto_user.FirstName = $scope.employee.FirstName;
                    $scope.dto_user.LastName = $scope.employee.LastName;
                    $scope.dto_user.PhoneNumber = $scope.employee.Mobile;
                    $scope.dto_user.PersonId = $scope.employee.PersonId;
                    console.log($scope.employee);
                    if (!$scope.employee.UserId) {
                        $scope.user = null;
                        $scope.userId = null;
                    }
                    else {


                        $scope.user = Enumerable.From($scope.users).Where('$.Id=="' + $scope.employee.UserId + '"').FirstOrDefault();

                    }

                    $scope.dto_user.UserId = null;
                    $scope.dto_user.Id = null;
                    $scope.dto_user.UserName = null;
                    $scope.IsUserEdit = false;
                    if ($scope.user) {
                        $scope.dto_user.UserId = $scope.user.Id;
                        $scope.dto_user.UserName = $scope.user.UserName;
                        $scope.dto_user.Id = $scope.user.Id;
                        $scope.IsUserEdit = true;
                    }
                     
                    $scope.popup_user_visible = true;
                });
            });
           
           
        },
        bindingOptions: {
            //visible: 'IsEditable'
        }

    };

    $scope.selectedPassword = null;
    $scope.btn_password = {
        text: 'Password',
        type: 'default',
        icon: 'key',
        width: 150,

        onClick: function (e) {
            $scope.selectedPassword  = $rootScope.getSelectedRow($scope.dg_instance);
            if (!$scope.selectedPassword ) {
                General.ShowNotify(Config.Text_NoRowSelected, 'error');
                return;
            }
            var isCrew = $scope.selectedPassword.JobGroupCode.startsWith('00101') || $scope.selectedPassword.JobGroupCode.startsWith('00102');
            if (!isCrew) {
                return;
            }
            $scope.loadingVisible = true;
            personService.getCrewLight(Config.CustomerId, $scope.selectedPassword.Id).then(function (response) {
                $scope.loadingVisible = false;
                var _data = response[0];
                
                if (!_data.UserId) {
                    General.ShowNotify("user not found", 'error');
                    return;
                }
                $scope.selectedPassword = _data;
                $scope.popup_password_visible = true;
            });
          

        }

    };
    /////////////////////////////////////
    $scope.newPassword = '';
    $scope.txt_newPassword = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'newPassword',


        }
    };
    $scope.popup_password_visible = false;
    $scope.popup_password_title = 'Password';

    $scope.popup_password = {

        fullScreen: false,
        showTitle: true,
        width: 400,
        height: 200,
        toolbarItems: [

            { widget: 'dxButton', location: 'after', options: { type: 'success', text: 'Save', icon: 'check', validationGroup: 'password', bindingOptions: {} }, toolbar: 'bottom' },
            { widget: 'dxButton', location: 'after', options: { type: 'danger', text: 'Close', icon: 'remove', }, toolbar: 'bottom' }
        ],

        visible: false,
        dragEnabled: true,
        closeOnOutsideClick: false,
        onShowing: function (e) {


        },
        onShown: function (e) {


        },
        onHiding: function () {

            // $scope.clearEntity();

            $scope.popup_password_visible = false;

        },
        onContentReady: function (e) {

        },
        bindingOptions: {
            visible: 'popup_password_visible',

        }
    };
    $scope.popup_password.toolbarItems[1].options.onClick = function (e) {

        $scope.popup_password_visible = false;
    };

    //save button
    $scope.popup_password.toolbarItems[0].options.onClick = function (e) {
        //sook
        // alert($scope.dto.Roles);
        var result = e.validationGroup.validate();

        if (!result.isValid) {
            General.ShowNotify(Config.Text_FillRequired, 'error');
            return;
        }
        var dto = { Id: $scope.selectedPassword.UserId, Password: $scope.newPassword }

        $scope.loadingVisible = true;
        authService.setPassword(dto).then(function (response) {
            $scope.loadingVisible = false;
            $scope.newPassword = '';
            $scope.popup_password_visible = false;


        },
            function (err) {
                $scope.loadingVisible = false;
                $scope.message = err.message;
                General.ShowNotify(err.message, 'error');

            });

    };
    /////////////////////////////
    $scope.dto_user = {
        UserId: null,
        UserName: null,
        Password: '1234@aA',
        FirstName: null,
        LastName: null,
        PhoneNumber: null,
        Email: '',
        PersonId: -1,
        Id: null,
    };
    $scope.popup_user_visible = false;
    $scope.popup_user_title = 'User';
    $scope.popup_user_instance = null;
    $scope.popup_user = {

        fullScreen: false,
        showTitle: true,
        width: 400,
        height: 400,
        toolbarItems: [

            { widget: 'dxButton', location: 'after', options: { type: 'success', text: 'Save', icon: 'check', validationGroup: 'useradd', bindingOptions: {} }, toolbar: 'bottom' },
            { widget: 'dxButton', location: 'after', options: { type: 'danger', text: 'Close', icon: 'remove', }, toolbar: 'bottom' }
        ],

        visible: false,
        dragEnabled: true,
        closeOnOutsideClick: false,
        onShowing: function (e) {


        },
        onShown: function (e) {
           

        },
        onHiding: function () {

            // $scope.clearEntity();
            $scope.users = [];
            $scope.user = null;
            $scope.employeeId = null;
            $scope.userId = null;
            $scope.personId = null;
            $scope.employee = null;
            $scope.IsUserEdit = false;
            $scope.dto_user = {
                Id: null,
                UserId: null,
                UserName: null,
                Password: '1234@aA',
                FirstName: null,
                LastName: null,
                PhoneNumber: null,
                Email: '',
                PersonId: -1,
            };
            $scope.popup_user_visible = false;

        },
        onContentReady: function (e) {
            if (!$scope.popup_user_instance)
                $scope.popup_user_instance = e.component;

        },
        bindingOptions: {
            visible: 'popup_user_visible',

        }
    };
    $scope.popup_user.toolbarItems[1].options.onClick = function (e) {

        $scope.popup_user_visible = false;
    };

    //save button
    $scope.popup_user.toolbarItems[0].options.onClick = function (e) {
        //sook
        
        var result = e.validationGroup.validate();

        if (!result.isValid) {
            General.ShowNotify(Config.Text_FillRequired, 'error');
            return;
        }
         $scope.dto_user.Email = $scope.dto_user.FirstName.replace(/\s/g, '') + '.' + $scope.dto_user.LastName.replace(/\s/g, '') + '@airpocket.ir';
         $scope.loadingVisible = true;
        if (!$scope.IsUserEdit) {
            //if ($scope.personId)
            //    $scope.dto.PersonId = $scope.personId;
            //else
            //    $scope.dto.PersonId = -1;
            authService.register2($scope.dto_user).then(function (response) {
                $scope.loadingVisible = false;
                $scope.dto_user = {
                    UserId: null,
                    UserName: null,
                    Password: '1234@aA',
                    FirstName: null,
                    LastName: null,
                    PhoneNumber: null,
                    Email: '',
                    PersonId: -1,
                    Id: null,
                };
                $scope.personId = null;
                $scope.popup_user_visible = false;


            },
                function (err) {
                    $scope.loadingVisible = false;
                    $scope.message = err.message;
                    General.ShowNotify(err.message, 'error');

                });
        }
        else {
          
            authService.updateUser($scope.dto_user).then(function (response) {
                $scope.loadingVisible = false;
                $scope.dto_user = {
                    UserId: null,
                    UserName: null,
                    Password: '1234@aA',
                    FirstName: null,
                    LastName: null,
                    PhoneNumber: null,
                    Email: '',
                    PersonId: -1,
                    Id: null,
                };
                $scope.popup_user_visible = false;


            },
                function (err) {
                    $scope.loadingVisible = false;
                    $scope.message = err.message;
                    General.ShowNotify(err.message, 'error');

                });
        }


    };
    /////////////////////////////////////
    $scope.users = [];
    $scope.getUsers = function (callback) {

        $scope.loadingVisible = true;
        authService.getUsers().then(function (response) {
            $scope.loadingVisible = false;

            $scope.users = response;
            if (callback)
                callback();


        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
    };
    $scope.getDatasourceEmployees = function (cid) {
        return new DevExpress.data.DataSource({
            store:

                new DevExpress.data.ODataStore({
                    url: $rootScope.serviceUrl + 'odata/employees/light/' + cid,
                    version: 4
                }),

            sort: ['LastName'],
        });
    };
    $scope.isPropDisabled = false;
    $scope.employeeId = null;
    $scope.userId = null;
    $scope.user = null;
    $scope.personId = null;
    $scope.employee = null;
    $scope.IsUserEdit = false;
   
    $scope.txtuser_UserName = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'dto_user.UserName',

        }
    };
    $scope.txtuser_Password = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'dto_user.Password',


        }
    };
    $scope.txtuser_FirstName = {
        hoverStateEnabled: false,

        valueChangeEvent: 'keyup',
        onValueChanged: function (e) {
           // $scope.nameChanged();
        },
        readOnly:true,
        bindingOptions: {
            value: 'dto_user.FirstName',
             
        }
    };
    $scope.txtuser_LastName = {
        hoverStateEnabled: false,
        valueChangeEvent: 'keyup',
        onValueChanged: function (e) {
            //$scope.nameChanged();
        },
        readOnly:true,
        bindingOptions: {
            value: 'dto_user.LastName',
            
        }
    };
    $scope.txtuser_phone = {
        hoverStateEnabled: false,
        readOnly:true,
        bindingOptions: {
            value: 'dto_user.PhoneNumber',
             
        }
    };
    $scope.sb_employees = {
        showClearButton: true,
        searchEnabled: true,
        dataSource: $scope.getDatasourceEmployees(Config.CustomerId),
        //itemTemplate: function (data) {
        //    return $rootScope.getSbTemplateAirport(data);
        //},

        searchExpr: ["Name"],
        displayExpr: "Name",
        valueExpr: 'PersonId',
        onSelectionChanged: function (arg) {

            $scope.employee = arg.selectedItem;
            $scope.dto_user.FirstName = $scope.employee.FirstName;
            $scope.dto_user.LastName = $scope.employee.LastName;
            $scope.dto_user.PhoneNumber = $scope.employee.Mobile;
            $scope.dto_user.PersonId = $scope.employee.personId;
            console.log($scope.employee);
            if (!$scope.employee.UserId) {
                $scope.user = null;
                $scope.userId = null;
            }
            else {
                 

                $scope.user = Enumerable.From($scope.users).Where('$.Id=="' + $scope.employee.UserId + '"').FirstOrDefault();
                
            }

            $scope.dto_user.UserId = null;
            $scope.dto_user.UserName = null;
            $scope.IsUserEdit = false;
            if ($scope.user) {
                $scope.dto_user.UserId = $scope.user.Id;
                $scope.dto_user.UserName = $scope.user.UserName;
                
                $scope.IsUserEdit = true;
            }
            
            

        },
        bindingOptions: {
            value: 'personId',

        }
    };
    //////////////////////
    $scope.getFilters = function () {
        var filters = $scope.filters;
        if (filters.length == 0)
            filters = [['Id', '>', 0]];
        else {
            //filters.push('and');
            //filters.push(['OfficeCode', 'startswith', $scope.ParentLocation.FullCode]);

        }
        if ($scope.showActive)
            filters.push(['InActive', '=', false]);
        if ($scope.rankGroup!='All')
            filters.push(['JobGroupRoot', '=', $scope.rankGroup]);

        return filters;
    };
    $scope.bind = function () {
        
        if (!$scope.dg_ds) {
            $scope.dg_ds = {
                store: {
                    type: "odata",
                    url: $rootScope.serviceUrl + 'odata/employees/light/' + ($scope.isCrew?'crew/':'') + Config.CustomerId,
                    key: "Id",
                     version: 4,
                    onLoaded: function (e) {
                        // $scope.loadingVisible = false;
                        //filter
                        $rootScope.$broadcast('OnDataLoaded', null);
                    },
                    beforeSend: function (e) {

                        $scope.dsUrl = General.getDsUrl(e);

                        // $scope.$apply(function () {
                        //    $scope.loadingVisible = true;
                        // });
                        $rootScope.$broadcast('OnDataLoading', null);
                    },
                },
                // filter: [['InActive', '=', false]],
                // sort: ['DatePay', 'Amount'],

            };
        }

        if ($scope.doRefresh) {
            $scope.filters = $scope.getFilters();
            $scope.dg_ds.filter = $scope.filters;
            $scope.dg_instance.refresh();
            $scope.doRefresh = false;
        }

    };
    ///////////////////////
    if (!authService.isAuthorized()) {

        authService.redirectToLogin();
    }
    else {
        $rootScope.page_title = '> People';
        $('.person').fadeIn();
    }
    //////////////////////////////////////////
    $scope.$on('getFilterResponse', function (event, prms) {
        
        $scope.filters = prms;

        $scope.doRefresh = true;
        $scope.bind();
    });
    $scope.$on('onTemplateSearch', function (event, prms) {

        $scope.$broadcast('getFilterQuery', null);
    });
    $scope.$on('onPersonSaved', function (event, prms) {

        $scope.doRefresh = true;
    });
    $scope.$on('onPersonHide', function (event, prms) {

        $scope.bind();

    });
    //////////////////////////////////////////
    $scope.$on('$viewContentLoaded', function () {
       
        setTimeout(function () {
            $scope.showActive = true;
            
            //$scope.$broadcast('getFilterQuery', null);
        },  500);
    });
    $rootScope.$broadcast('PersonLoaded', null);
    ///end
}]);