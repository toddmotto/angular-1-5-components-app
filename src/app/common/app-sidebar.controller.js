function AppSidebarController() {
  var ctrl = this;
  ctrl.contactTags = [{
    label: 'All contacts',
    icon: 'star',
    state: 'none'
  }, {
    label: 'Friends',
    icon: 'people',
    state: 'friends'
  }, {
    label: 'Family',
    icon: 'child_care',
    state: 'family'
  }, {
    label: 'Acquaintances',
    icon: 'accessibility',
    state: 'acquaintances'
  }, {
    label: 'Following',
    icon: 'remove_red_eye',
    state: 'following'
  }];
}

/**
 * @ngdoc type
 * @module common
 * @name AppSidebarController
 *
 * @description
 *
 * ## Lorem Ipsum 1
 * Aenean ornare odio elit, eget facilisis ipsum molestie ac. Nam bibendum a nibh ut ullamcorper.
 * Donec non felis gravida, rutrum ante mattis, sagittis urna. Sed quam quam, facilisis vel cursus at.
 *
 * ## Lorem Ipsum 2
 * Aenean ornare odio elit, eget facilisis ipsum molestie ac. Nam bibendum a nibh ut ullamcorper.
 * Donec non felis gravida, rutrum ante mattis, sagittis urna. Sed quam quam, facilisis vel cursus at.
 */
angular
  .module('common')
  .controller('AppSidebarController', AppSidebarController);
