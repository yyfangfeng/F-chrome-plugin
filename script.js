// 页面加载
document.addEventListener('DOMContentLoaded', function () {
    getIsOpen()
})

// 判断是否启动开关
function getIsOpen () {
    let storage_arr = config.map((dic) => dic.name)
    chrome.storage.local.get(storage_arr, (r) => {
        init(r, 'load')
    })
    // 修改存储的数据则调用
    chrome.storage.onChanged.addListener((r) => {
        init(r, 'change')
    })
}


// 调用初始化
function init (r, type) {
    console.log(window.location)

    for (let key in r) {
        let cfg = config.find((dic) => key === dic.name)

        if (r[key] === true || (r[key] && r[key].newValue)) {
            if (cfg && (typeof window[cfg.execute[0]] === 'function')) {

                if (cfg.matches === '*' || cfg.matches.indexOf(window.location.hostname) > -1) {
                    window[cfg.execute[0]](cfg)
                    F_console(`开启《${cfg.caption}》`, 'success')
                }
                
            } else {
                F_console(`${cfg.name} 开启方法不存在`, 'error')
            }
            
        } else {
            if (type === 'change') {
                if (cfg && (typeof window[cfg.execute[1]] === 'function')) {

                    if (cfg.matches === '*' && cfg.matches.indexOf(window.location.hostname) > -1) {
                        window[cfg.execute[1]](cfg)
                        F_console(`关闭《${cfg.caption}》`, 'error')
                    }

                } else {
                    F_console(`${cfg.name} 关闭方法不存在`, 'error')
                }
            }
        }
    }
}
