'use strict';
app.controller('qaReferController', ['$scope', '$location', 'qaService', 'authService', '$routeParams', '$rootScope', '$window', '$sce', function ($scope, $location, qaService, authService, $routeParams, $rootScope, $window, $sce) {



    $scope.commentEntity = {};
    $scope.files = [];

    $scope.selectedTabIndex = -1;
    $scope.selectedTabId = null;
    $scope.popupselectedTabIndex = -1;
    $scope.popupselectedTabId = null;
    $scope.tabs = [
        { text: "Comment", id: 'comment' },
        { text: "Attachment", id: 'attachment' },
    ];


    $scope.$watch("selectedTabIndex", function (newValue) {
        //ati
        try {
            $('.tabs').hide();
            var id = $scope.tabs[newValue].id;
            $scope.selectedTabId = id;
            $('#' + id).fadeIn();

            switch (id) {
                case 'comment':

                    break;

                case 'attachment':

                    break;


                default:
                    break;
            }
            if ($scope.dg_comment_instance)
                $scope.dg_comment_instance.refresh();
            if ($scope.dg_attachment_instance)
                $scope.dg_attachment_instance.refresh();

        }
        catch (e) {

        }


    });


    $scope.tabs_options = {
        scrollByContent: true,
        showNavButtons: true,


        onItemClick: function (arg) {
            //$scope.selectedTab = arg.itemData;

        },
        onItemRendered: function (e) {
            $scope.selectedTabIndex = -1;
            $scope.selectedTabIndex = 0;
        },
        bindingOptions: {
            //visible: 'tabsdatevisible',
            dataSource: { dataPath: "tabs", deep: true },
            selectedIndex: 'selectedTabIndex'
        }

    };



    $scope.isFullScreen = false
    $scope.popup_comment_visible = false;
    $scope.popup_height = 750;
    $scope.popup_width = 750;
    $scope.popup_comment_title = 'Comment';
    $scope.popup_instance = null;

    $scope.popup_comment = {


        showTitle: true,

        toolbarItems: [

            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'success', text: 'Save', icon: 'check', validationGroup: 'catering', onClick: function (e) {
                        $scope.commentEntity.files = $scope.files;
                        qaService.sendComment($scope.commentEntity).then(function (res) {
                            if (res.IsSuccess == true) {
                                $scope.loadingVisible = false;
                                $scope.popup_comment_visible = false;
                            }

                        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });



                    }
                }, toolbar: 'bottom'
            },

            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'danger', text: 'Close', icon: 'remove', onClick: function (e) {
                        $scope.popup_comment_visible = false;
                    }
                }, toolbar: 'bottom'
            }

        ],

        visible: false,
        dragEnabled: true,
        closeOnOutsideClick: false,
        onShowing: function (e) {
            $scope.popup_instance.repaint();


        },
        onShown: function (e) {



        },
        onHiding: function () {
            $scope.files = [];
            $scope.commentEntity.Comment = null;
            $scope.bind();
        },
        onContentReady: function (e) {
            if (!$scope.popup_instance)
                $scope.popup_instance = e.component;

        },
        bindingOptions: {
            visible: 'popup_comment_visible',
            fullScreen: 'isFullScreen',
            title: 'popup_comment_title',
            height: 'popup_height',
            width: 'popup_width',
            //'toolbarItems[0].visible': 'isEditable',
            //'toolbarItems[2].visible': 'isEditable',

        }
    };

    $scope.btn_comment = {
        text: 'Comment',
        type: 'success',
        width: '100%',
        onClick: function (e) {
            $scope.popup_comment_visible = true;
        }
    }

    $scope.uploaderValueDocument = [];
    $scope.fileList = [];
    $scope.fileNames = [];
    $scope.fileCount = 0
    var id = -1;
    $scope.uploader_document_instance = null;
    $scope.uploader_document = {
        multiple: true,
        labelText: '',
        selectButtonText: 'Select Files',
        uploadMethod: 'POST',
        uploadMode: "instantly",

        uploadUrl: apiQA + 'api/qa/uploadfile?t=clientfiles',



        onUploadStarted: function (res) {
            $scope.loadingVisible = true;
            $scope.fileList.push(res.file);
            $scope.fileCount = $scope.fileList.length;
            $scope.loadingVisible = true;
        },



        onUploaded: function (e) {
            $scope.loadingVisible = false;
            $.each(e, function (_i, _d) {
                $scope.files.push({ Id: id = id + 1, AttachmentId: -1, FileName: _d.name, FileType: _d.type });
            });

        },

        bindingOptions: {
            value: 'uploaderValueDocument'
        }
    };


    $scope.dg_attachment_columns = [


        {
            cellTemplate: function (container, options) {
                $("<div style='text-align:center'/>")
                    .html(options.rowIndex + 1)
                    .appendTo(container);
            }, name: 'row', caption: '#', width: 50, fixed: true, fixedPosition: 'left', allowResizing: false, cssClass: 'rowHeader'
        },


        { dataField: 'FileName', caption: 'Name', allowResizing: true, alignment: 'center', dataType: 'number', allowEditing: false, minWidth: 150 },
        {
            dataField: "Id",
            caption: '',
            width: 140,
            allowFiltering: false,
            allowSorting: false,
            cellTemplate: 'downloadTemplate',
            name: 'downloadFile',
            fixed: true,
            fixedPosition: 'right',
        },

        {
            dataField: "Id",
            caption: '',
            width: 140,
            allowFiltering: false,
            allowSorting: false,
            cellTemplate: 'deleteTemplate',
            name: 'deleteFile',
            fixed: true,
            fixedPosition: 'right',
        },



    ];
    $scope.dg_attachment_selected = null;
    $scope.dg_attachment_instance = null;
    $rootScope.dg_attachment_ds = null;
    $scope.dg_attachment = {
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
        selection: { mode: 'single' },

        columnAutoWidth: true,
        height: 550,
        width: "100%",
        columns: $scope.dg_attachment_columns,
        onContentReady: function (e) {
            if (!$scope.dg_attachment_instance)
                $scope.dg_attachment_instance = e.component;

        },



        onSelectionChanged: function (e) {
            var data = e.selectedRowsData[0];
            if (!data) {
                $scope.dg_attachment_selected = null;
            }
            else
                $scope.dg_attachment_selected = data;


        },




        bindingOptions: {
            dataSource: 'files'
        },
        columnChooser: {
            enabled: false
        },

    };



    $scope.deleteFile = function (f) {

        console.log(f);

        if (f.Id != -1) {
            $.each($scope.files, function (_i, _d) {
                if (_d.Id == f.Id)
                    $scope.attachment = _d;
            });
        } else {
            $.each($scope.files, function (_i, _d) {
                if (_d.AttachmentId == f.AttachmentId)
                    $scope.attachment = _d;
            });
        }



        qaService.deleteAttachment($scope.attachment).then(function (response) {
            if (f.Id != -1) {
                $scope.files = Enumerable.From($scope.files).Where(function (x) {
                    return x.Id != f.Id;
                }).ToArray();
            } else {
                $scope.files = Enumerable.From($scope.files).Where(function (x) {
                    return x.AttachmentId != f.AttachmentId;
                }).ToArray();
            }
        });
    }

    

    $scope.download = function (fileName) {
        $scope.loadingVisible = true;
        var filename = fileName.split(".");
        qaService.downloadQa(filename[0], filename[1]).then(function (response) {
            $scope.loadingVisible = false;
        });
    }



    $scope.bind = function () {
        qaService.getReferredList($scope.commentEntity.EmployeeId, $scope.commentEntity.Type, $scope.commentEntity.Id).then(function (response) {
            $rootScope.referred_list_ds = response.Data;
        });

        qaService.getComments($scope.commentEntity.Id, $scope.commentEntity.Type).then(function (response) {
            $scope.comments = response.Data;
        });

        qaService.getImportedFile($scope.commentEntity.Id, $scope.commentEntity.ProducerId, $scope.commentEntity.Type).then(function (response) {
            $rootScope.dg_attachments_ds = response.Data;
        });
    };




    $scope.scroll_comment_height = $(window).height() - 200;
    $scope.scroll_comment = {
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
            height: 'scroll_comment_height'
        }

    };



    $scope.btn_send = {
        type: 'success',
        icon: 'add',

        bindingOptions: {},
        onClick: function (e) {

            qaService.sendComment($scope.commentEntity).then(function (response) {
                qaService.getComments($scope.commentEntity.Id, $scope.commentEntity.Type).then(function (response) {
                    $rootScope.dg_comment_ds = response.Data;
                });
            });
        }

    };


    $scope.txt_referComment = {
        readOnly: true,
        focusStateEnabled: false,
        height: 90,
        bindingOptions: {
            value: 'commentEntity.referComment'
        }
    }

    $scope.txt_comment = {

        bindingOptions: {
            value: 'commentEntity.Comment'
        }
    }



    $scope.dg_comment_columns = [


        /*{
            cellTemplate: function (container, options) {
                $("<div style='text-align:center'/>")
                    .html(options.rowIndex + 1)
                    .appendTo(container);
            }, name: 'row', caption: '#', width: 50, fixed: true, fixedPosition: 'left', allowResizing: false, cssClass: 'rowHeader'
        },
*/


        { dataField: 'DateComment', caption: 'Date', allowResizing: true, alignment: 'center', dataType: 'date', format: 'yyyy-MM-dd', allowEditing: false, width: 120, },

        { dataField: 'name', caption: 'Name', allowResizing: true, alignment: 'left', dataType: 'number', allowEditing: false, width: 250, fixed: true, fixedPosition: 'left' },
        { dataField: 'Comment', caption: 'Comment', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, minWidth: 400 },







    ];
    $scope.dg_comment_selected = null;
    $rootScope.dg_comment_instance = null;
    $rootScope.dg_comment_ds = null;
    $scope.dg_comment = {



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
        selection: { mode: 'single' },

        columnAutoWidth: false,
        height: $(window).height() - 250,
        columns: $scope.dg_comment_columns,
        onContentReady: function (e) {
            if (!$rootScope.dg_comment_instance)
                $rootScope.dg_comment_instance = e.component;

        },

        onRowClick: function (e) {

        },

        onRowPrepared: function (e) {
        },

        onSelectionChanged: function (e) {
            var data = e.selectedRowsData[0];


            if (!data) {
                $scope.dg_comment_selected = null;
            }
            else
                $scope.dg_comment_selected = data;


        },

        bindingOptions: {
            dataSource: 'dg_comment_ds'
        },
        columnChooser: {
            enabled: false
        },

    };





    $scope.referred_list_columns = [
        { dataField: 'ReferredName', caption: 'Name', allowResizing: true, alignment: 'left', dataType: 'string', allowEditing: false, fixed: true, fixedPosition: 'left', minWidth: 300 },
        { dataField: 'ReviewResultTitle', caption: 'Status', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 150 },
        { dataField: 'DateStatus', caption: 'Date', allowResizing: true, alignment: 'center', dataType: 'date', allowEditing: false, width: 150 },
        //{ dataField: 'Comment', caption: 'Note', allowResizing: true, alignment: 'left', dataType: 'date', allowEditing: false, width: 300 },
    ];

    $scope.tree_height = $(window).height() - 300;
    $scope.referred_list = {
        keyExpr: 'Id',
        parentIdExpr: 'ParentId',
        columns: $scope.referred_list_columns,
        noDataText: '',
        columnAutoWidth: true,

        onContentReady: function (e) {
            if (!$scope.referred_list_instance)
                $rootScope.referred_list_instance = e.component;
        },

        onRowClick: function (e) {
            $scope.commentEntity.referComment = e.data.Comment;
        },

        bindingOptions: {
            dataSource: 'referred_list_ds',
            height: 'tree_height'

        }
    }


    $scope.ht_click = function ($event, id) {

        $('.ht').removeClass('selected');
        $($event.currentTarget).addClass('selected');
        $('.ht_content').hide();
        $('#' + id).fadeIn();

    }





    $scope.$on('InitTest', function (event, prms) {


        $scope.tempData = prms;
        $scope.commentEntity.Id = $scope.tempData.Id;
        $scope.commentEntity.Type = parseInt($scope.tempData.Type);
        $scope.commentEntity.ProducerId = parseInt($scope.tempData.ProducerId);
        $scope.commentEntity.EmployeeId = $scope.tempData.EmployeeId;
        $rootScope.isNotDetermined = $scope.tempData.isNotDetermined;

        $scope.bind();
    });



}]);


