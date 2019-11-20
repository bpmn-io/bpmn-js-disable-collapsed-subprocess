# bpmn-js disable collapsed subprocess

A bpmn-js extension which disables modeling collapsed subprocess via replace menu.

## Installation

Install via [npm](http://npmjs.com/).

```bash
npm install bpmn-js-disable-collapsed-subprocess
```

Add as additional module to [bpmn-js](https://github.com/bpmn-io/bpmn-js).

### Modeler

```javascript
var BpmnModeler = require('bpmn-js/lib/Modeler');
var disableCollapsedSubprocessModule = require('bpmn-js-disable-collapsed-subprocess');

var modeler = new BpmnModeler({
  container: '#canvas',
  additionalModules: [
    disableCollapsedSubprocessModule
  ]
});
```

### Viewer

This extension is useless for the Viewer as it changes only the modeling actions.

## Licence

MIT
