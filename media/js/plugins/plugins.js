// Autocomplete
(function ($) {
    $.fn.jsonSuggest = function (searchData, settings) {
        var defaults = {
            minCharacters: 1,
            maxResults: undefined,
            wildCard: "",
            caseSensitive: false,
            notCharacter: "!",
            maxHeight: 350,
            highlightMatches: true,
            onSelect: undefined,
            ajaxResults: false
        };

        settings = $.extend(defaults, settings);
        return this.each(function () {
            function regexEscape(txt, omit) {
                var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];
                if (omit) {
                    for (var i = 0; i < specials.length; i++) {
                        if (specials[i] === omit) {
                            specials.splice(i, 1);
                        }
                    }
                }
                var escapePatt = new RegExp('(\\' + specials.join('|\\') + ')', 'g');
                return txt.replace(escapePatt, '\\$1');
            }
            var obj = $(this),
                wildCardPatt = new RegExp(regexEscape(settings.wildCard || ''), 'g'),
                results = $('<div />'),
                currentSelection, pageX, pageY;

            function selectResultItem(item) {
                obj.val(item.username);
                $(results).html('').hide();
                if (typeof settings.onSelect === 'function') {
                    settings.onSelect(item);
                }
            }

            function setHoverClass(el) {
                $('div.resultItem', results).removeClass('hover');
                $(el).addClass('hover');
                currentSelection = el;
            }

            ///////
            /////// BUILDING AUTOCOMPLETE RESULTS HERE
            ///////
            function buildResults(resultObjects, sFilterTxt) {
                sFilterTxt = "(" + sFilterTxt + ")";
                var bOddRow = true,
                    i, iFound = 0,
                    filterPatt = settings.caseSensitive ? new RegExp(sFilterTxt, "g") : new RegExp(sFilterTxt, "ig");
                $(results).html('').hide();
                
                for (i = 0; i < resultObjects.length; i += 1) {
                    
                    // set vars for data object and do something with them
                    var item = $('<div />'),
                        id = resultObjects[i].id,
                        username = resultObjects[i].name,
                        twitterHandle = resultObjects[i].username,
                        userImage = resultObjects[i].avatar_url;

                    // make letters enter bold
                    if (settings.highlightMatches === true) {
                        username = username.replace(filterPatt, "<strong>$1</strong>");
                    }
                    $(item).append('<p class="username">' + username + '</p>');
                   
                    // handle twitter handle display
                    if (typeof twitterHandle === 'string') {
                        $(item).append('<p class="twitterHandle">' + twitterHandle + '</p>');
                    }
                    
                    // handle user image display
                    if (typeof userImage === 'string') {
                        $(item).prepend('<img src="' + userImage + '" />');
                    }
                    
                    // used for zebra striping and setting the selected row color
                    $(item).addClass('resultItem').addClass((bOddRow) ? 'odd' : 'even').click(function (n) {
                        return function () {
                            selectResultItem(resultObjects[n]);
                        };
                    }(i)).mouseover(function (el) {
                        return function () {
                            setHoverClass(el);
                        };
                    }(item));
                    $(results).append(item);
                    bOddRow = !bOddRow;
                    iFound += 1;
                    if (typeof settings.maxResults === 'number' && iFound >= settings.maxResults) {
                        break;
                    }
                }
                if ($('div', results).length > 0) {
                    currentSelection = undefined;
                    $(results).show().css('height', 'auto');
                    if ($(results).height() > settings.maxHeight) {
                        $(results).css({
                            'overflow': 'auto',
                            'height': settings.maxHeight + 'px'
                        });
                    }
                }
            }

            function runSuggest(e) {
                if (this.value.length < settings.minCharacters) {
                    $(results).html('').hide();
                    return false;
                }
                var resultObjects = [],
                    sFilterTxt = (!settings.wildCard) ? regexEscape(this.value) : regexEscape(this.value, settings.wildCard).replace(wildCardPatt, '.*'),
                    bMatch = true,
                    filterPatt, i;
                if (settings.notCharacter && sFilterTxt.indexOf(settings.notCharacter) === 0) {
                    sFilterTxt = sFilterTxt.substr(settings.notCharacter.length, sFilterTxt.length);
                    if (sFilterTxt.length > 0) {
                        bMatch = false;
                    }
                }
                sFilterTxt = sFilterTxt || '.*';
                sFilterTxt = settings.wildCard ? '^' + sFilterTxt : sFilterTxt;
                filterPatt = settings.caseSensitive ? new RegExp(sFilterTxt) : new RegExp(sFilterTxt, "i");
                if (settings.ajaxResults === true) {
                    resultObjects = searchData(this.value, settings.wildCard, settings.caseSensitive, settings.notCharacter);
                    if (typeof resultObjects === 'string') {
                        resultObjects = JSON.parse(resultObjects);
                    }
                } else {
                    for (i = 0; i < searchData.length; i += 1) {
                        if (filterPatt.test(searchData[i].username) === bMatch) {
                            resultObjects.push(searchData[i]);
                        }
                    }
                }
                buildResults(resultObjects, sFilterTxt);
            }

            function keyListener(e) {
                switch (e.keyCode) {
                    case 13:
                        $(currentSelection).trigger('click');
                        return false;
                    case 40:
                        if (typeof currentSelection === 'undefined') {
                            currentSelection = $('div.resultItem:first', results).get(0);
                        } else {
                            currentSelection = $(currentSelection).next().get(0);
                        }
                        setHoverClass(currentSelection);
                        if (currentSelection) {
                            $(results).scrollTop(currentSelection.offsetTop);
                        }
                        return false;
                    case 38:
                        if (typeof currentSelection === 'undefined') {
                            currentSelection = $('div.resultItem:last', results).get(0);
                        } else {
                            currentSelection = $(currentSelection).prev().get(0);
                        }
                        setHoverClass(currentSelection);
                        if (currentSelection) {
                            $(results).scrollTop(currentSelection.offsetTop);
                        }
                        return false;
                    default:
                        runSuggest.apply(this, [e]);
                }
            }
            $(results).addClass('jsonSuggestResults').css({
                'top': (obj.position().top + obj.height() + 5) + 'px',
                'left': obj.position().left + 'px',
                'width': obj.width() + 'px'
            }).hide();
            obj.after(results).keyup(keyListener).blur(function (e) {
                var resPos = $(results).offset();
                resPos.bottom = resPos.top + $(results).height();
                resPos.right = resPos.left + $(results).width();
                if (pageY < resPos.top || pageY > resPos.bottom || pageX < resPos.left || pageX > resPos.right) {
                    $(results).hide();
                }
            }).focus(function (e) {
                $(results).css({
                    'top': (obj.position().top + obj.height() + 13) + 'px',
                    'left': obj.position().left + 'px'
                });
                if ($('div', results).length > 0) {
                    $(results).show();
                }
            }).attr('autocomplete', 'off');
            $().mousemove(function (e) {
                pageX = e.pageX;
                pageY = e.pageY;
            });
            if ($.browser.opera) {
                obj.keydown(function (e) {
                    if (e.keyCode === 40) {
                        return keyListener(e);
                    }
                });
            }
            settings.notCharacter = regexEscape(settings.notCharacter || '');
            if (!settings.ajaxResults) {
                if (typeof searchData === 'function') {
                    searchData = searchData();
                }
                if (typeof searchData === 'string') {
                    searchData = JSON.parse(searchData);
                }
            }
        });
    };
})(jQuery);