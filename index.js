
const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const PORT = process.env.PORT || 5000;
const app = express();
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());

app.listen(PORT, () => {
  console.log("Server running at http://localhost:", PORT);
});

app.get("/", (_, res) => {
  var msg = "hello there";
  res.json({ status: 200, msg: msg });
});

app.get("/play", async (req, res, next) => {
  try {
    const url = req.query.url;
    if (!ytdl.validateURL(url)) {
      return res.status(400).send({
        status: "failed",
        message: "Invalid url",
      });
    }

    const info = await ytdl.getInfo(url);
    const videoFormat = ytdl.chooseFormat(info.formats, { quality: 'highest' });

    if (!videoFormat) {
      return res.status(400).send({
        status: "failed",
        message: "Video format not available",
      });
    }

    res.json({
      status: 200,
      videoInfo: info.videoDetails,
      playbackUrl: videoFormat.url,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: "failed",
      message: "An error occurred while processing this request.",
    });
  }
});
