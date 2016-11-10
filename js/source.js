
var TIME_REG_1 = /\d{4}[^x00-xff]\d{1,2}[^x00-xff]\d{1,2}[^x00-xff]/; //匹配XXXX年XX月XX日
var TIME_REG_2 = /\d{4}-\d{1,2}-\d{1,2}/; //匹配XXXX-XX-XX
var TIME_REG_3 = /\d{4}\/\d{2}\/\d{2}/; //匹配XXXX/XX/XX
var TIME_REG_4 = /\d{4}\.\d{2}\.\d{2}/; //匹配XXXX.XX.XX
var time_reg = /\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/;

var sourceList = {
    "ngUniversity": {
        "_c_": true,
        "url": "http://blog.angular-university.io/",
        "colum": "article.post",
        "title": ".post-title a",
        "time": ".post-date",
        "link": ".post-title a",
        "max": "10"
    },
    "Angular@vsavkin": {
        url: "https://vsavkin.com/@vsavkin",
        // "colum": ".blockGroup-list>div",
        parse: function (data, raw) {
            raw = raw.replace(/src=/gim, 'xsrc=')
                .replace(/<img\s*src=/gim, 'xsrc=')
                .replace(/srcset=/gim, 'xsrcset=');
            
            return Array.from($(raw).find('.js-profileStreamBlock .streamItem-card')).slice(0, 5).map(function (el) {
                var $link = $(el).find('.layoutSingleColumn a');
                return {
                    title: $link.find('h3').text(),
                    url: $link.attr('href')
                }
            });
        },
        // "title": ".postArticle a h3",
        // "time": "",
        // "link": ".postArticle a",
        "max": 5
    },
    "thoughtram": {
        "_c_": true,
        "url": "http://blog.thoughtram.io/categories/angular-2/",
        "colum": ".thtrm-three-column-list li",
        "title": "h2",
        "time": "",
        "link": ".thtrm-cta.thtrm-cta--small",
        "max": 5
    },
    "Angular@mgechev": {
        "_c_": true,
        "url": "http://blog.mgechev.com/posts/",
        "colum": "#index article",
        "title": "h2 a",
        "time": "",
        "link": "h2 a",
        "max": "5"
    },
    "Angular@toddmotto": {
        "_c_": true,
        "url": "https://toddmotto.com/",
        "colum": ".posts .post-single",
        "title": ".post-single__title a",
        "time": ".post__meta",
        "link": ".post-single__title a",
        "max": "5"
    },
    "wolksoftware": {
        "_c_": true,
        "url": "http://blog.wolksoftware.com/",
        "colum": "#container article",
        "title": ".article_title a",
        "time": "",
        "link": ".article_title a",
        "max": "5"
    },
    
    "Nicholas Zakas": {
        "_c_": true,
        "url": "https://www.nczonline.net/",
        "colum": ".post-content .post-snippet",
        "title": ".post-head h3 a",
        "time": ".post-head .byline",
        "link": ".post-head h3 a",
        "max": "6"
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
        url: 'http://www.zcfy.cc/article/archive',
        colum: '.article-list ol li',
        handle: function($colum) {
            return {
                url: $colum.find('a').attr('href'),
                title: $colum.find('a').text(),
                time: ''
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
        colum: '.entry-content ul li',
        handle: function($colum) {
            return {
                url: $colum.find("a").attr("href"),
                title: $colum.find("a").text(),
                time: $colum.find("span").text()
            }
        }
    },


    "QuQu": {
        url: 'https://imququ.com/archives.html',
        colum: '.entry-content > ul li',
        handle: function($colum) {
            return {
                url: $colum.find("a").attr("href"),
                title: $colum.find("a").text(),
                time: $colum.find("span").text()
            }
        }
    },

    // 无能为力啊
    // link:</content/images/2015/10/avatar.jpg>; rel=preload; as=image
    // link:</assets/css/screen.css?v=24b6e847ee>; rel=preload; as=style
    // link:<//www.qianduan.net/img/give-me-five/qianduan_wechat.jpg>; rel=preload; as=image
    // link:<//www.qianduan.net/img/give-me-five/da-shang.jpg>; rel=preload; as=image
    // link:</content/images/2015/10/avatar.jpg>; rel=preload; as=image
    // link:</content/images/2015/10/avatar.jpg>; rel=preload; as=image
    // link:</content/images/2015/10/avatar.jpg>; rel=preload; as=image
    // link:</content/images/2015/10/avatar.jpg>; rel=preload; as=image
//     "前端观察": {
//         url: "https://www.qianduan.net/",
//         colum: ".main-content .post",
//         handle: function($colum) {
//             return {
//                 url: $colum.find(".post-title a").attr("href"),
//                 title: $colum.find(".post-title a").text(),
//                 time: $colum.find(".post-date").attr("datetime")
//             }
//         }
//     },

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

    "meowni.ca": {
        "_c_": true,
        "url": "http://meowni.ca/",
        "colum": ".listing li",
        "title": "a",
        "time": "span",
        "link": "a",
        "max": "6"
    },

    // "FEX": {
    //     url: "http://fex.baidu.com/",
    //     colum: ".container .post-list>li",
    //     handle: function($colum) {
    //         var time = $colum.find(".date").text().split(" ");
    //         time = time.slice(time.length - 3, time.length).join(" ");
    //         return {
    //             url: $colum.find("a").attr("href"),
    //             title: $colum.find("p").text(),
    //             time: time
    //         }
    //     }
    // },


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
        url: "https://aotu.io/fragments/index/",
        colum: '.mod-post',
        handle: function($colum) {
            var url = $colum.find("a").attr("href");
            var time = url.match(time_reg);
            return {
                url: $colum.find("a").attr("href"),
                title: $colum.find("a").attr("title"),
                time: (time instanceof Array) ? time[0] : ""
            }
        }
    },

//     "fequan": {
//         url: "http://fequan.com/",
//         colum: ".review-list p",
//         handle: function($colum) {
//             return {
//                 url: $colum.find('a').first().attr('href'),
//                 title: $colum.text().trim(),
//                 time: ''
//             }
//         }
//     },

    // "TangGuangYao": {
    //     url: "http://tangguangyao.github.io/archives/",
    //     colum: "article.post",
    //     handle: function($colum) {
    //         var time = $colum.find(".post-meta time").attr('content');
    //         return {
    //             url: 'http://tangguangyao.github.io' + $colum.find(".post-title-link").attr("href"),
    //             title: $colum.find(".post-title").text(),
    //             time: time
    //         }
    //     }
    // },

    // "Web前端开发": {
    //     url: "http://www.css88.com/",
    //     colum: ".site-content .post",
    //     handle: function($colum) {
    //         var time = $colum.find(".entry-date").text().match(TIME_REG_1);
    //         return {
    //             url: $colum.find(".entry-title a").attr("href"),
    //             title: $colum.find(".entry-title").text(),
    //             time: (time instanceof Array) ? time[0] : ""
    //         }
    //     }
    // },

    // "Isux": {
    //     url: "https://isux.tencent.com/category/fd",
    //     colum: ".masonry-post",
    //     handle: function($colum) {
    //         return {
    //             url: $colum.find("h2 a").attr("href"),
    //             title:$colum.find("h2 a").text(),
    //             time: $colum.find('.isux-date').text()
    //         }
    //     }
    // },
};

window.customData && $.extend(sourceList, customData);

// 从 localStorage 中读取用户自定义的配置
//    _c_: true
//    url: 'http://xxx.com/blog'
//    colum: '.colum'
//    title: '.xxx a'
//    time: '.xxx span'
//    link: '.xxx a'
//    max: 10
var cacheData = localStorage['__user__data__'];
try {
    cacheData = JSON.parse(cacheData);
} catch (e) {
    cacheData = {};
}
$.extend(sourceList, cacheData);

var source = {};
var l = 0;
source.keys = [];
for (var k in sourceList) {
    source.keys.push(k);
    sourceList[k].max = sourceList[k].max || 5;
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
