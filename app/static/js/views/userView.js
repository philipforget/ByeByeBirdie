App.UserView = Backbone.View.extend({
	el: '#main',

	events: {
		'keyup #message': 'onKeyUp',
        'paste #message': 'onKeyUp'
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
        var blurb = this.$('#message').val();

        if (blurb.length >= 500) {
            return true;
        }

        return false;
    },

    updateCharacters : function () {
        var blurb = this.$('#message').val(),
            remaining  = 500 - blurb.length;

        this.$("#text-remain").text(remaining);
    },

    onKeyUp : function (ev) {
        this.updateCharacters();

        if (this.atMaxCharCount()) {
            var blurb = this.$('#message').val(),
                newVal = blurb.substring(0, 500);

            this.$('#message').val(newVal);
        }

        this.updateBlurb();
    },

    updateBlurb : function () {
        var blurb = this.$('#message').val();
    },

    cleanupBlurb : function () {
        var blurb = this.$('#message').val();

        blurb = this._removeExtras(blurb);

        this.$('#message').val(blurb);
    },

    _removeExtras : function (blurb) {
        blurb = blurb.replace(/(\r\n|\n|\r)/gm," ");
        blurb = blurb.replace(/\s+/g," ");

        return blurb;
    }
});

new App.UserView();