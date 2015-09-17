$(function(){

$(document).ready(function() {
  $('#fullpage').fullpage({
    anchors: ['m', 'd'],
  });
});


var radius = 50; //円の半径

var map; //マップ
var boards = []; //標識のマーカー
var myPos; //現在位置のマーカー
var circle; //円
var circle2; //円2
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
    maxZoom : 20,
    minZoom : 18,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: latlng,
    disableDoubleClickZoom : true,
    draggable : false, 
    panControl : false,
    rotateControl : false,
    scaleControl : true,
    streetViewControl : false,
    zoomControl : true,
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
      scaledSize: new google.maps.Size( 50, 100 )
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

  // var circle2Opts = {
  //   map  : map,
  //   center : latlng,
  //   radius : 3 * radius,
  //   clickable : false,
  //   draggable : false,
  //   fillColor : "#ffa07a",
  //   strokeColor : "#dda0dd",
  //   strokeWeight : 4,
  //   fillOpacity : 0.0
  // };

  // 現在位置マーカーの作成
  myPos = new google.maps.Marker(myPosOpts);
  // 円の作成
  circle = new google.maps.Circle(circleOpts);
  // circle2 = new google.maps.Circle(circle2Opts);

  //標識を追加
  addNearbyBoards(lat, lng);

//画像のoverlay(無理そう。。。)
// var sw=new google.maps.LatLng(35.6643203,139.7305972);    /* 南西 */ 
// var ne=new google.maps.LatLng(35.6678068,139.7329419);        /* 北東 */

// var imageBounds = new google.maps.LatLngBounds(sw, ne);
// var overlay = new google.maps.GroundOverlay(
//                 "/assets/overlay.png",
//                 imageBounds
//             );
// overlay.setMap(map);
//ここまで

  //位置変更を監視
  var watchId = navigator.geolocation.watchPosition( locationChanged , locationDisabled);
}

/*
* 現在位置が更新された時、現在位置マーカーと標識マーカーを更新
* ただし、動きが少なかったら更新しない
*/
function locationChanged(pos){

  var lat = pos.coords.latitude;
  var lng = pos.coords.longitude;
  var latlng = new google.maps.LatLng(lat, lng);

  //5m動動くとマップ、現在位置、円を移動、マーカーを更新
  var dist = google.maps.geometry.spherical.computeDistanceBetween(prevLatlng, latlng);
  if (dist > 5){
    map.panTo(latlng);
    myPos.setPosition(latlng);
    circle.setCenter(latlng);
    circle2.setCenter(latlng);

  //標識を追加
  addNearbyBoards(lat, lng);

  prevLatlng = latlng;
  }

}

/*
* 新しいマーカーをサーバーから非同期に取得してマップに追加
*/
function addNearbyBoards (lat, lng) {
  $.getJSON("/boards/getNearby/"+lat+"/"+lng, null, function(data){
    boards = null;
    boards = [];


    $.each(data, function () {
      var latlng = new google.maps.LatLng(this.latitude, this.longitude);
      var dist = google.maps.geometry.spherical.computeDistanceBetween(myPos.getPosition(), latlng);

      if(dist < radius){
        var opt = {
          position: latlng,
          map: map,
          icon : {
            url: this.back_type,
            scaledSize: new google.maps.Size( 75, 150 ),
          },
          opacity: 1,
          id : this.id
        }
        boards.push(new google.maps.Marker(opt));

        // クリックのイベントを追加
        google.maps.event.addListener(boards[boards.length-1], 'click', function(){
          $.fn.fullpage.moveTo(2);
          $.getJSON("/boards/"+this.id, null, function(data){
            $("#board-img").attr("src", data.image);
            $("#board-text").html(data.caption);
          });
        });

      //ある程度広範囲まで表示はする(クリックは出来ない)
      } else if(dist < radius*3) {
        var opt = {
          position: latlng,
          map: map,
          icon : {
            url: this.back_type,
            scaledSize: new google.maps.Size( 75, 150 ),
          },
          opacity : 1,
          clickable : false,
          id : this.id
        }
        boards.push(new google.maps.Marker(opt));
      }
    }); //each
  }); //getJSON
}

/*
* 位置情報が取得できなかった時
*/
function locationDisabled(){
  $("map")[0].innerHTML =  "位置情報が利用できません";
}

});