App = {
	start: function() {
		TPL.loadTemplates([
			'login',
			'unfollow'	    
		], function() {
			new App.Router();
			Backbone.history.start();
		});
	}
}

$(function() {
	App.start();
});