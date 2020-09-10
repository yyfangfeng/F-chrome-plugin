
/**
 * 开关配置
 * 
 * 1、name     -->     开关的 键，用于存储到本地，判断是否开启， 如：is_open
 * 2、id       -->     html 开关的 id，        如：#open
 * 3、caption  -->     提示文字，              如：开关
 * 4、execute  -->     开关需要执行的事件，     如：[ 开启事件, 关闭事件 ]
 * 5、matches  -->     配置的插件功能只针对数组内的网址有效， * 为对全部 url 有效
 */

let config = [
    {
        name: 'is_hide_img',
        id: '#switch_img',
        caption: '把 img 标签隐藏',
        execute: ['hide_imgEd', 'hide_img'],
        matches: [
            'www.baidu.com',
            'baijiahao.baidu.com',
            'tieba.baidu.com'
        ]
    }
]