import {storage} from '../core/utils';

const getStorageName = (param) => {
  return 'excel:' + param;
};

export class LocalStorageClient {
  constructor(name) {
    this.name = getStorageName(name);
  }

  save(state) {
    storage(this.name, state);
    return Promise.resolve();
  }

  get() {
    return new Promise(resolve => {
      const state = storage(this.name);
      setTimeout(() => {
        resolve(state);
      }, 2500);
    });
  }
}
