import { BehaviorSubject } from 'rxjs';
// import { share } from 'rxjs/operators';
import _ from 'lodash';

export default class Store {
  constructor(inits) {
    // 各个字段的数据
    this.data = {};
    this.broadcast$ = new BehaviorSubject(inits);
  }
  setData = data => {
    this.data = { ...data };
    console.log('设置数据...');
    this.broadcast$.next({ type: 'data' });
  };
  getData = () => {
    return { ...this.data };
  };
  set = (key, value) => {
    _.set(this.data, key, value);
    return this;
  };
  get = key => {
    return _.get(this.data, key);
  };
  remove = key => {
    this.data = _.omit(this.data, _.concat(key));
    return this;
  };
  clear = () => {
    this.data = {};
    return this;
  };
  batchSet = data => {
    _.forEach(data, (value, key) => {
      _.set(this.data, key, value);
    });
  };
  batchGet = keys => {
    return _.at(this.data, keys);
  };
}
