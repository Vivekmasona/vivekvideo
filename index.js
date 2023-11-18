const ytdl = require("ytdl-core");

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) return res.status(400).json({ error: "No YouTube link provided" });

  try {
    ytdl(url, {
      filter: function (format) {
        return !format.hasVideo;
      },
      quality: "highest",
    }).pipe(res);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Something went wrong" });
  }
}

