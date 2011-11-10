// smartinput //

(function(b){var a={};jQuery.fn.smartinput=function(c){a=jQuery.extend({},b.fn.smartinput.defaults,c);jQuery(this).each(function(){var f=b(this),d=f.val()||a.defaultValue,e=a.blurAction||null,g=a.focusAction||null;f.focus(function(){b(this).addClass(a.focusClass);if(b(this).val()==d){b(this).attr("value","")}if(g!=null){g(b(this))}});f.blur(function(){if(b(this).val()===""){b(this).removeClass(a.focusClass).attr("value",d);if(e!=null){e()}}})});return jQuery};jQuery.fn.smartinput.defaults={defaultValue:"Default Value",focusClass:"active",focusAction:null,blurAction:null}})(jQuery);

// colorbox //

(function(b,ib){var t="none",M="LoadedContent",c=false,v="resize.",o="y",q="auto",e=true,L="nofollow",m="x";function f(a,c){a=a?' id="'+i+a+'"':"";c=c?' style="'+c+'"':"";return b("<div"+a+c+"/>")}function p(a,b){b=b===m?n.width():n.height();return typeof a==="string"?Math.round(/%/.test(a)?b/100*parseInt(a,10):parseInt(a,10)):a}function U(b){return a.photo||/\.(gif|png|jpg|jpeg|bmp)(?:\?([^#]*))?(?:#(\.*))?$/i.test(b)}function cb(a){for(var c in a)if(b.isFunction(a[c])&&c.substring(0,2)!=="on")a[c]=a[c].call(l);a.rel=a.rel||l.rel||L;a.href=a.href||b(l).attr("href");a.title=a.title||l.title;return a}function w(c,a){a&&a.call(l);b.event.trigger(c)}function jb(){var b,e=i+"Slideshow_",c="click."+i,f,k;if(a.slideshow&&h[1]){f=function(){F.text(a.slideshowStop).unbind(c).bind(V,function(){if(g<h.length-1||a.loop)b=setTimeout(d.next,a.slideshowSpeed)}).bind(W,function(){clearTimeout(b)}).one(c+" "+N,k);j.removeClass(e+"off").addClass(e+"on");b=setTimeout(d.next,a.slideshowSpeed)};k=function(){clearTimeout(b);F.text(a.slideshowStart).unbind([V,W,N,c].join(" ")).one(c,f);j.removeClass(e+"on").addClass(e+"off")};a.slideshowAuto?f():k()}}function db(c){if(!O){l=c;a=cb(b.extend({},b.data(l,r)));h=b(l);g=0;if(a.rel!==L){h=b("."+G).filter(function(){return (b.data(this,r).rel||this.rel)===a.rel});g=h.index(l);if(g===-1){h=h.add(l);g=h.length-1}}if(!u){u=D=e;j.show();if(a.returnFocus)try{l.blur();b(l).one(eb,function(){try{this.focus()}catch(a){}})}catch(f){}x.css({opacity:+a.opacity,cursor:a.overlayClose?"pointer":q}).show();a.w=p(a.initialWidth,m);a.h=p(a.initialHeight,o);d.position(0);X&&n.bind(v+P+" scroll."+P,function(){x.css({width:n.width(),height:n.height(),top:n.scrollTop(),left:n.scrollLeft()})}).trigger("scroll."+P);w(fb,a.onOpen);Y.add(H).add(I).add(F).add(Z).hide();ab.html(a.close).show()}d.load(e)}}var gb={transition:"elastic",speed:300,width:c,initialWidth:"600",innerWidth:c,maxWidth:c,height:c,initialHeight:"450",innerHeight:c,maxHeight:c,scalePhotos:e,scrolling:e,inline:c,html:c,iframe:c,photo:c,href:c,title:c,rel:c,opacity:.9,preloading:e,current:"image {current} of {total}",previous:"previous",next:"next",close:"cancel",open:c,returnFocus:e,loop:e,slideshow:c,slideshowAuto:e,slideshowSpeed:2500,slideshowStart:"start slideshow",slideshowStop:"stop slideshow",onOpen:c,onLoad:c,onComplete:c,onCleanup:c,onClosed:c,overlayClose:e,escKey:e,arrowKey:e},r="colorbox",i="cbox",fb=i+"_open",W=i+"_load",V=i+"_complete",N=i+"_cleanup",eb=i+"_closed",Q=i+"_purge",hb=i+"_loaded",E=b.browser.msie&&!b.support.opacity,X=E&&b.browser.version<7,P=i+"_IE6",x,j,A,s,bb,T,R,S,h,n,k,J,K,Z,Y,F,I,H,ab,B,C,y,z,l,g,a,u,D,O=c,d,G=i+"Element";d=b.fn[r]=b[r]=function(c,f){var a=this,d;if(!a[0]&&a.selector)return a;c=c||{};if(f)c.onComplete=f;if(!a[0]||a.selector===undefined){a=b("<a/>");c.open=e}a.each(function(){b.data(this,r,b.extend({},b.data(this,r)||gb,c));b(this).addClass(G)});d=c.open;if(b.isFunction(d))d=d.call(a);d&&db(a[0]);return a};d.init=function(){var l="hover",m="clear:left";n=b(ib);j=f().attr({id:r,"class":E?i+"IE":""});x=f("Overlay",X?"position:absolute":"").hide();A=f("Wrapper");s=f("Content").append(k=f(M,"width:0; height:0; overflow:hidden"),K=f("LoadingOverlay").add(f("LoadingGraphic")),Z=f("Title"),Y=f("Current"),I=f("Next"),H=f("Previous"),F=f("Slideshow").bind(fb,jb),ab=f("Close"));A.append(f().append(f("TopLeft"),bb=f("TopCenter"),f("TopRight")),f(c,m).append(T=f("MiddleLeft"),s,R=f("MiddleRight")),f(c,m).append(f("BottomLeft"),S=f("BottomCenter"),f("BottomRight"))).children().children().css({"float":"left"});J=f(c,"position:absolute; width:9999px; visibility:hidden; display:none");b("body").prepend(x,j.append(A,J));s.children().hover(function(){b(this).addClass(l)},function(){b(this).removeClass(l)}).addClass(l);B=bb.height()+S.height()+s.outerHeight(e)-s.height();C=T.width()+R.width()+s.outerWidth(e)-s.width();y=k.outerHeight(e);z=k.outerWidth(e);j.css({"padding-bottom":B,"padding-right":C}).hide();I.click(d.next);H.click(d.prev);ab.click(d.close);s.children().removeClass(l);b("."+G).live("click",function(a){if(!(a.button!==0&&typeof a.button!=="undefined"||a.ctrlKey||a.shiftKey||a.altKey)){a.preventDefault();db(this)}});x.click(function(){a.overlayClose&&d.close()});b(document).bind("keydown",function(b){if(u&&a.escKey&&b.keyCode===27){b.preventDefault();d.close()}if(u&&a.arrowKey&&!D&&h[1])if(b.keyCode===37&&(g||a.loop)){b.preventDefault();H.click()}else if(b.keyCode===39&&(g<h.length-1||a.loop)){b.preventDefault();I.click()}})};d.remove=function(){j.add(x).remove();b("."+G).die("click").removeData(r).removeClass(G)};d.position=function(f,d){function b(a){bb[0].style.width=S[0].style.width=s[0].style.width=a.style.width;K[0].style.height=K[1].style.height=s[0].style.height=T[0].style.height=R[0].style.height=a.style.height}var e,h=Math.max(document.documentElement.clientHeight-a.h-y-B,0)/2+n.scrollTop(),g=Math.max(n.width()-a.w-z-C,0)/2+n.scrollLeft();e=j.width()===a.w+z&&j.height()===a.h+y?0:f;A[0].style.width=A[0].style.height="9999px";j.dequeue().animate({width:a.w+z,height:a.h+y,top:h,left:g},{duration:e,complete:function(){b(this);D=c;A[0].style.width=a.w+z+C+"px";A[0].style.height=a.h+y+B+"px";d&&d()},step:function(){b(this)}})};d.resize=function(b){if(u){b=b||{};if(b.width)a.w=p(b.width,m)-z-C;if(b.innerWidth)a.w=p(b.innerWidth,m);k.css({width:a.w});if(b.height)a.h=p(b.height,o)-y-B;if(b.innerHeight)a.h=p(b.innerHeight,o);if(!b.innerHeight&&!b.height){b=k.wrapInner("<div style='overflow:auto'></div>").children();a.h=b.height();b.replaceWith(b.children())}k.css({height:a.h});d.position(a.transition===t?0:a.speed)}};d.prep=function(m){var c="hidden";function l(s){var p,f,m,c,l=h.length,q=a.loop;d.position(s,function(){function s(){E&&j[0].style.removeAttribute("filter")}if(u){E&&o&&k.fadeIn(100);k.show();w(hb);Z.show().html(a.title);if(l>1){typeof a.current==="string"&&Y.html(a.current.replace(/\{current\}/,g+1).replace(/\{total\}/,l)).show();I[q||g<l-1?"show":"hide"]().html(a.next);H[q||g?"show":"hide"]().html(a.previous);p=g?h[g-1]:h[l-1];m=g<l-1?h[g+1]:h[0];a.slideshow&&F.show();if(a.preloading){c=b.data(m,r).href||m.href;f=b.data(p,r).href||p.href;c=b.isFunction(c)?c.call(m):c;f=b.isFunction(f)?f.call(p):f;if(U(c))b("<img/>")[0].src=c;if(U(f))b("<img/>")[0].src=f}}K.hide();a.transition==="fade"?j.fadeTo(e,1,function(){s()}):s();n.bind(v+i,function(){d.position(0)});w(V,a.onComplete)}})}if(u){var o,e=a.transition===t?0:a.speed;n.unbind(v+i);k.remove();k=f(M).html(m);k.hide().appendTo(J.show()).css({width:function(){a.w=a.w||k.width();a.w=a.mw&&a.mw<a.w?a.mw:a.w;return a.w}(),overflow:a.scrolling?q:c}).css({height:function(){a.h=a.h||k.height();a.h=a.mh&&a.mh<a.h?a.mh:a.h;return a.h}()}).prependTo(s);J.hide();b("#"+i+"Photo").css({cssFloat:t,marginLeft:q,marginRight:q});X&&b("select").not(j.find("select")).filter(function(){return this.style.visibility!==c}).css({visibility:c}).one(N,function(){this.style.visibility="inherit"});a.transition==="fade"?j.fadeTo(e,0,function(){l(0)}):l(e)}};d.load=function(u){var n,c,s,q=d.prep;D=e;l=h[g];u||(a=cb(b.extend({},b.data(l,r))));w(Q);w(W,a.onLoad);a.h=a.height?p(a.height,o)-y-B:a.innerHeight&&p(a.innerHeight,o);a.w=a.width?p(a.width,m)-z-C:a.innerWidth&&p(a.innerWidth,m);a.mw=a.w;a.mh=a.h;if(a.maxWidth){a.mw=p(a.maxWidth,m)-z-C;a.mw=a.w&&a.w<a.mw?a.w:a.mw}if(a.maxHeight){a.mh=p(a.maxHeight,o)-y-B;a.mh=a.h&&a.h<a.mh?a.h:a.mh}n=a.href;K.show();if(a.inline){f().hide().insertBefore(b(n)[0]).one(Q,function(){b(this).replaceWith(k.children())});q(b(n))}else if(a.iframe){j.one(hb,function(){var c=b("<iframe frameborder='0' style='width:100%; height:100%; border:0; display:block'/>")[0];c.name=i+ +new Date;c.src=a.href;if(!a.scrolling)c.scrolling="no";if(E)c.allowtransparency="true";b(c).appendTo(k).one(Q,function(){c.src="//about:blank"})});q(" ")}else if(a.html)q(a.html);else if(U(n)){c=new Image;c.onload=function(){var e;c.onload=null;c.id=i+"Photo";b(c).css({border:t,display:"block",cssFloat:"left"});if(a.scalePhotos){s=function(){c.height-=c.height*e;c.width-=c.width*e};if(a.mw&&c.width>a.mw){e=(c.width-a.mw)/c.width;s()}if(a.mh&&c.height>a.mh){e=(c.height-a.mh)/c.height;s()}}if(a.h)c.style.marginTop=Math.max(a.h-c.height,0)/2+"px";h[1]&&(g<h.length-1||a.loop)&&b(c).css({cursor:"pointer"}).click(d.next);if(E)c.style.msInterpolationMode="bicubic";setTimeout(function(){q(c)},1)};setTimeout(function(){c.src=n},1)}else n&&J.load(n,function(d,c,a){q(c==="error"?"Request unsuccessful: "+a.statusText:b(this).children())})};d.next=function(){if(!D){g=g<h.length-1?g+1:0;d.load()}};d.prev=function(){if(!D){g=g?g-1:h.length-1;d.load()}};d.close=function(){if(u&&!O){O=e;u=c;w(N,a.onCleanup);n.unbind("."+i+" ."+P);x.fadeTo("fast",0);j.stop().fadeTo("fast",0,function(){w(Q);k.remove();j.add(x).css({opacity:1,cursor:q}).hide();setTimeout(function(){O=c;w(eb,a.onClosed)},1)})}};d.element=function(){return b(l)};d.settings=gb;b(d.init)})(jQuery,this);

// audio //

// A cross-browser javascript shim for html5 audio
(function(audiojs,audiojsInstance,container){var path=(function(){var re=new RegExp('audio(\.min)?\.js.*'),scripts=document.getElementsByTagName('script');for(var i=0,ii=scripts.length;i<ii;i++){var path=scripts[i].getAttribute('src');if(re.test(path))return path.replace(re,'');}})();container[audiojs]={instanceCount:0,instances:{},flashSource:'\
      <object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" id="$1" width="1" height="1" name="$1" style="position: absolute; left: -1px;"> \
        <param name="movie" value="$2?playerInstance='+audiojs+'.instances[\'$1\']&datetime=$3"> \
        <param name="allowscriptaccess" value="always"> \
        <embed name="$1" src="$2?playerInstance='+audiojs+'.instances[\'$1\']&datetime=$3" width="1" height="1" allowscriptaccess="always"> \
      </object>',settings:{autoplay:false,loop:false,preload:true,imageLocation:'/media/images/player-graphics.gif',swfLocation:'/media/flash/audiojs.swf',useFlash:(function(){var a=document.createElement('audio');return!(a.canPlayType&&a.canPlayType('audio/mpeg;').replace(/no/,''));})(),hasFlash:(function(){if(navigator.plugins&&navigator.plugins.length&&navigator.plugins['Shockwave Flash']){return true;}else if(navigator.mimeTypes&&navigator.mimeTypes.length){var mimeType=navigator.mimeTypes['application/x-shockwave-flash'];return mimeType&&mimeType.enabledPlugin;}else{try{var ax=new ActiveXObject('ShockwaveFlash.ShockwaveFlash');return true;}catch(e){}}
return false;})(),createPlayer:{markup:'\
          <div class="play-pause"> \
            <p class="play"></p> \
            <p class="pause"></p> \
            <p class="loading"></p> \
            <p class="error"></p> \
          </div> \
          <div class="scrubber"> \
            <div class="progress"></div> \
            <div class="loaded"></div> \
          </div> \
          <div class="time"> \
            <em class="played">00:00</em>/<strong class="duration">00:00</strong> \
          </div> \
          <div class="error-message"></div>',playPauseClass:'play-pause',scrubberClass:'scrubber',progressClass:'progress',loaderClass:'loaded',timeClass:'time',durationClass:'duration',playedClass:'played',errorMessageClass:'error-message',playingClass:'playing',loadingClass:'loading',errorClass:'error'},trackEnded:function(e){},flashError:function(){var player=this.settings.createPlayer,errorMessage=getByClass(player.errorMessageClass,this.wrapper),html='Missing <a href="http://get.adobe.com/flashplayer/">flash player</a> plugin.';if(this.mp3)html+=' <a href="'+this.mp3+'">Download audio file</a>.';container[audiojs].helpers.removeClass(this.wrapper,player.loadingClass);container[audiojs].helpers.addClass(this.wrapper,player.errorClass);errorMessage.innerHTML=html;},loadError:function(e){var player=this.settings.createPlayer,errorMessage=getByClass(player.errorMessageClass,this.wrapper);container[audiojs].helpers.removeClass(this.wrapper,player.loadingClass);container[audiojs].helpers.addClass(this.wrapper,player.errorClass);errorMessage.innerHTML='Error loading: "'+this.mp3+'"';},init:function(){var player=this.settings.createPlayer;container[audiojs].helpers.addClass(this.wrapper,player.loadingClass);},loadStarted:function(){var player=this.settings.createPlayer,duration=getByClass(player.durationClass,this.wrapper),m=Math.floor(this.duration/60),s=Math.floor(this.duration%60);container[audiojs].helpers.removeClass(this.wrapper,player.loadingClass);duration.innerHTML=((m<10?'0':'')+m+':'+(s<10?'0':'')+s);},loadProgress:function(percent){var player=this.settings.createPlayer,scrubber=getByClass(player.scrubberClass,this.wrapper),loaded=getByClass(player.loaderClass,this.wrapper);loaded.style.width=(scrubber.offsetWidth*percent)+'px';},playPause:function(){if(this.playing)this.settings.play();else this.settings.pause();},play:function(){var player=this.settings.createPlayer;container[audiojs].helpers.addClass(this.wrapper,player.playingClass);},pause:function(){var player=this.settings.createPlayer;container[audiojs].helpers.removeClass(this.wrapper,player.playingClass);},updatePlayhead:function(percent){var player=this.settings.createPlayer,scrubber=getByClass(player.scrubberClass,this.wrapper),progress=getByClass(player.progressClass,this.wrapper);progress.style.width=(scrubber.offsetWidth*percent)+'px';var played=getByClass(player.playedClass,this.wrapper),p=this.duration*percent,m=Math.floor(p/60),s=Math.floor(p%60);played.innerHTML=((m<10?'0':'')+m+':'+(s<10?'0':'')+s);}},create:function(element,options){var options=options||{}
if(element.length){return this.createAll(options,element);}else{return this.newInstance(element,options);}},createAll:function(options,elements){var audioElements=elements||document.getElementsByTagName('audio'),instances=[]
options=options||{};for(var i=0,ii=audioElements.length;i<ii;i++){instances.push(this.newInstance(audioElements[i],options));}
return instances;},newInstance:function(element,options){var element=element,s=this.helpers.clone(this.settings),id='audiojs'+this.instanceCount,wrapperId='audiojs_wrapper'+this.instanceCount,instanceCount=this.instanceCount++;if(element.getAttribute('autoplay')!=null)s.autoplay=true;if(element.getAttribute('loop')!=null)s.loop=true;if(element.getAttribute('preload')=='none')s.preload=false;if(options)this.helpers.merge(s,options);if(s.createPlayer.markup)element=this.createPlayer(element,s.createPlayer,wrapperId);else element.parentNode.setAttribute('id',wrapperId);var audio=new container[audiojsInstance](element,s);if(s.css)this.helpers.injectCss(audio,s.css);if(s.useFlash&&s.hasFlash){this.injectFlash(audio,id);this.attachFlashEvents(audio.wrapper,audio);}else if(s.useFlash&&!s.hasFlash){this.settings.flashError.apply(audio);}
if(!s.useFlash||(s.useFlash&&s.hasFlash))this.attachEvents(audio.wrapper,audio);this.instances[id]=audio;return audio;},createPlayer:function(element,player,id){var wrapper=document.createElement('div'),newElement=element.cloneNode(true);wrapper.setAttribute('class','audiojs');wrapper.setAttribute('className','audiojs');wrapper.setAttribute('id',id);if(newElement.outerHTML&&~newElement.outerHTML.indexOf('<:audio')){newElement=this.helpers.cloneHtml5Node(element);wrapper.innerHTML=player.markup;wrapper.appendChild(newElement);element.outerHTML=wrapper.outerHTML;wrapper=document.getElementById(id);}else{wrapper.appendChild(newElement);wrapper.innerHTML=wrapper.innerHTML+player.markup;element.parentNode.replaceChild(wrapper,element);}
return wrapper.getElementsByTagName('audio')[0];},attachEvents:function(wrapper,audio){var player=audio.settings.createPlayer,playPause=getByClass(player.playPauseClass,wrapper),scrubber=getByClass(player.scrubberClass,wrapper),leftPos=function(elem){var curleft=0;if(elem.offsetParent){do{curleft+=elem.offsetLeft;}while(elem=elem.offsetParent);}
return curleft;};container[audiojs].events.addListener(playPause,'click',function(e){audio.playPause.apply(audio);});container[audiojs].events.addListener(scrubber,'click',function(e){var relativeLeft=e.clientX-leftPos(this);audio.skipTo(relativeLeft/scrubber.offsetWidth);});if(audio.settings.useFlash)return;container[audiojs].events.trackLoadProgress(audio);container[audiojs].events.addListener(audio.element,'timeupdate',function(e){audio.updatePlayhead.apply(audio);});container[audiojs].events.addListener(audio.element,'ended',function(e){audio.trackEnded.apply(audio);});container[audiojs].events.addListener(audio.source,'error',function(e){clearInterval(audio.readyTimer);clearInterval(audio.loadTimer);audio.settings.loadError.apply(audio);});},attachFlashEvents:function(element,audio){audio['swfReady']=false;audio['load']=function(mp3){audio.mp3=mp3;if(audio.swfReady)audio.element.load(mp3);}
audio['loadProgress']=function(percent,duration){audio.loadedPercent=percent;audio.duration=duration;audio.settings.loadStarted.apply(audio);audio.settings.loadProgress.apply(audio,[percent]);}
audio['skipTo']=function(percent){if(percent>audio.loadedPercent)return;audio.updatePlayhead.call(audio,[percent])
audio.element.skipTo(percent);}
audio['updatePlayhead']=function(percent){audio.settings.updatePlayhead.apply(audio,[percent]);}
audio['play']=function(){if(!audio.settings.preload){audio.settings.preload=true;audio.element.init(audio.mp3);}
audio.playing=true;audio.element.pplay();audio.settings.play.apply(audio);}
audio['pause']=function(){audio.playing=false;audio.element.ppause();audio.settings.pause.apply(audio);}
audio['loadStarted']=function(){audio.swfReady=true;if(audio.settings.preload)audio.element.init(audio.mp3);if(audio.settings.autoplay)audio.play.apply(audio);}},injectFlash:function(audio,id){var flashSource=this.flashSource.replace(/\$1/g,id);flashSource=flashSource.replace(/\$2/g,audio.settings.swfLocation);flashSource=flashSource.replace(/\$3/g,(+new Date+Math.random()));var html=audio.wrapper.innerHTML,div=document.createElement('div');div.innerHTML=flashSource+html;audio.wrapper.innerHTML=div.innerHTML;audio.element=this.helpers.getSwf(id);},helpers:{merge:function(obj1,obj2){for(attr in obj2){if(obj1.hasOwnProperty(attr)||obj2.hasOwnProperty(attr)){obj1[attr]=obj2[attr];}}},clone:function(obj){if(obj==null||typeof(obj)!=='object')return obj;var temp=new obj.constructor();for(var key in obj)temp[key]=arguments.callee(obj[key]);return temp;},addClass:function(element,className){var re=new RegExp('(\\s|^)'+className+'(\\s|$)');if(re.test(element.className))return;element.className+=' '+className;},removeClass:function(element,className){var re=new RegExp('(\\s|^)'+className+'(\\s|$)');element.className=element.className.replace(re,' ');},injectCss:function(audio,string){var head=document.getElementsByTagName('head')[0],firstchild=head.firstChild,style=document.createElement('style'),css=string.replace(/\$1/g,audio.settings.imageLocation);if(!head)return;var prepend='',styles=document.getElementsByTagName('style');for(var i=0,ii=styles.length;i<ii;i++){var title=styles[i].getAttribute('title');if(title&&~title.indexOf('audiojs')){style=styles[i];prepend=style.innerHTML;break;}};style.setAttribute('type','text/css');style.setAttribute('title','audiojs');if(style.styleSheet)style.styleSheet.cssText=prepend+css;else style.appendChild(document.createTextNode(prepend+css));if(firstchild)head.insertBefore(style,firstchild);else head.appendChild(styleElement);},cloneHtml5Node:function(audioTag){var fragment=document.createDocumentFragment();fragment.createElement('audio');var div=fragment.createElement('div');fragment.appendChild(div);div.innerHTML=audioTag.outerHTML;return div.firstChild;},getSwf:function(name){var swf=document[name]||window[name];return swf.length>1?swf[swf.length-1]:swf;}},events:{memoryLeaking:false,listeners:[],addListener:function(element,eventName,func){if(element.addEventListener){element.addEventListener(eventName,func,false);}else if(element.attachEvent){this.listeners.push(element);if(!this.memoryLeaking){window.attachEvent('onunload',function(){for(var i=0,ii=this.listeners.length;i<ii;i++){container[audiojs].events.purge(this.listeners[i]);}});this.memoryLeaking=true;}
element.attachEvent('on'+eventName,function(){func.call(element,window.event);});}},trackLoadProgress:function(audio){if(!audio.settings.preload)return;var readyTimer,loadTimer,audio=audio,ios=(/(ipod|iphone|ipad)/i).test(navigator.userAgent);readyTimer=setInterval(function(){if(audio.element.readyState>-1){if(!ios)audio.init.apply(audio);}
if(audio.element.readyState>1){if(audio.settings.autoplay)audio.play.apply(audio);clearInterval(readyTimer);loadTimer=setInterval(function(){audio.loadProgress.apply(audio);if(audio.loadedPercent>=1)clearInterval(loadTimer);});}},10);audio.readyTimer=readyTimer;audio.loadTimer=loadTimer;},purge:function(d){var a=d.attributes,i;if(a){for(i=0;i<a.length;i+=1){if(typeof d[a[i].name]==='function')d[a[i].name]=null;}}
a=d.childNodes;if(a){for(i=0;i<a.length;i+=1)purge(d.childNodes[i]);}},ready:(function(ie){var d=document;return ie?function(c){var n=d.firstChild,f=function(){try{c(n.doScroll('left'))}
catch(e){setTimeout(f,10)}};f()}:/webkit|safari|khtml/i.test(navigator.userAgent)?function(c){var f=function(){/loaded|complete/.test(d.readyState)?c():setTimeout(f,10)};f();}:function(c){d.addEventListener('DOMContentLoaded',c,false);}})()}}
container[audiojsInstance]=function(element,settings){this.element=element;this.wrapper=element.parentNode;this.source=element.getElementsByTagName('source')[0]||element;this.mp3=(function(element){var source=element.getElementsByTagName('source')[0];return element.getAttribute('src')||(source?source.getAttribute('src'):null);})(element);this.settings=settings;this.loadStartedCalled=false;this.loadedPercent=0;this.duration=1;this.playing=false;}
container[audiojsInstance].prototype={updatePlayhead:function(){var percent=this.element.currentTime/this.duration;this.settings.updatePlayhead.apply(this,[percent]);},skipTo:function(percent){if(percent>this.loadedPercent)return;this.element.currentTime=this.duration*percent;this.updatePlayhead();},load:function(mp3){this.loadStartedCalled=false;this.source.setAttribute('src',mp3);this.element.load();this.mp3=mp3;container[audiojs].events.trackLoadProgress(this);},loadError:function(){this.settings.loadError.apply(this);},init:function(){this.settings.init.apply(this);},loadStarted:function(){if(!this.element.duration)return false;this.duration=this.element.duration;this.updatePlayhead();this.settings.loadStarted.apply(this);},loadProgress:function(){if(this.element.buffered!=null&&this.element.buffered.length){if(!this.loadStartedCalled){this.loadStartedCalled=this.loadStarted();}
var durationLoaded=this.element.buffered.end(this.element.buffered.length-1);this.loadedPercent=durationLoaded/this.duration;this.settings.loadProgress.apply(this,[this.loadedPercent]);}},playPause:function(){if(this.playing)this.pause();else this.play();},play:function(){var ios=(/(ipod|iphone|ipad)/i).test(navigator.userAgent);if(ios&&this.element.readyState==0)this.init.apply(this);if(!this.settings.preload){this.settings.preload=true;this.element.setAttribute('preload','auto');container[audiojs].events.trackLoadProgress(this);}
this.playing=true;this.element.play();this.settings.play.apply(this);},pause:function(){this.playing=false;this.element.pause();this.settings.pause.apply(this);},trackEnded:function(e){this.skipTo.apply(this,[0]);if(!this.settings.loop)this.pause.apply(this);this.settings.trackEnded.apply(this);}}
var getByClass=function(searchClass,node,tag){var matches=[];if(document.getElementsByClassName){matches=node.getElementsByClassName(searchClass);}else{var node=node||document,tag=tag||'*',els=node.getElementsByTagName(tag),pattern=new RegExp("(^|\\s)"+searchClass+"(\\s|$)");for(i=0,j=0,l=els.length;i<l;i++){if(pattern.test(els[i].className)){matches[j]=els[i];j++;}}}
return matches.length>1?matches:matches[0];}})('audiojs','audiojsInstance',this);
