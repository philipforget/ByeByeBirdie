App.UserView = Backbone.View.extend({
	el: '#main',

	events: {
		'keyup #message-text' : 'onKeyUp',
        'paste #message-text' : 'onKeyUp'
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
    }
});