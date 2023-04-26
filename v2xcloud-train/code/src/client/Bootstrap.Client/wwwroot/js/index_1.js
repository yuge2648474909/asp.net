$(function () {
    initChart1();
    initChart2();
    initChart3(); 
});

function initChart1() {

    $.bc({
        url: "api/Home/InitChart_department1",
        method: 'get',
        callback: function (result) {
            if (result) {
                             
                var count_department_used = result.count_department_used;
                var count_departments_all = result.count_departments_all;
                var data = [{ value: count_department_used, name: '已使用部门' },
                    { value: count_departments_all - count_department_used, name: '未使用部门' }];

                var dom1 = document.getElementById("businessChart_1");
                var myChart1 = echarts.init(dom1, 'wonderland');
                var app1 = {};

                var option1;


                option1 = {
                    title: {
                        text: '功能使用'
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: { show: true },
                            dataView: { show: true, readOnly: false },
                            restore: { show: true },
                            saveAsImage: { show: true }
                        }
                    },
                    legend: {
                        top: 'bottom'
                    },
                    series: [
                        {
                            //name: '业务情况',
                            type: 'pie',
                            radius: ['40%', '70%'],
                            avoidLabelOverlap: false,
                            itemStyle: {
                                borderRadius: 10,
                                borderColor: '#fff',
                                borderWidth: 2
                            },
                            label: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: '24',
                                    fontWeight: 'bold'
                                }
                            },
                            labelLine: {
                                show: true
                            },
                            data: data
                        }
                    ]
                };

                if (option1 && typeof option1 === 'object') {
                    $('#businessLoading_1').addClass('d-none');
                    myChart1.setOption(option1);
                    window.addEventListener("resize", function () {
                        myChart1.resize();
                    });
                }

            }
        }
    }); 
}
function initChart2() {
    $.bc({
        url: "api/Home/InitChart_department2",
        method: 'get',
        callback: function (result) {
            if (result) {

                var data = result.departmentUsed;
                
                var dom2 = document.getElementById("businessChart_2");
                var myChart2 = echarts.init(dom2);
                var app2 = {};

                var option2;



                var option2 = {
                    title: {
                        text: '部门用量'
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        top: 'bottom'
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: { show: true },
                            dataView: { show: true, readOnly: false },
                            restore: { show: true },
                            saveAsImage: { show: true }
                        }
                    },
                    series: [
                        {
                            //name: '面积模式',
                            type: 'pie',
                            radius: [50, 100],
                            center: ['50%', '50%'],
                            roseType: 'area',
                            itemStyle: {
                                borderRadius: 8
                            },
                            label: {
                                show: false,
                                position: 'center'
                            },
                            data: data
                        }
                    ]
                };

                if (option2 && typeof option2 === 'object') {
                    $('#businessLoading_2').addClass('d-none');
                    myChart2.setOption(option2);
                    window.addEventListener("resize", function () {
                        myChart2.resize();
                    });
                }

            }
        }
    });    

}
function initChart3() {
    $.bc({
        url: "api/Home/InitChart_Login",
        method: 'get',
        callback: function (result) {
            if (result) {
                var data = result.logMonth;

                var dom3 = document.getElementById("loginChart");
                var myChart3 = echarts.init(dom3);
                var app3 = {};

                var option3;



                option3 = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['今年使用时长']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataView: { show: true, readOnly: false },
                            magicType: { show: true, type: ['line', 'bar'] },
                            restore: { show: true },
                            saveAsImage: { show: true }
                        }
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '使用次数',
                            type: 'bar',
                            data: data,
                            markPoint: {
                                data: [
                                    { type: 'max', name: '最大值' },
                                    { type: 'min', name: '最小值' }
                                ]
                            },
                            markLine: {
                                data: [
                                    { type: 'average', name: '平均值' }
                                ]
                            }
                        }
                    ]
                };

                if (option3 && typeof option3 === 'object') {
                    $('#loginLoading').addClass('d-none');
                    myChart3.setOption(option3);
                    window.addEventListener("resize", function () {
                        myChart3.resize();
                    });
                }

            }
        }
    });
   
}