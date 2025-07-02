import { app } from "./app";
import initDataFake from "./mock.data/seed";
import { connection } from "./config/database";

const port = app.get("port");

async function startServer() {
  try {
    await connection();
    const server = app.listen(port, onListening);
    server.on("error", onError);
  } catch (err) {
    process.exit(1); // Không khởi chạy server nếu lỗi kết nối DB
  }
}

startServer();

function onError(error: NodeJS.ErrnoException) {
  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;
  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
}

function onListening() {
  const addr = app.get("port");
  console.log(`🚀 Server is listening on port ${addr}`);

  // Luôn gọi initDataFake để insert dữ liệu giả ở mọi môi trường
  initDataFake();
}

export default app;
