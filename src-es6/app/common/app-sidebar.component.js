import angular from 'angular'

let appSidebar = {
  templateUrl: './app-sidebar.html',
  controller: 'AppSidebarController'
};

angular
  .module('common')
  .component('appSidebar', appSidebar);
