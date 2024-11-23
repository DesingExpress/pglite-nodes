import { Pure } from "@design-express/fabrica";
import { drizzle } from "drizzle-orm/pglite";
import { sql } from "drizzle-orm";

// In-memory Postgres

export class pgQuery extends Pure {
  static path = "Postgresql";
  static title = "query";
  static description = "Create or Retrieve Database";

  constructor() {
    super();

    this.addInput("database", "postgres::database");
    this.addInput("sql", "string");

    this.addOutput("result", "");
  }

  async onExecute() {
    const client = this.getInputData(1);
    const _sql = this.getInputData(2);
    const db = drizzle(client);
    const buildSQL = sql.raw(_sql);
    this.setOutputData(1, await db.execute(buildSQL));
    // await db.
  }
}
