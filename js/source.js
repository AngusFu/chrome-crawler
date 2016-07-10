
var TIME_REG_1 = /\d{4}[^x00-xff]\d{1,2}[^x00-xff]\d{1,2}[^x00-xff]/; //匹配XXXX年XX月XX日
var TIME_REG_2 = /\d{4}-\d{1,2}-\d{1,2}/; //匹配XXXX-XX-XX
var TIME_REG_3 = /\d{4}\/\d{2}\/\d{2}/; //匹配XXXX/XX/XX
var TIME_REG_4 = /\d{4}\.\d{2}\.\d{2}/; //匹配XXXX.XX.XX
var time_reg = /\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/;

var sourceList = {
    "W3ctech": {
        url: "http://www.w3ctech.com/topic/index",
        colum: ".bd_box .topic_list_content",
        handle: function($colum) {
            var ignoreList = ["意见与建议", "新闻", "活动", "thinkjs"];
            if (ignoreList.indexOf($colum.find(".badge_category").text()) >= 0) return;

            var _time = $colum.find(".relative-date").text();
            var time = _time.match(TIME_REG_2);
            return {
                url: $colum.find(".topic_title a").attr("href"),
                title: $colum.find(".topic_title a").text(),
                time: (time instanceof Array) ? time[0] : _time
            }
        }
    },

    "伯乐在线": {
        url: "http://web.jobbole.com/all-posts/",
        colum: ".post",
        handle: function($colum) {
            var time = $colum.find(" .post-meta p").eq(0).text().match(TIME_REG_3);
            return {
                url: $colum.find(".archive-title").attr("href"),
                title: $colum.find(".archive-title").text(),
                time: (time instanceof Array) ? time[0] : ""
            }
        }
    },

    "众成翻译": {
        url: 'http://www.zcfy.cc/article',
        colum: '.article-list li',
        handle: function($colum) {
            var time = TIME_REG_1.exec($colum.find('.date').text());

            return {
                url: $colum.find('.tit a').attr('href'),
                title: $colum.find('.tit a').text(),
                time: time && time[0] || ''
            }
        }
    },

    "EtherDream": {
        url: "http://www.cnblogs.com/index-html/",
        colum: ".postTitle",
        handle: function($colum) {
            return {
                url: $colum.find("a").attr("href"),
                title: $colum.find("a").text(),
                time: $colum.siblings('.dayTitle').text()
            }
        }
    },


    "阮一峰": {
        url: "http://www.ruanyifeng.com/blog/javascript/",
        colum: "#alpha .module-list-item",
        handle: function($colum) {
            var time = $colum.find(".hint").text().match(TIME_REG_4);
            return {
                url: $colum.find("a").attr("href"),
                title: $colum.find("a").text(),
                time: (time instanceof Array) ? time[0] : ""
            }
        }
    },

    "张鑫旭": {
        url: "http://www.zhangxinxu.com/wordpress/",
        colum: ".the_main .post",
        handle: function($colum) {
            return {
                url: $colum.find(".entry-title").attr("href"),
                title: $colum.find(".entry-title").text(),
                time: $colum.find(".date").text()
            }
        }
    },

    "小胡子": {
        url: 'http://barretlee.com/blog/archives/',
        colum: '.cate-detail li',
        handle: function($colum) {
            var time = time_reg.exec($colum.find("span").text());
            return {
                url: $colum.find("a").attr("href"),
                title: $colum.find("a").text(),
                time: time && time[0] || ''
            }
        }
    },


    "叶小钗": {
        url: "http://www.cnblogs.com/yexiaochai/",
        colum: ".day",
        handle: function($colum) {
            var time = $colum.find(".dayTitle").text().match(TIME_REG_1);
            if (!time) return;

            return {
                url: $colum.find(".postTitle a").attr("href"),
                title: $colum.find(".postTitle a").text(),
                time: time[0]
            }
        }
    },


    "月影": {
        url: 'https://www.h5jun.com/archives/',
        colum: '.entry-content li',
        handle: function($colum) {
            return {
                url: $colum.find("a").attr("href"),
                title: $colum.find("a").text(),
                time: $colum.find("span").text()
            }
        }
    },

    "前端观察": {
        url: "https://www.qianduan.net/",
        colum: ".main-content .post",
        handle: function($colum) {
            return {
                url: $colum.find(".post-title a").attr("href"),
                title: $colum.find(".post-title a").text(),
                time: $colum.find(".post-date").attr("datetime")
            }
        }
    },

    "AlloyTeam": {
        url: "http://www.alloyteam.com",
        colum: ".articlemenu>li",
        handle: function($colum) {
            var time = $colum.find(".blogPs").text().match(TIME_REG_1);
            return {
                url: $colum.find(".blogTitle").attr("href"),
                title: $colum.find(".blogTitle").text().trim(),
                time: (time instanceof Array) ? time[0] : ""
            }
        }
    },


    "FEX": {
        url: "http://fex.baidu.com/",
        colum: ".container .post-list>li",
        handle: function($colum) {
            var time = $colum.find(".date").text().split(" ");
            time = time.slice(time.length - 3, time.length).join(" ");
            return {
                url: $colum.find("a").attr("href"),
                title: $colum.find("p").text(),
                time: time
            }
        }
    },


    "Taobao FED": {
        url: 'http://taobaofed.org/',
        colum: '.article-summary',
        handle: function($colum) {
            return {
                url: $colum.find(".article-summary-inner a").attr("href"),
                title: $colum.find(".article-summary-inner a").text(),
                time: $colum.find("time").text()
            }
        }
    },

    "凹凸实验室": {
        url: "https://aotu.io/index.html",
        parse: function(data) {
            var a = /<template>var POSTS=(.+\]\}\])<\/template>/igm.exec(data);
            if (a && a[1]) {
                var fn = new Function('return (' + a[1] + ')');
                var data = fn();
                data = data.slice(0, 10);
                data.forEach(function(item) {
                    var time = (new Date(item['data'])).toLocaleString();
                    time = time_reg.exec(time);
                    item['time'] = time && time[0] || ''
                });
                return data;
            }

            return []
        }
    },

    "fequan": {
        url: "http://fequan.com/",
        colum: ".review-list p",
        max: 10,
        handle: function($colum) {
            return {
                url: $colum.find('a').first().attr('href'),
                title: $colum.text().trim(),
                time: ''
            }
        }
    },


    "W3cplus": {
        url: "http://www.w3cplus.com/",
        colum: ".region-content .node-blog",
        handle: function($colum) {
            var time = $colum.find(".submitted").text().match(TIME_REG_2);
            return {
                url: $colum.find("h1>a").attr("href"),
                title: $colum.find("h1>a").text(),
                time: (time instanceof Array) ? time[0] : ""
            }
        }
    },

    "TangGuangYao": {
        url: "http://tangguangyao.github.io/archives/",
        colum: "article.post",
        handle: function($colum) {
            var time = $colum.find(".post-meta time").attr('content');
            return {
                url: 'http://tangguangyao.github.io' + $colum.find(".post-title-link").attr("href"),
                title: $colum.find(".post-title").text(),
                time: time
            }
        }
    },

    "Web前端开发": {
        url: "http://www.css88.com/",
        colum: ".site-content .post",
        handle: function($colum) {
            var time = $colum.find(".entry-date").text().match(TIME_REG_1);
            return {
                url: $colum.find(".entry-title a").attr("href"),
                title: $colum.find(".entry-title").text(),
                time: (time instanceof Array) ? time[0] : ""
            }
        }
    },

    "Isux": {
        url: "https://isux.tencent.com/category/fd",
        colum: ".masonry-post",
        handle: function($colum) {
            return {
                url: $colum.find("h2 a").attr("href"),
                title:$colum.find("h2 a").text(),
                time: $colum.find('.isux-date').text()
            }
        }
    },
};

var source = {};
var l = 0;
source.keys = [];
for (var k in sourceList) {
    source.keys.push(k);
    sourceList[k].max = 10;
    l++;
}
source.length = l;

source.forEach = function(callback) {
    var i = 0;
    for (var k in sourceList) {
        callback.call(sourceList[k], i, k);
        i++;
    }
};

source.get = function(id) {
    return sourceList[id]
};
