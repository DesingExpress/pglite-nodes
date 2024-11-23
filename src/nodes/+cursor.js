import { Pure } from "@design-express/fabrica";
// import { drizzle } from "drizzle-orm/pglite";
// import { sql } from "drizzle-orm";

// In-memory Postgres

export class pgCursor extends Pure {
  static path = "Postgresql";
  static title = "Cursor";
  static description = "";

  constructor() {
    super();

    this.addInput("database", "postgres::database");
    this.addInput("sql", "");
    this.addInput("pageSize", "number");

    this.addOutput("stream", "iterator,stream,array");
  }

  onExecute() {
    const client = this.getInputData(1);
    const _sql = this.getInputData(2);
    const _size = this.getInputData(3);
    console.log(_sql, "ready", client);
    const _stream = new ReadableStream({
      start(controller) {
        client.transaction(async (tx) => {
          performance.mark(`query st ${_sql}`);
          await tx.exec("BEGIN work;");
          await tx.exec(`DECLARE _t cursor for ${_sql}`);
          let _r;
          while (true) {
            _r = await tx.query(`FETCH ${_size} from _t;`);
            if (_r.rows.length < _size) {
              if (_r.rows.length !== 0) controller.enqueue(_r.rows);
              await tx.exec("COMMIT work;");
              controller.close();
              break;
            }
            if (_r.rows.length !== 0) controller.enqueue(_r.rows);
          }
          performance.mark(`query ed ${_sql}`);
          performance.measure(
            `query ${_sql}`,
            `query st ${_sql}`,
            `query ed ${_sql}`
          );
          console.log(
            `${_sql}`,
            performance.getEntriesByName(`query ${_sql}`)[0].duration
          );
          performance.clearMarks(`query st ${_sql}`);
          performance.clearMarks(`query ed ${_sql}`);
          performance.clearMeasures(`query ${_sql}`);
        });
      },
    });

    this.setOutputData(1, _stream);
    // await db.
  }
}
