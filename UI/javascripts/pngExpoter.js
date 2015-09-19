var left = {ame: 'ame.png', car: 'car.png', cat: 'cat.png'
            , hamburger: 'hamburger.png', karaoke: 'karaoke.png'
            , kisskidf: 'kisskidf.png', kisskidm: 'kisskidm.png'
            , man: 'man.png', motituki: 'motituki.png'
            , none: 'none.png', nozoki: 'nozoki.png'
            , panda: 'panda.png', run: 'run.png'
            , samurai: 'samurai.png', syagamu: 'syagamu.png'
            , tomb: 'tomb.png', woman: 'woman.png'
            , youjo: 'youjo.png'}

var center = {banzai: 'banzai.png', barerina: 'barerina.png', chair: 'chair.png'
            , heart: 'heart.png', lead: 'lead.png'
            , nessi: 'nessi.png', none: 'none.png'
            , ochai: 'ochai.png', skul: 'skul.png'
            , unko: 'unko.png', ushi: 'ushi.png'}

var right = {car: 'car.png', cat: 'cat.png'
            , hamburger: 'hamburger.png', karaoke: 'karaoke.png'
            , kisskidf: 'kisskidf.png', kisskidm: 'kisskidm.png'
            , man: 'man.png', motituki: 'motituki.png'
            , none: 'none.png', nozoki: 'nozoki.png'
            , panda: 'panda.png', run: 'run.png'
            , samurai: 'samurai.png', syagamu: 'syagamu.png'
            , tomb: 'tomb.png', woman: 'woman.png'
            , youjo: 'youjo.png', nukarumi: 'nukarumi.png'}

var board = ['./images/board/blue.png','./images/board/yellow.png'
             ,'./images/board/red.png'];

var displayImg = [];
var canvas = document.getElementById('canvasElement');
var ctx = canvas.getContext('2d');
//var type = 'image/png';
var board_num = 0;

function change_board(num) {
    board_num = num;
    if (board_num == 1) {
        var img = new Image();

        img.onload = (function() {
            //ctx.drawImage(img, 0, 0, 400, 400);
            displayImg[0] = img;
        });
        img.src = board[0];
        //img.crossOrigin = "Anonymous";
    } else if (board_num == 2) {
        var img = new Image();
        img.onload = (function() {
            //ctx.drawImage(img, 0, 0, 400, 400);
            displayImg[0] = img;
        });
        img.src = board[1];
        //img.crossOrigin = "Anonymous";
    } else if (board_num == 3) {
        var img = new Image();
        img.onload = (function() {
            //ctx.drawImage(img, 0, 0, 400, 400);
            displayImg[0] = img;
        });
        img.src = board[2];
        //img.crossOrigin = "Anonymous";
    }
    display();
}


function stamp(type, name) {
    if (type == 'left') {
        var img = new Image();
        if (board_num == 1) {
            img.src = "./images/left/1_" + left[name];
            //img.crossOrigin = "Anonymous";
        } else if (board_num == 2) {
            img.src = "./images/left/2_" + left[name];
            //img.crossOrigin = "Anonymous";
        } else if (board_num == 3) {
            img.src = "./images/left/3_" + left[name];
            //img.crossOrigin = "Anonymous";
        }
        img.onload = (function() {
            // ctx.drawImage(img, 0, 0, 400, 400);
            displayImg[2] = img;
        });

    } else if (type == 'center') {
        var img = new Image();
        if (board_num == 1) {
            img.src = "./images/center/1_" + center[name];
            //img.crossOrigin = "Anonymous";
        } else if (board_num == 2) {
            img.src = "./images/center/2_" + center[name];
            //img.crossOrigin = "Anonymous";
        } else if (board_num == 3) {
            img.src = "./images/center/3_" + center[name];
            //img.crossOrigin = "Anonymous";
        }
        img.onload = (function() {
            // ctx.drawImage(img, 0, 0, 400, 400);
            displayImg[1] = img;
        });

    } else if (type == 'right') {
        var img = new Image();
        if (board_num == 1) {
            img.src = "./images/right/1_" + right[name];
            //img.crossOrigin = "Anonymous";
            //img.crossOrigin = "Anonymous";
        } else if (board_num == 2) {
            img.src = "./images/right/2_" + right[name];
            //img.crossOrigin = "Anonymous";
            //img.crossOrigin = "Anonymous";
        } else if (board_num == 3) {
            img.src = "./images/right/3_" + right[name];
            //img.crossOrigin = "Anonymous";
            //img.crossOrigin = "Anonymous";
        }
        img.onload = (function() {
            // ctx.drawImage(img, 0, 0, 400, 400);
            displayImg[3] = img;
        });

    }
    display();
}

function display() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i in displayImg){
        ctx.drawImage(displayImg[i], 0, 0, 400, 400);
        console.log(displayImg[i]);
    }
}


$(function() {
    $( "#tabs" ).tabs();
});
$(document).ready(function(){
    $('.signselector').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3
    });
});

$(function(){
 $('#red').click(function(){
    $('#blue').attr('src', $('#blue').attr('src').replace('_h', '_def'));
    $('#yellow').attr('src', $('#yellow').attr('src').replace('_h', '_def'));
    $(this).attr('src', $(this).attr('src').replace('_def', '_h'));
   });
});

$(function(){
 $('#blue').click(function(){
    $('#red').attr('src', $('#red').attr('src').replace('_h', '_def'));
    $('#yellow').attr('src', $('#yellow').attr('src').replace('_h', '_def'));
    $(this).attr('src', $(this).attr('src').replace('_def', '_h'));
    });
});

$(function(){
 $('#yellow').click(function(){
    $('#blue').attr('src', $('#blue').attr('src').replace('_h', '_def'));
    $('#red').attr('src', $('#red').attr('src').replace('_h', '_def'));
    $(this).attr('src', $(this).attr('src').replace('_def', '_h'));
    });
});

function build() {
    var phrase, latitude, longitude;
    var png = canvas.toDataURL();
    document.getElementById("newImg").src = png;
    phrase = document.getElementById("phrase").value;
    latitude = document.getElementById("latitude").innerHTML;
    longitude = document.getElementById("longitude").innerHTML;
    //sendData(png, phrase, latitude, longitude);
}

function sendData( value, value2, value3, value4 ){
    var form = document.createElement( 'form' );
    document.body.appendChild( form );
    var input = document.createElement( 'input' );
    input.setAttribute( 'type' , 'hidden' );
    input.setAttribute( 'name' , 'png' );
    input.setAttribute( 'value' , value );
    var input2 = document.createElement( 'input' );
    input2.setAttribute( 'type' , 'hidden' );
    input2.setAttribute( 'name' , 'phrase' );
    input2.setAttribute( 'value' , value2 );
    var input3 = document.createElement( 'input' );
    input3.setAttribute( 'type' , 'hidden' );
    input3.setAttribute( 'name' , 'latitude' );
    input3.setAttribute( 'value' , value3 );
    var input4 = document.createElement( 'input' );
    input4.setAttribute( 'type' , 'hidden' );
    input4.setAttribute( 'name' , 'longitude' );
    input4.setAttribute( 'value' , value4 );
    form.appendChild( input );
    form.appendChild( input2 );
    form.appendChild( input3 );
    form.appendChild( input4 );
    form.setAttribute( 'action' , '/boards/create' );
    form.setAttribute( 'method' , 'post' );
    form.submit();
}

// canvas.toBlob(function(blob) {
//     saveAs(blob, "pretty image.png");
// });

// function loadImges(){
//     var imgObj = new Image();
//     imgObj.addEventListener('load',
//     function(){
//         loadedCounter++;
//         imgObjArry.push(imgObj);
//         if(numMaterials == loadedCounter){
//             display();
//             var dataURL = canvas.toDataURL('integrated.png');
//             console.log("writed");
//         }else{
//             loadImges();
//         }
//     },false);
//         imgObj.src = fileArry[imgObjArry.length];
// }

// function display(){
//     for (var i in imgObjArry){
//         ctx.drawImage(imgObjArry[i], 0, 0);
//         imgObjArry[i] = null;
//     }
// }
