'use strict';

/**
 * @ngdoc overview
 * @name crossCheckApp
 * @description
 * # crossCheckApp
 *
 * Main module of the application.
 */
var app = angular.module('crossCheckApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ]);


app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/users.html',
        controller: 'AuthCtrl'
      })
      .when('/list', {
        templateUrl:' views/list.html',
        controller: 'ListCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
