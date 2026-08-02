import fs from "fs";
import path from "path";
import https from "https";

async function fetchJson(url) {
  const res = await fetch(url);
  return await res.json();
}

async function downloadFile(url, destPath) {
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

async function main() {
  console.log("Searching for Tere Liye and Romantic Hindi tracks on Archive.org...");

  // 1. Search for Tere Liye
  try {
    const searchUrl = "https://archive.org/advancedsearch.php?q=title:(Tere%20Liye)%20AND%20mediatype:(audio)&fl[]=identifier,title&output=json&rows=10";
    const data = await fetchJson(searchUrl);
    const docs = data?.response?.docs || [];
    console.log(`Found ${docs.length} candidate items for Tere Liye`);

    let downloaded = false;
    for (const doc of docs) {
      if (downloaded) break;
      const metaUrl = `https://archive.org/metadata/${doc.identifier}/files`;
      const meta = await fetchJson(metaUrl);
      const files = meta?.result || [];
      const mp3File = files.find(f => f.name?.endsWith(".mp3") && (f.name?.toLowerCase().includes("tere") || f.title?.toLowerCase().includes("tere")));
      if (mp3File) {
        const downloadUrl = `https://archive.org/download/${doc.identifier}/${encodeURIComponent(mp3File.name)}`;
        console.log(`Downloading Tere Liye from: ${downloadUrl}`);
        const dest = path.join(process.cwd(), "public", "audio", "tere-liye.mp3");
        await downloadFile(downloadUrl, dest);
        console.log(`Successfully saved Tere Liye to ${dest}`);
        downloaded = true;
      }
    }
  } catch (err) {
    console.error("Error fetching Tere Liye:", err.message);
  }

  // 2. Search for Romantic Hindi / Tum Hi Ho
  try {
    const searchUrl2 = "https://archive.org/advancedsearch.php?q=title:(Tum%20Hi%20Ho)%20AND%20mediatype:(audio)&fl[]=identifier,title&output=json&rows=10";
    const data2 = await fetchJson(searchUrl2);
    const docs2 = data2?.response?.docs || [];
    console.log(`Found ${docs2.length} candidate items for Romantic Hindi Intro`);

    let downloadedIntro = false;
    for (const doc of docs2) {
      if (downloadedIntro) break;
      const metaUrl = `https://archive.org/metadata/${doc.identifier}/files`;
      const meta = await fetchJson(metaUrl);
      const files = meta?.result || [];
      const mp3File = files.find(f => f.name?.endsWith(".mp3") && (f.name?.toLowerCase().includes("tum") || f.title?.toLowerCase().includes("tum")));
      if (mp3File) {
        const downloadUrl = `https://archive.org/download/${doc.identifier}/${encodeURIComponent(mp3File.name)}`;
        console.log(`Downloading Intro Romantic from: ${downloadUrl}`);
        const dest = path.join(process.cwd(), "public", "audio", "intro.mp3");
        await downloadFile(downloadUrl, dest);
        console.log(`Successfully saved Intro Romantic to ${dest}`);
        downloadedIntro = true;
      }
    }
  } catch (err) {
    console.error("Error fetching Intro track:", err.message);
  }
}

main();
