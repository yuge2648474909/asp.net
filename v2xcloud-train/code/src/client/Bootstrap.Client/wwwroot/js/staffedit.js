$(function () {
    var $btn_update_submit = $("#btn_update_submit");
    $btn_update_submit.click(function () {

        //获取所有数据
        var id = parseInt($('#id')[0].value);
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
            id:id,
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
            url: "api/ClientManagement/StaffEdit",
            method: 'post',
            data: data_post,
            //dataType: 'text', //注意返回值类型
            callback: function (result) {
                if (result.status == "success")
                    window.location.href = $.formatUrl('ClientManagement/StaffDetails/' + id);    //用这种方式实现跳转
                else
                    toastr.error(result.erro);
            }
        });

    });



    var id = parseInt($('#id')[0].value);
    $.bc({
        url: "api/ClientManagement/Details/" + id,
        //dataType: 'text', //注意返回值类型
        callback: function (result) {
            if (result.status == "success") {
                var userid = result.staff.userid;
                var nickname = result.staff.nickname;
                var sex = result.staff.sex;
                var province = result.staff.province;
                var city = result.staff.city;
                var country = result.staff.country;
                var headimgurl = result.staff.headimgurl;
                var privilege = result.staff.privilege;
                var unionid = result.staff.unionid;
                var permission = result.staff.permission;
                var open_userid = result.staff.open_userid;

                $('#userid')[0].value = userid;
                $('#nickname')[0].value = nickname;
                $('#sex')[0].value = sex;
                $('#province')[0].value = province;
                $('#city')[0].value = city;
                $('#country')[0].value = country;
                $('#headimgurl')[0].src = headimgurl;
                $('#unionid')[0].value = unionid;
                $('#open_userid')[0].value = open_userid;
                $('#permission').lgbSelect('val', permission);

            }
            else
                toastr.error(result.erro);
        }
    });



})

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