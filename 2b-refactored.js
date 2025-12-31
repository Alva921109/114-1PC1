import http from 'http';
import path from 'path';
import { renderTemplate } from './utils/templateRenderer.js';
import { handleStaticFile } from './utils/staticFileHandler.js';

http.createServer((req, res) => {

  let filePath = '';
  let fileOtherFile = '';
  var data;

  switch (req.url) {
    case '/':
      filePath = '/index.ejs';
      data = { data: "您好 xxx" };
      break;
    case '/calculator':
      filePath = '/index2.ejs';
      break;
    default:
      filePath = req.url;
      fileOtherFile = filePath;
  }

  const extname = (fileOtherFile === '') ? path.extname(filePath) : path.extname(fileOtherFile);

  // EJS 模板
  if (extname === '.ejs') {
    renderTemplate(res, ('.' + filePath), data || {});
  } else {
    // 靜態文件
    const staticFilePath = '.' + fileOtherFile;
    handleStaticFile(res, staticFilePath);
  }

}).listen(3000, () => {
  console.log('伺服器已啟動！請訪問 http://localhost:3000');
  console.log('可用路由：');
  console.log('  - http://localhost:3000');
  console.log('  - http://localhost:3000/calculator');
  console.log('  - 其他路徑將顯示 404 錯誤頁面');
});