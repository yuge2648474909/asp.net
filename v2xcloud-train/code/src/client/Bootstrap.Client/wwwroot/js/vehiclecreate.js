
$(function () {

    var $create_submit_btn = $("#create_submit_btn");
    $create_submit_btn.click(function () {

        //获取所有数据
        var name = $('#name')[0].value;
        var type = $('#type')[0].value;


        //alert(type)

        var data_post = {          //字段保持和model一致
            name: name,
            type: type
          
        };

        //alert(JSON.stringify(data_post));

        $.bc({
            url: "api/VehicleManagement/Create",
            method: 'post',
            data: data_post,
            //dataType: 'text', //注意返回值类型
            callback: function (result) {
                if (result.status == "success")
                    window.location.href = $.formatUrl('VehicleManagement/VehicleDetail/' + result.Id);    //用这种方式实现跳转
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