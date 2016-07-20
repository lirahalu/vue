
$(function() {//取本地存储，存储上次查询的城市，在每次软件开启的时候自动查询
    if (!localStorage.getItem("city")) {
        localStorage.setItem("city", '嘉兴');
        $('#city').val(localStorage.getItem("city"));
    } else {
        $('#city').val(localStorage.getItem("city"));
    }
    $('#confirm').trigger("click");
});


$(function() {//回车事件设置默认为查询
    document.onkeydown = function(e) {
        var ev = document.all ? window.event: e;
        if (ev.keyCode == 13) {
            $('#confirm').trigger("click");
        }
    }
});



$("#confirm").on('click', function() {
    $("#tip").html('');//提示为空
    //存储查询的城市名
    localStorage.setItem("city", $('#city').val());
    //ajax查询数据
    $.ajax({
        type: "GET",
        url: "https://api.heweather.com/x3/weather",
        data: {
            city: $('#city').val(),
            'key': 'bb3b0349f73b481288ab058cc22d9d3b'
        },
        dataType: "json",
        success: function(data) {

                    var json = data["HeWeather data service 3.0"][0];
                          if (data["HeWeather data service 3.0"][0].status == "ok") {//如果返回状态成功则执行



                          var ve=new Vue({
                                    el:'#main',
                                    data:{
                                        js:json,
                                        now:json.basic.update.loc.substring(11, 17)
                                    }
                          });

                            alert(ve.$data.json.basic.city);


                    } else {
                        $("#tip").html('城市名称不对');
                    }


        }
    });



});