$(function () {

    var $create_submit_btn = $("#create_submit_btn");
    $create_submit_btn.click(function () {

        var currentDate = new Date();
        var year = currentDate.getFullYear();
        var month = String(currentDate.getMonth() + 1).padStart(2, '0');
        var day = String(currentDate.getDate()).padStart(2, '0');
        var hour = String(currentDate.getHours()).padStart(2, '0');
        var minute = String(currentDate.getMinutes()).padStart(2, '0');
        var second = String(currentDate.getSeconds()).padStart(2, '0');
        var currentTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;

        //获取所有数据
        var name = $('#name')[0].value;
        var comment = $('#comment')[0].value;
        var updateTime = currentTime;
        var type = "文件夹";
        
        //alert(type)

        var data_post = {          //字段保持和model一致
            Name: name,
            Comment: comment,
            Update_time: updateTime,
            Type : type
        };

        $.bc({
            url: "api/ResourceManagement/Create",
            method: 'post',
            data: data_post,
            //dataType: 'text', //注意返回值类型
            callback: function (result) {
                if (result.status == "success")
                    //lgbSwal({ title: '插入资源成功，即将跳转到主页面', type: "warning" });
                    window.location.href = $.formatUrl('ResourceManagement/ResourceList');
                    //window.location.href = $.formatUrl('ResourceManagement/ResourceList');    //用这种方式实现跳转
                else
                    toastr.error(result.erro);
            }
        });

    })

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