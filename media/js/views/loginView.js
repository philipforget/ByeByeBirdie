App.LoginView = Backbone.View.extend({
	el: '#main',
	
	events: {
		'submit #username form': 'submitUsername',
        'submit #password form': 'submitPassword',
		'click .undo': 'returnToUsername'
	},

	initialize: function () {
		this.template = _.template(TPL.get('login'));
        this.router = new App.Router();

		this.render();
	},

	render: function() {
        $(this.el).empty();
		$(this.el).hide().append(this.template()).fadeIn();

		return this;
	},

	submitUsername: function(e) {
		e.preventDefault();

		var user = this.$('#username input[type="text"]').val(),
			userImg = $('<img />').attr('src', 'http://api.twitter.com/1/users/profile_image/' + user);

        this.$('#password figure').prepend(userImg);    
        
        // Super shitty way of checking and proceeding with animation and login
        // Will be replaced with some sort of actual validation
        $('img').load(function(){ 
            $('#username')
                .animate({left: '-=50'}, 90)
                .animate({left: '+=2000'}, 500)
                .hide(function() {
                    $('#password').show().animate({left: '0'}, 90);
                });
        }).error(function(){
            $('#username')
                .animate({left: '-=50'}, 90)
                .animate({left: '+=2000'}, 500)
                .hide(function() {
                    $('#login-error').show().animate({left: '0'}, 90);
                });
            });
    },

    submitPassword: function(e) {
        e.preventDefault();
        var that = this;

        this.router.navigate('unfollow', true);
    },

    returnToUsername: function(e){
    	var clicked = $(e.target);

        // animation if you need to go back to the username field
        clicked.parents('.move-out')
	        .animate({ left: '+=50' }, 90)
            .animate({left: '-=2000'}, 500)
            .hide(function(){
                $('#username').show().animate({left: '0'}, 90, function(){
                    $('#password figure').empty();
                });
        });             
    }
});