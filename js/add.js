$('#addRes').click(function() {
    $('#addPopCon').fadeIn(500);
});

$('#addPopCon').on('click', function(e) {
    if ($(e.target).attr('id') === 'addPopCon') {
        $('#addPopCon').fadeOut(500);
    }
});

$('#addPop button').click(function() {
    var cacheData = localStorage['__user__data__'];

    try {
        cacheData = JSON.parse(cacheData || '{}');
    } catch (e) {
        cacheData = {};
    }

    var name  = $('#sietName').val().trim(),
        url   = $('#siteURL').val().trim(),
        colum = $('#siteColum').val().trim(),
        title = $('#colTitle').val().trim(),
        link  = $('#colLink').val().trim(),
        time  = $('#colTime').val().trim(),
        max   = $('#maxCount').val().trim();

    if (name && url && colum && title && link) {
        cacheData[name] = {
            _c_: true,
            url: url,
            colum: colum,
            title: title,
            time: time,
            link: link,
            max: max || 10
        };

        localStorage['__user__data__'] = JSON.stringify(cacheData);
        location.reload();
    } else {
        alert('输入有误!');
    }
});