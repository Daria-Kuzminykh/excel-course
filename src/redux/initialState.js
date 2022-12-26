import {DEFAULT_STYLES, DEFAULT_TITLE, EXCEL_STATE} from '../consts';
import {storage} from '../core/utils';

const defaultState = {
  title: DEFAULT_TITLE,
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: DEFAULT_STYLES,
};

export const initialState = storage(EXCEL_STATE) || defaultState;
