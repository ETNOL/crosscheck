'use strict';


app.factory("List", function() {

	var items = [
	{
		item:"Raise stabilizers", 
		checks:0 
	},{
		item:"Lock windows",
		checks:0
	}
	];

	var List = {
		all:items,
		
		add: function (input) {
			items.push(input);
		},
		remove: function(index) {
			items.splice(index, 1);
		},
		check: function(index) {
			items[index].checks++;
		},
		checkCount: function(index) {
			return items[index].checks;
		}

	}

	return List;
})