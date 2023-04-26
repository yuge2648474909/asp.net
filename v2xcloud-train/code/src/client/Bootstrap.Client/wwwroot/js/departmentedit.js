$(function () {
    var $btn_update_submit = $("#btn_update_submit");
    $btn_update_submit.click(function () {

        //获取所有数据
        var id = parseInt($('#id')[0].value);
        var name = $('#name')[0].value;
        var name_en = $('#name_en')[0].value;
        var department_leader = $('#department_leader')[0].value;
        var department_id = $('#department_id')[0].value;
        var permission = $('#permission')[0].value;
       

        var data_post = {          //字段保持和model一致
            id:id,
            name: name,
            name_en: name_en,
            department_leader: department_leader,
            department_id: department_id,
            permission: permission

        };

        alert(JSON.stringify(data_post));

        $.bc({
            url: "api/ClientManagement/DepartmentEdit",
            method: 'post',
            data: data_post,
            //dataType: 'text', //注意返回值类型
            callback: function (result) {
                if (result.status == "success")
                    window.location.href = $.formatUrl('ClientManagement/DepartmentDetails/' + id);    //用这种方式实现跳转
                else
                    toastr.error(result.erro);
            }
        });

    });



    var id = parseInt($('#id')[0].value);
    $.bc({
        url: "api/ClientManagement/DepartmentDetails/" + id,
        //dataType: 'text', //注意返回值类型
        callback: function (result) {
           
            if (result.status == "success") {
                var name = result.department.name;
                var name_en = result.department.name_en;
                var department_leader = result.department.department_leader;
                var department_id = result.department.department_id;
                var permission = result.department.permission;

               
              

                $('#name')[0].value = name;
                $('#name_en')[0].value = name_en;
                $('#department_leader')[0].value = department_leader;
                $('#department_id')[0].value = department_id;
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