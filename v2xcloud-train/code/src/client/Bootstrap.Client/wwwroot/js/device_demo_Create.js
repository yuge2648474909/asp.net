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
        var device_name = $('#device_name')[0].value;
        var dev_type = $('#dev_type')[0].value;
        var device_specification = $('#device_specification')[0].value;
        var device_address = $('#device_address')[0].value;
        var device_status = $('#device_status')[0].value;
        //var currentDate = new Date();

        var update_time = currentTime;
        //update_time.toString()
        //alert(type)

        var data_post = {          //字段保持和model一致
            Name: device_name,
            Device_type: dev_type,
            Device_specification: device_specification,
            Device_location: device_address,
            Device_status: device_status,
            Update_time: update_time
        };

        //alert(JSON.stringify(data_post));

        $.bc({
            url: "api/DeviceManagement/Create",
            method: 'post',
            data: data_post,
            //dataType: 'text', //注意返回值类型
            callback: function (result) {
                if (result.status == "success")

                    window.location.href = $.formatUrl('Device/DeviceDetail/' + result.Id);    //用这种方式实现跳转
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