App.HomeView = Backbone.View.extend({
	el: '#main',

	events: {
		"focus #unfollow input": "autocomplete",
		"submit #unfollow form": "goToUser"
	},
	
	initialize: function() {
		this.render();
	},

	render: function() {
		this.$el.hide().fadeIn(600);

		if ($('#login').is(':visible')) {
			this.setupHome();
		}

		return this;
	},

	setupHome: function() {
		var arcPeople = [
			'robertjpetro',
			'philipforget',
			'cshoe_',
			'redkeg',
			'mciarlo',
			'd',
			'd_run',
			'alecmunro',
			'jpotisch',
			'gooeyblob',
			'desireedigenio',
			'JustinIso',
			'KareemYoussef',
			'avi4now',
			'xsheenasinghx',
			'timothymeaney',
			'closacco',
			'simadown',
			'bowmanb',
			'thegaw',
			'dadalavida',
			'readability',
			'jimniels',
			'zeeshanlakhani',
			'xxbobbyzxx',
			'billsmartt',
			'robertjpetro',
			'philipforget',
			'cshoe_',
			'redkeg',
			'mciarlo',
			'd',
			'd_run',
			'alecmunro',
			'jpotisch',
			'gooeyblob',
			'desireedigenio',
			'JustinIso',
			'KareemYoussef',
			'avi4now',
			'xsheenasinghx',
			'timothymeaney',
			'closacco',
			'simadown',
			'bowmanb',
			'thegaw',
			'dadalavida',
			'readability',
			'jimniels',
			'zeeshanlakhani',
			'xxbobbyzxx',
			'billsmartt',
			'robertjpetro',
			'philipforget',
			'cshoe_',
			'redkeg',
			'mciarlo',
			'd',
			'd_run',
			'alecmunro',
			'jpotisch',
			'gooeyblob',
			'desireedigenio',
			'JustinIso',
			'KareemYoussef',
			'avi4now',
			'xsheenasinghx',
			'timothymeaney',
			'closacco',
			'simadown',
			'bowmanb',
			'thegaw',
			'dadalavida',
			'readability',
			'jimniels',
			'zeeshanlakhani',
			'xxbobbyzxx',
			'billsmartt',
			'JustinIso',
			'KareemYoussef',
			'avi4now',
			'xsheenasinghx',
			'timothymeaney',
			'closacco',
			'simadown',
			'bowmanb',
			'thegaw',
			'dadalavida',
			'readability',
			'jimniels',
			'zeeshanlakhani',
			'xxbobbyzxx',
			'bowmanb',
			'thegaw',
			'dadalavida',
			'readability',
			'jimniels',
			'zeeshanlakhani',
			'xxbobbyzxx'
		],
		randPeople = arcPeople.sort(function() { return 0.5 - Math.random() }),
		homeTile = $('#home-tile');

		$.each(randPeople, function(i, name) {
			var li = $('<li/>').appendTo(homeTile),
				arcImg = $('<img />')
					.attr('src', 'http://api.twitter.com/1/users/profile_image/' + name)
					.appendTo(li);
		});

		randLi = $('#home-tile li img').sort(function() { return 0.5 - Math.random() });

		$.each(randLi, function(i) {
			$(this).delay(1000*i).fadeOut();
		})
	},

	// /api/v1/me/following
	autocomplete: function(e) {
		$('#unfollow-hidden').val("");

		$.get('/api/v1/me/following', function(data) {
		  	$(e.target).autocomplete({
	            source: _.map(data.following, function(followItem) { 
	            			return followItem.screen_name + ':' + followItem.name
	            		}),
	            open: function(event, item) {
                	$('.ui-menu-item a').each(function(i,item) {
                		var screen_name = $(item).text().split(':')[0],
                			name = $(item).text().split(':')[1],
                			inner_html = "<div class='hold-item'><img src='http://api.twitter.com/1/users/profile_image/" + screen_name + "' /><div class='user-right'><p>" + name + "</p><p>@" + screen_name +"</p></div>"
                			
                		$(this).empty();
                		$(this).append(inner_html);
                	})
	            },
	            focus: function( event, ui ) {
	            	var name = ui.item.label.split(':')[1],
	            		screen_name = ui.item.label.split(':')[0];

   					$('#unfollow-input').val(name);
   					$('#unfollow-hidden').val(screen_name);
                	return false;
            	},
            	select: function( event, ui ) {
	            	var name = ui.item.label.split(':')[1],
	            		screen_name = ui.item.label.split(':')[0];

   					$('#unfollow-input').val(name);	
   					$('#unfollow-hidden').val(screen_name);
                	return false;
            	}
	        });
		});
    },

    goToUser: function() {
    	var userName = $('#unfollow-hidden').val();

    	window.location.href = '/' + userName;
    	return false;
    }
});

new App.HomeView();
