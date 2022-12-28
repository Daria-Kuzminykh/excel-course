import {Page} from '../core/Page';
import {Excel} from '../components/excel/Excel';
import {Header} from '../components/header/Header';
import {Toolbar} from '../components/toolbar/Toolbar';
import {Formula} from '../components/formula/Formula';
import {Table} from '../components/table/Table';
import {CreateStore} from '../core/createStore';
import {rootReducer} from '../redux/rootReducer';
import {debounce, storage} from '../core/utils';
import {DEFAULT_WAIT_MS} from '../consts';
import {normalizeInitialState} from '../redux/initialState';

const getStorageName = (param) => {
  return 'excel:' + param;
};

export class ExcelPage extends Page {
  getRoot() {
    const params = this.params || Date.now().toString();
    const state = storage(getStorageName(params));
    const store = new CreateStore(rootReducer, normalizeInitialState(state));

    const stateListener = debounce(
        state => storage(getStorageName(params), state),
        DEFAULT_WAIT_MS
    );

    store.subscribe(stateListener);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}
