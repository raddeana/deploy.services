/**
 * 图表
 * @author Philip
 */
require.config({
    baseUrl: 'js/',
    paths: {
        'jquery': 'https://raddeana-libs.oss-cn-hangzhou.aliyuncs.com/jquery/jquery-3.3.1.min',
        'jquery-toast': 'https://raddeana-libs.oss-cn-hangzhou.aliyuncs.com/jquery/jquery.toast.min',
        'constants': 'constants/http-codes'
    },
    shim: {
		'jquery-toast': {
            deps: ['jquery']
        }
    }
})

require(['jquery', 'jquery-toast'], function () {
    let pieConfig = {
        visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series : [{
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            data:[{
                value: 235, 
                name: 'bugs'
            }, {
                value: 274, 
                name: 'releases'
            }, {
                value: 310, 
                name: 'features'
            }, {
                value: 335, 
                name: 'opts'
            }, {
                value: 400, 
                name: 'hotfix'
            }],
            roseType: 'angle',
            label: {
                normal: {
                    textStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    }
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    }

    let pieChart = echarts.init(document.getElementById('pie'))

    pieChart.setOption(pieConfig)

    let colors = ['#5793f3', '#d14a61', '#675bba']
    let axisConfig = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['Push', 'Release']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name:'Push',
            type:'line',
            stack: '总量',
            data:[120, 132, 101, 134, 90, 230, 210]
        }, {
            name:'Release',
            type:'line',
            stack: '总量',
            data:[220, 182, 191, 234, 290, 330, 310]
        }],
        toolbox: {
            show: false,
        }
    }

    let axisChart = echarts.init(document.getElementById('axis'))
    axisChart.setOption(axisConfig)

    window.onresize = () => {
        pieChart.resize()
        axisChart.resize()
    }
})