
   /*
    * 内容切换
    *
    * 22:13 2013/11/21	Zhanghong
    */

    (function() {

      /* 定义 */ {

        var content      = jQuery('div.content');
        var content_tab  = jQuery('div.content ul.tab');
        var content_main = jQuery('div.content div.main');

      }

      /* 函数 */ {

        var change = function(e/* Object event */) {

          var t = e.target;

          if(t.getAttribute('index')) {
            change_tab(t);
          }

          if(t.innerHTML == '关闭') {
            change_close(t);
          }

        };

        var change_tab = function(t/* DOM-Element target */) {

          jQuery(content_tab).find('li').each(function(i, e) {

            if(e.getAttribute('index') == t.getAttribute('index')) {

              //如果是新建
              if(!e.className) {
                e.parentNode.appendChild(e);
              }

              e.className = 'active';

            } else {

              e.className = (e.className ? 'visited' : '');

            }

          });

          jQuery(content_main).each(function(i, e) {

            e.className = (e.getAttribute('index') == t.getAttribute('index') ? 'main active' : 'main');

          });

        };

        var change_close = function(t/* DOM-Element target */) {

          //定义标记
          var $ = false;

          //关闭
          t = t.parentNode;

          jQuery(content_tab).find('li').each(function(i, e) {

            if(e.getAttribute('index') == t.getAttribute('index')) {

              //如果是 active
              if(e.className == 'active') {
                $ = true;
              }

              e.className = '';
            }

          });

          jQuery(content_main).each(function(i, e) {

            if(e.getAttribute('index') == t.getAttribute('index')) {
              e.className = 'main';
            }

          });

          //显示一个默认的
          if($) {

            //标签
            $ = jQuery(content_tab).find('li.visited:first').attr('class', 'active');

            //内容
            jQuery(content).find('div.main[index=' + $.attr('index') + ']').attr('class', 'main active');

          }

        };

      }

      /* 绑定 */ {

        //点击标签
        jQuery(content_tab).click(change);

        //点击菜单
        jQuery('div.menu ul.main').click(change);

      }

      /* 初始化 */ {

        //显示标签
        jQuery(content_tab).find('li:first').attr('class', 'active');

        //显示内容
        jQuery(content_main).first().attr('class', 'main active');

      }

    })();
