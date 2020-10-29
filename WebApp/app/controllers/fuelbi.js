'use strict';
app.controller('fuelController', ['$scope', '$location', '$routeParams', '$rootScope', 'flightService', 'biService', 'aircraftService', 'authService', 'notificationService', '$route', function ($scope, $location, $routeParams, $rootScope, flightService,biService, aircraftService, authService, notificationService, $route) {
    $scope.prms = $routeParams ;
     
    ///////////////////////////////////
    $scope.formatMinutes = function (mm) {
        return pad(Math.floor(mm / 60)).toString() + ':' + pad(Math.floor(mm % 60)).toString();
    };
    //////////////////////////////////
    $scope.selectedTabIndex = -1;
    $scope.selectedTabId = null;
    $scope.tabs = [
        { text: "Overall", id: 'overall' },
         { text: "Pax", id: 'pax' },
          { text: "Legs", id: 'legs' },
           { text: "Flight Time", id: 'flighttime' },
           { text: "Weight-Distance", id: 'weightdistance' },

    ];
    $scope.activeTab = "";
    $scope.$watch("selectedTabIndex", function (newValue) {
        //ati
        try {
            
            var id = $scope.tabs[newValue].id;
            $scope.selectedTabId = id;
            $scope.activeTab = "";

            switch (id) {
                case 'overall':
                    $scope.activeTab = id;
                    break;
                 
                case 'pax':
                    $scope.activeTab = id;
                    break;
                case 'legs':
                    $scope.activeTab = id; 
                    $scope.line_leg_instance.refresh();
                    
                    break;
                case 'flighttime':
                    $scope.activeTab = id;
                    break;
                case 'weightdistance':
                    $scope.activeTab = id;
                    break;

                default:
                    break;
            }
             

            //$scope.dg_crew_instance.refresh();
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
    /////////////////////////////////
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
    ////////////////////////////////
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
    ///////////////////////////////
    $scope.ds_period = [{ id: 1, title: 'Monthly' }, { id: 2, title: '14 Days' }];
    $scope.period = 1;
    $scope.sb_period = {

        showClearButton: false,
        searchEnabled: false,
        dataSource: $scope.ds_period,

        onSelectionChanged: function (arg) {
            $scope.bind();
        },
        displayExpr: "title",
        valueExpr: 'id',
        bindingOptions: {
            value: 'period',


        }
    };

    $scope.ds_year = [1398,1399,1400];
    $scope.year =  $scope.prms.year?Number($scope.prms.year): 1399;
    $scope.sb_year = {

        showClearButton: false,
        searchEnabled: false,
        dataSource: $scope.ds_year,
        onSelectionChanged: function (e) {
           
            $scope.bindMonthly();
        },
        bindingOptions: {
            value: 'year',
 
        }
    };
    $scope.total = {};
    $scope.routes = {};
    $scope.bind = function () {
        switch ($scope.period) {
            case 1:
               // $scope.bindMonthly();
                break;
            default:
                break;
        }
    };
    $scope.bindMonthly = function () {
         $location.search('year', $scope.year);
        $scope.loadingVisible = true;
        biService.getFuelMonthly($scope.year).then(function (response) {
            $scope.loadingVisible = false;
            $scope.total = response;
            biService.getFuelRoutesYearly($scope.year).then(function (routes) {
                $scope.routes = routes;
                
                $scope.chart_routes_instance.option('valueAxis[0].constantLines', [{ value: $scope.routes.usedAvg, color: 'gray', width: 1, dashStyle: 'dash', label: { font: { size: 11 } } }]);

                $scope.chart_routes_paxleg_instance.option('valueAxis[0].constantLines', [{ value: $scope.routes.usedLegAvg, color: 'gray', width: 1, dashStyle: 'dash', label: { font: { size: 11 },position:'outside' } }]);
                $scope.chart_routes_paxleg_instance.option('valueAxis[1].constantLines', [{ value: $scope.routes.usedPaxAvg, color: 'gray', width: 1, dashStyle: 'dash', label: { font: { size: 11 }, position: 'outside' } }]);

                //chart_routes_paxleg
            }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
            //var value_axises1 = $scope.line_normal1_instance.option('valueAxis[1].constanLines', [{ value: 25 }]);
           // console.log(value_axises1);
            //pax value axis
            //value_axises1[1].constantLines = [{value:25}];
           // $scope.line_normal1_instance.option('valueAxis[1].constantLines', [{ value: $scope.total.usedPerPaxAvg, color: 'gray', width: 1, dashStyle: 'dash', label: { font: { size: 11 } } }]);
           // $scope.line_normal1_instance.option('valueAxis[0].constantLines', [{ value: $scope.total.paxAvg, color: 'gray', width: 1, dashStyle: 'dash', label: { font: { size: 11 } } }]);
            //console.log(value_axises1);

        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
    };
    ////////////////////////////////////
    $scope.bar_monthly_instance = null;
    $scope.bar_monthly = {
        commonPaneSettings:{
            backgroundColor: '#ffffff',
            border:{top:true,bottom:true,left:true,right:true,color: '#000000',visible:false}
        },
        commonAxisSettings: {
            label: {
                font: {
                    weight: 800,
                    size: 12,
                    family:'Tahoma'
                }
            },
            maxValueMargin:0.1,
        },
        "export": {
            enabled: true
        },
        onInitialized: function (e) {
            if (!$scope.bar_monthly_instance)
                $scope.bar_monthly_instance = e.component;
        },
        palette: "GreenMist",
        title: {
            text: "Used / Uplift Fuel (tone)",
            font: {
                size: 20,
            }
            // subtitle: "as of January 2017"
        },
        commonSeriesSettings: {
            type: "bar",

            argumentField: "ArgStr",
            ignoreEmptyPoints: true,
            label: {
                //backgroundColor: 'gray',
                position: 'outside',
                color: 'gray',
                backgroundColor:'transparent',
                font: {
                    color: 'black',
                    size: 11,
                    weight:500,
                },
                customizeText: function () {
                    return  (this.value);
                },
                visible: true,
                
            },
            // barWidth: 30,
        },
         
        series: [
            { valueField: "UpliftKilo", name: "uplift", color: '#00b386' },
             { valueField: "UsedKilo", name: "used", color: '#ff471a' },
              {
                  type:'line',
                  valueField: "FPFuelKilo",
                  name: "planned(tone)",
                  color: '#9999ff',
                  dashStyle: 'dot',
                  label: { visible: false },
                  point: {visible:false},
              }
        ],

        tooltip: {
            enabled: true,
            // location: "edge",
            customizeTooltip: function (arg) {
                // alert(arg.seriesName + " " + $scope.formatMinutes(arg.value));
                return {
                    text: arg.seriesName + " " +  (arg.value)
                };
            }
        },
        valueAxis: [{
            label: {
                customizeText: function () {
                    return (this.value);
                }
            },
        }],
        bindingOptions: {
            "dataSource": "total.items",
        }
    };

    //////////////////////////////////
    $scope.diameter = 0.85;

    //$scope.pie_cat_ds = [];
    $scope.pie_used = {
        rtlEnabled: true,
        onInitialized: function (e) {
            if (!$scope.pie_used_instance)
                $scope.pie_used_instance = e.component;
        },
        title: {
            text: "Used Fuel Distribution",
            font: {
                size: 20,
            }
            // subtitle: "as of January 2017"
        },
        type: "doughnut",
        palette: "Soft Pastel",
        // diameter:0.85,
        legend: {
            horizontalAlignment: "right",
            verticalAlignment: "top",
            margin: 0,
            visible: false,
        },
        "export": {
            enabled: true
        },
        series: [{
            argumentField: "MonthName",
            valueField: "UsedKilo",
            label: {
                visible: true,
                font: {
                    size: 12,
                    color: 'white',
                },
                //format: "percent",
                connector: {
                    visible: true
                },
                customizeText: function (arg) {
                    //console.log(arg);
                    return arg.argumentText + " (" + arg.percentText + ")";
                }
            }
        }],
        //size: {
        //    height: 400,
        //},
        bindingOptions: {
            dataSource: 'total.items',
             
        }
    };
    ////////////////////////////////////
    $scope.line_avg_instance = null;
    $scope.line_avg = {
        onInitialized: function (e) {
            if (!$scope.line_avg_instance)
                $scope.line_avg_instance = e.component;
        },
        palette: 'Vintage',
        commonAxisSettings: {
            label: {
                font: {
                    weight: 800,
                    size: 12,
                    family: 'Tahoma'
                }
            }
        },
        commonSeriesSettings: {
            argumentField: "ArgStr",
            label: {
                position: 'outside',
                color: 'gray',
                backgroundColor: 'transparent',
                font: {
                    color: 'black',
                    size: 11,
                    weight: 500,
                },
                customizeText: function () {
                    return (this.value);
                },
                visible: true,
                // rotationAngle:90,
            }
        },
        crosshair: {
            enabled: true,
            color: "#949494",
            width: 2,
            dashStyle: "dot",
            label: {
                visible: true,
                backgroundColor: "#949494",
                font: {
                    color: "#fff",
                    size: 12,
                }
            }
        },

        series: [

        {
             
            //pane: "topPane",
            valueField: "AvgUsed",
            name: "average",
            color: '#ffc266',

        }
         
        ],

        argumentAxis: {
            valueMarginsEnabled: true,

            grid: {
                visible: false
            },
            label: {
                //displayMode: 'rotate',
                font: { size: 10 },
                rotationAngle: -45,
                overlappingBehavior: 'rotate',
                //customizeText: function (e) {
                //    return moment(new Date(e.value)).format('YY-MM-DD');
                //}
            },
            overlappingBehavior: 'rotate',
        },
        legend: {
            verticalAlignment: "bottom",
            horizontalAlignment: "center"
        },
        "export": {
            enabled: true
        },
        title: {
            text: "Average Used Fuel",
            font: {
                size: 20,
            }
        },

        bindingOptions: {
            dataSource: 'total.items',

        }
    };
    /////////////////////////////////////

    $scope.line_avg_det_instance = null;
    $scope.line_avg_det = {
        onInitialized: function (e) {
            if (!$scope.line_avg_det_instance)
                $scope.line_avg_det_instance = e.component;
        },
        commonAxisSettings: {
            label: {
                font: {
                    weight: 800,
                    size: 12,
                    family: 'Tahoma'
                }
            }
        },
        commonSeriesSettings: {
            argumentField: "ArgStr",
            label: {
                position: 'outside',
                color: 'gray',
                backgroundColor: 'transparent',
                font: {
                    color: 'black',
                    size: 11,
                    weight: 500,
                },
                customizeText: function () {
                    return (this.value);
                },
                visible: true,
                // rotationAngle:90,
            }
        },
        crosshair: {
            enabled: true,
            color: "#949494",
            width: 2,
            dashStyle: "dot",
            label: {
                visible: true,
                backgroundColor: "#949494",
                font: {
                    color: "#fff",
                    size: 12,
                }
            }
        },
        panes: [{
            name: "topPane"
        }, {
            name: "bottomPane"
        }],
        defaultPane: "bottomPane",
        series: [

        {
            pane: "topPane",
            valueField: "UsedKilo",
            name: "used(tone)",
            color: '#ffaa00',

        }
        , {
            pane: "topPane",
            valueField: "FPFuelKilo",
            name: "planned(tone)",
            color: '#9999ff',
            dashStyle: 'dot',
            label: { visible: false },
            point: { visible: false },

        },
         {
             pane: "bottomPane",
             valueField: "Legs",
             name: "leg",
             color: '#248f8f',

         }
        ],

        argumentAxis: {
            valueMarginsEnabled: true,

            grid: {
                visible: false
            },
            label: {
                font: { size: 10 },
                rotationAngle: -45,
                overlappingBehavior: 'rotate',
                //customizeText: function (e) {
                //    return moment(new Date(e.value)).format('YY-MM-DD');
                //}
            },
            overlappingBehavior: 'rotate',
        },
        legend: {
            verticalAlignment: "bottom",
            horizontalAlignment: "center"
        },
        "export": {
            enabled: true
        },
        title: {
            text: "Used/Planned",
            font: {
                size: 20,
            }
            , visible: false
        },

        bindingOptions: {
            dataSource: 'total.items',

        }
    };
    ////////////////////////////////////
    $scope.line_leg_instance = null;
    $scope.line_leg = {
        onInitialized: function (e) {
            if (!$scope.line_leg_instance)
                $scope.line_leg_instance = e.component;
        },
        palette:'Vintage',
        commonAxisSettings: {
            label: {
                font: {
                    weight: 800,
                    size: 12,
                    family: 'Tahoma'
                }
            }
        },
        commonSeriesSettings: {
            argumentField: "ArgStr",
            label: {
                position: 'outside',
                color: 'gray',
                backgroundColor: 'transparent',
                font: {
                    color: 'black',
                    size: 11,
                    weight: 500,
                },
                customizeText: function () {
                    return (this.value);
                },
                visible: true,
                // rotationAngle:90,
            }
        },
        crosshair: {
            enabled: true,
            color: "#949494",
            width: 2,
            dashStyle: "dot",
            label: {
                visible: true,
                backgroundColor: "#949494",
                font: {
                    color: "#fff",
                    size: 12,
                }
            }
        },

        series: [

        {
            type:'bar',
            //pane: "topPane",
            valueField: "UsedPerLeg",
            name: "used per leg",
            color: '#ffc266',

        }
        , {
            //pane: "topPane",
            valueField: "FPFuelPerLeg",
            name: "planned per leg",
            color: '#9999ff',
            dashStyle: 'dot',
            label: { visible: false },
            point: { visible: false },

        }
        ],

        argumentAxis: {
            valueMarginsEnabled: true,

            grid: {
                visible: false
            },
            label: {
                //displayMode: 'rotate',
                font: { size: 10 },
                rotationAngle: -45,
                overlappingBehavior: 'rotate',
                //customizeText: function (e) {
                //    return moment(new Date(e.value)).format('YY-MM-DD');
                //}
            },
            overlappingBehavior: 'rotate',
        },
        legend: {
            verticalAlignment: "bottom",
            horizontalAlignment: "center"
        },
        "export": {
            enabled: true
        },
        title: {
            text: "Used Fuel per Leg",
            font: {
                size: 20,
            }
        },

        bindingOptions: {
            dataSource: 'total.items',

        }
    };
    /////////////////////////////////////

    $scope.line_leg_det_instance = null;
    $scope.line_leg_det = {
        onInitialized: function (e) {
            if (!$scope.line_leg_det_instance)
                $scope.line_leg_det_instance = e.component;
        },
        commonAxisSettings: {
            label: {
                font: {
                    weight: 800,
                    size: 12,
                    family: 'Tahoma'
                }
            }
        },
        commonSeriesSettings: {
            argumentField: "ArgStr",
            label: {
                position: 'outside',
                color: 'gray',
                backgroundColor: 'transparent',
                font: {
                    color: 'black',
                    size: 11,
                    weight: 500,
                },
                customizeText: function () {
                    return (this.value);
                },
                visible: true,
                // rotationAngle:90,
            }
        },
        crosshair: {
            enabled: true,
            color: "#949494",
            width: 2,
            dashStyle: "dot",
            label: {
                visible: true,
                backgroundColor: "#949494",
                font: {
                    color: "#fff",
                    size: 12,
                }
            }
        },
        panes: [{
            name: "topPane"
        }, {
            name: "bottomPane"
        }],
        defaultPane: "bottomPane",
        series: [

        {
            pane: "topPane",
            valueField: "UsedKilo",
            name: "used(tone)",
            color: '#ffaa00',

        }
        , {
            pane: "topPane",
            valueField: "FPFuelKilo",
            name: "planned(tone)",
            color: '#9999ff',
            dashStyle: 'dot',
            label: { visible: false },
            point: { visible: false },

        },
         {
             pane: "bottomPane",
             valueField: "Legs",
             name: "leg",
             color: '#248f8f',

         }
        ],

        argumentAxis: {
            valueMarginsEnabled: true,

            grid: {
                visible: false
            },
            label: {
                font: { size: 10 },
                rotationAngle: -45,
                overlappingBehavior: 'rotate',
                //customizeText: function (e) {
                //    return moment(new Date(e.value)).format('YY-MM-DD');
                //}
            },
            overlappingBehavior: 'rotate',
        },
        legend: {
            verticalAlignment: "bottom",
            horizontalAlignment: "center"
        },
        "export": {
            enabled: true
        },
        title: {
            text: "Used/Planned",
            font: {
                size: 20,
            }
            , visible: false
        },

        bindingOptions: {
            dataSource: 'total.items',

        }
    };
    /////////////////////////////////////
    $scope.line_weightdistance_instance = null;
    $scope.line_weightdistance = {
        onInitialized: function (e) {
            if (!$scope.line_weightdistance_instance)
                $scope.line_weightdistance_instance = e.component;
        },
        commonAxisSettings: {
            label: {
                font: {
                    weight: 800,
                    size: 12,
                    family: 'Tahoma'
                }
            }
        },
        commonSeriesSettings: {
            argumentField: "ArgStr",
            label: {
                position: 'outside',
                color: 'gray',
                backgroundColor: 'transparent',
                font: {
                    color: 'black',
                    size: 11,
                    weight: 500,
                },
                customizeText: function () {
                    return (this.value);
                },
                visible: true,
                // rotationAngle:90,
            }
        },
        crosshair: {
            enabled: true,
            color: "#949494",
            width: 2,
            dashStyle: "dot",
            label: {
                visible: true,
                backgroundColor: "#949494",
                font: {
                    color: "#fff",
                    size: 12,
                }
            }
        },
         
        series: [

        {
            //pane: "topPane",
            type:'bar',
            valueField: "UsedPerWeightDistanceToneKM",
            name: "used per weight-distance",
            color: '#d279a6',

        }
        , {
            //pane: "topPane",
            valueField: "FPFuelPerWeightDistanceToneKM",
            name: "planned per weight-distance",
            color: '#9999ff',
            dashStyle: 'dot',
            label: { visible: false },
            point: {visible:false},

        }
        ],
        
        argumentAxis: {
            valueMarginsEnabled: true,
             
            grid: {
                visible: false
            },
            label: {
                //displayMode: 'rotate',
                font:{size:10},
                rotationAngle: -45,
                overlappingBehavior: 'rotate',
                //customizeText: function (e) {
                //    return moment(new Date(e.value)).format('YY-MM-DD');
                //}
            },
            overlappingBehavior: 'rotate',
        },
        legend: {
            verticalAlignment: "bottom",
            horizontalAlignment: "center"
        },
        "export": {
            enabled: true
        },
        title: {
            text: "Used Fuel per Weight-Distance (kilo per tone-km)",
            font: {
                size: 20,
            }
        },

        bindingOptions: {
            dataSource: 'total.items',

        }
    };
    /////////////////////////////////////
    
    $scope.line_weightdistance_det_instance = null;
    $scope.line_weightdistance_det = {
        onInitialized: function (e) {
            if (!$scope.line_weightdistance_det_instance)
                $scope.line_weightdistance_det_instance = e.component;
        },
        commonAxisSettings: {
            label: {
                font: {
                    weight: 800,
                    size: 12,
                    family: 'Tahoma'
                }
            }
        },
        commonSeriesSettings: {
            argumentField: "ArgStr",
            label: {
                position: 'outside',
                color: 'gray',
                backgroundColor: 'transparent',
                font: {
                    color: 'black',
                    size: 11,
                    weight: 500,
                },
                customizeText: function () {
                    return (this.value);
                },
                visible: true,
                // rotationAngle:90,
            }
        },
        crosshair: {
            enabled: true,
            color: "#949494",
            width: 2,
            dashStyle: "dot",
            label: {
                visible: true,
                backgroundColor: "#949494",
                font: {
                    color: "#fff",
                    size: 12,
                }
            }
        },
        panes: [{
            name: "topPane"
        }, {
            name: "bottomPane"
        }],
        defaultPane: "bottomPane",
        series: [

        {
             pane: "topPane",
            valueField: "UsedKilo",
            name: "used(tone)",
            color: '#ffaa00',

        }
        , {
             pane: "topPane",
            valueField: "FPFuelKilo",
            name: "planned(tone)",
            color: '#9999ff',
            dashStyle: 'dot',
            label: { visible: false },
            point: { visible: false },

        },
         {
             pane: "bottomPane",
             valueField: "WeightDistanceToneKM",
             name: "weight-distance(tone-km)",
             color: '#248f8f',

         }
        ],
       
        argumentAxis: {
            valueMarginsEnabled: true,

            grid: {
                visible: false
            },
            label: {
                font: { size: 10 },
                rotationAngle: -45,
                overlappingBehavior: 'rotate',
                //customizeText: function (e) {
                //    return moment(new Date(e.value)).format('YY-MM-DD');
                //}
            },
            overlappingBehavior: 'rotate',
        },
        legend: {
            verticalAlignment: "bottom",
            horizontalAlignment: "center"
        },
        "export": {
            enabled: true
        },
        title: {
            text: "Used/Planned",
            font: {
                size: 20,
            }
            ,visible:false
        },

        bindingOptions: {
            dataSource: 'total.items',

        }
    };
   
    ////////////////////////////////////
    $scope.line_pax_instance = null;
    $scope.line_pax = {
        onInitialized: function (e) {
            if (!$scope.line_pax_instance)
                $scope.line_pax_instance = e.component;
        },
        commonAxisSettings: {
            label: {
                font: {
                    weight: 800,
                    size: 12,
                    family: 'Tahoma'
                }
            }
        },
        commonSeriesSettings: {
            argumentField: "ArgStr",
            label: {
                position: 'outside',
                color: 'gray',
                backgroundColor: 'transparent',
                font: {
                    color: 'black',
                    size: 11,
                    weight: 500,
                },
                customizeText: function () {
                    return (this.value);
                },
                visible: true,
                // rotationAngle:90,
            }
        },
        crosshair: {
            enabled: true,
            color: "#949494",
            width: 2,
            dashStyle: "dot",
            label: {
                visible: true,
                backgroundColor: "#949494",
                font: {
                    color: "#fff",
                    size: 12,
                }
            }
        },

        series: [

        {
            //pane: "topPane",
            type: 'bar',
            valueField: "UsedPerPax",
            name: "used per Pax",
            color: '#e6e600',

        }
        , {
            //pane: "topPane",
            valueField: "FPFuelPerPax",
            name: "planned per pax",
            color: '#9999ff',
            dashStyle: 'dot',
            label: { visible: false },
            point: { visible: false },

        }
        ],

        argumentAxis: {
            valueMarginsEnabled: true,

            grid: {
                visible: false
            },
            label: {
                //displayMode: 'rotate',
                font: { size: 10 },
                rotationAngle: -45,
                overlappingBehavior: 'rotate',
                //customizeText: function (e) {
                //    return moment(new Date(e.value)).format('YY-MM-DD');
                //}
            },
            overlappingBehavior: 'rotate',
        },
        legend: {
            verticalAlignment: "bottom",
            horizontalAlignment: "center"
        },
        "export": {
            enabled: true
        },
        title: {
            text: "Used Fuel per Pax",
            font: {
                size: 20,
            }
        },

        bindingOptions: {
            dataSource: 'total.items',

        }
    };
    /////////////////////////////////////

    $scope.line_pax_det_instance = null;
    $scope.line_pax_det = {
        onInitialized: function (e) {
            if (!$scope.line_pax_det_instance)
                $scope.line_pax_det_instance = e.component;
        },
        commonAxisSettings: {
            label: {
                font: {
                    weight: 800,
                    size: 12,
                    family: 'Tahoma'
                }
            }
        },
        commonSeriesSettings: {
            argumentField: "ArgStr",
            label: {
                position: 'outside',
                color: 'gray',
                backgroundColor: 'transparent',
                font: {
                    color: 'black',
                    size: 11,
                    weight: 500,
                },
                customizeText: function () {
                    return (this.value);
                },
                visible: true,
                // rotationAngle:90,
            }
        },
        crosshair: {
            enabled: true,
            color: "#949494",
            width: 2,
            dashStyle: "dot",
            label: {
                visible: true,
                backgroundColor: "#949494",
                font: {
                    color: "#fff",
                    size: 12,
                }
            }
        },
        panes: [{
            name: "topPane"
        }, {
            name: "bottomPane"
        }],
        defaultPane: "bottomPane",
        series: [

        {
            pane: "topPane",
            valueField: "UsedKilo",
            name: "used(tone)",
            color: '#ffaa00',

        }
        , {
            pane: "topPane",
            valueField: "FPFuelKilo",
            name: "planned(tone)",
            color: '#9999ff',
            dashStyle: 'dot',
            label: { visible: false },
            point: { visible: false },

        },
         {
             pane: "bottomPane",
             valueField: "TotalPax",
             name: "pax (adults & children)",
             color: '#248f8f',

         }
        ],

        argumentAxis: {
            valueMarginsEnabled: true,

            grid: {
                visible: false
            },
            label: {
                font: { size: 10 },
                rotationAngle: -45,
                overlappingBehavior: 'rotate',
                //customizeText: function (e) {
                //    return moment(new Date(e.value)).format('YY-MM-DD');
                //}
            },
            overlappingBehavior: 'rotate',
        },
        legend: {
            verticalAlignment: "bottom",
            horizontalAlignment: "center"
        },
        "export": {
            enabled: true
        },
        title: {
            text: "Used/Planned",
            font: {
                size: 20,
            }
            , visible: false
        },

        bindingOptions: {
            dataSource: 'total.items',

        }
    };
    /////////////////////////////////
    $scope.line_flight_instance = null;
    $scope.line_flight = {
        onInitialized: function (e) {
            if (!$scope.line_flight_instance)
                $scope.line_flight_instance = e.component;
        },
        commonAxisSettings: {
            label: {
                font: {
                    weight: 800,
                    size: 12,
                    family: 'Tahoma'
                }
            }
        },
        commonSeriesSettings: {
            argumentField: "ArgStr",
            label: {
                position: 'outside',
                color: 'gray',
                backgroundColor: 'transparent',
                font: {
                    color: 'black',
                    size: 11,
                    weight: 500,
                },
                customizeText: function () {
                    return (this.value);
                },
                visible: true,
                // rotationAngle:90,
            }
        },
        crosshair: {
            enabled: true,
            color: "#949494",
            width: 2,
            dashStyle: "dot",
            label: {
                visible: true,
                backgroundColor: "#949494",
                font: {
                    color: "#fff",
                    size: 12,
                }
            }
        },

        series: [

        {
            //pane: "topPane",
            type: 'bar',
            valueField: "UsedPerFlightTime",
            name: "used per flight time",
            color: '#e6ac00',

        },
          {
            //pane: "topPane",
            valueField: "FPFuelPerFlightTime",
            name: "planned per flight time",
            color: '#9999ff',
            dashStyle: 'dot',
            label: { visible: false },
            point: { visible: false },

        }
        ],

        argumentAxis: {
            valueMarginsEnabled: true,

            grid: {
                visible: false
            },
            label: {
                //displayMode: 'rotate',
                font: { size: 10 },
                rotationAngle: -45,
                overlappingBehavior: 'rotate',
                //customizeText: function (e) {
                //    return moment(new Date(e.value)).format('YY-MM-DD');
                //}
            },
            overlappingBehavior: 'rotate',
        },
        legend: {
            verticalAlignment: "bottom",
            horizontalAlignment: "center"
        },
        "export": {
            enabled: true
        },
        title: {
            text: "Used Fuel per Flight Time",
            font: {
                size: 20,
            }
        },

        bindingOptions: {
            dataSource: 'total.items',

        }
    };
    /////////////////////////////////////

    $scope.line_flight_det_instance = null;
    $scope.line_flight_det = {
        onInitialized: function (e) {
            if (!$scope.line_flight_det_instance)
                $scope.line_flight_det_instance = e.component;
        },
        commonAxisSettings: {
            label: {
                font: {
                    weight: 800,
                    size: 12,
                    family: 'Tahoma'
                }
            }
        },
        commonSeriesSettings: {
            argumentField: "ArgStr",
            label: {
                position: 'outside',
                color: 'gray',
                backgroundColor: 'transparent',
                font: {
                    color: 'black',
                    size: 11,
                    weight: 500,
                },
                customizeText: function () {
                    return (this.value);
                },
                visible: true,
                // rotationAngle:90,
            }
        },
        crosshair: {
            enabled: true,
            color: "#949494",
            width: 2,
            dashStyle: "dot",
            label: {
                visible: true,
                backgroundColor: "#949494",
                font: {
                    color: "#fff",
                    size: 12,
                }
            }
        },
        panes: [{
            name: "topPane"
        }, {
            name: "bottomPane"
        }],
        defaultPane: "bottomPane",
        series: [

        {
            pane: "topPane",
            valueField: "UsedKilo",
            name: "used(tone)",
            color: '#ffaa00',

        }
        , {
            pane: "topPane",
            valueField: "FPFuelKilo",
            name: "planned(tone)",
            color: '#9999ff',
            dashStyle: 'dot',
            label: { visible: false },
            point: { visible: false },

        },
         {
             pane: "bottomPane",
             valueField: "FlightTime",
             name: "flight time",
             color: '#248f8f',
             label: {
                 customizeText: function () {
                     return $scope.formatMinutes(this.value);
                 }
             },

         }
        ],
        valueAxis:[{
            label: {
                customizeText: function () {
                    return $scope.formatMinutes(this.value);
                }
            },
        }],
        argumentAxis: {
            valueMarginsEnabled: true,

            grid: {
                visible: false
            },
            label: {
                font: { size: 10 },
                rotationAngle: -45,
                overlappingBehavior: 'rotate',
                //customizeText: function (e) {
                //    return moment(new Date(e.value)).format('YY-MM-DD');
                //}
            },
            overlappingBehavior: 'rotate',
        },
        legend: {
            verticalAlignment: "bottom",
            horizontalAlignment: "center"
        },
        "export": {
            enabled: true
        },
        title: {
            text: "Used/Planned",
            font: {
                size: 20,
            }
            , visible: false
        },

        bindingOptions: {
            dataSource: 'total.items',

        }
    };

    ////////////////////////////////////

    $scope.line_distance_instance = null;
    $scope.line_distance = {
        onInitialized: function (e) {
            if (!$scope.line_distance_instance)
                $scope.line_distance_instance = e.component;
        },
        commonAxisSettings: {
            label: {
                font: {
                    weight: 800,
                    size: 12,
                    family: 'Tahoma'
                }
            }
        },
        commonSeriesSettings: {
            argumentField: "ArgStr",
            label: {
                position: 'outside',
                color: 'gray',
                backgroundColor: 'transparent',
                font: {
                    color: 'black',
                    size: 11,
                    weight: 500,
                },
                customizeText: function () {
                    return (this.value);
                },
                visible: true,
                // rotationAngle:90,
            }
        },
        crosshair: {
            enabled: true,
            color: "#949494",
            width: 2,
            dashStyle: "dot",
            label: {
                visible: true,
                backgroundColor: "#949494",
                font: {
                    color: "#fff",
                    size: 12,
                }
            }
        },

        series: [

        {
            //pane: "topPane",
            valueField: "UsedPerDistanceKM",
            name: "used per distance",
            color: '#ff0066',

        }
        , {
            //pane: "topPane",
            valueField: "FPFuelPerDistance",
            name: "planned per distance",
            color: '#9999ff',
            dashStyle: 'dot',
            label: { visible: false },
            point: { visible: false },

        }
        ],

        argumentAxis: {
            valueMarginsEnabled: true,

            grid: {
                visible: false
            },
            label: {
                //displayMode: 'rotate',
                font: { size: 10 },
                rotationAngle: -45,
                overlappingBehavior: 'rotate',
                //customizeText: function (e) {
                //    return moment(new Date(e.value)).format('YY-MM-DD');
                //}
            },
            overlappingBehavior: 'rotate',
        },
        legend: {
            verticalAlignment: "bottom",
            horizontalAlignment: "center"
        },
        "export": {
            enabled: true
        },
        title: {
            text: "Used Fuel per Distance (kilo per km)",
            font: {
                size: 20,
            }
        },

        bindingOptions: {
            dataSource: 'total.items',

        }
    };
    ////////////////////////////////////
    $scope.line_distance_det_instance = null;
    $scope.line_distance_det = {
        onInitialized: function (e) {
            if (!$scope.line_distance_det_instance)
                $scope.line_distance_det_instance = e.component;
        },
        commonAxisSettings: {
            label: {
                font: {
                    weight: 800,
                    size: 12,
                    family: 'Tahoma'
                }
            }
        },
        commonSeriesSettings: {
            argumentField: "ArgStr",
            label: {
                position: 'outside',
                color: 'gray',
                backgroundColor: 'transparent',
                font: {
                    color: 'black',
                    size: 11,
                    weight: 500,
                },
                customizeText: function () {
                    return (this.value);
                },
                visible: true,
                // rotationAngle:90,
            }
        },
        crosshair: {
            enabled: true,
            color: "#949494",
            width: 2,
            dashStyle: "dot",
            label: {
                visible: true,
                backgroundColor: "#949494",
                font: {
                    color: "#fff",
                    size: 12,
                }
            }
        },
        panes: [{
            name: "topPane"
        }, {
            name: "bottomPane"
        }],
        defaultPane: "bottomPane",
        series: [

        {
            pane: "topPane",
            valueField: "UsedKilo",
            name: "used(tone)",
            color: '#ffaa00',

        }
        , {
            pane: "topPane",
            valueField: "FPFuelKilo",
            name: "planned(tone)",
            color: '#9999ff',
            dashStyle: 'dot',
            label: { visible: false },
            point: { visible: false },

        },
         {
             pane: "bottomPane",
             valueField: "DistanceKM",
             name: "distance(km)",
             color: '#248f8f',

         }
        ],

        argumentAxis: {
            valueMarginsEnabled: true,

            grid: {
                visible: false
            },
            label: {
                font: { size: 10 },
                rotationAngle: -45,
                overlappingBehavior: 'rotate',
                //customizeText: function (e) {
                //    return moment(new Date(e.value)).format('YY-MM-DD');
                //}
            },
            overlappingBehavior: 'rotate',
        },
        legend: {
            verticalAlignment: "bottom",
            horizontalAlignment: "center"
        },
        "export": {
            enabled: true
        },
        title: {
            text: "Used/Planned",
            font: {
                size: 20,
            }
            , visible: false
        },

        bindingOptions: {
            dataSource: 'total.items',

        }
    };
    ////////////////////////////////////
    $scope.line_weight_instance = null;
    $scope.line_weight = {
        onInitialized: function (e) {
            if (!$scope.line_weight_instance)
                $scope.line_weight_instance = e.component;
        },
        commonAxisSettings: {
            label: {
                font: {
                    weight: 800,
                    size: 12,
                    family: 'Tahoma'
                }
            }
        },
        commonSeriesSettings: {
            argumentField: "ArgStr",
            label: {
                position: 'outside',
                color: 'gray',
                backgroundColor: 'transparent',
                font: {
                    color: 'black',
                    size: 11,
                    weight: 500,
                },
                customizeText: function () {
                    return (this.value);
                },
                visible: true,
                // rotationAngle:90,
            }
        },
        crosshair: {
            enabled: true,
            color: "#949494",
            width: 2,
            dashStyle: "dot",
            label: {
                visible: true,
                backgroundColor: "#949494",
                font: {
                    color: "#fff",
                    size: 12,
                }
            }
        },

        series: [

        {
            //pane: "topPane",
            valueField: "UsedPerWeightTone",
            name: "used per weight",
            color: '#cc0000',

        }
        , {
            //pane: "topPane",
            valueField: "FPFuelPerWeightTone",
            name: "planned per weight",
            color: '#9999ff',
            dashStyle: 'dot',
            label: { visible: false },
            point: { visible: false },

        }
        ],

        argumentAxis: {
            valueMarginsEnabled: true,

            grid: {
                visible: false
            },
            label: {
                //displayMode: 'rotate',
                font: { size: 10 },
                rotationAngle: -45,
                overlappingBehavior: 'rotate',
                //customizeText: function (e) {
                //    return moment(new Date(e.value)).format('YY-MM-DD');
                //}
            },
            overlappingBehavior: 'rotate',
        },
        legend: {
            verticalAlignment: "bottom",
            horizontalAlignment: "center"
        },
        "export": {
            enabled: true
        },
        title: {
            text: "Used Fuel per Weight (kilo per tone)",
            font: {
                size: 20,
            }
        },

        bindingOptions: {
            dataSource: 'total.items',

        }
    };
    ////////////////////////////////////
    $scope.line_weight_det_instance = null;
    $scope.line_weight_det = {
        onInitialized: function (e) {
            if (!$scope.line_weight_det_instance)
                $scope.line_weight_det_instance = e.component;
        },
        commonAxisSettings: {
            label: {
                font: {
                    weight: 800,
                    size: 12,
                    family: 'Tahoma'
                }
            }
        },
        commonSeriesSettings: {
            argumentField: "ArgStr",
            label: {
                position: 'outside',
                color: 'gray',
                backgroundColor: 'transparent',
                font: {
                    color: 'black',
                    size: 11,
                    weight: 500,
                },
                customizeText: function () {
                    return (this.value);
                },
                visible: true,
                // rotationAngle:90,
            }
        },
        crosshair: {
            enabled: true,
            color: "#949494",
            width: 2,
            dashStyle: "dot",
            label: {
                visible: true,
                backgroundColor: "#949494",
                font: {
                    color: "#fff",
                    size: 12,
                }
            }
        },
        panes: [{
            name: "topPane"
        }, {
            name: "bottomPane"
        }],
        defaultPane: "bottomPane",
        series: [

        {
            pane: "topPane",
            valueField: "UsedKilo",
            name: "used(tone)",
            color: '#ffaa00',

        }
        , {
            pane: "topPane",
            valueField: "FPFuelKilo",
            name: "planned(tone)",
            color: '#9999ff',
            dashStyle: 'dot',
            label: { visible: false },
            point: { visible: false },

        },
         {
             pane: "bottomPane",
             valueField: "WeightTone",
             name: "weight(k)",
             color: '#248f8f',

         }
        ],

        argumentAxis: {
            valueMarginsEnabled: true,

            grid: {
                visible: false
            },
            label: {
                font: { size: 10 },
                rotationAngle: -45,
                overlappingBehavior: 'rotate',
                //customizeText: function (e) {
                //    return moment(new Date(e.value)).format('YY-MM-DD');
                //}
            },
            overlappingBehavior: 'rotate',
        },
        legend: {
            verticalAlignment: "bottom",
            horizontalAlignment: "center"
        },
        "export": {
            enabled: true
        },
        title: {
            text: "Used/Planned",
            font: {
                size: 20,
            }
            , visible: false
        },

        bindingOptions: {
            dataSource: 'total.items',

        }
    };
    ////////////////////////////////////
    $scope._line_pax_instance = null;
    $scope._line_pax = {
        onInitialized: function (e) {
            if (!$scope.line_pax_instance)
                $scope.line_pax_instance = e.component;
        },
        commonAxisSettings: {
            label: {
                font: {
                    weight: 800,
                    size: 12,
                    family: 'Tahoma'
                }
            }
        },
        commonSeriesSettings:{
            argumentField: "ArgStr",
            label: {
                position: 'outside',
                color: 'gray',
                backgroundColor: 'transparent',
                font: {
                    color: 'black',
                    size: 11,
                    weight: 500,
                },
                customizeText: function () {
                    return (this.value);
                },
                visible: true,
               // rotationAngle:90,
            }
        },
        crosshair: {
            enabled: true,
            color: "#949494",
            width: 2,
            dashStyle: "dot",
            label: {
                visible: true,
                backgroundColor: "#949494",
                font: {
                    color: "#fff",
                    size: 12,
                }
            }
        },
        panes: [{
            name: "topPane"
        }, {
            name: "bottomPane"
        }],
        defaultPane: "bottomPane",
        series: [
       
        {
            pane: "topPane", 
            valueField: "UsedPerPax",
            name: "used per pax",
            color:'#ff8000',
            
        }, {
             
            valueField: "TotalPax",
            name: "Total Pax",
            color: '#0099ff',
        }
        ],    
        valueAxis: [{
            pane: "bottomPane",
            grid: {
                visible: true
            },
            title: {
                text: "Total Pax",
                font: {
                    size: 14,
                }
            }
        }, {
            pane: "topPane",
             
            grid: {
                visible: true
            },
            title: {
                text: "Per Pax",
                font: {
                    size: 14,
                },
                margin:16,
            },
            name:'paxaxis',
           // constantLines: [{ value:25 }]
        }],
        argumentAxis: {
            valueMarginsEnabled: true,

            grid: {
                visible: false
            },
            label: {
                //displayMode: 'rotate',
                rotationAngle: -45,
                overlappingBehavior: 'rotate',
                //customizeText: function (e) {
                //    return moment(new Date(e.value)).format('YY-MM-DD');
                //}
            },
            overlappingBehavior: 'rotate',
        },
        legend: {
            verticalAlignment: "bottom",
            horizontalAlignment: "center"
        },
        "export": {
            enabled: true
        },
        title: {
            text: "Used Fuel per Pax",
            font: {
                size: 20,
            }
        },
         
        bindingOptions: {
            dataSource: 'total.items',

        }
    };
    //////////////////////////////////
    $scope.chart_routes_instance = null;
    $scope.chart_routes = {
        onInitialized: function (e) {
            if (!$scope.chart_routes_instance)
                $scope.chart_routes_instance = e.component;
        },
        commonAxisSettings: {
            label: {
                font: {
                    weight: 800,
                    size: 12,
                    family: 'Tahoma'
                }
            }
        },
        commonSeriesSettings: {
            argumentField: "Route",
            label: {
                position: 'outside',
                color: 'gray',
                backgroundColor: 'transparent',
                font: {
                    color: 'black',
                    size: 11,
                    weight: 500,
                },
                customizeText: function () {
                    return (this.value);
                },
                visible: true,
                // rotationAngle:90,
            }
        },
        crosshair: {
            enabled: true,
            color: "#949494",
            width: 2,
            dashStyle: "dot",
            label: {
                visible: true,
                backgroundColor: "#949494",
                font: {
                    color: "#fff",
                    size: 12,
                }
            }
        },

        series: [

        {
            //pane: "topPane",
            type: 'bar',
            valueField: "UsedKilo",
            name: "used",
            color: '#ff9933',

        }
        //, {
        //    //pane: "topPane",
        //    valueField: "FPFuelPerPax",
        //    name: "planned per pax",
        //    color: '#9999ff',
        //    dashStyle: 'dot',
        //    label: { visible: false },
        //    point: { visible: false },

        //}
        ],
        valueAxis: [{
            
            grid: {
                visible: true
            },
            title: {
                text: "tone",
                
            }
        } ],
        argumentAxis: {
            valueMarginsEnabled: true,

            grid: {
                visible: false
            },
            label: {
                //displayMode: 'rotate',
                font: { size: 10 },
                rotationAngle: -45,
                overlappingBehavior: 'rotate',
                //customizeText: function (e) {
                //    return moment(new Date(e.value)).format('YY-MM-DD');
                //}
            },
            overlappingBehavior: 'rotate',
        },
        legend: {
            verticalAlignment: "bottom",
            horizontalAlignment: "center"
        },
        "export": {
            enabled: true
        },
        title: {
            text: "Used Fuel by Routes",
            font: {
                size: 20,
            }
        },

        bindingOptions: {
            dataSource: 'routes.items',

        }
    };
    ////////////////////////////////
    $scope.chart_routes_paxleg_instance = null;
    $scope.chart_routes_paxleg = {
        onInitialized: function (e) {
            if (!$scope.chart_routes_paxleg_instance)
                $scope.chart_routes_paxleg_instance = e.component;
        },
        commonAxisSettings: {
            label: {
                font: {
                    weight: 800,
                    size: 12,
                    family: 'Tahoma'
                }
            }
        },
        commonSeriesSettings: {
            argumentField: "Route",
            label: {
                position: 'outside',
                color: 'gray',
                backgroundColor: 'transparent',
                font: {
                    color: 'black',
                    size: 11,
                    weight: 500,
                },
                customizeText: function () {
                    return (this.value);
                },
                visible: true,
                // rotationAngle:90,
            }
        },
        crosshair: {
            enabled: true,
            color: "#949494",
            width: 2,
            dashStyle: "dot",
            label: {
                visible: true,
                backgroundColor: "#949494",
                font: {
                    color: "#fff",
                    size: 12,
                }
            }
        },
        panes: [{
            name: "topPane"
        }, {
            name: "bottomPane"
        }],
        defaultPane: "bottomPane",
        series: [

        {
            pane: "topPane",
            valueField: "UsedPerPax",
            name: "used per pax",
            color: '#9999ff',
             type:'bar',

        }
        ,
         {
             pane: "bottomPane",
             valueField: "UsedKiloPerLeg",
             name: "used per leg",
             color: '#d98cb3',
             type: 'bar',
         }
        ],
        valueAxis: [{
            pane: "bottomPane",
            grid: {
                visible: true
            },
            title: {
                text: "Per Leg (tone)",
                margin: 16,
            }
        }, {
            pane: "topPane",
            grid: {
                visible: true
            },
            title: {
                text: "Per Pax"
            }
        }],
        argumentAxis: {
            valueMarginsEnabled: true,

            grid: {
                visible: false
            },
            label: {
                font: { size: 10 },
                rotationAngle: -45,
                overlappingBehavior: 'rotate',
                //customizeText: function (e) {
                //    return moment(new Date(e.value)).format('YY-MM-DD');
                //}
            },
            overlappingBehavior: 'rotate',
        },
        legend: {
            verticalAlignment: "bottom",
            horizontalAlignment: "center",
            visible:true,
        },
        "export": {
            enabled: true
        },
        title: {
            text: "Used by Routes Per Pax-Leg",
            font: {
                size: 20,
            }
            , visible: false
        },

        bindingOptions: {
            dataSource: 'routes.items',

        }
    };
    ////////////////////////////////
    if (!authService.isAuthorized()) {

        authService.redirectToLogin();
    }
    else {
        $rootScope.page_title = '> Fuel';


        $('.fuel').fadeIn(400, function () {

        });
    }
    //////////////////////////////////////////

    $scope.$on('$viewContentLoaded', function () {
       // $scope.period = 1;

    });

    $rootScope.$broadcast('FlightsReportLoaded', null);

}]);