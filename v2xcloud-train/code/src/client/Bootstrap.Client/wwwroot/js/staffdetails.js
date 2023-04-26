$(function () {

    var id = parseInt($('#id')[0].value);
    $.bc({
        url: "api/ClientManagement/Details/" + id,
        //dataType: 'text', //注意返回值类型
        callback: function (result) {
            if (result.status == "success") {
                var openid = result.staff.openid;
                var nickname = result.staff.nickname;
                var sex = result.staff.sex;
                var province = result.staff.province;
                var city = result.staff.city;
                var country = result.staff.country;
                var headimgurl = result.staff.headimgurl;
                var privilege = result.staff.privilege;
                var unionid = result.staff.unionid;
                var userid = result.staff.userid;
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
                if (permission==0)
                    $('#permission')[0].value = "拒绝";
                else
                    $('#permission')[0].value = "允许";

            }
            else
                toastr.error(result.erro);

        }
    });

})

