var map;
var workzone_data;
$(function () {
    initMap();
    initTable_info();
    initTable_parameters();
    initSpeedMetero_vsl1(0);
    initSpeedMetero_vsl2(0);
    initSpeedMetero_evaluation();
    updateNumbers();


    updateData();

   
    var $button_run = $('#button_run');
    $button_run.click(function () {
        task_run();

    });


    var $button_stop = $('#button_stop');
    $button_stop.click(function () {
        task_stop();

    });

   

});


function updateData(){
    self.setInterval("clock()", 10000);

}

function clock() {
    var id = parseInt($('#id')[0].value);
    //更新列表
    $.bc({
        url: "api/DynamicSpeed/InitTablePara/"+id,
        callback: function (result) {
            if (result.status == "success") {
                var data = result.result;
                $("#parameters").bootstrapTable("removeAll");
                $("#parameters").bootstrapTable('append', data);
                $("#parameters").bootstrapTable('refresh');
              
            }
            else
                toastr.error(result.erro);
        }
    });
    //更新图表
    $.bc({
        url: "api/DynamicSpeed/RefreshSpeedFigure/"+id,
        callback: function (result) {
            if (result.status == "success") {
                var vsl_final = parseFloat(result.vsl_final.toString());
                var vsl_final_2 = parseFloat(result.vsl_final_2.toString());
                initSpeedMetero_vsl1(vsl_final);
                initSpeedMetero_vsl2(vsl_final_2);

              
            }
            else
                toastr.error(result.erro);
        }
    });

    ////更新远程设备
    //$.bc({
    //    url: "api/DynamicSpeed/RefreshRemoteDevices/" + id,
    //    callback: function (result) {
    //        if (result.status == "success") {
              


    //        }
    //        else
    //            toastr.error(result.erro);
    //    }
    //});
}

function initTable_parameters() {

    var id = parseInt($('#id')[0].value);

    $("#parameters").lgbTable({
        smartTable: {
            toolbar: true,
            search: true,
            showToggle: true,
            showRefresh: true,
            showColumns: true,
            showAdvancedSearchButton: true,
            showExport: true,
            pagination: true,
            checkbox: true,
            height:400,
            columns: [
                { title: "检测器", field: "Detector"},
                { title: "车辆数", field: "Vehicle_count" },
                {
                    title: "平均速度(km/h)", field: "Mean_speed",
                    formatter: function (value, row, index) {
                        var num = parseFloat(value);
                        if (num < 0)
                            num = 0;
                        return num.toFixed(1); 
                    }
                },
                {
                    title: "占有率(%)", field: "Occupancy",
                    formatter: function (value, row, index) {
                        var num = parseFloat(value);
                        if (num < 0)
                            num = 0;
                        return num.toFixed(1); 
                    }
                },
                { title: "平均车辆长度(m)", field: "Mean_vehicle_length" }
            ]
        }
    });

}

function task_run() {   
    var taskname = workzone_data.TaskExecutorName;

    $.bc({
        url: "api/DynamicSpeed/TaskRun",
        method: 'post',
        data: { TaskName: taskname },
        //data: data_post,
        //dataType: 'text', //注意返回值类型
        callback: function (result) {
            if (result.status == "success")
            {
                $('#task_table').bootstrapTable('refresh');

                //更新状态
                workzone_data.Service_status = "运行";

                $.bc({
                    url: "api/WorkzoneManagement/Edit",
                    method: 'post',
                    data: workzone_data,
                    //data: data_post,
                    //dataType: 'text', //注意返回值类型
                    callback: function (result) {
                        if (result.status == "success") {
                            toastr.info("服务已开启！");
                        }
                        else
                            toastr.error(result.erro);
                    }
                });
            }
            else
                toastr.error(result.erro);
        }
    });
}

function task_stop() {
    var taskname = workzone_data.TaskExecutorName;
  
    $.bc({
        url: "api/DynamicSpeed/TaskStop",
        method: 'post',
        data: { TaskName: taskname},
        //data: data_post,
        //dataType: 'text', //注意返回值类型
        callback: function (result) {
            if (result.status == "success")
            {
                $('#task_table').bootstrapTable('refresh');

                //更新状态
                workzone_data.Service_status = "停止";

                $.bc({
                    url: "api/WorkzoneManagement/Edit",
                    method: 'post',
                    data: workzone_data,
                    //data: data_post,
                    //dataType: 'text', //注意返回值类型
                    callback: function (result) {
                        if (result.status == "success") {
                            toastr.info("服务已停止！");
                        }
                        else
                            toastr.error(result.erro);
                    }
                });
            }
            else
                toastr.error(result.erro);
        }
    });
}

function updateNumbers() {
    //var start_time = 1253980800;
    var beginTime = "2020-11-11 22:00:00";
    var start_time = Date.parse(beginTime)
    // var start_time =  new Date("2014-11-11 10:10:10").Format("yyyy-MM-dd hh:mm:ss");
    var duration = parseInt(Date.now() - start_time) / 1000;

    var seconds = parseInt(duration % 60);
    if (seconds < 10)
        seconds = "0" + seconds;
    duration = parseInt(duration / 60);
    var minutes = duration % 60;
    if (minutes < 10)
        minutes = "0" + minutes;
    duration = parseInt(duration / 60);
    var hours = duration % 24;
    if (hours < 10)
        hours = "0" + hours;
    duration = parseInt(duration / 24);
    var days = duration;
    $('.days-number').text("" + days);
    $('.seconds').text(hours + " 时 " + minutes + " 分 " + seconds + " 秒");
    setTimeout("updateNumbers()", 1000);
}

function initSpeedMetero_evaluation() {
    var dom = document.getElementById("evaluation");
    var myChart = echarts.init(dom);
    var app = {};

    var option;

    option = {
        series: [{
            radius: '80%',
            type: 'gauge',
            axisLine: {
                lineStyle: {
                    width: 12,
                    color: [
                        [0.3,  '#fd666d'],
                        [0.7, '#37a2da'],
                        [1, '#67e0e3']
                    ]
                }
            },
            pointer: {
                itemStyle: {
                    color: 'auto'
                }
            },
            axisTick: {
                distance: -16,
                length: 8,
                lineStyle: {
                    color: '#fff',
                    width: 2
                }
            },
            splitLine: {
                distance: -50,
                length: 30,
                lineStyle: {
                    color: '#fff',
                    width: 4
                }
            },
            axisLabel: {
                color: 'auto',
                distance: 40,
                fontSize: 16
            },
            detail: {
                valueAnimation: true,
                formatter: function (value) {
                    return '{value|' + value.toFixed(0) + '}{unit|分}';
                },
                rich: {
                    value: {
                        fontSize: 26,
                        fontWeight: 'bolder',
                    },
                    unit: {
                        fontSize: 22
                    }
                },
                color: 'auto'
            },
            data: [{
                value: 80,
                name: '评分'
            }]
        }]
    };

    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }

}

function initSpeedMetero_vsl1(value) {

    var dom = document.getElementById("vsl_1");
    var myChart = echarts.init(dom);
    var app = {};

    var option;



    option = {
        series: [{
            radius: '80%',
            type: 'gauge',
            min: 0,
            max: 140,
            splitNumber: 7,
            progress: {
                show: true,
                width: 12
            },
            axisLine: {
                lineStyle: {
                    width: 12
                },
                color: [
                    [0.3, '#fd666d'],
                    [0.7, '#37a2da'],
                    [1, '#67e0e3']
                ]
            },
            axisTick: {
                show: true,
                distance: 0
            },
            splitLine: {
                distance: 0,
                length: 12,
                lineStyle: {
                    width: 2,
                    color: '#999'
                }
            },
            axisLabel: {
                distance: 16,
                color: '#999',
                fontSize: 16
            },
            anchor: {
                show: true,
                showAbove: true,
                size: 16,
                itemStyle: {
                    borderWidth: 10
                }
            },
            title: {
                show: true
            },
            detail: {
                valueAnimation: true,
                formatter: function (value) {
                    return '{value|' + value.toFixed(0) + '}{unit|km/h}';
                },
                rich: {
                    value: {
                        fontSize: 26,
                        fontWeight: 'bolder',
                    },
                    unit: {
                        fontSize: 22
                    }
                },
                color: 'auto'
            },
            data: [{
                value: value,
                name: 'VSL-1'
            }]
        }]
    };

    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }

}

function initSpeedMetero_vsl2(value) {

    var dom = document.getElementById("vsl_2");
    var myChart = echarts.init(dom);
    var app = {};

    var option;



    option = {
        series: [{
            radius: '80%',
            type: 'gauge',
            min: 0,
            max: 140,
            splitNumber: 7,
            progress: {
                show: true,
                width: 12
            },
            axisLine: {
                lineStyle: {
                    width: 12
                }
            },
            axisTick: {
                show: true,
                distance: 0
            },
            splitLine: {
                distance: 0,
                length: 12,
                lineStyle: {
                    width: 2,
                    color: '#999'
                }
            },
            axisLabel: {
                distance: 16,
                color: '#999',
                fontSize: 16
            },
            anchor: {
                show: true,
                showAbove: true,
                size: 16,
                itemStyle: {
                    borderWidth: 10
                }
            },
            title: {
                show: true
            },
            detail: {
                valueAnimation: true,
                formatter: function (value) {
                    return '{value|' + value.toFixed(0) + '}{unit|km/h}';
                },
                rich: {
                    value: {
                        fontSize: 26,
                        fontWeight: 'bolder',
                    },
                    unit: {
                        fontSize: 22
                    }
                },
                color: 'auto'
            },
            data: [{
                value: value,
                name: 'VSL-2'
            }]
        }]
    };

    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }

}
function initTable_info() {
    var id = parseInt($('#id')[0].value);

    $.bc({
        url: "api/WorkZoneManagement/Details/" + id,
        callback: function (result) {
            if (result.status == "success") {

                var workzone = result.workzone;
                var count = 0;
                for (var key in workzone) {
                    if (key != "Id" && key != "Latitude" && key != "Longititude" && key != "Setup_meta" && key != "Service_status" && key != "Service_type" && key !="TaskExecutorName") {
                        count++;
                        var field = key;
                        if (key == "Road_name")
                            field = "道路名称";
                        if (key == "Stake_number")
                            field = "起止桩号";
                        if (key == "Direction")
                            field = "方向";
                        if (key == "Start_time")
                            field = "开始时间";
                        if (key == "End_time")
                            field = "结束时间";
                        if (key == "Work_content")
                            field = "维修内容";
                        if (key == "Traffic_control")
                            field = "交管方案";
                        if (key == "Description")
                            field = "描述";
                        if (key == "Payment_type")
                            field = "计费方式";

                        var _data = {
                            Index: count.toString(),
                            Field: field,
                            Value: workzone[key]
                        };

                        $("#workzone_info").bootstrapTable('append', _data);
                    }                   
                }    
              

                workzone_data = workzone;

            }
            else
                toastr.error(result.erro);

        }
    });

}

function initMap() {
    // 百度地图API功能
    // GL版命名空间为BMapGL
    // 按住鼠标右键，修改倾斜角和角度
    var map = new BMapGL.Map("allmap");    // 创建Map实例
    map.centerAndZoom(new BMapGL.Point(121.24444, 31.152802), 19);

    map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
    map.enableContinuousZoom();    //启用地图惯性拖拽，默认禁用
    map.setTrafficOn(); // 开启路况
    // map.setTrafficOff(); // 关闭路况

    var record_id = '4';
    var device_name = 'Led屏2';
    var device_type = 'LED';
    var device_specification = '长4m，宽2m，户外屏';
    var content = '前方限速：80km/h';
    var device_status = '在线';
    var update_time = '2020-10-27 22:28';
    var sContent = "<table class='table table-condensed'><thead><tr><th>项目</th><th>值</th></tr></thead><tbody>" +
        "<tr><td>类型</td><td>" + device_type + "</td></tr>" +
        "<tr><td>规格</td><td>" + device_specification + "</td></tr>" +
        "<tr><td>显示内容</td><td>" + content + "</td></tr>" +
        "<tr><td>状态</td><td>" + device_status + "</td></tr>" +
        "<tr><td>更新时间</td><td>" + update_time + "</td></tr>" + " </tbody></table>" +
        "<div class='text-right pb-2'><a class='btn btn-primary btn-sm' href='/Device/Details/" + record_id + "'>详情</a><div>" +
        "</div>";


    // 创建LED图标
    var myIcon = new BMapGL.Icon("/images/LED.png", new BMapGL.Size(50, 40));

    // 创建Marker标注，使用LED图标
    var marker = new BMapGL.Marker(new BMapGL.Point(121.243766, 31.152829), {
        enableDragging: true,
        icon: myIcon
    });

    var opts = {
        width: 400,     // 信息窗口宽度
        title: device_name  // 信息窗口标题
    }
    var infoWindow = new BMapGL.InfoWindow(sContent, opts);  // 创建信息窗口对象

    map.addOverlay(marker);
    marker.addEventListener("click", function () {
        this.openInfoWindow(infoWindow);

    });

    // 创建LED图标
    marker = new BMapGL.Marker(new BMapGL.Point(121.245711, 31.152779), {
        enableDragging: true,
        icon: myIcon
    });
    opts = {
        width: 400,     // 信息窗口宽度
        title: device_name  // 信息窗口标题
    }
    infoWindow = new BMapGL.InfoWindow(sContent, opts);  // 创建信息窗口对象

    map.addOverlay(marker);
    marker.addEventListener("click", function () {
        this.openInfoWindow(infoWindow);

    });

}
