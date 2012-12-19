App = {
	start: function() {
		TPL.loadTemplates([
			'home',
			'user'	    
		], function() {
			new App.Router();
			Backbone.history.start();
		});
	}
}

$(function() {
	App.start();
});