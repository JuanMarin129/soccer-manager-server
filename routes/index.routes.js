const router = require("express").Router();

// ℹ️ Test Route. Can be left and used for waking up the server if idle
router.get("/", (req, res, next) => {
  res.json("All good in here");
});


const authRouter = require("./auth.routes");
router.use("/auth", authRouter)

const matchRouter = require("./match.routes");
router.use("/match", matchRouter);

const commentRouter = require("./comment.routes");
router.use("/comment", commentRouter)

const userRouter = require("./user.routes");
router.use("/user", userRouter)

const uploadRoutes = require("./upload.routes");
router.use("/upload", uploadRoutes);



module.exports = router;
