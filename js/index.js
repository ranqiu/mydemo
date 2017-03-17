$(function() {
    $('#search').on('focus', function() {
        $(this).val('')
    })
    $('#btn').on('click', function() {
        var title = $('#search').val()
        if (title) {
            location.href = 'keyword.html?title=' + title
        }
    })
        //点击获取当前位置的经纬度
    $('#location').on('click', function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(geo_success, geo_error);
        } else {
            error('不支持Geolocation')
        }

    })

    function geo_success(position) {
        console.log(4444)
        var lat = position.coords.latitude.toFixed(5)
        var log = position.coords.longitude.toFixed(4)
        console.log(lat, log)
        location.href = 'location.html?lat=' + lat + '&log=' + log
    }

    function geo_error(err) {
        console.log(err)

    }
    //获取url
    var url = window.location.search;
    //城市名称
    var cityname,
        cityid;
    if (!url) {
        cityname = '上海';
        cityid = 1
    } else {
        cityname = decodeURI(window.location.search.split('?')[1].split('&')[0].split('=')[1]) || "上海市";
        cityid = decodeURI(window.location.search.split('?')[1].split('&')[1].split('=')[1])
    }
    $('.citya').html(cityname)

    //点击给a标签传递参数
    $('#city').on('click', function() {
        var city = $('#city').html()
        $('#city').attr('href', 'city.html?' + city)
    })
    $.ajax({
        url: 'http://v.juhe.cn/movie/movies.today',
        type: 'get',
        data: {
            key: 'eb0c200a791a406d222c44240cabf7a2',
            cityid: cityid
        },
        dataType: 'jsonp',
        success: function(data) {
            var html = template('hotMovies', data);
            $('#hot_showing').html(html)
            $('.movie_id').on('click', function() {
                var id = $(this).attr('movieid')
                $('.movie_id').attr('href', 'todaymovies.html?cityid=' + cityid + '&movieid=' + id)
            })
        }
    })


})
