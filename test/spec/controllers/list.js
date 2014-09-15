'use strict';

describe('Controller: ListCtrl', function () {

  // load the controller's module
  beforeEach(module('crossCheckApp'));

  var ListCtrl,
    scope,
    team_service,
    list_service;


  // Initialize the controller and a mock scope
  beforeEach(inject(function (Team, List, $controller, $rootScope) {
    scope = $rootScope.$new();
    team_service = Team;
    list_service = List;
    ListCtrl = $controller('ListCtrl', {
      $scope: scope,
      Team:team_service,
      List:list_service
    });
  }));

  it('should report team size', function() {
    expect(scope.teamSize).toBe(2);
  });

  it('should contain an array of all items', function() {
    expect(typeof scope.items ).toBe('object');
  });

});