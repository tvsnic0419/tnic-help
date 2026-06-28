// download-canva-illustrations.js
// Run with: node download-canva-illustrations.js
/* eslint-disable @typescript-eslint/no-require-imports */

const { exec } = require('child_process');

const designs = [
  { id: "DAHNnPS9wY8", title: "Genomic Instability", filename: "genomic-instability-v2.png" },
  { id: "DAHNnEZHbmM", title: "Telomere Attrition", filename: "telomere-attrition-v2.png" },
  { id: "DAHNnMTqFC8", title: "Epigenetic Alterations", filename: "epigenetic-alterations-v2.png" },
  { id: "DAHNnIgYqlw", title: "Loss of Proteostasis", filename: "loss-of-proteostasis-v2.png" },
  { id: "DAHNnJu72wM", title: "Mitochondrial Dysfunction", filename: "mitochondrial-dysfunction-v2.png" },
  { id: "DAHNnA4eQwI", title: "Cellular Senescence", filename: "cellular-senescence-v2.png" },
  { id: "DAHNnInyzeo", title: "Stem Cell Exhaustion", filename: "stem-cell-exhaustion-v2.png" },
  { id: "DAHNnCz0AWQ", title: "Altered Intercellular Communication", filename: "altered-intercellular-communication-v2.png" },
  { id: "DAHNnGtY33c", title: "Chronic Inflammation", filename: "chronic-inflammation-v2.png" },
  { id: "DAHNnJlZra8", title: "Deregulated Nutrient Sensing", filename: "deregulated-nutrient-sensing-v2.png" },
];

const baseEditUrl = "https://www.canva.com/d/";

console.log("Opening all Canva designs for download...\n");

designs.forEach((design, index) => {
  const url = `${baseEditUrl}${design.id}`;
  console.log(`${index + 1}. ${design.title} → ${design.filename}`);
  console.log(`   ${url}\n`);

  // Open in default browser (works on Mac, Windows, Linux)
  const command = process.platform === 'win32'
    ? `start "" "${url}"`
    : process.platform === 'darwin'
      ? `open "${url}"`
      : `xdg-open "${url}"`;

  exec(command);
});

console.log("\n✅ All Canva tabs opened.");
console.log("Instructions:");
console.log("1. In each Canva tab, click Share → Download");
console.log("2. Choose PNG, set quality to High, width 1200px+");
console.log("3. Save using the exact filenames shown above");
console.log("4. Place all files in: public/assets/illustrations/hallmarks/");
