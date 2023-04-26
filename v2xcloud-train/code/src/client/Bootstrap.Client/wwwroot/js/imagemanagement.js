$(function () {

    $('.popup').click(function () {
        $(this).fadeOut();
    });

    

    $('#button_add').click(function (e) {
        e.preventDefault();
        $('#formWrapper').fadeIn();
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
    var id = parseInt($('#id')[0].value);

    $table.lgbTable({
        url: "api/ImageManagement/InitImageList/" + id,
        smartTable: {
            sortName: 'Name',
            columns: [
                { title: "图片名称", field: "image_uuid", align: 'center', sortable: true },
                {

                    field: 'relative_url',
                    title: '预览图',
                    align: 'center',
                    
                    formatter: function (value, row, cell, index) {
                        return [                        
                            '<div style="text-align:center;">',
                            '<img id = "img_show" src=' + value + ' height="60" width="100" />',
                            '</div>'
                        ].join(' ')
                        //return '<img src="/images/folder.png" height="25" >' + "   " +value
                    }

                },

                { title: "修改时间", field: "update_time", align: 'center', sortable: true },
                { title: "所属类型", field: "type", align: 'center', sortable: true },
                {
                    title: "图片大小", field:"image_size", align: 'center', sortable: true,
                },
                {
                    field: 'operate',
                    title: '操作',
                    align: 'center',
                    clickToSelect: false,
                    formatter: function (value, row, index) {
                        return [
                            '<div class="btn-group">',                           
                            '<button type="button" id="scan" class="details btn btn-info btn-sm"><i class="fa fa fa-eye"></i><span>查看</span></button>',
                            '<button type="button" class="delete btn btn-danger"><i class="fa fa-trash"></i><span>删除</span></button>',
                            
                            '</div >'
                        ].join('')
                    },
                    events: {
                        'click .details': function (e, value, row, index) {
                            $.bc({
                                //$('#imageModal').modal('show');
                                url: "api/ImageManagement/Details/" + row.id,
                                //dataType: 'text', //注意返回值类型
                                callback: function (result) {
                                    if (result.status == "success") {
                                        var url = result.image.relative_url;
                                        $('#image_show').attr('src', url);
                                        $('.popup').fadeIn();
                                        //$('#name').attr('placeholder', "/images/Tailand.JPG");
                                    }
                                    else
                                        toastr.error(result.erro);

                                }
                            });
                        },
                        'click .delete': function (e, value, row, index) {
                            swal($.extend({}, swalDeleteOptions)).then(function (result) {
                                if (result.value) {
                                    $.bc({
                                        url: "api/ImageManagement/Delete_single/" + row.id,
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
                        url: "api/ImageManagement/Delete",
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

$("#myForm").fileinput({
    showUpload: true,
    showCancel: true,
    showCaption: false,
    browseClass: "btn btn-primary",
    fileType: "any",
    previewFileIcon: "<i class='glyphicon glyphicon-file'></i>",
    browseLabel: "Select File",
    uploadUrl: "upload.php",
    maxFileSize: 2000,
    maxFileCount: 1,
    allowedFileExtensions: ["jpg", "png", "gif"]
});

$("#myForm").on("submit", function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    $.ajax({
        url: "/api/ImageManagement/Upload1",
        type: "POST",
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (response) {
            console.log(response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error(textStatus, errorThrown);
        }
    });
    window.location.reload();
    $('#formModal').modal('hide');
});


$(document).ready(function () {
    // 点击打开表单按钮
    $("#openForm").click(function () {
        // 显示模态框
        $('#formModal').modal('show');
    });

    // 点击提交按钮时触发
    $("#submit").click(function () {
        var formData = $("#myForm");
        $.ajax({
            url: "/api/ImageManagement/Upload1",
            type: "POST",
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (response) {
                console.log(response);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error(textStatus, errorThrown);
            }
        });
        // 获取表单数据
        // 隐藏模态框
        $('#formModal').modal('hide');
    });
});

//$(document).ready(function () {
//    // 点击打开表单按钮
//    $("#scan").click(function () {
//        // 显示模态框
//        $('#imageModal').modal('show');
//    });

//    // 点击提交按钮时触发
//    $("#submit").click(function () {
        
//        // 获取表单数据
//        // 隐藏模态框
//        $('#formModal').modal('hide');
//    });
//});


//初始化fileinput控件（第一次初始化）
function initFileInput(ctrlName) {
    var control = $('#' + ctrlName);

    control.fileinput({
        language: 'zh', //设置语言
        /*uploadUrl: uploadUrl, //上传的地址*/
        allowedFileExtensions: ['xlsx', 'xls'],//接收的文件后缀
        allowedFileTypes: ['image','text'],//文件选择过滤
        uploadAsync: true, //默认异步上传
        showRemove: true, //显示移除按钮
        showUpload: false, //是否显示上传按钮
        showPreview: false, //是否显示预览
        showCaption: true,//是否显示标题
        browseClass: "btn btn-primary", //按钮样式
        previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
    });
}

//初始化fileinput控件（第一次初始化）
initFileInput("fileToUpload");

//导入文件上传完成之后的事件
//$("#fileToUpload").on("fileuploaded", function (event, data) {
//    if (data.response.status == "failed") {
//        lgbSwal({ title: '导入失败！', type: "warning" });
//    } else {
//        lgbSwal({ title: '导入完成！', type: "success" });
//    }

//    $("#dialogImport").modal("hide");
//    $table.bootstrapTable('refresh');

//});

//$('#formclose').click(function (e) {
//    e.preventDefault();
//    alert("退出成功");
//    $('#formWrapper').fadeOut();
//});
