import DisabledCollapsedSubprocessPopupProvider from './DisabledCollapsedSubprocessPopupProvider';


export default {
  __depends__: [
    'popupMenu',
    'bpmnReplace'
  ],
  __init__: [ 'disabledCollapsedSubprocessPopupProvider' ],
  disabledCollapsedSubprocessPopupProvider: [ 'type', DisabledCollapsedSubprocessPopupProvider ]
};
