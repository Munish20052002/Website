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
  const item = "no-copy-right-pzm-1-stephanie-poetri-i-love-you-3000";
  console.log(`Checking metadata for ${item}...`);
  const meta = await getJson(`https://archive.org/metadata/${item}`);
  const match = meta.files.find((f) => f.name && f.name.toLowerCase().includes("perfect") && f.name.endsWith(".mp3"));

  if (match) {
    console.log("Found file:", match.name);
    const downloadUrl = `https://archive.org/download/${item}/${encodeURIComponent(match.name)}`;
    const dest = path.join(process.cwd(), "public", "audio", "romantic-theme.mp3");
    console.log(`Downloading ${downloadUrl} to ${dest}...`);
    const size = await downloadFile(downloadUrl, dest);
    console.log(`Successfully downloaded ${size} bytes!`);
  } else {
    console.log("Files available:", meta.files.map((f) => f.name));
  }
}

main();
