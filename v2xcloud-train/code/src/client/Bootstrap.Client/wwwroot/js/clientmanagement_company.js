$(function () {
    //初始化控件，权限管理
    var isAdmin = true;
    $.bc({
        url: "api/ClientManagement/InitCompanyView",
        method: 'get',
        //dataType: 'text', //注意返回值类型
        callback: function (result) {
            if (result == false) {     //把新增和删除按钮隐藏起来
                isAdmin = false;
                var target = document.getElementById('toolbar');
                target.style.display = "none";
            }
        }
    });


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
        url: "api/ClientManagement/InitCompanyList",
        dataBinder: {
            map: {
                name: "#name",
                company_code: "#company_code",
                address: "#address"
            }
        },
        smartTable: {
            sortName: 'name',
            queryParams: function (params) {
                return $.extend(params, {
                    name: $('#name').val(),
                    company_code: $('#company_code').val(),
                    address: $("#address").val()
                });
            },
            columns: [
                { title: "公司代码", field: "company_code", sortable: true },
                { title: "公司名称", field: "name", sortable: true },
                { title: "地址", field: "address", sortable: true },
                {
                    title: "授权状态", field: "permanent_code", sortable: true,
                    formatter: function (value, row, index) {
                        if (value==null)
                            return "未授权";
                        else
                            return "已授权";
                    }
                },
                {
                    field: 'operate',
                    title: '操作',
                    align: 'center',
                    clickToSelect: false,
                    formatter: function (value, row, index) {
                        if (isAdmin == true)
                            return [
                                '<div class="btn-group">',
                                '<a class="details btn btn-info btn-sm" href="/ClientManagement/CompanyDetails/' + row.id + '"><i class="fa fa-eye"></i><span>查看</span></a>',
                                '<a class="edit btn btn-primary btn-sm" href="/ClientManagement/CompanyEdit/' + row.id + '"><i class="fa fa-edit"></i><span>编辑</span></a>',
                                '<button type="button" class="delete btn btn-danger"><i class="fa fa-trash"></i><span>删除</span></button>',
                                '</div >'
                            ].join('');
                        else
                            return [
                                '<div class="btn-group">',
                                '<a class="details btn btn-info btn-sm" href="/ClientManagement/CompanyDetails/' + row.id + '"><i class="fa fa-eye"></i><span>查看</span></a>',
                                '<a class="edit btn btn-primary btn-sm" href="/ClientManagement/CompanyEdit/' + row.id + '"><i class="fa fa-edit"></i><span>编辑</span></a>',
                                '</div >'
                            ].join('');
                    },
                    events: {
                        'click .delete': function (e, value, row, index) {
                            swal($.extend({}, swalDeleteOptions)).then(function (result) {
                                if (result.value) {
                                    $.bc({
                                        url: "api/ClientManagement/CompanyDelete_single/" + row.id,
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
                        url: "api/ClientManagement/CompanyDelete", data: iDs, method: 'post',
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
        var name = $('#name')[0].value;
        var company_code = $('#company_code')[0].value;
        var address = $('#address')[0].value;
        var corpid = $('#corpid')[0].value;
        var corpsecret = $('#corpsecret')[0].value;
        //var agentid = $('#agentid')[0].value;
        //var agent_secrete = $('#agent_secrete')[0].value;
      


        var data_post = {          //字段保持和model一致
            name: name,
            company_code: company_code,
            address: address,
            corpid: corpid,
            corpsecret: corpsecret
            //agentid: agentid,
            //agent_secrete: agent_secrete
        };

        $.bc({
            url: "api/ClientManagement/CompanyCreate",
            method: 'post',
            data: data_post,
            //dataType: 'text', //注意返回值类型
            callback: function (result) {
                if (result.status == "success")
                    window.location.href = $.formatUrl('ClientManagement/CompanyDetails/' + result.company_id);    //用这种方式实现跳转
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
