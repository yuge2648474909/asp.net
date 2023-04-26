$(function () {
    var $btn_update_submit = $("#btn_update_submit");
    $btn_update_submit.click(function () {

        //获取所有数据
        var id = parseInt($('#id')[0].value);
        var company_code = $('#company_code')[0].value;
        var name = $('#name')[0].value;
        var address = $('#address')[0].value;
        var corpid = $('#corpid')[0].value;
        var corpsecret = $('#corpsecret')[0].value;
        var agentid = $('#agentid')[0].value;
        /*        var agent_secrete = $('#agent_secrete')[0].value;*/
        var permanent_code = $('#permanent_code')[0].value;
        var corpid_open = $('#corpid_open')[0].value;
       

        var data_post = {          //字段保持和model一致
            id: id,
            company_code: company_code,
            name: name,
            address: address,
            corpid: corpid,
            corpsecret: corpsecret,
            agentid: agentid,
            //agent_secrete: agent_secrete
            permanent_code: permanent_code,
            corpid_open: corpid_open
        };

        $.bc({
            url: "api/ClientManagement/CompanyEdit",
            method: 'post',
            data: data_post,
            //dataType: 'text', //注意返回值类型
            callback: function (result) {
                if (result.status == "success")
                    window.location.href = $.formatUrl('ClientManagement/CompanyDetails/' + id);    //用这种方式实现跳转
                else
                    toastr.error(result.erro);
            }
        });

    });



    var id = parseInt($('#id')[0].value);
    $.bc({
        url: "api/ClientManagement/CompanyDetails/" + id,
        //dataType: 'text', //注意返回值类型
        callback: function (result) {
            if (result.status == "success") {
                var name = result.company.name;
                var company_code = result.company.company_code;
                var address = result.company.address;
                var corpid = result.company.corpid;
                var corpsecret = result.company.corpsecret;
                var agentid = result.company.agentid;
                //var agent_secrete = result.company.agent_secrete;
                var permanent_code = result.company.permanent_code;
                var corpid_open = result.company.corpid_open;
                
               

                $('#name')[0].value = name;
                $('#company_code')[0].value = company_code;
                $('#address')[0].value = address;
                $('#corpid')[0].value = corpid;
                $('#corpsecret')[0].value = corpsecret;
                $('#agentid')[0].value = agentid;
                //$('#agent_secrete')[0].value = agent_secrete;
                $('#permanent_code')[0].value = permanent_code;
                $('#corpid_open')[0].value = corpid_open;
              

            }
            else
                toastr.error(result.erro);
        }
    });



})

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