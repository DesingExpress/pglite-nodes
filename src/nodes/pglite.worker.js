// my-pglite-worker.js
import { PGlite } from "@electric-sql/pglite";
// import { OpfsAhpFS } from "@electric-sql/pglite/opfs-ahp";
import { worker } from "@electric-sql/pglite/worker";
// import { live } from "@electric-sql/pglite/live";

worker({
  async init(options = {}) {
    const { dataDir, ...opt } = options;
    // Create and return a PGlite instance
    // return new PGlite({
    //   // fs: new IdbFs('my-database'),
    //   fs: new OpfsAhpFS(dataDir ?? "/test/pglite2/", {
    //     initialPoolSize: 1000,
    //     maintainedPoolSize: 1000,
    //     debug: false,
    //   }),
    //   // extensions: { live },
    //   ...opt,
    // });
    return new PGlite("idb://my-database", {
      relaxedDurability: true,
      initialMemory: 2147483648,
    });
  },
});
