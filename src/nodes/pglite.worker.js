// my-pglite-worker.js
import { PGlite } from "@electric-sql/pglite";
// import { OpfsAhpFS } from "@electric-sql/pglite/opfs-ahp";
import { worker } from "@electric-sql/pglite/worker";
// import { live } from "@electric-sql/pglite/live";
import { uuid_ossp } from "@electric-sql/pglite/contrib/uuid_ossp";

worker({
  async init(options = {}) {
    const { dataDir, _meta } = options;
    const meta = {
      relaxedDurability: true,
      initialMemory: 157286400,
      extensions: { uuid_ossp },
      ..._meta,
    };
    return new PGlite(dataDir ?? "idb://my-database", meta);
  },
});
