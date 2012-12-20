App = {
	start: function() {
        new App.Router();
        Backbone.history.start();
	}
}

$(function() {
	App.start();
});
