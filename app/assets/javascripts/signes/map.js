$(function(){

	var radius = 50; 

	var map;
	var signes = [];
	var myPos;
	var circle;
	var prevLatlng = new google.maps.LatLng(0, 0);
	var prevTime;


	// GeoLocationが有効かどうかを確認
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(initMap, locationDisabled);
   	} else {
		$("map")[0].innerHTML =  "位置情報が利用できません";
   	}

   	function initMap (pos) {
   		var lat = pos.coords.latitude;
		var lng = pos.coords.longitude;
		var latlng = new google.maps.LatLng(lat, lng);

		// Mapのオプション
		var mapOpts = {
			zoom: 20,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			center: latlng,
			disableDoubleClickZoom : true,
			draggable : false,
			mapTypeControlOptions : false,
			panControl : false,
			rotateControl : false,
			scaleControl : true,
			streetViewControl : false,
			zoomControl : false,
			scrollwheel : false
		};

		// Mapオブジェクトの生成
		map = new google.maps.Map($("#map")[0], mapOpts);

		//現在地マーカーのオプション
		var myPosOpts = {
			position: latlng,
			map: map,
			title:"現在地",
			icon : {
				url: "assets/mypoint.png",
				scaledSize: new google.maps.Size( 50, 50 )
			},
			opacity: 1
		};

		//円のオプション
		var circleOpts = {
        	map  : map,
        	center : latlng,
        	radius : radius,
        	clickable : false,
        	draggable : false,
        	fillColor : "#ffa07a",
    		strokeColor : "#dda0dd",
    		strokeWeight : 4,
    		fillOpacity : 0.2
		};

		// 現在位置マーカーの作成
		myPos = new google.maps.Marker(myPosOpts);
		// 円の作成
        circle = new google.maps.Circle(circleOpts);

        addNearbySignes(lat, lng);

        prevTime = new Date;
		//位置変更を監視
		var watchId = navigator.geolocation.watchPosition( locationChanged , locationDisabled);
   	}

   	function locationChanged(pos){

		var lat = pos.coords.latitude;
		var lng = pos.coords.longitude;
		var latlng = new google.maps.LatLng(lat, lng);
		var nowTime = new Date;

		//5m動動く かつ 5秒経つ
		var dist = google.maps.geometry.spherical.computeDistanceBetween(prevLatlng, latlng);
		if (dist > 5 && nowTime - prevTime > 5000){
			map.panTo(latlng);
			myPos.setPosition(latlng);

	        addNearbySignes(lat, lng);

	        prevLatlng = latlng;
	        prevTime = nowTime;
    	}

    }

    function addNearbySignes (lat, lng) {
		$.getJSON("/signes/getNearbySignes/"+lat+"/"+lng, null, function(data){
        	$.each(data, function () {
        		var latlng = new google.maps.LatLng(this.lat, this.lng);
				var dist = google.maps.geometry.spherical.computeDistanceBetween(myPos.getPosition(), latlng);
        		
				if(dist < radius){
	        		var opt = {
						position: latlng,
						map: map,
						icon : {
							url: this.icon,
							scaledSize: new google.maps.Size( 75, 150 ),
						},
						opacity: 1,
			        }
			        signes.push(new google.maps.Marker(opt));
			    }
        	});
		});    
	}

    function locationDisabled(){

    }

});