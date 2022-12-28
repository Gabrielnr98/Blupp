import * as express from "express";
const router = express.Router();
import {
  getUsersHandler,
  createUserHandler,
  getUserHandler,
  updateUserHandler,
  deleteUserHandler,
} from "../controllers/userController";

router.route("/").get(getUsersHandler).post(createUserHandler);
router
  .route("/:id")
  .get(getUserHandler)
  .put(updateUserHandler)
  .delete(deleteUserHandler);

module.exports = router;
