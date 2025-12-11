import { CustomeError } from "../utils/createError.js";
import { errorLogger } from "../../logger/logger.js";

const errorHandler = async (err, req, res, next) => {
  console.log("error ", err);
  const message = `status : ${err?.status}\nmessage : ${err?.message}\nstack : ${err?.stack}`;
  errorLogger(message);
  if (err instanceof CustomeError) {
    if (process.env.NODE_ENV == "development") {
      res
        .status(err.status)
        .json({ success: false, message: err.message, stack: err.stack });
    } else {
      res.status(err.status).json({ success: false, message: err.message });
    }
  } else {
    res.status(500).json({ success: false, message: "server error" });
  }
};

export default errorHandler;
