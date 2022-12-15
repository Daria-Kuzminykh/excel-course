const CODES = {
  A: 65,
  Z: 90,
};

const toCell = (rowIndex) => {
  return (_, colIndex) => {
    return `
        <div
            class="cell"
            contenteditable
            data-type="cell"
            data-col="${colIndex}"
            data-id="${rowIndex}:${colIndex}"
        ></div>
    `;
  };
};

const toColumn = (col, colIndex) => {
  return `
        <div class="column" data-type="resizable" data-col="${colIndex}">
            ${col}
            <div class="col-resize" data-resize="col"></div>
        </div>
    `;
};

const createRow = (index, content) => {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>' : '';
  return `
        <div class="row" data-type="resizable">
            <div class="row-info">
                ${index || ''}
                ${resize}
            </div>
            <div class="row-data">${content}</div>
        </div>
    `;
};

const toChar = (_, index) => String.fromCharCode(CODES.A + index);

export const createTable = (rowsCount = 15) => {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('');

  rows.push(createRow(null, cols));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(row))
        .join('');

    rows.push(createRow(row + 1, cells));
  }

  return rows.join('');
};
