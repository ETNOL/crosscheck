'use strict';


app.factory('Team', function(List, User, FIREBASE_URL) {

	var team = [
	{
		name:"Eric"
	},{
		name:"Ariel"
	}
	];


	var Team = {
		
		members:[],
		// function(listId, listName, user)
		add: function(user) {
			// First, add member to the list reference object //
			var newMember = {
				email:user.email,
				id:user.id,
				username: user.$id
			}
			this.members.$add(newMember);	
			//Second, add the list to the user's lists //
			User.addList(List.object.$id, List.object.listName, user.email); 
		}
	};

	return Team;

});