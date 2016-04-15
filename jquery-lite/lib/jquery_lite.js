/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var DOMNodeCollection = __webpack_require__(1);
	var isLoaded = false;
	var funcsToExecute = [];

	window.onload = function () {
	  isLoaded = true;
	  funcsToExecute.forEach(function (fnc) {
	    fnc();
	  });
	};


	window.$l = function (selector) {
	  if (selector instanceof HTMLElement) {
	    return new DOMNodeCollection([selector]);
	  } else if (selector instanceof Function) {
	    if (isLoaded) {
	      selector();
	    } else {
	      this.funcsToExecute.push(selector);
	    }
	  }
	  var arr = Array.prototype.slice.call(document.querySelectorAll(selector));
	  return new DOMNodeCollection(arr);
	};

	window.$l.extend = function () {
	  var args = [].slice.call(arguments);
	  var retObj = args.shift();
	  args.forEach(function(obj) {
	    Object.keys(obj).forEach(function(key) {
	      retObj[key] = obj[key];
	    });
	  });
	  return retObj;
	};

	window.$l.ajax = function(options) {
	  var defReq = {
	    method: 'GET',
	    success: function (data, status) {
	      console.log('data: ' + data);
	      console.log('status: ' + status);
	    },
	    error: function (request, status, err) {
	      alert("status: " + status + "\n" + "error: " + err) ;
	    },
	    url: window.location.href ,
	    data: '',
	    contentType: "application/x-www-form-urlencoded; charset=UTF-8"
	  };
	  var fullReq = this.extend(defReq, options);

	  var xhReq = new XMLHttpRequest();

	  xhReq.open(fullReq.method, fullReq.url);
	  xhReq.onload = function() {
	    if (xhReq.status === 200) {
	      fullReq.success(JSON.parse(xhReq.response), xhReq.status, xhReq);
	    } else {
	      fullReq.error(xhReq, xhReq.status);
	    }
	  };
	  xhReq.contentType = fullReq.contentType;
	  xhReq.send(fullReq.data);
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	var DOMNodeCollection = function(HTMLElements) {
	  this.HTMLElements = HTMLElements;
	};

	DOMNodeCollection.prototype.html = function (innerHTML) {
	  if (innerHTML || innerHTML === '') {
	    this.HTMLElements.forEach( function (el) {
	      el.innerHTML = innerHTML;
	    });
	  }
	  else {
	    return this.HTMLElements[0].innerHTML;
	  }
	};

	DOMNodeCollection.prototype.empty = function () {
	  this.html('');
	};

	DOMNodeCollection.prototype.append = function(content) {
	  if(content instanceof DOMNodeCollection) {
	    content.HTMLElements.forEach(function(el) {
	      this.appendToEls(el.outerHTML);
	    }.bind(this));
	  } else if (content instanceof HTMLElement) {
	      this.appendToEls(content.outerHTML);
	  } else {
	    this.appendToEls(content);
	  }
	};

	DOMNodeCollection.prototype.appendToEls = function(str) {
	  this.HTMLElements.forEach(function(domEl) {
	    domEl.innerHTML += str;
	  });
	};

	DOMNodeCollection.prototype.attr = function (name, value) {
	  if (value === undefined) {
	    return this.HTMLElements[0].getAttribute(name);
	  } else {
	  this.HTMLElements.forEach(function (el) {
	    el.setAttribute(name, value);
	    });
	  }
	};

	DOMNodeCollection.prototype.addClass = function (className) {
	  this.HTMLElements.forEach( function (el) {
	    el.className = className;
	  });
	};

	DOMNodeCollection.prototype.removeClass = function (className) {
	  if (className === undefined) {
	    this.HTMLElements.forEach(function (el) {
	      el.removeAttribute("class");
	    });
	  } else {
	    this.HTMLElements.forEach(function (el) {
	      el.classList.remove(className);
	    });
	  }
	};

	DOMNodeCollection.prototype.children = function () {
	  var toBeCollected = [];
	  this.HTMLElements.forEach(function(el) {
	    toBeCollected.push(el.children);
	  });
	  return new DOMNodeCollection(toBeCollected);
	};

	DOMNodeCollection.prototype.parent = function () {
	  var padres = [];
	  this.HTMLElements.forEach(function(el) {
	    padres.push(el.parentElement);
	  });
	  return new DOMNodeCollection(padres);
	};

	DOMNodeCollection.prototype.find = function (selector) {
	  var selectedEls = [];
	  selectedEls = this.HTMLElements.forEach(function(el) {
	    selectedEls.concat(el.querySelectorAll(selector));
	  });
	  return new DOMNodeCollection(selectedEls);
	};

	DOMNodeCollection.prototype.remove = function () {
	  this.HTMLElements.forEach(function (el) {
	    el.remove();
	  });
	  this.HTMLElements = [];
	};

	DOMNodeCollection.prototype.on = function (type, fnc) {
	  this.HTMLElements.forEach(function (el) {
	    el.addEventListener(type, fnc);
	  });
	};

	DOMNodeCollection.prototype.off = function (type, fnc) {
	  this.HTMLElements.forEach(function (el) {
	    el.removeEventListener(type, fnc);
	  });
	};
	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);