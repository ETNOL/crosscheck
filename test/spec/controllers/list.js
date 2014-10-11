'use strict';

describe('Controller: ListCtrl', function () {

  // load the controller's module
  beforeEach(module('crossCheckApp'));

  var ListCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ListCtrl = $controller('ListCtrl', {
      $scope: scope
    });
  }));

  it('should attach a integer of teamsize to the scope', function () {
    expect(scope.teamSize).toBe(typeof Integer);
  });
});