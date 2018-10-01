var $ = window.Zepto;
var root = window.player;
var $scope= $(document.body);
var songList,
    controls;
var audioControl=new root.audioControl();
var index=0;
var per;
function getData(url){
    $.ajax({type:'GET',
    url:url,
    success:function(data){
        songList=data;
        root.render(data[0]);
        bindEvent();
        controls=new root.controlManager(0,data.length);
        audioControl.getAudio(data[0].audio);
        root.pro.renderTime(data[0].duration);
        bindTouch();
        root.playList.showList(data);
        root.playList.onPlay(0);
    },
    error:function(){
        alert('error')
    }
    })
};
function bindEvent(){
    $scope.on('click','.pre',function(){
        index=controls.pre();
        root.render(songList[index])
        changePage();
    });
    $scope.on('click', '.next', function () {
        index = controls.next();
        root.render(songList[index])
        changePage();
    });
    $scope.on('click', '.play', function () {
        if(audioControl.status=='pause'){
            renderStart();
        }else{
            renderStop();
        }
    });
    $scope.on('click', '.like', function () {
        $scope.find('.like').toggleClass('liking');
    });
    $scope.on('click', '.list', function () {
        
        $scope.find('.playList').css({
            'transform': 'translateY(0)'
        }).find('.playList-close').on('click',function(){
            $scope.find('.playList').css({
                'transform': 'translateY(100%)'
            })
        })
    });
    $scope.find('.playList-content').on('click','li',function(){
        index=$(this).index();
        root.render(songList[index])
        changePage();
    })
    function changePage(){
        root.pro.stop();
        audioControl.getAudio(songList[index].audio);
        root.pro.renderTime(songList[index].duration);
        renderStart(0);
        root.playList.onPlay(index);
    }
};
function renderStart(t){
    audioControl.play();
    $scope.find('.play').addClass('pause');
    root.pro.start(t);
}
function renderStop(){
    audioControl.pause();
    $scope.find('.play').removeClass('pause');
    root.pro.stop();
}
function bindTouch(){
    var $slider=$scope.find('.slider-pointer');
    var $bottom=$scope.find('.pro-bottom').offset();
    var width=$bottom.width;
    var left=$bottom.left;
    $slider.on('touchstart',function(){
        renderStop();
    }).on('touchmove',function(e){
        var x=e.changedTouches[0].clientX
        var dis=x-left;
        per=dis/width;
        if(per>0&&per<1){
            root.pro.updateTime(per);
        }
    }).on('touchend',function(){
        if (per > 0 && per < 1){
            var curTime = (songList[index].duration) * per;
            audioControl.playTo(curTime);
            renderStart(curTime*1000);
        }        
    })
}
getData('../mock/data.json')