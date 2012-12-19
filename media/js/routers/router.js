App.Router = Backbone.Router.extend({
	routes : {
		'' : 'home',
		'login': 'login',
		'unfollow': 'unfollow'
	},

	home: function() {
		
	},

	login: function() {
		new App.LoginView();
	},

	unfollow: function() {
		new App.UnfollowView();
	}
});