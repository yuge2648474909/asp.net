$(function () {

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
                if(permission==0)
                    $('#permission')[0].value = "拒绝";
                else
                    $('#permission')[0].value = "允许";

            }
            else
                toastr.error(result.erro);

        }
    });

})

