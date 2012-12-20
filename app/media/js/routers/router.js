App.Router = Backbone.Router.extend({
	routes : {
		'' : 'home',
		':username': 'user'
	},

	home: function() {
		console.log('kajsl;')
		new App.HomeView();
	},

	user: function(username) {
		console.log(username)
		new App.UserView();
	}
});
