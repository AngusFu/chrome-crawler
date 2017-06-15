window.customData = {
    "risingstack": {
        "_c_": true,
        "url": "https://blog.risingstack.com/",
        "colum": ".main-inner article",
        "title": "h1 a",
        "time": ".post-time .fulldate",
        "link": "h1 a"
    },

    "thoughtram": {
        "_c_": true,
        "url": "http://blog.thoughtram.io/categories/angular-2/",
        "colum": ".thtrm-three-column-list li",
        "title": "h2",
        "time": "",
        "link": ".thtrm-cta.thtrm-cta--small"
    },

    "wolksoftware": {
        "_c_": true,
        "url": "http://blog.wolksoftware.com/",
        "colum": "#container article",
        "title": ".article_title a",
        "time": "",
        "link": ".article_title a"
    },
    
    "Nicholas Zakas": {
        "_c_": true,
        "url": "https://www.nczonline.net/",
        "colum": ".post-content .post-snippet",
        "title": ".post-head h3 a",
        "time": ".post-head .byline",
        "link": ".post-head h3 a"
    },
    
    "2ality": {
        "_c_":true,
        "url":"http://www.2ality.com/",
        "colum":"#page-core > div > div:not(.index-date)",
        "title":"h2 a",
        "time":".date-and-tags",
        "link":"h2 a"
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
        "_r_": true,
        url: "http://feed.cnblogs.com/blog/u/83633/rss",
        "colum": "feed.entry",
        "title": "title",
        "time": "published",
        "link": "id"
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
        url: 'https://imququ.com/post/archives.html',
        colum: '.entry-content > ul li',
        handle: function($colum) {
            return {
                url: $colum.find("a").attr("href"),
                title: $colum.find("a").text(),
                time: $colum.find("span").text()
            }
        }
    },

    "AlloyTeam": {
        url: "http://www.alloyteam.com/page/0/",
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
        "link": "a"
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

    "SVGTrick": {
        "_c_": true,
        "url": "http://svgtrick.com/",
        "colum": ".trick-card",
        "title": ".trick-card-title",
        "time": "",
        "link": ".trick-card-title",
        "max": "8"
    },

    "icodeit": {
        "_r_": true,
        "url": "http://icodeit.org/atom.xml",
        "colum": "feed.entry",
        "title": "title",
        "time": "updated",
        "link": "id"
    },

    "紫云飞": {
        "_c_": true,
        "url": "http://www.cnblogs.com/ziyunfei/",
        "colum": "#mainContent .day",
        "title": ".postTitle a",
        "time": ".postDesc",
        "link": ".postTitle a"
    },

    "jackpu": {
        "_c_": true,
        "url": "http://www.jackpu.com/tag/web/",
        "colum": ".content article",
        "title": ".post-title a",
        "time": ".post-date",
        "link": ".post-title a"
    },

    // "前端开发日报": {
    //     "_c_": true,
    //     "url": "https://github.com/kujian/frontendDaily/issues",
    //     "colum": ".Box-body.js-navigation-container .Box-body-row",
    //     "title": "a",
    //     "time": "",
    //     "link": "a",
    //     "max": 3
    // },

    "BaiduEFE": {
        "_c_": true,
        "url": "http://efe.baidu.com/",
        "colum": "main > .article-index",
        "title": "h2 a",
        "time": ".article-meta",
        "link": "h2 a"
    },

    "DDFE": {
        "_c_": true,
        "url": "https://defed.github.io/archives/",
        "colum": "#content article",
        "title": "h1 a span",
        "time": ".post-meta",
        "link": "h1 a"
    },

    "饿了么": {
        "_r_": true,
        "url": "https://fe.ele.me/rss/",
        "colum": "rss.channel.item",
        "title": "title",
        "time": "pubDate",
        "link": "link"
    },

    "css-tricks": {
        "_c_": true,
        "url": "https://css-tricks.com/",
        "colum": ".article-card",
        "title": "h2 a",
        "time": ".bar-time",
        "link": "h2 a"
    },
    "mumu": {
        "_c_": true,
        "url": "https://my.oschina.net/mumu/blog",
        "colum": ".list-item",
        "title": ".blog-title",
        "time": ".time",
        "link": ".blog-title"
    },
    "csswizardry": {
        "_c_": true,
        "url": "http://csswizardry.com/",
        "colum": ".list-ui__item",
        "title": ".post__title a",
        "time": ".post__time",
        "link": ".post__title a"
    },
    "simurai.com": {
        "_c_": true,
        "url": "http://simurai.com/blog/",
        "colum": ".Index-item--blog",
        "title": ".Index-meta h2",
        "time": ".Index-meta  time",
        "link": ".Index-meta"
    },
    "mgechev": {
        "_c_": true,
        "url": "http://blog.mgechev.com/posts/",
        "colum": "#index article",
        "title": "h2 a",
        "time": "",
        "link": "h2 a"
    },
    "tphangout": {
        "_c_": true,
        "url": "http://tphangout.com/",
        "colum": ".site-main > article",
        "title": ".entry-title a",
        "time": ".entry-date",
        "link": ".entry-title a"
    },

    "souche": {
        "_c_": true,
        "url": "https://blog.souche.com/",
        "colum": ".article-list > article",
        "title": ".c-post-list__title a",
        "time": ".c-post-list__meta",
        "link": ".c-post-list__title a"
    },

    "yubangweb": {
        "_c_": true,
        "url": "http://blog.yubangweb.com/",
        "colum": "#content .post",
        "title": ".post-title a",
        "time": ".post-date",
        "link": ".post-title a"
    },
    "developers.google.com": {
        "_c_": true,
        "url": "https://developers.google.com/web/updates/",
        "colum": ".devsite-landing-row-item",
        "title": "a",
        "time": "",
        "link": "a"
    },
    "今日头条技术": {
        "_c_": true,
        "url": "https://techblog.toutiao.com/",
        "colum": ".content  article",
        "title": ".article-title",
        "time": "time",
        "link": ".article-title"
    },
    "美团点评技术团队": {
        "_c_": true,
        "url": "http://tech.meituan.com/",
        "colum": ".post-list  article",
        "title": ".post-title a",
        "time": ".post-meta-ctime",
        "link": ".post-title a"
    },
    "人人网 FED": {
        "_c_": true,
        "url": "http://www.renfed.com",
        "colum": "#main-content  article",
        "title": ".posttitle a",
        "time": ".entry-date time",
        "link": ".posttitle a"
    }
}
