/**
 * 管理
 * @author Philip
 */
require.config({
    baseUrl: 'js/',
    paths: {
        'constants': 'constants/http-codes'
    },
    shim: {
		'jquery-toast': {
            deps: ['jquery']
        }
    }
})

require([], function () {
    
})