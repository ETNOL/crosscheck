'use strict';

describe('Controller: ListCtrl', function () {

  // load the controller's module
  beforeEach(module('crossCheckApp'));

  var ListCtrl,
    scope,
    List;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();

    List = {
      checks:function(index) {
        return 3;
      },
      testItems:[
        {
          description:"item one",
          checks:2
        },
                {
          description:"item two",
          checks:5
        }
      ], 
      check:function(index) {
        this.testItems[0].checks++;
      }, 
      add:function(object) {
        this.testItems.push(object);
      },
      resetList:function() {
        for (var i = 0; i < this.testItems.length; i++) {
          this.testItems[i].checks = 0;
        }
      },
      checksAsArray:function(index) {
        return [0, 1, 2];
      }
    }
    ListCtrl = $controller('ListCtrl', {
      $scope: scope,
      List: List
    });
  }));

  it('returns an array representing checks on a list item', function () {
    expect(scope.checksAsArray(0)).toEqual([0, 1, 2]);
  });
  
  it('returns an integer for total checks on a list item', function () {
    expect(scope.checks(0)).toEqual(3);
  });

  it('adds checks onto a item', function() {
    var item = List.testItems[0];
    expect(item.checks).toEqual(2);
    scope.checkItem(0);
    expect(item.checks).toEqual(3);
  });

  it('adds items to the list', function() {
    scope.item = {description:"new item"}
    expect(List.testItems.length).toEqual(2);
    scope.addItem();
    expect(List.testItems.length).toEqual(3);
  });
  
  it('resets all checks on all list items', function() {
    spyOn(window, 'confirm').andReturn(true);
    var items = List.testItems;
    expect(items[0].checks).not.toEqual(0);
    expect(items[1].checks).not.toEqual(0);
    scope.resetList();
    expect(items[0].checks).toEqual(0);
    expect(items[1].checks).toEqual(0);
  })


});