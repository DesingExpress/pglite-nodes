import { Pure } from "@design-express/fabrica";
// import { drizzle } from "drizzle-orm/pglite";
// import { sql } from "drizzle-orm";

// In-memory Postgres

export class pgTransaction extends Pure {
  static path = "Postgresql";
  static title = "Transaction";
  static description = "Create or Retrieve Database";

  constructor() {
    super();

    this.addInput("database", "postgres::database");
    this.addInput("sql", "");
    this.addInput("params", "");
    this.addInput("data", "");

    this.addOutput("result", "");
  }

  async onExecute() {
    const client = this.getInputData(1);
    const _sql = this.getInputData(2);
    const _params = this.getInputData(3) ?? [];
    const _data = this.getInputData(4);

    await client
      .query(_sql, _params, _data ? { blob: _data } : undefined)
      .then((result) => this.setOutputData(1, result))
      .catch((e) => this.setOutputData(1, { error: e }));
  }
}
