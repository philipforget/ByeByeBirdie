App.HomeView = Backbone.View.extend({
	el: '#main',

	events: {
		"focus #unfollow input": "autocomplete"
	},
	
	initialize: function() {
        //this.template = _.template(TPL.get('home'));
		this.render();
	},

	render: function() {

		return this;
	},

	autocomplete: function(e) {
		var focusedInput = $(e.target);

		var testData = [
		{
			id: 1,
			name: 'Zeldman Fuckduck',
			username: 'zeldman',
			avatar_url: 'http://api.twitter.com/1/users/profile_image/zeldman',
		},
		{
			id: 2,
			name: 'Robert Petro',
			username: 'robertjpetro',
			avatar_url: 'http://api.twitter.com/1/users/profile_image/robertjpetro',
		},
		{
			id: 3,
			name: 'Philip Forget',
			username: 'philipforget',
			avatar_url: 'http://api.twitter.com/1/users/profile_image/philipforget',
		},
		{
			id: 4,
			name: 'Chris Shoemaker',
			username: 'cshoe_',
			avatar_url: 'http://api.twitter.com/1/users/profile_image/cshoe_',
		},
		{
			id: 5,
			name: 'Mike Ciarlo',
			username: 'mciarlo',
			avatar_url: 'http://api.twitter.com/1/users/profile_image/mciarlo',
		}];

		focusedInput.jsonSuggest(testData);
	}
});
