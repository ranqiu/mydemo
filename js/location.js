$(function() {
    var url = window.location.search.split('?')[1]
    var lat = url.split('&')[0].split('=')[1]
    var lon = url.split('&')[1].split('=')[1]
    $.ajax({
        url: 'http://v.juhe.cn/movie/cinemas.local',
        type: 'get',
        data: {
            key: 'eb0c200a791a406d222c44240cabf7a2',
            lat: lat,
            lon: lon,
            radius: '3000'
        },
        dataType: 'jsonp',
        success: function(data) {
            if (data.result.length > 0) {
                var html = template('cinemaLocation', data)
                $('#location').html(html)
                
            } else {
                var html = '<li style="text-align:center;font-size:0.5rem">当前位置附近没有影院,请重新定位</li>'
                $('#location').html(html)
            }
        }
    })


})
