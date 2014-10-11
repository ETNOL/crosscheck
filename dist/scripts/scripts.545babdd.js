"use strict";var app=angular.module("crossCheckApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","firebase"]).constant("FIREBASE_URL","https://amber-fire-3032.firebaseio.com/");app.config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/login.html",controller:"AuthCtrl"}).when("/list",{templateUrl:" views/list.html",controller:"ListCtrl"}).when("/lists",{templateUrl:"views/lists.html",controller:"ListsCtrl"}).when("/register",{templateUrl:"views/register.html",controller:"AuthCtrl"}).otherwise({redirectTo:"/"})}]),app.controller("AuthCtrl",["$location","$scope","$rootScope","Auth","User",function(a,b,c,d,e){b.login=function(){d.login(b.user),a.path("/lists")},b.register=function(){d.register(b.user).then(function(a){e.create(a,b.user.username)}).then(function(){a.path("/login")},function(a){b.error=a.toString()})}}]),app.controller("ListCtrl",["Team","List","$scope","$routeParams",function(a,b,c){c.list=b.list,c.items=b.items,c.teamSize=a.all.length,c.totalChecks=function(a){for(var c=[],d=0;d<b.checks(a);d++)c.push(d);return c},c.checks=function(a){return b.checks(a)},c.checkItem=function(a){b.check(a)},c.addItem=function(){b.add({item:c.item.description,checks:0}),c.item={description:""}},c.checked=function(a){return 1==a.checks?!0:void 0},c.resetList=function(){var a=confirm("Are you sure you want to reset the list?");a&&b.resetList()}}]),app.controller("ListsCtrl",["$scope","$rootScope","$firebase","FIREBASE_URL","$location","User",function(a,b,c,d,e,f){new Firebase(d+"/lists");a.user=f.getCurrent(),a.lists=b.userLists,a.loadList=function(a){b.listId=a.$id,e.path("/list")},a.newList=function(){var c=b.currentUser.id,e=new Firebase(d+"/lists/"+c),f={listName:a.newList.listName};e.push(f)}}]),app.controller("NavCtrl",["$location","$scope","User",function(a,b,c){b.user=c.getCurrent(),b.signedIn=function(){return c.signedIn()},b.home=function(){a.path("/")}}]),app.factory("List",["User","$rootScope","$firebase","FIREBASE_URL",function(a,b,c,d){var e=new Firebase(d+"/lists"),f=(c(e.child(b.currentUser.id).child(b.listId)).$asObject(),c(e.child(b.currentUser.id).child(b.listId).child("items")).$asArray()),g={items:f,add:function(a){f.$add(a)},remove:function(a){f.$remove(a)},check:function(a){f[a].checks++,f.$save(a)},checks:function(a){return f[a].checks},resetList:function(){console.log("reset called!");for(var a=0;a<f.length;a++)f[a].checks=0,f.$save(a)}};return g}]),app.factory("Team",["FIREBASE_URL",function(a){var b=[{name:"Eric"},{name:"Ariel"}],c=(new Firebase(a+"teams"),{all:b,memberCount:b.length});return c}]),app.factory("User",["$rootScope","$firebase","FIREBASE_URL",function(a,b,c){function d(a){g.initUser(a)}var e=new Firebase(c+"crossCheckUsers"),f=new Firebase(c+"lists"),g={create:function(a){console.log(a.id);var c=b(e.child(a.id)).$asObject();return c.$loaded(function(){c.email=a.email,c.id=a.id,c.$priority=a.uid,c.$save()})},findById:function(a){var c=b(e.child(a)).$asObject();return c},setCurrent:function(b){a.currentUser=g.findById(b)},getCurrent:function(){return a.currentUser},signedIn:function(){return void 0!=a.currentUser},initUser:function(a){g.setCurrent(a),g.initLists(a)},initLists:function(c){var d=b(f.child(c)).$asArray();a.userLists=d}};return a.$on("$firebaseSimpleLogin:login",function(a,c){var f=b(e.startAt(c.uid).endAt(c.uid)).$asArray();console.log("Query:"),console.log(f),f.$loaded(function(){d(f[0].id)})}),a.$on("$firebaseSimpleLogin:logout",function(){delete a.currentUser}),g}]),app.factory("Auth",["User","$rootScope","$firebaseSimpleLogin","FIREBASE_URL",function(a,b,c,d){var e=new Firebase(d),f=c(e),g={register:function(a){return f.$createUser(a.email,a.password)},login:function(b){b.rememberMe="true",f.$login("password",b).then(function(b){console.log("Auth.login user:\n "),console.log(b),a.initUser(b.id)},function(a){console.log(a)})},signedIn:function(){return null!==f.user},logout:function(){f.$logout()}};return b.signedIn=function(){return g.signedIn()},g}]);