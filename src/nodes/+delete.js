import { Pure } from "@design-express/fabrica";

export class deleteDatabase extends Pure {
  static path = "Postgresql";
  static title = "Delete";
  static description = "Delete Database";

  constructor() {
    super();
    this.addInput("path", "string");
    this.addInput("name", "string");

    this.addOutput("onSuccess", -1);
    this.addOutput("onError", -1);
  }

  async onExecute() {
    const DBDeleteRequest = window.indexedDB.deleteDatabase(
      "/pglite/my-database"
    );

    DBDeleteRequest.onerror = (event) => {
      console.log(event);

      this.triggerSlot(2);
    };

    DBDeleteRequest.onsuccess = (event) => {
      console.log("Database deleted successfully");
      this.triggerSlot(1);
    };
  }
}
