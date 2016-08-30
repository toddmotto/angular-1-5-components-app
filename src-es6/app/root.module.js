import angular from 'angular'
import common from './common/app.module.js'
import components from './components/components.module.js'
import templates from '../../templates.js'

angular
  .module('root', [
    'common',
    'components',
    'templates'
  ]);
