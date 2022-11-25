
import {
  bootstrapModeler,
  getBpmnJS,
  inject
} from 'bpmn-js/test/helper';

import coreModule from 'bpmn-js/lib/core';
import modelingModule from 'bpmn-js/lib/features/modeling';
import replaceMenuProviderModule from 'bpmn-js/lib/features/popup-menu';

import DisabledCollapsedSubprocessPopupProviderModule from '..';

import diagramXML from './diagram.bpmn';


var REPLACE_WITH_COLLAPSED = 'replace-with-collapsed-subprocess',
    REPLACE_WITH_EXPANDED = 'replace-with-expanded-subprocess',
    EXPAND_SUBPROCESS = 'expand-subprocess',
    REPLACE_WITH_TASK = 'replace-with-task';


describe('<DisabledCollapsedSubprocessPopupProvider>', function() {

  beforeEach(bootstrapModeler(diagramXML, {
    modules: [
      coreModule,
      modelingModule,
      replaceMenuProviderModule,
      DisabledCollapsedSubprocessPopupProviderModule
    ]
  }));

  var openPopup = function(element, offset) {
    offset = offset || 100;

    getBpmnJS().invoke(function(popupMenu) {

      popupMenu.open(element, 'bpmn-replace', {
        x: element.x + offset, y: element.y + offset
      });

    });
  };

  it('should allow to transform task into collapsed subprocess', inject(function(elementRegistry) {

    // given
    var task = elementRegistry.get('Task');

    openPopup(task);

    // then
    expect(queryEntry(REPLACE_WITH_COLLAPSED)).to.exist;
    expect(queryEntry(EXPAND_SUBPROCESS)).to.not.exist;
  }));


  it('should allow to transform task into expanded subprocess', inject(function(elementRegistry) {

    // given
    var task = elementRegistry.get('Task');

    openPopup(task);

    // then
    expect(queryEntry(REPLACE_WITH_COLLAPSED)).to.exist;
    expect(queryEntry(EXPAND_SUBPROCESS)).to.not.exist;
  }));


  it('should allow to expand collapsed subprocess', inject(function(elementRegistry) {

    // given
    var subProcess = elementRegistry.get('SubProcess_collapsed');

    openPopup(subProcess);

    // then
    expect(queryEntry(REPLACE_WITH_EXPANDED)).to.not.exist;
    expect(queryEntry(REPLACE_WITH_COLLAPSED)).to.not.exist;
    expect(queryEntry(EXPAND_SUBPROCESS)).to.exist;
  }));


  it('should allow to transform empty collapsed subprocess into task', inject(function(elementRegistry) {

    // given
    var subProcess = elementRegistry.get('SubProcess_collapsed_empty');

    openPopup(subProcess);

    // then
    expect(queryEntry(REPLACE_WITH_TASK)).to.exist;
  }));


  it('should not allow to transform collapsed subprocess with children into task', inject(function(elementRegistry) {

    // given
    var subProcess = elementRegistry.get('SubProcess_collapsed');

    openPopup(subProcess);

    // then
    expect(queryEntry(REPLACE_WITH_TASK)).to.not.exist;
  }));


  it('should not allow to collapse expanded subprocess', inject(function(elementRegistry) {

    // given
    var subProcess = elementRegistry.get('SubProcess_expanded');

    openPopup(subProcess);

    // then
    expect(queryEntry(REPLACE_WITH_COLLAPSED)).to.not.exist;
    expect(queryEntry(EXPAND_SUBPROCESS)).to.not.exist;
  }));

});

// helper ////
function queryEntry(id) {
  var container = getBpmnJS().get('popupMenu')._current.container;

  return container.querySelector('.djs-popup .entry[data-id="' + id + '"]');
}
