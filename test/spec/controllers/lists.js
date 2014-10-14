describe('Controller: ListsCtrl', function () {

  // load the controller's module
  beforeEach(module('crossCheckApp'));

  var ListsCtrl,
    user,
    location,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($location, $controller, $rootScope) {
    rootScope = $rootScope;
    scope = $rootScope.$new();
    location = $location;
    user = {

    }; 
    ListsCtrl = $controller('ListsCtrl', {
      $scope: scope,
    });
  }));

  it('changes route to a selected list', function () {
    var list = {$id:"list_id"};
    scope.loadList(list);
    rootScope.$apply();
    expect(location.path()).toBe('/list/list_id');
  });

  it('creates a new list', function() {
    expect(scope.lists.length).toEqual(2);
    scope.newList();
    expect(scope.lists.length).toEqual(3); 
  })
  

});