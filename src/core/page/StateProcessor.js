import {debounce} from '../utils';
import {DEFAULT_WAIT_MS} from '../../consts';

export class StateProcessor {
  constructor(client, delay = DEFAULT_WAIT_MS) {
    this.client = client;
    this.listen = debounce(this.listen.bind(this), delay);
  }

  listen(state) {
    this.client.save(state);
  }

  get() {
    return this.client.get();
  }
}
