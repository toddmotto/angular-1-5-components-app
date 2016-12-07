import template from './contact-tag.html';

export const contactTagComponent = {
  bindings: {
    tag: '<',
    onChange: '&',
  },
  template,
  controller: class ContactTagComponent {
    constructor() {
      'ngInject';
    }
    $onInit() {
      this.tags = ['friends', 'family', 'acquaintances', 'following'];
    }
    $onChanges(changes) {
      if (changes.tag) {
        this.tag = angular.copy(this.tag);
      }
    }
    updateTag(tag) {
      this.onChange({
        $event: {
          tag,
        },
      });
    }
  },
};
