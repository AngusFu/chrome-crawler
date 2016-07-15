
var $wrap = $(".wrap");
var $menu = $('.keys');
var $content = $('.content');

// 初始化
source.forEach(function(index, id){
    $menu.append(`
        <li data-key="dom_${index}">
            ${id}(<span class="count">0</span>)
        </li>
    `);
    
    $content.append(`<ul class="mb-nav" id="dom_${index}"></ul>`);
});

$content.on('click', '.mb-title', function() {
    var $this = $(this);
    var id = $this.closest('ul').attr('id');
    $this.removeClass('new');
    $('[data-key="' + id + '"]').removeClass('new');
});
// 导航定位
$(".left-side").click(function(e){
    var li = e.target.tagName == "LI" ? e.target : (e.target.parentNode.tagName == "LI") ? e.target.parentNode : null

    if(li){
        var id = $(li).attr("data-key")
        var $dom = $("#"+id);
        if($dom.length){
            $('html,body').animate({
                scrollTop: $dom.offset().top
            }, 400);
        }
    }
});

// 强制刷新
// 不使用缓存
$('#refresh').click(function() {
    store.clearAll();
    initData();
});

// 回到顶部
$('#toTop').click(function() {
    $('html,body').animate({
        scrollTop: 0
    }, 400);
});


// 页面显示隐藏时刷新
// pageVisibility.visibilitychange(function() {
//     if (!pageVisibility.hidden) {
//         initData();
//     }
// });

// 延时 1 s
// 避免浪费请求
setTimeout(function() {
    // 刷新数据并回到顶部
    initData(true).then(function() {
        $('#toTop').trigger('click');
    });
}, 1000);

/**
 * 
 * @param  {Boolean} noCacheRender 使用缓存时候是否仍然强制重新渲染
 * 
 * @return {Promise}
 * 
 */
function initData(noCacheRender) {
    var promises = [];

    source.forEach(function(index, id){
        var nowSource = this;

        /**==================================================================
         * 
         * 先进行缓存验证
         * 
         */
        var storeInfo = null;
        var info = null;
        try {
            storeInfo = JSON.parse(store.get(id));
        } catch (e) {}

        // 缓存有效
        if (storeInfo && store.checkValid(id)) {
            if (noCacheRender) {
                updateDOMContent(index, id, storeInfo, this);
                console.log('[', id, '] use cache');
            }
           return;
        }

        var $menuLi = $menu.find('[data-key="dom_' + index + '"]');
        $menuLi.removeClass('new').find('.count').text(0);

        // 缓存过期  先清除掉
        store.del(id);

        $('.wrap, .tools').hide();
        $('#loader').show();

        promises[promises.length] = $.ajax({
            url: this.url,
            method: 'get',
            dataType: 'text'
        }).done(function(data) {
            data = nowSource['_r_'] && data || processData(data);
            info = parseData(data, nowSource);

            // 缓存 10 min
            store.set(id, JSON.stringify(info), 60 * 10);

            // 对比 storeInfo 与info
            // 然后再更新
            // 保证能告诉用户哪些内容是新的
            if (storeInfo && info) {
                // 只要 info 中有未在 storeInfo 中
                // 出现的元素
                // 那么就认为是新内容
                info.forEach(function(item) {
                    var itemIsOld = storeInfo.some(function(sItem) {
                        return sItem.url === item.url && sItem.title === item.title;
                    });

                    if (!itemIsOld) {
                        item._is_new_ = true;
                    }
                });
            }

            updateDOMContent(index, id, info, nowSource);
        });
    });

    // 都完成之后才显示
    return $.when(promises).then(function() {
        $('.wrap, .tools').fadeIn(300);
        $('#loader').fadeOut(400);
    });
}

/**
 * 
 * 初步处理返回的字符串
 * 
 * @param  {String} data
 * @return {String}
 * 
 */
function processData(data) {
    data = data.replace(/src=/gim, 'xsrc=')
               .replace(/<img\s*src=/gim, 'xsrc=')
               .replace(/srcset=/gim, 'xsrcset=')
               .replace(/<img/gim, '<input')
               .replace(/\.(jpg|jpeg|webp|png|gif)/gim, '')
               .replace(/<script/gim, '<template')
               .replace(/script>/gim, 'template>')
               .replace(/<link/gim, '<meta')
               .replace(/<input([^>])+results=/gim, '<input')
               .replace(/<body([^>])*>/gim, '<body>')
               .trim();
    return data.substring(
                data.indexOf('<body>') + 6,

                data.lastIndexOf('</body>') > 0
                        ? data.lastIndexOf('</body>')
                        : data.length
    );
}

/**
 * 
 * 根据当前的处理对象和 data 字符串
 * 生成相应的提供渲染的数组
 * 
 * @param  {Object} data
 * @param  {Object} source
 * @return {Array}
 * 
 */
function parseData(data, source) {
    if (typeof source.parse === 'function') {
        return source.parse(data);
    }

    var info = [];

    // 如果是 localStorage 中配置的 rss
    if (source._r_) {
        var data = $.xml2json(data);
        var keys = source.colum.trim().split('.');
        var i = 0;

        while (i < keys.length) {
            if (data[keys[i]]) {
                data = data[keys[i++]];
            } else {
                return info;
            }
        }
        data = data.slice(0, source.max);
        info = data.map(function(item) {
            var cdata = /^\<\!\[CDARA\[(.+)\]\]>$/,
                title = item[source.title] || '',
                match = title.match(cdata);

            var time = item[source.time];
            if (!time) {
                for (var k in item) {
                    if ({}.hasOwnProperty.call(item, k)) {
                        if (k.toLowerCase().indexOf('pub') === 0) {
                            time = item[k];
                            break;
                        }
                    }
                }
            }

            var url = item[source.link];
            if (url && typeof url !== 'string') {
                url = url.$.href;
            }


            var timeParsed = null;

            try {
                timeParsed = Date.parse(time);
            } catch (e){};
            
            if (timeParsed) {
                time = (new Date(timeParsed)).toLocaleDateString();
            }

            var timeMatch = time.match(/\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/);
            time = timeMatch && timeMatch[0] || '';
            return {
                url: url || '',
                title: (match && match[1] || title).trim(),
                time: time
            };
        });
        return info;
    }

    var div = document.createElement('div');

    div.innerHTML = data;

    var $columns = $(div).find(source.colum);
    var temp = null;

    var $colum = null;
    // 如果是 localStorage 中配置的 selector
    if (source._c_) {
        for (var i = 0, len = $columns.length; i < len && i < (source.max || 10); i++) {
            $colum = $columns.eq(i);

            temp = {
                url: $colum.find(source.link).attr('href'),
                title: $colum.find(source.title).text(),
                time: source.time && $colum.find(source.time).text() || '',
            };

            if (!/^http/.test(temp.url)) {
                temp.url = (new URL(temp.url, source.url)).href;
            }

            info.push(temp);
        }

        return info;
    }

    for (var i = 0, len = $columns.length; i < len && i < (source.max || 10); i++) {

        temp = source.handle.call(source, $columns.eq(i));

        if (temp) {
            if (!/^http/.test(temp.url)) {
                temp.url = (new URL(temp.url, source.url)).href;
            }

            temp.title = temp.title.trim();
            info.push(temp);
        }
    }

    return info;
}


/**
 * 生成内容
 */
function getRenderContent(info, source, id) {
    var titleText = `<a href="${source.url}" target="_blank" class="mb-blog-name">${id}</a>`;
    var linksText = info.reduce(function(prev, curr) {
        return prev + `<li class="mb-item">
            <a href="${curr.url}" target="_blank" class="mb-title ${curr._is_new_ ? 'new' : ''}">
                ${curr.title}
                <span class="blog-time">${curr.time}</span>
            </a>
        </li>`;
    }, '');

    return titleText + linksText;
}

/**
 * 更新 DOM
 */
function updateDOMContent(index, id, info, source) {
    var content = getRenderContent(info, source, id);

    $('#dom_' + index).empty().html(content);

    var isAnyNew = info.some(function(item) {
        return item._is_new_;
    });

    $menu.find('[data-key="dom_' + index + '"]')
        .addClass(isAnyNew ? 'new' : '')
        .find(".count")
        .html($("#dom_" + index + " li").length || 0);
};
 