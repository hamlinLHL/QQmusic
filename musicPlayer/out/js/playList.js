(function ($, root) {
function showList(data){
    var len = data.length;
    var $scope = $(document.body);
    var html1= '('+len+'首)';
    var html='';
    for(var i=0;i<len;i++){
    html +='<li> '+data[i].song+' </li>';
    }
    $scope.find('.playList-content ul').html(html);
    $scope.find('.playList-title span').html(html1);
    
}
function onPlay(index){
    $scope.find('.playList-content ul li').removeClass('color');
    $scope.find('.playList-content ul li').eq(index).addClass('color');
}
root.playList={
    showList:showList,
    onPlay:onPlay,
    
}
})(window.Zepto, window.player || (window.player = {}))