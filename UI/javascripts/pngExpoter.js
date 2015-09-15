var board_num = 0;

var left = ['man.png',　'woman.png'
            ,'youjo.png',　'hamburger.png'
            ,'youjo.png'];
var center = ['man.png',　'woman.png'
            ,'youjo.png',　'hamburger.png'
            ,'youjo.png'];
var right = ['man.png',　'woman.png'
            ,'youjo.png',　'hamburger.png'
            ,'youjo.png'];

var board = ['./images/board/blue.png','./images/board/yellow.png'
                ,'./images/board/red.png'];

var numMaterials = fileArry.length;
var loadedCounter = 0;
var imgObjArry = [];
var canvas = document.getElementById('canvasElem');
var ctx = canvas.getContext('2d');
var type = 'image/png';

function stamp(num) {
    var img = new Image();

    img.onload = (function() {
        ctx.drawImage(img, 0, 0, 400, 400);
    });

    img.src = fileArry[num];
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
