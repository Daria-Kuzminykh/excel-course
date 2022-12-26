import {Excel} from './components/excel/Excel';
import {Header} from './components/header/Header';
import {Toolbar} from './components/toolbar/Toolbar';
import {Formula} from './components/formula/Formula';
import {Table} from './components/table/Table';
import {CreateStore} from './core/createStore';
import {rootReducer} from './redux/rootReducer';
import {debounce, storage} from './core/utils';
import {DEFAULT_WAIT_MS, EXCEL_STATE} from './consts';
import {initialState} from './redux/initialState';

import './scss/index.scss';

const store = new CreateStore(rootReducer, initialState);

const stateListener = debounce(state => {
  console.log('app state: ', state);
  storage(EXCEL_STATE, state);
}, DEFAULT_WAIT_MS);

store.subscribe(stateListener);

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
});

excel.render();
