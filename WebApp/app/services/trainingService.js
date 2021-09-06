'use strict';
app.factory('trnService', ['$http', '$q', 'ngAuthSettings', '$rootScope', function ($http, $q, ngAuthSettings, $rootScope) {



    var serviceFactory = {};

    var _getCourseTypes = function () {
         
        var deferred = $q.defer();
        $http.get(serviceBaseTRN + 'api/course/types').then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };

    var _getCourseTypeGroups = function (cid) {

        var deferred = $q.defer();
        $http.get(serviceBaseTRN + 'api/course/type/groups/'+cid).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getCourseSessions = function (cid) {

        var deferred = $q.defer();
        $http.get(serviceBaseTRN + 'api/course/sessions/'+cid).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };

    var _getCertificateTypes = function () {

        var deferred = $q.defer();
        $http.get(serviceBaseTRN + 'api/certificate/types').then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };

    var _getCoursePeople = function (cid) {

        var deferred = $q.defer();
        $http.get(serviceBaseTRN + 'api/course/people/'+cid).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) { 

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    //_getCoursePeopleSessions
    var _getCoursePeopleSessions = function (cid) {

        var deferred = $q.defer();
        $http.get(serviceBaseTRN + 'api/course/peoplesessions/' + cid).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _saveCourseType = function (entity) {
        var deferred = $q.defer();
        $http.post(serviceBaseTRN + 'api/course/types/save', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _deleteCourseType = function (entity) {
        var deferred = $q.defer();
        $http.post(serviceBaseTRN + 'api/course/types/delete', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };

    var _saveCourse = function (entity) {
        var deferred = $q.defer();
        $http.post(serviceBaseTRN + 'api/course/save', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };

    var _deleteCourse = function (entity) {
        var deferred = $q.defer();
        $http.post(serviceBaseTRN + 'api/course/delete', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };

    var _saveCertificate = function (entity) {
        var deferred = $q.defer();
        $http.post(serviceBaseTRN + 'api/certificate/save', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };

    var _saveCoursePeople = function (entity) {
        var deferred = $q.defer();
        $http.post(serviceBaseTRN + 'api/course/people/save', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _deleteCoursePeople = function (entity) {
        var deferred = $q.defer();
        $http.post(serviceBaseTRN + 'api/course/people/delete', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _saveCourseSessionPres = function (entity) {
        var deferred = $q.defer();
        $http.post(serviceBaseTRN + 'api/course/session/pres/save', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _saveSessionsSync = function (entity) {
        var deferred = $q.defer();
        $http.post(serviceBaseTRN + 'api/course/sessions/sync', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };

    var _saveCoursePeopleStatus = function (entity) {
        var deferred = $q.defer();
        $http.post(serviceBaseTRN + 'api/course/people/status/save', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };

    var _getCourse = function (cid) {

        var deferred = $q.defer();
        $http.get(serviceBaseTRN + 'api/course/' + cid).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getCoursesByType = function (tid,sid) {

        var deferred = $q.defer();
        $http.get(serviceBaseTRN + 'api/course/bytype/' + tid+'/'+sid).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };

    var _getCourseView = function (cid) {

        var deferred = $q.defer();
        $http.get(serviceBaseTRN + 'api/course/view/' + cid).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getCourseViewObject = function (cid) {

        var deferred = $q.defer();
        $http.get(serviceBaseTRN + 'api/course/view/object/' + cid).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getPersonCourses = function (pid) {

        var deferred = $q.defer();
        $http.get(serviceBaseTRN + 'api/person/courses/' + pid).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    
    var _saveSessionsSyncGet = function (pid) {

        var deferred = $q.defer();
        $http.get(serviceBaseTRN + 'api/course/sessions/sync/get/' + pid).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    serviceFactory.getPersonCourses = _getPersonCourses;
    serviceFactory.getCourseView = _getCourseView;
    serviceFactory.getCourseViewObject = _getCourseViewObject;
    serviceFactory.getCourse = _getCourse;
    serviceFactory.getCourseTypes = _getCourseTypes;
    serviceFactory.getCoursesByType = _getCoursesByType;
    serviceFactory.getCourseTypeGroups = _getCourseTypeGroups;
    serviceFactory.getCertificateTypes = _getCertificateTypes;
    serviceFactory.saveCourseType = _saveCourseType;
    serviceFactory.deleteCourseType = _deleteCourseType;
    serviceFactory.saveCourse = _saveCourse;
    serviceFactory.deleteCourse = _deleteCourse;
    serviceFactory.saveCertificate = _saveCertificate;
    serviceFactory.saveCourseSessionPres = _saveCourseSessionPres;
    serviceFactory.saveSessionsSync = _saveSessionsSync;
    serviceFactory.saveSessionsSyncGet = _saveSessionsSyncGet;
    serviceFactory.saveCoursePeople = _saveCoursePeople;
    serviceFactory.deleteCoursePeople = _deleteCoursePeople;
    serviceFactory.saveCoursePeopleStatus = _saveCoursePeopleStatus;
    serviceFactory.getCourseSessions = _getCourseSessions;
    serviceFactory.getCoursePeople = _getCoursePeople;
    serviceFactory.getCoursePeopleSessions = _getCoursePeopleSessions;
    return serviceFactory;

}]);