import { is } from 'bpmn-js/lib/util/ModelUtil';

import {
  isExpanded,
  isEventSubProcess
} from 'bpmn-js/lib/util/DiUtil';

import {
  assign
} from 'min-dash';

var REPLACE_WITH_COLLAPSED = 'replace-with-collapsed-subprocess',
    REPLACE_WITH_EXPANDED = 'replace-with-expanded-subprocess';


export default function DisabledCollapsedSubprocessPopupProvider(popupMenu, bpmnReplace, translate) {
  popupMenu.registerProvider('bpmn-replace', this);

  this._bpmnReplace = bpmnReplace;
  this._translate = translate;
}

DisabledCollapsedSubprocessPopupProvider.$inject = [
  'popupMenu',
  'bpmnReplace',
  'translate'
];

/**
 * Get all entries from original bpmn-js provider minus the ones that allow to model
 * collapsed subprocess.
 */
DisabledCollapsedSubprocessPopupProvider.prototype.getPopupMenuEntries = function(element) {
  var bpmnReplace = this._bpmnReplace,
      translate = this._translate,
      expandSubProcess = {
        'expand-subprocess': {
          className: 'bpmn-icon-subprocess-expanded',
          label: translate('Expand (not reversible)'),
          action: function() {
            bpmnReplace.replaceElement(element, {
              type: 'bpmn:SubProcess',
              isExpanded: true
            });
          }
        }
      };

  return function(entries) {

    if (isTask(element)) {
      delete entries[REPLACE_WITH_EXPANDED];
      delete entries[REPLACE_WITH_COLLAPSED];

      entries['replace-with-subprocess'] = {
        className: 'bpmn-icon-subprocess-collapsed',
        label: translate('Sub Process'),
        action: function() {
          bpmnReplace.replaceElement(element, {
            type: 'bpmn:SubProcess',
            isExpanded: false
          });
        }
      };

      return entries;
    }

    if (isSubProcess(element) && isExpanded(element)) {
      delete entries[REPLACE_WITH_COLLAPSED];

      return entries;
    }

    if (isSubProcess(element) && !isExpanded(element)) {
      if (hasChildren(element)) {
        return expandSubProcess;
      }

      delete entries[REPLACE_WITH_COLLAPSED];
      delete entries[REPLACE_WITH_EXPANDED];

      return assign(entries, expandSubProcess);
    }

    return entries;
  };
};


// helper /////
function isTask(element) {
  return is(element, 'bpmn:Task');
}

function isSubProcess(element) {
  return is(element, 'bpmn:SubProcess') &&
    !is(element, 'bpmn:Transaction') &&
    !isEventSubProcess(element);
}

function hasChildren(element) {
  return element.children && element.children.length;
}
