function addLoadEvent(func) {
        // body...
        var oldonload = window.onload;
        if (typeof window.onload != 'function'){
            window.onload = func;
        }
        else{
            window.onload = function () {
                // body...
                oldonload();
                func();
            }
        }
    }
    // Create a function to realize insertAfter
    function insertAfter(new_element, target_element) {
        // body...
        var parent = target_element.parentNode;
        if (parent.lastChild == target_element){
            parent.appendChild(new_element);
        }else{
            var next_element = target_element.nextSibling;
            parent.insertBefore(new_element, next_element);
        }
    }
    
        function getNextElemt(node) {
        // body...
        if (node.nodeType == 1){
            return node
        }
        if (node.nextSibling){
            return getNextElemt(node.nextSibling);
        }
        return null;
    }
    
    function moveElement(elementID,final_x,final_y,interval) {
  if (!document.getElementById) return false;
  if (!document.getElementById(elementID)) return false;
  var elem = document.getElementById(elementID);
  if (elem.movement) {
    clearTimeout(elem.movement);
  }
  var xpos = parseInt(elem.style.left);
  var ypos = parseInt(elem.style.top);
  var dist = 0;
  if (xpos == final_x && ypos == final_y) {
    return true;
  }
  if (xpos < final_x) {
    dist = Math.ceil((final_x - xpos)/40);
    xpos = xpos + dist;
  }
  if (xpos > final_x) {
    dist = Math.ceil((xpos - final_x)/40);
    xpos = xpos - dist;
  }
  if (ypos < final_y) {
    dist = Math.ceil((final_y - ypos)/40);
    ypos = ypos + dist;
  }
  if (ypos > final_y) {
    dist = Math.ceil((ypos - final_y)/40);
    ypos = ypos - dist;
  }
  elem.style.left = xpos + "px";
  elem.style.top = ypos + "px";
  var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
  elem.movement = setTimeout(repeat,interval);
}
function convertToGS(img) {

  // 如果浏览器不支持<canvas>就返回
  if (!Modernizr.canvas) return;

  // 存储原始的彩色版
  img.color = img.src;

  // 创建灰度版
  img.grayscale = createGSCanvas(img);

  // 在 mouseover/out 事件发生时切换图片
  img.onmouseover = function() {
    this.src = this.color;
  }
  img.onmouseout = function() {
    this.src = this.grayscale;
  }
  img.onmouseout();

}



function createGSCanvas(img) {
 
  var canvas=document.createElement("canvas");
  canvas.width= img.width;
  canvas.height=img.height;

  var ctx=canvas.getContext("2d");
  ctx.drawImage(img,0,0, );
  // 注意：getImageData 只能操作与脚本位于同一个域中的图片
  var c = ctx.getImageData(0, 0, img.width, img.height);
  for (i=0; i<c.height; i++) {
    for (j=0; j<c.width; j++) {
      var x = (i*4) * c.width + (j*4);
      var r = c.data[x];
      var g = c.data[x+1];
      var b = c.data[x+2];
      c.data[x] = c.data[x+1] = c.data[x+2] = (r+g+b)/3;
    }
  }


// alert(img.width);
// alert(img.height);


  ctx.putImageData(c,0,0,0,0, c.width, c.height);

  return canvas.toDataURL();

}
// alert('Hello');

addLoadEvent(convertToGS(document.getElementById('avatar')));
