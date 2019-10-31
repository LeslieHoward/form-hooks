export default class Register {
  constructor() {
    this.cache = {};
  }
  register = (key, factory) => {
    if (typeof key === 'function') {
      return key();
    }
    if (!this.cache[key]) {
      this.cache[key] = factory();
    }
    return this.cache[key];
  };
  cancel = key => {
    delete this.cache[key];
  };
  clear = () => {
    this.cache = {};
  };
}
