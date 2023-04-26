$(function () {
    var $table = $('table');
    var $button_add = $('#button_add');
    var $dialogNew = $('#dialogNew')
    var $btnSubmit_create = $('#btnSubmit_create');
    var $btnSubmit_update = $('#btnSubmit_update');

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
        url: "api/SpeedManagement/InitList",
        dataBinder: {
            map: {
                Id: "#deviceId",
                Name: "#deviceName",
                Device_type: "#deviceType"
            }
        },
        smartTable: {
            sortName: 'Name',
            columns: [
                { title: "设备名称", field: "Name", sortable: true },
                { title: "设备类型", field: "Device_type", sortable: true },
                {
                    field: 'operate',
                    title: '操作',
                    align: 'center',
                    clickToSelect: false,                    
                    formatter: function (value, row, index) {
                        return [
                            '<div class="btn-group">',
                            '<button type="button" class="details btn btn-info btn-sm"><i class="fa fa-eye"></i><span>查看</span></button>',
                            '<button type="button" class="edit btn btn-primary btn-sm"><i class="fa fa-edit"></i><span>编辑</span></button>',
                            '<button type="button" class="delete btn btn-danger"><i class="fa fa-trash"></i><span>删除</span></button>',
                            '<button type="button" class="goahead btn btn-danger"><i class="fa fa-trash"></i><span>跳转</span></button>',
                            '<a href="/Device/Details/'+row.Id+'">新增asp.net core</a>',
                            '</div >'
                        ].join('')
                    },
                    events: {
                        'click .details': function (e, value, row, index) {
                            $.bc({
                                url: "api/SpeedManagement/Details/", data: { id: row.Id }, method: 'get',
                                callback: function (result) {
                                    //get the values
                                    $('#input_name')[0].value = result.Name;
                                    $('#input_type')[0].value = result.Device_type;
                                    $('#input_specification')[0].value = result.Device_specification;
                                    $('#input_address')[0].value = result.Device_location;
                                    $('#input_lat')[0].value = result.Location_lat;
                                    $('#input_lon')[0].value = result.Location_lon;
                                    $('#input_connection')[0].value = result.Connection_method;
                                    $('#input_ip')[0].value = result.Tcp_address;
                                    $('#input_port')[0].value = result.Port;
                                    $('#input_content')[0].value = result.Content;
                                    $('#input_status')[0].value = result.Device_status;
                                    $('#input_time')[0].value = result.Update_time;

                                    //set the inputs as disabled
                                    $('#input_name').attr("readOnly", "true");
                                    $('#input_type').attr("readOnly", "true");
                                    $('#input_specification').attr("readOnly", "true");
                                    $('#input_address').attr("readOnly", "true");
                                    $('#input_lat').attr("readOnly", "true");
                                    $('#input_lon').attr("readOnly", "true");
                                    $('#input_connection').attr("readOnly", "true");
                                    $('#input_ip').attr("readOnly", "true");
                                    $('#input_port').attr("readOnly", "true");
                                    $('#input_content').attr("readOnly", "true");
                                    $('#input_status').attr("readOnly", "true");
                                    $('#input_time').attr("readOnly", "true");

                                    //set the dialog title as details
                                    $('#myModalLabel')[0].value = "查看详情窗口";
                                    $('#btnSubmit_create').hide();
                                    $('#btnSubmit_update').hide();

                                    $dialogNew.modal("show");

                                   
                                }
                            });

                        },
                        'click .edit': function (e, value, row, index) {
                            $.bc({
                                url: "api/SpeedManagement/Details/", data: { id: row.Id }, method: 'get',
                                callback: function (result) {
                                    //get the values
                                    $('#input_id')[0].value = result.Id;
                                    $('#input_name')[0].value = result.Name;
                                    $('#input_type')[0].value = result.Device_type;
                                    $('#input_specification')[0].value = result.Device_specification;
                                    $('#input_address')[0].value = result.Device_location;
                                    $('#input_lat')[0].value = result.Location_lat;
                                    $('#input_lon')[0].value = result.Location_lon;
                                    $('#input_connection')[0].value = result.Connection_method;
                                    $('#input_ip')[0].value = result.Tcp_address;
                                    $('#input_port')[0].value = result.Port;
                                    $('#input_content')[0].value = result.Content;
                                    $('#input_status')[0].value = result.Device_status;
                                    $('#input_time')[0].value = result.Update_time;

                                    //set the inputs as disabled
                                    $('#input_name').removeAttr("readOnly");
                                    $('#input_type').removeAttr("readOnly");
                                    $('#input_specification').removeAttr("readOnly");
                                    $('#input_address').removeAttr("readOnly");
                                    $('#input_lat').removeAttr("readOnly");
                                    $('#input_lon').removeAttr("readOnly");
                                    $('#input_connection').removeAttr("readOnly");
                                    $('#input_ip').removeAttr("readOnly");
                                    $('#input_port').removeAttr("readOnly");
                                    $('#input_content').removeAttr("readOnly");
                                    $('#input_status').removeAttr("readOnly");
                                    $('#input_time').removeAttr("readOnly");

                                    //set the dialog title as details
                                    $('#myModalLabel')[0].value = "设备编辑窗口";
                                    $('#btnSubmit_create').hide();
                                    $('#btnSubmit_update').show();

                                    $dialogNew.modal("show");


                                }
                            });
                        },
                        'click .delete': function (e, value, row, index) {
                            swal($.extend({}, swalDeleteOptions)).then(function (result) {
                                if (result.value) {
                                    $.bc({
                                        url: "api/SpeedManagement/Delete_single", data: { id: row.Id }, method: 'get',
                                        callback: function (result) {
                                            if (result) $table.bootstrapTable('refresh');
                                        }
                                    });
                                }
                            });
                        },
                        'click .goahead': function (e, value, row, index) {
                            Id = 5;
                            $.get("/Device/Details/" + Id, function () {
                                window.location.href = "~/Device/Details/5";
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



    var $button = $('#button_delete');
    $button.click(function () {
        var selected_rows = $table.bootstrapTable('getSelections');
        if (selected_rows.length == 0)
            lgbSwal({ title: '请选择一个要删除的数据', type: "warning" });
        else
            swal($.extend({}, swalDeleteOptions)).then(function (result) {
                if (result.value) {                       
                    var iDs = $table.bootstrapTable('getSelections').map(function (element) { return element.Id; });
                    $.bc({
                        url: "api/SpeedManagement/Delete", data: iDs, method: 'post', 
                        callback: function (result) {
                            if (result) $table.bootstrapTable('refresh');
                        }
                    });
                }
            });

    })


    $button_add.click(function () {
        $('#input_name')[0].value=null;
        $('#input_type')[0].value = null;
        $('#input_specification')[0].value = null;
        $('#input_address')[0].value = null;
        $('#input_lat')[0].value = null;
        $('#input_lon')[0].value = null;
        $('#input_connection')[0].value = null;
        $('#input_ip')[0].value = null;
        $('#input_port')[0].value = null;
        $('#input_content')[0].value = null;
        $('#input_status')[0].value = null;
        $('#input_time')[0].value = null;

        $('#btnSubmit_update').hide();
        $('#btnSubmit_create').show();

        $dialogNew.modal("show");
    });


    $btnSubmit_create.click(function () {
       
        var input_name = $('#input_name')[0].value;
        var input_type = $('#input_type')[0].value;
        var input_specification = $('#input_specification')[0].value;
        var input_address = $('#input_address')[0].value;
        var input_lat = $('#input_lat')[0].value;
        var input_lon = $('#input_lon')[0].value;
        var input_connection = $('#input_connection')[0].value;
        var input_ip = $('#input_ip')[0].value;
        var input_port = $('#input_port')[0].value;
        var input_content = $('#input_content')[0].value;
        var input_status = $('#input_status')[0].value;
        var input_time = $('#input_time')[0].value;

        var device = {          
            Name: input_name,
            Device_type: input_type,
            Device_specification: input_specification,
            Device_location: input_address,
            Location_lat: input_lat,
            Location_lon: input_lon,
            Connection_method: input_connection,
            Port: input_port,
            Tcp_address: input_ip,
            Content: input_content,
            Device_status: input_status,
            Update_time: input_time
        };


        //传入json数据，后台会自动解析
        $.bc({
            url: "api/SpeedManagement/Create", data: device, method: 'post',
            callback: function (result) {
                
                if (result) {
                    $dialogNew.modal('hide');
                    $table.bootstrapTable('refresh');
                }
                    
            }
        });

    });

    $btnSubmit_update.click(function () {
        var input_id = Number($('#input_id')[0].value);
        var input_name = $('#input_name')[0].value;
        var input_type = $('#input_type')[0].value;
        var input_specification = $('#input_specification')[0].value;
        var input_address = $('#input_address')[0].value;
        var input_lat = $('#input_lat')[0].value;
        var input_lon = $('#input_lon')[0].value;
        var input_connection = $('#input_connection')[0].value;
        var input_ip = $('#input_ip')[0].value;
        var input_port = $('#input_port')[0].value;
        var input_content = $('#input_content')[0].value;
        var input_status = $('#input_status')[0].value;
        var input_time = $('#input_time')[0].value;

        var device = {
            Id: input_id,
            Name: input_name,
            Device_type: input_type,
            Device_specification: input_specification,
            Device_location: input_address,
            Location_lat: input_lat,
            Location_lon: input_lon,
            Connection_method: input_connection,
            Port: input_port,
            Tcp_address: input_ip,
            Content: input_content,
            Device_status: input_status,
            Update_time: input_time
        };


        //传入json数据，后台会自动解析
        $.bc({
            url: "api/SpeedManagement/Update", data: device, method: 'post',
            callback: function (result) {

                if (result) {
                    $dialogNew.modal('hide');
                    $table.bootstrapTable('refresh');
                }

            }
        });

    });


    var $button_cal = $('#cal');
    $button_cal.click(function () {
        alert()

        $.bc({
            url: "api/SpeedManagement/JXPXSL", data: 1, method: 'get',
            callback: function (result) {

                alert(result)

            }
        });

    })


});
