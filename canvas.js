var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d')

autoSetCanvas(yyy)
listenToUser(yyy)
var eraserEnabled = false
brush.onclick = function(){
  eraserEnabled = false
  brush.classList.add('active')
  eraser.classList.remove('active')
}
eraser.onclick = function(){
  eraserEnabled = true
  eraser.classList.add('active')
  brush.classList.remove('active')
}
//保存
save.onclick = function(){
  var url = yyy.toDataURL("image/png")
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = '我的作品'
  a.target = '_blank'
  a.click()
}
//清屏
clear.onclick = function(){
  context.clearRect(0, 0, yyy.width, yyy.height);
}
//选择线宽
var lineWidth
thin.onclick = function(){
  context.lineWidth = 5
}
thick.onclick = function(){
  context.lineWidth = 10
}
//选择颜色
red.onclick = function(){
  context.fillStyle = 'red'
  context.strokeStyle = 'red'
  red.classList.add('active')
  yellow.classList.remove('active')
  blue.classList.remove('active')
}
yellow.onclick = function(){
  context.fillStyle = 'yellow'
  context.strokeStyle = 'yellow'
  yellow.classList.add('active')
  red.classList.remove('active')
  blue.classList.remove('active')
}
blue.onclick = function(){
  context.fillStyle = 'blue'
  context.strokeStyle = 'blue'
  blue.classList.add('active')
  red.classList.remove('active')
  yellow.classList.remove('active')
}
//画圈
function drawCircle(x,y,radius){
  context.beginPath()
  context.arc(x,y,radius,0,Math.PI*2)
  context.fill()
  }
//画直线
function drawLine(x1,y1,x2,y2){
  context.beginPath()
  context.moveTo(x1,y1)//起点
  context.lineWidth = lineWidth
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
//监听鼠标事件
function listenToUser(canvas){
    var using = false
    var lastPoint = {
    x:undefined,
    y:undefined
    }
    //特性检测
    if (document.body.ontouchstart !== undefined){
        //触屏设备
          canvas.ontouchstart = function(aaa){
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
             using = true 
            if(eraserEnabled){
            context.clearRect(x-5,y-5,10,10)
            }else{
            lastPoint = {"x":x,"y":y}
            }

        }
          canvas.ontouchmove = function(aaa){
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
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
          canvas.ontouchend = function(aaa){
            using = false
        }
    }else{
        //非触屏设备
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
}
