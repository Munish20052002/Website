import fs from "fs";
import path from "path";
import https from "https";

function getJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    }).on("error", reject);
  });
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
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
          resolve(stats.size);
        });
      });
    }).on("error", reject);
  });
}

async function main() {
  const albums = ["jamendo-525892", "jamendo-515968", "jamendo-562737"];

  for (const item of albums) {
    try {
      console.log(`Checking metadata for ${item}...`);
      const meta = await getJson(`https://archive.org/metadata/${item}`);
      const mp3Files = meta.files.filter((f) => f.name && f.name.endsWith(".mp3") && f.format === "VBR MP3");
      console.log(`Found MP3s in ${item}:`, mp3Files.map((f) => f.name));

      if (mp3Files.length > 0) {
        const chosen = mp3Files[0];
        const downloadUrl = `https://archive.org/download/${item}/${encodeURIComponent(chosen.name)}`;
        const dest = path.join(process.cwd(), "public", "audio", "romantic-theme.mp3");
        console.log(`Downloading ${downloadUrl} to ${dest}...`);
        const size = await downloadFile(downloadUrl, dest);
        console.log(`Successfully downloaded ${size} bytes!`);
        return;
      }
    } catch (e) {
      console.error(`Error with ${item}:`, e.message);
    }
  }
}

main();
