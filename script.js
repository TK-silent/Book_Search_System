// script.js

// 1. 定义字符串到 PDF 文件的映射
//    键 (key) 是用户需要输入的精确字符串
//    值 (value) 是对应 PDF 文件的相对路径
const pdfMap = {
    "文档A": "pdfs/Professional Context Handbook.pdf",
    "报告2024": "pdfs/report_2024_final.pdf",
    "秘密代码123": "pdfs/secret_project_files/confidential_123.pdf",
    "用户手册": "pdfs/user_manual_v2.pdf"
    // 在这里添加更多你的映射关系
    // "需要输入的字符串": "对应的pdf文件路径"
};

// 2. 获取搜索输入框元素
const searchInput = document.getElementById('searchInput');
const errorMessageElement = document.getElementById('errorMessage'); // 获取错误消息元素

// 3. 添加事件监听器，监听键盘按键抬起事件
searchInput.addEventListener('keyup', function(event) {
    // 检查是否按下了回车键 (Enter key)
    // event.key === 'Enter' 是现代浏览器的方式
    // event.keyCode === 13 是为了兼容旧浏览器
    if (event.key === 'Enter' || event.keyCode === 13) {
        // 获取输入框中的值，并去除前后空格
        const searchTerm = searchInput.value.trim();

        // 清除之前的错误消息 (如果按回车就尝试搜索，先清掉旧提示)
        errorMessageElement.textContent = '';
        errorMessageElement.style.visibility = 'hidden';

        // 检查输入的值是否存在于我们的 pdfMap 中 (作为键)
        // 使用 hasOwnProperty 确保是对象自身的属性，而不是原型链上的
        if (pdfMap.hasOwnProperty(searchTerm)) {
            // 如果存在，获取对应的 PDF 文件路径
            const pdfPath = pdfMap[searchTerm];
            console.log(`找到匹配: ${searchTerm}, 打开文件: ${pdfPath}`); // 在控制台输出信息，方便调试

            // 在新标签页中打开 PDF 文件
            window.open(pdfPath, '_blank');

            // 可选：清空输入框
            // searchInput.value = '';
        } else {
            // 未找到匹配项
            console.log(`未找到与 "${searchTerm}" 完全匹配的文件`);
            // 显示英文错误消息
            errorMessageElement.textContent = "Invalid book code";
            errorMessageElement.style.visibility = 'visible'; // 让错误消息可见
            // 可选：给输入框一个视觉反馈
            // searchInput.style.borderColor = '#dc3545'; // 边框变红
        }
    }
});

// 4. (新增) 监听输入事件，当用户开始输入时隐藏错误消息
searchInput.addEventListener('input', function() {
    // 如果错误消息当前是可见的，就隐藏它
    if (errorMessageElement.style.visibility === 'visible') {
        errorMessageElement.textContent = '';
        errorMessageElement.style.visibility = 'hidden';
        // searchInput.style.borderColor = '#ccc'; // 同时恢复边框颜色
    }
});

// 可选：如果你添加了搜索按钮，可以给按钮也添加点击事件监听器
/*
const searchButton = document.getElementById('searchButton');
if (searchButton) {
    searchButton.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim();
        if (pdfMap.hasOwnProperty(searchTerm)) {
            const pdfPath = pdfMap[searchTerm];
            window.open(pdfPath, '_blank');
        } else {
            console.log(`未找到与 "${searchTerm}" 完全匹配的文件`);
        }
    });
}
*/