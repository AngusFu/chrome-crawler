

$('#addRSS').click(function() {
    $('#rssPopCon').fadeIn(500);
});

$('#rssPopCon').on('click', function(e) {
    if ($(e.target).attr('id') === 'rssPopCon') {
        $('#rssPopCon').fadeOut(500);
    }
});
$('#rssPop button').click(function() {
    var cacheData = localStorage['__user__data__'];

    try {
        cacheData = JSON.parse(cacheData || '{}');
    } catch (e) {
        cacheData = {};
    }

    var name = $('#rssName').val().trim(),
        url  = $('#rssURL').val().trim(),
        colum = $('#rssRoute').val().trim(),
        title = $('#rssTitle').val().trim(),
        time = $('#rssTime').val().trim(),
        link = $('#rssLink').val().trim(),
        max  = $('#rssMax').val().trim();

    if (name && url) {
        cacheData[name] = {
            _r_: true,
            url: url,
            colum: colum,
            title: title || 'title',
            time: time,
            link: link || 'link',
            max: max || 10
        };

        localStorage['__user__data__'] = JSON.stringify(cacheData);
        location.reload();
    } else {
        alert('输入有误!');
    }
});