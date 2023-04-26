//更新
$(function () {
    //点击提交
    var $btn_update_submit = $("#btn_update_submit");

    $btn_update_submit.click(function () {

        //获取所有数据
        var id = parseInt($('#id')[0].value);
        var name = $('#name')[0].value;
        var type = $('#type')[0].value;
       

        var data_post = {          //字段保持和model一致
            Id: id,
            Name: name,
            Type: type
         
        };

        //alert(JSON.stringify(data_post))
        //将信息传递给控制器
        $.bc({
            url: "api/VehicleManagement/VehicleEdit",
            method: 'post',
            data: data_post,
            //dataType: 'text', //注意返回值类型
            callback: function (result) {
                if (result.status == "success")
                    window.location.href = $.formatUrl('VehicleManagement/VehicleDetail/' + id);    //用这种方式实现跳转
                else
                    toastr.error(result.erro);
            }
        });

    });



    var id = parseInt($('#id')[0].value);
    $.bc({
        url: "api/VehicleManagement/Details/" + id,
        //dataType: 'text', //注意返回值类型
        callback: function (result) {
            if (result.status == "success") {
                var name = result.vehicle.Name;
                var type = result.vehicle.Type;
              

                $('#name')[0].value = name;
                $('#type')[0].value = type;
               

            }
            else
                toastr.error(result.erro);
        }
    });



})

//点击返回显示的功能
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