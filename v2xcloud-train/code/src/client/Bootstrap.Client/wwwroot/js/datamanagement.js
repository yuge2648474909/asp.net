$(function () {
    var $table = $('table');

    var swalDeleteOptions = {
        title: "删除数据",
        html: '您确定要删除选中的所有数据吗',
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: "我要删除",
        cancelButtonText: "取消"
    };

    $table.lgbTable({
        url: "api/DataManagement/InitLogList",
        dataBinder: {
            map: {
                userid: "#userid",
                nickname: "#nickname",
                company: "#company",
                role: "#role",
                login_time: "#login_time",
                logout_time: "#logout_time"
            }
        },
        smartTable: {
            sidePagination: "client",
            //sortName: 'nickname',
            pageSize: 100,
            pageList: [100, 200, 400, 1000],
            queryParams: function (params) {
                return $.extend(params, {
                    userid: $('#userid').val(),
                    nickname: $("#nickname").val(),
                    company: $("#company").val(),
                    role: $("#role").val(),
                    login_time: $("#login_time").val(),
                    logout_time: $("#logout_time").val()
                });
            },
            columns: [
                { title: "用户id", field: "userid", sortable: true },
                { title: "昵称", field: "nickname", sortable: true },
                { title: "公司", field: "company", sortable: true },
                { title: "职位", field: "role", sortable: true },
                //{ title: "凭证", field: "user_token_session", sortable: true },
                { title: "登录时间", field: "login_time", sortable: true },
                { title: "登出时间", field: "logout_time", sortable: true },               
            ],
            exportOptions: {
                fileName: "登录日志"
            }
        }
    });



    var $button_delete = $('#button_delete');
    $button_delete.click(function () {
        var selected_rows = $table.bootstrapTable('getSelections');
        if (selected_rows.length == 0)
            lgbSwal({ title: '请选择一个要删除的数据', type: "warning" });
        else
            swal($.extend({}, swalDeleteOptions)).then(function (result) {
                if (result.value) {
                    var iDs = $table.bootstrapTable('getSelections').map(function (element) { return element.id; });
                    $.bc({
                        url: "api/ClientManagement/Delete", data: iDs, method: 'post',
                        callback: function (result) {
                            if (result) $table.bootstrapTable('refresh');
                        }
                    });
                }
            });

    })


    var $create_submit_btn = $("#create_submit_btn");
    $create_submit_btn.click(function () {

        //获取所有数据
        var openid = $('#openid')[0].value;
        var nickname = $('#nickname')[0].value;
        var sex = $('#sex')[0].value;
        var province = $('#province')[0].value;
        var city = $('#city')[0].value;
        var country = $('#country')[0].value;
        var headimgurl = $('#headimgurl')[0].value;
        var privilege = $('#privilege')[0].value;


        var data_post = {          //字段保持和model一致
            openid: openid,
            nickname: nickname,
            sex: sex,
            province: province,
            city: city,
            country: country,
            headimgurl: headimgurl,
            privilege: privilege

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


function MessageSender() {

    $.bc({
        url: "api/DataManagement/MessageSender",
        method: 'get',
        callback: function (result) {
           
        }
    });

}