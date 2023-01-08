export const editorConfig = {                       // JS 语法
    placeholder: '请输入内容...',
    MENU_CONF: {}

// 其他属性...
}

editorConfig.MENU_CONF['uploadImage'] = {
    // 其他配置...

    // 小于该值就插入 base64 格式（而不上传），默认为 0
    base64LimitSize: 20*1024 * 1024 // 5kb
}
export const newstyle='<style>.editor-content-view {border: 3px solid #ccc;border-radius: 5px;padding: 0 10px;margin-top: 20px;overflow-x: auto;}.editor-content-view p,.editor-content-view li {white-space: pre-wrap;/* 保留空格 */}.editor-content-view blockquote {border-left: 8px solid #d0e5f2;padding: 10px 10px;margin: 10px 0;background-color: #f1f1f1;}.editor-content-view code {font-family: monospace;background-color: #eee;padding: 3px;border-radius: 3px;}.editor-content-view pre>code {display: block;padding: 10px;}.editor-content-view table {border-collapse: collapse;}.editor-content-view td,.editor-content-view th {border: 1px solid #ccc;min-width: 50px;height: 20px;}.editor-content-view th {background-color: #f1f1f1;}.editor-content-view ul,.editor-content-view ol {padding-left: 20px;}.editor-content-view input[type="checkbox"] {margin-right: 5px;}/* table 样式 */table {border-top: 1px solid #ccc;border-left: 1px solid #ccc;}table td,table th {border-bottom: 1px solid #ccc;border-right: 1px solid #ccc;padding: 3px 5px;}table th {border-bottom: 2px solid #ccc;text-align: center;}/* blockquote 样式 */blockquote {display: block;border-left: 8px solid #d0e5f2;padding: 5px 10px;margin: 10px 0;line-height: 1.4;font-size: 100%;background-color: #f1f1f1;}/* code 样式 */code {display: inline-block;*display: inline;*zoom: 1;background-color: #f1f1f1;border-radius: 3px;padding: 3px 5px;margin: 0 3px;}pre code {display: block;}/* ul ol 样式 */ul,ol {margin: 10px 0 10px 20px;}</style>'
