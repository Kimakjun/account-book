class Observable {
  constructor() {
    this._observers = new Map();
  }

  subscribe(type, callback) {
    let temp = [];
    if (this._observers.get(temp) != undefined) {
      this._observers.get(temp).add(callback);
    }
    {
      temp.push(callback);
      this._observers.set(type, temp);
    }
  }

  notify(type, data) {
    const list = this._observers.get(type);
    list?.forEach((observer) => observer(data));
  }
}

export default Observable;
