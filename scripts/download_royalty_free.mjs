import fs from "fs";
import path from "path";
import https from "https";
import http from "http";

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith("https") ? https : http;
    const req = client.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        console.log(`Redirecting to ${res.headers.location}`);
        return resolve(downloadFile(res.headers.location, destPath));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode}`));
      }

      const file = fs.createWriteStream(destPath);
      res.pipe(file);
      file.on("finish", () => {
        file.close(() => {
          const stats = fs.statSync(destPath);
          console.log(`Downloaded ${stats.size} bytes to ${destPath}`);
          resolve(stats.size);
        });
      });
    });
    req.on("error", reject);
  });
}

async function main() {
  const dest = path.join(process.cwd(), "public", "audio", "romantic-theme.mp3");
  const candidates = [
    "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Heartwarming.mp3",
    "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Carefree.mp3",
    "https://incompetech.com/music/royalty-free/mp3-royaltyfree/Sweet%20Promise.mp3",
    "https://archive.org/download/GymnopedieNo.1/GymnopedieNo.1.mp3"
  ];

  for (const url of candidates) {
    try {
      console.log(`Trying ${url}...`);
      const size = await downloadFile(url, dest);
      if (size > 100000) {
        console.log(`Success! Saved ${size} bytes from ${url}`);
        return;
      }
    } catch (e) {
      console.error(`Failed ${url}:`, e.message);
    }
  }
}

main();
