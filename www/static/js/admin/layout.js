/**
 * 框架代码
 * @author Philip
 */
(function () {
    let $save_new_password = $('#save-new-password')
    let $password = $('#password')
    let $re_password = $('#re-password')

    function toggleProcessing (processing) {
        if (processing) {
            save_new_password.attr('disabled', 'disabled');
            save_new_password.html('正在登录...');
        } else {
            save_new_password.removeAttr('disabled');
            save_new_password.html('登录');
        }
    }

    toggleProcessing(true)

    $save_new_password.click(function () {
        let password = $password.val()
        let re_password = $re_password.val()

        $.ajax({
            url: '/api/modify-password',
            method: 'post',
            success: (res) => {
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
            },
            error: () => {
                toggleProcessing(false)
            }
        })
    })
})()
