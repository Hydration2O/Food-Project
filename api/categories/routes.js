const express = require("express");
const router = express.Router();

const {
  listCategoryController,
  createNewCategoryController,
  updateCategoryController,
  deleteCategoryController,
} = require("./controllers");

router.get("/", listCategoryController);

router.post("/", createNewCategoryController);

router.put("/:categoryId", updateCategoryController);

router.delete("/:categoryId", deleteCategoryController);

module.exports = router;
