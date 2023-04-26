$(function () {
    //声明一个$table的变量
    var $table = $('#list');

    //创建字典
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

    // 获取数据列表，在桌面显示
    $table.lgbTable({
        url: "api/VehicleManagement/InitVehicleList",
        smartTable: {
            columns: [
                { title: "名称", field: "Name", sortable: true },
                { title: "类型", field: "Type", sortable: true },

                {
                    field: 'operate',
                    title: '操作',
                    align: 'center',
                    //是一种用于表格插件或库的配置选项，通常用于在点击表格行时选择该行的功能。当 clickToSelect 配置项设置为 true 时，
                    //用户点击表格行时可以直接选中该行，而不需要通过复选框或其他方式进行选择。
                    clickToSelect: false,
                    formatter: function (value, row, index) {
                        return [
                            '<div class="btn-group">',
                            '<a class="details btn btn-info btn-sm" href="/VehicleManagement/VehicleDetail/' + row.Id + '"><i class="fa fa-eye"></i><span>查看</span></a>',
                            '<a class="edit btn btn-primary btn-sm" href="/VehicleManagement/VehicleEdit/' + row.Id + '"><i class="fa fa-edit"></i><span>编辑</span></a>',
                            '<button type="button" class="delete btn btn-danger"><i class="fa fa-trash"></i><span>删除</span></button>',
                            '</div >'
                        ].join('')
                    },
                    events: {
                        'click .delete': function (e, value, row, index) {
                            swal($.extend({}, swalDeleteOptions)).then(function (result) {
                                if (result.value) {
                                    $.bc({
                                        url: "api/VehicleManagement/Delete_single/" + row.Id,
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
                fileName: "名称",
                ignoreColumn: [0, 5]
            }
        }
    });


    /*获取删除按钮*/
    var $button_delete = $('#button_delete');
    $button_delete.click(function () {
        //获取
        var selected_rows = $table.bootstrapTable('getSelections');
        if (selected_rows.length == 0)
            lgbSwal({ title: '请选择一个要删除的数据', type: "warning" });
        else
            swal($.extend({}, swalDeleteOptions)).then(function (result) {
                if (result.value) {
                    var iDs = $table.bootstrapTable('getSelections').map(function (element) { return element.Id; });
                    $.bc({
                        url: "api/VehicleManagement/Delete", data: iDs, method: 'post',
                        callback: function (result) {
                            if (result) $table.bootstrapTable('refresh');
                        }
                    });
                }
            });

    });


   


});
