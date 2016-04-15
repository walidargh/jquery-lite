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
