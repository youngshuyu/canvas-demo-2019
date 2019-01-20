var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d')

autoSetCanvas(yyy)
listenToMouse(yyy)
var eraserEnabled = false
eraser.onclick = function(){
  eraserEnabled = true  
  actions.className = 'actions x'
}
brush.onclick = function(){
  eraserEnabled = false
  actions.className = 'actions'
  }
//画圈
function drawCircle(x,y,radius){
  context.beginPath()
  context.fillStyle = 'white'
  context.arc(x,y,radius,0,Math.PI*2)
  context.fill()
  }
//画直线
function drawLine(x1,y1,x2,y2){
  context.beginPath()
  context.strokeStyle = 'white'
  context.moveTo(x1,y1)//起点
  context.lineWidth = 5
  context.lineTo(x2,y2)//终点
  context.stroke()
  context.closePath() 
 }

function autoSetCanvas(canvas){//设置画板
  setCanvasSize()

window.onresize = function(){
  setCanvasSize()
  }
function setCanvasSize (){
  var pageWidth = document.documentElement.clientWidth
  var pageHeight = document.documentElement.clientHeight

  yyy.width = pageWidth
  yyy.height = pageHeight
  }
}
function listenToMouse(canvas){
    var using = false
    var lastPoint = {
    x:undefined,
    y:undefined
    }
    //按下鼠标
    
    canvas.onmousedown = function(aaa){
    
        var x = aaa.clientX
        var y = aaa.clientY
         using = true 
        if(eraserEnabled){
        context.clearRect(x-5,y-5,10,10)
        }else{
        lastPoint = {"x":x,"y":y}
        }
    }
    //移动鼠标
    canvas.onmousemove = function(aaa){
        var x = aaa.clientX
        var y = aaa.clientY
        if (!using){
            return
        }
        if(eraserEnabled){
            context.clearRect(x-5,y-5,10,10)
        }else{
            var newPoint = {"x":x,"y":y}
            drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
            lastPoint = newPoint       
        }
    }
    //松开鼠标
    canvas.onmouseup = function(aaa){
    using = false
    }
}