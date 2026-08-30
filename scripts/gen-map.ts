import config from "@payload-config";
import { generateImportMap } from "payload";

async function run() {
  console.log("Generating import map...");
  await generateImportMap(await config);
  console.log("Import map generated successfully!");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
