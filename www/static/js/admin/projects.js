/**
 * 项目
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

function query (pageIndex, pageSize) {
    $.ajax({
        url: '/api/projects',
        data: {
            pageIndex,
            pageSize
        },
        success: () => {

        }
    })
}

require(['jquery', 'jquery-toast'], function () {
    let $_datepickerBegin = $('#datepicker-begin')
    let $_datepickerEnd = $('#datepicker-end')
    let $_select_projects = $('#select-projects')
    let $_search = $('#search')

    $_search.click(function () {
        query(1, 10)
    })

    query(1, 10)
})