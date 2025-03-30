const router = require("express").Router();

// ℹ️ Test Route. Can be left and used for waking up the server if idle
router.get("/", (req, res, next) => {
  res.json("All good in here");
});


const authRouter = require("./auth.routes");
router.use("/auth", authRouter)

const matchRouter = require("./match.routes");
router.use("/match", matchRouter);

module.exports = router;
