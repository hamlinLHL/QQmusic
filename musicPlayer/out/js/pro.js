(function($,root){
    var $scope=$(document.body);
    var startTime,curTime,allTime,per,frameId,stopTime=0;
    function renderTime(time){
        allTime=time;
        var time1=formate(allTime);
        $scope.find('.all-time').html(time1);
    }
    function formate(time){
        var time=Math.round(time)
        var m = Math.floor(time/60);
        var s = time%60;
        if(m<10){
            m='0'+m;
        }
        if(s<10){
            s='0'+s;
        }
        return m+':'+s;
    }
    function start(t){
        stopTime=t==undefined?stopTime:t;
        startTime = new Date().getTime();
        function frame(){
            curTime =stopTime + new Date().getTime();
            per=(curTime-startTime)/(allTime*1000);
            var deg=per*360*7;
            $scope.find('.song-image').css({
                transform:'rotateZ('+deg+'deg)'
            })
            if(per<=1){
                frameId = requestAnimationFrame(frame);
                updateTime(per);
            }else{
                cancelAnimationFrame(frameId);
                start(0);
            }
        }
        frame();
    }
    function stop(){
        stopTime=curTime-startTime;
        cancelAnimationFrame(frameId);
    }
    function updateTime(per){
        var time2 = formate(allTime * per);
        $scope.find('.cur-time').html(time2);
        $scope.find('.pro-top').css({
            'transform': 'translateX(' + (per - 1) * 100 + '%)',
        })
    }
    
    root.pro={
        renderTime:renderTime,
        start:start,
        stop:stop,
        updateTime:updateTime,
    }
})(window.Zepto, window.player || (window.player = {}))