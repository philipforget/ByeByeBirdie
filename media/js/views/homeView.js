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
	// /api/v1/me/following
	autocomplete: function(e) {
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
	            	var name = ui.item.label.split(':')[1];

   					$('#unfollow-input').val( name );	
                	return false;
            	},
            	select: function( event, ui ) {
	            	var name = ui.item.label.split(':')[1];

   					$('#unfollow-input').val( name );	
                	return false;
            	}
	        });
		});
    }
});
