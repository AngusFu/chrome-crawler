;(function () {
    let re_zh  = /(\d{4})\s*[^x00-xff]\s*(\d{1,2})\s*[^x00-xff]\s*(\d{1,2})\s*[^x00-xff]/,
    re_ymd = /\d{4}([\/\-\.])\d{1,2}(\1)\d{1,2}/,
    re_mdy = /\d{1,2}([\/\-\.])\d{1,2}(\1)\d{4}/,
    re_en  = new RegExp([
        /(\w{3}) (\w{3}) (\d{2}) (\d{4})/.source, // DateString
        /(\w{3}), (\d{2}) (\w{3}) (\d{4}) ((\d{2}):(\d{2}):(\d{2})) GMT/.source, // UTC
        /(\w{3}) (\w{3}) (\d{2}) (\d{4}) ((\d{2}):(\d{2}):(\d{2})) GMT\+\d{4}/.source, // Greenwich
        /(\d{4})-(\d{2})-(\d{2})T((\d{2}):(\d{2}):(\d{2}))\.(\d{3})Z/.source, // ISO
    ].join('|'), 'm');

    window.getDate = function(strdate = '') {
        var tmp = null;
        if (!strdate) return strdate;

        strdate = String(strdate);
            
        if (tmp = strdate.match(re_zh)) {
            return ymd([tmp[1], tmp[2], tmp[3]].join('/'));
        }

        if (tmp = strdate.match(re_ymd)) {
            return ymd(tmp[0].replace(/[\/\-\.]/g, '/'));
        }

        if (tmp = strdate.match(re_mdy)) {
            return ymd(tmp[0].replace(/[\/\-\.]/g, '/'));
        }

        if (tmp = strdate.match(re_en)) {
            return ymd(new Date(tmp[0]))
        };

        return '';
    };

    function ymd(d) {
        var pad = function (i) {
            return (i < 10 ? '0' : '') + i;
        };
        d = typeof d === 'string' ? new Date(d) : d;
        return [ d.getFullYear(), d.getMonth() + 1, d.getDate() ].map(pad).join('-');
    }
}());