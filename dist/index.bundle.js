/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (parent, args) {
    var list = parent.querySelector(args.list);

    registerDragEvents(list, args.onDrag);
    registerRemoveEvents(list, args.onRemove);

    return {
        add: function add(value) {
            var html = args.listTemplate(value);
            var listItem = document.createRange().createContextualFragment(html);

            list.appendChild(listItem);
        }
    };
};

var _dragula = __webpack_require__(8);

var _dragula2 = _interopRequireDefault(_dragula);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var registerRemoveEvents = function registerRemoveEvents(list, onRemove) {
    var listItems = list.querySelectorAll('li');

    list.addEventListener('click', function (e) {
        var target = 'svg' === e.target.tagName ? e.target : e.target.closest('svg');

        if ('svg' === target.tagName) {
            var listItem = e.target.closest('li');
            var value = listItem.querySelector('span').innerHTML;
            list.removeChild(listItem);
            onRemove(value);
        }
    });

    return listItems;
};

var registerDragEvents = function registerDragEvents(list, callback) {
    var drake = (0, _dragula2.default)([list]);

    drake.on('dragend', function (el) {
        var listItems = list.querySelectorAll('li');
        callback(list, listItems);
    });
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (parent, hiddenInput) {
  var hiddenEl = parent.querySelector(hiddenInput);

  var getCurrentValue = function getCurrentValue() {
    return hiddenEl.value ? JSON.parse(hiddenEl.value) : [];
  };

  var addValue = function addValue(value) {
    var currentValue = getCurrentValue();
    return currentValue.concat(value);
  };

  var removeValue = function removeValue(value, onRemove) {
    var currentValue = getCurrentValue();
    return onRemove(currentValue, value);
  };

  return {
    add: function add(value) {
      hiddenEl.value = JSON.stringify(addValue(value));
    },
    remove: function remove(value, onRemove) {
      hiddenEl.value = JSON.stringify(removeValue(value, onRemove));
    },
    update: function update(values) {
      hiddenEl.value = JSON.stringify(values);
    }
  };
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var removeItems = exports.removeItems = function removeItems(Hidden, onRemove) {
  return function (value) {
    Hidden.remove(value, onRemove);
  };
};

var dragItems = exports.dragItems = function dragItems(Hidden, onDrag) {
  return function (list, listItems) {
    var values = onDrag(list, listItems);
    Hidden.update(values);
  };
};

var onDragObject = exports.onDragObject = function onDragObject(list, listItems) {
  return [].reduce.call(listItems, function (acc, listItem) {
    var value = {
      id: listItem.dataset.id,
      title: listItem.querySelector('span').innerHTML
    };
    return acc.concat([value]);
  }, []);
};

var onDragText = exports.onDragText = function onDragText(list, listItems) {
  return [].reduce.call(listItems, function (acc, listItem) {
    var value = listItem.querySelector('span').innerHTML;
    return acc.concat([value]);
  }, []);
};

var onDragImage = exports.onDragImage = function onDragImage(list, listItems) {
  return [].reduce.call(listItems, function (acc, listItem) {
    var value = parseInt(listItem.querySelector('span').innerHTML);
    return acc.concat([value]);
  }, []);
};

var onRemoveObject = exports.onRemoveObject = function onRemoveObject(currentValue, newValue) {
  return currentValue.filter(function (current) {
    return current.title !== newValue;
  });
};

var onRemoveText = exports.onRemoveText = function onRemoveText(currentValue, newValue) {
  return currentValue.filter(function (current) {
    return current !== newValue;
  });
};

var onRemoveImage = exports.onRemoveImage = function onRemoveImage(currentValue, newValue) {
  return currentValue.filter(function (current) {
    return current !== parseInt(newValue);
  });
};

var onDragTable = exports.onDragTable = function onDragTable(list, listItems) {
  return [].reduce.call(listItems, function (acc, listItem) {
    var key = listItem.querySelector('.table-list-key').innerHTML;
    var value = listItem.querySelector('.table-list-value').innerHTML;
    return acc.concat([{ key: key, value: value }]);
  }, []);
};

var onRemoveTable = exports.onRemoveTable = function onRemoveTable(currentValue, newValue) {
  return currentValue.filter(function (current) {
    return current.key !== newValue;
  });
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (autosuggest, endpoint, onSelect, onEmpty) {
  if (!autosuggest) {
    return false;
  }

  var xhr = false;

  autosuggest.addEventListener('keyup', function (e) {
    if (0 === e.target.value.length && onEmpty) {
      onEmpty();
    }

    if (3 > e.target.value.length) {
      return false;
    }

    autosuggest.classList.add('show');
    xhr = getOptions(xhr, updateOptions, autosuggest, endpoint);
  });
  autosuggest.addEventListener('input', function (e) {
    var value = onAutoSuggestInput(e);

    if (value) {
      onSelect(value, autosuggest);
    }
  });
};

var onAutoSuggestInput = function onAutoSuggestInput(e) {
  var input = e.target;
  var inputValue = input.value;
  var listName = input.getAttribute('list');
  var listOptions = document.getElementById(listName).childNodes;

  var match = [].reduce.call(listOptions, function (acc, option) {
    if (option.value === inputValue) {
      return acc.concat({
        id: option.dataset.id,
        title: option.value
      });
    }
    return acc;
  }, []);

  return 0 === match.length ? false : match[0];
};

var getOptions = function getOptions(xhr, callback, input, endpoint) {
  var query = buildQuery(input.value);
  var url = endpoint + query;

  if (xhr) {
    xhr.abort();
  }

  xhr = new XMLHttpRequest();

  xhr.addEventListener('load', function (evt) {
    callback(false, evt);
  }, false);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && isJSON(xhr.responseText)) {
      callback(false, { results: JSON.parse(xhr.responseText), input: input });
    } else {
      if (xhr.responseText && isJSON(xhr.responseText)) {
        callback({ message: JSON.parse(xhr.responseText), input: input }, false);
      }
    }
  };

  xhr.addEventListener('error', function (evt) {
    callback(evt, false);
  }, false);

  xhr.addEventListener('abort', function (evt) {
    callback(true, false);
  }, false);

  xhr.open('GET', url, true);

  xhr.send();

  return xhr;
};

var updateOptions = function updateOptions(error, response) {
  if (error) {
    if (true === error) {
      return false;
    }

    error.input.classList.remove('show');
    console.warn(error);
  }

  if (response) {
    if (!Array.isArray(response.results)) {
      return false;
    }

    createOptions(response.results, response.input);
  }
};

var createOptions = function createOptions(results, input) {
  var listName = input.getAttribute('list');
  var datalist = document.getElementById(listName);

  var newOptions = results.reduce(function (acc, result) {
    var option = createOption(result);
    return acc.concat(option);
  }, '');

  input.classList.remove('show');
  datalist.innerHTML = newOptions;
};

var createOption = function createOption(value) {
  if (value.title) {
    return '<option data-id=' + value.id + ' value="' + value.title.rendered + '">';
  }

  if (value.name) {
    return '<option data-id=' + value.id + ' value="' + value.name + '">';
  }
};

var isJSON = function isJSON(str) {
  if (typeof str !== 'string') {
    return false;
  }
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

var buildQuery = function buildQuery(value) {
  return encodeURIComponent(value.toLowerCase());
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(6);

var _index2 = _interopRequireDefault(_index);

var _textList = __webpack_require__(7);

var _textList2 = _interopRequireDefault(_textList);

var _autosuggestList = __webpack_require__(20);

var _autosuggestList2 = _interopRequireDefault(_autosuggestList);

var _list = __webpack_require__(1);

var _list2 = _interopRequireDefault(_list);

var _autoItem = __webpack_require__(21);

var _autoItem2 = _interopRequireDefault(_autoItem);

var _imageUploads = __webpack_require__(22);

var _imageUploads2 = _interopRequireDefault(_imageUploads);

var _datepicker = __webpack_require__(23);

var _datepicker2 = _interopRequireDefault(_datepicker);

var _gallery = __webpack_require__(25);

var _gallery2 = _interopRequireDefault(_gallery);

var _tableList = __webpack_require__(26);

var _tableList2 = _interopRequireDefault(_tableList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createTextItem = function createTextItem(value) {
  return '<li class="text-list-item">\n        <span>' + value + '</span>\n        <svg viewBox="0 0 20 20">\n            <path d="M10 2c4.42 0 8 3.58 8 8s-3.58 8-8 8-8-3.58-8-8 3.58-8 8-8zM15 13l-3-3 3-3-2-2-3 3-3-3-2 2 3 3-3 3 2 2 3-3 3 3z"></path>\n        </svg>\n    </li>';
};

var createAutoSuggestItem = function createAutoSuggestItem(value) {
  return '<li class="text-list-item" data-id="' + value.id + '">\n        <span>' + value.title + '</span>\n        <svg viewBox="0 0 20 20">\n            <path d="M10 2c4.42 0 8 3.58 8 8s-3.58 8-8 8-8-3.58-8-8 3.58-8 8-8zM15 13l-3-3 3-3-2-2-3 3-3-3-2 2 3 3-3 3 2 2 3-3 3 3z"></path>\n        </svg>\n    </li>';
};

document.addEventListener('DOMContentLoaded', function () {
  (0, _imageUploads2.default)();
  (0, _textList2.default)({
    parent: '.text-list',
    button: '.text-list-add',
    list: '.text-list-list',
    hidden: '.text-list-hidden',
    listTemplate: createTextItem
  });

  (0, _autosuggestList2.default)({
    parent: '.autosuggest-list',
    input: 'autosuggest-list-input',
    list: '.autosuggest-list-list',
    hidden: '.autosuggest-list-hidden',
    listTemplate: createAutoSuggestItem
  });

  (0, _autoItem2.default)({
    parent: '.autosuggest-wrapper',
    input: '.autosuggest-input',
    hidden: '.autosuggest-hidden'
  });

  (0, _datepicker2.default)();
  (0, _gallery2.default)();
  (0, _tableList2.default)();
});

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (args) {
    var listFields = document.querySelectorAll(args.parent);

    if (!listFields) {
        return false;
    }

    [].forEach.call(listFields, function (listField) {
        var textInput = listField.querySelector('input[type=text]');
        var addButton = listField.querySelector(args.button);
        var Hidden = (0, _serializedInput2.default)(listField, args.hidden);
        var remove = (0, _utilities.removeItems)(Hidden, _utilities.onRemoveText);
        var drag = (0, _utilities.dragItems)(Hidden, _utilities.onDragText);
        var List = (0, _list2.default)(listField, Object.assign(args, { onDrag: drag, onRemove: remove }));

        listField.addEventListener('keypress', function (e) {
            if (13 === e.keyCode) {
                e.preventDefault();
                List.add(textInput.value);
                Hidden.add(textInput.value);
                textInput.value = '';
            }
        });

        addButton.addEventListener('click', function (e) {
            e.preventDefault();
            List.add(textInput.value);
            Hidden.add(textInput.value);
            textInput.value = '';
        });
    });
};

var _list = __webpack_require__(1);

var _list2 = _interopRequireDefault(_list);

var _serializedInput = __webpack_require__(2);

var _serializedInput2 = _interopRequireDefault(_serializedInput);

var _utilities = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var emitter = __webpack_require__(9);
var crossvent = __webpack_require__(16);
var classes = __webpack_require__(19);
var doc = document;
var documentElement = doc.documentElement;

function dragula (initialContainers, options) {
  var len = arguments.length;
  if (len === 1 && Array.isArray(initialContainers) === false) {
    options = initialContainers;
    initialContainers = [];
  }
  var _mirror; // mirror image
  var _source; // source container
  var _item; // item being dragged
  var _offsetX; // reference x
  var _offsetY; // reference y
  var _moveX; // reference move x
  var _moveY; // reference move y
  var _initialSibling; // reference sibling when grabbed
  var _currentSibling; // reference sibling now
  var _copy; // item used for copying
  var _renderTimer; // timer for setTimeout renderMirrorImage
  var _lastDropTarget = null; // last container item was over
  var _grabbed; // holds mousedown context until first mousemove

  var o = options || {};
  if (o.moves === void 0) { o.moves = always; }
  if (o.accepts === void 0) { o.accepts = always; }
  if (o.invalid === void 0) { o.invalid = invalidTarget; }
  if (o.containers === void 0) { o.containers = initialContainers || []; }
  if (o.isContainer === void 0) { o.isContainer = never; }
  if (o.copy === void 0) { o.copy = false; }
  if (o.copySortSource === void 0) { o.copySortSource = false; }
  if (o.revertOnSpill === void 0) { o.revertOnSpill = false; }
  if (o.removeOnSpill === void 0) { o.removeOnSpill = false; }
  if (o.direction === void 0) { o.direction = 'vertical'; }
  if (o.ignoreInputTextSelection === void 0) { o.ignoreInputTextSelection = true; }
  if (o.mirrorContainer === void 0) { o.mirrorContainer = doc.body; }

  var drake = emitter({
    containers: o.containers,
    start: manualStart,
    end: end,
    cancel: cancel,
    remove: remove,
    destroy: destroy,
    canMove: canMove,
    dragging: false
  });

  if (o.removeOnSpill === true) {
    drake.on('over', spillOver).on('out', spillOut);
  }

  events();

  return drake;

  function isContainer (el) {
    return drake.containers.indexOf(el) !== -1 || o.isContainer(el);
  }

  function events (remove) {
    var op = remove ? 'remove' : 'add';
    touchy(documentElement, op, 'mousedown', grab);
    touchy(documentElement, op, 'mouseup', release);
  }

  function eventualMovements (remove) {
    var op = remove ? 'remove' : 'add';
    touchy(documentElement, op, 'mousemove', startBecauseMouseMoved);
  }

  function movements (remove) {
    var op = remove ? 'remove' : 'add';
    crossvent[op](documentElement, 'selectstart', preventGrabbed); // IE8
    crossvent[op](documentElement, 'click', preventGrabbed);
  }

  function destroy () {
    events(true);
    release({});
  }

  function preventGrabbed (e) {
    if (_grabbed) {
      e.preventDefault();
    }
  }

  function grab (e) {
    _moveX = e.clientX;
    _moveY = e.clientY;

    var ignore = whichMouseButton(e) !== 1 || e.metaKey || e.ctrlKey;
    if (ignore) {
      return; // we only care about honest-to-god left clicks and touch events
    }
    var item = e.target;
    var context = canStart(item);
    if (!context) {
      return;
    }
    _grabbed = context;
    eventualMovements();
    if (e.type === 'mousedown') {
      if (isInput(item)) { // see also: https://github.com/bevacqua/dragula/issues/208
        item.focus(); // fixes https://github.com/bevacqua/dragula/issues/176
      } else {
        e.preventDefault(); // fixes https://github.com/bevacqua/dragula/issues/155
      }
    }
  }

  function startBecauseMouseMoved (e) {
    if (!_grabbed) {
      return;
    }
    if (whichMouseButton(e) === 0) {
      release({});
      return; // when text is selected on an input and then dragged, mouseup doesn't fire. this is our only hope
    }
    // truthy check fixes #239, equality fixes #207
    if (e.clientX !== void 0 && e.clientX === _moveX && e.clientY !== void 0 && e.clientY === _moveY) {
      return;
    }
    if (o.ignoreInputTextSelection) {
      var clientX = getCoord('clientX', e);
      var clientY = getCoord('clientY', e);
      var elementBehindCursor = doc.elementFromPoint(clientX, clientY);
      if (isInput(elementBehindCursor)) {
        return;
      }
    }

    var grabbed = _grabbed; // call to end() unsets _grabbed
    eventualMovements(true);
    movements();
    end();
    start(grabbed);

    var offset = getOffset(_item);
    _offsetX = getCoord('pageX', e) - offset.left;
    _offsetY = getCoord('pageY', e) - offset.top;

    classes.add(_copy || _item, 'gu-transit');
    renderMirrorImage();
    drag(e);
  }

  function canStart (item) {
    if (drake.dragging && _mirror) {
      return;
    }
    if (isContainer(item)) {
      return; // don't drag container itself
    }
    var handle = item;
    while (getParent(item) && isContainer(getParent(item)) === false) {
      if (o.invalid(item, handle)) {
        return;
      }
      item = getParent(item); // drag target should be a top element
      if (!item) {
        return;
      }
    }
    var source = getParent(item);
    if (!source) {
      return;
    }
    if (o.invalid(item, handle)) {
      return;
    }

    var movable = o.moves(item, source, handle, nextEl(item));
    if (!movable) {
      return;
    }

    return {
      item: item,
      source: source
    };
  }

  function canMove (item) {
    return !!canStart(item);
  }

  function manualStart (item) {
    var context = canStart(item);
    if (context) {
      start(context);
    }
  }

  function start (context) {
    if (isCopy(context.item, context.source)) {
      _copy = context.item.cloneNode(true);
      drake.emit('cloned', _copy, context.item, 'copy');
    }

    _source = context.source;
    _item = context.item;
    _initialSibling = _currentSibling = nextEl(context.item);

    drake.dragging = true;
    drake.emit('drag', _item, _source);
  }

  function invalidTarget () {
    return false;
  }

  function end () {
    if (!drake.dragging) {
      return;
    }
    var item = _copy || _item;
    drop(item, getParent(item));
  }

  function ungrab () {
    _grabbed = false;
    eventualMovements(true);
    movements(true);
  }

  function release (e) {
    ungrab();

    if (!drake.dragging) {
      return;
    }
    var item = _copy || _item;
    var clientX = getCoord('clientX', e);
    var clientY = getCoord('clientY', e);
    var elementBehindCursor = getElementBehindPoint(_mirror, clientX, clientY);
    var dropTarget = findDropTarget(elementBehindCursor, clientX, clientY);
    if (dropTarget && ((_copy && o.copySortSource) || (!_copy || dropTarget !== _source))) {
      drop(item, dropTarget);
    } else if (o.removeOnSpill) {
      remove();
    } else {
      cancel();
    }
  }

  function drop (item, target) {
    var parent = getParent(item);
    if (_copy && o.copySortSource && target === _source) {
      parent.removeChild(_item);
    }
    if (isInitialPlacement(target)) {
      drake.emit('cancel', item, _source, _source);
    } else {
      drake.emit('drop', item, target, _source, _currentSibling);
    }
    cleanup();
  }

  function remove () {
    if (!drake.dragging) {
      return;
    }
    var item = _copy || _item;
    var parent = getParent(item);
    if (parent) {
      parent.removeChild(item);
    }
    drake.emit(_copy ? 'cancel' : 'remove', item, parent, _source);
    cleanup();
  }

  function cancel (revert) {
    if (!drake.dragging) {
      return;
    }
    var reverts = arguments.length > 0 ? revert : o.revertOnSpill;
    var item = _copy || _item;
    var parent = getParent(item);
    var initial = isInitialPlacement(parent);
    if (initial === false && reverts) {
      if (_copy) {
        if (parent) {
          parent.removeChild(_copy);
        }
      } else {
        _source.insertBefore(item, _initialSibling);
      }
    }
    if (initial || reverts) {
      drake.emit('cancel', item, _source, _source);
    } else {
      drake.emit('drop', item, parent, _source, _currentSibling);
    }
    cleanup();
  }

  function cleanup () {
    var item = _copy || _item;
    ungrab();
    removeMirrorImage();
    if (item) {
      classes.rm(item, 'gu-transit');
    }
    if (_renderTimer) {
      clearTimeout(_renderTimer);
    }
    drake.dragging = false;
    if (_lastDropTarget) {
      drake.emit('out', item, _lastDropTarget, _source);
    }
    drake.emit('dragend', item);
    _source = _item = _copy = _initialSibling = _currentSibling = _renderTimer = _lastDropTarget = null;
  }

  function isInitialPlacement (target, s) {
    var sibling;
    if (s !== void 0) {
      sibling = s;
    } else if (_mirror) {
      sibling = _currentSibling;
    } else {
      sibling = nextEl(_copy || _item);
    }
    return target === _source && sibling === _initialSibling;
  }

  function findDropTarget (elementBehindCursor, clientX, clientY) {
    var target = elementBehindCursor;
    while (target && !accepted()) {
      target = getParent(target);
    }
    return target;

    function accepted () {
      var droppable = isContainer(target);
      if (droppable === false) {
        return false;
      }

      var immediate = getImmediateChild(target, elementBehindCursor);
      var reference = getReference(target, immediate, clientX, clientY);
      var initial = isInitialPlacement(target, reference);
      if (initial) {
        return true; // should always be able to drop it right back where it was
      }
      return o.accepts(_item, target, _source, reference);
    }
  }

  function drag (e) {
    if (!_mirror) {
      return;
    }
    e.preventDefault();

    var clientX = getCoord('clientX', e);
    var clientY = getCoord('clientY', e);
    var x = clientX - _offsetX;
    var y = clientY - _offsetY;

    _mirror.style.left = x + 'px';
    _mirror.style.top = y + 'px';

    var item = _copy || _item;
    var elementBehindCursor = getElementBehindPoint(_mirror, clientX, clientY);
    var dropTarget = findDropTarget(elementBehindCursor, clientX, clientY);
    var changed = dropTarget !== null && dropTarget !== _lastDropTarget;
    if (changed || dropTarget === null) {
      out();
      _lastDropTarget = dropTarget;
      over();
    }
    var parent = getParent(item);
    if (dropTarget === _source && _copy && !o.copySortSource) {
      if (parent) {
        parent.removeChild(item);
      }
      return;
    }
    var reference;
    var immediate = getImmediateChild(dropTarget, elementBehindCursor);
    if (immediate !== null) {
      reference = getReference(dropTarget, immediate, clientX, clientY);
    } else if (o.revertOnSpill === true && !_copy) {
      reference = _initialSibling;
      dropTarget = _source;
    } else {
      if (_copy && parent) {
        parent.removeChild(item);
      }
      return;
    }
    if (
      (reference === null && changed) ||
      reference !== item &&
      reference !== nextEl(item)
    ) {
      _currentSibling = reference;
      dropTarget.insertBefore(item, reference);
      drake.emit('shadow', item, dropTarget, _source);
    }
    function moved (type) { drake.emit(type, item, _lastDropTarget, _source); }
    function over () { if (changed) { moved('over'); } }
    function out () { if (_lastDropTarget) { moved('out'); } }
  }

  function spillOver (el) {
    classes.rm(el, 'gu-hide');
  }

  function spillOut (el) {
    if (drake.dragging) { classes.add(el, 'gu-hide'); }
  }

  function renderMirrorImage () {
    if (_mirror) {
      return;
    }
    var rect = _item.getBoundingClientRect();
    _mirror = _item.cloneNode(true);
    _mirror.style.width = getRectWidth(rect) + 'px';
    _mirror.style.height = getRectHeight(rect) + 'px';
    classes.rm(_mirror, 'gu-transit');
    classes.add(_mirror, 'gu-mirror');
    o.mirrorContainer.appendChild(_mirror);
    touchy(documentElement, 'add', 'mousemove', drag);
    classes.add(o.mirrorContainer, 'gu-unselectable');
    drake.emit('cloned', _mirror, _item, 'mirror');
  }

  function removeMirrorImage () {
    if (_mirror) {
      classes.rm(o.mirrorContainer, 'gu-unselectable');
      touchy(documentElement, 'remove', 'mousemove', drag);
      getParent(_mirror).removeChild(_mirror);
      _mirror = null;
    }
  }

  function getImmediateChild (dropTarget, target) {
    var immediate = target;
    while (immediate !== dropTarget && getParent(immediate) !== dropTarget) {
      immediate = getParent(immediate);
    }
    if (immediate === documentElement) {
      return null;
    }
    return immediate;
  }

  function getReference (dropTarget, target, x, y) {
    var horizontal = o.direction === 'horizontal';
    var reference = target !== dropTarget ? inside() : outside();
    return reference;

    function outside () { // slower, but able to figure out any position
      var len = dropTarget.children.length;
      var i;
      var el;
      var rect;
      for (i = 0; i < len; i++) {
        el = dropTarget.children[i];
        rect = el.getBoundingClientRect();
        if (horizontal && (rect.left + rect.width / 2) > x) { return el; }
        if (!horizontal && (rect.top + rect.height / 2) > y) { return el; }
      }
      return null;
    }

    function inside () { // faster, but only available if dropped inside a child element
      var rect = target.getBoundingClientRect();
      if (horizontal) {
        return resolve(x > rect.left + getRectWidth(rect) / 2);
      }
      return resolve(y > rect.top + getRectHeight(rect) / 2);
    }

    function resolve (after) {
      return after ? nextEl(target) : target;
    }
  }

  function isCopy (item, container) {
    return typeof o.copy === 'boolean' ? o.copy : o.copy(item, container);
  }
}

function touchy (el, op, type, fn) {
  var touch = {
    mouseup: 'touchend',
    mousedown: 'touchstart',
    mousemove: 'touchmove'
  };
  var pointers = {
    mouseup: 'pointerup',
    mousedown: 'pointerdown',
    mousemove: 'pointermove'
  };
  var microsoft = {
    mouseup: 'MSPointerUp',
    mousedown: 'MSPointerDown',
    mousemove: 'MSPointerMove'
  };
  if (global.navigator.pointerEnabled) {
    crossvent[op](el, pointers[type], fn);
  } else if (global.navigator.msPointerEnabled) {
    crossvent[op](el, microsoft[type], fn);
  } else {
    crossvent[op](el, touch[type], fn);
    crossvent[op](el, type, fn);
  }
}

function whichMouseButton (e) {
  if (e.touches !== void 0) { return e.touches.length; }
  if (e.which !== void 0 && e.which !== 0) { return e.which; } // see https://github.com/bevacqua/dragula/issues/261
  if (e.buttons !== void 0) { return e.buttons; }
  var button = e.button;
  if (button !== void 0) { // see https://github.com/jquery/jquery/blob/99e8ff1baa7ae341e94bb89c3e84570c7c3ad9ea/src/event.js#L573-L575
    return button & 1 ? 1 : button & 2 ? 3 : (button & 4 ? 2 : 0);
  }
}

function getOffset (el) {
  var rect = el.getBoundingClientRect();
  return {
    left: rect.left + getScroll('scrollLeft', 'pageXOffset'),
    top: rect.top + getScroll('scrollTop', 'pageYOffset')
  };
}

function getScroll (scrollProp, offsetProp) {
  if (typeof global[offsetProp] !== 'undefined') {
    return global[offsetProp];
  }
  if (documentElement.clientHeight) {
    return documentElement[scrollProp];
  }
  return doc.body[scrollProp];
}

function getElementBehindPoint (point, x, y) {
  var p = point || {};
  var state = p.className;
  var el;
  p.className += ' gu-hide';
  el = doc.elementFromPoint(x, y);
  p.className = state;
  return el;
}

function never () { return false; }
function always () { return true; }
function getRectWidth (rect) { return rect.width || (rect.right - rect.left); }
function getRectHeight (rect) { return rect.height || (rect.bottom - rect.top); }
function getParent (el) { return el.parentNode === doc ? null : el.parentNode; }
function isInput (el) { return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || isEditable(el); }
function isEditable (el) {
  if (!el) { return false; } // no parents were editable
  if (el.contentEditable === 'false') { return false; } // stop the lookup
  if (el.contentEditable === 'true') { return true; } // found a contentEditable element in the chain
  return isEditable(getParent(el)); // contentEditable is set to 'inherit'
}

function nextEl (el) {
  return el.nextElementSibling || manually();
  function manually () {
    var sibling = el;
    do {
      sibling = sibling.nextSibling;
    } while (sibling && sibling.nodeType !== 1);
    return sibling;
  }
}

function getEventHost (e) {
  // on touchend event, we have to use `e.changedTouches`
  // see http://stackoverflow.com/questions/7192563/touchend-event-properties
  // see https://github.com/bevacqua/dragula/issues/34
  if (e.targetTouches && e.targetTouches.length) {
    return e.targetTouches[0];
  }
  if (e.changedTouches && e.changedTouches.length) {
    return e.changedTouches[0];
  }
  return e;
}

function getCoord (coord, e) {
  var host = getEventHost(e);
  var missMap = {
    pageX: 'clientX', // IE8
    pageY: 'clientY' // IE8
  };
  if (coord in missMap && !(coord in host) && missMap[coord] in host) {
    coord = missMap[coord];
  }
  return host[coord];
}

module.exports = dragula;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var atoa = __webpack_require__(10);
var debounce = __webpack_require__(11);

module.exports = function emitter (thing, options) {
  var opts = options || {};
  var evt = {};
  if (thing === undefined) { thing = {}; }
  thing.on = function (type, fn) {
    if (!evt[type]) {
      evt[type] = [fn];
    } else {
      evt[type].push(fn);
    }
    return thing;
  };
  thing.once = function (type, fn) {
    fn._once = true; // thing.off(fn) still works!
    thing.on(type, fn);
    return thing;
  };
  thing.off = function (type, fn) {
    var c = arguments.length;
    if (c === 1) {
      delete evt[type];
    } else if (c === 0) {
      evt = {};
    } else {
      var et = evt[type];
      if (!et) { return thing; }
      et.splice(et.indexOf(fn), 1);
    }
    return thing;
  };
  thing.emit = function () {
    var args = atoa(arguments);
    return thing.emitterSnapshot(args.shift()).apply(this, args);
  };
  thing.emitterSnapshot = function (type) {
    var et = (evt[type] || []).slice(0);
    return function () {
      var args = atoa(arguments);
      var ctx = this || thing;
      if (type === 'error' && opts.throws !== false && !et.length) { throw args.length === 1 ? args[0] : args; }
      et.forEach(function emitter (listen) {
        if (opts.async) { debounce(listen, args, ctx); } else { listen.apply(ctx, args); }
        if (listen._once) { thing.off(type, listen); }
      });
      return thing;
    };
  };
  return thing;
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function atoa (a, n) { return Array.prototype.slice.call(a, n); }


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ticky = __webpack_require__(12);

module.exports = function debounce (fn, args, ctx) {
  if (!fn) { return; }
  ticky(function run () {
    fn.apply(ctx || null, args || []);
  });
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(setImmediate) {var si = typeof setImmediate === 'function', tick;
if (si) {
  tick = function (fn) { setImmediate(fn); };
} else {
  tick = function (fn) { setTimeout(fn, 0); };
}

module.exports = tick;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13).setImmediate))

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(14);
// On some exotic environments, it's not clear which object `setimmeidate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(15)))

/***/ }),
/* 15 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var customEvent = __webpack_require__(17);
var eventmap = __webpack_require__(18);
var doc = global.document;
var addEvent = addEventEasy;
var removeEvent = removeEventEasy;
var hardCache = [];

if (!global.addEventListener) {
  addEvent = addEventHard;
  removeEvent = removeEventHard;
}

module.exports = {
  add: addEvent,
  remove: removeEvent,
  fabricate: fabricateEvent
};

function addEventEasy (el, type, fn, capturing) {
  return el.addEventListener(type, fn, capturing);
}

function addEventHard (el, type, fn) {
  return el.attachEvent('on' + type, wrap(el, type, fn));
}

function removeEventEasy (el, type, fn, capturing) {
  return el.removeEventListener(type, fn, capturing);
}

function removeEventHard (el, type, fn) {
  var listener = unwrap(el, type, fn);
  if (listener) {
    return el.detachEvent('on' + type, listener);
  }
}

function fabricateEvent (el, type, model) {
  var e = eventmap.indexOf(type) === -1 ? makeCustomEvent() : makeClassicEvent();
  if (el.dispatchEvent) {
    el.dispatchEvent(e);
  } else {
    el.fireEvent('on' + type, e);
  }
  function makeClassicEvent () {
    var e;
    if (doc.createEvent) {
      e = doc.createEvent('Event');
      e.initEvent(type, true, true);
    } else if (doc.createEventObject) {
      e = doc.createEventObject();
    }
    return e;
  }
  function makeCustomEvent () {
    return new customEvent(type, { detail: model });
  }
}

function wrapperFactory (el, type, fn) {
  return function wrapper (originalEvent) {
    var e = originalEvent || global.event;
    e.target = e.target || e.srcElement;
    e.preventDefault = e.preventDefault || function preventDefault () { e.returnValue = false; };
    e.stopPropagation = e.stopPropagation || function stopPropagation () { e.cancelBubble = true; };
    e.which = e.which || e.keyCode;
    fn.call(el, e);
  };
}

function wrap (el, type, fn) {
  var wrapper = unwrap(el, type, fn) || wrapperFactory(el, type, fn);
  hardCache.push({
    wrapper: wrapper,
    element: el,
    type: type,
    fn: fn
  });
  return wrapper;
}

function unwrap (el, type, fn) {
  var i = find(el, type, fn);
  if (i) {
    var wrapper = hardCache[i].wrapper;
    hardCache.splice(i, 1); // free up a tad of memory
    return wrapper;
  }
}

function find (el, type, fn) {
  var i, item;
  for (i = 0; i < hardCache.length; i++) {
    item = hardCache[i];
    if (item.element === el && item.type === type && item.fn === fn) {
      return i;
    }
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
var NativeCustomEvent = global.CustomEvent;

function useNative () {
  try {
    var p = new NativeCustomEvent('cat', { detail: { foo: 'bar' } });
    return  'cat' === p.type && 'bar' === p.detail.foo;
  } catch (e) {
  }
  return false;
}

/**
 * Cross-browser `CustomEvent` constructor.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent.CustomEvent
 *
 * @public
 */

module.exports = useNative() ? NativeCustomEvent :

// IE >= 9
'function' === typeof document.createEvent ? function CustomEvent (type, params) {
  var e = document.createEvent('CustomEvent');
  if (params) {
    e.initCustomEvent(type, params.bubbles, params.cancelable, params.detail);
  } else {
    e.initCustomEvent(type, false, false, void 0);
  }
  return e;
} :

// IE <= 8
function CustomEvent (type, params) {
  var e = document.createEventObject();
  e.type = type;
  if (params) {
    e.bubbles = Boolean(params.bubbles);
    e.cancelable = Boolean(params.cancelable);
    e.detail = params.detail;
  } else {
    e.bubbles = false;
    e.cancelable = false;
    e.detail = void 0;
  }
  return e;
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var eventmap = [];
var eventname = '';
var ron = /^on/;

for (eventname in global) {
  if (ron.test(eventname)) {
    eventmap.push(eventname.slice(2));
  }
}

module.exports = eventmap;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var cache = {};
var start = '(?:^|\\s)';
var end = '(?:\\s|$)';

function lookupClass (className) {
  var cached = cache[className];
  if (cached) {
    cached.lastIndex = 0;
  } else {
    cache[className] = cached = new RegExp(start + className + end, 'g');
  }
  return cached;
}

function addClass (el, className) {
  var current = el.className;
  if (!current.length) {
    el.className = className;
  } else if (!lookupClass(className).test(current)) {
    el.className += ' ' + className;
  }
}

function rmClass (el, className) {
  el.className = el.className.replace(lookupClass(className), ' ').trim();
}

module.exports = {
  add: addClass,
  rm: rmClass
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (args) {

    var fields = document.querySelectorAll(args.parent);

    if (!fields) {
        return false;
    }

    [].forEach.call(fields, function (autoList) {
        var Hidden = (0, _serializedInput2.default)(autoList, args.hidden);
        var remove = (0, _utilities.removeItems)(Hidden, _utilities.onRemoveObject);
        var drag = (0, _utilities.dragItems)(Hidden, _utilities.onDragObject);
        var List = (0, _list2.default)(autoList, Object.assign(args, { onDrag: drag, onRemove: remove }));
        var input = autoList.querySelector('.autosuggest-list-input');
        var elName = 'autoList_' + input.getAttribute('list');
        var endpoint = OMGFields.baseURL + '/wp-json/wp/v2/' + window[elName].resource + '?search=';

        (0, _autosuggest2.default)(input, endpoint, function (value, input) {
            List.add(value);
            input.value = '';
            Hidden.add(value);
        });
    });
};

var _list = __webpack_require__(1);

var _list2 = _interopRequireDefault(_list);

var _autosuggest = __webpack_require__(4);

var _autosuggest2 = _interopRequireDefault(_autosuggest);

var _serializedInput = __webpack_require__(2);

var _serializedInput2 = _interopRequireDefault(_serializedInput);

var _utilities = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (args) {
  var fields = document.querySelectorAll(args.parent);

  if (!fields) {
    return false;
  }

  [].forEach.call(fields, function (autoItem) {
    var hidden = autoItem.querySelector(args.hidden);
    var input = autoItem.querySelector('.autosuggest-input');
    var elName = 'autoList_' + input.getAttribute('list');
    var endpoint = void 0;

    if (window[elName].namespace) {
      endpoint = OMGFields.baseURL + '/wp-json/' + window[elName].namespace + '/' + window[elName].resource + '?search=';
    } else {
      endpoint = OMGFields.baseURL + '/wp-json/wp/v2/' + window[elName].resource + '?search=';
    }

    (0, _autosuggest2.default)(input, endpoint, function (value, input) {
      hidden.value = JSON.stringify(value);
    }, function () {
      hidden.value = '';
    });
  });
};

var _autosuggest = __webpack_require__(4);

var _autosuggest2 = _interopRequireDefault(_autosuggest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = imageUploads;
function imageUploads() {
	var featuredImageWrap = document.querySelectorAll('.custom-media-upload');

	if (featuredImageWrap.length === 0) {
		return;
	}

	[].map.call(featuredImageWrap, function (item) {
		// var ImageWrapId = item.attribute.id;
		var removeImage = item.querySelector('.remove-image');
		var replaceImage = item.querySelector('.replace-image');
		var setImage = item.querySelector('.set-image');
		var featuredImageTag = item.querySelector('a.replace-image img');
		var featuredImageID = item.querySelector('input[type="hidden"]');
		var featuredImageTitle = item.querySelector('.thumbnail-title');
		var mediaFrame = wp.media({
			title: 'Choose Media',
			button: {
				text: 'Use Selected Media'
			},
			multiple: false
		});

		mediaFrame.on('select', function () {
			var attachment = mediaFrame.state().get('selection').first().toJSON();

			item.classList.toggle('has-image');
			featuredImageID.value = attachment.id;
			if (attachment.hasOwnProperty('sizes')) {
				featuredImageTag.setAttribute('src', attachment.sizes.thumbnail.url);
			} else {
				featuredImageTag.setAttribute('src', attachment.icon);
			}

			if (featuredImageTitle) {
				featuredImageTitle.innerHTML = attachment.filename;
			}
		});

		removeImage.addEventListener('click', function (event) {
			event.preventDefault();
			item.classList.toggle('has-image');
			featuredImageTag.setAttribute('src', '');
			featuredImageID.value = '';
		});

		replaceImage.addEventListener('click', function (event) {
			event.preventDefault();
			mediaFrame.open();
		});

		setImage.addEventListener('click', function (event) {
			event.preventDefault();
			mediaFrame.open();
		});
	});
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var datepickers = document.querySelectorAll('.datepicker-input');

  if (!datepickers) {
    return false;
  }

  [].forEach.call(datepickers, function (dateField) {
    var currentDate = dateField.dataset.date;

    (0, _flatpickr2.default)(dateField, {
      altInput: true,
      altFormat: 'F j, Y',
      dateFormat: 'U',
      defaultDate: !currentDate ? '' : currentDate
    });
  });
};

var _flatpickr = __webpack_require__(24);

var _flatpickr2 = _interopRequireDefault(_flatpickr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

/* flatpickr v4.3.2, @license MIT */
(function (global, factory) {
	 true ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.flatpickr = {})));
}(this, (function (exports) { 'use strict';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */



var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};

var pad = function (number) { return ("0" + number).slice(-2); };
var int = function (bool) { return (bool === true ? 1 : 0); };
function debounce(func, wait, immediate) {
    if (immediate === void 0) { immediate = false; }
    var timeout;
    return function () {
        var context = this, args = arguments;
        timeout !== null && clearTimeout(timeout);
        timeout = window.setTimeout(function () {
            timeout = null;
            if (!immediate)
                func.apply(context, args);
        }, wait);
        if (immediate && !timeout)
            func.apply(context, args);
    };
}
var arrayify = function (obj) {
    return obj instanceof Array ? obj : [obj];
};

var do_nothing = function () { return undefined; };
var revFormat = {
    D: do_nothing,
    F: function (dateObj, monthName, locale) {
        dateObj.setMonth(locale.months.longhand.indexOf(monthName));
    },
    G: function (dateObj, hour) {
        dateObj.setHours(parseFloat(hour));
    },
    H: function (dateObj, hour) {
        dateObj.setHours(parseFloat(hour));
    },
    J: function (dateObj, day) {
        dateObj.setDate(parseFloat(day));
    },
    K: function (dateObj, amPM, locale) {
        dateObj.setHours(dateObj.getHours() % 12 +
            12 * int(new RegExp(locale.amPM[1], "i").test(amPM)));
    },
    M: function (dateObj, shortMonth, locale) {
        dateObj.setMonth(locale.months.shorthand.indexOf(shortMonth));
    },
    S: function (dateObj, seconds) {
        dateObj.setSeconds(parseFloat(seconds));
    },
    U: function (_, unixSeconds) { return new Date(parseFloat(unixSeconds) * 1000); },
    W: function (dateObj, weekNum) {
        var weekNumber = parseInt(weekNum);
        return new Date(dateObj.getFullYear(), 0, 2 + (weekNumber - 1) * 7, 0, 0, 0, 0);
    },
    Y: function (dateObj, year) {
        dateObj.setFullYear(parseFloat(year));
    },
    Z: function (_, ISODate) { return new Date(ISODate); },
    d: function (dateObj, day) {
        dateObj.setDate(parseFloat(day));
    },
    h: function (dateObj, hour) {
        dateObj.setHours(parseFloat(hour));
    },
    i: function (dateObj, minutes) {
        dateObj.setMinutes(parseFloat(minutes));
    },
    j: function (dateObj, day) {
        dateObj.setDate(parseFloat(day));
    },
    l: do_nothing,
    m: function (dateObj, month) {
        dateObj.setMonth(parseFloat(month) - 1);
    },
    n: function (dateObj, month) {
        dateObj.setMonth(parseFloat(month) - 1);
    },
    s: function (dateObj, seconds) {
        dateObj.setSeconds(parseFloat(seconds));
    },
    w: do_nothing,
    y: function (dateObj, year) {
        dateObj.setFullYear(2000 + parseFloat(year));
    },
};
var tokenRegex = {
    D: "(\\w+)",
    F: "(\\w+)",
    G: "(\\d\\d|\\d)",
    H: "(\\d\\d|\\d)",
    J: "(\\d\\d|\\d)\\w+",
    K: "",
    M: "(\\w+)",
    S: "(\\d\\d|\\d)",
    U: "(.+)",
    W: "(\\d\\d|\\d)",
    Y: "(\\d{4})",
    Z: "(.+)",
    d: "(\\d\\d|\\d)",
    h: "(\\d\\d|\\d)",
    i: "(\\d\\d|\\d)",
    j: "(\\d\\d|\\d)",
    l: "(\\w+)",
    m: "(\\d\\d|\\d)",
    n: "(\\d\\d|\\d)",
    s: "(\\d\\d|\\d)",
    w: "(\\d\\d|\\d)",
    y: "(\\d{2})",
};
var formats = {
    Z: function (date) { return date.toISOString(); },
    D: function (date, locale, options) {
        return locale.weekdays.shorthand[formats.w(date, locale, options)];
    },
    F: function (date, locale, options) {
        return monthToStr(formats.n(date, locale, options) - 1, false, locale);
    },
    G: function (date, locale, options) {
        return pad(formats.h(date, locale, options));
    },
    H: function (date) { return pad(date.getHours()); },
    J: function (date, locale) {
        return locale.ordinal !== undefined
            ? date.getDate() + locale.ordinal(date.getDate())
            : date.getDate();
    },
    K: function (date, locale) { return locale.amPM[int(date.getHours() > 11)]; },
    M: function (date, locale) {
        return monthToStr(date.getMonth(), true, locale);
    },
    S: function (date) { return pad(date.getSeconds()); },
    U: function (date) { return date.getTime() / 1000; },
    W: function (date, _, options) {
        return options.getWeek(date);
    },
    Y: function (date) { return date.getFullYear(); },
    d: function (date) { return pad(date.getDate()); },
    h: function (date) { return (date.getHours() % 12 ? date.getHours() % 12 : 12); },
    i: function (date) { return pad(date.getMinutes()); },
    j: function (date) { return date.getDate(); },
    l: function (date, locale) {
        return locale.weekdays.longhand[date.getDay()];
    },
    m: function (date) { return pad(date.getMonth() + 1); },
    n: function (date) { return date.getMonth() + 1; },
    s: function (date) { return date.getSeconds(); },
    w: function (date) { return date.getDay(); },
    y: function (date) { return String(date.getFullYear()).substring(2); },
};

var english = {
    weekdays: {
        shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        longhand: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ],
    },
    months: {
        shorthand: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        longhand: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ],
    },
    daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    firstDayOfWeek: 0,
    ordinal: function (nth) {
        var s = nth % 100;
        if (s > 3 && s < 21)
            return "th";
        switch (s % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    },
    rangeSeparator: " to ",
    weekAbbreviation: "Wk",
    scrollTitle: "Scroll to increment",
    toggleTitle: "Click to toggle",
    amPM: ["AM", "PM"],
};

var createDateFormatter = function (_a) {
    var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c;
    return function (dateObj, frmt, overrideLocale) {
        if (config.formatDate !== undefined)
            return config.formatDate(dateObj, frmt);
        var locale = overrideLocale || l10n;
        return frmt
            .split("")
            .map(function (c, i, arr) {
            return formats[c] && arr[i - 1] !== "\\"
                ? formats[c](dateObj, locale, config)
                : c !== "\\" ? c : "";
        })
            .join("");
    };
};
var createDateParser = function (_a) {
    var _b = _a.config, config = _b === void 0 ? defaults : _b, _c = _a.l10n, l10n = _c === void 0 ? english : _c;
    return function (date, givenFormat, timeless) {
        if (date !== 0 && !date)
            return undefined;
        var parsedDate;
        var date_orig = date;
        if (date instanceof Date)
            parsedDate = new Date(date.getTime());
        else if (typeof date !== "string" &&
            date.toFixed !== undefined)
            parsedDate = new Date(date);
        else if (typeof date === "string") {
            var format = givenFormat || (config || defaults).dateFormat;
            var datestr = String(date).trim();
            if (datestr === "today") {
                parsedDate = new Date();
                timeless = true;
            }
            else if (/Z$/.test(datestr) ||
                /GMT$/.test(datestr))
                parsedDate = new Date(date);
            else if (config && config.parseDate)
                parsedDate = config.parseDate(date, format);
            else {
                parsedDate =
                    !config || !config.noCalendar
                        ? new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0)
                        : new Date(new Date().setHours(0, 0, 0, 0));
                var matched = void 0, ops = [];
                for (var i = 0, matchIndex = 0, regexStr = ""; i < format.length; i++) {
                    var token = format[i];
                    var isBackSlash = token === "\\";
                    var escaped = format[i - 1] === "\\" || isBackSlash;
                    if (tokenRegex[token] && !escaped) {
                        regexStr += tokenRegex[token];
                        var match = new RegExp(regexStr).exec(date);
                        if (match && (matched = true)) {
                            ops[token !== "Y" ? "push" : "unshift"]({
                                fn: revFormat[token],
                                val: match[++matchIndex],
                            });
                        }
                    }
                    else if (!isBackSlash)
                        regexStr += ".";
                    ops.forEach(function (_a) {
                        var fn = _a.fn, val = _a.val;
                        return (parsedDate = fn(parsedDate, val, l10n) || parsedDate);
                    });
                }
                parsedDate = matched ? parsedDate : undefined;
            }
        }
        if (!(parsedDate instanceof Date)) {
            config.errorHandler(new Error("Invalid date provided: " + date_orig));
            return undefined;
        }
        if (timeless === true)
            parsedDate.setHours(0, 0, 0, 0);
        return parsedDate;
    };
};
function compareDates(date1, date2, timeless) {
    if (timeless === void 0) { timeless = true; }
    if (timeless !== false) {
        return (new Date(date1.getTime()).setHours(0, 0, 0, 0) -
            new Date(date2.getTime()).setHours(0, 0, 0, 0));
    }
    return date1.getTime() - date2.getTime();
}

var monthToStr = function (monthNumber, shorthand, locale) { return locale.months[shorthand ? "shorthand" : "longhand"][monthNumber]; };
var getWeek = function (givenDate) {
    var date = new Date(givenDate.getTime());
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
    var week1 = new Date(date.getFullYear(), 0, 4);
    return (1 +
        Math.round(((date.getTime() - week1.getTime()) / 86400000 -
            3 +
            (week1.getDay() + 6) % 7) /
            7));
};
var duration = {
    DAY: 86400000,
};

var defaults = {
    _disable: [],
    _enable: [],
    allowInput: false,
    altFormat: "F j, Y",
    altInput: false,
    altInputClass: "form-control input",
    animate: typeof window === "object" &&
        window.navigator.userAgent.indexOf("MSIE") === -1,
    ariaDateFormat: "F j, Y",
    clickOpens: true,
    closeOnSelect: true,
    conjunction: ", ",
    dateFormat: "Y-m-d",
    defaultHour: 12,
    defaultMinute: 0,
    defaultSeconds: 0,
    disable: [],
    disableMobile: false,
    enable: [],
    enableSeconds: false,
    enableTime: false,
    errorHandler: console.warn,
    getWeek: getWeek,
    hourIncrement: 1,
    ignoredFocusElements: [],
    inline: false,
    locale: "default",
    minuteIncrement: 5,
    mode: "single",
    nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
    noCalendar: false,
    onChange: [],
    onClose: [],
    onDayCreate: [],
    onDestroy: [],
    onKeyDown: [],
    onMonthChange: [],
    onOpen: [],
    onParseConfig: [],
    onReady: [],
    onValueUpdate: [],
    onYearChange: [],
    onPreCalendarPosition: [],
    plugins: [],
    position: "auto",
    positionElement: undefined,
    prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
    shorthandCurrentMonth: false,
    static: false,
    time_24hr: false,
    weekNumbers: false,
    wrap: false,
};

function toggleClass(elem, className, bool) {
    if (bool === true)
        return elem.classList.add(className);
    elem.classList.remove(className);
}
function createElement(tag, className, content) {
    var e = window.document.createElement(tag);
    className = className || "";
    content = content || "";
    e.className = className;
    if (content !== undefined)
        e.textContent = content;
    return e;
}
function clearNode(node) {
    while (node.firstChild)
        node.removeChild(node.firstChild);
}
function findParent(node, condition) {
    if (condition(node))
        return node;
    else if (node.parentNode)
        return findParent(node.parentNode, condition);
    return undefined;
}
function createNumberInput(inputClassName, opts) {
    var wrapper = createElement("div", "numInputWrapper"), numInput = createElement("input", "numInput " + inputClassName), arrowUp = createElement("span", "arrowUp"), arrowDown = createElement("span", "arrowDown");
    numInput.type = "text";
    numInput.pattern = "\\d*";
    if (opts !== undefined)
        for (var key in opts)
            numInput.setAttribute(key, opts[key]);
    wrapper.appendChild(numInput);
    wrapper.appendChild(arrowUp);
    wrapper.appendChild(arrowDown);
    return wrapper;
}

if (typeof Object.assign !== "function") {
    Object.assign = function (target) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!target) {
            throw TypeError("Cannot convert undefined or null to object");
        }
        var _loop_1 = function (source) {
            if (source) {
                Object.keys(source).forEach(function (key) { return (target[key] = source[key]); });
            }
        };
        for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
            var source = args_1[_a];
            _loop_1(source);
        }
        return target;
    };
}

var DEBOUNCED_CHANGE_MS = 300;
function FlatpickrInstance(element, instanceConfig) {
    var self = {
        config: __assign({}, flatpickr.defaultConfig),
        l10n: english,
    };
    self.parseDate = createDateParser({ config: self.config, l10n: self.l10n });
    self._handlers = [];
    self._bind = bind;
    self._setHoursFromDate = setHoursFromDate;
    self.changeMonth = changeMonth;
    self.changeYear = changeYear;
    self.clear = clear;
    self.close = close;
    self._createElement = createElement;
    self.destroy = destroy;
    self.isEnabled = isEnabled;
    self.jumpToDate = jumpToDate;
    self.open = open;
    self.redraw = redraw;
    self.set = set;
    self.setDate = setDate;
    self.toggle = toggle;
    function setupHelperFunctions() {
        self.utils = {
            getDaysInMonth: function (month, yr) {
                if (month === void 0) { month = self.currentMonth; }
                if (yr === void 0) { yr = self.currentYear; }
                if (month === 1 && ((yr % 4 === 0 && yr % 100 !== 0) || yr % 400 === 0))
                    return 29;
                return self.l10n.daysInMonth[month];
            },
        };
    }
    function init() {
        self.element = self.input = element;
        self.isOpen = false;
        parseConfig();
        setupLocale();
        setupInputs();
        setupDates();
        setupHelperFunctions();
        if (!self.isMobile)
            build();
        bindEvents();
        if (self.selectedDates.length || self.config.noCalendar) {
            if (self.config.enableTime) {
                setHoursFromDate(self.config.noCalendar
                    ? self.latestSelectedDateObj || self.config.minDate
                    : undefined);
            }
            updateValue(false);
        }
        self.showTimeInput =
            self.selectedDates.length > 0 || self.config.noCalendar;
        if (self.weekWrapper !== undefined && self.daysContainer !== undefined) {
            self.calendarContainer.style.visibility = "hidden";
            self.calendarContainer.style.display = "block";
            self.calendarContainer.style.width =
                self.daysContainer.offsetWidth + self.weekWrapper.offsetWidth + "px";
            self.calendarContainer.style.visibility = "visible";
            self.calendarContainer.style.display = null;
        }
        var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        if (!self.isMobile && isSafari) {
            positionCalendar();
        }
        triggerEvent("onReady");
    }
    function bindToInstance(fn) {
        return fn.bind(self);
    }
    function updateTime(e) {
        if (self.config.noCalendar && self.selectedDates.length === 0) {
            self.setDate(self.config.minDate !== undefined
                ? new Date(self.config.minDate.getTime())
                : new Date().setHours(self.config.defaultHour, self.config.defaultMinute, self.config.defaultSeconds, 0), false);
            setHoursFromInputs();
            updateValue();
        }
        timeWrapper(e);
        if (self.selectedDates.length === 0)
            return;
        if (e.type !== "input") {
            setHoursFromInputs();
            updateValue();
        }
        else {
            setTimeout(function () {
                setHoursFromInputs();
                updateValue();
            }, DEBOUNCED_CHANGE_MS);
        }
    }
    function ampm2military(hour, amPM) {
        return hour % 12 + 12 * int(amPM === self.l10n.amPM[1]);
    }
    function military2ampm(hour) {
        switch (hour % 24) {
            case 0:
            case 12:
                return 12;
            default:
                return hour % 12;
        }
    }
    function setHoursFromInputs() {
        if (self.hourElement === undefined || self.minuteElement === undefined)
            return;
        var hours = (parseInt(self.hourElement.value.slice(-2), 10) || 0) % 24, minutes = (parseInt(self.minuteElement.value, 10) || 0) % 60, seconds = self.secondElement !== undefined
            ? (parseInt(self.secondElement.value, 10) || 0) % 60
            : 0;
        if (self.amPM !== undefined)
            hours = ampm2military(hours, self.amPM.textContent);
        var limitMinHours = self.config.minTime !== undefined ||
            (self.config.minDate &&
                self.minDateHasTime &&
                self.latestSelectedDateObj &&
                compareDates(self.latestSelectedDateObj, self.config.minDate, true) ===
                    0);
        var limitMaxHours = self.config.maxTime !== undefined ||
            (self.config.maxDate &&
                self.maxDateHasTime &&
                self.latestSelectedDateObj &&
                compareDates(self.latestSelectedDateObj, self.config.maxDate, true) ===
                    0);
        if (limitMaxHours) {
            var maxTime = self.config.maxTime !== undefined
                ? self.config.maxTime
                : self.config.maxDate;
            hours = Math.min(hours, maxTime.getHours());
            if (hours === maxTime.getHours())
                minutes = Math.min(minutes, maxTime.getMinutes());
        }
        if (limitMinHours) {
            var minTime = self.config.minTime !== undefined
                ? self.config.minTime
                : self.config.minDate;
            hours = Math.max(hours, minTime.getHours());
            if (hours === minTime.getHours())
                minutes = Math.max(minutes, minTime.getMinutes());
        }
        setHours(hours, minutes, seconds);
    }
    function setHoursFromDate(dateObj) {
        var date = dateObj || self.latestSelectedDateObj;
        if (date)
            setHours(date.getHours(), date.getMinutes(), date.getSeconds());
    }
    function setHours(hours, minutes, seconds) {
        if (self.latestSelectedDateObj !== undefined) {
            self.latestSelectedDateObj.setHours(hours % 24, minutes, seconds || 0, 0);
        }
        if (!self.hourElement || !self.minuteElement || self.isMobile)
            return;
        self.hourElement.value = pad(!self.config.time_24hr
            ? (12 + hours) % 12 + 12 * int(hours % 12 === 0)
            : hours);
        self.minuteElement.value = pad(minutes);
        if (self.amPM !== undefined)
            self.amPM.textContent = self.l10n.amPM[int(hours >= 12)];
        if (self.secondElement !== undefined)
            self.secondElement.value = pad(seconds);
    }
    function onYearInput(event) {
        var year = parseInt(event.target.value) + (event.delta || 0);
        if (year.toString().length === 4 || event.key === "Enter") {
            self.currentYearElement.blur();
            if (!/[^\d]/.test(year.toString()))
                changeYear(year);
        }
    }
    function bind(element, event, handler, options) {
        if (event instanceof Array)
            return event.forEach(function (ev) { return bind(element, ev, handler, options); });
        if (element instanceof Array)
            return element.forEach(function (el) { return bind(el, event, handler, options); });
        element.addEventListener(event, handler, options);
        self._handlers.push({ element: element, event: event, handler: handler });
    }
    function onClick(handler) {
        return function (evt) {
            evt.which === 1 && handler(evt);
        };
    }
    function triggerChange() {
        triggerEvent("onChange");
    }
    function bindEvents() {
        if (self.config.wrap) {
            ["open", "close", "toggle", "clear"].forEach(function (evt) {
                Array.prototype.forEach.call(self.element.querySelectorAll("[data-" + evt + "]"), function (el) {
                    return bind(el, "click", self[evt]);
                });
            });
        }
        if (self.isMobile) {
            setupMobile();
            return;
        }
        var debouncedResize = debounce(onResize, 50);
        self._debouncedChange = debounce(triggerChange, DEBOUNCED_CHANGE_MS);
        if (self.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent))
            bind(self.daysContainer, "mouseover", function (e) {
                if (self.config.mode === "range")
                    onMouseOver(e.target);
            });
        bind(window.document.body, "keydown", onKeyDown);
        if (!self.config.static)
            bind(self._input, "keydown", onKeyDown);
        if (!self.config.inline && !self.config.static)
            bind(window, "resize", debouncedResize);
        if (window.ontouchstart !== undefined)
            bind(window.document, "touchstart", documentClick);
        bind(window.document, "mousedown", onClick(documentClick));
        bind(window.document, "focus", documentClick, { capture: true });
        if (self.config.clickOpens === true) {
            bind(self._input, "focus", self.open);
            bind(self._input, "mousedown", onClick(self.open));
        }
        if (self.daysContainer !== undefined) {
            bind(self.monthNav, "mousedown", onClick(onMonthNavClick));
            bind(self.monthNav, ["keyup", "increment"], onYearInput);
            bind(self.daysContainer, "mousedown", onClick(selectDate));
        }
        if (self.timeContainer !== undefined &&
            self.minuteElement !== undefined &&
            self.hourElement !== undefined) {
            var selText = function (e) {
                return e.target.select();
            };
            bind(self.timeContainer, ["input", "increment"], updateTime);
            bind(self.timeContainer, "mousedown", onClick(timeIncrement));
            bind(self.timeContainer, ["input", "increment"], self._debouncedChange, {
                passive: true,
            });
            bind([self.hourElement, self.minuteElement], ["focus", "click"], selText);
            if (self.secondElement !== undefined)
                bind(self.secondElement, "focus", function () { return self.secondElement && self.secondElement.select(); });
            if (self.amPM !== undefined) {
                bind(self.amPM, "mousedown", onClick(function (e) {
                    updateTime(e);
                    triggerChange();
                }));
            }
        }
    }
    function jumpToDate(jumpDate) {
        var jumpTo = jumpDate !== undefined
            ? self.parseDate(jumpDate)
            : self.latestSelectedDateObj ||
                (self.config.minDate && self.config.minDate > self.now
                    ? self.config.minDate
                    : self.config.maxDate && self.config.maxDate < self.now
                        ? self.config.maxDate
                        : self.now);
        try {
            if (jumpTo !== undefined) {
                self.currentYear = jumpTo.getFullYear();
                self.currentMonth = jumpTo.getMonth();
            }
        }
        catch (e) {
            e.message = "Invalid date supplied: " + jumpTo;
            self.config.errorHandler(e);
        }
        self.redraw();
    }
    function timeIncrement(e) {
        if (~e.target.className.indexOf("arrow"))
            incrementNumInput(e, e.target.classList.contains("arrowUp") ? 1 : -1);
    }
    function incrementNumInput(e, delta, inputElem) {
        var target = e && e.target;
        var input = inputElem ||
            (target && target.parentNode && target.parentNode.firstChild);
        var event = createEvent("increment");
        event.delta = delta;
        input && input.dispatchEvent(event);
    }
    function build() {
        var fragment = window.document.createDocumentFragment();
        self.calendarContainer = createElement("div", "flatpickr-calendar");
        self.calendarContainer.tabIndex = -1;
        if (!self.config.noCalendar) {
            fragment.appendChild(buildMonthNav());
            self.innerContainer = createElement("div", "flatpickr-innerContainer");
            if (self.config.weekNumbers) {
                var _a = buildWeeks(), weekWrapper = _a.weekWrapper, weekNumbers = _a.weekNumbers;
                self.innerContainer.appendChild(weekWrapper);
                self.weekNumbers = weekNumbers;
                self.weekWrapper = weekWrapper;
            }
            self.rContainer = createElement("div", "flatpickr-rContainer");
            self.rContainer.appendChild(buildWeekdays());
            if (!self.daysContainer) {
                self.daysContainer = createElement("div", "flatpickr-days");
                self.daysContainer.tabIndex = -1;
            }
            buildDays();
            self.rContainer.appendChild(self.daysContainer);
            self.innerContainer.appendChild(self.rContainer);
            fragment.appendChild(self.innerContainer);
        }
        if (self.config.enableTime) {
            fragment.appendChild(buildTime());
        }
        toggleClass(self.calendarContainer, "rangeMode", self.config.mode === "range");
        toggleClass(self.calendarContainer, "animate", self.config.animate);
        self.calendarContainer.appendChild(fragment);
        var customAppend = self.config.appendTo !== undefined && self.config.appendTo.nodeType;
        if (self.config.inline || self.config.static) {
            self.calendarContainer.classList.add(self.config.inline ? "inline" : "static");
            if (self.config.inline) {
                if (!customAppend && self.element.parentNode)
                    self.element.parentNode.insertBefore(self.calendarContainer, self._input.nextSibling);
                else if (self.config.appendTo !== undefined)
                    self.config.appendTo.appendChild(self.calendarContainer);
            }
            if (self.config.static) {
                var wrapper = createElement("div", "flatpickr-wrapper");
                if (self.element.parentNode)
                    self.element.parentNode.insertBefore(wrapper, self.element);
                wrapper.appendChild(self.element);
                if (self.altInput)
                    wrapper.appendChild(self.altInput);
                wrapper.appendChild(self.calendarContainer);
            }
        }
        if (!self.config.static && !self.config.inline)
            (self.config.appendTo !== undefined
                ? self.config.appendTo
                : window.document.body).appendChild(self.calendarContainer);
    }
    function createDay(className, date, dayNumber, i) {
        var dateIsEnabled = isEnabled(date, true), dayElement = createElement("span", "flatpickr-day " + className, date.getDate().toString());
        dayElement.dateObj = date;
        dayElement.$i = i;
        dayElement.setAttribute("aria-label", self.formatDate(date, self.config.ariaDateFormat));
        if (compareDates(date, self.now) === 0) {
            self.todayDateElem = dayElement;
            dayElement.classList.add("today");
        }
        if (dateIsEnabled) {
            dayElement.tabIndex = -1;
            if (isDateSelected(date)) {
                dayElement.classList.add("selected");
                self.selectedDateElem = dayElement;
                if (self.config.mode === "range") {
                    toggleClass(dayElement, "startRange", self.selectedDates[0] &&
                        compareDates(date, self.selectedDates[0]) === 0);
                    toggleClass(dayElement, "endRange", self.selectedDates[1] &&
                        compareDates(date, self.selectedDates[1]) === 0);
                }
            }
        }
        else {
            dayElement.classList.add("disabled");
            if (self.selectedDates[0] &&
                self.minRangeDate &&
                date > self.minRangeDate &&
                date < self.selectedDates[0])
                self.minRangeDate = date;
            else if (self.selectedDates[0] &&
                self.maxRangeDate &&
                date < self.maxRangeDate &&
                date > self.selectedDates[0])
                self.maxRangeDate = date;
        }
        if (self.config.mode === "range") {
            if (isDateInRange(date) && !isDateSelected(date))
                dayElement.classList.add("inRange");
            if (self.selectedDates.length === 1 &&
                self.minRangeDate !== undefined &&
                self.maxRangeDate !== undefined &&
                (date < self.minRangeDate || date > self.maxRangeDate))
                dayElement.classList.add("notAllowed");
        }
        if (self.weekNumbers &&
            className !== "prevMonthDay" &&
            dayNumber % 7 === 1) {
            self.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + self.config.getWeek(date) + "</span>");
        }
        triggerEvent("onDayCreate", dayElement);
        return dayElement;
    }
    function focusOnDay(currentIndex, offset) {
        var newIndex = currentIndex + offset || 0, targetNode = (currentIndex !== undefined
            ? self.days.childNodes[newIndex]
            : self.selectedDateElem ||
                self.todayDateElem ||
                self.days.childNodes[0]);
        var focus = function () {
            targetNode = targetNode || self.days.childNodes[newIndex];
            targetNode.focus();
            if (self.config.mode === "range")
                onMouseOver(targetNode);
        };
        if (targetNode === undefined && offset !== 0) {
            if (offset > 0) {
                self.changeMonth(1, true, true);
                newIndex = newIndex % 42;
            }
            else if (offset < 0) {
                self.changeMonth(-1, true, true);
                newIndex += 42;
            }
        }
        focus();
    }
    function buildDays() {
        if (self.daysContainer === undefined) {
            return;
        }
        var firstOfMonth = (new Date(self.currentYear, self.currentMonth, 1).getDay() -
            self.l10n.firstDayOfWeek +
            7) %
            7, isRangeMode = self.config.mode === "range";
        var prevMonthDays = self.utils.getDaysInMonth((self.currentMonth - 1 + 12) % 12);
        var daysInMonth = self.utils.getDaysInMonth(), days = window.document.createDocumentFragment();
        var dayNumber = prevMonthDays + 1 - firstOfMonth, dayIndex = 0;
        if (self.weekNumbers && self.weekNumbers.firstChild)
            self.weekNumbers.textContent = "";
        if (isRangeMode) {
            self.minRangeDate = new Date(self.currentYear, self.currentMonth - 1, dayNumber);
            self.maxRangeDate = new Date(self.currentYear, self.currentMonth + 1, (42 - firstOfMonth) % daysInMonth);
        }
        for (; dayNumber <= prevMonthDays; dayNumber++, dayIndex++) {
            days.appendChild(createDay("prevMonthDay", new Date(self.currentYear, self.currentMonth - 1, dayNumber), dayNumber, dayIndex));
        }
        for (dayNumber = 1; dayNumber <= daysInMonth; dayNumber++, dayIndex++) {
            days.appendChild(createDay("", new Date(self.currentYear, self.currentMonth, dayNumber), dayNumber, dayIndex));
        }
        for (var dayNum = daysInMonth + 1; dayNum <= 42 - firstOfMonth; dayNum++, dayIndex++) {
            days.appendChild(createDay("nextMonthDay", new Date(self.currentYear, self.currentMonth + 1, dayNum % daysInMonth), dayNum, dayIndex));
        }
        if (isRangeMode && self.selectedDates.length === 1 && days.childNodes[0]) {
            self._hidePrevMonthArrow =
                self._hidePrevMonthArrow ||
                    (!!self.minRangeDate &&
                        self.minRangeDate > days.childNodes[0].dateObj);
            self._hideNextMonthArrow =
                self._hideNextMonthArrow ||
                    (!!self.maxRangeDate &&
                        self.maxRangeDate <
                            new Date(self.currentYear, self.currentMonth + 1, 1));
        }
        else
            updateNavigationCurrentMonth();
        var dayContainer = createElement("div", "dayContainer");
        dayContainer.appendChild(days);
        clearNode(self.daysContainer);
        self.daysContainer.insertBefore(dayContainer, self.daysContainer.firstChild);
        self.days = self.daysContainer.firstChild;
    }
    function buildMonthNav() {
        var monthNavFragment = window.document.createDocumentFragment();
        self.monthNav = createElement("div", "flatpickr-month");
        self.prevMonthNav = createElement("span", "flatpickr-prev-month");
        self.prevMonthNav.innerHTML = self.config.prevArrow;
        self.currentMonthElement = createElement("span", "cur-month");
        var yearInput = createNumberInput("cur-year", { tabindex: "-1" });
        self.currentYearElement = yearInput.childNodes[0];
        if (self.config.minDate)
            self.currentYearElement.setAttribute("data-min", self.config.minDate.getFullYear().toString());
        if (self.config.maxDate) {
            self.currentYearElement.setAttribute("data-max", self.config.maxDate.getFullYear().toString());
            self.currentYearElement.disabled =
                !!self.config.minDate &&
                    self.config.minDate.getFullYear() === self.config.maxDate.getFullYear();
        }
        self.nextMonthNav = createElement("span", "flatpickr-next-month");
        self.nextMonthNav.innerHTML = self.config.nextArrow;
        self.navigationCurrentMonth = createElement("div", "flatpickr-current-month");
        self.navigationCurrentMonth.appendChild(self.currentMonthElement);
        self.navigationCurrentMonth.appendChild(yearInput);
        monthNavFragment.appendChild(self.prevMonthNav);
        monthNavFragment.appendChild(self.navigationCurrentMonth);
        monthNavFragment.appendChild(self.nextMonthNav);
        self.monthNav.appendChild(monthNavFragment);
        Object.defineProperty(self, "_hidePrevMonthArrow", {
            get: function () { return self.__hidePrevMonthArrow; },
            set: function (bool) {
                if (self.__hidePrevMonthArrow !== bool)
                    self.prevMonthNav.style.display = bool ? "none" : "block";
                self.__hidePrevMonthArrow = bool;
            },
        });
        Object.defineProperty(self, "_hideNextMonthArrow", {
            get: function () { return self.__hideNextMonthArrow; },
            set: function (bool) {
                if (self.__hideNextMonthArrow !== bool)
                    self.nextMonthNav.style.display = bool ? "none" : "block";
                self.__hideNextMonthArrow = bool;
            },
        });
        updateNavigationCurrentMonth();
        return self.monthNav;
    }
    function buildTime() {
        self.calendarContainer.classList.add("hasTime");
        if (self.config.noCalendar)
            self.calendarContainer.classList.add("noCalendar");
        self.timeContainer = createElement("div", "flatpickr-time");
        self.timeContainer.tabIndex = -1;
        var separator = createElement("span", "flatpickr-time-separator", ":");
        var hourInput = createNumberInput("flatpickr-hour");
        self.hourElement = hourInput.childNodes[0];
        var minuteInput = createNumberInput("flatpickr-minute");
        self.minuteElement = minuteInput.childNodes[0];
        self.hourElement.tabIndex = self.minuteElement.tabIndex = -1;
        self.hourElement.value = pad(self.latestSelectedDateObj
            ? self.latestSelectedDateObj.getHours()
            : self.config.time_24hr
                ? self.config.defaultHour
                : military2ampm(self.config.defaultHour));
        self.minuteElement.value = pad(self.latestSelectedDateObj
            ? self.latestSelectedDateObj.getMinutes()
            : self.config.defaultMinute);
        self.hourElement.setAttribute("data-step", self.config.hourIncrement.toString());
        self.minuteElement.setAttribute("data-step", self.config.minuteIncrement.toString());
        self.hourElement.setAttribute("data-min", self.config.time_24hr ? "0" : "1");
        self.hourElement.setAttribute("data-max", self.config.time_24hr ? "23" : "12");
        self.minuteElement.setAttribute("data-min", "0");
        self.minuteElement.setAttribute("data-max", "59");
        self.timeContainer.appendChild(hourInput);
        self.timeContainer.appendChild(separator);
        self.timeContainer.appendChild(minuteInput);
        if (self.config.time_24hr)
            self.timeContainer.classList.add("time24hr");
        if (self.config.enableSeconds) {
            self.timeContainer.classList.add("hasSeconds");
            var secondInput = createNumberInput("flatpickr-second");
            self.secondElement = secondInput.childNodes[0];
            self.secondElement.value = pad(self.latestSelectedDateObj
                ? self.latestSelectedDateObj.getSeconds()
                : self.config.defaultSeconds);
            self.secondElement.setAttribute("data-step", self.minuteElement.getAttribute("data-step"));
            self.secondElement.setAttribute("data-min", self.minuteElement.getAttribute("data-min"));
            self.secondElement.setAttribute("data-max", self.minuteElement.getAttribute("data-max"));
            self.timeContainer.appendChild(createElement("span", "flatpickr-time-separator", ":"));
            self.timeContainer.appendChild(secondInput);
        }
        if (!self.config.time_24hr) {
            self.amPM = createElement("span", "flatpickr-am-pm", self.l10n.amPM[int((self.latestSelectedDateObj
                ? self.hourElement.value
                : self.config.defaultHour) > 11)]);
            self.amPM.title = self.l10n.toggleTitle;
            self.amPM.tabIndex = -1;
            self.timeContainer.appendChild(self.amPM);
        }
        return self.timeContainer;
    }
    function buildWeekdays() {
        if (!self.weekdayContainer)
            self.weekdayContainer = createElement("div", "flatpickr-weekdays");
        var firstDayOfWeek = self.l10n.firstDayOfWeek;
        var weekdays = self.l10n.weekdays.shorthand.slice();
        if (firstDayOfWeek > 0 && firstDayOfWeek < weekdays.length) {
            weekdays = weekdays.splice(firstDayOfWeek, weekdays.length).concat(weekdays.splice(0, firstDayOfWeek));
        }
        self.weekdayContainer.innerHTML = "\n    <span class=flatpickr-weekday>\n      " + weekdays.join("</span><span class=flatpickr-weekday>") + "\n    </span>\n    ";
        return self.weekdayContainer;
    }
    function buildWeeks() {
        self.calendarContainer.classList.add("hasWeeks");
        var weekWrapper = createElement("div", "flatpickr-weekwrapper");
        weekWrapper.appendChild(createElement("span", "flatpickr-weekday", self.l10n.weekAbbreviation));
        var weekNumbers = createElement("div", "flatpickr-weeks");
        weekWrapper.appendChild(weekNumbers);
        return {
            weekWrapper: weekWrapper,
            weekNumbers: weekNumbers,
        };
    }
    function changeMonth(value, is_offset, from_keyboard) {
        if (is_offset === void 0) { is_offset = true; }
        if (from_keyboard === void 0) { from_keyboard = false; }
        var delta = is_offset ? value : value - self.currentMonth;
        if ((delta < 0 && self._hidePrevMonthArrow) ||
            (delta > 0 && self._hideNextMonthArrow))
            return;
        self.currentMonth += delta;
        if (self.currentMonth < 0 || self.currentMonth > 11) {
            self.currentYear += self.currentMonth > 11 ? 1 : -1;
            self.currentMonth = (self.currentMonth + 12) % 12;
            triggerEvent("onYearChange");
        }
        buildDays();
        triggerEvent("onMonthChange");
        updateNavigationCurrentMonth();
        if (from_keyboard &&
            document.activeElement &&
            document.activeElement.$i) {
            var index = document.activeElement.$i;
            focusOnDay(index, 0);
        }
    }
    function clear(triggerChangeEvent) {
        if (triggerChangeEvent === void 0) { triggerChangeEvent = true; }
        self.input.value = "";
        if (self.altInput)
            self.altInput.value = "";
        if (self.mobileInput)
            self.mobileInput.value = "";
        self.selectedDates = [];
        self.latestSelectedDateObj = undefined;
        self.showTimeInput = false;
        if (self.config.enableTime) {
            if (self.config.minDate !== undefined)
                setHoursFromDate(self.config.minDate);
            else
                setHours(self.config.defaultHour, self.config.defaultMinute, self.config.defaultSeconds);
        }
        self.redraw();
        if (triggerChangeEvent)
            triggerEvent("onChange");
    }
    function close() {
        self.isOpen = false;
        if (!self.isMobile) {
            self.calendarContainer.classList.remove("open");
            self._input.classList.remove("active");
        }
        triggerEvent("onClose");
    }
    function destroy() {
        if (self.config !== undefined)
            triggerEvent("onDestroy");
        for (var i = self._handlers.length; i--;) {
            var h = self._handlers[i];
            h.element.removeEventListener(h.event, h.handler);
        }
        self._handlers = [];
        if (self.mobileInput) {
            if (self.mobileInput.parentNode)
                self.mobileInput.parentNode.removeChild(self.mobileInput);
            self.mobileInput = undefined;
        }
        else if (self.calendarContainer && self.calendarContainer.parentNode)
            self.calendarContainer.parentNode.removeChild(self.calendarContainer);
        if (self.altInput) {
            self.input.type = "text";
            if (self.altInput.parentNode)
                self.altInput.parentNode.removeChild(self.altInput);
            delete self.altInput;
        }
        if (self.input) {
            self.input.type = self.input._type;
            self.input.classList.remove("flatpickr-input");
            self.input.removeAttribute("readonly");
            self.input.value = "";
        }
        [
            "_showTimeInput",
            "latestSelectedDateObj",
            "_hideNextMonthArrow",
            "_hidePrevMonthArrow",
            "__hideNextMonthArrow",
            "__hidePrevMonthArrow",
            "isMobile",
            "isOpen",
            "selectedDateElem",
            "minDateHasTime",
            "maxDateHasTime",
            "days",
            "daysContainer",
            "_input",
            "_positionElement",
            "innerContainer",
            "rContainer",
            "monthNav",
            "todayDateElem",
            "calendarContainer",
            "weekdayContainer",
            "prevMonthNav",
            "nextMonthNav",
            "currentMonthElement",
            "currentYearElement",
            "navigationCurrentMonth",
            "selectedDateElem",
            "config",
        ].forEach(function (k) {
            try {
                delete self[k];
            }
            catch (_) { }
        });
    }
    function isCalendarElem(elem) {
        if (self.config.appendTo && self.config.appendTo.contains(elem))
            return true;
        return self.calendarContainer.contains(elem);
    }
    function documentClick(e) {
        if (self.isOpen && !self.config.inline) {
            var isCalendarElement = isCalendarElem(e.target);
            var isInput = e.target === self.input ||
                e.target === self.altInput ||
                self.element.contains(e.target) ||
                (e.path &&
                    e.path.indexOf &&
                    (~e.path.indexOf(self.input) ||
                        ~e.path.indexOf(self.altInput)));
            var lostFocus = e.type === "blur"
                ? isInput &&
                    e.relatedTarget &&
                    !isCalendarElem(e.relatedTarget)
                : !isInput && !isCalendarElement;
            var isIgnored = !self.config.ignoredFocusElements.some(function (elem) {
                return elem.contains(e.target);
            });
            if (lostFocus && isIgnored) {
                self.close();
                if (self.config.mode === "range" && self.selectedDates.length === 1) {
                    self.clear(false);
                    self.redraw();
                }
            }
        }
    }
    function changeYear(newYear) {
        if (!newYear ||
            (self.currentYearElement.getAttribute("data-min") &&
                newYear <
                    parseInt(self.currentYearElement.getAttribute("data-min"))) ||
            (self.currentYearElement.getAttribute("data-max") &&
                newYear >
                    parseInt(self.currentYearElement.getAttribute("data-max"))))
            return;
        var newYearNum = newYear, isNewYear = self.currentYear !== newYearNum;
        self.currentYear = newYearNum || self.currentYear;
        if (self.config.maxDate &&
            self.currentYear === self.config.maxDate.getFullYear()) {
            self.currentMonth = Math.min(self.config.maxDate.getMonth(), self.currentMonth);
        }
        else if (self.config.minDate &&
            self.currentYear === self.config.minDate.getFullYear()) {
            self.currentMonth = Math.max(self.config.minDate.getMonth(), self.currentMonth);
        }
        if (isNewYear) {
            self.redraw();
            triggerEvent("onYearChange");
        }
    }
    function isEnabled(date, timeless) {
        if (timeless === void 0) { timeless = true; }
        var dateToCheck = self.parseDate(date, undefined, timeless);
        if ((self.config.minDate &&
            dateToCheck &&
            compareDates(dateToCheck, self.config.minDate, timeless !== undefined ? timeless : !self.minDateHasTime) < 0) ||
            (self.config.maxDate &&
                dateToCheck &&
                compareDates(dateToCheck, self.config.maxDate, timeless !== undefined ? timeless : !self.maxDateHasTime) > 0))
            return false;
        if (!self.config.enable.length && !self.config.disable.length)
            return true;
        if (dateToCheck === undefined)
            return false;
        var bool = self.config.enable.length > 0, array = bool ? self.config.enable : self.config.disable;
        for (var i = 0, d = void 0; i < array.length; i++) {
            d = array[i];
            if (typeof d === "function" &&
                d(dateToCheck))
                return bool;
            else if (d instanceof Date &&
                dateToCheck !== undefined &&
                d.getTime() === dateToCheck.getTime())
                return bool;
            else if (typeof d === "string" && dateToCheck !== undefined) {
                var parsed = self.parseDate(d, undefined, true);
                return parsed && parsed.getTime() === dateToCheck.getTime()
                    ? bool
                    : !bool;
            }
            else if (typeof d === "object" &&
                dateToCheck !== undefined &&
                d.from &&
                d.to &&
                dateToCheck.getTime() >= d.from.getTime() &&
                dateToCheck.getTime() <= d.to.getTime())
                return bool;
        }
        return !bool;
    }
    function onKeyDown(e) {
        var isInput = e.target === self._input;
        var calendarElem = isCalendarElem(e.target);
        var allowInput = self.config.allowInput;
        var allowKeydown = self.isOpen && (!allowInput || !isInput);
        var allowInlineKeydown = self.config.inline && isInput && !allowInput;
        if (e.keyCode === 13 && isInput) {
            if (allowInput) {
                self.setDate(self._input.value, true, e.target === self.altInput
                    ? self.config.altFormat
                    : self.config.dateFormat);
                return e.target.blur();
            }
            else
                self.open();
        }
        else if (calendarElem || allowKeydown || allowInlineKeydown) {
            var isTimeObj = !!self.timeContainer &&
                self.timeContainer.contains(e.target);
            switch (e.keyCode) {
                case 13:
                    if (isTimeObj)
                        updateValue();
                    else
                        selectDate(e);
                    break;
                case 27:
                    e.preventDefault();
                    self.close();
                    break;
                case 8:
                case 46:
                    if (isInput && !self.config.allowInput)
                        self.clear();
                    break;
                case 37:
                case 39:
                    if (!isTimeObj) {
                        e.preventDefault();
                        if (self.daysContainer) {
                            var delta_1 = e.keyCode === 39 ? 1 : -1;
                            if (!e.ctrlKey)
                                focusOnDay(e.target.$i, delta_1);
                            else
                                changeMonth(delta_1, true, true);
                        }
                    }
                    else if (self.hourElement)
                        self.hourElement.focus();
                    break;
                case 38:
                case 40:
                    e.preventDefault();
                    var delta = e.keyCode === 40 ? 1 : -1;
                    if (self.daysContainer && e.target.$i !== undefined) {
                        if (e.ctrlKey) {
                            changeYear(self.currentYear - delta);
                            focusOnDay(e.target.$i, 0);
                        }
                        else if (!isTimeObj)
                            focusOnDay(e.target.$i, delta * 7);
                    }
                    else if (self.config.enableTime) {
                        if (!isTimeObj && self.hourElement)
                            self.hourElement.focus();
                        updateTime(e);
                        self._debouncedChange();
                    }
                    break;
                case 9:
                    if (e.target === self.hourElement) {
                        e.preventDefault();
                        self.minuteElement.select();
                    }
                    else if (e.target === self.minuteElement &&
                        (self.secondElement || self.amPM)) {
                        e.preventDefault();
                        if (self.secondElement !== undefined)
                            self.secondElement.focus();
                        else if (self.amPM !== undefined)
                            self.amPM.focus();
                    }
                    else if (e.target === self.secondElement && self.amPM) {
                        e.preventDefault();
                        self.amPM.focus();
                    }
                    break;
                default:
                    break;
            }
            switch (e.key) {
                case self.l10n.amPM[0].charAt(0):
                    if (self.amPM !== undefined && e.target === self.amPM) {
                        self.amPM.textContent = self.l10n.amPM[0];
                        setHoursFromInputs();
                        updateValue();
                    }
                    break;
                case self.l10n.amPM[1].charAt(0):
                    if (self.amPM !== undefined && e.target === self.amPM) {
                        self.amPM.textContent = self.l10n.amPM[1];
                        setHoursFromInputs();
                        updateValue();
                    }
                    break;
                default:
                    break;
            }
            triggerEvent("onKeyDown", e);
        }
    }
    function onMouseOver(elem) {
        if (self.selectedDates.length !== 1 ||
            !elem.classList.contains("flatpickr-day") ||
            elem.classList.contains("disabled") ||
            self.minRangeDate === undefined ||
            self.maxRangeDate === undefined)
            return;
        var hoverDate = elem.dateObj, initialDate = self.parseDate(self.selectedDates[0], undefined, true), rangeStartDate = Math.min(hoverDate.getTime(), self.selectedDates[0].getTime()), rangeEndDate = Math.max(hoverDate.getTime(), self.selectedDates[0].getTime()), containsDisabled = false;
        for (var t = rangeStartDate; t < rangeEndDate; t += duration.DAY) {
            if (!isEnabled(new Date(t))) {
                containsDisabled = true;
                break;
            }
        }
        var _loop_1 = function (i, date) {
            var timestamp = date.getTime();
            var outOfRange = timestamp < self.minRangeDate.getTime() ||
                timestamp > self.maxRangeDate.getTime(), dayElem = self.days.childNodes[i];
            if (outOfRange) {
                dayElem.classList.add("notAllowed");
                ["inRange", "startRange", "endRange"].forEach(function (c) {
                    dayElem.classList.remove(c);
                });
                return "continue";
            }
            else if (containsDisabled && !outOfRange)
                return "continue";
            ["startRange", "inRange", "endRange", "notAllowed"].forEach(function (c) {
                dayElem.classList.remove(c);
            });
            var minRangeDate = Math.max(self.minRangeDate.getTime(), rangeStartDate), maxRangeDate = Math.min(self.maxRangeDate.getTime(), rangeEndDate);
            elem.classList.add(hoverDate < self.selectedDates[0] ? "startRange" : "endRange");
            if (initialDate < hoverDate && timestamp === initialDate.getTime())
                dayElem.classList.add("startRange");
            else if (initialDate > hoverDate && timestamp === initialDate.getTime())
                dayElem.classList.add("endRange");
            if (timestamp >= minRangeDate && timestamp <= maxRangeDate)
                dayElem.classList.add("inRange");
        };
        for (var i = 0, date = self.days.childNodes[i].dateObj; i < 42; i++, date =
                self.days.childNodes[i] &&
                    self.days.childNodes[i].dateObj) {
            _loop_1(i, date);
        }
    }
    function onResize() {
        if (self.isOpen && !self.config.static && !self.config.inline)
            positionCalendar();
    }
    function open(e, positionElement) {
        if (positionElement === void 0) { positionElement = self._input; }
        if (self.isMobile) {
            if (e) {
                e.preventDefault();
                e.target && e.target.blur();
            }
            setTimeout(function () {
                self.mobileInput !== undefined && self.mobileInput.click();
            }, 0);
            triggerEvent("onOpen");
            return;
        }
        if (self._input.disabled || self.config.inline)
            return;
        var wasOpen = self.isOpen;
        self.isOpen = true;
        if (!wasOpen) {
            self.calendarContainer.classList.add("open");
            self._input.classList.add("active");
            triggerEvent("onOpen");
            positionCalendar(positionElement);
        }
    }
    function minMaxDateSetter(type) {
        return function (date) {
            var dateObj = (self.config["_" + type + "Date"] = self.parseDate(date, self.config.dateFormat));
            var inverseDateObj = self.config["_" + (type === "min" ? "max" : "min") + "Date"];
            if (dateObj !== undefined) {
                self[type === "min" ? "minDateHasTime" : "maxDateHasTime"] =
                    dateObj.getHours() > 0 ||
                        dateObj.getMinutes() > 0 ||
                        dateObj.getSeconds() > 0;
            }
            if (self.selectedDates) {
                self.selectedDates = self.selectedDates.filter(function (d) { return isEnabled(d); });
                if (!self.selectedDates.length && type === "min")
                    setHoursFromDate(dateObj);
                updateValue();
            }
            if (self.daysContainer) {
                redraw();
                if (dateObj !== undefined)
                    self.currentYearElement[type] = dateObj.getFullYear().toString();
                else
                    self.currentYearElement.removeAttribute(type);
                self.currentYearElement.disabled =
                    !!inverseDateObj &&
                        dateObj !== undefined &&
                        inverseDateObj.getFullYear() === dateObj.getFullYear();
            }
        };
    }
    function parseConfig() {
        var boolOpts = [
            "wrap",
            "weekNumbers",
            "allowInput",
            "clickOpens",
            "time_24hr",
            "enableTime",
            "noCalendar",
            "altInput",
            "shorthandCurrentMonth",
            "inline",
            "static",
            "enableSeconds",
            "disableMobile",
        ];
        var hooks = [
            "onChange",
            "onClose",
            "onDayCreate",
            "onDestroy",
            "onKeyDown",
            "onMonthChange",
            "onOpen",
            "onParseConfig",
            "onReady",
            "onValueUpdate",
            "onYearChange",
            "onPreCalendarPosition",
        ];
        var userConfig = __assign({}, instanceConfig, JSON.parse(JSON.stringify(element.dataset || {})));
        var formats$$1 = {};
        self.config.parseDate = userConfig.parseDate;
        self.config.formatDate = userConfig.formatDate;
        Object.defineProperty(self.config, "enable", {
            get: function () { return self.config._enable || []; },
            set: function (dates) {
                self.config._enable = parseDateRules(dates);
            },
        });
        Object.defineProperty(self.config, "disable", {
            get: function () { return self.config._disable || []; },
            set: function (dates) {
                self.config._disable = parseDateRules(dates);
            },
        });
        if (!userConfig.dateFormat && userConfig.enableTime) {
            formats$$1.dateFormat = userConfig.noCalendar
                ? "H:i" + (userConfig.enableSeconds ? ":S" : "")
                : flatpickr.defaultConfig.dateFormat +
                    " H:i" +
                    (userConfig.enableSeconds ? ":S" : "");
        }
        if (userConfig.altInput && userConfig.enableTime && !userConfig.altFormat) {
            formats$$1.altFormat = userConfig.noCalendar
                ? "h:i" + (userConfig.enableSeconds ? ":S K" : " K")
                : flatpickr.defaultConfig.altFormat +
                    (" h:i" + (userConfig.enableSeconds ? ":S" : "") + " K");
        }
        Object.defineProperty(self.config, "minDate", {
            get: function () { return self.config._minDate; },
            set: minMaxDateSetter("min"),
        });
        Object.defineProperty(self.config, "maxDate", {
            get: function () { return self.config._maxDate; },
            set: minMaxDateSetter("max"),
        });
        var minMaxTimeSetter = function (type) { return function (val) {
            self.config[type === "min" ? "_minTime" : "_maxTime"] = self.parseDate(val, "H:i");
        }; };
        Object.defineProperty(self.config, "minTime", {
            get: function () { return self.config._minTime; },
            set: minMaxTimeSetter("min"),
        });
        Object.defineProperty(self.config, "maxTime", {
            get: function () { return self.config._maxTime; },
            set: minMaxTimeSetter("max"),
        });
        Object.assign(self.config, formats$$1, userConfig);
        for (var i = 0; i < boolOpts.length; i++)
            self.config[boolOpts[i]] =
                self.config[boolOpts[i]] === true ||
                    self.config[boolOpts[i]] === "true";
        for (var i = hooks.length; i--;) {
            if (self.config[hooks[i]] !== undefined) {
                self.config[hooks[i]] = arrayify(self.config[hooks[i]] || []).map(bindToInstance);
            }
        }
        for (var i = 0; i < self.config.plugins.length; i++) {
            var pluginConf = self.config.plugins[i](self) || {};
            for (var key in pluginConf) {
                if (~hooks.indexOf(key)) {
                    self.config[key] = arrayify(pluginConf[key])
                        .map(bindToInstance)
                        .concat(self.config[key]);
                }
                else if (typeof userConfig[key] === "undefined")
                    self.config[key] = pluginConf[key];
            }
        }
        self.isMobile =
            !self.config.disableMobile &&
                !self.config.inline &&
                self.config.mode === "single" &&
                !self.config.disable.length &&
                !self.config.enable.length &&
                !self.config.weekNumbers &&
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        triggerEvent("onParseConfig");
    }
    function setupLocale() {
        if (typeof self.config.locale !== "object" &&
            typeof flatpickr.l10ns[self.config.locale] === "undefined")
            self.config.errorHandler(new Error("flatpickr: invalid locale " + self.config.locale));
        self.l10n = __assign({}, flatpickr.l10ns.default, (typeof self.config.locale === "object"
            ? self.config.locale
            : self.config.locale !== "default"
                ? flatpickr.l10ns[self.config.locale]
                : undefined));
        tokenRegex.K = "(" + self.l10n.amPM[0] + "|" + self.l10n.amPM[1] + "|" + self.l10n.amPM[0].toLowerCase() + "|" + self.l10n.amPM[1].toLowerCase() + ")";
        self.formatDate = createDateFormatter(self);
    }
    function positionCalendar(customPositionElement) {
        if (self.calendarContainer === undefined)
            return;
        triggerEvent("onPreCalendarPosition");
        var positionElement = customPositionElement || self._positionElement;
        var calendarHeight = Array.prototype.reduce.call(self.calendarContainer.children, function (acc, child) { return acc + child.offsetHeight; }, 0), calendarWidth = self.calendarContainer.offsetWidth, configPos = self.config.position, inputBounds = positionElement.getBoundingClientRect(), distanceFromBottom = window.innerHeight - inputBounds.bottom, showOnTop = configPos === "above" ||
            (configPos !== "below" &&
                distanceFromBottom < calendarHeight &&
                inputBounds.top > calendarHeight);
        var top = window.pageYOffset +
            inputBounds.top +
            (!showOnTop ? positionElement.offsetHeight + 2 : -calendarHeight - 2);
        toggleClass(self.calendarContainer, "arrowTop", !showOnTop);
        toggleClass(self.calendarContainer, "arrowBottom", showOnTop);
        if (self.config.inline)
            return;
        var left = window.pageXOffset + inputBounds.left;
        var right = window.document.body.offsetWidth - inputBounds.right;
        var rightMost = left + calendarWidth > window.document.body.offsetWidth;
        toggleClass(self.calendarContainer, "rightMost", rightMost);
        if (self.config.static)
            return;
        self.calendarContainer.style.top = top + "px";
        if (!rightMost) {
            self.calendarContainer.style.left = left + "px";
            self.calendarContainer.style.right = "auto";
        }
        else {
            self.calendarContainer.style.left = "auto";
            self.calendarContainer.style.right = right + "px";
        }
    }
    function redraw() {
        if (self.config.noCalendar || self.isMobile)
            return;
        buildWeekdays();
        updateNavigationCurrentMonth();
        buildDays();
    }
    function focusAndClose() {
        self._input.focus();
        if (window.navigator.userAgent.indexOf("MSIE") !== -1 ||
            navigator.msMaxTouchPoints !== undefined) {
            setTimeout(self.close, 0);
        }
        else {
            self.close();
        }
    }
    function selectDate(e) {
        e.preventDefault();
        e.stopPropagation();
        var isSelectable = function (day) {
            return day.classList &&
                day.classList.contains("flatpickr-day") &&
                !day.classList.contains("disabled") &&
                !day.classList.contains("notAllowed");
        };
        var t = findParent(e.target, isSelectable);
        if (t === undefined)
            return;
        var target = t;
        var selectedDate = (self.latestSelectedDateObj = new Date(target.dateObj.getTime()));
        var shouldChangeMonth = selectedDate.getMonth() !== self.currentMonth &&
            self.config.mode !== "range";
        self.selectedDateElem = target;
        if (self.config.mode === "single")
            self.selectedDates = [selectedDate];
        else if (self.config.mode === "multiple") {
            var selectedIndex = isDateSelected(selectedDate);
            if (selectedIndex)
                self.selectedDates.splice(parseInt(selectedIndex), 1);
            else
                self.selectedDates.push(selectedDate);
        }
        else if (self.config.mode === "range") {
            if (self.selectedDates.length === 2)
                self.clear();
            self.selectedDates.push(selectedDate);
            if (compareDates(selectedDate, self.selectedDates[0], true) !== 0)
                self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
        }
        setHoursFromInputs();
        if (shouldChangeMonth) {
            var isNewYear = self.currentYear !== selectedDate.getFullYear();
            self.currentYear = selectedDate.getFullYear();
            self.currentMonth = selectedDate.getMonth();
            if (isNewYear)
                triggerEvent("onYearChange");
            triggerEvent("onMonthChange");
        }
        buildDays();
        if (self.config.minDate &&
            self.minDateHasTime &&
            self.config.enableTime &&
            compareDates(selectedDate, self.config.minDate) === 0)
            setHoursFromDate(self.config.minDate);
        updateValue();
        if (self.config.enableTime)
            setTimeout(function () { return (self.showTimeInput = true); }, 50);
        if (self.config.mode === "range") {
            if (self.selectedDates.length === 1) {
                onMouseOver(target);
                self._hidePrevMonthArrow =
                    self._hidePrevMonthArrow ||
                        (self.minRangeDate !== undefined &&
                            self.minRangeDate >
                                self.days.childNodes[0].dateObj);
                self._hideNextMonthArrow =
                    self._hideNextMonthArrow ||
                        (self.maxRangeDate !== undefined &&
                            self.maxRangeDate <
                                new Date(self.currentYear, self.currentMonth + 1, 1));
            }
            else
                updateNavigationCurrentMonth();
        }
        if (!shouldChangeMonth)
            focusOnDay(target.$i, 0);
        else
            self.selectedDateElem && self.selectedDateElem.focus();
        if (self.hourElement !== undefined)
            setTimeout(function () { return self.hourElement !== undefined && self.hourElement.select(); }, 451);
        if (self.config.closeOnSelect) {
            var single = self.config.mode === "single" && !self.config.enableTime;
            var range = self.config.mode === "range" &&
                self.selectedDates.length === 2 &&
                !self.config.enableTime;
            if (single || range) {
                focusAndClose();
            }
        }
        triggerChange();
    }
    var CALLBACKS = {
        locale: [setupLocale],
    };
    function set(option, value) {
        if (option !== null && typeof option === "object")
            Object.assign(self.config, option);
        else {
            self.config[option] = value;
            if (CALLBACKS[option] !== undefined)
                CALLBACKS[option].forEach(function (x) { return x(); });
        }
        self.redraw();
        jumpToDate();
    }
    function setSelectedDate(inputDate, format) {
        var dates = [];
        if (inputDate instanceof Array)
            dates = inputDate.map(function (d) { return self.parseDate(d, format); });
        else if (inputDate instanceof Date || typeof inputDate === "number")
            dates = [self.parseDate(inputDate, format)];
        else if (typeof inputDate === "string") {
            switch (self.config.mode) {
                case "single":
                    dates = [self.parseDate(inputDate, format)];
                    break;
                case "multiple":
                    dates = inputDate
                        .split(self.config.conjunction)
                        .map(function (date) { return self.parseDate(date, format); });
                    break;
                case "range":
                    dates = inputDate
                        .split(self.l10n.rangeSeparator)
                        .map(function (date) { return self.parseDate(date, format); });
                    break;
                default:
                    break;
            }
        }
        else
            self.config.errorHandler(new Error("Invalid date supplied: " + JSON.stringify(inputDate)));
        self.selectedDates = dates.filter(function (d) { return d instanceof Date && isEnabled(d, false); });
        if (self.config.mode === "range")
            self.selectedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
    }
    function setDate(date, triggerChange, format) {
        if (triggerChange === void 0) { triggerChange = false; }
        if (format === void 0) { format = self.config.dateFormat; }
        if (date !== 0 && !date)
            return self.clear(triggerChange);
        setSelectedDate(date, format);
        self.showTimeInput = self.selectedDates.length > 0;
        self.latestSelectedDateObj = self.selectedDates[0];
        self.redraw();
        jumpToDate();
        setHoursFromDate();
        updateValue(triggerChange);
        if (triggerChange)
            triggerEvent("onChange");
    }
    function parseDateRules(arr) {
        return arr
            .map(function (rule) {
            if (typeof rule === "string" ||
                typeof rule === "number" ||
                rule instanceof Date) {
                return self.parseDate(rule, undefined, true);
            }
            else if (rule &&
                typeof rule === "object" &&
                rule.from &&
                rule.to)
                return {
                    from: self.parseDate(rule.from, undefined),
                    to: self.parseDate(rule.to, undefined),
                };
            return rule;
        })
            .filter(function (x) { return x; });
    }
    function setupDates() {
        self.selectedDates = [];
        self.now = new Date();
        var preloadedDate = self.config.defaultDate || self.input.value;
        if (preloadedDate)
            setSelectedDate(preloadedDate, self.config.dateFormat);
        var initialDate = self.selectedDates.length
            ? self.selectedDates[0]
            : self.config.minDate &&
                self.config.minDate.getTime() > self.now.getTime()
                ? self.config.minDate
                : self.config.maxDate &&
                    self.config.maxDate.getTime() < self.now.getTime()
                    ? self.config.maxDate
                    : self.now;
        self.currentYear = initialDate.getFullYear();
        self.currentMonth = initialDate.getMonth();
        if (self.selectedDates.length)
            self.latestSelectedDateObj = self.selectedDates[0];
        if (self.config.minTime !== undefined)
            self.config.minTime = self.parseDate(self.config.minTime, "H:i");
        if (self.config.maxTime !== undefined)
            self.config.maxTime = self.parseDate(self.config.maxTime, "H:i");
        self.minDateHasTime =
            !!self.config.minDate &&
                (self.config.minDate.getHours() > 0 ||
                    self.config.minDate.getMinutes() > 0 ||
                    self.config.minDate.getSeconds() > 0);
        self.maxDateHasTime =
            !!self.config.maxDate &&
                (self.config.maxDate.getHours() > 0 ||
                    self.config.maxDate.getMinutes() > 0 ||
                    self.config.maxDate.getSeconds() > 0);
        Object.defineProperty(self, "showTimeInput", {
            get: function () { return self._showTimeInput; },
            set: function (bool) {
                self._showTimeInput = bool;
                if (self.calendarContainer)
                    toggleClass(self.calendarContainer, "showTimeInput", bool);
                self.isOpen && positionCalendar();
            },
        });
    }
    function setupInputs() {
        self.input = self.config.wrap
            ? element.querySelector("[data-input]")
            : element;
        if (!self.input) {
            self.config.errorHandler(new Error("Invalid input element specified"));
            return;
        }
        self.input._type = self.input.type;
        self.input.type = "text";
        self.input.classList.add("flatpickr-input");
        self._input = self.input;
        if (self.config.altInput) {
            self.altInput = createElement(self.input.nodeName, self.input.className + " " + self.config.altInputClass);
            self._input = self.altInput;
            self.altInput.placeholder = self.input.placeholder;
            self.altInput.disabled = self.input.disabled;
            self.altInput.required = self.input.required;
            self.altInput.tabIndex = self.input.tabIndex;
            self.altInput.type = "text";
            self.input.type = "hidden";
            if (!self.config.static && self.input.parentNode)
                self.input.parentNode.insertBefore(self.altInput, self.input.nextSibling);
        }
        if (!self.config.allowInput)
            self._input.setAttribute("readonly", "readonly");
        self._positionElement = self.config.positionElement || self._input;
    }
    function setupMobile() {
        var inputType = self.config.enableTime
            ? self.config.noCalendar ? "time" : "datetime-local"
            : "date";
        self.mobileInput = createElement("input", self.input.className + " flatpickr-mobile");
        self.mobileInput.step = self.input.getAttribute("step") || "any";
        self.mobileInput.tabIndex = 1;
        self.mobileInput.type = inputType;
        self.mobileInput.disabled = self.input.disabled;
        self.mobileInput.required = self.input.required;
        self.mobileInput.placeholder = self.input.placeholder;
        self.mobileFormatStr =
            inputType === "datetime-local"
                ? "Y-m-d\\TH:i:S"
                : inputType === "date" ? "Y-m-d" : "H:i:S";
        if (self.selectedDates.length) {
            self.mobileInput.defaultValue = self.mobileInput.value = self.formatDate(self.selectedDates[0], self.mobileFormatStr);
        }
        if (self.config.minDate)
            self.mobileInput.min = self.formatDate(self.config.minDate, "Y-m-d");
        if (self.config.maxDate)
            self.mobileInput.max = self.formatDate(self.config.maxDate, "Y-m-d");
        self.input.type = "hidden";
        if (self.altInput !== undefined)
            self.altInput.type = "hidden";
        try {
            if (self.input.parentNode)
                self.input.parentNode.insertBefore(self.mobileInput, self.input.nextSibling);
        }
        catch (_a) { }
        bind(self.mobileInput, "change", function (e) {
            self.setDate(e.target.value, false, self.mobileFormatStr);
            triggerEvent("onChange");
            triggerEvent("onClose");
        });
    }
    function toggle() {
        if (self.isOpen)
            return self.close();
        self.open();
    }
    function triggerEvent(event, data) {
        var hooks = self.config[event];
        if (hooks !== undefined && hooks.length > 0) {
            for (var i = 0; hooks[i] && i < hooks.length; i++)
                hooks[i](self.selectedDates, self.input.value, self, data);
        }
        if (event === "onChange") {
            self.input.dispatchEvent(createEvent("change"));
            self.input.dispatchEvent(createEvent("input"));
        }
    }
    function createEvent(name) {
        var e = document.createEvent("Event");
        e.initEvent(name, true, true);
        return e;
    }
    function isDateSelected(date) {
        for (var i = 0; i < self.selectedDates.length; i++) {
            if (compareDates(self.selectedDates[i], date) === 0)
                return "" + i;
        }
        return false;
    }
    function isDateInRange(date) {
        if (self.config.mode !== "range" || self.selectedDates.length < 2)
            return false;
        return (compareDates(date, self.selectedDates[0]) >= 0 &&
            compareDates(date, self.selectedDates[1]) <= 0);
    }
    function updateNavigationCurrentMonth() {
        if (self.config.noCalendar || self.isMobile || !self.monthNav)
            return;
        self.currentMonthElement.textContent =
            monthToStr(self.currentMonth, self.config.shorthandCurrentMonth, self.l10n) + " ";
        self.currentYearElement.value = self.currentYear.toString();
        self._hidePrevMonthArrow =
            self.config.minDate !== undefined &&
                (self.currentYear === self.config.minDate.getFullYear()
                    ? self.currentMonth <= self.config.minDate.getMonth()
                    : self.currentYear < self.config.minDate.getFullYear());
        self._hideNextMonthArrow =
            self.config.maxDate !== undefined &&
                (self.currentYear === self.config.maxDate.getFullYear()
                    ? self.currentMonth + 1 > self.config.maxDate.getMonth()
                    : self.currentYear > self.config.maxDate.getFullYear());
    }
    function updateValue(triggerChange) {
        if (triggerChange === void 0) { triggerChange = true; }
        if (!self.selectedDates.length)
            return self.clear(triggerChange);
        if (self.mobileInput !== undefined && self.mobileFormatStr) {
            self.mobileInput.value =
                self.latestSelectedDateObj !== undefined
                    ? self.formatDate(self.latestSelectedDateObj, self.mobileFormatStr)
                    : "";
        }
        var joinChar = self.config.mode !== "range"
            ? self.config.conjunction
            : self.l10n.rangeSeparator;
        self.input.value = self.selectedDates
            .map(function (dObj) { return self.formatDate(dObj, self.config.dateFormat); })
            .join(joinChar);
        if (self.altInput !== undefined) {
            self.altInput.value = self.selectedDates
                .map(function (dObj) { return self.formatDate(dObj, self.config.altFormat); })
                .join(joinChar);
        }
        if (triggerChange !== false)
            triggerEvent("onValueUpdate");
    }
    function onMonthNavClick(e) {
        e.preventDefault();
        var isPrevMonth = self.prevMonthNav.contains(e.target);
        var isNextMonth = self.nextMonthNav.contains(e.target);
        if (isPrevMonth || isNextMonth) {
            changeMonth(isPrevMonth ? -1 : 1);
        }
        else if (e.target === self.currentYearElement) {
            self.currentYearElement.select();
        }
        else if (e.target.className === "arrowUp") {
            self.changeYear(self.currentYear + 1);
        }
        else if (e.target.className === "arrowDown") {
            self.changeYear(self.currentYear - 1);
        }
    }
    function timeWrapper(e) {
        e.preventDefault();
        var isKeyDown = e.type === "keydown", input = e.target;
        if (self.amPM !== undefined && e.target === self.amPM) {
            self.amPM.textContent =
                self.l10n.amPM[int(self.amPM.textContent === self.l10n.amPM[0])];
        }
        var min = parseFloat(input.getAttribute("data-min")), max = parseFloat(input.getAttribute("data-max")), step = parseFloat(input.getAttribute("data-step")), curValue = parseInt(input.value, 10), delta = e.delta ||
            (isKeyDown ? (e.which === 38 ? 1 : -1) : 0);
        var newValue = curValue + step * delta;
        if (typeof input.value !== "undefined" && input.value.length === 2) {
            var isHourElem = input === self.hourElement, isMinuteElem = input === self.minuteElement;
            if (newValue < min) {
                newValue =
                    max +
                        newValue +
                        int(!isHourElem) +
                        (int(isHourElem) && int(!self.amPM));
                if (isMinuteElem)
                    incrementNumInput(undefined, -1, self.hourElement);
            }
            else if (newValue > max) {
                newValue =
                    input === self.hourElement ? newValue - max - int(!self.amPM) : min;
                if (isMinuteElem)
                    incrementNumInput(undefined, 1, self.hourElement);
            }
            if (self.amPM &&
                isHourElem &&
                (step === 1
                    ? newValue + curValue === 23
                    : Math.abs(newValue - curValue) > step)) {
                self.amPM.textContent =
                    self.l10n.amPM[int(self.amPM.textContent === self.l10n.amPM[0])];
            }
            input.value = pad(newValue);
        }
    }
    init();
    return self;
}
function _flatpickr(nodeList, config) {
    var nodes = Array.prototype.slice.call(nodeList);
    var instances = [];
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        try {
            if (node.getAttribute("data-fp-omit") !== null)
                continue;
            if (node._flatpickr !== undefined) {
                node._flatpickr.destroy();
                node._flatpickr = undefined;
            }
            node._flatpickr = FlatpickrInstance(node, config || {});
            instances.push(node._flatpickr);
        }
        catch (e) {
            console.error(e);
        }
    }
    return instances.length === 1 ? instances[0] : instances;
}
if (typeof HTMLElement !== "undefined") {
    HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function (config) {
        return _flatpickr(this, config);
    };
    HTMLElement.prototype.flatpickr = function (config) {
        return _flatpickr([this], config);
    };
}
var flatpickr;
flatpickr = function (selector, config) {
    if (selector instanceof NodeList)
        return _flatpickr(selector, config);
    else if (typeof selector === "string")
        return _flatpickr(window.document.querySelectorAll(selector), config);
    return _flatpickr([selector], config);
};
if (typeof window === "object")
    window.flatpickr = flatpickr;
flatpickr.defaultConfig = defaults;
flatpickr.l10ns = {
    en: __assign({}, english),
    default: __assign({}, english),
};
flatpickr.localize = function (l10n) {
    flatpickr.l10ns.default = __assign({}, flatpickr.l10ns.default, l10n);
};
flatpickr.setDefaults = function (config) {
    flatpickr.defaultConfig = __assign({}, flatpickr.defaultConfig, config);
};
flatpickr.parseDate = createDateParser({});
flatpickr.formatDate = createDateFormatter({});
flatpickr.compareDates = compareDates;
if (typeof jQuery !== "undefined") {
    jQuery.fn.flatpickr = function (config) {
        return _flatpickr(this, config);
    };
}
Date.prototype.fp_incr = function (days) {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof days === "string" ? parseInt(days, 10) : days));
};
var flatpickr$1 = flatpickr;

exports.default = flatpickr$1;

Object.defineProperty(exports, '__esModule', { value: true });

})));


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var gallerySections = document.querySelectorAll('.gallery-wrapper');

  if (!gallerySections) {
    return false;
  }

  [].forEach.call(gallerySections, function (gallery) {
    var addImage = gallery.querySelector('.add-gallery-images');
    var Hidden = (0, _serializedInput2.default)(gallery, '.image-gallery-hidden');

    var remove = (0, _utilities.removeItems)(Hidden, _utilities.onRemoveImage);
    var drag = (0, _utilities.dragItems)(Hidden, _utilities.onDragImage);
    var List = (0, _list2.default)(gallery, {
      list: '.gallery-images',
      onDrag: drag,
      onRemove: remove,
      listTemplate: imageItem
    });

    var mediaFrame = wp.media({
      title: 'Choose Media',
      button: {
        text: 'Use Selected Media'
      },
      multiple: true
    });

    addImage.addEventListener('click', function (event) {
      event.preventDefault();
      mediaFrame.open();
    });

    mediaFrame.on('select', function () {
      var attachments = mediaFrame.state().get('selection').toJSON();

      attachments.forEach(function (attachment) {
        List.add(attachment);
        Hidden.add(attachment.id);
      });
    });
  });
};

var _list = __webpack_require__(1);

var _list2 = _interopRequireDefault(_list);

var _serializedInput = __webpack_require__(2);

var _serializedInput2 = _interopRequireDefault(_serializedInput);

var _utilities = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var imageItem = function imageItem(image) {
  return '<li class="gallery-image-item"><span class="gallery-iamge-id">' + image.id + '</span><img src="' + image.url + '" class="gallery-image"/><span><svg class="remove-gallery-image" viewBox="0 0 20 20">\n  <path d="M10 2c4.42 0 8 3.58 8 8s-3.58 8-8 8-8-3.58-8-8 3.58-8 8-8zM15 13l-3-3 3-3-2-2-3 3-3-3-2 2 3 3-3 3 2 2 3-3 3 3z"></path>\n</svg></span></li>';
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var tableLists = document.querySelectorAll('.table-list');

  if (!tableLists) {
    return false;
  }

  [].forEach.call(tableLists, function (tableList) {
    var addRow = tableList.querySelector('.table-list-add');
    var Hidden = (0, _serializedInput2.default)(tableList, '.table-list-hidden');
    var remove = (0, _utilities.removeItems)(Hidden, _utilities.onRemoveTable);
    var drag = (0, _utilities.dragItems)(Hidden, _utilities.onDragTable);
    var List = (0, _list2.default)(tableList, {
      list: '.table-list-list',
      onDrag: drag,
      onRemove: remove,
      listTemplate: tableItem
    });

    var key = tableList.querySelector('.table-list-key');
    var value = tableList.querySelector('.table-list-value');

    addRow.addEventListener('click', function (event) {
      event.preventDefault();

      var rowData = {
        key: key.value,
        value: value.value
      };

      List.add(rowData);
      Hidden.add(rowData);

      key.value = '';
      value.value = '';
    });
  });
};

var _list = __webpack_require__(1);

var _list2 = _interopRequireDefault(_list);

var _serializedInput = __webpack_require__(2);

var _serializedInput2 = _interopRequireDefault(_serializedInput);

var _utilities = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tableItem = function tableItem(rowData) {
  return '<li class="text-list-item table-list-item">\n    <span class="table-list-key">' + rowData.key + '</span>\n    <span class="table-list-value">' + rowData.value + '</span>\n    <svg viewBox="0 0 20 20">\n        <path d="M10 2c4.42 0 8 3.58 8 8s-3.58 8-8 8-8-3.58-8-8 3.58-8 8-8zM15 13l-3-3 3-3-2-2-3 3-3-3-2 2 3 3-3 3 2 2 3-3 3 3z"></path>\n    </svg>\n</li>';
};

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjUzZTIyMDQ3ZTBlMTE1YmJjNjAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9saXN0LmpzIiwid2VicGFjazovLy8uL3NlcmlhbGl6ZWQtaW5wdXQuanMiLCJ3ZWJwYWNrOi8vLy4vdXRpbGl0aWVzLmpzIiwid2VicGFjazovLy8uL2F1dG9zdWdnZXN0LmpzIiwid2VicGFjazovLy8uL2luZGV4LmpzIiwid2VicGFjazovLy8uLi9jc3MvaW5kZXguY3NzIiwid2VicGFjazovLy8uL3RleHQtbGlzdC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2JvYmJ5L1NpdGVzL2FyY2hzeXN0ZW1zL2h0ZG9jcy93cC1jb250ZW50L3RoZW1lcy9hcmNoc3lzdGVtcy92ZW5kb3Ivb21nLWZpZWxkcy9ub2RlX21vZHVsZXMvZHJhZ3VsYS9kcmFndWxhLmpzIiwid2VicGFjazovLy8vVXNlcnMvYm9iYnkvU2l0ZXMvYXJjaHN5c3RlbXMvaHRkb2NzL3dwLWNvbnRlbnQvdGhlbWVzL2FyY2hzeXN0ZW1zL3ZlbmRvci9vbWctZmllbGRzL25vZGVfbW9kdWxlcy9jb250cmEvZW1pdHRlci5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2JvYmJ5L1NpdGVzL2FyY2hzeXN0ZW1zL2h0ZG9jcy93cC1jb250ZW50L3RoZW1lcy9hcmNoc3lzdGVtcy92ZW5kb3Ivb21nLWZpZWxkcy9ub2RlX21vZHVsZXMvYXRvYS9hdG9hLmpzIiwid2VicGFjazovLy8vVXNlcnMvYm9iYnkvU2l0ZXMvYXJjaHN5c3RlbXMvaHRkb2NzL3dwLWNvbnRlbnQvdGhlbWVzL2FyY2hzeXN0ZW1zL3ZlbmRvci9vbWctZmllbGRzL25vZGVfbW9kdWxlcy9jb250cmEvZGVib3VuY2UuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9ib2JieS9TaXRlcy9hcmNoc3lzdGVtcy9odGRvY3Mvd3AtY29udGVudC90aGVtZXMvYXJjaHN5c3RlbXMvdmVuZG9yL29tZy1maWVsZHMvbm9kZV9tb2R1bGVzL3RpY2t5L3RpY2t5LWJyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9ib2JieS9TaXRlcy9hcmNoc3lzdGVtcy9odGRvY3Mvd3AtY29udGVudC90aGVtZXMvYXJjaHN5c3RlbXMvdmVuZG9yL29tZy1maWVsZHMvbm9kZV9tb2R1bGVzL3RpbWVycy1icm93c2VyaWZ5L21haW4uanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9ib2JieS9TaXRlcy9hcmNoc3lzdGVtcy9odGRvY3Mvd3AtY29udGVudC90aGVtZXMvYXJjaHN5c3RlbXMvdmVuZG9yL29tZy1maWVsZHMvbm9kZV9tb2R1bGVzL3NldGltbWVkaWF0ZS9zZXRJbW1lZGlhdGUuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9ib2JieS9TaXRlcy9hcmNoc3lzdGVtcy9odGRvY3Mvd3AtY29udGVudC90aGVtZXMvYXJjaHN5c3RlbXMvdmVuZG9yL29tZy1maWVsZHMvbm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2JvYmJ5L1NpdGVzL2FyY2hzeXN0ZW1zL2h0ZG9jcy93cC1jb250ZW50L3RoZW1lcy9hcmNoc3lzdGVtcy92ZW5kb3Ivb21nLWZpZWxkcy9ub2RlX21vZHVsZXMvY3Jvc3N2ZW50L3NyYy9jcm9zc3ZlbnQuanMiLCJ3ZWJwYWNrOi8vLy9Vc2Vycy9ib2JieS9TaXRlcy9hcmNoc3lzdGVtcy9odGRvY3Mvd3AtY29udGVudC90aGVtZXMvYXJjaHN5c3RlbXMvdmVuZG9yL29tZy1maWVsZHMvbm9kZV9tb2R1bGVzL2N1c3RvbS1ldmVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2JvYmJ5L1NpdGVzL2FyY2hzeXN0ZW1zL2h0ZG9jcy93cC1jb250ZW50L3RoZW1lcy9hcmNoc3lzdGVtcy92ZW5kb3Ivb21nLWZpZWxkcy9ub2RlX21vZHVsZXMvY3Jvc3N2ZW50L3NyYy9ldmVudG1hcC5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2JvYmJ5L1NpdGVzL2FyY2hzeXN0ZW1zL2h0ZG9jcy93cC1jb250ZW50L3RoZW1lcy9hcmNoc3lzdGVtcy92ZW5kb3Ivb21nLWZpZWxkcy9ub2RlX21vZHVsZXMvZHJhZ3VsYS9jbGFzc2VzLmpzIiwid2VicGFjazovLy8uL2F1dG9zdWdnZXN0LWxpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vYXV0by1pdGVtLmpzIiwid2VicGFjazovLy8uL2ltYWdlLXVwbG9hZHMuanMiLCJ3ZWJwYWNrOi8vLy4vZGF0ZXBpY2tlci5qcyIsIndlYnBhY2s6Ly8vL1VzZXJzL2JvYmJ5L1NpdGVzL2FyY2hzeXN0ZW1zL2h0ZG9jcy93cC1jb250ZW50L3RoZW1lcy9hcmNoc3lzdGVtcy92ZW5kb3Ivb21nLWZpZWxkcy9ub2RlX21vZHVsZXMvZmxhdHBpY2tyL2Rpc3QvZmxhdHBpY2tyLmpzIiwid2VicGFjazovLy8uL2dhbGxlcnkuanMiLCJ3ZWJwYWNrOi8vLy4vdGFibGUtbGlzdC5qcyJdLCJuYW1lcyI6WyJwYXJlbnQiLCJhcmdzIiwibGlzdCIsInF1ZXJ5U2VsZWN0b3IiLCJyZWdpc3RlckRyYWdFdmVudHMiLCJvbkRyYWciLCJyZWdpc3RlclJlbW92ZUV2ZW50cyIsIm9uUmVtb3ZlIiwiYWRkIiwidmFsdWUiLCJodG1sIiwibGlzdFRlbXBsYXRlIiwibGlzdEl0ZW0iLCJkb2N1bWVudCIsImNyZWF0ZVJhbmdlIiwiY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50IiwiYXBwZW5kQ2hpbGQiLCJsaXN0SXRlbXMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJ0YXJnZXQiLCJ0YWdOYW1lIiwiY2xvc2VzdCIsImlubmVySFRNTCIsInJlbW92ZUNoaWxkIiwiY2FsbGJhY2siLCJkcmFrZSIsIm9uIiwiZWwiLCJoaWRkZW5JbnB1dCIsImhpZGRlbkVsIiwiZ2V0Q3VycmVudFZhbHVlIiwiSlNPTiIsInBhcnNlIiwiYWRkVmFsdWUiLCJjdXJyZW50VmFsdWUiLCJjb25jYXQiLCJyZW1vdmVWYWx1ZSIsInN0cmluZ2lmeSIsInJlbW92ZSIsInVwZGF0ZSIsInZhbHVlcyIsInJlbW92ZUl0ZW1zIiwiSGlkZGVuIiwiZHJhZ0l0ZW1zIiwib25EcmFnT2JqZWN0IiwicmVkdWNlIiwiY2FsbCIsImFjYyIsImlkIiwiZGF0YXNldCIsInRpdGxlIiwib25EcmFnVGV4dCIsIm9uRHJhZ0ltYWdlIiwicGFyc2VJbnQiLCJvblJlbW92ZU9iamVjdCIsIm5ld1ZhbHVlIiwiZmlsdGVyIiwiY3VycmVudCIsIm9uUmVtb3ZlVGV4dCIsIm9uUmVtb3ZlSW1hZ2UiLCJvbkRyYWdUYWJsZSIsImtleSIsIm9uUmVtb3ZlVGFibGUiLCJhdXRvc3VnZ2VzdCIsImVuZHBvaW50Iiwib25TZWxlY3QiLCJvbkVtcHR5IiwieGhyIiwibGVuZ3RoIiwiY2xhc3NMaXN0IiwiZ2V0T3B0aW9ucyIsInVwZGF0ZU9wdGlvbnMiLCJvbkF1dG9TdWdnZXN0SW5wdXQiLCJpbnB1dCIsImlucHV0VmFsdWUiLCJsaXN0TmFtZSIsImdldEF0dHJpYnV0ZSIsImxpc3RPcHRpb25zIiwiZ2V0RWxlbWVudEJ5SWQiLCJjaGlsZE5vZGVzIiwibWF0Y2giLCJvcHRpb24iLCJxdWVyeSIsImJ1aWxkUXVlcnkiLCJ1cmwiLCJhYm9ydCIsIlhNTEh0dHBSZXF1ZXN0IiwiZXZ0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSIsImlzSlNPTiIsInJlc3BvbnNlVGV4dCIsInJlc3VsdHMiLCJtZXNzYWdlIiwib3BlbiIsInNlbmQiLCJlcnJvciIsInJlc3BvbnNlIiwiY29uc29sZSIsIndhcm4iLCJBcnJheSIsImlzQXJyYXkiLCJjcmVhdGVPcHRpb25zIiwiZGF0YWxpc3QiLCJuZXdPcHRpb25zIiwicmVzdWx0IiwiY3JlYXRlT3B0aW9uIiwicmVuZGVyZWQiLCJuYW1lIiwic3RyIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwidG9Mb3dlckNhc2UiLCJjcmVhdGVUZXh0SXRlbSIsImNyZWF0ZUF1dG9TdWdnZXN0SXRlbSIsImJ1dHRvbiIsImhpZGRlbiIsImxpc3RGaWVsZHMiLCJmb3JFYWNoIiwibGlzdEZpZWxkIiwidGV4dElucHV0IiwiYWRkQnV0dG9uIiwiZHJhZyIsIkxpc3QiLCJPYmplY3QiLCJhc3NpZ24iLCJrZXlDb2RlIiwicHJldmVudERlZmF1bHQiLCJmaWVsZHMiLCJhdXRvTGlzdCIsImVsTmFtZSIsIk9NR0ZpZWxkcyIsImJhc2VVUkwiLCJ3aW5kb3ciLCJyZXNvdXJjZSIsImF1dG9JdGVtIiwibmFtZXNwYWNlIiwiaW1hZ2VVcGxvYWRzIiwiZmVhdHVyZWRJbWFnZVdyYXAiLCJtYXAiLCJpdGVtIiwicmVtb3ZlSW1hZ2UiLCJyZXBsYWNlSW1hZ2UiLCJzZXRJbWFnZSIsImZlYXR1cmVkSW1hZ2VUYWciLCJmZWF0dXJlZEltYWdlSUQiLCJmZWF0dXJlZEltYWdlVGl0bGUiLCJtZWRpYUZyYW1lIiwid3AiLCJtZWRpYSIsInRleHQiLCJtdWx0aXBsZSIsImF0dGFjaG1lbnQiLCJzdGF0ZSIsImdldCIsImZpcnN0IiwidG9KU09OIiwidG9nZ2xlIiwiaGFzT3duUHJvcGVydHkiLCJzZXRBdHRyaWJ1dGUiLCJzaXplcyIsInRodW1ibmFpbCIsImljb24iLCJmaWxlbmFtZSIsImV2ZW50IiwiZGF0ZXBpY2tlcnMiLCJjdXJyZW50RGF0ZSIsImRhdGVGaWVsZCIsImRhdGUiLCJhbHRJbnB1dCIsImFsdEZvcm1hdCIsImRhdGVGb3JtYXQiLCJkZWZhdWx0RGF0ZSIsImdhbGxlcnlTZWN0aW9ucyIsImFkZEltYWdlIiwiZ2FsbGVyeSIsImltYWdlSXRlbSIsImF0dGFjaG1lbnRzIiwiaW1hZ2UiLCJ0YWJsZUxpc3RzIiwiYWRkUm93IiwidGFibGVMaXN0IiwidGFibGVJdGVtIiwicm93RGF0YSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFH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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFD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QUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwQ0FBMEMsc0JBQXNCLEVBQUU7QUFDbEU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBOztBQUVBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7O0FDekxEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFVBQVU7Ozs7Ozs7OzhDQ3ZMdEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsNEJBQTRCO0FBQzFDO0FBQ0E7QUFDQSwyQkFBMkIsMEJBQTBCO0FBQ3JEO0FBQ0E7QUFDQSwwQ0FBMEMsNkJBQTZCO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxpQkFBaUI7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsa0NBQWtDLEVBQUU7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EsOEJBQThCLGtDQUFrQyxFQUFFO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGtCQUFrQjtBQUNyRCx1Q0FBdUMsdUJBQXVCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QywyQkFBMkI7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxLQUFLO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkIsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsaUJBQWlCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGtCQUFrQjtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLGtCQUFrQjtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQStELFFBQVE7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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b3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA1KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmNTNlMjIwNDdlMGUxMTViYmM2MCIsInZhciBnO1xyXG5cclxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcclxuZyA9IChmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gdGhpcztcclxufSkoKTtcclxuXHJcbnRyeSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXHJcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLGV2YWwpKFwidGhpc1wiKTtcclxufSBjYXRjaChlKSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcclxuXHRpZih0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKVxyXG5cdFx0ZyA9IHdpbmRvdztcclxufVxyXG5cclxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxyXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xyXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGc7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgZHJhZ3VsYSBmcm9tICdkcmFndWxhJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oIHBhcmVudCwgYXJncyApIHtcbiAgICBjb25zdCBsaXN0ID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3IoYXJncy5saXN0KTtcblxuICAgIHJlZ2lzdGVyRHJhZ0V2ZW50cyhsaXN0LCBhcmdzLm9uRHJhZyk7XG4gICAgcmVnaXN0ZXJSZW1vdmVFdmVudHMobGlzdCwgYXJncy5vblJlbW92ZSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhZGQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBjb25zdCBodG1sID0gYXJncy5saXN0VGVtcGxhdGUoIHZhbHVlICk7XG4gICAgICAgICAgICBjb25zdCBsaXN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCkuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KGh0bWwpO1xuXG4gICAgICAgICAgICBsaXN0LmFwcGVuZENoaWxkKCBsaXN0SXRlbSApO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5jb25zdCByZWdpc3RlclJlbW92ZUV2ZW50cyA9IChsaXN0LCBvblJlbW92ZSkgPT4ge1xuICAgIGNvbnN0IGxpc3RJdGVtcyA9IGxpc3QucXVlcnlTZWxlY3RvckFsbCgnbGknKTtcblxuICAgIGxpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSAoJ3N2ZycgPT09IGUudGFyZ2V0LnRhZ05hbWUpID8gZS50YXJnZXQgOiBlLnRhcmdldC5jbG9zZXN0KCdzdmcnKTtcblxuICAgICAgICBpZiAoICdzdmcnID09PSB0YXJnZXQudGFnTmFtZSApIHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RJdGVtID0gZS50YXJnZXQuY2xvc2VzdCgnbGknKTtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gbGlzdEl0ZW0ucXVlcnlTZWxlY3Rvcignc3BhbicpLmlubmVySFRNTDtcbiAgICAgICAgICAgIGxpc3QucmVtb3ZlQ2hpbGQoIGxpc3RJdGVtICk7XG4gICAgICAgICAgICBvblJlbW92ZSggdmFsdWUgKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGxpc3RJdGVtcztcbn1cblxuY29uc3QgcmVnaXN0ZXJEcmFnRXZlbnRzID0gKGxpc3QsIGNhbGxiYWNrKSA9PiB7XG4gICAgY29uc3QgZHJha2UgPSBkcmFndWxhKFtsaXN0XSk7XG5cbiAgICBkcmFrZS5vbignZHJhZ2VuZCcsIChlbCkgPT4ge1xuICAgICAgICBjb25zdCBsaXN0SXRlbXMgPSBsaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJyk7XG4gICAgICAgIGNhbGxiYWNrKGxpc3QsIGxpc3RJdGVtcyk7XG4gICAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saXN0LmpzIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ocGFyZW50LCBoaWRkZW5JbnB1dCkge1xuICBjb25zdCBoaWRkZW5FbCA9IHBhcmVudC5xdWVyeVNlbGVjdG9yKGhpZGRlbklucHV0KTtcblxuICBjb25zdCBnZXRDdXJyZW50VmFsdWUgPSAoKSA9PlxuICAgIGhpZGRlbkVsLnZhbHVlID8gSlNPTi5wYXJzZShoaWRkZW5FbC52YWx1ZSkgOiBbXTtcblxuICBjb25zdCBhZGRWYWx1ZSA9IHZhbHVlID0+IHtcbiAgICBjb25zdCBjdXJyZW50VmFsdWUgPSBnZXRDdXJyZW50VmFsdWUoKTtcbiAgICByZXR1cm4gY3VycmVudFZhbHVlLmNvbmNhdCh2YWx1ZSk7XG4gIH07XG5cbiAgY29uc3QgcmVtb3ZlVmFsdWUgPSAodmFsdWUsIG9uUmVtb3ZlKSA9PiB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gZ2V0Q3VycmVudFZhbHVlKCk7XG4gICAgcmV0dXJuIG9uUmVtb3ZlKGN1cnJlbnRWYWx1ZSwgdmFsdWUpO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgYWRkOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgaGlkZGVuRWwudmFsdWUgPSBKU09OLnN0cmluZ2lmeShhZGRWYWx1ZSh2YWx1ZSkpO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbih2YWx1ZSwgb25SZW1vdmUpIHtcbiAgICAgIGhpZGRlbkVsLnZhbHVlID0gSlNPTi5zdHJpbmdpZnkocmVtb3ZlVmFsdWUodmFsdWUsIG9uUmVtb3ZlKSk7XG4gICAgfSxcbiAgICB1cGRhdGU6IGZ1bmN0aW9uKHZhbHVlcykge1xuICAgICAgaGlkZGVuRWwudmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZXMpO1xuICAgIH0sXG4gIH07XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zZXJpYWxpemVkLWlucHV0LmpzIiwiZXhwb3J0IGNvbnN0IHJlbW92ZUl0ZW1zID0gKEhpZGRlbiwgb25SZW1vdmUpID0+IHtcbiAgcmV0dXJuIHZhbHVlID0+IHtcbiAgICBIaWRkZW4ucmVtb3ZlKHZhbHVlLCBvblJlbW92ZSk7XG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgZHJhZ0l0ZW1zID0gKEhpZGRlbiwgb25EcmFnKSA9PiB7XG4gIHJldHVybiAobGlzdCwgbGlzdEl0ZW1zKSA9PiB7XG4gICAgY29uc3QgdmFsdWVzID0gb25EcmFnKGxpc3QsIGxpc3RJdGVtcyk7XG4gICAgSGlkZGVuLnVwZGF0ZSh2YWx1ZXMpO1xuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IG9uRHJhZ09iamVjdCA9IChsaXN0LCBsaXN0SXRlbXMpID0+IHtcbiAgcmV0dXJuIFtdLnJlZHVjZS5jYWxsKFxuICAgIGxpc3RJdGVtcyxcbiAgICAoYWNjLCBsaXN0SXRlbSkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSB7XG4gICAgICAgIGlkOiBsaXN0SXRlbS5kYXRhc2V0LmlkLFxuICAgICAgICB0aXRsZTogbGlzdEl0ZW0ucXVlcnlTZWxlY3Rvcignc3BhbicpLmlubmVySFRNTCxcbiAgICAgIH07XG4gICAgICByZXR1cm4gYWNjLmNvbmNhdChbdmFsdWVdKTtcbiAgICB9LFxuICAgIFtdLFxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IG9uRHJhZ1RleHQgPSAobGlzdCwgbGlzdEl0ZW1zKSA9PiB7XG4gIHJldHVybiBbXS5yZWR1Y2UuY2FsbChcbiAgICBsaXN0SXRlbXMsXG4gICAgKGFjYywgbGlzdEl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gbGlzdEl0ZW0ucXVlcnlTZWxlY3Rvcignc3BhbicpLmlubmVySFRNTDtcbiAgICAgIHJldHVybiBhY2MuY29uY2F0KFt2YWx1ZV0pO1xuICAgIH0sXG4gICAgW10sXG4gICk7XG59O1xuXG5leHBvcnQgY29uc3Qgb25EcmFnSW1hZ2UgPSAobGlzdCwgbGlzdEl0ZW1zKSA9PiB7XG4gIHJldHVybiBbXS5yZWR1Y2UuY2FsbChcbiAgICBsaXN0SXRlbXMsXG4gICAgKGFjYywgbGlzdEl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcGFyc2VJbnQobGlzdEl0ZW0ucXVlcnlTZWxlY3Rvcignc3BhbicpLmlubmVySFRNTCk7XG4gICAgICByZXR1cm4gYWNjLmNvbmNhdChbdmFsdWVdKTtcbiAgICB9LFxuICAgIFtdLFxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IG9uUmVtb3ZlT2JqZWN0ID0gKGN1cnJlbnRWYWx1ZSwgbmV3VmFsdWUpID0+IHtcbiAgcmV0dXJuIGN1cnJlbnRWYWx1ZS5maWx0ZXIoY3VycmVudCA9PiBjdXJyZW50LnRpdGxlICE9PSBuZXdWYWx1ZSk7XG59O1xuXG5leHBvcnQgY29uc3Qgb25SZW1vdmVUZXh0ID0gKGN1cnJlbnRWYWx1ZSwgbmV3VmFsdWUpID0+IHtcbiAgcmV0dXJuIGN1cnJlbnRWYWx1ZS5maWx0ZXIoY3VycmVudCA9PiBjdXJyZW50ICE9PSBuZXdWYWx1ZSk7XG59O1xuXG5leHBvcnQgY29uc3Qgb25SZW1vdmVJbWFnZSA9IChjdXJyZW50VmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gIHJldHVybiBjdXJyZW50VmFsdWUuZmlsdGVyKGN1cnJlbnQgPT4gY3VycmVudCAhPT0gcGFyc2VJbnQobmV3VmFsdWUpKTtcbn07XG5cbmV4cG9ydCBjb25zdCBvbkRyYWdUYWJsZSA9IChsaXN0LCBsaXN0SXRlbXMpID0+IHtcbiAgcmV0dXJuIFtdLnJlZHVjZS5jYWxsKFxuICAgIGxpc3RJdGVtcyxcbiAgICAoYWNjLCBsaXN0SXRlbSkgPT4ge1xuICAgICAgY29uc3Qga2V5ID0gbGlzdEl0ZW0ucXVlcnlTZWxlY3RvcignLnRhYmxlLWxpc3Qta2V5JykuaW5uZXJIVE1MO1xuICAgICAgY29uc3QgdmFsdWUgPSBsaXN0SXRlbS5xdWVyeVNlbGVjdG9yKCcudGFibGUtbGlzdC12YWx1ZScpLmlubmVySFRNTDtcbiAgICAgIHJldHVybiBhY2MuY29uY2F0KFt7IGtleToga2V5LCB2YWx1ZTogdmFsdWUgfV0pO1xuICAgIH0sXG4gICAgW10sXG4gICk7XG59O1xuXG5leHBvcnQgY29uc3Qgb25SZW1vdmVUYWJsZSA9IChjdXJyZW50VmFsdWUsIG5ld1ZhbHVlKSA9PiB7XG4gIHJldHVybiBjdXJyZW50VmFsdWUuZmlsdGVyKGN1cnJlbnQgPT4gY3VycmVudC5rZXkgIT09IG5ld1ZhbHVlKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi91dGlsaXRpZXMuanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhdXRvc3VnZ2VzdCwgZW5kcG9pbnQsIG9uU2VsZWN0LCBvbkVtcHR5KSB7XG4gIGlmICghYXV0b3N1Z2dlc3QpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBsZXQgeGhyID0gZmFsc2U7XG5cbiAgYXV0b3N1Z2dlc3QuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBlID0+IHtcbiAgICBpZiAoMCA9PT0gZS50YXJnZXQudmFsdWUubGVuZ3RoICYmIG9uRW1wdHkpIHtcbiAgICAgIG9uRW1wdHkoKTtcbiAgICB9XG5cbiAgICBpZiAoMyA+IGUudGFyZ2V0LnZhbHVlLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGF1dG9zdWdnZXN0LmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICB4aHIgPSBnZXRPcHRpb25zKHhociwgdXBkYXRlT3B0aW9ucywgYXV0b3N1Z2dlc3QsIGVuZHBvaW50KTtcbiAgfSk7XG4gIGF1dG9zdWdnZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSBvbkF1dG9TdWdnZXN0SW5wdXQoZSk7XG5cbiAgICBpZiAodmFsdWUpIHtcbiAgICAgIG9uU2VsZWN0KHZhbHVlLCBhdXRvc3VnZ2VzdCk7XG4gICAgfVxuICB9KTtcbn1cblxuY29uc3Qgb25BdXRvU3VnZ2VzdElucHV0ID0gZSA9PiB7XG4gIGNvbnN0IGlucHV0ID0gZS50YXJnZXQ7XG4gIGNvbnN0IGlucHV0VmFsdWUgPSBpbnB1dC52YWx1ZTtcbiAgY29uc3QgbGlzdE5hbWUgPSBpbnB1dC5nZXRBdHRyaWJ1dGUoJ2xpc3QnKTtcbiAgY29uc3QgbGlzdE9wdGlvbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChsaXN0TmFtZSkuY2hpbGROb2RlcztcblxuICBjb25zdCBtYXRjaCA9IFtdLnJlZHVjZS5jYWxsKFxuICAgIGxpc3RPcHRpb25zLFxuICAgIChhY2MsIG9wdGlvbikgPT4ge1xuICAgICAgaWYgKG9wdGlvbi52YWx1ZSA9PT0gaW5wdXRWYWx1ZSkge1xuICAgICAgICByZXR1cm4gYWNjLmNvbmNhdCh7XG4gICAgICAgICAgaWQ6IG9wdGlvbi5kYXRhc2V0LmlkLFxuICAgICAgICAgIHRpdGxlOiBvcHRpb24udmFsdWUsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFjYztcbiAgICB9LFxuICAgIFtdLFxuICApO1xuXG4gIHJldHVybiAwID09PSBtYXRjaC5sZW5ndGggPyBmYWxzZSA6IG1hdGNoWzBdO1xufTtcblxuY29uc3QgZ2V0T3B0aW9ucyA9ICh4aHIsIGNhbGxiYWNrLCBpbnB1dCwgZW5kcG9pbnQpID0+IHtcbiAgY29uc3QgcXVlcnkgPSBidWlsZFF1ZXJ5KGlucHV0LnZhbHVlKTtcbiAgY29uc3QgdXJsID0gZW5kcG9pbnQgKyBxdWVyeTtcblxuICBpZiAoeGhyKSB7XG4gICAgeGhyLmFib3J0KCk7XG4gIH1cblxuICB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICB4aHIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAnbG9hZCcsXG4gICAgZXZ0ID0+IHtcbiAgICAgIGNhbGxiYWNrKGZhbHNlLCBldnQpO1xuICAgIH0sXG4gICAgZmFsc2UsXG4gICk7XG5cbiAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCAmJiBpc0pTT04oeGhyLnJlc3BvbnNlVGV4dCkpIHtcbiAgICAgIGNhbGxiYWNrKGZhbHNlLCB7IHJlc3VsdHM6IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCksIGlucHV0OiBpbnB1dCB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHhoci5yZXNwb25zZVRleHQgJiYgaXNKU09OKHhoci5yZXNwb25zZVRleHQpKSB7XG4gICAgICAgIGNhbGxiYWNrKFxuICAgICAgICAgIHsgbWVzc2FnZTogSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KSwgaW5wdXQ6IGlucHV0IH0sXG4gICAgICAgICAgZmFsc2UsXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHhoci5hZGRFdmVudExpc3RlbmVyKFxuICAgICdlcnJvcicsXG4gICAgZXZ0ID0+IHtcbiAgICAgIGNhbGxiYWNrKGV2dCwgZmFsc2UpO1xuICAgIH0sXG4gICAgZmFsc2UsXG4gICk7XG5cbiAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgJ2Fib3J0JyxcbiAgICBldnQgPT4ge1xuICAgICAgY2FsbGJhY2sodHJ1ZSwgZmFsc2UpO1xuICAgIH0sXG4gICAgZmFsc2UsXG4gICk7XG5cbiAgeGhyLm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XG5cbiAgeGhyLnNlbmQoKTtcblxuICByZXR1cm4geGhyO1xufTtcblxuY29uc3QgdXBkYXRlT3B0aW9ucyA9IChlcnJvciwgcmVzcG9uc2UpID0+IHtcbiAgaWYgKGVycm9yKSB7XG4gICAgaWYgKHRydWUgPT09IGVycm9yKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZXJyb3IuaW5wdXQuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xuICAgIGNvbnNvbGUud2FybihlcnJvcik7XG4gIH1cblxuICBpZiAocmVzcG9uc2UpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkocmVzcG9uc2UucmVzdWx0cykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjcmVhdGVPcHRpb25zKHJlc3BvbnNlLnJlc3VsdHMsIHJlc3BvbnNlLmlucHV0KTtcbiAgfVxufTtcblxuY29uc3QgY3JlYXRlT3B0aW9ucyA9IChyZXN1bHRzLCBpbnB1dCkgPT4ge1xuICBjb25zdCBsaXN0TmFtZSA9IGlucHV0LmdldEF0dHJpYnV0ZSgnbGlzdCcpO1xuICBjb25zdCBkYXRhbGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGxpc3ROYW1lKTtcblxuICBjb25zdCBuZXdPcHRpb25zID0gcmVzdWx0cy5yZWR1Y2UoKGFjYywgcmVzdWx0KSA9PiB7XG4gICAgY29uc3Qgb3B0aW9uID0gY3JlYXRlT3B0aW9uKHJlc3VsdCk7XG4gICAgcmV0dXJuIGFjYy5jb25jYXQob3B0aW9uKTtcbiAgfSwgJycpO1xuXG4gIGlucHV0LmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcbiAgZGF0YWxpc3QuaW5uZXJIVE1MID0gbmV3T3B0aW9ucztcbn07XG5cbmNvbnN0IGNyZWF0ZU9wdGlvbiA9IHZhbHVlID0+IHtcbiAgaWYgKHZhbHVlLnRpdGxlKSB7XG4gICAgcmV0dXJuIGA8b3B0aW9uIGRhdGEtaWQ9JHt2YWx1ZS5pZH0gdmFsdWU9XCIke3ZhbHVlLnRpdGxlLnJlbmRlcmVkfVwiPmA7XG4gIH1cblxuICBpZiAodmFsdWUubmFtZSkge1xuICAgIHJldHVybiBgPG9wdGlvbiBkYXRhLWlkPSR7dmFsdWUuaWR9IHZhbHVlPVwiJHt2YWx1ZS5uYW1lfVwiPmA7XG4gIH1cbn07XG5cbmNvbnN0IGlzSlNPTiA9IHN0ciA9PiB7XG4gIGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB0cnkge1xuICAgIEpTT04ucGFyc2Uoc3RyKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuY29uc3QgYnVpbGRRdWVyeSA9IHZhbHVlID0+IHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZS50b0xvd2VyQ2FzZSgpKTtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hdXRvc3VnZ2VzdC5qcyIsImltcG9ydCBiYXNlQ3NzIGZyb20gJy4uL2Nzcy9pbmRleC5jc3MnO1xuaW1wb3J0IHRleHRMaXN0IGZyb20gJy4vdGV4dC1saXN0JztcbmltcG9ydCBhdXRvTGlzdCBmcm9tICcuL2F1dG9zdWdnZXN0LWxpc3QnO1xuaW1wb3J0IGxpc3QgZnJvbSAnLi9saXN0JztcbmltcG9ydCBhdXRvSXRlbSBmcm9tICcuL2F1dG8taXRlbSc7XG5pbXBvcnQgaW1hZ2VVcGxvYWRzIGZyb20gJy4vaW1hZ2UtdXBsb2Fkcyc7XG5pbXBvcnQgZGF0ZXBpY2tlciBmcm9tICcuL2RhdGVwaWNrZXInO1xuaW1wb3J0IGdhbGxlcnkgZnJvbSAnLi9nYWxsZXJ5JztcbmltcG9ydCB0YWJsZUxpc3QgZnJvbSAnLi90YWJsZS1saXN0JztcblxuY29uc3QgY3JlYXRlVGV4dEl0ZW0gPSB2YWx1ZSA9PiB7XG4gIHJldHVybiBgPGxpIGNsYXNzPVwidGV4dC1saXN0LWl0ZW1cIj5cbiAgICAgICAgPHNwYW4+JHt2YWx1ZX08L3NwYW4+XG4gICAgICAgIDxzdmcgdmlld0JveD1cIjAgMCAyMCAyMFwiPlxuICAgICAgICAgICAgPHBhdGggZD1cIk0xMCAyYzQuNDIgMCA4IDMuNTggOCA4cy0zLjU4IDgtOCA4LTgtMy41OC04LTggMy41OC04IDgtOHpNMTUgMTNsLTMtMyAzLTMtMi0yLTMgMy0zLTMtMiAyIDMgMy0zIDMgMiAyIDMtMyAzIDN6XCI+PC9wYXRoPlxuICAgICAgICA8L3N2Zz5cbiAgICA8L2xpPmA7XG59O1xuXG5jb25zdCBjcmVhdGVBdXRvU3VnZ2VzdEl0ZW0gPSB2YWx1ZSA9PiB7XG4gIHJldHVybiBgPGxpIGNsYXNzPVwidGV4dC1saXN0LWl0ZW1cIiBkYXRhLWlkPVwiJHt2YWx1ZS5pZH1cIj5cbiAgICAgICAgPHNwYW4+JHt2YWx1ZS50aXRsZX08L3NwYW4+XG4gICAgICAgIDxzdmcgdmlld0JveD1cIjAgMCAyMCAyMFwiPlxuICAgICAgICAgICAgPHBhdGggZD1cIk0xMCAyYzQuNDIgMCA4IDMuNTggOCA4cy0zLjU4IDgtOCA4LTgtMy41OC04LTggMy41OC04IDgtOHpNMTUgMTNsLTMtMyAzLTMtMi0yLTMgMy0zLTMtMiAyIDMgMy0zIDMgMiAyIDMtMyAzIDN6XCI+PC9wYXRoPlxuICAgICAgICA8L3N2Zz5cbiAgICA8L2xpPmA7XG59O1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24oKSB7XG4gIGltYWdlVXBsb2FkcygpO1xuICB0ZXh0TGlzdCh7XG4gICAgcGFyZW50OiAnLnRleHQtbGlzdCcsXG4gICAgYnV0dG9uOiAnLnRleHQtbGlzdC1hZGQnLFxuICAgIGxpc3Q6ICcudGV4dC1saXN0LWxpc3QnLFxuICAgIGhpZGRlbjogJy50ZXh0LWxpc3QtaGlkZGVuJyxcbiAgICBsaXN0VGVtcGxhdGU6IGNyZWF0ZVRleHRJdGVtLFxuICB9KTtcblxuICBhdXRvTGlzdCh7XG4gICAgcGFyZW50OiAnLmF1dG9zdWdnZXN0LWxpc3QnLFxuICAgIGlucHV0OiAnYXV0b3N1Z2dlc3QtbGlzdC1pbnB1dCcsXG4gICAgbGlzdDogJy5hdXRvc3VnZ2VzdC1saXN0LWxpc3QnLFxuICAgIGhpZGRlbjogJy5hdXRvc3VnZ2VzdC1saXN0LWhpZGRlbicsXG4gICAgbGlzdFRlbXBsYXRlOiBjcmVhdGVBdXRvU3VnZ2VzdEl0ZW0sXG4gIH0pO1xuXG4gIGF1dG9JdGVtKHtcbiAgICBwYXJlbnQ6ICcuYXV0b3N1Z2dlc3Qtd3JhcHBlcicsXG4gICAgaW5wdXQ6ICcuYXV0b3N1Z2dlc3QtaW5wdXQnLFxuICAgIGhpZGRlbjogJy5hdXRvc3VnZ2VzdC1oaWRkZW4nLFxuICB9KTtcblxuICBkYXRlcGlja2VyKCk7XG4gIGdhbGxlcnkoKTtcbiAgdGFibGVMaXN0KCk7XG59KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2luZGV4LmpzIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9jc3MvaW5kZXguY3NzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBsaXN0IGZyb20gJy4vbGlzdCc7XG5pbXBvcnQgaGlkZGVuIGZyb20gJy4vc2VyaWFsaXplZC1pbnB1dCc7XG5pbXBvcnQgeyByZW1vdmVJdGVtcywgZHJhZ0l0ZW1zLCBvbkRyYWdUZXh0LCBvblJlbW92ZVRleHQgfSBmcm9tICcuL3V0aWxpdGllcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCBhcmdzICkge1xuICAgIGNvbnN0IGxpc3RGaWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGFyZ3MucGFyZW50KTtcblxuICAgIGlmICggISBsaXN0RmllbGRzICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgW10uZm9yRWFjaC5jYWxsKCBsaXN0RmllbGRzLCAoIGxpc3RGaWVsZCApID0+IHtcbiAgICAgICAgY29uc3QgdGV4dElucHV0ID0gbGlzdEZpZWxkLnF1ZXJ5U2VsZWN0b3IoICdpbnB1dFt0eXBlPXRleHRdJyApO1xuICAgICAgICBjb25zdCBhZGRCdXR0b24gPSBsaXN0RmllbGQucXVlcnlTZWxlY3RvciggYXJncy5idXR0b24gKTtcbiAgICAgICAgY29uc3QgSGlkZGVuID0gaGlkZGVuKCBsaXN0RmllbGQsIGFyZ3MuaGlkZGVuICk7XG4gICAgICAgIGNvbnN0IHJlbW92ZSA9IHJlbW92ZUl0ZW1zKCBIaWRkZW4sIG9uUmVtb3ZlVGV4dCApO1xuICAgICAgICBjb25zdCBkcmFnID0gZHJhZ0l0ZW1zKCBIaWRkZW4sIG9uRHJhZ1RleHQgKTtcbiAgICAgICAgY29uc3QgTGlzdCA9IGxpc3QoIGxpc3RGaWVsZCwgT2JqZWN0LmFzc2lnbiggYXJncywgeyBvbkRyYWc6IGRyYWcsIG9uUmVtb3ZlOiByZW1vdmV9ICkgKTtcblxuICAgICAgICBsaXN0RmllbGQuYWRkRXZlbnRMaXN0ZW5lciggJ2tleXByZXNzJywgKGUpID0+IHtcbiAgICAgICAgICAgIGlmICggMTMgPT09IGUua2V5Q29kZSApIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgTGlzdC5hZGQoIHRleHRJbnB1dC52YWx1ZSApO1xuICAgICAgICAgICAgICAgIEhpZGRlbi5hZGQoIHRleHRJbnB1dC52YWx1ZSApO1xuICAgICAgICAgICAgICAgIHRleHRJbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9ICk7XG5cbiAgICAgICAgYWRkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoICdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBMaXN0LmFkZCggdGV4dElucHV0LnZhbHVlKTtcbiAgICAgICAgICAgIEhpZGRlbi5hZGQoIHRleHRJbnB1dC52YWx1ZSApO1xuICAgICAgICAgICAgdGV4dElucHV0LnZhbHVlID0gJyc7XG4gICAgICAgIH0gKTtcblxuICAgIH0gKTtcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3RleHQtbGlzdC5qcyIsIid1c2Ugc3RyaWN0JztcblxudmFyIGVtaXR0ZXIgPSByZXF1aXJlKCdjb250cmEvZW1pdHRlcicpO1xudmFyIGNyb3NzdmVudCA9IHJlcXVpcmUoJ2Nyb3NzdmVudCcpO1xudmFyIGNsYXNzZXMgPSByZXF1aXJlKCcuL2NsYXNzZXMnKTtcbnZhciBkb2MgPSBkb2N1bWVudDtcbnZhciBkb2N1bWVudEVsZW1lbnQgPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuXG5mdW5jdGlvbiBkcmFndWxhIChpbml0aWFsQ29udGFpbmVycywgb3B0aW9ucykge1xuICB2YXIgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgaWYgKGxlbiA9PT0gMSAmJiBBcnJheS5pc0FycmF5KGluaXRpYWxDb250YWluZXJzKSA9PT0gZmFsc2UpIHtcbiAgICBvcHRpb25zID0gaW5pdGlhbENvbnRhaW5lcnM7XG4gICAgaW5pdGlhbENvbnRhaW5lcnMgPSBbXTtcbiAgfVxuICB2YXIgX21pcnJvcjsgLy8gbWlycm9yIGltYWdlXG4gIHZhciBfc291cmNlOyAvLyBzb3VyY2UgY29udGFpbmVyXG4gIHZhciBfaXRlbTsgLy8gaXRlbSBiZWluZyBkcmFnZ2VkXG4gIHZhciBfb2Zmc2V0WDsgLy8gcmVmZXJlbmNlIHhcbiAgdmFyIF9vZmZzZXRZOyAvLyByZWZlcmVuY2UgeVxuICB2YXIgX21vdmVYOyAvLyByZWZlcmVuY2UgbW92ZSB4XG4gIHZhciBfbW92ZVk7IC8vIHJlZmVyZW5jZSBtb3ZlIHlcbiAgdmFyIF9pbml0aWFsU2libGluZzsgLy8gcmVmZXJlbmNlIHNpYmxpbmcgd2hlbiBncmFiYmVkXG4gIHZhciBfY3VycmVudFNpYmxpbmc7IC8vIHJlZmVyZW5jZSBzaWJsaW5nIG5vd1xuICB2YXIgX2NvcHk7IC8vIGl0ZW0gdXNlZCBmb3IgY29weWluZ1xuICB2YXIgX3JlbmRlclRpbWVyOyAvLyB0aW1lciBmb3Igc2V0VGltZW91dCByZW5kZXJNaXJyb3JJbWFnZVxuICB2YXIgX2xhc3REcm9wVGFyZ2V0ID0gbnVsbDsgLy8gbGFzdCBjb250YWluZXIgaXRlbSB3YXMgb3ZlclxuICB2YXIgX2dyYWJiZWQ7IC8vIGhvbGRzIG1vdXNlZG93biBjb250ZXh0IHVudGlsIGZpcnN0IG1vdXNlbW92ZVxuXG4gIHZhciBvID0gb3B0aW9ucyB8fCB7fTtcbiAgaWYgKG8ubW92ZXMgPT09IHZvaWQgMCkgeyBvLm1vdmVzID0gYWx3YXlzOyB9XG4gIGlmIChvLmFjY2VwdHMgPT09IHZvaWQgMCkgeyBvLmFjY2VwdHMgPSBhbHdheXM7IH1cbiAgaWYgKG8uaW52YWxpZCA9PT0gdm9pZCAwKSB7IG8uaW52YWxpZCA9IGludmFsaWRUYXJnZXQ7IH1cbiAgaWYgKG8uY29udGFpbmVycyA9PT0gdm9pZCAwKSB7IG8uY29udGFpbmVycyA9IGluaXRpYWxDb250YWluZXJzIHx8IFtdOyB9XG4gIGlmIChvLmlzQ29udGFpbmVyID09PSB2b2lkIDApIHsgby5pc0NvbnRhaW5lciA9IG5ldmVyOyB9XG4gIGlmIChvLmNvcHkgPT09IHZvaWQgMCkgeyBvLmNvcHkgPSBmYWxzZTsgfVxuICBpZiAoby5jb3B5U29ydFNvdXJjZSA9PT0gdm9pZCAwKSB7IG8uY29weVNvcnRTb3VyY2UgPSBmYWxzZTsgfVxuICBpZiAoby5yZXZlcnRPblNwaWxsID09PSB2b2lkIDApIHsgby5yZXZlcnRPblNwaWxsID0gZmFsc2U7IH1cbiAgaWYgKG8ucmVtb3ZlT25TcGlsbCA9PT0gdm9pZCAwKSB7IG8ucmVtb3ZlT25TcGlsbCA9IGZhbHNlOyB9XG4gIGlmIChvLmRpcmVjdGlvbiA9PT0gdm9pZCAwKSB7IG8uZGlyZWN0aW9uID0gJ3ZlcnRpY2FsJzsgfVxuICBpZiAoby5pZ25vcmVJbnB1dFRleHRTZWxlY3Rpb24gPT09IHZvaWQgMCkgeyBvLmlnbm9yZUlucHV0VGV4dFNlbGVjdGlvbiA9IHRydWU7IH1cbiAgaWYgKG8ubWlycm9yQ29udGFpbmVyID09PSB2b2lkIDApIHsgby5taXJyb3JDb250YWluZXIgPSBkb2MuYm9keTsgfVxuXG4gIHZhciBkcmFrZSA9IGVtaXR0ZXIoe1xuICAgIGNvbnRhaW5lcnM6IG8uY29udGFpbmVycyxcbiAgICBzdGFydDogbWFudWFsU3RhcnQsXG4gICAgZW5kOiBlbmQsXG4gICAgY2FuY2VsOiBjYW5jZWwsXG4gICAgcmVtb3ZlOiByZW1vdmUsXG4gICAgZGVzdHJveTogZGVzdHJveSxcbiAgICBjYW5Nb3ZlOiBjYW5Nb3ZlLFxuICAgIGRyYWdnaW5nOiBmYWxzZVxuICB9KTtcblxuICBpZiAoby5yZW1vdmVPblNwaWxsID09PSB0cnVlKSB7XG4gICAgZHJha2Uub24oJ292ZXInLCBzcGlsbE92ZXIpLm9uKCdvdXQnLCBzcGlsbE91dCk7XG4gIH1cblxuICBldmVudHMoKTtcblxuICByZXR1cm4gZHJha2U7XG5cbiAgZnVuY3Rpb24gaXNDb250YWluZXIgKGVsKSB7XG4gICAgcmV0dXJuIGRyYWtlLmNvbnRhaW5lcnMuaW5kZXhPZihlbCkgIT09IC0xIHx8IG8uaXNDb250YWluZXIoZWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gZXZlbnRzIChyZW1vdmUpIHtcbiAgICB2YXIgb3AgPSByZW1vdmUgPyAncmVtb3ZlJyA6ICdhZGQnO1xuICAgIHRvdWNoeShkb2N1bWVudEVsZW1lbnQsIG9wLCAnbW91c2Vkb3duJywgZ3JhYik7XG4gICAgdG91Y2h5KGRvY3VtZW50RWxlbWVudCwgb3AsICdtb3VzZXVwJywgcmVsZWFzZSk7XG4gIH1cblxuICBmdW5jdGlvbiBldmVudHVhbE1vdmVtZW50cyAocmVtb3ZlKSB7XG4gICAgdmFyIG9wID0gcmVtb3ZlID8gJ3JlbW92ZScgOiAnYWRkJztcbiAgICB0b3VjaHkoZG9jdW1lbnRFbGVtZW50LCBvcCwgJ21vdXNlbW92ZScsIHN0YXJ0QmVjYXVzZU1vdXNlTW92ZWQpO1xuICB9XG5cbiAgZnVuY3Rpb24gbW92ZW1lbnRzIChyZW1vdmUpIHtcbiAgICB2YXIgb3AgPSByZW1vdmUgPyAncmVtb3ZlJyA6ICdhZGQnO1xuICAgIGNyb3NzdmVudFtvcF0oZG9jdW1lbnRFbGVtZW50LCAnc2VsZWN0c3RhcnQnLCBwcmV2ZW50R3JhYmJlZCk7IC8vIElFOFxuICAgIGNyb3NzdmVudFtvcF0oZG9jdW1lbnRFbGVtZW50LCAnY2xpY2snLCBwcmV2ZW50R3JhYmJlZCk7XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95ICgpIHtcbiAgICBldmVudHModHJ1ZSk7XG4gICAgcmVsZWFzZSh7fSk7XG4gIH1cblxuICBmdW5jdGlvbiBwcmV2ZW50R3JhYmJlZCAoZSkge1xuICAgIGlmIChfZ3JhYmJlZCkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdyYWIgKGUpIHtcbiAgICBfbW92ZVggPSBlLmNsaWVudFg7XG4gICAgX21vdmVZID0gZS5jbGllbnRZO1xuXG4gICAgdmFyIGlnbm9yZSA9IHdoaWNoTW91c2VCdXR0b24oZSkgIT09IDEgfHwgZS5tZXRhS2V5IHx8IGUuY3RybEtleTtcbiAgICBpZiAoaWdub3JlKSB7XG4gICAgICByZXR1cm47IC8vIHdlIG9ubHkgY2FyZSBhYm91dCBob25lc3QtdG8tZ29kIGxlZnQgY2xpY2tzIGFuZCB0b3VjaCBldmVudHNcbiAgICB9XG4gICAgdmFyIGl0ZW0gPSBlLnRhcmdldDtcbiAgICB2YXIgY29udGV4dCA9IGNhblN0YXJ0KGl0ZW0pO1xuICAgIGlmICghY29udGV4dCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBfZ3JhYmJlZCA9IGNvbnRleHQ7XG4gICAgZXZlbnR1YWxNb3ZlbWVudHMoKTtcbiAgICBpZiAoZS50eXBlID09PSAnbW91c2Vkb3duJykge1xuICAgICAgaWYgKGlzSW5wdXQoaXRlbSkpIHsgLy8gc2VlIGFsc286IGh0dHBzOi8vZ2l0aHViLmNvbS9iZXZhY3F1YS9kcmFndWxhL2lzc3Vlcy8yMDhcbiAgICAgICAgaXRlbS5mb2N1cygpOyAvLyBmaXhlcyBodHRwczovL2dpdGh1Yi5jb20vYmV2YWNxdWEvZHJhZ3VsYS9pc3N1ZXMvMTc2XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7IC8vIGZpeGVzIGh0dHBzOi8vZ2l0aHViLmNvbS9iZXZhY3F1YS9kcmFndWxhL2lzc3Vlcy8xNTVcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydEJlY2F1c2VNb3VzZU1vdmVkIChlKSB7XG4gICAgaWYgKCFfZ3JhYmJlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAod2hpY2hNb3VzZUJ1dHRvbihlKSA9PT0gMCkge1xuICAgICAgcmVsZWFzZSh7fSk7XG4gICAgICByZXR1cm47IC8vIHdoZW4gdGV4dCBpcyBzZWxlY3RlZCBvbiBhbiBpbnB1dCBhbmQgdGhlbiBkcmFnZ2VkLCBtb3VzZXVwIGRvZXNuJ3QgZmlyZS4gdGhpcyBpcyBvdXIgb25seSBob3BlXG4gICAgfVxuICAgIC8vIHRydXRoeSBjaGVjayBmaXhlcyAjMjM5LCBlcXVhbGl0eSBmaXhlcyAjMjA3XG4gICAgaWYgKGUuY2xpZW50WCAhPT0gdm9pZCAwICYmIGUuY2xpZW50WCA9PT0gX21vdmVYICYmIGUuY2xpZW50WSAhPT0gdm9pZCAwICYmIGUuY2xpZW50WSA9PT0gX21vdmVZKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChvLmlnbm9yZUlucHV0VGV4dFNlbGVjdGlvbikge1xuICAgICAgdmFyIGNsaWVudFggPSBnZXRDb29yZCgnY2xpZW50WCcsIGUpO1xuICAgICAgdmFyIGNsaWVudFkgPSBnZXRDb29yZCgnY2xpZW50WScsIGUpO1xuICAgICAgdmFyIGVsZW1lbnRCZWhpbmRDdXJzb3IgPSBkb2MuZWxlbWVudEZyb21Qb2ludChjbGllbnRYLCBjbGllbnRZKTtcbiAgICAgIGlmIChpc0lucHV0KGVsZW1lbnRCZWhpbmRDdXJzb3IpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgZ3JhYmJlZCA9IF9ncmFiYmVkOyAvLyBjYWxsIHRvIGVuZCgpIHVuc2V0cyBfZ3JhYmJlZFxuICAgIGV2ZW50dWFsTW92ZW1lbnRzKHRydWUpO1xuICAgIG1vdmVtZW50cygpO1xuICAgIGVuZCgpO1xuICAgIHN0YXJ0KGdyYWJiZWQpO1xuXG4gICAgdmFyIG9mZnNldCA9IGdldE9mZnNldChfaXRlbSk7XG4gICAgX29mZnNldFggPSBnZXRDb29yZCgncGFnZVgnLCBlKSAtIG9mZnNldC5sZWZ0O1xuICAgIF9vZmZzZXRZID0gZ2V0Q29vcmQoJ3BhZ2VZJywgZSkgLSBvZmZzZXQudG9wO1xuXG4gICAgY2xhc3Nlcy5hZGQoX2NvcHkgfHwgX2l0ZW0sICdndS10cmFuc2l0Jyk7XG4gICAgcmVuZGVyTWlycm9ySW1hZ2UoKTtcbiAgICBkcmFnKGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2FuU3RhcnQgKGl0ZW0pIHtcbiAgICBpZiAoZHJha2UuZHJhZ2dpbmcgJiYgX21pcnJvcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoaXNDb250YWluZXIoaXRlbSkpIHtcbiAgICAgIHJldHVybjsgLy8gZG9uJ3QgZHJhZyBjb250YWluZXIgaXRzZWxmXG4gICAgfVxuICAgIHZhciBoYW5kbGUgPSBpdGVtO1xuICAgIHdoaWxlIChnZXRQYXJlbnQoaXRlbSkgJiYgaXNDb250YWluZXIoZ2V0UGFyZW50KGl0ZW0pKSA9PT0gZmFsc2UpIHtcbiAgICAgIGlmIChvLmludmFsaWQoaXRlbSwgaGFuZGxlKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpdGVtID0gZ2V0UGFyZW50KGl0ZW0pOyAvLyBkcmFnIHRhcmdldCBzaG91bGQgYmUgYSB0b3AgZWxlbWVudFxuICAgICAgaWYgKCFpdGVtKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgdmFyIHNvdXJjZSA9IGdldFBhcmVudChpdGVtKTtcbiAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoby5pbnZhbGlkKGl0ZW0sIGhhbmRsZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgbW92YWJsZSA9IG8ubW92ZXMoaXRlbSwgc291cmNlLCBoYW5kbGUsIG5leHRFbChpdGVtKSk7XG4gICAgaWYgKCFtb3ZhYmxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGl0ZW06IGl0ZW0sXG4gICAgICBzb3VyY2U6IHNvdXJjZVxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBjYW5Nb3ZlIChpdGVtKSB7XG4gICAgcmV0dXJuICEhY2FuU3RhcnQoaXRlbSk7XG4gIH1cblxuICBmdW5jdGlvbiBtYW51YWxTdGFydCAoaXRlbSkge1xuICAgIHZhciBjb250ZXh0ID0gY2FuU3RhcnQoaXRlbSk7XG4gICAgaWYgKGNvbnRleHQpIHtcbiAgICAgIHN0YXJ0KGNvbnRleHQpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0IChjb250ZXh0KSB7XG4gICAgaWYgKGlzQ29weShjb250ZXh0Lml0ZW0sIGNvbnRleHQuc291cmNlKSkge1xuICAgICAgX2NvcHkgPSBjb250ZXh0Lml0ZW0uY2xvbmVOb2RlKHRydWUpO1xuICAgICAgZHJha2UuZW1pdCgnY2xvbmVkJywgX2NvcHksIGNvbnRleHQuaXRlbSwgJ2NvcHknKTtcbiAgICB9XG5cbiAgICBfc291cmNlID0gY29udGV4dC5zb3VyY2U7XG4gICAgX2l0ZW0gPSBjb250ZXh0Lml0ZW07XG4gICAgX2luaXRpYWxTaWJsaW5nID0gX2N1cnJlbnRTaWJsaW5nID0gbmV4dEVsKGNvbnRleHQuaXRlbSk7XG5cbiAgICBkcmFrZS5kcmFnZ2luZyA9IHRydWU7XG4gICAgZHJha2UuZW1pdCgnZHJhZycsIF9pdGVtLCBfc291cmNlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGludmFsaWRUYXJnZXQgKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVuZCAoKSB7XG4gICAgaWYgKCFkcmFrZS5kcmFnZ2luZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgaXRlbSA9IF9jb3B5IHx8IF9pdGVtO1xuICAgIGRyb3AoaXRlbSwgZ2V0UGFyZW50KGl0ZW0pKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVuZ3JhYiAoKSB7XG4gICAgX2dyYWJiZWQgPSBmYWxzZTtcbiAgICBldmVudHVhbE1vdmVtZW50cyh0cnVlKTtcbiAgICBtb3ZlbWVudHModHJ1ZSk7XG4gIH1cblxuICBmdW5jdGlvbiByZWxlYXNlIChlKSB7XG4gICAgdW5ncmFiKCk7XG5cbiAgICBpZiAoIWRyYWtlLmRyYWdnaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBpdGVtID0gX2NvcHkgfHwgX2l0ZW07XG4gICAgdmFyIGNsaWVudFggPSBnZXRDb29yZCgnY2xpZW50WCcsIGUpO1xuICAgIHZhciBjbGllbnRZID0gZ2V0Q29vcmQoJ2NsaWVudFknLCBlKTtcbiAgICB2YXIgZWxlbWVudEJlaGluZEN1cnNvciA9IGdldEVsZW1lbnRCZWhpbmRQb2ludChfbWlycm9yLCBjbGllbnRYLCBjbGllbnRZKTtcbiAgICB2YXIgZHJvcFRhcmdldCA9IGZpbmREcm9wVGFyZ2V0KGVsZW1lbnRCZWhpbmRDdXJzb3IsIGNsaWVudFgsIGNsaWVudFkpO1xuICAgIGlmIChkcm9wVGFyZ2V0ICYmICgoX2NvcHkgJiYgby5jb3B5U29ydFNvdXJjZSkgfHwgKCFfY29weSB8fCBkcm9wVGFyZ2V0ICE9PSBfc291cmNlKSkpIHtcbiAgICAgIGRyb3AoaXRlbSwgZHJvcFRhcmdldCk7XG4gICAgfSBlbHNlIGlmIChvLnJlbW92ZU9uU3BpbGwpIHtcbiAgICAgIHJlbW92ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYW5jZWwoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkcm9wIChpdGVtLCB0YXJnZXQpIHtcbiAgICB2YXIgcGFyZW50ID0gZ2V0UGFyZW50KGl0ZW0pO1xuICAgIGlmIChfY29weSAmJiBvLmNvcHlTb3J0U291cmNlICYmIHRhcmdldCA9PT0gX3NvdXJjZSkge1xuICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKF9pdGVtKTtcbiAgICB9XG4gICAgaWYgKGlzSW5pdGlhbFBsYWNlbWVudCh0YXJnZXQpKSB7XG4gICAgICBkcmFrZS5lbWl0KCdjYW5jZWwnLCBpdGVtLCBfc291cmNlLCBfc291cmNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZHJha2UuZW1pdCgnZHJvcCcsIGl0ZW0sIHRhcmdldCwgX3NvdXJjZSwgX2N1cnJlbnRTaWJsaW5nKTtcbiAgICB9XG4gICAgY2xlYW51cCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlICgpIHtcbiAgICBpZiAoIWRyYWtlLmRyYWdnaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBpdGVtID0gX2NvcHkgfHwgX2l0ZW07XG4gICAgdmFyIHBhcmVudCA9IGdldFBhcmVudChpdGVtKTtcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQoaXRlbSk7XG4gICAgfVxuICAgIGRyYWtlLmVtaXQoX2NvcHkgPyAnY2FuY2VsJyA6ICdyZW1vdmUnLCBpdGVtLCBwYXJlbnQsIF9zb3VyY2UpO1xuICAgIGNsZWFudXAoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbmNlbCAocmV2ZXJ0KSB7XG4gICAgaWYgKCFkcmFrZS5kcmFnZ2luZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgcmV2ZXJ0cyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwID8gcmV2ZXJ0IDogby5yZXZlcnRPblNwaWxsO1xuICAgIHZhciBpdGVtID0gX2NvcHkgfHwgX2l0ZW07XG4gICAgdmFyIHBhcmVudCA9IGdldFBhcmVudChpdGVtKTtcbiAgICB2YXIgaW5pdGlhbCA9IGlzSW5pdGlhbFBsYWNlbWVudChwYXJlbnQpO1xuICAgIGlmIChpbml0aWFsID09PSBmYWxzZSAmJiByZXZlcnRzKSB7XG4gICAgICBpZiAoX2NvcHkpIHtcbiAgICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChfY29weSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9zb3VyY2UuaW5zZXJ0QmVmb3JlKGl0ZW0sIF9pbml0aWFsU2libGluZyk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChpbml0aWFsIHx8IHJldmVydHMpIHtcbiAgICAgIGRyYWtlLmVtaXQoJ2NhbmNlbCcsIGl0ZW0sIF9zb3VyY2UsIF9zb3VyY2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkcmFrZS5lbWl0KCdkcm9wJywgaXRlbSwgcGFyZW50LCBfc291cmNlLCBfY3VycmVudFNpYmxpbmcpO1xuICAgIH1cbiAgICBjbGVhbnVwKCk7XG4gIH1cblxuICBmdW5jdGlvbiBjbGVhbnVwICgpIHtcbiAgICB2YXIgaXRlbSA9IF9jb3B5IHx8IF9pdGVtO1xuICAgIHVuZ3JhYigpO1xuICAgIHJlbW92ZU1pcnJvckltYWdlKCk7XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIGNsYXNzZXMucm0oaXRlbSwgJ2d1LXRyYW5zaXQnKTtcbiAgICB9XG4gICAgaWYgKF9yZW5kZXJUaW1lcikge1xuICAgICAgY2xlYXJUaW1lb3V0KF9yZW5kZXJUaW1lcik7XG4gICAgfVxuICAgIGRyYWtlLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgaWYgKF9sYXN0RHJvcFRhcmdldCkge1xuICAgICAgZHJha2UuZW1pdCgnb3V0JywgaXRlbSwgX2xhc3REcm9wVGFyZ2V0LCBfc291cmNlKTtcbiAgICB9XG4gICAgZHJha2UuZW1pdCgnZHJhZ2VuZCcsIGl0ZW0pO1xuICAgIF9zb3VyY2UgPSBfaXRlbSA9IF9jb3B5ID0gX2luaXRpYWxTaWJsaW5nID0gX2N1cnJlbnRTaWJsaW5nID0gX3JlbmRlclRpbWVyID0gX2xhc3REcm9wVGFyZ2V0ID0gbnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzSW5pdGlhbFBsYWNlbWVudCAodGFyZ2V0LCBzKSB7XG4gICAgdmFyIHNpYmxpbmc7XG4gICAgaWYgKHMgIT09IHZvaWQgMCkge1xuICAgICAgc2libGluZyA9IHM7XG4gICAgfSBlbHNlIGlmIChfbWlycm9yKSB7XG4gICAgICBzaWJsaW5nID0gX2N1cnJlbnRTaWJsaW5nO1xuICAgIH0gZWxzZSB7XG4gICAgICBzaWJsaW5nID0gbmV4dEVsKF9jb3B5IHx8IF9pdGVtKTtcbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldCA9PT0gX3NvdXJjZSAmJiBzaWJsaW5nID09PSBfaW5pdGlhbFNpYmxpbmc7XG4gIH1cblxuICBmdW5jdGlvbiBmaW5kRHJvcFRhcmdldCAoZWxlbWVudEJlaGluZEN1cnNvciwgY2xpZW50WCwgY2xpZW50WSkge1xuICAgIHZhciB0YXJnZXQgPSBlbGVtZW50QmVoaW5kQ3Vyc29yO1xuICAgIHdoaWxlICh0YXJnZXQgJiYgIWFjY2VwdGVkKCkpIHtcbiAgICAgIHRhcmdldCA9IGdldFBhcmVudCh0YXJnZXQpO1xuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xuXG4gICAgZnVuY3Rpb24gYWNjZXB0ZWQgKCkge1xuICAgICAgdmFyIGRyb3BwYWJsZSA9IGlzQ29udGFpbmVyKHRhcmdldCk7XG4gICAgICBpZiAoZHJvcHBhYmxlID09PSBmYWxzZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHZhciBpbW1lZGlhdGUgPSBnZXRJbW1lZGlhdGVDaGlsZCh0YXJnZXQsIGVsZW1lbnRCZWhpbmRDdXJzb3IpO1xuICAgICAgdmFyIHJlZmVyZW5jZSA9IGdldFJlZmVyZW5jZSh0YXJnZXQsIGltbWVkaWF0ZSwgY2xpZW50WCwgY2xpZW50WSk7XG4gICAgICB2YXIgaW5pdGlhbCA9IGlzSW5pdGlhbFBsYWNlbWVudCh0YXJnZXQsIHJlZmVyZW5jZSk7XG4gICAgICBpZiAoaW5pdGlhbCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTsgLy8gc2hvdWxkIGFsd2F5cyBiZSBhYmxlIHRvIGRyb3AgaXQgcmlnaHQgYmFjayB3aGVyZSBpdCB3YXNcbiAgICAgIH1cbiAgICAgIHJldHVybiBvLmFjY2VwdHMoX2l0ZW0sIHRhcmdldCwgX3NvdXJjZSwgcmVmZXJlbmNlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkcmFnIChlKSB7XG4gICAgaWYgKCFfbWlycm9yKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIHZhciBjbGllbnRYID0gZ2V0Q29vcmQoJ2NsaWVudFgnLCBlKTtcbiAgICB2YXIgY2xpZW50WSA9IGdldENvb3JkKCdjbGllbnRZJywgZSk7XG4gICAgdmFyIHggPSBjbGllbnRYIC0gX29mZnNldFg7XG4gICAgdmFyIHkgPSBjbGllbnRZIC0gX29mZnNldFk7XG5cbiAgICBfbWlycm9yLnN0eWxlLmxlZnQgPSB4ICsgJ3B4JztcbiAgICBfbWlycm9yLnN0eWxlLnRvcCA9IHkgKyAncHgnO1xuXG4gICAgdmFyIGl0ZW0gPSBfY29weSB8fCBfaXRlbTtcbiAgICB2YXIgZWxlbWVudEJlaGluZEN1cnNvciA9IGdldEVsZW1lbnRCZWhpbmRQb2ludChfbWlycm9yLCBjbGllbnRYLCBjbGllbnRZKTtcbiAgICB2YXIgZHJvcFRhcmdldCA9IGZpbmREcm9wVGFyZ2V0KGVsZW1lbnRCZWhpbmRDdXJzb3IsIGNsaWVudFgsIGNsaWVudFkpO1xuICAgIHZhciBjaGFuZ2VkID0gZHJvcFRhcmdldCAhPT0gbnVsbCAmJiBkcm9wVGFyZ2V0ICE9PSBfbGFzdERyb3BUYXJnZXQ7XG4gICAgaWYgKGNoYW5nZWQgfHwgZHJvcFRhcmdldCA9PT0gbnVsbCkge1xuICAgICAgb3V0KCk7XG4gICAgICBfbGFzdERyb3BUYXJnZXQgPSBkcm9wVGFyZ2V0O1xuICAgICAgb3ZlcigpO1xuICAgIH1cbiAgICB2YXIgcGFyZW50ID0gZ2V0UGFyZW50KGl0ZW0pO1xuICAgIGlmIChkcm9wVGFyZ2V0ID09PSBfc291cmNlICYmIF9jb3B5ICYmICFvLmNvcHlTb3J0U291cmNlKSB7XG4gICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgIHBhcmVudC5yZW1vdmVDaGlsZChpdGVtKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHJlZmVyZW5jZTtcbiAgICB2YXIgaW1tZWRpYXRlID0gZ2V0SW1tZWRpYXRlQ2hpbGQoZHJvcFRhcmdldCwgZWxlbWVudEJlaGluZEN1cnNvcik7XG4gICAgaWYgKGltbWVkaWF0ZSAhPT0gbnVsbCkge1xuICAgICAgcmVmZXJlbmNlID0gZ2V0UmVmZXJlbmNlKGRyb3BUYXJnZXQsIGltbWVkaWF0ZSwgY2xpZW50WCwgY2xpZW50WSk7XG4gICAgfSBlbHNlIGlmIChvLnJldmVydE9uU3BpbGwgPT09IHRydWUgJiYgIV9jb3B5KSB7XG4gICAgICByZWZlcmVuY2UgPSBfaW5pdGlhbFNpYmxpbmc7XG4gICAgICBkcm9wVGFyZ2V0ID0gX3NvdXJjZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKF9jb3B5ICYmIHBhcmVudCkge1xuICAgICAgICBwYXJlbnQucmVtb3ZlQ2hpbGQoaXRlbSk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChcbiAgICAgIChyZWZlcmVuY2UgPT09IG51bGwgJiYgY2hhbmdlZCkgfHxcbiAgICAgIHJlZmVyZW5jZSAhPT0gaXRlbSAmJlxuICAgICAgcmVmZXJlbmNlICE9PSBuZXh0RWwoaXRlbSlcbiAgICApIHtcbiAgICAgIF9jdXJyZW50U2libGluZyA9IHJlZmVyZW5jZTtcbiAgICAgIGRyb3BUYXJnZXQuaW5zZXJ0QmVmb3JlKGl0ZW0sIHJlZmVyZW5jZSk7XG4gICAgICBkcmFrZS5lbWl0KCdzaGFkb3cnLCBpdGVtLCBkcm9wVGFyZ2V0LCBfc291cmNlKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbW92ZWQgKHR5cGUpIHsgZHJha2UuZW1pdCh0eXBlLCBpdGVtLCBfbGFzdERyb3BUYXJnZXQsIF9zb3VyY2UpOyB9XG4gICAgZnVuY3Rpb24gb3ZlciAoKSB7IGlmIChjaGFuZ2VkKSB7IG1vdmVkKCdvdmVyJyk7IH0gfVxuICAgIGZ1bmN0aW9uIG91dCAoKSB7IGlmIChfbGFzdERyb3BUYXJnZXQpIHsgbW92ZWQoJ291dCcpOyB9IH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNwaWxsT3ZlciAoZWwpIHtcbiAgICBjbGFzc2VzLnJtKGVsLCAnZ3UtaGlkZScpO1xuICB9XG5cbiAgZnVuY3Rpb24gc3BpbGxPdXQgKGVsKSB7XG4gICAgaWYgKGRyYWtlLmRyYWdnaW5nKSB7IGNsYXNzZXMuYWRkKGVsLCAnZ3UtaGlkZScpOyB9XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJNaXJyb3JJbWFnZSAoKSB7XG4gICAgaWYgKF9taXJyb3IpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHJlY3QgPSBfaXRlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBfbWlycm9yID0gX2l0ZW0uY2xvbmVOb2RlKHRydWUpO1xuICAgIF9taXJyb3Iuc3R5bGUud2lkdGggPSBnZXRSZWN0V2lkdGgocmVjdCkgKyAncHgnO1xuICAgIF9taXJyb3Iuc3R5bGUuaGVpZ2h0ID0gZ2V0UmVjdEhlaWdodChyZWN0KSArICdweCc7XG4gICAgY2xhc3Nlcy5ybShfbWlycm9yLCAnZ3UtdHJhbnNpdCcpO1xuICAgIGNsYXNzZXMuYWRkKF9taXJyb3IsICdndS1taXJyb3InKTtcbiAgICBvLm1pcnJvckNvbnRhaW5lci5hcHBlbmRDaGlsZChfbWlycm9yKTtcbiAgICB0b3VjaHkoZG9jdW1lbnRFbGVtZW50LCAnYWRkJywgJ21vdXNlbW92ZScsIGRyYWcpO1xuICAgIGNsYXNzZXMuYWRkKG8ubWlycm9yQ29udGFpbmVyLCAnZ3UtdW5zZWxlY3RhYmxlJyk7XG4gICAgZHJha2UuZW1pdCgnY2xvbmVkJywgX21pcnJvciwgX2l0ZW0sICdtaXJyb3InKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZU1pcnJvckltYWdlICgpIHtcbiAgICBpZiAoX21pcnJvcikge1xuICAgICAgY2xhc3Nlcy5ybShvLm1pcnJvckNvbnRhaW5lciwgJ2d1LXVuc2VsZWN0YWJsZScpO1xuICAgICAgdG91Y2h5KGRvY3VtZW50RWxlbWVudCwgJ3JlbW92ZScsICdtb3VzZW1vdmUnLCBkcmFnKTtcbiAgICAgIGdldFBhcmVudChfbWlycm9yKS5yZW1vdmVDaGlsZChfbWlycm9yKTtcbiAgICAgIF9taXJyb3IgPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEltbWVkaWF0ZUNoaWxkIChkcm9wVGFyZ2V0LCB0YXJnZXQpIHtcbiAgICB2YXIgaW1tZWRpYXRlID0gdGFyZ2V0O1xuICAgIHdoaWxlIChpbW1lZGlhdGUgIT09IGRyb3BUYXJnZXQgJiYgZ2V0UGFyZW50KGltbWVkaWF0ZSkgIT09IGRyb3BUYXJnZXQpIHtcbiAgICAgIGltbWVkaWF0ZSA9IGdldFBhcmVudChpbW1lZGlhdGUpO1xuICAgIH1cbiAgICBpZiAoaW1tZWRpYXRlID09PSBkb2N1bWVudEVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gaW1tZWRpYXRlO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UmVmZXJlbmNlIChkcm9wVGFyZ2V0LCB0YXJnZXQsIHgsIHkpIHtcbiAgICB2YXIgaG9yaXpvbnRhbCA9IG8uZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCc7XG4gICAgdmFyIHJlZmVyZW5jZSA9IHRhcmdldCAhPT0gZHJvcFRhcmdldCA/IGluc2lkZSgpIDogb3V0c2lkZSgpO1xuICAgIHJldHVybiByZWZlcmVuY2U7XG5cbiAgICBmdW5jdGlvbiBvdXRzaWRlICgpIHsgLy8gc2xvd2VyLCBidXQgYWJsZSB0byBmaWd1cmUgb3V0IGFueSBwb3NpdGlvblxuICAgICAgdmFyIGxlbiA9IGRyb3BUYXJnZXQuY2hpbGRyZW4ubGVuZ3RoO1xuICAgICAgdmFyIGk7XG4gICAgICB2YXIgZWw7XG4gICAgICB2YXIgcmVjdDtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBlbCA9IGRyb3BUYXJnZXQuY2hpbGRyZW5baV07XG4gICAgICAgIHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgaWYgKGhvcml6b250YWwgJiYgKHJlY3QubGVmdCArIHJlY3Qud2lkdGggLyAyKSA+IHgpIHsgcmV0dXJuIGVsOyB9XG4gICAgICAgIGlmICghaG9yaXpvbnRhbCAmJiAocmVjdC50b3AgKyByZWN0LmhlaWdodCAvIDIpID4geSkgeyByZXR1cm4gZWw7IH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc2lkZSAoKSB7IC8vIGZhc3RlciwgYnV0IG9ubHkgYXZhaWxhYmxlIGlmIGRyb3BwZWQgaW5zaWRlIGEgY2hpbGQgZWxlbWVudFxuICAgICAgdmFyIHJlY3QgPSB0YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICBpZiAoaG9yaXpvbnRhbCkge1xuICAgICAgICByZXR1cm4gcmVzb2x2ZSh4ID4gcmVjdC5sZWZ0ICsgZ2V0UmVjdFdpZHRoKHJlY3QpIC8gMik7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzb2x2ZSh5ID4gcmVjdC50b3AgKyBnZXRSZWN0SGVpZ2h0KHJlY3QpIC8gMik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzb2x2ZSAoYWZ0ZXIpIHtcbiAgICAgIHJldHVybiBhZnRlciA/IG5leHRFbCh0YXJnZXQpIDogdGFyZ2V0O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzQ29weSAoaXRlbSwgY29udGFpbmVyKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvLmNvcHkgPT09ICdib29sZWFuJyA/IG8uY29weSA6IG8uY29weShpdGVtLCBjb250YWluZXIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHRvdWNoeSAoZWwsIG9wLCB0eXBlLCBmbikge1xuICB2YXIgdG91Y2ggPSB7XG4gICAgbW91c2V1cDogJ3RvdWNoZW5kJyxcbiAgICBtb3VzZWRvd246ICd0b3VjaHN0YXJ0JyxcbiAgICBtb3VzZW1vdmU6ICd0b3VjaG1vdmUnXG4gIH07XG4gIHZhciBwb2ludGVycyA9IHtcbiAgICBtb3VzZXVwOiAncG9pbnRlcnVwJyxcbiAgICBtb3VzZWRvd246ICdwb2ludGVyZG93bicsXG4gICAgbW91c2Vtb3ZlOiAncG9pbnRlcm1vdmUnXG4gIH07XG4gIHZhciBtaWNyb3NvZnQgPSB7XG4gICAgbW91c2V1cDogJ01TUG9pbnRlclVwJyxcbiAgICBtb3VzZWRvd246ICdNU1BvaW50ZXJEb3duJyxcbiAgICBtb3VzZW1vdmU6ICdNU1BvaW50ZXJNb3ZlJ1xuICB9O1xuICBpZiAoZ2xvYmFsLm5hdmlnYXRvci5wb2ludGVyRW5hYmxlZCkge1xuICAgIGNyb3NzdmVudFtvcF0oZWwsIHBvaW50ZXJzW3R5cGVdLCBmbik7XG4gIH0gZWxzZSBpZiAoZ2xvYmFsLm5hdmlnYXRvci5tc1BvaW50ZXJFbmFibGVkKSB7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgbWljcm9zb2Z0W3R5cGVdLCBmbik7XG4gIH0gZWxzZSB7XG4gICAgY3Jvc3N2ZW50W29wXShlbCwgdG91Y2hbdHlwZV0sIGZuKTtcbiAgICBjcm9zc3ZlbnRbb3BdKGVsLCB0eXBlLCBmbik7XG4gIH1cbn1cblxuZnVuY3Rpb24gd2hpY2hNb3VzZUJ1dHRvbiAoZSkge1xuICBpZiAoZS50b3VjaGVzICE9PSB2b2lkIDApIHsgcmV0dXJuIGUudG91Y2hlcy5sZW5ndGg7IH1cbiAgaWYgKGUud2hpY2ggIT09IHZvaWQgMCAmJiBlLndoaWNoICE9PSAwKSB7IHJldHVybiBlLndoaWNoOyB9IC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vYmV2YWNxdWEvZHJhZ3VsYS9pc3N1ZXMvMjYxXG4gIGlmIChlLmJ1dHRvbnMgIT09IHZvaWQgMCkgeyByZXR1cm4gZS5idXR0b25zOyB9XG4gIHZhciBidXR0b24gPSBlLmJ1dHRvbjtcbiAgaWYgKGJ1dHRvbiAhPT0gdm9pZCAwKSB7IC8vIHNlZSBodHRwczovL2dpdGh1Yi5jb20vanF1ZXJ5L2pxdWVyeS9ibG9iLzk5ZThmZjFiYWE3YWUzNDFlOTRiYjg5YzNlODQ1NzBjN2MzYWQ5ZWEvc3JjL2V2ZW50LmpzI0w1NzMtTDU3NVxuICAgIHJldHVybiBidXR0b24gJiAxID8gMSA6IGJ1dHRvbiAmIDIgPyAzIDogKGJ1dHRvbiAmIDQgPyAyIDogMCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0T2Zmc2V0IChlbCkge1xuICB2YXIgcmVjdCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICByZXR1cm4ge1xuICAgIGxlZnQ6IHJlY3QubGVmdCArIGdldFNjcm9sbCgnc2Nyb2xsTGVmdCcsICdwYWdlWE9mZnNldCcpLFxuICAgIHRvcDogcmVjdC50b3AgKyBnZXRTY3JvbGwoJ3Njcm9sbFRvcCcsICdwYWdlWU9mZnNldCcpXG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldFNjcm9sbCAoc2Nyb2xsUHJvcCwgb2Zmc2V0UHJvcCkge1xuICBpZiAodHlwZW9mIGdsb2JhbFtvZmZzZXRQcm9wXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZ2xvYmFsW29mZnNldFByb3BdO1xuICB9XG4gIGlmIChkb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KSB7XG4gICAgcmV0dXJuIGRvY3VtZW50RWxlbWVudFtzY3JvbGxQcm9wXTtcbiAgfVxuICByZXR1cm4gZG9jLmJvZHlbc2Nyb2xsUHJvcF07XG59XG5cbmZ1bmN0aW9uIGdldEVsZW1lbnRCZWhpbmRQb2ludCAocG9pbnQsIHgsIHkpIHtcbiAgdmFyIHAgPSBwb2ludCB8fCB7fTtcbiAgdmFyIHN0YXRlID0gcC5jbGFzc05hbWU7XG4gIHZhciBlbDtcbiAgcC5jbGFzc05hbWUgKz0gJyBndS1oaWRlJztcbiAgZWwgPSBkb2MuZWxlbWVudEZyb21Qb2ludCh4LCB5KTtcbiAgcC5jbGFzc05hbWUgPSBzdGF0ZTtcbiAgcmV0dXJuIGVsO1xufVxuXG5mdW5jdGlvbiBuZXZlciAoKSB7IHJldHVybiBmYWxzZTsgfVxuZnVuY3Rpb24gYWx3YXlzICgpIHsgcmV0dXJuIHRydWU7IH1cbmZ1bmN0aW9uIGdldFJlY3RXaWR0aCAocmVjdCkgeyByZXR1cm4gcmVjdC53aWR0aCB8fCAocmVjdC5yaWdodCAtIHJlY3QubGVmdCk7IH1cbmZ1bmN0aW9uIGdldFJlY3RIZWlnaHQgKHJlY3QpIHsgcmV0dXJuIHJlY3QuaGVpZ2h0IHx8IChyZWN0LmJvdHRvbSAtIHJlY3QudG9wKTsgfVxuZnVuY3Rpb24gZ2V0UGFyZW50IChlbCkgeyByZXR1cm4gZWwucGFyZW50Tm9kZSA9PT0gZG9jID8gbnVsbCA6IGVsLnBhcmVudE5vZGU7IH1cbmZ1bmN0aW9uIGlzSW5wdXQgKGVsKSB7IHJldHVybiBlbC50YWdOYW1lID09PSAnSU5QVVQnIHx8IGVsLnRhZ05hbWUgPT09ICdURVhUQVJFQScgfHwgZWwudGFnTmFtZSA9PT0gJ1NFTEVDVCcgfHwgaXNFZGl0YWJsZShlbCk7IH1cbmZ1bmN0aW9uIGlzRWRpdGFibGUgKGVsKSB7XG4gIGlmICghZWwpIHsgcmV0dXJuIGZhbHNlOyB9IC8vIG5vIHBhcmVudHMgd2VyZSBlZGl0YWJsZVxuICBpZiAoZWwuY29udGVudEVkaXRhYmxlID09PSAnZmFsc2UnKSB7IHJldHVybiBmYWxzZTsgfSAvLyBzdG9wIHRoZSBsb29rdXBcbiAgaWYgKGVsLmNvbnRlbnRFZGl0YWJsZSA9PT0gJ3RydWUnKSB7IHJldHVybiB0cnVlOyB9IC8vIGZvdW5kIGEgY29udGVudEVkaXRhYmxlIGVsZW1lbnQgaW4gdGhlIGNoYWluXG4gIHJldHVybiBpc0VkaXRhYmxlKGdldFBhcmVudChlbCkpOyAvLyBjb250ZW50RWRpdGFibGUgaXMgc2V0IHRvICdpbmhlcml0J1xufVxuXG5mdW5jdGlvbiBuZXh0RWwgKGVsKSB7XG4gIHJldHVybiBlbC5uZXh0RWxlbWVudFNpYmxpbmcgfHwgbWFudWFsbHkoKTtcbiAgZnVuY3Rpb24gbWFudWFsbHkgKCkge1xuICAgIHZhciBzaWJsaW5nID0gZWw7XG4gICAgZG8ge1xuICAgICAgc2libGluZyA9IHNpYmxpbmcubmV4dFNpYmxpbmc7XG4gICAgfSB3aGlsZSAoc2libGluZyAmJiBzaWJsaW5nLm5vZGVUeXBlICE9PSAxKTtcbiAgICByZXR1cm4gc2libGluZztcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRFdmVudEhvc3QgKGUpIHtcbiAgLy8gb24gdG91Y2hlbmQgZXZlbnQsIHdlIGhhdmUgdG8gdXNlIGBlLmNoYW5nZWRUb3VjaGVzYFxuICAvLyBzZWUgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy83MTkyNTYzL3RvdWNoZW5kLWV2ZW50LXByb3BlcnRpZXNcbiAgLy8gc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9iZXZhY3F1YS9kcmFndWxhL2lzc3Vlcy8zNFxuICBpZiAoZS50YXJnZXRUb3VjaGVzICYmIGUudGFyZ2V0VG91Y2hlcy5sZW5ndGgpIHtcbiAgICByZXR1cm4gZS50YXJnZXRUb3VjaGVzWzBdO1xuICB9XG4gIGlmIChlLmNoYW5nZWRUb3VjaGVzICYmIGUuY2hhbmdlZFRvdWNoZXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGUuY2hhbmdlZFRvdWNoZXNbMF07XG4gIH1cbiAgcmV0dXJuIGU7XG59XG5cbmZ1bmN0aW9uIGdldENvb3JkIChjb29yZCwgZSkge1xuICB2YXIgaG9zdCA9IGdldEV2ZW50SG9zdChlKTtcbiAgdmFyIG1pc3NNYXAgPSB7XG4gICAgcGFnZVg6ICdjbGllbnRYJywgLy8gSUU4XG4gICAgcGFnZVk6ICdjbGllbnRZJyAvLyBJRThcbiAgfTtcbiAgaWYgKGNvb3JkIGluIG1pc3NNYXAgJiYgIShjb29yZCBpbiBob3N0KSAmJiBtaXNzTWFwW2Nvb3JkXSBpbiBob3N0KSB7XG4gICAgY29vcmQgPSBtaXNzTWFwW2Nvb3JkXTtcbiAgfVxuICByZXR1cm4gaG9zdFtjb29yZF07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZHJhZ3VsYTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC9Vc2Vycy9ib2JieS9TaXRlcy9hcmNoc3lzdGVtcy9odGRvY3Mvd3AtY29udGVudC90aGVtZXMvYXJjaHN5c3RlbXMvdmVuZG9yL29tZy1maWVsZHMvbm9kZV9tb2R1bGVzL2RyYWd1bGEvZHJhZ3VsYS5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBhdG9hID0gcmVxdWlyZSgnYXRvYScpO1xudmFyIGRlYm91bmNlID0gcmVxdWlyZSgnLi9kZWJvdW5jZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVtaXR0ZXIgKHRoaW5nLCBvcHRpb25zKSB7XG4gIHZhciBvcHRzID0gb3B0aW9ucyB8fCB7fTtcbiAgdmFyIGV2dCA9IHt9O1xuICBpZiAodGhpbmcgPT09IHVuZGVmaW5lZCkgeyB0aGluZyA9IHt9OyB9XG4gIHRoaW5nLm9uID0gZnVuY3Rpb24gKHR5cGUsIGZuKSB7XG4gICAgaWYgKCFldnRbdHlwZV0pIHtcbiAgICAgIGV2dFt0eXBlXSA9IFtmbl07XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2dFt0eXBlXS5wdXNoKGZuKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaW5nO1xuICB9O1xuICB0aGluZy5vbmNlID0gZnVuY3Rpb24gKHR5cGUsIGZuKSB7XG4gICAgZm4uX29uY2UgPSB0cnVlOyAvLyB0aGluZy5vZmYoZm4pIHN0aWxsIHdvcmtzIVxuICAgIHRoaW5nLm9uKHR5cGUsIGZuKTtcbiAgICByZXR1cm4gdGhpbmc7XG4gIH07XG4gIHRoaW5nLm9mZiA9IGZ1bmN0aW9uICh0eXBlLCBmbikge1xuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICBpZiAoYyA9PT0gMSkge1xuICAgICAgZGVsZXRlIGV2dFt0eXBlXTtcbiAgICB9IGVsc2UgaWYgKGMgPT09IDApIHtcbiAgICAgIGV2dCA9IHt9O1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgZXQgPSBldnRbdHlwZV07XG4gICAgICBpZiAoIWV0KSB7IHJldHVybiB0aGluZzsgfVxuICAgICAgZXQuc3BsaWNlKGV0LmluZGV4T2YoZm4pLCAxKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaW5nO1xuICB9O1xuICB0aGluZy5lbWl0ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcmdzID0gYXRvYShhcmd1bWVudHMpO1xuICAgIHJldHVybiB0aGluZy5lbWl0dGVyU25hcHNob3QoYXJncy5zaGlmdCgpKS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfTtcbiAgdGhpbmcuZW1pdHRlclNuYXBzaG90ID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgICB2YXIgZXQgPSAoZXZ0W3R5cGVdIHx8IFtdKS5zbGljZSgwKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIGFyZ3MgPSBhdG9hKGFyZ3VtZW50cyk7XG4gICAgICB2YXIgY3R4ID0gdGhpcyB8fCB0aGluZztcbiAgICAgIGlmICh0eXBlID09PSAnZXJyb3InICYmIG9wdHMudGhyb3dzICE9PSBmYWxzZSAmJiAhZXQubGVuZ3RoKSB7IHRocm93IGFyZ3MubGVuZ3RoID09PSAxID8gYXJnc1swXSA6IGFyZ3M7IH1cbiAgICAgIGV0LmZvckVhY2goZnVuY3Rpb24gZW1pdHRlciAobGlzdGVuKSB7XG4gICAgICAgIGlmIChvcHRzLmFzeW5jKSB7IGRlYm91bmNlKGxpc3RlbiwgYXJncywgY3R4KTsgfSBlbHNlIHsgbGlzdGVuLmFwcGx5KGN0eCwgYXJncyk7IH1cbiAgICAgICAgaWYgKGxpc3Rlbi5fb25jZSkgeyB0aGluZy5vZmYodHlwZSwgbGlzdGVuKTsgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGhpbmc7XG4gICAgfTtcbiAgfTtcbiAgcmV0dXJuIHRoaW5nO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC9Vc2Vycy9ib2JieS9TaXRlcy9hcmNoc3lzdGVtcy9odGRvY3Mvd3AtY29udGVudC90aGVtZXMvYXJjaHN5c3RlbXMvdmVuZG9yL29tZy1maWVsZHMvbm9kZV9tb2R1bGVzL2NvbnRyYS9lbWl0dGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYXRvYSAoYSwgbikgeyByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYSwgbik7IH1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC9Vc2Vycy9ib2JieS9TaXRlcy9hcmNoc3lzdGVtcy9odGRvY3Mvd3AtY29udGVudC90aGVtZXMvYXJjaHN5c3RlbXMvdmVuZG9yL29tZy1maWVsZHMvbm9kZV9tb2R1bGVzL2F0b2EvYXRvYS5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdGlja3kgPSByZXF1aXJlKCd0aWNreScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlYm91bmNlIChmbiwgYXJncywgY3R4KSB7XG4gIGlmICghZm4pIHsgcmV0dXJuOyB9XG4gIHRpY2t5KGZ1bmN0aW9uIHJ1biAoKSB7XG4gICAgZm4uYXBwbHkoY3R4IHx8IG51bGwsIGFyZ3MgfHwgW10pO1xuICB9KTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAvVXNlcnMvYm9iYnkvU2l0ZXMvYXJjaHN5c3RlbXMvaHRkb2NzL3dwLWNvbnRlbnQvdGhlbWVzL2FyY2hzeXN0ZW1zL3ZlbmRvci9vbWctZmllbGRzL25vZGVfbW9kdWxlcy9jb250cmEvZGVib3VuY2UuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBzaSA9IHR5cGVvZiBzZXRJbW1lZGlhdGUgPT09ICdmdW5jdGlvbicsIHRpY2s7XG5pZiAoc2kpIHtcbiAgdGljayA9IGZ1bmN0aW9uIChmbikgeyBzZXRJbW1lZGlhdGUoZm4pOyB9O1xufSBlbHNlIHtcbiAgdGljayA9IGZ1bmN0aW9uIChmbikgeyBzZXRUaW1lb3V0KGZuLCAwKTsgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0aWNrO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC9Vc2Vycy9ib2JieS9TaXRlcy9hcmNoc3lzdGVtcy9odGRvY3Mvd3AtY29udGVudC90aGVtZXMvYXJjaHN5c3RlbXMvdmVuZG9yL29tZy1maWVsZHMvbm9kZV9tb2R1bGVzL3RpY2t5L3RpY2t5LWJyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBhcHBseSA9IEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseTtcblxuLy8gRE9NIEFQSXMsIGZvciBjb21wbGV0ZW5lc3NcblxuZXhwb3J0cy5zZXRUaW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldFRpbWVvdXQsIHdpbmRvdywgYXJndW1lbnRzKSwgY2xlYXJUaW1lb3V0KTtcbn07XG5leHBvcnRzLnNldEludGVydmFsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldEludGVydmFsLCB3aW5kb3csIGFyZ3VtZW50cyksIGNsZWFySW50ZXJ2YWwpO1xufTtcbmV4cG9ydHMuY2xlYXJUaW1lb3V0ID1cbmV4cG9ydHMuY2xlYXJJbnRlcnZhbCA9IGZ1bmN0aW9uKHRpbWVvdXQpIHtcbiAgaWYgKHRpbWVvdXQpIHtcbiAgICB0aW1lb3V0LmNsb3NlKCk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIFRpbWVvdXQoaWQsIGNsZWFyRm4pIHtcbiAgdGhpcy5faWQgPSBpZDtcbiAgdGhpcy5fY2xlYXJGbiA9IGNsZWFyRm47XG59XG5UaW1lb3V0LnByb3RvdHlwZS51bnJlZiA9IFRpbWVvdXQucHJvdG90eXBlLnJlZiA9IGZ1bmN0aW9uKCkge307XG5UaW1lb3V0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9jbGVhckZuLmNhbGwod2luZG93LCB0aGlzLl9pZCk7XG59O1xuXG4vLyBEb2VzIG5vdCBzdGFydCB0aGUgdGltZSwganVzdCBzZXRzIHVwIHRoZSBtZW1iZXJzIG5lZWRlZC5cbmV4cG9ydHMuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSwgbXNlY3MpIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IG1zZWNzO1xufTtcblxuZXhwb3J0cy51bmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IC0xO1xufTtcblxuZXhwb3J0cy5fdW5yZWZBY3RpdmUgPSBleHBvcnRzLmFjdGl2ZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuXG4gIHZhciBtc2VjcyA9IGl0ZW0uX2lkbGVUaW1lb3V0O1xuICBpZiAobXNlY3MgPj0gMCkge1xuICAgIGl0ZW0uX2lkbGVUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uIG9uVGltZW91dCgpIHtcbiAgICAgIGlmIChpdGVtLl9vblRpbWVvdXQpXG4gICAgICAgIGl0ZW0uX29uVGltZW91dCgpO1xuICAgIH0sIG1zZWNzKTtcbiAgfVxufTtcblxuLy8gc2V0aW1tZWRpYXRlIGF0dGFjaGVzIGl0c2VsZiB0byB0aGUgZ2xvYmFsIG9iamVjdFxucmVxdWlyZShcInNldGltbWVkaWF0ZVwiKTtcbi8vIE9uIHNvbWUgZXhvdGljIGVudmlyb25tZW50cywgaXQncyBub3QgY2xlYXIgd2hpY2ggb2JqZWN0IGBzZXRpbW1laWRhdGVgIHdhc1xuLy8gYWJsZSB0byBpbnN0YWxsIG9udG8uICBTZWFyY2ggZWFjaCBwb3NzaWJpbGl0eSBpbiB0aGUgc2FtZSBvcmRlciBhcyB0aGVcbi8vIGBzZXRpbW1lZGlhdGVgIGxpYnJhcnkuXG5leHBvcnRzLnNldEltbWVkaWF0ZSA9ICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmLnNldEltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsLnNldEltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMgJiYgdGhpcy5zZXRJbW1lZGlhdGUpO1xuZXhwb3J0cy5jbGVhckltbWVkaWF0ZSA9ICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmLmNsZWFySW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbC5jbGVhckltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAodGhpcyAmJiB0aGlzLmNsZWFySW1tZWRpYXRlKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC9Vc2Vycy9ib2JieS9TaXRlcy9hcmNoc3lzdGVtcy9odGRvY3Mvd3AtY29udGVudC90aGVtZXMvYXJjaHN5c3RlbXMvdmVuZG9yL29tZy1maWVsZHMvbm9kZV9tb2R1bGVzL3RpbWVycy1icm93c2VyaWZ5L21haW4uanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIihmdW5jdGlvbiAoZ2xvYmFsLCB1bmRlZmluZWQpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGlmIChnbG9iYWwuc2V0SW1tZWRpYXRlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgbmV4dEhhbmRsZSA9IDE7IC8vIFNwZWMgc2F5cyBncmVhdGVyIHRoYW4gemVyb1xuICAgIHZhciB0YXNrc0J5SGFuZGxlID0ge307XG4gICAgdmFyIGN1cnJlbnRseVJ1bm5pbmdBVGFzayA9IGZhbHNlO1xuICAgIHZhciBkb2MgPSBnbG9iYWwuZG9jdW1lbnQ7XG4gICAgdmFyIHJlZ2lzdGVySW1tZWRpYXRlO1xuXG4gICAgZnVuY3Rpb24gc2V0SW1tZWRpYXRlKGNhbGxiYWNrKSB7XG4gICAgICAvLyBDYWxsYmFjayBjYW4gZWl0aGVyIGJlIGEgZnVuY3Rpb24gb3IgYSBzdHJpbmdcbiAgICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBjYWxsYmFjayA9IG5ldyBGdW5jdGlvbihcIlwiICsgY2FsbGJhY2spO1xuICAgICAgfVxuICAgICAgLy8gQ29weSBmdW5jdGlvbiBhcmd1bWVudHNcbiAgICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaSArIDFdO1xuICAgICAgfVxuICAgICAgLy8gU3RvcmUgYW5kIHJlZ2lzdGVyIHRoZSB0YXNrXG4gICAgICB2YXIgdGFzayA9IHsgY2FsbGJhY2s6IGNhbGxiYWNrLCBhcmdzOiBhcmdzIH07XG4gICAgICB0YXNrc0J5SGFuZGxlW25leHRIYW5kbGVdID0gdGFzaztcbiAgICAgIHJlZ2lzdGVySW1tZWRpYXRlKG5leHRIYW5kbGUpO1xuICAgICAgcmV0dXJuIG5leHRIYW5kbGUrKztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhckltbWVkaWF0ZShoYW5kbGUpIHtcbiAgICAgICAgZGVsZXRlIHRhc2tzQnlIYW5kbGVbaGFuZGxlXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW4odGFzaykge1xuICAgICAgICB2YXIgY2FsbGJhY2sgPSB0YXNrLmNhbGxiYWNrO1xuICAgICAgICB2YXIgYXJncyA9IHRhc2suYXJncztcbiAgICAgICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIGNhbGxiYWNrKGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjYWxsYmFjay5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW5JZlByZXNlbnQoaGFuZGxlKSB7XG4gICAgICAgIC8vIEZyb20gdGhlIHNwZWM6IFwiV2FpdCB1bnRpbCBhbnkgaW52b2NhdGlvbnMgb2YgdGhpcyBhbGdvcml0aG0gc3RhcnRlZCBiZWZvcmUgdGhpcyBvbmUgaGF2ZSBjb21wbGV0ZWQuXCJcbiAgICAgICAgLy8gU28gaWYgd2UncmUgY3VycmVudGx5IHJ1bm5pbmcgYSB0YXNrLCB3ZSdsbCBuZWVkIHRvIGRlbGF5IHRoaXMgaW52b2NhdGlvbi5cbiAgICAgICAgaWYgKGN1cnJlbnRseVJ1bm5pbmdBVGFzaykge1xuICAgICAgICAgICAgLy8gRGVsYXkgYnkgZG9pbmcgYSBzZXRUaW1lb3V0LiBzZXRJbW1lZGlhdGUgd2FzIHRyaWVkIGluc3RlYWQsIGJ1dCBpbiBGaXJlZm94IDcgaXQgZ2VuZXJhdGVkIGFcbiAgICAgICAgICAgIC8vIFwidG9vIG11Y2ggcmVjdXJzaW9uXCIgZXJyb3IuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJ1bklmUHJlc2VudCwgMCwgaGFuZGxlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciB0YXNrID0gdGFza3NCeUhhbmRsZVtoYW5kbGVdO1xuICAgICAgICAgICAgaWYgKHRhc2spIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJ1bih0YXNrKTtcbiAgICAgICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhckltbWVkaWF0ZShoYW5kbGUpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsTmV4dFRpY2tJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIHByb2Nlc3MubmV4dFRpY2soZnVuY3Rpb24gKCkgeyBydW5JZlByZXNlbnQoaGFuZGxlKTsgfSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FuVXNlUG9zdE1lc3NhZ2UoKSB7XG4gICAgICAgIC8vIFRoZSB0ZXN0IGFnYWluc3QgYGltcG9ydFNjcmlwdHNgIHByZXZlbnRzIHRoaXMgaW1wbGVtZW50YXRpb24gZnJvbSBiZWluZyBpbnN0YWxsZWQgaW5zaWRlIGEgd2ViIHdvcmtlcixcbiAgICAgICAgLy8gd2hlcmUgYGdsb2JhbC5wb3N0TWVzc2FnZWAgbWVhbnMgc29tZXRoaW5nIGNvbXBsZXRlbHkgZGlmZmVyZW50IGFuZCBjYW4ndCBiZSB1c2VkIGZvciB0aGlzIHB1cnBvc2UuXG4gICAgICAgIGlmIChnbG9iYWwucG9zdE1lc3NhZ2UgJiYgIWdsb2JhbC5pbXBvcnRTY3JpcHRzKSB7XG4gICAgICAgICAgICB2YXIgcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cyA9IHRydWU7XG4gICAgICAgICAgICB2YXIgb2xkT25NZXNzYWdlID0gZ2xvYmFsLm9ubWVzc2FnZTtcbiAgICAgICAgICAgIGdsb2JhbC5vbm1lc3NhZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBwb3N0TWVzc2FnZUlzQXN5bmNocm9ub3VzID0gZmFsc2U7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKFwiXCIsIFwiKlwiKTtcbiAgICAgICAgICAgIGdsb2JhbC5vbm1lc3NhZ2UgPSBvbGRPbk1lc3NhZ2U7XG4gICAgICAgICAgICByZXR1cm4gcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxQb3N0TWVzc2FnZUltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICAvLyBJbnN0YWxscyBhbiBldmVudCBoYW5kbGVyIG9uIGBnbG9iYWxgIGZvciB0aGUgYG1lc3NhZ2VgIGV2ZW50OiBzZWVcbiAgICAgICAgLy8gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9ET00vd2luZG93LnBvc3RNZXNzYWdlXG4gICAgICAgIC8vICogaHR0cDovL3d3dy53aGF0d2cub3JnL3NwZWNzL3dlYi1hcHBzL2N1cnJlbnQtd29yay9tdWx0aXBhZ2UvY29tbXMuaHRtbCNjcm9zc0RvY3VtZW50TWVzc2FnZXNcblxuICAgICAgICB2YXIgbWVzc2FnZVByZWZpeCA9IFwic2V0SW1tZWRpYXRlJFwiICsgTWF0aC5yYW5kb20oKSArIFwiJFwiO1xuICAgICAgICB2YXIgb25HbG9iYWxNZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmIChldmVudC5zb3VyY2UgPT09IGdsb2JhbCAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZiBldmVudC5kYXRhID09PSBcInN0cmluZ1wiICYmXG4gICAgICAgICAgICAgICAgZXZlbnQuZGF0YS5pbmRleE9mKG1lc3NhZ2VQcmVmaXgpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcnVuSWZQcmVzZW50KCtldmVudC5kYXRhLnNsaWNlKG1lc3NhZ2VQcmVmaXgubGVuZ3RoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1lc3NhZ2VcIiwgb25HbG9iYWxNZXNzYWdlLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnbG9iYWwuYXR0YWNoRXZlbnQoXCJvbm1lc3NhZ2VcIiwgb25HbG9iYWxNZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBnbG9iYWwucG9zdE1lc3NhZ2UobWVzc2FnZVByZWZpeCArIGhhbmRsZSwgXCIqXCIpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxNZXNzYWdlQ2hhbm5lbEltcGxlbWVudGF0aW9uKCkge1xuICAgICAgICB2YXIgY2hhbm5lbCA9IG5ldyBNZXNzYWdlQ2hhbm5lbCgpO1xuICAgICAgICBjaGFubmVsLnBvcnQxLm9ubWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgaGFuZGxlID0gZXZlbnQuZGF0YTtcbiAgICAgICAgICAgIHJ1bklmUHJlc2VudChoYW5kbGUpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBjaGFubmVsLnBvcnQyLnBvc3RNZXNzYWdlKGhhbmRsZSk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFJlYWR5U3RhdGVDaGFuZ2VJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgdmFyIGh0bWwgPSBkb2MuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgPHNjcmlwdD4gZWxlbWVudDsgaXRzIHJlYWR5c3RhdGVjaGFuZ2UgZXZlbnQgd2lsbCBiZSBmaXJlZCBhc3luY2hyb25vdXNseSBvbmNlIGl0IGlzIGluc2VydGVkXG4gICAgICAgICAgICAvLyBpbnRvIHRoZSBkb2N1bWVudC4gRG8gc28sIHRodXMgcXVldWluZyB1cCB0aGUgdGFzay4gUmVtZW1iZXIgdG8gY2xlYW4gdXAgb25jZSBpdCdzIGJlZW4gY2FsbGVkLlxuICAgICAgICAgICAgdmFyIHNjcmlwdCA9IGRvYy5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBydW5JZlByZXNlbnQoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcbiAgICAgICAgICAgICAgICBodG1sLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG4gICAgICAgICAgICAgICAgc2NyaXB0ID0gbnVsbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBodG1sLmFwcGVuZENoaWxkKHNjcmlwdCk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbFNldFRpbWVvdXRJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQocnVuSWZQcmVzZW50LCAwLCBoYW5kbGUpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIElmIHN1cHBvcnRlZCwgd2Ugc2hvdWxkIGF0dGFjaCB0byB0aGUgcHJvdG90eXBlIG9mIGdsb2JhbCwgc2luY2UgdGhhdCBpcyB3aGVyZSBzZXRUaW1lb3V0IGV0IGFsLiBsaXZlLlxuICAgIHZhciBhdHRhY2hUbyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoZ2xvYmFsKTtcbiAgICBhdHRhY2hUbyA9IGF0dGFjaFRvICYmIGF0dGFjaFRvLnNldFRpbWVvdXQgPyBhdHRhY2hUbyA6IGdsb2JhbDtcblxuICAgIC8vIERvbid0IGdldCBmb29sZWQgYnkgZS5nLiBicm93c2VyaWZ5IGVudmlyb25tZW50cy5cbiAgICBpZiAoe30udG9TdHJpbmcuY2FsbChnbG9iYWwucHJvY2VzcykgPT09IFwiW29iamVjdCBwcm9jZXNzXVwiKSB7XG4gICAgICAgIC8vIEZvciBOb2RlLmpzIGJlZm9yZSAwLjlcbiAgICAgICAgaW5zdGFsbE5leHRUaWNrSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoY2FuVXNlUG9zdE1lc3NhZ2UoKSkge1xuICAgICAgICAvLyBGb3Igbm9uLUlFMTAgbW9kZXJuIGJyb3dzZXJzXG4gICAgICAgIGluc3RhbGxQb3N0TWVzc2FnZUltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGdsb2JhbC5NZXNzYWdlQ2hhbm5lbCkge1xuICAgICAgICAvLyBGb3Igd2ViIHdvcmtlcnMsIHdoZXJlIHN1cHBvcnRlZFxuICAgICAgICBpbnN0YWxsTWVzc2FnZUNoYW5uZWxJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChkb2MgJiYgXCJvbnJlYWR5c3RhdGVjaGFuZ2VcIiBpbiBkb2MuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKSkge1xuICAgICAgICAvLyBGb3IgSUUgNuKAkzhcbiAgICAgICAgaW5zdGFsbFJlYWR5U3RhdGVDaGFuZ2VJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gRm9yIG9sZGVyIGJyb3dzZXJzXG4gICAgICAgIGluc3RhbGxTZXRUaW1lb3V0SW1wbGVtZW50YXRpb24oKTtcbiAgICB9XG5cbiAgICBhdHRhY2hUby5zZXRJbW1lZGlhdGUgPSBzZXRJbW1lZGlhdGU7XG4gICAgYXR0YWNoVG8uY2xlYXJJbW1lZGlhdGUgPSBjbGVhckltbWVkaWF0ZTtcbn0odHlwZW9mIHNlbGYgPT09IFwidW5kZWZpbmVkXCIgPyB0eXBlb2YgZ2xvYmFsID09PSBcInVuZGVmaW5lZFwiID8gdGhpcyA6IGdsb2JhbCA6IHNlbGYpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC9Vc2Vycy9ib2JieS9TaXRlcy9hcmNoc3lzdGVtcy9odGRvY3Mvd3AtY29udGVudC90aGVtZXMvYXJjaHN5c3RlbXMvdmVuZG9yL29tZy1maWVsZHMvbm9kZV9tb2R1bGVzL3NldGltbWVkaWF0ZS9zZXRJbW1lZGlhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAvVXNlcnMvYm9iYnkvU2l0ZXMvYXJjaHN5c3RlbXMvaHRkb2NzL3dwLWNvbnRlbnQvdGhlbWVzL2FyY2hzeXN0ZW1zL3ZlbmRvci9vbWctZmllbGRzL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIGN1c3RvbUV2ZW50ID0gcmVxdWlyZSgnY3VzdG9tLWV2ZW50Jyk7XG52YXIgZXZlbnRtYXAgPSByZXF1aXJlKCcuL2V2ZW50bWFwJyk7XG52YXIgZG9jID0gZ2xvYmFsLmRvY3VtZW50O1xudmFyIGFkZEV2ZW50ID0gYWRkRXZlbnRFYXN5O1xudmFyIHJlbW92ZUV2ZW50ID0gcmVtb3ZlRXZlbnRFYXN5O1xudmFyIGhhcmRDYWNoZSA9IFtdO1xuXG5pZiAoIWdsb2JhbC5hZGRFdmVudExpc3RlbmVyKSB7XG4gIGFkZEV2ZW50ID0gYWRkRXZlbnRIYXJkO1xuICByZW1vdmVFdmVudCA9IHJlbW92ZUV2ZW50SGFyZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFkZDogYWRkRXZlbnQsXG4gIHJlbW92ZTogcmVtb3ZlRXZlbnQsXG4gIGZhYnJpY2F0ZTogZmFicmljYXRlRXZlbnRcbn07XG5cbmZ1bmN0aW9uIGFkZEV2ZW50RWFzeSAoZWwsIHR5cGUsIGZuLCBjYXB0dXJpbmcpIHtcbiAgcmV0dXJuIGVsLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgZm4sIGNhcHR1cmluZyk7XG59XG5cbmZ1bmN0aW9uIGFkZEV2ZW50SGFyZCAoZWwsIHR5cGUsIGZuKSB7XG4gIHJldHVybiBlbC5hdHRhY2hFdmVudCgnb24nICsgdHlwZSwgd3JhcChlbCwgdHlwZSwgZm4pKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlRXZlbnRFYXN5IChlbCwgdHlwZSwgZm4sIGNhcHR1cmluZykge1xuICByZXR1cm4gZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBmbiwgY2FwdHVyaW5nKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlRXZlbnRIYXJkIChlbCwgdHlwZSwgZm4pIHtcbiAgdmFyIGxpc3RlbmVyID0gdW53cmFwKGVsLCB0eXBlLCBmbik7XG4gIGlmIChsaXN0ZW5lcikge1xuICAgIHJldHVybiBlbC5kZXRhY2hFdmVudCgnb24nICsgdHlwZSwgbGlzdGVuZXIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZhYnJpY2F0ZUV2ZW50IChlbCwgdHlwZSwgbW9kZWwpIHtcbiAgdmFyIGUgPSBldmVudG1hcC5pbmRleE9mKHR5cGUpID09PSAtMSA/IG1ha2VDdXN0b21FdmVudCgpIDogbWFrZUNsYXNzaWNFdmVudCgpO1xuICBpZiAoZWwuZGlzcGF0Y2hFdmVudCkge1xuICAgIGVsLmRpc3BhdGNoRXZlbnQoZSk7XG4gIH0gZWxzZSB7XG4gICAgZWwuZmlyZUV2ZW50KCdvbicgKyB0eXBlLCBlKTtcbiAgfVxuICBmdW5jdGlvbiBtYWtlQ2xhc3NpY0V2ZW50ICgpIHtcbiAgICB2YXIgZTtcbiAgICBpZiAoZG9jLmNyZWF0ZUV2ZW50KSB7XG4gICAgICBlID0gZG9jLmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICAgICAgZS5pbml0RXZlbnQodHlwZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgfSBlbHNlIGlmIChkb2MuY3JlYXRlRXZlbnRPYmplY3QpIHtcbiAgICAgIGUgPSBkb2MuY3JlYXRlRXZlbnRPYmplY3QoKTtcbiAgICB9XG4gICAgcmV0dXJuIGU7XG4gIH1cbiAgZnVuY3Rpb24gbWFrZUN1c3RvbUV2ZW50ICgpIHtcbiAgICByZXR1cm4gbmV3IGN1c3RvbUV2ZW50KHR5cGUsIHsgZGV0YWlsOiBtb2RlbCB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiB3cmFwcGVyRmFjdG9yeSAoZWwsIHR5cGUsIGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwcGVyIChvcmlnaW5hbEV2ZW50KSB7XG4gICAgdmFyIGUgPSBvcmlnaW5hbEV2ZW50IHx8IGdsb2JhbC5ldmVudDtcbiAgICBlLnRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcbiAgICBlLnByZXZlbnREZWZhdWx0ID0gZS5wcmV2ZW50RGVmYXVsdCB8fCBmdW5jdGlvbiBwcmV2ZW50RGVmYXVsdCAoKSB7IGUucmV0dXJuVmFsdWUgPSBmYWxzZTsgfTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbiA9IGUuc3RvcFByb3BhZ2F0aW9uIHx8IGZ1bmN0aW9uIHN0b3BQcm9wYWdhdGlvbiAoKSB7IGUuY2FuY2VsQnViYmxlID0gdHJ1ZTsgfTtcbiAgICBlLndoaWNoID0gZS53aGljaCB8fCBlLmtleUNvZGU7XG4gICAgZm4uY2FsbChlbCwgZSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHdyYXAgKGVsLCB0eXBlLCBmbikge1xuICB2YXIgd3JhcHBlciA9IHVud3JhcChlbCwgdHlwZSwgZm4pIHx8IHdyYXBwZXJGYWN0b3J5KGVsLCB0eXBlLCBmbik7XG4gIGhhcmRDYWNoZS5wdXNoKHtcbiAgICB3cmFwcGVyOiB3cmFwcGVyLFxuICAgIGVsZW1lbnQ6IGVsLFxuICAgIHR5cGU6IHR5cGUsXG4gICAgZm46IGZuXG4gIH0pO1xuICByZXR1cm4gd3JhcHBlcjtcbn1cblxuZnVuY3Rpb24gdW53cmFwIChlbCwgdHlwZSwgZm4pIHtcbiAgdmFyIGkgPSBmaW5kKGVsLCB0eXBlLCBmbik7XG4gIGlmIChpKSB7XG4gICAgdmFyIHdyYXBwZXIgPSBoYXJkQ2FjaGVbaV0ud3JhcHBlcjtcbiAgICBoYXJkQ2FjaGUuc3BsaWNlKGksIDEpOyAvLyBmcmVlIHVwIGEgdGFkIG9mIG1lbW9yeVxuICAgIHJldHVybiB3cmFwcGVyO1xuICB9XG59XG5cbmZ1bmN0aW9uIGZpbmQgKGVsLCB0eXBlLCBmbikge1xuICB2YXIgaSwgaXRlbTtcbiAgZm9yIChpID0gMDsgaSA8IGhhcmRDYWNoZS5sZW5ndGg7IGkrKykge1xuICAgIGl0ZW0gPSBoYXJkQ2FjaGVbaV07XG4gICAgaWYgKGl0ZW0uZWxlbWVudCA9PT0gZWwgJiYgaXRlbS50eXBlID09PSB0eXBlICYmIGl0ZW0uZm4gPT09IGZuKSB7XG4gICAgICByZXR1cm4gaTtcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC9Vc2Vycy9ib2JieS9TaXRlcy9hcmNoc3lzdGVtcy9odGRvY3Mvd3AtY29udGVudC90aGVtZXMvYXJjaHN5c3RlbXMvdmVuZG9yL29tZy1maWVsZHMvbm9kZV9tb2R1bGVzL2Nyb3NzdmVudC9zcmMvY3Jvc3N2ZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbnZhciBOYXRpdmVDdXN0b21FdmVudCA9IGdsb2JhbC5DdXN0b21FdmVudDtcblxuZnVuY3Rpb24gdXNlTmF0aXZlICgpIHtcbiAgdHJ5IHtcbiAgICB2YXIgcCA9IG5ldyBOYXRpdmVDdXN0b21FdmVudCgnY2F0JywgeyBkZXRhaWw6IHsgZm9vOiAnYmFyJyB9IH0pO1xuICAgIHJldHVybiAgJ2NhdCcgPT09IHAudHlwZSAmJiAnYmFyJyA9PT0gcC5kZXRhaWwuZm9vO1xuICB9IGNhdGNoIChlKSB7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIENyb3NzLWJyb3dzZXIgYEN1c3RvbUV2ZW50YCBjb25zdHJ1Y3Rvci5cbiAqXG4gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvQ3VzdG9tRXZlbnQuQ3VzdG9tRXZlbnRcbiAqXG4gKiBAcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSB1c2VOYXRpdmUoKSA/IE5hdGl2ZUN1c3RvbUV2ZW50IDpcblxuLy8gSUUgPj0gOVxuJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUV2ZW50ID8gZnVuY3Rpb24gQ3VzdG9tRXZlbnQgKHR5cGUsIHBhcmFtcykge1xuICB2YXIgZSA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICBpZiAocGFyYW1zKSB7XG4gICAgZS5pbml0Q3VzdG9tRXZlbnQodHlwZSwgcGFyYW1zLmJ1YmJsZXMsIHBhcmFtcy5jYW5jZWxhYmxlLCBwYXJhbXMuZGV0YWlsKTtcbiAgfSBlbHNlIHtcbiAgICBlLmluaXRDdXN0b21FdmVudCh0eXBlLCBmYWxzZSwgZmFsc2UsIHZvaWQgMCk7XG4gIH1cbiAgcmV0dXJuIGU7XG59IDpcblxuLy8gSUUgPD0gOFxuZnVuY3Rpb24gQ3VzdG9tRXZlbnQgKHR5cGUsIHBhcmFtcykge1xuICB2YXIgZSA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50T2JqZWN0KCk7XG4gIGUudHlwZSA9IHR5cGU7XG4gIGlmIChwYXJhbXMpIHtcbiAgICBlLmJ1YmJsZXMgPSBCb29sZWFuKHBhcmFtcy5idWJibGVzKTtcbiAgICBlLmNhbmNlbGFibGUgPSBCb29sZWFuKHBhcmFtcy5jYW5jZWxhYmxlKTtcbiAgICBlLmRldGFpbCA9IHBhcmFtcy5kZXRhaWw7XG4gIH0gZWxzZSB7XG4gICAgZS5idWJibGVzID0gZmFsc2U7XG4gICAgZS5jYW5jZWxhYmxlID0gZmFsc2U7XG4gICAgZS5kZXRhaWwgPSB2b2lkIDA7XG4gIH1cbiAgcmV0dXJuIGU7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAvVXNlcnMvYm9iYnkvU2l0ZXMvYXJjaHN5c3RlbXMvaHRkb2NzL3dwLWNvbnRlbnQvdGhlbWVzL2FyY2hzeXN0ZW1zL3ZlbmRvci9vbWctZmllbGRzL25vZGVfbW9kdWxlcy9jdXN0b20tZXZlbnQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIGV2ZW50bWFwID0gW107XG52YXIgZXZlbnRuYW1lID0gJyc7XG52YXIgcm9uID0gL15vbi87XG5cbmZvciAoZXZlbnRuYW1lIGluIGdsb2JhbCkge1xuICBpZiAocm9uLnRlc3QoZXZlbnRuYW1lKSkge1xuICAgIGV2ZW50bWFwLnB1c2goZXZlbnRuYW1lLnNsaWNlKDIpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGV2ZW50bWFwO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gL1VzZXJzL2JvYmJ5L1NpdGVzL2FyY2hzeXN0ZW1zL2h0ZG9jcy93cC1jb250ZW50L3RoZW1lcy9hcmNoc3lzdGVtcy92ZW5kb3Ivb21nLWZpZWxkcy9ub2RlX21vZHVsZXMvY3Jvc3N2ZW50L3NyYy9ldmVudG1hcC5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2FjaGUgPSB7fTtcbnZhciBzdGFydCA9ICcoPzpefFxcXFxzKSc7XG52YXIgZW5kID0gJyg/OlxcXFxzfCQpJztcblxuZnVuY3Rpb24gbG9va3VwQ2xhc3MgKGNsYXNzTmFtZSkge1xuICB2YXIgY2FjaGVkID0gY2FjaGVbY2xhc3NOYW1lXTtcbiAgaWYgKGNhY2hlZCkge1xuICAgIGNhY2hlZC5sYXN0SW5kZXggPSAwO1xuICB9IGVsc2Uge1xuICAgIGNhY2hlW2NsYXNzTmFtZV0gPSBjYWNoZWQgPSBuZXcgUmVnRXhwKHN0YXJ0ICsgY2xhc3NOYW1lICsgZW5kLCAnZycpO1xuICB9XG4gIHJldHVybiBjYWNoZWQ7XG59XG5cbmZ1bmN0aW9uIGFkZENsYXNzIChlbCwgY2xhc3NOYW1lKSB7XG4gIHZhciBjdXJyZW50ID0gZWwuY2xhc3NOYW1lO1xuICBpZiAoIWN1cnJlbnQubGVuZ3RoKSB7XG4gICAgZWwuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuICB9IGVsc2UgaWYgKCFsb29rdXBDbGFzcyhjbGFzc05hbWUpLnRlc3QoY3VycmVudCkpIHtcbiAgICBlbC5jbGFzc05hbWUgKz0gJyAnICsgY2xhc3NOYW1lO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJtQ2xhc3MgKGVsLCBjbGFzc05hbWUpIHtcbiAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UobG9va3VwQ2xhc3MoY2xhc3NOYW1lKSwgJyAnKS50cmltKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBhZGQ6IGFkZENsYXNzLFxuICBybTogcm1DbGFzc1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC9Vc2Vycy9ib2JieS9TaXRlcy9hcmNoc3lzdGVtcy9odGRvY3Mvd3AtY29udGVudC90aGVtZXMvYXJjaHN5c3RlbXMvdmVuZG9yL29tZy1maWVsZHMvbm9kZV9tb2R1bGVzL2RyYWd1bGEvY2xhc3Nlcy5qc1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IGxpc3QgZnJvbSAnLi9saXN0JztcbmltcG9ydCBhdXRvU3VnZ2VzdCBmcm9tICcuL2F1dG9zdWdnZXN0JztcbmltcG9ydCBoaWRkZW4gZnJvbSAnLi9zZXJpYWxpemVkLWlucHV0JztcbmltcG9ydCB7IHJlbW92ZUl0ZW1zLCBkcmFnSXRlbXMsIG9uRHJhZ09iamVjdCwgb25SZW1vdmVPYmplY3QgfSBmcm9tICcuL3V0aWxpdGllcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCBhcmdzICkge1xuXG4gICAgY29uc3QgZmllbGRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChhcmdzLnBhcmVudCk7XG5cbiAgICBpZiAoICEgZmllbGRzICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgW10uZm9yRWFjaC5jYWxsKCBmaWVsZHMsICggYXV0b0xpc3QgKSA9PiB7XG4gICAgICAgIGNvbnN0IEhpZGRlbiA9IGhpZGRlbiggYXV0b0xpc3QsIGFyZ3MuaGlkZGVuICk7XG4gICAgICAgIGNvbnN0IHJlbW92ZSA9IHJlbW92ZUl0ZW1zKCBIaWRkZW4sIG9uUmVtb3ZlT2JqZWN0ICk7XG4gICAgICAgIGNvbnN0IGRyYWcgPSBkcmFnSXRlbXMoIEhpZGRlbiwgb25EcmFnT2JqZWN0ICk7XG4gICAgICAgIGNvbnN0IExpc3QgPSBsaXN0KCBhdXRvTGlzdCwgT2JqZWN0LmFzc2lnbiggYXJncywgeyBvbkRyYWc6IGRyYWcsIG9uUmVtb3ZlOiByZW1vdmV9ICkgKTtcbiAgICAgICAgY29uc3QgaW5wdXQgPSBhdXRvTGlzdC5xdWVyeVNlbGVjdG9yKCAnLmF1dG9zdWdnZXN0LWxpc3QtaW5wdXQnICk7XG4gICAgICAgIGNvbnN0IGVsTmFtZSA9IGBhdXRvTGlzdF8ke2lucHV0LmdldEF0dHJpYnV0ZSggJ2xpc3QnICl9YDtcbiAgICAgICAgY29uc3QgZW5kcG9pbnQgPSBgJHtPTUdGaWVsZHMuYmFzZVVSTH0vd3AtanNvbi93cC92Mi8ke3dpbmRvd1tlbE5hbWVdLnJlc291cmNlfT9zZWFyY2g9YDtcblxuICAgICAgICBhdXRvU3VnZ2VzdCggaW5wdXQsIGVuZHBvaW50LCAodmFsdWUsIGlucHV0KSA9PiB7XG4gICAgICAgICAgICBMaXN0LmFkZCh2YWx1ZSk7XG4gICAgICAgICAgICBpbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgSGlkZGVuLmFkZCggdmFsdWUgKTtcbiAgICAgICAgfSk7XG4gICAgfSApO1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vYXV0b3N1Z2dlc3QtbGlzdC5qcyIsImltcG9ydCBhdXRvU3VnZ2VzdCBmcm9tICcuL2F1dG9zdWdnZXN0JztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYXJncykge1xuICBjb25zdCBmaWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGFyZ3MucGFyZW50KTtcblxuICBpZiAoIWZpZWxkcykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIFtdLmZvckVhY2guY2FsbChmaWVsZHMsIGF1dG9JdGVtID0+IHtcbiAgICBjb25zdCBoaWRkZW4gPSBhdXRvSXRlbS5xdWVyeVNlbGVjdG9yKGFyZ3MuaGlkZGVuKTtcbiAgICBjb25zdCBpbnB1dCA9IGF1dG9JdGVtLnF1ZXJ5U2VsZWN0b3IoJy5hdXRvc3VnZ2VzdC1pbnB1dCcpO1xuICAgIGNvbnN0IGVsTmFtZSA9IGBhdXRvTGlzdF8ke2lucHV0LmdldEF0dHJpYnV0ZSgnbGlzdCcpfWA7XG4gICAgbGV0IGVuZHBvaW50O1xuXG4gICAgaWYgKHdpbmRvd1tlbE5hbWVdLm5hbWVzcGFjZSkge1xuICAgICAgZW5kcG9pbnQgPSBgJHtPTUdGaWVsZHMuYmFzZVVSTH0vd3AtanNvbi8ke3dpbmRvd1tlbE5hbWVdLm5hbWVzcGFjZX0vJHtcbiAgICAgICAgd2luZG93W2VsTmFtZV0ucmVzb3VyY2VcbiAgICAgIH0/c2VhcmNoPWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVuZHBvaW50ID0gYCR7T01HRmllbGRzLmJhc2VVUkx9L3dwLWpzb24vd3AvdjIvJHtcbiAgICAgICAgd2luZG93W2VsTmFtZV0ucmVzb3VyY2VcbiAgICAgIH0/c2VhcmNoPWA7XG4gICAgfVxuXG4gICAgYXV0b1N1Z2dlc3QoXG4gICAgICBpbnB1dCxcbiAgICAgIGVuZHBvaW50LFxuICAgICAgKHZhbHVlLCBpbnB1dCkgPT4ge1xuICAgICAgICBoaWRkZW4udmFsdWUgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgICB9LFxuICAgICAgKCkgPT4ge1xuICAgICAgICBoaWRkZW4udmFsdWUgPSAnJztcbiAgICAgIH0sXG4gICAgKTtcbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9hdXRvLWl0ZW0uanMiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpbWFnZVVwbG9hZHMoKSB7XG5cdHZhciBmZWF0dXJlZEltYWdlV3JhcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jdXN0b20tbWVkaWEtdXBsb2FkJyk7XG5cblx0aWYgKCBmZWF0dXJlZEltYWdlV3JhcC5sZW5ndGggPT09IDAgKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0W10ubWFwLmNhbGwoIGZlYXR1cmVkSW1hZ2VXcmFwLCBmdW5jdGlvbihpdGVtKSB7XG5cdFx0Ly8gdmFyIEltYWdlV3JhcElkID0gaXRlbS5hdHRyaWJ1dGUuaWQ7XG5cdFx0dmFyIHJlbW92ZUltYWdlID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcucmVtb3ZlLWltYWdlJyk7XG5cdFx0dmFyIHJlcGxhY2VJbWFnZSA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLnJlcGxhY2UtaW1hZ2UnKTtcblx0XHR2YXIgc2V0SW1hZ2UgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5zZXQtaW1hZ2UnKTtcblx0XHR2YXIgZmVhdHVyZWRJbWFnZVRhZyA9IGl0ZW0ucXVlcnlTZWxlY3RvcignYS5yZXBsYWNlLWltYWdlIGltZycpO1xuXHRcdHZhciBmZWF0dXJlZEltYWdlSUQgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9XCJoaWRkZW5cIl0nKTtcblx0XHR2YXIgZmVhdHVyZWRJbWFnZVRpdGxlID0gaXRlbS5xdWVyeVNlbGVjdG9yKCAnLnRodW1ibmFpbC10aXRsZScgKTtcblx0XHR2YXIgbWVkaWFGcmFtZSA9IHdwLm1lZGlhKHtcblx0XHRcdHRpdGxlOiAnQ2hvb3NlIE1lZGlhJyxcblx0XHRcdGJ1dHRvbjoge1xuXHRcdFx0XHR0ZXh0OiAnVXNlIFNlbGVjdGVkIE1lZGlhJ1xuXHRcdFx0fSxcblx0XHRcdG11bHRpcGxlOiBmYWxzZVxuXHRcdH0pO1xuXG5cdFx0bWVkaWFGcmFtZS5vbignc2VsZWN0JywgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgYXR0YWNobWVudCA9IG1lZGlhRnJhbWUuc3RhdGUoKS5nZXQoJ3NlbGVjdGlvbicpLmZpcnN0KCkudG9KU09OKCk7XG5cblx0XHRcdGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZSgnaGFzLWltYWdlJyk7XG5cdFx0XHRmZWF0dXJlZEltYWdlSUQudmFsdWUgPSBhdHRhY2htZW50LmlkO1xuXHRcdFx0aWYgKGF0dGFjaG1lbnQuaGFzT3duUHJvcGVydHkoJ3NpemVzJykpIHtcblx0XHRcdFx0ZmVhdHVyZWRJbWFnZVRhZy5zZXRBdHRyaWJ1dGUoJ3NyYycsIGF0dGFjaG1lbnQuc2l6ZXMudGh1bWJuYWlsLnVybCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmZWF0dXJlZEltYWdlVGFnLnNldEF0dHJpYnV0ZSgnc3JjJywgYXR0YWNobWVudC5pY29uKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCBmZWF0dXJlZEltYWdlVGl0bGUgKSB7XG5cdFx0XHRcdGZlYXR1cmVkSW1hZ2VUaXRsZS5pbm5lckhUTUwgPSBhdHRhY2htZW50LmZpbGVuYW1lO1xuXHRcdFx0fVxuXG5cdFx0fSk7XG5cblx0XHRyZW1vdmVJbWFnZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0aXRlbS5jbGFzc0xpc3QudG9nZ2xlKCdoYXMtaW1hZ2UnKTtcblx0XHRcdGZlYXR1cmVkSW1hZ2VUYWcuc2V0QXR0cmlidXRlKCdzcmMnLCAnJyk7XG5cdFx0XHRmZWF0dXJlZEltYWdlSUQudmFsdWUgPSAnJztcblx0XHR9KTtcblxuXHRcdHJlcGxhY2VJbWFnZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0bWVkaWFGcmFtZS5vcGVuKCk7XG5cdFx0fSk7XG5cblx0XHRzZXRJbWFnZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0bWVkaWFGcmFtZS5vcGVuKCk7XG5cdFx0fSk7XG5cdH0pO1xufTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2ltYWdlLXVwbG9hZHMuanMiLCJpbXBvcnQgZmxhdHBpY2tyIGZyb20gJ2ZsYXRwaWNrcic7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICBjb25zdCBkYXRlcGlja2VycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kYXRlcGlja2VyLWlucHV0Jyk7XG5cbiAgaWYgKCFkYXRlcGlja2Vycykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIFtdLmZvckVhY2guY2FsbChkYXRlcGlja2VycywgZGF0ZUZpZWxkID0+IHtcbiAgICBjb25zdCBjdXJyZW50RGF0ZSA9IGRhdGVGaWVsZC5kYXRhc2V0LmRhdGU7XG5cbiAgICBmbGF0cGlja3IoZGF0ZUZpZWxkLCB7XG4gICAgICBhbHRJbnB1dDogdHJ1ZSxcbiAgICAgIGFsdEZvcm1hdDogJ0YgaiwgWScsXG4gICAgICBkYXRlRm9ybWF0OiAnVScsXG4gICAgICBkZWZhdWx0RGF0ZTogIWN1cnJlbnREYXRlID8gJycgOiBjdXJyZW50RGF0ZSxcbiAgICB9KTtcbiAgfSk7XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9kYXRlcGlja2VyLmpzIiwiLyogZmxhdHBpY2tyIHY0LjMuMiwgQGxpY2Vuc2UgTUlUICovXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuXHR0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBmYWN0b3J5KGV4cG9ydHMpIDpcblx0dHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKFsnZXhwb3J0cyddLCBmYWN0b3J5KSA6XG5cdChmYWN0b3J5KChnbG9iYWwuZmxhdHBpY2tyID0ge30pKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoZXhwb3J0cykgeyAndXNlIHN0cmljdCc7XG5cbi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG5cclxuXHJcbnZhciBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn07XG5cbnZhciBwYWQgPSBmdW5jdGlvbiAobnVtYmVyKSB7IHJldHVybiAoXCIwXCIgKyBudW1iZXIpLnNsaWNlKC0yKTsgfTtcclxudmFyIGludCA9IGZ1bmN0aW9uIChib29sKSB7IHJldHVybiAoYm9vbCA9PT0gdHJ1ZSA/IDEgOiAwKTsgfTtcclxuZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgaW1tZWRpYXRlKSB7XHJcbiAgICBpZiAoaW1tZWRpYXRlID09PSB2b2lkIDApIHsgaW1tZWRpYXRlID0gZmFsc2U7IH1cclxuICAgIHZhciB0aW1lb3V0O1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgY29udGV4dCA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHM7XHJcbiAgICAgICAgdGltZW91dCAhPT0gbnVsbCAmJiBjbGVhclRpbWVvdXQodGltZW91dCk7XHJcbiAgICAgICAgdGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGltZW91dCA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICghaW1tZWRpYXRlKVxyXG4gICAgICAgICAgICAgICAgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTtcclxuICAgICAgICB9LCB3YWl0KTtcclxuICAgICAgICBpZiAoaW1tZWRpYXRlICYmICF0aW1lb3V0KVxyXG4gICAgICAgICAgICBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xyXG4gICAgfTtcclxufVxyXG52YXIgYXJyYXlpZnkgPSBmdW5jdGlvbiAob2JqKSB7XHJcbiAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgQXJyYXkgPyBvYmogOiBbb2JqXTtcclxufTtcblxudmFyIGRvX25vdGhpbmcgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB1bmRlZmluZWQ7IH07XHJcbnZhciByZXZGb3JtYXQgPSB7XHJcbiAgICBEOiBkb19ub3RoaW5nLFxyXG4gICAgRjogZnVuY3Rpb24gKGRhdGVPYmosIG1vbnRoTmFtZSwgbG9jYWxlKSB7XHJcbiAgICAgICAgZGF0ZU9iai5zZXRNb250aChsb2NhbGUubW9udGhzLmxvbmdoYW5kLmluZGV4T2YobW9udGhOYW1lKSk7XHJcbiAgICB9LFxyXG4gICAgRzogZnVuY3Rpb24gKGRhdGVPYmosIGhvdXIpIHtcclxuICAgICAgICBkYXRlT2JqLnNldEhvdXJzKHBhcnNlRmxvYXQoaG91cikpO1xyXG4gICAgfSxcclxuICAgIEg6IGZ1bmN0aW9uIChkYXRlT2JqLCBob3VyKSB7XHJcbiAgICAgICAgZGF0ZU9iai5zZXRIb3VycyhwYXJzZUZsb2F0KGhvdXIpKTtcclxuICAgIH0sXHJcbiAgICBKOiBmdW5jdGlvbiAoZGF0ZU9iaiwgZGF5KSB7XHJcbiAgICAgICAgZGF0ZU9iai5zZXREYXRlKHBhcnNlRmxvYXQoZGF5KSk7XHJcbiAgICB9LFxyXG4gICAgSzogZnVuY3Rpb24gKGRhdGVPYmosIGFtUE0sIGxvY2FsZSkge1xyXG4gICAgICAgIGRhdGVPYmouc2V0SG91cnMoZGF0ZU9iai5nZXRIb3VycygpICUgMTIgK1xyXG4gICAgICAgICAgICAxMiAqIGludChuZXcgUmVnRXhwKGxvY2FsZS5hbVBNWzFdLCBcImlcIikudGVzdChhbVBNKSkpO1xyXG4gICAgfSxcclxuICAgIE06IGZ1bmN0aW9uIChkYXRlT2JqLCBzaG9ydE1vbnRoLCBsb2NhbGUpIHtcclxuICAgICAgICBkYXRlT2JqLnNldE1vbnRoKGxvY2FsZS5tb250aHMuc2hvcnRoYW5kLmluZGV4T2Yoc2hvcnRNb250aCkpO1xyXG4gICAgfSxcclxuICAgIFM6IGZ1bmN0aW9uIChkYXRlT2JqLCBzZWNvbmRzKSB7XHJcbiAgICAgICAgZGF0ZU9iai5zZXRTZWNvbmRzKHBhcnNlRmxvYXQoc2Vjb25kcykpO1xyXG4gICAgfSxcclxuICAgIFU6IGZ1bmN0aW9uIChfLCB1bml4U2Vjb25kcykgeyByZXR1cm4gbmV3IERhdGUocGFyc2VGbG9hdCh1bml4U2Vjb25kcykgKiAxMDAwKTsgfSxcclxuICAgIFc6IGZ1bmN0aW9uIChkYXRlT2JqLCB3ZWVrTnVtKSB7XHJcbiAgICAgICAgdmFyIHdlZWtOdW1iZXIgPSBwYXJzZUludCh3ZWVrTnVtKTtcclxuICAgICAgICByZXR1cm4gbmV3IERhdGUoZGF0ZU9iai5nZXRGdWxsWWVhcigpLCAwLCAyICsgKHdlZWtOdW1iZXIgLSAxKSAqIDcsIDAsIDAsIDAsIDApO1xyXG4gICAgfSxcclxuICAgIFk6IGZ1bmN0aW9uIChkYXRlT2JqLCB5ZWFyKSB7XHJcbiAgICAgICAgZGF0ZU9iai5zZXRGdWxsWWVhcihwYXJzZUZsb2F0KHllYXIpKTtcclxuICAgIH0sXHJcbiAgICBaOiBmdW5jdGlvbiAoXywgSVNPRGF0ZSkgeyByZXR1cm4gbmV3IERhdGUoSVNPRGF0ZSk7IH0sXHJcbiAgICBkOiBmdW5jdGlvbiAoZGF0ZU9iaiwgZGF5KSB7XHJcbiAgICAgICAgZGF0ZU9iai5zZXREYXRlKHBhcnNlRmxvYXQoZGF5KSk7XHJcbiAgICB9LFxyXG4gICAgaDogZnVuY3Rpb24gKGRhdGVPYmosIGhvdXIpIHtcclxuICAgICAgICBkYXRlT2JqLnNldEhvdXJzKHBhcnNlRmxvYXQoaG91cikpO1xyXG4gICAgfSxcclxuICAgIGk6IGZ1bmN0aW9uIChkYXRlT2JqLCBtaW51dGVzKSB7XHJcbiAgICAgICAgZGF0ZU9iai5zZXRNaW51dGVzKHBhcnNlRmxvYXQobWludXRlcykpO1xyXG4gICAgfSxcclxuICAgIGo6IGZ1bmN0aW9uIChkYXRlT2JqLCBkYXkpIHtcclxuICAgICAgICBkYXRlT2JqLnNldERhdGUocGFyc2VGbG9hdChkYXkpKTtcclxuICAgIH0sXHJcbiAgICBsOiBkb19ub3RoaW5nLFxyXG4gICAgbTogZnVuY3Rpb24gKGRhdGVPYmosIG1vbnRoKSB7XHJcbiAgICAgICAgZGF0ZU9iai5zZXRNb250aChwYXJzZUZsb2F0KG1vbnRoKSAtIDEpO1xyXG4gICAgfSxcclxuICAgIG46IGZ1bmN0aW9uIChkYXRlT2JqLCBtb250aCkge1xyXG4gICAgICAgIGRhdGVPYmouc2V0TW9udGgocGFyc2VGbG9hdChtb250aCkgLSAxKTtcclxuICAgIH0sXHJcbiAgICBzOiBmdW5jdGlvbiAoZGF0ZU9iaiwgc2Vjb25kcykge1xyXG4gICAgICAgIGRhdGVPYmouc2V0U2Vjb25kcyhwYXJzZUZsb2F0KHNlY29uZHMpKTtcclxuICAgIH0sXHJcbiAgICB3OiBkb19ub3RoaW5nLFxyXG4gICAgeTogZnVuY3Rpb24gKGRhdGVPYmosIHllYXIpIHtcclxuICAgICAgICBkYXRlT2JqLnNldEZ1bGxZZWFyKDIwMDAgKyBwYXJzZUZsb2F0KHllYXIpKTtcclxuICAgIH0sXHJcbn07XHJcbnZhciB0b2tlblJlZ2V4ID0ge1xyXG4gICAgRDogXCIoXFxcXHcrKVwiLFxyXG4gICAgRjogXCIoXFxcXHcrKVwiLFxyXG4gICAgRzogXCIoXFxcXGRcXFxcZHxcXFxcZClcIixcclxuICAgIEg6IFwiKFxcXFxkXFxcXGR8XFxcXGQpXCIsXHJcbiAgICBKOiBcIihcXFxcZFxcXFxkfFxcXFxkKVxcXFx3K1wiLFxyXG4gICAgSzogXCJcIixcclxuICAgIE06IFwiKFxcXFx3KylcIixcclxuICAgIFM6IFwiKFxcXFxkXFxcXGR8XFxcXGQpXCIsXHJcbiAgICBVOiBcIiguKylcIixcclxuICAgIFc6IFwiKFxcXFxkXFxcXGR8XFxcXGQpXCIsXHJcbiAgICBZOiBcIihcXFxcZHs0fSlcIixcclxuICAgIFo6IFwiKC4rKVwiLFxyXG4gICAgZDogXCIoXFxcXGRcXFxcZHxcXFxcZClcIixcclxuICAgIGg6IFwiKFxcXFxkXFxcXGR8XFxcXGQpXCIsXHJcbiAgICBpOiBcIihcXFxcZFxcXFxkfFxcXFxkKVwiLFxyXG4gICAgajogXCIoXFxcXGRcXFxcZHxcXFxcZClcIixcclxuICAgIGw6IFwiKFxcXFx3KylcIixcclxuICAgIG06IFwiKFxcXFxkXFxcXGR8XFxcXGQpXCIsXHJcbiAgICBuOiBcIihcXFxcZFxcXFxkfFxcXFxkKVwiLFxyXG4gICAgczogXCIoXFxcXGRcXFxcZHxcXFxcZClcIixcclxuICAgIHc6IFwiKFxcXFxkXFxcXGR8XFxcXGQpXCIsXHJcbiAgICB5OiBcIihcXFxcZHsyfSlcIixcclxufTtcclxudmFyIGZvcm1hdHMgPSB7XHJcbiAgICBaOiBmdW5jdGlvbiAoZGF0ZSkgeyByZXR1cm4gZGF0ZS50b0lTT1N0cmluZygpOyB9LFxyXG4gICAgRDogZnVuY3Rpb24gKGRhdGUsIGxvY2FsZSwgb3B0aW9ucykge1xyXG4gICAgICAgIHJldHVybiBsb2NhbGUud2Vla2RheXMuc2hvcnRoYW5kW2Zvcm1hdHMudyhkYXRlLCBsb2NhbGUsIG9wdGlvbnMpXTtcclxuICAgIH0sXHJcbiAgICBGOiBmdW5jdGlvbiAoZGF0ZSwgbG9jYWxlLCBvcHRpb25zKSB7XHJcbiAgICAgICAgcmV0dXJuIG1vbnRoVG9TdHIoZm9ybWF0cy5uKGRhdGUsIGxvY2FsZSwgb3B0aW9ucykgLSAxLCBmYWxzZSwgbG9jYWxlKTtcclxuICAgIH0sXHJcbiAgICBHOiBmdW5jdGlvbiAoZGF0ZSwgbG9jYWxlLCBvcHRpb25zKSB7XHJcbiAgICAgICAgcmV0dXJuIHBhZChmb3JtYXRzLmgoZGF0ZSwgbG9jYWxlLCBvcHRpb25zKSk7XHJcbiAgICB9LFxyXG4gICAgSDogZnVuY3Rpb24gKGRhdGUpIHsgcmV0dXJuIHBhZChkYXRlLmdldEhvdXJzKCkpOyB9LFxyXG4gICAgSjogZnVuY3Rpb24gKGRhdGUsIGxvY2FsZSkge1xyXG4gICAgICAgIHJldHVybiBsb2NhbGUub3JkaW5hbCAhPT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgID8gZGF0ZS5nZXREYXRlKCkgKyBsb2NhbGUub3JkaW5hbChkYXRlLmdldERhdGUoKSlcclxuICAgICAgICAgICAgOiBkYXRlLmdldERhdGUoKTtcclxuICAgIH0sXHJcbiAgICBLOiBmdW5jdGlvbiAoZGF0ZSwgbG9jYWxlKSB7IHJldHVybiBsb2NhbGUuYW1QTVtpbnQoZGF0ZS5nZXRIb3VycygpID4gMTEpXTsgfSxcclxuICAgIE06IGZ1bmN0aW9uIChkYXRlLCBsb2NhbGUpIHtcclxuICAgICAgICByZXR1cm4gbW9udGhUb1N0cihkYXRlLmdldE1vbnRoKCksIHRydWUsIGxvY2FsZSk7XHJcbiAgICB9LFxyXG4gICAgUzogZnVuY3Rpb24gKGRhdGUpIHsgcmV0dXJuIHBhZChkYXRlLmdldFNlY29uZHMoKSk7IH0sXHJcbiAgICBVOiBmdW5jdGlvbiAoZGF0ZSkgeyByZXR1cm4gZGF0ZS5nZXRUaW1lKCkgLyAxMDAwOyB9LFxyXG4gICAgVzogZnVuY3Rpb24gKGRhdGUsIF8sIG9wdGlvbnMpIHtcclxuICAgICAgICByZXR1cm4gb3B0aW9ucy5nZXRXZWVrKGRhdGUpO1xyXG4gICAgfSxcclxuICAgIFk6IGZ1bmN0aW9uIChkYXRlKSB7IHJldHVybiBkYXRlLmdldEZ1bGxZZWFyKCk7IH0sXHJcbiAgICBkOiBmdW5jdGlvbiAoZGF0ZSkgeyByZXR1cm4gcGFkKGRhdGUuZ2V0RGF0ZSgpKTsgfSxcclxuICAgIGg6IGZ1bmN0aW9uIChkYXRlKSB7IHJldHVybiAoZGF0ZS5nZXRIb3VycygpICUgMTIgPyBkYXRlLmdldEhvdXJzKCkgJSAxMiA6IDEyKTsgfSxcclxuICAgIGk6IGZ1bmN0aW9uIChkYXRlKSB7IHJldHVybiBwYWQoZGF0ZS5nZXRNaW51dGVzKCkpOyB9LFxyXG4gICAgajogZnVuY3Rpb24gKGRhdGUpIHsgcmV0dXJuIGRhdGUuZ2V0RGF0ZSgpOyB9LFxyXG4gICAgbDogZnVuY3Rpb24gKGRhdGUsIGxvY2FsZSkge1xyXG4gICAgICAgIHJldHVybiBsb2NhbGUud2Vla2RheXMubG9uZ2hhbmRbZGF0ZS5nZXREYXkoKV07XHJcbiAgICB9LFxyXG4gICAgbTogZnVuY3Rpb24gKGRhdGUpIHsgcmV0dXJuIHBhZChkYXRlLmdldE1vbnRoKCkgKyAxKTsgfSxcclxuICAgIG46IGZ1bmN0aW9uIChkYXRlKSB7IHJldHVybiBkYXRlLmdldE1vbnRoKCkgKyAxOyB9LFxyXG4gICAgczogZnVuY3Rpb24gKGRhdGUpIHsgcmV0dXJuIGRhdGUuZ2V0U2Vjb25kcygpOyB9LFxyXG4gICAgdzogZnVuY3Rpb24gKGRhdGUpIHsgcmV0dXJuIGRhdGUuZ2V0RGF5KCk7IH0sXHJcbiAgICB5OiBmdW5jdGlvbiAoZGF0ZSkgeyByZXR1cm4gU3RyaW5nKGRhdGUuZ2V0RnVsbFllYXIoKSkuc3Vic3RyaW5nKDIpOyB9LFxyXG59O1xuXG52YXIgZW5nbGlzaCA9IHtcclxuICAgIHdlZWtkYXlzOiB7XHJcbiAgICAgICAgc2hvcnRoYW5kOiBbXCJTdW5cIiwgXCJNb25cIiwgXCJUdWVcIiwgXCJXZWRcIiwgXCJUaHVcIiwgXCJGcmlcIiwgXCJTYXRcIl0sXHJcbiAgICAgICAgbG9uZ2hhbmQ6IFtcclxuICAgICAgICAgICAgXCJTdW5kYXlcIixcclxuICAgICAgICAgICAgXCJNb25kYXlcIixcclxuICAgICAgICAgICAgXCJUdWVzZGF5XCIsXHJcbiAgICAgICAgICAgIFwiV2VkbmVzZGF5XCIsXHJcbiAgICAgICAgICAgIFwiVGh1cnNkYXlcIixcclxuICAgICAgICAgICAgXCJGcmlkYXlcIixcclxuICAgICAgICAgICAgXCJTYXR1cmRheVwiLFxyXG4gICAgICAgIF0sXHJcbiAgICB9LFxyXG4gICAgbW9udGhzOiB7XHJcbiAgICAgICAgc2hvcnRoYW5kOiBbXHJcbiAgICAgICAgICAgIFwiSmFuXCIsXHJcbiAgICAgICAgICAgIFwiRmViXCIsXHJcbiAgICAgICAgICAgIFwiTWFyXCIsXHJcbiAgICAgICAgICAgIFwiQXByXCIsXHJcbiAgICAgICAgICAgIFwiTWF5XCIsXHJcbiAgICAgICAgICAgIFwiSnVuXCIsXHJcbiAgICAgICAgICAgIFwiSnVsXCIsXHJcbiAgICAgICAgICAgIFwiQXVnXCIsXHJcbiAgICAgICAgICAgIFwiU2VwXCIsXHJcbiAgICAgICAgICAgIFwiT2N0XCIsXHJcbiAgICAgICAgICAgIFwiTm92XCIsXHJcbiAgICAgICAgICAgIFwiRGVjXCIsXHJcbiAgICAgICAgXSxcclxuICAgICAgICBsb25naGFuZDogW1xyXG4gICAgICAgICAgICBcIkphbnVhcnlcIixcclxuICAgICAgICAgICAgXCJGZWJydWFyeVwiLFxyXG4gICAgICAgICAgICBcIk1hcmNoXCIsXHJcbiAgICAgICAgICAgIFwiQXByaWxcIixcclxuICAgICAgICAgICAgXCJNYXlcIixcclxuICAgICAgICAgICAgXCJKdW5lXCIsXHJcbiAgICAgICAgICAgIFwiSnVseVwiLFxyXG4gICAgICAgICAgICBcIkF1Z3VzdFwiLFxyXG4gICAgICAgICAgICBcIlNlcHRlbWJlclwiLFxyXG4gICAgICAgICAgICBcIk9jdG9iZXJcIixcclxuICAgICAgICAgICAgXCJOb3ZlbWJlclwiLFxyXG4gICAgICAgICAgICBcIkRlY2VtYmVyXCIsXHJcbiAgICAgICAgXSxcclxuICAgIH0sXHJcbiAgICBkYXlzSW5Nb250aDogWzMxLCAyOCwgMzEsIDMwLCAzMSwgMzAsIDMxLCAzMSwgMzAsIDMxLCAzMCwgMzFdLFxyXG4gICAgZmlyc3REYXlPZldlZWs6IDAsXHJcbiAgICBvcmRpbmFsOiBmdW5jdGlvbiAobnRoKSB7XHJcbiAgICAgICAgdmFyIHMgPSBudGggJSAxMDA7XHJcbiAgICAgICAgaWYgKHMgPiAzICYmIHMgPCAyMSlcclxuICAgICAgICAgICAgcmV0dXJuIFwidGhcIjtcclxuICAgICAgICBzd2l0Y2ggKHMgJSAxMCkge1xyXG4gICAgICAgICAgICBjYXNlIDE6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzdFwiO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJuZFwiO1xyXG4gICAgICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJyZFwiO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwidGhcIjtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgcmFuZ2VTZXBhcmF0b3I6IFwiIHRvIFwiLFxyXG4gICAgd2Vla0FiYnJldmlhdGlvbjogXCJXa1wiLFxyXG4gICAgc2Nyb2xsVGl0bGU6IFwiU2Nyb2xsIHRvIGluY3JlbWVudFwiLFxyXG4gICAgdG9nZ2xlVGl0bGU6IFwiQ2xpY2sgdG8gdG9nZ2xlXCIsXHJcbiAgICBhbVBNOiBbXCJBTVwiLCBcIlBNXCJdLFxyXG59O1xuXG52YXIgY3JlYXRlRGF0ZUZvcm1hdHRlciA9IGZ1bmN0aW9uIChfYSkge1xyXG4gICAgdmFyIF9iID0gX2EuY29uZmlnLCBjb25maWcgPSBfYiA9PT0gdm9pZCAwID8gZGVmYXVsdHMgOiBfYiwgX2MgPSBfYS5sMTBuLCBsMTBuID0gX2MgPT09IHZvaWQgMCA/IGVuZ2xpc2ggOiBfYztcclxuICAgIHJldHVybiBmdW5jdGlvbiAoZGF0ZU9iaiwgZnJtdCwgb3ZlcnJpZGVMb2NhbGUpIHtcclxuICAgICAgICBpZiAoY29uZmlnLmZvcm1hdERhdGUgIT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgcmV0dXJuIGNvbmZpZy5mb3JtYXREYXRlKGRhdGVPYmosIGZybXQpO1xyXG4gICAgICAgIHZhciBsb2NhbGUgPSBvdmVycmlkZUxvY2FsZSB8fCBsMTBuO1xyXG4gICAgICAgIHJldHVybiBmcm10XHJcbiAgICAgICAgICAgIC5zcGxpdChcIlwiKVxyXG4gICAgICAgICAgICAubWFwKGZ1bmN0aW9uIChjLCBpLCBhcnIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZvcm1hdHNbY10gJiYgYXJyW2kgLSAxXSAhPT0gXCJcXFxcXCJcclxuICAgICAgICAgICAgICAgID8gZm9ybWF0c1tjXShkYXRlT2JqLCBsb2NhbGUsIGNvbmZpZylcclxuICAgICAgICAgICAgICAgIDogYyAhPT0gXCJcXFxcXCIgPyBjIDogXCJcIjtcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAuam9pbihcIlwiKTtcclxuICAgIH07XHJcbn07XHJcbnZhciBjcmVhdGVEYXRlUGFyc2VyID0gZnVuY3Rpb24gKF9hKSB7XHJcbiAgICB2YXIgX2IgPSBfYS5jb25maWcsIGNvbmZpZyA9IF9iID09PSB2b2lkIDAgPyBkZWZhdWx0cyA6IF9iLCBfYyA9IF9hLmwxMG4sIGwxMG4gPSBfYyA9PT0gdm9pZCAwID8gZW5nbGlzaCA6IF9jO1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChkYXRlLCBnaXZlbkZvcm1hdCwgdGltZWxlc3MpIHtcclxuICAgICAgICBpZiAoZGF0ZSAhPT0gMCAmJiAhZGF0ZSlcclxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcclxuICAgICAgICB2YXIgcGFyc2VkRGF0ZTtcclxuICAgICAgICB2YXIgZGF0ZV9vcmlnID0gZGF0ZTtcclxuICAgICAgICBpZiAoZGF0ZSBpbnN0YW5jZW9mIERhdGUpXHJcbiAgICAgICAgICAgIHBhcnNlZERhdGUgPSBuZXcgRGF0ZShkYXRlLmdldFRpbWUoKSk7XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIGRhdGUgIT09IFwic3RyaW5nXCIgJiZcclxuICAgICAgICAgICAgZGF0ZS50b0ZpeGVkICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHBhcnNlZERhdGUgPSBuZXcgRGF0ZShkYXRlKTtcclxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgZGF0ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICB2YXIgZm9ybWF0ID0gZ2l2ZW5Gb3JtYXQgfHwgKGNvbmZpZyB8fCBkZWZhdWx0cykuZGF0ZUZvcm1hdDtcclxuICAgICAgICAgICAgdmFyIGRhdGVzdHIgPSBTdHJpbmcoZGF0ZSkudHJpbSgpO1xyXG4gICAgICAgICAgICBpZiAoZGF0ZXN0ciA9PT0gXCJ0b2RheVwiKSB7XHJcbiAgICAgICAgICAgICAgICBwYXJzZWREYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgICAgIHRpbWVsZXNzID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICgvWiQvLnRlc3QoZGF0ZXN0cikgfHxcclxuICAgICAgICAgICAgICAgIC9HTVQkLy50ZXN0KGRhdGVzdHIpKVxyXG4gICAgICAgICAgICAgICAgcGFyc2VkRGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChjb25maWcgJiYgY29uZmlnLnBhcnNlRGF0ZSlcclxuICAgICAgICAgICAgICAgIHBhcnNlZERhdGUgPSBjb25maWcucGFyc2VEYXRlKGRhdGUsIGZvcm1hdCk7XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcGFyc2VkRGF0ZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgIWNvbmZpZyB8fCAhY29uZmlnLm5vQ2FsZW5kYXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyBuZXcgRGF0ZShuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCksIDAsIDEsIDAsIDAsIDAsIDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogbmV3IERhdGUobmV3IERhdGUoKS5zZXRIb3VycygwLCAwLCAwLCAwKSk7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWF0Y2hlZCA9IHZvaWQgMCwgb3BzID0gW107XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbWF0Y2hJbmRleCA9IDAsIHJlZ2V4U3RyID0gXCJcIjsgaSA8IGZvcm1hdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciB0b2tlbiA9IGZvcm1hdFtpXTtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaXNCYWNrU2xhc2ggPSB0b2tlbiA9PT0gXCJcXFxcXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVzY2FwZWQgPSBmb3JtYXRbaSAtIDFdID09PSBcIlxcXFxcIiB8fCBpc0JhY2tTbGFzaDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodG9rZW5SZWdleFt0b2tlbl0gJiYgIWVzY2FwZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXhTdHIgKz0gdG9rZW5SZWdleFt0b2tlbl07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYXRjaCA9IG5ldyBSZWdFeHAocmVnZXhTdHIpLmV4ZWMoZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaCAmJiAobWF0Y2hlZCA9IHRydWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHNbdG9rZW4gIT09IFwiWVwiID8gXCJwdXNoXCIgOiBcInVuc2hpZnRcIl0oe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZuOiByZXZGb3JtYXRbdG9rZW5dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbDogbWF0Y2hbKyttYXRjaEluZGV4XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFpc0JhY2tTbGFzaClcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXhTdHIgKz0gXCIuXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BzLmZvckVhY2goZnVuY3Rpb24gKF9hKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmbiA9IF9hLmZuLCB2YWwgPSBfYS52YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAocGFyc2VkRGF0ZSA9IGZuKHBhcnNlZERhdGUsIHZhbCwgbDEwbikgfHwgcGFyc2VkRGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBwYXJzZWREYXRlID0gbWF0Y2hlZCA/IHBhcnNlZERhdGUgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCEocGFyc2VkRGF0ZSBpbnN0YW5jZW9mIERhdGUpKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5lcnJvckhhbmRsZXIobmV3IEVycm9yKFwiSW52YWxpZCBkYXRlIHByb3ZpZGVkOiBcIiArIGRhdGVfb3JpZykpO1xyXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGltZWxlc3MgPT09IHRydWUpXHJcbiAgICAgICAgICAgIHBhcnNlZERhdGUuc2V0SG91cnMoMCwgMCwgMCwgMCk7XHJcbiAgICAgICAgcmV0dXJuIHBhcnNlZERhdGU7XHJcbiAgICB9O1xyXG59O1xyXG5mdW5jdGlvbiBjb21wYXJlRGF0ZXMoZGF0ZTEsIGRhdGUyLCB0aW1lbGVzcykge1xyXG4gICAgaWYgKHRpbWVsZXNzID09PSB2b2lkIDApIHsgdGltZWxlc3MgPSB0cnVlOyB9XHJcbiAgICBpZiAodGltZWxlc3MgIT09IGZhbHNlKSB7XHJcbiAgICAgICAgcmV0dXJuIChuZXcgRGF0ZShkYXRlMS5nZXRUaW1lKCkpLnNldEhvdXJzKDAsIDAsIDAsIDApIC1cclxuICAgICAgICAgICAgbmV3IERhdGUoZGF0ZTIuZ2V0VGltZSgpKS5zZXRIb3VycygwLCAwLCAwLCAwKSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGF0ZTEuZ2V0VGltZSgpIC0gZGF0ZTIuZ2V0VGltZSgpO1xyXG59XHJcblxyXG52YXIgbW9udGhUb1N0ciA9IGZ1bmN0aW9uIChtb250aE51bWJlciwgc2hvcnRoYW5kLCBsb2NhbGUpIHsgcmV0dXJuIGxvY2FsZS5tb250aHNbc2hvcnRoYW5kID8gXCJzaG9ydGhhbmRcIiA6IFwibG9uZ2hhbmRcIl1bbW9udGhOdW1iZXJdOyB9O1xyXG52YXIgZ2V0V2VlayA9IGZ1bmN0aW9uIChnaXZlbkRhdGUpIHtcclxuICAgIHZhciBkYXRlID0gbmV3IERhdGUoZ2l2ZW5EYXRlLmdldFRpbWUoKSk7XHJcbiAgICBkYXRlLnNldEhvdXJzKDAsIDAsIDAsIDApO1xyXG4gICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpICsgMyAtIChkYXRlLmdldERheSgpICsgNikgJSA3KTtcclxuICAgIHZhciB3ZWVrMSA9IG5ldyBEYXRlKGRhdGUuZ2V0RnVsbFllYXIoKSwgMCwgNCk7XHJcbiAgICByZXR1cm4gKDEgK1xyXG4gICAgICAgIE1hdGgucm91bmQoKChkYXRlLmdldFRpbWUoKSAtIHdlZWsxLmdldFRpbWUoKSkgLyA4NjQwMDAwMCAtXHJcbiAgICAgICAgICAgIDMgK1xyXG4gICAgICAgICAgICAod2VlazEuZ2V0RGF5KCkgKyA2KSAlIDcpIC9cclxuICAgICAgICAgICAgNykpO1xyXG59O1xyXG52YXIgZHVyYXRpb24gPSB7XHJcbiAgICBEQVk6IDg2NDAwMDAwLFxyXG59O1xuXG52YXIgZGVmYXVsdHMgPSB7XHJcbiAgICBfZGlzYWJsZTogW10sXHJcbiAgICBfZW5hYmxlOiBbXSxcclxuICAgIGFsbG93SW5wdXQ6IGZhbHNlLFxyXG4gICAgYWx0Rm9ybWF0OiBcIkYgaiwgWVwiLFxyXG4gICAgYWx0SW5wdXQ6IGZhbHNlLFxyXG4gICAgYWx0SW5wdXRDbGFzczogXCJmb3JtLWNvbnRyb2wgaW5wdXRcIixcclxuICAgIGFuaW1hdGU6IHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIgJiZcclxuICAgICAgICB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiTVNJRVwiKSA9PT0gLTEsXHJcbiAgICBhcmlhRGF0ZUZvcm1hdDogXCJGIGosIFlcIixcclxuICAgIGNsaWNrT3BlbnM6IHRydWUsXHJcbiAgICBjbG9zZU9uU2VsZWN0OiB0cnVlLFxyXG4gICAgY29uanVuY3Rpb246IFwiLCBcIixcclxuICAgIGRhdGVGb3JtYXQ6IFwiWS1tLWRcIixcclxuICAgIGRlZmF1bHRIb3VyOiAxMixcclxuICAgIGRlZmF1bHRNaW51dGU6IDAsXHJcbiAgICBkZWZhdWx0U2Vjb25kczogMCxcclxuICAgIGRpc2FibGU6IFtdLFxyXG4gICAgZGlzYWJsZU1vYmlsZTogZmFsc2UsXHJcbiAgICBlbmFibGU6IFtdLFxyXG4gICAgZW5hYmxlU2Vjb25kczogZmFsc2UsXHJcbiAgICBlbmFibGVUaW1lOiBmYWxzZSxcclxuICAgIGVycm9ySGFuZGxlcjogY29uc29sZS53YXJuLFxyXG4gICAgZ2V0V2VlazogZ2V0V2VlayxcclxuICAgIGhvdXJJbmNyZW1lbnQ6IDEsXHJcbiAgICBpZ25vcmVkRm9jdXNFbGVtZW50czogW10sXHJcbiAgICBpbmxpbmU6IGZhbHNlLFxyXG4gICAgbG9jYWxlOiBcImRlZmF1bHRcIixcclxuICAgIG1pbnV0ZUluY3JlbWVudDogNSxcclxuICAgIG1vZGU6IFwic2luZ2xlXCIsXHJcbiAgICBuZXh0QXJyb3c6IFwiPHN2ZyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnIHZpZXdCb3g9JzAgMCAxNyAxNyc+PGc+PC9nPjxwYXRoIGQ9J00xMy4yMDcgOC40NzJsLTcuODU0IDcuODU0LTAuNzA3LTAuNzA3IDcuMTQ2LTcuMTQ2LTcuMTQ2LTcuMTQ4IDAuNzA3LTAuNzA3IDcuODU0IDcuODU0eicgLz48L3N2Zz5cIixcclxuICAgIG5vQ2FsZW5kYXI6IGZhbHNlLFxyXG4gICAgb25DaGFuZ2U6IFtdLFxyXG4gICAgb25DbG9zZTogW10sXHJcbiAgICBvbkRheUNyZWF0ZTogW10sXHJcbiAgICBvbkRlc3Ryb3k6IFtdLFxyXG4gICAgb25LZXlEb3duOiBbXSxcclxuICAgIG9uTW9udGhDaGFuZ2U6IFtdLFxyXG4gICAgb25PcGVuOiBbXSxcclxuICAgIG9uUGFyc2VDb25maWc6IFtdLFxyXG4gICAgb25SZWFkeTogW10sXHJcbiAgICBvblZhbHVlVXBkYXRlOiBbXSxcclxuICAgIG9uWWVhckNoYW5nZTogW10sXHJcbiAgICBvblByZUNhbGVuZGFyUG9zaXRpb246IFtdLFxyXG4gICAgcGx1Z2luczogW10sXHJcbiAgICBwb3NpdGlvbjogXCJhdXRvXCIsXHJcbiAgICBwb3NpdGlvbkVsZW1lbnQ6IHVuZGVmaW5lZCxcclxuICAgIHByZXZBcnJvdzogXCI8c3ZnIHZlcnNpb249JzEuMScgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB4bWxuczp4bGluaz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycgdmlld0JveD0nMCAwIDE3IDE3Jz48Zz48L2c+PHBhdGggZD0nTTUuMjA3IDguNDcxbDcuMTQ2IDcuMTQ3LTAuNzA3IDAuNzA3LTcuODUzLTcuODU0IDcuODU0LTcuODUzIDAuNzA3IDAuNzA3LTcuMTQ3IDcuMTQ2eicgLz48L3N2Zz5cIixcclxuICAgIHNob3J0aGFuZEN1cnJlbnRNb250aDogZmFsc2UsXHJcbiAgICBzdGF0aWM6IGZhbHNlLFxyXG4gICAgdGltZV8yNGhyOiBmYWxzZSxcclxuICAgIHdlZWtOdW1iZXJzOiBmYWxzZSxcclxuICAgIHdyYXA6IGZhbHNlLFxyXG59O1xuXG5mdW5jdGlvbiB0b2dnbGVDbGFzcyhlbGVtLCBjbGFzc05hbWUsIGJvb2wpIHtcclxuICAgIGlmIChib29sID09PSB0cnVlKVxyXG4gICAgICAgIHJldHVybiBlbGVtLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcclxuICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xyXG59XHJcbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnLCBjbGFzc05hbWUsIGNvbnRlbnQpIHtcclxuICAgIHZhciBlID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcclxuICAgIGNsYXNzTmFtZSA9IGNsYXNzTmFtZSB8fCBcIlwiO1xyXG4gICAgY29udGVudCA9IGNvbnRlbnQgfHwgXCJcIjtcclxuICAgIGUuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xyXG4gICAgaWYgKGNvbnRlbnQgIT09IHVuZGVmaW5lZClcclxuICAgICAgICBlLnRleHRDb250ZW50ID0gY29udGVudDtcclxuICAgIHJldHVybiBlO1xyXG59XHJcbmZ1bmN0aW9uIGNsZWFyTm9kZShub2RlKSB7XHJcbiAgICB3aGlsZSAobm9kZS5maXJzdENoaWxkKVxyXG4gICAgICAgIG5vZGUucmVtb3ZlQ2hpbGQobm9kZS5maXJzdENoaWxkKTtcclxufVxyXG5mdW5jdGlvbiBmaW5kUGFyZW50KG5vZGUsIGNvbmRpdGlvbikge1xyXG4gICAgaWYgKGNvbmRpdGlvbihub2RlKSlcclxuICAgICAgICByZXR1cm4gbm9kZTtcclxuICAgIGVsc2UgaWYgKG5vZGUucGFyZW50Tm9kZSlcclxuICAgICAgICByZXR1cm4gZmluZFBhcmVudChub2RlLnBhcmVudE5vZGUsIGNvbmRpdGlvbik7XHJcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xyXG59XHJcbmZ1bmN0aW9uIGNyZWF0ZU51bWJlcklucHV0KGlucHV0Q2xhc3NOYW1lLCBvcHRzKSB7XHJcbiAgICB2YXIgd3JhcHBlciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJudW1JbnB1dFdyYXBwZXJcIiksIG51bUlucHV0ID0gY3JlYXRlRWxlbWVudChcImlucHV0XCIsIFwibnVtSW5wdXQgXCIgKyBpbnB1dENsYXNzTmFtZSksIGFycm93VXAgPSBjcmVhdGVFbGVtZW50KFwic3BhblwiLCBcImFycm93VXBcIiksIGFycm93RG93biA9IGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIFwiYXJyb3dEb3duXCIpO1xyXG4gICAgbnVtSW5wdXQudHlwZSA9IFwidGV4dFwiO1xyXG4gICAgbnVtSW5wdXQucGF0dGVybiA9IFwiXFxcXGQqXCI7XHJcbiAgICBpZiAob3B0cyAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBvcHRzKVxyXG4gICAgICAgICAgICBudW1JbnB1dC5zZXRBdHRyaWJ1dGUoa2V5LCBvcHRzW2tleV0pO1xyXG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZChudW1JbnB1dCk7XHJcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGFycm93VXApO1xyXG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZChhcnJvd0Rvd24pO1xyXG4gICAgcmV0dXJuIHdyYXBwZXI7XHJcbn1cblxuaWYgKHR5cGVvZiBPYmplY3QuYXNzaWduICE9PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgIE9iamVjdC5hc3NpZ24gPSBmdW5jdGlvbiAodGFyZ2V0KSB7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBfaSA9IDE7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xyXG4gICAgICAgICAgICBhcmdzW19pIC0gMV0gPSBhcmd1bWVudHNbX2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRhcmdldCkge1xyXG4gICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoXCJDYW5ub3QgY29udmVydCB1bmRlZmluZWQgb3IgbnVsbCB0byBvYmplY3RcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBfbG9vcF8xID0gZnVuY3Rpb24gKHNvdXJjZSkge1xyXG4gICAgICAgICAgICBpZiAoc291cmNlKSB7XHJcbiAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gKHRhcmdldFtrZXldID0gc291cmNlW2tleV0pOyB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgZm9yICh2YXIgX2EgPSAwLCBhcmdzXzEgPSBhcmdzOyBfYSA8IGFyZ3NfMS5sZW5ndGg7IF9hKyspIHtcclxuICAgICAgICAgICAgdmFyIHNvdXJjZSA9IGFyZ3NfMVtfYV07XHJcbiAgICAgICAgICAgIF9sb29wXzEoc291cmNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcclxuICAgIH07XHJcbn1cblxudmFyIERFQk9VTkNFRF9DSEFOR0VfTVMgPSAzMDA7XHJcbmZ1bmN0aW9uIEZsYXRwaWNrckluc3RhbmNlKGVsZW1lbnQsIGluc3RhbmNlQ29uZmlnKSB7XHJcbiAgICB2YXIgc2VsZiA9IHtcclxuICAgICAgICBjb25maWc6IF9fYXNzaWduKHt9LCBmbGF0cGlja3IuZGVmYXVsdENvbmZpZyksXHJcbiAgICAgICAgbDEwbjogZW5nbGlzaCxcclxuICAgIH07XHJcbiAgICBzZWxmLnBhcnNlRGF0ZSA9IGNyZWF0ZURhdGVQYXJzZXIoeyBjb25maWc6IHNlbGYuY29uZmlnLCBsMTBuOiBzZWxmLmwxMG4gfSk7XHJcbiAgICBzZWxmLl9oYW5kbGVycyA9IFtdO1xyXG4gICAgc2VsZi5fYmluZCA9IGJpbmQ7XHJcbiAgICBzZWxmLl9zZXRIb3Vyc0Zyb21EYXRlID0gc2V0SG91cnNGcm9tRGF0ZTtcclxuICAgIHNlbGYuY2hhbmdlTW9udGggPSBjaGFuZ2VNb250aDtcclxuICAgIHNlbGYuY2hhbmdlWWVhciA9IGNoYW5nZVllYXI7XHJcbiAgICBzZWxmLmNsZWFyID0gY2xlYXI7XHJcbiAgICBzZWxmLmNsb3NlID0gY2xvc2U7XHJcbiAgICBzZWxmLl9jcmVhdGVFbGVtZW50ID0gY3JlYXRlRWxlbWVudDtcclxuICAgIHNlbGYuZGVzdHJveSA9IGRlc3Ryb3k7XHJcbiAgICBzZWxmLmlzRW5hYmxlZCA9IGlzRW5hYmxlZDtcclxuICAgIHNlbGYuanVtcFRvRGF0ZSA9IGp1bXBUb0RhdGU7XHJcbiAgICBzZWxmLm9wZW4gPSBvcGVuO1xyXG4gICAgc2VsZi5yZWRyYXcgPSByZWRyYXc7XHJcbiAgICBzZWxmLnNldCA9IHNldDtcclxuICAgIHNlbGYuc2V0RGF0ZSA9IHNldERhdGU7XHJcbiAgICBzZWxmLnRvZ2dsZSA9IHRvZ2dsZTtcclxuICAgIGZ1bmN0aW9uIHNldHVwSGVscGVyRnVuY3Rpb25zKCkge1xyXG4gICAgICAgIHNlbGYudXRpbHMgPSB7XHJcbiAgICAgICAgICAgIGdldERheXNJbk1vbnRoOiBmdW5jdGlvbiAobW9udGgsIHlyKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobW9udGggPT09IHZvaWQgMCkgeyBtb250aCA9IHNlbGYuY3VycmVudE1vbnRoOyB9XHJcbiAgICAgICAgICAgICAgICBpZiAoeXIgPT09IHZvaWQgMCkgeyB5ciA9IHNlbGYuY3VycmVudFllYXI7IH1cclxuICAgICAgICAgICAgICAgIGlmIChtb250aCA9PT0gMSAmJiAoKHlyICUgNCA9PT0gMCAmJiB5ciAlIDEwMCAhPT0gMCkgfHwgeXIgJSA0MDAgPT09IDApKVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAyOTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLmwxMG4uZGF5c0luTW9udGhbbW9udGhdO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgICAgIHNlbGYuZWxlbWVudCA9IHNlbGYuaW5wdXQgPSBlbGVtZW50O1xyXG4gICAgICAgIHNlbGYuaXNPcGVuID0gZmFsc2U7XHJcbiAgICAgICAgcGFyc2VDb25maWcoKTtcclxuICAgICAgICBzZXR1cExvY2FsZSgpO1xyXG4gICAgICAgIHNldHVwSW5wdXRzKCk7XHJcbiAgICAgICAgc2V0dXBEYXRlcygpO1xyXG4gICAgICAgIHNldHVwSGVscGVyRnVuY3Rpb25zKCk7XHJcbiAgICAgICAgaWYgKCFzZWxmLmlzTW9iaWxlKVxyXG4gICAgICAgICAgICBidWlsZCgpO1xyXG4gICAgICAgIGJpbmRFdmVudHMoKTtcclxuICAgICAgICBpZiAoc2VsZi5zZWxlY3RlZERhdGVzLmxlbmd0aCB8fCBzZWxmLmNvbmZpZy5ub0NhbGVuZGFyKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLmNvbmZpZy5lbmFibGVUaW1lKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRIb3Vyc0Zyb21EYXRlKHNlbGYuY29uZmlnLm5vQ2FsZW5kYXJcclxuICAgICAgICAgICAgICAgICAgICA/IHNlbGYubGF0ZXN0U2VsZWN0ZWREYXRlT2JqIHx8IHNlbGYuY29uZmlnLm1pbkRhdGVcclxuICAgICAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdXBkYXRlVmFsdWUoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxmLnNob3dUaW1lSW5wdXQgPVxyXG4gICAgICAgICAgICBzZWxmLnNlbGVjdGVkRGF0ZXMubGVuZ3RoID4gMCB8fCBzZWxmLmNvbmZpZy5ub0NhbGVuZGFyO1xyXG4gICAgICAgIGlmIChzZWxmLndlZWtXcmFwcGVyICE9PSB1bmRlZmluZWQgJiYgc2VsZi5kYXlzQ29udGFpbmVyICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgc2VsZi5jYWxlbmRhckNvbnRhaW5lci5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcclxuICAgICAgICAgICAgc2VsZi5jYWxlbmRhckNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xyXG4gICAgICAgICAgICBzZWxmLmNhbGVuZGFyQ29udGFpbmVyLnN0eWxlLndpZHRoID1cclxuICAgICAgICAgICAgICAgIHNlbGYuZGF5c0NvbnRhaW5lci5vZmZzZXRXaWR0aCArIHNlbGYud2Vla1dyYXBwZXIub2Zmc2V0V2lkdGggKyBcInB4XCI7XHJcbiAgICAgICAgICAgIHNlbGYuY2FsZW5kYXJDb250YWluZXIuc3R5bGUudmlzaWJpbGl0eSA9IFwidmlzaWJsZVwiO1xyXG4gICAgICAgICAgICBzZWxmLmNhbGVuZGFyQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgaXNTYWZhcmkgPSAvXigoPyFjaHJvbWV8YW5kcm9pZCkuKSpzYWZhcmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xyXG4gICAgICAgIGlmICghc2VsZi5pc01vYmlsZSAmJiBpc1NhZmFyaSkge1xyXG4gICAgICAgICAgICBwb3NpdGlvbkNhbGVuZGFyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyaWdnZXJFdmVudChcIm9uUmVhZHlcIik7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBiaW5kVG9JbnN0YW5jZShmbikge1xyXG4gICAgICAgIHJldHVybiBmbi5iaW5kKHNlbGYpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gdXBkYXRlVGltZShlKSB7XHJcbiAgICAgICAgaWYgKHNlbGYuY29uZmlnLm5vQ2FsZW5kYXIgJiYgc2VsZi5zZWxlY3RlZERhdGVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBzZWxmLnNldERhdGUoc2VsZi5jb25maWcubWluRGF0ZSAhPT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgICAgICA/IG5ldyBEYXRlKHNlbGYuY29uZmlnLm1pbkRhdGUuZ2V0VGltZSgpKVxyXG4gICAgICAgICAgICAgICAgOiBuZXcgRGF0ZSgpLnNldEhvdXJzKHNlbGYuY29uZmlnLmRlZmF1bHRIb3VyLCBzZWxmLmNvbmZpZy5kZWZhdWx0TWludXRlLCBzZWxmLmNvbmZpZy5kZWZhdWx0U2Vjb25kcywgMCksIGZhbHNlKTtcclxuICAgICAgICAgICAgc2V0SG91cnNGcm9tSW5wdXRzKCk7XHJcbiAgICAgICAgICAgIHVwZGF0ZVZhbHVlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRpbWVXcmFwcGVyKGUpO1xyXG4gICAgICAgIGlmIChzZWxmLnNlbGVjdGVkRGF0ZXMubGVuZ3RoID09PSAwKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgaWYgKGUudHlwZSAhPT0gXCJpbnB1dFwiKSB7XHJcbiAgICAgICAgICAgIHNldEhvdXJzRnJvbUlucHV0cygpO1xyXG4gICAgICAgICAgICB1cGRhdGVWYWx1ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRIb3Vyc0Zyb21JbnB1dHMoKTtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZVZhbHVlKCk7XHJcbiAgICAgICAgICAgIH0sIERFQk9VTkNFRF9DSEFOR0VfTVMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGFtcG0ybWlsaXRhcnkoaG91ciwgYW1QTSkge1xyXG4gICAgICAgIHJldHVybiBob3VyICUgMTIgKyAxMiAqIGludChhbVBNID09PSBzZWxmLmwxMG4uYW1QTVsxXSk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBtaWxpdGFyeTJhbXBtKGhvdXIpIHtcclxuICAgICAgICBzd2l0Y2ggKGhvdXIgJSAyNCkge1xyXG4gICAgICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgIGNhc2UgMTI6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMTI7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaG91ciAlIDEyO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHNldEhvdXJzRnJvbUlucHV0cygpIHtcclxuICAgICAgICBpZiAoc2VsZi5ob3VyRWxlbWVudCA9PT0gdW5kZWZpbmVkIHx8IHNlbGYubWludXRlRWxlbWVudCA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdmFyIGhvdXJzID0gKHBhcnNlSW50KHNlbGYuaG91ckVsZW1lbnQudmFsdWUuc2xpY2UoLTIpLCAxMCkgfHwgMCkgJSAyNCwgbWludXRlcyA9IChwYXJzZUludChzZWxmLm1pbnV0ZUVsZW1lbnQudmFsdWUsIDEwKSB8fCAwKSAlIDYwLCBzZWNvbmRzID0gc2VsZi5zZWNvbmRFbGVtZW50ICE9PSB1bmRlZmluZWRcclxuICAgICAgICAgICAgPyAocGFyc2VJbnQoc2VsZi5zZWNvbmRFbGVtZW50LnZhbHVlLCAxMCkgfHwgMCkgJSA2MFxyXG4gICAgICAgICAgICA6IDA7XHJcbiAgICAgICAgaWYgKHNlbGYuYW1QTSAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICBob3VycyA9IGFtcG0ybWlsaXRhcnkoaG91cnMsIHNlbGYuYW1QTS50ZXh0Q29udGVudCk7XHJcbiAgICAgICAgdmFyIGxpbWl0TWluSG91cnMgPSBzZWxmLmNvbmZpZy5taW5UaW1lICE9PSB1bmRlZmluZWQgfHxcclxuICAgICAgICAgICAgKHNlbGYuY29uZmlnLm1pbkRhdGUgJiZcclxuICAgICAgICAgICAgICAgIHNlbGYubWluRGF0ZUhhc1RpbWUgJiZcclxuICAgICAgICAgICAgICAgIHNlbGYubGF0ZXN0U2VsZWN0ZWREYXRlT2JqICYmXHJcbiAgICAgICAgICAgICAgICBjb21wYXJlRGF0ZXMoc2VsZi5sYXRlc3RTZWxlY3RlZERhdGVPYmosIHNlbGYuY29uZmlnLm1pbkRhdGUsIHRydWUpID09PVxyXG4gICAgICAgICAgICAgICAgICAgIDApO1xyXG4gICAgICAgIHZhciBsaW1pdE1heEhvdXJzID0gc2VsZi5jb25maWcubWF4VGltZSAhPT0gdW5kZWZpbmVkIHx8XHJcbiAgICAgICAgICAgIChzZWxmLmNvbmZpZy5tYXhEYXRlICYmXHJcbiAgICAgICAgICAgICAgICBzZWxmLm1heERhdGVIYXNUaW1lICYmXHJcbiAgICAgICAgICAgICAgICBzZWxmLmxhdGVzdFNlbGVjdGVkRGF0ZU9iaiAmJlxyXG4gICAgICAgICAgICAgICAgY29tcGFyZURhdGVzKHNlbGYubGF0ZXN0U2VsZWN0ZWREYXRlT2JqLCBzZWxmLmNvbmZpZy5tYXhEYXRlLCB0cnVlKSA9PT1cclxuICAgICAgICAgICAgICAgICAgICAwKTtcclxuICAgICAgICBpZiAobGltaXRNYXhIb3Vycykge1xyXG4gICAgICAgICAgICB2YXIgbWF4VGltZSA9IHNlbGYuY29uZmlnLm1heFRpbWUgIT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgPyBzZWxmLmNvbmZpZy5tYXhUaW1lXHJcbiAgICAgICAgICAgICAgICA6IHNlbGYuY29uZmlnLm1heERhdGU7XHJcbiAgICAgICAgICAgIGhvdXJzID0gTWF0aC5taW4oaG91cnMsIG1heFRpbWUuZ2V0SG91cnMoKSk7XHJcbiAgICAgICAgICAgIGlmIChob3VycyA9PT0gbWF4VGltZS5nZXRIb3VycygpKVxyXG4gICAgICAgICAgICAgICAgbWludXRlcyA9IE1hdGgubWluKG1pbnV0ZXMsIG1heFRpbWUuZ2V0TWludXRlcygpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxpbWl0TWluSG91cnMpIHtcclxuICAgICAgICAgICAgdmFyIG1pblRpbWUgPSBzZWxmLmNvbmZpZy5taW5UaW1lICE9PSB1bmRlZmluZWRcclxuICAgICAgICAgICAgICAgID8gc2VsZi5jb25maWcubWluVGltZVxyXG4gICAgICAgICAgICAgICAgOiBzZWxmLmNvbmZpZy5taW5EYXRlO1xyXG4gICAgICAgICAgICBob3VycyA9IE1hdGgubWF4KGhvdXJzLCBtaW5UaW1lLmdldEhvdXJzKCkpO1xyXG4gICAgICAgICAgICBpZiAoaG91cnMgPT09IG1pblRpbWUuZ2V0SG91cnMoKSlcclxuICAgICAgICAgICAgICAgIG1pbnV0ZXMgPSBNYXRoLm1heChtaW51dGVzLCBtaW5UaW1lLmdldE1pbnV0ZXMoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldEhvdXJzKGhvdXJzLCBtaW51dGVzLCBzZWNvbmRzKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHNldEhvdXJzRnJvbURhdGUoZGF0ZU9iaikge1xyXG4gICAgICAgIHZhciBkYXRlID0gZGF0ZU9iaiB8fCBzZWxmLmxhdGVzdFNlbGVjdGVkRGF0ZU9iajtcclxuICAgICAgICBpZiAoZGF0ZSlcclxuICAgICAgICAgICAgc2V0SG91cnMoZGF0ZS5nZXRIb3VycygpLCBkYXRlLmdldE1pbnV0ZXMoKSwgZGF0ZS5nZXRTZWNvbmRzKCkpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gc2V0SG91cnMoaG91cnMsIG1pbnV0ZXMsIHNlY29uZHMpIHtcclxuICAgICAgICBpZiAoc2VsZi5sYXRlc3RTZWxlY3RlZERhdGVPYmogIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBzZWxmLmxhdGVzdFNlbGVjdGVkRGF0ZU9iai5zZXRIb3Vycyhob3VycyAlIDI0LCBtaW51dGVzLCBzZWNvbmRzIHx8IDAsIDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXNlbGYuaG91ckVsZW1lbnQgfHwgIXNlbGYubWludXRlRWxlbWVudCB8fCBzZWxmLmlzTW9iaWxlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgc2VsZi5ob3VyRWxlbWVudC52YWx1ZSA9IHBhZCghc2VsZi5jb25maWcudGltZV8yNGhyXHJcbiAgICAgICAgICAgID8gKDEyICsgaG91cnMpICUgMTIgKyAxMiAqIGludChob3VycyAlIDEyID09PSAwKVxyXG4gICAgICAgICAgICA6IGhvdXJzKTtcclxuICAgICAgICBzZWxmLm1pbnV0ZUVsZW1lbnQudmFsdWUgPSBwYWQobWludXRlcyk7XHJcbiAgICAgICAgaWYgKHNlbGYuYW1QTSAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICBzZWxmLmFtUE0udGV4dENvbnRlbnQgPSBzZWxmLmwxMG4uYW1QTVtpbnQoaG91cnMgPj0gMTIpXTtcclxuICAgICAgICBpZiAoc2VsZi5zZWNvbmRFbGVtZW50ICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHNlbGYuc2Vjb25kRWxlbWVudC52YWx1ZSA9IHBhZChzZWNvbmRzKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIG9uWWVhcklucHV0KGV2ZW50KSB7XHJcbiAgICAgICAgdmFyIHllYXIgPSBwYXJzZUludChldmVudC50YXJnZXQudmFsdWUpICsgKGV2ZW50LmRlbHRhIHx8IDApO1xyXG4gICAgICAgIGlmICh5ZWFyLnRvU3RyaW5nKCkubGVuZ3RoID09PSA0IHx8IGV2ZW50LmtleSA9PT0gXCJFbnRlclwiKSB7XHJcbiAgICAgICAgICAgIHNlbGYuY3VycmVudFllYXJFbGVtZW50LmJsdXIoKTtcclxuICAgICAgICAgICAgaWYgKCEvW15cXGRdLy50ZXN0KHllYXIudG9TdHJpbmcoKSkpXHJcbiAgICAgICAgICAgICAgICBjaGFuZ2VZZWFyKHllYXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGJpbmQoZWxlbWVudCwgZXZlbnQsIGhhbmRsZXIsIG9wdGlvbnMpIHtcclxuICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBBcnJheSlcclxuICAgICAgICAgICAgcmV0dXJuIGV2ZW50LmZvckVhY2goZnVuY3Rpb24gKGV2KSB7IHJldHVybiBiaW5kKGVsZW1lbnQsIGV2LCBoYW5kbGVyLCBvcHRpb25zKTsgfSk7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBBcnJheSlcclxuICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHsgcmV0dXJuIGJpbmQoZWwsIGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKTsgfSk7XHJcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBoYW5kbGVyLCBvcHRpb25zKTtcclxuICAgICAgICBzZWxmLl9oYW5kbGVycy5wdXNoKHsgZWxlbWVudDogZWxlbWVudCwgZXZlbnQ6IGV2ZW50LCBoYW5kbGVyOiBoYW5kbGVyIH0pO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gb25DbGljayhoYW5kbGVyKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChldnQpIHtcclxuICAgICAgICAgICAgZXZ0LndoaWNoID09PSAxICYmIGhhbmRsZXIoZXZ0KTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gdHJpZ2dlckNoYW5nZSgpIHtcclxuICAgICAgICB0cmlnZ2VyRXZlbnQoXCJvbkNoYW5nZVwiKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGJpbmRFdmVudHMoKSB7XHJcbiAgICAgICAgaWYgKHNlbGYuY29uZmlnLndyYXApIHtcclxuICAgICAgICAgICAgW1wib3BlblwiLCBcImNsb3NlXCIsIFwidG9nZ2xlXCIsIFwiY2xlYXJcIl0uZm9yRWFjaChmdW5jdGlvbiAoZXZ0KSB7XHJcbiAgICAgICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKHNlbGYuZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtXCIgKyBldnQgKyBcIl1cIiksIGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBiaW5kKGVsLCBcImNsaWNrXCIsIHNlbGZbZXZ0XSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzZWxmLmlzTW9iaWxlKSB7XHJcbiAgICAgICAgICAgIHNldHVwTW9iaWxlKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGRlYm91bmNlZFJlc2l6ZSA9IGRlYm91bmNlKG9uUmVzaXplLCA1MCk7XHJcbiAgICAgICAgc2VsZi5fZGVib3VuY2VkQ2hhbmdlID0gZGVib3VuY2UodHJpZ2dlckNoYW5nZSwgREVCT1VOQ0VEX0NIQU5HRV9NUyk7XHJcbiAgICAgICAgaWYgKHNlbGYuZGF5c0NvbnRhaW5lciAmJiAhL2lQaG9uZXxpUGFkfGlQb2QvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKVxyXG4gICAgICAgICAgICBiaW5kKHNlbGYuZGF5c0NvbnRhaW5lciwgXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLmNvbmZpZy5tb2RlID09PSBcInJhbmdlXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgb25Nb3VzZU92ZXIoZS50YXJnZXQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICBiaW5kKHdpbmRvdy5kb2N1bWVudC5ib2R5LCBcImtleWRvd25cIiwgb25LZXlEb3duKTtcclxuICAgICAgICBpZiAoIXNlbGYuY29uZmlnLnN0YXRpYylcclxuICAgICAgICAgICAgYmluZChzZWxmLl9pbnB1dCwgXCJrZXlkb3duXCIsIG9uS2V5RG93bik7XHJcbiAgICAgICAgaWYgKCFzZWxmLmNvbmZpZy5pbmxpbmUgJiYgIXNlbGYuY29uZmlnLnN0YXRpYylcclxuICAgICAgICAgICAgYmluZCh3aW5kb3csIFwicmVzaXplXCIsIGRlYm91bmNlZFJlc2l6ZSk7XHJcbiAgICAgICAgaWYgKHdpbmRvdy5vbnRvdWNoc3RhcnQgIT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgYmluZCh3aW5kb3cuZG9jdW1lbnQsIFwidG91Y2hzdGFydFwiLCBkb2N1bWVudENsaWNrKTtcclxuICAgICAgICBiaW5kKHdpbmRvdy5kb2N1bWVudCwgXCJtb3VzZWRvd25cIiwgb25DbGljayhkb2N1bWVudENsaWNrKSk7XHJcbiAgICAgICAgYmluZCh3aW5kb3cuZG9jdW1lbnQsIFwiZm9jdXNcIiwgZG9jdW1lbnRDbGljaywgeyBjYXB0dXJlOiB0cnVlIH0pO1xyXG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy5jbGlja09wZW5zID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIGJpbmQoc2VsZi5faW5wdXQsIFwiZm9jdXNcIiwgc2VsZi5vcGVuKTtcclxuICAgICAgICAgICAgYmluZChzZWxmLl9pbnB1dCwgXCJtb3VzZWRvd25cIiwgb25DbGljayhzZWxmLm9wZW4pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNlbGYuZGF5c0NvbnRhaW5lciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIGJpbmQoc2VsZi5tb250aE5hdiwgXCJtb3VzZWRvd25cIiwgb25DbGljayhvbk1vbnRoTmF2Q2xpY2spKTtcclxuICAgICAgICAgICAgYmluZChzZWxmLm1vbnRoTmF2LCBbXCJrZXl1cFwiLCBcImluY3JlbWVudFwiXSwgb25ZZWFySW5wdXQpO1xyXG4gICAgICAgICAgICBiaW5kKHNlbGYuZGF5c0NvbnRhaW5lciwgXCJtb3VzZWRvd25cIiwgb25DbGljayhzZWxlY3REYXRlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzZWxmLnRpbWVDb250YWluZXIgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgICAgICBzZWxmLm1pbnV0ZUVsZW1lbnQgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgICAgICBzZWxmLmhvdXJFbGVtZW50ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgdmFyIHNlbFRleHQgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGUudGFyZ2V0LnNlbGVjdCgpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBiaW5kKHNlbGYudGltZUNvbnRhaW5lciwgW1wiaW5wdXRcIiwgXCJpbmNyZW1lbnRcIl0sIHVwZGF0ZVRpbWUpO1xyXG4gICAgICAgICAgICBiaW5kKHNlbGYudGltZUNvbnRhaW5lciwgXCJtb3VzZWRvd25cIiwgb25DbGljayh0aW1lSW5jcmVtZW50KSk7XHJcbiAgICAgICAgICAgIGJpbmQoc2VsZi50aW1lQ29udGFpbmVyLCBbXCJpbnB1dFwiLCBcImluY3JlbWVudFwiXSwgc2VsZi5fZGVib3VuY2VkQ2hhbmdlLCB7XHJcbiAgICAgICAgICAgICAgICBwYXNzaXZlOiB0cnVlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgYmluZChbc2VsZi5ob3VyRWxlbWVudCwgc2VsZi5taW51dGVFbGVtZW50XSwgW1wiZm9jdXNcIiwgXCJjbGlja1wiXSwgc2VsVGV4dCk7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLnNlY29uZEVsZW1lbnQgIT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgIGJpbmQoc2VsZi5zZWNvbmRFbGVtZW50LCBcImZvY3VzXCIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNlbGYuc2Vjb25kRWxlbWVudCAmJiBzZWxmLnNlY29uZEVsZW1lbnQuc2VsZWN0KCk7IH0pO1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5hbVBNICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIGJpbmQoc2VsZi5hbVBNLCBcIm1vdXNlZG93blwiLCBvbkNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlVGltZShlKTtcclxuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VyQ2hhbmdlKCk7XHJcbiAgICAgICAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBqdW1wVG9EYXRlKGp1bXBEYXRlKSB7XHJcbiAgICAgICAgdmFyIGp1bXBUbyA9IGp1bXBEYXRlICE9PSB1bmRlZmluZWRcclxuICAgICAgICAgICAgPyBzZWxmLnBhcnNlRGF0ZShqdW1wRGF0ZSlcclxuICAgICAgICAgICAgOiBzZWxmLmxhdGVzdFNlbGVjdGVkRGF0ZU9iaiB8fFxyXG4gICAgICAgICAgICAgICAgKHNlbGYuY29uZmlnLm1pbkRhdGUgJiYgc2VsZi5jb25maWcubWluRGF0ZSA+IHNlbGYubm93XHJcbiAgICAgICAgICAgICAgICAgICAgPyBzZWxmLmNvbmZpZy5taW5EYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgOiBzZWxmLmNvbmZpZy5tYXhEYXRlICYmIHNlbGYuY29uZmlnLm1heERhdGUgPCBzZWxmLm5vd1xyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHNlbGYuY29uZmlnLm1heERhdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiBzZWxmLm5vdyk7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGp1bXBUbyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmN1cnJlbnRZZWFyID0ganVtcFRvLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmN1cnJlbnRNb250aCA9IGp1bXBUby5nZXRNb250aCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGUubWVzc2FnZSA9IFwiSW52YWxpZCBkYXRlIHN1cHBsaWVkOiBcIiArIGp1bXBUbztcclxuICAgICAgICAgICAgc2VsZi5jb25maWcuZXJyb3JIYW5kbGVyKGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxmLnJlZHJhdygpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gdGltZUluY3JlbWVudChlKSB7XHJcbiAgICAgICAgaWYgKH5lLnRhcmdldC5jbGFzc05hbWUuaW5kZXhPZihcImFycm93XCIpKVxyXG4gICAgICAgICAgICBpbmNyZW1lbnROdW1JbnB1dChlLCBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJhcnJvd1VwXCIpID8gMSA6IC0xKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGluY3JlbWVudE51bUlucHV0KGUsIGRlbHRhLCBpbnB1dEVsZW0pIHtcclxuICAgICAgICB2YXIgdGFyZ2V0ID0gZSAmJiBlLnRhcmdldDtcclxuICAgICAgICB2YXIgaW5wdXQgPSBpbnB1dEVsZW0gfHxcclxuICAgICAgICAgICAgKHRhcmdldCAmJiB0YXJnZXQucGFyZW50Tm9kZSAmJiB0YXJnZXQucGFyZW50Tm9kZS5maXJzdENoaWxkKTtcclxuICAgICAgICB2YXIgZXZlbnQgPSBjcmVhdGVFdmVudChcImluY3JlbWVudFwiKTtcclxuICAgICAgICBldmVudC5kZWx0YSA9IGRlbHRhO1xyXG4gICAgICAgIGlucHV0ICYmIGlucHV0LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gYnVpbGQoKSB7XHJcbiAgICAgICAgdmFyIGZyYWdtZW50ID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgICAgICBzZWxmLmNhbGVuZGFyQ29udGFpbmVyID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBcImZsYXRwaWNrci1jYWxlbmRhclwiKTtcclxuICAgICAgICBzZWxmLmNhbGVuZGFyQ29udGFpbmVyLnRhYkluZGV4ID0gLTE7XHJcbiAgICAgICAgaWYgKCFzZWxmLmNvbmZpZy5ub0NhbGVuZGFyKSB7XHJcbiAgICAgICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGJ1aWxkTW9udGhOYXYoKSk7XHJcbiAgICAgICAgICAgIHNlbGYuaW5uZXJDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIFwiZmxhdHBpY2tyLWlubmVyQ29udGFpbmVyXCIpO1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5jb25maWcud2Vla051bWJlcnMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBfYSA9IGJ1aWxkV2Vla3MoKSwgd2Vla1dyYXBwZXIgPSBfYS53ZWVrV3JhcHBlciwgd2Vla051bWJlcnMgPSBfYS53ZWVrTnVtYmVycztcclxuICAgICAgICAgICAgICAgIHNlbGYuaW5uZXJDb250YWluZXIuYXBwZW5kQ2hpbGQod2Vla1dyYXBwZXIpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi53ZWVrTnVtYmVycyA9IHdlZWtOdW1iZXJzO1xyXG4gICAgICAgICAgICAgICAgc2VsZi53ZWVrV3JhcHBlciA9IHdlZWtXcmFwcGVyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNlbGYuckNvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJmbGF0cGlja3ItckNvbnRhaW5lclwiKTtcclxuICAgICAgICAgICAgc2VsZi5yQ29udGFpbmVyLmFwcGVuZENoaWxkKGJ1aWxkV2Vla2RheXMoKSk7XHJcbiAgICAgICAgICAgIGlmICghc2VsZi5kYXlzQ29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRheXNDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIFwiZmxhdHBpY2tyLWRheXNcIik7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRheXNDb250YWluZXIudGFiSW5kZXggPSAtMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBidWlsZERheXMoKTtcclxuICAgICAgICAgICAgc2VsZi5yQ29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGYuZGF5c0NvbnRhaW5lcik7XHJcbiAgICAgICAgICAgIHNlbGYuaW5uZXJDb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZi5yQ29udGFpbmVyKTtcclxuICAgICAgICAgICAgZnJhZ21lbnQuYXBwZW5kQ2hpbGQoc2VsZi5pbm5lckNvbnRhaW5lcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy5lbmFibGVUaW1lKSB7XHJcbiAgICAgICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKGJ1aWxkVGltZSgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdG9nZ2xlQ2xhc3Moc2VsZi5jYWxlbmRhckNvbnRhaW5lciwgXCJyYW5nZU1vZGVcIiwgc2VsZi5jb25maWcubW9kZSA9PT0gXCJyYW5nZVwiKTtcclxuICAgICAgICB0b2dnbGVDbGFzcyhzZWxmLmNhbGVuZGFyQ29udGFpbmVyLCBcImFuaW1hdGVcIiwgc2VsZi5jb25maWcuYW5pbWF0ZSk7XHJcbiAgICAgICAgc2VsZi5jYWxlbmRhckNvbnRhaW5lci5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcbiAgICAgICAgdmFyIGN1c3RvbUFwcGVuZCA9IHNlbGYuY29uZmlnLmFwcGVuZFRvICE9PSB1bmRlZmluZWQgJiYgc2VsZi5jb25maWcuYXBwZW5kVG8ubm9kZVR5cGU7XHJcbiAgICAgICAgaWYgKHNlbGYuY29uZmlnLmlubGluZSB8fCBzZWxmLmNvbmZpZy5zdGF0aWMpIHtcclxuICAgICAgICAgICAgc2VsZi5jYWxlbmRhckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKHNlbGYuY29uZmlnLmlubGluZSA/IFwiaW5saW5lXCIgOiBcInN0YXRpY1wiKTtcclxuICAgICAgICAgICAgaWYgKHNlbGYuY29uZmlnLmlubGluZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFjdXN0b21BcHBlbmQgJiYgc2VsZi5lbGVtZW50LnBhcmVudE5vZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lbGVtZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHNlbGYuY2FsZW5kYXJDb250YWluZXIsIHNlbGYuX2lucHV0Lm5leHRTaWJsaW5nKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNlbGYuY29uZmlnLmFwcGVuZFRvICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jb25maWcuYXBwZW5kVG8uYXBwZW5kQ2hpbGQoc2VsZi5jYWxlbmRhckNvbnRhaW5lcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNlbGYuY29uZmlnLnN0YXRpYykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHdyYXBwZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIFwiZmxhdHBpY2tyLXdyYXBwZXJcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5lbGVtZW50LnBhcmVudE5vZGUpXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5lbGVtZW50LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHdyYXBwZXIsIHNlbGYuZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHNlbGYuZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5hbHRJbnB1dClcclxuICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKHNlbGYuYWx0SW5wdXQpO1xyXG4gICAgICAgICAgICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZChzZWxmLmNhbGVuZGFyQ29udGFpbmVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXNlbGYuY29uZmlnLnN0YXRpYyAmJiAhc2VsZi5jb25maWcuaW5saW5lKVxyXG4gICAgICAgICAgICAoc2VsZi5jb25maWcuYXBwZW5kVG8gIT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgPyBzZWxmLmNvbmZpZy5hcHBlbmRUb1xyXG4gICAgICAgICAgICAgICAgOiB3aW5kb3cuZG9jdW1lbnQuYm9keSkuYXBwZW5kQ2hpbGQoc2VsZi5jYWxlbmRhckNvbnRhaW5lcik7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBjcmVhdGVEYXkoY2xhc3NOYW1lLCBkYXRlLCBkYXlOdW1iZXIsIGkpIHtcclxuICAgICAgICB2YXIgZGF0ZUlzRW5hYmxlZCA9IGlzRW5hYmxlZChkYXRlLCB0cnVlKSwgZGF5RWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIFwiZmxhdHBpY2tyLWRheSBcIiArIGNsYXNzTmFtZSwgZGF0ZS5nZXREYXRlKCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgZGF5RWxlbWVudC5kYXRlT2JqID0gZGF0ZTtcclxuICAgICAgICBkYXlFbGVtZW50LiRpID0gaTtcclxuICAgICAgICBkYXlFbGVtZW50LnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgc2VsZi5mb3JtYXREYXRlKGRhdGUsIHNlbGYuY29uZmlnLmFyaWFEYXRlRm9ybWF0KSk7XHJcbiAgICAgICAgaWYgKGNvbXBhcmVEYXRlcyhkYXRlLCBzZWxmLm5vdykgPT09IDApIHtcclxuICAgICAgICAgICAgc2VsZi50b2RheURhdGVFbGVtID0gZGF5RWxlbWVudDtcclxuICAgICAgICAgICAgZGF5RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwidG9kYXlcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChkYXRlSXNFbmFibGVkKSB7XHJcbiAgICAgICAgICAgIGRheUVsZW1lbnQudGFiSW5kZXggPSAtMTtcclxuICAgICAgICAgICAgaWYgKGlzRGF0ZVNlbGVjdGVkKGRhdGUpKSB7XHJcbiAgICAgICAgICAgICAgICBkYXlFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZFwiKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWREYXRlRWxlbSA9IGRheUVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5jb25maWcubW9kZSA9PT0gXCJyYW5nZVwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlQ2xhc3MoZGF5RWxlbWVudCwgXCJzdGFydFJhbmdlXCIsIHNlbGYuc2VsZWN0ZWREYXRlc1swXSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wYXJlRGF0ZXMoZGF0ZSwgc2VsZi5zZWxlY3RlZERhdGVzWzBdKSA9PT0gMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlQ2xhc3MoZGF5RWxlbWVudCwgXCJlbmRSYW5nZVwiLCBzZWxmLnNlbGVjdGVkRGF0ZXNbMV0gJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGFyZURhdGVzKGRhdGUsIHNlbGYuc2VsZWN0ZWREYXRlc1sxXSkgPT09IDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBkYXlFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICAgICAgaWYgKHNlbGYuc2VsZWN0ZWREYXRlc1swXSAmJlxyXG4gICAgICAgICAgICAgICAgc2VsZi5taW5SYW5nZURhdGUgJiZcclxuICAgICAgICAgICAgICAgIGRhdGUgPiBzZWxmLm1pblJhbmdlRGF0ZSAmJlxyXG4gICAgICAgICAgICAgICAgZGF0ZSA8IHNlbGYuc2VsZWN0ZWREYXRlc1swXSlcclxuICAgICAgICAgICAgICAgIHNlbGYubWluUmFuZ2VEYXRlID0gZGF0ZTtcclxuICAgICAgICAgICAgZWxzZSBpZiAoc2VsZi5zZWxlY3RlZERhdGVzWzBdICYmXHJcbiAgICAgICAgICAgICAgICBzZWxmLm1heFJhbmdlRGF0ZSAmJlxyXG4gICAgICAgICAgICAgICAgZGF0ZSA8IHNlbGYubWF4UmFuZ2VEYXRlICYmXHJcbiAgICAgICAgICAgICAgICBkYXRlID4gc2VsZi5zZWxlY3RlZERhdGVzWzBdKVxyXG4gICAgICAgICAgICAgICAgc2VsZi5tYXhSYW5nZURhdGUgPSBkYXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2VsZi5jb25maWcubW9kZSA9PT0gXCJyYW5nZVwiKSB7XHJcbiAgICAgICAgICAgIGlmIChpc0RhdGVJblJhbmdlKGRhdGUpICYmICFpc0RhdGVTZWxlY3RlZChkYXRlKSlcclxuICAgICAgICAgICAgICAgIGRheUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImluUmFuZ2VcIik7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLnNlbGVjdGVkRGF0ZXMubGVuZ3RoID09PSAxICYmXHJcbiAgICAgICAgICAgICAgICBzZWxmLm1pblJhbmdlRGF0ZSAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgICAgICAgICBzZWxmLm1heFJhbmdlRGF0ZSAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgICAgICAgICAoZGF0ZSA8IHNlbGYubWluUmFuZ2VEYXRlIHx8IGRhdGUgPiBzZWxmLm1heFJhbmdlRGF0ZSkpXHJcbiAgICAgICAgICAgICAgICBkYXlFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJub3RBbGxvd2VkXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2VsZi53ZWVrTnVtYmVycyAmJlxyXG4gICAgICAgICAgICBjbGFzc05hbWUgIT09IFwicHJldk1vbnRoRGF5XCIgJiZcclxuICAgICAgICAgICAgZGF5TnVtYmVyICUgNyA9PT0gMSkge1xyXG4gICAgICAgICAgICBzZWxmLndlZWtOdW1iZXJzLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCBcIjxzcGFuIGNsYXNzPSdmbGF0cGlja3ItZGF5Jz5cIiArIHNlbGYuY29uZmlnLmdldFdlZWsoZGF0ZSkgKyBcIjwvc3Bhbj5cIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyaWdnZXJFdmVudChcIm9uRGF5Q3JlYXRlXCIsIGRheUVsZW1lbnQpO1xyXG4gICAgICAgIHJldHVybiBkYXlFbGVtZW50O1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gZm9jdXNPbkRheShjdXJyZW50SW5kZXgsIG9mZnNldCkge1xyXG4gICAgICAgIHZhciBuZXdJbmRleCA9IGN1cnJlbnRJbmRleCArIG9mZnNldCB8fCAwLCB0YXJnZXROb2RlID0gKGN1cnJlbnRJbmRleCAhPT0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgID8gc2VsZi5kYXlzLmNoaWxkTm9kZXNbbmV3SW5kZXhdXHJcbiAgICAgICAgICAgIDogc2VsZi5zZWxlY3RlZERhdGVFbGVtIHx8XHJcbiAgICAgICAgICAgICAgICBzZWxmLnRvZGF5RGF0ZUVsZW0gfHxcclxuICAgICAgICAgICAgICAgIHNlbGYuZGF5cy5jaGlsZE5vZGVzWzBdKTtcclxuICAgICAgICB2YXIgZm9jdXMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRhcmdldE5vZGUgPSB0YXJnZXROb2RlIHx8IHNlbGYuZGF5cy5jaGlsZE5vZGVzW25ld0luZGV4XTtcclxuICAgICAgICAgICAgdGFyZ2V0Tm9kZS5mb2N1cygpO1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5jb25maWcubW9kZSA9PT0gXCJyYW5nZVwiKVxyXG4gICAgICAgICAgICAgICAgb25Nb3VzZU92ZXIodGFyZ2V0Tm9kZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBpZiAodGFyZ2V0Tm9kZSA9PT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gMCkge1xyXG4gICAgICAgICAgICBpZiAob2Zmc2V0ID4gMCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jaGFuZ2VNb250aCgxLCB0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIG5ld0luZGV4ID0gbmV3SW5kZXggJSA0MjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChvZmZzZXQgPCAwKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNoYW5nZU1vbnRoKC0xLCB0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIG5ld0luZGV4ICs9IDQyO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvY3VzKCk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBidWlsZERheXMoKSB7XHJcbiAgICAgICAgaWYgKHNlbGYuZGF5c0NvbnRhaW5lciA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGZpcnN0T2ZNb250aCA9IChuZXcgRGF0ZShzZWxmLmN1cnJlbnRZZWFyLCBzZWxmLmN1cnJlbnRNb250aCwgMSkuZ2V0RGF5KCkgLVxyXG4gICAgICAgICAgICBzZWxmLmwxMG4uZmlyc3REYXlPZldlZWsgK1xyXG4gICAgICAgICAgICA3KSAlXHJcbiAgICAgICAgICAgIDcsIGlzUmFuZ2VNb2RlID0gc2VsZi5jb25maWcubW9kZSA9PT0gXCJyYW5nZVwiO1xyXG4gICAgICAgIHZhciBwcmV2TW9udGhEYXlzID0gc2VsZi51dGlscy5nZXREYXlzSW5Nb250aCgoc2VsZi5jdXJyZW50TW9udGggLSAxICsgMTIpICUgMTIpO1xyXG4gICAgICAgIHZhciBkYXlzSW5Nb250aCA9IHNlbGYudXRpbHMuZ2V0RGF5c0luTW9udGgoKSwgZGF5cyA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICAgICAgdmFyIGRheU51bWJlciA9IHByZXZNb250aERheXMgKyAxIC0gZmlyc3RPZk1vbnRoLCBkYXlJbmRleCA9IDA7XHJcbiAgICAgICAgaWYgKHNlbGYud2Vla051bWJlcnMgJiYgc2VsZi53ZWVrTnVtYmVycy5maXJzdENoaWxkKVxyXG4gICAgICAgICAgICBzZWxmLndlZWtOdW1iZXJzLnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgICAgICBpZiAoaXNSYW5nZU1vZGUpIHtcclxuICAgICAgICAgICAgc2VsZi5taW5SYW5nZURhdGUgPSBuZXcgRGF0ZShzZWxmLmN1cnJlbnRZZWFyLCBzZWxmLmN1cnJlbnRNb250aCAtIDEsIGRheU51bWJlcik7XHJcbiAgICAgICAgICAgIHNlbGYubWF4UmFuZ2VEYXRlID0gbmV3IERhdGUoc2VsZi5jdXJyZW50WWVhciwgc2VsZi5jdXJyZW50TW9udGggKyAxLCAoNDIgLSBmaXJzdE9mTW9udGgpICUgZGF5c0luTW9udGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKDsgZGF5TnVtYmVyIDw9IHByZXZNb250aERheXM7IGRheU51bWJlcisrLCBkYXlJbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGRheXMuYXBwZW5kQ2hpbGQoY3JlYXRlRGF5KFwicHJldk1vbnRoRGF5XCIsIG5ldyBEYXRlKHNlbGYuY3VycmVudFllYXIsIHNlbGYuY3VycmVudE1vbnRoIC0gMSwgZGF5TnVtYmVyKSwgZGF5TnVtYmVyLCBkYXlJbmRleCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKGRheU51bWJlciA9IDE7IGRheU51bWJlciA8PSBkYXlzSW5Nb250aDsgZGF5TnVtYmVyKyssIGRheUluZGV4KyspIHtcclxuICAgICAgICAgICAgZGF5cy5hcHBlbmRDaGlsZChjcmVhdGVEYXkoXCJcIiwgbmV3IERhdGUoc2VsZi5jdXJyZW50WWVhciwgc2VsZi5jdXJyZW50TW9udGgsIGRheU51bWJlciksIGRheU51bWJlciwgZGF5SW5kZXgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgZGF5TnVtID0gZGF5c0luTW9udGggKyAxOyBkYXlOdW0gPD0gNDIgLSBmaXJzdE9mTW9udGg7IGRheU51bSsrLCBkYXlJbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGRheXMuYXBwZW5kQ2hpbGQoY3JlYXRlRGF5KFwibmV4dE1vbnRoRGF5XCIsIG5ldyBEYXRlKHNlbGYuY3VycmVudFllYXIsIHNlbGYuY3VycmVudE1vbnRoICsgMSwgZGF5TnVtICUgZGF5c0luTW9udGgpLCBkYXlOdW0sIGRheUluZGV4KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChpc1JhbmdlTW9kZSAmJiBzZWxmLnNlbGVjdGVkRGF0ZXMubGVuZ3RoID09PSAxICYmIGRheXMuY2hpbGROb2Rlc1swXSkge1xyXG4gICAgICAgICAgICBzZWxmLl9oaWRlUHJldk1vbnRoQXJyb3cgPVxyXG4gICAgICAgICAgICAgICAgc2VsZi5faGlkZVByZXZNb250aEFycm93IHx8XHJcbiAgICAgICAgICAgICAgICAgICAgKCEhc2VsZi5taW5SYW5nZURhdGUgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5taW5SYW5nZURhdGUgPiBkYXlzLmNoaWxkTm9kZXNbMF0uZGF0ZU9iaik7XHJcbiAgICAgICAgICAgIHNlbGYuX2hpZGVOZXh0TW9udGhBcnJvdyA9XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9oaWRlTmV4dE1vbnRoQXJyb3cgfHxcclxuICAgICAgICAgICAgICAgICAgICAoISFzZWxmLm1heFJhbmdlRGF0ZSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLm1heFJhbmdlRGF0ZSA8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgRGF0ZShzZWxmLmN1cnJlbnRZZWFyLCBzZWxmLmN1cnJlbnRNb250aCArIDEsIDEpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB1cGRhdGVOYXZpZ2F0aW9uQ3VycmVudE1vbnRoKCk7XHJcbiAgICAgICAgdmFyIGRheUNvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJkYXlDb250YWluZXJcIik7XHJcbiAgICAgICAgZGF5Q29udGFpbmVyLmFwcGVuZENoaWxkKGRheXMpO1xyXG4gICAgICAgIGNsZWFyTm9kZShzZWxmLmRheXNDb250YWluZXIpO1xyXG4gICAgICAgIHNlbGYuZGF5c0NvbnRhaW5lci5pbnNlcnRCZWZvcmUoZGF5Q29udGFpbmVyLCBzZWxmLmRheXNDb250YWluZXIuZmlyc3RDaGlsZCk7XHJcbiAgICAgICAgc2VsZi5kYXlzID0gc2VsZi5kYXlzQ29udGFpbmVyLmZpcnN0Q2hpbGQ7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBidWlsZE1vbnRoTmF2KCkge1xyXG4gICAgICAgIHZhciBtb250aE5hdkZyYWdtZW50ID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuICAgICAgICBzZWxmLm1vbnRoTmF2ID0gY3JlYXRlRWxlbWVudChcImRpdlwiLCBcImZsYXRwaWNrci1tb250aFwiKTtcclxuICAgICAgICBzZWxmLnByZXZNb250aE5hdiA9IGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIFwiZmxhdHBpY2tyLXByZXYtbW9udGhcIik7XHJcbiAgICAgICAgc2VsZi5wcmV2TW9udGhOYXYuaW5uZXJIVE1MID0gc2VsZi5jb25maWcucHJldkFycm93O1xyXG4gICAgICAgIHNlbGYuY3VycmVudE1vbnRoRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIFwiY3VyLW1vbnRoXCIpO1xyXG4gICAgICAgIHZhciB5ZWFySW5wdXQgPSBjcmVhdGVOdW1iZXJJbnB1dChcImN1ci15ZWFyXCIsIHsgdGFiaW5kZXg6IFwiLTFcIiB9KTtcclxuICAgICAgICBzZWxmLmN1cnJlbnRZZWFyRWxlbWVudCA9IHllYXJJbnB1dC5jaGlsZE5vZGVzWzBdO1xyXG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy5taW5EYXRlKVxyXG4gICAgICAgICAgICBzZWxmLmN1cnJlbnRZZWFyRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLW1pblwiLCBzZWxmLmNvbmZpZy5taW5EYXRlLmdldEZ1bGxZZWFyKCkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgaWYgKHNlbGYuY29uZmlnLm1heERhdGUpIHtcclxuICAgICAgICAgICAgc2VsZi5jdXJyZW50WWVhckVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1tYXhcIiwgc2VsZi5jb25maWcubWF4RGF0ZS5nZXRGdWxsWWVhcigpLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICBzZWxmLmN1cnJlbnRZZWFyRWxlbWVudC5kaXNhYmxlZCA9XHJcbiAgICAgICAgICAgICAgICAhIXNlbGYuY29uZmlnLm1pbkRhdGUgJiZcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNvbmZpZy5taW5EYXRlLmdldEZ1bGxZZWFyKCkgPT09IHNlbGYuY29uZmlnLm1heERhdGUuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZi5uZXh0TW9udGhOYXYgPSBjcmVhdGVFbGVtZW50KFwic3BhblwiLCBcImZsYXRwaWNrci1uZXh0LW1vbnRoXCIpO1xyXG4gICAgICAgIHNlbGYubmV4dE1vbnRoTmF2LmlubmVySFRNTCA9IHNlbGYuY29uZmlnLm5leHRBcnJvdztcclxuICAgICAgICBzZWxmLm5hdmlnYXRpb25DdXJyZW50TW9udGggPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIFwiZmxhdHBpY2tyLWN1cnJlbnQtbW9udGhcIik7XHJcbiAgICAgICAgc2VsZi5uYXZpZ2F0aW9uQ3VycmVudE1vbnRoLmFwcGVuZENoaWxkKHNlbGYuY3VycmVudE1vbnRoRWxlbWVudCk7XHJcbiAgICAgICAgc2VsZi5uYXZpZ2F0aW9uQ3VycmVudE1vbnRoLmFwcGVuZENoaWxkKHllYXJJbnB1dCk7XHJcbiAgICAgICAgbW9udGhOYXZGcmFnbWVudC5hcHBlbmRDaGlsZChzZWxmLnByZXZNb250aE5hdik7XHJcbiAgICAgICAgbW9udGhOYXZGcmFnbWVudC5hcHBlbmRDaGlsZChzZWxmLm5hdmlnYXRpb25DdXJyZW50TW9udGgpO1xyXG4gICAgICAgIG1vbnRoTmF2RnJhZ21lbnQuYXBwZW5kQ2hpbGQoc2VsZi5uZXh0TW9udGhOYXYpO1xyXG4gICAgICAgIHNlbGYubW9udGhOYXYuYXBwZW5kQ2hpbGQobW9udGhOYXZGcmFnbWVudCk7XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNlbGYsIFwiX2hpZGVQcmV2TW9udGhBcnJvd1wiLCB7XHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2VsZi5fX2hpZGVQcmV2TW9udGhBcnJvdzsgfSxcclxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAoYm9vbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuX19oaWRlUHJldk1vbnRoQXJyb3cgIT09IGJvb2wpXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5wcmV2TW9udGhOYXYuc3R5bGUuZGlzcGxheSA9IGJvb2wgPyBcIm5vbmVcIiA6IFwiYmxvY2tcIjtcclxuICAgICAgICAgICAgICAgIHNlbGYuX19oaWRlUHJldk1vbnRoQXJyb3cgPSBib29sO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzZWxmLCBcIl9oaWRlTmV4dE1vbnRoQXJyb3dcIiwge1xyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNlbGYuX19oaWRlTmV4dE1vbnRoQXJyb3c7IH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKGJvb2wpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLl9faGlkZU5leHRNb250aEFycm93ICE9PSBib29sKVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYubmV4dE1vbnRoTmF2LnN0eWxlLmRpc3BsYXkgPSBib29sID8gXCJub25lXCIgOiBcImJsb2NrXCI7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9faGlkZU5leHRNb250aEFycm93ID0gYm9vbDtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgICAgICB1cGRhdGVOYXZpZ2F0aW9uQ3VycmVudE1vbnRoKCk7XHJcbiAgICAgICAgcmV0dXJuIHNlbGYubW9udGhOYXY7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBidWlsZFRpbWUoKSB7XHJcbiAgICAgICAgc2VsZi5jYWxlbmRhckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiaGFzVGltZVwiKTtcclxuICAgICAgICBpZiAoc2VsZi5jb25maWcubm9DYWxlbmRhcilcclxuICAgICAgICAgICAgc2VsZi5jYWxlbmRhckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwibm9DYWxlbmRhclwiKTtcclxuICAgICAgICBzZWxmLnRpbWVDb250YWluZXIgPSBjcmVhdGVFbGVtZW50KFwiZGl2XCIsIFwiZmxhdHBpY2tyLXRpbWVcIik7XHJcbiAgICAgICAgc2VsZi50aW1lQ29udGFpbmVyLnRhYkluZGV4ID0gLTE7XHJcbiAgICAgICAgdmFyIHNlcGFyYXRvciA9IGNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIsIFwiZmxhdHBpY2tyLXRpbWUtc2VwYXJhdG9yXCIsIFwiOlwiKTtcclxuICAgICAgICB2YXIgaG91cklucHV0ID0gY3JlYXRlTnVtYmVySW5wdXQoXCJmbGF0cGlja3ItaG91clwiKTtcclxuICAgICAgICBzZWxmLmhvdXJFbGVtZW50ID0gaG91cklucHV0LmNoaWxkTm9kZXNbMF07XHJcbiAgICAgICAgdmFyIG1pbnV0ZUlucHV0ID0gY3JlYXRlTnVtYmVySW5wdXQoXCJmbGF0cGlja3ItbWludXRlXCIpO1xyXG4gICAgICAgIHNlbGYubWludXRlRWxlbWVudCA9IG1pbnV0ZUlucHV0LmNoaWxkTm9kZXNbMF07XHJcbiAgICAgICAgc2VsZi5ob3VyRWxlbWVudC50YWJJbmRleCA9IHNlbGYubWludXRlRWxlbWVudC50YWJJbmRleCA9IC0xO1xyXG4gICAgICAgIHNlbGYuaG91ckVsZW1lbnQudmFsdWUgPSBwYWQoc2VsZi5sYXRlc3RTZWxlY3RlZERhdGVPYmpcclxuICAgICAgICAgICAgPyBzZWxmLmxhdGVzdFNlbGVjdGVkRGF0ZU9iai5nZXRIb3VycygpXHJcbiAgICAgICAgICAgIDogc2VsZi5jb25maWcudGltZV8yNGhyXHJcbiAgICAgICAgICAgICAgICA/IHNlbGYuY29uZmlnLmRlZmF1bHRIb3VyXHJcbiAgICAgICAgICAgICAgICA6IG1pbGl0YXJ5MmFtcG0oc2VsZi5jb25maWcuZGVmYXVsdEhvdXIpKTtcclxuICAgICAgICBzZWxmLm1pbnV0ZUVsZW1lbnQudmFsdWUgPSBwYWQoc2VsZi5sYXRlc3RTZWxlY3RlZERhdGVPYmpcclxuICAgICAgICAgICAgPyBzZWxmLmxhdGVzdFNlbGVjdGVkRGF0ZU9iai5nZXRNaW51dGVzKClcclxuICAgICAgICAgICAgOiBzZWxmLmNvbmZpZy5kZWZhdWx0TWludXRlKTtcclxuICAgICAgICBzZWxmLmhvdXJFbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtc3RlcFwiLCBzZWxmLmNvbmZpZy5ob3VySW5jcmVtZW50LnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIHNlbGYubWludXRlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXN0ZXBcIiwgc2VsZi5jb25maWcubWludXRlSW5jcmVtZW50LnRvU3RyaW5nKCkpO1xyXG4gICAgICAgIHNlbGYuaG91ckVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS1taW5cIiwgc2VsZi5jb25maWcudGltZV8yNGhyID8gXCIwXCIgOiBcIjFcIik7XHJcbiAgICAgICAgc2VsZi5ob3VyRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLW1heFwiLCBzZWxmLmNvbmZpZy50aW1lXzI0aHIgPyBcIjIzXCIgOiBcIjEyXCIpO1xyXG4gICAgICAgIHNlbGYubWludXRlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLW1pblwiLCBcIjBcIik7XHJcbiAgICAgICAgc2VsZi5taW51dGVFbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtbWF4XCIsIFwiNTlcIik7XHJcbiAgICAgICAgc2VsZi50aW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKGhvdXJJbnB1dCk7XHJcbiAgICAgICAgc2VsZi50aW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKHNlcGFyYXRvcik7XHJcbiAgICAgICAgc2VsZi50aW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKG1pbnV0ZUlucHV0KTtcclxuICAgICAgICBpZiAoc2VsZi5jb25maWcudGltZV8yNGhyKVxyXG4gICAgICAgICAgICBzZWxmLnRpbWVDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInRpbWUyNGhyXCIpO1xyXG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy5lbmFibGVTZWNvbmRzKSB7XHJcbiAgICAgICAgICAgIHNlbGYudGltZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiaGFzU2Vjb25kc1wiKTtcclxuICAgICAgICAgICAgdmFyIHNlY29uZElucHV0ID0gY3JlYXRlTnVtYmVySW5wdXQoXCJmbGF0cGlja3Itc2Vjb25kXCIpO1xyXG4gICAgICAgICAgICBzZWxmLnNlY29uZEVsZW1lbnQgPSBzZWNvbmRJbnB1dC5jaGlsZE5vZGVzWzBdO1xyXG4gICAgICAgICAgICBzZWxmLnNlY29uZEVsZW1lbnQudmFsdWUgPSBwYWQoc2VsZi5sYXRlc3RTZWxlY3RlZERhdGVPYmpcclxuICAgICAgICAgICAgICAgID8gc2VsZi5sYXRlc3RTZWxlY3RlZERhdGVPYmouZ2V0U2Vjb25kcygpXHJcbiAgICAgICAgICAgICAgICA6IHNlbGYuY29uZmlnLmRlZmF1bHRTZWNvbmRzKTtcclxuICAgICAgICAgICAgc2VsZi5zZWNvbmRFbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtc3RlcFwiLCBzZWxmLm1pbnV0ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1zdGVwXCIpKTtcclxuICAgICAgICAgICAgc2VsZi5zZWNvbmRFbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtbWluXCIsIHNlbGYubWludXRlRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW1pblwiKSk7XHJcbiAgICAgICAgICAgIHNlbGYuc2Vjb25kRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLW1heFwiLCBzZWxmLm1pbnV0ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1tYXhcIikpO1xyXG4gICAgICAgICAgICBzZWxmLnRpbWVDb250YWluZXIuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChcInNwYW5cIiwgXCJmbGF0cGlja3ItdGltZS1zZXBhcmF0b3JcIiwgXCI6XCIpKTtcclxuICAgICAgICAgICAgc2VsZi50aW1lQ29udGFpbmVyLmFwcGVuZENoaWxkKHNlY29uZElucHV0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFzZWxmLmNvbmZpZy50aW1lXzI0aHIpIHtcclxuICAgICAgICAgICAgc2VsZi5hbVBNID0gY3JlYXRlRWxlbWVudChcInNwYW5cIiwgXCJmbGF0cGlja3ItYW0tcG1cIiwgc2VsZi5sMTBuLmFtUE1baW50KChzZWxmLmxhdGVzdFNlbGVjdGVkRGF0ZU9ialxyXG4gICAgICAgICAgICAgICAgPyBzZWxmLmhvdXJFbGVtZW50LnZhbHVlXHJcbiAgICAgICAgICAgICAgICA6IHNlbGYuY29uZmlnLmRlZmF1bHRIb3VyKSA+IDExKV0pO1xyXG4gICAgICAgICAgICBzZWxmLmFtUE0udGl0bGUgPSBzZWxmLmwxMG4udG9nZ2xlVGl0bGU7XHJcbiAgICAgICAgICAgIHNlbGYuYW1QTS50YWJJbmRleCA9IC0xO1xyXG4gICAgICAgICAgICBzZWxmLnRpbWVDb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZi5hbVBNKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlbGYudGltZUNvbnRhaW5lcjtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGJ1aWxkV2Vla2RheXMoKSB7XHJcbiAgICAgICAgaWYgKCFzZWxmLndlZWtkYXlDb250YWluZXIpXHJcbiAgICAgICAgICAgIHNlbGYud2Vla2RheUNvbnRhaW5lciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJmbGF0cGlja3Itd2Vla2RheXNcIik7XHJcbiAgICAgICAgdmFyIGZpcnN0RGF5T2ZXZWVrID0gc2VsZi5sMTBuLmZpcnN0RGF5T2ZXZWVrO1xyXG4gICAgICAgIHZhciB3ZWVrZGF5cyA9IHNlbGYubDEwbi53ZWVrZGF5cy5zaG9ydGhhbmQuc2xpY2UoKTtcclxuICAgICAgICBpZiAoZmlyc3REYXlPZldlZWsgPiAwICYmIGZpcnN0RGF5T2ZXZWVrIDwgd2Vla2RheXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHdlZWtkYXlzID0gd2Vla2RheXMuc3BsaWNlKGZpcnN0RGF5T2ZXZWVrLCB3ZWVrZGF5cy5sZW5ndGgpLmNvbmNhdCh3ZWVrZGF5cy5zcGxpY2UoMCwgZmlyc3REYXlPZldlZWspKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZi53ZWVrZGF5Q29udGFpbmVyLmlubmVySFRNTCA9IFwiXFxuICAgIDxzcGFuIGNsYXNzPWZsYXRwaWNrci13ZWVrZGF5PlxcbiAgICAgIFwiICsgd2Vla2RheXMuam9pbihcIjwvc3Bhbj48c3BhbiBjbGFzcz1mbGF0cGlja3Itd2Vla2RheT5cIikgKyBcIlxcbiAgICA8L3NwYW4+XFxuICAgIFwiO1xyXG4gICAgICAgIHJldHVybiBzZWxmLndlZWtkYXlDb250YWluZXI7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBidWlsZFdlZWtzKCkge1xyXG4gICAgICAgIHNlbGYuY2FsZW5kYXJDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImhhc1dlZWtzXCIpO1xyXG4gICAgICAgIHZhciB3ZWVrV3JhcHBlciA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJmbGF0cGlja3Itd2Vla3dyYXBwZXJcIik7XHJcbiAgICAgICAgd2Vla1dyYXBwZXIuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudChcInNwYW5cIiwgXCJmbGF0cGlja3Itd2Vla2RheVwiLCBzZWxmLmwxMG4ud2Vla0FiYnJldmlhdGlvbikpO1xyXG4gICAgICAgIHZhciB3ZWVrTnVtYmVycyA9IGNyZWF0ZUVsZW1lbnQoXCJkaXZcIiwgXCJmbGF0cGlja3Itd2Vla3NcIik7XHJcbiAgICAgICAgd2Vla1dyYXBwZXIuYXBwZW5kQ2hpbGQod2Vla051bWJlcnMpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHdlZWtXcmFwcGVyOiB3ZWVrV3JhcHBlcixcclxuICAgICAgICAgICAgd2Vla051bWJlcnM6IHdlZWtOdW1iZXJzLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBjaGFuZ2VNb250aCh2YWx1ZSwgaXNfb2Zmc2V0LCBmcm9tX2tleWJvYXJkKSB7XHJcbiAgICAgICAgaWYgKGlzX29mZnNldCA9PT0gdm9pZCAwKSB7IGlzX29mZnNldCA9IHRydWU7IH1cclxuICAgICAgICBpZiAoZnJvbV9rZXlib2FyZCA9PT0gdm9pZCAwKSB7IGZyb21fa2V5Ym9hcmQgPSBmYWxzZTsgfVxyXG4gICAgICAgIHZhciBkZWx0YSA9IGlzX29mZnNldCA/IHZhbHVlIDogdmFsdWUgLSBzZWxmLmN1cnJlbnRNb250aDtcclxuICAgICAgICBpZiAoKGRlbHRhIDwgMCAmJiBzZWxmLl9oaWRlUHJldk1vbnRoQXJyb3cpIHx8XHJcbiAgICAgICAgICAgIChkZWx0YSA+IDAgJiYgc2VsZi5faGlkZU5leHRNb250aEFycm93KSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHNlbGYuY3VycmVudE1vbnRoICs9IGRlbHRhO1xyXG4gICAgICAgIGlmIChzZWxmLmN1cnJlbnRNb250aCA8IDAgfHwgc2VsZi5jdXJyZW50TW9udGggPiAxMSkge1xyXG4gICAgICAgICAgICBzZWxmLmN1cnJlbnRZZWFyICs9IHNlbGYuY3VycmVudE1vbnRoID4gMTEgPyAxIDogLTE7XHJcbiAgICAgICAgICAgIHNlbGYuY3VycmVudE1vbnRoID0gKHNlbGYuY3VycmVudE1vbnRoICsgMTIpICUgMTI7XHJcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudChcIm9uWWVhckNoYW5nZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnVpbGREYXlzKCk7XHJcbiAgICAgICAgdHJpZ2dlckV2ZW50KFwib25Nb250aENoYW5nZVwiKTtcclxuICAgICAgICB1cGRhdGVOYXZpZ2F0aW9uQ3VycmVudE1vbnRoKCk7XHJcbiAgICAgICAgaWYgKGZyb21fa2V5Ym9hcmQgJiZcclxuICAgICAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJlxyXG4gICAgICAgICAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LiRpKSB7XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuJGk7XHJcbiAgICAgICAgICAgIGZvY3VzT25EYXkoaW5kZXgsIDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGNsZWFyKHRyaWdnZXJDaGFuZ2VFdmVudCkge1xyXG4gICAgICAgIGlmICh0cmlnZ2VyQ2hhbmdlRXZlbnQgPT09IHZvaWQgMCkgeyB0cmlnZ2VyQ2hhbmdlRXZlbnQgPSB0cnVlOyB9XHJcbiAgICAgICAgc2VsZi5pbnB1dC52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgaWYgKHNlbGYuYWx0SW5wdXQpXHJcbiAgICAgICAgICAgIHNlbGYuYWx0SW5wdXQudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgIGlmIChzZWxmLm1vYmlsZUlucHV0KVxyXG4gICAgICAgICAgICBzZWxmLm1vYmlsZUlucHV0LnZhbHVlID0gXCJcIjtcclxuICAgICAgICBzZWxmLnNlbGVjdGVkRGF0ZXMgPSBbXTtcclxuICAgICAgICBzZWxmLmxhdGVzdFNlbGVjdGVkRGF0ZU9iaiA9IHVuZGVmaW5lZDtcclxuICAgICAgICBzZWxmLnNob3dUaW1lSW5wdXQgPSBmYWxzZTtcclxuICAgICAgICBpZiAoc2VsZi5jb25maWcuZW5hYmxlVGltZSkge1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5jb25maWcubWluRGF0ZSAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICAgICAgc2V0SG91cnNGcm9tRGF0ZShzZWxmLmNvbmZpZy5taW5EYXRlKTtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgc2V0SG91cnMoc2VsZi5jb25maWcuZGVmYXVsdEhvdXIsIHNlbGYuY29uZmlnLmRlZmF1bHRNaW51dGUsIHNlbGYuY29uZmlnLmRlZmF1bHRTZWNvbmRzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc2VsZi5yZWRyYXcoKTtcclxuICAgICAgICBpZiAodHJpZ2dlckNoYW5nZUV2ZW50KVxyXG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnQoXCJvbkNoYW5nZVwiKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGNsb3NlKCkge1xyXG4gICAgICAgIHNlbGYuaXNPcGVuID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKCFzZWxmLmlzTW9iaWxlKSB7XHJcbiAgICAgICAgICAgIHNlbGYuY2FsZW5kYXJDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcIm9wZW5cIik7XHJcbiAgICAgICAgICAgIHNlbGYuX2lucHV0LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyaWdnZXJFdmVudChcIm9uQ2xvc2VcIik7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBkZXN0cm95KCkge1xyXG4gICAgICAgIGlmIChzZWxmLmNvbmZpZyAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnQoXCJvbkRlc3Ryb3lcIik7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IHNlbGYuX2hhbmRsZXJzLmxlbmd0aDsgaS0tOykge1xyXG4gICAgICAgICAgICB2YXIgaCA9IHNlbGYuX2hhbmRsZXJzW2ldO1xyXG4gICAgICAgICAgICBoLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihoLmV2ZW50LCBoLmhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxmLl9oYW5kbGVycyA9IFtdO1xyXG4gICAgICAgIGlmIChzZWxmLm1vYmlsZUlucHV0KSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLm1vYmlsZUlucHV0LnBhcmVudE5vZGUpXHJcbiAgICAgICAgICAgICAgICBzZWxmLm1vYmlsZUlucHV0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2VsZi5tb2JpbGVJbnB1dCk7XHJcbiAgICAgICAgICAgIHNlbGYubW9iaWxlSW5wdXQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHNlbGYuY2FsZW5kYXJDb250YWluZXIgJiYgc2VsZi5jYWxlbmRhckNvbnRhaW5lci5wYXJlbnROb2RlKVxyXG4gICAgICAgICAgICBzZWxmLmNhbGVuZGFyQ29udGFpbmVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2VsZi5jYWxlbmRhckNvbnRhaW5lcik7XHJcbiAgICAgICAgaWYgKHNlbGYuYWx0SW5wdXQpIHtcclxuICAgICAgICAgICAgc2VsZi5pbnB1dC50eXBlID0gXCJ0ZXh0XCI7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLmFsdElucHV0LnBhcmVudE5vZGUpXHJcbiAgICAgICAgICAgICAgICBzZWxmLmFsdElucHV0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2VsZi5hbHRJbnB1dCk7XHJcbiAgICAgICAgICAgIGRlbGV0ZSBzZWxmLmFsdElucHV0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoc2VsZi5pbnB1dCkge1xyXG4gICAgICAgICAgICBzZWxmLmlucHV0LnR5cGUgPSBzZWxmLmlucHV0Ll90eXBlO1xyXG4gICAgICAgICAgICBzZWxmLmlucHV0LmNsYXNzTGlzdC5yZW1vdmUoXCJmbGF0cGlja3ItaW5wdXRcIik7XHJcbiAgICAgICAgICAgIHNlbGYuaW5wdXQucmVtb3ZlQXR0cmlidXRlKFwicmVhZG9ubHlcIik7XHJcbiAgICAgICAgICAgIHNlbGYuaW5wdXQudmFsdWUgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBbXHJcbiAgICAgICAgICAgIFwiX3Nob3dUaW1lSW5wdXRcIixcclxuICAgICAgICAgICAgXCJsYXRlc3RTZWxlY3RlZERhdGVPYmpcIixcclxuICAgICAgICAgICAgXCJfaGlkZU5leHRNb250aEFycm93XCIsXHJcbiAgICAgICAgICAgIFwiX2hpZGVQcmV2TW9udGhBcnJvd1wiLFxyXG4gICAgICAgICAgICBcIl9faGlkZU5leHRNb250aEFycm93XCIsXHJcbiAgICAgICAgICAgIFwiX19oaWRlUHJldk1vbnRoQXJyb3dcIixcclxuICAgICAgICAgICAgXCJpc01vYmlsZVwiLFxyXG4gICAgICAgICAgICBcImlzT3BlblwiLFxyXG4gICAgICAgICAgICBcInNlbGVjdGVkRGF0ZUVsZW1cIixcclxuICAgICAgICAgICAgXCJtaW5EYXRlSGFzVGltZVwiLFxyXG4gICAgICAgICAgICBcIm1heERhdGVIYXNUaW1lXCIsXHJcbiAgICAgICAgICAgIFwiZGF5c1wiLFxyXG4gICAgICAgICAgICBcImRheXNDb250YWluZXJcIixcclxuICAgICAgICAgICAgXCJfaW5wdXRcIixcclxuICAgICAgICAgICAgXCJfcG9zaXRpb25FbGVtZW50XCIsXHJcbiAgICAgICAgICAgIFwiaW5uZXJDb250YWluZXJcIixcclxuICAgICAgICAgICAgXCJyQ29udGFpbmVyXCIsXHJcbiAgICAgICAgICAgIFwibW9udGhOYXZcIixcclxuICAgICAgICAgICAgXCJ0b2RheURhdGVFbGVtXCIsXHJcbiAgICAgICAgICAgIFwiY2FsZW5kYXJDb250YWluZXJcIixcclxuICAgICAgICAgICAgXCJ3ZWVrZGF5Q29udGFpbmVyXCIsXHJcbiAgICAgICAgICAgIFwicHJldk1vbnRoTmF2XCIsXHJcbiAgICAgICAgICAgIFwibmV4dE1vbnRoTmF2XCIsXHJcbiAgICAgICAgICAgIFwiY3VycmVudE1vbnRoRWxlbWVudFwiLFxyXG4gICAgICAgICAgICBcImN1cnJlbnRZZWFyRWxlbWVudFwiLFxyXG4gICAgICAgICAgICBcIm5hdmlnYXRpb25DdXJyZW50TW9udGhcIixcclxuICAgICAgICAgICAgXCJzZWxlY3RlZERhdGVFbGVtXCIsXHJcbiAgICAgICAgICAgIFwiY29uZmlnXCIsXHJcbiAgICAgICAgXS5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgc2VsZltrXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXRjaCAoXykgeyB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBpc0NhbGVuZGFyRWxlbShlbGVtKSB7XHJcbiAgICAgICAgaWYgKHNlbGYuY29uZmlnLmFwcGVuZFRvICYmIHNlbGYuY29uZmlnLmFwcGVuZFRvLmNvbnRhaW5zKGVsZW0pKVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gc2VsZi5jYWxlbmRhckNvbnRhaW5lci5jb250YWlucyhlbGVtKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGRvY3VtZW50Q2xpY2soZSkge1xyXG4gICAgICAgIGlmIChzZWxmLmlzT3BlbiAmJiAhc2VsZi5jb25maWcuaW5saW5lKSB7XHJcbiAgICAgICAgICAgIHZhciBpc0NhbGVuZGFyRWxlbWVudCA9IGlzQ2FsZW5kYXJFbGVtKGUudGFyZ2V0KTtcclxuICAgICAgICAgICAgdmFyIGlzSW5wdXQgPSBlLnRhcmdldCA9PT0gc2VsZi5pbnB1dCB8fFxyXG4gICAgICAgICAgICAgICAgZS50YXJnZXQgPT09IHNlbGYuYWx0SW5wdXQgfHxcclxuICAgICAgICAgICAgICAgIHNlbGYuZWxlbWVudC5jb250YWlucyhlLnRhcmdldCkgfHxcclxuICAgICAgICAgICAgICAgIChlLnBhdGggJiZcclxuICAgICAgICAgICAgICAgICAgICBlLnBhdGguaW5kZXhPZiAmJlxyXG4gICAgICAgICAgICAgICAgICAgICh+ZS5wYXRoLmluZGV4T2Yoc2VsZi5pbnB1dCkgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfmUucGF0aC5pbmRleE9mKHNlbGYuYWx0SW5wdXQpKSk7XHJcbiAgICAgICAgICAgIHZhciBsb3N0Rm9jdXMgPSBlLnR5cGUgPT09IFwiYmx1clwiXHJcbiAgICAgICAgICAgICAgICA/IGlzSW5wdXQgJiZcclxuICAgICAgICAgICAgICAgICAgICBlLnJlbGF0ZWRUYXJnZXQgJiZcclxuICAgICAgICAgICAgICAgICAgICAhaXNDYWxlbmRhckVsZW0oZS5yZWxhdGVkVGFyZ2V0KVxyXG4gICAgICAgICAgICAgICAgOiAhaXNJbnB1dCAmJiAhaXNDYWxlbmRhckVsZW1lbnQ7XHJcbiAgICAgICAgICAgIHZhciBpc0lnbm9yZWQgPSAhc2VsZi5jb25maWcuaWdub3JlZEZvY3VzRWxlbWVudHMuc29tZShmdW5jdGlvbiAoZWxlbSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW0uY29udGFpbnMoZS50YXJnZXQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGxvc3RGb2N1cyAmJiBpc0lnbm9yZWQpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLmNvbmZpZy5tb2RlID09PSBcInJhbmdlXCIgJiYgc2VsZi5zZWxlY3RlZERhdGVzLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY2xlYXIoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucmVkcmF3KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBjaGFuZ2VZZWFyKG5ld1llYXIpIHtcclxuICAgICAgICBpZiAoIW5ld1llYXIgfHxcclxuICAgICAgICAgICAgKHNlbGYuY3VycmVudFllYXJFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtbWluXCIpICYmXHJcbiAgICAgICAgICAgICAgICBuZXdZZWFyIDxcclxuICAgICAgICAgICAgICAgICAgICBwYXJzZUludChzZWxmLmN1cnJlbnRZZWFyRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW1pblwiKSkpIHx8XHJcbiAgICAgICAgICAgIChzZWxmLmN1cnJlbnRZZWFyRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLW1heFwiKSAmJlxyXG4gICAgICAgICAgICAgICAgbmV3WWVhciA+XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VJbnQoc2VsZi5jdXJyZW50WWVhckVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1tYXhcIikpKSlcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIHZhciBuZXdZZWFyTnVtID0gbmV3WWVhciwgaXNOZXdZZWFyID0gc2VsZi5jdXJyZW50WWVhciAhPT0gbmV3WWVhck51bTtcclxuICAgICAgICBzZWxmLmN1cnJlbnRZZWFyID0gbmV3WWVhck51bSB8fCBzZWxmLmN1cnJlbnRZZWFyO1xyXG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy5tYXhEYXRlICYmXHJcbiAgICAgICAgICAgIHNlbGYuY3VycmVudFllYXIgPT09IHNlbGYuY29uZmlnLm1heERhdGUuZ2V0RnVsbFllYXIoKSkge1xyXG4gICAgICAgICAgICBzZWxmLmN1cnJlbnRNb250aCA9IE1hdGgubWluKHNlbGYuY29uZmlnLm1heERhdGUuZ2V0TW9udGgoKSwgc2VsZi5jdXJyZW50TW9udGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChzZWxmLmNvbmZpZy5taW5EYXRlICYmXHJcbiAgICAgICAgICAgIHNlbGYuY3VycmVudFllYXIgPT09IHNlbGYuY29uZmlnLm1pbkRhdGUuZ2V0RnVsbFllYXIoKSkge1xyXG4gICAgICAgICAgICBzZWxmLmN1cnJlbnRNb250aCA9IE1hdGgubWF4KHNlbGYuY29uZmlnLm1pbkRhdGUuZ2V0TW9udGgoKSwgc2VsZi5jdXJyZW50TW9udGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNOZXdZZWFyKSB7XHJcbiAgICAgICAgICAgIHNlbGYucmVkcmF3KCk7XHJcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudChcIm9uWWVhckNoYW5nZVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBpc0VuYWJsZWQoZGF0ZSwgdGltZWxlc3MpIHtcclxuICAgICAgICBpZiAodGltZWxlc3MgPT09IHZvaWQgMCkgeyB0aW1lbGVzcyA9IHRydWU7IH1cclxuICAgICAgICB2YXIgZGF0ZVRvQ2hlY2sgPSBzZWxmLnBhcnNlRGF0ZShkYXRlLCB1bmRlZmluZWQsIHRpbWVsZXNzKTtcclxuICAgICAgICBpZiAoKHNlbGYuY29uZmlnLm1pbkRhdGUgJiZcclxuICAgICAgICAgICAgZGF0ZVRvQ2hlY2sgJiZcclxuICAgICAgICAgICAgY29tcGFyZURhdGVzKGRhdGVUb0NoZWNrLCBzZWxmLmNvbmZpZy5taW5EYXRlLCB0aW1lbGVzcyAhPT0gdW5kZWZpbmVkID8gdGltZWxlc3MgOiAhc2VsZi5taW5EYXRlSGFzVGltZSkgPCAwKSB8fFxyXG4gICAgICAgICAgICAoc2VsZi5jb25maWcubWF4RGF0ZSAmJlxyXG4gICAgICAgICAgICAgICAgZGF0ZVRvQ2hlY2sgJiZcclxuICAgICAgICAgICAgICAgIGNvbXBhcmVEYXRlcyhkYXRlVG9DaGVjaywgc2VsZi5jb25maWcubWF4RGF0ZSwgdGltZWxlc3MgIT09IHVuZGVmaW5lZCA/IHRpbWVsZXNzIDogIXNlbGYubWF4RGF0ZUhhc1RpbWUpID4gMCkpXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAoIXNlbGYuY29uZmlnLmVuYWJsZS5sZW5ndGggJiYgIXNlbGYuY29uZmlnLmRpc2FibGUubGVuZ3RoKVxyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICBpZiAoZGF0ZVRvQ2hlY2sgPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHZhciBib29sID0gc2VsZi5jb25maWcuZW5hYmxlLmxlbmd0aCA+IDAsIGFycmF5ID0gYm9vbCA/IHNlbGYuY29uZmlnLmVuYWJsZSA6IHNlbGYuY29uZmlnLmRpc2FibGU7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGQgPSB2b2lkIDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBkID0gYXJyYXlbaV07XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZCA9PT0gXCJmdW5jdGlvblwiICYmXHJcbiAgICAgICAgICAgICAgICBkKGRhdGVUb0NoZWNrKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBib29sO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChkIGluc3RhbmNlb2YgRGF0ZSAmJlxyXG4gICAgICAgICAgICAgICAgZGF0ZVRvQ2hlY2sgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgICAgICAgICAgZC5nZXRUaW1lKCkgPT09IGRhdGVUb0NoZWNrLmdldFRpbWUoKSlcclxuICAgICAgICAgICAgICAgIHJldHVybiBib29sO1xyXG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgZCA9PT0gXCJzdHJpbmdcIiAmJiBkYXRlVG9DaGVjayAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGFyc2VkID0gc2VsZi5wYXJzZURhdGUoZCwgdW5kZWZpbmVkLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZWQgJiYgcGFyc2VkLmdldFRpbWUoKSA9PT0gZGF0ZVRvQ2hlY2suZ2V0VGltZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgPyBib29sXHJcbiAgICAgICAgICAgICAgICAgICAgOiAhYm9vbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgZCA9PT0gXCJvYmplY3RcIiAmJlxyXG4gICAgICAgICAgICAgICAgZGF0ZVRvQ2hlY2sgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgICAgICAgICAgZC5mcm9tICYmXHJcbiAgICAgICAgICAgICAgICBkLnRvICYmXHJcbiAgICAgICAgICAgICAgICBkYXRlVG9DaGVjay5nZXRUaW1lKCkgPj0gZC5mcm9tLmdldFRpbWUoKSAmJlxyXG4gICAgICAgICAgICAgICAgZGF0ZVRvQ2hlY2suZ2V0VGltZSgpIDw9IGQudG8uZ2V0VGltZSgpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJvb2w7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAhYm9vbDtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIG9uS2V5RG93bihlKSB7XHJcbiAgICAgICAgdmFyIGlzSW5wdXQgPSBlLnRhcmdldCA9PT0gc2VsZi5faW5wdXQ7XHJcbiAgICAgICAgdmFyIGNhbGVuZGFyRWxlbSA9IGlzQ2FsZW5kYXJFbGVtKGUudGFyZ2V0KTtcclxuICAgICAgICB2YXIgYWxsb3dJbnB1dCA9IHNlbGYuY29uZmlnLmFsbG93SW5wdXQ7XHJcbiAgICAgICAgdmFyIGFsbG93S2V5ZG93biA9IHNlbGYuaXNPcGVuICYmICghYWxsb3dJbnB1dCB8fCAhaXNJbnB1dCk7XHJcbiAgICAgICAgdmFyIGFsbG93SW5saW5lS2V5ZG93biA9IHNlbGYuY29uZmlnLmlubGluZSAmJiBpc0lucHV0ICYmICFhbGxvd0lucHV0O1xyXG4gICAgICAgIGlmIChlLmtleUNvZGUgPT09IDEzICYmIGlzSW5wdXQpIHtcclxuICAgICAgICAgICAgaWYgKGFsbG93SW5wdXQpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0RGF0ZShzZWxmLl9pbnB1dC52YWx1ZSwgdHJ1ZSwgZS50YXJnZXQgPT09IHNlbGYuYWx0SW5wdXRcclxuICAgICAgICAgICAgICAgICAgICA/IHNlbGYuY29uZmlnLmFsdEZvcm1hdFxyXG4gICAgICAgICAgICAgICAgICAgIDogc2VsZi5jb25maWcuZGF0ZUZvcm1hdCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZS50YXJnZXQuYmx1cigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHNlbGYub3BlbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChjYWxlbmRhckVsZW0gfHwgYWxsb3dLZXlkb3duIHx8IGFsbG93SW5saW5lS2V5ZG93bikge1xyXG4gICAgICAgICAgICB2YXIgaXNUaW1lT2JqID0gISFzZWxmLnRpbWVDb250YWluZXIgJiZcclxuICAgICAgICAgICAgICAgIHNlbGYudGltZUNvbnRhaW5lci5jb250YWlucyhlLnRhcmdldCk7XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZS5rZXlDb2RlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDEzOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1RpbWVPYmopXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVZhbHVlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3REYXRlKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAyNzpcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jbG9zZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA4OlxyXG4gICAgICAgICAgICAgICAgY2FzZSA0NjpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNJbnB1dCAmJiAhc2VsZi5jb25maWcuYWxsb3dJbnB1dClcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5jbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSAzNzpcclxuICAgICAgICAgICAgICAgIGNhc2UgMzk6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1RpbWVPYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5kYXlzQ29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGVsdGFfMSA9IGUua2V5Q29kZSA9PT0gMzkgPyAxIDogLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWUuY3RybEtleSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb2N1c09uRGF5KGUudGFyZ2V0LiRpLCBkZWx0YV8xKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFuZ2VNb250aChkZWx0YV8xLCB0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChzZWxmLmhvdXJFbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmhvdXJFbGVtZW50LmZvY3VzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDM4OlxyXG4gICAgICAgICAgICAgICAgY2FzZSA0MDpcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlbHRhID0gZS5rZXlDb2RlID09PSA0MCA/IDEgOiAtMTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5kYXlzQ29udGFpbmVyICYmIGUudGFyZ2V0LiRpICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGUuY3RybEtleSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbmdlWWVhcihzZWxmLmN1cnJlbnRZZWFyIC0gZGVsdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNPbkRheShlLnRhcmdldC4kaSwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoIWlzVGltZU9iailcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvY3VzT25EYXkoZS50YXJnZXQuJGksIGRlbHRhICogNyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNlbGYuY29uZmlnLmVuYWJsZVRpbWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1RpbWVPYmogJiYgc2VsZi5ob3VyRWxlbWVudClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuaG91ckVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlVGltZShlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fZGVib3VuY2VkQ2hhbmdlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA5OlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldCA9PT0gc2VsZi5ob3VyRWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubWludXRlRWxlbWVudC5zZWxlY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZS50YXJnZXQgPT09IHNlbGYubWludXRlRWxlbWVudCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoc2VsZi5zZWNvbmRFbGVtZW50IHx8IHNlbGYuYW1QTSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5zZWNvbmRFbGVtZW50ICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNlY29uZEVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoc2VsZi5hbVBNICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFtUE0uZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZS50YXJnZXQgPT09IHNlbGYuc2Vjb25kRWxlbWVudCAmJiBzZWxmLmFtUE0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFtUE0uZm9jdXMoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN3aXRjaCAoZS5rZXkpIHtcclxuICAgICAgICAgICAgICAgIGNhc2Ugc2VsZi5sMTBuLmFtUE1bMF0uY2hhckF0KDApOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxmLmFtUE0gIT09IHVuZGVmaW5lZCAmJiBlLnRhcmdldCA9PT0gc2VsZi5hbVBNKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuYW1QTS50ZXh0Q29udGVudCA9IHNlbGYubDEwbi5hbVBNWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRIb3Vyc0Zyb21JbnB1dHMoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlVmFsdWUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHNlbGYubDEwbi5hbVBNWzFdLmNoYXJBdCgwKTpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZi5hbVBNICE9PSB1bmRlZmluZWQgJiYgZS50YXJnZXQgPT09IHNlbGYuYW1QTSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmFtUE0udGV4dENvbnRlbnQgPSBzZWxmLmwxMG4uYW1QTVsxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0SG91cnNGcm9tSW5wdXRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVZhbHVlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnQoXCJvbktleURvd25cIiwgZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gb25Nb3VzZU92ZXIoZWxlbSkge1xyXG4gICAgICAgIGlmIChzZWxmLnNlbGVjdGVkRGF0ZXMubGVuZ3RoICE9PSAxIHx8XHJcbiAgICAgICAgICAgICFlbGVtLmNsYXNzTGlzdC5jb250YWlucyhcImZsYXRwaWNrci1kYXlcIikgfHxcclxuICAgICAgICAgICAgZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJkaXNhYmxlZFwiKSB8fFxyXG4gICAgICAgICAgICBzZWxmLm1pblJhbmdlRGF0ZSA9PT0gdW5kZWZpbmVkIHx8XHJcbiAgICAgICAgICAgIHNlbGYubWF4UmFuZ2VEYXRlID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB2YXIgaG92ZXJEYXRlID0gZWxlbS5kYXRlT2JqLCBpbml0aWFsRGF0ZSA9IHNlbGYucGFyc2VEYXRlKHNlbGYuc2VsZWN0ZWREYXRlc1swXSwgdW5kZWZpbmVkLCB0cnVlKSwgcmFuZ2VTdGFydERhdGUgPSBNYXRoLm1pbihob3ZlckRhdGUuZ2V0VGltZSgpLCBzZWxmLnNlbGVjdGVkRGF0ZXNbMF0uZ2V0VGltZSgpKSwgcmFuZ2VFbmREYXRlID0gTWF0aC5tYXgoaG92ZXJEYXRlLmdldFRpbWUoKSwgc2VsZi5zZWxlY3RlZERhdGVzWzBdLmdldFRpbWUoKSksIGNvbnRhaW5zRGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICBmb3IgKHZhciB0ID0gcmFuZ2VTdGFydERhdGU7IHQgPCByYW5nZUVuZERhdGU7IHQgKz0gZHVyYXRpb24uREFZKSB7XHJcbiAgICAgICAgICAgIGlmICghaXNFbmFibGVkKG5ldyBEYXRlKHQpKSkge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbnNEaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgX2xvb3BfMSA9IGZ1bmN0aW9uIChpLCBkYXRlKSB7XHJcbiAgICAgICAgICAgIHZhciB0aW1lc3RhbXAgPSBkYXRlLmdldFRpbWUoKTtcclxuICAgICAgICAgICAgdmFyIG91dE9mUmFuZ2UgPSB0aW1lc3RhbXAgPCBzZWxmLm1pblJhbmdlRGF0ZS5nZXRUaW1lKCkgfHxcclxuICAgICAgICAgICAgICAgIHRpbWVzdGFtcCA+IHNlbGYubWF4UmFuZ2VEYXRlLmdldFRpbWUoKSwgZGF5RWxlbSA9IHNlbGYuZGF5cy5jaGlsZE5vZGVzW2ldO1xyXG4gICAgICAgICAgICBpZiAob3V0T2ZSYW5nZSkge1xyXG4gICAgICAgICAgICAgICAgZGF5RWxlbS5jbGFzc0xpc3QuYWRkKFwibm90QWxsb3dlZFwiKTtcclxuICAgICAgICAgICAgICAgIFtcImluUmFuZ2VcIiwgXCJzdGFydFJhbmdlXCIsIFwiZW5kUmFuZ2VcIl0uZm9yRWFjaChmdW5jdGlvbiAoYykge1xyXG4gICAgICAgICAgICAgICAgICAgIGRheUVsZW0uY2xhc3NMaXN0LnJlbW92ZShjKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiY29udGludWVcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChjb250YWluc0Rpc2FibGVkICYmICFvdXRPZlJhbmdlKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiY29udGludWVcIjtcclxuICAgICAgICAgICAgW1wic3RhcnRSYW5nZVwiLCBcImluUmFuZ2VcIiwgXCJlbmRSYW5nZVwiLCBcIm5vdEFsbG93ZWRcIl0uZm9yRWFjaChmdW5jdGlvbiAoYykge1xyXG4gICAgICAgICAgICAgICAgZGF5RWxlbS5jbGFzc0xpc3QucmVtb3ZlKGMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdmFyIG1pblJhbmdlRGF0ZSA9IE1hdGgubWF4KHNlbGYubWluUmFuZ2VEYXRlLmdldFRpbWUoKSwgcmFuZ2VTdGFydERhdGUpLCBtYXhSYW5nZURhdGUgPSBNYXRoLm1pbihzZWxmLm1heFJhbmdlRGF0ZS5nZXRUaW1lKCksIHJhbmdlRW5kRGF0ZSk7XHJcbiAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LmFkZChob3ZlckRhdGUgPCBzZWxmLnNlbGVjdGVkRGF0ZXNbMF0gPyBcInN0YXJ0UmFuZ2VcIiA6IFwiZW5kUmFuZ2VcIik7XHJcbiAgICAgICAgICAgIGlmIChpbml0aWFsRGF0ZSA8IGhvdmVyRGF0ZSAmJiB0aW1lc3RhbXAgPT09IGluaXRpYWxEYXRlLmdldFRpbWUoKSlcclxuICAgICAgICAgICAgICAgIGRheUVsZW0uY2xhc3NMaXN0LmFkZChcInN0YXJ0UmFuZ2VcIik7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGluaXRpYWxEYXRlID4gaG92ZXJEYXRlICYmIHRpbWVzdGFtcCA9PT0gaW5pdGlhbERhdGUuZ2V0VGltZSgpKVxyXG4gICAgICAgICAgICAgICAgZGF5RWxlbS5jbGFzc0xpc3QuYWRkKFwiZW5kUmFuZ2VcIik7XHJcbiAgICAgICAgICAgIGlmICh0aW1lc3RhbXAgPj0gbWluUmFuZ2VEYXRlICYmIHRpbWVzdGFtcCA8PSBtYXhSYW5nZURhdGUpXHJcbiAgICAgICAgICAgICAgICBkYXlFbGVtLmNsYXNzTGlzdC5hZGQoXCJpblJhbmdlXCIpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGRhdGUgPSBzZWxmLmRheXMuY2hpbGROb2Rlc1tpXS5kYXRlT2JqOyBpIDwgNDI7IGkrKywgZGF0ZSA9XHJcbiAgICAgICAgICAgICAgICBzZWxmLmRheXMuY2hpbGROb2Rlc1tpXSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZGF5cy5jaGlsZE5vZGVzW2ldLmRhdGVPYmopIHtcclxuICAgICAgICAgICAgX2xvb3BfMShpLCBkYXRlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBvblJlc2l6ZSgpIHtcclxuICAgICAgICBpZiAoc2VsZi5pc09wZW4gJiYgIXNlbGYuY29uZmlnLnN0YXRpYyAmJiAhc2VsZi5jb25maWcuaW5saW5lKVxyXG4gICAgICAgICAgICBwb3NpdGlvbkNhbGVuZGFyKCk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBvcGVuKGUsIHBvc2l0aW9uRWxlbWVudCkge1xyXG4gICAgICAgIGlmIChwb3NpdGlvbkVsZW1lbnQgPT09IHZvaWQgMCkgeyBwb3NpdGlvbkVsZW1lbnQgPSBzZWxmLl9pbnB1dDsgfVxyXG4gICAgICAgIGlmIChzZWxmLmlzTW9iaWxlKSB7XHJcbiAgICAgICAgICAgIGlmIChlKSB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBlLnRhcmdldCAmJiBlLnRhcmdldC5ibHVyKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLm1vYmlsZUlucHV0ICE9PSB1bmRlZmluZWQgJiYgc2VsZi5tb2JpbGVJbnB1dC5jbGljaygpO1xyXG4gICAgICAgICAgICB9LCAwKTtcclxuICAgICAgICAgICAgdHJpZ2dlckV2ZW50KFwib25PcGVuXCIpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzZWxmLl9pbnB1dC5kaXNhYmxlZCB8fCBzZWxmLmNvbmZpZy5pbmxpbmUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB2YXIgd2FzT3BlbiA9IHNlbGYuaXNPcGVuO1xyXG4gICAgICAgIHNlbGYuaXNPcGVuID0gdHJ1ZTtcclxuICAgICAgICBpZiAoIXdhc09wZW4pIHtcclxuICAgICAgICAgICAgc2VsZi5jYWxlbmRhckNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwib3BlblwiKTtcclxuICAgICAgICAgICAgc2VsZi5faW5wdXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgdHJpZ2dlckV2ZW50KFwib25PcGVuXCIpO1xyXG4gICAgICAgICAgICBwb3NpdGlvbkNhbGVuZGFyKHBvc2l0aW9uRWxlbWVudCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gbWluTWF4RGF0ZVNldHRlcih0eXBlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChkYXRlKSB7XHJcbiAgICAgICAgICAgIHZhciBkYXRlT2JqID0gKHNlbGYuY29uZmlnW1wiX1wiICsgdHlwZSArIFwiRGF0ZVwiXSA9IHNlbGYucGFyc2VEYXRlKGRhdGUsIHNlbGYuY29uZmlnLmRhdGVGb3JtYXQpKTtcclxuICAgICAgICAgICAgdmFyIGludmVyc2VEYXRlT2JqID0gc2VsZi5jb25maWdbXCJfXCIgKyAodHlwZSA9PT0gXCJtaW5cIiA/IFwibWF4XCIgOiBcIm1pblwiKSArIFwiRGF0ZVwiXTtcclxuICAgICAgICAgICAgaWYgKGRhdGVPYmogIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZlt0eXBlID09PSBcIm1pblwiID8gXCJtaW5EYXRlSGFzVGltZVwiIDogXCJtYXhEYXRlSGFzVGltZVwiXSA9XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZU9iai5nZXRIb3VycygpID4gMCB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRlT2JqLmdldE1pbnV0ZXMoKSA+IDAgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZU9iai5nZXRTZWNvbmRzKCkgPiAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzZWxmLnNlbGVjdGVkRGF0ZXMpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWREYXRlcyA9IHNlbGYuc2VsZWN0ZWREYXRlcy5maWx0ZXIoZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGlzRW5hYmxlZChkKTsgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNlbGYuc2VsZWN0ZWREYXRlcy5sZW5ndGggJiYgdHlwZSA9PT0gXCJtaW5cIilcclxuICAgICAgICAgICAgICAgICAgICBzZXRIb3Vyc0Zyb21EYXRlKGRhdGVPYmopO1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlVmFsdWUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc2VsZi5kYXlzQ29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgICAgICByZWRyYXcoKTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRlT2JqICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jdXJyZW50WWVhckVsZW1lbnRbdHlwZV0gPSBkYXRlT2JqLmdldEZ1bGxZZWFyKCkudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmN1cnJlbnRZZWFyRWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUodHlwZSk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmN1cnJlbnRZZWFyRWxlbWVudC5kaXNhYmxlZCA9XHJcbiAgICAgICAgICAgICAgICAgICAgISFpbnZlcnNlRGF0ZU9iaiAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRlT2JqICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgaW52ZXJzZURhdGVPYmouZ2V0RnVsbFllYXIoKSA9PT0gZGF0ZU9iai5nZXRGdWxsWWVhcigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHBhcnNlQ29uZmlnKCkge1xyXG4gICAgICAgIHZhciBib29sT3B0cyA9IFtcclxuICAgICAgICAgICAgXCJ3cmFwXCIsXHJcbiAgICAgICAgICAgIFwid2Vla051bWJlcnNcIixcclxuICAgICAgICAgICAgXCJhbGxvd0lucHV0XCIsXHJcbiAgICAgICAgICAgIFwiY2xpY2tPcGVuc1wiLFxyXG4gICAgICAgICAgICBcInRpbWVfMjRoclwiLFxyXG4gICAgICAgICAgICBcImVuYWJsZVRpbWVcIixcclxuICAgICAgICAgICAgXCJub0NhbGVuZGFyXCIsXHJcbiAgICAgICAgICAgIFwiYWx0SW5wdXRcIixcclxuICAgICAgICAgICAgXCJzaG9ydGhhbmRDdXJyZW50TW9udGhcIixcclxuICAgICAgICAgICAgXCJpbmxpbmVcIixcclxuICAgICAgICAgICAgXCJzdGF0aWNcIixcclxuICAgICAgICAgICAgXCJlbmFibGVTZWNvbmRzXCIsXHJcbiAgICAgICAgICAgIFwiZGlzYWJsZU1vYmlsZVwiLFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgdmFyIGhvb2tzID0gW1xyXG4gICAgICAgICAgICBcIm9uQ2hhbmdlXCIsXHJcbiAgICAgICAgICAgIFwib25DbG9zZVwiLFxyXG4gICAgICAgICAgICBcIm9uRGF5Q3JlYXRlXCIsXHJcbiAgICAgICAgICAgIFwib25EZXN0cm95XCIsXHJcbiAgICAgICAgICAgIFwib25LZXlEb3duXCIsXHJcbiAgICAgICAgICAgIFwib25Nb250aENoYW5nZVwiLFxyXG4gICAgICAgICAgICBcIm9uT3BlblwiLFxyXG4gICAgICAgICAgICBcIm9uUGFyc2VDb25maWdcIixcclxuICAgICAgICAgICAgXCJvblJlYWR5XCIsXHJcbiAgICAgICAgICAgIFwib25WYWx1ZVVwZGF0ZVwiLFxyXG4gICAgICAgICAgICBcIm9uWWVhckNoYW5nZVwiLFxyXG4gICAgICAgICAgICBcIm9uUHJlQ2FsZW5kYXJQb3NpdGlvblwiLFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgdmFyIHVzZXJDb25maWcgPSBfX2Fzc2lnbih7fSwgaW5zdGFuY2VDb25maWcsIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoZWxlbWVudC5kYXRhc2V0IHx8IHt9KSkpO1xyXG4gICAgICAgIHZhciBmb3JtYXRzJCQxID0ge307XHJcbiAgICAgICAgc2VsZi5jb25maWcucGFyc2VEYXRlID0gdXNlckNvbmZpZy5wYXJzZURhdGU7XHJcbiAgICAgICAgc2VsZi5jb25maWcuZm9ybWF0RGF0ZSA9IHVzZXJDb25maWcuZm9ybWF0RGF0ZTtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2VsZi5jb25maWcsIFwiZW5hYmxlXCIsIHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzZWxmLmNvbmZpZy5fZW5hYmxlIHx8IFtdOyB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChkYXRlcykge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5jb25maWcuX2VuYWJsZSA9IHBhcnNlRGF0ZVJ1bGVzKGRhdGVzKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2VsZi5jb25maWcsIFwiZGlzYWJsZVwiLCB7XHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2VsZi5jb25maWcuX2Rpc2FibGUgfHwgW107IH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKGRhdGVzKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLmNvbmZpZy5fZGlzYWJsZSA9IHBhcnNlRGF0ZVJ1bGVzKGRhdGVzKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIXVzZXJDb25maWcuZGF0ZUZvcm1hdCAmJiB1c2VyQ29uZmlnLmVuYWJsZVRpbWUpIHtcclxuICAgICAgICAgICAgZm9ybWF0cyQkMS5kYXRlRm9ybWF0ID0gdXNlckNvbmZpZy5ub0NhbGVuZGFyXHJcbiAgICAgICAgICAgICAgICA/IFwiSDppXCIgKyAodXNlckNvbmZpZy5lbmFibGVTZWNvbmRzID8gXCI6U1wiIDogXCJcIilcclxuICAgICAgICAgICAgICAgIDogZmxhdHBpY2tyLmRlZmF1bHRDb25maWcuZGF0ZUZvcm1hdCArXHJcbiAgICAgICAgICAgICAgICAgICAgXCIgSDppXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICh1c2VyQ29uZmlnLmVuYWJsZVNlY29uZHMgPyBcIjpTXCIgOiBcIlwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHVzZXJDb25maWcuYWx0SW5wdXQgJiYgdXNlckNvbmZpZy5lbmFibGVUaW1lICYmICF1c2VyQ29uZmlnLmFsdEZvcm1hdCkge1xyXG4gICAgICAgICAgICBmb3JtYXRzJCQxLmFsdEZvcm1hdCA9IHVzZXJDb25maWcubm9DYWxlbmRhclxyXG4gICAgICAgICAgICAgICAgPyBcImg6aVwiICsgKHVzZXJDb25maWcuZW5hYmxlU2Vjb25kcyA/IFwiOlMgS1wiIDogXCIgS1wiKVxyXG4gICAgICAgICAgICAgICAgOiBmbGF0cGlja3IuZGVmYXVsdENvbmZpZy5hbHRGb3JtYXQgK1xyXG4gICAgICAgICAgICAgICAgICAgIChcIiBoOmlcIiArICh1c2VyQ29uZmlnLmVuYWJsZVNlY29uZHMgPyBcIjpTXCIgOiBcIlwiKSArIFwiIEtcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzZWxmLmNvbmZpZywgXCJtaW5EYXRlXCIsIHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzZWxmLmNvbmZpZy5fbWluRGF0ZTsgfSxcclxuICAgICAgICAgICAgc2V0OiBtaW5NYXhEYXRlU2V0dGVyKFwibWluXCIpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShzZWxmLmNvbmZpZywgXCJtYXhEYXRlXCIsIHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzZWxmLmNvbmZpZy5fbWF4RGF0ZTsgfSxcclxuICAgICAgICAgICAgc2V0OiBtaW5NYXhEYXRlU2V0dGVyKFwibWF4XCIpLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZhciBtaW5NYXhUaW1lU2V0dGVyID0gZnVuY3Rpb24gKHR5cGUpIHsgcmV0dXJuIGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICAgICAgc2VsZi5jb25maWdbdHlwZSA9PT0gXCJtaW5cIiA/IFwiX21pblRpbWVcIiA6IFwiX21heFRpbWVcIl0gPSBzZWxmLnBhcnNlRGF0ZSh2YWwsIFwiSDppXCIpO1xyXG4gICAgICAgIH07IH07XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNlbGYuY29uZmlnLCBcIm1pblRpbWVcIiwge1xyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNlbGYuY29uZmlnLl9taW5UaW1lOyB9LFxyXG4gICAgICAgICAgICBzZXQ6IG1pbk1heFRpbWVTZXR0ZXIoXCJtaW5cIiksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHNlbGYuY29uZmlnLCBcIm1heFRpbWVcIiwge1xyXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNlbGYuY29uZmlnLl9tYXhUaW1lOyB9LFxyXG4gICAgICAgICAgICBzZXQ6IG1pbk1heFRpbWVTZXR0ZXIoXCJtYXhcIiksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgT2JqZWN0LmFzc2lnbihzZWxmLmNvbmZpZywgZm9ybWF0cyQkMSwgdXNlckNvbmZpZyk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBib29sT3B0cy5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgc2VsZi5jb25maWdbYm9vbE9wdHNbaV1dID1cclxuICAgICAgICAgICAgICAgIHNlbGYuY29uZmlnW2Jvb2xPcHRzW2ldXSA9PT0gdHJ1ZSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY29uZmlnW2Jvb2xPcHRzW2ldXSA9PT0gXCJ0cnVlXCI7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IGhvb2tzLmxlbmd0aDsgaS0tOykge1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5jb25maWdbaG9va3NbaV1dICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuY29uZmlnW2hvb2tzW2ldXSA9IGFycmF5aWZ5KHNlbGYuY29uZmlnW2hvb2tzW2ldXSB8fCBbXSkubWFwKGJpbmRUb0luc3RhbmNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlbGYuY29uZmlnLnBsdWdpbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHBsdWdpbkNvbmYgPSBzZWxmLmNvbmZpZy5wbHVnaW5zW2ldKHNlbGYpIHx8IHt9O1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gcGx1Z2luQ29uZikge1xyXG4gICAgICAgICAgICAgICAgaWYgKH5ob29rcy5pbmRleE9mKGtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNvbmZpZ1trZXldID0gYXJyYXlpZnkocGx1Z2luQ29uZltrZXldKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAubWFwKGJpbmRUb0luc3RhbmNlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuY29uY2F0KHNlbGYuY29uZmlnW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHVzZXJDb25maWdba2V5XSA9PT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNvbmZpZ1trZXldID0gcGx1Z2luQ29uZltrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbGYuaXNNb2JpbGUgPVxyXG4gICAgICAgICAgICAhc2VsZi5jb25maWcuZGlzYWJsZU1vYmlsZSAmJlxyXG4gICAgICAgICAgICAgICAgIXNlbGYuY29uZmlnLmlubGluZSAmJlxyXG4gICAgICAgICAgICAgICAgc2VsZi5jb25maWcubW9kZSA9PT0gXCJzaW5nbGVcIiAmJlxyXG4gICAgICAgICAgICAgICAgIXNlbGYuY29uZmlnLmRpc2FibGUubGVuZ3RoICYmXHJcbiAgICAgICAgICAgICAgICAhc2VsZi5jb25maWcuZW5hYmxlLmxlbmd0aCAmJlxyXG4gICAgICAgICAgICAgICAgIXNlbGYuY29uZmlnLndlZWtOdW1iZXJzICYmXHJcbiAgICAgICAgICAgICAgICAvQW5kcm9pZHx3ZWJPU3xpUGhvbmV8aVBhZHxpUG9kfEJsYWNrQmVycnl8SUVNb2JpbGV8T3BlcmEgTWluaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XHJcbiAgICAgICAgdHJpZ2dlckV2ZW50KFwib25QYXJzZUNvbmZpZ1wiKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHNldHVwTG9jYWxlKCkge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygc2VsZi5jb25maWcubG9jYWxlICE9PSBcIm9iamVjdFwiICYmXHJcbiAgICAgICAgICAgIHR5cGVvZiBmbGF0cGlja3IubDEwbnNbc2VsZi5jb25maWcubG9jYWxlXSA9PT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgc2VsZi5jb25maWcuZXJyb3JIYW5kbGVyKG5ldyBFcnJvcihcImZsYXRwaWNrcjogaW52YWxpZCBsb2NhbGUgXCIgKyBzZWxmLmNvbmZpZy5sb2NhbGUpKTtcclxuICAgICAgICBzZWxmLmwxMG4gPSBfX2Fzc2lnbih7fSwgZmxhdHBpY2tyLmwxMG5zLmRlZmF1bHQsICh0eXBlb2Ygc2VsZi5jb25maWcubG9jYWxlID09PSBcIm9iamVjdFwiXHJcbiAgICAgICAgICAgID8gc2VsZi5jb25maWcubG9jYWxlXHJcbiAgICAgICAgICAgIDogc2VsZi5jb25maWcubG9jYWxlICE9PSBcImRlZmF1bHRcIlxyXG4gICAgICAgICAgICAgICAgPyBmbGF0cGlja3IubDEwbnNbc2VsZi5jb25maWcubG9jYWxlXVxyXG4gICAgICAgICAgICAgICAgOiB1bmRlZmluZWQpKTtcclxuICAgICAgICB0b2tlblJlZ2V4LksgPSBcIihcIiArIHNlbGYubDEwbi5hbVBNWzBdICsgXCJ8XCIgKyBzZWxmLmwxMG4uYW1QTVsxXSArIFwifFwiICsgc2VsZi5sMTBuLmFtUE1bMF0udG9Mb3dlckNhc2UoKSArIFwifFwiICsgc2VsZi5sMTBuLmFtUE1bMV0udG9Mb3dlckNhc2UoKSArIFwiKVwiO1xyXG4gICAgICAgIHNlbGYuZm9ybWF0RGF0ZSA9IGNyZWF0ZURhdGVGb3JtYXR0ZXIoc2VsZik7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBwb3NpdGlvbkNhbGVuZGFyKGN1c3RvbVBvc2l0aW9uRWxlbWVudCkge1xyXG4gICAgICAgIGlmIChzZWxmLmNhbGVuZGFyQ29udGFpbmVyID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB0cmlnZ2VyRXZlbnQoXCJvblByZUNhbGVuZGFyUG9zaXRpb25cIik7XHJcbiAgICAgICAgdmFyIHBvc2l0aW9uRWxlbWVudCA9IGN1c3RvbVBvc2l0aW9uRWxlbWVudCB8fCBzZWxmLl9wb3NpdGlvbkVsZW1lbnQ7XHJcbiAgICAgICAgdmFyIGNhbGVuZGFySGVpZ2h0ID0gQXJyYXkucHJvdG90eXBlLnJlZHVjZS5jYWxsKHNlbGYuY2FsZW5kYXJDb250YWluZXIuY2hpbGRyZW4sIGZ1bmN0aW9uIChhY2MsIGNoaWxkKSB7IHJldHVybiBhY2MgKyBjaGlsZC5vZmZzZXRIZWlnaHQ7IH0sIDApLCBjYWxlbmRhcldpZHRoID0gc2VsZi5jYWxlbmRhckNvbnRhaW5lci5vZmZzZXRXaWR0aCwgY29uZmlnUG9zID0gc2VsZi5jb25maWcucG9zaXRpb24sIGlucHV0Qm91bmRzID0gcG9zaXRpb25FbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLCBkaXN0YW5jZUZyb21Cb3R0b20gPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSBpbnB1dEJvdW5kcy5ib3R0b20sIHNob3dPblRvcCA9IGNvbmZpZ1BvcyA9PT0gXCJhYm92ZVwiIHx8XHJcbiAgICAgICAgICAgIChjb25maWdQb3MgIT09IFwiYmVsb3dcIiAmJlxyXG4gICAgICAgICAgICAgICAgZGlzdGFuY2VGcm9tQm90dG9tIDwgY2FsZW5kYXJIZWlnaHQgJiZcclxuICAgICAgICAgICAgICAgIGlucHV0Qm91bmRzLnRvcCA+IGNhbGVuZGFySGVpZ2h0KTtcclxuICAgICAgICB2YXIgdG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0ICtcclxuICAgICAgICAgICAgaW5wdXRCb3VuZHMudG9wICtcclxuICAgICAgICAgICAgKCFzaG93T25Ub3AgPyBwb3NpdGlvbkVsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgMiA6IC1jYWxlbmRhckhlaWdodCAtIDIpO1xyXG4gICAgICAgIHRvZ2dsZUNsYXNzKHNlbGYuY2FsZW5kYXJDb250YWluZXIsIFwiYXJyb3dUb3BcIiwgIXNob3dPblRvcCk7XHJcbiAgICAgICAgdG9nZ2xlQ2xhc3Moc2VsZi5jYWxlbmRhckNvbnRhaW5lciwgXCJhcnJvd0JvdHRvbVwiLCBzaG93T25Ub3ApO1xyXG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy5pbmxpbmUpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB2YXIgbGVmdCA9IHdpbmRvdy5wYWdlWE9mZnNldCArIGlucHV0Qm91bmRzLmxlZnQ7XHJcbiAgICAgICAgdmFyIHJpZ2h0ID0gd2luZG93LmRvY3VtZW50LmJvZHkub2Zmc2V0V2lkdGggLSBpbnB1dEJvdW5kcy5yaWdodDtcclxuICAgICAgICB2YXIgcmlnaHRNb3N0ID0gbGVmdCArIGNhbGVuZGFyV2lkdGggPiB3aW5kb3cuZG9jdW1lbnQuYm9keS5vZmZzZXRXaWR0aDtcclxuICAgICAgICB0b2dnbGVDbGFzcyhzZWxmLmNhbGVuZGFyQ29udGFpbmVyLCBcInJpZ2h0TW9zdFwiLCByaWdodE1vc3QpO1xyXG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy5zdGF0aWMpXHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICBzZWxmLmNhbGVuZGFyQ29udGFpbmVyLnN0eWxlLnRvcCA9IHRvcCArIFwicHhcIjtcclxuICAgICAgICBpZiAoIXJpZ2h0TW9zdCkge1xyXG4gICAgICAgICAgICBzZWxmLmNhbGVuZGFyQ29udGFpbmVyLnN0eWxlLmxlZnQgPSBsZWZ0ICsgXCJweFwiO1xyXG4gICAgICAgICAgICBzZWxmLmNhbGVuZGFyQ29udGFpbmVyLnN0eWxlLnJpZ2h0ID0gXCJhdXRvXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBzZWxmLmNhbGVuZGFyQ29udGFpbmVyLnN0eWxlLmxlZnQgPSBcImF1dG9cIjtcclxuICAgICAgICAgICAgc2VsZi5jYWxlbmRhckNvbnRhaW5lci5zdHlsZS5yaWdodCA9IHJpZ2h0ICsgXCJweFwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHJlZHJhdygpIHtcclxuICAgICAgICBpZiAoc2VsZi5jb25maWcubm9DYWxlbmRhciB8fCBzZWxmLmlzTW9iaWxlKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgYnVpbGRXZWVrZGF5cygpO1xyXG4gICAgICAgIHVwZGF0ZU5hdmlnYXRpb25DdXJyZW50TW9udGgoKTtcclxuICAgICAgICBidWlsZERheXMoKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGZvY3VzQW5kQ2xvc2UoKSB7XHJcbiAgICAgICAgc2VsZi5faW5wdXQuZm9jdXMoKTtcclxuICAgICAgICBpZiAod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIk1TSUVcIikgIT09IC0xIHx8XHJcbiAgICAgICAgICAgIG5hdmlnYXRvci5tc01heFRvdWNoUG9pbnRzICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dChzZWxmLmNsb3NlLCAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHNlbGYuY2xvc2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBzZWxlY3REYXRlKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB2YXIgaXNTZWxlY3RhYmxlID0gZnVuY3Rpb24gKGRheSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZGF5LmNsYXNzTGlzdCAmJlxyXG4gICAgICAgICAgICAgICAgZGF5LmNsYXNzTGlzdC5jb250YWlucyhcImZsYXRwaWNrci1kYXlcIikgJiZcclxuICAgICAgICAgICAgICAgICFkYXkuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGlzYWJsZWRcIikgJiZcclxuICAgICAgICAgICAgICAgICFkYXkuY2xhc3NMaXN0LmNvbnRhaW5zKFwibm90QWxsb3dlZFwiKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHZhciB0ID0gZmluZFBhcmVudChlLnRhcmdldCwgaXNTZWxlY3RhYmxlKTtcclxuICAgICAgICBpZiAodCA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgdmFyIHRhcmdldCA9IHQ7XHJcbiAgICAgICAgdmFyIHNlbGVjdGVkRGF0ZSA9IChzZWxmLmxhdGVzdFNlbGVjdGVkRGF0ZU9iaiA9IG5ldyBEYXRlKHRhcmdldC5kYXRlT2JqLmdldFRpbWUoKSkpO1xyXG4gICAgICAgIHZhciBzaG91bGRDaGFuZ2VNb250aCA9IHNlbGVjdGVkRGF0ZS5nZXRNb250aCgpICE9PSBzZWxmLmN1cnJlbnRNb250aCAmJlxyXG4gICAgICAgICAgICBzZWxmLmNvbmZpZy5tb2RlICE9PSBcInJhbmdlXCI7XHJcbiAgICAgICAgc2VsZi5zZWxlY3RlZERhdGVFbGVtID0gdGFyZ2V0O1xyXG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy5tb2RlID09PSBcInNpbmdsZVwiKVxyXG4gICAgICAgICAgICBzZWxmLnNlbGVjdGVkRGF0ZXMgPSBbc2VsZWN0ZWREYXRlXTtcclxuICAgICAgICBlbHNlIGlmIChzZWxmLmNvbmZpZy5tb2RlID09PSBcIm11bHRpcGxlXCIpIHtcclxuICAgICAgICAgICAgdmFyIHNlbGVjdGVkSW5kZXggPSBpc0RhdGVTZWxlY3RlZChzZWxlY3RlZERhdGUpO1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRJbmRleClcclxuICAgICAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWREYXRlcy5zcGxpY2UocGFyc2VJbnQoc2VsZWN0ZWRJbmRleCksIDEpO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICBzZWxmLnNlbGVjdGVkRGF0ZXMucHVzaChzZWxlY3RlZERhdGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChzZWxmLmNvbmZpZy5tb2RlID09PSBcInJhbmdlXCIpIHtcclxuICAgICAgICAgICAgaWYgKHNlbGYuc2VsZWN0ZWREYXRlcy5sZW5ndGggPT09IDIpXHJcbiAgICAgICAgICAgICAgICBzZWxmLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWREYXRlcy5wdXNoKHNlbGVjdGVkRGF0ZSk7XHJcbiAgICAgICAgICAgIGlmIChjb21wYXJlRGF0ZXMoc2VsZWN0ZWREYXRlLCBzZWxmLnNlbGVjdGVkRGF0ZXNbMF0sIHRydWUpICE9PSAwKVxyXG4gICAgICAgICAgICAgICAgc2VsZi5zZWxlY3RlZERhdGVzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEuZ2V0VGltZSgpIC0gYi5nZXRUaW1lKCk7IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZXRIb3Vyc0Zyb21JbnB1dHMoKTtcclxuICAgICAgICBpZiAoc2hvdWxkQ2hhbmdlTW9udGgpIHtcclxuICAgICAgICAgICAgdmFyIGlzTmV3WWVhciA9IHNlbGYuY3VycmVudFllYXIgIT09IHNlbGVjdGVkRGF0ZS5nZXRGdWxsWWVhcigpO1xyXG4gICAgICAgICAgICBzZWxmLmN1cnJlbnRZZWFyID0gc2VsZWN0ZWREYXRlLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgICAgICAgIHNlbGYuY3VycmVudE1vbnRoID0gc2VsZWN0ZWREYXRlLmdldE1vbnRoKCk7XHJcbiAgICAgICAgICAgIGlmIChpc05ld1llYXIpXHJcbiAgICAgICAgICAgICAgICB0cmlnZ2VyRXZlbnQoXCJvblllYXJDaGFuZ2VcIik7XHJcbiAgICAgICAgICAgIHRyaWdnZXJFdmVudChcIm9uTW9udGhDaGFuZ2VcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJ1aWxkRGF5cygpO1xyXG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy5taW5EYXRlICYmXHJcbiAgICAgICAgICAgIHNlbGYubWluRGF0ZUhhc1RpbWUgJiZcclxuICAgICAgICAgICAgc2VsZi5jb25maWcuZW5hYmxlVGltZSAmJlxyXG4gICAgICAgICAgICBjb21wYXJlRGF0ZXMoc2VsZWN0ZWREYXRlLCBzZWxmLmNvbmZpZy5taW5EYXRlKSA9PT0gMClcclxuICAgICAgICAgICAgc2V0SG91cnNGcm9tRGF0ZShzZWxmLmNvbmZpZy5taW5EYXRlKTtcclxuICAgICAgICB1cGRhdGVWYWx1ZSgpO1xyXG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy5lbmFibGVUaW1lKVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgcmV0dXJuIChzZWxmLnNob3dUaW1lSW5wdXQgPSB0cnVlKTsgfSwgNTApO1xyXG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy5tb2RlID09PSBcInJhbmdlXCIpIHtcclxuICAgICAgICAgICAgaWYgKHNlbGYuc2VsZWN0ZWREYXRlcy5sZW5ndGggPT09IDEpIHtcclxuICAgICAgICAgICAgICAgIG9uTW91c2VPdmVyKHRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9oaWRlUHJldk1vbnRoQXJyb3cgPVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX2hpZGVQcmV2TW9udGhBcnJvdyB8fFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAoc2VsZi5taW5SYW5nZURhdGUgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5taW5SYW5nZURhdGUgPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuZGF5cy5jaGlsZE5vZGVzWzBdLmRhdGVPYmopO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5faGlkZU5leHRNb250aEFycm93ID1cclxuICAgICAgICAgICAgICAgICAgICBzZWxmLl9oaWRlTmV4dE1vbnRoQXJyb3cgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgKHNlbGYubWF4UmFuZ2VEYXRlICE9PSB1bmRlZmluZWQgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYubWF4UmFuZ2VEYXRlIDxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgRGF0ZShzZWxmLmN1cnJlbnRZZWFyLCBzZWxmLmN1cnJlbnRNb250aCArIDEsIDEpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB1cGRhdGVOYXZpZ2F0aW9uQ3VycmVudE1vbnRoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghc2hvdWxkQ2hhbmdlTW9udGgpXHJcbiAgICAgICAgICAgIGZvY3VzT25EYXkodGFyZ2V0LiRpLCAwKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWREYXRlRWxlbSAmJiBzZWxmLnNlbGVjdGVkRGF0ZUVsZW0uZm9jdXMoKTtcclxuICAgICAgICBpZiAoc2VsZi5ob3VyRWxlbWVudCAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNlbGYuaG91ckVsZW1lbnQgIT09IHVuZGVmaW5lZCAmJiBzZWxmLmhvdXJFbGVtZW50LnNlbGVjdCgpOyB9LCA0NTEpO1xyXG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy5jbG9zZU9uU2VsZWN0KSB7XHJcbiAgICAgICAgICAgIHZhciBzaW5nbGUgPSBzZWxmLmNvbmZpZy5tb2RlID09PSBcInNpbmdsZVwiICYmICFzZWxmLmNvbmZpZy5lbmFibGVUaW1lO1xyXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBzZWxmLmNvbmZpZy5tb2RlID09PSBcInJhbmdlXCIgJiZcclxuICAgICAgICAgICAgICAgIHNlbGYuc2VsZWN0ZWREYXRlcy5sZW5ndGggPT09IDIgJiZcclxuICAgICAgICAgICAgICAgICFzZWxmLmNvbmZpZy5lbmFibGVUaW1lO1xyXG4gICAgICAgICAgICBpZiAoc2luZ2xlIHx8IHJhbmdlKSB7XHJcbiAgICAgICAgICAgICAgICBmb2N1c0FuZENsb3NlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdHJpZ2dlckNoYW5nZSgpO1xyXG4gICAgfVxyXG4gICAgdmFyIENBTExCQUNLUyA9IHtcclxuICAgICAgICBsb2NhbGU6IFtzZXR1cExvY2FsZV0sXHJcbiAgICB9O1xyXG4gICAgZnVuY3Rpb24gc2V0KG9wdGlvbiwgdmFsdWUpIHtcclxuICAgICAgICBpZiAob3B0aW9uICE9PSBudWxsICYmIHR5cGVvZiBvcHRpb24gPT09IFwib2JqZWN0XCIpXHJcbiAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oc2VsZi5jb25maWcsIG9wdGlvbik7XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHNlbGYuY29uZmlnW29wdGlvbl0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgaWYgKENBTExCQUNLU1tvcHRpb25dICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICBDQUxMQkFDS1Nbb3B0aW9uXS5mb3JFYWNoKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4KCk7IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzZWxmLnJlZHJhdygpO1xyXG4gICAgICAgIGp1bXBUb0RhdGUoKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHNldFNlbGVjdGVkRGF0ZShpbnB1dERhdGUsIGZvcm1hdCkge1xyXG4gICAgICAgIHZhciBkYXRlcyA9IFtdO1xyXG4gICAgICAgIGlmIChpbnB1dERhdGUgaW5zdGFuY2VvZiBBcnJheSlcclxuICAgICAgICAgICAgZGF0ZXMgPSBpbnB1dERhdGUubWFwKGZ1bmN0aW9uIChkKSB7IHJldHVybiBzZWxmLnBhcnNlRGF0ZShkLCBmb3JtYXQpOyB9KTtcclxuICAgICAgICBlbHNlIGlmIChpbnB1dERhdGUgaW5zdGFuY2VvZiBEYXRlIHx8IHR5cGVvZiBpbnB1dERhdGUgPT09IFwibnVtYmVyXCIpXHJcbiAgICAgICAgICAgIGRhdGVzID0gW3NlbGYucGFyc2VEYXRlKGlucHV0RGF0ZSwgZm9ybWF0KV07XHJcbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIGlucHV0RGF0ZSA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHNlbGYuY29uZmlnLm1vZGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJzaW5nbGVcIjpcclxuICAgICAgICAgICAgICAgICAgICBkYXRlcyA9IFtzZWxmLnBhcnNlRGF0ZShpbnB1dERhdGUsIGZvcm1hdCldO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIm11bHRpcGxlXCI6XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0ZXMgPSBpbnB1dERhdGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNwbGl0KHNlbGYuY29uZmlnLmNvbmp1bmN0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAubWFwKGZ1bmN0aW9uIChkYXRlKSB7IHJldHVybiBzZWxmLnBhcnNlRGF0ZShkYXRlLCBmb3JtYXQpOyB9KTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJyYW5nZVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGRhdGVzID0gaW5wdXREYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zcGxpdChzZWxmLmwxMG4ucmFuZ2VTZXBhcmF0b3IpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKGRhdGUpIHsgcmV0dXJuIHNlbGYucGFyc2VEYXRlKGRhdGUsIGZvcm1hdCk7IH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHNlbGYuY29uZmlnLmVycm9ySGFuZGxlcihuZXcgRXJyb3IoXCJJbnZhbGlkIGRhdGUgc3VwcGxpZWQ6IFwiICsgSlNPTi5zdHJpbmdpZnkoaW5wdXREYXRlKSkpO1xyXG4gICAgICAgIHNlbGYuc2VsZWN0ZWREYXRlcyA9IGRhdGVzLmZpbHRlcihmdW5jdGlvbiAoZCkgeyByZXR1cm4gZCBpbnN0YW5jZW9mIERhdGUgJiYgaXNFbmFibGVkKGQsIGZhbHNlKTsgfSk7XHJcbiAgICAgICAgaWYgKHNlbGYuY29uZmlnLm1vZGUgPT09IFwicmFuZ2VcIilcclxuICAgICAgICAgICAgc2VsZi5zZWxlY3RlZERhdGVzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEuZ2V0VGltZSgpIC0gYi5nZXRUaW1lKCk7IH0pO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gc2V0RGF0ZShkYXRlLCB0cmlnZ2VyQ2hhbmdlLCBmb3JtYXQpIHtcclxuICAgICAgICBpZiAodHJpZ2dlckNoYW5nZSA9PT0gdm9pZCAwKSB7IHRyaWdnZXJDaGFuZ2UgPSBmYWxzZTsgfVxyXG4gICAgICAgIGlmIChmb3JtYXQgPT09IHZvaWQgMCkgeyBmb3JtYXQgPSBzZWxmLmNvbmZpZy5kYXRlRm9ybWF0OyB9XHJcbiAgICAgICAgaWYgKGRhdGUgIT09IDAgJiYgIWRhdGUpXHJcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmNsZWFyKHRyaWdnZXJDaGFuZ2UpO1xyXG4gICAgICAgIHNldFNlbGVjdGVkRGF0ZShkYXRlLCBmb3JtYXQpO1xyXG4gICAgICAgIHNlbGYuc2hvd1RpbWVJbnB1dCA9IHNlbGYuc2VsZWN0ZWREYXRlcy5sZW5ndGggPiAwO1xyXG4gICAgICAgIHNlbGYubGF0ZXN0U2VsZWN0ZWREYXRlT2JqID0gc2VsZi5zZWxlY3RlZERhdGVzWzBdO1xyXG4gICAgICAgIHNlbGYucmVkcmF3KCk7XHJcbiAgICAgICAganVtcFRvRGF0ZSgpO1xyXG4gICAgICAgIHNldEhvdXJzRnJvbURhdGUoKTtcclxuICAgICAgICB1cGRhdGVWYWx1ZSh0cmlnZ2VyQ2hhbmdlKTtcclxuICAgICAgICBpZiAodHJpZ2dlckNoYW5nZSlcclxuICAgICAgICAgICAgdHJpZ2dlckV2ZW50KFwib25DaGFuZ2VcIik7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBwYXJzZURhdGVSdWxlcyhhcnIpIHtcclxuICAgICAgICByZXR1cm4gYXJyXHJcbiAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKHJ1bGUpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBydWxlID09PSBcInN0cmluZ1wiIHx8XHJcbiAgICAgICAgICAgICAgICB0eXBlb2YgcnVsZSA9PT0gXCJudW1iZXJcIiB8fFxyXG4gICAgICAgICAgICAgICAgcnVsZSBpbnN0YW5jZW9mIERhdGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLnBhcnNlRGF0ZShydWxlLCB1bmRlZmluZWQsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKHJ1bGUgJiZcclxuICAgICAgICAgICAgICAgIHR5cGVvZiBydWxlID09PSBcIm9iamVjdFwiICYmXHJcbiAgICAgICAgICAgICAgICBydWxlLmZyb20gJiZcclxuICAgICAgICAgICAgICAgIHJ1bGUudG8pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZyb206IHNlbGYucGFyc2VEYXRlKHJ1bGUuZnJvbSwgdW5kZWZpbmVkKSxcclxuICAgICAgICAgICAgICAgICAgICB0bzogc2VsZi5wYXJzZURhdGUocnVsZS50bywgdW5kZWZpbmVkKSxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJldHVybiBydWxlO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHg7IH0pO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gc2V0dXBEYXRlcygpIHtcclxuICAgICAgICBzZWxmLnNlbGVjdGVkRGF0ZXMgPSBbXTtcclxuICAgICAgICBzZWxmLm5vdyA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgdmFyIHByZWxvYWRlZERhdGUgPSBzZWxmLmNvbmZpZy5kZWZhdWx0RGF0ZSB8fCBzZWxmLmlucHV0LnZhbHVlO1xyXG4gICAgICAgIGlmIChwcmVsb2FkZWREYXRlKVxyXG4gICAgICAgICAgICBzZXRTZWxlY3RlZERhdGUocHJlbG9hZGVkRGF0ZSwgc2VsZi5jb25maWcuZGF0ZUZvcm1hdCk7XHJcbiAgICAgICAgdmFyIGluaXRpYWxEYXRlID0gc2VsZi5zZWxlY3RlZERhdGVzLmxlbmd0aFxyXG4gICAgICAgICAgICA/IHNlbGYuc2VsZWN0ZWREYXRlc1swXVxyXG4gICAgICAgICAgICA6IHNlbGYuY29uZmlnLm1pbkRhdGUgJiZcclxuICAgICAgICAgICAgICAgIHNlbGYuY29uZmlnLm1pbkRhdGUuZ2V0VGltZSgpID4gc2VsZi5ub3cuZ2V0VGltZSgpXHJcbiAgICAgICAgICAgICAgICA/IHNlbGYuY29uZmlnLm1pbkRhdGVcclxuICAgICAgICAgICAgICAgIDogc2VsZi5jb25maWcubWF4RGF0ZSAmJlxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuY29uZmlnLm1heERhdGUuZ2V0VGltZSgpIDwgc2VsZi5ub3cuZ2V0VGltZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgPyBzZWxmLmNvbmZpZy5tYXhEYXRlXHJcbiAgICAgICAgICAgICAgICAgICAgOiBzZWxmLm5vdztcclxuICAgICAgICBzZWxmLmN1cnJlbnRZZWFyID0gaW5pdGlhbERhdGUuZ2V0RnVsbFllYXIoKTtcclxuICAgICAgICBzZWxmLmN1cnJlbnRNb250aCA9IGluaXRpYWxEYXRlLmdldE1vbnRoKCk7XHJcbiAgICAgICAgaWYgKHNlbGYuc2VsZWN0ZWREYXRlcy5sZW5ndGgpXHJcbiAgICAgICAgICAgIHNlbGYubGF0ZXN0U2VsZWN0ZWREYXRlT2JqID0gc2VsZi5zZWxlY3RlZERhdGVzWzBdO1xyXG4gICAgICAgIGlmIChzZWxmLmNvbmZpZy5taW5UaW1lICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIHNlbGYuY29uZmlnLm1pblRpbWUgPSBzZWxmLnBhcnNlRGF0ZShzZWxmLmNvbmZpZy5taW5UaW1lLCBcIkg6aVwiKTtcclxuICAgICAgICBpZiAoc2VsZi5jb25maWcubWF4VGltZSAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICBzZWxmLmNvbmZpZy5tYXhUaW1lID0gc2VsZi5wYXJzZURhdGUoc2VsZi5jb25maWcubWF4VGltZSwgXCJIOmlcIik7XHJcbiAgICAgICAgc2VsZi5taW5EYXRlSGFzVGltZSA9XHJcbiAgICAgICAgICAgICEhc2VsZi5jb25maWcubWluRGF0ZSAmJlxyXG4gICAgICAgICAgICAgICAgKHNlbGYuY29uZmlnLm1pbkRhdGUuZ2V0SG91cnMoKSA+IDAgfHxcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNvbmZpZy5taW5EYXRlLmdldE1pbnV0ZXMoKSA+IDAgfHxcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmNvbmZpZy5taW5EYXRlLmdldFNlY29uZHMoKSA+IDApO1xyXG4gICAgICAgIHNlbGYubWF4RGF0ZUhhc1RpbWUgPVxyXG4gICAgICAgICAgICAhIXNlbGYuY29uZmlnLm1heERhdGUgJiZcclxuICAgICAgICAgICAgICAgIChzZWxmLmNvbmZpZy5tYXhEYXRlLmdldEhvdXJzKCkgPiAwIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jb25maWcubWF4RGF0ZS5nZXRNaW51dGVzKCkgPiAwIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5jb25maWcubWF4RGF0ZS5nZXRTZWNvbmRzKCkgPiAwKTtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc2VsZiwgXCJzaG93VGltZUlucHV0XCIsIHtcclxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzZWxmLl9zaG93VGltZUlucHV0OyB9LFxyXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChib29sKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLl9zaG93VGltZUlucHV0ID0gYm9vbDtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxmLmNhbGVuZGFyQ29udGFpbmVyKVxyXG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZUNsYXNzKHNlbGYuY2FsZW5kYXJDb250YWluZXIsIFwic2hvd1RpbWVJbnB1dFwiLCBib29sKTtcclxuICAgICAgICAgICAgICAgIHNlbGYuaXNPcGVuICYmIHBvc2l0aW9uQ2FsZW5kYXIoKTtcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHNldHVwSW5wdXRzKCkge1xyXG4gICAgICAgIHNlbGYuaW5wdXQgPSBzZWxmLmNvbmZpZy53cmFwXHJcbiAgICAgICAgICAgID8gZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtaW5wdXRdXCIpXHJcbiAgICAgICAgICAgIDogZWxlbWVudDtcclxuICAgICAgICBpZiAoIXNlbGYuaW5wdXQpIHtcclxuICAgICAgICAgICAgc2VsZi5jb25maWcuZXJyb3JIYW5kbGVyKG5ldyBFcnJvcihcIkludmFsaWQgaW5wdXQgZWxlbWVudCBzcGVjaWZpZWRcIikpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNlbGYuaW5wdXQuX3R5cGUgPSBzZWxmLmlucHV0LnR5cGU7XHJcbiAgICAgICAgc2VsZi5pbnB1dC50eXBlID0gXCJ0ZXh0XCI7XHJcbiAgICAgICAgc2VsZi5pbnB1dC5jbGFzc0xpc3QuYWRkKFwiZmxhdHBpY2tyLWlucHV0XCIpO1xyXG4gICAgICAgIHNlbGYuX2lucHV0ID0gc2VsZi5pbnB1dDtcclxuICAgICAgICBpZiAoc2VsZi5jb25maWcuYWx0SW5wdXQpIHtcclxuICAgICAgICAgICAgc2VsZi5hbHRJbnB1dCA9IGNyZWF0ZUVsZW1lbnQoc2VsZi5pbnB1dC5ub2RlTmFtZSwgc2VsZi5pbnB1dC5jbGFzc05hbWUgKyBcIiBcIiArIHNlbGYuY29uZmlnLmFsdElucHV0Q2xhc3MpO1xyXG4gICAgICAgICAgICBzZWxmLl9pbnB1dCA9IHNlbGYuYWx0SW5wdXQ7XHJcbiAgICAgICAgICAgIHNlbGYuYWx0SW5wdXQucGxhY2Vob2xkZXIgPSBzZWxmLmlucHV0LnBsYWNlaG9sZGVyO1xyXG4gICAgICAgICAgICBzZWxmLmFsdElucHV0LmRpc2FibGVkID0gc2VsZi5pbnB1dC5kaXNhYmxlZDtcclxuICAgICAgICAgICAgc2VsZi5hbHRJbnB1dC5yZXF1aXJlZCA9IHNlbGYuaW5wdXQucmVxdWlyZWQ7XHJcbiAgICAgICAgICAgIHNlbGYuYWx0SW5wdXQudGFiSW5kZXggPSBzZWxmLmlucHV0LnRhYkluZGV4O1xyXG4gICAgICAgICAgICBzZWxmLmFsdElucHV0LnR5cGUgPSBcInRleHRcIjtcclxuICAgICAgICAgICAgc2VsZi5pbnB1dC50eXBlID0gXCJoaWRkZW5cIjtcclxuICAgICAgICAgICAgaWYgKCFzZWxmLmNvbmZpZy5zdGF0aWMgJiYgc2VsZi5pbnB1dC5wYXJlbnROb2RlKVxyXG4gICAgICAgICAgICAgICAgc2VsZi5pbnB1dC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzZWxmLmFsdElucHV0LCBzZWxmLmlucHV0Lm5leHRTaWJsaW5nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFzZWxmLmNvbmZpZy5hbGxvd0lucHV0KVxyXG4gICAgICAgICAgICBzZWxmLl9pbnB1dC5zZXRBdHRyaWJ1dGUoXCJyZWFkb25seVwiLCBcInJlYWRvbmx5XCIpO1xyXG4gICAgICAgIHNlbGYuX3Bvc2l0aW9uRWxlbWVudCA9IHNlbGYuY29uZmlnLnBvc2l0aW9uRWxlbWVudCB8fCBzZWxmLl9pbnB1dDtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHNldHVwTW9iaWxlKCkge1xyXG4gICAgICAgIHZhciBpbnB1dFR5cGUgPSBzZWxmLmNvbmZpZy5lbmFibGVUaW1lXHJcbiAgICAgICAgICAgID8gc2VsZi5jb25maWcubm9DYWxlbmRhciA/IFwidGltZVwiIDogXCJkYXRldGltZS1sb2NhbFwiXHJcbiAgICAgICAgICAgIDogXCJkYXRlXCI7XHJcbiAgICAgICAgc2VsZi5tb2JpbGVJbnB1dCA9IGNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiLCBzZWxmLmlucHV0LmNsYXNzTmFtZSArIFwiIGZsYXRwaWNrci1tb2JpbGVcIik7XHJcbiAgICAgICAgc2VsZi5tb2JpbGVJbnB1dC5zdGVwID0gc2VsZi5pbnB1dC5nZXRBdHRyaWJ1dGUoXCJzdGVwXCIpIHx8IFwiYW55XCI7XHJcbiAgICAgICAgc2VsZi5tb2JpbGVJbnB1dC50YWJJbmRleCA9IDE7XHJcbiAgICAgICAgc2VsZi5tb2JpbGVJbnB1dC50eXBlID0gaW5wdXRUeXBlO1xyXG4gICAgICAgIHNlbGYubW9iaWxlSW5wdXQuZGlzYWJsZWQgPSBzZWxmLmlucHV0LmRpc2FibGVkO1xyXG4gICAgICAgIHNlbGYubW9iaWxlSW5wdXQucmVxdWlyZWQgPSBzZWxmLmlucHV0LnJlcXVpcmVkO1xyXG4gICAgICAgIHNlbGYubW9iaWxlSW5wdXQucGxhY2Vob2xkZXIgPSBzZWxmLmlucHV0LnBsYWNlaG9sZGVyO1xyXG4gICAgICAgIHNlbGYubW9iaWxlRm9ybWF0U3RyID1cclxuICAgICAgICAgICAgaW5wdXRUeXBlID09PSBcImRhdGV0aW1lLWxvY2FsXCJcclxuICAgICAgICAgICAgICAgID8gXCJZLW0tZFxcXFxUSDppOlNcIlxyXG4gICAgICAgICAgICAgICAgOiBpbnB1dFR5cGUgPT09IFwiZGF0ZVwiID8gXCJZLW0tZFwiIDogXCJIOmk6U1wiO1xyXG4gICAgICAgIGlmIChzZWxmLnNlbGVjdGVkRGF0ZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHNlbGYubW9iaWxlSW5wdXQuZGVmYXVsdFZhbHVlID0gc2VsZi5tb2JpbGVJbnB1dC52YWx1ZSA9IHNlbGYuZm9ybWF0RGF0ZShzZWxmLnNlbGVjdGVkRGF0ZXNbMF0sIHNlbGYubW9iaWxlRm9ybWF0U3RyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNlbGYuY29uZmlnLm1pbkRhdGUpXHJcbiAgICAgICAgICAgIHNlbGYubW9iaWxlSW5wdXQubWluID0gc2VsZi5mb3JtYXREYXRlKHNlbGYuY29uZmlnLm1pbkRhdGUsIFwiWS1tLWRcIik7XHJcbiAgICAgICAgaWYgKHNlbGYuY29uZmlnLm1heERhdGUpXHJcbiAgICAgICAgICAgIHNlbGYubW9iaWxlSW5wdXQubWF4ID0gc2VsZi5mb3JtYXREYXRlKHNlbGYuY29uZmlnLm1heERhdGUsIFwiWS1tLWRcIik7XHJcbiAgICAgICAgc2VsZi5pbnB1dC50eXBlID0gXCJoaWRkZW5cIjtcclxuICAgICAgICBpZiAoc2VsZi5hbHRJbnB1dCAhPT0gdW5kZWZpbmVkKVxyXG4gICAgICAgICAgICBzZWxmLmFsdElucHV0LnR5cGUgPSBcImhpZGRlblwiO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLmlucHV0LnBhcmVudE5vZGUpXHJcbiAgICAgICAgICAgICAgICBzZWxmLmlucHV0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHNlbGYubW9iaWxlSW5wdXQsIHNlbGYuaW5wdXQubmV4dFNpYmxpbmcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYXRjaCAoX2EpIHsgfVxyXG4gICAgICAgIGJpbmQoc2VsZi5tb2JpbGVJbnB1dCwgXCJjaGFuZ2VcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgc2VsZi5zZXREYXRlKGUudGFyZ2V0LnZhbHVlLCBmYWxzZSwgc2VsZi5tb2JpbGVGb3JtYXRTdHIpO1xyXG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnQoXCJvbkNoYW5nZVwiKTtcclxuICAgICAgICAgICAgdHJpZ2dlckV2ZW50KFwib25DbG9zZVwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHRvZ2dsZSgpIHtcclxuICAgICAgICBpZiAoc2VsZi5pc09wZW4pXHJcbiAgICAgICAgICAgIHJldHVybiBzZWxmLmNsb3NlKCk7XHJcbiAgICAgICAgc2VsZi5vcGVuKCk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB0cmlnZ2VyRXZlbnQoZXZlbnQsIGRhdGEpIHtcclxuICAgICAgICB2YXIgaG9va3MgPSBzZWxmLmNvbmZpZ1tldmVudF07XHJcbiAgICAgICAgaWYgKGhvb2tzICE9PSB1bmRlZmluZWQgJiYgaG9va3MubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaG9va3NbaV0gJiYgaSA8IGhvb2tzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgaG9va3NbaV0oc2VsZi5zZWxlY3RlZERhdGVzLCBzZWxmLmlucHV0LnZhbHVlLCBzZWxmLCBkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGV2ZW50ID09PSBcIm9uQ2hhbmdlXCIpIHtcclxuICAgICAgICAgICAgc2VsZi5pbnB1dC5kaXNwYXRjaEV2ZW50KGNyZWF0ZUV2ZW50KFwiY2hhbmdlXCIpKTtcclxuICAgICAgICAgICAgc2VsZi5pbnB1dC5kaXNwYXRjaEV2ZW50KGNyZWF0ZUV2ZW50KFwiaW5wdXRcIikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGNyZWF0ZUV2ZW50KG5hbWUpIHtcclxuICAgICAgICB2YXIgZSA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiRXZlbnRcIik7XHJcbiAgICAgICAgZS5pbml0RXZlbnQobmFtZSwgdHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgcmV0dXJuIGU7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBpc0RhdGVTZWxlY3RlZChkYXRlKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWxmLnNlbGVjdGVkRGF0ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGNvbXBhcmVEYXRlcyhzZWxmLnNlbGVjdGVkRGF0ZXNbaV0sIGRhdGUpID09PSAwKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCIgKyBpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBpc0RhdGVJblJhbmdlKGRhdGUpIHtcclxuICAgICAgICBpZiAoc2VsZi5jb25maWcubW9kZSAhPT0gXCJyYW5nZVwiIHx8IHNlbGYuc2VsZWN0ZWREYXRlcy5sZW5ndGggPCAyKVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIChjb21wYXJlRGF0ZXMoZGF0ZSwgc2VsZi5zZWxlY3RlZERhdGVzWzBdKSA+PSAwICYmXHJcbiAgICAgICAgICAgIGNvbXBhcmVEYXRlcyhkYXRlLCBzZWxmLnNlbGVjdGVkRGF0ZXNbMV0pIDw9IDApO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gdXBkYXRlTmF2aWdhdGlvbkN1cnJlbnRNb250aCgpIHtcclxuICAgICAgICBpZiAoc2VsZi5jb25maWcubm9DYWxlbmRhciB8fCBzZWxmLmlzTW9iaWxlIHx8ICFzZWxmLm1vbnRoTmF2KVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgc2VsZi5jdXJyZW50TW9udGhFbGVtZW50LnRleHRDb250ZW50ID1cclxuICAgICAgICAgICAgbW9udGhUb1N0cihzZWxmLmN1cnJlbnRNb250aCwgc2VsZi5jb25maWcuc2hvcnRoYW5kQ3VycmVudE1vbnRoLCBzZWxmLmwxMG4pICsgXCIgXCI7XHJcbiAgICAgICAgc2VsZi5jdXJyZW50WWVhckVsZW1lbnQudmFsdWUgPSBzZWxmLmN1cnJlbnRZZWFyLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgc2VsZi5faGlkZVByZXZNb250aEFycm93ID1cclxuICAgICAgICAgICAgc2VsZi5jb25maWcubWluRGF0ZSAhPT0gdW5kZWZpbmVkICYmXHJcbiAgICAgICAgICAgICAgICAoc2VsZi5jdXJyZW50WWVhciA9PT0gc2VsZi5jb25maWcubWluRGF0ZS5nZXRGdWxsWWVhcigpXHJcbiAgICAgICAgICAgICAgICAgICAgPyBzZWxmLmN1cnJlbnRNb250aCA8PSBzZWxmLmNvbmZpZy5taW5EYXRlLmdldE1vbnRoKClcclxuICAgICAgICAgICAgICAgICAgICA6IHNlbGYuY3VycmVudFllYXIgPCBzZWxmLmNvbmZpZy5taW5EYXRlLmdldEZ1bGxZZWFyKCkpO1xyXG4gICAgICAgIHNlbGYuX2hpZGVOZXh0TW9udGhBcnJvdyA9XHJcbiAgICAgICAgICAgIHNlbGYuY29uZmlnLm1heERhdGUgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICAgICAgICAgICAgKHNlbGYuY3VycmVudFllYXIgPT09IHNlbGYuY29uZmlnLm1heERhdGUuZ2V0RnVsbFllYXIoKVxyXG4gICAgICAgICAgICAgICAgICAgID8gc2VsZi5jdXJyZW50TW9udGggKyAxID4gc2VsZi5jb25maWcubWF4RGF0ZS5nZXRNb250aCgpXHJcbiAgICAgICAgICAgICAgICAgICAgOiBzZWxmLmN1cnJlbnRZZWFyID4gc2VsZi5jb25maWcubWF4RGF0ZS5nZXRGdWxsWWVhcigpKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVZhbHVlKHRyaWdnZXJDaGFuZ2UpIHtcclxuICAgICAgICBpZiAodHJpZ2dlckNoYW5nZSA9PT0gdm9pZCAwKSB7IHRyaWdnZXJDaGFuZ2UgPSB0cnVlOyB9XHJcbiAgICAgICAgaWYgKCFzZWxmLnNlbGVjdGVkRGF0ZXMubGVuZ3RoKVxyXG4gICAgICAgICAgICByZXR1cm4gc2VsZi5jbGVhcih0cmlnZ2VyQ2hhbmdlKTtcclxuICAgICAgICBpZiAoc2VsZi5tb2JpbGVJbnB1dCAhPT0gdW5kZWZpbmVkICYmIHNlbGYubW9iaWxlRm9ybWF0U3RyKSB7XHJcbiAgICAgICAgICAgIHNlbGYubW9iaWxlSW5wdXQudmFsdWUgPVxyXG4gICAgICAgICAgICAgICAgc2VsZi5sYXRlc3RTZWxlY3RlZERhdGVPYmogIT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAgICAgICAgID8gc2VsZi5mb3JtYXREYXRlKHNlbGYubGF0ZXN0U2VsZWN0ZWREYXRlT2JqLCBzZWxmLm1vYmlsZUZvcm1hdFN0cilcclxuICAgICAgICAgICAgICAgICAgICA6IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBqb2luQ2hhciA9IHNlbGYuY29uZmlnLm1vZGUgIT09IFwicmFuZ2VcIlxyXG4gICAgICAgICAgICA/IHNlbGYuY29uZmlnLmNvbmp1bmN0aW9uXHJcbiAgICAgICAgICAgIDogc2VsZi5sMTBuLnJhbmdlU2VwYXJhdG9yO1xyXG4gICAgICAgIHNlbGYuaW5wdXQudmFsdWUgPSBzZWxmLnNlbGVjdGVkRGF0ZXNcclxuICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAoZE9iaikgeyByZXR1cm4gc2VsZi5mb3JtYXREYXRlKGRPYmosIHNlbGYuY29uZmlnLmRhdGVGb3JtYXQpOyB9KVxyXG4gICAgICAgICAgICAuam9pbihqb2luQ2hhcik7XHJcbiAgICAgICAgaWYgKHNlbGYuYWx0SW5wdXQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICBzZWxmLmFsdElucHV0LnZhbHVlID0gc2VsZi5zZWxlY3RlZERhdGVzXHJcbiAgICAgICAgICAgICAgICAubWFwKGZ1bmN0aW9uIChkT2JqKSB7IHJldHVybiBzZWxmLmZvcm1hdERhdGUoZE9iaiwgc2VsZi5jb25maWcuYWx0Rm9ybWF0KTsgfSlcclxuICAgICAgICAgICAgICAgIC5qb2luKGpvaW5DaGFyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRyaWdnZXJDaGFuZ2UgIT09IGZhbHNlKVxyXG4gICAgICAgICAgICB0cmlnZ2VyRXZlbnQoXCJvblZhbHVlVXBkYXRlXCIpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gb25Nb250aE5hdkNsaWNrKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdmFyIGlzUHJldk1vbnRoID0gc2VsZi5wcmV2TW9udGhOYXYuY29udGFpbnMoZS50YXJnZXQpO1xyXG4gICAgICAgIHZhciBpc05leHRNb250aCA9IHNlbGYubmV4dE1vbnRoTmF2LmNvbnRhaW5zKGUudGFyZ2V0KTtcclxuICAgICAgICBpZiAoaXNQcmV2TW9udGggfHwgaXNOZXh0TW9udGgpIHtcclxuICAgICAgICAgICAgY2hhbmdlTW9udGgoaXNQcmV2TW9udGggPyAtMSA6IDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChlLnRhcmdldCA9PT0gc2VsZi5jdXJyZW50WWVhckVsZW1lbnQpIHtcclxuICAgICAgICAgICAgc2VsZi5jdXJyZW50WWVhckVsZW1lbnQuc2VsZWN0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gXCJhcnJvd1VwXCIpIHtcclxuICAgICAgICAgICAgc2VsZi5jaGFuZ2VZZWFyKHNlbGYuY3VycmVudFllYXIgKyAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSBcImFycm93RG93blwiKSB7XHJcbiAgICAgICAgICAgIHNlbGYuY2hhbmdlWWVhcihzZWxmLmN1cnJlbnRZZWFyIC0gMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gdGltZVdyYXBwZXIoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB2YXIgaXNLZXlEb3duID0gZS50eXBlID09PSBcImtleWRvd25cIiwgaW5wdXQgPSBlLnRhcmdldDtcclxuICAgICAgICBpZiAoc2VsZi5hbVBNICE9PSB1bmRlZmluZWQgJiYgZS50YXJnZXQgPT09IHNlbGYuYW1QTSkge1xyXG4gICAgICAgICAgICBzZWxmLmFtUE0udGV4dENvbnRlbnQgPVxyXG4gICAgICAgICAgICAgICAgc2VsZi5sMTBuLmFtUE1baW50KHNlbGYuYW1QTS50ZXh0Q29udGVudCA9PT0gc2VsZi5sMTBuLmFtUE1bMF0pXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG1pbiA9IHBhcnNlRmxvYXQoaW5wdXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1taW5cIikpLCBtYXggPSBwYXJzZUZsb2F0KGlucHV0LmdldEF0dHJpYnV0ZShcImRhdGEtbWF4XCIpKSwgc3RlcCA9IHBhcnNlRmxvYXQoaW5wdXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1zdGVwXCIpKSwgY3VyVmFsdWUgPSBwYXJzZUludChpbnB1dC52YWx1ZSwgMTApLCBkZWx0YSA9IGUuZGVsdGEgfHxcclxuICAgICAgICAgICAgKGlzS2V5RG93biA/IChlLndoaWNoID09PSAzOCA/IDEgOiAtMSkgOiAwKTtcclxuICAgICAgICB2YXIgbmV3VmFsdWUgPSBjdXJWYWx1ZSArIHN0ZXAgKiBkZWx0YTtcclxuICAgICAgICBpZiAodHlwZW9mIGlucHV0LnZhbHVlICE9PSBcInVuZGVmaW5lZFwiICYmIGlucHV0LnZhbHVlLmxlbmd0aCA9PT0gMikge1xyXG4gICAgICAgICAgICB2YXIgaXNIb3VyRWxlbSA9IGlucHV0ID09PSBzZWxmLmhvdXJFbGVtZW50LCBpc01pbnV0ZUVsZW0gPSBpbnB1dCA9PT0gc2VsZi5taW51dGVFbGVtZW50O1xyXG4gICAgICAgICAgICBpZiAobmV3VmFsdWUgPCBtaW4pIHtcclxuICAgICAgICAgICAgICAgIG5ld1ZhbHVlID1cclxuICAgICAgICAgICAgICAgICAgICBtYXggK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZSArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGludCghaXNIb3VyRWxlbSkgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAoaW50KGlzSG91ckVsZW0pICYmIGludCghc2VsZi5hbVBNKSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNNaW51dGVFbGVtKVxyXG4gICAgICAgICAgICAgICAgICAgIGluY3JlbWVudE51bUlucHV0KHVuZGVmaW5lZCwgLTEsIHNlbGYuaG91ckVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKG5ld1ZhbHVlID4gbWF4KSB7XHJcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZSA9XHJcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQgPT09IHNlbGYuaG91ckVsZW1lbnQgPyBuZXdWYWx1ZSAtIG1heCAtIGludCghc2VsZi5hbVBNKSA6IG1pbjtcclxuICAgICAgICAgICAgICAgIGlmIChpc01pbnV0ZUVsZW0pXHJcbiAgICAgICAgICAgICAgICAgICAgaW5jcmVtZW50TnVtSW5wdXQodW5kZWZpbmVkLCAxLCBzZWxmLmhvdXJFbGVtZW50KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoc2VsZi5hbVBNICYmXHJcbiAgICAgICAgICAgICAgICBpc0hvdXJFbGVtICYmXHJcbiAgICAgICAgICAgICAgICAoc3RlcCA9PT0gMVxyXG4gICAgICAgICAgICAgICAgICAgID8gbmV3VmFsdWUgKyBjdXJWYWx1ZSA9PT0gMjNcclxuICAgICAgICAgICAgICAgICAgICA6IE1hdGguYWJzKG5ld1ZhbHVlIC0gY3VyVmFsdWUpID4gc3RlcCkpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuYW1QTS50ZXh0Q29udGVudCA9XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5sMTBuLmFtUE1baW50KHNlbGYuYW1QTS50ZXh0Q29udGVudCA9PT0gc2VsZi5sMTBuLmFtUE1bMF0pXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpbnB1dC52YWx1ZSA9IHBhZChuZXdWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaW5pdCgpO1xyXG4gICAgcmV0dXJuIHNlbGY7XHJcbn1cclxuZnVuY3Rpb24gX2ZsYXRwaWNrcihub2RlTGlzdCwgY29uZmlnKSB7XHJcbiAgICB2YXIgbm9kZXMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChub2RlTGlzdCk7XHJcbiAgICB2YXIgaW5zdGFuY2VzID0gW107XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIG5vZGUgPSBub2Rlc1tpXTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAobm9kZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLWZwLW9taXRcIikgIT09IG51bGwpXHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgaWYgKG5vZGUuX2ZsYXRwaWNrciAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICBub2RlLl9mbGF0cGlja3IuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgbm9kZS5fZmxhdHBpY2tyID0gdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG5vZGUuX2ZsYXRwaWNrciA9IEZsYXRwaWNrckluc3RhbmNlKG5vZGUsIGNvbmZpZyB8fCB7fSk7XHJcbiAgICAgICAgICAgIGluc3RhbmNlcy5wdXNoKG5vZGUuX2ZsYXRwaWNrcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGluc3RhbmNlcy5sZW5ndGggPT09IDEgPyBpbnN0YW5jZXNbMF0gOiBpbnN0YW5jZXM7XHJcbn1cclxuaWYgKHR5cGVvZiBIVE1MRWxlbWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgSFRNTENvbGxlY3Rpb24ucHJvdG90eXBlLmZsYXRwaWNrciA9IE5vZGVMaXN0LnByb3RvdHlwZS5mbGF0cGlja3IgPSBmdW5jdGlvbiAoY29uZmlnKSB7XHJcbiAgICAgICAgcmV0dXJuIF9mbGF0cGlja3IodGhpcywgY29uZmlnKTtcclxuICAgIH07XHJcbiAgICBIVE1MRWxlbWVudC5wcm90b3R5cGUuZmxhdHBpY2tyID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG4gICAgICAgIHJldHVybiBfZmxhdHBpY2tyKFt0aGlzXSwgY29uZmlnKTtcclxuICAgIH07XHJcbn1cclxudmFyIGZsYXRwaWNrcjtcclxuZmxhdHBpY2tyID0gZnVuY3Rpb24gKHNlbGVjdG9yLCBjb25maWcpIHtcclxuICAgIGlmIChzZWxlY3RvciBpbnN0YW5jZW9mIE5vZGVMaXN0KVxyXG4gICAgICAgIHJldHVybiBfZmxhdHBpY2tyKHNlbGVjdG9yLCBjb25maWcpO1xyXG4gICAgZWxzZSBpZiAodHlwZW9mIHNlbGVjdG9yID09PSBcInN0cmluZ1wiKVxyXG4gICAgICAgIHJldHVybiBfZmxhdHBpY2tyKHdpbmRvdy5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSwgY29uZmlnKTtcclxuICAgIHJldHVybiBfZmxhdHBpY2tyKFtzZWxlY3Rvcl0sIGNvbmZpZyk7XHJcbn07XHJcbmlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKVxyXG4gICAgd2luZG93LmZsYXRwaWNrciA9IGZsYXRwaWNrcjtcclxuZmxhdHBpY2tyLmRlZmF1bHRDb25maWcgPSBkZWZhdWx0cztcclxuZmxhdHBpY2tyLmwxMG5zID0ge1xyXG4gICAgZW46IF9fYXNzaWduKHt9LCBlbmdsaXNoKSxcclxuICAgIGRlZmF1bHQ6IF9fYXNzaWduKHt9LCBlbmdsaXNoKSxcclxufTtcclxuZmxhdHBpY2tyLmxvY2FsaXplID0gZnVuY3Rpb24gKGwxMG4pIHtcclxuICAgIGZsYXRwaWNrci5sMTBucy5kZWZhdWx0ID0gX19hc3NpZ24oe30sIGZsYXRwaWNrci5sMTBucy5kZWZhdWx0LCBsMTBuKTtcclxufTtcclxuZmxhdHBpY2tyLnNldERlZmF1bHRzID0gZnVuY3Rpb24gKGNvbmZpZykge1xyXG4gICAgZmxhdHBpY2tyLmRlZmF1bHRDb25maWcgPSBfX2Fzc2lnbih7fSwgZmxhdHBpY2tyLmRlZmF1bHRDb25maWcsIGNvbmZpZyk7XHJcbn07XHJcbmZsYXRwaWNrci5wYXJzZURhdGUgPSBjcmVhdGVEYXRlUGFyc2VyKHt9KTtcclxuZmxhdHBpY2tyLmZvcm1hdERhdGUgPSBjcmVhdGVEYXRlRm9ybWF0dGVyKHt9KTtcclxuZmxhdHBpY2tyLmNvbXBhcmVEYXRlcyA9IGNvbXBhcmVEYXRlcztcclxuaWYgKHR5cGVvZiBqUXVlcnkgIT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgIGpRdWVyeS5mbi5mbGF0cGlja3IgPSBmdW5jdGlvbiAoY29uZmlnKSB7XHJcbiAgICAgICAgcmV0dXJuIF9mbGF0cGlja3IodGhpcywgY29uZmlnKTtcclxuICAgIH07XHJcbn1cclxuRGF0ZS5wcm90b3R5cGUuZnBfaW5jciA9IGZ1bmN0aW9uIChkYXlzKSB7XHJcbiAgICByZXR1cm4gbmV3IERhdGUodGhpcy5nZXRGdWxsWWVhcigpLCB0aGlzLmdldE1vbnRoKCksIHRoaXMuZ2V0RGF0ZSgpICsgKHR5cGVvZiBkYXlzID09PSBcInN0cmluZ1wiID8gcGFyc2VJbnQoZGF5cywgMTApIDogZGF5cykpO1xyXG59O1xyXG52YXIgZmxhdHBpY2tyJDEgPSBmbGF0cGlja3I7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZsYXRwaWNrciQxO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG59KSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gL1VzZXJzL2JvYmJ5L1NpdGVzL2FyY2hzeXN0ZW1zL2h0ZG9jcy93cC1jb250ZW50L3RoZW1lcy9hcmNoc3lzdGVtcy92ZW5kb3Ivb21nLWZpZWxkcy9ub2RlX21vZHVsZXMvZmxhdHBpY2tyL2Rpc3QvZmxhdHBpY2tyLmpzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgbGlzdCBmcm9tICcuL2xpc3QnO1xuaW1wb3J0IGhpZGRlbiBmcm9tICcuL3NlcmlhbGl6ZWQtaW5wdXQnO1xuaW1wb3J0IHtcbiAgcmVtb3ZlSXRlbXMsXG4gIGRyYWdJdGVtcyxcbiAgb25EcmFnSW1hZ2UsXG4gIG9uUmVtb3ZlSW1hZ2UsXG59IGZyb20gJy4vdXRpbGl0aWVzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIGNvbnN0IGdhbGxlcnlTZWN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5nYWxsZXJ5LXdyYXBwZXInKTtcblxuICBpZiAoIWdhbGxlcnlTZWN0aW9ucykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIFtdLmZvckVhY2guY2FsbChnYWxsZXJ5U2VjdGlvbnMsIGdhbGxlcnkgPT4ge1xuICAgIGNvbnN0IGFkZEltYWdlID0gZ2FsbGVyeS5xdWVyeVNlbGVjdG9yKCcuYWRkLWdhbGxlcnktaW1hZ2VzJyk7XG4gICAgY29uc3QgSGlkZGVuID0gaGlkZGVuKGdhbGxlcnksICcuaW1hZ2UtZ2FsbGVyeS1oaWRkZW4nKTtcblxuICAgIGNvbnN0IHJlbW92ZSA9IHJlbW92ZUl0ZW1zKEhpZGRlbiwgb25SZW1vdmVJbWFnZSk7XG4gICAgY29uc3QgZHJhZyA9IGRyYWdJdGVtcyhIaWRkZW4sIG9uRHJhZ0ltYWdlKTtcbiAgICBjb25zdCBMaXN0ID0gbGlzdChnYWxsZXJ5LCB7XG4gICAgICBsaXN0OiAnLmdhbGxlcnktaW1hZ2VzJyxcbiAgICAgIG9uRHJhZzogZHJhZyxcbiAgICAgIG9uUmVtb3ZlOiByZW1vdmUsXG4gICAgICBsaXN0VGVtcGxhdGU6IGltYWdlSXRlbSxcbiAgICB9KTtcblxuICAgIGNvbnN0IG1lZGlhRnJhbWUgPSB3cC5tZWRpYSh7XG4gICAgICB0aXRsZTogJ0Nob29zZSBNZWRpYScsXG4gICAgICBidXR0b246IHtcbiAgICAgICAgdGV4dDogJ1VzZSBTZWxlY3RlZCBNZWRpYScsXG4gICAgICB9LFxuICAgICAgbXVsdGlwbGU6IHRydWUsXG4gICAgfSk7XG5cbiAgICBhZGRJbWFnZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBtZWRpYUZyYW1lLm9wZW4oKTtcbiAgICB9KTtcblxuICAgIG1lZGlhRnJhbWUub24oJ3NlbGVjdCcsIGZ1bmN0aW9uKCkge1xuICAgICAgY29uc3QgYXR0YWNobWVudHMgPSBtZWRpYUZyYW1lXG4gICAgICAgIC5zdGF0ZSgpXG4gICAgICAgIC5nZXQoJ3NlbGVjdGlvbicpXG4gICAgICAgIC50b0pTT04oKTtcblxuICAgICAgYXR0YWNobWVudHMuZm9yRWFjaChhdHRhY2htZW50ID0+IHtcbiAgICAgICAgTGlzdC5hZGQoYXR0YWNobWVudCk7XG4gICAgICAgIEhpZGRlbi5hZGQoYXR0YWNobWVudC5pZCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmNvbnN0IGltYWdlSXRlbSA9IGltYWdlID0+IHtcbiAgcmV0dXJuIGA8bGkgY2xhc3M9XCJnYWxsZXJ5LWltYWdlLWl0ZW1cIj48c3BhbiBjbGFzcz1cImdhbGxlcnktaWFtZ2UtaWRcIj4ke1xuICAgIGltYWdlLmlkXG4gIH08L3NwYW4+PGltZyBzcmM9XCIke1xuICAgIGltYWdlLnVybFxuICB9XCIgY2xhc3M9XCJnYWxsZXJ5LWltYWdlXCIvPjxzcGFuPjxzdmcgY2xhc3M9XCJyZW1vdmUtZ2FsbGVyeS1pbWFnZVwiIHZpZXdCb3g9XCIwIDAgMjAgMjBcIj5cbiAgPHBhdGggZD1cIk0xMCAyYzQuNDIgMCA4IDMuNTggOCA4cy0zLjU4IDgtOCA4LTgtMy41OC04LTggMy41OC04IDgtOHpNMTUgMTNsLTMtMyAzLTMtMi0yLTMgMy0zLTMtMiAyIDMgMy0zIDMgMiAyIDMtMyAzIDN6XCI+PC9wYXRoPlxuPC9zdmc+PC9zcGFuPjwvbGk+YDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9nYWxsZXJ5LmpzIiwiaW1wb3J0IGxpc3QgZnJvbSAnLi9saXN0JztcbmltcG9ydCBoaWRkZW4gZnJvbSAnLi9zZXJpYWxpemVkLWlucHV0JztcbmltcG9ydCB7XG4gIHJlbW92ZUl0ZW1zLFxuICBkcmFnSXRlbXMsXG4gIG9uRHJhZ1RhYmxlLFxuICBvblJlbW92ZVRhYmxlLFxufSBmcm9tICcuL3V0aWxpdGllcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICBjb25zdCB0YWJsZUxpc3RzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlLWxpc3QnKTtcblxuICBpZiAoIXRhYmxlTGlzdHMpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBbXS5mb3JFYWNoLmNhbGwodGFibGVMaXN0cywgdGFibGVMaXN0ID0+IHtcbiAgICBjb25zdCBhZGRSb3cgPSB0YWJsZUxpc3QucXVlcnlTZWxlY3RvcignLnRhYmxlLWxpc3QtYWRkJyk7XG4gICAgY29uc3QgSGlkZGVuID0gaGlkZGVuKHRhYmxlTGlzdCwgJy50YWJsZS1saXN0LWhpZGRlbicpO1xuICAgIGNvbnN0IHJlbW92ZSA9IHJlbW92ZUl0ZW1zKEhpZGRlbiwgb25SZW1vdmVUYWJsZSk7XG4gICAgY29uc3QgZHJhZyA9IGRyYWdJdGVtcyhIaWRkZW4sIG9uRHJhZ1RhYmxlKTtcbiAgICBjb25zdCBMaXN0ID0gbGlzdCh0YWJsZUxpc3QsIHtcbiAgICAgIGxpc3Q6ICcudGFibGUtbGlzdC1saXN0JyxcbiAgICAgIG9uRHJhZzogZHJhZyxcbiAgICAgIG9uUmVtb3ZlOiByZW1vdmUsXG4gICAgICBsaXN0VGVtcGxhdGU6IHRhYmxlSXRlbSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGtleSA9IHRhYmxlTGlzdC5xdWVyeVNlbGVjdG9yKCcudGFibGUtbGlzdC1rZXknKTtcbiAgICBjb25zdCB2YWx1ZSA9IHRhYmxlTGlzdC5xdWVyeVNlbGVjdG9yKCcudGFibGUtbGlzdC12YWx1ZScpO1xuXG4gICAgYWRkUm93LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgY29uc3Qgcm93RGF0YSA9IHtcbiAgICAgICAga2V5OiBrZXkudmFsdWUsXG4gICAgICAgIHZhbHVlOiB2YWx1ZS52YWx1ZSxcbiAgICAgIH07XG5cbiAgICAgIExpc3QuYWRkKHJvd0RhdGEpO1xuICAgICAgSGlkZGVuLmFkZChyb3dEYXRhKTtcblxuICAgICAga2V5LnZhbHVlID0gJyc7XG4gICAgICB2YWx1ZS52YWx1ZSA9ICcnO1xuICAgIH0pO1xuICB9KTtcbn1cblxuY29uc3QgdGFibGVJdGVtID0gcm93RGF0YSA9PiB7XG4gIHJldHVybiBgPGxpIGNsYXNzPVwidGV4dC1saXN0LWl0ZW0gdGFibGUtbGlzdC1pdGVtXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJ0YWJsZS1saXN0LWtleVwiPiR7cm93RGF0YS5rZXl9PC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwidGFibGUtbGlzdC12YWx1ZVwiPiR7cm93RGF0YS52YWx1ZX08L3NwYW4+XG4gICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDIwIDIwXCI+XG4gICAgICAgIDxwYXRoIGQ9XCJNMTAgMmM0LjQyIDAgOCAzLjU4IDggOHMtMy41OCA4LTggOC04LTMuNTgtOC04IDMuNTgtOCA4LTh6TTE1IDEzbC0zLTMgMy0zLTItMi0zIDMtMy0zLTIgMiAzIDMtMyAzIDIgMiAzLTMgMyAzelwiPjwvcGF0aD5cbiAgICA8L3N2Zz5cbjwvbGk+YDtcbn07XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi90YWJsZS1saXN0LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==