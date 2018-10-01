(function($,root){
    var $scope= $(document.body);
    // console.log($scope)
    function renderInfo(info){
        var html = '<div class="song-name">'+info.song+'</div>\
            <div class="singer-name">'+info.singer+'</div>\
            <div class="album-name">'+info.album+'</div>'
        $scope.find('.song-info').html(html);
    }
    function renderImage(src){
        var image= new Image();
        image.src= src;
        image.onload=function(){
            $scope.find('.song-wrap img').attr('src',src);
            root.blurImg(image, $scope)
        }
    }
    function renderIslike(islike){
        if(islike){
            $scope.find(".like").addClass('liking')
        }else{
            $scope.find(".like").removeClass('liking')
        }
    }
    root.render=function render(data) {
        
        renderInfo(data);
        renderImage(data.image);
        renderIslike(data.isLike);
        
    }
    
})(window.Zepto,window.player||(window.player={}))
