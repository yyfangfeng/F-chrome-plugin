# FFF-switch 开发须知

## manifest.json 配置

> 以下是需要修改的配置

* `browser_action -> default_icon` 以后可能需要修改插件封面图标
* `browser_action -> default_popup` 用于插件显示的界面
* `permissions` 对于某些浏览器高级功能，需要添加进此数组，才可以调用
* `icons -> 128` 跟着 `default_icon` 图标一起修改
* `content_scripts -> matches` 插件只对数组内的网址起作用
* `content_scripts -> js` 引入的 js 文件，数组内 js 文件，可访问数组内 js 文件的 变靓、函数

```json
{
	"name": "插件名称",
	"manifest_version": 2,
	"version": "1.0",
	"description": "描述",
	"browser_action": {
		"default_icon": "public/img/FFF_switch.png",
		"default_popup": "html/popup.html"
	},
	"permissions": [
		"storage"
	],
	"icons": {
		"128": "public/img/FFF_switch.png"
	},
	"content_scripts": [
		{
			"matches": [
                "https://www.baidu.com/*",
                ...
			],
			"js": [
				"public/js/jquery-3.1.1.min.js", "public/js/util.js",
				"script/add_code.js", "script/clock_in.js", "script/hide_img.js",
				"html/config.js", "html/popup.js", "script.js"
			],
			"run_at": "document_start"
		}
	]
}
```

<br/>

## config 配置

* `name` 开关的 键，用于存储到本地，判断是否开启，如：is_test
* `id` html 开关的 id，如：#switch_test
* `caption` 提示文字，如：测试测试
* `execute` 开关需要执行的事件，如：[ 开启事件, 关闭事件 ]
* `matches` 配置的插件功能只针对数组内的网址有效，`*` 为对全部 `url` 有效

```javascript
// 配置开关
let config = [
    {
        name: 'is_test',
        id: '#switch_test',
        caption: '测试测试',
        execute: ['testEd', 'test'],
        matches: [
            'www.baidu.com'
        ]
    },
    ...
]
```

<br/>

## script 代码编写

1. 首先在 `config.js` 文件内增加配置

    ```javascript
    // 配置开关
    let config = [
        {
            name: 'is_test',
            id: '#switch_test',
            caption: '测试测试',
            execute: ['testEd', 'test']
        },
        ...
    ]
    ```

2. 到 `script` 文件夹内，增加当前开关所需的代码文件

    > `script/test.js`

    * 写入代码

    ```javascript
    // 在 config.js 内配置的 开启事件
    function testEd () {
        console.log('开启事件')
    }

    // 在 config.js 内配置的 关闭事件
    function test () {
        console.log('关闭事件')
    }
    ```

3. 接着到 `manifest.json` 添加配置

    > 加入 `script/test.js` 文件

    ```json
    {
        ...
        "content_scripts": [
            {
                "js": [
                    ...
                    "script/test.js"
                ]
            }
        ]
    }
    ```

4. 修改了插件代码，需要刷新一下当前网页，才会生效

5. 然后开启开关，关闭开关，页面中就会调用编写的方法函数了