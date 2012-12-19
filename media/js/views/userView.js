App.UserView = Backbone.View.extend({
	el: '#main',

	events: {
		
	},
	
	initialize: function() {
		this.template = _.template(TPL.get('user'));

		// grab username from url
		this.username = this.options.username;

		this.render();
	},

	render: function() {
		$(this.el).empty();
		$(this.el).hide().append(this.template()).fadeIn();

		return this;
	}
});