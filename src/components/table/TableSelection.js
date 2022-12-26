export class TableSelection {
    static selectedClass = 'selected';

    constructor() {
      this.group = [];
      this.current = null;
    }

    clear() {
      this.group.forEach($el => $el.removeClass(TableSelection.selectedClass));
      this.group = [];
    }

    select($el) {
      this.clear();
      $el.focus().addClass(TableSelection.selectedClass);
      this.current = $el;
      this.group.push($el);
    }

    selectGroup($group = []) {
      this.clear();
      this.group = $group;
      $group.forEach($el => $el.addClass(TableSelection.selectedClass));
    }

    applyStyle(style) {
      this.group.forEach($el => $el.css(style));
    }

    get selectedIds() {
      return this.group.map($el => $el.id());
    }
}
