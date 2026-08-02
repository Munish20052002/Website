import fs from "fs";
import path from "path";
import https from "https";

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadFile(response.headers.location, destPath).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        reject(new Error(`Failed with status ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on("finish", () => {
        file.close(() => resolve(true));
      });
    }).on("error", (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

async function run() {
  try {
    const res = await fetch("https://archive.org/metadata/100LoveSongs/files");
    const json = await res.json();
    const files = json.result || [];
    const tumSeHi = files.find(f => f.name && f.name.toLowerCase().includes("tum se hi") && f.name.endsWith(".mp3"));
    if (tumSeHi) {
      const url = `https://archive.org/download/100LoveSongs/${encodeURIComponent(tumSeHi.name)}`;
      console.log(`Downloading Tum Se Hi from ${url}`);
      await downloadFile(url, path.join(process.cwd(), "public", "audio", "intro.mp3"));
      console.log("Successfully saved intro.mp3!");
    } else {
      // Find any popular romantic hindi mp3 in collection
      const anyMp3 = files.find(f => f.name && f.name.endsWith(".mp3"));
      if (anyMp3) {
        const url = `https://archive.org/download/100LoveSongs/${encodeURIComponent(anyMp3.name)}`;
        console.log(`Downloading Romantic Song: ${anyMp3.name}`);
        await downloadFile(url, path.join(process.cwd(), "public", "audio", "intro.mp3"));
        console.log("Successfully saved intro.mp3!");
      }
    }
  } catch (e) {
    console.error("Download error:", e.message);
  }
}

run();
