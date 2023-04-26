function confirmDelete(uniqueId, isDeleteClicked) {
    var deleteSpan = "deleteSpan_" + uniqueId;
    var confirmDeleteSpan = "confirmDeleteSpan_" + uniqueId;

    if (isDeleteClicked) {
        $("#" + deleteSpan).hide();
        $("#" + confirmDeleteSpan).show();
    } else {
        $("#" + deleteSpan).show();
        $("#" + confirmDeleteSpan).hide();
    }
}

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

function testConnection() {
    if ($('#Device_Tcp_address').val().length == 0 || $('#Device_Port').val().length == 0) {
        $("#failed_alert").html("IP地址, 端口号不能为空！");
        $("#failed_alert").show();
        window.setTimeout(function () {
            $("#failed_alert").hide();
        }, 3000);
        return;
    }

    $.post("/Device/testConnection", { tcp_address: $('#Device_Tcp_address').val(), port: $('#Device_Port').val() }, function (data) {
        if (data.indexOf("成功") != -1) {
            $("#success_alert").html(data);
            $("#success_alert").show();
            window.setTimeout(function () {
                $("#success_alert").hide();
            }, 3000);
        } else {
            $("#failed_alert").html(data);
            $("#failed_alert").show();
            window.setTimeout(function () {
                $("#failed_alert").hide();
            }, 3000);
        }
       
    });
}


function sendText() {
    if ($('#Device_Tcp_address').val().length == 0 || $('#Device_Port').val().length == 0) {
        $("#failed_alert").html("IP地址, 端口号不能为空！");
        $("#failed_alert").show();
        window.setTimeout(function () {
            $("#failed_alert").hide();
        }, 3000);
        return;
    }
    $.post("/Device/sendText", { tcp_address: $('#Device_Tcp_address').val(), port: $('#Device_Port').val(), str_content: $('#Device_Content').val() }, function (data) {
        if (data.indexOf("成功") != -1) {
            $("#success_alert").html(data);
            $("#success_alert").show();
            window.setTimeout(function () {
                $("#success_alert").hide();
            }, 3000);
        } else {
            $("#failed_alert").html(data);
            $("#failed_alert").show();
            window.setTimeout(function () {
                $("#failed_alert").hide();
            }, 3000);
        }
    });
}