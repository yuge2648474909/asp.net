$(function () {

    var $create_submit_btn = $("#create_submit_btn");
    $create_submit_btn.click(function () {

        //获取所有数据
        var userid = $('#userid')[0].value;
        var nickname = $('#nickname')[0].value;
        var sex = $('#sex')[0].value;
        var province = $('#province')[0].value;
        var city = $('#city')[0].value;
        var country = $('#country')[0].value;
        var headimgurl = $('#headimgurl')[0].src;
        var unionid = $('#unionid')[0].value;
        var permission = $('#permission')[0].value;
        var open_userid = $('#open_userid')[0].value;

        var data_post = {          //字段保持和model一致
            userid: userid,
            nickname: nickname,
            sex: sex,
            province: province,
            city: city,
            country: country,
            headimgurl: headimgurl,
            unionid: unionid,
            permission: permission,
            open_userid: open_userid

        };



        $.bc({
            url: "api/ClientManagement/Create",
            method: 'post',
            data: data_post,
            //dataType: 'text', //注意返回值类型
            callback: function (result) {
                if (result.status == "success")
                    window.location.href = $.formatUrl('ClientManagement/StaffDetails/' + result.staff_id);    //用这种方式实现跳转
                else
                    toastr.error(result.erro);
            }
        });

    });

});


function return_without_save() {
    var return_without_save_button = "return_without_save_button";
    var return_without_save_span = "return_without_save_span";

    $("#" + return_without_save_button).hide();
    $("#" + return_without_save_span).show();

}


function cancelback(uniqueId) {
    var return_without_save_button = "return_without_save_button";
    var return_without_save_span = "return_without_save_span";

    $("#" + return_without_save_button).show();
    $("#" + return_without_save_span).hide();


}