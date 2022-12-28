import {DEFAULT_WAIT_MS} from '../../consts';
import {$} from '../../core/dom';
import {ExcelComponent} from '../../core/ExcelComponent';
import {ActiveRoute} from '../../core/routes/ActiveRoute';
import {debounce} from '../../core/utils';
import * as actions from '../../redux/actions';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    });
  }

  prepare() {
    this.onInput = debounce(this.onInput, DEFAULT_WAIT_MS);
  }

  toHtml() {
    const title = this.store.getState().title;
    return `
    <input type="text" class="input" value="${title}">
    <div>
        <div class="button" data-button="exit">
            <i class="material-icons" data-button="exit">exit_to_app</i>
        </div>
        <div class="button" data-button="remove">
            <i class="material-icons" data-button="remove">delete</i>
        </div>
    </div>
    `;
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(actions.changeTitle($target.text()));
  }

  onClick(event) {
    const $target = $(event.target);
    if ($target.data.button === 'remove') {
      const decision = confirm('Are you sure?');

      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param);
        ActiveRoute.navigate('');
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('');
    }
  }
}
