TPL = {
 
    templates: {},
    loadTemplates: function(names, callback) {
 
        var that = this,
        targetLength = names.length,
        currCount = 0,
        callback = callback || $.noop;

        var isDone = function() {
            if (currCount === targetLength) {
                callback()
            }
        }
 
        var loadTemplate = function(index) {
            var name = names[index];
            $.get('templates/' + name + '.html', function(data) {
                that.templates[name] = data;
                index++;
                currCount = index;
                isDone();
                if (index < names.length) {
                    loadTemplate(index);
                } 
            });
        }
 
        loadTemplate(0);
    },
 
    // Get template by name from hash of preloaded templates
    get: function(name) {
        return this.templates[name];
    }
 
};