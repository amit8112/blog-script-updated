import express from "express";
import AuthController from "../controllers/authController.js";
import BlogController from "../controllers/blogController.js";
import CategoryController from "./../controllers/categoryController.js";
import checkIsUserAuthenticated from "../middlewares/authMiddelware.js";
//file uploading
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `public/upload/`);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/user/register", AuthController.userRegistration);
router.post("/user/login", AuthController.userLogin);

//Protected routes

router.get(
  "/get/allblogs/:id",
  checkIsUserAuthenticated,
  BlogController.getAllBlogs
);
router.post(
  "/add/blog",
  upload.single("thumbnail"),
  checkIsUserAuthenticated,
  BlogController.addNewBlog
);
router.get(
  "/get/blog/:id",
  checkIsUserAuthenticated,
  BlogController.getSingleBlog
);

//category
router.get(
  "/get/categories",
  checkIsUserAuthenticated,
  CategoryController.getAllCategories
);
router.post(
  "/add/category",
  checkIsUserAuthenticated,
  CategoryController.addNewCategory
);

export default router;
