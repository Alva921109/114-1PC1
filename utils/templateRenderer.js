import fs from 'fs';
import ejs from 'ejs';

// 抽取 EJS 模板渲染邏輯
function renderTemplate(res, filePath, data = {}) {
  fs.readFile(filePath, 'utf8', (err, template) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('錯誤：無法讀取模板文件 - ' + err.message);
      return;
    }

    const html = ejs.render(template, data);

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  });
}

function render404(res) {
  fs.readFile(('.' + '/index3.ejs'), 'utf8', (err, template) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('錯誤：無法讀取模板文件 - ' + err.message);
      return;
    }

    const html = ejs.render(template);
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(html);
  });
}

export { renderTemplate, render404 };