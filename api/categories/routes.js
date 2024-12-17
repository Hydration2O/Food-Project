const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  },
});

const upload = multer({
  storage,
});

const {
  listCategoryController,
  createNewCategoryController,
  updateCategoryController,
  deleteCategoryController,
  listCategoryIdController,
} = require("./controllers");

router.get("/", listCategoryController);

router.get("/:categoryId", listCategoryIdController);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  createNewCategoryController
);

router.put(
  "/:categoryId",
  passport.authenticate("jwt", { session: false }),
  updateCategoryController
);

router.delete(
  "/:categoryId",
  passport.authenticate("jwt", { session: false }),
  deleteCategoryController
);

module.exports = router;
//todo make controllers use the passport
