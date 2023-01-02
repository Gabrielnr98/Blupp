import express from "express";
const router = express.Router();
import {
  getAllUsersHandler,
  createUserHandler,
  getUserHandler,
  updateUserHandler,
  deleteUserHandler,
} from "../controllers/userController";

router.route("/").get(getAllUsersHandler).post(createUserHandler);
router
  .route("/:id")
  .get(getUserHandler)
  .put(updateUserHandler)
  .delete(deleteUserHandler);

module.exports = router;
