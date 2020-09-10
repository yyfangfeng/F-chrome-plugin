// 构建开关组件
config.forEach((val) => {
    let html = 
    `<div>
        <h3>${val.caption}</h3>
        <div id="${val.id.replace(/#/g, '')}" class="div1 close">
            <div class="div2"></div>
        </div>
    </div>`
    $('body #F_switch').append(html)
    TapHtml(val.id, val.name)
})

// 获取存储在本地的数据
let storage_arr = config.map((dic) => dic.name)
chrome.storage.local.get(storage_arr, (r) => {
    // 判断是否开启开关
    config.forEach((val) => {
        if (r[val.name]) {
            $(val.id).addClass('open').removeClass('close')
        } else {
            $(val.id).addClass('close').removeClass('open')
        }
    })
})

// 设置开关
function TapHtml (name, local_name) {
    $(name).click((e) => {
        e.stopPropagation()
        let dclass1 = $(name).attr('class').split(' ')
    
        if (dclass1.indexOf('close') >= 0) {
            $(name).addClass('open').removeClass('close')
            
            // 设置按钮打开
            chrome.storage.local.set({
                [local_name]: true
            })
            
        } else {
            $(name).addClass('close').removeClass('open')
    
            // 设置按钮关闭
            chrome.storage.local.set({
                [local_name]: false
            })
        }
    })
}
