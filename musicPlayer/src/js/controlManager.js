(function($,root){
    function controlManager(index,len){
        this.index=index;
        this.len=len;
    }
    controlManager.prototype={
        pre:function(){
            return this.getIndex(-1);
        },
        next:function(){
            return this.getIndex(1);
        },
        getIndex:function(value){
            var len=this.len;
            var index=this.index;
            var curIndex=(len+index+value)%len;
            this.index=curIndex;
            return curIndex;
        }
    }
    root.controlManager=controlManager;
})(window.Zepto,window.player||(window.player={}))