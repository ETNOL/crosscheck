describe('Controller: ListsCtrl', function () {

  // load the controller's module
  beforeEach(module('crossCheckApp'));

  var ListsCtrl,
    listsServiceMock,
    userServiceMock,
    location,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($location, $controller, $rootScope, $q) {
    rootScope = $rootScope;
    scope = $rootScope.$new();
    location = $location;
    
    listsServiceMock = {
      newList: function() {},
      deleteList: function() {}
    };
    
    userServiceMock = {
      getCurrent:function() { 
        var userObject = {
          then: function() { return { email:"test@example.com" } } 
        };
        return userObject;
      },

      findByEmail:function(email) { 
        return { 
          $loaded: function() {
            return [{$id:1}] 
          }
        };
        
      }
    }

    ListsCtrl = $controller('ListsCtrl', {
      $scope: scope,
      Lists:listsServiceMock,
      User:userServiceMock
    });
  }));

  it('calls a new route to a selected list', function () {
    var list = {$id:"list_id"};
    scope.loadList(list);
    rootScope.$apply();
    expect(location.path()).toBe('/list/list_id');
  });

  it('creates a new list', function() {
    spyOn(listsServiceMock, 'newList');
    scope.newList();
    expect(listsServiceMock.newList).toHaveBeenCalled();
  });

  it('clears newList.listName on new list', function() {
    scope.newList['listName'] = "test list";
    scope.newList();
    expect(scope.newList.listName).toEqual("");
  });

  it('calls for a list to be deleted', function() {
    spyOn(listsServiceMock, 'deleteList');
    scope.deleteList();
    expect(listsServiceMock.deleteList).toHaveBeenCalled();
  });

  it('initializes the user and users lists', function () {
    // Can't crack this case...
  });
  

});