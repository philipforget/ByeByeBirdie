App.UnfollowView = Backbone.View.extend({
	el: '#main',

	events: {
		"focus #unfollow input": "autocomplete"
	},
	
	initialize: function() {
		this.template = _.template(TPL.get('unfollow'));

		this.render();
	},

	render: function() {
		$(this.el).empty();
		$(this.el).hide().append(this.template()).fadeIn();

		return this;
	},

	autocomplete: function(e) {
		var focusedInput = $(e.target);

		var testData = [
		{
			id: 1,
			username: 'Zeldman Fuckduck',
			twitterHandle: 'zeldman',
			image: 'http://api.twitter.com/1/users/profile_image/zeldman',
		},
		{
			id: 2,
			username: 'Robert Petro',
			twitterHandle: 'robertjpetro',
			image: 'http://api.twitter.com/1/users/profile_image/robertjpetro',
		},
		{
			id: 3,
			username: 'Philip Forget',
			twitterHandle: 'philipforget',
			image: 'http://api.twitter.com/1/users/profile_image/philipforget',
		},
		{
			id: 4,
			username: 'Chris Shoemaker',
			twitterHandle: 'cshoe_',
			image: 'http://api.twitter.com/1/users/profile_image/cshoe_',
		},
		{
			id: 5,
			username: 'Mike Ciarlo',
			twitterHandle: 'mciarlo',
			image: 'http://api.twitter.com/1/users/profile_image/mciarlo',
		}];

		focusedInput.jsonSuggest(testData);
	}
});