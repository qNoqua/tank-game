import { Server } from "./Server";

export class Connection {
  constructor() {
    // this.fn = fn;
    this.serverConnect = new Server();
  }
  whatIsThisSize() {
    return this.serverConnect.requestFieldSize();
  }
  isReadyPlayer() {}
}
