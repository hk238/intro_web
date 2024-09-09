const express = require('express');
const path = require('path');

// Express 앱 초기화
const app = express();

// 정적 파일 제공 (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// 서버 실행
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});