import template from './app-nav.html';

export const navComponent = {
  bindings: {
    user: '<',
    onLogout: '&',
  },
  template,
};
