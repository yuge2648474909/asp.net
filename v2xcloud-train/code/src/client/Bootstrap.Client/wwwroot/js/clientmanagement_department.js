$(function () {
    var $table = $('#list');

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
        url: "api/ClientManagement/InitDepartmentList",
        dataBinder: {
            map: {
                name: "#name",
                name_en: "#name_en",
                department_leader: "#department_leader",
                company: "#company"
            }
        },
        smartTable: {
            sortName: 'name',
            queryParams: function (params) {
                return $.extend(params, {
                    name: $('#name').val(),
                    name_en: $("#name_en").val(),
                    department_leader: $("#department_leader").val(),
                    company: $("#company").val()
                });
            },
            columns: [
                { title: "id", field: "id", sortable: true },
                { title: "部门名称", field: "name", sortable: true },
                { title: "部门名称en", field: "name_en", sortable: true },
                { title: "部门领导", field: "department_leader", sortable: true },
                { title: "微信部门id", field: "department_id", sortable: true },
                {
                    title: "权限", field: "permission", sortable: true, formatter: function (value, row, index) {
                        if (value == "0")
                            return "拒绝";
                        else
                            return "允许";
                    }
                },
                {
                    field: 'operate',
                    title: '操作',
                    align: 'center',
                    clickToSelect: false,
                    formatter: function (value, row, index) {
                        return [
                            '<div class="btn-group">',
                            '<a class="details btn btn-info btn-sm" href="/ClientManagement/DepartmentDetails/' + row.id + '"><i class="fa fa-eye"></i><span>查看</span></a>',
                            '<a class="edit btn btn-primary btn-sm" href="/ClientManagement/DepartmentEdit/' + row.id + '"><i class="fa fa-edit"></i><span>编辑</span></a>',
                            '<button type="button" class="delete btn btn-danger"><i class="fa fa-trash"></i><span>删除</span></button>',
                            '</div >'
                        ].join('')
                    },
                    events: {
                        'click .delete': function (e, value, row, index) {
                            swal($.extend({}, swalDeleteOptions)).then(function (result) {
                                if (result.value) {
                                    $.bc({
                                        url: "api/ClientManagement/DepartmentDelete_single/" + row.id,
                                        method: 'get',
                                        callback: function (result) {
                                            if (result) $table.bootstrapTable('refresh');
                                        }
                                    });
                                }
                            });
                        }
                    }
                }
            ]
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
                        url: "api/ClientManagement/DepartmentDelete", data: iDs, method: 'post',
                        callback: function (result) {
                            if (result) $table.bootstrapTable('refresh');
                        }
                    });
                }
            });

    });

    
    var $button_department = $('#button_department');
    $button_department.click(function () {
        $.bc({
            url: "api/ClientManagement/GetDepartment", method: 'get',
            callback: function (result) {
                alert(result.name);
            }
        });

    });


    var $button_synch = $("#button_synch");
    $button_synch.click(function () {

        $.bc({
            url: "api/ClientManagement/CheckAuth",
            method: 'get',
            callback: function (result) {
                if (result == false) {
                    lgbSwal({ title: '公司尚未授权，无法同步通讯录！', type: "error" });
                    $("#dialogNew_contact").modal("hide");
                } else {
                    $("#dialogNew_contact").modal("show");

                    $("#staff_list_table").lgbTable({
                        url: "api/ClientManagement/SynchContactDepartment",
                        smartTable: {
                            toolbar: true,
                            search: false,
                            showToggle: true,
                            showRefresh: true,
                            showColumns: true,
                            showAdvancedSearchButton: true,
                            showExport: false,
                            pagination: true,
                            checkbox: true,
                            height: 400,
                            columns: [
                                { title: "id", field: "id" },
                                { title: "部门名称", field: "name" },
                                { title: "部门名称en", field: "name_en" },
                                { title: "部门领导", field: "department_leader" },
                                { title: "部门id", field: "department_id" }
                            ]
                        }
                    });
                }
            }
        });      

    });

    var $confirm_syn_dlg = $("#confirm_syn_dlg");
    $confirm_syn_dlg.click(function () {

        var selected_rows = $("#staff_list_table").bootstrapTable('getSelections');
        if (selected_rows.length == 0)
            lgbSwal({ title: '请选择一个要同步的数据', type: "warning" });
        else {
            var users = selected_rows.map(function (element) {
                return {
                    id: element.id,
                    name: element.name,
                    name_en: element.name_en,
                    department_leader: element.department_leader,
                    department_id: element.department_id
                };
            });
            $.bc({
                url: "api/ClientManagement/Syn_confirmed_list_department",
                method: 'post',
                data: users,
                //dataType: 'text', //注意返回值类型
                callback: function (result) {
                    if (result.status == "success")
                        toastr.success("更新成功！");
                    else
                        toastr.error(result.erro);
                    $("#dialogNew_contact").modal("hide");
                    $table.bootstrapTable('refresh');
                }
            });


          
        }

    });


});
