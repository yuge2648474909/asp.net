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
        
        url: "api/ResourceManagement/InitResourceList",
        smartTable: {

            ondblclick: function (event, value, row, cell, index) {
                window.location.href = $.formatUrl('ResourceManagement/ImageList/' + row.id);
            },
            columns: [               
                {
                    
                    field: 'Name',
                    title: '文件名',
                    formatter: function (value, row, cell, index) {
                        return [
                            '<div>',
                            '<img src="/images/folder.png" height="25" />',
                            '<a href="/ImageManagement/ImageList/' + row.id + '">' + value + '</a>',
                            '</div >'
                        ].join(' ')
                        //return '<img src="/images/folder.png" height="25" >' + "   " +value
                    }

                },

                { title: "修改时间", field: "Update_time", align: 'center', sortable: true },
                { title: "备注", field: "Comment", align: 'center', sortable: true },
                //{ title: "类型", field: "Type", align: 'center', sortable: true },
                { title: "大小", field: "Size", align: 'center', sortable: true },               
                
            ],

            
            ondblclick: function (event, value, row, cell, index) {
                window.location.href = $.formatUrl('ImageManagement/ImageList/' + row.id);
            },

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
                    var iDs = $table.bootstrapTable('getSelections').map(function (element) { return element.id; });
                    $.bc({
                        url: "api/ResourceManagement/Delete", data: iDs, method: 'post',
                        callback: function (result) {
                            if (result) $table.bootstrapTable('refresh');
                        }
                    });
                }
            });
    });
});

//// 获取表格元素
//var table = document.getElementById("#list");

//// 给表格每一行的行元素添加点击事件处理函数
//var rows = table.getElementsByTagName("tr");
//for (var i = 0; i < rows.length; i++) {
//    rows[i].addEventListener("click", function () {
//        // 在这里执行点击行后的跳转操作，例如跳转到指定链接
//        // 获取行内的数据或执行其他操作
//        var link = this.getAttribute("data-link"); // 假设每一行都有 data-link 属性指定跳转链接
//        window.location.href = link; // 跳转到指定链接
//    });
//}
