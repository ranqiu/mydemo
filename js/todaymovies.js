$(function() {
    var url = window.location.search.split('?')[1];
    var cityid = url.split('&')[0].split('=')[1]
    var movieid = url.split('&')[1].split('=')[1]
    $.ajax({
        url: 'http://v.juhe.cn/movie/movies.cinemas',
        type: 'get',
        data: {
            key: 'eb0c200a791a406d222c44240cabf7a2',
            cityid: cityid,
            movieid: movieid
        },
        dataType: 'jsonp',
        success: function(data) {
            var html = template('cinemaList', data);
            $('#cinema').html(html)
        }
    })
})
