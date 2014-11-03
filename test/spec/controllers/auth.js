'use strict';

describe('Controller: AuthCtrl', function () {

  // load the controller's module
  beforeEach(module('crossCheckApp'));

  var AuthCtrl,
    scope,
    authServiceMock,
    userServiceMock

  beforeEach(inject(function ($controller, $rootScope) {

    scope = $rootScope.$new();

    authServiceMock = {
      
    };

    userServiceMock = {
      
    };

    locationMock = {
      path:function(path) {}
    };

    AuthCtrl = $controller('AuthCtrl', {
      $scope: scope,
      Auth: authService,
      User: userServiceMock,
      $location: locationMock

    });

  }));

  it('calls Auth.login on login', function () {
    spyOn(authServiceMock, 'login');
    scope.login(user);
    expect(authServiceMock.login).toHaveBeenCalled();
  });

});