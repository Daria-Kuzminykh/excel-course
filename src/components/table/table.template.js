import {DEFAULT_STYLES} from '../../consts';
import {parse} from '../../core/parse';
import {toInlineStyles} from '../../core/utils';

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120;
const DEFAULT_HEIGHT = 24;

const getWidth = (state, index) => {
  return (state[index] || DEFAULT_WIDTH) + 'px';
};

const getHeight = (state, index) => {
  return (state[index] || DEFAULT_HEIGHT) + 'px';
};

const toCell = (state, rowIndex) => {
  return (_, colIndex) => {
    const id = `${rowIndex}:${colIndex}`;
    const width = getWidth(state.colState, colIndex);
    const data = state.dataState[id];
    const styles = toInlineStyles(state.stylesState[id] || DEFAULT_STYLES);

    return `
        <div
            class="cell"
            contenteditable
            data-type="cell"
            data-col="${colIndex}"
            data-id="${id}"
            data-value="${data || ''}"
            style="${styles}; width: ${width}"
        >
          ${parse(data)}
        </div>
    `;
  };
};

const toColumn = ({col, index, width}) => {
  return `
        <div
          class="column"
          data-type="resizable"
          data-col="${index}"
          style="width: ${width}"
        >
            ${col}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `;
};

const createRow = (index, content, state = {}) => {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : '';
  const height = getHeight(state, index);

  return `
        <div
          class="row"
          data-type="resizable"
          data-row="${index}"
          style="height: ${height}"
        >
            <div class="row-info">
                ${index || ''}
                ${resize}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `;
};

const toChar = (_, index) => String.fromCharCode(CODES.A + index);

const withWidthFrom = (state) => {
  return (col, index) => {
    return {
      col,
      index,
      width: getWidth(state, index),
    };
  };
};

export const createTable = (rowsCount = 15, state = {}) => {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state.colState))
      .map(toColumn)
      .join('');

  rows.push(createRow(null, cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(state, row))
        .join('');

    rows.push(createRow(row + 1, cells, state.rowState));
  }

  return rows.join('');
};
