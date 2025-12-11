import fs from "fs";
import path from "path";

const logDir = path.resolve(import.meta.dirname, "..", "logs");

const levelType = ["error", "info", "warn"];

const MAX_FILE_SIZE = 2.5 * 1024 * 1024; // in mib

const logRotate = (logDir) => {
  // rotate log of all files
  const files = fs.readdirSync(logDir);
  for (const file of files) {
    const fileMeta = fs.statSync(path.join(logDir, file));
    console.log(fileMeta, "the file meta");
    const size = fileMeta.size;
    if (size > MAX_FILE_SIZE) {
      const readBytes = Math.floor(MAX_FILE_SIZE / 2);
      const startFrom = size - readBytes;
      const buffer = Buffer.alloc(readBytes);
      const fd = fs.openSync(path.join(logDir, file), "r");
      fs.readSync(fd, buffer, 0, readBytes, startFrom);

      fs.close(fd);
      fs.writeFileSync(path.join(logDir, file), buffer.toString());
    }
  }
};

const createLogs = (logDir, level, message) => {
  //check logs files exits
  levelType.map((file) => {
    const logFile = path.join(logDir, `${file}.txt`);
    if (!fs.existsSync(logFile)) {
      fs.writeFileSync(logFile, "");
    }
  });
  logRotate(logDir);
  //create the log message
  const log = `[${new Date().toISOString()}]: [${level}]: Message:-> \n${message}\n\n`;
  const logFile = path.join(logDir, `${level}.txt`);
  fs.appendFileSync(logFile, log);
};

export const errorLogger = (message) => {
  return createLogs(logDir, "error", message);
};
