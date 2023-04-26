//更新
$(function () {
    //点击提交
    var $btn_update_submit = $("#btn_update_submit");

    $btn_update_submit.click(function () {

        //获取所有数据
        var id = parseInt($('#id')[0].value);
        var device_name = $('#device_name')[0].value;
        var dev_type = $('#dev_type')[0].value;
        var device_specification = $('#device_specification')[0].value;
        var device_location = $('#device_location')[0].value;
        var device_status = $('#device_status')[0].value;
        var update_time = $('#update_time')[0].value;


        var data_post = {          //字段保持和model一致
            Id: id,
            Name: device_name,
            Device_type: dev_type,
            Device_specification: device_specification,
            Device_location: device_location,
            Device_status: device_status,
            Update_time: update_time
        };

        //alert(JSON.stringify(data_post))
        //将信息传递给控制器
        $.bc({
            url: "api/DeviceManagement/DeviceEdit",
            method: 'post',
            data: data_post,
            //dataType: 'text', //注意返回值类型
            callback: function (result) {
                if (result.status == "success")
                    window.location.href = $.formatUrl('Device/DeviceDetail/' + id);    //用这种方式实现跳转
                else
                    toastr.error(result.erro);
            }
        });

    });



    var id = parseInt($('#id')[0].value);
    $.bc({
        url: "api/DeviceManagement/Details/" + id,
        //dataType: 'text', //注意返回值类型
        callback: function (result) {
            if (result.status == "success") {
                var name = result.device.Name;
                var type = result.device.Device_type;
                var specification = result.device.Device_specification;
                var location = result.device.Device_location;
                var status = result.device.Device_status;
                var time = result.device.Update_time;


                $('#device_name')[0].value = name;
                $('#dev_type')[0].value = type;
                $('#device_specification')[0].value = specification;
                $('#device_location')[0].value = location;
                $('#device_status')[0].value = status;
                $('#update_time')[0].value = time;


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