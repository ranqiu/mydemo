$(function() {
    var cityname = decodeURI(window.location.search.split('?')[1])
    $('#city').html(cityname)
    $.ajax({
        url: 'http://v.juhe.cn/movie/citys',
        type: 'get',
        data: {
            key: 'eb0c200a791a406d222c44240cabf7a2'
        },
        dataType: 'jsonp',
        success: function(data) {
            var html = template('cityId',data)
            $('#cityname').html(html)
        }
    })


})
