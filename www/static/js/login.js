/**
 * 登录
 * @author Philip
 */
(() => {
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
        } else {
            buttonLogin.removeAttr('disabled');
        }
    }

    $form.submit((e) => {
        e.preventDefault()

        let username = $username.val()
        let password = $password.val()

        if (!username && !unReg.test(username)) {
            $.toast({
                heading: '服务器或者网络错误',
                text: '用户名填写错误',
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
                heading: '服务器或者网络错误',
                text: '密码填写错误',
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
            url: '/admin/login',
            method: 'post',
            data: {
                username,
                password
            }
        }).then(() => {
            window.location.href = '/admin'
        }, (res) => {
            $.toast({
                heading: '服务器或者网络错误',
                text: res.message || `未知错误${res.status}`,
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


})()