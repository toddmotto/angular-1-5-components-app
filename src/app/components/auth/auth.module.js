import firebase from 'firebase';
import angularfire from 'angularfire';
import uiRouter from 'angular-ui-router';
import { AuthService } from './auth.service';
import { login } from './login/login.module';
import { register } from './register/register.module';
import { authForm } from './auth-form/auth-form.module';
import './auth.scss';

const firebaseConfig = {
	apiKey: 'AIzaSyBSf5XnsvoPRewbCVQ1MXPD62KKlA7N6-o',
	authDomain: 'project-belantis.firebaseapp.com',
	databaseURL: 'https://project-belantis.firebaseio.com',
	storageBucket: 'project-belantis.appspot.com',
	messagingSenderId: '615638830609',
};

export const app = firebase.initializeApp(firebaseConfig);

export const auth = angular
  .module('components.auth', [
    angularfire,
		uiRouter,
    login,
    register,
    authForm,
  ])
  .config(($firebaseRefProvider) => {
    'ngInject';

    $firebaseRefProvider
      .registerUrl({
        default: firebaseConfig.databaseURL,
        contacts: `${firebaseConfig.databaseURL}/contacts`,
      });
  })
  .run(($transitions, $state, AuthService) => {
    'ngInject';

    $transitions.onStart({
      to: (state) => !!(state.data && state.data.requiredAuth),
    }, () => {
      return AuthService
        .requireAuthentication()
        .catch(() => $state.target('auth.login'));
    });
    $transitions.onStart({
      to: 'auth.*',
    }, () => {
      if (AuthService.isAuthenticated()) return $state.target('app');
    });
  })
  .service('AuthService', AuthService)
  .name;
