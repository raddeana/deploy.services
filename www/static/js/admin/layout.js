/**
 * 框架代码
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
    
})
