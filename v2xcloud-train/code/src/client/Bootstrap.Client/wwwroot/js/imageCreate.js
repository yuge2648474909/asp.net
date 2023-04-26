
//$(document).ready(function () {
//    $("#myForm").fileinput({
//        showUpload: true,
//        showCancel: true,
//        showCaption: false,
//        browseClass: "btn btn-primary",
//        fileType: "any",
//        previewFileIcon: "<i class='glyphicon glyphicon-file'></i>",
//        browseLabel: "Select File",
//        uploadUrl: "upload.php",
//        maxFileSize: 2000,
//        maxFileCount: 1,
//        allowedFileExtensions: ["jpg", "png", "gif"]
//    });
//});

//$(document).ready(function () {
//    $("#myForm").on("submit", function (e) {
//        e.preventDefault();
//        var formData = new FormData(this);

//        $.ajax({
//            url: "/api/ImageManagement/Upload1",
//            type: "POST",
//            data: formData,
//            cache: false,
//            contentType: false,
//            processData: false,
//            success: function (response) {
//                console.log(response);
//            },
//            error: function (jqXHR, textStatus, errorThrown) {
//                console.error(textStatus, errorThrown);
//            }
//        });
//    });
//});

//初始化fileinput控件（第一次初始化）
function initFileInput(ctrlName, uploadUrl) {
    var control = $('#' + ctrlName);

    control.fileinput({
        language: 'zh', //设置语言
        uploadUrl: uploadUrl, //上传的地址
        allowedFileExtensions: ['xlsx', 'xls'],//接收的文件后缀
        allowedFileTypes: ['image','text'],//文件选择过滤
        uploadAsync: true, //默认异步上传
        showRemove: true, //显示移除按钮
        showUpload: true, //是否显示上传按钮
        showPreview: false, //是否显示预览
        showCaption: true,//是否显示标题
        browseClass: "btn btn-primary", //按钮样式
        previewFileIcon: "<i class='glyphicon glyphicon-king'></i>",
    });
}

//初始化fileinput控件（第一次初始化）
initFileInput("fileToUpload", "/api/ImageManagement/Upload1");

//导入文件上传完成之后的事件
$("#fileToUpload").on("fileuploaded", function (event, data) {
    if (data.response.status == "failed") {
        lgbSwal({ title: '导入失败！', type: "warning" });
    } else {
        lgbSwal({ title: '导入完成！', type: "success" });
    }

    $("#dialogImport").modal("hide");
    $table.bootstrapTable('refresh');

});

$('#formclose').click(function (e) {
    e.preventDefault();
    alert("退出成功");
    $('#formWrapper').fadeOut();
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

