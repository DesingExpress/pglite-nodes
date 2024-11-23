// my-pglite-worker.js
import { PGlite } from "@electric-sql/pglite";
import { worker } from "@electric-sql/pglite/worker";
// import { OpfsAhpFS } from "@electric-sql/pglite/opfs-ahp";
// import { live } from "@electric-sql/pglite/live";

worker({
  async init(options) {
    // Create and return a PGlite instance
    return new PGlite("idb://", {
      relaxedDurability: true,
      initialMemory: 2147483648,
    });
  },
});
