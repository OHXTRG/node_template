import express from "express";
import { registerController } from "../../controller/auth.controller.js";
import { createCustomError } from "../../utils/createError.js";
const router = express.Router();

/**
 * @openapi
 * /api/v1/auth/test:
 *    get:
 *      summary : Test auth api
 *      tags : [Test]
 *      responses :
 *        200 :
 *          description : success
 */
router.route("/test").get((req, res) => {
  throw createCustomError(404, "this is custom error");
  res.send("auth routes are working");
});

router.route("/register").post(registerController);

export default router;
