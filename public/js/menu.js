
   /*
    * 无限级下拉菜单
    *
    * 20:36 2013/11/21	buxiaochao
    */

    (function() {

      /* 定义 */ {

        var menu_main = jQuery('div.menu ul.main');

      }

      /* 函数 */ {

        var close = function(e/* Object event */) {

          jQuery(menu_main).find('*').removeAttr('class');

        };

      }

      /* 绑定 */ {

        jQuery(menu_main).mouseover(function(e) {

          var t = e.target;

          //查找项
          for(t; t; t = t.parentNode) {
            if(t.tagName == 'LI') {
              break;
            }
          }

          try {

            //隐藏
            jQuery(t.parentNode).find('*').removeAttr('class');

            //显示
            jQuery(t).find( '*:first').attr('class', 'hover');
            jQuery(t).find('ul:first').attr('class', 'hover');

          } catch(ex) {
            return;
          }

          e.stopPropagation();

        });

        //点击关闭
        jQuery(menu_main).click(close);

        //离开关闭
        jQuery(document).mouseover(close);

      }

    })();
