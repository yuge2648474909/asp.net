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
        url: "api/WorkzoneManagement/InitList",
        smartTable: {
            sortName: 'Name',
            columns: [
                { title: "路段名称", field: "Road_name", sortable: true },
                { title: "起止桩号", field: "Stake_number", sortable: true },
                { title: "方向", field: "Direction", sortable: true },
                { title: "开始时间", field: "Start_time", sortable: true },
                { title: "结束时间", field: "End_time", sortable: true },
                { title: "作业内容", field: "Work_content", sortable: true },
                { title: "服务类型", field: "Service_type", sortable: true },
                {
                    title: "服务状态",
                    field: "Service_status",
                    sortable: true,
                    formatter: function (value, row, index) {
                        var template = "<button class='btn btn-sm btn-{0}'><i class='fa fa-{1}'></i><span>{2}<span></button>";
                        var content = "";
                        if (value === "运行") {
                            content = $.format(template, 'success', 'play-circle', '运行中');
                        }
                        else if (value === "停止") {
                            content = $.format(template, 'warning', 'times-circle', '已停止');
                        }
                        return content;
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
                            '<a class="details btn btn-primary btn-sm" href="/DynamicSpeed/Index/' + row.Id + '"><i class="fa fa-cog"></i><span>运行管理</span></a>',
                            '</div >'
                        ].join('')
                    },
                    events: {
                        'click .delete': function (e, value, row, index) {
                            swal($.extend({}, swalDeleteOptions)).then(function (result) {
                                if (result.value) {
                                    $.bc({
                                        url: "api/DeviceManagement/Delete_single", data: { id: row.Id }, method: 'get',
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



    var $button_details = $('#button_details');
    $button_details.click(function () {
        var selected_rows = $table.bootstrapTable('getSelections');
        if (selected_rows.length == 0)
            lgbSwal({ title: '请选择一个要查看的数据', type: "warning" });
        else {
            var iDs = $table.bootstrapTable('getSelections').map(function (element) { return element.Id; });
            self.location.href = "/Workzone/Details/"+iDs[0];
        }
          

    });

    var $button_edit = $('#button_edit');
    $button_edit.click(function () {
        var selected_rows = $table.bootstrapTable('getSelections');
        if (selected_rows.length == 0)
            lgbSwal({ title: '请选择一个要编辑的数据', type: "warning" });
        else {
            var iDs = $table.bootstrapTable('getSelections').map(function (element) { return element.Id; });
            self.location.href = "/Workzone/Edit/" + iDs[0];
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
                    var iDs = $table.bootstrapTable('getSelections').map(function (element) { return element.Id; });
                    $.bc({
                        url: "api/WorkzoneManagement/Delete", data: iDs, method: 'post',
                        callback: function (result) {
                            if (result) $table.bootstrapTable('refresh');
                        }
                    });
                }
            });

    });

   

});

