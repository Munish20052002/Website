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
  console.log("Searching for Tere Liye (KK or Prince)...");
  try {
    // 1. Search for Prince 2010 Tere Liye or KK Tere Liye
    const res = await fetch("https://archive.org/advancedsearch.php?q=(Tere%20Liye)%20AND%20mediatype:(audio)&fl[]=identifier,title&output=json&rows=50");
    const json = await res.json();
    const docs = json.response?.docs || [];

    for (const doc of docs) {
      const metaRes = await fetch(`https://archive.org/metadata/${doc.identifier}/files`);
      const meta = await metaRes.json();
      const files = meta.result || [];
      const mp3 = files.find(f => f.name?.endsWith(".mp3") && f.name?.toLowerCase().includes("tere") && (f.name?.toLowerCase().includes("prince") || f.name?.toLowerCase().includes("kk") || f.title?.toLowerCase().includes("kk") || doc.title?.toLowerCase().includes("prince") || doc.title?.toLowerCase().includes("kk")));
      if (mp3) {
        const url = `https://archive.org/download/${doc.identifier}/${encodeURIComponent(mp3.name)}`;
        console.log(`Found track: ${doc.title} -> ${mp3.name} at ${url}`);
        await downloadFile(url, path.join(process.cwd(), "public", "audio", "tere-liye.mp3"));
        console.log("Successfully replaced tere-liye.mp3!");
        return;
      }
    }

    // Fallback: check other Tere Liye hits
    for (const doc of docs) {
      const metaRes = await fetch(`https://archive.org/metadata/${doc.identifier}/files`);
      const meta = await metaRes.json();
      const files = meta.result || [];
      const mp3 = files.find(f => f.name?.endsWith(".mp3") && f.name?.toLowerCase().includes("tere liye") && !f.name?.toLowerCase().includes("veer"));
      if (mp3) {
        const url = `https://archive.org/download/${doc.identifier}/${encodeURIComponent(mp3.name)}`;
        console.log(`Found alternate track: ${doc.title} -> ${mp3.name} at ${url}`);
        await downloadFile(url, path.join(process.cwd(), "public", "audio", "tere-liye.mp3"));
        console.log("Successfully replaced tere-liye.mp3!");
        return;
      }
    }
  } catch (err) {
    console.error("Error:", err.message);
  }
}

run();
