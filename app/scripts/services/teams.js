'use strict';


app.factory('Team', function() {

	var members = [
	{
		name:"Eric"
	}, {
		name:"Ariel"
	}];

	var Team = {
		
		all:members,
		
		memberCount:members.length
	};

	return Team;

});