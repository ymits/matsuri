riot.tag("pager",'<nav><ul class="pager"><li class="{previous: true, disabled: isDisablePreviousBtn}" ><a href="javascript:void(0);" onclick="{onClickBeforePage}" ><span aria-hidden="true">&larr;</span> 前へ</a></li><li class="{next:true, disabled: isDisableNextBtn}"><a href="javascript:void(0);" onclick="{onClickNextPage}">次へ <span aria-hidden="true">&rarr;</span></a></li></ul></nav>',function(a){var b=this;this.isDisablePreviousBtn=!1,this.isDisableNextBtn=!1,this.onClickBeforePage=function(){b.isDisablePreviousBtn||a.listener.onPageChange(a.result.pageNo-1)}.bind(this),this.onClickNextPage=function(){b.isDisableNextBtn||a.listener.onPageChange(a.result.pageNo+1)}.bind(this),this.on("update",function(){b.isDisablePreviousBtn=0===a.result.pageNo,b.isDisableNextBtn=a.result.total<=a.result.limit*(a.result.pageNo+1)})}),riot.tag("app",'<app-header></app-header><div class="content"><home if="{path === \'home\'}" listener="{listener}"></home><search if="{path === \'search\'}" listener="{listener}"></search><fes-detail-modal fes="{fes}"></fes-detail-modal></div><app-footer></app-footer>',"app .content { padding: 15px; }",function(a){var b=this;this.path=null,this.fes=null,this.listener={onSelectFes:function(a){b.fes=a,b.update(),$("fes-detail-modal > div").modal("show")}},riot.route.on("routeChange",function(a){console.log("routeChange path="+a),b.path=a,b.update()})}),riot.tag("app-header",'<div class="navbar navbar-inverse navbar-fixed-top" role="navigation"><div class="container-fluid"><div class="navbar-header"><a class="navbar-brand" href="#">Feschibal</a></div></div></div>',function(a){}),riot.tag("app-footer",'<footer class="well well-sm"><small>footer of Feschibal</small></footer>',function(a){}),riot.tag("home",'<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">直近に開催される祭り</h3></div><div class="panel-body"> 工事中 </div></div><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">祭りを検索する</h3></div><div class="panel-body row"><div class="col-lg-6"><h4>地域から探す</h4></div><div class="col-lg-6"><h4>日付から探す</h4><table class="table"><tbody><tr><td><a href="javascript:void(0)" onclick="{doSearchToday}">本日開催の祭り</a></td></tr><tr><td><a href="javascript:void(0)" onclick="{doSearchThisWeek}">今週開催の祭り</a></td></tr><tr><td><a href="javascript:void(0)" onclick="{doSearchThisWeekEnd}">今度の土日開催の祭り</a></td></tr></tbody></table></div></div></div>',function(a){this.doSearchToday=function(){var a=moment().format("YYYY-MM-DD"),b={fromDate:a,toDate:a};riot.route("search/list?"+$.param(b))}.bind(this),this.doSearchThisWeek=function(){var a={fromDate:moment().format("YYYY-MM-DD"),toDate:moment().weekday(7).format("YYYY-MM-DD")};riot.route("search/list?"+$.param(a))}.bind(this),this.doSearchThisWeekEnd=function(){var a={fromDate:moment().weekday(6).format("YYYY-MM-DD"),toDate:moment().weekday(7).format("YYYY-MM-DD")};riot.route("search/list?"+$.param(a))}.bind(this)}),riot.tag("search",'<div class="row"><div class="col-lg-3"><div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">祭りを検索する</h3></div><div class="panel-body"><form class="form-horizontal" onsubmit="{onSubmitSearch}"><h4>期間を指定する</h4><div class="form-group"><label for="fromDate" class="col-sm-2 control-label">From:</label><div class="col-sm-10"><input type="text" class="form-control" id="fromDate" ></div></div><div class="form-group"><label for="toDate" class="col-sm-2 control-label">To:</label><div class="col-sm-10"><input type="text" class="form-control" id="toDate" ></div></div><h4>地域を指定する</h4><div class="form-group"><div class="col-sm-offset-2 col-sm-10"><button type="submit" class="btn btn-default">検索する</button></div></div></form></div></div></div><div class="col-lg-9"><ul class="nav nav-tabs"><li role="presentation" class="{active: path===\'list\'}"><a href="#search/list?{queryString}">一覧表示</a></li><li role="presentation" class="{active: path===\'cal\'}"><a href="#search/cal?{queryString}">カレンダー表示</a></li></ul><div><fes-list if="{path === \'list\'}" request="{request}" listener="{opts.listener}"></fes-list><fes-calendar if="{path === \'cal\'}" request="{request}" listener="{opts.listener}"></fes-calendar></div></div></div>',function(a){var b=this,c={format:"yyyy/mm/dd",language:"ja",orientation:"top",todayHighlight:!0,autoclose:!0,clearBtn:!0};$(this.fromDate).datepicker(c),$(this.toDate).datepicker(c),this.request=riot.observable(),this.path=null,this.queryString=null,this.onSubmitSearch=function(a){var b=riot.route.currentPath(),c={fromDate:$(this.fromDate).val().replace(/\//g,"-"),toDate:$(this.toDate).val().replace(/\//g,"-")};b+="?"+$.param(c),riot.route(b)}.bind(this),riot.route.on("routeChange:search",function(a){b.path=a,b.update()}),riot.route.on("search",function(a){b.queryString=$.param(a),a.fromDate&&$(b.fromDate).datepicker("update",new Date(a.fromDate)),a.toDate&&$(b.toDate).datepicker("update",new Date(a.toDate)),b.update()})}),riot.tag("fes-list",'<div class="row"><div class="col-lg-3"><table class="table table-hover"><thead><tr><th>検索結果：{result.total} 件中 {result.limit * result.pageNo + 1} - {result.limit * result.pageNo + result.list.length} 件</th></tr></thead><tbody><tr each="{fes, i in result.list}" onclick="{parent.onSelectFes}"><td><div><span each="{date, j in fes.date}"><span if="{j > 0}">, </span> {moment(date.start).format(\'YYYY/MM/DD\')} </span></div><div>{fes.name}</div></td></tr></tbody></table><pager result="{result}" listener="{listener}"></pager></div><div class="col-lg-9" id="map"></div></div>',"#map { height: 500px; }",function(a){function b(a,b){d=L.map(g[0]).setView([a,b],12),e.addTo(d),d.addLayer(f);var c=L.icon({iconUrl:"images/5005034b.icon_pointer.png",iconRetinaUrl:"images/5005034b.icon_pointer.png",iconSize:[35,35],iconAnchor:[17,17],popupAnchor:[0,0]}),h={icon:c,clickable:!1,draggable:!1,opacity:.9};L.marker([a,b],h).addTo(d)}var c=this;this.result={},this.searchParam={};var d,e=L.tileLayer("http://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png",{maxZoom:18,attribution:"<a href='http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html' target='_blank'>国土地理院</a>",opacity:.8}),f=L.markerClusterGroup(),g=$(this.map),h=setInterval(function(){g.length&&g.is(":visible")&&(clearInterval(h),navigator.geolocation?navigator.geolocation.getCurrentPosition(function(a){b(a.coords.latitude,a.coords.longitude)},function(a){b(35.6098733,140.1138984)},{enableHighAccuracy:!0,timeout:8e3,maximumAge:0}):b(35.6098733,140.1138984))},50);this.onSelectFes=function(b){a.listener.onSelectFes(b.item.fes)}.bind(this),riot.route.on("search/list",function(a){c.searchParam={limit:10,pageNo:0,fromDate:a.fromDate?new Date(a.fromDate):null,toDate:a.toDate?new Date(a.toDate):null},cfc.Event.find(c.searchParam).done(i)}),this.listener={onPageChange:function(a){c.searchParam.pageNo=a,cfc.Event.find(c.searchParam).done(i)}};var i=function(b){c.result=b,c.update(),f.clearLayers(),_.each(b.list,function(b){var c=L.marker(new L.LatLng(b.location.lat,b.location["long"])).bindLabel(b.name,{noHide:!0,clickable:!0});c.on("click",function(c){a.listener.onSelectFes(b)}),c.label.on("click",function(c){a.listener.onSelectFes(b)}),f.addLayer(c)})}}),riot.tag("fes-calendar",'<div id="calendar"></div>',"fes-calendar .fc-event { margin-bottom: 5px; padding: 5px; cursor: pointer; } fes-calendar .fc-event:hover { opacity: 0.8; } fes-calendar .fc-event .fc-content { white-space: normal; } fes-calendar .fc-event .fc-content .fc-time { display: block; }",function(a){var b=$(this.calendar);riot.route.onAttached("search/cal",b,function(d){b.fullCalendar({lang:"ja",eventClick:function(b,c,d){return a.listener.onSelectFes(b.fes),!1}});var e={fromDate:d.fromDate?new Date(d.fromDate):null,toDate:d.toDate?new Date(d.toDate):null};cfc.Event.find(e).done(c)});var c=function(a){var c=_.map(a.list,function(a){return{title:a.name,start:a.getStartDate().getTime(),end:a.getEndDate().getTime(),fes:a}});b.fullCalendar("removeEvents"),b.fullCalendar("addEventSource",c)}}),riot.tag("fes-detail-modal",'<div class="modal fade" tabindex="-1" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button class="close" type="button" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title text-primary">{opts.fes.name}</h4></div><div class="modal-body"><div class="panel panel-section"><div class="panel-heading"><h3 class="panel-title">期間</h3></div><div class="panel-body"><div each="{date, i in opts.fes.date}"> {moment(date.start).format(\'YYYY年M月D日（dddd）H時m分\')} から {moment(date.end).format(\'YYYY年M月D日（dddd）H時m分\')} </div></div></div><div class="panel panel-section"><div class="panel-heading"><h3 class="panel-title">祭り内容</h3></div><div class="panel-body"><dl class="dl-horizontal"><dt>目玉</dt><dd><span each="{program, i in opts.fes.features.specialProgram}"><span if="{i > 0}">、 </span>{program} </span></dd></dl><img src="images/a78a6b2f.chiba-odori.jpg" alt=""></div><table class="table table-bordered"><thred><tr><th>踊り</th><th>歌唱</th><th>太鼓</th><th>演奏</th><th>出店・屋台</th><th>花火</th><th>その他</th></tr></thred><tbody><tr><td><i class="fa fa-check" if="{opts.fes.features.dancing}"></i></td><td><i class="fa fa-check" if="{opts.fes.features.singing}"></i></td><td><i class="fa fa-check" if="{opts.fes.features.drum}"></i></td><td><i class="fa fa-check" if="{opts.fes.features.musicalPerformance}"></i></td><td><i class="fa fa-check" if="{opts.fes.features.foodTruck}"></i></td><td><i class="fa fa-check" if="{opts.fes.features.fireworks}"></i></td><td class="other"><span each="{program, i in opts.fes.features.others}"><span if="{i > 0}">、 </span>{program} </span></td></tr></tbody></table><dl class="dl-horizontal" if="{opts.fes.url}"><dt>祭り公式サイト</dt><dd><a href="{opts.fes.url}">{opts.fes.url}</a></dd></dl></div><div class="panel panel-section"><div class="panel-heading"><h3 class="panel-title">場所</h3></div><div class="panel-body"><dl class="dl-horizontal"><dt>会場</dt><dd>{opts.fes.location.name}</dd><dt>住所</dt><dd>{opts.fes.location.address}</dd></dl><div id="detail-map"></div></div></div><div class="panel panel-section"><div class="panel-heading"><h3 class="panel-title">主催、共催、後援</h3></div><div class="panel-body"><dl class="dl-horizontal"><dt>主催</dt><dd><span each="{organizer, i in opts.fes.organizer}"><span if="{i > 0}">、 </span>{organizer} </span></dd></dl></div></div></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div>',"fes-detail-modal .panel.panel-section { -webkit-box-shadow: none; box-shadow: none; } fes-detail-modal .panel.panel-section .panel-heading { border-bottom: 3px solid #e5e5e5; } fes-detail-modal .dl-horizontal dt { width: 60px; } fes-detail-modal .dl-horizontal dd { margin-left: 80px; } fes-detail-modal .table.table-bordered th,fes-detail-modal .table.table-bordered td { text-align: center; } fes-detail-modal .table.table-bordered td.other { text-align: left; } fes-detail-modal #detail-map { height: 300px; }",function(a){var b=$(this["detail-map"]),c=setInterval(function(){if(b.length&&b.is(":visible")){clearInterval(c);var d=L.map(b[0]).setView([a.fes.location.lat,a.fes.location["long"]],14);L.marker([a.fes.location.lat,a.fes.location["long"]]).addTo(d),L.tileLayer("http://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png",{maxZoom:18,attribution:"<a href='http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html' target='_blank'>国土地理院</a>",opacity:.8}).addTo(d)}},50)}),function(){riot.route.parser(function(a){var b=a.split("?"),c=[b[0]],d=b[1],e={};return d&&d.split("&").forEach(function(a){var b=a.split("=");e[b[0]]=b[1]}),c.push(e),c}),riot.route.currentPath=function(){var a=location.href.match(/#([^\?]*)/);return a.length>1?a[1]:""},riot.observable(riot.route);var a="",b=null,c=function(c,d){c=c||"home";for(var e=c.split("/"),f=a.split("/"),g="",h=0;h<e.length;h++){var i=e[h],j=f[h];i!==j?(n(g,i,d),g+=(""===g?"":"/")+i):_.isEqual(d,b)?g+=(""===g?"":"/")+i:(g+=(""===g?"":"/")+i,riot.route.trigger(g,d))}a=c,b=d},d=navigator.userAgent.match(/Trident/)||navigator.userAgent.match(/MSIE/),e=!1,f="Webkit Moz O ms Khtml".split(" "),g=document.createElement("div");if(void 0!==g.style.animationName&&(e=!0),!e)for(var h=0;h<f.length;h++)if(void 0!==g.style[f[h]+"AnimationName"]){e=!0;break}var i={display:"block",opacity:0,position:"absolute",left:e?"0px":"20px",right:0,top:0,bottom:0},j={left:"0px",opacity:1},k={left:"",top:"",right:"",bottom:"",position:"",opacity:""},l=function(a){a.removeClass("entrance-in entrance-out")},m=!1,n=function(a,b,c){var f=$("body");if(m)riot.route.trigger("routeChange"+(""===a?"":":")+a,b),a+=(""===a?"":"/")+b,riot.route.trigger(a,c);else{m=!0;var g=function(){f.scrollTop(0),riot.route.trigger("routeChange"+(""===a?"":":")+a,b),f.css(i),e?(l(f),f.addClass("entrance-in"),setTimeout(function(){l(f),f.css(k),m=!1},500)):f.animate(j,{duration:500,easing:"swing",always:function(){f.css(k),m=!1}}),a+=(""===a?"":"/")+b,riot.route.trigger(a,c)};e&&!d?(l(f),f.addClass("entrance-out"),setTimeout(g,100)):f.fadeOut({duration:100,always:g})}};riot.route.onAttached=function(a,b,c){this.on(a,function(a){b=$(b);var d=setInterval(function(){b.length&&b.is(":visible")&&(clearInterval(d),c(a))},50)})},riot.route(c),riot.route.build=function(){$("body").hide(),this.exec(c)}}(),function(a){var b=function(){};b.prototype={url:"http://localhost:9000/data/test-data2.json",dataStore:null,findAll:function(){if(this.dataStore){var a=new $.Deferred;return a.resolve(this.dataStore),a.promise()}var b=this;return $.getJSON(this.url).then(function(a){var c=[];for(var d in a)a[d].date=_.map(a[d].date,function(a){return a.start=new Date(a.start),a.end=new Date(a.end),a}),c.push(new cfc.Event(a[d]));return b.dataStore=c,c})},_jsonp:function(a,b){var c=document.createElement("script");c.async=!0;var d="exec"+Math.floor(65535*Math.random()+1);window[d]=function(a){var c=document.getElementById(d);c.parentNode.removeChild(c),b(a),window[d]=null,delete window[d]};var e=a.indexOf("?")>-1?"&":"?";c.src=a+e+"callback="+d,c.id=d,document.getElementsByTagName("head")[0].appendChild(c)}},a.EventStore=b}(window.cfc=window.cfc||{}),function(a){var b=function(a){for(var b in a)this[b]=a[b]};b.prototype={getStartDate:function(){return this.date[0].start},getEndDate:function(){return this.date[this.date.length-1].end}},b.dataStore=new cfc.EventStore,b.findAll=function(){return this.dataStore.findAll()},b.find=function(a){return this.findAll().then(function(b){return _.filter(b,function(b){if(a.fromDate){var c=_.some(b.date,function(b){return b.end.getTime()>a.fromDate.getTime()});if(!c)return!1}if(a.toDate){var c=_.some(b.date,function(b){return b.start.getTime()<a.toDate.getTime()});if(!c)return!1}return!0})}).then(function(b){if(null!=a.limit&&null!=a.pageNo){var c=a.limit*a.pageNo,d=a.limit*(a.pageNo+1)-1;return{total:b.length,limit:a.limit,pageNo:a.pageNo,list:_.filter(b,function(a,b){return b>=c&&d>=b})}}return{total:b.length,list:b}})},a.Event=b}(window.cfc=window.cfc||{});