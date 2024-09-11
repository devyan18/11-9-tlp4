import "dotenv/config";

import { app } from "./server";

async function main() {
  await app.database();
  app.middleware();
  app.listen();
}

main();
