$(function(){

	var radius = 50; //円の半径

	var map; //マップ
	var signes = []; //標識のマーカー
	var myPos; //現在位置のマーカー
	var circle; //円
	var prevLatlng = new google.maps.LatLng(0, 0);


	// GeoLocationが有効かどうかを確認
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(initMap, locationDisabled);
   	} else {
   		locationDisabled();
   	}

   	/*
	* マップを#mapに作成
	* 現在地マーカーも置く
   	*/
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
			draggable : true, //テスト用
			panControl : false,
			rotateControl : false,
			scaleControl : true,
			streetViewControl : false,
			zoomControl : false,
			mapTypeControl : false,
			scrollwheel : false
		};

		// Mapオブジェクトの生成
		map = new google.maps.Map($("#map")[0], mapOpts);

		//現在地マーカーのオプション
		var myPosOpts = {
			position: latlng,
			map: map,
			clickable : false,
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

		//位置変更を監視
		var watchId = navigator.geolocation.watchPosition( locationChanged , locationDisabled);
   	}

   	/*
   	* 現在位置が更新された時、現在位置マーカーと標識マーカーを更新
   	* ただし、動きが少なかったり、時間が立ってなかったら更新しない
   	*/
   	function locationChanged(pos){

		var lat = pos.coords.latitude;
		var lng = pos.coords.longitude;
		var latlng = new google.maps.LatLng(lat, lng);

		//5m動動く かつ 5秒経つ とマップ、現在位置、円を移動、マーカーを更新
		var dist = google.maps.geometry.spherical.computeDistanceBetween(prevLatlng, latlng);
		if (dist > 5){
			map.panTo(latlng);
			myPos.setPosition(latlng);
			circle.setCenter(latlng);


	        addNearbySignes(lat, lng);

	        prevLatlng = latlng;
    	}

    }

    /*
    * 新しいマーカーをサーバーから非同期に取得してマップに追加
    */
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
						id : this.id
			        }
			        signes.push(new google.maps.Marker(opt));
			        // console.log(signes[0].get("id"));
			    }
        	});
		});    
	}

	/*
	* 位置情報が取得できなかった時
	*/
    function locationDisabled(){
		$("map")[0].innerHTML =  "位置情報が利用できません";
    }

});