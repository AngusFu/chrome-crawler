
var TIME_REG_1 = /\d{4}[^x00-xff]\d{1,2}[^x00-xff]\d{1,2}[^x00-xff]/; //匹配XXXX年XX月XX日
var TIME_REG_2 = /\d{4}-\d{1,2}-\d{1,2}/; //匹配XXXX-XX-XX
var TIME_REG_3 = /\d{4}\/\d{2}\/\d{2}/; //匹配XXXX/XX/XX
var TIME_REG_4 = /\d{4}\.\d{2}\.\d{2}/; //匹配XXXX.XX.XX
var time_reg = /\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/;

var sourceList = {};

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
