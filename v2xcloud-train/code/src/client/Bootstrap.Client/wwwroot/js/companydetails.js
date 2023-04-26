$(function () {

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

