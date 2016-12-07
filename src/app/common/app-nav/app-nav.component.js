import templateUrl from './app-nav.html';

export const navComponent = {
  bindings: {
    user: '<',
    onLogout: '&',
  },
  templateUrl,
};
