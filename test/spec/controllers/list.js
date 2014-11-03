'use strict';

describe('Controller: ListCtrl', function () {

  // load the controller's module
  beforeEach(module('crossCheckApp'));

  var ListCtrl,
    scope,
    teamServiceMock,
    listServiceMock,
    locationMock;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    // Assumes Confirmation windows will be returned true //
    spyOn(window, 'confirm').andReturn(true);
    
    scope = $rootScope.$new();


    teamServiceMock = {
      deleteLists:function() {}
    };

    listServiceMock = {
      checksAsArray: function(index) {return [0,1,2] },
      checks: function(index) { return 3 },
      check: function(index) {},
      add: function() {},
      resetList: function() {},
      deleteList: function() {}
    };

    locationMock = {
      path:function(path) {}
    };

    ListCtrl = $controller('ListCtrl', {
      $scope: scope,
      List: listServiceMock,
      Team: teamServiceMock,
      $location: locationMock

    });

  }));

  it('calls and returns List.checksAsArray on checksAsArray', function () {
    spyOn(listServiceMock, 'checksAsArray').andCallThrough();
    var methodReturn = scope.checksAsArray(1);
    expect(methodReturn).toEqual([0,1,2]);
    expect(listServiceMock.checksAsArray).toHaveBeenCalled();

  });
  
  it('calls and returns List.checks on checks', function () {
    spyOn(listServiceMock, 'checks').andCallThrough();
    var methodReturn = scope.checks(0);
    expect(scope.checks(0)).toEqual(3);
    expect(listServiceMock.checks).toHaveBeenCalled();
  });

  it('calls List.check on checkItem', function() {
    spyOn(listServiceMock, 'check');
    scope.checkItem(0);
    expect(listServiceMock.check).toHaveBeenCalled()
  });

  it('calls List.add on addItem', function() {
    scope.item = {description:"new item"};
    spyOn(listServiceMock, 'add');
    scope.addItem();
    expect(listServiceMock.add).toHaveBeenCalled();
  });

  it('clears item.description on addItem', function() {
    scope.item = {description:"new item"};
    scope.addItem();
    expect(scope.item.description).toEqual('');
  });
  
  it('calls List.resetList on resetList', function() {
    spyOn(listServiceMock, 'resetList');
    scope.resetList();
    expect(listServiceMock.resetList).toHaveBeenCalled();
  });

  it('calls List.deleteList on deleteList if confirmed', function() {
    spyOn(listServiceMock, 'deleteList');
    scope.deleteList();
    expect(listServiceMock.deleteList).toHaveBeenCalled();
  });

  it('calls Team.deleteLists on deleteList if confirmed', function() {
    spyOn(teamServiceMock, 'deleteLists');
    scope.deleteList();
    expect(teamServiceMock.deleteLists).toHaveBeenCalled();
  });

  it('routes after on deleteList if confirmed', function() {
    spyOn(locationMock, 'path');
    scope.deleteList();
    expect(locationMock.path).toHaveBeenCalled();
  });

});