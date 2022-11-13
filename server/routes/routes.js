import express from "express";
import {
  signupController,
  loginController,
  logoutController,
  forgotPasswordLinkController,
  forgotPasswordResetController,
} from "../controllers/userControllers.js";

import {
  addTransactionController,
  getTransactionsController,
  deleteTransactionController,
} from "../controllers/transactionController.js";

import auth from "../middleware/auth.js";

const router = new express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/logout", auth, logoutController);
router.post("/forgotPasswordlink", forgotPasswordLinkController);
router.post("/forgotPasswordReset/:id", forgotPasswordResetController);

router.post("/transaction", auth, addTransactionController);
router.get("/transaction", auth, getTransactionsController);
router.delete("/transaction/:id", auth, deleteTransactionController);

export default router;
