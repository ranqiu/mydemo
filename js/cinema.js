$(function() {
    var cinemaid = window.location.search.split('?')[1].split('=')[1]
    $.ajax({
        url: 'http://v.juhe.cn/movie/cinemas.movies',
        type: 'get',
        data: {
            key: 'eb0c200a791a406d222c44240cabf7a2',
            cinemaid: cinemaid
        },
        dataType: 'jsonp',
        success: function(data) {
            var html = template('cinemaInfo', data)
            $('#cinema_info').html(html)
                //海报
            var poster = template('moviesInfo', data)
            $('#poster').html(poster)
                //让中间的图片宽度最大
                //li标签的宽度
            var liwidth = $('.poster_pic').outerWidth()
            var currentX = 0;
            $('.poster_pic>img:eq(0)').removeClass('pic_current')
            //页面加载进来 默认是第一个电影的演播厅
            getData(0)

            $('.poster_pic>img').each(function(i, v) {
                $(this).on('click', function(e) {
                    currentX = -i * liwidth
                    getData(i)
                    $('.poster_pic>img').addClass('pic_current')
                    $(this).toggleClass('pic_current')
                    $('.poster_pic').removeClass('current')
                    $(this).parent().addClass('current')
                    if (i <= (index - 4)) {
                        $('#poster').css({
                            'transform': 'translateX(-' + (i * liwidth) + 'px)',
                            'transition': '0.2s all'
                        })
                    }
                })
            })



            //图片轮播效果
            var startX, endX, moveX;
            //当前的滑动位置
            currentX = currentX || 0;
            //当前的滑动距离
            var distanceX = 0;
            var index = $('.poster_pic').length
            var minSwipe = -(index - 5) * liwidth
            var maxSwipe = 0
            $('.poster_info').on('touchstart', function(e) {
                startX = e.originalEvent.touches[0].clientX
            })
            $('.poster_info').on('touchmove', function(e) {
                moveX = e.originalEvent.touches[0].clientX;
                distanceX = moveX - startX;
                //当超过了最大滑动的位置 就不让滑动  小于最大滑动距离才设置滑动
                if ((currentX + distanceX) < (maxSwipe + 20) && (currentX + distanceX) > (minSwipe - 50)) {
                    $('#poster').css("transform", "translateX(" + (currentX + distanceX) + "px)");
                    $('#poster').css("transition", "none");
                }

            })
            $('.poster_info').on('touchend', function(e) {
                endX = e.originalEvent.changedTouches[0].clientX;
                currentX += distanceX;
                //松开手的时候要弹回去
                if (currentX > maxSwipe) {
                    currentX = maxSwipe;
                    $('#poster').css("transform", "translateX(" + currentX + "px)");
                    $('#poster').css("transition", "0.2s all");
                } else if (currentX < minSwipe) {
                    currentX = minSwipe;
                    $('#poster').css({
                        "transform": "translateX(" + currentX + "px)",
                        "transition": "0.2s all"
                    })
                }
            })
        }
    })

    function getData(index) {
        $.ajax({
            url: 'http://v.juhe.cn/movie/cinemas.movies',
            type: 'get',
            data: {
                key: 'eb0c200a791a406d222c44240cabf7a2',
                cinemaid: cinemaid
            },
            dataType: 'jsonp',
            success: function(data) {
                var data = data.result.lists[index]
                var hall = template('movieHall', data)
                $('#movie_hall').html(hall)
            }
        })
    }



})
