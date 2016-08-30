import angular from 'angular'
import uirouter from 'angular-ui-router'
import loader from 'angular-loading-bar'

angular
  .module('common', [
    uirouter,
    loader
  ])
  .run(function ($transitions, cfpLoadingBar) {
    $transitions.onStart({}, cfpLoadingBar.start);
    $transitions.onSuccess({}, cfpLoadingBar.complete);
  });
