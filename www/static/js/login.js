/**
 * 登录
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
    let $form = $('#form')
    let $username = $('#login-form-input__username')
    let $password = $('#login-form-input__password')

    let buttonLogin = $('#button-login')
    let messageProcessing = $('#message-processing')

    let unReg = /\w{6,}/
    let pwReg = /$\w(\w|\d){7,}^/

    let toggleProcessing = function (processing) {
        if (processing) {
            buttonLogin.attr('disabled', 'disabled');
            buttonLogin.html('正在登录...');
        } else {
            buttonLogin.removeAttr('disabled');
            buttonLogin.html('登录');
        }
    }

    $form.submit((e) => {
        e.preventDefault()

        let username = $username.val()
        let password = $password.val()

        if (!username && !unReg.test(username)) {
            $.toast({
                heading: '用户名填写错误',
                position: {
                    top: 20,
                    right: 85
                },
                icon: 'warning'
            })

            return
        }

        if (!password && !pwReg.test(password)) {
            $.toast({
                heading: '密码填写错误',
                position: {
                    top: 20,
                    right: 85
                },
                icon: 'warning'
            })

            return
        }

        toggleProcessing(true)

        $.ajax({
            url: '/api/login',
            method: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                username,
                password
            }),
        }).then(() => {
            window.location.href = '/charts'
        }, (res) => {
            let { status, responseJSON } = res
            let { message } = responseJSON

            $.toast({
                text: message || `未知错误${status}`,
                position: {
                    top: 20,
                    right: 85
                },
                icon: 'error'
            })
        }).done(() => {
            toggleProcessing(false)
        })
    })
})
