$(function() {
    var title = decodeURI(window.location.search.split('?')[1].split('=')[1])
    $.ajax({
        url: 'http://v.juhe.cn/movie/index',
        type: 'get',
        data: {
            key: 'eb0c200a791a406d222c44240cabf7a2',
            title: title
        },
        dataType: 'jsonp',
        success: function(data) {
            if (data.result.length > 0) {
                var html = template('movies_infor', data)
                $('#moviesInfor').html(html)
            } else {
            	var html = '<p style="font-size:0.5rem;font-weight:900;text-align:center">404暂无资源</p>'
                $('body').html(html)
            }
        }
    })
})
;