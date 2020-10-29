    
var app = angular.module('GriffinApp', ['ngRoute', 'LocalStorageModule', 'angular-loading-bar', 'dx', 'ngSanitize', 'ngAnimate']).config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
}]);
 
 
app.config(function ($routeProvider) {
    var version = 0.912;
    //ati new 2
    $routeProvider.when("/cp", {
        controller: "firstLoginController",
        templateUrl: "/app/views/firstlogin.html"
    });

    
     
    $routeProvider.when("/apps", {
        controller: "appsController",
        templateUrl: "/app/views/apps.html?v=" + version
    });
    $routeProvider.when("/home", {
        controller: "homeController",
        templateUrl: "/app/views/home.html?v="+version
    });
    $routeProvider.when("/home/:year/:month/:day", {
        controller: "homeController",
        templateUrl: "/app/views/home.html?v=" + version
    });

    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: "/app/views/login.html"
    });

    

    $routeProvider.when("/signup", {
        controller: "signupController",
        templateUrl: "/app/views/signup.html"
    });

    $routeProvider.when("/orders", {
        controller: "ordersController",
        templateUrl: "/app/views/orders.html"
    });

    $routeProvider.when("/refresh", {
        controller: "refreshController",
        templateUrl: "/app/views/refresh.html"
    });

    $routeProvider.when("/tokens", {
        controller: "tokensManagerController",
        templateUrl: "/app/views/tokens.html"
    });

    $routeProvider.when("/associate", {
        controller: "associateController",
        templateUrl: "/app/views/associate.html"
    });

    $routeProvider.when("/test", {
        controller: "testController",
        templateUrl: "/app/views/test.html"
    });

    $routeProvider.when("/airport", {
        controller: "airportController",
        templateUrl: "/app/views/airport.html",
        isDispatch: false,
    });
    $routeProvider.when("/dispatch/airport", {
        controller: "airportController",
        templateUrl: "/app/views/airport.html",
        isDispatch: true,
    });

    $routeProvider.when("/aircrafttype", {
        controller: "aircraftTypeController",
        templateUrl: "/app/views/aircrafttype.html"
    });
    $routeProvider.when("/location", {
        controller: "locationController",
        templateUrl: "/app/views/location.html"
    });
    $routeProvider.when("/jobgroup", {
        controller: "jobgroupController",
        templateUrl: "/app/views/jobgroup.html"
    });

    $routeProvider.when("/person", {
        controller: "personController",
        templateUrl: "/app/views/person.html"
    });
    $routeProvider.when("/person/crew", {
        controller: "personController",
        templateUrl: "/app/views/person.html",
        isCrew:true,
    });
    $routeProvider.when("/person/course", {
        controller: "personcourseController",
        templateUrl: "/app/views/personcourse.html"
    });
     
    $routeProvider.when("/person/book", {
        controller: "personbookController",
        templateUrl: "/app/views/personbook.html"
    });

    $routeProvider.when("/person/certificate", {
        controller: "personcertificateController",
        templateUrl: "/app/views/personcertificate.html"
    });

    $routeProvider.when("/course", {
        controller: "courseController",
        templateUrl: "/app/views/course.html"
    });
    $routeProvider.when("/course/person", {
        controller: "coursepersonController",
        templateUrl: "/app/views/courseperson.html"
    });
    $routeProvider.when("/course/type", {
        controller: "courseTypeController",
        templateUrl: "/app/views/coursetype.html"
    });
    $routeProvider.when("/flight/board", {
        controller: "flightBoardController",
        templateUrl: "/app/views/flightboard.html"
    });
    $routeProvider.when("/plan/board", {
        controller: "planBoardController",
        templateUrl: "/app/views/planningboard.html"
    });
    $routeProvider.when("/flight/board/ceo", {
        controller: "ceoFlightBoardController",
        templateUrl: "/app/views/ceoflightboard.html"
    });
    $routeProvider.when("/flight/board/all", {
        controller: "flightBoardAllController",
        templateUrl: "/app/views/flightboardall.html"
    });
    $routeProvider.when("/dispatch/flights/:airport/:admin", {
        controller: "flightBoardAllController",
        templateUrl: "/app/views/flightboardall.html",
        isDispatch: true,
    });
    $routeProvider.when("/maintenance/flights", {
        controller: "flightPlansMaintenanceController",
        templateUrl: "/app/views/flightPlansMaintenance.html"
    });

    $routeProvider.when("/maintenance/flights/calendar", {
        controller: "flightPlansCalendarMaintenanceController",
        templateUrl: "/app/views/flightPlansCalendarMaintenance.html"
    });


    $routeProvider.when("/maintenance/registers/assign", {
        controller: "planRegistersController",
        templateUrl: "/app/views/planRegisters.html"
    });
    $routeProvider.when("/maintenance/flights/registers", {
        controller: "changeFlightRegisterController",
        templateUrl: "/app/views/changeflightregister.html"
    });
    //$routeProvider.when("/flight/plan/register/:id", {
    //    controller: "flightPlanRegsiterController",
    //    templateUrl: "/app/views/flightplanregister.html"
    //});

    $routeProvider.when("/library", {
        controller: "libraryController",
        templateUrl: "/app/views/library.html",
        isDocument:false,
    });
    $routeProvider.when("/library/people", {
        controller: "libraryController",
        templateUrl: "/app/views/librarypeople.html",
        isDocument: false,
    });
    $routeProvider.when("/library/:type/:publisher/:author", {
        controller: "libraryController",
        templateUrl: "/app/views/library.html",
        isDocument: false,
    });
    $routeProvider.when("/option/:parent", {
        controller: "optionController",
        templateUrl: "/app/views/option.html",
         
    });

    $routeProvider.when("/document", {
        controller: "libraryController",
        templateUrl: "/app/views/document.html",
        isDocument: true,
    });

    $routeProvider.when("/publisher", {
        controller: "organizationController",
        templateUrl: "/app/views/organization.html",
        TypeId: 77,
    });
    $routeProvider.when("/author", {
        controller: "personmiscController",
        templateUrl: "/app/views/personmisc.html",
        TypeId: 75,
    });
   
    $routeProvider.when("/journal", {
        controller: "journalController",
        templateUrl: "/app/views/journal.html",
        TypeId: 1,
    });
    $routeProvider.when("/conference", {
        controller: "journalController",
        templateUrl: "/app/views/journal.html",
        TypeId: 2,
    });
    $routeProvider.when("/notification", {
        controller: "notificationController",
        templateUrl: "/app/views/notification.html",
        
    });
    $routeProvider.when("/flight", {
        controller: "flightController",
        templateUrl: "/app/views/flight.html",

    });
   


    


    $routeProvider.when("/flight/archive", {
        controller: "flightListController",
        templateUrl: "/app/views/flightlist.html",
        type:-1,

    });
    $routeProvider.when("/flight/archive/:airport", {
        controller: "flightListController",
        templateUrl: "/app/views/flightlist.html",
        type: -1,

    });

    
    $routeProvider.when("/maintenance/flights/irregular", {
        controller: "irregularFlightController",
        templateUrl: "/app/views/irregularflight.html",
        type: 2,

    });
    
    $routeProvider.when("/flight/plans/closed", {
        controller: "flightPlanViewController",
        templateUrl: "/app/views/flightplanview.html",
        type: 50,

    });
    $routeProvider.when("/commercial/flights/irregular", {
        controller: "irregularFlightController",
        templateUrl: "/app/views/irregularflight.html",
        type: 1,

    });
    $routeProvider.when("/commercial/flights/plannig", {
        //controller: "flightController",
        //templateUrl: "/app/views/flight.html",
        controller: "flightPlanningController",
        templateUrl: "/app/views/flightPlanning.html",

    });
    $routeProvider.when("/commercial/plans/permits", {
        //controller: "flightPlanViewController",
        //templateUrl: "/app/views/flightplanview.html",
         controller: "flightPlanPermitController",
        templateUrl: "/app/views/flightplanpermit.html",
        //type: 50,

    });
    $routeProvider.when("/commercial/plans/crew", {
         
        controller: "flightPlanCrewController",
        templateUrl: "/app/views/flightPlanCrew.html",
        //type: 50,

    });
    $routeProvider.when("/commercial/plans/apply", {
        //controller: "flightPlanApplyController",
        //templateUrl: "/app/views/flightplanapply.html",
        controller: "flightPlanApply2Controller",
        templateUrl: "/app/views/flightplanapply2.html",

    });
    $routeProvider.when("/commercial/plans", {
        controller: "flightPlanListController",
        templateUrl: "/app/views/flightplanlist.html",


    });

    $routeProvider.when("/crewtest", {
        controller: "crewtestController",
        templateUrl: "/app/views/crewtest.html"
    });
    $routeProvider.when("/crew/assign/cockpit", {
        controller: "crewassignController",
        templateUrl: "/app/views/crewassign.html",
        isCockpit: true,
    });
    $routeProvider.when("/crew/assign/cabin", {
        controller: "crewassignController",
        templateUrl: "/app/views/crewassign.html",
        isCockpit: false,
    });
    $routeProvider.when("/crew/assign/timeline/cabin", {
        controller: "crewassign2Controller",
        templateUrl: "/app/views/crewassign2.html",
        isCockpit: false,
    });
    $routeProvider.when("/crew/assign/timeline/cockpit", {
        controller: "crewassign2Controller",
        templateUrl: "/app/views/crewassign2.html",
        isCockpit: true,
    });
    $routeProvider.when("/crew/assign2", {
        controller: "crewassign2Controller",
        templateUrl: "/app/views/crewassign2.html"
    });
    $routeProvider.when("/crew/report", {
        controller: "crewReportController",
        templateUrl: "/app/views/crewReport.html"
    });
    
    $routeProvider.when("/fuel/report", {
        controller: "fuelReportController",
        templateUrl: "/app/views/fuelReport.html"
    });
    $routeProvider.when("/delays/report", {
        controller: "flightDelaysController",
        templateUrl: "/app/views/flightDelays.html"
    });

    $routeProvider.when("/matchinglist", {
        controller: "mlistController",
        templateUrl: "/app/views/mlist.html",
        TypeId: 75,
    });

    $routeProvider.when("/commercial/planning", {
        //controller: "flightController",
        //templateUrl: "/app/views/flight.html",
        controller: "planController",
        templateUrl: "/app/views/plan.html",

    });
    //$routeProvider.when("/crew/assign", {
    //    controller: "crewtestController",
    //    templateUrl: "/app/views/crewtest.html"
    //});
    $routeProvider.when("/flight/report/security", {
        controller: "flightReportSecurityController",
        templateUrl: "/app/views/flightreportsecurity.html"
    });
    $routeProvider.when("/reg/availability", {
        controller: "regAvailabilityController",
        templateUrl: "/app/views/regAvailability.html"
    });
    $routeProvider.when("/route", {
        controller: "routeController",
        templateUrl: "/app/views/route.html",
        isDispatch: false,
    });
    $routeProvider.when("/delay/codes", {
        controller: "delayCodesController",
        templateUrl: "/app/views/delayCodes.html",
        isDispatch: false,
    });

    $routeProvider.when("/crew/assign/reg/cockpit", {
        controller: "crewassignregController",
        templateUrl: "/app/views/crewassignreg.html",
        isCockpit: true,
    });
    $routeProvider.when("/crew/assign/reg/cabin", {
        controller: "crewassignregController",
        templateUrl: "/app/views/crewassignreg.html",
        isCockpit: false,
    });

    $routeProvider.when("/roster/daily", {
        //controller: "rosterDailyController",
        //templateUrl: "/app/views/rosterdaily.html",
        controller: "rosterReport",
        templateUrl: "/app/views/rosterreport.html",
        isCockpit: false,
    });

    //$routeProvider.when("/roster", {
    //    controller: "dailyRoster2Controller",
    //    templateUrl: "/app/views/dailyroster2.html",
    //    isCockpit: false,
    //});
    $routeProvider.when("/crew/time/report", {
        controller: "crewTimeReportController",
        templateUrl: "/app/views/crewTimeReport.html"
    });
    //vahid new
    $routeProvider.when("/flights/report", {
        controller: "reportFlightsController",
        templateUrl: "/app/views/reportFlights.html"
    });
    $routeProvider.when("/crew/report/fixtime", {
        controller: "fixTimeReportController",
        templateUrl: "/app/views/fixtimereport.html"
    });


    $routeProvider.when("/roster", {
        controller: "rosterController",
        templateUrl: "/app/views/roster.html"
    });
    $routeProvider.when("/stat/delay", {
        controller: "statDelayController",
        templateUrl: "/app/views/statDelay.html"
    });
    $routeProvider.when("/users", {
        controller: "usersController",
        templateUrl: "/app/views/users.html"
    });

    $routeProvider.when("/gnt", {
        controller: "gntController",
        templateUrl: "/app/views/gnt.html"
    });
    $routeProvider.when("/fdr", {
        controller: "reportFDRController",
        templateUrl: "/app/views/reportFDR.html"
    });
    $routeProvider.when("/fin/report", {
        controller: "finReportController",
        templateUrl: "/app/views/finReport.html"
    });
    $routeProvider.when("/fin/monthly/report", {
        controller: "finmonthController",
        templateUrl: "/app/views/finmonthreport.html"
    });

    $routeProvider.when("/delays", {
        controller: "delayReportController",
        templateUrl: "/app/views/delayreport.html"
    });

    $routeProvider.when("/citypair", { 
        controller: "citypairController",
        templateUrl: "/app/views/citypair.html"
    });


    $routeProvider.when("/fdps", {
        controller: "fdpsController",
        templateUrl: "/app/views/fdps.html"
    });

    $routeProvider.when("/ipaccess", {
        controller: "ipaccessController",
        templateUrl: "/app/views/ipaccess.html"
    });

    $routeProvider.when("/verify", {
        controller: "verifyController",
        templateUrl: "/app/views/verify.html"
    });

    $routeProvider.when("/forma", {
        controller: "formaController",
        templateUrl: "/app/views/forma.html"
    });
    $routeProvider.when("/roster/admin", {
        controller: "fdpsController",
        templateUrl: "/app/views/fdps.html",
        isAdmin: true,
    });

    $routeProvider.when("/board", {
        controller: "boardController",
        templateUrl: "/app/views/board.html",
        isAdmin: true,
    });

    $routeProvider.when("/board/test", {
        controller: "boardTestController",
        templateUrl: "/app/views/boardtest.html",
        isAdmin: true,
    });
    $routeProvider.when("/reg/flights/monthly", {
        controller: "regFlightsMonthlyController",
        templateUrl: "/app/views/regflightmonthly.html",
        
    });

    $routeProvider.when("/reg/flights/monthly/:yy/:mm", {
        controller: "regFlightsMonthlyController",
        templateUrl: "/app/views/regflightmonthly.html",

    });

    $routeProvider.when("/flights/monthly", {
        controller: "flightsMonthlyController",
        templateUrl: "/app/views/flightsmonthly.html",

    });

    $routeProvider.when("/formmovaled", {
        controller: "formmovaledController",
        templateUrl: "/app/views/formmovaled.html"
    });
    $routeProvider.when("/fuel", {
        controller: "fuelController",
        templateUrl: "/app/views/fuelbi.html",
        reloadOnSearch: false
    });
    $routeProvider.otherwise({ redirectTo: "/home" });

});   

//var serviceBase = 'http://grfn.api.epatrin.ir/';
//var webBase = 'http://grfn.epatrin.ir/';
if (window.location.href.indexOf('fleet.flypersia.aero') != -1) {
    var webBase = 'http://fleet.flypersia.aero/airpocket/';
    var serviceBase = 'http://fleet.flypersia.aero/api.airpocket/';
}
else {
    //var serviceBase = 'http://apig.epapocket.ir/';
    var serviceBase = 'http://localhost:58908/';
   // var serviceBase = 'http://fleet.caspianairlines.com/api/';
    var webBase = 'http://localhost:30273/';
}

//var serviceBase =  'http://localhost:58908/';
 //var webBase = 'http://localhost:30273/';



    //'http://localhost:58908/';
    //'http://localhost:40654/';
   
    //'http://localhost:10707/';
//'http://ngauthenticationapi.azurewebsites.net/';
app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    clientId: 'ngAuthApp'
});
 
//app.config(function ($httpProvider) {
app.config(['$httpProvider', function ($httpProvider) {
   
    $httpProvider.interceptors.push('authInterceptorService');
}]);

app.directive('ngRightClick', function ($parse) {
    return function (scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function (event) {
            scope.$apply(function () {
                event.preventDefault();
                fn(scope, { $event: event });
            });
        });
    };
});
 
app.run(['authService', 'activityService', '$rootScope', '$location', '$templateCache', function (authService, activityService, $rootScope, $location, $templateCache) {
    //alert($location.absUrl());
    // Config.CustomerId = 4;
    $rootScope.CustomerName = 'Caspian';
    $rootScope.CustomerPhone = '+982148063000';
    $rootScope.CustomerEmail = 'OpsEng@Caspian.aero';
    Config.CustomerId = 1;
    if ($location.absUrl().indexOf('fleet.flypersia.aero') != -1) {
        webBase = 'http://fleet.flypersia.aero/airpocket/';
        serviceBase = 'http://fleet.flypersia.aero/api.airpocket/';
    }
    ////////////////////////////////
    $rootScope.reportServer = "https://localhost:44350/frmreportview.aspx";
    
    ////////////////////////////////
    persianDate.toLocale('en');
   
    $rootScope.$on('$viewContentLoaded', function () {
        //ati12
        if (authService.IsAuthurized() && $rootScope.EmailConfirmed != "True") {
            $rootScope.navigatefirstlogin();
            return;
        }
           
        $templateCache.removeAll();
    });
    $rootScope.serviceUrl = serviceBase;
    $rootScope.fileHandlerUrl = webBase + 'filehandler.ashx';
    $rootScope.clientsFilesUrl = webBase + 'upload/clientsfiles/';
    $rootScope.app_title = 'AirPocket';
    $rootScope.page_title = '';
    $rootScope.app_remark = 'Lorem ipsum dolor sit amet';
    $rootScope.module = '';
    $rootScope.moduleId = -1;
    $rootScope.moduleRemark = '';
    $rootScope.theme = '';
    $rootScope.color = '';
    $rootScope.class = '';
    $rootScope.userName = '';
    $rootScope.userTitle = '';
    $rootScope.userId = null;
    $rootScope.employeeId = null;
    //vahid
    $rootScope.roles = null;
    //ati12
    $rootScope.logOut = function () {

        authService.logOut();
    };
    $rootScope.apps = function () { $location.path('/apps'); };
    $rootScope.menu = function () {


        $('._menu').hide();
        $('#module' + $rootScope.moduleId).show();
        document.getElementById("mySidenav").style.width = "100%";
    };
    $rootScope.closeMenu = function () {
        document.getElementById("mySidenav").style.width = "0";
    };
    $rootScope.navigate = function (target, key) {
        
        var rec = Enumerable.From(Config.MenuItems).Where('$.moduleId==' + $rootScope.moduleId + ' && $.key=="' +  key + '"').FirstOrDefault();
        activityService.hitMenu(key, target, 'Visiting ' + $rootScope.module+' > '+rec.title);
         
        $location.path(target); 
       
       
    };
    $rootScope.navigateairport = function (iata) {

        

        $location.path("/dispatch/flights/"+iata+"/0");


    };
    $rootScope.navigatehomedate = function (y,m,d) {



        $location.path("/home/" + y + "/"+m+"/"+d);


    };

    //ati new
    $rootScope.navigatehome  = function ( ) {
          $location.path("/home"  );
    };

    //ati new 2
    $rootScope.navigatefirstlogin = function () {
        $location.path("/cp");
    };


    $rootScope.HasMenuAccess = function (key, module) {
        if ($rootScope.userName == 'demo')
            return true;
        //profile_users
        if (key == 'profile_users' && $rootScope.userName != 'razbani') {

            return false;


        }
       
       
        if (key == 'flight_board_ceo') {
            if (authService.getCEO())
                return true;
            return false;

        }
        if (key == 'flight_board') {
            if (authService.getCEO())
                return false;
           

        }
        var exist = Enumerable.From($rootScope.claims).Where('$.page=="' + key + '"').FirstOrDefault();
        
        if (!exist) {
            switch (module) {
                case 3:
                    exist = Enumerable.From($rootScope.claims).Where('$.page=="flight_admin"').FirstOrDefault();
                    
                    break;
                case 2:
                    exist = Enumerable.From($rootScope.claims).Where('$.page=="learning_admin"').FirstOrDefault();
                    
                    break;
                case 1:
                    exist = Enumerable.From($rootScope.claims).Where('$.page=="base_admin"').FirstOrDefault();
                     
                    break;
                default:
                    break;

            }
        }
        //alert(exist ? true : false);
        var result = exist ? true : false;
      //  if (result)
        //    console.log(module+'  '+key);
        return result;
    };
    $rootScope.IsFlightBoardEditable = function () {
        var exist = Enumerable.From($rootScope.claims).Where('($.page=="flight_board" && $.action=="edit") || $.page=="flight_admin"').FirstOrDefault();
        return exist ? true : false;
    };
    $rootScope.IsProfileEditable = function () {
        var exist = Enumerable.From($rootScope.claims).Where('($.page=="profile_person" && $.action=="edit") || $.page=="base_admin"').FirstOrDefault();
        return exist ? true : false;
    };
    $rootScope.IsLibraryEditable = function () {
        var exist = Enumerable.From($rootScope.claims).Where('($.page=="learning_admin") || ($.page=="library_book" && $.action=="edit") || ($.page=="library_video" && $.action=="edit") || ($.page=="library_paper" && $.action=="edit")').FirstOrDefault();
        return exist ? true : false;
    };
    $rootScope.IsDocEditable = function () {
        var exist = Enumerable.From($rootScope.claims).Where('($.page=="learning_admin") || ($.page=="library_document" && $.action=="edit") ').FirstOrDefault();
        return exist ? true : false;
    };
    $rootScope.IsOnlyFlightView = function () {

        if ($rootScope.roles && $rootScope.roles.length == 1 && ($rootScope.roles[0] == 'Transport' || $rootScope.roles[0] == 'Station'))
            return true;
         
         var arr = Enumerable.From($rootScope.claims).Select('$.page').Distinct().ToArray();

        return arr.length==1 && arr[0]!='flight_admin' ? true : false;
        

    };
    $rootScope.HasAccessToFlightPocket = function () {
         
        var exist = Enumerable.From($rootScope.roleClaims).Where('$.indexOf("FlightPocket")!=-1').FirstOrDefault();
        return exist ? true : false;
    };
    $rootScope.HasAccessToBasePocket = function () {

        var exist = Enumerable.From($rootScope.roleClaims).Where('$.indexOf("BasePocket")!=-1').FirstOrDefault();
        return exist ? true : false;
    };
    $rootScope.HasAccessToLearningPocket = function () {

        var exist = Enumerable.From($rootScope.roleClaims).Where('$.indexOf("LearningPocket")!=-1').FirstOrDefault();
        return exist ? true : false;
    };
    /////////////////////

    $rootScope.headerClasses = ['app-headerx', 'wrapper-bubble', 'col-lg-12', 'col-md-12', 'col-sm-12', 'col-xs-12'];
    //ati 1-14
    $rootScope.headerClassesMobile = ['app-headerx', 'wrapper-bubble', 'col-lg-12', 'col-md-12', 'col-sm-12', 'col-xs-12'];
    $rootScope.headerHeight = 81;
    $rootScope.detector = new MobileDetect(window.navigator.userAgent);
    if ($rootScope.detector.mobile())
        $rootScope.headerHeight = 55;
    
    /////////////////////////////////////

    
    authService.fillAuthData();
    authService.fillModuleData();

    $rootScope.setTheme = function () {
        //DevExpress.ui.themes.current($rootScope.theme);
        //$rootScope.headerClasses = ['app-headerx', 'wrapper-bubble', 'col-lg-12', 'col-md-12', 'col-sm-12', 'col-xs-12','hidden-xs'];
        //$rootScope.headerClasses.push($rootScope.class);

        ////ati 1-14
        //$rootScope.headerClassesMobile = ['app-headerx-mobile', 'wrapper-bubble', 'col-lg-12', 'col-md-12', 'col-sm-12', 'col-xs-12','hidden-lg', 'hidden-md', 'hidden-sm'];
        //$rootScope.headerClassesMobile.push($rootScope.class);

        try {
            DevExpress.ui.themes.current($rootScope.theme);
            $rootScope.headerClasses = ['app-headerx', 'wrapper-bubble', 'col-lg-12', 'col-md-12', 'col-sm-12', 'col-xs-12', 'hidden-xs', 'hidden-md', 'hidden-sm','hidden-xsm'];
            $rootScope.headerClasses.push($rootScope.class);
            //ati 1-14
            $rootScope.headerClassesMobile = ['app-headerx-mobile', 'wrapper-bubble', 'col-lg-12', 'col-md-12', 'col-sm-12', 'col-xs-12','col-xsm-12', 'hidden-lg', ];
            $rootScope.headerClassesMobile.push($rootScope.class);
        }
        catch (e) {
            //alert(e);
        }
       
    };
    /////////////////////////////
    $rootScope.getWindowSize  = function ( ) {
        var w = -1;
        var h = -1;
        var w = $(window).width()  ;
        var h = $(window).height()  ;
        

        return { width: w, height: h };
    };

    //////////////////////////
    $rootScope.setTheme();
    $rootScope.history = [];

    $rootScope.getSelectedRow = function (instance) {
        if (!instance)
            return null;
        var rows = instance.getSelectedRowsData();
        if (rows && rows.length > 0)
            return rows[0];
        return null;
    };
    $rootScope.getSelectedRows = function (instance) {
        if (!instance)
            return null;
        var rows = instance.getSelectedRowsData();
        if (rows && rows.length > 0)
            return rows ;
        return null;
    };
    $rootScope.getNextDate = function (interval, ctype, date) {
         
        if (!interval || !ctype || !date)
            return null;
        ctype = Number(ctype);
        var nextDate = new Date(date);
         
        //year
        if (ctype == 12) {
            nextDate = nextDate.setFullYear(nextDate.getFullYear() + interval);
            return nextDate;
        }
        //month
        if (ctype == 13) {
            nextDate = nextDate.setMonth(nextDate.getMonth() + interval);
            return nextDate;
        }
        //day
        if (ctype == 14) {
            nextDate = nextDate.setDate(nextDate.getDate() + interval);
            return nextDate;
        }
        return null;
    };
    $rootScope.$on('$routeChangeSuccess', function () {
        $rootScope.history.push($location.$$path);
       
    });
    //////////////////////////////////////////////
    $rootScope.DateBoxFormat = "dd-MMM-yyyy";
    //////////////////DataSources//////////////////
    $rootScope.AircraftTypes = null;
    $rootScope.MSNs = null;

    $rootScope.getDatasourceOption = function (pid) {
        return new DevExpress.data.DataSource({
            store:

            new DevExpress.data.ODataStore({
                url: $rootScope.serviceUrl + 'odata/options/'+pid,
              //  key: "Id",
               // keyType: "Int32",
                version: 4
            }),
            //filter: ['ParentId', '=', pid],
            sort: ['OrderIndex', 'Title'],
        });
    };
    $rootScope.getDatasourceLibraryItemTypes = function () {
        return new DevExpress.data.DataSource({
            store:

                new DevExpress.data.ODataStore({
                    url: $rootScope.serviceUrl + 'odata/options/' + '82',
                    //  key: "Id",
                    // keyType: "Int32",
                    // version: 4
                }),
             filter: ['Id', '<>', 86],
            sort: ['OrderIndex', 'Title'],
        });
    };
    $rootScope.getDatasourcePersonCourseStatus = function () {
        return new DevExpress.data.DataSource({
            store:

            new DevExpress.data.ODataStore({
                url: $rootScope.serviceUrl + 'odata/options/personcoursestatus'  ,
                //  key: "Id",
                // keyType: "Int32",
                // version: 4
            }),
            //filter: ['ParentId', '=', pid],
            sort: ['OrderIndex', 'Title'],
        });
    };
    $rootScope.getDatasourceCityByCountry = function (cid) {
        return new DevExpress.data.DataSource({
            store:

            new DevExpress.data.ODataStore({
                url: $rootScope.serviceUrl + 'odata/cities/country/' + cid,
                //  key: "Id",
                // keyType: "Int32",
                  version: 4
            }),
            //filter: ['ParentId', '=', pid],
            sort: ['City'],
        });
    };
    $rootScope.getDatasourceAirport = function () {
        return new DevExpress.data.DataSource({
            store:

                new DevExpress.data.ODataStore({
                    url: $rootScope.serviceUrl + 'odata/airports/all'  ,
                    //  key: "Id",
                    // keyType: "Int32",
                    version: 4
                }),
            filter: ['IATA', '<>', '-'],
            sort: ['IATA'],
        });
    };
    $rootScope.getDatasourceRoutesFromAirport = function (id) {
        return new DevExpress.data.DataSource({
            store:

                new DevExpress.data.ODataStore({
                    url: $rootScope.serviceUrl + 'odata/flights/routes/from/airline/' + id,
                    //  key: "Id",
                    // keyType: "Int32",
                    version: 4
                }),
            filter: ['IATA', '<>', '-'],
            sort: ['IATA'],
        });
    };
    $rootScope.getDatasourceRoutes = function (id) {
        return new DevExpress.data.DataSource({
            store:

                new DevExpress.data.ODataStore({
                    url: $rootScope.serviceUrl + 'odata/flights/routes/airline/'+id,
                    //  key: "Id",
                    // keyType: "Int32",
                    version: 4
                }),
             
            sort: ['FromAirportIATA'],
        });
    };
    $rootScope.getDatasourceCountries = function () {
        return new DevExpress.data.DataSource({
            store:

                new DevExpress.data.ODataStore({
                    url: $rootScope.serviceUrl + 'odata/countries/',
                    //  key: "Id",
                    // keyType: "Int32",
                    version: 4
                }),
            //filter: ['ParentId', '=', pid],
            sort: ['Name'],
        });
    };
    $rootScope.getDatasourceLoctionCustomer = function () {
        return new DevExpress.data.DataSource({
            store:

            new DevExpress.data.ODataStore({
                url: $rootScope.serviceUrl + 'odata/locations/' + Config.CustomerId,
                //  key: "Id",
                // keyType: "Int32",
                // version: 4
            }),
            //filter: ['ParentId', '=', pid],
            sort: ['FullCode'],
        });
    };
    $rootScope.getDatasourceAircrafts = function () {
        return new DevExpress.data.DataSource({
            store:

            new DevExpress.data.ODataStore({
                url: $rootScope.serviceUrl + 'odata/aircrafttypes/all'  ,
                //  key: "Id",
                // keyType: "Int32",
                version: 4
            }),
            //filter: ['ParentId', '=', pid],
            sort: ['Manufacturer','Type'],
        });
    };
    $rootScope.getDatasourceAuthors= function () {
        return new DevExpress.data.DataSource({
            store:

                new DevExpress.data.ODataStore({
                    url: $rootScope.serviceUrl + 'odata/authors',
                    //  key: "Id",
                    // keyType: "Int32",
                    version: 4
                }),
            //filter: ['ParentId', '=', pid],
            sort: ['Name' ],
        });
    };
    $rootScope.getDatasourceCourseType = function () {
        return new DevExpress.data.DataSource({
            store:

            new DevExpress.data.ODataStore({
                url: $rootScope.serviceUrl + 'odata/courses/types',
                //  key: "Id",
                // keyType: "Int32",
                version: 4
            }),
            //filter: ['ParentId', '=', pid],
            sort: ['Title'],
        });
    };
    $rootScope.getDatasourceCaoType = function () {
        return new DevExpress.data.DataSource({
            store:

            new DevExpress.data.ODataStore({
                url: $rootScope.serviceUrl + 'odata/base/caotypes',
                //  key: "Id",
                // keyType: "Int32",
                version: 4
            }),
            //filter: ['ParentId', '=', pid],
            sort: ['Title'],
        });
    };
    $rootScope.getDatasourceAirline = function () {
        return new DevExpress.data.DataSource({
            store:

            new DevExpress.data.ODataStore({
                url: $rootScope.serviceUrl + 'odata/base/airlines',
                //  key: "Id",
                // keyType: "Int32",
                version: 4
            }),
            //filter: ['ParentId', '=', pid],
            sort: ['Title'],
        });
    };
    $rootScope.getDatasourceRatingOrgs = function () {
        return new DevExpress.data.DataSource({
            store:

            new DevExpress.data.ODataStore({
                url: $rootScope.serviceUrl + 'odata/base/ratingorganization',
                //  key: "Id",
                // keyType: "Int32",
                version: 4
            }),
            //filter: ['ParentId', '=', pid],
            sort: ['Title'],
        });
    };
    $rootScope.getDatasourcePublishers = function () {
        return new DevExpress.data.DataSource({
            store:

                new DevExpress.data.ODataStore({
                    url: $rootScope.serviceUrl + 'odata/base/publishers',
                    //  key: "Id",
                    // keyType: "Int32",
                    version: 4
                }),
            //filter: ['ParentId', '=', pid],
            sort: ['Title'],
        });
    };
    
    $rootScope.getDatasourceJournals = function () {
        return new DevExpress.data.DataSource({
            store:

                new DevExpress.data.ODataStore({
                    url: $rootScope.serviceUrl + 'odata/base/journals',
                    //  key: "Id",
                    // keyType: "Int32",
                    version: 4
                }),
            //filter: ['ParentId', '=', pid],
            sort: ['Title'],
        });
    };
    $rootScope.getDatasourceCurrencies = function () {
        return new DevExpress.data.DataSource({
            store:

            new DevExpress.data.ODataStore({
                url: $rootScope.serviceUrl + 'odata/base/currencies',
                //  key: "Id",
                // keyType: "Int32",
                version: 4
            }),
            //filter: ['ParentId', '=', pid],
            sort: ['Title'],
        });
    };
    $rootScope.getDatasourceGroups = function () {
        return new DevExpress.data.DataSource({
            store:

            new DevExpress.data.ODataStore({
                    url: $rootScope.serviceUrl + 'odata/base/jobgroups/'+ Config.CustomerId,
                //  key: "Id",
                // keyType: "Int32",
                version: 4
            }),
            //filter: ['ParentId', '=', pid],
            sort: ['FullCode'],
        });
    };

    $rootScope.getDatasourceFolders = function () {
        return new DevExpress.data.DataSource({
            store:

                new DevExpress.data.ODataStore({
                    url: $rootScope.serviceUrl + 'odata/base/library/folders/' + Config.CustomerId,
                    //  key: "Id",
                    // keyType: "Int32",
                    version: 4
                }),
            //filter: ['ParentId', '=', pid],
            sort: ['Fullcode'],
        });
    };

    $rootScope.getDatasourceFlightsAcTypes = function (cid) {
        return new DevExpress.data.DataSource({
            store:

                new DevExpress.data.ODataStore({
                    url: $rootScope.serviceUrl + 'odata/flights/actypes/' + cid,
                    version: 4
                }),
            
            sort: ['Title'],
        });
    };
    $rootScope.getDatasourceFlightsRegisters = function (cid) {
        return new DevExpress.data.DataSource({
            store:

                new DevExpress.data.ODataStore({
                    url: $rootScope.serviceUrl + 'odata/flights/registers/' + cid,
                    version: 4
                }),

            sort: ['Title'],
        });
    };
    $rootScope.getDatasourceFlightsFrom = function (cid) {
        return new DevExpress.data.DataSource({
            store:

                new DevExpress.data.ODataStore({
                    url: $rootScope.serviceUrl + 'odata/flights/from/' + cid,
                    version: 4
                }),

            sort: ['Title'],
        });
    };
    $rootScope.getDatasourceFlightsTo = function (cid) {
        return new DevExpress.data.DataSource({
            store:

                new DevExpress.data.ODataStore({
                    url: $rootScope.serviceUrl + 'odata/flights/to/' + cid,
                    version: 4
                }),

            sort: ['Title'],
        });
    };
    $rootScope.getDatasourceFlightPermits = function () {
        return new DevExpress.data.DataSource({
            store:

                new DevExpress.data.ODataStore({
                    url: $rootScope.serviceUrl + 'odata/flights/plan/permits/',
                    //  key: "Id",
                    // keyType: "Int32",
                    version: 4
                }),
          
            sort: ['Title'],
        });
    };
    $rootScope.getDatasourceDelayCategory = function () {
        return new DevExpress.data.DataSource({
            store:

                new DevExpress.data.ODataStore({
                    url: $rootScope.serviceUrl + 'odata/flights/delaycodecats/',
                    //  key: "Id",
                    // keyType: "Int32",
                    version: 4
                }),

            sort: ['Title'],
        });
    };
    //vahid new
    $rootScope.getDatasourceIP = function () {
        return new DevExpress.data.DataSource({
            store:

            new DevExpress.data.ODataStore({
                url: $rootScope.serviceUrl + 'odata/crew/ip'  ,
                //  key: "Id",
                // keyType: "Int32",
                version: 4
            }),
            //filter: ['ParentId', '=', pid],
            sort: ['ScheduleName' ],
        });
    };
    //vahid new
    $rootScope.getDatasourceCaptain = function () {
        return new DevExpress.data.DataSource({
            store:

            new DevExpress.data.ODataStore({
                url: $rootScope.serviceUrl + 'odata/crew/captain',
                //  key: "Id",
                // keyType: "Int32",
                version: 4
            }),
            //filter: ['ParentId', '=', pid],
            sort: ['ScheduleName'],
        });
    };
    ///////////////////////////////////////////////
    $rootScope.getSbTemplateAirport = function (data) {
        var tmpl =
            "<div>"
            + "<div class='tmpl-col-left' style='width:30%'>" + data.IATA + "</div>"
            + "<div class='tmpl-col-right' style='width:20%'>" + data.SortName + "</div>"
            + "<div class='tmpl-col-right'>" + data.City + "</div>"


            + "</div>";
        return tmpl;
       
    };
    $rootScope.getSbTemplateRouteTo = function (data) {
        var tmpl =
            "<div>"
            + "<div class='tmpl-col-left' style='width:30%'>" + data.ToAirportIATA + "</div>"
            + "<div class='tmpl-col-right' style='width:20%'>" + data.ToSortName + "</div>"
            + "<div class='tmpl-col-right'>" + data.ToCity + "</div>"


            + "</div>";
        return tmpl;

    };
    $rootScope.getSbTemplateRoute = function (data) {
        var tmpl =
            "<div>"
            + "<div class='tmpl-col-left'>" + data.FromAirportIATA + "</div>"
            + "<div class='tmpl-col-right'>" + data.ToAirportIATA + "</div>"


            + "</div>";
        return tmpl;

    };
    $rootScope.getSbTemplateLocation = function (data) {
        var tmpl =
            "<div>"
            + "<div class='tmpl-col-left'>" + data.TitleFormated + "</div>"
            + "<div class='tmpl-col-right'>" + data.FullCode + "</div>"


            + "</div>";
        return tmpl;
    };
    $rootScope.getSbTemplateLocation2 = function (data) {
        var tmpl =
            "<div>" + data.TitleFormated
             


            + "</div>";
        return tmpl;
    };
    $rootScope.getSbTemplateGroup = function (data) {
        var tmpl =
            "<div>" + data.TitleFormated



            + "</div>";
        return tmpl;
    };
    $rootScope.getSbTemplateAircraft = function (data) {
        var tmpl =
            "<div>"
            + "<div class='tmpl-col-left'>" + data.Type + "</div>"
            + "<div class='tmpl-col-right'>" + data.Manufacturer + "</div>"


            + "</div>";
        return tmpl;
    };
    //////////////////////////////////////////////////////
    $rootScope.goProfile = function () {
        $rootScope.navigatefirstlogin();
    }

    ////////////////////////////////////////////////
}]);
 
 
 