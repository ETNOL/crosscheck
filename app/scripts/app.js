/* global app:true */
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
    'ngTouch',
    'firebase'
  ])
.constant('FIREBASE_URL', 'https://amber-fire-3032.firebaseio.com/');

app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl'
      })
      .when('/list', {
        templateUrl:' views/list.html',
        controller: 'ListCtrl'
      })
      .when('/lists', {
        templateUrl:'views/lists.html',
        controller:'ListsCtrl'
      })
      .when('/register', {
        templateUrl:'views/register.html',
        controller:'AuthCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
