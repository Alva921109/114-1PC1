import fs from 'fs';
import path from 'path';
import { getContentType } from './mimeTypes.js';
import { render404 } from './templateRenderer.js';

// 抽取靜態文件處理邏輯
function handleStaticFile(res, filePath) {
  
  fs.readFile(filePath, (err, content) => {
    if (err) {
      // 文件不存在 → 顯示 404 頁面
      render404(res);
    } else {
      // 文件存在 → 設定 Content-Type 後回傳
      const extname = path.extname(filePath);
      const contentType = getContentType(extname);

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
}

export { handleStaticFile };