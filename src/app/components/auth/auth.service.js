import firebase from 'firebase';

export class AuthService {
  constructor($firebaseAuth) {
    'ngInject';

    this.auth = $firebaseAuth(firebase.auth());
    this.authData = null;
    this.onSignIn = (user) => {
      this.authData = user;
      return this.auth.$requireSignIn();
    };
    this.storeAuthData = (data) => {
      this.authData = data;
      return this.authData;
    };
    this.clearAuthData = () => {
      this.authData = null;
    };
  }
  login(user) {
    return this.auth
      .$signInWithEmailAndPassword(user.email, user.password)
      .then(this.storeAuthData);
  }
  register(user) {
    return this.auth
      .$createUserWithEmailAndPassword(user.email, user.password)
      .then(this.storeAuthData);
  }
  logout() {
    return this.auth
      .$signOut()
      .then(this.clearAuthData);
  }
  requireAuthentication() {
    return this.auth
      .$waitForSignIn()
      .then(this.onSignIn);
  }
  isAuthenticated() {
    return !!this.authData;
  }
  getUser() {
    if (this.authData) return this.authData;
  }
}
