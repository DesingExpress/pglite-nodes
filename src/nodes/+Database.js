import { Pure } from "@design-express/fabrica";
import pgWorker from "./pglite.worker";
import { PGliteWorker } from "@electric-sql/pglite/worker";

export class pgDatabase extends Pure {
  static path = "Postgresql";
  static title = "Database";
  static description = "Create or Retrieve Database";

  constructor() {
    super();
    this.addInput("path", "string");
    this.addOutput("database", "postgres::database");
  }

  async onExecute() {
    if (this.pg && !this.pg.closed) await this.pg.close();
    const _dataDir = (this.getInputData(1) ?? "").trim();

    this.pg = new PGliteWorker(new pgWorker(), {
      dataDir: _dataDir === "" ? undefined : _dataDir,
    });

    await this.pg.waitReady;
    console.log(this.pg);
    this.setOutputData(1, this.pg);
  }
}
