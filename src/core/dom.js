class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
        ? document.querySelector(selector)
        : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }

    return this.$el.outerHTML.trim();
  }

  text(text) {
    if (typeof text === 'string') {
      this.$el.textContent = text;
      return this;
    }

    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim();
    }

    return this.$el.textContent.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el;
    }

    this.$el.append(node);

    return this;
  }

  closest(selector) {
    return $(this.$el.closest(selector));
  }

  get data() {
    return this.$el.dataset;
  }

  id(isParse) {
    if (isParse) {
      const parsed = this.id().split(':');

      return {
        row: Number(parsed[0]),
        col: Number(parsed[1]),
      };
    }
    return this.data.id;
  }

  focus() {
    this.$el.focus();
    return this;
  }

  getCoords() {
    return this.$el.getBoundingClientRect();
  }

  find(selector) {
    return $(this.$el.querySelector(selector));
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  addClass(className) {
    this.$el.classList.add(className);
    return this;
  }

  removeClass(className) {
    this.$el.classList.remove(className);
    return this;
  }

  css(styles = {}) {
    Object
        .entries(styles)
        .forEach(([key, value]) => {
          this.$el.style[key] = value;
        });
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }
}

export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }

  return $(el);
};
