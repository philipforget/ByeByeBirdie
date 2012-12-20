App.UserView = Backbone.View.extend({
	el: '#main',

	events: {
		'keyup #message-text': 'onKeyUp',
        'paste #message-text': 'onKeyUp',
        'submit #unfollow-message': 'unfollow'
	},
	
	initialize: function() {
		this.render();
	},

	render: function() {
		this.updateCharacters();
        this.cleanupBlurb();

		return this;
	},

	atMaxCharCount : function () {
        var blurb = this.$('#message-text').val();

        if (blurb.length >= 500) {
            return true;
        }

        return false;
    },

    updateCharacters : function () {
        var blurb = this.$('#message-text').val(),
            remaining  = 500 - blurb.length;

        this.$("#text-remain").text(remaining);
    },

    onKeyUp : function (ev) {
        this.updateCharacters();

        if (this.atMaxCharCount()) {
            var blurb = this.$('#message-text').val(),
                newVal = blurb.substring(0, 500);

            this.$('#message-text').val(newVal);
        }

        this.updateBlurb();
    },

    updateBlurb : function () {
        var blurb = this.$('#message-text').val();
    },

    cleanupBlurb : function () {
        var blurb = this.$('#message-text').val();

        blurb = this._removeExtras(blurb);

        this.$('#message-text').val(blurb);
    },

    _removeExtras : function (blurb) {
        blurb = blurb.replace(/(\r\n|\n|\r)/gm," ");
        blurb = blurb.replace(/\s+/g," ");

        return blurb;
    },

    unfollow: function() {
        var username = $('#user-hidden').val(),
            message = $('#message-text').val();

            console.log(username, message)

        $.post('/api/v1/unfollow', { 
            'username': username,
            'message': message
        });

        return false;
    }
});

new App.UserView();