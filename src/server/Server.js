export class Server {
  // Returns a Promise with width and height values number[];
  // Or error;
  requestFieldSize() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const x = 8 + Math.ceil(Math.random() * 16);
        const y = x;
        if (Math.random() >= 0) resolve({ x: x, y: y });
        else reject("SLOMANO");
      }, Math.random() * 1500);
    });
  }

  // Returns a Promise with players coordinates { x: number, y: number };
  // Or error;
  async requestSecondPlayerPosition() {
    await this.#yobaPromise();
    return { x: 0, y: 3 };
  }

  // Returns a Promise with boolean
  async requestAllowingToPlay() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(Math.random() > 0.5);
      }, Math.random() * 3000);
    });
  }

  #yobaPromise() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, Math.random() * 3000);
    });
  }
}
