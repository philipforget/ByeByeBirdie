App.Router = Backbone.Router.extend({
	routes : {
		'' : 'home',
		':username': 'user'
	},

	home: function() {
		new App.HomeView();
	},

	user: function(username) {
		new App.UserView({
			username: username
		});
	}
});
