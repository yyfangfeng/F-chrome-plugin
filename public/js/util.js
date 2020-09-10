// F-chrome-plugin 通用输出
function F_console (log, css) {
    let log_sub = '%c F-chrome-plugin -----> %c ' + log
    let css_str = ''

    if (css === 'success') {
        css_str = 'color: #78C2AD'
    }

    if (css === 'error') {
        css_str = 'color: #f00'
    }

    if (css === 'default') {
        css_str = 'color: #005cc5'
    }

    console.log(log_sub, 'color: #6b6b6b', css_str)
}