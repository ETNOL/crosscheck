'use strict';


app.factory('Team', function(List, User, FIREBASE_URL) {


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
		},

		deleteLists: function(list, team) {
			for (var i = 0; i < team.length ; i++) {
				if (team[i].$value) {
					var username = team[i].$value;
					User.deleteList(list, username);
				} else if (team[i].username) {
					var username = team[i].username;
					User.deleteList(list, username);
				}
			}
		}


	};

	return Team;

});