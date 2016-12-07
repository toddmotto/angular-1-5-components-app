import template from './login.html';

export const loginComponent = {
  template,
  controller: class LoginComponent {
    constructor(AuthService, $state) {
      'ngInject';

      this.authService = AuthService;
      this.$state = $state;
    }
    $onInit() {
      this.error = null;
      this.user = {
        email: '',
        password: '',
      };
    }
    loginUser(event) {
      return this.authService
        .login(event.user)
        .then(() => {
          this.$state.go('app');
        }, reason => {
          this.error = reason.message;
        });
    }
  },
};
