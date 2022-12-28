import * as express from "express";
const router = express.Router();
import {
  getAllGigsHandler,
  createGigHandler,
  getGigHandler,
  updateGigHandler,
  deleteGigHandler,
} from "../controllers/gigController";

router.route("/").get(getAllGigsHandler).post(createGigHandler);
router
  .route("/:id")
  .get(getGigHandler)
  .put(updateGigHandler)
  .delete(deleteGigHandler);

module.exports = router;
