import config from "@payload-config";
import { generateTypes } from "payload/node";

async function run() {
  console.log("Generating types...");
  const resolvedConfig = await config;
  await generateTypes(resolvedConfig);
  console.log(
    "Types generated successfully at",
    resolvedConfig.typescript?.outputFile,
  );
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
