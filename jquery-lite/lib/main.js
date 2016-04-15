var DOMNodeCollection = require("./dom_node_collection");
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
