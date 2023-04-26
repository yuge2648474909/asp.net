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


    var swalAuthOptions = {
        title: "一键授权",
        html: '您确定要给选中的所有员工授权吗',
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#dc3545',
        cancelButtonColor: '#6c757d',
        confirmButtonText: "我要授权",
        cancelButtonText: "取消"
    };

    $table.lgbTable({
        url: "api/ClientManagement/InitStaffList",
        dataBinder: {
            map: {
                userid: "#userid",
                nickname: "#nickname",
                sex: "#sex",
                province: "#province",
                city: "#city",
                company: "#company"               
            }
        },
        smartTable: {
            sortName: 'userid',
            queryParams: function (params) {
                return $.extend(params, {
                    userid: $('#userId').val(),
                    nickname: $("#nickname").val(),
                    province: $("#province").val(),
                    city: $("#city").val(),
                    company: $("#company").val(),
                    department: $("#department").val()
                });
            },
            columns: [
                { title: "昵称", field: "nickname", sortable: true },
                { title: "用户id", field: "userid", sortable: true },
                { title: "用户id_open", field: "open_userid", sortable: true },
                {
                    title: "性别", field: "sex", sortable: true, formatter: function (value, row, index) {
                        if (value == "1")
                            return "男";
                        else if (value == "2")
                            return "女";
                        else
                            return "";
                    }
                },
                { title: "省份", field: "province", sortable: true },
                { title: "城市", field: "city", sortable: true },
                { title: "国家", field: "country", sortable: true },
                {
                    title: "用户头像", field: "headimgurl", sortable: false, align: 'center', formatter: function (value, row, index) {
                        return value ? $.format('<img src="{0}" height="60"/>', value) : "";
                    }
                },
                { title: "公司", field: "company", sortable: true },
                { title: "部门", field: "department", sortable: true },
                { title: "职位", field: "role", sortable: true },
                {
                    title: "登录", field: "permission", sortable: true,
                    formatter: function (value, row, index) {
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
                            '<a class="details btn btn-info btn-sm" href="/ClientManagement/StaffDetails/' + row.id + '"><i class="fa fa-eye"></i><span>查看</span></a>',
                            '<a class="edit btn btn-primary btn-sm" href="/ClientManagement/StaffEdit/' + row.id + '"><i class="fa fa-edit"></i><span>编辑</span></a>',
                            '<button type="button" class="delete btn btn-danger"><i class="fa fa-trash"></i><span>删除</span></button>',
                            '</div >'
                        ].join('')
                    },
                    events: {
                        'click .delete': function (e, value, row, index) {
                            swal($.extend({}, swalDeleteOptions)).then(function (result) {
                                if (result.value) {
                                    $.bc({
                                        url: "api/ClientManagement/Delete_single/"+row.id,
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
            ],
            exportOptions: {
                fileName: "设备名称",
                ignoreColumn: [0, 5]
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


    var $button_auth = $('#button_auth');
    $button_auth.click(function () {
        var selected_rows = $table.bootstrapTable('getSelections');
        if (selected_rows.length == 0)
            lgbSwal({ title: '请选择要授权的员工', type: "warning" });
        else
            swal($.extend({}, swalAuthOptions)).then(function (result) {
                if (result.value) {
                    var iDs = $table.bootstrapTable('getSelections').map(function (element) { return element.id; });
                    $.bc({
                        url: "api/ClientManagement/AuthOnetime", data: iDs, method: 'post',
                        callback: function (result) {
                            if (result) $table.bootstrapTable('refresh');
                        }
                    });
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
                    $("#staff_list_table").bootstrapTable('refresh');
                    $("#staff_list_table").lgbTable({
                        url: "api/ClientManagement/SynchContact",
                        smartTable: {
                            toolbar: true,
                            search: true,
                            showToggle: true,
                            showRefresh: true,
                            showColumns: true,
                            showAdvancedSearchButton: false,
                            showExport: false,
                            pagination: true,
                            checkbox: true,
                            height: 400,
                            columns: [
                                { title: "姓名", field: "nickname" },
                                { title: "性别", field: "sex" },
                                { title: "部门", field: "department" },
                                { title: "职位", field: "role" },
                                { title: "open_userid", field: "open_userid" },
                                { title: "userid", field: "userid" }
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
                    userid: element.userid,
                    openid: element.openid,
                    nickname: element.nickname,
                    sex: element.sex,
                    province: element.province,
                    city:element.city,
                    country:element.country,
                    headimgurl: element.headimgurl,
                    privilege: element.privilege,
                    unionid: element.unionid,
                    company: element.company,
                    department: element.department,
                    role: element.role,
                    open_userid: element.open_userid
                };
            });
            $.bc({
                url: "api/ClientManagement/Syn_confirmed_list",
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
