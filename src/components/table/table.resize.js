import {$} from '../../core/dom';

export const resizeHandler = ($root, event) => {
  return new Promise(resolve => {
    const typeResize = event.target.dataset.resize;
    const isRowResizer = typeResize === 'row';
    const metric = isRowResizer ? 'height' : 'width';
    const sideProp = isRowResizer ? 'right' : 'bottom';
    const translateAxis = isRowResizer ? 'Y' : 'X';

    const $resizer = $(event.target);
    $resizer.css({opacity: 1});

    const $parent = $resizer.closest('[data-type="resizable"]');

    const coords = $parent.getCoords();

    let delta;

    document.onmousemove = event => {
      delta = isRowResizer
            ? (event.pageY - coords.bottom)
            : (event.pageX - coords.right);

      $resizer.css({
        transform: `translate${translateAxis}(${delta}px)`,
        [sideProp]: '-5000px',
      });
    };

    document.onmouseup = (event) => {
      document.onmousemove = null;
      document.onmouseup = null;

      const value = coords[metric] + delta;

      $parent.css({[metric]: value + 'px'});

      if (!isRowResizer) {
        $root
            .findAll(`[data-col="${$parent.data.col}"]`)
            .forEach(el => el.style.width = value + 'px');
      }

      resolve({
        value,
        typeResize,
        id: $parent.data[typeResize],
      });

      $resizer.css({
        opacity: 0,
        [sideProp]: 0,
        transform: 'none',
      });
    };
  });
};
