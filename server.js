import { createServer } from "http";
import { readFile } from "fs";
import { join, extname as _extname } from "path";

const PORT = 3000;
const BASE_DIR = join(__dirname, "html");

const server = createServer((req, res) => {
  // Определяем путь к файлу
  let filePath = join(BASE_DIR, req.url === "/" ? "index.html" : req.url);

  // Получаем расширение файла для определения Content-Type
  const extname = _extname(filePath);
  let contentType = "text/html";

  // Устанавливаем правильный Content-Type
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
    case ".ico":
      contentType = "image/x-icon";
      break;
  }

  // Читаем файл
  readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        // Файл не найден
        res.writeHead(404);
        res.end("Файл не найден");
      } else {
        // Ошибка сервера
        res.writeHead(500);
        res.end(`Ошибка сервера: ${err.code}`);
      }
    } else {
      // Успешный ответ
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

server.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}/`);
  console.log("Для остановки сервера нажмите Ctrl+C");
});
