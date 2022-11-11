(function($) {
    $.fn.extend({
        "BootstrapTabSort": function(options) {
            var opts = $.extend({}, defaluts, options); //使用jQuery.extend 覆蓋外掛預設引數
            this.each(function() { //這裡的this 就是 jQuery物件
                var $this = $(this); //獲取當前dom 的 jQuery物件，這裡的this是當前迴圈的dom

                //取消點選後會到錨點
                $this.find('.nav-link').click(function() {
                    return false;
                });



                $this.find('.nav-link').focus(function(e) {
                    $this.find('.nav-link').attr("tabindex", "-1");
                    $(this).tab('show');
                    $(this).attr("tabindex", "0");
                    //第一個父TAB一定要設定tabindex=0，避免從這個TAB的上個元素，開始TAB後失去第一個焦點
                    $this.find('.nav-link').eq(0).attr("tabindex", "0");
                });

                $this.find('.tab-pane').each(function(index) {
                    //最後一個連動內容區不設定跳TAB
                    if (index == $this.find('.tab-pane').length - 1) {
                        return false;
                    }

                    $(this).append("<a href class='__totab'><img src='data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=' width='0' height='0' alt='' /></a>");
                    $(this).find('.__totab').keyup(function(e) {
                        if (e.shiftKey && e.key === 'Tab') {
                            //console.log('shift+TAB');
                            $this.find('.nav-link').eq(index).focus();
                            return false;
                        }

                        if (e.key === 'Tab') {
                            //console.log('TAB');
                            $this.find('.nav-link').eq(index + 1).focus();
                        }
                    });
                });

                //根據引數來設定 dom的樣式
                //$this.css({
                //    backgroundColor: opts.background,
                //    color: opts.foreground
                //});
            });
        }
    });
    //預設引數
    var defaluts = {
        //foreground: 'red',
        //background: 'yellow'
    };
})(window.jQuery);