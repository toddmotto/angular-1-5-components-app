import angular           from 'angular'
import angularLoadingBar from 'angular-loading-bar'
import uiRouter          from 'angular-ui-router'

commonInit.$inject = ['$transitions','cfpLoadingBar']
function commonInit($transitions, cfpLoadingBar) {
  $transitions.onStart({}, cfpLoadingBar.start);
  $transitions.onSuccess({}, cfpLoadingBar.complete);
}
angular
  .module('common', [
    uiRouter,
    angularLoadingBar
  ])
  .run(commonInit);
