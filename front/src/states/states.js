class States {
  constructor() {
    this._state = new Map();
  }

  useState(type, init) {
    this._state.set(type, init);
    return init;
  }

  setState(type, nextState) {
    this._state.set(type, nextState);
    return this._state.get(type);
  }

  getState(type) {
    return this._state.get(type);
  }
}

export default States;
