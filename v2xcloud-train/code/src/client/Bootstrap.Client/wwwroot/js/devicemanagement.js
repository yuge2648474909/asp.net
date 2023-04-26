$(function () {
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
        url: "api/DeviceManagement/InitDeviceList",
        smartTable: {
            sortName: 'Name',
            columns: [
                { title: "名称", field: "Name", sortable: true },
                { title: "类型", field: "Device_type", sortable: true },
                { title: "规格", field: "Device_specification", sortable: true },
                { title: "位置", field: "Device_location", sortable: true },
                { title: "状态", field: "Device_status", sortable: true },
                { title: "更新时间", field: "Update_time", sortable: true },
                {
                    field: 'operate',
                    title: '操作',
                    align: 'center',
                    clickToSelect: false,
                    formatter: function (value, row, index) {
                        return [
                            '<div class="btn-group">',
                            '<a class="details btn btn-info btn-sm" href="/Device/DeviceDetail/' + row.id+'"><i class="fa fa-eye"></i><span>查看</span></a>',
                            '<a class="edit btn btn-primary btn-sm" href="/Device/DeviceEdit/' + row.id+'"><i class="fa fa-edit"></i><span>编辑</span></a>',
                            '<button type="button" class="delete btn btn-danger"><i class="fa fa-trash"></i><span>删除</span></button>',
                            '</div >'
                        ].join('')
                    },
                    events: {                      
                        'click .delete': function (e, value, row, index) {
                            swal($.extend({}, swalDeleteOptions)).then(function (result) {
                                if (result.value) {
                                    $.bc({
                                        url: "api/DeviceManagement/Delete_single/" + row.id,
                                        //data: { id: row.Id },
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


//
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
                        url: "api/DeviceManagement/Delete",
                        data: iDs,
                        method: 'post',
                        callback: function (result) {
                            if (result) $table.bootstrapTable('refresh');
                        }
                    });
                }
            });

    })

});

