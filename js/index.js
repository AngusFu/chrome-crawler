
// 延时 2.5 s
// 避免浪费请求
setTimeout(function() {
    var $menu = $('.keys');
    var $content = $('.content');

    window.URL = window.URL || window.webkitURL;

    $menu.empty();
    $content.empty();
    store.clearExp();

    source.forEach(function(index, id){
        var nowSource = this;

        $menu.append(`
            <li class="loading" data-key="dom_${index}">
                ${id}(<span class="count">0</span>)
            </li>
        `);

        $content.append(`<ul class="mb-nav" id="dom_${index}"></ul>`);

        var info = null;

        if (info = JSON.parse(store.get(id))) {
            updateContent(index, id, info, this);
            console.log('[', id, '] use cache');

            return;
        }

        $.get(this.url, function(data) {
            var info = [];
            var div =  document.createElement('div');

            data = data.replace(/src=/gim, 'xsrc=')
                       .replace(/srcset=/gim, 'xsrcset=')
                       .replace(/<script/gim, '<template')
                       .replace(/script>/gim, 'template>')
                       .replace(/<img/gim, '<input')
                       .replace(/<input([^>])+results=/gim, '<input')
                       .replace(/<body([^>])*>/gim, '<body>')
                       .trim();

            data = data.substring(data.indexOf('<body>') + 6, data.lastIndexOf('</body>') > 0 ? data.lastIndexOf('</body>') : data.length);

            if (nowSource.parse) {
                info = nowSource.parse(data);
            } else {
                div.innerHTML = data;
                var $columns = $(div).find(nowSource.colum);
                var max = nowSource.max || 10;

                var temp = null;
                var url = null;

                for (var i = 0, len = $columns.length; i < len && i < max; i++) {
                    temp = nowSource.handle.call(nowSource, $columns.eq(i));
                    
                    if (temp && !/^http/.test(temp.url)) {
                        url = new URL(temp.url, nowSource.url);
                        temp.url = url.href;
                    }

                    if (temp) {
                        temp.title = temp.title.trim();
                        info.push(temp);
                    }
                }
            }
            

            // 缓存 10 min
            store.set(id, JSON.stringify(info), 60 * 10);
            updateContent(index, id, info, nowSource);
        });
    });

    $('.wrap, .tools').fadeIn(300);
    $('#loader').fadeOut(800);

    // ===========================================================
    // 

    var $wrap = $(".wrap");
    $(".left-side").click(function(e){
        var li = e.target.tagName == "LI" ? e.target : (e.target.parentNode.tagName == "LI") ? e.target.parentNode : null

        if(li){
            var id = $(li).attr("data-key")
            var $dom = $("#"+id);
            if($dom.length){
                $(window).scrollTop($dom.offset().top);
            }
        }
    });

    $('#refresh').click(function() {
        store.clearAll();
        location.reload();
    });

    $('#toTop').click(function() {
        $('html,body').animate({
            scrollTop: 0
        }, 400);
    });


    function renderContent(info, source, id) {

        var titleText = `<a href="${source.url}" target="_blank" class="mb-blog-name">${id}</a>`;
        var linksText = info.reduce(function(prev, curr) {
            return prev + `<li class="mb-item">
                <a href="${curr.url}" target="_blank" class="mb-title">
                    ${curr.title}
                    <span class="blog-time">${curr.time}</span>
                </a>
            </li>`;
        }, '');

        return titleText + linksText;
    }

    function updateContent(index, id, info, source) {
        var content = renderContent(info, source, id);

        $('#dom_' + index).html(content);

        $menu.find('[data-key="dom_' + index + '"]')
            .removeClass("loading")
            .find(".count")
            .html($("#dom_" + index + " li").length || 0);
    };

}, 1000 * 2.5);