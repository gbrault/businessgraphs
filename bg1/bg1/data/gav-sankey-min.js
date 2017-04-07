
// Generated on 2013-03-07

// ========== gav-m-base.js ==========
;
(function () {
	Array.isArray || (Array.isArray = function (d) {
		return "[object Array]" === Object.prototype.toString.call(d)
	});
	Array.prototype.indexOf || (Array.prototype.indexOf = function (d) {
		if (null == this)
			throw new TypeError;
		var b = Object(this),
		a = b.length >>> 0;
		if (0 === a)
			return -1;
		var c = 0;
		0 < arguments.length && (c = Number(arguments[1]), c != c ? c = 0 : 0 != c && Infinity != c && -Infinity != c && (c = (0 < c || -1) * Math.floor(Math.abs(c))));
		if (c >= a)
			return -1;
		for (c = 0 <= c ? c : Math.max(a - Math.abs(c), 0); c < a; c++)
			if (c in b && b[c] === d)
				return c;
		return -1
	});
	Array.prototype.forEach ||
	(Array.prototype.forEach = function (d, b) {
		for (var a = 0, c = this.length; a < c; ++a)
			d.call(b || this, this[a], a, this)
	});
	Array.prototype.some || (Array.prototype.some = function (d, b) {
		if (null == this)
			throw new TypeError;
		var a = Object(this),
		c = a.length >>> 0;
		if ("function" != typeof d)
			throw new TypeError;
		for (var f = 0; f < c; f++)
			if (f in a && d.call(b, a[f], f, a))
				return !0;
		return !1
	});
	Array.prototype.filter || (Array.prototype.filter = function (d, b) {
		if (null == this)
			throw new TypeError;
		var a = Object(this),
		c = a.length >>> 0;
		if ("function" != typeof d)
			throw new TypeError;
		for (var f = [], e = 0; e < c; e++)
			if (e in a) {
				var g = a[e];
				d.call(b, g, e, a) && f.push(g)
			}
		return f
	});
	Array.prototype.map || (Array.prototype.map = function (d, b) {
		var a,
		c,
		f;
		if (null == this)
			throw new TypeError(" this is null or not defined");
		var e = Object(this),
		g = e.length >>> 0;
		if ("function" !== typeof d)
			throw new TypeError(d + " is not a function");
		b && (a = b);
		c = Array(g);
		for (f = 0; f < g; ) {
			var j;
			f in e && (j = e[f], j = d.call(a, j, f, e), c[f] = j);
			f++
		}
		return c
	});
	String.prototype.trim || (String.prototype.trim = function () {
		return this.replace(/^\s+|\s+$/g,
			"")
	})
})();
(function (d) {
	function b(a, b, c) {
		var f = c.type;
		c.type = b;
		d.event.handle.call(a, c);
		c.type = f
	}
	function a(a) {
		a = a.originalEvent ? a.originalEvent : a;
		return a.targetTouches && a.targetTouches.length ? {
			x : a.targetTouches[0].pageX,
			y : a.targetTouches[0].pageY
		}
		 : {
			x : a.pageX,
			y : a.pageY
		}
	}
	var c = "ontouchend" in document || "TouchEvent" in window ? !0 : !1,
	f = !1,
	e;
	d(document).bind("touchmove", function () {
		f = !0;
		clearTimeout(e);
		e = setTimeout(function () {
				f = !1
			}, 50)
	});
	d.event.special.gavtap = {
		setup : function () {
			function a(c) {
				t && (u.unbind("mousemove", k),
					t = !1);
				if (n || p)
					return p = n = !1, c.preventDefault(), !1;
				c.gav = {
					x : c.pageX,
					y : c.pageY
				};
				b(m, "gavtap", c)
			}
			function e(a) {
				t || (u.bind("mousemove", k), t = !0, r = a.pageX, v = a.pageY)
			}
			function k(a) {
				if (2 < Math.abs(r - a.pageX) || 2 < Math.abs(v - a.pageY))
					p = !0, u.unbind("mousemove", k), t = !1
			}
			var m = this,
			o,
			n = !1,
			p = !1,
			r,
			v,
			t = !1,
			u = d(m);
			u.bind("click", a);
			c && u.bind("touchstart", function (c) {
				function d() {
					clearTimeout(r);
					u.unbind("touchend", k);
					o = setTimeout(function () {
							u.bind("click", a)
						}, 1500)
				}
				function k(a) {
					d();
					!f && p == a.target && 250 > (new Date).getTime() -
					v ? (a.gav = {
							x : a.originalEvent.changedTouches[0] ? a.originalEvent.changedTouches[0].pageX : 0,
							y : a.originalEvent.changedTouches[0] ? a.originalEvent.changedTouches[0].pageY : 0
						}, b(m, "gavtap", a)) : f && (f = !1);
					a.preventDefault()
				}
				clearTimeout(o);
				n = !0;
				var p = c.target,
				r,
				v = (new Date).getTime();
				u.unbind("mousedown", e);
				u.unbind("click", a);
				u.bind("touchcancel", d).bind("touchend", k)
			})
		}
	};
	d.event.special.gavdrag = {
		setup : function () {
			var a = this,
			c = d(a),
			f = d(document),
			e = !1;
			c.bind("mousedown", function (d) {
				function n(c) {
					f.unbind("mouseup",
						n);
					f.unbind("mousemove", p);
					r && b(a, "gavdragend", c)
				}
				function p(c) {
					c.gav = {
						x : c.pageX,
						y : c.pageY
					};
					c.gav.rel = {
						x : v,
						y : t
					};
					r || (b(a, "gavdragstart", c), r = !0);
					b(a, "gavdrag", c);
					d.preventDefault();
					return !1
				}
				if (e)
					e = !1;
				else {
					var r = !1,
					v = d.pageX - c.offset().left,
					t = d.pageY - c.offset().top;
					f.bind("mousemove", p).bind("mouseup", n);
					d.preventDefault()
				}
			})
		}
	};
	d.event.special.gavdrag = {
		setup : function () {
			var f = this,
			e = d(f),
			k = d(document),
			m = !1;
			e.bind("mousedown", function (a) {
				function c(a) {
					k.unbind("mouseup", c);
					k.unbind("mousemove", d);
					a.gav = {
						x : a.pageX,
						y : a.pageY
					};
					a.gav.rel = {
						x : v,
						y : t
					};
					r && (b(f, "gavdragend", a), r = !1)
				}
				function d(a) {
					a.gav = {
						x : a.pageX,
						y : a.pageY
					};
					a.gav.rel = {
						x : v,
						y : t
					};
					r || (b(f, "gavdragstart", a), r = !0);
					b(f, "gavdrag", a);
					a.preventDefault();
					return !1
				}
				if (m)
					m = !1;
				else {
					var r = !1,
					v = a.pageX - e.offset().left,
					t = a.pageY - e.offset().top;
					k.bind("mousemove", d).bind("mouseup", c);
					a.preventDefault()
				}
			});
			c && e.bind("touchstart", function (c) {
				function d(c) {
					e.unbind("touchend", d);
					e.unbind("touchmove", k);
					var m = a(c.originalEvent);
					c.gav = {
						x : m.x,
						y : m.y
					};
					c.gav.rel = {
						x : v,
						y : t
					};
					r && b(f, "gavdragend", c)
				}
				function k(c) {
					var e = a(c.originalEvent);
					c.gav = {
						x : e.x,
						y : e.y
					};
					c.gav.rel = {
						x : v,
						y : t
					};
					r || (b(f, "gavdragstart", c), r = !0);
					b(f, "gavdrag", c)
				}
				m = !0;
				var r = !1,
				c = a(c.originalEvent),
				v = c.x - e.offset().left,
				t = c.y - e.offset().top;
				e.bind("touchmove", k).bind("touchend", d)
			})
		}
	}
})(jQuery);
(function (d) {
	d.fn.gavButton = function (b) {
		var a = d.extend({
				iconize : !1,
				icon : !1,
				text : !0
			}, b);
		return this.each(function () {
			a.container = this;
			new gav.controls.Button(a)
		})
	};
	d.fn.gavButton_old = function (b) {
		var a = d.extend({
				iconize : !1,
				icon : !1,
				text : !1
			}, b);
		return this.each(function () {
			a.container = this;
			new gav.controls.Button(a)
		})
	}
})(jQuery);
(function (d) {
	if (!("gav" in window)) {
		gav = {
			name : "NComVA GAV HTML5",
			version : "1.7.0._0130111",
			events : {},
			snapshot : {},
			data : {}

		};
		gav.data.provider = {};
		gav.components = {};
		gav.components.map = {};
		gav.components.map.backgroundMap = {};
		gav.utils = {};
		gav.geom = {};
		gav.representation = {};
		gav.support = {};
		gav.support.canvas = function () {
			var a = document.createElement("canvas");
			if (a && a.getContext && a.getContext("2d"))
				return delete a, !0;
			delete a;
			return !1
		}
		();
		gav.support.touch = "ontouchend" in document ? !0 : !1;
		gav.support.csstransitions =
		function () {
			for (var a = document.createElement("span").style, b = ["", "Webkit", "Moz", "O", "ms"]; b.length; )
				if (b.pop() + "Transition" in a)
					return !0;
			return !1
		}
		();
		gav.support.dragndrop = function () {
			var a = document.createElement("div");
			return "ondrop" in a && "ondragstart" in a
		}
		();
		gav.support.fileReader = "FileReader" in window ? !0 : !1;
		gav.devicePixelRatio = 1;
		window.devicePixelRatio && (gav.devicePixelRatio = window.devicePixelRatio);
		gav.support.touch ? d(function () {
			d(document.body).addClass("gav-touch")
		}) : d(function () {
			d(document.body).addClass("gav-no-touch")
		});
		gav.log = function () {
			window.GAV_DEBUG && console.log.apply(console, Array.prototype.slice.call(arguments))
		};
		gav.mouseMoveEvent = gav.support.touch ? "touchmove" : "mousemove";
		gav.mouseUpEvent = gav.support.touch ? "touchend" : "mouseup";
		gav.mouseDownEvent = gav.support.touch ? "touchstart" : "mousedown";
		gav.mouseClickEvent = gav.support.touch ? "touchend" : "click";
		gav.mouseClickDownEvent = gav.support.touch ? "touchstart" : "click";
		gav.mouseClickUpEvent = gav.support.touch ? "touchend" : "click";
		var b = document.createElement("span"),
		a = document.createElement("span"),
		c = document.createElement("span"),
		f = document.createElement("span"),
		e = document.createElement("span"),
		g = document.createElement("span"),
		j = document.createElement("div");
		gav.isMouseDown = !1;
		d(document).ready(function () {
			b = d(b).addClass("gav-chart-item-label").appendTo(document.body).hide();
			a = d(a).addClass("gav-chart-axis-label-secondary").appendTo(document.body).hide();
			c = d(c).addClass("gav-chart-axis-label").appendTo(document.body).hide();
			f = d(f).addClass("gav-chart-item-label").appendTo(j).hide();
			e = d(e).addClass("gav-chart-axis-label-secondary").appendTo(j).hide();
			g = d(g).addClass("gav-chart-axis-label").appendTo(j).hide();
			d(j).addClass("gav-mode-presentation").appendTo(document.body);
			d(document).bind("mousedown", function () {
				gav.isMouseDown = !0
			});
			d(document).bind("mouseup", function () {
				gav.isMouseDown = !1
			})
		});
		gav.chartStyles = {
			itemLabel : {
				font : function () {
					return b.css("font-weight") + " " + b.css("font-size") + " " + b.css("font-family")
				},
				color : function () {
					return b.css("color")
				}
			},
			axisLabel : {
				font : function () {
					return c.css("font-weight") + " " + c.css("font-size") + " " + c.css("font-family")
				},
				color : function () {
					return c.css("color")
				},
				fontSecondary : function () {
					return a.css("font-weight") + " " + a.css("font-size") + " " + a.css("font-family")
				},
				colorSecondary : function () {
					return a.css("color")
				}
			},
			axisGuide : {
				color : "rgba(0,0,0,0.2)",
				width : 1,
				colorSecondary : "rgba(0,0,0,0.075)",
				widthSecondary : 1
			}
		};
		gav.chartStyles.pres = {
			itemLabel : {
				font : function () {
					return f.css("font-weight") + " " + f.css("font-size") + " " + f.css("font-family")
				},
				color : function () {
					return f.css("color")
				}
			},
			axisLabel : {
				font : function () {
					return g.css("font-weight") +
					" " + g.css("font-size") + " " + g.css("font-family")
				},
				color : function () {
					return g.css("color")
				},
				fontSecondary : function () {
					return e.css("font-weight") + " " + e.css("font-size") + " " + e.css("font-family")
				},
				colorSecondary : function () {
					return e.css("color")
				}
			},
			axisGuide : {
				color : "rgba(0,0,0,0.3)",
				width : 1,
				colorSecondary : "rgba(0,0,0,0.15)",
				widthSecondary : 1
			}
		};
		gav.getStyleFor = function (a, b, c) {
			c = !0 === c ? gav.chartStyles.pres : gav.chartStyles;
			return "function" == typeof c[a][b] ? c[a][b]() : c[a][b]
		};
		gav.getMousePosition = function (a) {
			if (a.originalEvent.touches &&
				a.originalEvent.touches.length || a.originalEvent.changedTouches && a.originalEvent.changedTouches.length) {
				for (var a = a.originalEvent.touches && a.originalEvent.touches.length ? a.originalEvent.touches : a.originalEvent.changedTouches, b = a[0], c = {
						x : b.pageX,
						y : b.pageY,
						touches : a.length
					}, f = [{
							x : b.pageX,
							y : b.pageY
						}
					], e = 1; e < a.length; e++)
					b = a[e], f.push({
						x : b.pageX,
						y : b.pageY
					});
				c.positions = f;
				return c
			}
			return c = {
				x : a.pageX,
				y : a.pageY,
				touches : 1
			}
		};
		gav.presentation = {
			normal : 12,
			large : 24
		};
		gav.interaction = {
			select : 1
		};
		gav.createElement =
		function (a, b) {
			var c = document.createElement(a);
			if (!b)
				return c;
			b.css && d(c).css(b.css);
			if (b.children)
				for (var f = 0; f < b.children.length; f++)
					c.appendChild(b.children[f]);
			b.html && (c.innerHTML = b.hmtl);
			return c
		};
		gav.log = function () {
			gav.__LOG && console && "function" == typeof console.log && console.log.apply(console, arguments)
		};
		gav.max = function () {
			return Math.max.apply(Math, this)
		};
		gav.min = function () {
			return Math.min.apply(Math, this)
		};
		gav.initCanvas = function (a) {
			var a = d(a),
			b = document.createElement("canvas"),
			c = document.createElement("canvas");
			d(b).attr("class", "canvas");
			b.width = c.width = a.width();
			b.height = c.height = a.height();
			a.append(b);
			return {
				canvas1 : b,
				canvas2 : c
			}
		};
		gav.lerpColor = function (a, b, c) {
			var f = (a & 16711680) >> 16,
			e = (a & 65280) >> 8,
			a = a & 255,
			g = (b & 65280) >> 8,
			d = b & 255,
			b = Math.round((((b & 16711680) >> 16) - f) * c + f),
			e = Math.round((g - e) * c + e),
			c = Math.round((d - a) * c + a);
			return "rgb(" + b + "," + e + "," + c + ")"
		};
		gav.isInteger = function (a) {
			return 0 > Math.abs(a - Math.round(a)) - 1.0E-6
		};
		gav.addDOM = function (a, b, c, f) {
			return d(a).after(b).next().css({
				position : "absolute",
				top : c,
				left : f
			})
		};
		gav._buildSelectTag = function (a, b) {
			return "<select>" + gav.getOptions(a, b) + "</select>"
		};
		gav.getOptions = function (a, b) {
			for (var c = "", f = 0; f < a.length; f++)
				c += '<option value="' + a[f] + '">' + b[f] + "</option>";
			return c
		};
		gav.addButton = function (a, b, c, f) {
			a = gav.addDOM(a, "<button>" + f + "</button>", b, c);
			d(a).button().css("padding", 0);
			return a
		};
		gav.addLabel = function (a, b, c, f) {
			return gav.addDOM(a, "<label>" + f + "</label>", b, c)
		};
		gav.lerp = function (a, b, c) {
			return a + c * (b - a)
		};
		gav.clamp = function (a, b, c) {
			a < b && (a = b);
			a > c && (a = c);
			return a
		};
		gav.constants = {};
		gav.constants.RenderingMode = {
			STROKE : 0,
			FILL : 1,
			STROKE_AND_FILL : 2
		};
		gav.constants.ColoringMode = {
			COLOR_MAP : 0,
			LINE_STYLE : 1,
			DEFAULT_COLOR : 2
		};
		gav.constants.ItemType = {
			SELECTED_ITEMS : 0,
			ALL_ITEMS : 1
		};
		gav.constants.ValueScaleMethod = {
			MIN_BASE : 0,
			MIN_ZERO_BASE : 1,
			ZERO_BASE : 2
		};
		gav.constants.LoadStatus = {
			NOT_LOADED : -1,
			LOADING : 0,
			LOADED : 1
		}
	}
})(jQuery);
(function () {
	gav.helpers = {};
	["String", "Array", "Boolean", "RegExp", "Date"].forEach(function (d) {
		gav.helpers["is" + d] = function (b) {
			return Object.prototype.toString.call(b) === "[object " + d + "]"
		}
	});
	gav.helpers.isNumber = function (d) {
		return "[object Number]" === Object.prototype.toString.call(d) && !isNaN(d)
	};
	gav.helpers.isNumeric = function (d) {
		return !isNaN(parseFloat(d)) && isFinite(d)
	};
	gav.helpers.isInt = function (d) {
		return gav.helpers.isNumber(d) && d === (d | 0)
	};
	gav.helpers.isHandheld = function () {
		for (var d = ["iPhone", "iPad",
				"iPod", "Android", "Windows Phone"], b = window.navigator.userAgent, a = 0; a < d.length; a += 1)
			if (b.match(d[a]))
				return !0;
		return !1
	}
	()
})();
(function () {
	for (var d = 0, b = ["ms", "moz", "webkit", "o"], a = 0; a < b.length && !window.requestAnimationFrame; ++a)
		window.requestAnimationFrame = window[b[a] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[b[a] + "CancelAnimationFrame"] || window[b[a] + "CancelRequestAnimationFrame"];
	if (!window.requestAnimationFrame || gav.helpers.isHandheld)
		window.requestAnimationFrame = function (a) {
			var b = (new Date).getTime(),
			e = Math.max(0, 16 - (b - d)),
			g = window.setTimeout(function () {
					a(b + e)
				}, e);
			d = b + e;
			return g
		};
	window.cancelAnimationFrame ||
	(window.cancelAnimationFrame = function (a) {
		clearTimeout(a)
	})
})();
(function () {
	function d(a, b) {
		a.__implementsInterfaces || (a.__implementsInterfaces = []);
		0 > a.__implementsInterfaces.indexOf(b) && a.__implementsInterfaces.push(b)
	}
	function b(a, b) {
		return !a.__implementsInterfaces ? !1 : 0 <= a.__implementsInterfaces.indexOf(b) ? !0 : !1
	}
	var a = !1;
	gav.Klass = function (c, f) {
		!f && "string" != typeof c && (f = c, c = null);
		for (var e = "Anonym", g = window, j = c ? c.split(".") : [], k = 0; k < j.length; k++)
			g[j[k]] || (g[j[k]] = {}), k < j.length - 1 && (g = g[j[k]]), e = j[k];
		var m;
		f.extend ? ("function" == typeof f.extend ? (a = !0, j = new f.extend,
				a = !1) : j = f.extend, m = f.extend, delete f.extend) : j = {};
		var o = e;
		f.className && f.className.length && (o = f.className, delete f.className);
		var n = f.implement;
		delete f.implement;
		var p = [];
		for (c in f)
			 / ^[_A - Z] + $ / .test(c), /^@/.test(c) ? p.push({
				name : c.substr(1),
				option : f[c]
			}) : j[c] = f[c];
		j.getClassName = function () {
			return o
		};
		for (var r = function () {
			a || ("function" == typeof this.init && this.init.apply(this, arguments), this.__initialized = !0, this.hasEventListener && this.hasEventListener("initComplete") && (this.dispatchEvent("initComplete"),
					this.removeEventListener("initComplete")));
			this.displayName = o
		}, k = 0; k < p.length; k++)
			r[p[k].name] = p[k].option;
		delete p;
		r.prototype = j;
		r.prototype.constructor = r;
		j && !j.destroy && (j.destroy = function () {});
		n && "function" != typeof n.splice && (n = [n]);
		if (n && n.length) {
			for (k = 0; k < n.length; k++) {
				p = n[k];
				d(r, p);
				for (var v in p)
					"toString" !== v && !j[v] && (j[v] = p[v])
			}
			delete n
		}
		r.prototype.implementsInterface = function (a) {
			return b(r, a)
		};
		r.prototype.isIFace = function (a) {
			return !a ? !1 : b(r, a) ? !0 : m ? b(m, a) : !1
		};
		r.prototype.self = r;
		return g[e] =
			r
	};
	gav.IFace = function (a, b) {
		for (var e, g = a.split("."), d = window, k = 0; k < g.length; k++)
			d[g[k]] || (d[g[k]] = {}), k < g.length - 1 && (d = d[g[k]]), e = g[k];
		delete b.implement;
		b.hasOwnProperty("toString") || (b.toString = function () {
			return e
		});
		d[e] = b;
		return d[e]
	}
})();
gav.snapshot.ISnapshotReader = gav.IFace("gav.snapshot.ISnapshotReader", {
		read : function () {},
		getPhase : function () {
			return gav.snapshot.SnapshotManager.phase.DEFAULT
		}
	});
gav.snapshot.ISnapshotReadableComponent = gav.IFace("gav.snapshot.ISnapshotReadableComponent", {
		getSnapshotSite : function () {},
		getSnapshotReaders : function () {}

	});
gav.snapshot.IStorable = gav.IFace("gav.snapshot.IStorable", {
		state : function () {},
		getSnapshotType : function () {
			return gav.snapshot.SnapshotManager.type.MISC
		},
		getId : function () {
			return this._id
		},
		getPhase : function () {
			return gav.snapshot.SnapshotManager.phase.DEFAULT
		}
	});
gav.snapshot.IStorablesContainer = gav.IFace("gav.snapshot.IStorablesContainer", {
		getStorables : function () {}

	});
gav.snapshot.IPhaseBlocker = gav.IFace("gav.snapshot.IPhaseBlocker", {});
gav.representation.IColorMap = gav.IFace("gav.representation.IColorMap", {
		getColor : function () {}

	});
gav.IFace("gav.representation.IVisibilityListConsumer", {
	setVisibilityList : function () {}

});
(function () {
	gav.IFace("gav.representation.IPickable", {})
})();
(function () {
	gav.IFace("gav.representation.ISelectionListConsumer", {
		setSelectionList : function () {}

	})
})();
gav.IFace("gav.filtering.IFilter", {
	isFiltered : function () {},
	getNumItems : function () {}

});
(function () {
	gav.IFace("gav.data.IBoundingBox", {
		getBoundingBox : function () {}

	})
})();
(function () {
	gav.Klass("gav.events.EventDispatcher", {
		init : function () {
			this._listeners = {}

		},
		addEventListener : function (d, b, a) {
			"function" == typeof b && (this._listeners[d] || (this._listeners[d] = []), this._listeners[d].push({
					callback : b,
					scope : a
				}))
		},
		removeEventListener : function (d, b, a) {
			if (d = this._listeners[d])
				for (var c = d.length - 1; 0 <= c; c -= 1)
					b ? (a && a === d[c].scope && d[c].callback === b || !a && d[c].callback === b) && d.splice(c, 1) : d.splice(c, 1)
		},
		dispatchEvent : function (d, b) {
			var a = d;
			"string" !== typeof a && (a = d.getType());
			if (a = this._listeners[a])
				for (var c =
						a.length - 1; 0 <= c; --c)
					"string" === typeof d ? a[c].callback.apply(a[c].scope ? a[c].scope : this, b || []) : a[c].callback.apply(a[c].scope ? a[c].scope : this, [d])
		},
		hasEventListener : function (d) {
			"string" !== typeof d && d.getType();
			return this._listeners && this._listeners[d] && this._listeners[d].length
		}
	})
})();
gav.Klass("gav.events.GavEvent", {
	init : function (d) {
		this._type = d
	},
	getType : function () {
		return this._type
	}
});
gav.Klass("gav.events.PropertyChangeEvent", {
	extend : gav.events.GavEvent,
	init : function (d, b, a) {
		gav.events.GavEvent.prototype.init.call(this, "propertyChange");
		this.property = d;
		this.oldValue = b;
		this.newValue = a
	}
});
gav.Klass("gav.events.PickedEvent", {
	extend : gav.events.GavEvent,
	init : function (d, b) {
		gav.events.GavEvent.prototype.init.call(this, gav.events.PickedEvent.PICKED);
		var a = 1 < arguments.length ? b : 1;
		this._indices = d;
		this._state = a
	},
	getIndices : function () {
		return this._indices
	},
	getState : function () {
		return this._state
	},
	"@PICKED" : "picked",
	"@ADD" : 0,
	"@REPLACE" : 1,
	"@INVERT" : 2
});
gav.Klass("gav.events.BrushEvent", {
	extend : gav.events.GavEvent,
	init : function (d) {
		gav.events.GavEvent.prototype.init.call(this, d)
	}
});
gav.Klass("gav.events.SelectionEvent", {
	extend : gav.events.GavEvent,
	init : function () {
		gav.events.GavEvent.prototype.init.call(this, "selectionChanged")
	},
	setSelectedRecords : function (d) {
		this._selectedRecords = d
	},
	getSelectedRecords : function () {
		return this._selectedRecords
	},
	setChangedRecords : function (d) {
		this._changedRecords = d
	},
	getChangedRecords : function () {
		return this._changedRecords
	},
	setChangedStatus : function (d) {
		this._changedStatus = d
	},
	getChangedStatus : function () {
		return this._changedStatus
	},
	"@createSelectionChanged" : function (d,
		b, a) {
		var c = new gav.events.SelectionEvent;
		c.setSelectedRecords(d);
		c.setChangedRecords(b);
		c.setChangedStatus(a);
		return c
	},
	"@SELECTION_CHANGED" : "selectionChanged"
});
gav.Klass("gav.events.FilterEvent", {
	extend : gav.events.GavEvent,
	init : function (d) {
		gav.events.GavEvent.prototype.init.call(this, d)
	},
	getItems : function () {
		return this._items
	},
	getFiltered : function () {
		return this._filtered
	},
	getSender : function () {
		return this._sender
	},
	getOldNumItems : function () {
		return this._oldNumItems
	},
	getNewNumItems : function () {
		return this._newNumItems
	},
	"@createFilterChanged" : function (d, b, a) {
		var c = new gav.events.FilterEvent(gav.events.FilterEvent.FILTER_CHANGED);
		c._items = d;
		c._filtered = b;
		c._sender =
			a;
		return c
	},
	"@createNumItemsChanged" : function (d, b, a) {
		var c = new gav.events.FilterEvent(gav.events.FilterEvent.NUM_ITEMS_CHANGED);
		c._oldNumItems = b;
		c._newNumItems = d;
		c._sender = a;
		return c
	},
	"@FILTER_CHANGED" : "filterChanged",
	"@NUM_ITEMS_CHANGED" : "numItemsChanged"
});
gav.Klass("gav.events.VisibilityEvent", {
	extend : gav.events.GavEvent,
	init : function () {
		gav.events.GavEvent.prototype.init.call(this, gav.events.VisibilityEvent.VISIBILITY_CHANGED)
	},
	getItems : function () {
		return this._items
	},
	getVisible : function () {
		return this._visible
	},
	getSender : function () {
		return this._sender
	},
	"@createVisibilityChanged" : function (d, b, a) {
		var c = new gav.events.VisibilityEvent;
		c._items = d;
		c._visible = b;
		c._sender = a;
		return c
	},
	"@VISIBILITY_CHANGED" : "visibilityChanged"
});
(function () {
	function d() {
		if (!this.__invalidated) {
			var a = this;
			this.__invalidated = !0;
			requestAnimationFrame(function () {
				b.call(a)
			})
		}
	}
	function b() {
		this.__invalidated && (this.__invalidated = !1, this._update())
	}
	gav.Klass("gav.Invalidatable", {
		extend : gav.events.EventDispatcher,
		init : function () {
			gav.events.EventDispatcher.prototype.init.call(this)
		},
		invalidate : function () {
			d.call(this)
		},
		validateNow : function () {
			this.__invalidated = !0;
			this.updateNow()
		},
		updateNow : function () {
			b.call(this)
		},
		_update : function () {}

	})
})();
(function (d, b) {
	gav.Klass("gav.Context", {
		extend : gav.events.EventDispatcher,
		implement : [gav.snapshot.ISnapshotReadableComponent, gav.snapshot.IStorable, gav.snapshot.IStorablesContainer],
		init : function () {
			gav.events.EventDispatcher.prototype.init.call(this);
			this._dataSet = null;
			this._slice = 0;
			this._colorMap = new gav.representation.ConstantColorMap("#ff0000");
			this._selectionManager = new gav.representation.SelectionManager;
			this._visibilityManager = new gav.representation.VisibilityManager;
			this._formatter = new gav.representation.NumericStringProvider;
			this._visibleAttributes = [0, 1, 2];
			gav.utils.Binding._makeObservable(this, "dataSet");
			gav.utils.Binding._makeObservable(this, "slice");
			gav.utils.Binding._makeObservable(this, "selectionManager");
			gav.utils.Binding._makeObservable(this, "visibleAttributes");
			gav.utils.Binding._makeObservable(this, "visibilityManager");
			gav.utils.Binding._makeObservable(this, "animationController");
			gav.utils.Binding._makeObservable(this, "colorMap");
			gav.utils.Binding._makeObservable(this, "colorAttribute");
			gav.utils.Binding._makeObservable(this,
				"formatter");
			gav.utils.Binding._makeObservable(this, "lineStyleProvider")
		},
		getSnapshotSite : function () {
			var a = this;
			return {
				components : {},
				pickedLists : [this._selectionManager],
				colorMaps : [this._colorMap],
				visibilityManager : this._visibilityManager,
				data : {
					dataProvider : this
				},
				application : {
					settings : {
						animationProgress : {
							read : function (b) {
								a._animationController && (b = isNaN(parseFloat(b)) ? 0 : parseFloat(b), a._animationController.setProgress(b), a._animationController.dispatchEvent("sliceExplicitlyChanged"))
							},
							write : function () {
								return a._animationController ?
								a._animationController.getProgress() : ""
							}
						},
						animationDuration : {
							read : function (b) {
								a._animationController && (b = isNaN(parseInt(b)) ? 1E4 : parseInt(b), a._animationController.setDuration(b))
							},
							write : function () {
								return a._animationController ? a._animationController.getDuration() : ""
							}
						}
					}
				}
			}
		},
		getSnapshotReaders : function () {
			var a = [];
			this._selectionManager && a.push(new gav.snapshot.PickedListReader("0", this._selectionManager));
			this._colorMap && a.push(new gav.snapshot.ColorMapReader);
			this._visibilityManager && a.push(new gav.snapshot.RangeFilterReader);
			a.push(new gav.snapshot.DataSetReader(this));
			a.push(new gav.snapshot.ApplicationReader);
			this._lineStyleProvider && a.push(this._lineStyleProvider);
			return a
		},
		getSnapshotWriters : function () {
			var a = [];
			a.push(new gav.snapshot.ApplicationWriter);
			return a
		},
		state : function () {
			var a = this;
			return {
				settings : {
					setting : {
						get : function () {
							var b = [{
									"@name" : "visibleAttributes",
									"@value" : "1,2,4,8"
								}
							];
							a._animationController && b.push({
								"@name" : "animationProgress",
								"@value" : a._animationController.getProgress()
							});
							a._animationController &&
							b.push({
								"@name" : "animationDuration",
								"@value" : a._animationController.getDuration()
							});
							return b
						},
						set : function (b) {
							for (var f, e = 0; e < b.length; e++)
								switch (f = b[e], f["@name"]) {
								case "animationProgress":
									a._animationController && a._animationController.setProgress(parseFloat(f["@value"]));
									a._animationController && a._animationController.dispatchEvent("sliceExplicitlyChanged");
									break;
								case "animationDuration":
									a._animationController && a._animationController.setDuration(parseInt(f["@value"]))
								}
						}
					}
				}
			}
		},
		getSnapshotType : function () {
			return gav.snapshot.SnapshotManager.type.CONTEXT
		},
		getStorables : function () {
			var a = [];
			this._selectionManager && a.push(this._selectionManager);
			this._visibilityManager && (a = a.concat(this._visibilityManager.getStorables()));
			a.push(new gav.snapshot.DataSetStorable(this));
			this._lineStyleProvider && a.push(this._lineStyleProvider);
			return a
		},
		getName : function () {
			return "context"
		},
		setDataSet : function (a) {
			var b = this._dataSet;
			this._dataSet = a;
			a !== b && (this._slice >= (this._dataSet ? this._dataSet.getDataCube() ? this._dataSet.getDataCube().getNumSlices() : 0 : 0) && this.setSlice(0),
				this._visibilityManager.setDataSet(a), this._formatter && this._formatter.setDataSet(a), this._selectionManager && this._selectionManager.setSelected([]))
		},
		getDataSet : function () {
			return this._dataSet
		},
		setSlice : function (a) {
			if (this._slice !== a) {
				var b = this._slice;
				if (!this._dataSet || !this._dataSet.getDataCube() || a >= this._dataSet.getDataCube().getNumSlices())
					a = 0;
				this._slice = a;
				a !== b && this._visibilityManager && this._visibilityManager.setSlice(this._slice)
			}
		},
		getSlice : function () {
			return this._slice
		},
		setVisibleAttributes : function (a) {
			this._visibleAttributes =
				a
		},
		getVisibleAttributes : function () {
			return this._visibleAttributes
		},
		setSelectionManager : function (a) {
			this._selectionManager = a
		},
		getSelectionManager : function () {
			return this._selectionManager
		},
		setVisibilityManager : function (a) {
			this._visibilityManager !== a && (this._visibilityManager = a) && this._visibilityManager.setSlice(this._slice)
		},
		getVisibilityManager : function () {
			return this._visibilityManager
		},
		setAnimationController : function (a) {
			this._animationController !== a && (this._animationController && this._animationController.removeEventListener("progressChanged",
					this._onProgressChanged), (this._animationController = a) && this._animationController.addEventListener("progressChanged", this._onProgressChanged, this))
		},
		getAnimationController : function () {
			return this._animationController
		},
		setColorMap : function (a) {
			if (this._colorMap !== a && (this._colorMap && this._colorMap instanceof gav.representation.ColorMap && this._colorMap.removeEventListener("propertyChange", this._onColorChange), (this._colorMap = a) && this._colorMap instanceof gav.representation.ColorMap))
				this._colorMap.addEventListener("propertyChange",
					this._onColorChange, this), this.setColorAttribute(this._colorMap.getAttribute())
		},
		getColorMap : function () {
			return this._colorMap
		},
		setCategoricalColorMap : function (a) {
			this._categoricalColorMap = a
		},
		getCategoricalColorMap : function () {
			return this._categoricalColorMap
		},
		setColorAttribute : function (a) {
			this._colorAttribute !== a && (this._colorAttribute = a, this._colorMap && this._colorMap instanceof gav.representation.ColorMap && this._colorMap.setAttribute(this._colorAttribute))
		},
		getColorAttribute : function () {
			return this._colorAttribute
		},
		setFormatter : function (a) {
			this._formatter = a
		},
		getFormatter : function () {
			return this._formatter
		},
		setLineStyleProvider : function (a) {
			this._lineStyleProvider = a
		},
		getLineStyleProvider : function () {
			this._lineStyleProvider || (this._lineStyleProvider = new gav.representation.LineStyleProvider(b, "defaultLineStyleProvider"));
			return this._lineStyleProvider
		},
		setColorMapProvider : function (a) {
			this._colorMapProvider = a
		},
		getColorMapProvider : function () {
			return this._colorMapProvider
		},
		_onProgressChanged : function () {
			if (this._dataSet) {
				var a =
					this._dataSet && this._dataSet.getDataCube() ? this._dataSet.getDataCube().getNumSlices() : 0;
				this.setSlice(Math.floor(this._animationController.getProgress() * (a - 1)))
			}
		},
		_onColorChange : function (a) {
			switch (a.property) {
			case "attribute":
				this.setColorAttribute(a.newValue)
			}
		}
	});
	gav.Klass("gav.AxisContext", {
		extend : gav.events.EventDispatcher,
		init : function (a, b, f) {
			gav.events.EventDispatcher.prototype.init.call(this);
			this._x = a || 0;
			this._y = b || 0;
			this._size = f || 0
		},
		setX : function (a) {
			this._x = a
		},
		getX : function () {
			return this._x
		},
		setY : function (a) {
			this._y = a
		},
		getY : function () {
			return this._y
		}
	})
})(window);
(function () {
	function d(a, b, f, e) {
		for (; 0 < e; ) {
			if (void 0 !== b[f[e - 1]])
				return a.indexOf(f[e - 1]);
			e--
		}
		return -1
	}
	function b(a, b, f, e) {
		for (var g = f ? f.length : 0; e < g - 1; ) {
			if (void 0 !== b[f[e + 1]])
				return a.indexOf(f[e + 1]);
			e++
		}
		return Number.MAX_VALUE
	}
	gav.utils || (gav.utils = {});
	gav.utils.ArrayHelper = {
		getRowLength : function (a) {
			for (var b = a ? a.length : 0, f = !0, e; 0 < b && f; )
				e = a[b - 1], void 0 === e || "" === e || " " === e ? b-- : f = !1;
			return b
		},
		mergeOrderedArrays : function (a) {
			var c = a ? a.length : 0;
			if (0 != c) {
				if (1 == c)
					return a[0];
				var f,
				e = a[0],
				g,
				j = Array(c),
				k,
				m;
				for (k = 1; k < c; k++) {
					f = {};
					g = (e = a[k]) ? e.length : 0;
					for (m = 0; m < g; m++)
						f[e[m]] = m;
					j[k] = f
				}
				var o = {},
				e = a[0];
				f = void 0 === e ? [] : e.concat();
				g = e ? e.length : 0;
				for (m = 0; m < g; m++)
					o[e[m]] = 1;
				var n,
				p,
				r;
				for (k = 1; k < c; k++) {
					g = (e = a[k]) ? e.length : 0;
					for (m = 0; m < g; m++)
						if (void 0 === o[e[m]]) {
							n = -1;
							p = Number.MAX_VALUE;
							for (var v = 1; v < c; v++)
								void 0 !== j[v][e[m]] && (r = j[v][e[m]], n = Math.max(n, d(f, o, a[v], r)), p = Math.min(p, b(f, o, a[v], r)));
							n = -1 === n ? Math.min(p, f.length) : Math.min(n + 1, f.length);
							f.splice(n, 0, e[m]);
							o[e[m]] = 1
						}
				}
				return f
			}
		},
		binaryGlobalSearchLowBoundByScaledValue : function (a,
			b, f, e) {
			if (!a || !a.length || !f || !f.getNumRecords())
				return -1;
			for (var g = 0, d = a.length - 1, k, m, o = f.getNumRecords(), n; d > g + 1; )
				k = Math.floor((g + d) / 2), n = a[k], m = Math.floor(n / o), n %= o, m = f.getScaledValue(n, e, m), m < b ? g = k : d = k;
			n = a[g];
			m = Math.floor(n / o);
			m = f.getScaledValue(n % o, e, m);
			if (m >= b)
				return g;
			n = a[d];
			m = Math.floor(n / o);
			m = f.getScaledValue(n % o, e, m);
			return m >= b ? d : a.length
		},
		binaryGlobalSearchHighBoundByScaledValue : function (a, b, f, e) {
			if (!a || !a.length || !f || !f.getNumRecords())
				return -1;
			for (var g = 0, d = a.length - 1, k, m, o = f.getNumRecords(),
				n; d > g + 1; )
				k = Math.floor((g + d) / 2), n = a[k], m = Math.floor(n / o), n %= o, m = f.getScaledValue(n, e, m), m <= b ? g = k : d = k;
			n = a[d];
			m = Math.floor(n / o);
			m = f.getScaledValue(n % o, e, m);
			if (m <= b)
				return d + 1;
			n = a[g];
			m = Math.floor(n / o);
			m = f.getScaledValue(n % o, e, m);
			return m <= b ? g + 1 : 0
		},
		getNumRowsOfSheet : function (a) {
			for (var b = a ? a.length : 0, f = 0; f < b && !this.isRowEmpty(a[f]); )
				f++;
			return f
		},
		isRowEmpty : function (a) {
			for (var b = a ? a.length : 0, f = !0, e; 0 < b && f; )
				void 0 === a[b - 1] ? b-- : (e = a[b - 1], void 0 === e || "" === e || " " === e ? b-- : f = !1);
			return 0 === b ? !0 : !1
		},
		createArray3D : function (a,
			b, f) {
			for (var e = Array(a), g = 0; g < a; g++)
				e[g] = this.createArray2D(b, f);
			return e
		},
		createArray3DWithValue : function (a, b, f, e) {
			for (var g = Array(a), d = 0; d < a; d++)
				g[d] = this.createArray2DWithValue(b, f, e);
			return g
		},
		createArray2D : function (a, b) {
			for (var f = Array(a), e = 0; e < a; e++)
				f[e] = Array(b);
			return f
		},
		createArray2DWithValue : function (a, b, f) {
			for (var e = Array(a), g = 0; g < a; g++)
				e[g] = gav.utils.ArrayHelper.createArrayWithValue(b, f);
			return e
		},
		initArray2D : function (a, b) {
			for (var f = Array(a), e = 0; e < a; e++) {
				f[e] = Array(b);
				for (var g = 0; g < b; g++)
					f[e][g] =
						[]
			}
			return f
		},
		createArrayWithValue : function (a, b) {
			for (var f = Array(a), e = 0; e < a; e++)
				f[e] = b;
			return f
		},
		range : function (a, b) {
			if (a >= b)
				return [];
			for (var f = Array(b - a), e = a; e < b; e++)
				f[e - a] = e;
			return f
		},
		getBinItemLists : function (a, b) {
			for (var f = Array(b), e = a / b, g = 0; g < b; g++)
				f[g] = gav.utils.ArrayHelper.range(Math.ceil(g * e), Math.floor((g + 1) * e));
			return f
		},
		compareArrays : function (a, b) {
			var f = a ? a.length : 0;
			if (f != (b ? b.length : 0))
				return !1;
			if (0 == f)
				return !0;
			for (var e = 0; e < f; e++)
				if (a[e] !== b[e])
					return !1;
			return !0
		},
		sortArray : function (a) {
			a &&
			0 != a.length && (gav.utils.ArrayHelper.isNumberArray(a) ? a.sort(function (a, b) {
					return a - b
				}) : a.sort())
		},
		isNumberArray : function (a) {
			for (var b = a ? a.length : 0, f = 0; f < b; f += 1)
				if (!gav.helpers.isNumber(a[f]))
					return !1;
			return !0
		},
		getIntersectionOfNumericalArrays : function (a, b) {
			for (var f = a.slice().sort(function (a, b) {
						return a - b
					}), e = b.slice().sort(function (a, b) {
						return a - b
					}), g = []; 0 < f.length && 0 < e.length; )
				f[0] < e[0] ? f.shift() : (f[0] > e[0] || g.push(f.shift()), e.shift());
			return g
		},
		getDifferenceOfNumericalArrays : function (a, b) {
			var f =
				a.filter(function (a) {
					return !(-1 < b.indexOf(a))
				}),
			e = b.filter(function (b) {
					return !(-1 < a.indexOf(b))
				});
			return f.concat(e)
		}
	}
})();
(function () {
	gav.utils || (gav.utils = {});
	var d = gav.utils.StringHelper = {
		extractNameAndUnit : function (b) {
			var a = b.lastIndexOf("(");
			if (0 > a)
				return [b, ""];
			var c = b ? b.length : 0,
			f = b.substr(0, a).trim(),
			e = b.lastIndexOf(")");
			0 > e && (e = c);
			b = b.substring(a + 1, e).trim();
			return [f, b]
		},
		splitString : function (b, a) {
			b = b.trim();
			if (b.length <= a)
				return b;
			var c,
			f;
			f = b.lastIndexOf(" ", a);
			if (-1 != f) {
				c = b.length;
				if (c - f < a - 1) {
					c = Math.floor(c / 2);
					var e = b.indexOf(" ", c + 1);
					if (-1 != e)
						return c = b.substring(0, e).trim() + "\n", f = b.substring(e + 1).trim(), c +
						f
				}
				c = b.substring(0, f).trim() + "\n";
				f = b.substring(f + 1)
			} else
				c = b.substring(0, a) + "\n", f = b.substring(a);
			return c + d.splitString(f, a)
		},
		splitStringToArray : function (b, a) {
			return d.splitString(b, a).split("\n")
		}
	}
})();
(function () {
	gav.Klass("gav.utils.Percentiles", {
		"@calculateLimits" : function (b, a, c, f, e, g) {
			var j = b ? b.length : 0,
			k = Array(j),
			m;
			k[0] = 0;
			k[j - 1] = 1;
			if (g) {
				c || (c = d.sortIndicesGlobally(a, f));
				if (c.length < j)
					return b;
				e = a.getNumRecords();
				for (g = 1; g < j - 1; g++) {
					m = Math.round(c.length * b[g]);
					if (1 === b[g] || m === c.length)
						m -= 1;
					k[g] = Math.min(1, Math.max(0, a.getScaledValue(c[m] % e, f, Math.floor(c[m] / e))))
				}
			} else {
				c || (c = d.sortIndices(a, f, e));
				if (c.length < j)
					return b;
				for (g = 1; g < j - 1; g++)
					m = Math.round(c.length * b[g]), 1 === b[g] && (m -= 1), k[g] = Math.min(1,
							Math.max(0, a.getScaledValue(c[m], f, e)))
			}
			return k
		},
		"@calculateGlobalPercentilesOfScaledValue" : function (b, a, c, f, e) {
			if (!b || !b.length || !c)
				return [NaN, NaN];
			a = 0 == e ? gav.utils.ArrayHelper.binaryGlobalSearchLowBoundByScaledValue(b, a, c, f) : gav.utils.ArrayHelper.binaryGlobalSearchHighBoundByScaledValue(b, a, c, f);
			if (0 > a)
				return [NaN, NaN];
			e = c ? c.getNumRecords() : 0;
			if (0 == e)
				return [NaN, NaN];
			var g = b ? b.length : 0,
			d;
			if (a === g)
				return b = b[g - 1], d = Math.floor(b / e), [c.getValue(b % e, f, d), 1];
			b = b[a];
			d = Math.floor(b / e);
			return [c.getValue(b %
					e, f, d), a / g]
		}
	});
	var d = {
		sortIndices : function (b, a, c) {
			return b.getSortedIndices(a, c)
		},
		sortIndicesGlobally : function (b, a, c) {
			return b.getSortedIndicesGlobally(a, c)
		}
	}
})();
(function () {
	var d = Math.floor;
	gav.Klass("gav.utils.Color", {
		init : function () {
			var b = 0,
			a = 0,
			c = 0,
			f = 1,
			e;
			if (arguments[0]instanceof gav.utils.Color)
				b = arguments[0]._r, a = arguments[0]._g, c = arguments[0]._b, f = arguments[0]._a;
			else if (1 === arguments.length)
				if ("string" === typeof arguments[0]) {
					var g = arguments[0];
					if (e = /^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/i.exec(g))
						b = parseInt(e[1]), a = parseInt(e[2]), c = parseInt(e[3]);
					else if (e = /^rgba\((\d{1,3}),(\d{1,3}),(\d{1,3}),(\d(\.\d+)?)\)$/i.exec(g))
						b = parseInt(e[1]), a = parseInt(e[2]),
						c = parseInt(e[3]), f = parseFloat(e[4]);
					else if (e = /^#([A-f0-9]{2})([A-f0-9]{2})([A-f0-9]{2})$/i.exec(g))
						b = parseInt(e[1], 16), a = parseInt(e[2], 16), c = parseInt(e[3], 16), f = 1;
					else if (e = /^#([A-f0-9])([A-f0-9])([A-f0-9])$/i.exec(g))
						b = parseInt(e[1] + e[1], 16), a = parseInt(e[2] + e[2], 16), c = parseInt(e[3] + e[3], 16), f = 1;
					else if (e = /^hsl\(\s*(\d+(\.\d+)?)\s*,\s*(\d+(\.\d+)?%?)\s*,\s*(\d+(\.\d+)?%?)\s*\)$/i.exec(g)) {
						h = parseFloat(e[1]);
						s = parseFloat(e[3]);
						l = parseFloat(e[5]);
						h %= 360;
						s /= 100;
						l /= 100;
						h = 0 > h ? 0 : 360 < h ? 360 : h;
						s = 0 > s ? 0 : 1 <
							s ? 1 : s;
						l = 0 > l ? 0 : 1 < l ? 1 : l;
						b = 0.5 >= l ? 2 * l * s : (2 - 2 * l) * s;
						a = h / 60;
						f = b * (1 - Math.abs(a % 2 - 1));
						c = [];
						a = Math.floor(a);
						switch (a) {
						case 0:
							c = [b, f, 0];
							break;
						case 1:
							c = [f, b, 0];
							break;
						case 2:
							c = [0, b, f];
							break;
						case 3:
							c = [0, f, b];
							break;
						case 4:
							c = [f, 0, b];
							break;
						case 5:
							c = [b, 0, f];
							break;
						default:
							c = [0, 0, 0]
						}
						f = l - 0.5 * b;
						b = c[0] + f;
						a = c[1] + f;
						c = c[2] + f;
						b = Math.round(255 * b);
						a = Math.round(255 * a);
						c = Math.round(255 * c);
						f = 1
					}
				} else
					"number" == typeof arguments[0] && 0 <= arguments[0] && (b = (16711680 & arguments[0]) >> 16, a = (65280 & arguments[0]) >> 8, c = 255 & arguments[0]);
			else
				3 <=
				arguments.length && (b = arguments[0], a = arguments[1], c = arguments[2], f = 4 <= arguments.length ? arguments[3] : 1);
			this._r = Math.floor(b);
			this._g = Math.floor(a);
			this._b = Math.floor(c);
			this._a = f;
			this._spaces = {}

		},
		toRGB : function () {
			this._spaces.rgb || (this._spaces.rgb = gav.utils.Color.toRGB(this));
			return this._spaces.rgb
		},
		toHSL : function () {
			this._spaces.hsl || (this._spaces.hsl = gav.utils.Color.toHSL(this));
			return this._spaces.hsl
		},
		toString : function () {
			this._spaces.rgb || (this._spaces.rgb = gav.utils.Color.toRGB(this));
			return this._spaces.rgb
		},
		toHex : function () {
			this._spaces.hex || (this._spaces.hex = gav.utils.Color.toHex(this));
			return this._spaces.hex
		},
		toNumber : function () {
			this._spaces.num || (this._spaces.num = gav.utils.Color.toNumber(this));
			return this._spaces.num
		},
		isDark : function () {
			return 160 > this.getLuminance()
		},
		getLuminance : function () {
			"undefined" == typeof this._lumi && (this._lumi = Math.sqrt(0.241 * this._r * this._r + 0.691 * this._g * this._g + 0.068 * this._b * this._b));
			return this._lumi
		},
		isEqual : function (b) {
			b instanceof gav.utils.Color || (b = new gav.utils.Color(b));
			return this._r === b._r && this._g === b._g && this._b === b._b
		},
		blend : function (b, a) {
			var c = d(this._r + (b._r - this._r) * a),
			f = d(this._g + (b._g - this._g) * a),
			e = d(this._b + (b._b - this._b) * a);
			d(this._a + (b._a - this._a) * a);
			return "rgb(" + c + "," + f + "," + e + ")"
		},
		"@toHSL" : function (b) {
			"string" == typeof b && (b = gav.utils.Color.toNumber(b));
			if (!(b instanceof gav.utils.Color))
				return null;
			var a = b._r / 255,
			c = b._g / 255,
			b = b._b / 255,
			f = Math.min(Math.min(a, c), b),
			e = Math.max(Math.max(a, c), b),
			g = (f + e) / 2,
			d,
			k;
			d = 0.5 > g ? (e - f) / (e + f) : (e - f) / (2 - e - f);
			a == e ? k = (c - b) /
			(e - f) : c == e ? k = 2 + (b - a) / (e - f) : b == e && (k = 4 + (a - c) / (e - f));
			e == f && (k = d = 0);
			return "hsl(" + [(60 * k % 360 + 360) % 360, 100 * d, 100 * g].join() + ")"
		},
		"@toRGB" : function (b) {
			if (b instanceof gav.utils.Color)
				return "rgb(" + [b._r, b._g, b._b].join() + ")";
			"string" == typeof b && (b = gav.utils.Color.toNumber(b));
			return "rgb(" + ((b & 16711680) >> 16) + "," + ((b & 65280) >> 8) + "," + (b & 255) + ")"
		},
		"@toRGBA" : function (b, a) {
			if (b instanceof gav.utils.Color)
				return "rgb(" + [b._r, b._g, b._b].join() + ")";
			"string" == typeof b && (b = gav.utils.Color.toNumber(b));
			return "rgba(" + ((b &
					16711680) >> 16) + "," + ((b & 65280) >> 8) + "," + (b & 255) + "," + a + ")"
		},
		"@toHex" : function (b) {
			if (b instanceof gav.utils.Color) {
				var a = b._r.toString(16),
				c = b._g.toString(16),
				b = b._b.toString(16);
				1 === a.length && (a = "0" + a);
				1 === c.length && (c = "0" + c);
				1 === b.length && (b = "0" + b);
				return "#" + [a, c, b].join("")
			}
			"string" === typeof b && (b = gav.utils.Color.toNumber(b));
			a = ((b & 16711680) >> 16).toString(16);
			c = ((b & 65280) >> 8).toString(16);
			b = (b & 255).toString(16);
			1 == a.length && (a = "0" + a);
			1 == c.length && (c = "0" + c);
			1 == b.length && (b = "0" + b);
			return "#" + a + c + b
		},
		"@toNumber" : function () {
			if (1 ===
				arguments.length && arguments[0]instanceof gav.utils.Color)
				return (arguments[0]._r << 16) + (arguments[0]._g << 8) + arguments[0]._b;
			var b = 0,
			a = 0,
			c = 0,
			f;
			if (1 === arguments.length && "string" === typeof arguments[0]) {
				var e = arguments[0];
				if (f = /^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/i.exec(e))
					b = parseInt(f[1]), a = parseInt(f[2]), c = parseInt(f[3]);
				else if (f = /^#([A-f0-9]{2})([A-f0-9]{2})([A-f0-9]{2})$/i.exec(e))
					b = parseInt(f[1], 16), a = parseInt(f[2], 16), c = parseInt(f[3], 16);
				else if (f = /^#([A-f0-9])([A-f0-9])([A-f0-9])$/i.exec(e))
					b =
						parseInt(f[1] + f[1], 16), a = parseInt(f[2] + f[2], 16), c = parseInt(f[3] + f[3], 16)
			}
			return (b << 16) + (a << 8) + c
		},
		"@blend" : function (b, a, c) {
			var b = gav.utils.Color.toNumber(b),
			a = gav.utils.Color.toNumber(a),
			f = (b & 16711680) >> 16,
			e = (b & 65280) >> 8,
			b = b & 255,
			f = f + (((a & 16711680) >> 16) - f) * c,
			e = e + (((a & 65280) >> 8) - e) * c;
			return (f << 16) + (e << 8) + (b + ((a & 255) - b) * c)
		},
		"@getBlend" : function (b, a, c) {
			return new gav.utils.Color(b._r + (a._r - b._r) * c, b._g + (a._g - b._g) * c, b._b + (a._b - b._b) * c, b._a + (a._a - b._a) * c)
		}
	})
})();
(function (d) {
	function b() {
		var b,
		c,
		j;
		3 === arguments.length ? (j = new e(arguments[0]), b = arguments[1], c = arguments[2]) : (j = new e(arguments[0], arguments[1]), b = arguments[2], c = arguments[3]);
		c = c.split(".");
		for (var n = c[0], p, r = 0; r < c.length; r++)
			p = new f(b, n), j.add(p), !b || a(n), b = b && "function" == typeof b[a(n)] ? b[a(n)]() : d, n = c[r + 1];
		j.startObserving();
		return new g(j)
	}
	function a(a) {
		return "get" + a.substring(0, 1).toUpperCase() + a.substring(1)
	}
	function c(a, b, c) {
		var f = b.substring(0, 1).toUpperCase() + b.substring(1);
		if ("function" ==
			typeof a["set" + f])
			if (a[j] || (a[j] = {}), a[j][b] === d) {
				var e = a["set" + f],
				g = a.hasOwnProperty("set" + f);
				a["set" + f] = function (c) {
					var g = "function" == typeof a["get" + f] ? a["get" + f]() : d;
					"function" == typeof a["get" + f] && c === g ? e.call(a, c) : (e.call(a, c), a.dispatchEvent(new gav.events.PropertyChangeEvent(b, g, c)))
				};
				a[j][b] = {
					observers : 1,
					original : e,
					isOriginalOwn : g,
					keep : c || !1
				}
			} else
				a[j][b].observers++, c && (a[j][b].keep = !0)
	}
	gav.utils = gav.utils || {};
	gav.utils.Binding = {
		bindProperty : function (a, c, f, e) {
			return b(a, c, f, e)
		},
		bindSetter : function (a,
			c, f) {
			return b(a, c, f)
		}
	};
	var f = function (a, b) {
		gav.events.EventDispatcher.call(this);
		this._property = b;
		this._host = a
	};
	f.prototype = new gav.events.EventDispatcher;
	f.prototype.setHost = function (a) {
		this._host === a && this._hostObserved || (this.unobserve(), this._host = a, this.observe())
	};
	f.prototype.observe = function () {
		if (this._host) {
			c(this._host, this._property);
			var b = this,
			f = a(this._property);
			this._callback = function (a) {
				a.property === b._property && b.dispatchEvent("hostPropertyValueChanged", [a.newValue])
			};
			this._callbackSimple =
			function () {
				"function" == typeof this[f] && b.dispatchEvent("hostPropertyValueChanged", [this[f]()])
			};
			"function" == typeof this._host[f] && b.dispatchEvent("hostPropertyValueChanged", [this._host[f]()]);
			this._host.addEventListener("propertyChange", this._callback);
			this._host.addEventListener(this._property + "Changed", this._callbackSimple);
			this._hostObserved = !0
		} else
			this.dispatchEvent("hostPropertyValueChanged", [d])
	};
	f.prototype.unobserve = function () {
		if (this._host) {
			this._callback && this._host.removeEventListener("propertyChange",
				this._callback);
			this._callbackSimple && this._host.removeEventListener(this._property + "Changed", this._callbackSimple);
			if (this._host[j] && this._host[j][this._property]) {
				var a = this._host[j][this._property];
				a.observers--;
				if (0 >= a.observers && !0 !== a.keep) {
					var b = "set" + this._property.substring(0, 1).toUpperCase() + this._property.substring(1);
					a.isOriginalOwn ? this._host[b] = a.original : delete this._host[b];
					a.original = d;
					this._host[j][this._property] = d;
					delete this._host[j][this._property]
				}
			}
			this._callbackSimple = this._callback =
				this._host = d;
			this._hostObserved = !1
		}
	};
	var e = function (a, b) {
		this._links = [];
		1 === arguments.length && "function" == typeof a ? this._setter = a : (this._wannabe = a, this._wannabeProp = b)
	};
	e.prototype.add = function (a) {
		var b = this,
		c;
		a.addEventListener("hostPropertyValueChanged", function (a) {
			c = b._links.indexOf(this);
			if (c == b._links.length - 1)
				if (b._setter)
					b._setter(a);
				else {
					var f = "set" + b._wannabeProp.substring(0, 1).toUpperCase() + b._wannabeProp.substring(1);
					if ("function" == typeof b._wannabe[f])
						b._wannabe[f](a)
				}
			else
				b._links[c +
					1].setHost(a)
		});
		this._links.push(a)
	};
	e.prototype.startObserving = function () {
		this._links[0].observe()
	};
	e.prototype.isBroken = function () {
		return this._isBroken
	};
	e.prototype.unwatch = function () {
		for (var a; a = this._links.pop(); )
			a.unobserve(), a.removeEventListener("hostPropertyValueChanged");
		this._wannabeProp = this._wannabe = d
	};
	var g = function (a) {
		this._chain = a
	};
	g.prototype.unwatch = function () {
		this._chain.unwatch()
	};
	g.prototype.unbind = function () {
		this._chain.unwatch()
	};
	var j = "__setters";
	gav.utils.Binding._makeObservable =
	function (a, b) {
		c(a, b, !0)
	}
})();
(function () {
	gav.utils || (gav.utils = {});
	var d = gav.utils.GeometryMath = {
		computeCenterPointOfPolygons : function (b) {
			for (var a = 0, c = d.computeBoundingBoxArea(b[0]), f, e = b.length, g = 1; g < e; g++)
				f = d.computeBoundingBoxArea(b[g]), c < f && (a = g, c = f);
			return d.computePolygonCenterPoint(b[a])
		},
		computeCenterPointOfPolygons2 : function (b, a, c, f) {
			for (var e = 0, g = d.computeBoundingBoxArea(b[0]), j, k = b.length, m = 1; m < k; m++)
				j = d.computeBoundingBoxArea(b[m]), g < j && (e = m, g = j);
			f || (f = 50);
			return d.computePolygonCenterPoint2(b[e], a, c, f)
		},
		computeBoundingBoxArea : function (b) {
			b =
				d.computeBoundingBoxSize(b);
			return b.x * b.y
		},
		computeBoundingBoxSize : function (b) {
			if (!b || !b.getPoints())
				return new gav.geom.Point(0, 0);
			var b = b.getPoints(),
			a = b.length,
			c,
			f,
			e,
			g;
			c = b[0].x;
			f = b[0].y;
			e = b[0].x;
			g = b[0].y;
			for (var d = 1; d < a; d++)
				c = Math.max(c, b[d].x), f = Math.max(f, b[d].y), e = Math.min(e, b[d].x), g = Math.min(g, b[d].y);
			return new gav.geom.Point(c - e, f - g)
		},
		computePolygonCenterPoint : function (b) {
			if (!b)
				return null;
			b = b.getPoints();
			if (!b || 0 === b.length)
				return null;
			for (var a = b.length, c = 0, f = 0, e = 0; e < a; e++)
				c += b[e].x, f +=
				b[e].y;
			return new gav.geom.Point(c / a, f / a + 120)
		},
		computePolygonCenterPoint2 : function (b, a, c, f) {
			if (!b)
				return null;
			var e = b.getPoints();
			if (!e || 0 === e.length)
				return null;
			a ? c && !(c instanceof gav.components.map.UnitProjection) && (e = d.projectPoints(e, c)) : e = b.getPoints();
			for (var g = d.computeBoundingBoxOfPoints(e), b = g.left(), j = g.right(), a = g.top(), k = g.bottom(), m = Math.min(g.width(), g.height()) / f, f = Math.round(g.width() / m), o = Math.round(g.height() / m), j = (j - b) / f, k = (k - a) / o, n = Array(o + 1), g = Array(o + 1), m = Array(o + 1), p = e.length -
					1, r = 0, v = !0, t = o + 1, o = 0; o < t; o++)
				n[o] = [], g[o] = Array(f + 1), m[o] = Array(f + 1);
			d.deleteAllElements(g);
			d.deleteBoundaryElements(m, 0);
			for (o = 0; o < p; o++)
				d.computeIntersectionOfOneEdgeAndHorizontalLines(e[o].x, e[o].y, e[o + 1].x, e[o + 1].y, a, k, n);
			for (d.computeGridPointStatusMatrix(n, b, j, g); v; )
				if (r++, d.erode(g, m, r), v = !d.isZeroMatrix(m, r))
					e = g, g = m, m = e, d.deleteBoundaryElements(m, r - 1), d.deleteBoundaryElements(m, r);
			e = d.findBottomLeftGroup(g);
			e = d.findPointClosedToAveragePoint(e);
			b = new gav.geom.Point(e.x * j + b, e.y * k + a);
			c && !(c instanceof
				gav.components.map.UnitProjection) && (b = c.invBaseProject(b));
			return b
		},
		projectPoints : function (b, a) {
			if (!a || a instanceof gav.components.map.UnitProjection)
				return b;
			for (var c = b.length, f = Array(c), e = new gav.geom.Point, g = 0; g < c; g++)
				e.x = b[g].x, e.y = b[g].y, f[g] = a.baseProject(e);
			return f
		},
		computeBoundingBoxOfPoints : function (b) {
			var a;
			if (!b || 0 === b.length)
				return a;
			for (var c = -Number.MAX_VALUE, f = -Number.MAX_VALUE, e = Number.MAX_VALUE, g = Number.MAX_VALUE, d = b.length, k = 1; k < d; k++)
				c < b[k].x && (c = b[k].x), f < b[k].y && (f = b[k].y),
				e > b[k].x && (e = b[k].x), g > b[k].y && (g = b[k].y);
			c !== -Number.MAX_VALUE && (a = new gav.geom.Rectangle(e, g, c - e, f - g));
			return a
		},
		computeBoundingBoxOfPolygon : function (b) {
			var a;
			if (!b || 0 == b.length)
				return a;
			for (var c = -Number.MAX_VALUE, f = -Number.MAX_VALUE, e = Number.MAX_VALUE, g = Number.MAX_VALUE, d = b.length, k = 0; k < d; k += 1)
				c < b[k].x && (c = b[k].x), f < b[k].y && (f = b[k].y), e > b[k].x && (e = b[k].x), g > b[k].y && (g = b[k].y);
			c != -Number.MAX_VALUE && (a = new gav.geom.Rectangle(e, g, c - e, f - g));
			return a
		},
		computeBoundingBoxOfCurvePolygon : function (b) {
			var a;
			if (!b || 0 == b.length)
				return a;
			for (var c = -Number.MAX_VALUE, f = -Number.MAX_VALUE, e = Number.MAX_VALUE, g = Number.MAX_VALUE, d = b.length, k, m = 0; m < d; m += 1)
				c < b[m].x && (c = b[m].x), f < b[m].y && (f = b[m].y), e > b[m].x && (e = b[m].x), g > b[m].y && (g = b[m].y), k = b[m].control, void 0 != k && (c < k.x && (c = k.x), f < k.y && (f = k.y), e > k.x && (e = k.x), g > k.y && (g = k.y));
			c != -Number.MAX_VALUE && (a = new gav.geom.Rectangle(e, g, c - e, f - g));
			return a
		},
		deleteAllElements : function (b) {
			for (var a = b.length, c = b[0].length, f = 0; f < c; f++)
				for (var e = 0; e < a; e++)
					b[e][f] = 0
		},
		deleteBoundaryElements : function (b,
			a) {
			for (var c = b.length - a, f = b[0].length - a, e = b.length - a - 1, g = b[0].length - a - 1, d = a; d < f; d++)
				b[a][d] = 0, b[e][d] = 0;
			for (f = a; f < c; f++)
				b[f][a] = 0, b[f][g] = 0
		},
		computeIntersectionOfOneEdgeAndHorizontalLines : function (b, a, c, f, e, g, d) {
			var k = Math.max(a, f),
			m = Math.min(a, f);
			Math.max(b, c);
			Math.min(b, c);
			if (m !== k && (m = Math.ceil((m - e) / g), k = Math.floor((k - e) / g), m <= k)) {
				c -= b;
				for (f -= a; m <= k; m++)
					d[m].push(c * (m * g + e - a) / f + b)
			}
		},
		computeIntersectionXOfCurveAndHorizontalLine : function (b, a, c, f) {
			for (var e = b.x - 2 * a.x + c.x, g = 2 * (a.x - b.x), j = b.x, b = d.computeRootsOfQuadraticFunction(b.y -
						2 * a.y + c.y, 2 * (a.y - b.y), b.y - f), c = [], f = 0; f < b.length; f += 1)
				a = b[f], 0 <= a && 1 >= a && c.push(e * a * a + g * a + j);
			return c
		},
		computeRootsOfQuadraticFunction : function (b, a, c) {
			c = a * a - 4 * b * c;
			b *= 2;
			if (0 > c)
				return [];
			if (0 == c)
				a = c = -a / b;
			else
				var f = Math.sqrt(c), c = (-a - f) / b, a = (-a + f) / b;
			return [c, a]
		},
		computeGridPointStatusMatrix : function (b, a, c, f) {
			var e = b.length,
			g,
			d,
			k,
			m,
			o;
			for (d = 0; d < e; d++)
				if (b[d].sort(function (a, b) {
						return a - b
					}), g = Math.floor(b[d].length / 2), 0 < g)
					for (k = 0; k < g; k++) {
						m = Math.ceil((b[d][2 * k] - a) / c);
						for (o = Math.floor((b[d][2 * k + 1] - a) / c); m <=
							o; m++)
							f[d][m] = 1
					}
		},
		erode : function (b, a, c) {
			for (var f = b.length - c, e = b[0].length - c, g = c; g < f; g++)
				for (var d = c; d < e; d++)
					a[g][d] = 0 === b[g - 1][d - 1] || 0 === b[g - 1][d] || 0 === b[g - 1][d + 1] || 0 === b[g][d - 1] || 0 === b[g][d + 1] || 0 === b[g + 1][d - 1] || 0 === b[g + 1][d] || 0 === b[g + 1][d + 1] ? 0 : 1
		},
		isZeroMatrix : function (b, a) {
			for (var c = b.length - a, f = b[0].length - a, e = a; e < c; e++)
				for (var g = a; g < f; g++)
					if (1 === b[e][g])
						return !1;
			return !0
		},
		findBottomLeftGroup : function (b) {
			var a = d.findBottomLeftElement(b);
			if (!a || null === a)
				return null;
			for (var c = [], f = b[0].length; a; )
				c.push(a),
				d.findConnectedElementsInSameRow(b, a, c, f), a = d.findLeftConnectedElementInLowerRow(b, a, c[c.length - 1]);
			return c
		},
		findBottomLeftElement : function (b) {
			for (var a = b[0].length, c = b.length - 1; -1 < c; c--)
				for (var f = 0; f < a; f++)
					if (0 < b[c][f])
						return new gav.geom.Point(f, c);
			return null
		},
		findConnectedElementsInSameRow : function (b, a, c, f) {
			for (var e = a.x + 1, a = a.y; 0 < b[a][e] && e < f; )
				c.push(new gav.geom.Point(e, a)), e++
		},
		findLeftConnectedElementInLowerRow : function (b, a, c) {
			var c = c.x + 2,
			f = a.y - 1;
			if (0 > f)
				return null;
			for (a = a.x - 1; a < c; a++)
				if (0 <
					b[f][a])
					return new gav.geom.Point(a, f);
			return null
		},
		computeAveragePointOfGroup : function (b) {
			for (var a = b.length, c = 0, f = 0, e = 0; e < a; e++)
				c += b[e].x, f += b[e].y;
			return new gav.geom.Point(c / a, f / a)
		},
		findPointClosedToAveragePoint : function (b) {
			if (null === b)
				return new gav.geom.Point(0, 0);
			var a = b.length;
			if (1 === a)
				return b[0];
			for (var c = d.computeAveragePointOfGroup(b), f = b[0], e = gav.geom.Point.distance(c, b[0]), g, j = 1; j < a; j++)
				g = gav.geom.Point.distance(c, b[j]), e > g && (e = g, f = b[j]);
			return f
		},
		compareTwoPoints : function (b, a, c) {
			return !b &&
			!a || b && a && Math.abs(b.x - a.x) < c && Math.abs(b.y - a.y) < c ? !0 : !1
		},
		computeBoundingBoxOfQuadraticCurve : function (b, a, c) {
			var f = a.x - b.x,
			e = a.y - b.y,
			g = c.x - a.x - f,
			d = c.y - a.y - e;
			0 == g || 1 <= -f / g || 0 >= -f / g ? (f = Math.max(b.x, c.x), g = Math.min(b.x, c.x)) : (f = -f / g, g = 1 - f, g = g * g * b.x + 2 * f * g * a.x + f * f * c.x, f = Math.max(Math.max(b.x, c.x), g), g = Math.min(Math.min(b.x, c.x), g));
			0 == d || 1 <= -e / d || 0 >= -e / d ? (a = Math.max(b.y, c.y), b = Math.min(b.y, c.y)) : (e = -e / d, d = 1 - e, e = d * d * b.y + 2 * e * d * a.y + e * e * c.y, a = Math.max(Math.max(b.y, c.y), e), b = Math.min(Math.min(b.y, c.y), e));
			return new gav.geom.Rectangle(g, b, f - g, a - b)
		},
		findProjectedPointsOnQuadraticCurve : function (b, a, c, f) {
			var e = a.x - b.x,
			g = a.y - b.y,
			j = c.x - a.x - e,
			k = c.y - a.y - g,
			m = b.x - f.x,
			o = b.y - f.y,
			n = j * j + k * k,
			f = 3 * (e * j + g * k),
			j = 2 * (e * e + g * g) + (m * j + o * k),
			e = 2 * f * f * f - 9 * n * f * j + 27 * n * n * (m * e + o * g),
			g = f * f - 3 * n * j,
			g = e * e - 4 * g * g * g,
			p,
			r,
			v,
			t,
			u,
			q,
			n = 3 * n;
			0 < g ? (m = Math.sqrt(g), g = (e + m) / 2, e = (e - m) / 2, g = 0 <= g ? Math.pow(g, 1 / 3) : -Math.pow(-g, 1 / 3), e = 0 <= e ? Math.pow(e, 1 / 3) : -Math.pow(-e, 1 / 3), e =  - (f + g + e) / n, 0 <= e && 1 >= e && (p = 1 - e, t = p * p * b.x + 2 * e * p * a.x + e * e * c.x, p = p * p * b.y + 2 * e * p * a.y + e * e * c.y)) :
			0 == g ? (g = e / 2, g = 0 <= g ? Math.pow(g, 1 / 3) : -Math.pow(-g, 1 / 3), e =  - (f + g + g) / n, 0 <= e && 1 >= e && (p = 1 - e, t = p * p * b.x + 2 * e * p * a.x + e * e * c.x, p = p * p * b.y + 2 * e * p * a.y + e * e * c.y), g = (g - f) / n, 0 <= g && 1 >= g && (r = 1 - g, u = r * r * b.x + 2 * g * r * a.x + g * g * c.x, r = r * r * b.y + 2 * g * r * a.y + g * g * c.y)) : (m = Math.sqrt(-g), e = d.complexNumberToExponentialForm(e / 2, m / 2), m = d.exponentialFormToComplexNumber(Math.pow(e.magnitude, 1 / 3), e.phase / 3), e =  - (f + 2 * m.real) / n, j = Math.sqrt(3), g = (m.real - j * m.imaginary - f) / n, f = (m.real + j * m.imaginary - f) / n, 0 <= e && 1 >= e && (p = 1 - e, t = p * p * b.x + 2 * e * p * a.x + e * e * c.x, p =
						p * p * b.y + 2 * e * p * a.y + e * e * c.y), 0 <= g && 1 >= g && (r = 1 - g, u = r * r * b.x + 2 * g * r * a.x + g * g * c.x, r = r * r * b.y + 2 * g * r * a.y + g * g * c.y), 0 <= f && 1 >= f && (v = 1 - f, q = v * v * b.x + 2 * f * v * a.x + f * f * c.x, v = v * v * b.y + 2 * f * v * a.y + f * f * c.y));
			return [new gav.geom.Point(t, p), new gav.geom.Point(u, r), new gav.geom.Point(q, v)]
		},
		computeDistanceFromPointToQuadraticCurve : function (b, a, c, f) {
			if (b && a && c && f)
				return b = d.findProjectedPointsOnQuadraticCurve(b, a, c, f), a = Number.MAX_VALUE, void 0 !== b[0].x && (a = Math.min(a, f.distance(b[0]))), void 0 !== b[1].x && (a = Math.min(a, f.distance(b[1]))),
				void 0 !== b[2].x && (a = Math.min(a, f.distance(b[2]))), a
		},
		complexNumberToExponentialForm : function (b, a) {
			var c = Math.sqrt(b * b + a * a),
			f = Math.atan2(a, b);
			return {
				magnitude : c,
				phase : f
			}
		},
		exponentialFormToComplexNumber : function (b, a) {
			var c = b * Math.cos(a),
			f = b * Math.sin(a);
			return {
				real : c,
				imaginary : f
			}
		},
		checkPointInsidePolygon : function (b, a) {
			var c = !1;
			if (!a)
				return c;
			var f = d.computeBoundingBoxOfPolygon(a);
			if (!f)
				return c;
			var e = b.x,
			g = b.y;
			if (e > f.left() && e < f.right() && g > f.top() && g < f.bottom()) {
				var f = a.length,
				j,
				k;
				for (j = 0; j < f - 1; j += 1)
					if (k =
							j + 1, a[j].y == a[k].y && g == a[j].y)
						e > a[j].x && (c = !c), e > a[k].x && (c = !c);
					else if (a[j].y < g && g <= a[k].y || a[k].y < g && g <= a[j].y)
						a[j].x + (g - a[j].y) / (a[k].y - a[j].y) * (a[k].x - a[j].x) > e && (c = !c)
			}
			return c
		},
		checkPointInsideCurvePolygon : function (b, a) {
			var c = !1;
			if (!a)
				return c;
			var f = d.computeBoundingBoxOfCurvePolygon(a);
			if (!f)
				return c;
			var e = b.x,
			g = b.y,
			j,
			k,
			m;
			if (e > f.left() && e < f.right() && g > f.top() && g < f.bottom()) {
				var f = a.length,
				o;
				for (o = 0; o < f - 1; o += 1)
					if (m = o + 1, a[o].control) {
						j = a[o];
						k = a[o].control;
						m = a[m];
						j = d.computeIntersectionXOfCurveAndHorizontalLine(j,
								k, m, g);
						for (k = 0; k < j.length; k += 1)
							e < j[k] && (c = !c)
					} else if (a[o].y == a[m].y && g == a[o].y)
						e > a[o].x && (c = !c), e > a[m].x && (c = !c);
					else if (a[o].y < g && g <= a[m].y || a[m].y < g && g <= a[o].y)
						a[o].x + (g - a[o].y) / (a[m].y - a[o].y) * (a[m].x - a[o].x) > e && (c = !c)
			}
			return c
		},
		checkPointInsideGeomPolygon : function (b, a) {
			var c = !1;
			if (!a || !a.getPoints())
				return c;
			var f = a.getBounds(),
			e = a.getPoints(),
			g = b.x,
			d = b.y;
			if (g >= f.minX() && g <= f.maxX() && d >= f.minY() && d <= f.maxY())
				for (var k, f = e.length, m = 0; m < f - 1; m += 1)
					if (k = m + 1, e[m].y == e[k].y && d == e[m].y)
						g > e[m].x && (c =
								!c), g > e[k].x && (c = !c);
					else if (e[m].y < d && d <= e[k].y || e[k].y < d && d <= e[m].y)
						e[m].x + (d - e[m].y) / (e[k].y - e[m].y) * (e[k].x - e[m].x) > g && (c = !c);
			return c
		},
		checkPointInsidePolygonWithLineThickness : function (b, a, c) {
			return d.checkPointOnPolyline(b, a, c) ? !0 : d.checkPointInsidePolygon(b, a)
		},
		checkPointInsideGeomPolygonWithLineThickness : function (b, a, c) {
			return d.checkPointOnPolyline(b, a.getPoints(), c) ? !0 : d.checkPointInsideGeomPolygon(b, a)
		},
		checkPointOnGeomPolygonEdges : function (b, a, c) {
			if (!a || !a.getPoints())
				return !1;
			var a = a.getBounds(),
			f = b.x,
			b = b.y,
			c = c / 2;
			f < a.left() - c || f > a.right() + c || b < a.top() - c || a.bottom()
		},
		checkPointOnPolylines : function (b, a, c) {
			var f = a ? a.length : 0;
			if (0 == f)
				return !1;
			for (var e, g = 0; g < f; g += 1)
				if (e = d.checkPointOnPolyline(b, a[g], c))
					return !0;
			return !1
		},
		checkPointOnPolyline : function (b, a, c) {
			var f = a ? a.length : 0;
			if (0 == f)
				return !1;
			var e;
			if (1 == f)
				return e = d.distanceFromPointToPoint(b, a[0]), e <= c / 2 ? !0 : !1;
			for (var g = 0; g < f - 1; g += 1)
				if (e = d.distanceFromPointToLineSegment(b, a[g], a[g + 1]), e <= c / 2)
					return !0;
			return !1
		},
		distanceFromPointToLineSegment : function (b,
			a, c) {
			if (a.NaN && c.NaN)
				return NaN;
			if (a.NaN || c.NaN) {
				if (a.x == c.x && a.y == c.y)
					return NaN;
				var f,
				e;
				a.NaN ? (f = b.x - c.x, e = b.y - c.y) : (f = b.x - a.x, e = b.y - a.y);
				return Math.sqrt(f * f + e * e)
			}
			f = c.x - a.x;
			e = c.y - a.y;
			var g = a.x - b.x,
			a = a.y - b.y,
			d = f * f + e * e,
			k = Math.sqrt(d);
			if (0 == k)
				return Math.sqrt(g * g + a * a);
			var m = c.x - b.x,
			b = c.y - b.y,
			c =  - (g * f + a * e) / d;
			return 0 > c ? Math.sqrt(g * g + a * a) : 1 < c ? Math.sqrt(m * m + b * b) : Math.abs(f * a - g * e) / k
		},
		distanceFromPointToLineSegment2 : function (b, a, c, f, e, g) {
			var e = e - c,
			g = g - f,
			b = c - b,
			a = f - a,
			d = e * e + g * g,
			f = Math.sqrt(d);
			if (0 == f)
				return Math.sqrt(b *
					b + a * a);
			var c = p2.x - p0.x,
			k = p2.y - p0.y,
			d =  - (b * e + a * g) / d;
			return 0 > d ? Math.sqrt(b * b + a * a) : 1 < d ? Math.sqrt(c * c + k * k) : Math.abs(e * a - b * g) / f
		},
		distanceFromPointToPoint : function (b, a) {
			var c = a.x - b.x,
			f = a.y - b.y;
			return Math.sqrt(c * c + f * f)
		},
		distanceFromPointToPoint2 : function (b, a, c, f) {
			b = c - b;
			a = f - a;
			return Math.sqrt(b * b + a * a)
		},
		distanceFromPointToLine : function (b, a, c) {
			var f = c.x - a.x,
			c = c.y - a.y,
			e = a.x - b.x,
			b = a.y - b.y,
			a = Math.sqrt(f * f + c * c);
			return 0 == a ? Math.sqrt(e * e + b * b) : Math.abs(f * b - e * c) / a
		},
		projectPointOnLine : function (b, a, c) {
			var f = c.x - a.x,
			c = c.y - a.y,
			e = f * f + c * c;
			if (0 == Math.sqrt(e))
				return {
					x : a.x,
					y : a.y
				};
			b =  - ((a.x - b.x) * f + (a.y - b.y) * c) / e;
			return {
				x : a.x + b * f,
				y : a.y + b * c
			}
		},
		checkLineSegmentsIntersection : function (b, a, c, f) {
			var e = a.x - b.x,
			g = a.y - b.y,
			d = f.x - c.x,
			k = f.y - c.y,
			m = k * e - d * g;
			if (0 == m)
				return 0 == o && 0 == n ? Math.min(b.x, a.x) > Math.max(c.x, f.x) || Math.min(c.x, f.x) > Math.max(b.x, a.x) ? !1 : !0 : !1;
			var a = b.x - c.x,
			b = b.y - c.y,
			o,
			n,
			d = (d * b - k * a) / m,
			e = (e * b - g * a) / m;
			return 0 <= d && 1 >= d && 0 <= e && 1 >= e
		},
		computeLinesIntersection : function (b, a, c, f) {
			var e = a.x - b.x,
			g = a.y - b.y,
			d = f.y - c.y,
			k = f.x - c.x,
			m = d * e - k * g;
			if (0 != m)
				return b = a.x * b.y - b.x * a.y, c = f.x * c.y - c.x * f.y, {
					x : (k * b - e * c) / m,
					y : (d * b - g * c) / m
				}
		},
		checkGeomPolygonGeomPolygonOverlapping : function (b, a) {
			if (!b || !a || !b.getPoints() || !a.getPoints())
				return !1;
			var c = b.getBounds(),
			f = a.getBounds();
			if (!c.isRectangleOverlappingRectangle(f))
				return !1;
			var c = b.getPoints(),
			f = a.getPoints(),
			e = c.length,
			g = f.length,
			j,
			k;
			for (j = 0; j < e - 1; j += 1)
				for (k = 0; k < g - 1; k += 1)
					if (d.checkLineSegmentsIntersection(c[j], c[j + 1], f[k], f[k + 1]))
						return !0;
			for (j = 0; j < e - 1; j += 1)
				if (d.checkPointInsideGeomPolygon(c[j],
						a))
					return !0;
			for (k = 0; k < g - 1; k += 1)
				if (d.checkPointInsideGeomPolygon(f[k], b))
					return !0
		},
		checkRectangleOverlappingRectangle : function (b, a) {
			return b.minX() >= a.maxX() || a.minX() >= b.maxX() || b.minY() >= a.maxY() || a.minY() >= b.maxY() ? !1 : !0
		},
		checkRectangleInDistanceOfRectangle : function (b, a, c, f) {
			void 0 == c && (c = 0);
			void 0 == f && (f = 0);
			return b.minX() >= a.maxX() + c || a.minX() >= b.maxX() + c || b.minY() >= a.maxY() + f || a.minY() >= b.maxY() + f ? !1 : !0
		},
		checkLineOverlappingRectangle : function (b, a, c) {
			var f = c.minX(),
			e = c.maxX(),
			g = c.minY(),
			j = c.maxY(),
			c = {
				x : f,
				y : g
			},
			g = {
				x : e,
				y : g
			},
			e = {
				x : e,
				y : j
			},
			f = {
				x : f,
				y : j
			};
			return d.checkLineSegmentsIntersection(b, a, c, g) || d.checkLineSegmentsIntersection(b, a, g, e) || d.checkLineSegmentsIntersection(b, a, e, f) || d.checkLineSegmentsIntersection(b, a, f, c) ? !0 : !1
		},
		projectPoints : function (b, a) {
			var c = b ? b.length : 0;
			if (0 == c || !a)
				return b;
			for (var f = Array(c), e = 0; e < c; e += 1)
				f[e] = a.baseProject(b[e]);
			return f
		},
		projectPolygon : function (b, a) {
			if (!b || !a)
				return b;
			var c = new gav.geom.Polygon;
			c.setPoints(gav.utils.GeometryMath.projectPoints(b.getPoints(),
					a));
			return c
		},
		projectPolygons : function (b, a) {
			var c = b ? b.length : 0;
			if (0 == c || !a)
				return b;
			for (var f = Array(c), e = 0; e < c; e += 1)
				f[e] = gav.utils.GeometryMath.projectPolygon(b[e], a);
			return f
		},
		projectMapShape : function (b, a) {
			if (!b || !a)
				return b;
			var c = new gav.components.map.MapShape;
			c.id = b.id;
			c.setMap(b.getMap());
			c.setPolygons(gav.utils.GeometryMath.projectPolygons(b.getPolygons(), a));
			return c
		},
		projectMapShapes : function (b, a) {
			var c = b ? b.length : 0;
			if (0 == c || !a)
				return b;
			for (var f = Array(c), e = 0; e < c; e += 1)
				f[e] = gav.utils.GeometryMath.projectMapShape(b[e],
						a);
			return f
		}
	}
})();
(function () {
	function d(a, b) {
		if (5 < b)
			return {};
		for (var f = 0, e = 0, g = 0, j = {}, k = "h", m, o = [], n, p = 0; p < a.length; p++)
			if (m = a.charAt(p), "[" === m || "(" === m)
				f++, g || (k = "[" === m ? "h" : "v"), 1 === g && ("number" == typeof n ? o.push(a.substring(n, p)) : o.push(a.substring(1, p)), n = p), g++;
			else if ("]" === m || ")" === m)
				if (e++, g--, 1 === g && (o.push(a.substring(n, p + 1)), n = p + 1), 0 === g) {
					"number" == typeof n && o.push(a.substring(n, p));
					break
				}
		if (f !== e)
			return {};
		o.length || (o = "h" === k ? [a.replace(/^(\[\s*)/, "").replace(/(\s*\])$/, "")] : [a.replace(/^(\(\s*)/, "").replace(/(\s*\))$/,
						"")]);
		e = [];
		for (p = 0; p < o.length; p++)
			o[p] = o[p].replace(/(\s*(\,)*\s*)$/, "").replace(/^(\s*(\,)*\s*)/, ""), f = o[p], f.length && (e = /^\[.*\]$/.exec(f) ? e.concat([d(f, b + 1)]) : /^\(.*\)$/.exec(f) ? e.concat([d(f, b + 1)]) : e.concat(f.split(",")));
		j[k] = e;
		return j
	}
	function b(a, c, f) {
		if (!a)
			return c;
		"string" == typeof a && (a = d(a, 0));
		var e,
		g = [];
		a.hasOwnProperty("h") ? e = a.h : a.hasOwnProperty("v") && (e = a.v, c.setAttribute("data-vertical", "true"));
		if (!e || !e.length)
			return null;
		for (var j = document.createDocumentFragment(), k, m = 0; m < e.length; m++)
			a =
				e[m], k = document.createElement("div"), g.push(k), "string" == typeof a && a.length ? (a = a.replace(/^\s*/, "").replace(/\s*$/, ""), k.setAttribute(f, a)) : a && (k.className = "gav-divider-container", b.apply(this, [a, k, f])), j.appendChild(k);
		c.appendChild(j);
		return c
	}
	gav.Klass("gav.utils.SplitLayoutGenerator", {
		init : function () {},
		createLayout : function (a, b, f) {
			return gav.utils.SplitLayoutGenerator.createLayout(a, b, f)
		}
	});
	gav.utils.SplitLayoutGenerator.createLayout = function (a, c, f) {
		a = d(a);
		c.innerHTML = "";
		c.removeAttribute("data-vertical");
		b(a, c, f);
		return new gav.controls.DividerContainer(c)
	};
	gav.utils.SplitLayoutGenerator.getLayoutString = function (a, b) {
		if (!a || a instanceof jQuery && !a.length)
			return "";
		var f = "",
		e = "true" == $(a).attr("data-vertical"),
		f = $(a).children(".inner-wrapper");
		if (!f.length)
			return f = gav.utils.SplitLayoutGenerator.getLayoutString($(a).children().first(), b), !f ? f : e ? "(" + f + ")" : "[" + f + "]";
		var g = [];
		f.each(function (a, f) {
			var e = [];
			$(f).children().each(function (a, f) {
				f.getAttribute(b) ? e.push(f.getAttribute(b)) : $(f).hasClass("gav-divider-container") &&
				e.push(gav.utils.SplitLayoutGenerator.getLayoutString(f, b))
			});
			g.push(e.join(","))
		});
		return f = g.join(",")
	}
})();
(function () {
	function d(a, b) {
		var e = $.Deferred();
		$.ajax({
			type : b ? b.type : "GET",
			url : a,
			dataType : b ? b.dataType : "xml",
			async : !0,
			success : function (a) {
				e.resolve(a)
			},
			error : function (b) {
				e.resolve({
					failed : !0,
					xhr : b
				});
				var f = b.status,
				b = b.statusText;
				if (gav.Notifier) {
					var d,
					m;
					switch (f) {
					case 0:
						m = "Failed resource access";
						d = "Access to <b>" + a + "</b> was denied.";
						break;
					case 200:
						"parsererror" === b && (m = "Parser error", d = "Resource <b>" + a + "</b> is not properly formatted.");
						break;
					case 401:
						m = "Unauthorized access";
						d = "Access to <b>" + a +
							"</b> was denied.";
						break;
					case 403:
						m = "Access denied";
						d = "Access to <b>" + a + "</b> was denied.";
						break;
					case 404:
						m = "Resource not found";
						d = "Resource <b>" + a + "</b> could not be found.";
						break;
					case 408:
						m = "Request timeout";
						d = "Resource at <b>" + a + "</b> could not be fetched in time.";
						break;
					case 503:
						m = "Service unavailable";
						d = "Resource at <b>" + a + "</b> could not be fetched due to server being down.";
						break;
					default:
						m = "Failed to fetch resource",
						d = "Could not access <b>" + a + "</b>"
					}
					"abort" === b && (m = d = null);
					(d || m) && gav.Notifier.notify(d +
						("<br/>Status: " + f), {
						type : "warning",
						life : 1E4,
						sticky : !1,
						header : m
					});
					throw Error("Failed to load '" + a + "'\nStatus code: " + f + "\nStatus text: " + b);
				}
			}
		});
		return e.promise()
	}
	function b(a, b) {
		var e = $.Deferred(),
		g = new XDomainRequest;
		try {
			return g ? (g.onerror = function () {
				d(a, b).done(function (a) {
					e.resolve(a)
				})
			}, g.onload = function () {
				e.resolve(g.responseText)
			}, g.ontimeout = function () {
				d(a, b).done(function (a) {
					e.resolve(a)
				})
			}, g.onprogress = function () {}, g.open("GET", a), g.send(), e.promise()) : d(a, b)
		} catch (j) {
			return d(a, b)
		}
	}
	gav.Klass("gav.utils.Ajax", {});
	gav.utils.Ajax.load = function (b) {
		var f = [];
		if (!b || !b.url)
			return $.Deferred().resolve(void 0);
		for (var e = Array.isArray(b.url) ? b.url : [b.url], d = 0; d < e.length; d++)
			f.push(a(e[d], b));
		return $.when.apply(null, f).done(function () {
			var a,
			f;
			a = Array.prototype.slice.call(arguments);
			f = [];
			for (var e = !1, d, g = 0; g < a.length; g++)
				d = a[g], "object" == typeof d && !0 === d.failed ? (e = !0, f.push(void 0)) : f.push(d);
			a = e;
			f = Array.isArray(b.url) ? f : f[0];
			b.success && !a && b.success(f);
			b.always && b.always(f);
			b.fail && a &&
			b.fail(f)
		})
	};
	var a = "function" == typeof window.XDomainRequest ? b : d
})();
(function () {
	gav.utils || (gav.utils = {});
	gav.utils.DataSetUtils = {
		flagMarkerLeft : "(",
		flagMarkerRight : ")",
		extractFlags : function (d, b, a, c, f) {
			if (void 0 == d)
				return d;
			var e = d.indexOf(this.flagMarkerLeft),
			g = d.indexOf(this.flagMarkerRight);
			if (-1 == e || -1 == g)
				return d;
			e++;
			g = d.substr(e, g - e);
			f[b] || (f[b] = []);
			f[b][a] || (f[b][a] = []);
			f[b][a][c] = g.split(",");
			return d.substr(0, e - 1)
		},
		convertFlagsArray3DToFlagsArray1D : function (d) {
			for (var b = d ? d.length : 0, a, c, f, e, g = {}, j = 0; j < b; j += 1) {
				c = (a = d[j]) ? a.length : 0;
				for (var k = 0; k < c; k += 1) {
					e =
						(f = a[k]) ? f.length : 0;
					for (var m = 0; m < e; m += 1)
						f[m] && (g[[j, m, k].join()] = d[j][k][m])
				}
			}
			return g
		}
	}
})();
(function () {
	gav.IFace("gav.tree.ITreeNode", {
		getParent : function () {},
		getLevel : function () {},
		addChild : function () {},
		removeChild : function () {},
		isBranch : function () {},
		getChildren : function () {},
		removeChildren : function () {}

	})
})();
(function () {
	function d(b) {
		this._parent === b || b === this || (this._parent && this._parent.removeChild(this), this._parent = b, this._levelIsDirty = !0, this._parent && this._parent._children.push(this))
	}
	gav.Klass("gav.tree.TreeNode", {
		implement : gav.tree.ITreeNode,
		init : function (b) {
			this._id = b;
			this._children = [];
			this._level = null;
			this._levelIsDirty = !0;
			this._parent = null
		},
		getId : function () {
			return this._id
		},
		getName : function () {
			return this._name
		},
		setName : function (b) {
			this._name = b
		},
		getChildren : function () {
			return this._children
		},
		addChild : function (b) {
			if (b === this || 0 <= this._children.indexOf(b))
				return this;
			d.call(b, this);
			return this
		},
		setChildren : function (b) {
			if (b && b.length)
				for (var a = 0; a < b.length; a++)
					this.addChild(b[a])
		},
		isAncestorOf : function (b) {
			for (; b; ) {
				if (this === b)
					return !0;
				b = b.getParent()
			}
			return !1
		},
		removeChild : function (b) {
			b = this._children.indexOf(b);
			-1 < b && (this._children.splice(b, 1)[0]._parent = null);
			return this
		},
		removeChildren : function () {
			for (; this._children.length; )
				this.removeChild(this._children[0])
		},
		getParent : function () {
			return this._parent
		},
		setParent : function (b) {
			d.call(this, b);
			return this
		},
		isBranch : function () {
			return 0 < this._children.length
		},
		getLevel : function () {
			this._levelIsDirty && (this._level = this._parent ? this._parent.getLevel() + 1 : 0, this._levelIsDirty = !1);
			return this._level
		},
		getLeaves : function () {
			if (!this._children || !this._children.length)
				return [];
			for (var b = [], a = 0; a < this._children.length; a++)
				b = this._children[a].isBranch() ? b.concat(this._children[a].getLeaves()) : b.concat(this._children[a]);
			return b
		},
		clone : function (b) {
			for (var a = new gav.tree.TreeNode(this._id),
				c = this._children.slice(), f = 0; f < c.length; f++)
				a.addChild(c[f].clone(b));
			a.index = this.index;
			a._name = this._name;
			a.type = this.type;
			"function" == typeof b && b.call(a, this);
			return a
		}
	})
})();
(function (d) {
	gav.Klass("gav.data.DataCube", {
		extend : gav.events.EventDispatcher,
		init : function (b) {
			gav.events.EventDispatcher.prototype.init.call(this);
			var a = [];
			this._data = a;
			this._numSlices = this._numAttributes = this._numRecords = 0;
			this._mergedData = null;
			this._mergedDataUpdated = !1;
			if (b) {
				this._numRecords = b.records;
				this._numAttributes = b.attributes;
				this._numSlices = b.slices;
				var b = b.fillWithValue,
				c,
				f,
				e,
				g,
				j;
				for (j = 0; j < this._numSlices; j++) {
					f = [];
					for (e = 0; e < this._numRecords; e++) {
						c = [];
						for (g = 0; g < this._numAttributes; g++)
							"random" ===
							b ? 0 < j ? c.push(a[j - 1][e][g] + 0.4 * (Math.random() - 0.5) * a[j - 1][e][g]) : c.push(10 + 300 * Math.random() * (g + 1)) : NaN === b ? c.push(NaN) : "undefined" != typeof b ? c.push(b) : c.push(d);
						f.push(c)
					}
					a.push(f)
				}
				this.calculateSupportingData();
				this._createSortedStatusList(this._numSlices, this._numAttributes)
			}
		},
		calculateSupportingData : function () {
			this._localMinValues = Array(this._numSlices);
			this._localMaxValues = Array(this._numSlices);
			this._localSumValues = Array(this._numSlices);
			for (var b = 0; b < this._numSlices; b++) {
				for (var a = Array(this._numAttributes),
					c = Array(this._numAttributes), f = Array(this._numAttributes), e = 0; e < this._numAttributes; e++)
					a[e] = Number.MAX_VALUE, c[e] = -Number.MAX_VALUE, f[e] = 0;
				this._localMinValues[b] = a;
				this._localMaxValues[b] = c;
				this._localSumValues[b] = f
			}
			this._globalMinValues = Array(this._numAttributes);
			this._globalMaxValues = Array(this._numAttributes);
			this._globalSumValues = Array(this._numAttributes);
			this._globalDifferenceMaxMinValues = Array(this._numAttributes);
			this._globalMinValues2 = Array(this._numAttributes);
			this._globalDifferenceMaxMinValues2 =
				Array(this._numAttributes);
			for (e = 0; e < this._numAttributes; e++)
				this._globalMinValues[e] = Number.MAX_VALUE, this._globalMaxValues[e] = -Number.MAX_VALUE, this._globalSumValues[e] = 0;
			this._localNumNaNAttributes = Array(this._numSlices);
			for (b = 0; b < this._numSlices; b++) {
				this._localNumNaNAttributes[b] = Array(this._numAttributes);
				for (a = 0; a < this._numAttributes; a++)
					this._localNumNaNAttributes[b][a] = 0
			}
			this._globalNumNaNAttributes = Array(this._numAttributes);
			for (b = 0; b < this._numAttributes; b++)
				this._globalNumNaNAttributes[b] =
					0;
			for (a = 0; a < this._numAttributes; a++) {
				for (c = 0; c < this._numSlices; c++) {
					for (f = 0; f < this._numRecords; f++)
						b = this._data[c][f][a], b === b ? (this._localMaxValues[c][a] = Math.max(this._localMaxValues[c][a], b), this._localMinValues[c][a] = Math.min(this._localMinValues[c][a], b), this._localSumValues[c][a] += b) : this._localNumNaNAttributes[c][a]++;
					this._globalMaxValues[a] = Math.max(this._localMaxValues[c][a], this._globalMaxValues[a]);
					this._globalMinValues[a] = Math.min(this._localMinValues[c][a], this._globalMinValues[a]);
					this._globalNumNaNAttributes[a] += this._localNumNaNAttributes[c][a];
					this._globalSumValues[a] += this._localSumValues[c][a]
				}
				this._globalMaxValues[a] === -Number.MAX_VALUE && (this._globalMaxValues[a] = NaN);
				this._globalMinValues[a] === Number.MAX_VALUE && (this._globalMinValues[a] = NaN);
				this._globalMinValues2[a] = Math.min(0, this._globalMinValues[a]);
				this._globalDifferenceMaxMinValues[a] = this._globalMaxValues[a] - this._globalMinValues[a];
				this._globalDifferenceMaxMinValues2[a] = this._globalMaxValues[a] - this._globalMinValues2[a]
			}
		},
		getLocalMaxValue : function (b, a) {
			return this._localMaxValues[b][a]
		},
		getLocalMinValue : function (b, a) {
			return this._localMinValues[b][a]
		},
		getMaxValue : function (b) {
			return this._globalMaxValues[b]
		},
		getMinValue : function (b) {
			return this._globalMinValues[b]
		},
		getMinValue2 : function (b) {
			return this._globalMinValues2[b]
		},
		getMaxMinDifferenceValue : function (b) {
			return this._globalDifferenceMaxMinValues[b]
		},
		getMaxMinDifferenceValue2 : function (b) {
			return this._globalDifferenceMaxMinValues2[b]
		},
		getValue : function (b, a, c) {
			return !this._data ?
			d : this._data[c][b][a]
		},
		setValue : function (b, a, c, f) {
			this._data[c][b][a] = f
		},
		getScaledValue : function (b, a, c) {
			var f = this._globalDifferenceMaxMinValues[a];
			return 0 === f ? 0.5 : (this._data[c][b][a] - this._globalMinValues[a]) / f
		},
		getScaledValue2 : function (b, a, c) {
			var f = this._globalDifferenceMaxMinValues2[a];
			return 0 === f ? 0.5 : (this._data[c][b][a] - this._globalMinValues2[a]) / f
		},
		getLerpValue : function (b, a, c) {
			if (gav.isInteger(c))
				return this.getValue(b, a, Math.round(c));
			var f = Math.floor(c),
			e = Math.ceil(c),
			c = (c - f) / (f - e),
			f = this.getValue(b,
					a, f),
			b = this.getValue(b, a, e);
			return c * (f - b) + f
		},
		getLerpScaledValue : function (b, a, c) {
			if (gav.isInteger(c))
				return this.getScaledValue(b, a, Math.round(c));
			var f = Math.floor(c),
			e = Math.ceil(c),
			c = (c - f) / (f - e),
			f = this.getScaledValue(b, a, f),
			b = this.getScaledValue(b, a, e);
			return c * (f - b) + f
		},
		getMeanValue : function (b) {
			return this._globalSumValues[b] / (this._numRecords * this._numSlices - this._globalNumNaNAttributes[b])
		},
		getScaledMeanValue : function (b) {
			var a = this._globalDifferenceMaxMinValues[b];
			return 0 === a ? 0.5 : (this._globalSumValues[b] /
				(this._numRecords * this._numSlices - this._globalNumNaNAttributes[b]) - this._globalMinValues[b]) / a
		},
		getScaledMeanValue2 : function (b) {
			var a = this._globalDifferenceMaxMinValues2[b];
			return 0 === a ? 0.5 : (this._globalSumValues[b] / (this._numRecords * this._numSlices - this._globalNumNaNAttributes[b]) - this._globalMinValues2[b]) / a
		},
		getNumRecords : function () {
			return this._numRecords
		},
		getNumAttributes : function () {
			return this._numAttributes
		},
		getNumSlices : function () {
			return this._numSlices
		},
		getSortedIndices : function (b, a) {
			if (b >=
				this._numAttributes)
				throw Error("Attribute out of bounds");
			if (a >= this._numSlices)
				throw Error("Slice out of bounds");
			var c;
			this._sortedStatusList[a][b] || (c = this._data[a], c = null === c ? null : this._getAttributeSortedIndices(c, b), this._sortedStatusList[a][b] = !0, this._sortedIndicesList[a][b][0] = c);
			return c = this._sortedIndicesList[a][b][0]
		},
		getSortedIndicesGlobally : function (b) {
			if (b >= this._numAttributes)
				throw Error("Attribute out of bounds");
			!1 === this._mergedDataUpdated && this._generateMergedData();
			var a,
			c;
			this._sortedStatusListOfMergedData[b] ||
			(a = this._mergedData ? this._getAttributeSortedIndices(this._mergedData, b) : null, this._sortedStatusListOfMergedData[b] = !0, this._sortedIndicesListOfMergedData[b][0] = a, c = this._findNaNIndex(a, this._mergedData, b), a = -1 === c ? a : a.slice(0, c), this._sortedIndicesListOfMergedData[b][1] = a);
			return this._sortedIndicesListOfMergedData[b][1]
		},
		toArrayString : function () {
			function b(a) {
				var c = [];
				if (Array.isArray(a) && Array.isArray(a[0]))
					for (var f = 0; f < a.length; f++)
						c = c.concat(b(a[f]));
				else
					Array.isArray(a) && (c = c.concat(a));
				return c
			}
			return b(this._data).join(",")
		},
		_getAttributeSortedIndices : function (b, a) {
			for (var c = b.length, f = Array(c), e = 0, d = 0, j = 0; j < c; j++)
				isNaN(b[j][a]) ? e++ : (f[d] = [j, b[j][a]], d++);
			f.splice(d, e);
			try {
				f = f.sort(function (a, b) {
						return a[1] - b[1]
					})
			} catch (k) {}

			c = Array(d);
			for (j = 0; j < d; j++)
				c[j] = f[j][0];
			return c
		},
		_generateMergedData : function () {
			if ((this._mergedData ? _mergedData.length : 0) !== this._numSlices * this._numRecords)
				this._mergedData = Array(this._numSlices * this._numRecords);
			for (var b = 0, a = 0; a < this.getNumSlices(); a++)
				for (var c =
						0; c < this.getNumRecords(); c++)
					this._mergedData[b++] = this._data[a][c];
			this._mergedDataUpdated = !0
		},
		_createSortedStatusList : function (b, a) {
			this._sortedStatusList = Array(b);
			this._sortedIndicesList = gav.utils.ArrayHelper.createArray3D(b, a, 2);
			for (var c, f = 0; f < b; f++) {
				this._sortedStatusList[f] = Array(a);
				for (c = 0; c < a; c++)
					this._sortedStatusList[f][c] = !1
			}
			this._mergedDataUpdated = !1;
			this._sortedStatusListOfMergedData = Array(a);
			this._sortedIndicesListOfMergedData = gav.utils.ArrayHelper.createArray2D(a, 2);
			for (c = 0; c < a; c++)
				this._sortedStatusListOfMergedData[c] =
					!1
		},
		_findNaNIndex : function (b, a, c) {
			if (!b || 0 === b.length)
				return -1;
			for (var f, e = b.length - 1; 0 <= e; e--)
				if (f = a[b[e]][c], !isNaN(f))
					return e + 1;
			return 0
		}
	});
	gav.data.DataCube.createWithArray = function (b) {
		var a = new gav.data.DataCube,
		c = b.length,
		f = b[0].length,
		e = b[0][0].length;
		a._numSlices = c;
		a._numRecords = f;
		a._numAttributes = e;
		a._data = b;
		a.calculateSupportingData();
		a._createSortedStatusList(c, e);
		return a
	}
})();
(function () {
	function d() {
		var b,
		a,
		c;
		this._assignments = Array(this._numSlices);
		this._categoricalValues = Array(this._numAttributes);
		this._itemsOfCategoricalValues = Array(this._numSlices);
		for (c = 0; c < this._numAttributes; c++)
			this._categoricalValues[c] = [];
		for (b = 0; b < this._numSlices; b++) {
			this._itemsOfCategoricalValues[b] = Array(this._numAttributes);
			for (c = 0; c < this._numAttributes; c++)
				this._itemsOfCategoricalValues[b][c] = [];
			var f = Array(this._numRecords);
			for (a = 0; a < this._numRecords; a++) {
				var e = Array(this._numAttributes);
				for (c = 0; c < this._numAttributes; c++)
					e[c] = -1;
				f[a] = e
			}
			this._assignments[b] = f
		}
	}
	gav.Klass("gav.data.ClassCube", {
		extend : gav.events.EventDispatcher,
		init : function () {
			gav.events.EventDispatcher.prototype.init.call(this);
			this._numSlices = this._numAttributes = this._numRecords = 0
		},
		setArray : function (b) {
			this._numSlices = b.length;
			this._numRecords = b[0].length;
			this._numAttributes = b[0][0].length;
			this._categoricalIndicatorNames = Array(this._numAttributes);
			this._orderedCategoricalValues = Array(this._numAttributes);
			d.call(this);
			var a,
			c,
			f;
			for (a = 0; a < this._numSlices; a++)
				for (c = 0; c < this._numRecords; c++)
					for (f = 0; f < this._numAttributes; f++)
						this.setValue(c, f, a, b[a][c][f])
		},
		getNumRecords : function () {
			return this._numRecords
		},
		getNumAttributes : function () {
			return this._numAttributes
		},
		getNumSlices : function () {
			return this._numSlices
		},
		setOrderedCategoricalValues : function (b, a) {
			this._orderedCategoricalValues[a] = b
		},
		getOrderedCategoricalValueIndex : function (b, a) {
			return this._orderedCategoricalValues[a].indexOf(b)
		},
		getOrderedCategoricalValues : function (b) {
			return this._orderedCategoricalValues[b] &&
			"" != this._orderedCategoricalValues[b] && "-" != this._orderedCategoricalValues[b] ? this._orderedCategoricalValues[b] : this.getCategoricalValues(b)
		},
		setValue : function (b, a, c, f) {
			var e = this._categoricalValues[a].indexOf(f);
			-1 === e && (this._categoricalValues[a].push(f), e = this._categoricalValues[a].length - 1);
			this._assignments[c][b][a] = e;
			void 0 === this._itemsOfCategoricalValues[c][a][e] && (this._itemsOfCategoricalValues[c][a][e] = []);
			this._itemsOfCategoricalValues[c][a][e].push(b)
		},
		setValue2 : function (b, a, c, f, e) {
			var d =
				this._categoricalValues[a].indexOf(e);
			-1 === d && (this._categoricalValues[a].push(e), d = this._categoricalValues[a].length - 1);
			e = c;
			this._assignments[e][b][a] = d;
			void 0 === this._itemsOfCategoricalValues[e][a][d] && (this._itemsOfCategoricalValues[e][a][d] = []);
			this._itemsOfCategoricalValues[e][a][d].push(b);
			for (e = c + 1; e < f; e += 1)
				this._assignments[e][b][a] = d, this._itemsOfCategoricalValues[e][a][d] = this._itemsOfCategoricalValues[c][a][d]
		},
		getValue : function (b, a, c) {
			return this._categoricalValues[a][this._assignments[c][b][a]]
		},
		getCategoricalValueIndexOfItem : function (b, a, c) {
			return this._assignments[c][b][a]
		},
		getCategoricalIndicatorNames : function () {
			return this._categoricalIndicatorNames
		},
		getCategoricalIndicatorName : function (b) {
			return this._categoricalIndicatorNames[b]
		},
		setCategoricalIndicatorName : function (b, a) {
			this._categoricalIndicatorNames[b] = a
		},
		getCategoricalValues : function (b) {
			return this._categoricalValues[b]
		},
		getItemsOfCategoricalValue : function (b, a, c) {
			return this._itemsOfCategoricalValues[c][a][b]
		},
		isConstantCategoricalIndicator : function (b) {
			return this._constantStatusOfCategoricalAttributes &&
			!0 == this._constantStatusOfCategoricalAttributes[b] ? !0 : !1
		},
		toArrayString : function () {
			function b(a) {
				var c = [];
				if (Array.isArray(a) && Array.isArray(a[0]))
					for (var f = 0; f < a.length; f++)
						c = c.concat(b(a[f]));
				else
					Array.isArray(a) && (c = c.concat(a));
				return c
			}
			return b(this._assigments).join(",")
		}
	});
	gav.data.ClassCube.createWithSize = function (b, a, c) {
		var f = new gav.data.ClassCube;
		f._numSlices = c;
		f._numRecords = b;
		f._numAttributes = a;
		f._categoricalIndicatorNames = Array(a);
		f._orderedCategoricalValues = Array(a);
		d.call(f);
		return f
	};
	gav.data.ClassCube.createWithArray = function (b, a, c, f) {
		var e = b.length,
		d = b[0].length,
		j = b[0][0].length,
		k = gav.data.ClassCube.createWithSize(d, j, e);
		f && (k._constantStatusOfCategoricalAttributes = f);
		var m,
		o,
		n,
		p;
		if (void 0 === c)
			for (p = 0; p < j; p++)
				if (k.setCategoricalIndicatorName(p, a[p]), !f || !1 == f[p])
					for (n = 0; n < d; n++)
						for (o = 0; o < e; o++)
							m = b[o][n][p], k.setValue(n, p, o, m);
				else
					for (n = 0; n < d; n++)
						m = b[0][n][p], k.setValue2(n, p, 0, e, m);
		else {
			var r;
			m = !1;
			for (p = 0; p < j; p++) {
				if (c && c.length > p) {
					if (r = c[p], m = !0, !r || !r.length)
						r = [], m = !1
				} else
					r =
						[], m = !1;
				k.setCategoricalIndicatorName(p, a[p]);
				if (m)
					if (!f || !1 == f[p])
						for (n = 0; n < d; n++)
							for (o = 0; o < e; o++)
								m = b[o][n][p], k.setValue(n, p, o, m);
					else
						for (n = 0; n < d; n++)
							m = b[0][n][p], k.setValue2(n, p, 0, e, m);
				else {
					if (!f || !1 == f[p])
						for (n = 0; n < d; n++)
							for (o = 0; o < e; o++)
								m = b[o][n][p], k.setValue(n, p, o, m), -1 == r.indexOf(m) && r.push(m);
					else
						for (n = 0; n < d; n++)
							m = b[0][n][p], k.setValue2(n, p, 0, e, m), -1 == r.indexOf(m) && r.push(m);
					r.sort()
				}
				k.setOrderedCategoricalValues(r, p)
			}
		}
		return k
	};
	gav.data.ClassCube.createWithArrayOld = function (b, a, c) {
		var f =
			b.length,
		e = b[0].length,
		d = b[0][0].length,
		j = gav.data.ClassCube.createWithSize(e, d, f),
		k,
		m,
		o,
		n,
		p;
		m = !1;
		for (p = 0; p < d; p++) {
			if (c && c.length > p) {
				if (k = c[p], m = !0, !k || !k.length)
					k = [], m = !1
			} else
				k = [], m = !1;
			j.setCategoricalIndicatorName(p, a[p]);
			if (m)
				for (n = 0; n < e; n++)
					for (o = 0; o < f; o++)
						m = b[o][n][p], j.setValue(n, p, o, m);
			else {
				for (n = 0; n < e; n++)
					for (o = 0; o < f; o++)
						m = b[o][n][p], j.setValue(n, p, o, m), -1 == k.indexOf(m) && k.push(m);
				k.sort()
			}
			j.setOrderedCategoricalValues(k, p)
		}
		return j
	}
})();
(function () {
	function d() {
		this._numRecords = this._dataCube ? this._dataCube.getNumRecords() : 0;
		this._numAttributes = this._dataCube ? this._dataCube.getNumAttributes() : 0;
		this._numSlices = this._dataCube ? this._dataCube.getNumSlices() : 0
	}
	gav.Klass("gav.data.DataSet", {
		extend : gav.events.EventDispatcher,
		init : function (b, a, c, f, e) {
			gav.events.EventDispatcher.prototype.init.call(this);
			this._dataCube = b;
			this._indicatorInformation = a;
			this._classCube = c;
			this._flagsList = f;
			this._flagDescriptions = e;
			this._recordIdToRecordIndexMappingNeedToUpdate =
				this._changed = this._availableFlagsUpdateNeeded = !0;
			d.call(this)
		},
		getDataCube : function () {
			return this._dataCube
		},
		setDataCube : function (b) {
			if (this._dataCube !== b) {
				var a = this._dataCube;
				this._dataCube = b;
				d.call(this);
				if (this._dataCube) {
					for (var c = [], b = 0; b < this._numRecords; b++)
						c.push({
							id : "rec_" + b,
							name : "Record " + b
						});
					this.setRecordInformation(c);
					for (var f = [], c = 0; c < this._numAttributes; c++)
						f.push({
							name : "Attribute " + c,
							id : "attr_" + b
						});
					this.setIndicatorInformation(f);
					f = [];
					for (c = 0; c < this._numSlices; c++)
						f.push({
							name : "200" +
							c,
							id : "slice_" + b
						});
					this.setSliceInformation(f);
					this.dispatchEvent(new gav.events.PropertyChangeEvent("property", null, null))
				}
				this.dispatchEvent(new gav.events.PropertyChangeEvent("dataCube", a, this._dataCube));
				this._changed = !0
			}
		},
		getClassCube : function () {
			return this._classCube
		},
		setClassCube : function (b) {
			this._classCube !== b && (this._classCube = b, this._changed = !0)
		},
		getRecordInformation : function () {
			return this._recordInformation
		},
		setRecordInformation : function (b) {
			this._recordInformation = b;
			this.dispatchEvent(new gav.events.PropertyChangeEvent("property",
					null, null));
			this._recordIdToRecordIndexMappingNeedToUpdate = this._changed = !0
		},
		getRecordIdToRecordIndexMapping : function () {
			if (this._recordIdToRecordIndexMappingNeedToUpdate) {
				this._recordIdToRecordIndexMapping = {};
				for (var b = this._recordInformation ? this._recordInformation.length : 0, a, c = 0; c < b; c++)
					a = this._recordInformation[c], this._recordIdToRecordIndexMapping[a.id] = c;
				this._recordIdToRecordIndexMappingNeedToUpdate = !1
			}
			return this._recordIdToRecordIndexMapping
		},
		getIndicatorInformation : function () {
			return this._indicatorInformation
		},
		setIndicatorInformation : function (b) {
			this._indicatorInformation = b;
			this.dispatchEvent(new gav.events.PropertyChangeEvent("property", null, null));
			this._changed = !0
		},
		getCategoricalIndicatorInformation : function () {
			return this._categoricalIndicatorInformation
		},
		setCategoricalIndicatorInformation : function (b) {
			this._categoricalIndicatorInformation = b;
			this.dispatchEvent(new gav.events.PropertyChangeEvent("property", null, null));
			this._changed = !0
		},
		getSliceInformation : function () {
			return this._sliceInformation
		},
		setSliceInformation : function (b) {
			this._sliceInformation =
				b;
			this.dispatchEvent(new gav.events.PropertyChangeEvent("property", null, null));
			this._changed = !0
		},
		setMapName : function (b) {
			this._mapName = b
		},
		getMapName : function () {
			return this._mapName
		},
		hasTimeData : function () {
			return this._dataCube && 1 < this._dataCube.getNumSlices()
		},
		hasCategoricalData : function () {
			return this._classCube && 1 <= this._classCube.getNumAttributes()
		},
		setMetaDataFlags : function (b, a, c, f) {
			this._flagsList[[a, c, f].join()] = b;
			this._availableFlagsUpdateNeeded = !0
		},
		getMetaDataFlags : function (b, a, c) {
			return this._flagsList ?
			this._flagsList[[b, a, c].join()] : null
		},
		getMetaDataFlagsDescription : function (b) {
			return this._flagDescriptions ? this._flagDescriptions[b] : null
		},
		getAllFlags : function () {
			if (this._availableFlagsUpdateNeeded) {
				this._availableFlags = [];
				var b,
				a,
				c,
				f;
				for (f in this._flagsList) {
					c = (b = this._flagsList[f]) ? b.length : 0;
					for (var e = 0; e < c; e++)
						a = b[e], -1 == this._availableFlags.indexOf(a) && this._availableFlags.push(a)
				}
				this._availableFlagsUpdateNeeded = !1
			}
			return this._availableFlags
		},
		getSourceFlagList : function () {
			return this._flagsList
		},
		getSourceFlagDescriptions : function () {
			return this._flagDescriptions
		},
		getIndicatorGroupings : function () {
			return this._indicatorGroupings
		},
		setIndicatorGroupings : function (b) {
			this._indicatorGroupings = b
		},
		toString : function () {
			this._unicodeWriter || (this._unicodeWriter = new gav.data.provider.UnicodeFormatWriter);
			if (this._changed || !this._unicodeString)
				this._changed = !1, this._unicodeString = this._unicodeWriter.getDataSetAsFormattedText(this);
			return this._unicodeString
		}
	})
})();
(function () {
	function d() {
		this._numMergedSlices = this._mergedSliceIds ? this._mergedSliceIds.length : 0;
		this._numMergedRecords = this._mergedRecordIds ? this._mergedRecordIds.length : 0;
		this._numMergedIndicators = this._mergedIndicatorIds ? this._mergedIndicatorIds.length : 0;
		this._numMergedCategoricalIndicators = this._mergedCategoricalIndicatorIds ? this._mergedCategoricalIndicatorIds.length : 0;
		if (0 == this._numMergedSlices || 0 == this._numMergedRecords || 0 == this._numMergedIndicators && 0 == this._numMergedCategoricalIndicators)
			this._dataSet =
				null;
		else {
			for (var b, a, c, f, e, d, j = gav.utils.ArrayHelper.createArray3DWithValue(this._numMergedSlices, this._numMergedRecords, this._numMergedIndicators, NaN), k = gav.utils.ArrayHelper.createArray3DWithValue(this._numMergedSlices, this._numMergedRecords, this._numMergedCategoricalIndicators, ""), m = Array(this._numMergedSlices), o = Array(this._numMergedRecords), n = Array(this._numMergedIndicators), p = Array(this._numMergedCategoricalIndicators), r, v, t, u, q, z, x, w, B, y, A, H, F, C, J = {}, D = 0; D < this._numInputDataSets; D += 1) {
				b = this._input[D];
				a = b.getDataCube();
				c = b.getClassCube();
				e = this._mappings[D][0];
				d = this._mappings[D][1];
				r = this._mappings[D][2];
				v = this._mappings[D][3];
				z = e ? e.length : 0;
				x = d ? d.length : 0;
				w = r ? r.length : 0;
				B = v ? v.length : 0;
				for (f = 0; f < w; f += 1)
					if (q = r[f], H = q[0], F = q[1], q = 2 == q[2] ? !0 : !1)
						for (C = 0; C < z; C += 1) {
							t = e[C];
							q = t[0];
							y = t[1];
							for (t = 0; t < x; t += 1)
								u = d[t], A = u[0], u = u[1], isNaN(j[y][u][F]) && (j[y][u][F] = a.getValue(A, H, q)), (A = b.getMetaDataFlags(A, H, q)) && A.length && (J[[u, F, y].join()] = A)
						}
					else
						for (C = 0; C < z; C += 1) {
							t = e[C];
							q = t[0];
							y = t[1];
							for (t = 0; t < x; t += 1)
								u = d[t],
								A = u[0], u = u[1], j[y][u][F] = a.getValue(A, H, q), (A = b.getMetaDataFlags(A, H, q)) && A.length && (J[[u, F, y].join()] = A)
						}
				for (f = 0; f < B; f += 1)
					if (q = v[f], H = q[0], F = q[1], q = 2 == q[2] ? !0 : !1, this._mergedConstantCategoricalIndicators[F])
						if (q)
							for (t = 0; t < x; t += 1)
								u = d[t], A = u[0], u = u[1], "" == k[0][u][F] && (k[0][u][F] = c.getValue(A, H, 0));
						else
							for (t = 0; t < x; t += 1)
								u = d[t], A = u[0], u = u[1], k[0][u][F] = c.getValue(A, H, 0);
					else if (q)
						for (C = 0; C < z; C += 1) {
							t = e[C];
							q = t[0];
							y = t[1];
							for (t = 0; t < x; t += 1)
								u = d[t], A = u[0], u = u[1], "" == k[y][u][F] && (k[y][u][F] = c.getValue(A, H, q))
						}
					else
						for (C =
								0; C < z; C += 1) {
							t = e[C];
							q = t[0];
							y = t[1];
							for (t = 0; t < x; t += 1)
								u = d[t], A = u[0], u = u[1], k[y][u][F] = c.getValue(A, H, q)
						}
				f = b.getSliceInformation();
				for (C = 0; C < z; C += 1)
					t = e[C], q = t[0], y = t[1], m[y] || (m[y] = f[q]);
				e = b.getRecordInformation();
				for (t = 0; t < x; t += 1)
					u = d[t], A = u[0], u = u[1], o[u] || (z = e[A], o[u] = z.name == this._recordIdToRecordName[z.id] ? e[A] : new gav.data.RecordInformation(z.id, this._recordIdToRecordName[z.id]));
				d = b.getIndicatorInformation();
				for (f = 0; f < w; f += 1)
					q = r[f], H = q[0], F = q[1], n[F] || (n[F] = d[H]);
				b = b.getCategoricalIndicatorInformation();
				for (f = 0; f < B; f += 1)
					q = v[f], H = q[0], F = q[1], p[F] || (p[F] = b[H])
			}
			var G = {},
			E,
			I = this,
			L;
			for (L in J)
				(A = J[L]) && A.forEach(function (a) {
					if ("undefined" == typeof G[a])
						for (var b = 0; b < I._numInputDataSets; b += 1)
							(E = I._input[b].getMetaDataFlagsDescription(a)) && (G[a] = E)
				});
			this._mergedDataCube = gav.data.DataCube.createWithArray(j);
			0 < this._numMergedSlices && 0 < this._numMergedRecords && 0 < this._numMergedCategoricalIndicators && (this._mergedClassCube = gav.data.ClassCube.createWithArray(k, this._mergedCategoricalIndicatorNames, this._categoricalIndicatorOrderedCategories,
						this._mergedConstantCategoricalIndicators));
			this._dataSet = new gav.data.DataSet(this._mergedDataCube, n, null, J, G);
			this._dataSet.setRecordInformation(o);
			this._dataSet.setSliceInformation(m);
			this._mergedClassCube && (this._dataSet.setClassCube(this._mergedClassCube), this._dataSet.setCategoricalIndicatorInformation(p))
		}
	}
	gav.Klass("gav.data.DataSetMerger", {
		extend : gav.Invalidatable,
		init : function () {
			gav.Invalidatable.prototype.init.call(this);
			this._includedRecordIdsChanged = this._includedSliceIdsChanged = this._includedCategoricalIndicatorIdsChanged =
				this._includedIndicatorIdsChanged = this._inputChanged = !1
		},
		getDataSet : function () {
			return this._dataSet
		},
		setInput : function (b) {
			this._input !== b && (this._input = b, this._inputChanged = !0, this.invalidate())
		},
		getInput : function () {
			return this._input
		},
		setIncludedIndicatorIds : function (b) {
			this._includedIndicatorIds !== b && (this._includedIndicatorIds = b, this._includedIndicatorIdsChanged = !0, this.invalidate())
		},
		getIncludedIndicatorIds : function () {
			return this._includedIndicatorIds
		},
		setIncludedCategoricalIndicatorIds : function (b) {
			this._includedCategoricalIndicatorIds !==
			b && (this._includedCategoricalIndicatorIds = b, this._includedCategoricalIndicatorIdsChanged = !0, this.invalidate())
		},
		getIncludedCategoricalIndicatorIds : function () {
			return this._includedCategoricalIndicatorIds
		},
		setIncludedRecordIds : function (b) {
			this._includedRecordIds !== b && (this._includedRecordIds = b, this._includedRecordIdsChanged = !0, this.invalidate())
		},
		getIncludedRecordIds : function () {
			return this._includedRecordIds
		},
		setIncludedSliceIds : function (b) {
			this._includedSliceIds !== b && (this._includedSliceIds = b, this._includedSliceIdsChanged =
					!0, this.invalidate())
		},
		getIncludedSliceIds : function () {
			return this._includedSliceIds
		},
		_update : function () {
			if (this._inputChanged || this._includedIndicatorIdsChanged || this._includedSliceIdsChanged || this._includedRecordIdsChanged || this._includedCategoricalIndicatorIdsChanged) {
				this._numInputDataSets = this._input ? this._input.length : 0;
				if (0 == this._numInputDataSets)
					this._dataSet = null;
				else if (1 == this._numInputDataSets && !this._includedIndicatorIds && !this._includedCategoricalIndicatorIds && !this._includedRecordIds &&
					!this._includedSliceIds)
					this._dataSet = this._input[0];
				else {
					this._mappings = Array(this._numInputDataSets);
					for (var b = 0; b < this._numInputDataSets; b += 1)
						this._mappings[b] = [[], [], [], []];
					this._numIncludedSliceIds = this._includedSliceIds ? this._includedSliceIds.length : 0;
					this._numIncludedRecordIds = this._includedRecordIds ? this._includedRecordIds.length : 0;
					this._numIncludedIndicatorIds = this._includedIndicatorIds ? this._includedIndicatorIds.length : 0;
					this._numIncludedCategoricalIndicatorIds = this._includedCategoricalIndicatorIds ?
						this._includedCategoricalIndicatorIds.length : 0;
					var a,
					c,
					b = {},
					f = [],
					e,
					g,
					j;
					for (e = 0; e < this._numInputDataSets; e += 1) {
						a = this._input[e];
						j = (a = a.getSliceInformation()) ? a.length : 0;
						for (g = 0; g < j; g += 1)
							c = a[g], c = c.id, "NA" != c && void 0 == b[c] && (b[c] = 1, f.push(c))
					}
					if (0 == this._numIncludedSliceIds)
						this._mergedSliceIds = f;
					else {
						this._mergedSliceIds = [];
						for (e = 0; e < this._numIncludedSliceIds; e += 1)
							c = this._includedSliceIds[e], void 0 != b[c] && this._mergedSliceIds.push(c)
					}
					gav.utils.ArrayHelper.sortArray(this._mergedSliceIds);
					for (e = 0; e <
						this._numInputDataSets; e += 1) {
						a = this._input[e];
						j = (a = a.getSliceInformation()) ? a.length : 0;
						for (g = 0; g < j; g += 1)
							c = a[g], c = c.id, b = this._mergedSliceIds.indexOf(c), -1 < b && this._mappings[e][0].push([g, b])
					}
					var k,
					b = {};
					g = [];
					this._recordIdToRecordName = {};
					for (e = 0; e < this._numInputDataSets; e += 1) {
						a = this._input[e];
						c = (a = a.getRecordInformation()) ? a.length : 0;
						for (j = 0; j < c; j += 1)
							if (k = a[j], f = k.id, void 0 == b[f] && (b[f] = 1, g.push(f)), void 0 == this._recordIdToRecordName[f] || this._recordIdToRecordName[f] == f)
								this._recordIdToRecordName[f] =
									k.name
					}
					if (0 == this._numIncludedRecordIds)
						this._mergedRecordIds = g;
					else {
						this._mergedRecordIds = [];
						for (e = 0; e < this._numIncludedRecordIds; e += 1)
							f = this._includedRecordIds[e], void 0 != b[f] && this._mergedRecordIds.push(f)
					}
					for (e = 0; e < this._numInputDataSets; e += 1) {
						a = this._input[e];
						c = (a = a.getRecordInformation()) ? a.length : 0;
						for (j = 0; j < c; j += 1)
							k = a[j], f = k.id, b = this._mergedRecordIds.indexOf(f), -1 < b && this._mappings[e][1].push([j, b])
					}
					b = {};
					g = [];
					for (e = 0; e < this._numInputDataSets; e += 1) {
						a = this._input[e];
						c = (a = a.getIndicatorInformation()) ?
						a.length : 0;
						for (j = 0; j < c; j += 1)
							f = a[j], f = f.id, void 0 == b[f] && (b[f] = 1, g.push(f))
					}
					if (0 == this._numIncludedIndicatorIds)
						this._mergedIndicatorIds = g;
					else {
						this._mergedIndicatorIds = [];
						for (e = 0; e < this._numIncludedIndicatorIds; e += 1)
							f = this._includedIndicatorIds[e], void 0 != b[f] && this._mergedIndicatorIds.push(f)
					}
					this._overlappedIndicatorIds = {};
					for (e = 0; e < this._numInputDataSets; e += 1) {
						a = this._input[e];
						c = (a = a.getIndicatorInformation()) ? a.length : 0;
						for (j = 0; j < c; j += 1)
							f = a[j], f = f.id, b = this._mergedIndicatorIds.indexOf(f), -1 < b &&
							(this._overlappedIndicatorIds[f] ? (this._overlappedIndicatorIds[f] = 2, this._mappings[e][2].push([j, b, 2])) : (this._overlappedIndicatorIds[f] = 1, this._mappings[e][2].push([j, b, 1])))
					}
					g = {};
					var m = [],
					b = {};
					for (e = 0; e < this._numInputDataSets; e += 1) {
						a = this._input[e];
						c = (f = a.getCategoricalIndicatorInformation()) ? f.length : 0;
						for (j = 0; j < c; j += 1)
							k = f[j], a = k.id, void 0 == g[a] && (g[a] = 1, m.push(a), b[a] = k.name)
					}
					if (0 == this._numIncludedCategoricalIndicatorIds)
						this._mergedCategoricalIndicatorIds = m;
					else {
						this._mergedCategoricalIndicatorIds =
							[];
						for (e = 0; e < this._numIncludedCategoricalIndicatorIds; e += 1)
							a = this._includedCategoricalIndicatorIds[e], void 0 != g[a] && this._mergedCategoricalIndicatorIds.push(a)
					}
					this._numMergedCategoricalIndicators = this._mergedCategoricalIndicatorIds ? this._mergedCategoricalIndicatorIds.length : 0;
					this._mergedConstantCategoricalIndicators = Array(this._numMergedCategoricalIndicators);
					this._sourcesOfMergedCategoricalIndicatorIds = {};
					for (e = 0; e < this._numInputDataSets; e += 1) {
						a = this._input[e];
						g = a.getClassCube();
						c = (f = a.getCategoricalIndicatorInformation()) ?
						f.length : 0;
						for (j = 0; j < c; j += 1)
							k = f[j], a = k.id, k = this._mergedCategoricalIndicatorIds.indexOf(a), -1 < k && (this._mergedConstantCategoricalIndicators[k] || (this._mergedConstantCategoricalIndicators[k] = g.isConstantCategoricalIndicator(j)), this._sourcesOfMergedCategoricalIndicatorIds[a] ? (this._sourcesOfMergedCategoricalIndicatorIds[a].push([e, j]), this._mappings[e][3].push([j, k, 2])) : (this._sourcesOfMergedCategoricalIndicatorIds[a] = [], this._sourcesOfMergedCategoricalIndicatorIds[a].push([e, j]), this._mappings[e][3].push([j,
											k, 1])))
					}
					this._mergedCategoricalIndicatorNames = Array(this._numMergedCategoricalIndicators);
					this._categoricalIndicatorOrderedCategories = Array(this._numMergedCategoricalIndicators);
					for (e = 0; e < this._numMergedCategoricalIndicators; e += 1) {
						this._mergedCategoricalIndicatorNames[e] = b[this._mergedCategoricalIndicatorIds[e]];
						a = this._categoricalIndicatorOrderedCategories;
						f = e;
						g = this._sourcesOfMergedCategoricalIndicatorIds[this._mergedCategoricalIndicatorIds[e]];
						var o = m = void 0,
						n = j = void 0,
						p = void 0;
						c = g ? g.length : 0;
						k = Array(c);
						p = void 0;
						if (this._includedRecordIds) {
							var r = void 0,
							v = n = void 0,
							t = void 0,
							u = void 0,
							q = void 0,
							z = m = t = v = void 0,
							x = t = void 0;
							for (j = 0; j < c; j++) {
								for (var n = g[j][0], p = g[j][1], m = this._input[n], o = m.getClassCube(), x = (m = o.getOrderedCategoricalValues(p)) ? m.length : 0, z = {}, r = this._mappings[n][0], n = this._mappings[n][1], u = r ? r.length : 0, q = n ? n.length : 0, w = 0; w < u; w += 1)
									for (var v = r[w], v = v[0], B = 0; B < q; B += 1)
										t = n[B], t = t[0], t = o.getValue(t, p, v), z[t] || (z[t] = 1);
								p = [];
								for (o = 0; o < x; o++)
									t = m[o], 1 === z[t] && p.push(t);
								k[j] = p
							}
						} else
							for (j =
									0; j < c; j++)
								n = g[j][0], p = g[j][1], m = this._input[n], o = m.getClassCube(), k[j] = o.getOrderedCategoricalValues(p);
						p = gav.utils.ArrayHelper.mergeOrderedArrays(k);
						a[f] = p
					}
					d.call(this)
				}
				this._includedRecordIdsChanged = this._includedSliceIdsChanged = this._includedCategoricalIndicatorIdsChanged = this._includedIndicatorIdsChanged = this._inputChanged = !1;
				this.dispatchEvent("dataSetChanged")
			}
		}
	})
})();
(function () {
	gav.data || (gav.data = {});
	gav.data.DataAnalysisHelper = {
		getDictionaryOfNaNValueStrings : function () {
			void 0 === this._dictionaryOfNaNValueStrings && (this._dictionaryOfNaNValueStrings = {}, this._dictionaryOfNaNValueStrings[""] = 1, this._dictionaryOfNaNValueStrings[" "] = 1, this._dictionaryOfNaNValueStrings["-"] = 1, this._dictionaryOfNaNValueStrings["..."] = 1, this._dictionaryOfNaNValueStrings[":"] = 1, this._dictionaryOfNaNValueStrings.NaN = 1, this._dictionaryOfNaNValueStrings.nan = 1, this._dictionaryOfNaNValueStrings.NAN =
					1, this._dictionaryOfNaNValueStrings.NA = 1, this._dictionaryOfNaNValueStrings.na = 1);
			return this._dictionaryOfNaNValueStrings
		},
		getDictionaryOfNaNStrings : function () {
			void 0 === this._dictionaryOfNaNStrings && (this._dictionaryOfNaNStrings = {}, this._dictionaryOfNaNStrings[""] = 1, this._dictionaryOfNaNStrings[" "] = 1, this._dictionaryOfNaNStrings.NaN = 1, this._dictionaryOfNaNStrings.nan = 1, this._dictionaryOfNaNStrings.NAN = 1, this._dictionaryOfNaNStrings.NA = 1, this._dictionaryOfNaNStrings.na = 1, this._dictionaryOfNaNStrings["-"] =
					1);
			return this._dictionaryOfNaNStrings
		},
		getDataTypeStringToDataTypeValueMapping : function () {
			void 0 === this._dataTypeStringToDataTypeValueMapping && (this._dataTypeStringToDataTypeValueMapping = {}, this._dataTypeStringToDataTypeValueMapping[0] = 0, this._dataTypeStringToDataTypeValueMapping[1] = 1, this._dataTypeStringToDataTypeValueMapping[2] = 2, this._dataTypeStringToDataTypeValueMapping["0"] = 0, this._dataTypeStringToDataTypeValueMapping["1"] = 1, this._dataTypeStringToDataTypeValueMapping["2"] = 1, this._dataTypeStringToDataTypeValueMapping.S =
					0, this._dataTypeStringToDataTypeValueMapping.s = 0, this._dataTypeStringToDataTypeValueMapping.F = 1, this._dataTypeStringToDataTypeValueMapping.f = 1, this._dataTypeStringToDataTypeValueMapping.C = 2, this._dataTypeStringToDataTypeValueMapping.c = 2);
			return this._dataTypeStringToDataTypeValueMapping
		},
		isNaNValueString : function (d) {
			return null == d ? !0 : 1 == gav.data.DataAnalysisHelper.getDictionaryOfNaNValueStrings()[d] ? !0 : !1
		},
		isEmptyOrNaNString : function (d) {
			return void 0 === d ? !0 : 1 === gav.data.DataAnalysisHelper.getDictionaryOfNaNStrings()[d] ?
			!0 : !1
		},
		determineDataTypeValueOfDataTypeString : function (d) {
			if (void 0 === d)
				return 0;
			var b = gav.data.DataAnalysisHelper.getDataTypeStringToDataTypeValueMapping();
			return void 0 === b[d] ? 0 : b[d]
		}
	}
})();
gav.Klass("gav.data.IndicatorInformation", {
	init : function (d, b) {
		d || (d = "ind");
		b || (b = "");
		this.id = d;
		this.name = b
	},
	toString : function () {
		return this.name
	}
});
gav.Klass("gav.data.RecordInformation", {
	init : function (d, b) {
		d || (d = "rec");
		b || (b = "");
		this.id = d;
		this.name = b
	},
	toString : function () {
		return this.name
	}
});
gav.Klass("gav.data.SheetInformation", {
	init : function (d, b) {
		d || (d = "ind");
		b || (b = "");
		this.id = d;
		this.name = b
	},
	toString : function () {
		return this.name
	}
});
(function () {
	function d(a) {
		"string" === typeof a && "function" == typeof window.DOMParser && (a = (new DOMParser).parseFromString(a, "text/xml"));
		var c = {
			dataSources : {},
			settings : {}

		};
		$(a).find("settings > property").each(function () {
			var a = $(this).text();
			switch ($(this).attr("type")) {
			case "int":
			case "color":
				a = parseInt(a)
			}
			c.settings[$(this).attr("id")] = a
		});
		$(a).find("dataSources > source").each(function (a, f) {
			var e = $(f),
			d = {
				name : e.find("identifier").text(),
				mapsLocation : e.find("mapsLocation").text(),
				maps : []
			};
			c.dataSources[e.find("identifier").text()] =
				d;
			e.find("maps > map").each(function (a, f) {
				var e = b(f, c.settings);
				d.maps.push(e)
			})
		});
		var f = $(a).find("vislet > copyrightText").text(),
		a = $(a).find("vislet > copyrightLogoURL").text();
		c.vislet = {};
		f && f.length && (c.vislet.copyRightText = f);
		a && a.length && (c.vislet.copyRightLogo = a);
		return c
	}
	function b(a, c) {
		var f = {
			backgroundMap : {
				enabled : "true" === $(a).attr("enableGoogleMap") || "true" === $(a).attr("enableBackgroundMap")
			},
			projection : $(a).attr("projection") || "unit",
			name : $(a).attr("name") || "",
			excludeFromReferenceScale : "true" ===
			$(a).attr("excludeFromReferenceScale"),
			backgroundColor : c ? c.mapBackgroundColor : null
		},
		e = [];
		$(a).children("layer").each(function (a, b) {
			var c = {
				type : $(b).children("type").text(),
				filename : $(b).children("filename").text(),
				idProperty : $(b).children("dbfIdField").text(),
				showAllRegions : "true" === $(b).attr("backgroundVisible") || "true" === $(b).attr("backgroundNeighboursVisible"),
				defaultColor : parseInt($(b).attr("backgroundNeighbourColor")),
				color : parseInt($(b).children("color").text())
			};
			e.push(c)
		});
		e.length && (f.layers =
				e);
		var d = [];
		$(a).find("subMaps > subMap").each(function (a, f) {
			d.push(b(f, c))
		});
		d.length && (f.subMaps = d, f.subMapsSettings = {
				width : c.subMapsWidth || "auto",
				height : c.subMapsHeight || "auto",
				orientation : c.subMapsOrientation,
				verticalAlign : c.subMapsVerticalPosition,
				horizontalAlign : c.subMapsHorizontalPosition
			});
		return f
	}
	function a(a) {
		if (!a || "null" === a || "undefined" === a)
			return null;
		var b = this._config ? this._config.dataSources[a || this._activeMapSourceName] : null;
		if (!b)
			return this._config && a && gav.Notifier && gav.Notifier.notify("Could not find map identifier <b><em>" +
				a + "</em></b> in current configuration", {
				type : "warning",
				life : 1E4,
				header : ""
			}), null;
		var e = b.maps[0],
		d = this._baseURL;
		this._includeConfigMapLocationInPath && (d += b.mapsLocation);
		/\/$/.test(d) || (d += "/");
		b = new gav.data.MapSource;
		b.setName(this._activeDataSetSource);
		switch (e.projection || "unit") {
		case "mercator":
			b.setProjection(new gav.components.map.MercatorProjection);
			break;
		default:
			b.setProjection(new gav.components.map.UnitProjection)
		}
		for (var o = e.layers, n = !1, a = !1, p = 0; p < o.length; p++)
			"label" === o[p].type ? n = !0 :
				"flow" === o[p].type ? a = !0 : f(o[p], b, d, this._mapGeometryProvider);
		o = new gav.components.map.SelectionLayer;
		o.setName("mainSelectionLayer");
		b.addLayer(o);
		var r = [];
		if (e.subMaps && e.subMaps.length) {
			for (var o = e.subMaps[v], v = 0; v < e.subMaps.length; v++) {
				var o = e.subMaps[v],
				t = new gav.data.MapSource;
				t.setName(o.name);
				t.excludeFromReferenceScale = o.excludeFromReferenceScale;
				"mercator" === o.projection ? t.setProjection(new gav.components.map.MercatorProjection) : t.setProjection(new gav.components.map.UnitProjection);
				o = o.layers;
				for (p = 0; p < o.length; p++)
					f(o[p], t, d, this._mapGeometryProvider);
				o = new gav.components.map.SelectionLayer;
				o.setName("mainSelectionLayer");
				t.addLayer(o);
				r.push(t)
			}
			b.setSubMapsSources(r);
			b.setSubMapsSettings(e.subMapsSettings)
		}
		e.backgroundMap && !0 === e.backgroundMap.enabled && (v = new gav.components.map.backgroundMap.OpenLayers, v.setVisible(!1), b.setBackgroundMap(v), v.setBackgroundMapType(e.backgroundMap.type || "OpenStreetMap"), b.setBackgroundColor(e.backgroundColor));
		e = new gav.data.MapCenterPointProvider;
		e.setGeometry(b.getMapGeometry());
		this._mapSourceWatchers.push(gav.utils.Binding.bindProperty(e, "recordInformationArray", this, "context.dataSet.recordInformation"));
		b.addEventListener("geometryChanged", function (a) {
			return function () {
				a.setGeometry(this.getMapGeometry())
			}
		}
			(e));
		n && (n = new gav.components.map.MonoPositionGlyphLayer("labelLayer"), v = new gav.glyphs.TextGlyphFactory, n.setGlyphFactory(v), n.setGlyphInfoProvider(e), b.addLayer(n));
		a && (a = new gav.components.map.SelectionLayer, a.setName("sourceSelectionLayer"), b.addLayer(a), n = new gav.representation.SelectionManager,
			a.setSelectionList(n), a.setStrokeColor("#FFFF00"), a = new gav.components.map.SelectionLayer, a.setName("destinationSelectionLayer"), b.addLayer(a), n = new gav.representation.SelectionManager, a.setSelectionList(n), a.setStrokeColor("#FF00FF"), c.call(this, b, "topHubInLayer", "#0000FF", 0), c.call(this, b, "topHubOutLayer", "#006600", 1), a = new gav.components.map.BiPositionGlyphLayer("flowLayer"), n = new gav.glyphs.DynamicCurveArrowGlyphFactory, a.setGlyphFactory(n), n = new gav.data.BiPositionGlyphInfoProvider, n.setPositionProvider(e),
			a.setGlyphInfoProvider(n), b.addLayer(a), n = new gav.representation.SelectionManager, a.setSelectionList(n));
		a = new gav.components.map.MonoPositionGlyphLayer("pieGlyphLayer");
		n = new gav.glyphs.PieChartGlyphFactory;
		n.setVisibleAttributes([1, 2, 3]);
		a.setGlyphFactory(n);
		a.setVisible(!1);
		a.setGlyphInfoProvider(e);
		b.addLayer(a);
		return b
	}
	function c(a, b, c, f) {
		var e = new gav.components.map.MonoPositionGlyphLayer;
		e.setName(b);
		e.setVisible(!1);
		b = new gav.glyphs.DynamicCircleGlyphFactory;
		b.setFillColor(c);
		b.setEnableSelection(!1);
		b.setUseExplitictDataSet(!0);
		b.setSizeAttribute(f);
		e.setGlyphFactory(b);
		e.setTooltipAttributes([f]);
		c = new gav.data.MapCenterPointProvider;
		c.setGeometry(a.getMapGeometry());
		a.addEventListener("geometryChanged", function (a) {
			return function () {
				a.setGeometry(this.getMapGeometry())
			}
		}
			(c));
		c.setUseExplicitRecordInfo(!0);
		e.setGlyphInfoProvider(c);
		a.addLayer(e)
	}
	function f(a, b, c, f) {
		var e,
		d = !1;
		if ("object" === typeof a) {
			switch (a.type) {
			case "polygon":
				(e = new gav.components.map.PolygonLayer) && e.setShowAllRegions && e.setShowAllRegions(!0 ===
					a.showAllRegions);
				e && e.setDefaultColor && e.setDefaultColor(a.defaultColor);
				b.addLayer(e);
				break;
			case "border":
				e = new gav.components.map.BorderLayer;
				b.addLayer(e);
				break;
			case "fill":
				e = new gav.components.map.StaticPolygonLayer;
				e.setDefaultColor(a.color);
				b.addLayer(e);
				break;
			case "main":
				(e = new gav.components.map.PolygonLayer) && e.setShowAllRegions && e.setShowAllRegions(!0 === a.showAllRegions);
				e && e.setDefaultColor && e.setDefaultColor(a.defaultColor);
				e.setName("mainPolygonLayer");
				b.addLayer(e);
				e = new gav.components.map.BorderLayer;
				e.setName("mainBorderLayer");
				e.setAlpha(0.2);
				b.addLayer(e);
				d = !0;
				break;
			default:
				e = null
			}
			!d && e ? (!1 === a.visible && e.setVisible(!1), !isNaN(a.opacity) && e.setAlpha(a.opacity), a.filename && e.setGeometry && f.getMapGeometry(e, c + a.filename + ".kml", null, a.idProperty)) : d && a.filename && f.getMapGeometry(b, c + a.filename + ".kml", null, a.idProperty)
		}
	}
	var e;
	gav.Klass("gav.data.ResourceProvider", {
		extend : gav.Invalidatable,
		implement : gav.snapshot.IStorable,
		init : function () {
			gav.Invalidatable.prototype.init.call(this);
			this._config =
				null;
			this._baseURL = "";
			this._mapGeometryProvider = new gav.data.MapGeometryProvider;
			this._activeMapSource = this._activeMapSourceName = null;
			var a = this;
			gav.utils.Binding.bindSetter(function (b) {
				b && a.setActiveMapSourceName(b)
			}, this, "context.dataSet.mapName");
			this._mapSourceWatchers = []
		},
		getSnapshotType : function () {
			return gav.snapshot.SnapshotManager.type.RESOURCE
		},
		state : function () {
			var a = this;
			return {
				dataSource : {
					"@name" : {
						get : function () {
							return a.getActiveMapSourceName()
						},
						set : function (b) {
							a.setActiveMapSourceName(b)
						}
					}
				}
			}
		},
		setContext : function (a) {
			this._context = a
		},
		getContext : function () {
			return this._context
		},
		setConfig : function (a) {
			this._config = a;
			this._configChanged = !0;
			this.invalidate()
		},
		getConfig : function () {
			return this._config
		},
		setBaseURL : function (a, b) {
			this._baseURL = a;
			this._includeConfigMapLocationInPath = b
		},
		getBaseURL : function () {
			return this._baseURL
		},
		setConfigFile : function (a) {
			e || (e = new gav.data.provider.XMLProvider);
			var b = this;
			e.loadXML(a, function (a) {
				b.setConfig(d(a));
				b.dispatchEvent("activeMapSourceNameChanged")
			})
		},
		getActiveMapSource : function () {
			return this._activeMapSource
		},
		setActiveMapSourceName : function (a) {
			if (this._activeMapSourceName === a)
				return this;
			this._activeMapSourceNameChanged = !0;
			this._activeMapSourceName = a;
			this.invalidate();
			return this
		},
		getActiveMapSourceName : function () {
			return this._activeMapSourceName
		},
		createMapSource : function (b) {
			return a.call(this, b)
		},
		_update : function () {
			this._configChanged && (this._configChanged = !1)
		}
	})
})();
(function () {
	function d() {
		for (var c, f = 0; f < this._pendingContainers.length; f++)
			if (this._pendingContainers[f] && (c = a.call(this, this._pendingContainers[f].filename)))
				b(this._pendingContainers[f].container, c), this._pendingContainers.splice(f, 1)
	}
	function b(a, b) {
		a._isWaitingForGeometry = !1;
		a.setMapGeometry ? a.setMapGeometry(b) : a.setGeometry && a.setGeometry(b)
	}
	function a(a) {
		for (var b, c = this._maps.length, f = 0; f < c; f++)
			if (b = this._maps[f], b.__sourceFile === a)
				return b;
		return null
	}
	function c(a, b, c) {
		f || (f = new gav.data.provider.KMLMapProvider);
		var m = this;
		e.push(a);
		f.loadMapFile({
			url : a,
			idProperty : c
		}, function (a, b) {
			return function (c) {
				var f = e.indexOf(a);
				0 <= f && e.splice(f, 1);
				c = new gav.data.MapGeometry(c);
				c.__sourceFile = a;
				c.__projection = b;
				m._maps.push(c);
				d.call(m)
			}
		}
			(a, b), function (a) {
			return function () {
				var b = e.indexOf(a);
				0 <= b && e.splice(b, 1);
				for (b = 0; b < m._pendingContainers.length; b++)
					m._pendingContainers[b].filename === a && m._pendingContainers[b].container.dispatchEvent && m._pendingContainers[b].container.dispatchEvent("geometryLoadingFail")
			}
		}
			(a))
	}
	gav.Klass("gav.data.MapGeometryProvider", {
		extend : gav.Invalidatable,
		init : function () {
			gav.Invalidatable.prototype.init.call(this);
			this._maps = [];
			this._pendingContainers = []
		},
		getMapGeometry : function (f, e, d, m) {
			var d = "function" == typeof d ? d.constructor : d,
			o = a.call(this, e);
			if (o)
				b(f, o);
			else {
				var o = this._pendingContainers.length,
				n = !1;
				for (i = 0; i < o; i++)
					if (this._pendingContainers[i].container === f) {
						this._pendingContainers[i].filename = e;
						n = !0;
						break
					}
				n || (f.dispatchEvent && f.dispatchEvent("geometryLoadingInitiated"), this._pendingContainers.push({
						container : f,
						filename : e
					}));
				c.apply(this, [e, d, m])
			}
		},
		_update : function () {}

	});
	var f,
	e = []
})();
(function (d) {
	function b(a, b) {
		var e;
		e = gav.locale.getLang() ? gav.locale.getLanguageParts() : gav.locale.getLanguageParts(b.defaultLang);
		var d = a;
		b.lang && (d = d.replace(b.lang, e.language));
		b.region && (d = d.replace(b.region, e.region.toLowerCase()));
		b.REGION && (d = d.replace(b.REGION, e.region));
		b.script && (d = d.replace(b.script, e.script));
		return d
	}
	function a(a, b, e, d, j) {
		for (var k = this._dsm || new gav.data.DataSetMerger, m = [], o = 0; o < a.length; o++)
			try {
				var n = gav.data.provider.UnicodeTextDataProvider.createDataSet(a[o]);
				m.push(n)
			} catch (p) {}

		k.addEventListener("dataSetChanged",
			function () {
			if ((this._dataSet = k.getDataSet()) && j) {
				var a = this._dataSet,
				c = a.getRecordInformation().length,
				e = a.getIndicatorInformation().length,
				d = a.getSliceInformation().length,
				g;
				if (1 < d) {
					var m = a.getDataCube() ? a.getDataCube() : null;
					g = new gav.data.DataCube({
							records : c,
							attributes : e,
							slices : 1,
							fillWithValue : NaN
						});
					for (var n, o = 0; o < c; o++)
						for (var p = 0; p < e; p++)
							for (var y = d - 1; 0 <= y; y--)
								if (n = m.getValue(o, p, y), !isNaN(n)) {
									g.setValue(o, p, 0, n);
									break
								}
					g.calculateSupportingData()
				} else
					g = a.getDataCube();
				c = new gav.data.DataSet(g,
						a.getIndicatorInformation());
				c.setSliceInformation([new gav.data.SheetInformation("default")]);
				c.setRecordInformation(a.getRecordInformation());
				if (e = a.getClassCube()) {
					d = e.getNumRecords();
					g = e.getNumAttributes();
					m = e.getNumSlices();
					if (1 < m) {
						for (var A = gav.utils.ArrayHelper.createArray3D(1, d, g), o = 0; o < d; o++)
							for (p = 0; p < g; p++)
								for (y = m - 1; 0 <= y; y--)
									if (n = e.getValue(o, p, y), "undefined" != typeof n) {
										A[0][o][p] = n;
										break
									}
						n = gav.data.ClassCube.createWithArray(A, e.getCategoricalIndicatorNames())
					} else
						n = a.getClassCube();
					c.setCategoricalIndicatorInformation(a.getCategoricalIndicatorInformation());
					c.setClassCube(n)
				}
				this._dataSet = c
			}
			this._dataSet && this._dataSet.setMapName(b);
			this.dispatchEvent("dataSetChanged", [this._dataSet])
		}, this);
		k.setIncludedIndicatorIds(e);
		k.setIncludedSliceIds(d);
		k.setInput(m);
		k.validateNow()
	}
	gav.Klass("gav.data.provider.URLDataProvider", {
		extend : gav.events.EventDispatcher,
		implement : [gav.snapshot.ISnapshotReader, gav.snapshot.IPhaseBlocker],
		init : function () {
			gav.events.EventDispatcher.prototype.init.call(this);
			this._dsm = new gav.data.DataSetMerger;
			this._dataSet = null;
			this._loading =
				!1;
			this._xml = null;
			gav.locale.addEventListener("languageChanged", function () {
				this.read(this._xml)
			}, this)
		},
		read : function (c) {
			if (!this._loading && (this._xml = c)) {
				var f = this,
				e = d(c).children("referenceData"),
				g = e.attr("defaultLangCode"),
				j = e.attr("region"),
				k = e.attr("regionUpper"),
				m = e.attr("language"),
				o = [];
				e.children("url[type='txt']").each(function (a, c) {
					o.push(b(d(c).text(), {
							region : j,
							REGION : k,
							lang : m,
							defaultLang : g
						}))
				});
				var e = d(c).children("dataSetManager"),
				n = e.attr("mapName"),
				p = [];
				e.children("indicator").each(function (a,
						b) {
					p.push(b.getAttribute("id"))
				});
				var r = [],
				v = parseInt(e.children("timeMode").attr("mode"));
				if (2 === v || 3 === v) {
					var c = e.children("timeMode").attr("start"),
					e = e.children("timeMode").attr("end"),
					t = parseInt(c),
					u = parseInt(e);
					if (!isNaN(t) && !isNaN(u) && isFinite(t) && isFinite(u) && t <= u)
						for (; t <= u; )
							r.push(t.toString()), t++;
					else
						r = [c, e]
				}
				this._loading = !0;
				this.dispatchEvent("waitForMe");
				gav.utils.Ajax.load({
					url : o,
					always : function (b) {
						a.apply(f, [b, n, p, r, 1 === v]);
						f._loading = !1;
						f.dispatchEvent("ready")
					}
				})
			}
		},
		getPhase : function () {
			return gav.snapshot.SnapshotManager.phase.DATA
		},
		getSnapshotReaders : function () {
			return [this]
		},
		getSnapshotSite : function () {
			return {}

		},
		getDataSet : function () {
			return this._dataSet
		},
		load : function (b, f) {
			if (!this._loading) {
				var e = this;
				this._loading = !0;
				gav.utils.Ajax.load({
					url : URLs,
					always : function (b) {
						a.apply(e, [b, mapName, indicatorIDs, timeIDs, 1 === timeMode]);
						e._loading = !1;
						"function" == typeof f && f(e._dataSet)
					}
				})
			}
		}
	});
	gav.test = b
})(jQuery);
(function () {
	gav.Klass("gav.data.provider.AjaxFileProvider", {
		extend : gav.events.EventDispatcher,
		init : function () {
			gav.events.EventDispatcher.prototype.init.call(this)
		},
		loadFile : function (d, b, a, c) {
			gav.utils.Ajax.load({
				url : d,
				type : b.type,
				success : a,
				fail : c
			})
		}
	})
})();
gav.Klass("gav.data.provider.XMLProvider", {
	extend : gav.data.provider.AjaxFileProvider,
	init : function () {
		gav.events.EventDispatcher.prototype.init.call(this)
	},
	loadXML : function (d, b) {
		gav.data.provider.AjaxFileProvider.prototype.loadFile.apply(this, [d, {
					dataType : "xml",
					type : "GET"
				}, b])
	}
});
(function () {
	gav.Klass("gav.data.provider.UnicodeFormatReader", {
		extend : gav.events.EventDispatcher,
		init : function () {
			gav.events.EventDispatcher.prototype.init.call(this);
			this.sheetArray = []
		},
		processData : function () {
			var d = this.sheetArray[0],
			b = d ? d.length : 0,
			a,
			c = !0,
			f = 0;
			this._metaTextToRowIndexMapping = {};
			for (this._numOfMetaRows = 0; this._numOfMetaRows < b && c; )
				a = d[this._numOfMetaRows], a = void 0 !== a && 0 < a.length && void 0 !== a[0] ? a[0].toString().toUpperCase() : void 0, void 0 === a || "" === a ? c = !1 : (this._metaTextToRowIndexMapping[a] =
							f, f += 1, this._numOfMetaRows += 1);
			void 0 != this._metaTextToRowIndexMapping.SHEET && (this._metaTextToRowIndexMapping.SHEET = this._metaTextToRowIndexMapping.SHEET);
			void 0 != this._metaTextToRowIndexMapping.SLICE && (this._metaTextToRowIndexMapping.SHEET = this._metaTextToRowIndexMapping.SLICE);
			void 0 != this._metaTextToRowIndexMapping.CAPTURED && (this._metaTextToRowIndexMapping.SHEET = this._metaTextToRowIndexMapping.CAPTURED);
			void 0 != this._metaTextToRowIndexMapping.TIMESTEP && (this._metaTextToRowIndexMapping.SHEET =
					this._metaTextToRowIndexMapping.TIMESTEP);
			var d = this.sheetArray[0],
			e,
			g,
			j,
			k;
			this._numOfMetaColumns = 2;
			void 0 !== this._metaTextToRowIndexMapping.PARSETYPE && (b = d[this._metaTextToRowIndexMapping.PARSETYPE], e = void 0 !== b[2] ? b[2].toString().toUpperCase() : void 0);
			void 0 !== this._metaTextToRowIndexMapping.UNIT && (b = d[this._metaTextToRowIndexMapping.UNIT], g = void 0 !== b[2] ? b[2].toString().toUpperCase() : void 0);
			void 0 !== this._metaTextToRowIndexMapping.PRECISION && (b = d[this._metaTextToRowIndexMapping.PRECISION], j = void 0 !==
					b[2] ? b[2].toString().toUpperCase() : void 0);
			void 0 !== this._metaTextToRowIndexMapping.SHEET && (b = d[this._metaTextToRowIndexMapping.SHEET], k = void 0 !== b[2] ? b[2].toString().toUpperCase() : void 0);
			"S" === e && gav.data.DataAnalysisHelper.isEmptyOrNaNString(g) && gav.data.DataAnalysisHelper.isEmptyOrNaNString(j) && gav.data.DataAnalysisHelper.isEmptyOrNaNString(k) && (this._numOfMetaColumns = 3);
			g = this.sheetArray[0];
			e = gav.utils.ArrayHelper.getRowLength(g[this._metaTextToRowIndexMapping.META]);
			this._sliceNameToSliceIndexMapping = {};
			if (void 0 !== this._metaTextToRowIndexMapping.SHEET) {
				this._sliceNameRow = g[this._metaTextToRowIndexMapping.SHEET];
				this._sliceNames = [];
				g = gav.utils.ArrayHelper.getRowLength(this._sliceNameRow);
				if (g < e)
					for (j = this._numOfMetaColumns; j < e; j++)
						this._sliceNameRow[j] = "NA";
				for (j = this._numOfMetaColumns; j < e; j++)
					g = this._sliceNameRow[j], "" === g || "-" == g || "NA" == g.toUpperCase() ? this._sliceNameRow[j] = "NA" : void 0 === this._sliceNameToSliceIndexMapping[g] && (this._sliceNameToSliceIndexMapping[g] = 1, this._sliceNames.push(g));
				e > this._numOfMetaColumns && 0 == this._sliceNames.length && (this._sliceNames = ["NA"]);
				this._numOfSlices = this._sliceNames.length;
				for (j = 0; j < this._numOfSlices; j++)
					this._sliceNameToSliceIndexMapping[this._sliceNames[j]] = j;
				this._sliceNameToSliceIndexMapping.NA = 0
			} else {
				this._sliceNameRow = Array(e);
				for (j = 1; j < e; j++)
					this._sliceNameRow[j] = "NA";
				this._sliceNameRow[0] = "TIMESTEP";
				this._sliceNames = ["NA"];
				this._sliceNameToSliceIndexMapping.NA = 0;
				this._numOfSlices = this._sliceNames.length
			}
			g = this.sheetArray[0];
			e = Array(this._numOfSlices);
			for (j = 0; j < this._numOfSlices; j++)
				e[j] = [];
			this._attributeNameRow = g[this._metaTextToRowIndexMapping.META];
			this._attributeNameRowLength = gav.utils.ArrayHelper.getRowLength(this._attributeNameRow);
			for (j = this._numOfMetaColumns; j < this._attributeNameRowLength; j++)
				g = this._attributeNameRow[j], k = this._sliceNameRow[j], k = this._sliceNameToSliceIndexMapping[k], k = e[k], k.push(g);
			this._attributeNames = gav.utils.ArrayHelper.mergeOrderedArrays(e);
			this._attributeNameToAttributeInfoMapping = {};
			this._numOfAllAttributes = this._attributeNames.length;
			for (g = 0; g < this._numOfAllAttributes; g++)
				e = Array(8), e[0] = g, e[6] = [], this._attributeNameToAttributeInfoMapping[this._attributeNames[g]] = e;
			this._columnIndexToSliceIndexMapping = Array(this._attributeNameRowLength);
			for (j = this._numOfMetaColumns; j < this._attributeNameRowLength; j++)
				k = this._sliceNameRow[j], this._columnIndexToSliceIndexMapping[j] = this._sliceNameToSliceIndexMapping[k];
			j = this.sheetArray[0];
			c = / /g;
			f = /"/g;
			if (void 0 !== this._metaTextToRowIndexMapping.PARSETYPE) {
				k = j[this._metaTextToRowIndexMapping.PARSETYPE];
				d = Math.min(this._attributeNameRowLength, gav.utils.ArrayHelper.getRowLength(k));
				for (e = this._numOfMetaColumns; e < d; e++)
					b = void 0 !== k[e] ? k[e].toString().toUpperCase() : "", g = this._attributeNameRow[e], g = this._attributeNameToAttributeInfoMapping[g], g[1] = gav.data.DataAnalysisHelper.determineDataTypeValueOfDataTypeString(b)
			}
			if (void 0 !== this._metaTextToRowIndexMapping.ID) {
				k = j[this._metaTextToRowIndexMapping.ID];
				d = Math.min(this._attributeNameRowLength, gav.utils.ArrayHelper.getRowLength(k));
				for (e = this._numOfMetaColumns; e <
					d; e++)
					b = void 0 !== k[e] ? k[e].toString() : void 0, b = b.replace(c, "_"), g = this._attributeNameRow[e], g = this._attributeNameToAttributeInfoMapping[g], g[2] = b
			}
			if (void 0 !== this._metaTextToRowIndexMapping.DESCRIPTION) {
				k = j[this._metaTextToRowIndexMapping.DESCRIPTION];
				d = Math.min(this._attributeNameRowLength, gav.utils.ArrayHelper.getRowLength(k));
				for (e = this._numOfMetaColumns; e < d; e++)
					b = void 0 !== k[e] ? k[e].toString() : void 0, g = this._attributeNameRow[e], g = this._attributeNameToAttributeInfoMapping[g], g[3] = b
			}
			if (void 0 !==
				this._metaTextToRowIndexMapping.UNIT) {
				k = j[this._metaTextToRowIndexMapping.UNIT];
				d = Math.min(this._attributeNameRowLength, gav.utils.ArrayHelper.getRowLength(k));
				for (e = this._numOfMetaColumns; e < d; e++)
					b = void 0 !== k[e] ? k[e].toString() : void 0, g = this._attributeNameRow[e], g = this._attributeNameToAttributeInfoMapping[g], g[4] = b
			}
			if (void 0 !== this._metaTextToRowIndexMapping.PRECISION) {
				k = j[this._metaTextToRowIndexMapping.PRECISION];
				d = Math.min(this._attributeNameRowLength, gav.utils.ArrayHelper.getRowLength(k));
				for (e =
						this._numOfMetaColumns; e < d; e++)
					g = this._attributeNameRow[e], g = this._attributeNameToAttributeInfoMapping[g], g[5] = k[e]
			}
			if (void 0 !== this._metaTextToRowIndexMapping.SHEET) {
				d = Math.min(this._attributeNameRowLength, gav.utils.ArrayHelper.getRowLength(this._sliceNameRow));
				for (e = this._numOfMetaColumns; e < d; e++)
					g = this._attributeNameRow[e], g = this._attributeNameToAttributeInfoMapping[g], g[6].push(this._sliceNameRow[e])
			} else
				for (e = 0; e < this._numOfAllAttributes; e++)
					g = this._attributeNames[e], g = this._attributeNameToAttributeInfoMapping[g],
					2 == g[1] ? g[6].push("NA") : g[6].push("0");
			if (void 0 !== this._metaTextToRowIndexMapping.CATEGORIES) {
				k = j[this._metaTextToRowIndexMapping.CATEGORIES];
				d = Math.min(this._attributeNameRowLength, gav.utils.ArrayHelper.getRowLength(k));
				for (e = this._numOfMetaColumns; e < d; e++)
					b = void 0 !== k[e] ? k[e].toString() : "", b = b.replace(f, ""), g = this._attributeNameRow[e], g = this._attributeNameToAttributeInfoMapping[g], g[7] = b
			}
			if (void 0 !== this._metaTextToRowIndexMapping.FLAGS) {
				k = j[this._metaTextToRowIndexMapping.FLAGS];
				d = Math.min(this._attributeNameRowLength,
						gav.utils.ArrayHelper.getRowLength(k));
				for (e = this._numOfMetaColumns; e < d; e++)
					g = this._attributeNameRow[e], g = this._attributeNameToAttributeInfoMapping[g], void 0 != k[e] && "" != k[e] && (g[8] = k[e])
			}
			this._attributeDataTypes = Array(this._numOfAllAttributes);
			this._numericAttributeGlobalIndices = [];
			this._numericAttributeIds = [];
			this._numericAttributeNames = [];
			this._numericAttributeDescriptions = [];
			this._numericAttributeUnits = [];
			this._numericAttributePrecisions = [];
			this._stringAttributeGlobalIndices = [];
			this._stringAttributeNames =
				[];
			this._stringAttributeUnits = [];
			this.categoricalAttributeGlobalIndices = [];
			this._categoricalAttributeNames = [];
			this._categoricalAttributeUnits = [];
			this._sliceNamesOfNumericAttributes = [];
			this._sliceNamesOfStringAttributes = [];
			this._sliceNamesOfCategoricalAttributes = [];
			this._categoricalAttributeOrderedCategories = [];
			this._numericAttributeFlagsDescriptions = [];
			for (e = 0; e < this._numOfAllAttributes; e++)
				g = this._attributeNameToAttributeInfoMapping[this._attributeNames[e]], g[6].sort(), this._attributeDataTypes[e] =
					g[1], 0 === g[1] ? (this._stringAttributeGlobalIndices.push(e), this._stringAttributeNames.push(this._attributeNames[e]), this._stringAttributeUnits.push(g[4]), this._sliceNamesOfStringAttributes.push(g[6])) : 1 === g[1] ? (this._numericAttributeGlobalIndices.push(e), this._numericAttributeIds.push(g[2]), this._numericAttributeNames.push(this._attributeNames[e]), this._numericAttributeDescriptions.push(g[3]), this._numericAttributeUnits.push(g[4]), this._numericAttributePrecisions.push(g[5]), this._sliceNamesOfNumericAttributes.push(g[6]),
					this._numericAttributeFlagsDescriptions.push(g[8])) : 2 === g[1] && (this.categoricalAttributeGlobalIndices.push(e), this._categoricalAttributeNames.push(this._attributeNames[e]), this._categoricalAttributeUnits.push(g[4]), this._sliceNamesOfCategoricalAttributes.push(g[6]), g[7] && 0 < g[7].length && this._categoricalAttributeOrderedCategories.push(g[7].split(";")));
			this._numOfNumericAttributes = this._numericAttributeGlobalIndices.length;
			this._numOfStringAttributes = this._stringAttributeGlobalIndices.length;
			this._numOfCategoricalAttributes =
				this.categoricalAttributeGlobalIndices.length;
			this._columnIndicesOfNumericData = [];
			this._columnIndicesOfStringData = [];
			this._columnIndicesOfCategoricalData = [];
			this._slideIndicesOfAllCategoricalAttributes = [];
			this._slideIndicesOfCategoricalAttributes = Array(this._numOfCategoricalAttributes);
			this._constantStatusOfCategoricalAttributes = Array(this._numOfCategoricalAttributes);
			this._columnIndexToAttributeIndexMapping = Array(this._attributeNameRowLength);
			for (e = 0; e < this._numOfCategoricalAttributes; e++)
				this._slideIndicesOfCategoricalAttributes[e] =
					[], this._constantStatusOfCategoricalAttributes[e] = 1 == this._sliceNamesOfCategoricalAttributes[e].length && "NA" == this._sliceNamesOfCategoricalAttributes[e][0] ? !0 : !1;
			for (e = this._numOfMetaColumns; e < this._attributeNameRowLength; e++)
				g = this._attributeNameRow[e], g = this._attributeNameToAttributeInfoMapping[g], 0 === g[1] ? (this._columnIndicesOfStringData.push(e), this._columnIndexToAttributeIndexMapping[e] = this._stringAttributeGlobalIndices.indexOf(g[0])) : 1 === g[1] ? (this._columnIndicesOfNumericData.push(e), this._columnIndexToAttributeIndexMapping[e] =
						this._numericAttributeGlobalIndices.indexOf(g[0])) : 2 === g[1] && (this._columnIndicesOfCategoricalData.push(e), j = this._columnIndexToSliceIndexMapping[e], -1 == this._slideIndicesOfAllCategoricalAttributes.indexOf(j) && this._slideIndicesOfAllCategoricalAttributes.push(j), g = this.categoricalAttributeGlobalIndices.indexOf(g[0]), this._columnIndexToAttributeIndexMapping[e] = g, -1 == this._slideIndicesOfCategoricalAttributes[g].indexOf(j) && this._slideIndicesOfCategoricalAttributes[g].push(j));
			e = this.sheetArray[0];
			g =
				gav.utils.ArrayHelper.getNumRowsOfSheet(e);
			var m;
			this._numOfRecords = g - this._numOfMetaRows;
			this._recordInfoArray = Array(this._numOfRecords);
			this._flagsList = [];
			this._categoricalData = this._stringData = this._numericData = void 0;
			0 < this._numOfNumericAttributes && (this._numericData = gav.utils.ArrayHelper.createArray3DWithValue(this._numOfSlices, this._numOfRecords, this._numOfNumericAttributes, NaN));
			0 < this._numOfStringAttributes && (this._stringData = gav.utils.ArrayHelper.createArray3D(this._numOfSlices, this._numOfRecords,
						this._numOfStringAttributes));
			0 < this._numOfCategoricalAttributes && (1 < this._numOfSlices && 1 == this._slideIndicesOfAllCategoricalAttributes.length ? (j = gav.utils.ArrayHelper.createArray2DWithValue(this._numOfRecords, this._numOfCategoricalAttributes, ""), this._categoricalData = gav.utils.ArrayHelper.createArrayWithValue(this._numOfSlices, j)) : this._categoricalData = gav.utils.ArrayHelper.createArray3DWithValue(this._numOfSlices, this._numOfRecords, this._numOfCategoricalAttributes, ""));
			if (void 0 == this._metaTextToRowIndexMapping.FLAGS) {
				if (2 ===
					this._numOfMetaColumns)
					for (d = this._numOfMetaRows; d < g; d++) {
						b = d - this._numOfMetaRows;
						k = e[d];
						j = void 0 !== k[1] ? k[1].toString() : "";
						this._recordInfoArray[b] = [j, j];
						m = this._columnIndicesOfNumericData.length;
						for (j = 0; j < m; j++)
							c = this._columnIndicesOfNumericData[j], f = this._columnIndexToSliceIndexMapping[c], this._numericData[f][b][this._columnIndexToAttributeIndexMapping[c]] = void 0 !== k[c] && "" !== k[c].toString() ? Number(k[c]) : NaN;
						a = this._columnIndicesOfStringData.length;
						for (j = 0; j < a; j++)
							c = this._columnIndicesOfStringData[j],
							f = this._columnIndexToSliceIndexMapping[c], this._stringData[f][b][this._columnIndexToAttributeIndexMapping[c]] = k[c];
						a = this._columnIndicesOfCategoricalData.length;
						for (j = 0; j < a; j++)
							c = this._columnIndicesOfCategoricalData[j], f = this._columnIndexToSliceIndexMapping[c], this._categoricalData[f][b][this._columnIndexToAttributeIndexMapping[c]] = k[c]
					}
				if (3 === this._numOfMetaColumns)
					for (d = this._numOfMetaRows; d < g; d++) {
						b = d - this._numOfMetaRows;
						k = e[d];
						j = void 0 !== k[1] ? k[1].toString() : "";
						c = void 0 !== k[2] ? k[2].toString() :
							"";
						this._recordInfoArray[b] = [j, c];
						m = this._columnIndicesOfNumericData.length;
						for (j = 0; j < m; j++)
							c = this._columnIndicesOfNumericData[j], f = this._columnIndexToSliceIndexMapping[c], this._numericData[f][b][this._columnIndexToAttributeIndexMapping[c]] = void 0 !== k[c] && "" !== k[c].toString() ? Number(k[c]) : NaN;
						a = this._columnIndicesOfStringData.length;
						for (j = 0; j < a; j++)
							c = this._columnIndicesOfStringData[j], f = this._columnIndexToSliceIndexMapping[c], this._stringData[f][b][this._columnIndexToAttributeIndexMapping[c]] = k[c];
						a = this._columnIndicesOfCategoricalData.length;
						for (j = 0; j < a; j++)
							c = this._columnIndicesOfCategoricalData[j], f = this._columnIndexToSliceIndexMapping[c], this._categoricalData[f][b][this._columnIndexToAttributeIndexMapping[c]] = k[c]
					}
			} else {
				if (2 === this._numOfMetaColumns)
					for (d = this._numOfMetaRows; d < g; d++) {
						b = d - this._numOfMetaRows;
						k = e[d];
						j = void 0 !== k[1] ? k[1].toString() : "";
						this._recordInfoArray[b] = [j, j];
						m = this._columnIndicesOfNumericData.length;
						for (j = 0; j < m; j++)
							c = this._columnIndicesOfNumericData[j], f = this._columnIndexToSliceIndexMapping[c],
							a = gav.utils.DataSetUtils.extractFlags(k[c], b, f, this._columnIndexToAttributeIndexMapping[c], this._flagsList), this._numericData[f][b][this._columnIndexToAttributeIndexMapping[c]] = void 0 !== a && "" != a ? Number(a) : NaN;
						a = this._columnIndicesOfStringData.length;
						for (j = 0; j < a; j++)
							c = this._columnIndicesOfStringData[j], f = this._columnIndexToSliceIndexMapping[c], this._stringData[f][b][this._columnIndexToAttributeIndexMapping[c]] = k[c];
						a = this._columnIndicesOfCategoricalData.length;
						for (j = 0; j < a; j++)
							c = this._columnIndicesOfCategoricalData[j],
							f = this._columnIndexToSliceIndexMapping[c], this._categoricalData[f][b][this._columnIndexToAttributeIndexMapping[c]] = k[c]
					}
				if (3 === this._numOfMetaColumns)
					for (d = this._numOfMetaRows; d < g; d++) {
						b = d - this._numOfMetaRows;
						k = e[d];
						j = void 0 !== k[1] ? k[1].toString() : "";
						c = void 0 !== k[2] ? k[2].toString() : "";
						this._recordInfoArray[b] = [j, c];
						m = this._columnIndicesOfNumericData.length;
						for (j = 0; j < m; j++)
							c = this._columnIndicesOfNumericData[j], f = this._columnIndexToSliceIndexMapping[c], a = gav.utils.DataSetUtils.extractFlags(k[c], b, f,
									this._columnIndexToAttributeIndexMapping[c], this._flagsList), this._numericData[f][b][this._columnIndexToAttributeIndexMapping[c]] = void 0 !== a && "" != a ? Number(a) : NaN;
						a = this._columnIndicesOfStringData.length;
						for (j = 0; j < a; j++)
							c = this._columnIndicesOfStringData[j], f = this._columnIndexToSliceIndexMapping[c], this._stringData[f][b][this._columnIndexToAttributeIndexMapping[c]] = k[c];
						a = this._columnIndicesOfCategoricalData.length;
						for (j = 0; j < a; j++)
							c = this._columnIndicesOfCategoricalData[j], f = this._columnIndexToSliceIndexMapping[c],
							this._categoricalData[f][b][this._columnIndexToAttributeIndexMapping[c]] = k[c]
					}
			}
			if (1 < this._slideIndicesOfAllCategoricalAttributes.length)
				for (j = 0; j < this._numOfCategoricalAttributes; j++)
					if (!1 == this._constantStatusOfCategoricalAttributes[j] && 1 == this._slideIndicesOfCategoricalAttributes[j].length && 0 === this._slideIndicesOfCategoricalAttributes[j][0]) {
						e = j;
						k = g = void 0;
						for (g = 0; g < this._numOfRecords; g++)
							for (k = 1; k < this._numOfSlices; k++)
								this._categoricalData[k][g][e] = this._categoricalData[0][g][e]
					}
			this._numericData &&
			(this._dataCube = gav.data.DataCube.createWithArray(this._numericData));
			this._categoricalData && (this._classCube = gav.data.ClassCube.createWithArray(this._categoricalData, this._categoricalAttributeNames, this._categoricalAttributeOrderedCategories, this._constantStatusOfCategoricalAttributes))
		},
		getDataCube : function () {
			return this._dataCube
		},
		getClassCube : function () {
			return this._classCube
		},
		getNumOfRecords : function () {
			return this._numOfRecords
		},
		getNumOfSlices : function () {
			return this._numOfSlices
		},
		getNumOfNumericAttributes : function () {
			return this._numOfNumericAttributes
		},
		getNumOfStringAttributes : function () {
			return this._numOfStringAttributes
		},
		getNumOfCategoricalAttributes : function () {
			return this._numOfCategoricalAttributes
		},
		getNumericAttributeIds : function () {
			return this._numericAttributeIds
		},
		getNumericAttributeNames : function () {
			return this._numericAttributeNames
		},
		getSliceNamesOfNumericAttributes : function () {
			return this._sliceNamesOfNumericAttributes
		},
		getNumericAttributePrecisions : function () {
			return this._numericAttributePrecisions
		},
		getNumericAttributeUnits : function () {
			return this._numericAttributeUnits
		},
		getNumericAttributeDescriptions : function () {
			return this._numericAttributeDescriptions
		},
		getNumericAttributeFlagsDescriptions : function () {
			return this._numericAttributeFlagsDescriptions
		},
		getCategoricalAttributeNames : function () {
			return this._categoricalAttributeNames
		},
		getRecordInfoArray : function () {
			return this._recordInfoArray
		},
		getSliceNames : function () {
			return this._sliceNames
		},
		getFlagsList : function () {
			return this._flagsList
		},
		"@META" : "META",
		"@ID" : "ID",
		"@PARSETYPE" : "PARSETYPE",
		"@SHEET" : "SHEET",
		"@SLICE" : "SLICE",
		"@TIMESTEP" : "TIMESTEP",
		"@CAPTURED" : "CAPTURED",
		"@UNIT" : "UNIT",
		"@PRECISION" : "PRECISION",
		"@DESCRIPTION" : "DESCRIPTION",
		"@CATEGORIES" : "CATEGORIES",
		"@FLAGS" : "FLAGS"
	})
})();
(function () {
	gav.Klass("gav.data.provider.UnicodeFormatWriter", {
		extend : gav.events.EventDispatcher,
		init : function () {
			gav.events.EventDispatcher.prototype.init.call(this)
		},
		getDataSetAsFormattedText : function (d) {
			return 1 < d.getDataCube().getNumSlices() ? this.createTimeString(d) : this.createSingleYearString(d)
		},
		createTimeString : function (d) {
			for (var b = "", a = "", c = d.getIndicatorInformation(), f = d.getSliceInformation(), e = d.getRecordInformation(), d = d.getDataCube(), a = "META\tCODE\tName", g = 0; g < c.length; g++)
				for (var j = c[g].name,
					k = 0; k < f.length; k++)
					a += "\t" + j;
			b += a + "\r\n";
			a = "ID\tregID\tname";
			for (g = 0; g < c.length; g++) {
				j = c[g].id;
				for (k = 0; k < f.length; k++)
					a += "\t" + j
			}
			b += a + "\r\n";
			a = "DESCRIPTION\tRegional ID\tRegion Name";
			for (g = 0; g < c.length; g++) {
				(j = c[g].description) || (j = "");
				for (k = 0; k < f.length; k++)
					a += "\t" + j
			}
			b += a + "\r\n";
			a = "UNIT\tNA\tNA";
			for (g = 0; g < c.length; g++) {
				(j = c[g].unit) || (j = "");
				for (k = 0; k < f.length; k++)
					a += "\t" + j
			}
			b += a + "\r\n";
			a = "PARSETYPE\tS\tS";
			for (g = 0; g < c.length; g++)
				for (k = 0; k < f.length; k++)
					a += "\tF";
			b += a + "\r\n";
			a = "SHEET\tS\tNA";
			for (g = 0; g <
				c.length; g++)
				for (k = 0; k < f.length; k++)
					a += "\t" + f[k].id;
			b += a + "\r\n";
			a = "PRECISION\tNA\tNA";
			for (g = 0; g < c.length; g++) {
				(j = c[g].precision) || (j = "");
				for (k = 0; k < f.length; k++)
					a += "\t" + j
			}
			for (var b = b + (a + "\r\n"), c = 0, j = d.getNumAttributes(), m = 0; m < e.length; m++) {
				a = e[m];
				a = "\t" + a.id + "\t" + a.name;
				for (g = 0; g < j; g++)
					for (k = 0; k < f.length; k++)
						a += "\t" + d.getValue(c, g, k);
				a += "\r\n";
				b += a;
				c++
			}
			return b
		},
		createSingleYearString : function (d) {
			var b = "",
			a = "",
			c = d.getIndicatorInformation();
			d.getSliceInformation();
			for (var f = d.getRecordInformation(),
				d = d.getDataCube(), a = "META\tCODE\tName", e = 0; e < c.length; e++)
				a += "\t" + c[e].name;
			b += a + "\r\n";
			a = "ID\tregID\tname";
			for (e = 0; e < c.length; e++)
				a += "\t" + c[e].id;
			b += a + "\r\n";
			a = "DESCRIPTION\tRegional ID\tName";
			for (e = 0; e < c.length; e++) {
				var g = c[e].description;
				g || (g = "");
				a += "\t" + g
			}
			b += a + "\r\n";
			a = "UNIT\tNA\tNA";
			for (e = 0; e < c.length; e++)
				(g = c[e].unit) || (g = ""), a += "\t" + g;
			b += a + "\r\n";
			a = "TIMESTEP\tNA\tNA";
			for (e = 0; e < c.length; e++)
				(g = c[e].timePeriods[0]) || (g = ""), a += "\t" + g;
			b += a + "\r\n";
			a = "PARSETYPE\tS\tS";
			for (e = 0; e < c.length; e++)
				a +=
				"\tF";
			b += a + "\r\n";
			a = "PRECISION\tNA\tNA";
			for (e = 0; e < c.length; e++)
				(g = c[e].precision) || (g = ""), a += "\t" + g;
			for (var b = b + (a + "\r\n"), c = 0, g = d.getNumAttributes(), j = 0; j < f.length; j++) {
				a = f[j];
				a = "\t" + a.id + "\t" + a.name;
				for (e = 0; e < g; e++)
					a += "\t" + d.getValue(c, e, 0);
				a += "\r\n";
				b += a;
				c++
			}
			return b
		},
		getClassCubeDataAsUnicodeString : function (d) {
			var b = d.getClassCube(),
			a = "",
			c = "",
			f,
			e = b.getNumAttributes(),
			g = b.getNumRecords(),
			c = "META\tCODE\tName";
			for (f = 0; f < e; f++)
				c += "\t" + b.getCategoricalIndicatorName(f);
			a += c + "\r\n";
			c = "ID\tregID\tname";
			for (f = 0; f < e; f++)
				c += "\t" + b.getCategoricalIndicatorName(f);
			a += c + "\r\n";
			c = "PARSETYPE\tS\tS";
			for (f = 0; f < e; f++)
				c += "\tC";
			a += c + "\r\n";
			c = "CATEGORIES\tS\tS";
			for (f = 0; f < e; f++)
				c += "\t" + b.getOrderedCategoricalValues(f).join(";");
			var a = a + (c + "\r\n"),
			j = (d = d.getRecordInformation()) ? d.length : 0;
			for (f = 0; f < j && !(f >= g); f++) {
				for (var c = "\t" + d[f].id + "\t" + d[f].toString(), k = 0; k < e; k++)
					c += "\t" + b.getValue(f, k, 0);
				c += "\r\n";
				a += c
			}
			return a
		}
	})
})();
(function () {
	function d(a) {
		var a = -1 < a.indexOf("\r\n") ? a.split("\r\n") : a.split("\n"),
		b = a.length;
		"" === a[b - 1] && (a.pop(), b--);
		for (var f = 0; f < b; f++)
			a[f] = a[f].split("\t");
		return [a]
	}
	function b(a) {
		var b = a.getNumOfRecords(),
		f = a.getNumOfSlices(),
		e = a.getNumOfNumericAttributes(),
		d = a.getNumOfCategoricalAttributes(),
		j = a.getNumericAttributeIds(),
		k = a.getNumericAttributeNames(),
		m = a.getSliceNamesOfNumericAttributes(),
		o = a.getNumericAttributePrecisions(),
		n = a.getNumericAttributeUnits(),
		p = a.getNumericAttributeDescriptions(),
		r = a.getCategoricalAttributeNames(),
		v = a.getRecordInfoArray(),
		t = a.getSliceNames(),
		u = Array(e),
		q = Array(d),
		z,
		x = Array(b),
		w,
		B = Array(f);
		for (w = 0; w < e; w++)
			z = new gav.data.IndicatorInformation(j[w], k[w]), z.timePeriods = m[w], z.precision = parseInt(o[w]), z.unit = n[w], z.description = p[w], u[w] = z;
		for (w = 0; w < d; w++)
			j = new gav.data.IndicatorInformation(r[w], r[w]), q[w] = j;
		for (r = 0; r < b; r++)
			w = v[r][0].toString(), d = v[r][1].toString(), x[r] = new gav.data.RecordInformation(w, d);
		for (w = 0; w < f; w++)
			B[w] = new gav.data.SheetInformation(t[w], t[w]);
		t = a.getDataCube();
		f = a.getClassCube();
		v = a.getFlagsList();
		d = a.getNumericAttributeFlagsDescriptions();
		a = {};
		if (d)
			for (w = 0; w < e; w++) {
				j = (r = (r = d[w]) ? r.split(";") : null) ? r.length : 0;
				for (k = 0; k < j; k++)
					(m = (m = r[k]) ? m.split("=") : null) && (a[m[0]] = m[1])
			}
		b = gav.utils.DataSetUtils.convertFlagsArray3DToFlagsArray1D(v, b, e);
		u = new gav.data.DataSet(t, u, f, b, a);
		u.setRecordInformation(x);
		u.setSliceInformation(B);
		f && u.setCategoricalIndicatorInformation(q);
		return u
	}
	gav.Klass("gav.data.provider.UnicodeTextDataProvider", {
		extend : gav.events.EventDispatcher,
		init : function () {
			gav.events.EventDispatcher.prototype.init.call(this);
			this.fileList = {}

		},
		setInputFileName : function (a) {
			if (this.fileList.hasOwnProperty(a))
				this.readFileContent(this.fileList[a].content);
			else {
				var b = this;
				this.readFile(a, function (a) {
					b.readFileContent(a)
				})
			}
		},
		getDataSet : function () {
			return this._dataSet
		},
		readFile : function (a, b) {
			this.fileList.hasOwnProperty(a) || (this.fileList[a] = {}, this.fileList[a].loadingStatus = gav.constants.LoadStatus.NOT_LOADED, this.fileList[a].callbackList = []);
			if (this.fileList[a].loadingStatus ===
				gav.constants.LoadStatus.LOADED)
				"function" == typeof b && b(this.fileList[a].content);
			else if (this.fileList[a].loadingStatus === gav.constants.LoadStatus.LOADING)
				"function" == typeof b && this.fileList[a].callbackList.push(b);
			else {
				var f = this;
				this.fileList[a].loadingStatus = gav.constants.LoadStatus.LOADING;
				b && "function" == typeof b && this.fileList[a].callbackList.push(b);
				$.ajax({
					type : "GET",
					url : a,
					dataType : "text",
					success : function (b) {
						f.fileList[a].loadingStatus = gav.constants.LoadStatus.LOADED;
						f.fileList[a].content =
							b;
						var c = f.fileList[a].callbackList;
						if (0 < c.length)
							for (; c.length; )
								c.shift()(b)
					}
				})
			}
		},
		readFileContent : function (a, b) {
			this.readDataSet(a);
			this.dispatchEvent("dataSetLoaded");
			this.dispatchEvent("dataSetChanged");
			b && "function" == typeof b && b(a)
		},
		readDataSet : function (a) {
			var a = d(a),
			c = new gav.data.provider.UnicodeFormatReader;
			c.sheetArray = a;
			c.processData();
			this._dataSet = b(c)
		}
	});
	gav.data.provider.UnicodeTextDataProvider.createDataSet = function (a) {
		var a = d(a),
		c = new gav.data.provider.UnicodeFormatReader;
		c.sheetArray =
			a;
		c.processData();
		return b(c)
	}
})();
(function () {
	var d = {
		"time:" : 1,
		"sheet:" : 1,
		"slice:" : 1,
		time : 1,
		sheet : 1,
		slice : 1
	};
	gav.Klass("gav.data.provider.UnicodeTextFileToSheetArray", {
		extend : gav.events.EventDispatcher,
		init : function () {
			gav.events.EventDispatcher.prototype.init.call(this)
		},
		getAllDataSheets : function () {
			return this._sheetArray
		},
		getDataSheetNames : function () {
			return this._sheetNames
		},
		loadFileString : function (b) {
			for (var b = -1 < b.indexOf("\r\n") ? b.split("\r\n") : b.split("\n"), a = b.length, c, f = 0; f < a; f++)
				c = b[f], b[f] = c.split("\t");
			if (0 < a && b[0] && 1 ==
				d[b[0][0].toLowerCase()]) {
				this._sheetArray = [];
				this._sheetNames = [];
				for (var a = b.length, e, g = 0; g < a; g++)
					c = b[g], f = c[0].toLowerCase(), 1 == d[f] ? (e = [], this._sheetArray.push(e), this._sheetNames.push(c[1])) : e.push(c)
			} else
				this._sheetArray = [b], this._sheetNames = ["0"]
		}
	})
})();
(function (d) {
	gav.Klass("gav.panels.ComponentSettingsPanel", {
		extend : gav.events.EventDispatcher,
		init : function (b) {
			function a() {
				var a = !d(c).hasClass("gav-state-collapsed");
				d(e).toggleClass("gav-state-hidden", !a);
				d(f).toggleClass("gav-state-active", a);
				a ? d(".gav-icon", f).addClass("gav-icon-left").removeClass("gav-icon-right") : d(".gav-icon", f).addClass("gav-icon-right").removeClass("gav-icon-left")
			}
			gav.events.EventDispatcher.prototype.init.call(this);
			(new Date).getTime();
			var c = b;
			this._localeAttribute = gav.i18n.htmlAttribute;
			b = document.createElement("div");
			d(b).css({
				position : "relative",
				marginLeft : "100%",
				width : "100%",
				height : 0
			}).appendTo(c);
			var f = document.createElement("button");
			d(f).css({
				position : "absolute",
				left : 0,
				zIndex : 2
			}).bind("click", function () {
				d(c).toggleClass("gav-state-collapsed");
				a();
				var b = !d(c).hasClass("gav-state-collapsed");
				d(c).trigger(b ? "show" : "hide")
			}).gavButton_old({
				iconize : !0,
				icon : "gav-icon-right"
			}).appendTo(b);
			d(c).addClass("gav-component-settings-panel");
			var e = document.createElement("div");
			d(e).addClass("gav-component-settings");
			c.appendChild(e);
			this._innerPanel = e;
			a();
			this._toggleButton = f
		},
		updateTop : function (b) {
			d(this._toggleButton).css({
				top : b
			})
		},
		localeChanged : function () {
			gav.locale.updateElements(d(this._innerPanel).find("[data-i18n]"))
		}
	})
})(jQuery);
(function (d) {
	function b() {
		if (!this._invalidated) {
			var b = this;
			this._invalidated = !0;
			this._timer = requestAnimationFrame(function () {
					a.call(b)
				}, this._element)
		}
	}
	function a() {
		this._invalidatedSize && (this._updateSize(), this._invalidatedSize = !1);
		this._invalidatedProperties && (this._updateProperties(), this._invalidatedProperties = !1);
		this._invalidatedDisplay && (this._updateDisplay(), this._invalidatedDisplay = !1);
		this._invalidated = !1
	}
	gav.Klass("gav.components.Component", {
		extend : gav.events.EventDispatcher,
		init : function (a) {
			function b(a) {
				p =
					k ? x : a.pageX - v;
				r = m ? w : a.pageY - t;
				p = Math.max(0, Math.min(x, p));
				r = Math.max(0, Math.min(w, r));
				z || (!k && !m && 100 < (u - p) * (u - p) + (q - r) * (q - r) ? z = !0 : k && 4 < Math.abs(q - r) ? z = !0 : m && 4 < Math.abs(u - p) && (z = !0), z && (g.parentNode || n.appendChild(g), d(n).trigger("overlayRectangleDragStart"), o.dispatchEvent("overlayRectangleDragStart", [a, j])));
				j.setRect(u, q, p - u, r - q);
				d(n).trigger("overlayRectangleDrag", [j]);
				o.dispatchEvent("overlayRectangleDrag", [a, j]);
				d(g).css({
					top : j.minY(),
					left : j.minX(),
					width : k ? "100%" : j.maxX() - j.minX() - 2,
					height : m ?
					"100%" : j.maxY() - j.minY() - 2
				})
			}
			function e(a) {
				d(document).unbind("mousemove", b);
				d(document).unbind("mouseup", e);
				if (z) {
					z = !1;
					!o._mouseDragOverlayAlwaysVisible && g.parentNode && n.removeChild(g);
					var c = a.ctrlKey;
					-1 === gav.interaction.select && (c = !c);
					j.setRect(u, q, p - u, r - q);
					d(n).trigger("overlayRectangleDragEnd", [a, j, c]);
					o.dispatchEvent("overlayRectangleDragEnd", [a, j, c])
				}
			}
			gav.events.EventDispatcher.prototype.init.call(this);
			if (a) {
				this._width = d(a).width() - 0;
				this._height = d(a).height() - 0;
				this._timer = null;
				this._element =
					a;
				d(this._element).css({
					padding : "0px",
					margin : "0px",
					border : "0px solid #aa0000",
					width : this._width,
					height : this._height,
					position : "relative"
				}).html("");
				this._mouseDragOverlayFullVertical = this._mouseDragOverlayFullHorizontal = this._mouseDragOverlayEnabled = !1;
				var g = document.createElement("div"),
				j = new gav.geom.Rectangle(0, 0, 0, 0),
				k = !1,
				m = !1,
				o = this,
				n,
				p,
				r,
				v,
				t,
				u,
				q,
				z = !1,
				x,
				w,
				B = function (a) {
					o._mouseDragOverlayEnabled && (a.stopPropagation(), o._mouseDragOverlayAlwaysVisible && a.target === g || (w = d(n).height(), x = d(n).width(),
							k = o._mouseDragOverlayFullHorizontal, m = o._mouseDragOverlayFullVertical, d(document).bind("mousemove", b), d(document).bind("mouseup", e), v = d(n).offset().left, t = d(n).offset().top, p = a.pageX - v, r = a.pageY - t, u = k ? 0 : p, q = m ? 0 : r, j.setRect(u, q, 0, 0), z = !1, a.preventDefault()))
				};
				d(g).css({
					position : "absolute",
					border : "1px solid rgba(25,200,230,0.8)",
					backgroundColor : "rgba(25, 200, 230, 0.2)",
					width : 0,
					height : 0,
					zIndex : 10
				});
				var y,
				A;
				d(g).bind("gavdragstart", function (a) {
					y = d(g).offset().left;
					A = a.gav.x - y;
					x = d(n).width();
					a.preventDefault();
					return !1
				});
				d(g).bind("gavdrag", function (a) {
					var b = a.gav.x - d(n).offset().left,
					b = b - A,
					b = Math.max(0, Math.min(b, x - Math.abs(j.width())));
					0 > j._width && (b -= j._width);
					j.x = b;
					d(g).css({
						left : j.minX()
					});
					a.preventDefault();
					return !1
				});
				d(g).bind("gavdragend", function () {});
				this._enableDragOverlay = function (a, b, c, f, e) {
					a && !this._mouseDragOverlayEnabled ? (n && d(n).unbind("mousedown", B), n = b, d(n).bind("mousedown", B)) : !a && this._mouseDragOverlayEnabled && (n && d(n).unbind("mousedown", B), n = null);
					this._mouseDragOverlayEnabled = a;
					this._mouseDragOverlayFullHorizontal =
						c;
					this._mouseDragOverlayFullVertical = f;
					(this._mouseDragOverlayAlwaysVisible = e) && n.appendChild(g)
				}
			}
		},
		setMouseDragOverlayEnabled : function (a, b, e, d, j) {
			this._enableDragOverlay(a, b || this._element, e || !1, d || !1, j || !1)
		},
		setSlice : function (a) {
			this._slice = a
		},
		getSlice : function () {
			return this._slice
		},
		setDataSet : function (a) {
			this._dataSet = a
		},
		getDataSet : function () {
			return this._dataSet
		},
		setColorMap : function (a) {
			this._colorMap = a
		},
		getColorMap : function () {
			return this._colorMap
		},
		setSelectionList : function () {},
		invalidate : function () {
			this.invalidateSize();
			this.invalidateProperties();
			this.invalidateDisplay()
		},
		invalidateSize : function () {
			this._invalidatedSize || (this._invalidatedSize = !0, b.call(this))
		},
		invalidateProperties : function () {
			this._invalidatedProperties || (this._invalidatedProperties = !0, b.call(this))
		},
		invalidateDisplay : function () {
			this._invalidatedDisplay || (this._invalidatedDisplay = !0, b.call(this))
		},
		getWidth : function () {
			return this._width
		},
		getHeight : function () {
			return this._height
		},
		_updateSize : function () {
			this._width = d(this._element).width() - 0;
			this._height =
				d(this._element).height() - 0
		},
		_updateProperties : function () {},
		_updateDisplay : function () {},
		updateNow : function () {
			this._invalidated && (cancelAnimationFrame(this._timer), a.call(this))
		}
	})
})(jQuery);
(function (d) {
	var b = 0;
	gav.Klass("gav.components.ComponentPanel", {
		extend : gav.events.EventDispatcher,
		init : function (a) {
			gav.events.EventDispatcher.prototype.init.call(this);
			this._name = "ComponentPanel";
			gav.locale.requestResources(this, ["ComponentPanel"]);
			b++;
			this._context = null;
			this._container = a;
			d(a).html("");
			var c = document.createElement("div");
			this._panel = c;
			d(c).addClass("gav-tab-panel");
			this._contentPanel = document.createElement("div");
			d(this._contentPanel).addClass("gav-panel-content");
			d(this._contentPanel).css({
				position : "relative",
				padding : "0px",
				margin : "0",
				border : "0px solid #aa0000",
				backgroundColor : "#fff"
			});
			this._panel.appendChild(this._contentPanel);
			this._container.appendChild(this._panel);
			var f = this;
			d(a).bind("gavresize", function () {
				gav.components.Component.prototype.invalidateSize.call(f)
			});
			this._dataTooltip = new gav.components.DataRecordToolTip(b);
			this._tooltipDelayTime = 250;
			this._dataTooltip.setDelayTime(this._tooltipDelayTime);
			this._isTooltipDisabled = !1;
			this._oldHeight = this._oldWidth = 0;
			this._validateSize()
		},
		localeChanged : function () {
			gav.locale.updateElements(d(this._container).find("[data-i18n]"))
		},
		_updateSize : function () {
			this.refresh()
		},
		refresh : function () {
			this._validateSize()
		},
		setParentContainer : function (a) {
			this._container && (this._panel && this._panel.parentNode && this._container.removeChild(this._panel), d(this._container).unbind("gavresize"));
			this._container = a;
			this._oldHeight = this._oldWidth = null;
			if (this._container) {
				var b = this;
				this._container.appendChild(this._panel);
				d(this._container).bind("gavresize", function () {
					gav.components.Component.prototype.invalidateSize.call(b)
				});
				this._updateSize()
			}
		},
		getParentContainer : function () {
			return this._container
		},
		setContext : function (a) {
			if (this._context) {
				this._context.removeEventListener("propertyChange", this._onContextChange);
				this._context.getSelectionManager();
				var b = this.getComponents ? this.getComponents() : [];
				if (b && b.length)
					for (var f = 0; f < b.length; f++) {
						var e = b[f];
						this._context.getVisibilityManager() && this._context.getVisibilityManager().remove(e);
						this._context.getSelectionManager() && this._context.getSelectionManager().remove(e)
					}
			}
			if (this._context = a) {
				this._context.addEventListener("propertyChange",
					this._onContextChange, this);
				this._context.getSelectionManager();
				this._context.getVisibilityManager();
				if ((b = this.getComponents ? this.getComponents() : []) && b.length)
					for (f = 0; f < b.length; f++)
						a = b[f], this._context && (this._context.getVisibilityManager() && this._context.getVisibilityManager().add(a), this._context.getSelectionManager() && this._context.getSelectionManager().add(a));
				this._dataTooltip && (this._dataTooltip.setDataSet(this._context.getDataSet()), this._dataTooltip.setSlice(this._context.getSlice()), this._dataTooltip.setFormatter(this._context.getFormatter()),
					this._dataTooltip.setColorMap(this._context.getColorMap()))
			}
		},
		getContext : function () {
			return this._context
		},
		getComponents : function () {
			return null
		},
		setPresentationMode : function () {},
		_onContextChange : function (a) {
			switch (a.property) {
			case "dataSet":
				this._dataTooltip && this._dataTooltip.setDataSet(a.newValue);
				break;
			case "colorMap":
				this._dataTooltip && this._dataTooltip.setColorMap(a.newValue);
				break;
			case "slice":
				this._dataTooltip && this._dataTooltip.setSlice(a.newValue);
				break;
			case "formatter":
				this._dataTooltip &&
				this._dataTooltip.setFormatter(a.newValue)
			}
		},
		setName : function (a) {
			this._name = a
		},
		geName : function () {
			return this._name
		},
		setDisableTooltip : function (a) {
			this._isTooltipDisabled = a
		},
		getDisabledTooltip : function () {
			return this._isTooltipDisabled
		},
		getDataTooltip : function () {
			return this._dataTooltip
		},
		showDataTooltip : function (a, b, f) {
			if (!this._isTooltipDisabled)
				return 1 < a.length ? this._dataTooltip.showMultiple(a, b) : this._dataTooltip.show(a[0], b, f), this._dataTooltip
		},
		hideDataTooltip : function () {
			this._dataTooltip && this._dataTooltip.hide()
		},
		setTooltipDelayTime : function (a) {
			this._tooltipDelayTime = a;
			this._dataTooltip && this._dataTooltip.setDelayTime(a)
		},
		_validateSize : function () {
			var a = d(this._container).width(),
			b = d(this._container).height();
			this._oldWidth = a;
			this._oldHeight = b;
			var f = d(this._panel),
			e = f.outerHeight(!0) - f.outerHeight(),
			g = f.outerWidth(!0) - f.outerWidth();
			isNaN(e) && (e = 0);
			isNaN(g) && (g = 0);
			this._width = a - g;
			this._height = b - e;
			d(this._panel).css({
				width : this._width,
				height : this._height
			});
			this._width = f.width();
			this._height = f.height();
			d(this._contentPanel).css({
				width : this._width,
				height : this._height
			})
		}
	})
})(jQuery);
gav.Klass("gav.components.StoryPanel", {
	extend : gav.components.ComponentPanel,
	init : function (d) {
		gav.components.ComponentPanel.prototype.init.call(this, d);
		$(d).addClass("gav-component-story");
		this._contentPanel.innerHTML = "<h2></h2><span class='chapter'></span><span class='author'></span><span class='organization'></span><div class='description'></div>";
		$(this._contentPanel).addClass("gav-story");
		this._headEl = $("h2", this._contentPanel)[0];
		this._orgEl = $(".organization", this._contentPanel)[0];
		this._authEl =
			$(".author", this._contentPanel)[0];
		this._chapEl = $(".chapter", this._contentPanel)[0];
		this._descrEl = $(".description", this._contentPanel)[0];
		$(this._descrEl).css({
			overflow : "auto"
		})
	},
	setStory : function (d) {
		$(d).children("metadata").length || $(d).parent().closest("snapshot").length && (d = $(d).parent().closest("snapshot")[0]);
		var b = $("metadata", d)[0];
		this._snapshot = d;
		var a = "",
		a = $(d).closest("story").attr("title") || "",
		d = $("title", b).text(),
		c = $("author > name", b).text(),
		f = $("author > organization", b).text(),
		b =
			$("description", b).text(),
		e = "",
		g = this,
		b = $(b).each(function (a, b) {
				$(b).find("font").each(function (a, b) {
					$(b).replaceWith($(b).contents())
				});
				$(b).find("u").each(function (a, b) {
					$(b).replaceWith($(b).text())
				});
				$(b).find("a").each(function (a, b) {
					var c;
					(c = /event:innerCapture\((\d)\)/gi.exec($(b).attr("href"))) && $(b).addClass("capture").attr("href", "#").attr("target", null).attr("data-snapshot", c[1])
				});
				e += $(b).html()
			});
		this._headEl.innerHTML = a;
		this._chapEl.innerHTML = d;
		this._authEl.innerHTML = c;
		this._orgEl.innerHTML =
			f;
		this._descrEl.innerHTML = e;
		$("a.capture").bind("click", function (a) {
			g._onSnapshotLinkClick.call(g, a)
		});
		this._validateSize()
	},
	_onSnapshotLinkClick : function (d) {
		d = (d = $(d.target).attr("data-snapshot")) && d.length ? parseInt(d) : -1;
		if (!(0 > d))
			return (d = $("snapshot[id='" + d + "']", $("snapshots", this._snapshot))) && this.dispatchEvent("loadInnerSnapshot", [d[0]]), !1
	},
	_validateSize : function () {
		gav.components.ComponentPanel.prototype._validateSize.call(this);
		var d;
		d = 0 + $(this._headEl).outerHeight(!0);
		d += $(this._chapEl).outerHeight();
		$(this._descrEl).css({
			height : this._height - d
		})
	}
});
(function () {
	function d() {
		for (var a = this._filterObjects.length, b = 0, c = 0; c < this._filterObjects.length; c++)
			this._filterObjects[c].isActive() && b++;
		$(this._filterInfo).children("div").children("span").html(b + "/" + a)
	}
	function b(a) {
		if (!a || "mode" === a.property)
			a = this._filterUpdateController ? this._filterUpdateController.getMode() : 0, $(this._controllerContainer).children(".gav-buttongroup").children("input").eq(a).attr("checked", !0), $(this._controllerContainer).children(".gav-buttongroup").children("input").button("refresh")
	}
	function a(a, b) {
		if (0 === this._filterMode) {
			if (this._context.getFormatter()) {
				var c = b.getDataCube(),
				f = b.getAttribute();
				if (c)
					return c = (1 - a) * c.getMinValue(f) + a * c.getMaxValue(f), this._context.getFormatter().getFormattedAttributeValueWithUnit(f, c)
			}
			return a
		}
		return (100 * a).toFixed(0) + " %"
	}
	function c() {
		$(this._slidersContainer).html("");
		for (var b = 0; b < this._filterObjects.length; b++)
			this._filterObjects[b].removeEventListener("propertyChange", this._onFilterPropertyChange), this._sliders[b].removeEventListener("slide",
				this._onSliderChange);
		this._filterObjects = [];
		this._sliders = [];
		if (this._context && this._context.getDataSet() && this._context.getDataSet().getDataCube()) {
			var c = this,
			f = this._context.getVisibilityManager(),
			e = this._context.getDataSet().getDataCube().getNumAttributes(),
			j = this._context.getDataSet().getIndicatorInformation(),
			u,
			q,
			z,
			x,
			w,
			B,
			y;
			this._sliders = [];
			for (b = 0; b < e; b++)
				u = f.getRangeFilter(b), this._filterObjects.push(u), q = document.createElement("li"), $(q).addClass("gav-range-filter"), x = document.createElement("h4"),
				$(x).click(function () {
					$(this).parent().siblings(".gav-state-active").removeClass("gav-state-active").end().toggleClass("gav-state-active")
				}), j && j[b] && (x.innerHTML = "<span class='gav-icon'></span>" + j[b].name), z = new gav.controls.Slider({
						range : !0,
						min : 0,
						max : 1,
						step : 0.001,
						values : [0, 1],
						tooltipFunction : function (b) {
							return function (f) {
								return a.apply(c, [f, b])
							}
						}
						(u)
					}), z.addEventListener("slide", g, {
					slider : z,
					self : this,
					filter : u
				}), this._sliders.push(z), w = document.createElement("button"), w.setAttribute(k, "[title]IndicatorFilterProperties:invertfilter"),
				$(w).css({
					floatttt : "right"
				}).attr("title", m).gavButton_old({
					iconize : !0,
					icon : "gav-icon-invert",
					i18n : "IndicatorFilterProperties:invertfilter"
				}).addClass("gav-action-invert").bind("gavtap", function (a) {
					return function () {
						a.setInverted(!a.getInverted());
						return !1
					}
				}
					(u, $(z.getDOMElement()))), B = document.createElement("button"), B.setAttribute(k, "[title]IndicatorFilterProperties:resetfilter"), $(B).css({
					floatttt : "right"
				}).attr("title", o).gavButton_old({
					iconize : !0,
					icon : "gav-icon-reset",
					i18n : "IndicatorFilterProperties:resetfilter"
				}).bind("gavtap",
					function (a) {
					return function () {
						a.reset();
						return !1
					}
				}
					(u, $(z.getDOMElement()))), y = document.createElement("div"), $(y).addClass("gav-range-slider").html("<div class='gav-range-slider-values'><span class='gav-range-slider-value'></span><span class='gav-range-slider-value'></span></div>").append(w).append(B).append(z.getDOMElement()), q.appendChild(x), x = document.createElement("div"), $(x).addClass("gav-content").append(y).appendTo(q), $(this._slidersContainer).append(q), u.addEventListener("propertyChange", this._onFilterPropertyChange, {
					filter : u,
					slider : z,
					self : c
				}), d.call(this)
		}
	}
	function f() {
		this._initRecordFilter = !1;
		this._dataSet = this._context.getDataSet();
		!this._initRecordFilter && this._visibilityManager && this._dataSet && (this._recordFilter = this._visibilityManager.getRecordFilter(), this._initRecordFilter = !1)
	}
	function e(a, b, c) {
		a.setValues([b, c], !1);
		b = a.getValues();
		c = $(a.getDOMElement()).hasClass("gav-state-inverted");
		!c && (0 < b[0] || 1 > b[1]) ? $(a.getDOMElement()).closest("li").addClass("gav-state-filter-active") : c && b[0] != b[1] ? $(a.getDOMElement()).closest("li").addClass("gav-state-filter-active") :
		$(a.getDOMElement()).closest("li").removeClass("gav-state-filter-active")
	}
	function g(a) {
		var b = this.self,
		c = this.slider,
		f = this.filter;
		if (f && c) {
			f.getAttribute();
			f.getDataCube();
			f.getSlice();
			var c = a[0],
			a = a[1],
			e = ["dummy", 0, 1];
			if (0 === b._filterMode)
				f.setMinMax(c, a);
			else {
				if (0 < c || 1 > a)
					e = gav.utils.Percentiles.calculateLimits([0, c, a, 1], f.getDataCube(), null, f.getAttribute(), f.getSlice(), !0);
				0 >= c && (e[1] = 0);
				1 <= a && (e[2] = 1);
				f.setMinMax(e[1], e[2])
			}
		}
	}
	var j = 0,
	k,
	m = "Invert",
	o = "Reset";
	gav.Klass("gav.components.IndicatorFilterDialog", {
		extend : gav.events.EventDispatcher,
		init : function () {
			function a() {
				c.setFilterMode($("input", m).index(this) || 0)
			}
			gav.events.EventDispatcher.prototype.init.call(this);
			gav.locale.requestResources(this, ["IndicatorFilterProperties"]);
			k = gav.i18n.htmlAttribute;
			var b = document.createElement("div");
			this._el = b;
			var c = this;
			this._innerContainer = document.createElement("div");
			j++;
			var f = j,
			e = "ifp_cm_" + f,
			d = "ifp_cm_" + f,
			g = document.createElement("div");
			$(g).css({
				padding : "0.2em 0.4em"
			}).html("<div class='gav-buttongroup-name'>During animation:</div><div class='gav-buttongroup'><input type='radio' name='" +
				e + "' value='0' id='" + (d + 1) + "'/><label for='" + (d + 1) + "'>Reset</label><input type='radio' name='" + e + "' value='1'  id='" + (d + 2) + "'/><label for='" + (d + 2) + "'>Update items</label><input type='radio' name='" + e + "' value='2'  id='" + (d + 3) + "'/><label for='" + (d + 3) + "'>Keep items</label></div>").children().css({
				display : "inline-block",
				margin : "0.4em"
			});
			$(".gav-buttongroup input", g).change(function () {
				c._filterUpdateController && c._filterUpdateController.setMode($(".gav-buttongroup input", g).index(this) || 0)
			});
			this._controllerContainer =
				g;
			$(".gav-buttongroup", g).buttonset();
			this._filterMode = 0;
			var e = "filterMode_" + f,
			f = "ifp_fm_" + f,
			m = document.createElement("div");
			$(m).css({
				padding : "0.2em 0.0em"
			}).html("<div class='gav-buttongroup-name'><span " + k + "='IndicatorFilterProperties:filterby'>Filter by:</span></div><div class='gav-buttongroup'><input name='" + e + "' type='radio' id='" + (f + 1) + "'/><label " + k + "='IndicatorFilterProperties:value' for='" + (f + 1) + "'>Value</label><input name='" + e + "' type='radio' id='" + (f + 2) + "'/><label " + k + "='IndicatorFilterProperties:percentile'  for='" +
				(f + 2) + "'>Percentiles</label></div>").children().css({
				display : "inline-block",
				margin : "0.4em 0"
			});
			f = $("input", m).eq(0).change(a);
			e = $("input", m).eq(1).change(a);
			0 == this._filterMode ? f.attr("checked", !0) : e.attr("checked", !0);
			f = document.createElement("div");
			$(f).css({
				position : "relative",
				display : "table",
				width : "100%",
				"border-top" : "1px solid #eee",
				"border-bottom" : "1px solid #eee"
			}).append("<div " + k + "='IndicatorFilterProperties:activefilters' style='display:table-cell;vertical-align:middle;width:100%;'>Active filters: <span></span></div>");
			this._filterInfo = f;
			$("<button " + k + "='[title]IndicatorFilterProperties:resetallfilters' title='Reset all range filters'></button>").gavButton_old({
				iconize : !0,
				icon : "gav-icon-reset"
			}).bind("gavtap", function () {
				c._context && c._context.getVisibilityManager() && c._context.getVisibilityManager()._filters.suppressChanges();
				for (var a = 0; a < c._filterObjects.length; a++)
					c._filterObjects[a].isActive() && c._filterObjects[a].reset();
				c._context && c._context.getVisibilityManager() && c._context.getVisibilityManager()._filters.commitSuppressedChanges()
			}).appendTo(f).css({
				display : "table-cell",
				verticalAlign : "middle"
			});
			this._slidersContainer = document.createElement("ul");
			$(this._slidersContainer).addClass("gav-list-range-filters");
			this._recordFilterContainer = document.createElement("div");
			this._innerContainer.appendChild(m);
			this._innerContainer.appendChild(f);
			this._innerContainer.appendChild(this._slidersContainer);
			this._innerContainer.appendChild(this._recordFilterContainer);
			b.appendChild(this._innerContainer);
			$("body").append(b);
			$(b).dialog({
				autoOpen : !1,
				title : "Indicator filtering"
			});
			this._filterObjects =
				[]
		},
		show : function () {
			$(this._el).dialog("option", "maxHeight", window.innerHeight);
			$(this._el).dialog("open");
			$(this._el).height() > window.innerHeight && $(this._el).dialog("option", "height", Math.max(window.innerHeight - 20, 200))
		},
		close : function () {
			$(this._el).dialog("close")
		},
		setContext : function (a) {
			gav.components.ComponentPanel.prototype.setContext.call(this, a);
			this._filterUpdateController && this._filterUpdateController.removeEventListener("propertyChange", b);
			if (this._filterUpdateController = this._context ?
					this._context.getVisibilityManager().getRangeFilterUpdateController() : null)
				this._filterUpdateController.addEventListener("propertyChange", b, this), b.call(this);
			this._context && (this._visibilityManager = this._context.getVisibilityManager(), this._selectionList = this._context.getSelectionManager(), f.call(this));
			c.call(this)
		},
		setFilterMode : function (a) {
			if (this._filterMode !== a) {
				this._filterMode = a;
				for (var b, c, f = 0; f < this._filterObjects.length; f++) {
					a = this._filterObjects[f];
					b = this._sliders[f];
					c = b.getValues();
					var d =
						[a.getMinValue(), a.getMaxValue()];
					a && b && (0 === this._filterMode ? d = [a.getMinValue(), a.getMaxValue()] : (0 < d[0] && (d[0] = gav.utils.Percentiles.calculateGlobalPercentilesOfScaledValue(a.getDataCube().getSortedIndicesGlobally(a.getAttribute()), c[0], a.getDataCube(), a.getAttribute(), 0)[1]), 1 > d[1] && (d[1] = gav.utils.Percentiles.calculateGlobalPercentilesOfScaledValue(a.getDataCube().getSortedIndicesGlobally(a.getAttribute()), c[1], a.getDataCube(), a.getAttribute(), 1)[1])), e(b, d[0], d[1]))
				}
			}
		},
		localeChanged : function () {
			o =
				gav.locale.translate("IndicatorFilterProperties:resetfilter") || "Reset filter";
			m = gav.locale.translate("IndicatorFilterProperties:invertfilter") || "Invert filter";
			gav.locale.updateElements($(this._innerContainer).find("[" + k + "]"));
			$(this._el).dialog("option", "title", gav.locale.translate("IndicatorFilterProperties:indicatorfiltering") || "Indicator filtering")
		},
		_onContextChange : function (a) {
			gav.components.ComponentPanel.prototype._onContextChange.call(this, a);
			switch (a.property) {
			case "visibilityManager":
			case "dataSet":
				c.call(this),
				f.call(this)
			}
		},
		_validateSize : function () {
			gav.components.ComponentPanel.prototype._validateSize.call(this)
		},
		_onFilterPropertyChange : function (a) {
			if ("minValueee" === a.property)
				if (0 === this.self._filterMode)
					e(this.slider, this.filter.getMinValue(), this.filter.getMaxValue());
				else {
					var a = this.filter,
					b = gav.utils.Percentiles.calculateGlobalPercentilesOfScaledValue(a.getDataCube().getSortedIndicesGlobally(a.getAttribute()), a.getMinValue(), a.getDataCube(), a.getAttribute(), 0);
					e(this.slider, b[1], this.slider.getValues()[1])
				}
			else
				"maxValueee" ===
				a.property ? 0 === this.self._filterMode ? e(this.slider, this.filter.getMinValue(), this.filter.getMaxValue()) : (a = this.filter, a = gav.utils.Percentiles.calculateGlobalPercentilesOfScaledValue(a.getDataCube().getSortedIndicesGlobally(a.getAttribute()), a.getMaxValue(), a.getDataCube(), a.getAttribute(), 1), e(this.slider, this.slider.getValues()[0], a[1])) : "minMax" === a.property ? 0 === this.self._filterMode ? e(this.slider, this.filter.getMinValue(), this.filter.getMaxValue()) : (a = this.filter, b = gav.utils.Percentiles.calculateGlobalPercentilesOfScaledValue(a.getDataCube().getSortedIndicesGlobally(a.getAttribute()),
							a.getMinValue(), a.getDataCube(), a.getAttribute(), 0), a = gav.utils.Percentiles.calculateGlobalPercentilesOfScaledValue(a.getDataCube().getSortedIndicesGlobally(a.getAttribute()), a.getMaxValue(), a.getDataCube(), a.getAttribute(), 1), e(this.slider, b[1], a[1])) : "inverted" === a.property && (a = this.filter, $(this.slider.getDOMElement()).toggleClass("gav-state-inverted", a.getInverted()).siblings(".gav-action-invert").toggleClass("gav-state-active", a.getInverted()), b = [a.getMinValue(), a.getMaxValue()], !a.getInverted() &&
					(0 < b[0] || 1 > b[1]) ? $(this.slider.getDOMElement()).closest("li").addClass("gav-state-filter-active") : this.filter.getInverted() && b[0] != b[1] ? $(this.slider.getDOMElement()).closest("li").addClass("gav-state-filter-active") : $(this.slider.getDOMElement()).closest("li").removeClass("gav-state-filter-active"));
			d.call(this.self)
		}
	})
})();
(function (d) {
	function b(a) {
		this._parentElement || (this._parentElement = document.getElementsByTagName("body")[0]);
		this._parentElement && !this._appended && (this._parentElement.appendChild(this._toolTip), this._appended = !0);
		this._isFadingOut && this._$tip.stop(!0, !1);
		this._toolTipShown = !0;
		this._lastShownAt = Date.now();
		var b = a.pageX,
		a = a.pageY;
		this._toolTip.style.opacity = 0;
		this._toolTip.style.left = 0;
		var c = this._$tip.outerWidth(),
		b = Math.max(0, b + Math.min(10, window.innerWidth - b - c));
		this._$tip.css({
			top : a + 10,
			left : b,
			opacity : 1
		}).toggleClass("gav-state-hidden", !this._toolTipShown);
		var f = this;
		clearTimeout(this._hideCallback);
		0 < this._fadeOutTime && (this._hideCallback = setTimeout(function () {
					f._isFadingOut = !0;
					f._$tip.stop(!0).animate({
						opacity : 0
					}, 200, "linear", function () {
						f._isFadingOut = !1;
						f.hide()
					})
				}, this._fadeOutTime))
	}
	function a(a) {
		this._waitingEvent = a;
		if (this._toolTipShown)
			b.call(this, a);
		else if (1E3 > Date.now() - this._lastShownAt)
			b.call(this, a);
		else {
			clearTimeout(this._showTimer);
			this._showTimer = null;
			var c = this;
			this._showTimer =
				setTimeout(function () {
					b.call(c, c._waitingEvent)
				}, this._delayTime)
		}
	}
	function c() {
		this._contentTable.innerHTML = "";
		this._header.innerHTML = "";
		this._footer.innerHTML = "";
		if (this._dataSet.getRecordInformation()[this._item[0]]) {
			this._header.innerHTML = this._dataSet.getRecordInformation()[this._item[0]].name;
			for (var a = 0; a < this._visibleAttributes.length; a++)
				e.call(this, this._visibleAttributes[a], this._rowColors[a]);
			if (this._dataSet.hasCategoricalData())
				for (a = 0; a < this._categoricalAttributes.length; a++)
					g.call(this,
						this._categoricalAttributes[a]);
			if (this._showColorAttribute && this._colorMap && this._colorMap.getAttribute)
				if (this._colorMap instanceof gav.representation.ColorMap) {
					var b = this._colorMap.getAttribute();
					0 > this._visibleAttributes.indexOf(b) && e.call(this, b)
				} else if (this._colorMap instanceof gav.representation.CategoricalColorMap) {
					var b = this._colorMap.getAttribute(),
					c = this._dataSet.getClassCube();
					c && this._item[0] < c.getNumRecords() && (a = c.getValue(this._item[0], b, Math.min(this._slice, c.getNumSlices() - 1)),
						b = c.getCategoricalIndicatorName(b), j.call(this, {
							text : b,
							value : a
						}))
				}
			if (this._flags && this._flags.length) {
				var f = [],
				d = this._dataSet;
				this._flags.forEach(function (a) {
					f.push([a, "=", d.getMetaDataFlagsDescription(a)].join(""))
				});
				this._footer.innerHTML = f.join(",");
				this._footer.parentNode || this._toolTip.appendChild(this._footer)
			} else
				this._footer.parentNode && this._toolTip.removeChild(this._footer)
		}
	}
	function f(a, b, c) {
		var f = this._dataSet.getSliceInformation()[this._slice].name,
		e = this._dataSet.getDataCube().getValue(a,
				b, this._slice),
		g = this._dataSet.getRecordInformation()[a],
		j = this._dataSet.getMetaDataFlags(a, b, this._slice),
		g = g ? g.toString() : "";
		this._formatter && (e = this._formatter.getFormattedAttributeValueWithUnit(b, e));
		j && j.length && (j.forEach(function (a) {
				0 > j._flags.indexOf(a) && j._flags.push(a)
			}), e += "<sup>" + j.join(",") + "</sup>");
		a = "<tr>";
		c ? a += "<td><span style='display:block;width:10px;height:10px;background-color:" + gav.utils.Color.toHex(c) + ";'></span></td>" : this._rowColors && this._rowColors.length && (a += "<td></td>");
		a += "<td>" + g + "</td>";
		1 < this._dataSet.getDataCube().getNumSlices() && (a += "<td>(" + f + ")</td>");
		d(this._contentTable).append(a + ("<td>" + e + "</td></tr>"))
	}
	function e(a, b) {
		var c = this._dataSet.getIndicatorInformation()[a] ? this._dataSet.getIndicatorInformation()[a].name : "",
		f = this._dataSet.getSliceInformation()[this._slice].name,
		e = this._dataSet.getDataCube().getValue(this._item[0], a, this._slice),
		g = this._dataSet.getMetaDataFlags(this._item[0], a, this._slice);
		this._formatter && (e = this._formatter.getFormattedAttributeValueWithUnit(a,
					e));
		var j = this;
		g && g.length && (g.forEach(function (a) {
				0 > j._flags.indexOf(a) && j._flags.push(a)
			}), e += "<sup>" + g.join(",") + "</sup>");
		g = "<tr>";
		b ? g += "<td><span style='display:block;width:10px;height:10px;background-color:" + gav.utils.Color.toHex(b) + ";'></span></td>" : this._rowColors && this._rowColors.length && (g += "<td></td>");
		g += "<td>" + c + "</td>";
		1 < this._dataSet.getDataCube().getNumSlices() && (g += "<td>(" + f + ")</td>");
		d(this._contentTable).append(g + ("<td>" + e + "</td></tr>"))
	}
	function g(a, b) {
		if (this._dataSet.hasCategoricalData()) {
			var c =
				this._dataSet.getCategoricalIndicatorInformation()[a] ? this._dataSet.getCategoricalIndicatorInformation()[a].name : "",
			f = this._dataSet.getSliceInformation()[this._slice].name,
			e = Math.min(this._dataSet.getClassCube().getNumSlices() - 1, this._slice),
			e = this._dataSet.getClassCube().getValue(this._item[0], a, e),
			g = "<tr>";
			b ? g += "<td><span style='display:block;width:10px;height:10px;background-color:" + gav.utils.Color.toHex(b) + ";'></span></td>" : this._rowColors && this._rowColors.length && (g += "<td></td>");
			g += "<td>" + c +
			"</td>";
			this._dataSet.hasTimeData() && (g += "<td>(" + f + ")</td>");
			d(this._contentTable).append(g + ("<td>" + e + "</td></tr>"))
		}
	}
	function j(a) {
		var b = this._dataSet.getSliceInformation()[this._slice].name,
		c = a.value,
		f = "<tr>";
		this._rowColors && this._rowColors.length && (f += "<td></td>");
		f += "<td>" + a.text + "</td>";
		1 < this._dataSet.getDataCube().getNumSlices() && (f += "<td>(" + b + ")</td>");
		d(this._contentTable).append(f + ("<td>" + c + "</td></tr>"))
	}
	gav.Klass("gav.components.DataRecordToolTip", {
		init : function (a) {
			this._toolTip = document.createElement("div");
			this._$tip = d(this._toolTip);
			this._$tip.addClass("gav-record-tooltip").attr("data-name", a);
			this._header = document.createElement("div");
			d(this._header).addClass("gav-tooltip-header");
			this._content = document.createElement("div");
			d(this._content).addClass("gav-tooltip-content");
			this._footer = document.createElement("div");
			d(this._footer).addClass("gav-tooltip-footer");
			this._contentTable = document.createElement("table");
			this._content.appendChild(this._contentTable);
			this._toolTip.appendChild(this._header);
			this._toolTip.appendChild(this._content);
			this._visibleAttributes = [];
			this._categoricalAttributes = [];
			this._slice = 0;
			this._item = [];
			this._rowColors = [];
			this._flags = [];
			this._showColorAttribute = !0;
			this._delayTime = 500;
			this._fadeOutTime = 5E3;
			this._toolTipShown = !1;
			this._$tip.addClass("gav-state-hidden")
		},
		setItem : function (a) {
			var b = !1;
			if (a.length !== this._item.length)
				b = !0;
			else
				for (var c = 0; c < a.length; c += 1)
					if (a[c] !== this._item[c]) {
						b = !0;
						break
					}
			this._item = a;
			this._flags = [];
			b && (this._changed = !0)
		},
		getItem : function () {
			return this._item
		},
		setDataSet : function (a) {
			this._dataSet =
				a;
			this._changed = !0
		},
		getDataSet : function () {
			return this._dataSet
		},
		setSlice : function (a) {
			this._slice !== a && (this._changed = !0);
			this._slice = a;
			this._flags = []
		},
		getSlice : function () {
			return this._slice
		},
		setColorMap : function (a) {
			this._colorMap = a;
			this._changed = !0
		},
		setShowColorAttribute : function (a) {
			this._showColorAttribute !== a && (this._changed = !0);
			this._showColorAttribute = a
		},
		getShowColorAttribute : function () {
			return this._showColorAttribute
		},
		setVisibleAttributes : function (a) {
			var b = !1;
			if (a.length !== this._visibleAttributes.length)
				b =
					!0;
			else
				for (var c = 0; c < a.length; c += 1)
					if (a[c] !== this._visibleAttributes[c]) {
						b = !0;
						break
					}
			this._visibleAttributes = a;
			b && (this._changed = !0)
		},
		getVisibleAttributes : function () {
			return this._visibleAttributes
		},
		getCategoricalAttributes : function () {
			return this._categoricalAttributes
		},
		setCategoricalAttributes : function (a) {
			var b = !1;
			if (a.length !== this._categoricalAttributes.length)
				b = !0;
			else
				for (var c = 0; c < a.length; c += 1)
					if (a[c] !== this._categoricalAttributes[c]) {
						b = !0;
						break
					}
			this._categoricalAttributes = a;
			b && (this._changed =
					!0)
		},
		setFormatter : function (a) {
			this._changed = !0;
			this._formatter = a
		},
		getFormatter : function () {
			return this._formatter
		},
		setRowColors : function (a) {
			var b = !1;
			if (a.length !== this._rowColors.length)
				b = !0;
			else
				for (var c = 0; c < a.length; c += 1)
					if (a[c] !== this._rowColors[c]) {
						b = !0;
						break
					}
			this._rowColors = a;
			b && (this._changed = !0)
		},
		show : function (b, f, e) {
			this.setItem([b]);
			if (this._changed || e)
				c.call(this), this._changed = !1;
			if (e && e.length)
				for (b = 0; b < e.length; b += 1)
					j.call(this, e[b]);
			a.call(this, f)
		},
		showMultiple : function (b, c) {
			this.setItem(b);
			if (this._changed) {
				var e = this._visibleAttributes ? this._visibleAttributes[0] : 0;
				this._header.innerHTML = this._dataSet.getIndicatorInformation()[e] ? this._dataSet.getIndicatorInformation()[e].toString() : "";
				this._contentTable.innerHTML = "";
				for (var d = 0; d < this._item.length; d++)
					f.call(this, this._item[d], e, this._rowColors[d]);
				this._changed = !1
			}
			a.call(this, c)
		},
		hide : function () {
			this._toolTipShown && (this._lastShownAt = Date.now());
			this._toolTipShown = !1;
			this._$tip.toggleClass("gav-state-hidden", !this._toolTipShown);
			clearTimeout(this._showTimer);
			this._showTimer = null;
			clearTimeout(this._hideCallback)
		},
		setDelayTime : function (a) {
			this._delayTime = a
		},
		setFadeOutTime : function (a) {
			this._fadeOutTime = a
		}
	})
})(jQuery);
(function () {
	function d() {
		var a = this._colorLegend.getContext("2d"),
		b = $(this._innerContainer).width(),
		f = $(this._innerContainer).height();
		this._colorLegend.width = b;
		this._colorLegend.height = f;
		a.clearRect(0, 0, b, f);
		if (this._colorMap && this._colorMap.getDataSet() && this._colorMap.getDataSet().getDataCube() && this._colorMap instanceof gav.representation.ColorMap) {
			this._attributeComboBox.setSelectedIndex(this._colorMap.getAttribute());
			this.getVisibilityManager() && (!this.getRangeFilter() || this.getRangeFilter().getAttribute() !==
				this._colorMap.getAttribute()) && this.setRangeFilter(this.getVisibilityManager().getRangeFilter(this._colorMap.getAttribute()));
			var e = this._colorMap._colors,
			d = this._colorMap._limits,
			j = a.createLinearGradient(0, f, 0, 0);
			j.addColorStop(d[0], gav.utils.Color.toRGB(e[0]));
			for (var k = 1; k < d.length - 1; k++)
				j.addColorStop(d[k], gav.utils.Color.toRGB(e[2 * k - 1])), j.addColorStop(d[k], gav.utils.Color.toRGB(e[2 * k]));
			j.addColorStop(d[d.length - 1], gav.utils.Color.toRGB(e[e.length - 1]));
			a.save();
			a.fillStyle = j;
			a.fillRect(0, 0,
				b, f);
			e = this._filterSlider.getValues();
			b = (1 - e[1]) * f;
			e = e[0] * f;
			a.fillStyle = "rgba(255,255,255,0.6)";
			this._rangeFilter && this._rangeFilter.getInverted() ? a.fillRect(0, b, 4, f - b - e) : this._rangeFilter && (a.fillRect(0, 0, 4, b), a.fillRect(0, f - e, 4, e));
			a.restore()
		}
	}
	function b(a) {
		if (a && a.property && "attribute" !== a.property)
			"dataSet" === a.property && (this._dataSet = this._colorMap.getDataSet ? this._colorMap.getDataSet() : null, this._attributeComboBox.setDataProvider(this._dataSet ? this._dataSet.getIndicatorInformation() : null));
		else {
			var b = $(this._innerContainer).find(".gav-legend-handle"),
			f = b.length,
			e = this._colorMap._limits,
			a = e ? e.length : 0;
			if (e) {
				if (f !== a - 2) {
					b.remove();
					for (var b = document.createDocumentFragment(), d, j = 1; j < a - 1; j += 1)
						f = document.createElement("div"), $(f).addClass("gav-legend-handle").attr("data-index", j), d = document.createElement("span"), f.appendChild(d), b.appendChild(f);
					this._innerContainer.appendChild(b)
				}
				var b = $(this._innerContainer).find(".gav-legend-handle"),
				k,
				m = this.getFormatter(),
				o = this._colorMap.getDataSet() ?
					this._colorMap.getDataSet().getDataCube() : null;
				if (o) {
					var n,
					p = this._colorMap.getAttribute();
					b.each(function (a) {
						k = e[a + 1];
						n = o.getMinValue(p) + k * (o.getMaxValue(p) - o.getMinValue(p));
						$(this).css("top", 100 * (1 - e[a + 1]) + "%").children("span").text(m.getFormattedAttributeValue(p, n))
					})
				}
			} else
				b.remove()
		}
	}
	gav.Klass("gav.components.ColorMapLegend", {
		extend : gav.events.EventDispatcher,
		init : function (a) {
			gav.events.EventDispatcher.prototype.init.call(this);
			var b = document.createElement("div");
			this._container = b;
			var f = this;
			this._width = 12;
			this._height = 230;
			$(this._container).css({
				position : "absolute",
				zIndex : "100"
			}).addClass("gav-color-legend");
			this._innerContainer = document.createElement("div");
			$(this._innerContainer).css({}).addClass("gav-color-map");
			var e = "ontouchend" in document ? !0 : !1,
			g = document.createElement("div");
			$(g).addClass("gav-move-handle").gavButton_old({
				icon : "gav-icon-move"
			});
			$(g).bind("gavdragstart", function (f) {
				k = !0;
				n = $(b).offset().left;
				p = $(b).offset().top;
				m = f.gav.x - n;
				o = f.gav.y - p;
				$(a).css("border-color", "rgba(0,200,255,0.5)")
			}).bind("gavdrag",
				function (f) {
				if (!k)
					return !1;
				var e = f.gav.x - $(a).offset().left,
				d = f.gav.y - $(a).offset().top,
				e = e - m,
				d = d - o;
				$(b).css({
					top : d,
					left : e
				});
				f.preventDefault();
				return !1
			}).bind("gavdragend", function (f) {
				k = !1;
				$(a).css("border-color", "#999");
				var e = !1,
				d = !1,
				g = !1,
				j = !1;
				0 > f.gav.x ? e = !0 : f.gav.x > window.innerWidth && (d = !0);
				0 > f.gav.y ? g = !0 : f.gav.y > window.innerHeight && (j = !0);
				e ? $(b).animate({
					left : 0
				}, {
					queue : !1
				}) : d && $(b).animate({
					left : window.innerWidth - 64
				}, {
					queue : !1
				});
				g ? $(b).animate({
					top : 24
				}, {
					queue : !1
				}) : j && $(b).animate({
					top : window.innerHeight -
					64
				}, {
					queue : !1
				})
			});
			var j = document.createElement("div");
			j.title = "Toggle color legend";
			$(j).click(function () {
				r ? ($(f._innerContainer).stop(!1, !0).slideUp("fast"), $(f._attributeComboBox.getDOMElement()).stop(!1, !0).slideUp("fast"), $(f._colorLegendHandles).stop(!1, !0).slideUp("fast")) : ($(f._innerContainer).stop(!1, !0).slideDown("fast"), $(f._attributeComboBox.getDOMElement()).stop(!1, !0).slideDown("fast"), $(f._colorLegendHandles).stop(!1, !0).slideDown("fast"));
				r = !r;
				$(j).toggleClass("gav-state-active", !r)
			}).addClass("gav-legend-toggle").gavButton_old({
				icon : "gav-icon-up-double"
			});
			var k = !1,
			m,
			o,
			n,
			p,
			r = !0;
			this._container.appendChild(g);
			this._container.appendChild(j);
			this._filterSlider = new gav.controls.Slider({
					range : !0,
					vertical : !0,
					step : 0.001,
					slide : function (a) {
						f.getRangeFilter() && f.getRangeFilter().setMinMax(a[0], a[1]);
						d.call(f)
					},
					displayTooltip : !1
				});
			$(this._filterSlider.getDOMElement()).addClass("gav-slider-color-filter");
			this._filterContainer = document.createElement("div");
			$(this._filterContainer).css({
				position : "absolute",
				zIndex : "200",
				height : "100%",
				borderRadius : "0px",
				border : "0px solid rgba(0,0,0,0.5)"
			});
			$(this._filterContainer).hide();
			e || this._filterContainer.appendChild(this._filterSlider.getDOMElement());
			this._attributeComboBox = new gav.controls.ComboBox({
					vertical : !0
				});
			this._attributeComboBox.addEventListener("change", function () {
				f._colorMap && f._colorMap.setAttribute(f._attributeComboBox.getSelectedIndex());
				f._visibilityManager && f.setRangeFilter(f._visibilityManager.getRangeFilter(f._attributeComboBox.getSelectedIndex()))
			});
			this._colorLegend = document.createElement("canvas");
			$(this._colorLegend);
			this._innerContainer.appendChild(this._colorLegend);
			var v,
			t,
			u,
			q,
			z = $(document);
			$(this._innerContainer).delegate(".gav-legend-handle", "mousedown", function (a) {
				function b() {
					z.unbind("mouseup", b);
					z.unbind("mousemove", c);
					q.removeClass("gav-state-active")
				}
				function c(a) {
					var b = 1 - (a.pageY - e - $(f._innerContainer).offset().top) / $(f._innerContainer).height(),
					b = Math.min(u[1], b),
					b = Math.max(u[0], b);
					f._colorMap.setLimit(t, b);
					a.preventDefault();
					return !1
				}
				q = $(f._innerContainer);
				q.offset();
				var e = a.pageY - q.offset().top;
				q.addClass("gav-state-active");
				e = a.pageY - $(this).offset().top;
				v = "SPAN" == a.target.nodeName ? $(a.target).parent() : a.target;
				t = parseInt($(v).attr("data-index"));
				f._colorMap && f._colorMap._limits ? (u = [f._colorMap._limits[t - 1], f._colorMap._limits[t + 1]], 1 >= t && (u[0] = 0), t >= f._colorMap._limits.length - 1 && (u[1] = 1)) : u = [0, 1];
				z.bind("mousemove", c).bind("mouseup", b);
				a.preventDefault()
			}).delegate(".gav-legend-handle", "click", function (a) {
				var b = f.getColorMap(),
				c = b ? b.getDataSet() ? b.getDataSet().getDataCube() : null : null;
				if (b && c) {
					v = "SPAN" == a.target.nodeName ? $(a.target).parent() : a.target;
					var e = b.getLimits(),
					a = c.getMinValue(b.getAttribute()),
					c = c.getMaxValue(b.getAttribute());
					(e = prompt("Set value", gav.lerp(a, c, e[t]))) && b.setLimit(t, (e - a) / (c - a))
				}
			});
			e = document.createElement("div");
			$(e).css({}).addClass("gav-combobox-container");
			e.appendChild(this._attributeComboBox.getDOMElement());
			this._innerContainer.appendChild(e);
			this._container.appendChild(this._innerContainer);
			a.appendChild(this._container)
		},
		setPosition : function (a,
			b) {
			$(this._container).css({
				top : b,
				left : a
			})
		},
		setColorMap : function (a) {
			if (this._colorMap !== a) {
				this._colorMap && (this._colorMap.removeEventListener("colorMapChanged", d, this), this._colorMap.removeEventListener("limitsChanged", b, this), this._colorMap.removeEventListener("propertyChange", b, this));
				if (this._colorMap = a)
					this._colorMap.addEventListener("colorMapChanged", d, this), this._colorMap.addEventListener("limitsChanged", b, this), this._colorMap.addEventListener("propertyChange", b, this), this._attributeComboBox.setDataProvider(this._colorMap.getDataSet() ?
						this._colorMap.getDataSet().getIndicatorInformation() : null);
				d.call(this);
				b.call(this)
			}
		},
		getColorMap : function () {
			return this._colorMap
		},
		setRangeFilter : function (a) {
			this._rangeFilter && this._rangeFilter.removeEventListener("propertyChange", this._onFilterChanged);
			(this._rangeFilter = a) ? (this._rangeFilter.addEventListener("propertyChange", this._onFilterChanged, this), $(this._filterContainer).show()) : $(this._filterContainer).hide();
			this._onFilterChanged()
		},
		getRangeFilter : function () {
			return this._rangeFilter
		},
		setDataSet : function () {},
		setFormatter : function (a) {
			this._formatter = a
		},
		getFormatter : function () {
			return this._formatter || new gav.representation.AutomaticNumericStringProvider
		},
		setVisibilityManager : function (a) {
			this._visibilityManager = a
		},
		getVisibilityManager : function () {
			return this._visibilityManager
		},
		_onFilterChanged : function (a) {
			a ? "minValue" === a.property || "maxValue" === a.property || "minMax" === a.property ? this._filterSlider && (a = this.getRangeFilter(), this._filterSlider.setValues([a.getMinValue(), a.getMaxValue()]),
				d.call(this)) : "inverted" === a.property && d.call(this) : this._filterSlider && (a = this.getRangeFilter(), this._filterSlider.setValues([a.getMinValue(), a.getMaxValue()]))
		}
	})
})(jQuery);
(function () {
	function d() {
		this._numIndicators = (this._indicatorInformation = (this._dataSet = this._colorMap && this._colorMap.getDataSet ? this._colorMap.getDataSet() : null) ? this._dataSet.getIndicatorInformation() : null) ? this._indicatorInformation.length : 0;
		this._numCategoricalIndicators = (this._categoricalIndInformation = this._dataSet ? this._dataSet.getCategoricalIndicatorInformation() : null) ? this._categoricalIndInformation.length : 0;
		var a = [],
		b = 0;
		this._colorMapProvider && this._colorMapProvider.getColorMapOfType(gav.representation.ConstantColorMap) &&
		a.push({
			index : b,
			constant : !0,
			name : "None"
		});
		this._numIndicators && this._numCategoricalIndicators && a.push({
			type : "header",
			name : "Numerical"
		});
		for (b = 0; b < this._numIndicators; b++)
			a.push({
				index : b,
				numerical : !0,
				name : this._indicatorInformation[b].toString(),
				item : this._indicatorInformation[b],
				id : this._indicatorInformation[b].id
			});
		if (this._numCategoricalIndicators) {
			a.push({
				type : "header",
				name : "Categorical"
			});
			for (b = 0; b < this._numCategoricalIndicators; b++)
				a.push({
					categorical : !0,
					index : b,
					name : this._categoricalIndInformation[b].toString(),
					item : this._categoricalIndInformation[b],
					id : this._categoricalIndInformation[b].id
				})
		}
		this._attributeComboBox.setDataProvider(a);
		this._attributeComboBox.setGroupingProvider(this._dataSet ? this._dataSet.getIndicatorGroupings() : null)
	}
	function b() {
		var a = this._colorMap._limits.slice();
		if (this._equalHandleSpacing) {
			for (var b = [0, 0], c = 1; c <= a.length - 4; c++)
				b.push(c / (a.length - 3));
			b.push(1);
			b.push(1);
			a = b
		}
		return a
	}
	function a() {
		var a = $(this._innerContainer).width(),
		c = $(this._innerContainer).height();
		this._colorLegend.width =
			a;
		this._colorLegend.height = c;
		if (this._colorMap && this._colorMap.getDataSet() && this._colorMap.getDataSet().getDataCube() && this._colorMap instanceof gav.representation.ColorMap) {
			for (var a = this._colorMap.getAttribute(), c = this._attributeComboBox.getDataProvider(), d = 0; d < c.length; d++)
				c[d].numerical && c[d].index === a && this._attributeComboBox.setSelectedIndex(d);
			if (this._equalHandleSpacing)
				for (var a = this._colorMap._colors.slice().reverse(), c = b.call(this), d = $(this._innerContainer).width(), j = $(this._innerContainer).height(),
					k = Math.max(1, c.length - 3), j = (j - 2 * k - 2 * (k - 2)) / k, m, k = 1; k < c.length - 2; k++) {
					m = this._canvases[k - 1];
					m || (m = document.createElement("canvas"), this._innerContainer.appendChild(m), this._canvases.push(m));
					m.width = d;
					m.height = j;
					m = m.getContext("2d");
					var o = m.createLinearGradient(0, j, 0, 0);
					o.addColorStop(1, gav.utils.Color.toRGB(a[2 * k]));
					o.addColorStop(0, gav.utils.Color.toRGB(a[2 * k + 1]));
					m.save();
					m.fillStyle = o;
					m.fillRect(0, 0, d, j);
					m.restore()
				}
			else {
				d = $(this._innerContainer).width();
				a = $(this._innerContainer).height();
				this._colorLegend.width =
					d;
				this._colorLegend.height = a;
				c = this._colorLegend.getContext("2d");
				j = this._colorMap._colors;
				k = b.call(this);
				m = c.createLinearGradient(0, a, 0, 0);
				m.addColorStop(k[0], gav.utils.Color.toRGB(j[0]));
				for (o = 1; o < k.length - 1; o++)
					m.addColorStop(k[o], gav.utils.Color.toRGB(j[2 * o - 1])), m.addColorStop(k[o], gav.utils.Color.toRGB(j[2 * o]));
				m.addColorStop(k[k.length - 1], gav.utils.Color.toRGB(j[j.length - 1]));
				c.save();
				c.fillStyle = m;
				c.fillRect(0, 0, d, a);
				j = this._filterSlider.getValues();
				d = (1 - j[1]) * a;
				j = j[0] * a;
				c.fillStyle = "rgba(255,255,255,0.6)";
				this._rangeFilter && this._rangeFilter.getInverted() ? c.fillRect(0, d, 4, a - d - j) : this._rangeFilter && (c.fillRect(0, 0, 4, d), c.fillRect(0, a - j, 4, j));
				c.restore()
			}
		}
	}
	function c(a) {
		if (a && a.property && "attribute" !== a.property) {
			if ("dataSet" !== a.property)
				return;
			d.call(this)
		}
		var c = $(this._innerContainer).find(".gav-legend-handle"),
		g = c.length,
		j = this._colorMap._limits,
		k = b.call(this),
		a = j ? j.length : 0;
		if (j) {
			if (g !== a - 2) {
				c.remove();
				for (var c = document.createDocumentFragment(), m, o = 1; o < a - 1; o += 1)
					g = document.createElement("div"),
					$(g).addClass("gav-legend-handle").attr("data-index", o), m = document.createElement("span"), g.appendChild(m), c.appendChild(g);
				this._innerContainer.appendChild(c)
			}
			var c = $(this._innerContainer).find(".gav-legend-handle"),
			n,
			p,
			r = this.getFormatter(),
			v = this._colorMap.getDataSet() ? this._colorMap.getDataSet().getDataCube() : null;
			if (v) {
				var t,
				u = this._colorMap.getAttribute();
				c.each(function (a) {
					n = j[a + 1];
					p = k[a + 1];
					t = v.getMinValue(u) + n * (v.getMaxValue(u) - v.getMinValue(u));
					$(this).css("top", 100 * (1 - p) + "%").children("span").text(r.getFormattedAttributeValue(u,
							t))
				})
			}
		} else
			c.remove()
	}
	gav.Klass("gav.components.ColorMapLegend2", {
		extend : gav.events.EventDispatcher,
		init : function () {
			gav.events.EventDispatcher.prototype.init.call(this);
			this._container = document.createElement("div");
			var b = this;
			this._width = 12;
			this._height = 230;
			$(this._container).css({
				position : "relative",
				zIndex : "100"
			}).addClass("gav-color-legend");
			this._innerContainer = document.createElement("div");
			$(this._innerContainer).css({}).addClass("gav-color-map");
			var e = "ontouchend" in document ? !0 : !1;
			this._filterSlider =
				new gav.controls.Slider({
					range : !0,
					vertical : !0,
					step : 0.001,
					slide : function (c) {
						b.getRangeFilter() && b.getRangeFilter().setMinMax(c[0], c[1]);
						a.call(b)
					},
					displayTooltip : !1
				});
			$(this._filterSlider.getDOMElement()).addClass("gav-slider-color-filter");
			this._filterContainer = document.createElement("div");
			$(this._filterContainer).css({
				position : "absolute",
				zIndex : "200",
				height : "100%",
				borderRadius : "0px",
				border : "0px solid rgba(0,0,0,0.5)"
			});
			$(this._filterContainer).hide();
			e || this._filterContainer.appendChild(this._filterSlider.getDOMElement());
			this._attributeComboBox = new gav.controls.ComboBox({
					vertical : !0
				});
			this._attributeComboBox.addEventListener("change", function () {
				var a = b._attributeComboBox.getSelectedItem();
				if (a && a.categorical) {
					if (b._colorMapProvider) {
						var c = b._colorMapProvider.getColorMapOfType(gav.representation.CategoricalColorMap);
						c && (c.setAttribute(a.index), b._colorMapProvider.setActiveColorMap(c))
					}
				} else
					a && a.constant ? b._colorMapProvider.setActiveColorMapType(gav.representation.ConstantColorMap) : b._colorMap && b._colorMap.setAttribute(a.index)
			});
			this._colorLegend = document.createElement("canvas");
			this._colorLegend.width = 0;
			this._colorLegend.height = 0;
			this._innerContainer.appendChild(this._colorLegend);
			this._canvases = [this._colorLegend];
			var d,
			j,
			k,
			m,
			o = $(document);
			$(this._innerContainer).delegate(".gav-legend-handle", "mousedown", function (a) {
				function c() {
					o.unbind("mouseup", c);
					o.unbind("mousemove", e);
					$(b._innerContainer).removeClass("gav-state-active")
				}
				function e(a) {
					var c = 1 - (a.pageY - v - $(b._innerContainer).offset().top) / $(b._innerContainer).height(),
					c = Math.min(k[1], c),
					c = Math.max(k[0], c);
					b._colorMap.setLimit(j, c);
					a.preventDefault();
					return !1
				}
				d = "SPAN" == a.target.nodeName ? $(a.target).parent() : a.target;
				j = parseInt($(d).attr("data-index"));
				if (b._equalHandleSpacing)
					return !1;
				m = $(b._innerContainer);
				m.addClass("gav-state-active");
				m.offset();
				var v = a.pageY - m.offset().top,
				v = a.pageY - $(this).offset().top;
				b._colorMap && b._colorMap._limits ? (k = [b._colorMap._limits[j - 1], b._colorMap._limits[j + 1]], 1 >= j && (k[0] = 0), j >= b._colorMap._limits.length - 1 && (k[1] = 1)) : k = [0, 1];
				o.bind("mousemove",
					e).bind("mouseup", c);
				a.preventDefault()
			}).delegate(".gav-legend-handle", "click", function (a) {
				var c = b.getColorMap(),
				e = c ? c.getDataSet() ? c.getDataSet().getDataCube() : null : null;
				if (c && e) {
					d = "SPAN" == a.target.nodeName ? $(a.target).parent() : a.target;
					var k = c.getLimits(),
					a = e.getMinValue(c.getAttribute()),
					e = e.getMaxValue(c.getAttribute());
					(k = prompt("Set value", gav.lerp(a, e, k[j]))) && c.setLimit(j, (k - a) / (e - a))
				}
			});
			e = document.createElement("div");
			$(e).css({}).addClass("gav-combobox-container");
			e.appendChild(this._attributeComboBox.getDOMElement());
			this._innerContainer.appendChild(e);
			this._container.appendChild(this._innerContainer);
			this._equalHandleSpacing = !1;
			e = document.createElement("div");
			$(e).gavButton({
				icon : "gav-icon-discrete",
				text : !1
			}).click(function () {
				b._equalHandleSpacing = !b._equalHandleSpacing;
				for (var a = 0; a < b._canvases.length; a++)
					b._canvases[a].style.display = 0 >= a || b._equalHandleSpacing ? "" : "none";
				b.refresh();
				c.call(b);
				$(this).toggleClass("gav-state-active", b._equalHandleSpacing)
			}).appendTo(this._container)
		},
		getDOMElement : function () {
			return this._container
		},
		setPosition : function (a, b) {
			$(this._container).css({
				top : b,
				left : a
			})
		},
		setColorMap : function (b) {
			if (this._colorMap !== b) {
				this._colorMap && (this._colorMap.removeEventListener("colorMapChanged", a, this), this._colorMap.removeEventListener("limitsChanged", c, this), this._colorMap.removeEventListener("propertyChange", c, this));
				if (this._colorMap = b)
					this._colorMap.addEventListener("colorMapChanged", a, this), this._colorMap.addEventListener("limitsChanged", c, this), this._colorMap.addEventListener("propertyChange", c, this);
				d.call(this);
				a.call(this);
				c.call(this)
			}
		},
		getColorMap : function () {
			return this._colorMap
		},
		setColorMapProvider : function (a) {
			this._colorMapProvider = a
		},
		setRangeFilter : function (a) {
			this._rangeFilter && this._rangeFilter.removeEventListener("propertyChange", this._onFilterChanged);
			(this._rangeFilter = a) ? (this._rangeFilter.addEventListener("propertyChange", this._onFilterChanged, this), $(this._filterContainer).show()) : $(this._filterContainer).hide();
			this._onFilterChanged()
		},
		getRangeFilter : function () {
			return this._rangeFilter
		},
		setDataSet : function () {},
		setFormatter : function (a) {
			this._formatter = a
		},
		getFormatter : function () {
			return this._formatter || new gav.representation.AutomaticNumericStringProvider
		},
		setVisibilityManager : function (a) {
			this._visibilityManager = a
		},
		getVisibilityManager : function () {
			return this._visibilityManager
		},
		setShowComboBox : function (a) {
			$(this._container).toggleClass("gav-no-combo", !a);
			this.refresh()
		},
		refresh : function () {
			a.call(this)
		},
		_onFilterChanged : function (b) {
			b ? "minValue" === b.property || "maxValue" === b.property ||
			"minMax" === b.property ? this._filterSlider && (b = this.getRangeFilter(), this._filterSlider.setValues([b.getMinValue(), b.getMaxValue()]), a.call(this)) : "inverted" === b.property && a.call(this) : this._filterSlider && (b = this.getRangeFilter(), this._filterSlider.setValues([b.getMinValue(), b.getMaxValue()]))
		}
	})
})(jQuery);
(function () {
	function d() {
		for (var a = this._colorMap.getAttribute(), b = this._attributeComboBox.getDataProvider(), e = 0; e < b.length; e++)
			b[e].categorical && b[e].index === a && this._attributeComboBox.setSelectedIndex(e)
	}
	function b() {
		this._numIndicators = (this._indicatorInformation = (this._dataSet = this._colorMap && this._colorMap.getDataSet ? this._colorMap.getDataSet() : null) ? this._dataSet.getIndicatorInformation() : null) ? this._indicatorInformation.length : 0;
		this._numCategoricalIndicators = (this._categoricalIndInformation =
				this._dataSet ? this._dataSet.getCategoricalIndicatorInformation() : null) ? this._categoricalIndInformation.length : 0;
		var a = [],
		b = 0;
		this._colorMapProvider && this._colorMapProvider.getColorMapOfType(gav.representation.ConstantColorMap) && a.push({
			index : b,
			constant : !0,
			name : "None"
		});
		this._numIndicators && this._numCategoricalIndicators && a.push({
			type : "header",
			name : "Numerical"
		});
		for (b = 0; b < this._numIndicators; b++)
			a.push({
				index : b,
				numerical : !0,
				name : this._indicatorInformation[b].toString(),
				item : this._indicatorInformation[b],
				id : this._indicatorInformation[b].id
			});
		if (this._numCategoricalIndicators) {
			a.push({
				type : "header",
				name : "Categorical"
			});
			for (b = 0; b < this._numCategoricalIndicators; b++)
				a.push({
					categorical : !0,
					index : b,
					name : this._categoricalIndInformation[b].toString(),
					item : this._categoricalIndInformation[b],
					id : this._categoricalIndInformation[b].id
				})
		}
		this._attributeComboBox.setDataProvider(a);
		this._attributeComboBox.setGroupingProvider(this._dataSet ? this._dataSet.getIndicatorGroupings() : null)
	}
	function a(a) {
		if (a && a instanceof
			gav.events.PropertyChangeEvent)
			switch (a.property) {
			case "dataSet":
				b.call(this);
			case "attribute":
				d.call(this)
			}
		var f = (a = this._colorMap.getDataSet()) ? a.getClassCube() : null;
		if (f) {
			var e = this._colorMap.getAttribute(),
			a = this._colorMap.getCategoryColors(e),
			f = f.getOrderedCategoricalValues(e),
			g;
			this._colorList.innerHTML = "";
			this._colorList.className = "gav-category-groups";
			var j = a ? a.length : 0;
			10 < j && (this._colorList.className = "gav-category-groups gav-mode-compact");
			for (var k = this, m = document.createDocumentFragment(),
				o = 0; o < j; o += 1) {
				e = document.createElement("li");
				g = document.createElement("span");
				e.appendChild(g);
				e.appendChild(document.createTextNode(f[o]));
				var n = new gav.controls.ColorPicker({
						element : g
					});
				n.addEventListener("change", function (a, b) {
					return function () {
						k._colorMap.setCategoryColor(void 0, a, b.getColor())
					}
				}
					(o, n));
				g.style.backgroundColor = a[o].toHex();
				m.appendChild(e)
			}
			this._colorList.appendChild(m)
		} else
			this._colorList.innerHTML = ""
	}
	gav.Klass("gav.components.CategoricalColorMapLegend", {
		extend : gav.events.EventDispatcher,
		init : function () {
			gav.events.EventDispatcher.prototype.init.call(this);
			this._container = document.createElement("div");
			var a = this;
			$(this._container).css({
				position : "relative"
			}).addClass("gav-categorical-color-legend");
			this._colorList = document.createElement("ul");
			this._attributeComboBox = new gav.controls.ComboBox({
					vertical : !0
				});
			this._attributeComboBox.addEventListener("change", function () {
				var b = a._attributeComboBox.getSelectedItem();
				if (b && b.numerical) {
					if (a._colorMapProvider) {
						var f = a._colorMapProvider.getColorMapOfType(gav.representation.ColorMap);
						f && (f.setAttribute(b.index), a._colorMapProvider.setActiveColorMap(f))
					}
				} else
					b && b.constant ? a._colorMapProvider.setActiveColorMapType(gav.representation.ConstantColorMap) : a._colorMap && a._colorMap.setAttribute(b.index)
			});
			var b = document.createElement("div");
			b.className = "gav-combobox-container";
			b.appendChild(this._attributeComboBox.getDOMElement());
			this._container.appendChild(b);
			this._container.appendChild(this._colorList)
		},
		getDOMElement : function () {
			return this._container
		},
		setPosition : function (a, b) {
			$(this._container).css({
				top : b,
				left : a
			})
		},
		setColorMap : function (c) {
			if (this._colorMap !== c) {
				if (!this._onColorMapChange) {
					var f = this;
					this._onColorMapChange = function () {
						a.apply(f, arguments)
					}
				}
				this._colorMap && (this._colorMap.removeEventListener("colorMapChanged", this._onColorMapChange), this._colorMap.removeEventListener("propertyChange", this._onColorMapChange));
				if (this._colorMap = c)
					this._colorMap.addEventListener("colorMapChanged", this._onColorMapChange), this._colorMap.addEventListener("propertyChange", this._onColorMapChange);
				b.call(this);
				d.call(this);
				a.call(this)
			}
		},
		getColorMap : function () {
			return this._colorMap
		},
		setFormatter : function (a) {
			this._formatter = a
		},
		getFormatter : function () {
			return this._formatter || new gav.representation.AutomaticNumericStringProvider
		},
		setVisibilityManager : function (a) {
			this._visibilityManager = a
		},
		getVisibilityManager : function () {
			return this._visibilityManager
		},
		setColorMapProvider : function (a) {
			this._colorMapProvider !== a && (this._colorMapProvider = a, b.call(this))
		},
		setShowComboBox : function (a) {
			$(this._container).toggleClass("gav-no-combo",
				!a)
		},
		refresh : function () {
			d.call(this)
		}
	})
})(jQuery);
(function () {
	function d() {
		this._colorMap && this._colorPicker.setColor(this._colorMap.getColor())
	}
	function b() {
		var a = this._colorMapProvider && this._colorMapProvider.getColorMapOfType(gav.representation.ColorMap),
		b = (a = a && a.getDataSet()) ? a.getIndicatorInformation() : null,
		f = b ? b.length : 0,
		e = a ? a.getCategoricalIndicatorInformation() : null,
		d = e ? e.length : 0,
		j = [],
		k;
		j.push({
			index : 0,
			constant : !0,
			name : "None",
			item : {
				name : "None"
			}
		});
		f && d && j.push({
			type : "header",
			name : "Numerical"
		});
		for (k = 0; k < f; k++)
			j.push({
				index : k,
				numerical : !0,
				name : b[k].toString(),
				item : b[k],
				id : b[k].id
			});
		if (d) {
			j.push({
				type : "header",
				name : "Categorical"
			});
			for (k = 0; k < d; k++)
				j.push({
					categorical : !0,
					index : k,
					name : e[k].toString(),
					item : e[k],
					id : e[k].id
				})
		}
		this._attributeComboBox.setDataProvider(j);
		this._attributeComboBox.setGroupingProvider(a ? a.getIndicatorGroupings() : null);
		this._attributeComboBox.setSelectedIndex(0)
	}
	gav.Klass("gav.components.ConstantColorMapLegend", {
		extend : gav.events.EventDispatcher,
		init : function () {
			gav.events.EventDispatcher.prototype.init.call(this);
			this._container = document.createElement("div");
			var a = this;
			$(this._container).css({
				position : "relative"
			}).addClass("gav-constant-color-legend");
			this._attributeComboBox = new gav.controls.ComboBox({
					vertical : !0
				});
			this._attributeComboBox.addEventListener("change", function () {
				var b = a._attributeComboBox.getSelectedItem();
				if (b && b.numerical && a._colorMapProvider) {
					var c = a._colorMapProvider.getColorMapOfType(gav.representation.ColorMap);
					c && (c.setAttribute(b.index), a._colorMapProvider.setActiveColorMap(c))
				}
			});
			var b =
				document.createElement("div");
			b.className = "gav-combobox-container";
			b.appendChild(this._attributeComboBox.getDOMElement());
			this._container.appendChild(b);
			b = document.createElement("div");
			$(b).appendTo(this._container).addClass("gav-color-box");
			this._colorPicker = new gav.controls.ColorPicker({
					element : b
				});
			this._colorPicker.addEventListener("change", function () {
				a._colorMap && a._colorMap.setColor(this.getColor())
			})
		},
		getDOMElement : function () {
			return this._container
		},
		getColorMap : function () {
			return this._colorMap
		},
		getColorMapProvider : function () {
			return this._colorMapProvider
		},
		setColorMapProvider : function (a) {
			this._colorMapProvider = a
		},
		setShowComboBox : function (a) {
			$(this._container).toggleClass("gav-no-combo", !a)
		},
		setColorMap : function (a) {
			if (this._colorMap !== a) {
				if (!this._onColorMapChange) {
					var c = this;
					this._onColorMapChange = function () {
						d.apply(c, arguments)
					}
				}
				this._colorMap && this._colorMap.removeEventListener("colorMapChanged", this._onColorMapChange);
				(this._colorMap = a) && this._colorMap.addEventListener("colorMapChanged",
					this._onColorMapChange);
				d.call(this);
				b.call(this)
			}
		},
		setFormatter : function () {},
		refresh : function () {
			b.call(this)
		}
	})
})();
(function () {
	function d() {
		!0 === this._visibleConstant ? $(this._container).removeClass("gav-state-hidden") : !1 === this._visibleConstant ? $(this._container).addClass("gav-state-hidden") : $(this._container).toggleClass("gav-state-hidden", !this._visible)
	}
	function b(a) {
		switch (a.property) {
		case "colorMap":
			f.call(this);
			break;
		case "formatter":
			this._currentLegend && this._currentLegend.setFormatter(a.newValue)
		}
	}
	function a() {
		var a = this._colorMapProvider ? this._colorMapProvider.getColorMaps() : [];
		if (!a || 2 > a.length)
			this._switchBtn.style.display =
				"none"
	}
	function c() {
		if (this._colorMapProvider) {
			var a = this._colorMapProvider.getActiveColorMapIndex() + 1,
			b = this._colorMapProvider.getColorMaps() ? this._colorMapProvider.getColorMaps().length : 0;
			a >= b && (a = 0);
			this._colorMapProvider.setActiveColorMapIndex(a)
		}
	}
	function f() {
		var a = (this._colorMap = this._explicitColorMap ? this._explicitColorMap : this._context && this._context.getColorMap()) && this._colorMap.getColorLegend && this._colorMap.getColorLegend();
		if (!a || !this._colorMap)
			this._currentLegend && (this._innerContainer.removeChild(this._currentLegend.getDOMElement()),
				this._currentLegend = null);
		else if (this._currentLegend instanceof a)
			this._currentLegend.setColorMap(this._colorMap), this._currentLegend.setColorMapProvider && this._currentLegend.setColorMapProvider(this._colorMapProvider), this._currentLegend.setShowComboBox && this._currentLegend.setShowComboBox(this._showComboBox), this._currentLegend.refresh && this._currentLegend.refresh();
		else {
			this._currentLegend && (this._innerContainer.removeChild(this._currentLegend.getDOMElement()), this._currentLegend = null);
			for (var b,
				c = 0; c < this._legends.length; c += 1)
				if (this._legends[c]instanceof a) {
					b = this._legends[c];
					break
				}
			b || (b = new a, this._legends.push(b));
			this._innerContainer.appendChild(b.getDOMElement());
			b.setColorMap(this._colorMap);
			b.setColorMapProvider && b.setColorMapProvider(this._colorMapProvider);
			b.setShowComboBox && b.setShowComboBox(this._showComboBox);
			b.refresh && b.refresh();
			this._context && b.setFormatter(this._context.getFormatter());
			this._currentLegend = b
		}
	}
	gav.Klass("gav.components.ColorLegendProvider", {
		extend : gav.events.EventDispatcher,
		implement : [gav.snapshot.ISnapshotReader, gav.snapshot.ISnapshotReadableComponent],
		init : function (a) {
			gav.events.EventDispatcher.prototype.init.call(this);
			var b = document.createElement("div");
			this._container = b;
			var f = this;
			this._width = 12;
			this._height = 230;
			this._visibleConstant = "auto";
			$(this._container).css({
				position : "absolute",
				zIndex : "100"
			}).addClass("gav-floating-color-legend");
			this._innerContainer = document.createElement("div");
			var d = document.createElement("div");
			$(d).css("cursor", "move").gavButton_old({
				icon : "gav-icon-move"
			});
			var m = document.createElement("div");
			$(m).gavButton_old({
				icon : "gav-icon-reload"
			}).click(function () {
				c.call(f)
			}).css({
				display : "none"
			});
			this._switchBtn = m;
			this._showComboBox = !0;
			this._colorMapProvider = null;
			$(d).bind("gavdragstart", function (c) {
				o = !0;
				r = $(b).offset().left;
				v = $(b).offset().top;
				n = c.gav.x - r;
				p = c.gav.y - v;
				$(b).css("left");
				$(b).css("top");
				$(a).css("border-color", "rgba(0,200,255,0.5)")
			}).bind("gavdrag", function (c) {
				if (!o)
					return !1;
				var f = c.gav.x - $(a).offset().left,
				d = c.gav.y - $(a).offset().top,
				f = f - n,
				d = d -
					p;
				$(b).css({
					top : d,
					left : f
				});
				c.preventDefault();
				return !1
			}).bind("gavdragend", function (c) {
				o = !1;
				$(a).css("border-color", "#999");
				var f = !1,
				d = !1,
				j = !1,
				k = !1;
				0 > c.gav.x ? f = !0 : c.gav.x > window.innerWidth && (d = !0);
				0 > c.gav.y ? j = !0 : c.gav.y > window.innerHeight && (k = !0);
				f ? $(b).animate({
					left : 0
				}, {
					queue : !1
				}) : d && $(b).animate({
					left : window.innerWidth - 64
				}, {
					queue : !1
				});
				j ? $(b).animate({
					top : 24
				}, {
					queue : !1
				}) : k && $(b).animate({
					top : window.innerHeight - 64
				}, {
					queue : !1
				})
			});
			var o = !1,
			n,
			p,
			r,
			v;
			this._container.appendChild(d);
			$(document);
			m = document.createElement("div");
			$(m).css({}).addClass("gav-combobox-container");
			this._container.appendChild(this._innerContainer);
			a ? a.appendChild(this._container) : (a = document.body, document.body.appendChild(this._container));
			this._legends = [];
			this._moveHandle = d
		},
		getSnapshotReaders : function () {
			return [this]
		},
		getSnapshotSite : function () {
			return {}

		},
		read : function (a) {
			this.setVisible("true" === $(a).children("components").children("floatingColorLegend").attr("visible"))
		},
		setPosition : function (a, b) {
			$(this._container).css({
				top : b,
				left : a
			})
		},
		setIsMovable : function (a) {
			this._isMovable =
				a;
			this._moveHandle.style.display = a ? "" : "none"
		},
		setShowComboBox : function (a) {
			this._showComboBox = a;
			this._currentLegend && this._currentLegend.setShowComboBox(a)
		},
		setColorMap : function (a) {
			this._explicitColorMap !== a && (this._explicitColorMap = a, f.call(this))
		},
		getColorMap : function () {
			return this._colorMap
		},
		setContext : function (a) {
			if (this._context !== a) {
				var c = this;
				this._onContextChange || (this._onContextChange = function () {
					b.apply(c, arguments)
				});
				this._context && (this._context.removeEventListener("propertyChange", this._onContextChange),
					this._dsBinding.unbind(), this._cmProviderBinding.unbind());
				if (this._context = a)
					this._context.addEventListener("propertyChange", this._onContextChange), this._cmProviderBinding = gav.utils.Binding.bindProperty(this, "colorMapProvider", this._context, "colorMapProvider"), this._dsBinding = gav.utils.Binding.bindSetter(function (a) {
							if (!a || !a.hasCategoricalData())
								c._switchBtn.style.display = "none"
						}, this._context, "dataSet");
				f.call(this)
			}
		},
		setVisibleConstant : function (a) {
			this._visibleConstant = a;
			d.call(this)
		},
		setVisible : function (a) {
			this._visible =
				a;
			d.call(this)
		},
		getVisible : function () {
			return this._visible
		},
		getColorMapProvider : function () {
			return this._colorMapProvider
		},
		setColorMapProvider : function (b) {
			if (this._colorMapProvider !== b) {
				if (!this._onCMPColorMapsChange) {
					var c = this;
					this._onCMPColorMapsChange = function () {
						a.apply(c, arguments)
					}
				}
				this._colorMapProvider && this._colorMapProvider.removeEventListener("colorMapsChanged", this._onCMPColorMapsChange);
				(this._colorMapProvider = b) && this._colorMapProvider.addEventListener("colorMapsChanged", this._onCMPColorMapsChange);
				this._currentLegend && this._currentLegend.setColorMapProvider && this._currentLegend.setColorMapProvider(b);
				a.apply(this)
			}
		}
	})
})(jQuery);
(function () {
	var d = {
		map : "gav.components.MapPanelExtended",
		mappanel : "gav.components.MapPanelExtended",
		histogram : "gav.components.BarChartPanel",
		barchart : "gav.components.BarChartPanel",
		"bar chart" : "gav.components.BarChartPanel",
		scatterplot : "gav.components.ScatterPlotPanel",
		"scatter plot" : "gav.components.ScatterPlotPanel",
		timegraph : "gav.components.TimeGraphPanel",
		"time graph" : "gav.components.TimeGraphPanel",
		distributionplot : "gav.components.DistributionBarChartPanel",
		"distribution plot" : "gav.components.DistributionBarChartPanel",
		distributionbarchart : "gav.components.DistributionBarChartPanel",
		distributionchart : "gav.components.DistributionBarChartPanel",
		distbarchart : "gav.components.DistributionBarChartPanel",
		pcp : "gav.components.ParallelCoordinatesPlotPanel",
		pcplot : "gav.components.ParallelCoordinatesPlotPanel",
		parallelcoordinatesplot : "gav.components.ParallelCoordinatesPlotPanel",
		"parallel coordinates plot" : "gav.components.ParallelCoordinatesPlotPanel",
		piechart : "gav.components.PieChartPanel",
		"pie chart" : "gav.components.PieChartPanel",
		radarchart : "gav.components.RadarChartPanel",
		"radar chart" : "gav.components.RadarChartPanel",
		timebarchart : "gav.components.TimeBarChartPanel",
		"time barchart" : "gav.components.TimeBarChartPanel",
		tablelens : "gav.components.TableLensPanel",
		"table lens" : "gav.components.TableLensPanel",
		scattermatrix : "gav.components.ScatterMatrixPanel",
		"scatter matrix" : "gav.components.ScatterMatrixPanel",
		datatable : "gav.components.DataTablePanel",
		"data table" : "gav.components.DataTablePanel",
		datagrid : "gav.components.DataTablePanel",
		proxy : "gav.components.Proxy",
		treemap : "gav.components.TreemapPanel"
	};
	gav.Klass("gav.components.ComponentLayoutManager", {
		extend : gav.events.EventDispatcher,
		implement : [gav.snapshot.IStorable],
		init : function (b, a) {
			gav.events.EventDispatcher.prototype.init.call(this);
			this._container = b;
			this._attribute = a || "data-component-panel"
		},
		setReusableComponents : function (b) {
			this._reusableComponents = b
		},
		state : function () {
			var b = this;
			return {
				layoutString : {
					get : function () {
						return b.getLayoutString()
					},
					set : function (a) {
						b.createLayout(a)
					}
				}
			}
		},
		getSnapshotType : function () {
			return gav.snapshot.SnapshotManager.type.APPLICATION
		},
		getPhase : function () {
			return gav.snapshot.SnapshotManager.phase.LAYOUT
		},
		createLayout : function (b, a) {
			a || (a = this._attribute);
			b && gav.utils.SplitLayoutGenerator.createLayout(b, this._container, a);
			var c = [],
			f,
			e,
			g = this._reusableComponents ? this._reusableComponents.slice() : [];
			$(this._container).find("[" + a + "]").each(function () {
				for (var b = this.getAttribute(a), b = (d[b.toLowerCase()] || b).split("."), k = window; k = k[b.shift()]; )
					f = k;
				if (f && "function" ==
					typeof f) {
					try {
						a : {
							b = f;
							if (g && g.length)
								for (k = 0; k < g.length; k++)
									if (g[k].constructor === b) {
										e = g.splice(k, 1)[0];
										break a
									}
							e = null
						}
						f = e || new f(this)
					} catch (m) {}

					f instanceof gav.components.ComponentPanel && (e && e.setParentContainer(this), c.push(f))
				}
			});
			this.dispatchEvent("layoutChange", [c]);
			return c
		},
		getLayoutString : function (b) {
			b || (b = this._attribute);
			return gav.utils.SplitLayoutGenerator.getLayoutString(this._container, b)
		}
	})
})();
(function () {
	function d() {
		this._listElement.find("input:checked").attr("checked", !1)
	}
	function b() {
		this._listElement.find("input").attr("checked", "true")
	}
	function a() {
		var a = this._selected,
		b;
		this._listElement.find("input[data-idx]").each(function (c, f) {
			b = $(f);
			var e = parseInt(b.attr("data-idx"));
			0 <= a.indexOf(e) ? b.attr("checked", !0) : b.attr("checked", !1)
		})
	}
	function c() {
		var a = [],
		b = this._selected,
		c = !1,
		f;
		this._listElement.find('input[type="checkbox"]:checked').each(function (e, d) {
			f = parseInt($(d).attr("data-idx"));
			!c && b[e] !== f && (c = !0);
			a.push(f)
		});
		a.length !== b.length && (c = !0);
		c && this.setSelected(a)
	}
	var f = "Indicators",
	e = "None",
	g = "All",
	j = "Apply";
	gav.Klass("gav.dialogs.IndicatorSelector", {
		extend : gav.events.EventDispatcher,
		init : function () {
			gav.events.EventDispatcher.prototype.init.call(this);
			gav.locale.requestResources(this, ["General"]);
			this._element = document.createElement("div");
			this._listElement = $(document.createElement("ul"));
			this._listElement.addClass("gav-indicator-list").appendTo(this._element);
			this._selected =
				[];
			var a = this,
			f = {};
			f[e] = function () {
				d.call(a)
			};
			f[g] = function () {
				b.call(a)
			};
			f[j] = function () {
				c.call(a)
			};
			$(this._element).dialog({
				title : "Indicators",
				autoOpen : !1,
				buttons : f
			})
		},
		setDataProvider : function (b) {
			this._dataProvider = b ? b : [];
			b = document.createDocumentFragment();
			this._listElement.html("");
			for (var c = this._dataProvider ? this._dataProvider.length : 0, f, e = 0; e < c; e++)
				f = document.createElement("li"), f.className = "gav-list-item", f.innerHTML = '<label><input type="checkbox" data-idx="' + e + '" />' + this._dataProvider[e].toString() +
					"</label>", b.appendChild(f);
			this._listElement.append(b);
			a.call(this)
		},
		setSelected : function (b) {
			var c = !1;
			if (b.length !== this._selected.length)
				c = !0;
			else
				for (var f = this._selected.length, e = 0; e < f; e++)
					if (0 > this._selected.indexOf(b[e])) {
						c = !0;
						break
					}
			this._selected = b;
			c && (a.call(this), this.dispatchEvent("selectedChange"))
		},
		getSelected : function () {
			return this._selected
		},
		show : function () {
			a.call(this);
			$(this._element).dialog("option", "maxHeight", window.innerHeight);
			$(this._element).dialog("open");
			$(this._element).height() >
			window.innerHeight && $(this._element).dialog("option", "height", Math.max(window.innerHeight - 20, 200))
		},
		close : function () {
			$(this._element).dialog("close")
		},
		localeChanged : function () {
			f = gav.locale.translate("General:indicators") || "Indicators";
			$(this._element).dialog("option", "title", f);
			e = gav.locale.translate("General:none") || "None";
			g = gav.locale.translate("General:all") || "All";
			j = gav.locale.translate("General:apply") || "Apply";
			var a = this,
			m = {};
			m[e] = function () {
				d.call(a)
			};
			m[g] = function () {
				b.call(a)
			};
			m[j] = function () {
				c.call(a)
			};
			$(this._element).dialog("option", "buttons", m)
		}
	})
})();
(function () {
	gav.Klass("gav.animation.AnimationController", {
		extend : gav.events.EventDispatcher,
		init : function () {
			gav.events.EventDispatcher.prototype.init.call(this);
			this._referenceDuration = 1E4;
			this._speed = 1;
			this._duration = this._speed * this._referenceDuration;
			this._durationSet = !1;
			this._sliceDuration = 200;
			this._updateInterval = 50;
			this._animationProgress = 0;
			this._isAnimationInitiated = this._playing = !1;
			this._explicitSlice = -1;
			this._resetProgressWhenDataSetChanged = !0
		},
		isPlaying : function () {
			return this._playing
		},
		setProgress : function (d) {
			this._animationProgress !== d && (this._animationProgress = d, this.dispatchEvent("progressChanged"), this._playing ? this.pause() : (this._isAnimationInitiated || this._initiateAnimation(), this.dispatchEvent("pause")))
		},
		getProgress : function () {
			return this._animationProgress
		},
		setSlice : function (d) {
			if (!this._dataSet || !this._dataSet.getDataCube())
				this._explicitSlice = d;
			else {
				var b = this._dataSet.getDataCube().getNumSlices() - 1,
				d = Math.min(Math.max(0, d), b);
				!this._dataSet || 1 > b ? this.setProgress(0) :
				this.setProgress(d / b);
				this.dispatchEvent("sliceExplicitlyChanged")
			}
		},
		getSlice : function () {
			return !this._dataSet || !this._dataSet.getSliceInformation() || !this._dataSet.getSliceInformation().length ? 0 : Math.round((this._dataSet.getSliceInformation().length - 1) * this.getProgress())
		},
		setDuration : function (d) {
			this._duration = d;
			this._durationSet = !0;
			this._speed = this._sliceDuration / (this._numSlices ? this._duration / this._numSlices : this._duration);
			this.dispatchEvent("speedChanged")
		},
		getDuration : function () {
			return this._duration
		},
		setSpeed : function (d) {
			this._speed = d;
			this._duration = this._sliceDuration * this._numSlices / this._speed;
			this.dispatchEvent("speedChanged")
		},
		getSpeed : function () {
			return this._speed
		},
		setUpdateInterval : function (d) {
			this._updateInterval = d;
			this._animationTimer && this._animationTimer.setUpdateInterval(d)
		},
		setDataSet : function (d) {
			this._dataSet = d;
			this._numSlices = 0;
			this._dataSet && (this._numSlices = this._dataSet.getDataCube() ? this._dataSet.getDataCube().getNumSlices() : 0, !this._durationSet && this._dataSet.getDataCube() ?
				this._udration = this._sliceDuration * this._numSlices / this._speed : this._duration && (this._speed = this._sliceDuration / (this._numSlices ? this._duration / this._numSlices : this._duration), this.dispatchEvent("speedChanged")), this._resetProgressWhenDataSetChanged && this.setSlice(0))
		},
		setResetProgressWhenDataSetChanged : function (d) {
			this._resetProgressWhenDataSetChanged = d
		},
		getResetProgressWhenDataSetChanged : function () {
			return this._resetProgressWhenDataSetChanged
		},
		play : function () {
			this._playing || (this._isAnimationInitiated ||
				this._initiateAnimation(), this._playing = !0, this.dispatchEvent("playingChanged"), this._animationTimer || (this._animationTimer = new gav.utils.Timer(this._updateInterval, 0), this._animationTimer.addEventListener("tick", this._dispatchTimerChangedEvent, this)), this._animationTimer.setUpdateInterval(this._updateInterval), 1 === this._animationProgress && (this._animationProgress = 0, this.dispatchEvent("progressChanged")), this.dispatchEvent("playBegin"), this._animationTimer.start(), this._startedAt = Date.now())
		},
		pause : function () {
			this._playing &&
			this._animationTimer && this._animationTimer.isRunning() && (this.dispatchEvent("pause"), this._playing = !1, this.dispatchEvent("playingChanged"), this._animationTimer.stop())
		},
		stop : function () {
			this._animationTimer && (this.dispatchEvent("stop"), this._playing = !1, this.dispatchEvent("playingChanged"), this.dispatchEvent("sliceExplicitlyChanged"), this._animationTimer.stop(), this._animationTimer.reset())
		},
		_dispatchTimerChangedEvent : function () {
			this._animationProgress += this._updateInterval / this._duration;
			1 < this._animationProgress ?
			(this._animationProgress = 1, this.dispatchEvent("progressChanged"), this.stop()) : (this.dispatchEvent("progressChanged"), this.dispatchEvent("timerChanged"))
		},
		_initiateAnimation : function () {
			this._animationTimer && (this._animationTimer.stop(), this._animationTimer = null);
			this.dispatchEvent("initiateAnimation");
			this._isAnimationInitiated = !0
		}
	});
	gav.Klass("gav.utils.Timer", {
		extend : gav.events.EventDispatcher,
		init : function (d, b) {
			gav.events.EventDispatcher.prototype.init.call(this);
			this._updateInterval = d;
			this._repeatCount =
				0 < b ? b : 0;
			this._currenCount = 0;
			this._running = !1;
			this._timer = null
		},
		setUpdateInterval : function (d) {
			this._updateInterval = d;
			this._running && (clearInterval(this._timer), this._running = !1, this.start())
		},
		reset : function () {
			this._running && this.stop();
			this._currenCount = 0
		},
		stop : function () {
			this._timer && clearInterval(this._timer);
			this._running = !1
		},
		start : function () {
			if (!this._running) {
				var d = this;
				this._timer = setInterval(function () {
						d._step()
					}, this._updateInterval);
				this._running = !0;
				this._last = Date.now()
			}
		},
		isRunning : function () {
			return this._running
		},
		_step : function () {
			this._repeatCount && this._currenCount > this._repeatCount || (this._currenCount++, this.dispatchEvent("tick"), this._repeatCount && this._currenCount >= this._repeatCount && this.stop())
		}
	})
})();
(function (d) {
	function b() {
		if (this._controller) {
			var a = this._controller.getSpeed();
			this._speedBtnControl.setLabel(a.toFixed(3).replace(/0{0,2}$/, ""));
			this._speeds.each(function () {
				parseFloat(this.getAttribute("value")) === a ? this.setAttribute("checked", !0) : (this.removeAttribute("checked"), this.checked = !1)
			})
		}
	}
	gav.Klass("gav.animation.AnimationControlBar", {
		extend : gav.events.EventDispatcher,
		init : function (a) {
			gav.events.EventDispatcher.prototype.init.call(this);
			var b = this;
			this._controller = null;
			d(a).addClass("gav-animation-bar");
			var f = document.createElement("div");
			d(f).css({
				display : "table",
				height : "100%",
				width : "100%"
			});
			var e = document.createElement("div");
			d(e).css({
				display : "table-cell",
				"vertical-align" : "middle",
				width : "148px"
			}).addClass("gav-animation-controls");
			this._playBtn = document.createElement("button");
			d(this._playBtn).bind("gavtap", function () {
				b._controller && (b._controller.isPlaying() ? b._controller.stop() : b._controller.play())
			}).gavButton_old({
				iconize : !0,
				icon : "gav-icon-play"
			});
			this._leftBtn = document.createElement("button");
			d(this._leftBtn).bind("gavtap", function () {
				b._controller && b._controller.setSlice(b._controller.getSlice() - 1)
			}).gavButton_old({
				iconize : !0,
				icon : "gav-icon-back"
			});
			this._rightBtn = document.createElement("button");
			d(this._rightBtn).bind("gavtap", function () {
				b._controller && b._controller.setSlice(b._controller.getSlice() + 1)
			}).gavButton_old({
				iconize : !0,
				icon : "gav-icon-forward"
			});
			var g = document.createElement("div");
			d(g).css({
				display : "table-cell",
				"vertical-align" : "middle",
				fontSize : "11px",
				paddingRight : "1.5em"
			});
			this._labelContainer = document.createElement("div");
			d(this._labelContainer).css({
				height : "1em"
			}).addClass("gav-label-container");
			this._ticksContainer = document.createElement("div");
			d(this._ticksContainer).addClass("gav-tick-container");
			this._ticksCanvas = document.createElement("canvas");
			this._ticksCanvas.height = 10;
			this._slider = document.createElement("div");
			this._timeSlider = new gav.controls.Slider({
					min : 0,
					max : 1,
					value : 0,
					slide : function (a) {
						b._controller.setProgress(a)
					},
					stop : function () {
						b._placeTimeSlider();
						b._controller.dispatchEvent("sliceExplicitlyChanged")
					},
					displayTooltip : !1,
					highlightProgress : !0
				});
			this._slider.appendChild(this._timeSlider.getDOMElement());
			d(this._slider).css({
				width : "100%",
				margin : "0 auto"
			});
			var j = new gav.controls.Popup,
			k = j.getDOMElement();
			k.style.padding = "8px";
			k.innerHTML = "<div>Speed</div><div class='gav-btn-group-vertical gav-animation-speeds'><input type='radio' value='0.1' name='gav-animation-speed'/><input type='radio' value='0.2' name='gav-animation-speed'/><input type='radio' value='0.5' name='gav-animation-speed'/><input type='radio' value='1.0' name='gav-animation-speed'/><input type='radio' value='2.0' name='gav-animation-speed'/><input type='radio' value='4.0' name='gav-animation-speed'/></div>";
			var m = document.createElement("button");
			m.className = "gav-animation-speeds";
			this._speedBtnControl = new gav.controls.PopupButton({
					container : m,
					label : "1",
					iconize : !1,
					size : "small",
					icons : {
						left : null,
						right : null
					},
					popupDirection : "top"
				}, j);
			d(m).addClass("gav-btn-label").css("font-size", "11px");
			this._speeds = d(k).find("input");
			this._speeds.gavButton({
				block : !0
			}).change(function () {
				if (b._controller) {
					var a = b._speeds.filter(":checked").val();
					b._controller.setSpeed(parseFloat(a));
					j.hide()
				}
			});
			d(e).append(this._leftBtn).append(this._playBtn).append(this._rightBtn).append(m);
			g.appendChild(this._labelContainer);
			g.appendChild(this._ticksContainer);
			g.appendChild(this._slider);
			this._sliderContainer = g;
			this._controlsContainer = e;
			f.appendChild(e);
			f.appendChild(g);
			a.appendChild(f);
			this._container = a;
			d(a).bind("gavresize", function () {
				b._validateSize()
			})
		},
		setAnimationController : function (a) {
			if (this._controller !== a && (this._controller && (this._dataSetBinding.unbind(), this._controller.removeEventListener("timerChanged", this._onTimerChanged, this), this._controller.removeEventListener("playingChanged",
							this._onPlayingChanged, this), this._controller.removeEventListener("progressChanged", this._onProgressChanged, this), this._controller.removeEventListener("progressChanged", this._onProgressChanged, this), this._controller.removeEventListener("speedChanged", b, this)), this._controller = a))
				this._controller.addEventListener("timerChanged", this._onTimerChanged, this), this._controller.addEventListener("playingChanged", this._onPlayingChanged, this), this._controller.addEventListener("progressChanged", this._onProgressChanged,
					this), this._controller.addEventListener("speedChanged", b, this), this._dataSetBinding = gav.utils.Binding.bindProperty(this, "dataSet", this._controller, "dataSet"), b.call(this)
		},
		setDataSet : function (a) {
			if (this._dataSet !== a && (a = (this._dataSet = a) ? this._dataSet.getDataCube() : null)) {
				var a = a.getNumSlices(),
				b = this._dataSet.getSliceInformation(),
				f;
				this._labels || (this._labels = []);
				this._ticks || (this._ticks = []);
				for (var e = 0; e < a; e++)
					f = this._labels[e], f || (f = document.createElement("span"), this._labelContainer.appendChild(f),
						this._labels.push(f)), f.innerHTML = b[e].name, d(f).css({
						position : "absolute",
						left : 100 * e / (a - 1) + "%",
						fontSize : "1em"
					}), f = this._ticks[e], f || (f = document.createElement("span"), this._ticksContainer.appendChild(f), this._ticks.push(f)), d(f).css({
						left : 100 * e / (a - 1) + "%"
					}).addClass("gav-ui-tick gav-ui-tick-major");
				for (; this._labels.length && this._labels.length > a; )
					f = this._labels.pop(), this._labelContainer.removeChild(f);
				for (; this._ticks.length && this._ticks.length > a; )
					f = this._ticks.pop(), this._ticksContainer.removeChild(f);
				this._validateSize()
			}
		},
		setSlice : function (a) {
			this._slice = a;
			if (this._dataSet) {
				var b = this._dataSet.getDataCube() ? this._dataSet.getDataCube().getNumSlices() : 0;
				this._timeSlider.setValue(a / (b - 1))
			}
		},
		_placeTimeSlider : function () {
			var a = this._timeSlider.getValue();
			if (this._dataSet) {
				var b = this._dataSet.getDataCube().getNumSlices() - 1;
				this._timeSlider.setValue(Math.round(a * b) / b)
			}
			a = this._timeSlider.getValue();
			this._controller.setProgress(a)
		},
		_onTimerChanged : function () {
			this._timeSlider.setValue(this._controller.getProgress())
		},
		_onPlayingChanged : function () {
			this._placeTimeSlider();
			d(this._playBtn).toggleClass("gav-state-active", this._controller.isPlaying()).children(".gav-icon").toggleClass("gav-icon-play", !this._controller.isPlaying()).toggleClass("gav-icon-pause", this._controller.isPlaying())
		},
		_onProgressChanged : function () {
			this.setSlice(this._controller.getSlice())
		},
		_drawTicks : function () {
			this._ticksCanvas.width = d(this._sliderContainer).innerWidth();
			var a = this._ticksCanvas.getContext("2d");
			a.clearRect(0, 0, this._ticksCanvas.width,
				this._ticksCanvas.height);
			var b = this._ticksCanvas.width,
			f = 0;
			this._dataSet && (f = this._dataSet.getDataCube().getNumSlices());
			if (!(1 > f)) {
				var e = 0,
				g;
				a.beginPath();
				for (var j = 0; j <= f - 1; j++)
					e = 0.5 + Math.floor(b * j / (f - 1)), j == f - 1 && (e -= 1), (g = "none" !== d(this._labels[j]).css("display")) ? a.moveTo(e, 4) : a.moveTo(e, 6), a.lineTo(e, 8);
				a.stroke()
			}
		},
		_validateSize : function () {
			var a = d(this._container).width() - 10,
			b = d(this._container).height();
			d(this._container).children("div").css({});
			d(this._controlsContainer).outerWidth(!0);
			d(this._labelContainer).css({
				position : "relative",
				display : 26 > b ? "none" : "block"
			});
			d(this._slider).css({
				width : "100%",
				margin : "0 auto"
			});
			if (b = this._dataSet ? this._dataSet.getDataCube() : null) {
				for (var b = b.getNumSlices(), f, a = d(this._labelContainer).width(), e = d(this._labels).width() + 8, g = a / (b - 1), e = Math.ceil(e / g), a = Math.floor(a / (e * g)), g = 0; g < b; g++)
					f = this._labels[g], d(f).css({
						display : "none"
					}), f = this._ticks[g], d(f).addClass("gav-ui-tick-minor");
				for (g = 0; g <= a; g++)
					f = this._labels[g * e], d(f).css({
						left : 100 * g * e / (b - 1) + "%",
						marginLeft : -d(f).width() / 2 + "px",
						display : "block"
					}), f = this._ticks[g * e], d(f).removeClass("gav-ui-tick-minor").addClass("gav-ui-tick-major")
			}
		}
	})
})(jQuery);
(function (d) {
	gav.Klass("gav.controls.Button", {
		extend : gav.events.EventDispatcher,
		init : function (b) {
			gav.events.EventDispatcher.prototype.init.call(this);
			var a = d.extend({
					iconize : !1,
					icon : !1,
					size : void 0,
					type : void 0,
					block : !1,
					icons : {
						left : !1,
						right : !1
					},
					text : !0,
					label : "&nbsp;",
					container : null,
					i18n : null,
					enabled : !0
				}, b),
			c = a.container ? a.container : document.createElement("button"),
			f;
			if ("checkbox" === c.getAttribute("type") || "radio" === c.getAttribute("type"))
				f = c.getAttribute("value");
			f = b.label || d(c).text() || f || a.label;
			d(c).html("");
			if ("checkbox" === c.getAttribute("type") || "radio" === c.getAttribute("type")) {
				var b = c,
				e = document.createElement("div");
				e.className = "gav-btn-wrap";
				c = document.createElement("button");
				b.parentElement.insertBefore(e, b);
				e.appendChild(b);
				e.appendChild(c);
				d.browser.msie && 9 > parseInt(d.browser.version) && d(b).change(function (a) {
					d(c).toggleClass("gav-state-active", a.target.checked)
				})
			}
			d(c).addClass("gav-button");
			if (a.size)
				switch (a.size) {
				case "large":
					d(c).addClass("gav-btn-large");
					break;
				case "small":
					d(c).addClass("gav-btn-small")
				}
			if (a.type)
				switch (a.type) {
				case "primary":
					d(c).addClass("gav-btn-primary");
					break;
				case "inverse":
					d(c).addClass("gav-btn-inverse");
					break;
				case "success":
					d(c).addClass("gav-btn-success")
				}
			a.block && d(c).addClass("gav-btn-block");
			a.icon && !a.icons.left && (a.icons.left = a.icon);
			this._label = f;
			this._element = c;
			this._element.setAttribute("role", "button");
			this.setEnabled(a.enabled);
			(a.icon || a.icons && a.icons.left) && d(c).append("<span class='gav-icon gav-icon-primary'></span>").addClass("gav-icon-primary").children(".gav-icon-primary").addClass(a.icons.left);
			a.icons && a.icons.right && d(c).append("<span class='gav-icon gav-icon-secondary'></span>").addClass("gav-icon-secondary").children(".gav-icon-secondary").addClass(a.icons.right);
			!0 === a.iconize && d(c).attr("data-iconized", a.iconize);
			!0 !== a.text && d(c).addClass("gav-no-text");
			b = document.createElement("span");
			b.className = "gav-btn-text";
			a.i18n && b.setAttribute(gav.i18n.htmlAttribute, a.i18n);
			b.innerHTML = f;
			d(c).append(b)
		},
		appendTo : function (b) {
			b.appendChild(this._element)
		},
		getDOMElement : function () {
			return this._element
		},
		destroy : function () {},
		setLabel : function (b) {
			this._label = b;
			this._label || (this._label = "&nbsp;");
			d(".gav-btn-text", this._element).html(this._label)
		},
		setEnabled : function (b) {
			this._enabled !==
			b && (this._enabled = b, this._element.setAttribute("aria-disabled", !this._enabled))
		}
	})
})(jQuery);
(function () {
	function d(a) {
		a.data.obj._currentParent == a.target || $(a.data.obj._currentParent).has(a.target).length ? a.data.obj._isShowing && (a.data.obj._cancelShow = !0, a.data.obj.hide()) : a.target != a.data.element && ($(a.data.element).has(a.target).length || a.data.obj.hide())
	}
	function b(a, b, f) {
		f || (f = "bottom");
		if (b && a) {
			a.style.minWidth = "";
			var e = $(b).offset(),
			d = e.left,
			j = e.top,
			k = $(b).outerHeight(),
			e = $(b).outerWidth(),
			m = $(window).height(),
			o = $(window).width(),
			n = document.body.scrollTop;
			Math.max(window.innerHeight,
				document.body.clientHeight);
			var p = $(a).outerHeight(),
			r = $(a).outerWidth();
			$(b).hasClass("gav-combobox-vertical") && (k = e, e = $(b).outerHeight());
			switch (f) {
			case "top":
				b = d + r < o ? d : 0 < d + e - r ? d + e - r : Math.max(0, o - r);
				f = j - p > n ? j - p : j + k + p < n + m ? j + k : n;
				break;
			case "left":
				b = 0 < d - r ? d - r : d + e + r < o ? d + e : 0;
				f = j + p < n + m ? j : j + k - p > n ? j + k - p : Math.max(n, m - p);
				break;
			case "right":
				b = d + e + r < o ? d + e : 0 < d - r ? d - r : Math.max(0, o - r);
				f = j + p < n + m ? j : j + k - p > n ? j + k - p : Math.max(n, m - p);
				break;
			default:
				b = d + r < o ? d : 0 < d + e - r ? d + e - r : Math.max(0, o - r),
				f = j + k + p < n + m ? j + k : j - p > n ? j - p : Math.max(0,
						n + m - p)
			}
			a.style.minWidth = e - 2 + "px";
			a.style.left = b + "px";
			$(a).css({
				left : b,
				top : f
			})
		}
	}
	gav.Klass("gav.controls.Popup", {
		extend : gav.events.EventDispatcher,
		init : function (a) {
			gav.events.EventDispatcher.prototype.init.call(this);
			var b = this;
			this._element = document.createElement("div");
			this._element.className = "gav-popup";
			this._isShowing = !1;
			a && ($("body").append(this._element), this._isShowing = !1);
			this._currentParent = null;
			this._cancelShow = !1;
			this._onMouseDown = function (a) {
				d.call(b, a)
			}
		},
		getDOMElement : function () {
			return this._element
		},
		show : function (a, c) {
			this._currentParent = a;
			if (this._cancelShow)
				this._cancelShow = !1;
			else {
				if (!this._isShowing) {
					$(this._element).removeClass("gav-state-hidden");
					$("body").append(this._element);
					var f = this;
					this._isShowing = !0;
					this.dispatchEvent("show");
					setTimeout(function () {
						$(window).bind("mousedown", {
							element : f._element,
							obj : f
						}, f._onMouseDown)
					}, 10)
				}
				this._currentDirection = c;
				b(this._element, a, c)
			}
		},
		hide : function () {
			$(this._element).addClass("gav-state-hidden");
			$(window).unbind("mousedown", this._onMouseDown);
			$(this._element).detach();
			this.dispatchEvent("close");
			this._currentParent = null;
			this._isShowing = !1
		},
		adjust : function () {
			b(this._element, this._currentParent, this._currentDirection)
		}
	})
})();
(function (d) {
	function b() {
		for (var a, b, e = this._dataProvider ? this._dataProvider.length : 0, d = 0; d < e; d += 1)
			if (b = this._dataProvider[d], (a = this._inner.children ? this._inner.children[d] : null) && b) {
				if ("radio" === b.type || "check" === b.type)
					"function" == typeof b.checked ? a.setAttribute("aria-checked", b.checked()) : b.checked ? a.setAttribute("aria-checked", "true") : a.setAttribute("aria-checked", "false");
				"object" == typeof b && null != b && "disabled" in b && ("function" == typeof b.disabled ? a.setAttribute("aria-disabled", b.disabled()) :
					!0 === b.disabled ? a.setAttribute("aria-disabled", "true") : a.setAttribute("aria-disabled", "false"))
			}
	}
	function a(a) {
		return !a ? "&nbsp" : "string" == typeof a ? a : a.name
	}
	gav.Klass("gav.controls.PopupButton", {
		extend : gav.controls.Button,
		init : function (a, f) {
			var e = d.extend(!0, {
					text : !0,
					icons : {
						right : "gav-icon-triangle-down"
					},
					popupDirection : "bottom"
				}, a);
			gav.controls.Button.prototype.init.call(this, e);
			this._selectedIndex = -1;
			var g = this;
			g._isOpen = !1;
			var j = this._element;
			j.setAttribute("aria-haspopup", !0);
			d(this._element).mousedown(function (a) {
				1 ===
				a.which && g._enabled && (g._isOpen ? g._popUp.hide() : (b.call(g), g._popUp.show(j, e.popupDirection), g._isOpen = !0, d(j).addClass("gav-state-active"), g.dispatchEvent("open")))
			});
			this._inner = document.createElement("div");
			this._inner.setAttribute("role", "menu");
			d(this._inner).delegate('div[role="menuitem"],div[role="menuitemradio"],div[role="menuitemcheckbox"]', "gavtap", function (a) {
				"true" !== d(a.target).attr("aria-disabled") && (a = d(a.target).index(), g.dispatchEvent("itemClick", [a, g._dataProvider[a]]), g._popUp.hide())
			});
			f ? this._popUp = f : (this._popUp = new gav.controls.Popup, this._popUp.getDOMElement().appendChild(this._inner));
			this._popUp.addEventListener("close", function () {
				g._isOpen = !1;
				d(j).removeClass("gav-state-active")
			})
		},
		setDataProvider : function (c) {
			if (this._dataProvider !== c) {
				this._dataProvider = c;
				this._inner.innerHTML = "";
				for (var f = document.createDocumentFragment(), e = c ? c.length : 0, d, j, k = 0; k < e; k += 1)
					if (d = document.createElement("div"), j = c[k])
						"separator" === j.type ? d.setAttribute("role", "separator") : "header" === j.type ? (d.innerHTML =
								a(c[k]), d.setAttribute("role", "menuitem"), d.setAttribute("data-header", "true")) : (d.innerHTML = a(c[k]), d.setAttribute("role", "menuitem")), "check" === j.type ? d.setAttribute("role", "menuitemcheckbox") : "radio" === j.type && d.setAttribute("role", "menuitemradio"), f.appendChild(d);
				b.call(this);
				this._inner.appendChild(f)
			}
		},
		getDataProvider : function () {
			return this._dataProvider
		}
	})
})(jQuery);
(function (d) {
	function b(a) {
		var c = [];
		if (!a || !a.length)
			return c;
		for (var f = 0; f < a.length; f++)
			a[f] && a[f].children && a[f].children.length ? c = c.concat(b(a[f].children)) : c.push(a[f]);
		return c
	}
	function a(b) {
		if (!(b && 0 <= this._dataProviderIDs.indexOf(b.getId()))) {
			for (var c = b.getLeaves(), f = !1, e = 0; e < c.length; e++)
				0 <= this._dataProviderIDs.indexOf(c[e].getId()) && (f = !0);
			if (f) {
				if (b.isBranch()) {
					b = b.getChildren().slice();
					for (e = 0; e < b.length; e++)
						a.call(this, b[e])
				}
			} else
				b.setParent(null)
		}
	}
	function c(a) {
		for (var b = [], f = a ? a.length :
				0, e, d = 0; d < f; d++)
			if (e = new gav.tree.TreeNode(a[d].id), e.label = a[d].label, a[d].children && a[d].children.length) {
				var g = c.call(this, a[d].children);
				g && g.length && (e.setChildren(g), b.push(e))
			} else
				a[d].id && 0 <= this._dataProviderIDs.indexOf(a[d].id) && b.push(e);
		return b
	}
	function f(a) {
		for (var b = a ? a.length : 0, c, e, d = [], g = 0; g < b; g++) {
			c = a[g];
			if (c.isBranch())
				e = {},
			e.label = c.getName(),
			e.children = f.call(this, c.getChildren());
			else if (c.getId())
				for (var j = 0; j < this._dataProvider.length; j++)
					this._dataProvider[j].id === c.getId() &&
					(e = this._dataProvider[j]);
			e && d.push(e)
		}
		return d
	}
	function e() {
		g.call(this);
		for (var a = [], b = [], c = 0; c < this._selectedIndices.length; c++) {
			var f = this._dataProvider ? this._dataProvider[this._selectedIndices[c]] : null;
			f && a.push(f)
		}
		var e,
		m = this._selectedIndices;
		d("option", this._selectElement).each(function (a, b) {
			e = parseInt(this.getAttribute("value"));
			b.selected = !isNaN(e) && 0 <= e && 0 <= m.indexOf(e)
		});
		k(this._internalDataProvider, function (c) {
			0 <= a.indexOf(c.data) && (c.selected = 1, b.push(c))
		});
		this._selectedItems = b;
		f = this._internalDataProvider ?
			this._internalDataProvider.length : 0;
		for (c = 0; c < f; c++)
			j(this._internalDataProvider[c])
	}
	function g() {
		k(this._internalDataProvider, function (a) {
			a.selected = 0
		})
	}
	function j(a) {
		if (!a || !a.children || !a.children.length)
			return a ? a.selected : 0;
		for (var b = 0, c = a.children, f = c ? c.length : 0, e = !1, d = !1, g = 0; g < f; g++) {
			var k = j(c[g]);
			0 === k ? d = !0 : 1 === k ? e = !0 : 2 === k && (e = d = !0)
		}
		e && !d ? b = 1 : e && d && (b = 2);
		return a.selected = b
	}
	function k(a, b) {
		if (a && a.length && "function" == typeof b)
			for (var c = 0; c < a.length; c++)
				a[c] && (b(a[c]), a[c].children && a[c].children &&
					k(a[c].children, b))
	}
	function m(a, b) {
		if (a) {
			Array.isArray(a) || (a = [a]);
			for (var c = a.length, f, e, d = [], g = 0; g < c; g++)
				if (f = a[g]) {
					e = {};
					e.label = p(f);
					e.selected = !1;
					e.data = f;
					e.type = f.type;
					if (f.children && f.children.length) {
						e.children = m(f.children, b);
						f = e.children.length;
						for (var j = 0, k = 0; k < f; k++)
							j += e.children[k].providerIndex;
						e.providerIndex = j / (f || 1)
					} else
						f = b.indexOf(f), 0 <= f && (e.providerIndex = f);
					d.push(e)
				}
			return d
		}
	}
	function o() {
		this.dispatchEvent("change")
	}
	function n() {
		!this._selectedItems || !this._selectedItems.length ?
		d(this._labelCanvas).html("&emsp;") : d(this._labelCanvas).text(this._selectedItems[0].label)
	}
	function p(a) {
		return !a ? "&nbsp" : "string" == typeof a ? a : "undefined" != typeof a.label ? a.label : "undefined" != typeof a.name ? a.name : a.toString ? a.toString() : ""
	}
	gav.Klass("gav.controls.ComboBox", {
		extend : gav.Invalidatable,
		init : function (a) {
			gav.Invalidatable.prototype.init.call(this);
			var b = {
				vertical : !1,
				width : "auto",
				height : "auto",
				align : "left",
				clean : !1
			};
			this._enabled = !0;
			a = d.extend(b, a);
			this._clean = a.clean;
			this._vertical = a.vertical;
			this._selectedIndex = -1;
			this._selectedIndices = [this._selectedIndex];
			var c = b.container || document.createElement("div"),
			f = this,
			b = !1;
			gav.helpers.isHandheld && gav.support.touch ? b = !0 : d.browser.msie && 9 > parseInt(d.browser.version) && (b = !0);
			this._labelCanvas = document.createElement("div");
			d(this._labelCanvas).css({
				overflow : "hidden",
				"text-overflow" : "ellipsis",
				cursor : "default",
				"white-space" : "nowrap"
			});
			f._isOpen = !1;
			this._popUp = new DropdownMenu;
			this._popUp.addEventListener("change", function () {
				this._selected[0] !==
				f._selectedIndex && (f._selectedIndex = this._selected[0], n.call(f), o.call(f))
			});
			this._popUp.addEventListener("close", function () {
				f._isOpen = !1
			});
			this._popUp.addEventListener("itemClick", function (a) {
				a = f._dataProvider.indexOf(a.data);
				f._selectedIndex = a;
				f._selectedIndices[0] !== a && (f._selectedIndices = [a], o.call(f), e.call(f), n.call(f), this.refresh())
			});
			d(c).addClass("gav-combobox");
			d(c).addClass(this._vertical ? "gav-combobox-vertical" : "gav-combobox-horizontal");
			this._clean && d(c).addClass("gav-combo-label");
			this._arrowButton = document.createElement("span");
			this._selectedIndices = [];
			this._element = c;
			this._selectElement = document.createElement("select");
			d(this._selectElement).css({
				position : "absolute",
				top : 0,
				left : 0,
				width : "100%",
				height : "100%",
				opacity : 0,
				filter : "alpha(opacity=0)"
			}).bind("change", function () {
				f.setSelectedIndex(parseInt(d("option:selected", f._selectElement).attr("value")));
				o.call(f)
			});
			this._element.appendChild(this._labelCanvas);
			d(this._element).append("<span class='gav-arrow'></span>");
			b ? this._element.appendChild(this._selectElement) :
			d(c).bind("touchstart mousedown", function (a) {
				"mousedown" === a.type && 1 !== a.which || (a.preventDefault(), f._enabled && (f._isOpen ? f._popUp.hide() : (f._popUp.show(c, f._vertical ? "right" : "bottom"), f._isOpen = !0)))
			})
		},
		getDOMElement : function () {
			return this._element
		},
		appendTo : function (a) {
			a.appendChild(this._element)
		},
		setEnabled : function (a) {
			this._enabled !== a && (this._enabled = a, n.call(this))
		},
		setVertical : function (a) {
			this._vertical !== a && (this._vertical = a, d(this._element).removeClass(!this._vertical ? "gav-combobox-vertical" :
					"gav-combobox-horizontal"), d(this._element).addClass(this._vertical ? "gav-combobox-vertical" : "gav-combobox-horizontal"))
		},
		setDataProvider : function (a) {
			this._dataProvider !== a && (this._dataProvider = a, this._dataProviderChanged = !0, this.invalidate())
		},
		getDataProvider : function () {
			return this._dataProvider
		},
		setGroupingProvider : function (a) {
			this._groupingProvider !== a && (this._groupingProvider = a, this._groupinProviderChanged = !0, this.invalidate())
		},
		setSelectedIndex : function (a) {
			this._selectedIndex !== a && (this._selectedIndex =
					a, this._selectedIndices = [a], this.invalidate())
		},
		getSelectedIndex : function () {
			return this._selectedIndex
		},
		getSelectedItem : function () {
			return !this._dataProvider || 0 > this._selectedIndex ? null : this._dataProvider[this._selectedIndex]
		},
		setPosition : function (a, b) {
			d(this._element).css({
				position : "absolute",
				top : b,
				left : a,
				margin : 0
			})
		},
		setSize : function (a, b) {
			this._explicitWidth = a;
			this._explicitHeight = b
		},
		setHeight : function (a) {
			this._explicitHeight = a
		},
		setWidth : function (a) {
			this._explicitWidth = a
		},
		setMaxWidth : function (a) {
			d(this._element).css("max-width",
				a)
		},
		getHeight : function () {
			return this._explicitHeight ? this._explicitHeight : this._vertical ? d(this._element).outerWidth() : d(this._element).outerHeight()
		},
		getWidth : function () {
			return this._explicitWidth ? this._explicitWidth : this._vertical ? d(this._labelCanvas).outerHeight(!0) : d(this._labelCanvas).outerWidth(!0)
		},
		setPresentationMode : function (a) {
			d(this._element).toggleClass("gav-mode-presentation", a)
		},
		_update : function () {
			if (this._dataProviderChanged || this._groupinProviderChanged) {
				var g = this._dataProvider ? this._dataProvider.length :
					0;
				this._dataProviderIDs = [];
				for (var j = 0; j < g; j++)
					this._dataProvider[j] && this._dataProvider[j].id && 0 > this._dataProviderIDs.indexOf(this._dataProvider[j].id) && this._dataProviderIDs.push(this._dataProvider[j].id);
				if (this._groupingProvider) {
					g = (j = this._groupingProvider) && j[0]instanceof gav.tree.TreeNode ? j.map(function (a) {
						return a.clone(function (a) {
							this.indicatorID = a.indicatorID;
							this.label = a.label
						})
					}) : j ? c.call(this, j) : [];
					j = new gav.tree.TreeNode;
					j.setChildren(g);
					a.call(this, j);
					var g = f.call(this, j.getChildren()),
					k = j.getLeaves(),
					k = k.map(function (a) {
							return a.getId()
						}),
					j = this._dataProvider.slice(),
					j = j.filter(function (a) {
							return 0 > k.indexOf(a.id)
						}),
					g = g.concat(j);
					this._internalDataProvider = m(g, this._dataProvider)
				} else
					this._internalDataProvider = m(this._dataProvider, this._dataProvider);
				this._internalDataProvider && this._internalDataProvider.sort(function (a, b) {
					return a.providerIndex - b.providerIndex
				});
				this._popUp.setDataProvider(this._internalDataProvider);
				this._dataProviderChanged = this._groupinProviderChanged = !1;
				var g = d(this._selectElement).html(""),
				o,
				q,
				z = this._dataProvider,
				x,
				w,
				B = this._internalDataProvider;
				if (B && B.length)
					for (j = 0; j < B.length; j += 1)
						if (B[j] && "separator" != B[j].type && "header" != B[j].type)
							if (B[j].children && B[j].children.length) {
								var y = b(B[j].children);
								q = document.createElement("optgroup");
								q.setAttribute("label", p(B[j]));
								w = document.createDocumentFragment();
								for (var A = 0; A < y.length; A++)
									x = z.indexOf(y[A].data), o = document.createElement("option"), 0 <= x && o.setAttribute("value", x), o.innerHTML = p(z[x]), w.appendChild(o);
								q.appendChild(w);
								g.append(q)
							} else
								x = z.indexOf(B[j].data), o = d("<option value='" + x + "'>" + p(z[x]) + "</option>"), g.append(o)
			}
			e.call(this);
			n.call(this)
		}
	})
})(jQuery);
var DropdownMenu;
(function (d) {
	function b(a, c) {
		if (!a || !a.length)
			return c;
		if (!c)
			return null;
		var f = parseInt(a.shift()),
		f = c[f];
		return a.length && f.children && f.children.length ? b(a, f.children) : f
	}
	function a(b, c, f) {
		if (b && b.length)
			for (var k = 0, m = b.length; k < m; k += 1)
				if (b[k]) {
					var o;
					o = void 0 == typeof b[k].index ? void 0 : b[k].index;
					var n;
					var p = b[k];
					n = p ? "string" == typeof p ? p : "undefined" != typeof p.label ? p.label : "undefined" != typeof p.name ? p.name : p.toString ? p.toString() : "" : "&nbsp";
					var p = b[k].children && b[k].children.length ? "group" : b[k].type,
					r = !b[k].children || !b[k].children.length,
					v = c,
					t = document.createElement("li"),
					u = document.createElement("a");
					"separator" === p ? t.setAttribute("role", "separator") : "header" === p ? (t.setAttribute("data-header", ""), o = n || "", u.textContent = o, t.appendChild(u)) : ("number" == typeof o && u.setAttribute("data-index", o), o = n || "", u.textContent = o, t.appendChild(u), r && t.setAttribute("data-leaf", ""));
					"group" === p && d(t).addClass("branch");
					v ? v.appendChild(t) : this._$list[0].appendChild(t);
					o = t;
					b[k].element = o;
					o.setAttribute("data-path",
						f.concat(k).join(","));
					b[k].children && (p = document.createElement("ul"), o.appendChild(p), d(o).addClass("closed"), a.apply(this, [b[k].children, p, f.concat(k)]))
				}
	}
	function c() {
		f(this._dataProvider)
	}
	function f(a) {
		for (var b = a ? a.length : 0, c, d = 0; d < b; d++)
			c = a[d], 1 === c.selected ? c.element.setAttribute("data-selected", "1") : 2 === c.selected ? c.element.setAttribute("data-selected", "2") : c.element.removeAttribute("data-selected"), c.children && c.children.length && f(c.children)
	}
	DropdownMenu = gav.Klass({
			extend : gav.controls.Popup,
			init : function () {
				function a(e) {
					"undefined" == typeof d(this).parent().attr("data-leaf") || "undefined" != typeof d(this).parent().attr("data-header") || (e.preventDefault(), "true" === d(e.target).attr("aria-disabled") || "true" === d(e.target).attr("data-header") || "separator" === d(e.target).attr("role") || (parseInt(d(this).attr("data-index")), e = d(this).parent().attr("data-path"), f.dispatchEvent("itemClick", [b(e ? e.split(",") : [], f._dataProvider)]), d(this).parent().siblings(".branch").addClass("closed"), f._closeOnItemSelect ?
							f.hide() : c.call(f)))
				}
				gav.controls.Popup.prototype.init.call(this);
				this._element.className += " gav-menu no-transition";
				var f = this,
				j = document.createElement("ul");
				this._$list = d(j);
				this._closeOnItemSelect = !0;
				this._selected = [];
				this._wantedSelection = [];
				this._numLeafItems = 0;
				this._$list.delegate("a", "gavtap", function (b) {
					if (!d(this).parent().hasClass("branch"))
						return a.call(this, b), !1;
					b = d(this);
					b.parent().siblings(".branch").addClass("closed");
					b.parent().toggleClass("closed");
					clearTimeout(f._adjuster);
					gav.support.csstransitions ?
					f._adjuster = setTimeout(function () {
							f.adjust()
						}, 200) : f.adjust()
				});
				this._element.appendChild(j)
			},
			setDataProvider : function (b) {
				this._$list[0].innerHTML = "";
				(this._dataProvider = b) && a.apply(this, [this._dataProvider, this._$list[0], []])
			},
			show : function (a, b) {
				f(this._dataProvider);
				gav.controls.Popup.prototype.show.apply(this, [a, b]);
				clearTimeout(this._appendNoTransition);
				var c = this;
				this._appendNoTransition = setTimeout(function () {
						d(c._element).removeClass("no-transition")
					}, 250)
			},
			hide : function () {
				clearTimeout(this._appendNoTransition);
				clearInterval(this._adjuster);
				this._adjuster = null;
				gav.controls.Popup.prototype.hide.apply(this);
				d(this._element).addClass("no-transition")
			},
			refresh : function () {
				f(this._dataProvider)
			},
			_onItemClick : function () {}

		})
})(jQuery);
(function (d) {
	function b() {
		this._recordList = [];
		if (this._dataSet && this._dataSet.getRecordInformation()) {
			var a = this._dataSet.getRecordInformation(),
			b = a.length;
			this._recordList = Array(b);
			for (var c = 0; c < b; c++)
				this._recordList[c] = [c, a[c].name];
			this._recordList.sort(function (a, b) {
				return a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0
			})
		}
	}
	function a() {
		d(".selected", this._table).removeClass("selected");
		for (var a = this._selectionList ? this._selectionList.getSelectedRecords() : [], b, c = 0; c < a.length; c++)
			b = a[c], b = d("tr td[data-index='" + b +
					"']", this._table).parent(), d(b).addClass("selected");
		if (1 === a.length && (b = a[0], (b = d("tr td[data-index='" + b + "']", this._table).parent()) && b.length))
			a = d(this._innerContainer).scrollTop() - d(this._searchInput).outerHeight(!0), c = d(this._innerContainer).height(), b = d(b).position().top, b + a > a && b + a < a + c || d(this._innerContainer).scrollTop(b + a)
	}
	function c() {
		this._table.innerHTML = "";
		for (var a, b = 0; b < this._recordList.length; b++)
			a = document.createElement("tr"), d(a).html("<td data-index='" + this._recordList[b][0] + "'>" +
				this._recordList[b][1] + "</td>"), this._table.appendChild(a)
	}
	gav.Klass("gav.controls.RecordSelector", {
		implement : gav.representation.IPickable,
		extend : gav.components.ComponentPanel,
		init : function (a) {
			gav.components.ComponentPanel.prototype.init.call(this, a);
			this._recordList = this._selectionList = this._dataSet = null;
			var b = gav.events.PickedEvent,
			c = this;
			d(a).addClass("gav-record-list");
			this._innerContainer = document.createElement("div");
			d(this._contentPanel).width();
			this._searchInput = document.createElement("input");
			d(this._searchInput).attr("placeholder", "Search");
			this._searchInput.setAttribute("type", "search");
			this._liveSearch = new gav.controls.LiveSearchList(this._searchInput);
			this._liveSearch.addEventListener("run", function (a, f) {
				var d = b.REPLACE;
				0 <= f && (d = new gav.events.PickedEvent([f], d), c.dispatchEvent(d))
			});
			d(this._searchInput).change(function () {
				var a = this.value;
				if (a.length) {
					for (var b = RegExp(a, "i"), a = [], f, e = 0; e < c._recordList.length; e++)
						f = c._recordList[e][1], b.test(f) && a.push(c._recordList[e][0]);
					for (b = 0; b <
						c._recordList.length; b++)
						a.indexOf(c._recordList[b][0])
				} else
					d("tr", c._table).show()
			}).keyup(function () {
				d(this).change()
			}).css({
				display : "block"
			});
			a = d(this._contentPanel).height() - d(this._searchInput).outerHeight(!0);
			d(this._innerContainer).css({
				height : a - 2,
				border : "1px solid #eee"
			}).addClass("gav-record-table-container");
			this._table = document.createElement("table");
			d(this._table).addClass("gav-record-table").delegate("td", "gavtap", function (a) {
				var f = parseInt(d(a.target).attr("data-index")),
				m = a.ctrlKey ?
					b.INVERT : b.REPLACE;
				if (0 <= f)
					return f = new b([f], m), c.dispatchEvent(f), a.preventDefault(), !1;
				f = new b([], m);
				c.dispatchEvent(f)
			});
			this._contentPanel.appendChild(this._searchInput);
			this._innerContainer.appendChild(this._table);
			this._contentPanel.appendChild(this._innerContainer);
			this._validateSize()
		},
		setContext : function (a) {
			this._selectionList && this._selectionList.remove(this);
			gav.components.ComponentPanel.prototype.setContext.call(this, a);
			a ? (this.setDataSet(a.getDataSet()), this.setSelectionList(a.getSelectionManager()),
				this._selectionList && this._selectionList.addPickable(this)) : (this.setDataSet(null), this.setSelectionList(null))
		},
		_onContextChange : function (a) {
			switch (a.property) {
			case "dataSet":
				this.setDataSet(a.newValue);
				break;
			case "selectionList":
				this.setSelectionList(a.newValue)
			}
		},
		setDataSet : function (f) {
			this._dataSet = f;
			var d = [];
			this._dataSet && this._dataSet.getRecordInformation().forEach(function (a) {
				d.push(a.toString())
			});
			this._liveSearch.setList(d);
			b.call(this);
			c.call(this);
			a.call(this)
		},
		getDataSet : function () {
			return this._dataSet
		},
		setSelectionList : function (b) {
			this._selectionList !== b && (this._selectionList && this._selectionList.removeEventListener("selectionChanged", a, this), (this._selectionList = b) && this._selectionList.addEventListener("selectionChanged", a, this), a.call(this))
		},
		_validateSize : function () {
			gav.components.ComponentPanel.prototype._validateSize.call(this);
			d(this._contentPanel).width();
			var a = d(this._contentPanel).height(),
			a = a - d(this._searchInput).outerHeight(!0);
			d(this._innerContainer).css({
				height : a - 2
			})
		}
	})
})(jQuery);
(function (d) {
	function b(a, b) {
		this.dispatchEvent("run", [a, b])
	}
	function a() {
		this._result && this._result.length && (this._activeResultIndex = Math.min(this._activeResultIndex + 1, this._result.length - 1), f.call(this))
	}
	function c() {
		this._result && this._result.length && (this._activeResultIndex = Math.max(this._activeResultIndex - 1, 0), f.call(this))
	}
	function f(a) {
		var b = d(this._listElement).children();
		b.filter(".gav-state-active").removeClass("gav-state-active");
		b = b.eq(this._activeResultIndex).addClass("gav-state-active").text();
		!a && b && (this._inputElement.value = b)
	}
	function e() {
		this._listElement.innerHTML = "";
		var a = document.createDocumentFragment(),
		b;
		this._result.forEach(function (c) {
			b = document.createElement("li");
			b.innerHTML = c.value;
			a.appendChild(b)
		});
		this._listElement.appendChild(a)
	}
	function g(a, b) {
		for (var c, f = [], d = RegExp(a, "i"), e, g = 0, k = b.length; g < k; g++)
			c = b[g].match(d), e = 0, e = c && c.length ? c[0].length / (b[g].length / c[0].length) : j.call(b[g], a), 0.4 <= e && f.push({
				value : b[g],
				score : e,
				index : g
			});
		f.sort(function (a, b) {
			return b.score - a.score
		});
		return f.slice(0, 10)
	}
	function j(a) {
		var b = k(this.toUpperCase()),
		a = k(a.toUpperCase()),
		c = 0,
		f = b.length + a.length,
		d,
		e,
		g = b.length,
		j = a.length;
		for (d = 0; d < g; d++)
			for (e = 0; e < j; e++)
				if (b[d] === a[e]) {
					c++;
					a.splice(e, 1);
					j--;
					break
				}
		return 2 * c / f
	}
	function k(a) {
		for (var b = [], a = a.split(" "), c = 0, f = a.length; c < f; c++)
			a[c] && a[c].length && (b = b.concat(m(a[c])));
		return b
	}
	function m(a) {
		for (var b = a.length - 1, c = Array(b), f = 0; f < b; f++)
			c[f] = a.substr(f, 2);
		return c
	}
	gav.Klass("gav.controls.LiveSearchList", {
		extend : gav.controls.Popup,
		init : function (f) {
			function e() {
				function f(d) {
					o =
						g._inputElement.value;
					switch (d.keyCode) {
					case 27:
						g.hide();
						break;
					case 13:
					case 39:
						g.hide();
						b.apply(g, ["foo", g._result[g._activeResultIndex].index]);
						break;
					case 40:
						a.call(g);
						break;
					case 38:
						c.call(g);
						break;
					case 37:
						break;
					default:
						k && (clearTimeout(k), k = null);
						if (!o || 2 > o.length)
							break;
						k = setTimeout(function () {
								g.search(o, g._list)
							}, 250)
					}
				}
				function m() {
					d(g._inputElement).unbind("blur.gav", m);
					d(g._inputElement).unbind("keyup.gav", f);
					d(this._inputElement).bind("focus", e);
					j = !1
				}
				j || (d(this._inputElement).unbind("focus",
						e), d(g._inputElement).bind("blur.gav", m), d(g._inputElement).bind("keyup.gav", f), j = !0);
				var o
			}
			gav.controls.Popup.prototype.init.call(this);
			this._listElement = document.createElement("ul");
			this._listElement.className = "gav-live-search";
			d(this._listElement).css({
				width : "100%"
			}).delegate("li", "gavtap", function (a) {
				a = d(a.target).index();
				b.apply(g, ["foo", g._result[a].index]);
				g.hide()
			});
			this._resultList = [];
			this._activeResultIndex = -1;
			this._element.appendChild(this._listElement);
			d(this._element).css({
				position : "absolute",
				"background-color" : "white",
				border : "1px solid #ddd",
				boxShadow : "1px 1px 2px rgba(0,0,0,0.1)"
			});
			this._inputElement = f;
			var g = this,
			j = !1,
			k;
			d(this._inputElement).bind("focus", e)
		},
		setList : function (a) {
			this._list = a
		},
		search : function (a, b) {
			this._result = g(a, b);
			this._activeResultIndex = 0;
			e.call(this);
			f.call(this, !0);
			this.show(this._inputElement)
		},
		show : function () {
			d(this._element).css("width", d(this._inputElement).outerWidth() - 2);
			gav.controls.Popup.prototype.show.apply(this, Array.prototype.slice.call(arguments))
		}
	})
})(jQuery);
(function (d) {
	gav.Klass("gav.controls.DividerContainer2", {
		extend : gav.events.EventDispatcher,
		init : function (b) {
			function a(a) {
				if (a.originalEvent.touches && a.originalEvent.touches.length || a.originalEvent.changedTouches && a.originalEvent.changedTouches.length) {
					for (var a = a.originalEvent.touches && a.originalEvent.touches.length ? a.originalEvent.touches : a.originalEvent.changedTouches, b = a[0], c = {
							x : b.pageX,
							y : b.pageY,
							touches : a.length
						}, f = [{
								x : b.pageX,
								y : b.pageY
							}
						], d = 1; d < a.length; d++)
						b = a[d], f.push({
							x : b.pageX,
							y : b.pageY
						});
					c.positions = f;
					return c
				}
				return c = {
					x : a.pageX,
					y : a.pageY,
					touches : 1
				}
			}
			function c(a) {
				n = "SPAN" === a.target.nodeName ? d(a.target).parent()[0] : a.target;
				d(document).bind(gav.mouseMoveEvent, e);
				d(document).bind(gav.mouseUpEvent, f);
				a.preventDefault()
			}
			function f(b) {
				b = a(b);
				m = b.x - d(j._innerContainer).offset().left;
				o = b.y - d(j._innerContainer).offset().top;
				var b = d(j._innerContainer).width(),
				c = d(j._innerContainer).height(),
				b = j._vertical ? o / c : m / b;
				1 < b && (b = 1);
				0 > b && (b = 0);
				for (c = 0; c < j._dividers.length; c++)
					n === j._dividers[c].element &&
					(0 < c && b < j._dividers[c - 1].position && (b = j._dividers[c - 1].position), c < j._dividers.length - 1 && b > j._dividers[c + 1].position && (b = j._dividers[c + 1].position), j._dividers[c].position = b);
				d(j._feedbackDivider).hide();
				d(document).unbind(gav.mouseMoveEvent, e);
				d(document).unbind(gav.mouseUpEvent, f);
				j.dispatchEvent("change");
				j._validateSize()
			}
			function e(b) {
				c = a(b);
				m = c.x - d(j._innerContainer).offset().left;
				o = c.y - d(j._innerContainer).offset().top;
				var c = d(j._innerContainer).width(),
				f = d(j._innerContainer).height(),
				c = j._vertical ?
					o / f : m / c;
				1 < c && (c = 1);
				0 > c && (c = 0);
				for (f = 0; f < j._dividers.length; f++)
					n === j._dividers[f].element && (0 < f && c < j._dividers[f - 1].position && (c = j._dividers[f - 1].position), f < j._dividers.length - 1 && c > j._dividers[f + 1].position && (c = j._dividers[f + 1].position), j._dividers[f].position = c);
				d(j._feedbackDivider).css({
					left : j._vertical ? 0 : 100 * c + "%",
					top : j._vertical ? 100 * c + "%" : 0,
					display : "block"
				});
				b.preventDefault();
				return !1
			}
			gav.events.EventDispatcher.prototype.init.call(this);
			this._container = b.container;
			var g = document.createElement("div");
			d(g).css({
				position : "relative",
				width : "100%",
				height : "100%"
			});
			this._vertical = b.vertical || !1;
			this._elements = b.elements || [];
			this._container.appendChild(g);
			this._feedbackDivider = document.createElement("div");
			d(this._feedbackDivider).addClass("gav-divider-feedback").addClass(this._vertical ? "gav-vertical-divider" : "gav-horizontal-divider").css({
				position : "absolute",
				display : "none"
			});
			g.appendChild(this._feedbackDivider);
			this._innerContainer = g;
			var j = this;
			this._dividers = [];
			for (var k = 0, b = 0; b < this._elements.length -
				1; b++)
				g = document.createElement("div"), k += this._elements[b].ratio, this._innerContainer.appendChild(g), this._dividers.push({
					element : g,
					position : k
				}), d(g).bind(gav.mouseDownEvent, c).html("<span></span>");
			for (b = 0; b < this._elements.length; b++)
				g = this._elements[b].element, this._innerContainer.appendChild(g);
			var m,
			o,
			n;
			this._validateSize()
		},
		addElement : function () {},
		removeElement : function () {},
		_validateSize : function () {
			for (var b = this._elements ? this._elements.length : 0, a = this._vertical ? d(this._innerContainer).height() :
					d(this._innerContainer).width(), a = a - 0 * (b - 1), c = 0, f = 0; f < b; f++)
				c = this._vertical ? c + (d(this._elements[f].element).outerHeight(!0) - d(this._elements[f].element).outerHeight()) : c + (d(this._elements[f].element).outerWidth(!0) - d(this._elements[f].element).outerWidth());
			isNaN(c);
			var e;
			e = 0;
			for (var g, c = 0, j = this._vertical, k, f = 0; f < b; f++)
				1 < b ? (f < b - 1 ? (e = this._dividers[f].position, 0 < f && (e -= this._dividers[f - 1].position)) : e = 1 - this._dividers[this._dividers.length - 1].position, g = e * a) : g = a, e = this._elements[f].element, d(e).css({
					position : "absolute",
					left : j ? 0 : c,
					top : j ? c : 0,
					height : j ? g : "100%",
					width : j ? "100%" : g
				}).trigger("gavresize"), (k = d(e).data("component")) && k._validateSize && k._validateSize(), c += g, g = d(e).outerHeight(!0) - d(e).outerHeight(), e = d(e).outerWidth(!0) - d(e).outerWidth(), isNaN(g), isNaN(e), f < b - 1 && (e = this._dividers[f].element, d(e).css({
						position : "absolute",
						zIndex : "10",
						left : j ? 0 : c - 4,
						top : j ? c - 4 : 0,
						height : j ? 8 : "100%",
						width : j ? "100%" : 8
					}).addClass(j ? "gav-vertical-divider" : "gav-horizontal-divider"), c += 0);
			d(this._feedbackDivider).css({
				zIndex : "11",
				height : j ?
				2 : "100%",
				width : j ? "100%" : 2
			})
		}
	})
})(jQuery);
(function (d) {
	function b() {
		var a = this._innerElementWrappers ? this._innerElementWrappers.length : 0,
		b = this._dividers ? this._dividers[0] : null;
		dividerWidth = b ? d(b.element).width() : 0;
		for (var b = [], f = 0; f < a; f++)
			"none" !== d(this._innerElementWrappers[f]).children("div").eq(0).css("display") ? (b.push({
					idx : f,
					element : this._innerElementWrappers[f]
				}), d(this._innerElementWrappers[f]).css("display", "block")) : d(this._innerElementWrappers[f]).css("display", "none");
		var e = b.length;
		if (this._numVisibleElements !== e) {
			this._numVisibleElements =
				e;
			for (var g = 0, f = 0; f < e - 1; f++)
				g = this._sizeRatios ? g + this._sizeRatios[f] : g + 1 / e, this._dividers[f].position = g
		}
		var g = this._vertical ? d(this._innerContainer).height() : d(this._innerContainer).width(),
		g = g - 8 * (e - 1),
		j;
		j = 0;
		for (var k, m = 0, o = this._vertical, f = 0; f < e; f++)
			1 < e ? (f < e - 1 ? (j = this._dividers[f].position, 0 < f && (j -= this._dividers[f - 1].position)) : j = 1 - this._dividers[e - 2].position, k = j * g) : k = g, j = b[f].element, d(j).css({
				position : "absolute",
				margin : 0,
				left : o ? 0 : m,
				top : o ? m : 0,
				height : o ? k : "100%",
				width : o ? "100%" : k
			}).children().trigger("gavresize"),
			m += k + 4, k = d(j).outerHeight(!0) - d(j).outerHeight(), j = d(j).outerWidth(!0) - d(j).outerWidth(), isNaN(k), isNaN(j), f < a - 1 && (j = this._dividers[f].element, d(j).css({
					position : "absolute",
					zIndex : "10",
					left : o ? 0 : m - 4,
					top : o ? m - 4 : 0,
					height : o ? 8 : "100%",
					width : o ? "100%" : 8,
					display : "block"
				}).addClass(o ? "gav-vertical-divider" : "gav-horizontal-divider"), m += 4);
		if (!(0 >= e)) {
			for (--f; f < a - 1; f++)
				j = this._dividers[f].element, d(j).css({
					display : "none"
				});
			d(this._feedbackDivider).css({
				zIndex : "11",
				height : o ? 8 : "100%",
				width : o ? "100%" : 8
			})
		}
	}
	gav.Klass("gav.controls.DividerContainer", {
		init : function (a, c) {
			function f(a) {
				function c(a) {
					if (a.originalEvent.touches && a.originalEvent.touches.length || a.originalEvent.changedTouches && a.originalEvent.changedTouches.length) {
						for (var a = a.originalEvent.touches && a.originalEvent.touches.length ? a.originalEvent.touches : a.originalEvent.changedTouches, b = a[0], f = {
								x : b.pageX,
								y : b.pageY,
								touches : a.length
							}, d = [{
									x : b.pageX,
									y : b.pageY
								}
							], e = 1; e < a.length; e++)
							b = a[e], d.push({
								x : b.pageX,
								y : b.pageY
							});
						f.positions = d;
						return f
					}
					return f = {
						x : a.pageX,
						y : a.pageY,
						touches : 1
					}
				}
				function f(a) {
					e =
						c(a);
					k = e.x - d(o._innerContainer).offset().left;
					m = e.y - d(o._innerContainer).offset().top;
					var e = d(o._innerContainer).width(),
					j = d(o._innerContainer).height(),
					e = o._vertical ? m / j : k / e;
					1 < e && (e = 1);
					0 > e && (e = 0);
					0 < n && e < o._dividers[n - 1].position && (e = o._dividers[n - 1].position);
					n < o._dividers.length - 1 && e > o._dividers[n + 1].position && (e = o._dividers[n + 1].position);
					o._dividers[n].position = e;
					for (var e = o._innerElementWrappers ? o._innerElementWrappers.length : 0, j = w, p = o._vertical ? d(o._innerContainer).height() : d(o._innerContainer).width(),
						p = p - 1 * (e - 1) * j, v = 0, t, u = o._vertical, D = 0; D < e; D++) {
						1 < e ? (D < e - 1 ? (t = o._dividers[D].position, 0 < D && (t -= o._dividers[D - 1].position)) : t = 1 - o._dividers[o._dividers.length - 1].position, partialSize = t * p) : partialSize = p;
						v += partialSize + j / 2;
						if (D == n) {
							d(o._feedbackDivider).css({
								left : u ? 0 : v - j / 2,
								top : u ? v - j / 2 : 0,
								display : "block"
							});
							break
						}
						v += j / 2
					}
					g && b.call(o);
					a.preventDefault();
					return !1
				}
				function e(a) {
					a = c(a);
					k = a.x - d(o._innerContainer).offset().left;
					m = a.y - d(o._innerContainer).offset().top;
					var a = d(o._innerContainer).width(),
					g = d(o._innerContainer).height(),
					a = o._vertical ? m / g : k / a;
					1 < a && (a = 1);
					0 > a && (a = 0);
					for (g = 0; g < o._dividers.length; g++)
						j === o._dividers[g].element && (0 < g && a < o._dividers[g - 1].position && (a = o._dividers[g - 1].position), g < o._dividers.length - 1 && a > o._dividers[g + 1].position && (a = o._dividers[g + 1].position), o._dividers[g].position = a);
					d(o._feedbackDivider).hide();
					d(document).unbind("mousemove", f);
					d(document).unbind("mouseup", e);
					b.call(o)
				}
				var j,
				k,
				m;
				j = "SPAN" === a.target.nodeName ? d(a.target).parent()[0] : a.target;
				for (var x = 0; x < o._dividers.length; x++)
					j === o._dividers[x].element &&
					(n = x);
				var w = o._vertical ? d(j).height() : d(j).width();
				d(document).bind("mousemove", f);
				d(document).bind("mouseup", e);
				a.preventDefault()
			}
			this._container = a;
			var e = document.createElement("div");
			d(e).css({
				position : "relative",
				width : "100%",
				height : "100%"
			});
			d(a).addClass("gav-divider");
			this._dividerSize = c && c.dividerSize ? c.dividerSize : 32;
			this._sizeRatios = c && c.sizeRatios ? c.sizeRatios : void 0;
			c && c.elements && d(a).empty();
			this._vertical = d(a).attr("data-vertical");
			void 0 === this._vertical && (this._vertical = c ? c.vertical :
					!1);
			this._elements = a.children;
			var g = !1;
			d(a).children(".gav-divider-container").each(function (a, b) {
				new gav.controls.DividerContainer(b, c)
			});
			for (var j = [], k = [], m = 0; m < this._elements.length; m++)
				j.push(this._elements[m]), k.push(document.createElement("div"));
			this._innerElements = j;
			this._innerElementWrappers = k;
			if (this._sizeRatios)
				if (this._vertical)
					for (m = 0; m < this._innerElements.length; m++)
						d(this._innerElements[m]).css({
							width : "100%",
							height : 100 * this._sizeRatios[m] + "%"
						});
				else
					for (m = 0; m < this._innerElements.length; m++)
						d(this._innerElements[m]).css({
							width : 100 *
							this._sizeRatios[m] + "%",
							height : "100%"
						});
			else
				for (m = 0; m < this._innerElements.length; m++)
					d(this._innerElements[m]).css({
						width : "100%",
						height : "100%"
					});
			for (m = 0; m < this._innerElements.length; m++)
				k[m].appendChild(this._innerElements[m]), d(k[m]).addClass("inner-wrapper"), e.appendChild(this._innerElementWrappers[m]);
			this._container.appendChild(e);
			this._feedbackDivider = document.createElement("div");
			d(this._feedbackDivider).addClass("gav-divider-feedback").addClass(this._vertical ? "gav-vertical-divider" : "gav-horizontal-divider").css({
				position : "absolute",
				display : "none"
			});
			e.appendChild(this._feedbackDivider);
			this._innerContainer = e;
			var o = this;
			this._dividers = [];
			for (m = j = 0; m < this._innerElements.length - 1; m++)
				e = document.createElement("div"), j = this._sizeRatios ? j + this._sizeRatios[m] : j + 1 / this._innerElements.length, this._innerContainer.appendChild(e), this._dividers.push({
					element : e,
					position : j
				}), d(e).bind("mousedown", f).html("<span></span>");
			for (m = 0; m < this._elements.length; m++);
			var n = -1;
			d(a).bind("gavresize", function (c) {
				c.stopPropagation();
				c.target === a && b.call(o)
			});
			b.call(o)
		}
	})
})(jQuery);
(function () {
	function d(a) {
		return a.toFixed(2)
	}
	function b(a, b, c, f) {
		f || (f = this._isVertical ? "right" : "top");
		var e,
		d = $(a).outerWidth();
		e = $(a).outerHeight();
		var a = $(a).offset(),
		g = $(c).outerHeight(),
		j = $(c).outerWidth();
		$(c).children(".content").html(this._tooltipFunction(b));
		switch (f) {
		case "left":
			b = a.left - j - 6;
			e = a.top + e / 2 - g / 2;
			break;
		case "right":
			b = a.left + d + 6;
			e = a.top + e / 2 - g / 2;
			break;
		case "bottom":
			b = a.left + d / 2 - j / 2;
			e = a.top + e + 6;
			break;
		default:
			b = a.left + d / 2 - j / 2,
			e = a.top - g - 6
		}
		$(c).css({
			left : b,
			top : e
		});
		$(c).addClass("gav-state-active").removeClass("gav-state-hidden")
	}
	function a(a, b) {
		setTimeout(function () {
			$(a).removeClass("gav-state-active").removeClass("gav-state-hidden").removeClass("out").css("display", "hidden");
			$(b).removeClass("gav-state-active").removeClass("gav-state-hidden").removeClass("out").css("display", "hidden")
		}, 300)
	}
	function c(a, b) {
		var c = this._values.concat();
		e.call(this, a[0]);
		e.call(this, a[1]);
		if (this._isRangeEditable && (this._minRange || this._maxRange)) {
			var f = this._min,
			d = a[1],
			j = this._max,
			k = a[0];
			0 === b ? (this._minRange && (d = Math.max(this._min, a[1] - this._minRange)),
				this._maxRange && (f = Math.max(this._min, a[1] - this._maxRange)), this._values[0] = e.call(this, Math.max(f, Math.min(a[0], d)))) : 1 === b ? (this._minRange && (k = Math.min(this._max, a[0] + this._minRange)), this._maxRange && (j = Math.min(this._max, a[0] + this._maxRange)), this._values[1] = e.call(this, Math.max(k, Math.min(j, a[1])))) : (this._values[0] = e.call(this, a[0]), this._values[1] = e.call(this, a[1]))
		} else
			this._values[0] = e.call(this, a[0]), this._values[1] = e.call(this, a[1]);
		for (f = 0; 2 > f && !(this._values[f] !== c[f]); f++);
		this.dispatchEvent("slide",
			[this._values]);
		g.call(this)
	}
	function f(a) {
		var b = this._value;
		this._value = e.call(this, a);
		this._values = [this._value];
		this.dispatchEvent("slide", [this._value]);
		this._value !== b && this.dispatchEvent("valueChanged", [this._value]);
		g.call(this)
	}
	function e(a) {
		if (this._stepSize) {
			var b = (a - this._min) % this._stepSize,
			a = a - b;
			Math.abs(2 * b) >= this._stepSize && (a += 0 < b ? this._stepSize : -this._stepSize)
		}
		a = !a || isNaN(a) ? 0 : parseFloat(a.toFixed(5));
		return Math.max(Math.min(a, this._max), this._min)
	}
	function g() {
		var a = this._isVertical ?
			"top" : "left",
		b = this._isVertical ? "height" : "width";
		if (this._isRange) {
			for (var c = 0; 2 > c; c++) {
				var f = (this._values[c] - this._min) / (this._max - this._min),
				f = parseFloat(f).toFixed(4);
				this._isVertical && (f = 1 - f);
				$(this._handles[c]).css(a, 100 * f + "%");
				this._isVertical && 1 == c && $(".gav-slider-range", this._element).css(a, 100 * f + "%");
				!this._isVertical && 0 == c && $(".gav-slider-range", this._element).css(a, 100 * f + "%")
			}
			a = 100 * (this._values[1] - this._values[0]) / (this._max - this._min);
			$(".gav-slider-range", this._element).css(b, a + "%")
		} else
			f =
				(this._value - this._min) / (this._max - this._min), f = parseFloat(f).toFixed(4), this._isVertical && (f = 1 - f), $(this._handles[0]).css(a, 100 * f + "%"), $(".gav-slider-progress", this._element).css({
				height : "height" === b ? 100 * f + "%" : "100%",
				width : "width" === b ? 100 * f + "%" : "100%"
			})
	}
	var j,
	k;
	gav.Klass("gav.controls.Slider", {
		extend : gav.events.EventDispatcher,
		init_ : function (e) {
			function g(a, b) {
				var e = -$(p).offset()[w] + (q._isVertical ? a.pageY : a.pageX);
				q._isVertical && (e = v - e);
				var d = e;
				(e = y == D) && (d -= K);
				d /= v;
				d = parseFloat(d.toFixed(5));
				b &&
				(A = d);
				var j = 0,
				k = 1,
				m = 0,
				o = q._values[0],
				n = q._values[1],
				t = n - o,
				u = q._values[0],
				r = q._values[1];
				parseFloat((r - u).toFixed(5));
				q._isRange && (m = q._handles.indexOf(y), 0 === m ? (j = 0, k = (q._values[1] - q._min) / (q._max - q._min)) : m === q._handles.length - 1 ? (j = (q._values[q._handles.length - 2] - q._min) / (q._max - q._min), k = 1) : e && (j = 0, k = 1 - (r - u) / (q._max - q._min)));
				d < j && (d = j);
				d > k && (d = k);
				H = d - A;
				$("#max").val(d);
				j = (A + H) * q._max + (1 - (A + H)) * q._min;
				j = d * q._max + (1 - d) * q._min;
				q._stepSize && (k = (j - q._min) % q._stepSize, j -= k, Math.abs(2 * k) >= q._stepSize &&
					(j += 0 < k ? q._stepSize : -q._stepSize));
				j = parseFloat(j.toFixed(5));
				q._isRange ? 0 === m ? c.apply(q, [[j, n], 0]) : 1 === m ? c.apply(q, [[o, j], 1]) : e && c.call(q, [j, j + t]) : f.apply(q, [j]);
				A = d;
				return {
					isBar : e,
					idx : m
				}
			}
			gav.events.EventDispatcher.prototype.init.call(this);
			var n = $.extend({}, {
					range : !1,
					values : [0, 1],
					value : 0,
					step : !1,
					min : 0,
					max : 1,
					minRange : !1,
					maxRange : !1,
					change : null,
					slide : null,
					stop : null,
					live : !1,
					editableRange : !0,
					vertical : !1,
					displayTooltip : !0,
					tooltipFunction : d,
					highlightProgress : !1,
					container : null,
					tooltipPlacement : null
				}, e);
			n.change && this.addEventListener("change", n.change, this);
			n.stop && this.addEventListener("stop", n.stop, this);
			n.slide && this.addEventListener("slide", n.slide, this);
			var p = n.container || document.createElement("div");
			$(p).addClass("gav-slider").addClass(n.vertical ? "gav-slider-vertical" : "gav-slider-horizontal");
			var r = document.createElement("div");
			$(r).addClass("gav-slider-gutter");
			p.appendChild(r);
			var v = $(p).width();
			$(p).height();
			var t = gav.support.touch ? "touchmove" : "mousemove",
			u = gav.support.touch ? "touchend" :
				"mouseup",
			e = gav.support.touch ? "touchstart" : "mousedown",
			t = gav.support.touch ? "touchmove" : "mousemove",
			u = gav.support.touch ? "touchend" : "mouseup",
			e = gav.support.touch ? "touchstart" : "mousedown",
			q = this;
			this._isRange = n.range;
			this._isRangeEditable = n.editableRange;
			this._values = n.values;
			this._isRange && $(p).addClass("gav-slider-is-range");
			this._stepSize = n.step;
			this._max = n.max;
			this._min = n.min;
			this._minRange = n.minRange;
			this._maxRange = n.maxRange;
			this._isVertical = n.vertical;
			this._tooltipFunction = n.tooltipFunction;
			this._highlightProgress =
				n.highlightProgress;
			var z = n.displayTooltip,
			x,
			w = this._isVertical ? "top" : "left",
			B = this._isVertical ? "height" : "width",
			y,
			A,
			H = 0,
			F = !1,
			C = function (b) {
				M = !1;
				$(document).unbind(t, J);
				$(document).unbind(u, C);
				$(j).addClass("out");
				$(k).addClass("out");
				q._isDragging = !1;
				a(j, k);
				q.dispatchEvent("stop", [q.getValue()]);
				q.dispatchEvent("change", [q.getValue()]);
				b.preventDefault();
				return !1
			},
			J = function (a) {
				if (!M)
					return !1;
				F = !0;
				q._isDragging = !0;
				a.originalEvent.touches && a.originalEvent.touches.length ? a = a.originalEvent.touches[0] :
					a.originalEvent.changedTouches && a.originalEvent.changedTouches.length ? a = a.originalEvent.changedTouches[0] : a.preventDefault();
				$("#max2").val(a.pageX);
				a = g(a);
				if (z && (!q._isRange || q._isRangeEditable))
					a.isBar ? (k || (k = document.createElement("div"), $(k).addClass("gav-tooltip-simple").html("<div class='content'></div><div class='arrow'></div>"), $("body").append(k)), b.apply(q, [q._handles[0], q._values[0], j, n.tooltipPlacement]), b.apply(q, [q._handles[1], q._values[1], k, n.tooltipPlacement])) : b.apply(q, [q._handles[a.idx],
							q._values[a.idx], j, n.tooltipPlacement]);
				return !1
			};
			if (this._isRange) {
				var D = document.createElement("div"),
				G = 100 * (this._values[1] - this._values[0]) / (this._max - this._min);
				$(D).css({
					height : "height" === B ? G + "%" : "100%",
					width : "width" === B ? G + "%" : "100%"
				}).addClass("gav-slider-range");
				r.appendChild(D)
			} else
				this._values[0] = n.value;
			if (!this._isRange && this._highlightProgress) {
				var E = document.createElement("div"),
				G = 100 * (this._values[0] - this._min) / (this._max - this._min);
				isNaN(G) && (G = 0);
				$(E).css({
					height : "height" === B ? G +
					"%" : "100%",
					width : "width" === B ? G + "%" : "100%"
				}).addClass("gav-slider-progress");
				r.appendChild(E)
			}
			G = this._isRange ? 2 : 1;
			this._handles = [];
			for (E = 0; E < G; E++) {
				var I = document.createElement("div");
				this._handles.push(I);
				var L = (this._values[E] - this._min) / (this._max - this._min);
				this._isVertical && (L = 1 - L);
				$(I).css(w, 100 * L + "%").addClass("gav-slider-handle");
				this._isRange && !this._isRangeEditable && $(I).hide();
				r.appendChild(I);
				1 == E && this._isVertical && $(D).css(w, 100 * L + "%");
				0 == E && !this._isVertical && $(D).css(w, 100 * L + "%")
			}
			$(p).bind(e,
				function (a) {
				M = !0;
				F = !1;
				var b = !0;
				a.originalEvent.touches && a.originalEvent.touches.length ? a = a.originalEvent.touches[0] : a.originalEvent.changedTouches && a.originalEvent.changedTouches.length ? a = a.originalEvent.changedTouches[0] : a.preventDefault();
				y = a.target;
				var c = 0;
				x = $(D)[B]();
				if (y == p || y == r)
					if (b = !1, q._isRange) {
						y = D;
						var f = $(y).offset()[w],
						e = q._isVertical ? a.pageY : a.pageX;
						$(p).offset();
						e < f ? q._isRangeEditable ? y = q._handles[q._isVertical ? 1 : 0] : c = f - e : e > f + x ? q._isRangeEditable ? y = q._handles[q._isVertical ? 0 : 1] : c = f +
							x - e : b = !0
					} else {
						K = -$(a.target).offset()[w] + (q._isVertical ? a.pageY : a.pageX);
						f = $(q._handles[0]).position()[w];
						y = q._handles[0];
						for (var e = f, d = 1; d < q._handles.length; d++)
							if (f = $(q._handles[d]).position()[w], Math.abs(f - K) < Math.abs(e - K)) {
								y = q._handles[d];
								break
							}
					}
				x = $(D)[B]();
				K = -$(y).offset()[w] + (q._isVertical ? a.pageY : a.pageX) + c;
				q._isVertical && (K = x - K);
				v = $(p)[B]();
				b || g(a, !0);
				$(document).bind(t, J);
				$(document).bind(u, C);
				return !1
			});
			$(this._handles[0]).bind("click", function () {
				F || q.dispatchEvent("handleClick", [0, q._values[0]])
			});
			$(this._handles[1]).bind("click", function () {
				F || q.dispatchEvent("handleClick", [1, q._values[1]])
			});
			var M = !1,
			K;
			j || (j = document.createElement("div"), $(j).addClass("gav-tooltip-simple").html("<div class='content'></div>"), $("body").append(j));
			this._element = p
		},
		init : function (e) {
			function g(a, b) {
				var e = -$(p).offset()[w] + (q._isVertical ? a.pageY : a.pageX);
				q._isVertical && (e = v - e);
				var d = e;
				(e = y == D) && (d -= K);
				d /= v;
				d = parseFloat(d.toFixed(5));
				b && (A = d);
				var j = 0,
				k = 1,
				m = 0,
				o = q._values[0],
				n = q._values[1],
				t = n - o,
				u = q._values[0],
				r =
					q._values[1];
				parseFloat((r - u).toFixed(5));
				q._isRange && (m = q._handles.indexOf(y), 0 === m ? (j = 0, k = (q._values[1] - q._min) / (q._max - q._min)) : m === q._handles.length - 1 ? (j = (q._values[q._handles.length - 2] - q._min) / (q._max - q._min), k = 1) : e && (j = 0, k = 1 - (r - u) / (q._max - q._min)));
				d < j && (d = j);
				d > k && (d = k);
				H = d - A;
				$("#max").val(d);
				j = (A + H) * q._max + (1 - (A + H)) * q._min;
				j = d * q._max + (1 - d) * q._min;
				q._stepSize && (k = (j - q._min) % q._stepSize, j -= k, Math.abs(2 * k) >= q._stepSize && (j += 0 < k ? q._stepSize : -q._stepSize));
				j = parseFloat(j.toFixed(5));
				q._isRange ?
				0 === m ? c.apply(q, [[j, n], 0]) : 1 === m ? c.apply(q, [[o, j], 1]) : e && c.call(q, [j, j + t]) : f.apply(q, [j]);
				A = d;
				return {
					isBar : e,
					idx : m
				}
			}
			gav.events.EventDispatcher.prototype.init.call(this);
			var n = $.extend({}, {
					range : !1,
					values : [0, 1],
					value : 0,
					step : !1,
					min : 0,
					max : 1,
					minRange : !1,
					maxRange : !1,
					change : null,
					slide : null,
					stop : null,
					live : !1,
					editableRange : !0,
					vertical : !1,
					displayTooltip : !0,
					tooltipFunction : d,
					highlightProgress : !1,
					container : null,
					tooltipPlacement : null
				}, e);
			n.change && this.addEventListener("change", n.change, this);
			n.stop && this.addEventListener("stop",
				n.stop, this);
			n.slide && this.addEventListener("slide", n.slide, this);
			var p = n.container || document.createElement("div");
			$(p).addClass("gav-slider").addClass(n.vertical ? "gav-slider-vertical" : "gav-slider-horizontal");
			var r = document.createElement("div");
			$(r).addClass("gav-slider-gutter");
			p.appendChild(r);
			var v = $(p).width();
			$(p).height();
			var t = gav.support.touch ? "touchmove" : "mousemove",
			u = gav.support.touch ? "touchend" : "mouseup",
			e = gav.support.touch ? "touchstart" : "mousedown",
			t = gav.support.touch ? "touchmove mousemove" :
				"mousemove",
			u = gav.support.touch ? "touchend mouseup" : "mouseup",
			e = gav.support.touch ? "touchstart mousedown" : "mousedown",
			q = this;
			this._isRange = n.range;
			this._isRangeEditable = n.editableRange;
			this._values = n.values;
			this._isRange && $(p).addClass("gav-slider-is-range");
			this._stepSize = n.step;
			this._max = n.max;
			this._min = n.min;
			this._minRange = n.minRange;
			this._maxRange = n.maxRange;
			this._isVertical = n.vertical;
			this._tooltipFunction = n.tooltipFunction;
			this._highlightProgress = n.highlightProgress;
			var z = n.displayTooltip,
			x,
			w =
				this._isVertical ? "top" : "left",
			B = this._isVertical ? "height" : "width",
			y,
			A,
			H = 0,
			F = !1,
			C = function (b) {
				M = !1;
				$(document).unbind(t, J);
				$(document).unbind(u, C);
				$(j).addClass("out");
				$(k).addClass("out");
				q._isDragging = !1;
				a(j, k);
				q.dispatchEvent("stop", [q.getValue()]);
				q.dispatchEvent("change", [q.getValue()]);
				b.preventDefault();
				return !1
			},
			J = function (a) {
				if (!M)
					return !1;
				F = !0;
				q._isDragging = !0;
				a.originalEvent.touches && a.originalEvent.touches.length ? a = a.originalEvent.touches[0] : a.originalEvent.changedTouches && a.originalEvent.changedTouches.length ?
					a = a.originalEvent.changedTouches[0] : a.preventDefault();
				$("#max2").val(a.pageX);
				a = g(a);
				if (z && (!q._isRange || q._isRangeEditable))
					a.isBar ? (k || (k = document.createElement("div"), $(k).addClass("gav-tooltip-simple").html("<div class='content'></div><div class='arrow'></div>"), $("body").append(k)), b.apply(q, [q._handles[0], q._values[0], j, n.tooltipPlacement]), b.apply(q, [q._handles[1], q._values[1], k, n.tooltipPlacement])) : b.apply(q, [q._handles[a.idx], q._values[a.idx], j, n.tooltipPlacement]);
				return !1
			};
			if (this._isRange) {
				var D =
					document.createElement("div"),
				G = 100 * (this._values[1] - this._values[0]) / (this._max - this._min);
				$(D).css({
					height : "height" === B ? G + "%" : "100%",
					width : "width" === B ? G + "%" : "100%"
				}).addClass("gav-slider-range");
				r.appendChild(D)
			} else
				this._values[0] = n.value;
			if (!this._isRange && this._highlightProgress) {
				var E = document.createElement("div"),
				G = 100 * (this._values[0] - this._min) / (this._max - this._min);
				isNaN(G) && (G = 0);
				$(E).css({
					height : "height" === B ? G + "%" : "100%",
					width : "width" === B ? G + "%" : "100%"
				}).addClass("gav-slider-progress");
				r.appendChild(E)
			}
			G = this._isRange ? 2 : 1;
			this._handles = [];
			for (E = 0; E < G; E++) {
				var I = document.createElement("div");
				this._handles.push(I);
				var L = (this._values[E] - this._min) / (this._max - this._min);
				this._isVertical && (L = 1 - L);
				$(I).css(w, 100 * L + "%").addClass("gav-slider-handle");
				this._isRange && !this._isRangeEditable && $(I).hide();
				r.appendChild(I);
				1 == E && this._isVertical && $(D).css(w, 100 * L + "%");
				0 == E && !this._isVertical && $(D).css(w, 100 * L + "%")
			}
			$(p).bind(e, function (a) {
				M = !0;
				F = !1;
				var b = !0;
				a.originalEvent.touches && a.originalEvent.touches.length ?
				a = a.originalEvent.touches[0] : a.originalEvent.changedTouches && a.originalEvent.changedTouches.length ? a = a.originalEvent.changedTouches[0] : a.preventDefault();
				y = a.target;
				var c = 0;
				x = $(D)[B]();
				if (y == p || y == r)
					if (b = !1, q._isRange) {
						y = D;
						var f = $(y).offset()[w],
						e = q._isVertical ? a.pageY : a.pageX;
						$(p).offset();
						e < f ? q._isRangeEditable ? y = q._handles[q._isVertical ? 1 : 0] : c = f - e : e > f + x ? q._isRangeEditable ? y = q._handles[q._isVertical ? 0 : 1] : c = f + x - e : b = !0
					} else {
						K = -$(a.target).offset()[w] + (q._isVertical ? a.pageY : a.pageX);
						f = $(q._handles[0]).position()[w];
						y = q._handles[0];
						for (var e = f, d = 1; d < q._handles.length; d++)
							if (f = $(q._handles[d]).position()[w], Math.abs(f - K) < Math.abs(e - K)) {
								y = q._handles[d];
								break
							}
					}
				x = $(D)[B]();
				K = -$(y).offset()[w] + (q._isVertical ? a.pageY : a.pageX) + c;
				q._isVertical && (K = x - K);
				v = $(p)[B]();
				b || g(a, !0);
				$(document).bind(t, J);
				$(document).bind(u, C);
				return !1
			});
			$(this._handles[0]).bind("click", function () {
				F || q.dispatchEvent("handleClick", [0, q._values[0]])
			});
			$(this._handles[1]).bind("click", function () {
				F || q.dispatchEvent("handleClick", [1, q._values[1]])
			});
			var M = !1,
			K;
			j || (j = document.createElement("div"), $(j).addClass("gav-tooltip-simple").html("<div class='content'></div>"), $("body").append(j));
			this._element = p
		},
		getDOMElement : function () {
			return this._element
		},
		setRange : function (a) {
			this._values = a.concat()
		},
		setEditableRange : function (a) {
			this._isRangeEditable = a;
			if (this._isRange)
				for (a = 0; a < this._handles.length; a++)
					this._isRangeEditable ? $(this._handles[a]).show() : $(this._handles[a]).hide()
		},
		setMin : function (a) {
			this._min = a;
			g.call(this)
		},
		getMin : function () {
			return this._min
		},
		setMax : function (a) {
			this._max = a;
			g.call(this)
		},
		getMax : function () {
			return this._max
		},
		getValue : function () {
			return this._value
		},
		setValue : function (a, b) {
			var c = this._value;
			this._isDragging || (this._value = e.call(this, a), c !== this._value && this.dispatchEvent("change", [this._value, b]), this._values[0] = this._value, g.call(this))
		},
		setValues : function (a) {
			var b = this._values.concat();
			if (!this._isDragging) {
				this._values[0] = e.call(this, a[0]);
				this._values[1] = e.call(this, a[1]);
				for (var a = !1, c = 0; 2 > c; c++)
					if (this._values[c] !== b[c]) {
						a =
							!0;
						break
					}
				a && (a && this.dispatchEvent("change", [this._values]), g.call(this))
			}
		},
		getValues : function () {
			return this._values
		},
		setTooltipFunction : function (a) {
			this._tooltipFunction = a
		},
		getTooltipFunction : function () {
			return this._tooltipFunction
		}
	})
})();
(function (d) {
	gav.Klass("gav.controls.PopupMenu", {
		extend : gav.events.EventDispatcher,
		init : function (b) {
			var a = this;
			this._objects = [];
			this._objectKeys = {};
			var c = d("<div role='menu' aria-haspopup='true'></div>").addClass("gav-ui-menu gav-state-hidden").hide();
			b && !0 === b.iconic && d(c).addClass("gav-ui-menu-iconic");
			d("body").append(c);
			this._el = d(c);
			this._inner = d("<div></div>").appendTo(c);
			d(window).bind(gav.mouseDownEvent, function (b) {
				a._el.has(b.target).length || a.hide()
			})
		},
		addItem : function (b) {
			if ("nodeType" in
				b)
				d(b).attr("role") || d(b).attr("role", "menuitem"), this._inner.append(b);
			else {
				var a = d("<div></div>");
				this._objects.push({
					item : b,
					element : a
				});
				b.key && "string" == typeof b.key && (this._objectKeys[b.key] = b);
				"separator" == b.type ? a.attr("role", "separator") : (a.attr("role", "menuitem"), !0 === b.inner && a.attr("data-inner", "true"), "group" == b.type && a.attr("data-group-title", ""));
				var c = b.events || {},
				f;
				for (f in c)
					a.bind(f, c[f]);
				switch (b.type) {
				case "check":
					a.attr("aria-checked", !1)
				}
				a.html(b.text || "");
				this._inner.append(a)
			}
		},
		removeItem : function () {},
		show : function (b, a) {
			this.refresh();
			d(this._el).show();
			var c = this._el,
			f = a;
			f || (f = "bottom");
			if (b && c) {
				currentParent = b;
				currentMenu = c;
				currentDirection = f;
				var e = d(b).offset(),
				g = e.left,
				e = e.top,
				j = d(b).outerHeight(),
				k = d(b).outerWidth(),
				m = d(window).height(),
				o = d(window).width(),
				n = d(c).outerHeight(),
				p = d(c).outerWidth();
				switch (f) {
				case "top":
					f = g + p < o ? g : 0 < g + k - p ? g + k - p : Math.max(0, o - p);
					g = 0 < e - n ? e - n : e + j + n < m ? e + j : 0;
					break;
				case "left":
					f = 0 < g - p ? g - p : g + k + p < o ? g + k : 0;
					g = e + n < m ? e : 0 < e + j - n ? e + j - n : Math.max(0, m - n);
					break;
				case "right":
					f = g + k + p < o ? g + k : 0 < g - p ? g - p : Math.max(0, o - p);
					g = e + n < m ? e : 0 < e + j - n ? e + j - n : Math.max(0, m - n);
					break;
				default:
					f = g + p < o ? g : 0 < g + k - p ? g + k - p : Math.max(0, o - p),
					g = e + j + n < m ? e + j : 0 < e - n ? e - n : Math.max(0, m - n)
				}
				d(c).css({
					left : f,
					top : g
				})
			}
		},
		hide : function () {
			d(this._el).hide()
		},
		refresh : function () {
			for (var b = 0; b < this._objects.length; b++) {
				var a = this._objects[b];
				"check" == a.item.type && a.element.attr("aria-checked", "function" == typeof a.item.checked ? a.item.checked() : a.item.checked)
			}
		},
		clear : function () {
			d(this._inner).html("");
			this._objects =
				[];
			this._objectKeys = {}

		}
	})
})(jQuery);
(function () {
	function d(a, f, e) {
		if (a) {
			a.innerHTML = "";
			var d,
			j,
			k,
			m,
			o,
			n = [];
			if ("[object Array]" === Object.prototype.toString.call(f))
				m = f.length;
			else {
				m = f;
				f = Array(m);
				for (d = 0; d < m; d++)
					f[d] = 360 * d / m
			}
			if ("[object Array]" === Object.prototype.toString.call(e))
				o = e.length;
			else {
				o = e;
				e = Array(o);
				for (d = 0; d < o; d++)
					e[d] = 15 + 80 * d / (o - 1)
			}
			var p = 0,
			r = 0,
			v = 0;
			for (j = 0; j < o; j++) {
				r = 80;
				v = e[j];
				for (d = 0; d < m; d++)
					p = f[d], k = "hsl(" + [p, r, v].join() + ")", k = new gav.utils.Color(k), b(k, n, a, 0 == d);
				0 == j && (v = 100);
				k = "hsl(" + [p, 0, v].join() + ")";
				k = new gav.utils.Color(k);
				b(k, n, a)
			}
			return n
		}
	}
	function b(b, f, d, g) {
		a = document.createElement("div");
		$(a).attr("data-index", f.length);
		f.push(b);
		a.style.backgroundColor = b.toString();
		g && (a.style.clear = "left");
		a.className = "gav-color-patch";
		d.appendChild(a)
	}
	gav.Klass("gav.controls.ColorPickerGridDialog", {
		extend : gav.controls.Popup,
		init : function () {
			gav.controls.Popup.prototype.init.call(this);
			this._element.className = "gav-color-picker-grid";
			this._patches = document.createElement("div");
			this._element.appendChild(this._patches);
			this._colors =
				d(this._patches, [10, 40, 80, 120, 160, 190, 210, 240, 280, 300, 330], [90, 80, 65, 50, 40, 30, 15]);
			var a = this;
			$(this._patches).delegate(".gav-color-patch", "click", function () {
				var b = parseInt($(this).attr("data-index"));
				a.dispatchEvent("colorPick", [a._colors[b]]);
				a.hide()
			});
			$(this._patches).delegate(".gav-color-patch", "hover", function (b) {
				"mouseleave" === b.type ? $(this).removeClass("gav-state-hover") : (b = parseInt($(this).addClass("gav-state-hover").attr("data-index")), a.dispatchEvent("colorHover", [a._colors[b]]))
			});
			this._activeElement =
				null
		},
		show : function (a, b) {
			$(this._patches).children(".gav-state-hover").removeClass("gav-state-hover");
			this._activeElement && this._activeElement.removeClass("gav-state-active");
			if (b instanceof gav.utils.Color)
				for (var d = 0, g = this._colors.length; d < g; d++)
					this._colors[d].isEqual(b) && (this._activeElement = $(this._patches).children().eq(d).addClass("gav-state-active"));
			gav.controls.Popup.prototype.show.apply(this, [a])
		}
	});
	var a
})();
(function () {
	function d(a) {
		a.data.self.show()
	}
	function b(a) {
		this.setColor(a)
	}
	var a;
	gav.Klass("gav.controls.ColorPicker", {
		extend : gav.events.EventDispatcher,
		init : function (b) {
			gav.events.EventDispatcher.prototype.init.call(this);
			var f = $.extend({
					element : null,
					color : "#000"
				}, b);
			f.element && (b = b.element, this._color = new gav.utils.Color(f.color), a || (a = new gav.controls.ColorPickerGridDialog), $(b).addClass("gav-color-picker-element").bind("click", {
					self : this
				}, d), this._element = b, this._element.style.backgroundColor =
					this._color, this._innerCornerElement = document.createElement("div"), this._innerCornerElement.className = "gav-color-picker-corner", this._element.appendChild(this._innerCornerElement))
		},
		show : function () {
			a.removeEventListener("colorPick", b);
			a.show(this._element, this._color);
			a.addEventListener("colorPick", b, this)
		},
		hide : function () {
			a && a.hide()
		},
		getColor : function () {
			return this._color
		},
		setColor : function (a) {
			this._color === a || this._color.isEqual(a) || (this._color = a, $(this._element).css({
					backgroundColor : a.toHex()
				}),
				this.dispatchEvent("change"))
		},
		destroy : function () {
			$(this._element).unbind("click", d).removeClass("gav-color-picker-element");
			this._element.removeChild(this._innerCornerElement);
			a.removeEventListener("colorPick", b, this)
		}
	})
})();
(function (d) {
	gav.Klass("gav.controls.Spinner", {
		extend : gav.events.EventDispatcher,
		init : function (b, a) {
			function c() {
				e._valueChanged && (e.dispatchEvent("change", [e._value]), e._valueChanged = !1)
			}
			gav.events.EventDispatcher.prototype.init.call(this);
			var f = d.extend({
					min : null,
					max : null,
					step : 1,
					value : 0
				}, a),
			e = this;
			b || (b = document.createElement("div"));
			d(b).addClass("gav-spinner");
			var g = document.createElement("input");
			this._input = g;
			var j = document.createElement("div");
			j.className = "gav-spinner-controls";
			var k = document.createElement("div");
			k.className = "gav-spinner-up";
			var m = document.createElement("div");
			m.className = "gav-spinner-down";
			j.appendChild(k);
			j.appendChild(m);
			this._dispatchChangeEvent = !1;
			d(g).change(function () {
				var a = parseFloat(this.value);
				e._value !== a && !isNaN(a) ? e.setValue(a) : e._input.value = e._value;
				c()
			}).keydown(function (a) {
				switch (a.keyCode) {
				case 40:
					return e.down(),
					!1;
				case 38:
					return e.up(),
					!1
				}
			}).keyup(c);
			d(k).mousedown(function (a) {
				if (1 === a.which)
					return e.up(), a.preventDefault(), !1
			}).mouseup(c);
			d(m).mousedown(function (a) {
				if (1 ===
					a.which)
					return e._dispatchChangeEvent = !0, e.down(), e._dispatchChangeEvent = !1, a.preventDefault(), !1
			}).mouseup(c);
			b.appendChild(g);
			b.appendChild(j);
			this._max = f.max;
			this._min = f.min;
			this._step = f.step;
			this._value = 0;
			this._input.value = this._value;
			this.setValue(f.value);
			f.change && this.addEventListener("change", f.change)
		},
		up : function () {
			this.setValue(this._value + this._step)
		},
		down : function () {
			this.setValue(this._value - this._step)
		},
		getValue : function () {
			return this._value
		},
		setValue : function (b) {
			this._value === b || isNaN(b) ||
			(null !== this._max && b > this._max && (b = this._max), null !== this._min && b < this._min && (b = this._min), this._value = b, this._input.value = b, this._valueChanged = !0)
		}
	})
})(jQuery);
(function () {
	gav.Klass("gav.representation.ConstantColorMap", {
		extend : gav.events.EventDispatcher,
		implement : gav.representation.IColorMap,
		init : function (d) {
			gav.events.EventDispatcher.prototype.init.call(this);
			this._color = new gav.utils.Color(d)
		},
		getColorLegend : function () {
			return gav && gav.components && gav.components.ConstantColorMapLegend || null
		},
		setColor : function (d) {
			this._color = new gav.utils.Color(d);
			this.dispatchEvent("colorMapChanged", [this._color])
		},
		getColor : function () {
			return this._color
		}
	})
})();
(function () {
	function d(b) {
		for (var a = 0; a < b.length; a++)
			b[a]instanceof gav.utils.Color || (b[a] = new gav.utils.Color(b[a]))
	}
	gav.Klass("gav.representation.ColorMap", {
		extend : gav.events.EventDispatcher,
		implement : [gav.snapshot.IStorable, gav.representation.IColorMap],
		init : function () {
			gav.events.EventDispatcher.prototype.init.call(this);
			var b = gav.utils.Color;
			this._colors = [4684211, 4684211, 8963281, 8963281, 15920823, 15920823, 16170097, 16170097, 14168105, 14168105, 10485762, 10485762];
			d(this._colors);
			this._defaultColors =
				[4684211, 4684211, 4684211, 8963281, 8963281, 14478060, 15920823, 16170097, 16170097, 14168105, 14168105, 14168105];
			d(this._defaultColors);
			this._defaultColor = new b(11206570);
			this._nanColor = new b(16777215);
			this._filteredColor = new b(15658734);
			this._noneColor = new b(4473924);
			this._oldUsedAttribute = this._usedAttribute = this._attribute = this._oldUsedSlice = this._usedSlice = this._slice = 0;
			this._limitsBasedOnPercentiles = !1;
			this.setPercentiles([0, 0.05, 0.25, 0.5, 0.75, 0.95, 1])
		},
		state : function () {
			function b() {
				for (var a = [], b = 0; b <
					this._colors.length; b += 2)
					a.push({
						"@start" : this._colors[b].toHex(),
						"@end" : this._colors[b + 1].toHex()
					});
				return a
			}
			function a(a) {
				for (var b = [], c = 0; c < a.length; c += 1)
					a[c]["@start"] ? b.push(new gav.utils.Color(a[c]["@start"])) : b.push(new gav.utils.Color(a[c].startColor)), a[c]["@end"] ? b.push(new gav.utils.Color(a[c]["@end"])) : b.push(new gav.utils.Color(a[c].endColor));
				this.setColors(b)
			}
			var c = this;
			return {
				"@indicator" : {
					"#type" : "int",
					get : function () {
						return c.getAttribute()
					},
					set : function (a) {
						gav.helpers.isNumber(a) &&
						c.setAttribute(a)
					}
				},
				parts : {
					"#shareable" : !0,
					part : {
						"#type" : "array",
						"#elementType" : "object",
						get : function () {
							return b.call(c)
						},
						set : function (b) {
							a.call(c, b)
						}
					}
				},
				edges : {
					"#shareable" : !0,
					get : function () {
						var a = c.isLimitsBasedOnPercentiles() ? c.getPercentiles() : c.getLimits(),
						a = a.slice(1, a.length - 1);
						return {
							"@type" : c.isLimitsBasedOnPercentiles() ? "percentiles" : "limits",
							edge : a
						}
					},
					set : function (a) {
						"percentiles" === a["@type"] ? c.setPercentiles([0].concat(a.edge).concat([1])) : c.setLimits([0].concat(a.edge).concat([1]))
					}
				}
			}
		},
		getSnapshotType : function () {
			return gav.snapshot.SnapshotManager.type.REPRESENTATION
		},
		getColorLegend : function () {
			return gav && gav.components && gav.components.ColorMapLegend2 || null
		},
		setDataCube : function (b) {
			gav.__LOG && console.warn("ColorMap.setDataCube() is deprecated. Use setDataSet() instead.");
			b !== this._dataCube && (this._numSlices = (this._dataCube = b) ? b.getNumSlices() : 0, this._numAttributes = b ? b.getNumAttributes() : 0, this._numRecords = b ? b.getNumRecords() : 0, this._oldUsedAttribute = this._usedAttribute, this._usedAttribute =
					this._attribute >= this._numAttributes ? 0 : this._attribute, this._usedAttribute === this._oldUsedAttribute && (this._usedAttributeChanged = !0), this._oldUsedSlice = this._usedSlice, this._usedSlice = this._slice >= this._numSlices ? 0 : this._slice, this._usedSlice === this._oldUsedSlice && (this._usedSliceChanged = !0), this._dataCubeChanged = !0, this._update())
		},
		getDataCubeee : function () {
			return this._dataCube
		},
		setDataSet : function (b) {
			if (b !== this._dataSet) {
				var a = new gav.events.PropertyChangeEvent("dataSet", this._dataSet, b);
				this._dataSet =
					b;
				this.dispatchEvent(a);
				this._numSlices = (this._dataCube = b = this._dataSet ? this._dataSet.getDataCube() : null) ? b.getNumSlices() : 0;
				this._numAttributes = b ? b.getNumAttributes() : 0;
				this._numRecords = b ? b.getNumRecords() : 0;
				this._oldUsedAttribute = this._usedAttribute;
				this._usedAttribute = this._attribute >= this._numAttributes ? 0 : this._attribute;
				this._usedAttribute === this._oldUsedAttribute && (this._usedAttributeChanged = !0);
				this._oldUsedSlice = this._usedSlice;
				this._usedSlice = this._slice >= this._numSlices ? 0 : this._slice;
				this._usedSlice ===
				this._oldUsedSlice && (this._usedSliceChanged = !0);
				this._dataSetChanged = !0;
				this._update()
			}
		},
		getDataSet : function () {
			return this._dataSet
		},
		setAttribute : function (b) {
			b !== this._attribute && (this._attribute = b, this._oldUsedAttribute = this._usedAttribute, this._usedAttribute = this._attribute >= this._numAttributes ? 0 : this._attribute, this._usedSlice = this._slice >= this._numSlices ? 0 : this._slice, this._usedAttribute !== this._oldUsedAttribute && (this._usedAttributeChanged = !0, this.dispatchEvent(new gav.events.PropertyChangeEvent("attribute",
							this._oldUsedAttribute, this._usedAttribute)), this._update()))
		},
		getAttribute : function () {
			return this._usedAttribute
		},
		setSlice : function (b) {
			b !== this._slice && (this._slice = b, this._oldUsedSlice = this._usedSlice, this._usedAttribute = this._attribute >= this._numAttributes ? 0 : this._attribute, this._usedSlice = this._slice >= this._numSlices ? 0 : this._slice, this._usedSlice !== this._oldUsedSlice && (this._usedSliceChanged = !0, this._update()))
		},
		getSlice : function () {
			return this._slice
		},
		isLimitsBasedOnPercentiles : function () {
			return this._limitsBasedOnPercentiles
		},
		setColors : function (b) {
			this._colors = b;
			if (!this._colors || !this._colors.length)
				this._colors = this._defaultColors.concat();
			d(this._colors);
			this._needToUpdateGlobalColorArray = !0;
			this.dispatchEvent("waitForColorChange");
			this._update()
		},
		getColors : function () {
			return this._colors
		},
		setPercentiles : function (b) {
			this._percentiles = b;
			this._limitsBasedOnPercentiles = this._percentilesChanged = !0;
			this._update()
		},
		getPercentiles : function () {
			return this._percentiles
		},
		setDefaultPercentiles : function (b) {
			this._defaultPercentiles =
				b;
			this.setPercentiles(b.concat())
		},
		getDefaultPercentiles : function () {
			return this._defaultPercentiles
		},
		getColor : function (b) {
			if (0 === arguments.length || !this._dataCube || 0 > this._usedAttribute)
				return this._noneColor;
			if (!this._colors)
				throw Error("No colors specified");
			if (2 * (this._limits.length - 1) !== this._colors.length)
				throw Error("Number of colors and number of limits does not match");
			return b >= this._dataCube.getNumRecords() ? this._noneColor : this._calculateColor(b, this._usedSlice)
		},
		getColorForValue : function (b) {
			return 0 >
			this._usedAttribute ? this._noneColor : this._calculateColorForValue(b)
		},
		getColorOfStepAndAttribute : function (b, a, c) {
			if (!this._dataCube || c >= this._numSlices || 0 > a || a >= this._numAttributes)
				return this._noneColor;
			if (!this._colors)
				throw Error("No colors specified");
			if (2 * (this._limits.length - 1) !== this._colors.length)
				throw Error("Number of colors and number of limits does not match");
			return this._calculateColorForValue(this._dataCube.getScaledValue(b, a, c))
		},
		setLimit : function (b, a) {
			var c = this._limits ? this._limits.length :
				0;
			if (!(b >= c)) {
				1 < a && (a = 1);
				0 > a && (a = 0);
				for (var f = 0; f < b; f++)
					this._limits[f] > a && (this._limits[f] = a);
				this._limits[b] = a;
				for (f = b + 1; f < c; f++)
					this._limits[f] < a && (this._limits[f] = a);
				this._limitsChanged = !0;
				this._limitsBasedOnPercentiles = !1;
				this.dispatchEvent("limitsChanged");
				this._update()
			}
		},
		setLimits : function (b) {
			this._limitsBasedOnPercentiles = !1;
			this._limits = b;
			this._limitsChanged = !0;
			this.dispatchEvent("limitsChanged");
			this._update()
		},
		getLimits : function () {
			return this._limits
		},
		getGlobalRecordColors : function () {
			return this._globalRecordColors
		},
		informObservers : function () {
			this._recordColors = this._createColorArray();
			var b = new gav.events.GavEvent("colorMapChanged");
			b.colors = this._recordColors;
			b.globalColors = this._globalRecordColors;
			this.dispatchEvent(b);
			this._waitingEventDispatched = !1
		},
		getNaNColor : function () {
			return this._nanColor
		},
		setNaNColor : function (b) {
			this._nanColor = b instanceof gav.utils.Color ? b : new gav.utils.Color(b)
		},
		getFilteredColor : function () {
			return this._filteredColor
		},
		setFilteredColor : function (b) {
			this._filteredColor = b instanceof gav.utils.Color ?
				b : new gav.utils.Color(b)
		},
		_calculateColor : function (b, a) {
			return 0 > this._usedAttribute ? this._noneColor : this._calculateColorForValue(this._dataCube.getScaledValue(b, this._usedAttribute, a))
		},
		_calculateColorForValue : function (b) {
			if (b !== b)
				return this._nanColor;
			if (0 === b)
				return this._colors[0];
			for (var a = 0; a < this._limits.length && this._limits[a] <= b; )
				a++;
			if (a >= this._limits.length)
				return this._colors[this._colors.length - 1];
			var c = 2 * (a - 1) + 1;
			return gav.utils.Color.getBlend(this._colors[c - 1], this._colors[c], (b - this._limits[a -
						1]) / (this._limits[a] - this._limits[a - 1]))
		},
		_update : function () {
			this._limitsBasedOnPercentiles && (this._percentilesChanged || this._dataCubeChanged || this._dataSetChanged || this._usedAttributeChanged || this._disabledRecordsChanged) ? this._updateLimits() : this._limitsChanged && (!this._limits || 0 === this._limits.length) && this._calculateLimitsFromColors();
			this._percentilesChanged || this._limitsChanged || this._dataSetChanged || this._dataCubeChanged || this._usedAttributeChanged || this._disabledRecordsChanged || this._needToUpdateGlobalColorArray ?
			(this._createGlobalColorArray(), this.informObservers()) : this._usedSliceChanged && this.informObservers();
			this._needToUpdateGlobalColorArray = this._usedSliceChanged = this._limitsChanged = this._disabledRecordsChanged = this._usedAttributeChanged = this._dataSetChanged = this._dataCubeChanged = this._percentilesChanged = !1
		},
		_updateLimits : function () {
			this._percentiles && this._dataCube && 0 <= this._usedAttribute ? this._limits = gav.utils.Percentiles.calculateLimits(this._percentiles, this._dataCube, null, this._usedAttribute,
					this._usedSlice, !0) : this._dataCube ? this._percentiles || (this._limits = this._calculateLimitsFromColors()) : this._limits = this._percentiles;
			this.dispatchEvent("limitsChanged")
		},
		_calculateLimitsFromPercentiles : function () {},
		_calculateLimitsFromColors : function () {
			for (var b = this._colors ? this._colors.length : 0, a = Array(b + 1), c = 0; c < b + 1; c++)
				a[c] = c / b;
			this._limits = a;
			this.dispatchEvent("limitsChanged")
		},
		_createColorArray : function () {
			if (!this._dataCube || !this._limits)
				return null;
			if (!this._colors)
				throw Error("No colors specified.");
			if (2 * (this._limits.length - 1) !== this._colors.length)
				throw Error("Number of colors and number of limits does not match");
			return this._globalRecordColors[this._slice]
		},
		_createGlobalColorArray : function () {
			if (!this._dataCube || !this._limits)
				this._globalRecordColors = null;
			else {
				if (!this._colors)
					throw Error("No colors specified");
				if (2 * (this._limits.length - 1) !== this._colors.length)
					throw Error("Number of colors and number of limits does not match");
				if (!this._globalRecordColors || this._globalRecordColors.length !==
					this._numSlices)
					this._globalRecordColors = Array(this._numSlices);
				for (var b, a = 0; a < this._numSlices; a++) {
					b = this._globalRecordColors[a];
					if (!b || b.length !== this._numRecords)
						b = Array(this._numRecords), this._globalRecordColors[a] = b;
					for (var c = 0; c < this._numRecords; c++)
						b[c] = this._calculateColor(c, a)
				}
			}
		},
		"@calculateColorsForFloatingSlice" : function (b, a, c) {
			if (0 == c || !b || !(b instanceof gav.representation.ColorMap))
				return null;
			var f = Math.floor(a),
			d,
			g = (b = b.getGlobalRecordColors()) ? b.length : 0;
			if (f < c - 1) {
				c = g > f ? b[f] : null;
				b = g > f + 1 ? b[f + 1] : null;
				if (!c || !b)
					return null;
				f = a - f;
				g = c.length;
				d = Array(g);
				for (a = 0; a < g; a++)
					d[a] = c[a].blend(b[a], f)
			} else if (f == c - 1) {
				g = (c = g > f ? b[f] : null) ? c.length : 0;
				d = Array(g);
				for (a = 0; a < g; a += 1)
					d[a] = c[a].toRGB()
			}
			return d
		}
	})
})();
(function () {
	gav.Klass("gav.representation.CategoricalColorMap", {
		extend : gav.Invalidatable,
		implement : [gav.representation.IColorMap, gav.snapshot.IStorable],
		init : function (d) {
			gav.Invalidatable.prototype.init.call(this);
			this._name = d;
			this._defaultColor = new gav.utils.Color(11206570);
			this._nanColor = new gav.utils.Color(15658734);
			this._noneColor = new gav.utils.Color(4473924);
			this._oldUsedAttribute = this._usedAttribute = this._attribute = this._oldUsedSlice = this._usedSlice = this._slice = 0;
			this._categoryChildrenColors =
				[];
			this._explicitCategoryColors = []
		},
		getColorLegend : function () {
			return gav && gav.components && gav.components.CategoricalColorMapLegend || null
		},
		getSnapshotType : function () {
			return gav.snapshot.SnapshotManager.type.REPRESENTATION
		},
		state : function () {
			var d = this;
			return {
				"#object" : this,
				"@attribute" : {
					"#type" : "int"
				},
				colors : {
					"#shareable" : !0,
					indicator : {
						set : function (b) {
							if ((b = Array.isArray(b) ? b : [b]) && b.length)
								for (var a = 0; a < b.length; a++)
									if ("undefined" != typeof b[a])
										for (var c = parseInt(b[a]["@index"]), f = Array.isArray(b[a].color) ?
												b[a].color : [b[a].color], e, g, j = 0; j < f.length; j++)
											e = parseInt(f[j]["@index"]), g = new gav.utils.Color(f[j]["@value"]), !isNaN(e) && g && d.setCategoryColor(c, e, g)
						},
						get : function () {
							for (var b = [], a, c = 0; c < d._explicitCategoryColors.length; c++)
								if ((a = d._explicitCategoryColors[c]) && a.length) {
									for (var f = [], e = 0; e < a.length; e++)
										a[e] && f.push({
											"@index" : e,
											"@value" : a[e].toHex()
										});
									b.push({
										"@index" : c,
										color : f
									})
								}
							if (b.length)
								return b
						}
					}
				}
			}
		},
		setDataSet : function (d) {
			if (d !== this._dataSet) {
				this._classCube = d = (this._dataSet = d) ? this._dataSet.getClassCube() :
					null;
				var b = this._dataSet ? this._dataSet.getDataCube() : null;
				this._numSlices = d ? d.getNumSlices() : 0;
				this._numAttributes = d ? d.getNumAttributes() : 0;
				this._numRecords = d ? d.getNumRecords() : 0;
				this._dcNumSlices = b ? b.getNumSlices() : 0;
				this._oldUsedAttribute = this._usedAttribute;
				this._usedAttribute = this._attribute >= this._numAttributes ? 0 : this._attribute;
				this._usedAttribute === this._oldUsedAttribute && (this._usedAttributeChanged = !0);
				this._oldUsedSlice = this._usedSlice;
				this._usedSlice = this._slice >= this._numSlices ? 0 : this._slice;
				this._usedSlice === this._oldUsedSlice && (this._usedSliceChanged = !0);
				this._dataSetChanged = !0;
				this.dispatchEvent(new gav.events.PropertyChangeEvent("dataSet", null, this._dataSet));
				this.invalidate()
			}
		},
		getDataSet : function () {
			return this._dataSet
		},
		setAttribute : function (d) {
			d !== this._attribute && (this._attribute = d, this._oldUsedAttribute = this._usedAttribute, this._usedAttribute = this._attribute >= this._numAttributes ? 0 : this._attribute, this._usedSlice = this._slice >= this._numSlices ? 0 : this._slice, this._usedAttribute !==
				this._oldUsedAttribute && (this._usedAttributeChanged = !0, this.dispatchEvent(new gav.events.PropertyChangeEvent("attribute", this._oldUsedAttribute, this._usedAttribute)), this.invalidate()))
		},
		getAttribute : function () {
			return this._usedAttribute
		},
		setSlice : function (d) {
			d !== this._slice && (this._slice = d, this._oldUsedSlice = this._usedSlice, this._usedAttribute = this._attribute >= this._numAttributes ? 0 : this._attribute, this._usedSlice = this._slice >= this._numSlices ? 0 : this._slice, this._usedSlice !== this._oldUsedSlice && (this._usedSliceChanged =
						!0, this.invalidate()))
		},
		getSlice : function () {
			return this._slice
		},
		setCategoryColor : function (d, b, a) {
			"undefined" == typeof d && (d = this._attribute);
			this._explicitCategoryColors[d] || (this._explicitCategoryColors[d] = []);
			this._explicitCategoryColors[d][b] = a;
			this.invalidate()
		},
		getCategoryToColorMapping : function () {
			return this._categoryToColorMapping
		},
		setCategoryToColorMapping : function (d) {
			this._categoryToColorMapping = d;
			this._explicitColorsChanged = !0;
			this.invalidate()
		},
		getColor : function (d) {
			return this._recordColors &&
			this._recordColors[d] ? this._recordColors[d] : this._noneColor
		},
		getCategoryColors : function (d) {
			return this._categoryChildrenColors[d]
		},
		informObservers : function () {
			var d = new gav.events.GavEvent("colorMapChanged");
			d.globalColors = this._globalRecordColors;
			this.dispatchEvent(d)
		},
		_update : function () {
			if (this._dataSetChanged || this._attributeChanged) {
				var d = this._classCube,
				b = this._usedAttribute,
				a = this._usedSlice,
				c = d ? d.getOrderedCategoricalValues(b) : [],
				f = c ? c.length : 0,
				e = this._numAttributes,
				g;
				this._categoryChildrenColors =
					Array(e);
				for (var j = this._classCube, k, m, o, n = 0; n < e; n++) {
					m = (k = j ? j.getOrderedCategoricalValues(n) : []) ? k.length : 0;
					g = Array(m);
					o = this._explicitCategoryColors[n] || [];
					for (var p = 0; p < m; p += 1)
						g[p] = this._categoryToColorMapping && this._categoryToColorMapping[k[p]] && !o[p] ? new gav.utils.Color(this._categoryToColorMapping[k[p]]) : o[p] || new gav.utils.Color("hsl(" + [360 * p / m, 80, 50 + 20 * (p % 2)].join() + ")");
					this._categoryChildrenColors[n] = g
				}
				e = d ? d.getNumRecords() : 0;
				this._recordColors = Array(e);
				this._recordToCategory = Array(e);
				for (g =
						0; g < e; g += 1)
					if (j = d.getValue(g, b, a), j = c.indexOf(j), isNaN(j) || 0 > j || j >= f)
						this._recordColors[g] = this._nanColor, this._recordToCategory[g] = void 0;
					else {
						this._recordColors[g] = this._categoryChildrenColors[b][j];
						this._recordToCategory[g] = Array(this._numSlices);
						for (j = 0; j < this._numSlices; j++)
							this._recordToCategory[g][j] = c.indexOf(d.getValue(g, b, j))
					}
				if (e) {
					this._globalRecordColors = Array(this._dcNumSlices);
					for (j = 0; j < this._dcNumSlices; j++)
						if (j >= this._numSlices)
							this._globalRecordColors[j] = this._recordColors;
						else {
							this._globalRecordColors[j] =
								Array(e);
							for (g = 0; g < e; g += 1)
								this._globalRecordColors[j][g] = this._recordToCategory[g] ? this._categoryChildrenColors[b][this._recordToCategory[g][j]] : this._recordColors[g]
						}
				} else
					this._globalRecordColors = null
			}
			this.informObservers()
		}
	})
})();
(function () {
	gav.Klass("gav.representation.ColorMapProvider", {
		extend : gav.events.EventDispatcher,
		implement : [gav.snapshot.IStorable, gav.snapshot.IStorablesContainer, gav.snapshot.ISnapshotReader, gav.snapshot.ISnapshotReadableComponent],
		init : function () {
			gav.events.EventDispatcher.prototype.init.call(this);
			this._colorMaps = [];
			this._activeColorMapIndex = -1
		},
		getSnapshotReaders : function () {
			return [this]
		},
		getSnapshotSite : function () {
			return {}

		},
		read : function (d) {
			d = $(d).children("components").children("floatingColorLegend");
			d.attr("visible");
			for (var b = "true" === d.attr("colorByCategory"), a, c = 0; (a = this._colorMaps[c]) && !(a instanceof gav.representation.CategoricalColorMap); )
				c++;
			a && (c = parseInt(d.attr("categoryIndex")), d.find("categoryColors > category").each(function (b, c) {
					var d = $(c),
					j = parseInt(d.attr("index"));
					d.children("color").each(function (b, c) {
						var f = parseInt($(c).attr("index")),
						d = new gav.utils.Color(parseInt($(c).text()));
						!isNaN(f) && d && a.setCategoryColor(j, f, d)
					})
				}), !isNaN(c) && a.setAttribute(c), b && this.setActiveColorMap(a));
			if (!b && this._activeColorMap instanceof gav.representation.CategoricalColorMap) {
				for (a = void 0, c = 0; (a = this._colorMaps[c]) && !(a instanceof gav.representation.ColorMap); )
					c++;
				a && this.setActiveColorMap(a)
			}
		},
		getSnapshotType : function () {
			return gav.snapshot.SnapshotManager.type.REPRESENTATION
		},
		state : function () {
			return {
				"#object" : this,
				"@activeColorMapIndex" : {
					"#type" : "int"
				},
				"@activeType" : this._activeColorMap ? this._activeColorMap.getClassName() : ""
			}
		},
		getStorables : function () {
			return this._colorMaps
		},
		setActiveColorMapIndex : function (d) {
			this._activeColorMapIndex =
				d;
			d = this._colorMaps[d];
			this._activeColorMap !== d && (this._activeColorMap = d, this.dispatchEvent("activeColorMapChanged", [d]))
		},
		getActiveColorMapIndex : function () {
			return this._activeColorMapIndex
		},
		setActiveColorMap : function (d) {
			this._activeColorMap = d;
			d = this._colorMaps.indexOf(d);
			this._activeColorMapIndex !== d && (this._activeColorMapIndex = d, this.dispatchEvent("activeColorMapIndexChanged", [d]));
			return this
		},
		getActiveColorMap : function () {
			return this._activeColorMap
		},
		setActiveColorMapType : function (d) {
			if (this._colorMaps &&
				this._colorMaps.length) {
				for (var b, a = 0; (b = this._colorMaps[a++]) && !(b instanceof d); );
				b && b != this._activeColorMap && this.setActiveColorMap(b)
			}
		},
		getColorMapOfType : function (d) {
			if (!this._colorMaps || !this._colorMaps.length)
				return null;
			for (var b, a = 0; (b = this._colorMaps[a++]) && !(b instanceof d); );
			return b
		},
		setColorMaps : function (d) {
			this._colorMaps = d;
			return this
		},
		getColorMaps : function () {
			return this._colorMaps
		}
	})
})();
gav.Klass("gav.representation.SelectionManager", {
	extend : gav.events.EventDispatcher,
	implement : gav.snapshot.IStorable,
	init : function () {
		gav.events.EventDispatcher.prototype.init.call(this);
		this._pickables = [];
		this._selectable = [];
		this._selected = [];
		this._lockState = -1
	},
	state : function () {
		var d = this;
		return {
			"@type" : "selectionlist",
			index : {
				"#type" : "array",
				"#elementType" : "int",
				get : function () {
					return d.getSelectedRecords()
				},
				set : function (b) {
					var a = d._lockState;
					d._lockState = -1;
					d.setSelected(b);
					d._lockState = a
				}
			}
		}
	},
	getSnapshotType : function () {
		return gav.snapshot.SnapshotManager.type.REPRESENTATION
	},
	add : function (d) {
		d.isIFace(gav.representation.IPickable) && this.addPickable(d);
		d.isIFace(gav.representation.ISelectionListConsumer) && this.addSelectable(d)
	},
	remove : function (d) {
		this.removePickable(d);
		this.removeSelectable(d)
	},
	addPickable : function (d) {
		0 <= this._pickables.indexOf(d) || (this._pickables.push(d), d.addEventListener("picked", this._onPick, this))
	},
	addSelectable : function (d) {
		0 <= this._selectable.indexOf(d) || (this._selectable.push(d), d.setSelectionList(this))
	},
	removePickable : function (d) {
		var b = this._pickables.indexOf(d);
		0 > b || (this._pickables.splice(b, 1), d.removeEventListener("picked", this._onPick))
	},
	removeSelectable : function (d) {
		var b = this._selectable.indexOf(d);
		0 > b || (this._selectable.splice(b, 1), d.setSelectionList(null))
	},
	_onPick : function (d) {
		this.setSelected(d.getIndices(), d.getState())
	},
	setSelected : function (d, b) {
		2 > arguments.length && (b = 1);
		-1 != this._lockState && (b = this._lockState);
		var a = [],
		c = [];
		if (b === gav.events.PickedEvent.REPLACE && this._selected) {
			for (var a = this._selected.concat(), c = Array(this._selected.length), f =
					0; f < this._selected.length; f++)
				c[f] = !1;
			this._selected = []
		}
		for (var e, g, f = 0; f < d.length; f++)
			g = d[f], e = this._selected.indexOf(g), 0 > g || (0 > e ? (this._selected.push(g), e = a.indexOf(g), 0 > e ? (a.push(g), c.push(!0)) : c[e] = !0) : b === gav.events.PickedEvent.INVERT && (this._selected.splice(e, 1), a.push(g), c.push(!1)));
		this.dispatchEvent(gav.events.SelectionEvent.createSelectionChanged(this._selected, a, c))
	},
	getSelectedRecords : function () {
		return this._selected
	},
	isSelected : function (d) {
		return 0 <= this._selected.indexOf(d)
	}
});
(function () {
	gav.Klass("gav.representation.NumberFormatter", {
		init : function (d) {
			0 < arguments.length && (this.precision = d)
		},
		decimalSeparator : ".",
		thousandSeparator : ",",
		precision : 1,
		getFormattedValue : function (d) {
			var b = new Number(d);
			if (isNaN(d) || isNaN(b))
				return "N/A";
			var a = Math.max(0, Math.min(this.precision, 20));
			return 0 > a ? (a = Math.abs(b), b = 0 == a ? "0" : 0 > a.toString().indexOf(".") ? b.toFixed(0) : 1 > a ? b.toFixed(Math.min(20, Math.ceil(Math.abs(Math.log(a) / Math.log(10)))) + 1) : 100 <= a ? b.toFixed(0) : 10 <= a ? b.toFixed(1) : b.toFixed(2),
				1E3 <= Math.abs(d) ? this.placeThousandsSeparators(b) : b.toString()) : 0 === a && 1 > Math.abs(b) && 0 < Math.abs(b) ? b.toFixed(1) : 0 === a && 0 === b ? "0" : 1E3 < Math.abs(b) ? this.placeThousandsSeparators(b.toFixed(a)) : b.toFixed(a)
		},
		placeThousandsSeparators : function (d) {
			var b = d.indexOf("."),
			a = "",
			c = "";
			-1 !== b ? (a = d.substring(0, b), c = d.substring(b + 1, d.length)) : a = d;
			(d = "-" === a.charAt(0)) && (a = a.substring(1));
			for (b = a.length - 3; 0 < b; b -= 3)
				a = a.substr(0, b).concat(this.thousandSeparator).concat(a.substring(b, a.length));
			d && (a = "-".concat(a));
			return "" !==
			c ? a + this.decimalSeparator + c : a
		}
	})
})();
(function () {
	gav.Klass("gav.representation.AutomaticNumericStringProvider", {
		init : function () {},
		getFormattedAttributeValue : function (d, b, a) {
			3 > arguments.length && (a = -1);
			if (isNaN(b))
				return "NaN";
			var c = this.self._precisions;
			if (b === Math.floor(b))
				return b.toString();
			if (c && -1 === a) {
				var f;
				try {
					f = 1 > b && 0 <= b && 0 === c[d][0] ? b.toPrecision(2) : b.toFixed(c[d][0])
				} catch (e) {
					f = b.toPrecision(5)
				}
				return f
			}
			return -1 !== a ? b.toPrecision(a) : b.toPrecision(5)
		},
		getAttributeUnit : function () {
			return ""
		},
		getFormattedAttributeValueWithUnit : function (d,
			b, a) {
			return this.getFormattedAttributeValue(d, b, a)
		}
	});
	gav.representation.AutomaticNumericStringProvider.setDefaultDataCube = function (d) {
		var b = gav.representation.AutomaticNumericStringProvider;
		if (b._defaultDataCube = d) {
			for (var a = 1 / Math.log(10), c = Array(d.getNumAttributes()), f = 0; f < c.length; f++) {
				c[f] = Array(d.getNumSlices());
				for (var e = 0; e < d.getNumSlices(); e++) {
					var g = Math.round(-a * Math.log(d.getMaxValue(f) - d.getMinValue(f))) + 2;
					c[f][e] = 0 <= g ? g : 0
				}
			}
			b._precisions = c
		}
	};
	gav.representation.AutomaticNumericStringProvider.getDefaultDataCube =
	function () {
		return gav.representation.AutomaticNumericStringProvider._defaultDataCube
	}
})();
(function () {
	gav.Klass("gav.representation.NumericStringProvider", {
		init : function () {
			this._numberFormatter = new gav.representation.NumberFormatter;
			this.standardPrecision = NaN;
			this._usingNumberAbbreviation = !1
		},
		setDataSet : function (d) {
			this._dataSet = d;
			gav.representation.AutomaticNumericStringProvider.setDefaultDataCube(this._dataSet ? this._dataSet.getDataCube() : null)
		},
		getDataSet : function () {
			return this._dataSet
		},
		getNumberFormatter : function () {
			return this._numberFormatter
		},
		getFormattedAttributeValue : function (d,
			b, a) {
			3 > arguments.length && (a = -1);
			if (isNaN(b))
				return "N/A";
			isNaN(this.standardPrecision) || (a = this.standardPrecision);
			this._numberFormatter.precision = a;
			var c,
			f = "";
			try {
				if (this._usingNumberAbbreviation) {
					var e = Math.abs(b);
					e >= Math.pow(10, 9) ? (b /= Math.pow(10, 9), f = "B") : e >= Math.pow(10, 6) ? (b /= Math.pow(10, 6), f = "M") : e >= Math.pow(10, 3) && (b /= Math.pow(10, 3), f = "K")
				}
				a = -1 !== a ? a : this._dataSet.getIndicatorInformation()[d].precision;
				this._numberFormatter.precision = a;
				c = this._numberFormatter.getFormattedValue(b)
			} catch (g) {
				c =
					this._numberFormatter.getFormattedValue(b)
			}
			return c + f
		},
		getAttributeUnit : function (d) {
			var b;
			try {
				b = this._dataSet.getIndicatorInformation()[d].unit
			} catch (a) {
				b = ""
			}
			"null" == b && (b = "");
			return b
		},
		getFormattedAttributeValueWithUnit : function (d, b, a) {
			3 > arguments.length && (a = -1);
			if (isNaN(b))
				return "N/A";
			var c = this.getFormattedAttributeValue(d, b, a),
			f = this.getAttributeUnit(d);
			return f && f.length ? c + " " + f : c
		}
	})
})();
(function () {
	function d(a) {
		0 > this._rangeFilters.indexOf(a.getSender()) && console.warn("RangeFilter not part of VisManager")
	}
	function b(a) {
		for (var b = a.getItems().concat(), d = [], a = a.getFiltered(), g = 0; g < a.length; g++)
			d.push(!a[g]);
		this.dispatchEvent(gav.events.VisibilityEvent.createVisibilityChanged(b, d))
	}
	function a(a) {
		var b,
		e = this._dataSet && this._dataSet.getDataCube() ? this._dataSet.getDataCube().getNumAttributes() : 0;
		this._filters.suppressChanges();
		for (var g = 0; g < e; g++)
			if (b = this._rangeFilters[g])
				b.setDataCube &&
				b.setDataCube(this._dataSet.getDataCube()), b.setSlice && b.setSlice(this._slice), b.invalidate();
		for (a ? this._filters.discardSuppressedChanges() : this._filters.commitSuppressedChanges(); this._rangeFilters.length > e; )
			a = this._rangeFilters.pop(), a.removeEventListener(gav.events.FilterEvent.FILTER_CHANGED, d), this._filters.removeFilter(a)
	}
	gav.Klass("gav.representation.VisibilityManager", {
		extend : gav.events.EventDispatcher,
		implement : gav.snapshot.IStorablesContainer,
		init : function () {
			gav.events.EventDispatcher.prototype.init.call(this);
			this._filters = new gav.filtering.CompositeFilter;
			this._filters.addEventListener(gav.events.FilterEvent.FILTER_CHANGED, b, this);
			this._rangeFilterUpdateController = new gav.filtering.RangeFilterController;
			this._rangeFilters = []
		},
		getStorables : function () {
			return this._filters.getFilters()
		},
		isVisible : function (a) {
			return !this._filters.isFiltered(a)
		},
		addFilter : function (a) {
			this._filters.addFilter(a)
		},
		containsFilter : function (a) {
			return this._filters.containsFilter(a)
		},
		removeFilter : function (a) {
			this._filters.removeFilter(a)
		},
		add : function (a) {
			a.isIFace(gav.filtering.IFilter) && this.addFilter(a);
			a.isIFace(gav.representation.IVisibilityListConsumer) && a.setVisibilityList(this)
		},
		remove : function (a) {
			a.isIFace && a.isIFace(gav.filtering.IFilter) && this.removeFilter(a)
		},
		setDataSet : function (b) {
			this._dataSet = b;
			a.apply(this, [])
		},
		getDataSet : function () {
			return this._dataSet
		},
		setSlice : function (b) {
			if (this._slice !== b)
				if (this._slice = b, this.getRangeFilterUpdateController().getMode() === gav.filtering.RangeFilterController.RESET_FILTERS) {
					this._filters.suppressChanges();
					for (var f = 0; f < this._rangeFilters.length; f++)
						(b = this._rangeFilters[f]) && b.reset();
					this._filters.commitSuppressedChanges()
				} else
					this.getRangeFilterUpdateController().getMode() === gav.filtering.RangeFilterController.UPDATE_ITEMS ? a.call(this) : this.getRangeFilterUpdateController().getMode()
		},
		getSlice : function () {
			return this._slice
		},
		getCompositeFilter : function () {
			return this._filters
		},
		getRecordFilter : function () {
			this._recordFilter || (this._recordFilter = new gav.filtering.RecordFilter(this._dataSet), this._filters.addFilter(this._recordFilter));
			return this._recordFilter
		},
		getRangeFilter : function (a) {
			var b = this._rangeFilters[a];
			b || (b = new gav.filtering.RangeFilter(a), this._dataSet && b.setDataCube(this._dataSet.getDataCube()), b.addEventListener(gav.events.FilterEvent.FILTER_CHANGED, d, this), this._filters.addFilter(b), this._rangeFilters[a] = b);
			return this._rangeFilters[a]
		},
		getRangeFilterUpdateController : function () {
			return this._rangeFilterUpdateController
		}
	});
	gav.Klass("gav.filtering.RangeFilterController", {
		extend : gav.events.EventDispatcher,
		init : function () {
			gav.events.EventDispatcher.prototype.init.call(this);
			this._mode = 1
		},
		setMode : function (a) {
			this._mode !== a && (this._mode = a, this.dispatchEvent(new gav.events.PropertyChangeEvent("mode", null, this._mode)))
		},
		getMode : function () {
			return this._mode
		},
		"@RESET_FILTERS" : 0,
		"@UPDATE_ITEMS" : 1,
		"@KEEP_ITEMS" : 2
	})
})();
(function () {
	gav.Klass("gav.representation.LineStyleProvider", {
		implement : [gav.snapshot.ISnapshotReader, gav.snapshot.IStorable],
		init : function (d, b) {
			this._numLines = 10;
			this._lines = Array(this._numLines);
			this._colors = "#002AF2,#4A91A5,#F44E18,#F92A6B,#64A52C,#F22211".split(",");
			this._colors = "#01939a,#ff4500,#ffbe00,#4575d4,#439400,#a600a6,#a62f00,#fffa00,#a967d5,#92ec00,#666666".split(",");
			this._numLines = this._colors.length;
			for (var a = 0; a < this._numLines; a++)
				this._lines[a] = new gav.representation.LineStyle(2,
						this._colors[a]);
			this._name = b
		},
		read : function (d) {
			var b = this;
			$(d).children("components").children("lineStyleProvider[name='" + this._name + "']").each(function (a, c) {
				$(c).children("color").each(function (a) {
					b._colors[a] = gav.utils.Color.toHex(parseInt($(this).text()))
				})
			});
			this._numLines = this._colors.length
		},
		state : function () {
			var d = this;
			return {
				styles : {
					"#shareable" : !0,
					style : {
						"#type" : "array",
						"#elementType" : "object",
						get : function () {
							for (var b = [], a = 0; a < d._colors.length; a += 2)
								b.push({
									"@color" : d._colors[a],
									"@thickness" : 2
								});
							return b
						},
						set : function (b) {
							if (b && b[0])
								for (var a = 0; a < b.length; a += 1)
									d._colors[a] = b[a]["@color"]
						}
					}
				}
			}
		},
		getSnapshotType : function () {
			return gav.snapshot.SnapshotManager.type.REPRESENTATION
		},
		getNumLines : function () {
			return this._numLines
		},
		getColors : function () {
			return this._colors
		},
		getColor : function (d) {
			return this._colors[d >= this._numLines ? this._numLines - 1 : d]
		},
		getLine : function (d) {
			return this._lines[d]
		}
	});
	gav.Klass("gav.representation.LineStyle", {
		init : function (d, b) {
			this._width = d;
			this._color = b
		},
		getWidth : function () {
			return this._width
		},
		getColor : function () {
			return this._color
		}
	})
})();
(function () {
	function d() {
		for (var a = [], b = [], c = 0; c < this._numItems; c++) {
			var d = f.call(this._recordFilterBitArrayArray[c]);
			d != this._recordFilteredStatusArray[c] && (a.push(c), b.push(d), this._recordFilteredStatusArray[c] = d)
		}
		a.length && this.dispatchEvent(gav.events.FilterEvent.createFilterChanged(a, b, this))
	}
	function b(a) {
		if (this._filters) {
			for (var b = this._initNumItems, c = 0; c < this._filters.length; c++)
				b = Math.max(b, this._filters[c].getNumItems());
			if (b !== this._numItems) {
				c = this._numItems;
				this._numItems = b;
				if (b > c) {
					for (var b =
							b - c, f = Array(b), d = Array(b), n = 0; n < b; n++)
						f[n] = Array(a), d[n] = e;
					this._recordFilterBitArrayArray = this._recordFilterBitArrayArray.concat(f);
					this._recordFilteredStatusArray = this._recordFilteredStatusArray.concat(d)
				} else
					this._recordFilteredStatusArray.splice(b), this._recordFilterBitArrayArray.splice(b);
				this.dispatchEvent(gav.events.FilterEvent.createNumItemsChanged(this._numItems, c, this))
			}
		} else
			this._numItems = this._initNumItems
	}
	function a(a) {
		var b = this._filters.indexOf(a.getSender());
		if (0 > b)
			console.warn("sender not part of CompositeFilter");
		else {
			for (var c = a.getItems(), a = a.getFiltered(), f = c ? c.length : 0, e = 0; e < f; e++)
				this._recordFilterBitArrayArray[c[e]][b] = a[e];
			0 === this._holdBackChanges && d.call(this)
		}
	}
	function c() {
		b.call(this, this._filters.length)
	}
	function f() {
		if (!this.length)
			return !1;
		for (var a = 0; a < this.length; a++)
			if (this[a])
				return !0;
		return !1
	}
	var e = !1;
	gav.Klass("gav.filtering.CompositeFilter", {
		implement : gav.filtering.IFilter,
		extend : gav.events.EventDispatcher,
		init : function (a) {
			gav.events.EventDispatcher.prototype.init.call(this);
			1 > arguments.length &&
			(a = 0);
			this._filters = [];
			this._holdBackChanges = 0;
			this.initialize(a)
		},
		isFiltered : function (a) {
			return this._recordFilteredStatusArray[a]
		},
		getNumItems : function () {
			return this._numItems
		},
		getFilters : function () {
			return this._filters
		},
		getFilterStatus : function () {
			return this._recordFilteredStatusArray
		},
		initialize : function (a) {
			1 > arguments.length && (a = 0);
			this._numItems = this._initNumItems = a;
			if (!this._recordFilterBitArrayArray || this._recordFilterBitArrayArray.length !== a)
				this._recordFilterBitArrayArray = Array(a);
			if (!this._recordFilteredStatusArray ||
				this._recordFilteredStatusArray.length !== a)
				this._recordFilteredStatusArray = Array(a);
			for (var b = 0; b < a; b++)
				this._recordFilterBitArrayArray[b] = [], this._recordFilteredStatusArray[b] = e
		},
		suppressChanges : function () {
			this._holdBackChanges++
		},
		discardSuppressedChanges : function () {
			this._holdBackChanges = 0
		},
		commitSuppressedChanges : function () {
			this._holdBackChanges--;
			0 >= this._holdBackChanges && (d.call(this), this._holdBackChanges = 0)
		},
		containsFilter : function (a) {
			return -1 !== this._filters.indexOf(a)
		},
		addFilter : function (d) {
			if (d &&
				d.isIFace(gav.filtering.IFilter) && -1 === this._filters.indexOf(d)) {
				var j = this._numItems,
				k = d.getNumItems(),
				m = 0,
				o = [],
				n = [],
				j = Math.min(k, j),
				m = this._filters.length;
				this._filters.push(d);
				d.addEventListener(gav.events.FilterEvent.FILTER_CHANGED, a, this);
				d.addEventListener(gav.events.FilterEvent.NUM_ITEMS_CHANGED, c, this);
				b.call(this, m);
				if (!d.isIFace())
					if (d instanceof gav.filtering.RangeFilter && (null == d.getDataCube() || 1 === d.getMaxValue() && 0 == d.getMinValue()))
						for (m = 0; m < k; m++)
							this._recordFilterBitArrayArray[m].push(e);
					else
						for (m = 0; m < j; m++)
							this._recordFilterBitArrayArray[m].push(d.isFiltered(m)), k = f.call(this._recordFilterBitArrayArray[m]), o.push(m), n.push(k), this._recordFilteredStatusArray[m] = k;
				o.length && this.dispatchEvent(gav.events.FilterEvent.createFilterChanged(o, n, this));
				this.dispatchEvent("filterAdded")
			}
		},
		removeFilter : function (d) {
			if (d) {
				var e = this._filters.indexOf(d);
				if (!(0 > e)) {
					this._filters.splice(e, 1);
					d.removeEventListener(gav.events.FilterEvent.FILTER_CHANGED, a);
					d.removeEventListener(gav.events.FilterEvent.NUM_ITEMS_CHANGED,
						c);
					for (var k = d = 0, m = [], o = [], d = 0; d < this._numItems; d++)
						this._recordFilterBitArrayArray[d].splice(e, 1), k = f.call(this._recordFilterBitArrayArray[d]), this._recordFilteredStatusArray[d] !== k && (m.push(d), o.push(k), this._recordFilteredStatusArray[d] = k);
					b.call(this, this._filters.length);
					m.length && this.dispatchEvent(gav.events.FilterEvent.createFilterChanged(m, o, this))
				}
			}
		}
	})
})();
(function () {
	function d() {
		if ((this._isActive = 0 < this._min || 1 > this._max || this._inverted) || !(0 === this._oldMin && 1 === this._oldMax)) {
			var b = Array(this._numItems),
			a = Array(this._numItems);
			this._numFilteredItems = 0;
			if (this._dataCube && !isNaN(this._slice)) {
				for (var c = 0; c < b.length; c++)
					b[c] = c, a[c] = this._reset && !this._isActive ? !1 : this.isFiltered(c), !0 === a[c] && this._numFilteredItems++;
				this.dispatchEvent(gav.events.FilterEvent.createFilterChanged(b, a, this))
			}
			this._reset = !1
		}
	}
	gav.Klass("gav.filtering.RangeFilter", {
		implement : [gav.filtering.IFilter,
			gav.snapshot.IStorable],
		extend : gav.Invalidatable,
		init : function (b) {
			gav.Invalidatable.prototype.init.call(this);
			this._attribute = b;
			this._oldMin = this._min = this._slice = 0;
			this._oldMax = this._max = 1;
			this._inverted = !1;
			this._numItems = 0;
			this._isActive = !1;
			this._numFilteredItems = 0
		},
		getId : function () {
			return "rangeFilter_" + this._attribute
		},
		state : function () {
			var b = this;
			return {
				"#object" : b,
				"@inverted" : {
					"#type" : "boolean"
				},
				"@min" : {
					get : function () {
						return b.getMinValue()
					}
				},
				"@max" : {
					get : function () {
						return b.getMaxValue()
					}
				},
				set : function (a) {
					b.setInverted(a["@inverted"]);
					b.setMinMax(parseFloat(a["@min"]), parseFloat(a["@max"]))
				}
			}
		},
		getSnapshotType : function () {
			return gav.snapshot.SnapshotManager.type.FILTER
		},
		isFiltered : function (b) {
			if (!this._isActive)
				return !1;
			b = this._dataCube.getScaledValue(b, this._attribute, this._slice);
			b = b > this._max || b < this._min;
			return !1 == this._inverted ? b : !b
		},
		getNumItems : function () {
			return this._numItems
		},
		isActive : function () {
			return this._isActive = this._inverted ? !0 : !this._inverted && (0 < this._min || 1 > this._max) ? !0 : !1
		},
		hasFilteredItems : function () {
			return 0 <
			this._numFilteredItems
		},
		getNumFilteredItems : function () {
			return this._numFilteredItems
		},
		reset : function () {
			this._reset = !0;
			this.setInverted(!1);
			this.setMinMax(0, 1);
			this._isActive = !1
		},
		getAttribute : function () {
			return this._attribute
		},
		setInverted : function (b) {
			this._inverted !== b && (this._inverted = b, this.dispatchEvent(new gav.events.PropertyChangeEvent("inverted", null, this._inverted)), this._invertedChanged = !0, this.invalidate())
		},
		getInverted : function () {
			return this._inverted
		},
		setSlice : function (b) {
			isNaN(b) && (b = 0);
			this._slice !== b && (this._slice = b, this._sliceChanged = !0)
		},
		getSlice : function () {
			return this._slice
		},
		setDataCube : function (b) {
			if (this._dataCube !== b) {
				this._dataCube = b;
				var a = this._numItems;
				this._dataCubeChanged = !0;
				this._numItems = b ? b.getNumRecords() : 0;
				this._numItems !== a && this.dispatchEvent(gav.events.FilterEvent.createNumItemsChanged(this._numItems, a, this));
				this.reset()
			}
		},
		getDataCube : function () {
			return this._dataCube
		},
		setMaxValue : function (b) {
			this._max !== b && (this._oldMax = this._max, this._max = b, this.dispatchEvent(new gav.events.PropertyChangeEvent("maxValue",
						null, b)), this._minMaxChanged = !0, this.invalidate())
		},
		getMaxValue : function () {
			return this._max
		},
		setMinValue : function (b) {
			this._min !== b && (this._oldMin = this._min, this._min = b, this.dispatchEvent(new gav.events.PropertyChangeEvent("minValue", null, b)), this._minMaxChanged = !0, this.invalidate())
		},
		getMinValue : function () {
			return this._min
		},
		setMinMax : function (b, a) {
			var c = !1;
			this._min !== b && (c = !0, this._oldMin = this._min, this._min = b);
			this._max !== a && (this._oldMax = this._max, c = !0, this._max = a);
			c && (this._minMaxChanged = !0, this.invalidate(),
				this.dispatchEvent(new gav.events.PropertyChangeEvent("minMax", null, a)))
		},
		_update : function () {
			d.apply(this, []);
			this._invertedChanged = this._minMaxChanged = this._sliceChanged = this._dataCubeChanged = !1
		}
	})
})();
(function () {
	function d(b) {
		if ("string" !== typeof b || !this._dataSet)
			return -1;
		for (var a = this._dataSet.getRecordInformation(), c = a ? a.length : 0, d = 0; d < c; d++)
			if (a[d] && a[d].id === b)
				return d;
		return -1
	}
	gav.Klass("gav.filtering.RecordFilter", {
		extend : gav.events.EventDispatcher,
		implement : [gav.filtering.IFilter],
		init : function (b) {
			gav.events.EventDispatcher.prototype.init.call(this);
			this._filteredRecords = [];
			this._numItems = 0;
			this.setDataSet(b)
		},
		getSnapshotType : function () {
			return gav.snapshot.SnapshotManager.type.FILTER
		},
		state : function () {
			var b = this;
			return {
				filtered : {
					set : function (a) {
						a && (!0 === a["@all"] || "true" === a["@all"] ? b.filterAll() : gav.helpers.isArray(a))
					},
					get : function () {
						var a = {};
						b._filteredRecords.length === b._numItems ? a["@all"] = !0 : a.record = b._filteredRecords;
						return a
					}
				}
			}
		},
		setDataSet : function (b) {
			this._dataSet = b;
			oldItems = this._numItems;
			this._numItems = this._dataSet && this._dataSet.getDataCube() ? this._dataSet.getDataCube().getNumRecords() : 0;
			oldItems !== this._numItems && this.dispatchEvent(gav.events.FilterEvent.createNumItemsChanged(this._numItems,
					oldItems, this))
		},
		getDataSet : function () {
			return this._dataSet
		},
		filterRecord : function (b) {
			if ("string" === typeof b && (b = d.call(this, b), 0 > b))
				return;
			"number" !== typeof b || 0 <= this._filteredRecords.indexOf(b) || (this._filteredRecords.push(b), this.dispatchEvent(gav.events.FilterEvent.createFilterChanged([b], [!0], this)))
		},
		unfilterRecord : function (b) {
			if ("string" === typeof b && (b = d.call(this, b), 0 > b))
				return;
			if ("number" === typeof b) {
				var a = this._filteredRecords.indexOf(b);
				0 > a || (this._filteredRecords.splice(a, 1), this.dispatchEvent(gav.events.FilterEvent.createFilterChanged([b],
							[!1], this)))
			}
		},
		filterRecords : function (b) {
			if (b && b.length && gav.helpers.isArray(b)) {
				for (var a = b.length, c = [], d = [], e, g = 0; g < a; g++)
					e = b[g], 0 > this._filteredRecords.indexOf(e) && (c.push(e), d.push(!0), this._filteredRecords.push(e));
				this.dispatchEvent(gav.events.FilterEvent.createFilterChanged(c, d, this))
			}
		},
		reset : function () {
			var b = this._filteredRecords.slice();
			this._filteredRecords = [];
			for (var a = [], c = 0; c < b.length; c++)
				a[c] = !1;
			this.dispatchEvent(gav.events.FilterEvent.createFilterChanged(b, a, this))
		},
		filterAll : function () {
			for (var b =
					this.getNumItems(), a = [], c = [], d = 0; d < b; d++)
				0 > this._filteredRecords.indexOf(d) && (a.push(d), c.push(!0), this._filteredRecords.push(d));
			this.dispatchEvent(gav.events.FilterEvent.createFilterChanged(a, c, this))
		},
		isFilteredId : function (b) {
			return 0 <= this._filteredRecords.indexOf(d.call(this, b))
		},
		isFiltered : function (b) {
			return 0 <= this._filteredRecords.indexOf(b)
		},
		getNumItems : function () {
			return this._numItems
		}
	})
})();
(function () {
	var d = Math.abs,
	b = Math.sqrt;
	gav.Klass("gav.geom.Point", {
		init : function (a, b) {
			this.x = a;
			this.y = b
		},
		clone : function () {
			return new gav.geom.Point(this.x, this.y)
		},
		isNaN : function () {
			return isNaN(this.x) || isNaN(this.y)
		},
		isEqual : function (a, b) {
			var f = 2 == arguments.length ? arguments[1] : 1.0E-7;
			return d(a.x - this.x) < f && d(a.y - this.y) < f
		},
		distance : function (a) {
			var c = this.x - a.x,
			a = this.y - a.y;
			return b(c * c + a * a)
		},
		add : function (a) {
			return !a ? this : new gav.geom.Point(this.x + a.x, this.y + a.y)
		}
	});
	gav.geom.Point.distance = function (a,
		c) {
		if (!a || !c)
			return NaN;
		var d = c.x - a.x,
		e = c.y - a.y;
		return b(d * d + e * e)
	}
})();
gav.Klass("gav.geom.Rectangle", {
	init : function (d, b, a, c) {
		this.x = d || 0;
		this.y = b || 0;
		this._width = a || 0;
		this._height = c || 0
	},
	setRect : function (d, b, a, c) {
		this.x = d || 0;
		this.y = b || 0;
		this._width = a || 0;
		this._height = c || 0
	},
	width : function () {
		return this._width
	},
	height : function () {
		return this._height
	},
	left : function () {
		return this.x
	},
	right : function () {
		return this.x + this._width
	},
	top : function () {
		return this.y
	},
	bottom : function () {
		return this.y + this._height
	},
	minX : function () {
		return Math.min(this.x, this.x + this._width)
	},
	maxX : function () {
		return Math.max(this.x,
			this.x + this._width)
	},
	minY : function () {
		return Math.min(this.y, this.y + this._height)
	},
	maxY : function () {
		return Math.max(this.y, this.y + this._height)
	},
	topLeft : function () {
		return new gav.geom.Point(this.left(), this.top())
	},
	bottomRight : function () {
		return new gav.geom.Point(this.right(), this.bottom())
	},
	isEmpty : function () {
		return !(0 < Math.abs(this._width) || 0 < Math.abs(this._height))
	},
	union : function (d) {
		var b = Math.min(this.minX(), d.minX()),
		a = Math.max(this.maxX(), d.maxX()),
		c = Math.min(this.minY(), d.minY()),
		d = Math.max(this.maxY(),
				d.maxY());
		return new gav.geom.Rectangle(b, c, a - b, d - c)
	},
	clone : function () {
		return new gav.geom.Rectangle(this._x1, this._y1, this.width(), this.height())
	},
	"@isRectangleOverlappingRectangle" : function (d, b) {
		return d.minX() > b.maxX() || b.minX() > d.maxX() || d.minY() > b.maxY() || b.minY() > d.maxY() ? !1 : !0
	}
});
gav.Klass("gav.geom.Matrix", {
	init : function () {
		this._elements = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
	},
	setElements : function (d) {
		this._elements = d
	},
	add : function (d) {
		for (var b = 0; b < this._elements.length; b++)
			for (var a = 0; a < this._elements[b].length; a++)
				this._elements[b][a] += d
	},
	translate : function (d, b) {
		this._elements[0][2] += d;
		this._elements[1][2] += b
	},
	rotate : function (d) {
		var b = this._elements[0][0],
		a = this._elements[1][0];
		this._elements[0][0] = b * Math.cos(d) - a * Math.sin(d);
		this._elements[1][0] = b * Math.sin(d) + a * Math.cos(d);
		b = this._elements[0][1];
		a = this._elements[1][1];
		this._elements[0][1] = b * Math.cos(d) - a * Math.sin(d);
		this._elements[1][1] = b * Math.sin(d) + a * Math.cos(d);
		b = this._elements[0][2];
		a = this._elements[1][2];
		this._elements[0][2] = b * Math.cos(d) - a * Math.sin(d);
		this._elements[1][2] = b * Math.sin(d) + a * Math.cos(d)
	},
	multiply : function (d) {
		for (var b = 0; b < this._elements.length; b++)
			for (var a = 0; a < this._elements[b].length; a++)
				this._elements[b][a] *= d
	},
	scale : function (d, b) {
		1 == arguments.length && (b = 1);
		this._elements[0][0] *= d;
		this._elements[1][1] *= b;
		this._elements[0][2] *=
		d;
		this._elements[1][2] *= b
	},
	determinant : function () {
		var d = this._elements,
		b;
		b = 0 + (d[0][0] * d[1][1] * d[2][2] + d[0][1] * d[1][2] * d[2][0] + d[0][2] * d[1][0] * d[2][1]);
		return b -= d[0][2] * d[1][1] * d[2][0] - d[0][1] * d[1][0] * d[2][2] - d[0][0] * d[1][2] * d[2][1]
	},
	invert : function () {
		var d = this.determinant(),
		b = this._elements[0][0],
		a = this._elements[0][1],
		c = this._elements[0][2],
		f = this._elements[1][0],
		e = this._elements[1][1],
		g = this._elements[1][2],
		j = this._elements[2][0],
		k = this._elements[2][1],
		m = this._elements[2][2];
		this._elements = [[e *
				m - g * k, c * k - a * m, a * g - c * e], [g * j - f * m, b * m - c * j, c * f - b * g], [f * k - e * j, j * a - b * k, b * e - a * f]];
		this.multiply(1 / d)
	},
	transpose : function () {
		var d = Object.create(this._elements);
		this._elements = [[d[0][0], d[1][0], d[2][0]], [d[0][1], d[1][1], d[2][1]], [d[0][2], d[1][2], d[2][2]]]
	},
	identity : function () {
		this._elements = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
	},
	transformPoint : function (d) {
		if (!d)
			return d;
		var d = d.clone ? d.clone() : {
			x : d.x,
			y : d.y
		},
		b = this._elements[1][0] * d.x + this._elements[1][1] * d.y + this._elements[1][2];
		d.x = this._elements[0][0] * d.x + this._elements[0][1] *
			d.y + this._elements[0][2];
		d.y = b;
		return d
	},
	toString : function () {
		return "[" + this._elements[0][0] + "," + this._elements[0][1] + "," + this._elements[0][2] + "]\n[" + this._elements[1][0] + "," + this._elements[1][1] + "," + this._elements[1][2] + "]\n[" + this._elements[2][0] + "," + this._elements[2][1] + "," + this._elements[2][2] + "]"
	},
	clone : function () {
		for (var d = new gav.geom.Matrix, b = 0; b < this._elements.length; b++)
			for (var a = 0; a < this._elements[b].length; a++)
				d._elements[b][a] = this._elements[b][a];
		return d
	}
});
(function () {
	gav.Klass("gav.geom.Line", {
		init : function (d, b, a, c) {
			this.x1 = d;
			this.y1 = b;
			this.x2 = a;
			this.y2 = c
		},
		clone : function () {
			return new gav.geom.Line(this.x1, this.y1, this.x2, this.y2)
		}
	});
	gav.geom.Line.linesIntersect = function (d, b, a, c, f, e, g, j) {
		if (2 === arguments.length)
			var k = arguments[0], m = arguments[1], d = k._points[0].x, b = k._points[0].y, a = k._points[1].x, c = k._points[1].y, f = m._points[0].x, e = m._points[0].y, g = m._points[1].x, j = m._points[1].y;
		var m = d - f,
		o = b - e,
		n = j - e,
		p = g - f,
		r = c - b,
		v = a - d,
		k = n * v - p * r,
		n = p * o - n * m,
		m = o * v - r * m;
		if (0 ===
			k) {
			if (0 === n && 0 === m)
				return Math.min(d, a) > Math.max(f, g) || Math.min(f, g) > Math.max(d, a) ? !1 : !0
		} else if (o = n / k, k = m / k, 0 <= k && 1 >= k && 0 <= o && 1 >= o)
			return !0;
		return !1
	};
	gav.geom.Line.pointLineDistance = function (d, b, a, c, f, e) {
		var g = f - a,
		j = e - c,
		k = ((d - a) * g + (b - c) * j) / (g * g + j * j);
		1 < k ? (d -= f, b -= e) : 0 > k ? (d -= a, b -= c) : (d -= a + k * g, b -= c + k * j);
		return Math.sqrt(d * d + b * b)
	}
})();
(function () {
	function d(b, a) {
		var c = this.getBounds();
		if (b < c.minX() || b >= c.maxX() || a < c.minY() || a >= c.maxY())
			return !1;
		var d = this._points;
		if (3 > d.length)
			return !1;
		for (var e = 0, g = d[0], j = Math.max(b + 1, c.maxX() + 1), k = 1, m = d.length; k < m; k += 1)
			c = d[k], e += gav.geom.Line.linesIntersect(b, a, j, a, g.x, g.y, c.x, c.y), g = c;
		c = d[0];
		return e += gav.geom.Line.linesIntersect(b, a, j, a, g.x, g.y, c.x, c.y)
	}
	gav.Klass("gav.geom.Polygon", {
		init : function (b) {
			this._sourceLength = (this._source = b) ? this._source.length : 0;
			this._points = [];
			for (var a = 0; a < this._sourceLength; a +=
				2)
				!isNaN(this._source[a]) && !isNaN(this._source[a + 1]) && (b = new gav.geom.Point(this._source[a], this._source[a + 1]), this._points.push(b));
			this._dirtyBounds = !0;
			this._bounds = null
		},
		getSource : function () {
			return this._source
		},
		getBounds : function () {
			if (this._dirtyBounds) {
				var b;
				b = this._points;
				var a = Number.MAX_VALUE,
				c = -Number.MAX_VALUE,
				d = Number.MAX_VALUE,
				e = -Number.MAX_VALUE,
				g = b ? b.length : 0;
				if (g) {
					for (var j, k = 0; k < g; k++)
						j = b[k], c = j.x > c ? j.x : c, a = j.x < a ? j.x : a, e = j.y > e ? j.y : e, d = j.y < d ? j.y : d;
					b = new gav.geom.Rectangle(a, d, c - a, e -
							d)
				} else
					b = null;
				this._bounds = b;
				this._dirtyBounds = !1
			}
			return this._bounds
		},
		setPoints : function (b) {
			this._points !== b && (this._points = b, this._dirtyBounds = !0, this._bounds = null)
		},
		getPoints : function () {
			return this._points
		},
		getNumIntersectionsFromPointToBoundary : function (b, a) {
			return d.apply(this, [b, a])
		},
		contains : function (b, a) {
			return 1 === d.apply(this, [b, a]) % 2 ? !0 : !1
		}
	})
})();
(function (d) {
	function b(a) {
		var b,
		c = "",
		d = "",
		f = "";
		if (b = r.exec(a))
			c = b[1];
		else if (b = v.exec(a))
			c = b[1], d = b[2].toUpperCase();
		else if (b = t.exec(a))
			c = b[1], f = b[2];
		else if (b = u.exec(a))
			c = b[1], f = b[2], d = b[3].toUpperCase();
		return {
			langCode : c,
			countryCode : d,
			scriptCode : f
		}
	}
	function a() {
		if (j && n) {
			var a = this;
			j.init({
				lng : n,
				resStore : w
			}, function () {
				c.call(a, o)
			})
		}
	}
	function c(a) {
		for (var b, c = [], d = 0; d < a.length; d++) {
			b = x[a[d]] || [];
			for (var f = 0; f < b.length; f++)
				0 > c.indexOf(b[f]) && "function" == typeof b[f].localeChanged && c.push(b[f])
		}
		for (d =
				0; d < c.length; d++)
			c[d].__initialized ? c[d].localeChanged() : c[d].addEventListener && c[d].addEventListener("initComplete", c[d].localeChanged, c[d])
	}
	function f(b, f) {
		b || (b = []);
		Array.isArray(b) || (b = [b]);
		for (var g = this, k = [], p = 0; p < b.length; p++)
			0 > m.indexOf(b[p]) && (m.push(b[p]), k.push(b[p]));
		f && (k = m);
		var q = [];
		if (n)
			for (p = 0; p < k.length; p++)
				if (!w[n] || 0 > o.indexOf(k[p]))
					q.push(e(n, k[p])), o.push(k[p]);
		q.length ? d.when.apply(null, q).then(function () {
			f ? a.call(g) : (j && (j.options.resStore = w), c.call(this, k))
		}) : f ? a.call(this) :
		b.length && c.call(this, b)
	}
	function e(a, b) {
		var c = d.Deferred(),
		f = a.replace("-", "_");
		gav.utils.Ajax.load({
			url : gav.i18n.pathToLocales + f + "/" + b + ".properties",
			always : function (d) {
				w = w || {};
				w[a] = w[a] || {};
				var f = w[a],
				e;
				if (!(e = w[a][b])) {
					e = {};
					for (var g, j, d = d ? d.split("\n") : [], k = 0; k < d.length; k++)
						B.test(d[k]) || (g = d[k].indexOf("#"), -1 < g && (d[k] = d[k].substring(0, g)), j = d[k].split("="), g = j[0], j = j[1], g && j && (e[g.toLowerCase()] = j))
				}
				f[b] = e;
				q[b] && (w[a][q[b]] = w[a][b]);
				c.resolve()
			}
		});
		return c.promise()
	}
	function g(a, b) {
		y[b] || (y[b] = {});
		y[b][a] || (y[b][a] = !0, console.info("Locale value '" + a + "' missing in dictionary for language '" + b + "'"))
	}
	gav.i18n = {};
	var j = window.i18n,
	k,
	m = [],
	o = [],
	n = "",
	p = {},
	r = /^([a-z]{2})$/,
	v = /^([a-z]{2})-([A-Za-z]{2})$/,
	t = /^([a-z]{2})-([A-Za-z]{4})$/,
	u = /^([a-z]{2})-([A-Za-z]{4})-([A-Za-z]{2})$/;
	gav.i18n.htmlAttribute = "data-i18n";
	gav.i18n.pathToLocales = "locales/";
	var q = {},
	z = {
		"en-GB" : "en-US",
		en : "en-US",
		sv : "sv-SE",
		"sv-FI" : "sv-SE",
		"es-ES" : "es-MX",
		es : "es-MX",
		fr : "fr-FR",
		it : "it-IT",
		de : "de-DE",
		pt : "pt-PT",
		"pt-BR" : "pt-PT"
	},
	x = {},
	w = {};
	gav.Klass("gav.i18n.Locale", {
		extend : gav.events.EventDispatcher,
		init : function () {
			gav.events.EventDispatcher.prototype.init.call(this)
		},
		setLang : function (a) {
			o = [];
			var c = n,
			a = a.replace("_", "-");
			n = z[a] || a;
			n !== c && (p = b(n), f.call(this, null, !0), this.dispatchEvent("languageChanged"))
		},
		getLang : function () {
			return n
		},
		getLanguageParts : function (a) {
			return a ? (a = b(a.replace("_", "-")), {
				language : a.langCode,
				region : a.countryCode,
				script : a.scriptCode
			}) : {
				language : p.langCode,
				region : p.countryCode,
				script : p.scriptCode
			}
		},
		requestResources : function (a, b) {
			for (var c = 0; c < b.length; c++)
				x[b[c]] || (x[b[c]] = []), 0 > x[b[c]].indexOf(a) && x[b[c]].push(a);
			f.call(this, b)
		},
		releaseResources : function (a) {
			var b,
			c;
			for (c in x)
				b = x[c].indexOf(a), 0 < b && x[c].splice(b, 1)
		},
		getInstance : function () {
			k || (k = new A);
			return k
		},
		updateElements : function (a) {
			j && n && (a instanceof jQuery ? a : d(a)).filter("[data-i18n]").each(function () {
				var a = this.getAttribute("data-i18n"),
				b = a.match(/\[([a-zA-Z0-9\-]+)\]/g);
				b && b.length && (a = a.substring(a.lastIndexOf("]") + 1));
				var c = j.t(a),
				f = !1;
				c === a && "en-US" != n && (window.GAV_DEBUG && g(a, n), f = !0, c = j.t(a, {
							lng : "en-US"
						}));
				if (c !== a)
					if (!b || !b.length)
						d(this).text(c);
					else
						for (f = 0; f < b.length; f++)
							a = b[f].substring(1, b[f].length - 1), "html" === a ? d(this).html(c) : a && d(this).attr(a, c);
				else
					f || window.GAV_DEBUG && g(a, n)
			})
		},
		translate : function (a) {
			if (!j || !n)
				return "";
			var b = j.t(a);
			b == a && "en-US" != n && (window.GAV_DEBUG && g(a, n), b = j.t(a, {
						lng : "en-US"
					}));
			return b !== a ? b : ""
		},
		registerResourceAlias : function (a, b) {
			q[a] = b
		},
		registerLanguageFallback : function (a, b) {
			z[a] = b
		}
	});
	var B = /^#/,
	y = {},
	A = gav.i18n.Locale;
	A.getInstance = A.prototype.getInstance;
	gav.locale = A.getInstance();
	delete gav.i18n.Locale
})(jQuery);
(function (d) {
	function b(a) {
		var b = a.parentNode,
		c = document.createElement("div");
		c.className = "table";
		var d = document.createElement("div");
		d.className = "table-cell";
		d.appendChild(a);
		c.appendChild(d);
		b.appendChild(c);
		return c
	}
	function a(a, b) {
		var c = b;
		c && /[\&\=\?\/]/.test(c) && (c = encodeURIComponent(c));
		var f = a || window.location.href,
		e = encodeURIComponent(f),
		g = c || e,
		j = new gav.controls.Popup(!0),
		k = j.getDOMElement();
		d(k).addClass("gav-popup-social").css("minHeight", "160px").addClass("gav-state-hidden");
		k.innerHTML =
			"<div>Direct link</div><input type='text' value='" + f + "'/></div>" + ('<div>Embed in website</div><input type=\'text\' value=\'<iframe width="600" height="400" frameborder="0" marginwidth="0" marginheight="0" src="' + f + "\"></iframe>'/></div>");
		var m = !1;
		!/file/.test(window.location.protocol) && j.addEventListener("show", function H() {
			if (!m) {
				m = !0;
				j.removeEventListener("show", H);
				var a = window.top.location;
				encodeURIComponent(a.protocol + "//" + a.host + a.pathname);
				var b = function () {
					document.getElementsByTagName("script");
					var a = document.createElement("div");
					a.innerHTML = "<div>Social networks</div>";
					k.appendChild(a);
					var b = document.createElement("div");
					b.className = "gav-social gav-social-twitter";
					b.innerHTML = "<a href='javascript:void(0);' class='gav-twitter' title='Share on Twitter'>Tweet</a>";
					var c = null;
					d("a", b).click(function () {
						null == c || c.closed ? c = window.open("https://twitter.com/intent/tweet?source=tweetbutton&text=&url=" + g, null, "width=540,height=420,alwaysRaised=yes") : c.focus()
					});
					a.appendChild(b);
					b = document.createElement("div");
					b.className = "gav-social gav-social-gplus";
					b.innerHTML = "<div class='g-plusone' data-size='tall' data-action='share' data-href=''" + g + "' data-annotation='none'></div>";
					a.appendChild(b);
					var f = document.createElement("script");
					f.type = "text/javascript";
					f.async = !0;
					f.src = "https://apis.google.com/js/plusone.js";
					b.appendChild(f);
					b = document.createElement("div");
					b.className = "gav-social gav-social-facebook";
					b.innerHTML = "<iframe src='//www.facebook.com/plugins/like.php?href=" + g + "&amp;send=false&amp;layout=box_count&amp;width=90&amp;show_faces=false&amp;action=like&amp;colorscheme=light&amp;font&amp;height=64' scrolling='no' frameborder='0' style='border:none; overflow:hidden; width:90px; height:65px;' allowTransparency='true'></iframe>";
					a.appendChild(b)
				};
				128 < g.length ? d.ajax({
					url : "http://www.ncomva.se/html5/scripts/tinyurlapi.php?url=" + g,
					dataType : "text",
					success : function (a) {
						a = a.replace(/"/g, "");
						/http/.test(a) && (g = encodeURIComponent(a));
						b()
					},
					error : function () {
						b()
					}
				}) : b()
			}
		});
		return j
	}
	function c() {
		var a = d(".gav-overlay", this._innerContainer)[0];
		d(a).css("display", "block")
	}
	function f() {
		var a = d(".gav-overlay", this._innerContainer)[0];
		d(a).css("display", "none")
	}
	function e(a, b) {
		if (!a || !a.length)
			return null;
		for (var c = 0; c < a.length; c++)
			if (a[c]instanceof
				b)
				return a.splice(c, 1)[0];
		return null
	}
	function g() {
		var a = [],
		b = this._componentContainers.length,
		c = this._composer.getComponents().slice();
		if (1 > b)
			return a;
		for (var d, f, g = this, j = 0; j < b; j++) {
			for (var k = this._componentContainers[j].getAttribute("data-name"), k = (r[k.toLowerCase()] || k).split("."), m = window; m = m[k.shift()]; )
				f = m;
			if (f && "function" == typeof f) {
				try {
					f = (d = e(c, f)) || new f(this._componentContainers[j]),
					!d && f instanceof gav.components.MapPanel && gav.utils.Binding.bindSetter(function (a) {
						return function (b) {
							g._composer.getResourceProvider() &&
							a.setMapSource(g._composer.getResourceProvider().createMapSource(b))
						}
					}
						(f), this._composer, "resourceProvider.activeMapSourceName")
				} catch (n) {}

				f instanceof gav.components.ComponentPanel && (d && d.setParentContainer(this._componentContainers[j]), a.push(f))
			}
		}
		this._composer.setComponents(a);
		c = void 0;
		return a
	}
	function j(a) {
		this._componentsContainer.innerHTML = "";
		this._componentsContainer.removeAttribute("data-vertical");
		this._componentsContainer.removeAttribute("data-name");
		this._componentContainers = [];
		this._componentNames =
			[];
		this._dividerContainers = [];
		var b = this;
		gav.utils.SplitLayoutGenerator.createLayout(a, this._componentsContainer, "data-name");
		d(this._componentsContainer).find("div[data-name]").each(function (a, c) {
			b._componentContainers.push(c)
		});
		return g.apply(this)
	}
	function k(a, b) {
		function c(a, b) {
			var f;
			if (a)
				for (var e = 0; e < a; e++)
					f = document.createElement("button"), f.innerHTML = e + 1, d(f).addClass("gav-ui-button"), b.appendChild(f)
		}
		d(b).html("");
		var f = this,
		e = document.createElement("div");
		d(e).addClass("gav-ui-list-snapshot").css("textAlign",
			"center");
		if (a) {
			this._snapshotsButton = document.createElement("button");
			d(this._snapshotsButton).bind("gavtap", function () {
				d(this).toggleClass("gav-state-active");
				d(this).hasClass("gav-state-active") ? f._snapshotsPopupMenu.show(this, "top") : f._snapshotsPopupMenu.hide()
			}).gavButton_old({
				icon : "gav-icon-camera",
				text : !1
			}).addClass("gav-snapshot-menu");
			this._snapshotsPopupMenu = new gav.controls.PopupMenu;
			for (var g = a.getChapters(), j = 0; j < g.length; j++) {
				var k = document.createElement("div");
				d(k).html("<button class='gav-snapshot-chapter-number gav-ui-button'></button>").addClass("gav-snapshot-chapter");
				0 == j && d(k).children().first().addClass("gav-state-active");
				c(g[j].getSnapshots().length, k);
				e.appendChild(k)
			}
			b.appendChild(e)
		}
	}
	function m() {
		o.call(this)
	}
	function o() {
		d(this._innerContainer).css({
			width : "100%",
			height : "100%"
		});
		var a = gav.support.touch ? 42 : 36;
		"undefined" == typeof this._doubleBarSectionsInUse && (this._doubleBarSectionsInUse = !1);
		this._doubleBarSectionsInUse && (this._ncomvaSection && this._ncomvaSection.parentNode ? (this._ncomvaSection.removeAttribute("data-fluid"), this._barSection.insertBefore(this._animationWrapper,
					this._ncomvaSection)) : this._barSection.appendChild(this._animationWrapper), this._extraBarSection.style.display = "none");
		var b = this._context && this._context.getDataSet() ? this._context.getDataSet().hasTimeData() : !1;
		b ? (this._animationWrapper.style.display = "", n(this._barSection)) : this._animationWrapper.style.display = "none";
		var c = this._animationWrapper.offsetWidth;
		b && 240 > c && (this._ncomvaSection.setAttribute("data-fluid", "true"), this._doubleBarSectionsInUse = !0, this._extraBarSection.appendChild(this._animationWrapper),
			this._extraBarSection.style.display = "");
		this._barSection.setAttribute("data-height", a);
		this._extraBarSection.setAttribute("data-height", a);
		this._animationControlBarContainer.style.height = a + "px";
		n(this._innerContainer);
		d(this._innerContainer).find("div[data-needs-resize='true']").trigger("gavresize")
	}
	function n(a) {
		var b = "true" === a.getAttribute("data-h") ? "h" : "v",
		c = "v" === b ? "height" : "width",
		f = "data-" + c,
		e = d(a)[c](),
		g = [],
		j = [],
		k = [],
		m = d(a).height(),
		o = 0,
		p = d(a).children(".gav-section"),
		r = p.last().get(0);
		p.each(function () {
			"none" ===
			this.style.display ? "h" === b && r === this && d(this).prev().css("marginRight", "0") : (this.style.marginRight = "", o++, "true" === this.getAttribute("data-fluid") ? g.push(this) : this.getAttribute(f) ? j.push(this) : k.push(this), "h" == b && (this.style.height = m + "px"))
		});
		var C;
		for (C = 0; C < j.length; C++)
			p = j[C], p.style[c] = p.getAttribute(f) + "px", e -= "height" === c ? d(p).outerHeight(!0) : d(p).outerWidth(!0), n(p);
		for (C = 0; C < k.length; C++)
			p = k[C], e -= "height" === c ? d(p).outerHeight(!0) : d(p).outerWidth(!0);
		for (C = 0; C < g.length; C++) {
			var p = g[C],
			J =
				d(p).outerWidth(!0) - d(p).outerWidth();
			p.style[c] = Math.max(0, e - J) + "px";
			n(p)
		}
		if ("h" == b) {
			var D = 0;
			d(a).children(".gav-section").each(function () {
				"none" !== this.style.display && (this.style.left = D + "px", this.style.position = "absolute", D += d(this).outerWidth(!0))
			})
		}
	}
	var p = [];
	p.push({
		name : "Google Chrome",
		address : "http://www.google.com/chrome",
		version : "4.0+"
	});
	p.push({
		name : "Mozilla Firefox",
		address : "http://www.mozilla.org/firefox",
		version : "3.5+"
	});
	p.push({
		name : "Opera",
		address : "http://www.opera.com",
		version : "10.5+"
	});
	p.push({
		name : "Apple Safari",
		address : "http://www.apple.com/safari",
		version : "4.0+"
	});
	p.push({
		name : "Microsoft IE",
		address : "http://ie.microsoft.com",
		version : "IE9+"
	});
	gav.Klass("gav.Vislet", {
		init : function (e) {
			function g() {
				r._settingsMenu.hide();
				d(r._settingsButton).toggleClass("gav-state-active")
			}
			var n;
			1 < arguments.length ? (n = arguments[0], e = arguments[1]) : n = e.container;
			var q;
			q = n.nodeType ? n : document.getElementById(n);
			if (n && q) {
				var r = this;
				if (gav.support.canvas) {
					this._container = q;
					var x;
					d(window).resize(function () {
						clearTimeout(x);
						x = null;
						x = setTimeout(function () {
								x = null;
								clearTimeout(x);
								m.call(r)
							}, 100)
					});
					n = document.createElement("div");
					d(n).addClass("gav-vislet-inner");
					this._innerContainer = n;
					this._componentsSection = document.createElement("div");
					this._componentsSection.className = "vislet-section";
					this._componentsSection.className = "gav-section";
					this._componentsSection.setAttribute("data-fluid", "true");
					this._componentsSection.setAttribute("data-h", "true");
					this._componentsSection.setAttribute("data-needs-resize", "true");
					this._barSection =
						document.createElement("div");
					this._barSection.className = "vislet-section gav-vislet-section-toolbar";
					this._barSection.className = "gav-section toolbar-section";
					this._barSection.setAttribute("data-h", "true");
					this._extraBarSection = document.createElement("div");
					this._extraBarSection.className = "gav-section";
					this._extraBarSection.setAttribute("data-h", "true");
					this._extraBarSection.style.display = "none";
					this._storySection = document.createElement("div");
					this._storySection.className = "gav-section";
					this._storySection.setAttribute("data-needs-resize",
						"true");
					this._dataSourceSection = document.createElement("div");
					this._dataSourceSection.className = "gav-section";
					this._dataSourceSection.innerHTML = "<span style='color:#666;'>Source</span> ddklf jgdlkfjgdlkfgjdf klgjdfkgdjfklgdjfglkdjfgkldfjg dlkfgjldkfjg ";
					this._ncomvaSection = document.createElement("div");
					this._ncomvaSection.className = "gav-section";
					this._ncomvaSection.setAttribute("data-width", "70");
					this._ncomvaPromo = document.createElement("div");
					this._ncomvaPromo.innerHTML = "<div class='gav-ncomva'><a href='http://www.ncomva.com' target='_blank'>&#169; NComVA</a></div>";
					this._ncomvaSection.appendChild(this._ncomvaPromo);
					b(this._ncomvaPromo);
					this._copyRightSection = document.createElement("div");
					this._copyRightSection.className = "gav-section";
					r._copyRightSection.style.fontStyle = "italic";
					this._copyRightSection.style.display = "none";
					this._innerContainer.appendChild(this._componentsSection);
					this._innerContainer.appendChild(this._barSection);
					this._innerContainer.appendChild(this._extraBarSection);
					e.showMetaData && this._innerContainer.appendChild(this._storySection);
					this._innerContainer.appendChild(this._copyRightSection);
					var w = document.createElement("div");
					w.setAttribute("data-needs-resize", !0);
					d(w).addClass("gav-section");
					this._animationControlBarContainer = w;
					var B = new gav.animation.AnimationControlBar(w);
					this._animationControlBar = B;
					this._settingsToolBarContainer = d("<div class='gav-section' data-width='48'></div>")[0];
					this._isInToggleSelectionMode = this._isInPresentationMode = !1;
					this._presentationMode = document.createElement("button");
					this._presentationMode.setAttribute("title", "Toggle Presentation mode");
					d(this._presentationMode).gavButton_old({
						iconize : !0,
						icon : "gav-icon-presentation",
						text : !1
					}).bind("gavtap", function () {
						r.setPresentationMode(!r._isInPresentationMode);
						d(this).toggleClass("gav-state-active", r._isInPresentationMode)
					});
					this._settingsButton = document.createElement("button");
					d(this._settingsToolBarContainer).append(this._settingsButton);
					b(this._settingsButton);
					d(this._settingsButton).bind("gavtap", function () {
						d(this).toggleClass("gav-state-active");
						d(this).hasClass("gav-state-active") && r._settingsMenu.show(this, "top")
					}).gavButton_old({
						iconize : !0,
						icon : "gav-icon-wrench",
						text : !1
					});
					this._settingsMenu = new gav.controls.PopupMenu({
							iconic : !0
						});
					var y = new gav.components.IndicatorFilterDialog,
					A = document.createElement("div");
					d(A).html("Indicator filter").bind("gavtap", function () {
						g();
						y.show()
					});
					this._settingsMenu.addItem(A);
					this._settingsMenu.addItem({
						type : "separator"
					});
					this._settingsMenu.addItem({
						key : "presentationMode",
						text : "Presentation Mode",
						type : "check",
						checked : function () {
							return r._isInPresentationMode
						},
						events : {
							click : function () {
								g();
								r.setPresentationMode(!r._isInPresentationMode)
							}
						}
					});
					this._settingsMenu.addItem({
						key : "selectionMode",
						text : "Multi Selection Mode",
						type : "check",
						checked : function () {
							return r._isInToggleSelectionMode
						},
						events : {
							click : function () {
								g();
								r.setToggleSelectionMode(!r._isInToggleSelectionMode)
							}
						}
					});
					e.showMetaData && this._settingsMenu.addItem({
						key : "storyPanel",
						text : "Story panel",
						type : "check",
						checked : function () {
							return !r._storySection ? !1 : "none" != d(r._storySection).css("display")
						},
						events : {
							click : function () {
								g();
								d(r._storySection).toggle();
								o.call(r)
							}
						}
					});
					if (A = !1 !== e.colorLegendVisible)
						this._settingsMenu.addItem({
							type : "separator"
						}),
						this._settingsMenu.addItem({
							key : "colorMap",
							text : "Show color legend",
							type : "check",
							checked : function () {
								return !d(I._container).hasClass("gav-state-hidden")
							},
							events : {
								click : function () {
									g();
									I.setVisible(!I.getVisible())
								}
							}
						}), this._settingsMenu.addItem({
							type : "separator"
						});
					e.showRecordList && this._settingsMenu.addItem({
						key : "recordList",
						text : "Record list",
						type : "check",
						checked : function () {
							return !G ? !1 : "none" != d(G).css("display")
						},
						events : {
							click : function () {
								g();
								d(G).toggle();
								o.call(r)
							}
						}
					});
					if (e && e.layout) {
						this._dataTableConfig =
							e.dataTableConfig;
						var H = e.showRecordList || !1;
						this._useRecordList = H;
						var F = e.collapsedRecordList || !1;
						this._componentsContainer = document.createElement("div");
						this._componentsContainer.setAttribute("name", "components");
						this._componentsContainer.className = "gav-section";
						this._componentsContainer.setAttribute("data-fluid", "true");
						this._componentsContainer.setAttribute("data-h", "true");
						this._componentsContainer.setAttribute("data-needs-resize", "true");
						this._componentsSection.appendChild(this._componentsContainer);
						!1 !== e.showSettingsButton && this._barSection.appendChild(this._settingsToolBarContainer);
						!1 !== e.showSharingOptions && (this._socialBtnContainer = document.createElement("div"), this._socialBtnContainer.className = "gav-section", this._socialBtnContainer.setAttribute("data-width", "48"), this._socialBtn = document.createElement("button"), new gav.controls.PopupButton({
								container : r._socialBtn,
								iconize : !0,
								text : !1,
								icons : {
									right : "gav-icon-share"
								},
								popupDirection : "top"
							}, a(e.shortenedURL, e.urlToShare, e.paramMap)), d(this._socialBtnContainer).append(this._socialBtn).appendTo(this._barSection),
							b(this._socialBtn));
						this._composer = new gav.Composer;
						this._composer.addEventListener("componentAdded", function (a) {
							gav.components.DataTablePanel && a instanceof gav.components.DataTablePanel && e.dataTableConfig && a.setConfigFileUrl(e.dataTableConfig)
						});
						e.showSnapshotButtons && (this._chapterContainer = document.createElement("div"), d(this._chapterContainer).delegate(".gav-snapshot-chapter button", "click", function (a) {
								var b = d(a.target).parent().index(),
								a = d(a.target).index() - 1;
								r._composer._storyController.setActiveChapterIndex(b);
								r._composer._storyController.setActiveCaptureIndex(a)
							}), gav.utils.Binding.bindSetter(function (a) {
								d(r._chapterContainer).find(".gav-snapshot-chapter").eq(a)
							}, this._composer._storyController, "activeChapterIndex"), gav.utils.Binding.bindSetter(function (a) {
								d(r._chapterContainer).find(".gav-state-active").removeClass("gav-state-active");
								d(r._chapterContainer).find(".gav-snapshot-chapter").eq(r._composer._storyController.getActiveChapterIndex()).children().eq(a + 1).addClass("gav-state-active")
							}, this._composer._storyController,
								"activeCaptureIndex"), this._chapterWrapper = document.createElement("div"), this._chapterWrapper.className = "gav-section", this._chapterWrapper.appendChild(this._chapterContainer), this._barSection.appendChild(this._chapterWrapper), b(this._chapterContainer));
						var C = document.createElement("div");
						C.className = "gav-section animation-section";
						this._animationWrapper = C;
						C.setAttribute("data-fluid", !0);
						C.appendChild(w);
						this._barSection.appendChild(C);
						b(w);
						this._barSection.appendChild(this._ncomvaSection);
						var J = e.layout.split("-"),
						D = 0,
						w = this._composer.getContext();
						B.setAnimationController(this._composer.getAnimationController());
						C = j.apply(this, [J[D]]);
						if (H) {
							var G = document.createElement("div");
							d(G).css({
								display : F ? "none" : "block"
							}).addClass("gav-component-record-list gav-section").attr("data-width", "180").attr("data-needs-resize", "true");
							var E = new gav.controls.RecordSelector(G);
							E.setContext(this._composer.getContext());
							this._recordSelector = E;
							this._recordSelectorContainer = G
						}
						if (useStoryView = !!e.showMetaData || !1)
							this._storyViewContainer =
								document.createElement("div"), d(this._storyViewContainer).css({
								bottom : "0",
								height : e.storyHeight || 160,
								overflow : "hidden"
							}), this._storyViewContainer.setAttribute("data-needs-resize", "true"), this._storyView = new gav.snapshot.StoryEditor(this._storyViewContainer), this._storyView.setController(this._composer._storyController), gav.utils.Binding.bindProperty(this._storyView, "story", this._composer._storyController, "activeStory"), gav.utils.Binding.bindSetter(function (a) {
								D === a || isNaN(a) || (D = a, J[D] && (j.apply(r,
											[J[D]]), r._composer.updateNow()))
							}, this._composer._storyController, "activeChapterIndex"), this._storySection.appendChild(this._storyViewContainer);
						this._composer._storyController.getSnapshotManager().addEventListener("beginLoad", function () {
							c()
						}, this);
						this._composer._storyController.getSnapshotLoader().addEventListener("beginLoad", function () {
							c()
						}, this);
						this._composer._storyController.getSnapshotManager().addEventListener("loadComplete", function () {
							f()
						}, this);
						this._composer._storyController.getSnapshotLoader().addEventListener("loadComplete",
							function () {
							f()
						}, this);
						gav.utils.Binding.bindSetter(function (a) {
							B.setDataSet(a);
							o.call(r)
						}, this._composer, "context.dataSet");
						H && (E.setSelectionList(w.getSelectionManager()), this._composer._context._selectionManager.addPickable(E));
						if (A) {
							var I = new gav.components.ColorLegendProvider(n);
							I.setContext(this._composer.getContext());
							this._composer._storyController.getSnapshotLoader().addSnapshotReadable(I);
							(!0 === e.colorLegendVisible || !1 === e.colorLegendVisible) && I.setVisibleConstant(e.colorLegendVisible);
							e.legendPosition ?
							I.setPosition(e.legendPosition[0], e.legendPosition[1]) : I.setPosition(20, 200)
						}
						this._context = this._composer.getContext();
						gav.support.touch && this.setToggleSelectionMode(!0);
						y.setContext(this._composer.getContext());
						H && this._componentsSection.appendChild(G);
						q.appendChild(n);
						this._components = C;
						if (this._resourceProvider = this._composer.getResourceProvider())
							this._resourceProvider.setConfigFile(e.config), e.config && "string" !== typeof e.mapFolder ? (q = e.config.lastIndexOf("/"), this._resourceProvider.setBaseURL(e.config.substring(0,
										q + 1), !0)) : "string" === typeof e.mapFolder ? this._resourceProvider.setBaseURL(e.mapFolder) : this._resourceProvider.setBaseURL("");
						this._copyRightSection && gav.utils.Binding.bindSetter(function (a) {
							var b = !1;
							a && a.vislet.copyRightText ? (r._copyRightSection.innerHTML = a.vislet.copyRightText, r._copyRightSection.style.display = "block", b = !0) : "none" !== r._copyRightSection.style.display && (r._copyRightSection.style.display = "none", r._copyRightSection.innerHTML = "", b = !0);
							b && o.call(r)
						}, this._resourceProvider, "config");
						this._composer.setStoryURL(e.story);
						gav.utils.Binding.bindSetter(function (a) {
							r._chapterContainer && k.apply(r, [a, r._chapterContainer])
						}, this._composer._storyController, "activeStory");
						e.locale && gav.locale.setLang(e.locale);
						this._oldHeight = this._oldWidth = 0;
						q = document.createElement("div");
						d(q).css({
							position : "absolute",
							left : 0,
							right : 0,
							width : "100%",
							height : "100%",
							display : "none",
							backgroundColor : "rgba(100,100,100,0.25)",
							zIndex : 1E3
						}).addClass("gav-overlay");
						E = document.createElement("div");
						d(E).addClass("gav-loader");
						q.appendChild(E);
						n.appendChild(q);
						o.call(r)
					}
				} else {
					d(q).html("<p>This browser does not support the <code>canvas</code> element, please update to one that does.</p>");
					n = document.createElement("ul");
					for (E = 0; E < p.length; E++)
						d(n).append("<li><a href='" + p[E].address + "'>" + p[E].name + "</a> " + p[E].version + "</li>");
					d("p", q).append(n)
				}
			}
		},
		setPresentationMode : function (a) {
			this._isInPresentationMode = a;
			d(this._presentationMode).toggleClass("active", this._isInPresentationMode);
			for (var b = 0; b < this._components.length; b++)
				this._components[b].setPresentationMode &&
				this._components[b].setPresentationMode(a)
		},
		setToggleSelectionMode : function (a) {
			this._isInToggleSelectionMode = a;
			this._context._selectionManager._lockState = a ? 2 : -1
		},
		getContext : function () {
			return this._context
		},
		getRecordSelector : function () {
			return this._recordSelector
		}
	});
	var r = {
		map : "gav.components.MapPanelExtended",
		mappanel : "gav.components.MapPanelExtended",
		flowmap : "gav.components.FlowMapPanel",
		histogram : "gav.components.BarChartPanel",
		barchart : "gav.components.BarChartPanel",
		scatterplot : "gav.components.ScatterPlotPanel",
		timegraph : "gav.components.TimeGraphPanel",
		timegraphfc : "gav.components.TimeGraphPanelFC",
		distributionplot : "gav.components.DistributionBarChartPanel",
		distributionbarchart : "gav.components.DistributionBarChartPanel",
		distributionchart : "gav.components.DistributionBarChartPanel",
		distbarchart : "gav.components.DistributionBarChartPanel",
		pcp : "gav.components.ParallelCoordinatesPlotPanel",
		pcplot : "gav.components.ParallelCoordinatesPlotPanel",
		parallelcoordinatesplot : "gav.components.ParallelCoordinatesPlotPanel",
		parallelcoordinates : "gav.components.ParallelCoordinatesPlotPanel",
		piechart : "gav.components.PieChartPanel",
		radarchart : "gav.components.RadarChartPanel",
		timebarchart : "gav.components.TimeBarChartPanel",
		tablelens : "gav.components.TableLensPanel",
		scattermatrix : "gav.components.ScatterMatrixPanel",
		datatable : "gav.components.DataTablePanel",
		datagrid : "gav.components.DataTablePanel",
		treemap : "gav.components.TreemapPanel",
		pyramidchart : "gav.components.PyramidChartPanel"
	};
	Date.now()
})(jQuery);
(function () {
	function d(a, b) {
		for (var d = 0; d < this._componentsWithUnresolvedState.length; d++)
			if (this._componentsWithUnresolvedState[d].component === a) {
				this._componentsWithUnresolvedState[d].add = b;
				return
			}
		this._componentsWithUnresolvedState.push({
			component : a,
			add : b
		})
	}
	var b = new gav.data.provider.XMLProvider;
	gav.Klass("gav.Composer", {
		extend : gav.Invalidatable,
		init : function () {
			gav.Invalidatable.prototype.init.call(this);
			this._components = [];
			this._removeComponentsQueue = [];
			this._addComponentsQueue = [];
			this._componentsWithUnresolvedState =
				[];
			this._context = new gav.Context;
			this._axisContext = new gav.AxisContext(1, 2, 0);
			this._colorMapProvider = new gav.representation.ColorMapProvider;
			this._colorMap = new gav.representation.ColorMap;
			this._categoricalColorMap = new gav.representation.CategoricalColorMap;
			this._colorMapProvider.setColorMaps([this._colorMap, this._categoricalColorMap]);
			this._colorMapProvider.setActiveColorMap(this._colorMap);
			gav.utils.Binding.bindProperty(this._context, "colorMap", this._colorMapProvider, "activeColorMap");
			this._context.setCategoricalColorMap(this._categoricalColorMap);
			this._context.setColorMapProvider(this._colorMapProvider);
			this._animationController = new gav.animation.AnimationController;
			this._context.setAnimationController(this._animationController);
			var a = this;
			this._animationController.addEventListener("sliceExplicitlyChanged", function () {
				a._context.setSlice(a._animationController.getSlice());
				a._colorMap.setSlice(a._animationController.getSlice());
				a._categoricalColorMap.setSlice(a._animationController.getSlice())
			}, this);
			"function" == typeof gav.data.ResourceProvider &&
			(this._resourceProvider = new gav.data.ResourceProvider, this._resourceProvider.setContext(this._context));
			"function" == typeof gav.data.provider.URLDataProvider && (this._urlDataProvider = new gav.data.provider.URLDataProvider, gav.utils.Binding.bindSetter(function (b) {
					b && a._context.setDataSet(b)
				}, this._urlDataProvider, "dataSet"));
			"function" == typeof gav.snapshot.SnapshotManager && (this._snapshotManager = new gav.snapshot.SnapshotManager, this._snapshotManager.addStorableComponent(this._context), this._resourceProvider &&
				this._snapshotManager.addStorableComponent(this._resourceProvider), this._snapshotManager.addStorableComponent(this._colorMapProvider), this._flexSnapshotManager = new gav.snapshot.FlexSnapshotManager, this._flexSnapshotManager.addSnapshotReadable(this._context), this._flexSnapshotManager.addSnapshotReadable(this._colorMapProvider), this._urlDataProvider && this._flexSnapshotManager.addSnapshotReadable(this._urlDataProvider), this._storyController = new gav.snapshot.Controller, this._storyController.setSnapshotManager(this._snapshotManager),
				this._storyController.setSnapshotLoader(this._flexSnapshotManager));
			this._context.addEventListener("propertyChange", function (b) {
				"dataSet" === b.property && (a._colorMap.setDataSet(b.newValue), a._categoricalColorMap.setDataSet(b.newValue), a._animationController.setDataSet(b.newValue), a._dataSet !== b.newValue && (a._dataSet = b.newValue), a.dispatchEvent("dataSetChanged", [b.newValue]))
			})
		},
		getResourceProvider : function () {
			return this._resourceProvider
		},
		setResourceProvider : function (a) {
			this._resourceProvider !== a &&
			(this._resourceProvider && (this._snapshotManager && this._snapshotManager.removeStorableComponent(this._resourceProvider), this._resourceProvider.setContext(null)), this._resourceProvider = a, this._snapshotManager && this._resourceProvider && this._snapshotManager.addStorableComponent(this._resourceProvider), this._resourceProvider.setContext(this._context))
		},
		getAnimationController : function () {
			return this._animationController
		},
		getContext : function () {
			return this._context
		},
		getStoryController : function () {
			return this._storyController
		},
		setComponents : function (a) {
			for (var b = 0; b < this._components.length; b++)
				this.removeComponent(this._components[b]);
			for (b = 0; b < a.length; b++)
				this.addComponent(a[b]);
			this.invalidate();
			return this
		},
		getComponents : function () {
			return this._components
		},
		getComponentsOfType : function (a) {
			for (var b = [], d = 0; d < this._components.length; d++)
				this._components[d]instanceof a && b.push(this._components[d]);
			return b
		},
		removeComponent : function (a) {
			if (!a)
				return this;
			0 <= this._addComponentsQueue.indexOf(a) && d.apply(this, [a, !1]);
			if (!(0 <=
					this._removeComponentsQueue.indexOf(a)))
				return this._removeComponentsQueue.push(a), this.invalidate(), this
		},
		addComponent : function (a) {
			if (a && "function" == typeof a.setContext) {
				0 <= this._removeComponentsQueue.indexOf(a) && d.apply(this, [a, !0]);
				if (0 <= this._addComponentsQueue.indexOf(a))
					return this;
				this._addComponentsQueue.push(a);
				this.invalidate();
				return this
			}
		},
		setDataSet : function (a) {
			if (this._dataSet === a)
				return this;
			this._dataSet = a;
			this._dataSetChanged = !0;
			this.invalidate();
			return this
		},
		getDataSet : function () {
			return this._dataSet
		},
		setUnicodeURL : function (a) {
			var b = this,
			d = new gav.data.provider.UnicodeTextDataProvider;
			d.addEventListener("dataSetLoaded", function () {
				b.setDataSet(d.getDataSet())
			});
			d.setInputFileName(a);
			return this
		},
		setStoryURL : function (a) {
			for (var c = this, d = this._storyController.getStoryRepository().getStories(), e = 0; e < d.length; e++)
				if (d[e].__filename === a)
					return c._storyController.setActiveStory(d[e]), this;
			b.loadXML(a, function (b) {
				if (b = gav.snapshot.SnapshotManager.createStory(b, a))
					b.__filename = a, c._storyController.addStory(b),
					c._storyController.setActiveStory(b)
			});
			return this
		},
		_update : function () {
			var a = !1;
			if (this._componentsWithUnresolvedState.length)
				for (var b; b = this._componentsWithUnresolvedState.pop(); )
					b.add ? (b = this._removeComponentsQueue.indexOf(b.component), 0 <= b && this._removeComponentsQueue.splice(b, 1)) : (b = this._addComponentsQueue.indexOf(b.component), 0 <= b && this._addComponentsQueue.splice(b, 1));
			if (this._removeComponentsQueue.length) {
				b = (a = this._removeComponentsQueue.slice()) ? a.length : 0;
				for (var d, e = 0; e < b; e++)
					if (d = this._components.indexOf(a[e]),
						!(0 > d) && (d = this._components.splice(d, 1)[0]))
						d.setContext && d.setContext(null), d.setAxisContext && d.setAxisContext(null), this._storyController && (this._snapshotManager.removeStorableComponent(d), this._flexSnapshotManager.removeSnapshotReadable(d)), d.dispatchEvent("removedFromComposer", [this]), this.dispatchEvent("componentRemoved", d);
				this._removeComponentsQueue = [];
				a = !0
			}
			this._dataSetChanged && this._context.setDataSet(this._dataSet);
			if (this._addComponentsQueue.length) {
				b = (a = this._addComponentsQueue.slice()) ?
				a.length : 0;
				if (this._storyController)
					var g = new gav.snapshot.SnapshotManager, j = new gav.snapshot.FlexSnapshotManager;
				for (d = 0; d < b; d++)
					e = this._components.indexOf(a[d]), 0 <= e || (this._components.push(a[d]), a[d].dispatchEvent("addedToComposer", [this]), this.dispatchEvent("componentAdded", [a[d]]), this._storyController && (this._snapshotManager.addStorableComponent(a[d]), this._flexSnapshotManager.addSnapshotReadable(a[d]), g.addStorableComponent(a[d]), j.addSnapshotReadable(a[d])), a[d].setContext && a[d].setContext(this._context),
						a[d].setAxisContext && a[d].setAxisContext(this._axisContext));
				this._storyController && (this._storyController._snapshotManager = g, this._storyController._snapshotLoader = j, this._storyController.loadSnapshot(), this._storyController._snapshotManager = this._snapshotManager, this._storyController._snapshotLoader = this._flexSnapshotManager);
				this._addComponentsQueue = [];
				a = !0
			}
			if (this._mapGometryChanged) {
				for (g = 0; g < this._components.length; g++)
					j = this._components[g], j instanceof gav.components.MapPanel && (j.getMapSource() &&
						j.getMapSource().setMapGeometry(this._mapGeometry), j.getMapSource() && j.getMap().setProjection("mercator" === this._mapProjection ? new gav.components.map.MercatorProjection : new gav.components.map.UnitProjection));
				this._mapGometryChanged = !1
			}
			this._dataSetChanged = this._componentsChanged = this._mapGometryChanged = !1;
			a && this.dispatchEvent("componentsChanged")
		}
	})
})();
(function (d) {
	function b(a) {
		clearTimeout(a.timer);
		d(a.element).animate({
			opacity : 0
		}).animate({
			fontSize : 0,
			marginTop : 0,
			marginBottom : 0
		}, {
			duration : 200,
			complete : function () {
				d(this).remove()
			}
		});
		a = c.indexOf(a);
		c.splice(a, 1)
	}
	function a(a, g) {
		var j = document.createElement("div");
		j.className = "gav-notification";
		var k = {
			element : j,
			life : g.life,
			sticky : g.sticky,
			type : g.type,
			header : g.header
		};
		k.sticky || (k.timer = setTimeout(function () {
					b(k)
				}, g.life));
		var m = document.createElement("div");
		m.className = "gav-close";
		m.innerHTML = "\u00d7";
		j.appendChild(m);
		k.header && (m = document.createElement("div"), m.className = "gav-header", m.innerHTML = k.header, j.appendChild(m));
		a && (m = document.createElement("div"), m.className = "gav-message", m.innerHTML = a, j.appendChild(m));
		switch (g.type) {
		case "error":
			d(j).addClass("gav-notification-error");
			break;
		case "warning":
			d(j).addClass("gav-notification-warning");
			break;
		case "info":
			d(j).addClass("gav-notification-info");
			break;
		case "success":
			d(j).addClass("gav-notification-success");
			break;
		default:
			d(j).addClass("gav-notification-default")
		}
		d(j).hide().appendTo(f).fadeIn(100);
		c.push(k)
	}
	var c = [],
	f;
	gav.Klass("gav.Notifier", {});
	gav.Notifier.notify = function (e, g) {
		f || (f = document.createElement("div"), f.className = "gav-notifications", document.body.appendChild(f), d(f).delegate(".gav-close", "click", function () {
				for (var a = 0; a < c.length; a++)
					if (c[a].element === this.parentElement) {
						b(c[a]);
						break
					}
			}));
		var j = d.extend({
				life : 4E3,
				type : "default",
				sticky : !1,
				header : ""
			}, g);
		a(e, j)
	}
})(jQuery);

// ========== gav-m-extendedbase.js ==========
;
(function () {
	gav.data || (gav.data = {});
	gav.data.DataCubeUtils = {
		getMaxValue : function (a, e, f, g) {
			var h = Number.NEGATIVE_INFINITY,
			i;
			null == e && (e = gav.utils.ArrayHelper.range(0, a.getNumSlices()));
			null == f && (f = gav.utils.ArrayHelper.range(0, a.getNumRecords()));
			null == g && (g = gav.utils.ArrayHelper.range(0, a.getNumAttributes()));
			for (var b = 0; b < a.getNumSlices(); b++)
				for (var c = 0; c < a.getNumRecords(); c++)
					for (var d = 0; d < a.getNumAttributes(); d++)
						 - 1 != e.indexOf(b) && -1 != f.indexOf(c) && -1 != g.indexOf(d) && (i = a._data[b][c][d], i > h && (h =
									i));
			return h
		}
	}
})();

// ========== gav-m-sankey.js ==========
;
(function () {
	function f(b) {
		for (var a = [], h, c, e, l, d, f, g, i = b.getElementsByTagName("attribute"), k = 0; k < i.length; k++) {
			f = [];
			b = parseInt(i[k].getAttribute("attrIn"));
			d = i[k].getElementsByTagName("hub");
			g = i[k].getAttribute("defaultHubDistance");
			(h = parseInt(i[k].getAttribute("attrOut"))) || (h = b);
			(c = i[k].getAttribute("type")) || (c = "default");
			(e = i[k].getAttribute("showAccumulatedInValue")) || (e = !1);
			(l = i[k].getAttribute("showAccumulatedOutValue")) || (l = !1);
			if (d && 0 < d.length)
				for (var n = 0; n < d.length; n++)
					f.push(parseFloat(d[n].getAttribute("dist")));
			g || (g = 0.03);
			a.push({
				attributes : [b, h],
				dir : i[k].getAttribute("dir"),
				pos : {
					x : parseFloat(i[k].getAttribute("posX")),
					y : parseFloat(i[k].getAttribute("posY"))
				},
				defaultHubDistance : g,
				distances : f,
				type : c,
				showAccOutVal : l,
				showAccInVal : e
			})
		}
		return a
	}
	function d() {
		this._sankeyDiagram && this._attributeComboBox && (this._attributeComboBox.setDataProvider(this._sankeyDiagram && this._sankeyDiagram.getDataSet() ? this._sankeyDiagram.getDataSet().getIndicatorInformation() : []), this._attributeComboBox.setSelectedIndex(this._sankeyDiagram.getWidthAttribute(),
				!0))
	}
	function g() {
		var b = this;
		this._settingsPanelContainer = document.createElement("div");
		$(this._settingsPanelContainer).css({
			height : "100%",
			"float" : "left"
		}).bind("show hide", function () {
			b.refresh()
		}).addClass("gav-state-collapsed");
		var a = document.createElement("div");
		$(a).css({
			height : "100%",
			"float" : "right"
		});
		this._right = a;
		var h = document.createElement("div");
		$(h).addClass("gav-data-range-container gav-data-range-horizontal");
		this._horizontalDataRangeSliderContainer = h;
		var c = document.createElement("div");
		$(c).css({
			top : "2%",
			margin : "auto",
			height : "96%"
		}).appendTo(h);
		this._horizontalDataRangeSlider = new gav.controls.Slider({
				values : [10, 90],
				min : 0,
				max : 100,
				range : !0,
				slide : function () {},
				tooltipFunction : function () {
					return null
				},
				tooltipPlacement : "bottom",
				container : c
			});
		h = document.createElement("div");
		$(h).css({
			height : "100%",
			padding : "2em 0",
			"box-sizing" : "border-box",
			"float" : "right"
		}).addClass("gav-data-range-container gav-data-range-vertical");
		this._verticalDataRangeSliderContainer = h;
		c = document.createElement("div");
		$(c).css({
			top : "2%",
			margin : "auto",
			height : "96%"
		}).appendTo(h);
		this._verticalDataRangeSlider = new gav.controls.Slider({
				values : [10, 90],
				min : 0,
				max : 100,
				vertical : !0,
				range : !0,
				slide : function () {},
				tooltipFunction : function () {
					return null
				},
				tooltipPlacement : "left",
				container : c
			});
		this._attributeComboBox = new gav.controls.ComboBox({
				clean : !0
			});
		this._attributeComboBox.addEventListener("change", function () {
			b._sankeyDiagram.setWidthAttribute(b._attributeComboBox.getSelectedIndex())
		});
		c = document.createElement("div");
		$(c).css({
			textAlign : "center",
			"box-sizing" : "border-box"
		});
		this._attributeContainer = c;
		c.appendChild(this._attributeComboBox.getDOMElement());
		this._titleContainer = document.createElement("ul");
		$(this._titleContainer).addClass("gav-chart-attributes");
		this._componentContainer = document.createElement("div");
		$(this._componentContainer).css({
			"float" : "right"
		});
		this._hBarSliderContainer = document.createElement("div");
		$(this._hBarSliderContainer).css({
			position : "absolute",
			bottom : 0,
			width : "100%",
			padding : "0 16px 0 64px"
		}).addClass("gav-data-range-container");
		this._hBarSlider = document.createElement("div");
		$(this._hBarSlider).appendTo(this._hBarSliderContainer);
		this._horizontalBarSlider = new gav.controls.Slider({
				range : !0,
				min : 0,
				max : 1,
				values : [0, 1],
				step : 1,
				editableRange : !1,
				slide : function () {},
				tooltipFunction : function (a) {
					return a.toFixed(0)
				},
				container : this._hBarSlider
			});
		this._vBarSliderContainer = document.createElement("div");
		$(this._vBarSliderContainer).css({
			position : "absolute",
			top : 0,
			padding : "16px 0 16px 0"
		}).addClass("gav-data-range-container");
		this._vBarSlider =
			document.createElement("div");
		$(this._vBarSlider).appendTo(this._vBarSliderContainer);
		this._verticalBarSlider = new gav.controls.Slider({
				vertical : !0,
				range : !0,
				min : -1,
				max : 0,
				values : [-1, 0],
				step : 1,
				editableRange : !1,
				slide : function () {},
				tooltipFunction : function (a) {
					return -a.toFixed(0)
				},
				container : this._vBarSlider
			});
		this._allowSettingsPanel && this._contentPanel.appendChild(this._settingsPanelContainer);
		this._contentPanel.appendChild(a);
		this._contentPanel.appendChild(h);
		a.appendChild(c);
		a.appendChild(this._titleContainer);
		a.appendChild(this._componentContainer)
	}
	function i() {
		var b = $(this._contentPanel).width(),
		a = $(this._settingsPanelContainer).width();
		this._attributeComboBox.setPresentationMode(this._isInPresentationMode);
		$(this._titleContainer).toggleClass("gav-mode-presentation", this._isInPresentationMode);
		$(this._verticalDataRangeSliderContainer).toggleClass("gav-state-hidden", !0).width();
		var h = $(this._horizontalDataRangeSliderContainer).toggleClass("gav-state-hidden", !1).height();
		$(this._hBarSliderContainer).hide();
		$(this._vBarSliderContainer).show();
		var c = $(this._right).height(),
		b = b - a,
		e = $(this._componentContainer).position().top,
		c = c - h;
		$(this._right).css({
			width : b,
			left : a,
			position : "absolute"
		});
		b -= $(this._vBarSliderContainer).css({
			height : c - e,
			top : e
		}).children().width();
		$(this._componentContainer).css({
			height : c - e,
			width : b
		});
		this._sankeyDiagram.invalidateSize();
		this._sankeyDiagram.invalidateProperties();
		this._sankeyDiagram.invalidateDisplay()
	}
	var k = 0;
	gav.Klass("gav.components.SankeyPanel", {
		extend : gav.components.ComponentPanel,
		implement : [gav.snapshot.ISnapshotReadableComponent, gav.snapshot.IStorablesContainer],
		init : function (b) {
			gav.components.ComponentPanel.prototype.init.call(this, b);
			$(this._contentPanel).addClass("gav-component-sankeydiagram-panel");
			k++;
			var a = this;
			g.call(this);
			this._isInPresentationMode = !1;
			this._allowSettingsPanel = !0;
			this._configXML;
			this._sankeyDiagram = new gav.components.SankeyDiagram(this._componentContainer);
			this._settingsPanel = new gav.panels.SankeyDiagramSettingsPanel(this._settingsPanelContainer, this._sankeyDiagram,
					this);
			this._sankeyDiagram.addEventListener("propertyChange", function (c) {
				switch (c.property) {
				case "selectedIndicators":
					a._onIndicatorChange();
					break;
				case "desiredGridSpacing":
					a._gridSpacingSliderControl.setValue(c.newValue);
					break;
				case "dataSet":
					a._onIndicatorChange(!0);
					break;
				case "sortAttribute":
					a._onIndicatorChange()
				}
			});
			var h;
			this._sankeyDiagram.addEventListener("itemOver", function (c) {
				a._context && (h = a.getDataTooltip(), a._onFlowOver(h, c))
			});
			this._sankeyDiagram.addEventListener("itemOut", function () {
				h &&
				h.hide()
			});
			this.refresh()
		},
		getComponents : function () {
			return [this._sankeyDiagram]
		},
		getStorables : function () {
			return [this._sankeyDiagram]
		},
		getSnapshotSite : function () {
			return {
				components : {
					sankeyDiagram : this._sankeyDiagram
				}
			}
		},
		getSnapshotReaders : function () {
			return null
		},
		getSnapshot : function () {
			return null
		},
		setConfig : function (b) {
			this._configXML = b;
			this._sankeyDiagram.setConfig(f(b), parseInt(b.getAttribute("widthAttributeIndex")))
		},
		setApperance : function (b) {
			var a = this._sankeyDiagram;
			a && (a.setFlowCurvature(parseInt(b.curve)),
				a.setFlowSlope(parseInt(b.slope)))
		},
		setAllowStationMove : function (b) {
			this._sankeyDiagram.setAllowStationMove(b)
		},
		getAllowStationMove : function () {
			return this._sankeyDiagram.getAllowStationMove()
		},
		getIsIntroRunning : function () {
			return this._sankeyDiagram.getIsIntroRunning()
		},
		pauseIntro : function (b) {
			this._sankeyDiagram.pauseIntro(b)
		},
		setContext : function (b) {
			gav.components.ComponentPanel.prototype.setContext.call(this, b);
			this._sankeyDiagram && this.getContext() ? (this._sankeyDiagram.setDataSet(this.getContext().getDataSet()),
				d.call(this), this.getContext().getFormatter(), this._sankeyDiagram.setVisibilityList(this.getContext().getVisibilityManager()), this._sankeyDiagram.setFormatter(b.getFormatter()), this._sankeyDiagram.setColorMap(this.getContext().getColorMap()), this._sankeyDiagram.setAnimationController(this.getContext().getAnimationController())) : this._sankeyDiagram && (this._sankeyDiagram.setDataSet(null), this._sankeyDiagram.setFormatter(null), this._sankeyDiagram.setColorMap(null), this._sankeyDiagram.setAnimationController(null))
		},
		refresh : function () {
			gav.components.ComponentPanel.prototype.refresh.call(this);
			i.call(this)
		},
		setPresentationMode : function (b) {
			this._isInPresentationMode = b;
			i.call(this)
		},
		_onContextChange : function (b) {
			gav.components.ComponentPanel.prototype._onContextChange.call(this, b);
			switch (b.property) {
			case "dataSet":
				this._sankeyDiagram.setDataSet(b.newValue);
				d.call(this);
				break;
			case "colorMap":
				this._sankeyDiagram.setColorMap(b.newValue);
				break;
			case "animationController":
				this._sankeyDiagram.setAnimationController(this._context.getAnimationController());
				break;
			case "formatter":
				this._sankeyDiagram.setFormatter(this._context.getFormatter())
			}
		},
		_onFlowOver : function (b, a) {
			var h = [this._sankeyDiagram.getWidthAttribute()];
			b.setVisibleAttributes(h);
			this.showDataTooltip([a.item], a.e, a.extraRows)
		},
		_onIndicatorChange : function () {
			d.call(this)
		}
	});
	gav.components
})();
(function (f) {
	function d() {
		for (var d = [], f, k, b, a = 0; a < this._attributeCombos.length; a++) {
			b = this._attributeCombos[a];
			f = [];
			for (var h = 0; h < b.length; h++)
				k = b[h], f.push(k.getSelectedIndex());
			d[a] = f
		}
		this._sankeyDiagram.setSelectedIndicators(d)
	}
	gav.Klass("gav.panels.SankeyDiagramSettingsPanel", {
		extend : gav.panels.ComponentSettingsPanel,
		init : function (d, f) {
			gav.panels.ComponentSettingsPanel.prototype.init.call(this, d);
			var k = this,
			b = this._innerPanel,
			a;
			this._sankeyDiagram = f;
			f.addEventListener("propertyChange", function (a) {
				switch (a.property) {
				case "dataSet":
					k._onIndicatorChange(!0);
					break;
				case "groupAttribute":
					k._onIndicatorChange(!0)
				}
			});
			a = document.createElement("label");
			a.innerHTML = "Flow Curvature:";
			b.appendChild(a);
			a = document.createElement("div");
			this._flowCurvatureSliderControl = new gav.controls.Slider({
					container : a,
					min : 0,
					max : 5,
					value : f.getFlowCurvature(),
					highlightProgress : !0,
					step : 1,
					slide : function (a) {
						f.setFlowCurvature(a)
					}
				});
			b.appendChild(a);
			a = document.createElement("label");
			a.innerHTML = "Flow Slope:";
			b.appendChild(a);
			a = document.createElement("div");
			this._flowSlopeSliderControl =
				new gav.controls.Slider({
					container : a,
					min : 0,
					max : 60,
					value : f.getFlowSlope(),
					highlightProgress : !0,
					step : 5,
					slide : function (a) {
						f.setFlowSlope(a)
					}
				});
			b.appendChild(a);
			a = document.createElement("label");
			a.innerHTML = "Flow Grouping Attribute:";
			b.appendChild(a);
			this._groupAttributeComboBox = new gav.controls.ComboBox;
			this._groupAttributeComboBox.addEventListener("change", function () {
				k._sankeyDiagram.setGroupAttribute(k._groupAttributeComboBox.getSelectedIndex() - 1)
			});
			b.appendChild(this._groupAttributeComboBox.getDOMElement());
			this._attrPanel = a = document.createElement("div");
			b.appendChild(a)
		},
		_onIndicatorChange : function (g) {
			var i = this._sankeyDiagram ? this._sankeyDiagram.getDataSet() ? this._sankeyDiagram.getDataSet().getCategoricalIndicatorInformation() : null : null;
			if (this._sankeyDiagram) {
				var k = this._sankeyDiagram.getSelectedIndicators();
				this._attributeCombos = [];
				var b,
				a,
				h = this._sankeyDiagram.getConfigIndicators(),
				c = document.createElement("label"),
				e = this._attrPanel;
				f(e).empty();
				c.innerHTML = "Indicators:";
				e.appendChild(c);
				for (var l =
						0; l < h.length; l++)
					0 < l && 2 > l && 2 == h[l].length ? (c = document.createElement("label"), c.innerHTML = "Transformation<br/>", e.appendChild(c), b = new gav.controls.ComboBox, b.addEventListener("change", d, this), c = document.createElement("label"), c.innerHTML = "In:", e.appendChild(c), e.appendChild(b.getDOMElement()), a = new gav.controls.ComboBox, a.addEventListener("change", d, this), this._attributeCombos.push([b, a]), c = document.createElement("label"), c.innerHTML = "Out:", e.appendChild(c), e.appendChild(a.getDOMElement())) : (b = new gav.controls.ComboBox,
						b.addEventListener("change", d, this), this._attributeCombos.push([b]), e.appendChild(b.getDOMElement())), b = document.createElement("div"), b.className = "gav-separator", e.appendChild(b);
				this._innerPanel.appendChild(e);
				for (l = e = 0; l < this._attributeCombos.length; l++) {
					h = this._attributeCombos[l];
					for (a = 0; a < h.length; a++)
						b = h[a], g && b.setDataProvider(i), b.setSelectedIndex(k[e++], !0)
				}
			}
			if (this._sankeyDiagram && this._groupAttributeComboBox && (this._sankeyDiagram.getGroupAttribute(), g = this._sankeyDiagram ? this._sankeyDiagram.getDataSet() :
						null))
				this._groupAttributeComboBox.setDataProvider(["None"].concat(g.getCategoricalIndicatorInformation())), this._groupAttributeComboBox.setSelectedIndex(this._sankeyDiagram.getGroupAttribute() + 1, !0)
		}
	});
	gav.panels
})(jQuery);
(function () {
	function f(a, c) {
		var h = null;
		return function () {
			var b = this,
			e = arguments;
			clearTimeout(h);
			h = setTimeout(function () {
					a.apply(b, e)
				}, c)
		}
	}
	function d(a, c) {
		var h = this._flowCanvas.getContext("2d"),
		b = this._stations,
		e,
		l,
		d,
		f,
		j = this._dataSet.getClassCube(),
		o = b.length,
		i;
		this._sortedIndices = Array(0 < o ? o - 1 : 0);
		for (var F = [], v = [], m = [], n = 0; n < o; n++) {
			e = b[n];
			f = e.getAttribute();
			c && (e.setLabel(j.getCategoricalIndicatorName(f)), e.setIndicator(this._widthAttribute));
			e.getStartFlows();
			l = e.getHubs();
			for (var s = 0; s < l.length; s++)
				d =
					l[s], c && (i = k.apply(this, [d.getIndex(), j.getCategoricalValues(f)]), d.setLabel(j.getCategoricalValues(f)[i], h), this._colorMap && "CategoricalColorMap" == this._colorMap.displayName && 2 > d.getDisplayType() && j.getNumAttributes() > f ? (i = 1 == d.getDisplayType() && 0 < d.getFlows().length ? 0 < d.getEndFlows().length ? d.getEndFlows()[0].getFlowColor().toHex() : d.getFlows()[0].getFlowColor().toHex() : "#666", d.setColor(i)) : 0 < d.getFlows().length && d.setColor(d.getFlows()[0].getFlowColor().toHex()), this._highlightedHub && this._highlightedHub.hub ==
					d ? d.setHighlight(!0) : d.setHighlight(!1)), a && (d.updateHub(), i = this._conservations.hubs.indexOf(d), -1 != i && (this._conservations.values[i] += d.getNetValue(), v.push(this._conservations.indices[i]), F.push(this._conservations.values[i]), m.push(d.getColor()), g.call(this, v, !0, !0, F, m), v = [], F = [], m = []));
			a && (e.updatePositions(), e.updateStation())
		}
		h = [];
		this._sortedIndices = h = gav.utils.ArrayHelper.range(0, this._flowItems.length)
	}
	function g(a, c, h, b, e) {
		this._flowsNeedingUpdate = a;
		for (var l = this._flowItems, d, f, j, i, g =
				0; g < a.length; g++) {
			f = a[g];
			if (f > l.length)
				break;
			d = l[f];
			j = d.getIndex();
			if (c) {
				-1 < j ? this._colorMap && d.setFlowColor(this._colorMap.getColor(j).toHex()) : e && g < e.length && d.setFlowColor(e[g].toRGB());
				this._highlightedFlows && 0 < this._highlightedFlows.length && -1 != this._highlightedFlows.indexOf(f) ? d.setHighlight(!0) : d.setHighlight(!1);
				this._selectedFlows && 0 < this._selectedFlows.length && -1 != this._selectedFlows.indexOf(f) && -1 < this._flowItems[f].getIndex() ? d.setSelected(!0) : d.setSelected(!1);
				if (-1 < j)
					if (i = j, !this._dataSet ||
						!this._dataSet.getDataCube())
						i = void 0;
					else {
						f = this._dataCube;
						var o = void 0,
						k = void 0,
						o = Math.floor(this._floatingSlice),
						k = Math.ceil(this._floatingSlice);
						j = Math.round(100 * (this._floatingSlice - o)) / 100;
						o = f.getValue(i, this._widthAttribute, o);
						k = f.getValue(i, this._widthAttribute, k);
						i = o * (1 - j) + k * j
					}
				else
					i = b && g < b.length ? parseFloat(b[g]) : d.getValue();
				d.setValue(0 < i ? i : 0)
			}
			h && (f = 0 < i ? Math.ceil(10 * i / this._currentSum * this._flowWidthMultiplier) / 10 : 0, d.setFlowWidth(f), d.setCurvature(this._flowCurvature), d.setSlope(this._flowSlope))
		}
	}
	function i(a) {
		var c = a.attributes,
		h = a.dir,
		b = a.type,
		e = a.showAccInVal,
		l = a.showAccOutVal,
		d,
		f;
		c instanceof Array ? 1 == c.length ? f = d = c[0] : (d = c[0], f = c[1]) : f = d = c;
		if (!(1 > c.length || 2 < c.length)) {
			var i = this._dataSet.getClassCube(),
			a = 0;
			if (i.getNumAttributes() > d) {
				c = new gav.components.sankeyDiagram.SankeyFlowStation;
				c.setAttribute(d);
				c.setShowAccumulatedInValue(e);
				c.setShowAccumulatedOutValue(l);
				("horizontal" == h || "vertical" == h) && c.setDirection(h);
				c.setOutAttribute(f);
				c.setDisplayType(b);
				"stock" == b ? c.setLabelStyle(j("stock-label")) :
				"stat" == b ? c.setLabelStyle(j("stat-label")) : c.setLabelStyle(j("default-station-label"));
				e = i.getCategoricalValues(d);
				for (l = 0; l < e.length; l++)
					"" != e[l] && (h = new gav.components.sankeyDiagram.SankeyFlowHub, h.setDisplayType(b), h.setIndex(a++), c.addHub(h));
				this._stations.push(c);
				"group" != c.getDisplayType() ? this._nonGroupStations.push(c) : this._groupStations.push(c)
			}
		}
	}
	function k(a, c) {
		for (var h = a, b = 0; b < c.length && !("" == c[b] && h++, b == a); b++);
		return h
	}
	function b(a, c) {
		if (!c || "" == c[a])
			return -1;
		for (var h = a, b = 0; b < c.length &&
			!("" == c[b] && h--, b == a); b++);
		return h
	}
	function a(a) {
		void 0 == a && (a = !1);
		for (var c = this._stations, h = {
				x : 0,
				y : 0
			}, b = this._stationSettings, e, d = this._flowCanvas.height, l = this._flowCanvas.width, f, j, i, g = 0; g < c.length; g++) {
			i = c[g];
			j = "horizontal" == i.getDirection() ? l : d;
			if (a)
				e = b[g].distances.concat(), h = b[g].pos, i.setDefaultHubDistance(b[g].defaultHubDistance * j);
			else {
				this._sizeChanged ? (f = "horizontal" == i.getDirection() ? this._oldDimensions.w : this._oldDimensions.h, h = i.getPosition(), h.x /= this._oldDimensions.w, h.y /= this._oldDimensions.h) :
				(f = j, h = i.getPosition(), h.x /= l, h.y /= d);
				e = i.getHubDistances();
				for (var o = 0; o < e.length; o++)
					e[o] /= f
			}
			f = "group" == i.getDisplayType() ? 0 : h.y * d;
			i.setPosition(h.x * l, f);
			for (o = 0; o < e.length; o++)
				e[o] *= j;
			"group" == i.getDisplayType() ? i.generateHubDistances() : i.setHubDistances(null != e ? e : [])
		}
		this._stationPositions = []
	}
	function h(a) {
		a.getContext("2d").clearRect(0, 0, a.width, a.height)
	}
	function c(a, c) {
		1 < c.recordInfo.length ? $(this._header).css({
			width : 200,
			height : 200
		}) : $(this._header).css({
			width : 0,
			height : 0
		});
		this._secondarySelectionList.setSelected(c.recordInfo);
		this._pieChartLabel = c.label;
		this._pieChart.setSelectionList(this._secondarySelectionList);
		this._popupShown = !0;
		var h = a.pageX,
		b = a.pageY,
		d = this._$pop.outerWidth(),
		h = Math.max(0, h + Math.min(10, window.innerWidth - h - d)),
		d = this._$pop.outerHeight(),
		b = Math.max(0, b + Math.min(10, window.innerHeight - b - 10 - d));
		e.call(this, c);
		for (var l = d = 0; l < c.recordInfo.length; l++)
			d += this._dataSet.getDataCube().getValue(c.recordInfo[l], this._widthAttribute, this._slice);
		$(this._popUp).dialog("option", "position", [h, b]);
		$(this._popUp).dialog("option",
			"title", this._pieChartLabel + " (" + this._dataSet.getSliceInformation()[this._slice].name + ")<br/> Total: " + this._formatter.getNumberFormatter().getFormattedValue(d) + " " + this._formatter.getAttributeUnit(this._widthAttribute));
		$(this._popUp).dialog("open")
	}
	function e(a) {
		for (var c = 0, h = 0; h < a.recordInfo.length; h++)
			c += this._dataSet.getDataCube().getValue(a.recordInfo[h], this._widthAttribute, this._slice);
		$(this._popUp).dialog("option", "title", this._pieChartLabel + " (" + this._dataSet.getSliceInformation()[this._slice].name + ")<br/> Total: " + this._formatter.getNumberFormatter().getFormattedValue(c) + " " + this._formatter.getAttributeUnit(this._widthAttribute));
		$(this._contentTable).empty();
		a = a.recordInfo;
		$(this._contentTable).append("<tr>");
		for (h = 0; h < a.length; h++)
			c = "<tr>", c += "<td><span style='display:block;width:10px;height:10px;background-color:" + this._colorMap.getColor(a[h]) + ";'></span></td>", c += "<td>" + this._dataSet.getClassCube().getValue(a[h], this._groupAttribute, this._slice) + "</td>", this._dataSet.getDataCube().getNumSlices(), c += "<td style='text-align:right'>" + this._formatter.getFormattedAttributeValueWithUnit(this._widthAttribute, this._dataCube.getValue(a[h], this._widthAttribute, this._slice)) + "</td></tr>", $(this._contentTable).append(c)
	}
	function l() {
		this._secondarySelectionList && this._secondarySelectionList.setSelected([]);
		this._$pop.is(":visible") && this._$pop.hide("fade", {}, 500)
	}
	function o() {
		var a = w._stations,
		c = w._flowCanvas.getContext("2d");
		if (B)
			q = (u = a[t]) ? u.getHubs() : [], t < a.length ? (B = !1, C = !0) : (t = 0, B = !1, G = !0), u && u.draw(c, w._formatter);
		else if (C)
			for (H = !1; !H && C; ) {
				if (n = q[p], p < q.length ? p++ : t < a.length ? (t++, p = 0, B = !0, C = !1) : (p = t = 0, C = B = !1, G = !0), n && 1 != n.getDisplayType() && (0 < n.getInValue() || 0 < n.getOutValue()))
					H = !0, n.draw(c, w._formatter, w._allowStationMove,
						!1)
			}
		else
			G && ((u = a[t]) ? (q = u.getHubs(), E = !0) : q = [], (n = q[p]) ? (m = n.getStartFlows(), m.length > x && E && (E = !1, 0 < n.getFlows().length && !(1.0E-5 > Math.abs(n.getInValue()) && 1.0E-5 > Math.abs(n.getOutValue())) && n.draw(c, w._formatter, w._allowStationMove, !1))) : m = [], r = m[x], x < m.length - 1 ? x++ : p < q.length - 1 ? (p++, E = !0, x = 0) : t < a.length - 1 ? (t++, x = p = 0) : (w._shouldAnimate = !1, w._introPlaying = !1), r && r.draw(c, w._formatter, !1));
		w._shouldAnimate || (clearInterval(w._intro), w.dispatchEvent(new gav.events.GavEvent("introFinishedEvent")), w.invalidateDisplay())
	}
	function j(a) {
		if ("default-station-label" == a)
			return y.css("font-style") + " " + y.css("font-weight") + " " + y.css("font-size") + " " + y.css("font-family");
		if ("stock-label" == a)
			return z.css("font-style") + " " + z.css("font-weight") + " " + z.css("font-size") + " " + z.css("font-family");
		if ("stat-label" == a)
			return A.css("font-style") + " " + A.css("font-weight") + " " + A.css("font-size") + " " + A.css("font-family")
	}
	function s(a) {
		$(a.target).offset();
		$(a.target).offset();
		D++;
		1 === D && (I = setTimeout(function () {
					D = 0
				}, 200));
		1 < D && (clearTimeout(I),
			D = 0);
		Date.now();
		return !1
	}
	gav.Klass("gav.components.SankeyDiagram", {
		extend : gav.components.Component,
		implement : [gav.representation.IVisibilityListConsumer, gav.representation.IPickable, gav.representation.ISelectionListConsumer, gav.snapshot.IStorable],
		init : function (a) {
			function c(a) {
				f(l._onMouseMove(a), 1E4)
			}
			function h(a) {
				$(l._element).unbind("mousemove", c);
				gav.support.touch || ($(document).bind("mousemove", e), $(document).bind("mouseup", b));
				l._onMouseDown(a)
			}
			function b(a) {
				l._onMouseUp(a);
				$(document).unbind("mousemove",
					e);
				$(document).unbind("mouseup", b);
				gav.support.touch || $(l._element).bind("mousemove", c)
			}
			function e(a) {
				l._onMouseDrag(a)
			}
			function d() {
				l.dispatchEvent(new gav.events.BrushEvent("itemOut"))
			}
			gav.components.Component.prototype.init.call(this, a);
			this._flowCanvas = document.createElement("canvas");
			this._flowCanvas.width = 2E3;
			this._flowCanvas.height = 1E3;
			a.appendChild(this._flowCanvas);
			this._popUp = document.createElement("div");
			this._$pop = $(this._popUp);
			var l = this;
			this._header = document.createElement("div");
			this._content =
				document.createElement("div");
			$(this._content).addClass("gav-tooltip-content");
			this._contentTable = document.createElement("table");
			$(this._contentTable).width("100%");
			this._content.appendChild(this._contentTable);
			this._pieChart = new gav.components.PieChart(this._header);
			this._pieChart.setShareValuePrecision(0);
			this._header.style.margin = "0 auto";
			this._pieChart.setShowSelectionOnly(!0);
			this._pieChart.setMaxSizeRatio(0.9);
			this._pieChart.setShowLabels(!1);
			this._popUp.appendChild(this._header);
			this._popUp.appendChild(this._content);
			this._$pop.dialog({
				autoOpen : !1,
				title : "Pie Chart",
				show : {
					effect : "scale",
					complete : function () {
						l._pieChart.invalidateSize();
						l._pieChart.invalidateProperties();
						l._pieChart.invalidateDisplay()
					}
				},
				resizable : !1
			});
			this._secondarySelectionList = new gav.representation.SelectionManager;
			this._startPosition = [10, 50];
			this._flowWidth = 20;
			this._floatingSlice = this._slice = 0;
			this._flowCurvature = 3;
			this._flowSlope = 45;
			this._stations = [];
			this._groupStations = [];
			this._nonGroupStations = [];
			this._pieChartLabel = "";
			this._allRecordIndices =
				[];
			this._firstSizeUpdate = !0;
			this._intro = null;
			this._shouldAnimate = !0;
			this._showPieChartIcons = this._introPlaying = !1;
			this._pieIcon = new Image;
			this._pieIcon.src = "styles/images/pieicon.png";
			this._flowWidthMultiplier = 1;
			this._stationPositions = [];
			this._flowAppearanceChanged = this._allowStationMove = !1;
			this._stationData = [];
			this._flowItems = [];
			this._selectedFlows = [];
			this._highlightedFlows = [];
			this._sortedIndices = [];
			this._currentMaxValue = null;
			this._selectedIndicators = [0];
			this._highlightedHub = this._highlightedStation =
				null;
			this._groupAttribute = this._widthAttribute = 0;
			this._stationAttributes = [];
			this._stationAttributeArray = [];
			this._stationSettings = [];
			this._conservations = {
				hubs : [],
				values : [],
				indices : []
			};
			this._highlightedIndices = [];
			this._plotWidth = this._flowCanvas.width;
			this._plotHeight = this._flowCanvas.height;
			l = this;
			$(a).bind("gavtap", function (a) {
				s.call(l, a)
			});
			gav.support.touch || ($(this._element).bind("mousemove", c), $(this._element).bind("mousedown", h), $(this._element).bind("mouseout", d))
		},
		setAllowStationMove : function (a) {
			this._allowStationMove =
				a;
			this._allFlowsChanged = !0;
			this.invalidateProperties();
			this.invalidateDisplay()
		},
		setShowPieChartIcons : function (a) {
			this._showPieChartIcons = a;
			this._allFlowsChanged = !0;
			this.invalidateProperties();
			this.invalidateDisplay()
		},
		getShowPieChartIcons : function () {
			return this._showPieChartIcons
		},
		getAllowStationMove : function () {
			return this._allowStationMove
		},
		setGroupAttribute : function (a) {
			this._groupAttribute = a;
			this._stationsChanged = !0;
			this.dispatchEvent(new gav.events.PropertyChangeEvent("groupAttribute", null, a));
			this.invalidateProperties();
			this.invalidateDisplay()
		},
		getGroupAttribute : function () {
			return this._groupAttribute
		},
		setWidthAttribute : function (a) {
			this._widthAttribute = a;
			this._indicatorsChanged = !0;
			this.dispatchEvent(new gav.events.PropertyChangeEvent("widthAttribute", null, a));
			this.invalidateProperties();
			this.invalidateDisplay()
		},
		getWidthAttribute : function () {
			return this._widthAttribute
		},
		addStation : function (a) {
			this._stationAttributes || (this._stationAttributes = []);
			this._stationAttributes.push(a);
			this._stationsChanged =
				!0;
			this.invalidateProperties()
		},
		removeStation : function () {},
		setConfig : function (a, c) {
			l.call(this);
			this._widthAttribute = c;
			this._stationSettings = [];
			for (var h, b = 0; b < a.length; b++) {
				h = a[b];
				if (null == h.type || "" == h.type)
					h.type = "default";
				this._stationSettings.push(h);
				this._stationAttributes.push(h.attributes)
			}
			for (b = 0; b < this._stationSettings.length; b++) {
				h = this._stationSettings[b].attributes;
				for (var e = 0; e < h.length; e++)
					this._stationAttributeArray.push(h[e])
			}
			this.dispatchEvent(new gav.events.PropertyChangeEvent("selectedIndicators"));
			this.dispatchEvent(new gav.events.PropertyChangeEvent("groupAttribute"));
			this.dispatchEvent(new gav.events.PropertyChangeEvent("widthAttribute"));
			this._stationsChanged = !0;
			this.invalidateProperties()
		},
		setSelectedIndicators : function (a) {
			this._stations = [];
			this._nonGroupStations = [];
			this._groupStations = [];
			this._conservations = {
				hubs : [],
				values : [],
				indices : []
			};
			this._stationAttributes = a;
			for (var c, h = 0; h < a.length; h++) {
				c = a[h];
				for (var b = 0; b < c.length; b++)
					this._stationAttributeArray.push(c[b])
			}
			this.dispatchEvent(new gav.events.PropertyChangeEvent("selectedIndicators",
					null, a));
			this._stationsChanged = !0;
			this.invalidateProperties();
			this.invalidateDisplay()
		},
		getConfigIndicators : function () {
			return this._stationAttributes
		},
		getSelectedIndicators : function () {
			return this._stationAttributeArray
		},
		setDataSet : function (a) {
			l.call(this);
			this._dataSet = a;
			this._pieChart.setDataSet(a);
			this._dataSet && (this.dispatchEvent(new gav.events.PropertyChangeEvent("dataSet", null, a)), this._dataCube = this._dataSet.getDataCube(), this._updateOnDataSetChange())
		},
		getDataSet : function () {
			return this._dataSet
		},
		setColorMap : function (a) {
			this._colorMap && (this._colorMap.removeEventListener("colorMapChanged", this._onColorMapChange, this), this._globalColors = null);
			this._colorMap = a;
			this._pieChart.setColorMap(a);
			this._colorMap && (this._colorMap.addEventListener("colorMapChanged", this._onColorMapChange, this), "getGlobalRecordColors" in this._colorMap && (this._globalColors = this._colorMap.getGlobalRecordColors()));
			this._colorMapChanged = !0;
			this.invalidateProperties();
			this.invalidateDisplay()
		},
		getColorMap : function () {
			return this._colorMap
		},
		setAnimationController : function (a) {
			this._animationController !== a && (this._animationController && (this._animationController.removeEventListener("sliceExplicitlyChanged", this._onSliceExplicitlyChanged, this), this._animationController.removeEventListener("progressChanged", this._onProgressChanged, this)), this._animationController = a, this._pieChart.setAnimationController(a), this._animationController && (this._animationController.addEventListener("sliceExplicitlyChanged", this._onSliceExplicitlyChanged, this), this._animationController.addEventListener("progressChanged",
						this._onProgressChanged, this)))
		},
		setFormatter : function (a) {
			this._formatter = a
		},
		getFormatter : function () {
			return this._formatter || this._defaultFormatter
		},
		setSlice : function (a) {
			this._slice !== a && (this._slice = this._floatingSlice = a, this._sliceChanged = !0)
		},
		getSlice : function () {
			return this._slice
		},
		getNumSlices : function () {
			return this._dataCube ? this._dataCube.getNumSlices() : 0
		},
		setSelectionList : function (a) {
			this._selectionList !== a && (this._selectionList && this._selectionList.removeEventListener("selectionChanged", this._onSelectionChange,
					this), (this._selectionList = a) && this._selectionList.addEventListener("selectionChanged", this._onSelectionChange, this))
		},
		_onSelectionChange : function () {
			this._flowsNeedingUpdate = this._flowsNeedingUpdate.concat(this._selectedFlows);
			this._flowsNeedingUpdate = this._flowsNeedingUpdate.concat(this._selectionList.getSelectedRecords());
			this._flowAppearanceChanged = !0;
			this.invalidateProperties();
			this.invalidateDisplay()
		},
		setVisibilityList : function (a) {
			this._visibilityList !== a && (this._visibilityList && this._visibilityList.removeEventListener(gav.events.VisibilityEvent.VISIBILITY_CHANGED,
					this._onVisibilityListChange, this), (this._visibilityList = a) && this._visibilityList.addEventListener(gav.events.VisibilityEvent.VISIBILITY_CHANGED, this._onVisibilityListChange, this), this._visiblityListChanged = !0)
		},
		getVisibilityList : function () {
			return this._visibilityList
		},
		_onVisibilityListChange : function () {
			for (var a, c = 0; c < this._flowItems.length; c++)
				a = this._flowItems[c].getIndex(), this._visibilityList && !this._visibilityList.isVisible(a) ? this._flowItems[c].setVisible(!1) : this._flowItems[c].setVisible(!0);
			this.invalidateDisplay()
		},
		_onColorMapChange : function () {
			this._colorMapChanged = !0;
			this.invalidateProperties();
			this.invalidateDisplay()
		},
		_updateOnDataSetChange : function () {
			this._dataSetChanged = !0;
			this.invalidateProperties();
			this.invalidateDisplay()
		},
		_onProgressChanged : function () {
			if (this._dataSet) {
				var a = this._dataSet.getDataCube().getNumSlices();
				this._floatingSlice = this._animationController.getProgress() * (a - 1);
				this._floatingSliceChanged = this._inAnimationMode = !0;
				this._slice = Math.floor(this._floatingSlice);
				this.invalidateProperties();
				this.invalidateDisplay()
			}
		},
		_onSliceExplicitlyChanged : function () {
			this._inAnimationMode = !1;
			this.setSlice(this._animationController.getSlice());
			this.invalidateProperties();
			this.invalidateDisplay()
		},
		setFlowSlope : function (a) {
			a != this._flowSlope && (this._flowSlope = a, this._allFlowsChanged = !0, this.invalidateProperties(), this.invalidateDisplay())
		},
		getFlowSlope : function () {
			return this._flowSlope
		},
		setFlowCurvature : function (a) {
			a != this._flowCurvature && (this._flowCurvature = a, this._allFlowsChanged =
					!0, this.invalidateProperties(), this.invalidateDisplay())
		},
		getFlowCurvature : function () {
			return this._flowCurvature
		},
		_updateSize : function () {
			gav.components.Component.prototype._updateSize.call(this);
			this._sizeChanged = !0;
			this.invalidateProperties();
			this.invalidateDisplay()
		},
		_updateDisplay : function () {
			this._plotWidth = this._flowCanvas.width;
			this._plotHeight = this._flowCanvas.height;
			this._redrawFlow && (this._redrawFlow = !1);
			h.apply(this, [this._flowCanvas]);
			if (this._dataSet && this._sortedIndices) {
				var a = this._flowCanvas.getContext("2d");
				a.lineWidth = 1;
				var c = this._stations,
				b,
				e,
				l = this._selectedFlows;
				if (this._shouldAnimate && !this._introPlaying)
					this._intro = setInterval(o, 50), this._introPlaying = !0;
				else if (!this._shouldAnimate)
					for (var d = 0; d < c.length; d++) {
						b = c[d];
						m = b.getStartFlows();
						b.draw(a, this._formatter);
						e = b.getHubs();
						m = m.sort(function (a, c) {
								return a.getDoubleJointed() != c.getDoubleJointed() ? a.getDoubleJointed() ? 1 : -1 : a.getValue() < c.getValue() ? 1 : -1
							});
						for (var f = 0; f < m.length; f++)
							0 < m[f].getValue() && m[f].draw(a, this._formatter, "default" == b.getDisplayType() ||
								"labelAtEnd" == m[f].getDisplayType() && "default" == c[d + 1].getDisplayType());
						for (b = 0; b < e.length; b++)
							n = e[b], n.getDimensions(), 0 < n.getFlows().length && !(1.0E-4 > Math.abs(n.getInValue()) && 1.0E-4 > Math.abs(n.getOutValue())) && n.draw(a, this._formatter, this._allowStationMove, !0, this._showPieChartIcons ? this._pieIcon : null);
						for (b = 0; b < l.length; b++)
							this._flowItems[l[b]].draw(a, this._formatter, !0)
					}
			}
		},
		getIsIntroRunning : function () {
			return this._introPlaying
		},
		pauseIntro : function (a) {
			a ? (clearInterval(this._intro), this._introPlaying =
					!1) : (this._introPlaying = !0, this._intro = setInterval(o, 100))
		},
		_updateProperties : function () {
			if (this._dataSet && this._dataSet._classCube) {
				if (this._sizeChanged || this._dataSetChanged)
					this._oldDimensions = {
						w : this._flowCanvas.width,
						h : this._flowCanvas.height
					},
				this._flowCanvas.width = this.getWidth(),
				this._flowCanvas.height = this.getHeight(),
				this._flowWidthMultiplier = this._flowCanvas.height / 2.5;
				var c = [],
				h = !1,
				l = !1;
				if (this._dataSetChanged || this._colorMapChanged || this._stationsChanged || this._indicatorsChanged || this._allFlowsChanged ||
					this._floatingSliceChanged || this._sizeChanged)
					h = !0;
				if (this._dataSetChanged || this._colorMapChanged || this._indicatorsChanged || this._flowAppearanceChanged || this._allFlowsChanged || this._stationsChanged || this._floatingSliceChanged || this._sizeChanged)
					l = !0;
				if (this._dataSetChanged || this._stationsChanged) {
					this._stations = [];
					this._nonGroupStations = [];
					this._groupStations = [];
					this._conservations = {
						hubs : [],
						values : [],
						indices : []
					};
					for (var c = this._stationSettings, f = 0; f < c.length; f++)
						i.apply(this, [c[f]]);
					w = this;
					this._flowItems =
						[];
					this._selectedFlows = [];
					var j,
					o,
					k,
					m = [],
					m = [],
					c = this._dataSet.getClassCube(),
					f = this._stations,
					n = this._nonGroupStations,
					s,
					q,
					u,
					v,
					t;
					this._selectedIndicators = [];
					if (this._dataCube)
						for (var p = 0; p < this._dataCube.getNumRecords(); p++) {
							t = j = !1;
							for (var m = [], r = 0; r < c.getNumAttributes(); r++)
								m.push(c.getValue(p, r, 0));
							s = m.concat();
							s.splice(this._widthAttribute, 1);
							for (v = r = 0; v < s.length; v++)
								"" != s[v] && r++;
							s = r;
							if (1 < s)
								for (v = 0; v < n.length; v++) {
									s = n[v];
									u = s.getOutAttribute();
									if ("" != m[u]) {
										o = s.getHubs()[b.apply(this, [c.getCategoricalValueIndexOfItem(p,
															u, 0), c.getCategoricalValues(u)])];
										j = !0;
										for (s = v + 1; s < n.length; s++)
											if (q = n[s], u = q.getAttribute(), "" != m[u]) {
												k = q.getHubs()[b.apply(this, [c.getCategoricalValueIndexOfItem(p, u, 0), c.getCategoricalValues(u)])];
												t = !0;
												break
											}
									}
									j && t && (j = new gav.components.sankeyDiagram.SankeyFlowLine, j.setIndex(p), j.setDisplayType(1 == o.getDisplayType() || 2 == o.getDisplayType() ? "labelAtEnd" : "labelAtStart"), o.getDirection() != k.getDirection() && j.setDoubleJointed(!1), o.addFlow(j, "start"), k.addFlow(j, "end"), this._flowItems.push(j), t = j =
											!1)
								}
							else if (1 == s)
								for (r = 0; r < f.length; r++)
									if (s = f[r], m = s.getHubs(), u = s.getOutAttribute(), v = c.getCategoricalValueIndexOfItem(p, u, 0), v = b.apply(this, [v, c.getCategoricalValues(u)]), -1 < v && void 0 != m[v])
										if (o = m[v], !j && r == f.length - 1)
											break;
										else {
											j = !0;
											for (v = r + 1; v < f.length && !(q = f[v], "group" == q.getDisplayType() && "group" == s.getDisplayType()); v++)
												if (m = q.getHubs(), u = q.getAttribute(), q = c.getCategoricalValueIndexOfItem(p, u, 0), u = b.apply(this, [q, c.getCategoricalValues(u)]), -1 < u) {
													k = m[u];
													t = !0;
													break
												}
											if (j && t) {
												j = new gav.components.sankeyDiagram.SankeyFlowLine;
												j.setIndex(p);
												j.setDisplayType(1 == o.getDisplayType() ? "labelAtEnd" : "labelAtStart");
												o.getDirection() != k.getDirection() && j.setDoubleJointed(!1);
												o.addFlow(j, "start");
												k.addFlow(j, "end");
												this._flowItems.push(j);
												break
											}
										}
						}
					p = this._groupStations;
					if (1 < p.length) {
						j = p[0].getHubs().length;
						for (n = 0; n < p.length - 1; n++)
							for (f = 0; f < j; f++)
								o = p[n].getHubs()[f], k = p[n + 1].getHubs()[f], c = new gav.components.sankeyDiagram.SankeyFlowLine, c.setIndex(-1), c.setDisplayType("noLabel"), o.getDirection() != k.getDirection() && c.setDoubleJointed(!1),
								o.addFlow(c, "start"), k.addFlow(c, "end"), this._flowItems.push(c), this._conservations.values.push(o.getNetValue()), this._conservations.indices.push(this._flowItems.length - 1), this._conservations.hubs.push(o)
					}
					a.call(this, !0);
					this._allRecordIndices = gav.utils.ArrayHelper.range(0, this._dataCube.getNumRecords());
					this._popupShown && $(this._popUp).dialog("close")
				}
				if (this._dataSetChanged || this._indicatorsChanged) {
					AA = this._Indicator;
					BB = this._dataCube.getNumSlices();
					o = this._dataCube.getNumRecords();
					for (CC = this._currentSum = 0; CC < BB -1 ; CC++){
						for (k = this._currentSumLocal = 0; k < o; k++){
							this._currentSumLocal += this._dataCube.getValue(k,this._widthAttribute, CC)}
							if (this._currentSum < this._currentSumLocal ) { this._currentSum = this._currentSumLocal }}
				}
				c = this._dataSetChanged || this._indicatorsChanged || this._colorMapChanged || this._allFlowsChanged || this._stationsChanged || this._floatingSliceChanged || this._sizeChanged ? this._allRecordIndices : this._flowsNeedingUpdate;
				0 < c.length && g.call(this, c, l, h);
				this._floatingSliceChanged && !this._dataSetChanged && this._$pop.is(":visible") && e.call(this, {
					recordInfo : this._secondarySelectionList.getSelectedRecords()
				});
				if (this._indicatorsChanged || this._floatingSliceChanged || this._colorMapChanged ||
					this._allFlowsChanged || this._stationsChanged || this._sizeChanged)
					d.apply(this, [h, l]), a.call(this);
				this._dataSetChanged && (d.apply(this, [h, l]), a.call(this, !0));
				this._sizeChanged = this._floatingSliceChanged = this._flowAppearanceChanged = this._stationsChanged = this._colorMapChanged = this._indicatorsChanged = this._dataSetChanged = this._allFlowsChanged = !1
			}
		},
		_getRelCoords : function (a) {
			var c = $(this._element).offset();
			return {
				x : gav.clamp(a.pageX - c.left, 1, this._plotWidth),
				y : gav.clamp(a.pageY - c.top, 1, this._plotHeight)
			}
		},
		_onMouseMove : function (a) {
			this._noMouseMove = !1;
			if (!this._isMouseDown && !this._introPlaying && this._dataCube) {
				var c = this._getRelCoords(a),
				h = !1,
				b = !1,
				e,
				l,
				d,
				f,
				j;
				d = null;
				var o,
				i,
				k;
				for (f = 0; f < this._stations.length; f++) {
					j = this._stations[f].getHubs();
					for (var g = 0; g < j.length; g++) {
						o = j[g];
						i = o.getBoundingPrimitives();
						for (l = 0; l < i.length; l++) {
							k = i[l];
							if (c.x > k.x - 5 && c.x < k.x + k.w + 2 && c.y > k.y - 5 && c.y < k.y + k.h + 2) {
								d = {
									idx : o.getIndex(),
									stationIdx : f,
									mouseX : c.x - k.x,
									mouseY : c.y - k.y,
									hub : o
								};
								b = !0;
								break
							}
							if (!0 == b)
								break
						}
						if (!0 == b)
							break
					}
					if (!0 ==
						b)
						break
				}
				if (this._highlightedHub || d)
					if (g = this._highlightedHub ? this._highlightedHub.stationIdx : -1, l = d ? d.stationIdx : -1, g != l && (g = this._highlightedHub ? this._highlightedHub.idx : -1, l = d ? d.idx : -1, g != l)) {
						if (this._highlightedHub = d) {
							h = d.hub.getFlows();
							this._highlightedFlows = [];
							for (f = 0; f < h.length; f++)
								g = this._flowItems.indexOf(h[f]), this._highlightedFlows.push(g), this._flowsNeedingUpdate.push(g)
						} else
							this._flowsNeedingUpdate = this._flowsNeedingUpdate.concat(this._highlightedFlows), this._highlightedFlows = [];
						h = !0
					}
				if (!this._highlightedHub &&
					!this._highlightedStation)
					for (g = 0; g < this._flowItems.length; g++)
						if (b = g, this._flowItems[b] && (d = this._flowItems[b], !(1.0E-4 > d.getValue()))) {
							d.getIndex();
							d.getStartPosition();
							d.getEndPosition();
							f = d.getHighlight();
							j = !1;
							l = 0;
							for (o = d.getBoundingPrimities().length; l < o; ) {
								if (d.testPrimitive(l, c)) {
									j = f = !0;
									break
								}
								l++
							}
							l = this._highlightedFlows.indexOf(b);
							if (j && -1 == l) {
								if (0 < this._highlightedFlows.length && d.getFlowWidth() < this._flowItems[this._highlightedFlows[0]].getFlowWidth() && (this._flowsNeedingUpdate.push(this._highlightedFlows[0]),
										this._highlightedFlows.splice(0, 1)), 0 == this._highlightedFlows.length) {
									h = !0;
									this._highlightedFlows.push(b);
									this._flowsNeedingUpdate.push(b);
									break
								}
							} else !j && f && -1 != l && (h = !0, this._flowsNeedingUpdate.push(this._highlightedFlows[l]), this._highlightedFlows.splice(l, 1))
						}
				if (h)
					this._flowAppearanceChanged = !0, this.invalidateProperties(), this.invalidateDisplay(), e || (e = new gav.events.BrushEvent("itemOut")), this.dispatchEvent(e);
				else if (1 === this._highlightedFlows.length) {
					d = this._flowItems[this._highlightedFlows[0]];
					e = new gav.events.BrushEvent("itemOver");
					e.item = d.getIndex();
					if (0 > e.item) {
						var s;
						for (f = 0; f < this._groupStations.length; f++) {
							j = this._groupStations[f].getHubs();
							for (g = 0; g < j.length; g++)
								if (c = j[g].getStartFlows().indexOf(d), -1 < c) {
									s = j[g].getLabel();
									break
								}
							if (null != s)
								break
						}
						e.extraRows = [{
								text : this._dataSet.getIndicatorInformation()[this._widthAttribute].name,
								value : this._formatter.getNumberFormatter().getFormattedValue(d.getValue())
							}, {
								text : this._dataSet.getCategoricalIndicatorInformation()[this._groupAttribute].name,
								value : s
							}
						]
					}
					e.e = a;
					this.dispatchEvent(e)
				}
			}
		},
		_onMouseDrag : function (a) {
			if (this._allowStationMove) {
				var c = this._stations;
				this._noMouseMove = !1;
				if (this._isMouseDown && (a = this._getRelCoords(a), null != this._highlightedHub)) {
					c = c[this._highlightedHub.stationIdx];
					c.getPosition();
					a = "vertical" == c.getDirection() ? a.y - this._highlightedHub.mouseY : a.x - this._highlightedHub.mouseX;
					c.setHubPosition(this._highlightedHub.idx, a);
					c = c.getPosition();
					this._stationPositions[this._highlightedHub.stationIdx] = {
						x : c.x / this._flowCanvas.width,
						y : c.y / this._flowCanvas.height
					};
					for (var c = this._stations, h, b, a = 0; a < c.length; a++) {
						h = c[a];
						h.getStartFlows();
						h = h.getHubs();
						for (var e = 0; e < h.length; e++)
							b = h[e], 1 < b.getFlows().length && b.sortFlows()
					}
					this._allFlowsChanged = !0;
					this.invalidateProperties();
					this.invalidateDisplay()
				}
			}
		},
		_onMouseDown : function (a) {
			this._shouldAnimate && (clearInterval(this._intro), w.dispatchEvent(new gav.events.GavEvent("introFinishedEvent")), this._shouldAnimate = this._introPlaying = !1);
			this._noMouseMove = this._isMouseDown = !0;
			this._mouseDownCoords =
				this._getRelCoords(a)
		},
		_onMouseUp : function (a) {
			if (this._isMouseDown) {
				this._popupShown && $(this._popUp).dialog("close");
				var h = this._getRelCoords(a);
				this._isMouseDown && 2 > Math.abs(h.x - this._mouseDownCoords.x) && 2 > Math.abs(h.y - this._mouseDownCoords.y) && (this._noMouseMove = !0);
				h = this._isMouseDown = !1;
				if (this._noMouseMove) {
					if (this._highlightedHub && (0 == this._highlightedHub.hub.getDisplayType() || 2 == this._highlightedHub.hub.getDisplayType())) {
						var b = this._highlightedHub.hub.getHubInfo();
						void 0 != b && 1 < b.recordInfo.length &&
						c.apply(this, [a, b])
					}
					if (0 === this._highlightedFlows.length)
						this._flowsNeedingUpdate = this._flowsNeedingUpdate.concat(this._selectedFlows), this._selectedFlows = [], h = !0;
					else if (a.ctrlKey)
						for (a = 0; a < this._highlightedFlows.length; a++)
							 - 1 === this._selectedFlows.indexOf(this._highlightedFlows[a]) ? this._selectedFlows.push(this._highlightedFlows[a]) : this._selectedFlows.splice(this._selectedFlows.indexOf(this._highlightedFlows[a]), 1), this._flowsNeedingUpdate.push(this._highlightedFlows[a]), h = !0;
					else {
						this._flowsNeedingUpdate =
							this._flowsNeedingUpdate.concat(this._selectedFlows);
						this._selectedFlows = [];
						for (a = 0; a < this._highlightedFlows.length; a++)
							this._selectedFlows.push(this._highlightedFlows[a]), this._flowsNeedingUpdate.push(this._highlightedFlows[a]), h = !0
					}
					if (h) {
						h = [];
						for (a = 0; a < this._selectedFlows.length; a++)
							 - 1 < this._selectedFlows[a] && this._selectedFlows[a] < this._dataCube.getNumRecords() && h.push(this._flowItems[this._selectedFlows[a]].getIndex());
						this.invalidateProperties();
						this.invalidateDisplay();
						a = gav.events.PickedEvent;
						this.dispatchEvent(new a(h, a.REPLACE))
					}
				}
			}
		}
	});
	gav.components;
	var u,
	q,
	n,
	m,
	r,
	t = 0,
	p = 0,
	x = 0,
	B = !0,
	C = !1,
	G = !1,
	w,
	E = !1,
	H = !1,
	z = document.createElement("span"),
	A = document.createElement("span"),
	y = document.createElement("span");
	$(document).ready(function () {
		z = $(z).addClass("stock-label").appendTo(document.body).hide();
		A = $(A).addClass("stat-label").appendTo(document.body).hide();
		y = $(y).addClass("default-station-label").appendTo(document.body).hide()
	});
	var D = 0,
	I
})();
(function () {
	function f(a, c) {
		var b = this._direction,
		l;
		l = this.getHubDistances()[c];
		"horizontal" == b ? this._dimensions[0] = this._dimensions[0] + a.getDimensions()[0] + l : this._dimensions[1] = this._dimensions[1] + a.getDimensions()[1] + l
	}
	function d(a, c) {
		var b = [0, 0],
		l = this._hubs,
		d;
		d = this.getHubDistances()[c];
		for (var f, g = 0; g < c; g++)
			f = l[g], 0 < f.getFlows().length && (f = f.getDimensions(), b[0] += f[0] + this._hubDistances[g], b[1] += f[1] + this._hubDistances[g]);
		"vertical" == this._direction ? (a.setPosition(this._position.x, this._position.y +
				b[1] + d), a.setDirection("horizontal")) : (a.setPosition(this._position.x + b[0] + d, this._position.y), a.setDirection("vertical"))
	}
	function g(a, c) {
		var b = 1;
		if ("horizontal" == this._direction) {
			var b = this._hubs[0],
			d = b.getStartFlows();
			b = 0 < d.length ? (b = d[0]) && b.getStartPosition().y < b.getEndPosition().y ? -1 : 1 : (b = b.getEndFlows()[0]) && b.getEndPosition().y < b.getStartPosition().y ? -1 : 1
		}
		var d = this._position,
		f = 0,
		j = -40;
		a.textAlign = "center";
		a.font = this._labelStyle;
		a.fillStyle = "#333";
		"horizontal" == this._direction && (f = this._dimensions[0] /
				2, j = 30);
		a.fillText(this._label, d.x + f, d.y + j * b);
		a.font = "normal 500 11px/1 Arial, sans-serif";
		a.fillStyle = "#444";
		"true" == this._showAccumulatedInValue && a.fillText("(" + c.getNumberFormatter().getFormattedValue(this._inValue) + " " + c.getAttributeUnit(this._indicator) + ")", d.x + f, d.y + j / 1.5 * b);
		"true" == this._showAccumulatedOutValue && a.fillText("(" + c.getNumberFormatter().getFormattedValue(this._outValue) + " " + c.getAttributeUnit(this._indicator) + ")", d.x + f, d.y + j / 1.5 * b)
	}
	function i(a, c) {
		if (!(this._hubs.length < a || this._hubs.length <
				c)) {
			var b = this._hubs[a],
			d = this._hubs[c],
			f = b.getPosition();
			d.getPosition();
			var j = d.getDimensions();
			d.setPosition(f.x, f.y);
			b.setPosition(f.x + j[0], f.y + j[1]);
			this._hubs[a] = d;
			this._hubs[c] = b;
			0 == a && (this._hubDistances[a] = 0)
		}
	}
	function k() {
		var a = 0;
		this._flows = [];
		for (var c, b = 0; b < this._hubs.length; b++) {
			c = this._hubs[b].getFlows();
			for (var a = a + c.length, d = 0; d < c.length; d++)
				this._flows.push(c[d])
		}
		this._numberOfFlows = a
	}
	function b() {
		for (var a, c = 0; c < this._hubs.length; c++)
			a = this._hubs[c], a.removeEventListener("numberOfFlowsChanged",
				k, this);
		this._hubs = [];
		this._flows = []
	}
	function a(a, c, b, d) {
		return 0 <= a && this._hubs[c] && void 0 != this._hubDistances[c] && (b = this._hubDistances[c] - b, 0 > b) ? -b > this._hubs[d ? a : c].getDimensions()["vertical" == this._direction ? 1 : 0] / 2 ? "swap" : "return" : "continue"
	}
	gav.Klass("gav.components.sankeyDiagram.SankeyFlowStation", {
		init : function () {
			this._hubs = [];
			this._label = "Flow Station";
			this._direction = "vertical";
			this._position = {
				x : 0,
				y : 0
			};
			this._dimensions = [0, 0];
			this._hubDistances = [0];
			this._defaultHubDistance = 0.03;
			this._highlighted =
				!1;
			this._attributeMode = "default";
			this._minDim = 10;
			this._flows = [];
			this._inValue = this._outValue = this._numberOfFlows = 0;
			this._labelStyle = "normal 900 14px/1 Arial, sans-serif"
		},
		setLabelStyle : function (a) {
			this._labelStyle = a
		},
		setHubPosition : function (b, c) {
			for (var e, d = 0; d < this._hubs.length; d++)
				if (this._hubs[d].getIndex() == b) {
					e = this._hubs[d];
					b = d;
					break
				}
			if (e) {
				var d = this._hubs,
				f = "vertical" == this._direction ? c - e.getPosition().y : c - e.getPosition().x;
				if (1 != e.getDisplayType() && 2 != e.getDisplayType()) {
					var j = 0;
					if (b < this._hubDistances.length) {
						e =
							a.apply(this, [b, b + 1, f, !1]);
						if ("swap" == e) {
							for (; "swap" == e; )
								i.apply(this, [b + j, b + 1 + j]), e = this._hubs[b + 1 + j], "vertical" == this._direction ? e.setPosition(e.getPosition().x, e.getPosition().y + this._hubDistances[b + 1 + j]) : e.setPosition(e.getPosition().x + this._hubDistances[b + 1 + j], e.getPosition().y), j++, f = "vertical" == this._direction ? c - e.getPosition().y : c - e.getPosition().x, e = a.apply(this, [b + j, b + 1 + j, f, !1]);
							return
						}
						if ("return" == e)
							return
					}
					j = 0;
					if (0 < b) {
						e = a.apply(this, [b - 1, b, -f, !0]);
						if ("swap" == e) {
							for (; "swap" == e; )
								i.apply(this,
									[b - 1 - j, b - j]), j++, e = a.apply(this, [b - 1 - j, b - j, -f, !0]);
							return
						}
						if ("return" == e)
							return
					}
				}
				0 == b ? ("vertical" == this._direction ? this._position = {
						x : this._position.x,
						y : c
					}
					 : this._position = {
						x : c,
						y : this._position.y
					}, "vertical" == this._direction ? d[b].setPosition(this._position.x, c) : d[b].setPosition(c, this._position.y), void 0 != this._hubDistances[b + 1] && 0 < this._hubDistances[b + 1] - f && (this._hubDistances[b + 1] -= f)) : ("vertical" == this._direction ? d[b].setPosition(this._position.x, c) : d[b].setPosition(c, this._position.y), this._hubDistances[b] +=
					f, void 0 != this._hubDistances[b + 1] && (this._hubDistances[b + 1] -= f))
			}
		},
		setHubDistances : function (a) {
			this._hubDistances = a;
			for (0 == this._hubDistances.length && 0 < this._hubs.length && this._hubDistances.push(0); this._hubDistances.length < this._hubs.length; )
				this._hubDistances.push(this._defaultHubDistance);
			this._updateHubs = this._updatePositions = !0;
			this.invalidateProperties()
		},
		getHubDistances : function () {
			for (0 == this._hubDistances.length && 0 < this._hubs.length && this._hubDistances.push(0); this._hubDistances.length < this._hubs.length; )
				this._hubDistances.push(this._defaultHubDistance);
			return this._hubDistances
		},
		setDefaultHubDistance : function (a) {
			this._defaultHubDistance = a
		},
		getDefaultHubDistance : function () {
			return this._defaultHubDistance
		},
		updatePositions : function () {
			this._updatePositions = !0;
			this.invalidateProperties()
		},
		setDisplayType : function (a) {
			this._displayType = a
		},
		getDisplayType : function () {
			return this._displayType
		},
		setShowAccumulatedInValue : function (a) {
			this._showAccumulatedInValue = a
		},
		getShowAccumulatedInValue : function () {
			return this._showAccumulatedInValue
		},
		setShowAccumulatedOutValue : function (a) {
			this._showAccumulatedOutValue =
				a
		},
		getShowAccumulatedOutValue : function () {
			return this._showAccumulatedOutValue
		},
		setLabel : function (a) {
			this._label = a
		},
		getLabel : function () {
			return this._label
		},
		getFlows : function () {
			return this._flows
		},
		getStartFlows : function () {
			for (var a = [], c = [], b = 0; b < this._hubs.length; b++)
				c = this._hubs[b].getStartFlows(), a = a.concat(c);
			return this._startFlows = a
		},
		setIndicator : function (a) {
			this._indicator = a
		},
		getIndicator : function () {
			return this._indicator
		},
		setAttribute : function (a) {
			this._hubAttribute = a;
			"default" == this._attributeMode &&
			(this._outAttribute = a)
		},
		getAttribute : function () {
			return this._hubAttribute
		},
		setOutAttribute : function (a) {
			this._outAttribute = a;
			this._attributeMode = this._hubAttribute != this._outAttribute ? "transformation" : "default"
		},
		getOutAttribute : function () {
			return this._outAttribute
		},
		setHighlight : function (a) {
			this._highlighted = a
		},
		getHighlight : function () {
			return this._highlighted
		},
		setDirection : function (a) {
			this._direction = a;
			this._updatePositions = !0;
			this.invalidateProperties()
		},
		getDirection : function () {
			return this._direction
		},
		getDimensions : function () {
			return this._dimensions
		},
		setPosition : function (a, c) {
			this._position = {
				x : a,
				y : c
			};
			this._updateHubs = this._updatePositions = !0;
			this.invalidateProperties()
		},
		getPosition : function () {
			return this._position
		},
		setHubs : function (a) {
			b();
			this._hubs = a;
			for (var c = 0; c < a.length; c++)
				a[c].setDirection(this._direction);
			this._updateHubs = !0;
			this.invalidateProperties()
		},
		getHubs : function () {
			return this._hubs
		},
		addHub : function (a) {
			this._hubs.push(a);
			a.addEventListener("numberOfFlowsChanged", k, this);
			a.setDirection(this._direction);
			this._updateHubs = !0;
			this.invalidateProperties()
		},
		draw : function (a, c) {
			this._highlighted ? a.fillStyle = "#999" : (a.strokeStyle = "#eee", a.fillStyle = "#eee");
			"group" != this._displayType && "transformation" != this._displayType && 0 < this._numberOfHubs && g.apply(this, [a, c])
		},
		invalidateProperties : function () {
			if (this._updatePositions)
				for (var a = this._hubs, c = 0; c < a.length; c++)
					d.apply(this, [a[c], c]);
			if (this._updateHubs) {
				a = this._hubs;
				this._dimensions = [0, 0];
				for (c = 0; c < a.length; c++)
					this._numberOfHubs = c + 1, 0 < a[c].getFlows().length &&
					f.apply(this, [a[c], c]);
				this._dimensions = [Math.max(this._dimensions[0], this._minDim), Math.max(this._dimensions[1], this._minDim)]
			}
			this._updateHubs = this._updatePositions = !1
		},
		updateStation : function () {
			for (var a = this._hubs, c = this._inValue = this._outValue = 0; c < a.length; c++)
				this._outValue += a[c].getOutValue(), this._inValue += a[c].getInValue()
		},
		generateHubDistances : function () {
			var a,
			c,
			b,
			d,
			f,
			j = 0,
			g = [],
			i,
			k,
			n,
			m,
			r,
			t = "vertical" == this.getDirection();
			for (a = 0; a < this._hubs.length; a++) {
				b = this._hubs[a].getEndFlows();
				k = f = 0;
				r = [];
				i = t ? this._hubs[a].getDimensions()[1] : this._hubs[a].getDimensions()[0];
				for (c = n = 0; c < b.length; c++)
					d = b[c], m = d.getFlowWidth(), k += m, n += m, d.getDoubleJointed() ? r.push({
						dist : t ? d.getStartPosition().y : d.getStartPosition().x,
						width : d.getFlowWidth()
					}) : n -= d.getFlowWidth();
				for (c = 0; c < r.length; c++)
					f = 0 < n ? f + r[c].dist * r[c].width / n : f + 1 * r[c].dist / r.length;
				f = 0 < r.length ? f - j - k / 2 : 0;
				g.push(f);
				j += f + i
			}
			this.setHubDistances(g)
		}
	});
	gav.components.sankeyDiagram
})();
(function () {
	function f(a, b) {
		if (!a)
			return null;
		for (var c, e = Array(a.length), f = Array(a.length), g = Array(a.length), j = 0; j < a.length; j++)
			c = a[j], c = b ? c.getEndPosition() : c.getStartPosition(), e[j] = c.x - this._position.x, f[j] = c.y - this._position.y;
		e = "horizontal" == this._direction ? d.call(this, f, e, !0) : d.call(this, e, f, !1);
		for (j = 0; j < e.length; j++)
			g[j] = a[e[j]];
		return g
	}
	function d(a, b, c) {
		for (var e = a.length, d = Array(e), f = this, j = 0, g = 0; g < e; g++)
			d[j] = [g, a[g], b[g]], j++;
		d = d.sort(function (a, b) {
				return a[1] > b[1] ? 1 : a[1] == b[1] ? (a[2] >
					b[2] ? 1 : -1) * (c && 0 < a[1] ? -1 : 1) * f._invert : -1
			});
		a = Array(j);
		for (g = 0; g < j; g++)
			a[g] = d[g][0];
		return a
	}
	function g(a, b) {
		if (a.getVisible()) {
			var c = this._direction,
			e = a.getFlowWidth(),
			d = e + this._distance;
			"start" == this._flowsStartOrEnd[b] ? (this._netValue -= a.getValue(), 1.0E-4 > e || ("horizontal" == c ? this._dimensions[1] += d : this._dimensions[0] += d)) : (this._value += a.getValue(), this._netValue += a.getValue(), 1.0E-4 > e || ("horizontal" == c ? this._dimensions[3] += d : this._dimensions[2] += d))
		}
	}
	function i(a, b) {
		for (var c = 0, e = this._flowsStartOrEnd,
			d = 0; d < b; d++)
			e[d] == e[b] && (c += this._flows[d].getFlowWidth() + this._distance);
		c = "horizontal" == this._direction ? [this._position.x, this._position.y + c + a.getFlowWidth() / 2] : [this._position.x + c + a.getFlowWidth() / 2, this._position.y];
		"start" == e[b] ? (a.setStartPosition(c[0] + this._dimensions[0] / 2, c[1]), a.setDirection(this._direction)) : a.setEndPosition(c[0] - this._dimensions[0] / 2, c[1]);
		a.updateFlow()
	}
	function k() {
		for (var a = this._flows, b = 0; b < a.length; b++)
			i.apply(this, [a[b], b])
	}
	function b(a, b) {
		var c = this._position,
		e,
		d;
		a.fillStyle = "#666";
		a.textAlign = "center";
		e = this._color;
		"both" == this._type && e.isDark() && (a.fillStyle = "#eee");
		"horizontal" == this._direction ? (e = 10, d = this.getDimensions()[1] / 2, "end" == this._type ? (a.textAlign = "left", e = -e) : "both" == this._type && (a.textAlign = "center", e = 0)) : (e = 0, d = -10, a.textAlign = "center", "end" == this._type ? d = -d : "both" == this._type && (d = 0));
		a.fillText(b.getNumberFormatter().getFormattedValue(this._value), c.x - e, c.y + d)
	}
	gav.Klass("gav.components.sankeyDiagram.SankeyFlowHub", {
		extend : gav.events.EventDispatcher,
		init : function () {
			gav.events.EventDispatcher.prototype.init.call(this);
			this._flows = [];
			this._label = "Flow Hub";
			this._outValue = this._inValue = this._netValue = this._value = 0;
			this._dimensions = [0, 0, 0, 0];
			this._position = {
				x : 0,
				y : 0
			};
			this._direction = "horizontal";
			this._distance = 0;
			this._flowsStartOrEnd = [];
			this._startFlows = [];
			this._endFlows = [];
			this._selected = !1;
			this._type = null;
			this._displayType = "";
			this._color = new gav.utils.Color("#eee");
			this._transformColor = new gav.utils.Color("#ADD8E6");
			this._lightColor = new gav.utils.Color("#ddd");
			this._boundingRect = this._drawRect = null;
			this._labelDim = {
				width : 0
			};
			this._numberFormatter;
			this._labelStyle = "normal 600 10px/1 Arial, sans-serif";
			this._numberOfFlowsChanged = !1
		},
		getNetValue : function () {
			return this._netValue
		},
		getInValue : function () {
			return this._inValue
		},
		getOutValue : function () {
			return this._outValue
		},
		setSelected : function (a) {
			this._selected = a
		},
		getSelected : function () {
			return this._selected
		},
		setHighlight : function (a) {
			this._highlighted = a
		},
		getHighlight : function () {
			return this._highlighted
		},
		setDisplayType : function (a) {
			if (0 ==
				a.toString().search(/^-?[0-9]+$/))
				this._displayType = a;
			else
				switch (a) {
				case "default":
					this._displayType = 0;
					break;
				case "group":
					this._displayType = 1;
					break;
				case "transformation":
					this._displayType = 2;
					break;
				case "stock":
					this._displayType = 3;
					break;
				case "stat":
					this._displayType = 4
				}
		},
		getDisplayType : function () {
			return this._displayType
		},
		setColor : function (a) {
			this._lightColor = new gav.utils.Color(a);
			a = gav.utils.Color.toHSL(this._lightColor);
			a = a.substring(4, a.length - 1).split(",");
			this._color = new gav.utils.Color("hsl(" +
					[a[0], a[1], Number(a[2]) - 20].join() + ")")
		},
		getColor : function () {
			return this._lightColor
		},
		setLabel : function (a, b) {
			this._label = a;
			b.font = this._labelStyle;
			this._labelDim = b.measureText(a)
		},
		getLabel : function () {
			return this._label
		},
		setLabelStyle : function (a) {
			this._labelStyle = a
		},
		setPosition : function (a, b) {
			this._position = {
				x : a,
				y : b
			};
			this._updatePositions = !0;
			this.invalidateProperties()
		},
		getPosition : function () {
			return this._position
		},
		getDimensions : function () {
			var a = this._dimensions,
			b = this._direction;
			return "horizontal" ==
			b && a[1] > a[3] || "vertical" == b && a[0] > a[2] ? a.slice(0, 2) : a.slice(2, 4)
		},
		setIndex : function (a) {
			this._index = a
		},
		getIndex : function () {
			return this._index
		},
		setDirection : function (a) {
			this._direction = a;
			this._updatePositions = !0;
			this.invalidateProperties()
		},
		getDirection : function () {
			return this._direction
		},
		setStation : function (a) {
			this._station = a
		},
		getStation : function () {
			return this._station
		},
		addFlow : function (a, b) {
			this._flows.push(a);
			this._flowsStartOrEnd.push(b);
			"both" != this._type && this._type != b && (this._type = this._type ?
					"both" : b);
			g.apply(this, [a, this._flows.length - 1]);
			"start" == b ? this._startFlows.push(a) : this._endFlows.push(a)
		},
		removeFlow : function (a) {
			var b = this._flows.indexOf(a);
			this._flows.splice(b, 1);
			var c = this._flowsStartOrEnd[b];
			this._flowsStartOrEnd.splice(b, 1);
			"start" == c ? this._startFlows.splice(this._startFlows.indexOf(a)) : this._endFlows.splice(this._endFlows.indexOf(a))
		},
		setFlows : function (a, b) {
			this._flows = a;
			this._flowsStartOrEnd = Array(b.length);
			this._startFlows = [];
			this._endFlows = [];
			for (var c = 0; c < b.length; c++)
				this._flowsStartOrEnd[c] =
					b[c], "start" == b[c] ? this._startFlows = this._startFlows.concat(a[c]) : this._endFlows = this._endFlows.concat(a[c]), "both" != this._type && this._type != b[c] && (this._type = this._type ? "both" : b[c]);
			this._updatePositions = !0;
			this.invalidateProperties()
		},
		getFlows : function () {
			return this._flows
		},
		getStartFlows : function () {
			return this._startFlows
		},
		getEndFlows : function () {
			return this._endFlows
		},
		draw : function (a, d, c, e, f) {
			var g,
			j,
			i,
			k,
			q,
			n;
			a.font = this._labelStyle;
			if (!(-1 == this._displayType || 0 == this._flows.length)) {
				var m = this._drawRect;
				2 == this._displayType ? (a.fillStyle = this._transformColor.toRGB(), a.strokeStyle = a.fillStyle) : (a.fillStyle = this._highlighted ? this._color.toRGB() : this._lightColor.toRGB(), this._selected ? (a.fillStyle = this._color.toRGB(), a.strokeStyle = "#000") : a.strokeStyle = a.fillStyle);
				var r = this.getDimensions(),
				t = 0;
				if (!(1 == this._displayType && "horizontal" == this._direction && 0 >= m.h)) {
					a.beginPath();
					if (3 == this._displayType) {
						g = r[0] / 2;
						var p = 1 == this._invert ? !0 : !1,
						t = 10;
						j = 5;
						q = m.x + g;
						n = m.y - j;
						i = m.x + t + g;
						k = m.y + j;
						g = m.x - t + g;
						j = m.y + j;
						if (0 <=
							this._netValue && p || 0 > this._netValue && !p)
							k = n, n = j, j = k;
						a.moveTo(q, n);
						a.lineTo(i, k);
						a.lineTo(g, j);
						a.lineTo(q, n)
					} else
						4 == this._displayType ? (t = 10, j = 5, p = r[0] / 2, q = m.x + p, n = m.y - j, i = m.x + t + p, k = m.y, g = m.x + p, j = m.y + j, t = m.x - t + p, p = m.y, a.moveTo(q, n), a.lineTo(i, k), a.lineTo(g, j), a.lineTo(t, p), a.lineTo(q, n)) : 0 != this._displayType && a.rect(m.x + 0, m.y + 0, m.w, m.h);
					a.fill();
					if ((e || this._highlighted) && 1 == this._displayType && 10 < r[1] && 1 < this._startFlows.length && 1 < this._endFlows.length)
						b.apply(this, [a, d]);
					else if (2 == this._displayType ||
						0 == this._displayType) {
						d = this._position;
						a.fillStyle = "#555";
						a.textAlign = "right";
						2 == this._displayType ? (e = this._transformColor, a.fillStyle = "#333") : e = this._color;
						"both" == this._type && e.isDark() && (a.fillStyle = "#eee");
						"horizontal" == this._direction ? (e = -10, i = 2 == this._displayType ? Math.max(5, this.getDimensions()[1] / 2) : this.getDimensions()[1] / 2, "end" == this._type ? (a.textAlign = "left", e = -e) : "both" == this._type && (a.textAlign = "center", e = 0)) : (e = this.getDimensions()[0] / 2, i = 15 * this._invert, a.textAlign = "center", "end" ==
							this._type ? i = -i : "both" == this._type && (i = 0));
						a.textBaseline = "middle";
						k = this._label.split(/\\n/g);
						for (q = 0; q < k.length; q++)
							a.fillText(k[q], d.x + e, d.y + i + 10 * q)
					}
					c && 1 != this._displayType && (a.beginPath(), a.fillStyle = "#fafafa", a.strokeStyle = "#999", a.globalAlpha = 0.9, a.arc(m.x + m.w / 2, m.y + m.h / 2, 6, 0, 2 * Math.PI, !1), a.stroke(), a.fill(), a.globalAlpha = 1);
					null != f && (1 < this._startFlows.length || 1 < this._endFlows.length) && (0 == this._displayType || 2 == this._displayType) && a.drawImage(f, m.x + m.w / 2 - 8, m.y + m.h / 2 - 8);
					this.invalidateProperties()
				}
			}
		},
		getHubInfo : function () {
			return {
				recordInfo : this.getRecords(),
				label : this._label
			}
		},
		getRecords : function () {
			var a,
			b,
			c = [];
			b = "both" == this._type ? this._endFlows : "start" == this._type ? this._startFlows : this._endFlows;
			for (a = 0; a < b.length; a++)
				c.push(b[a].getIndex());
			return c
		},
		sortFlows : function () {
			var a = this._startFlows.concat(),
			b = this._endFlows.concat();
			this.setFlows([], []);
			if (0 < a.length)
				for (var c = f.apply(this, [a, !0]), a = 0; a < c.length; a++)
					this.addFlow(c[a], "start");
			if (0 < b.length) {
				b = f.apply(this, [b, !1]);
				for (a = 0; a < b.length; a++)
					this.addFlow(b[a],
						"end")
			}
		},
		invalidateProperties : function () {
			if (this._updatePositions) {
				k.call(this);
				this._dimensions = [0, 0, 0, 0];
				this._netValue = this._value = 0;
				var a = 0 < this._flows.length ? this._flows[0] : null;
				a && (this._invert = a && a.getStartPosition().y < a.getEndPosition().y ? -1 : 1);
				var b = [0, 0],
				c = a = 0,
				e = 0,
				d = 0;
				2 == this._displayType ? e = 0 : 3 == this._displayType ? e = 15 : "both" == this._type && (e = 15);
				if ("both" == this._type)
					if (1 == this._displayType) {
						if (1 < this._startFlows.length || 1 < this._endFlows.length)
							b = [20, 40]
					} else
						2 == this._displayType && (b = [Math.max(40,
									this._labelDim.width / 2 + 5), Math.max(80, this._labelDim.width + 10)]);
				else
					a = "start" == this._type ? this._labelDim.width : 0;
				c = b[1];
				this._dimensions = [c, 0, c, 0];
				b = this._flows;
				for (c = 0; c < b.length; c++)
					g.apply(this, [b[c], c]);
				c = this.getDimensions();
				c[0] = Math.max(c[0], 1);
				c[1] = Math.max(c[1], 1);
				"both" != this._type && "horizontal" == this._direction && (d = c[1] / 2 - 5);
				"horizontal" == this._direction ? (b = Math.max(c[0], e), this._drawRect = {
						x : this._position.x - b / 2 + 0 - 0.5,
						y : this._position.y + 0,
						w : b + 1,
						h : c[1]
					}, this._boundingRect = {
						x : this._position.x -
						a + 0,
						y : this._position.y + 0 + d,
						w : b + (2 > this._displayType ? this._labelDim.width : 0),
						h : "both" != this._type ? 10 : c[1]
					}) : (b = Math.max(c[0], e), a = Math.max(c[1], e), this._drawRect = {
						x : this._position.x,
						y : this._position.y + 0,
						w : b,
						h : a
					}, this._boundingRect = {
						x : this._position.x + 0 - (2 > this._displayType ? this._labelDim.width / 2 : 0),
						y : this._position.y + 0,
						w : b + (2 > this._displayType ? this._labelDim.width : 0),
						h : "both" != this._type ? 10 : a
					});
				k.call(this)
			}
			this._numberOfFlowsChanged && this.dispatchEvent("numberOfFlowsChanged");
			this._updatePositions =
				this._numberOfFlowsChanged = !1
		},
		getBoundingPrimitives : function () {
			return 2 == this._displayType || 1 == this._displayType ? [this._drawRect] : [this._boundingRect]
		},
		updateHub : function () {
			for (var a = this._flows, b = this._inValue = this._outValue = this._netValue = 0; b < this._startFlows.length; b++)
				this._startFlows[b].getVisible() && (this._netValue += this._startFlows[b].getValue(), this._outValue += this._startFlows[b].getValue());
			for (b = 0; b < this._endFlows.length; b++)
				this._endFlows[b].getVisible() && (this._netValue -= this._endFlows[b].getValue(),
					this._inValue += this._endFlows[b].getValue());
			1 < a.length && (this.sortFlows(), this._updatePositions = this._numberOfFlowsChanged = !0, this.invalidateProperties())
		}
	});
	gav.components.sankeyDiagram;
	gav.components.sankeyDiagram.SankeyFlowHub.DISPLAY_TYPE_NOLABEL = -1;
	gav.components.sankeyDiagram.SankeyFlowHub.DISPLAY_TYPE_GROUP = 1;
	gav.components.sankeyDiagram.SankeyFlowHub.DISPLAY_TYPE_TRANSFORMATION = 2;
	gav.components.sankeyDiagram.SankeyFlowHub.DISPLAY_TYPE_STOCK = 3;
	gav.components.sankeyDiagram.SankeyFlowHub.DISPLAY_TYPE_STAT =
		4
})();
(function () {
	function f(b, a) {
		if ("noLabel" != this._displayType) {
			var d = this._value,
			c,
			e = 10,
			f = 0,
			g = 0 < this._endPosition.y - this._startPosition.y ? 1 : -1;
			this._doubleJointed ? "labelAtStart" == this._displayType ? (c = this._startPosition, b.textAlign = "left") : "labelAtEnd" == this._displayType && (c = this._endPosition, b.textAlign = "right", e = -e) : "horizontal" == this._direction ? (c = this._endPosition, e = 0, f = 0 < g ? -10 : 10) : (b.textAlign = "right", c = this._endPosition, e = -10, f = 0);
			b.fillStyle = this._flowColor.isDark() ? "#eee" : "#666";
			b.textBaseline =
				"middle";
			!this._doubleJointed && "horizontal" == this._direction ? (b.save(), b.translate(c.x + e, c.y + f), b.rotate(Math.PI / 2 * g), b.textAlign = "right", b.fillText(a.getNumberFormatter().getFormattedValue(d), 0, 0), b.restore()) : b.fillText(a.getNumberFormatter().getFormattedValue(d), c.x + e, c.y + f)
		}
	}
	function d(b, a, d) {
		var c = Math.max(this._flowWidth, 1),
		c = Math.max(c / 2, 0.5),
		e = b.length;
		2 == e ? (this._dims1 = i.apply(this, [b[0], a, d, c]), this._dims2 = i.apply(this, [b[0], a, d, -c]), this._dims3 = i.apply(this, [b[1], a, "horizontal" == d ? "vertical" :
						"horizontal", c]), this._dims4 = i.apply(this, [b[1], a, "horizontal" == d ? "vertical" : "horizontal", -c])) : 1 == e && (this._dims1 = i.apply(this, [b[0], a, d, c]), this._dims2 = i.apply(this, [b[0], a, d, -c]))
	}
	function g(b, a) {
		var d = a.length;
		if (a) {
			var c,
			e = this._radius,
			f = Math.max(this._flowWidth / 2, 0.5);
			4 == d ? a[0][1] == a[3][7] && a[1][1] == a[2][7] ? (b.moveTo(a[0][6], a[0][7]), b.lineTo(a[1][6], a[1][7]), b.lineTo(a[2][6], a[2][7]), b.lineTo(a[3][6], a[3][7])) : a[0][1] == a[2][7] && a[1][1] == a[3][7] ? (b.moveTo(a[0][6], a[0][7]), b.lineTo(a[1][6], a[1][7]),
				b.lineTo(a[3][6], a[3][7]), b.lineTo(a[2][6], a[2][7])) : (d = 0 < e - f ? e - f : 0, c = a[0], b.moveTo(c[6], c[7]), b.arcTo(c[2], c[3], c[0], c[1], d), b.lineTo(c[0], c[1]), d = 0 < e + f ? e + f : 0, c = a[3], b.lineTo(c[0], c[1]), d / 2 > Math.abs(c[6] - c[0]) || d / 2 > Math.abs(c[7] - c[1]) ? b.lineTo(c[2], c[3]) : b.arcTo(c[2], c[3], c[6], c[7], d), b.lineTo(c[6], c[7]), d = 0 < e - f ? e - f : 0, c = a[2], b.lineTo(c[6], c[7]), b.arcTo(c[2], c[3], c[0], c[1], d), b.lineTo(c[0], c[1]), d = 0 < e + f ? e + f : 0, c = a[1], b.lineTo(c[0], c[1]), d / 2 > Math.abs(c[6] - c[0]) || d / 2 > Math.abs(c[7] - c[1]) ? b.lineTo(c[2],
					c[3]) : b.arcTo(c[2], c[3], c[6], c[7], d), b.lineTo(c[6], c[7]), b.lineTo(a[0][6], a[0][7])) : 2 == d && (d = e - f, c = a[0], b.moveTo(c[6], c[7]), b.arcTo(c[2], c[3], c[0], c[1], 0 < d ? d : 0), b.lineTo(c[0], c[1]), d = e + f, c = a[1], b.lineTo(c[0], c[1]), b.arcTo(c[2], c[3], c[6], c[7], 0 < d ? d : 0), b.lineTo(c[6], c[7]))
		}
	}
	function i(b, a, d, c) {
		var e = Array(8);
		c || (c = 0);
		var f = b[0] > b[2] ? -1 : 1,
		g = b[1] > b[3] ? -1 : 1,
		j = this._slopeX,
		i = this._slopeY,
		k = 0,
		q = "horizontal" == this._direction ? Math.abs(b[1] - b[3]) : Math.abs(b[0] - b[2]);
		0 < j && (k = 0 < this._usedSlope ? this._usedSlope :
				1);
		"horizontal" == d ? (e[0] = b[2], e[1] = b[3], e[2] = b[2] - j * f, e[3] = b[1] + i * g, e[4] = b[2] - a * f - j * f, e[5] = b[1] + i * g, e[6] = b[0], e[7] = b[1], 0 != c && (Math.sin(k), b = e[3] + c * g, a = 0 < g ? b + q : b - q, e[0] += -c * Math.cos(k) * f, this._doubleJointed && (e[1] = a), e[2] += -c * f * (1 - k / (Math.PI / 2)), e[3] = b, e[4] += 0, e[5] += 0, e[6] += 0, e[7] += c * g)) : (e[0] = b[0], e[1] = b[1], e[2] = b[0] + j * f, e[3] = b[3] - i * g, e[4] = b[0] + a * f + j, e[5] = b[3] - i * g, e[6] = b[2], e[7] = b[3], 0 != c && (-1 == g && (c = -c), b = c * g * f * (1 - k / (Math.PI / 2)), e[0] += c * g * Math.cos(k) * f, e[1] += -c * Math.sin(k), e[2] += b, e[3] += -c, e[4] +=
				0, e[5] += 0, e[6] += 0, e[7] += -c, a = e[1], b = e[3], this._doubleJointed && (a = 0 < g ? b - q : b + q), e[1] = a));
		for (c = 0; c < e.length; c++)
			e[c] = Math.round(10 * e[c]) / 10;
		return e
	}
	function k(b, a, d) {
		var c = this._slope,
		e,
		f = Math.min(b, a),
		a = this._doubleJointed ? a / 2 - d : a - d;
		e = Math.max(a - this._flowWidth / 2, 0);
		a = this._doubleJointed ? f / 2 - d : f - d;
		d = Math.min(a * Math.tan(c), e);
		a = this._doubleJointed ? 2 * d : d;
		this._usedSlope = Math.atan(a / b);
		return Math.round(d)
	}
	gav.Klass("gav.components.sankeyDiagram.SankeyFlowLine", {
		init : function () {
			this._direction = "horizontal";
			this._flowWidth = 20;
			this._flowColor = new gav.utils.Color(55, 55, 55, 255);
			this._lightColor = new gav.utils.Color(55, 55, 55, 255);
			this._jointPosition = 0.5;
			this._doubleJointed = 1;
			this._selected = !1;
			this._usedSlope = this._slope = 0;
			this._startPosition = {
				x : 0,
				y : 0
			};
			this._centerPosition = {
				x : 0,
				y : 0
			};
			this._endPosition = {
				x : 0,
				y : 0
			};
			this._radius = this._value = 0;
			this._updateGeometry = !1;
			this._curvature = this._slopeY = this._slopeX = 0;
			this._primitiveHelper = new gav.components.sankeyDiagram.SankeyFlowLinePrimitivesHelper(this);
			this._dims4 =
				this._dims3 = this._dims2 = this._dims1 = null;
			this._visible = !0
		},
		getExtraSpaceAfterArc2 : function () {
			return !this._dims4 || !this._dims4[4] || !this._dims4[5] || !this._dims4[6] || !this._dims4[7] ? 0 : "horizontal" == this._direction ? this._dims4[6] - this._dims4[4] : this._dims4[7] - this._dims4[5]
		},
		setDisplayType : function (b) {
			this._displayType = b
		},
		getDisplayType : function () {
			return this._displayType
		},
		getRadius : function () {
			return this._radius
		},
		setValue : function (b) {
			this._value = b
		},
		getValue : function () {
			return this._value
		},
		setIndex : function (b) {
			this._index =
				b
		},
		getIndex : function () {
			return this._index
		},
		setHighlight : function (b) {
			this._highlighted = b
		},
		getHighlight : function () {
			return this._highlighted
		},
		setSelected : function (b) {
			this._selected = b
		},
		getSelected : function () {
			return this._selected
		},
		setDoubleJointed : function (b) {
			this._doubleJointed = b
		},
		getDoubleJointed : function () {
			return this._doubleJointed
		},
		setJointPosition : function (b) {
			this._jointPosition = b
		},
		getJointPosition : function () {
			return this._jointPosition
		},
		setFlowColor : function (b) {
			this._lightColor = new gav.utils.Color(b);
			b = gav.utils.Color.toHSL(this._lightColor);
			b = b.substring(4, b.length - 1).split(",");
			this._flowColor = new gav.utils.Color("hsl(" + [b[0], b[1], Number(b[2]) - 20].join() + ")")
		},
		getFlowColor : function () {
			return this._lightColor
		},
		setDirection : function (b) {
			this._direction = b
		},
		getDirection : function () {
			return this._direction
		},
		setVisible : function (b) {
			this._visible = b
		},
		getVisible : function () {
			return this._visible
		},
		setSlope : function (b) {
			80 < b && (b = 80);
			0 > b && (b = 0);
			this._slope = 2 * (b / 360) * Math.PI
		},
		getSlope : function () {
			return this._usedSlope
		},
		getSlopeX : function () {
			return this._slopeX
		},
		getSlopeY : function () {
			return this._slopeY
		},
		setFlowWidth : function (b) {
			this._flowWidth = b
		},
		getFlowWidth : function () {
			return this._flowWidth
		},
		setCurvature : function (b) {
			this._curvature = b
		},
		getCurvature : function () {
			return this._curvature
		},
		setStartPosition : function (b, a) {
			this._startPosition = {
				x : b,
				y : a
			}
		},
		getStartPosition : function () {
			return this._startPosition
		},
		getCenterPosition : function () {
			return this._centerPosition
		},
		setEndPosition : function (b, a) {
			this._endPosition = {
				x : b,
				y : a
			}
		},
		getEndPosition : function () {
			return this._endPosition
		},
		draw : function (b, a, d) {
			if (!(1.0E-4 > this._value) && this._visible) {
				b.font = "normal 600 10px/1 Arial, sans-serif";
				var c = this._flowColor.toHex(),
				e = this._lightColor.toHex();
				b.strokeStyle = e;
				b.fillStyle = e;
				this._highlighted && (b.strokeStyle = c, b.fillStyle = c);
				this._selected && (b.strokeStyle = "#000", b.fillStyle = c);
				c = this._doubleJointed ? [this._dims1, this._dims2, this._dims3, this._dims4] : [this._dims1, this._dims2];
				b.beginPath();
				g.apply(this, [b, c]);
				b.fill();
				this._selected &&
				b.stroke();
				if (10 < this._flowWidth && (d || this._highlighted))
					b.beginPath(), f.apply(this, [b, a])
			}
		},
		getBoundingPrimities : function () {
			return this._primitiveHelper.getBoundingPrimitives()
		},
		testPrimitive : function (b, a) {
			return this._primitiveHelper.testPrimitive(b, a)
		},
		updateFlow : function () {
			var b = this._startPosition,
			a = this._endPosition,
			f,
			c = [b.x, b.y, a.x, a.y];
			f = this._jointPosition;
			var e = Math.abs(c[0] - c[2]),
			c = Math.abs(c[1] - c[3]),
			e = Math.min(e, c),
			e = this._doubleJointed ? e / 2 : e;
			this._radius = f = Math.round(10 * (0.5 > f ? 2 * e * (0.5 <
							f ? 1 - f : f) : 2 * e * (1 - f)) * (this._curvature / 6)) / 10;
			e = Math.abs(a.x - b.x);
			c = Math.abs(a.y - b.y);
			this._doubleJointed && ("horizontal" == this._direction ? this._slopeX = k.apply(this, [c, e, f]) : this._slopeY = k.apply(this, [c, e, f]));
			this._doubleJointed ? (b = [b.x, b.y, a.x, a.y], a = Array(6), e = Array(2), c = this._jointPosition, "horizontal" == this._direction ? (e.x = c * (b[2] - b[0]) + b[0], e.y = 0.5 * (b[3] - b[1]) + b[1]) : (e.y = c * (b[3] - b[1]) + b[1], e.x = 0.5 * (b[2] - b[0]) + b[0]), a[0] = b[0], a[1] = b[1], a[2] = e.x, a[3] = e.y, a[4] = b[2], a[5] = b[3], this._centerPosition =
					e, b = a, d.apply(this, [[[b[0], b[1], b[2], b[3]], [b[2], b[3], b[4], b[5]]], f, this._direction])) : (b = [b.x, b.y, a.x, a.y], d.apply(this, [[b], f, this._direction]));
			this._primitiveHelper.updatePrimitives()
		}
	});
	gav.components.sankeyDiagram
})();
(function () {
	gav.Klass("gav.components.sankeyDiagram.SankeyFlowLinePrimitivesHelper", {
		init : function (f) {
			this._flowLine = f;
			this._minDim = 10;
			this._boundingRect3 = this._boundingArc2 = this._boundingRect2 = this._boundingArc1 = this._boundingRect1 = null;
			this._matrix = new gav.geom.Matrix
		},
		getBoundingPrimitives : function () {
			return this._flowLine.getDoubleJointed() ? [this._boundingRect1, this._boundingArc1, this._boundingRect2, this._boundingArc2, this._boundingRect3] : [this._boundingRect1, this._boundingArc1, this._boundingRect2]
		},
		updatePrimitives : function () {
			var f = this._flowLine,
			d = {
				x : 0,
				y : 0,
				w : 0,
				h : 0
			},
			g = f.getStartPosition(),
			i = f.getEndPosition(),
			k = f.getFlowWidth() > this._minDim ? f.getFlowWidth() : this._minDim,
			b = f.getJointPosition(),
			a;
			"horizontal" == f.getDirection() ? (d.x = g.x, d.y = g.y - k / 2, d.w = f.getDoubleJointed() ? (i.x - g.x - 2 * f.getSlopeX()) * b - f.getRadius() : i.x - g.x - f.getRadius(), d.h = k) : (a = g.y < i.y ? 1 : -1, d.x = g.x - k / 2, d.h = f.getDoubleJointed() ? (i.y - g.y - 2 * f.getSlopeY()) * b - f.getRadius() : Math.abs(i.y - g.y) - f.getRadius(), d.w = k, d.y = g.y - (0 > a ? d.h : 0));
			this._boundingRect1 = d;
			f = this._flowLine;
			d = {
				x : 0,
				y : 0,
				ri : 0,
				ro : 0,
				a1 : 0,
				a2 : 0
			};
			g = f.getStartPosition();
			i = f.getCenterPosition();
			k = f.getEndPosition();
			b = f.getFlowWidth() > this._minDim ? f.getFlowWidth() : this._minDim;
			a = 0 < k.y - g.y ? 1 : -1;
			var h = 0 < k.x - g.x ? 1 : -1,
			c = f.getRadius(),
			e = f.getSlopeX();
			f.getDoubleJointed() ? "horizontal" == f.getDirection() && (d.x = i.x - h * c - e / 2, d.y = g.y + a * c, d.ri = Math.max(c - b / 2, 0), d.ro = 0 < c ? c + b / 2 : 0, d.a1 = 0, d.a2 = Math.PI / 2, 0 < a && (d.a1 -= Math.PI / 2, d.a2 -= Math.PI / 2)) : "horizontal" == f.getDirection() ? (d.x = k.x - h * c, d.y =
					g.y + a * c, d.ri = Math.max(c - b / 2, 0), d.ro = 0 < c ? c + b / 2 : 0, d.a1 = 0, d.a2 = Math.PI / 2, 0 < a && (d.a1 -= Math.PI / 2, d.a2 -= Math.PI / 2)) : (d.x = g.x + h * c, d.y = k.y - a * c, d.ri = Math.max(c - b / 2, 0), d.ro = 0 < c ? c + b / 2 : 0, 0 < a ? (d.a1 = Math.PI / 2, d.a2 = Math.PI) : (d.a1 = -Math.PI, d.a2 = -Math.PI / 2));
			this._boundingArc1 = d;
			f = this._flowLine;
			d = f.getCenterPosition();
			g = {
				x : 0,
				y : 0,
				w : 0,
				h : 0
			};
			i = f.getStartPosition();
			k = f.getCenterPosition();
			b = f.getEndPosition();
			a = f.getFlowWidth() > this._minDim ? f.getFlowWidth() : this._minDim;
			var h = f.getJointPosition(),
			c = 0 < b.y - i.y ? 1 : -1,
			l = f.getRadius();
			f.getDoubleJointed() ? (e = Math.abs(b.y - i.y) - 2 * l, l = e * Math.tan(f.getSlope()), e = Math.sqrt(e * e + l * l) + a, "horizontal" == f.getDirection() && (g.x = i.x + (b.x - i.x) * h - a / 2, g.y = k.y - e / 2, g.w = a, g.h = e)) : "horizontal" == f.getDirection() ? (e = Math.abs(b.y - i.y) - l, g.x = b.x - a / 2, g.y = 0 < c ? i.y + l / 2 : b.y, g.w = a, g.h = e) : (g.x = i.x + l, g.y = b.y - a / 2, g.w = Math.max(Math.abs(b.x - i.x) - l, this._minDim), g.h = a);
			this._matrix.setElements([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
			this._matrix.translate(-d.x, -d.y);
			this._matrix.rotate(c * f.getSlope());
			this._matrix.translate(d.x,
				d.y);
			this._boundingRect2 = g;
			f = this._flowLine;
			d = {
				x : 0,
				y : 0,
				ri : 0,
				ro : 0,
				a1 : 0,
				a2 : 0
			};
			a = f.getStartPosition();
			g = f.getCenterPosition();
			i = f.getEndPosition();
			k = f.getFlowWidth() > this._minDim ? f.getFlowWidth() : this._minDim;
			b = 0 < i.y - a.y ? 1 : -1;
			a = 0 < i.x - a.x ? 1 : -1;
			h = f.getRadius();
			c = f.getSlopeX();
			f.getDoubleJointed() && "horizontal" == f.getDirection() && (d.x = g.x + a * h + c / 2, d.y = i.y - b * h, d.ri = Math.max(h - k / 2, 0), d.ro = 0 < h ? h + k / 2 : 0, d.a1 = Math.atan(-c / 2 / h) - Math.PI, d.a2 = Math.PI / 2 - Math.atan(-c / 2 / h) - Math.PI, 0 < b && (d.a1 += 3 * Math.PI / 2, d.a2 += 3 * Math.PI /
					2));
			this._boundingArc2 = d;
			f = this._flowLine;
			d = {
				x : 0,
				y : 0,
				w : 0,
				h : 0
			};
			k = f.getStartPosition();
			g = f.getEndPosition();
			i = f.getFlowWidth() > this._minDim ? f.getFlowWidth() : this._minDim;
			b = f.getJointPosition();
			k = (g.x - k.x - 2 * f.getSlopeX()) * (1 - b) - f.getRadius();
			"horizontal" == f.getDirection() && (d.x = g.x - k, d.y = g.y - i / 2, d.w = f.getDoubleJointed() ? k : 0, d.h = i);
			this._boundingRect3 = d
		},
		testPrimitive : function (f, d) {
			var g = this._flowLine,
			i = this._matrix,
			k,
			b,
			a = !1,
			h = !1;
			g.getEndPosition();
			g.getStartPosition();
			0 == f ? (k = this._boundingRect1, a =
					!0) : 1 == f ? (b = this._boundingArc1, h = !0) : 2 == f ? (k = this._boundingRect2, g.getDoubleJointed() && (d = i.transformPoint(d)), a = !0) : 3 == f ? (b = this._boundingArc2, h = !0) : 4 == f && (k = this._boundingRect3, a = !0);
			if (a && k) {
				if (d.x > k.x && d.x < k.x + k.w && d.y > k.y && d.y < k.y + k.h)
					return k
			} else if (h && b && (g = Math.atan2(d.y - b.y, d.x - b.x), i = !1, g > b.a1 && g < b.a2 && (i = !0), i && (g = b.x - d.x, i = b.y - d.y, g = Math.sqrt(g * g + i * i), g > b.ri && g < b.ro)))
				return b;
			return null
		}
	});
	gav.components.sankeyDiagram
})();

// ========== gav-m-pie.js ==========
;
(function (c) {
	function v() {
		if (this._dataSet) {
			var a = this._dataSet.getDataCube(),
			d = a.getNumSlices(),
			b = a.getNumRecords(),
			u = this._selectionList ? this._selectionList.getSelectedRecords() : null;
			u && (u = u.filter(function (a) {
						return a < b
					}));
			var g = u ? u.length : 0;
			this._items || (this._items = Array(g));
			this._items.length > g ? this._items.splice(0, this._items.length - g) : this._items.length < g && (this._items = this._items.concat(Array(g - this._items.length)));
			for (var f, e, c = 0; c < g; c += 1) {
				this._items[c] || (this._items[c] = new p(u[c]));
				this._items[c]._index =
					u[c];
				f = Array(d);
				for (e = 0; e < d; e += 1)
					f[e] = a.getValue(u[c], this._attribute, e);
				e = Math.min.apply(null, f);
				if (0 > e) {
					this._hasNegativeValues = !0;
					this._items = [];
					break
				}
				this._items[c]._values = f
			}
		} else
			this._items = []
	}
	function r() {
		this._hasNegativeValues = !1;
		if (this._dataSet) {
			var a = this._dataSet.getDataCube();
			if (!this.getShowSelectionOnly() && 0 > a.getMinValue(this._attribute))
				this._items = [], this._hasNegativeValues = !0;
			else if (this.getShowSelectionOnly())
				v.call(this);
			else {
				var a = this._dataSet.getDataCube(),
				d = a.getNumSlices(),
				b = a.getNumRecords();
				this._items || (this._items = Array(b));
				this._items.length > b ? this._items.splice(0, this._items.length - b) : this._items.length < b && (this._items = this._items.concat(Array(b - this._items.length)));
				for (var c, g = 0; g < b; g += 1) {
					this._items[g] || (this._items[g] = new p(g));
					this._items[g]._index = g;
					c = Array(d);
					for (var f = 0; f < d; f += 1)
						c[f] = a.getValue(g, this._attribute, f);
					this._items[g]._values = c;
					this._items[g]._selected = this._selectionList && !this._selectionList.isSelected(g) ? !1 : !0
				}
				this._items.sort(function (a,
						b) {
					return b._values[0] - a._values[0]
				})
			}
		} else
			this._items = []
	}
	function k(a, d, b, c, g, f, e, k, i) {
		var j = this._centerOffset,
		m = d + b / 2,
		n;
		a.font = "normal 12px Arial";
		j && (a.save(), a.translate(j * Math.cos(m), j * Math.sin(m)));
		a.beginPath();
		a.moveTo(0, 0);
		a.arc(0, 0, f, d, d + b, !1);
		this._floatingColors ? n = this._floatingColors[e] : this._globalColors && (n = this._globalColors[this._slice][e]);
		n || (n = this._colorMap.getColor(e));
		e = !1;
		n.isDark && (e = n.isDark(), n = n.toRGB());
		a.fillStyle = n;
		a.fill();
		a.stroke();
		!this.getShowSelectionOnly() &&
		i && (a.save(), a.beginPath(), a.strokeStyle = "#000", a.lineWidth = 4, a.arc(0, 0, f + 1, d + b, d, !0), a.stroke(), a.restore());
		20 < f * b && (a.font = "normal 10px Arial", h.apply(this, [a, c + " %", d, b, f * b, f, k, e]));
		this._showLabels && f * b > 12 * 1.2 && (a.font = "normal 12px Arial", o.apply(this, [a, g, d, b, f, f * b, k]));
		j && a.restore()
	}
	function m(a, d, b, c, g, f, e, k, i) {
		var j = this._innerRadius,
		m = d + b / 2,
		n,
		q = j * Math.cos(d),
		l = j * Math.cos(d + b),
		p = j * Math.sin(d),
		r = j * Math.sin(d + b),
		t = this._showValueTextInsideSlice ? f : this._innerRadius;
		a.font = "normal 12px Arial";
		a.textBaseline = "middle";
		var s = this._centerOffset;
		s && (a.save(), a.translate(s * Math.cos(m), s * Math.sin(m)));
		a.beginPath();
		a.moveTo(q, p);
		a.arc(0, 0, f, d, d + b, !1);
		a.lineTo(l, r);
		a.arc(0, 0, j, d + b, d, !0);
		this._floatingColors ? n = this._floatingColors[e] : this._globalColors && (n = this._globalColors[this._slice][e]);
		n || (n = this._colorMap.getColor(e));
		e = !1;
		n.isDark && (e = n.isDark(), n = n.toRGB());
		a.fillStyle = n;
		a.fill();
		a.stroke();
		!this.getShowSelectionOnly() && i && (a.save(), a.beginPath(), a.strokeStyle = "#000", a.lineWidth = 4, a.arc(0,
				0, f + 1, d + b, d, !0), a.stroke(), a.restore());
		12 < t * b && (a.font = "normal 10px Arial", h.apply(this, [a, c + " %", d, b, f * b, t, k, e]));
		this._showLabels && f * b > 12 * 1.2 && (a.font = "normal 12px Arial", o.apply(this, [a, g, d, b, f, f * b, k]));
		s && a.restore()
	}
	function h(a, d, b, c, g, f, e, k) {
		b += c / 2;
		a.fillStyle = f > this._innerRadius && f <= this._radius ? k ? "#eee" : "#333" : "#999";
		a.textBaseline = "middle";
		a.save();
		b < Math.PI / 2 || b > 1.5 * Math.PI ? (a.textAlign = "right", a.rotate(b), a.fillText(d, -4 + f, 0)) : (a.textAlign = "left", a.rotate(b - Math.PI), a.fillText(d,  - (-4 +
					f), 0));
		a.restore()
	}
	function o(a, d, b, c, g) {
		b += c / 2;
		a.textBaseline = "middle";
		a.save();
		a.fillStyle = "#666";
		b < Math.PI / 2 || b > 1.5 * Math.PI ? (a.textAlign = "left", a.rotate(b), a.fillText(d, 10 + g, 0)) : (a.textAlign = "right", a.rotate(b - Math.PI), a.fillText(d,  - (10 + g), 0));
		a.restore()
	}
	function q(a) {
		a.getChangedRecords();
		a.getChangedStatus();
		this._selectionListChanged = !0;
		this.invalidateProperties();
		this.invalidateDisplay()
	}
	function t() {
		this.invalidateDisplay()
	}
	function i() {
		this._inAnimationMode = this._animationController.isPlaying();
		if (this._dataSet) {
			var a = this._dataSet.getDataCube().getNumSlices();
			this._floatingSlice = this._animationController.getProgress() * (a - 1);
			this._slice = Math.floor(this._floatingSlice);
			this._colorMap instanceof gav.representation.ColorMap && (this._floatingColors = gav.representation.ColorMap.calculateColorsForFloatingSlice(this._colorMap, this._floatingSlice, a));
			this.invalidateDisplay()
		}
	}
	function w() {
		this.setSlice(this._animationController.getSlice());
		this._inAnimationMode = !1
	}
	function x(a) {
		this._colorMapChanged =
			!0;
		this._globalColors = a.globalColors;
		this._colorMap && this._colorMap.getDataSet && this._dataSet !== this._colorMap.getDataSet() ? this._globalColors = null : (this._floatingColors = null, this.invalidateDisplay())
	}
	function s(a, d) {
		var b = this._items ? this._items.length : 0;
		if (!b || !this._offset)
			return -1;
		var c = this._vw - this._offset[0],
		g = this._vh - this._offset[1],
		f = Math.sqrt((c - a) * (c - a) + (g - d) * (g - d));
		if (this._showAsDonut && (f > this._radius || f < this._innerRadius) || f > this._radius)
			return -1;
		for (var e = 0; e < b; e += 1)
			if (!this._items[e]._hasNaN &&
				(!this._visibilityList || this._visibilityList.isVisible(this._items[e]._index)) && f < this._items[e]._outerRadius && this._items[e].contains(a - c, d - g))
				return {
					idx : this._items[e]._index,
					share : this._items[e].getShare()
				};
		return -1
	}
	var y = 0;
	gav.Klass("gav.components.PieChart", {
		extend : gav.components.Component,
		implement : [gav.representation.IVisibilityListConsumer, gav.representation.ISelectionListConsumer, gav.representation.IPickable, gav.snapshot.IStorable],
		init : function (a) {
			gav.components.Component.prototype.init.call(this,
				a);
			if (a) {
				y++;
				this._canvas = document.createElement("canvas");
				this._bitmapScaleFactor = 1;
				window.devicePixelRatio && (this._bitmapScaleFactor = window.devicePixelRatio);
				this._element.appendChild(this._canvas);
				this._attribute = this._floatingSlice = this._slice = 0;
				this._innerRadiusRatio = 0.8;
				this._sliceOffset = 0;
				this._shareValuePrecision = 2;
				this._maxSizeRatio = 0.6;
				this._forceSelectionOnly = this._showSelectionOnly = this._showAsDonut = this._showValueTextInsideSlice = !1;
				this._showLabels = !0;
				this._hasNegativeValues = !1;
				this.invalidateSize();
				this.invalidateProperties();
				this.invalidateDisplay();
				var d = this,
				b;
				c(this._element).bind("mousemove", function (a) {
					var g = c(this).offset().left,
					f = c(this).offset().top,
					g = s.apply(d, [a.pageX - g, a.pageY - f]);
					0 <= g.idx ? (b = new gav.events.BrushEvent("itemOver"), b.item = g.idx, b.share = g.share) : b = new gav.events.BrushEvent("itemOut");
					b.e = a;
					d.dispatchEvent(b)
				}).bind("mouseout", function () {
					d.dispatchEvent(new gav.events.BrushEvent("itemOut"))
				});
				c(this._element).bind("gavtap", function (a) {
					if (!d.getShowSelectionOnly()) {
						var b =
							c(this).offset().left,
						f = c(this).offset().top,
						e = a.gav,
						b = s.apply(d, [e.x - b, e.y - f]),
						a = a.ctrlKey ? gav.events.PickedEvent.INVERT : gav.events.PickedEvent.REPLACE;
						if (0 <= b.idx)
							return a = new gav.events.PickedEvent([b.idx], a), d.dispatchEvent(a), !1;
						d.dispatchEvent(new gav.events.PickedEvent([], a))
					}
				});
				this._noteElement = document.createElement("div");
				this._noteElement.innerHTML = "Negative values in dataset can not be displayed in a pie chart!";
				c(this._noteElement).css({
					position : "absolute",
					top : "50%",
					textAlign : "center",
					width : "100%",
					marginTop : "-1em"
				}).hide();
				this._element.appendChild(this._noteElement)
			}
		},
		state : function () {
			return {
				"#object" : this,
				"@attribute" : {
					"#type" : "int"
				},
				"@showAsDonut" : {
					"#type" : "boolean"
				},
				"@showLabels" : {
					"#type" : "boolean"
				},
				"@maxSizeRatio" : {
					"#type" : "number"
				},
				"@showSelectionOnly" : {
					"#type" : "boolean"
				},
				"@showValueTextInsideSlice" : {
					"#type" : "boolean"
				},
				"@innerRadiusRatio" : {
					"#type" : "number"
				}
			}
		},
		getSnapshotType : function () {
			return gav.snapshot.SnapshotManager.type.COMPONENT
		},
		setPresentationMode : function () {},
		setSlice : function (a) {
			this._slice !==
			a && (this._slice = this._floatingSlice = a, this._sliceChanged = !0, this._inAnimationMode = !1, this.invalidateProperties(), this.invalidateDisplay())
		},
		getSlice : function () {
			return this._slice
		},
		setDataSet : function (a) {
			this._dataSet = a;
			this._dataSetChanged = !0;
			this._dataSet && this._dataSet.getDataCube() && 200 < this._dataSet.getDataCube().getNumRecords() ? this._forceSelectionOnly || (this._forceSelectionOnly = !0, this.dispatchEvent("showSelectionOnlyChanged", [!1, !0]), this.dispatchEvent("forceShowSelectionOnlyChanged", [!1, !0])) :
			this._forceSelectionOnly && (this._forceSelectionOnly = !1, this.dispatchEvent("showSelectionOnlyChanged", [!0, this._showSelectionOnly]), this.dispatchEvent("forceShowSelectionOnlyChanged", [!0, !1]));
			this.dispatchEvent(new gav.events.PropertyChangeEvent("dataSet", null, a));
			this.invalidateProperties();
			this.invalidateDisplay()
		},
		getDataSet : function () {
			return this._dataSet
		},
		getForceShowSelectionOnly : function () {
			return this._forceSelectionOnly
		},
		setColorMap : function (a) {
			this._colorMap !== a && (this._colorMap && this._colorMap.removeEventListener("colorMapChanged",
					x, this), this._colorMapChanged = !0, (this._colorMap = a) && this._colorMap.addEventListener("colorMapChanged", x, this), this._colorMapChanged = !0, this._globalColors = this._floatingColors = null, this.invalidateDisplay())
		},
		getColorMap : function () {
			return this._colorMap
		},
		setSelectionList : function (a) {
			this._selectionList && this._selectionList.removeEventListener("selectionChanged", q, this);
			this._selectionList = a;
			this._selectionListChanged = !0;
			this._selectionList && this._selectionList.addEventListener("selectionChanged", q,
				this);
			this.invalidateDisplay()
		},
		setFormatter : function (a) {
			this._formatter = a
		},
		setAnimationController : function (a) {
			if (this._animationController !== a) {
				this._animationController && (this._animationController.removeEventListener("progressChanged", i, this), this._animationController.removeEventListener("sliceExplicitlyChanged", w, this));
				if (this._animationController = a)
					this._animationController.addEventListener("progressChanged", i, this), this._animationController.addEventListener("sliceExplicitlyChanged", w, this);
				this.invalidateDisplay();
				this._inAnimationMode = !1
			}
		},
		setVisibilityList : function (a) {
			this._visibilityList !== a && (this._visibilityList && this._visibilityList.removeEventListener(gav.events.VisibilityEvent.VISIBILITY_CHANGED, t, this), (this._visibilityList = a) && this._visibilityList.addEventListener(gav.events.VisibilityEvent.VISIBILITY_CHANGED, t, this))
		},
		getVisibilityList : function () {
			return this._visibilityList
		},
		_updateSize : function () {
			gav.components.Component.prototype._updateSize.call(this);
			this._vw = this.getWidth();
			this._vh = this.getHeight();
			this._canvas.width = this._vw * this._bitmapScaleFactor;
			this._canvas.height = this._vh * this._bitmapScaleFactor;
			this._canvas.style.width = this._vw + "px";
			this._canvas.style.height = this._vh + "px"
		},
		_updateProperties : function () {
			if (this._dataSetChanged || this._showSelectionOnlyChanged || (this._forceSelectionOnly || this._showSelectionOnly) && this._selectionListChanged || this._attributeChanged)
				r.call(this), this._showSelectionOnlyChanged = this._attributeChanged = this._selectionListChanged = this._dataSetChanged =
					!1
		},
		_updateDisplay : function () {
			var a = this._canvas.getContext("2d");
			a.clearRect(0, 0, this._canvas.width, this._canvas.height);
			if (this._dataSet) {
				a.save();
				a.scale(this._bitmapScaleFactor, this._bitmapScaleFactor);
				this._colorMapChanged && (this._colorMapChanged = !1);
				if (this._items && this._items.length) {
					var d = this._canvas.getContext("2d"),
					b = this._items,
					h = b ? b.length : 0,
					g = this._vw,
					f = this._vh,
					e = this._maxSizeRatio * Math.min(g, f) / 2;
					this._centerOffset = this._sliceOffset * e;
					this._radius = e -= this._sliceOffset * e;
					this._offset =
						[g / 2, f / 2];
					this._innerRadius = this._innerRadiusRatio * e;
					this._dataSet.getDataCube();
					for (var e = this._dataSet.getRecordInformation(), i = 0, o, j, q = Math.floor(this._floatingSlice), n = Math.ceil(this._floatingSlice), p = this._floatingSlice - this._slice, l = 0; l < h; l++)
						if (!this._visibilityList || this._visibilityList.isVisible(b[l]._index)) {
							b[l]._hasNaN = !1;
							o = b[l]._values;
							j = o[q];
							o = o[n];
							if (this._floatingSlice && this._floatingSlice != this._slice && !isNaN(j) && !isNaN(o))
								j = o * p + j * (1 - p);
							else if (isNaN(j)) {
								b[l]._hasNaN = !0;
								continue
							}
							isNaN(j) ?
							b[l]._hasNaN = !0 : (b[l]._tempValue = j, i += j)
						}
					d.save();
					d.translate(g / 2, f / 2);
					f = g = 0;
					d.strokeStyle = "rgba(255,255,255,0.9)";
					q = this._radius - this._innerRadius;
					for (l = 0; l < h; l++)
						b[l]._hasNaN || this._visibilityList && !this._visibilityList.isVisible(b[l]._index) || (j = b[l]._tempValue, f = 2 * Math.PI * j / i, j /= i, n = q, j = parseFloat(100 * j).toFixed(this._shareValuePrecision), p = this._selectionList && this._selectionList.isSelected(b[l]._index), this._showAsDonut && this._innerRadius ? m.apply(this, [d, g, f, j, e[b[l]._index].toString(), this._innerRadius +
									n, b[l]._index, l % 2, p]) : k.apply(this, [d, g, f, j, e[b[l]._index].toString(), this._radius, b[l]._index, l % 2, p]), b[l].setRadians([g, g + f]), b[l]._share = j, b[l]._outerRadius = this._innerRadius + n, g += f)
				} else {
					d = this._canvas.getContext("2d");
					h = this._vw;
					e = this._vh;
					this._radius = b = this._maxSizeRatio * Math.min(h, e) / 2;
					this._offset = [h / 2, e / 2];
					d.save();
					d.translate(h / 2, e / 2);
					h = 0;
					e = 2 * Math.PI / 6;
					d.strokeStyle = "rgba(0,0,0,0.1)";
					b += 0;
					for (i = 0; 6 > i; i++)
						d.beginPath(), d.moveTo(0, 0), d.arc(0, 0, b, h, h + e, !1), d.stroke(), h += e
				}
				d.restore();
				this._hasNegativeValues &&
				!this._noteShown ? (this._noteShown = !0, c(this._noteElement).show()) : !this._hasNegativeValues && this._noteShown && (this._noteShown = !1, c(this._noteElement).hide());
				a.restore()
			}
		},
		setAttribute : function (a) {
			this._attribute !== a && (this._attributeChanged = !0, this._attribute = a, this.invalidateProperties(), this.invalidateDisplay())
		},
		getAttribute : function () {
			return this._attribute
		},
		setInnerRadiusRatio : function (a) {
			this._innerRadiusRatio !== a && (this._innerRadiusRatio = a, this.invalidateDisplay())
		},
		getInnerRadiusRatio : function () {
			return this._innerRadiusRatio
		},
		getMaxSizeRatio : function () {
			return this._maxSizeRatio
		},
		setMaxSizeRatio : function (a) {
			this._maxSizeRatio !== a && (this._maxSizeRatio = gav.helpers.isNumber(a) ? a : 0.8, this.invalidateDisplay())
		},
		getShowLabels : function () {
			return this._showLabels
		},
		setShowLabels : function (a) {
			this._showLabels !== a && (this._showLabels = !1 !== a, this.invalidateDisplay())
		},
		setShowSelectionOnly : function (a) {
			this._showSelectionOnly = a;
			this._showSelectionOnlyChanged = !0;
			this.invalidateProperties();
			this.invalidateDisplay()
		},
		getShowSelectionOnly : function () {
			return this._showSelectionOnly ||
			this._forceSelectionOnly
		},
		setShowValueTextInsideSlice : function (a) {
			this._showValueTextInsideSlice = a;
			this.invalidateDisplay()
		},
		getShowValueTextInsideSlice : function () {
			return this._showValueTextInsideSlice
		},
		setShowAsDonut : function (a) {
			this._showAsDonut !== a && (this._showAsDonut = a, this.invalidateDisplay())
		},
		getShowAsDonut : function () {
			return this._showAsDonut
		},
		getShareValuePrecision : function () {
			return this._shareValuePrecision
		},
		setShareValuePrecision : function (a) {
			this._shareValuePrecision !== a && (this._shareValuePrecision =
					Math.min(20, Math.max(0, a)), this.invalidateDisplay())
		}
	});
	var p = gav.Klass({
			init : function (a) {
				this._index = a
			},
			getIndex : function () {
				return this._index
			},
			setIndex : function (a) {
				this._index = a
			},
			setSelected : function (a) {
				this._selected = a
			},
			getSelected : function () {
				return this._selected
			},
			setRadians : function (a) {
				this._startAt = a[0];
				this._endAt = a[1]
			},
			getValues : function () {
				return this._values
			},
			getShare : function () {
				return this._share
			},
			contains : function (a, c) {
				var b = Math.atan2(c, a);
				0 > b && (b += 2 * Math.PI);
				return this._startAt < b && b <
				this._endAt
			}
		})
})(jQuery);
(function (c) {
	function v() {
		var k = this;
		this._settingsPanelContainer = document.createElement("div");
		c(this._settingsPanelContainer).css({
			height : "100%",
			"float" : "left"
		}).bind("show hide", function () {
			k.refresh()
		}).addClass("gav-state-collapsed");
		var m = document.createElement("div");
		c(m).css({
			height : "100%",
			"float" : "right"
		}).addClass("right");
		this._right = m;
		this._attributeComboBox = new gav.controls.ComboBox({
				clean : !0
			});
		this._attributeComboBox.addEventListener("change", function () {
			k._piechart.setAttribute(k._attributeComboBox.getSelectedIndex())
		});
		this._attributeComboBox.getDOMElement().style.maxWidth = "100%";
		var h = document.createElement("div");
		c(h).css({
			textAlign : "center",
			marginLeft : "3em",
			marginRight : "2em"
		});
		this._attributeContainer = h;
		h.appendChild(this._attributeComboBox.getDOMElement());
		this._componentContainer = document.createElement("div");
		this._contentPanel.appendChild(this._settingsPanelContainer);
		this._contentPanel.appendChild(m);
		m.appendChild(h);
		m.appendChild(this._componentContainer)
	}
	function r() {
		this._piechart.getDataSet() && (this._attributeComboBox.setDataProvider(this._piechart.getDataSet().getIndicatorInformation()),
			this._attributeComboBox.setGroupingProvider(this._piechart.getDataSet().getIndicatorGroupings()), this._attributeComboBox.setSelectedIndex(this._piechart.getAttribute()))
	}
	gav.Klass("gav.components.PieChartPanel", {
		extend : gav.components.ComponentPanel,
		implement : [gav.snapshot.IStorablesContainer, gav.snapshot.ISnapshotReadableComponent],
		init : function (k) {
			gav.components.ComponentPanel.prototype.init.call(this, k);
			c(this._contentPanel).addClass("gav-component-pie-chart-panel");
			var m = this;
			v.call(this);
			this._piechart =
				new gav.components.PieChart(this._componentContainer);
			this._settingsPanel = new gav.panels.PieChartSettingsPanel(this._settingsPanelContainer, this._piechart);
			gav.utils.Binding.bindProperty(this._attributeComboBox, "selectedIndex", this._piechart, "attribute");
			var h;
			this._piechart.addEventListener("itemOver", function (c) {
				if (m._context) {
					h = m.getDataTooltip();
					var k = [m._piechart.getAttribute()];
					h.setVisibleAttributes(k);
					m.showDataTooltip([c.item], c.e, [{
								text : "Share",
								value : c.share + " %"
							}
						])
				}
			});
			this._piechart.addEventListener("itemOut",
				function () {
				h && h.hide()
			});
			this._created = !0;
			this.refresh()
		},
		setPresentationMode : function (c) {
			this._isInPresentationMode = c;
			this._attributeComboBox.setPresentationMode(this._isInPresentationMode);
			this.refresh()
		},
		getComponents : function () {
			return [this._piechart]
		},
		getSnapshotReaders : function () {
			return [new gav.snapshot.PieChartReader(this._piechart)]
		},
		getStorables : function () {
			return [this._piechart]
		},
		setContext : function (c) {
			gav.components.ComponentPanel.prototype.setContext.call(this, c);
			this._piechart && this.getContext() ?
			(this._piechart.setDataSet(this.getContext().getDataSet()), r.call(this), this._piechart.setSlice(this.getContext().getSlice()), this._piechart.setFormatter(this.getContext().getFormatter()), this._piechart.setColorMap(this.getContext().getColorMap()), this._piechart.setAnimationController(this.getContext().getAnimationController())) : (this._piechart.setDataSet(null), r.call(this), this._piechart.setFormatter(null), this._piechart.setColorMap(null), this._piechart.setAnimationController(null))
		},
		refresh : function () {
			gav.components.ComponentPanel.prototype.refresh.call(this);
			var k = c(this._attributeContainer).height(),
			m = c(this._contentPanel).width(),
			h = c(this._settingsPanelContainer).width(),
			o = c(this._right).height(),
			m = m - h;
			c(this._right).css({
				width : m,
				left : h,
				position : "absolute"
			});
			c(this._componentContainer).css({
				height : o - k,
				width : m
			});
			this._piechart.invalidateSize();
			this._piechart.invalidateProperties();
			this._piechart.invalidateDisplay()
		},
		_onContextChange : function (c) {
			gav.components.ComponentPanel.prototype._onContextChange.call(this, c);
			switch (c.property) {
			case "dataSet":
				this._piechart.setDataSet(c.newValue);
				r.call(this);
				break;
			case "slice":
				this._piechart.setSlice(c.newValue);
				break;
			case "colorMap":
				this._piechart.setColorMap(c.newValue);
				break;
			case "animationController":
				this._piechart.setAnimationController(this._context.getAnimationController());
				break;
			case "formatter":
				this._piechart.setFormatter(this._context.getFormatter())
			}
		}
	})
})(jQuery);
(function (c) {
	function v() {}

	var r = 0,
	k;
	gav.Klass("gav.panels.PieChartSettingsPanel", {
		extend : gav.panels.ComponentSettingsPanel,
		init : function (m, h) {
			gav.panels.ComponentSettingsPanel.prototype.init.call(this, m);
			r += 1;
			var o = "pcsp_" + r,
			q = this._innerPanel;
			this._piechart = h;
			k = gav.i18n.htmlAttribute;
			gav.locale.requestResources(this, ["PieChartPanel"]);
			h.addEventListener("propertyChange", v, this);
			var t = document.createElement("div");
			t.className = "gav-separator";
			var i = o + "_sl",
			i = c("<div class='gav-checkbox-container'><input id='" +
					i + "' type='checkbox'/><label " + k + "='PieChartPanel:showlabels' for='" + i + "'>Show labels</label></div>").appendTo(q)[0],
			w = c("input", i)[0];
			c(w).change(function () {
				h.setShowLabels(this.checked)
			});
			gav.utils.Binding.bindSetter(function (a) {
				c(w).attr("checked", a)
			}, h, "showLabels");
			var i = o + "_so",
			x = c("<div class='gav-checkbox-container'><input id='" + i + "' type='checkbox'/><label " + k + "='PieChartPanel:showselectiononly' for='" + i + "'>Show selection only</label></div>").appendTo(q)[0],
			s = c("input", x)[0];
			c(s).change(function () {
				h.setShowSelectionOnly(this.checked)
			});
			gav.utils.Binding.bindSetter(function (a) {
				c(s).attr("checked", a)
			}, h, "showSelectionOnly");
			gav.utils.Binding.bindSetter(function (a) {
				c(s).attr("disabled", a);
				c(x).find("label").toggleClass("gav-state-disabled", a)
			}, h, "forceShowSelectionOnly");
			q.appendChild(t.cloneNode(!1));
			var i = o + "_homer",
			i = c("<div class='gav-checkbox-container'><input id='" + i + "' type='checkbox'/><label " + k + "='PieChartPanel:showasdonut' for='" + i + "'>Show as donut</label></div>").appendTo(q)[0],
			y = c("input", i)[0];
			c(y).change(function () {
				h.setShowAsDonut(this.checked)
			});
			var p = document.createElement("div");
			h.getShowAsDonut() || (p.style.display = "none");
			gav.utils.Binding.bindSetter(function (a) {
				c(y).attr("checked", a);
				c(p)[a ? "slideDown" : "slideUp"](100)
			}, h, "showAsDonut");
			var a = document.createElement("div");
			this._focusAreaRatioSliderControl = new gav.controls.Slider({
					container : a,
					min : 0.5,
					max : 0.9,
					highlightProgress : !0,
					value : h.getInnerRadiusRatio(),
					step : 0.05,
					slide : function (a) {
						h.setInnerRadiusRatio(a)
					}
				});
			gav.utils.Binding.bindProperty(this._focusAreaRatioSliderControl, "value",
				h, "innerRadiusRatio");
			i = document.createElement("label");
			i.innerHTML = "Inner radius ratio:";
			i.setAttribute(k, "PieChartPanel:innerradiusratio");
			p.appendChild(i);
			p.appendChild(a);
			var o = o + "_sti",
			o = c("<div class='gav-checkbox-container'><input id='" + o + "' type='checkbox'/><label " + k + "='PieChartPanel:showvaluetextinsideslice' for='" + o + "'>Show share inside</label></div>").appendTo(p)[0],
			d = c("input", o)[0];
			c(d).change(function () {
				h.setShowValueTextInsideSlice(this.checked)
			});
			gav.utils.Binding.bindSetter(function (a) {
				c(d).attr("checked",
					a)
			}, h, "showValueTextInsideSlice");
			q.appendChild(p);
			o = document.createElement("div");
			this._maxSizeRatioSliderControl = new gav.controls.Slider({
					container : o,
					min : 0.5,
					max : 1,
					highlightProgress : !0,
					value : 0.8,
					step : 0.05,
					slide : function (a) {
						h.setMaxSizeRatio(a)
					}
				});
			gav.utils.Binding.bindProperty(this._maxSizeRatioSliderControl, "value", h, "maxSizeRatio");
			i = document.createElement("label");
			i.innerHTML = "Pie scale:";
			i.setAttribute(k, "PieChartPanel:maxsizeratio");
			q.appendChild(t.cloneNode(!1));
			q.appendChild(i);
			q.appendChild(o)
		}
	})
})(jQuery);

// ========== gav-m-timegraph.js ==========
;
(function (e) {
	gav.Klass("gav.components.TimeGraph", {
		extend : gav.components.Component,
		implement : [gav.representation.IVisibilityListConsumer, gav.representation.ISelectionListConsumer, gav.representation.IPickable, gav.snapshot.IStorable],
		init : function (a, b) {
			gav.components.Component.prototype.init.call(this, a);
			this._props = b;
			this._container = a;
			this._attribute = 0;
			this._showTimeDots = this._showAllLines = !1;
			this._showLegend = this._fitToSelection = this._showLineLabels = !0;
			this._useColorMapOnSelectedLines = !1;
			this._useFisheye =
				!0;
			this._lineAlpha = 0.4;
			this._floatingSlice = this._slice = 0;
			this._selectedIndices = [];
			this._numSelectedRecords = 0;
			this._note = "Note: select regions to view time profiles";
			this._isInPresentationMode = !1;
			this._paddingRight = this._paddingLeft = 10;
			this._paddingTop = this._paddingBottom = 0;
			this._minimumSpace = 50;
			this._reservedSpace = 0;
			this._maxNumLineLabels = 20;
			this._dotRadius = 4;
			this._dotRadiusSmall = 2;
			this._timeDotScaling = 1;
			this._timeDotOverScaling = 1.7;
			this._minH = 100;
			this._timeSpan = this._yMax = this._yMin = this._yAxisExplicitMax =
				this._yAxisExplicitMin = this._yAxesCalculatedMax = this._yAxesCalculatedMin = this._yAxesLimits = null;
			this._timeSpanExplicit = !1;
			this._frequency = 1;
			this._legendOrientation = 0;
			this._fcRatio = 0.1;
			this._lineOver = this._dotOverSliceIdx = this._dotOver = -1;
			this._canvases = gav.initCanvas(this._element);
			this._canvas = this._canvases.canvas1;
			this._ctx = this._canvas.getContext("2d");
			if (!this._ctx)
				return !1;
			this._bitmapScaleFactor = gav.devicePixelRatio;
			var c = this;
			e(this._element).bind("mouseout", function () {
				c.dispatchEvent(new gav.events.BrushEvent("itemOut"))
			});
			this._bindEvents();
			this._createLegendLayer();
			this._updateLegendOrientation()
		},
		state : function () {
			var a = this,
			b = {
				"#object" : this,
				"@attribute" : {
					"#type" : "int"
				},
				"@showAllLines" : {
					"#type" : "boolean"
				},
				"@showTimeDots" : {
					"#type" : "boolean"
				},
				"@showLineLabels" : {
					"#type" : "boolean"
				},
				"@lineAlpha" : {
					"#type" : "number"
				},
				"@useColorMap" : {
					set : function (b) {
						a.setUseColorMapOnSelectedLines(b)
					},
					get : function () {
						return a.getUseColorMapOnSelectedLines()
					}
				}
			};
			null != this.getAxisExplicitMin() && (b["@axisExplicitMin"] = {
					"#type" : "number"
				});
			null !=
			this.getAxisExplicitMax() && (b["@axisExplicitMax"] = {
					"#type" : "number"
				});
			return b
		},
		setNote : function (a) {
			this._note = a
		},
		getSnapshotType : function () {
			return gav.snapshot.SnapshotManager.type.COMPONENT
		},
		setPresentationMode : function (a) {
			this._isInPresentationMode = a;
			this.invalidateDisplay()
		},
		setDataSet : function (a) {
			(this._dataSet = a) ? (this._dataCube = this._dataSet.getDataCube(), this._timeSpan = {
					start : 0,
					end : this._dataCube.getNumSlices()
				}) : this._timeSpan = {
				start : 0,
				end : 0
			};
			this._dataSetChanged = !0;
			this.resetYRange();
			this.invalidateProperties();
			this.invalidateDisplay()
		},
		getDataSet : function () {
			return this._dataSet
		},
		setSlice : function (a) {
			this._dataCube && this._dataCube.getNumSlices() <= a && (a = 0);
			this._slice !== a && (this._floatingSlice = this._slice = a, this.invalidateDisplay())
		},
		getSlice : function () {
			return this._slice
		},
		setAttribute : function (a) {
			a = this._validateAttribute(a, 0);
			this._attribute !== a && (this._attribute = a, this.invalidateDisplay())
		},
		getAttribute : function () {
			return this._attribute
		},
		setFormatter : function (a) {
			this._formatter = a
		},
		getFormatter : function () {
			return this._formatter ||
			new gav.representation.AutomaticNumericStringProvider
		},
		setShowAllLines : function (a) {
			this._showAllLines = a;
			this.invalidateDisplay();
			this.dispatchEvent(new gav.events.PropertyChangeEvent("showAllLines", null, a))
		},
		getShowAllLines : function () {
			return this._showAllLines
		},
		setShowTimeDots : function (a) {
			this._showTimeDots = a;
			this.invalidateDisplay();
			this.dispatchEvent(new gav.events.PropertyChangeEvent("showTimeDots", null, a))
		},
		getShowTimeDots : function () {
			return this._showTimeDots
		},
		getTimeDotScaling : function () {
			return this._timeDotScaling
		},
		setTimeDotScaling : function (a) {
			isNaN(a) || (this._timeDotScaling = a, this.invalidateDisplay())
		},
		setShowLineLabels : function (a) {
			this._showLineLabels = a;
			this.invalidateDisplay();
			this.dispatchEvent(new gav.events.PropertyChangeEvent("showLineLabels", null, a))
		},
		getShowLineLabels : function () {
			return this._showLineLabels
		},
		setFitToSelection : function (a) {
			this._fitToSelection !== a && (this._fitToSelection = a, this._yAxisExplicitMax = this._yAxisExplicitMin = null, this.invalidateDisplay(), this.dispatchEvent(new gav.events.PropertyChangeEvent("fitToSelection",
						null, a)))
		},
		getFitToSelection : function () {
			return this._fitToSelection
		},
		setShowLegend : function (a) {
			this._showLegend = a;
			this._showLegendChanged = !0;
			this.invalidateProperties();
			this.invalidateDisplay();
			this.dispatchEvent(new gav.events.PropertyChangeEvent("showLegend", null, a))
		},
		getShowLegend : function () {
			return this._showLegend
		},
		setUseFisheye : function (a) {
			this._useFisheye = a;
			this._useFisheyeChanged = !0;
			this.invalidateProperties();
			this.invalidateDisplay();
			this.dispatchEvent(new gav.events.PropertyChangeEvent("useFisheye",
					null, a))
		},
		getUseFisheye : function () {
			return this._useFisheye
		},
		resetYRange : function () {
			this._yAxisExplicitMax = this._yAxisExplicitMin = null;
			this.invalidateDisplay()
		},
		setUseColorMapOnSelectedLines : function (a) {
			this._useColorMapOnSelectedLines = a;
			this._useColorMapOnSelectedLinesChanged = !0;
			this.invalidateProperties();
			this.invalidateDisplay();
			this.dispatchEvent(new gav.events.PropertyChangeEvent("useColorMapOnSelectedLines", null, a))
		},
		getUseColorMapOnSelectedLines : function () {
			return this._useColorMapOnSelectedLines
		},
		setLegendOrientation : function (a) {
			this._legendOrientation = a;
			this._legendOrientationChanged = !0;
			this.invalidateProperties();
			this.invalidateDisplay()
		},
		getLegendOrientation : function () {
			return this._legendOrientation
		},
		setLineAlpha : function (a) {
			this._lineAlpha = a;
			this.invalidateDisplay()
		},
		getLineAlpha : function () {
			return this._lineAlpha
		},
		setColorMap : function (a) {
			this._colorMap !== a && (this._colorMap && this._colorMap.removeEventListener("colorMapChanged", this._onColorMapChange, this), this._colorMap = a, this._globalRecordColors =
					null, this._colorMap && (this._colorMap.addEventListener("colorMapChanged", this._onColorMapChange, this), this._globalRecordColors = this._colorMap.getGlobalRecordColors ? this._colorMap.getGlobalRecordColors() : null), this.invalidateDisplay())
		},
		_onColorMapChange : function (a) {
			this._globalRecordColors = a.globalColors;
			this.invalidateDisplay()
		},
		getYMin : function () {
			return this._yMin
		},
		getYMax : function () {
			return this._yMax
		},
		getAxesCalculatedMin : function () {
			return this._yAxesCalculatedMin
		},
		getAxesCalculatedMax : function () {
			return this._yAxesCalculatedMax
		},
		setAxisExplicitMin : function (a) {
			this._yAxisExplicitMin = a;
			this._yAxisExplicitMinChanged = !0;
			this.invalidateDisplay()
		},
		getAxisExplicitMin : function () {
			return this._yAxisExplicitMin
		},
		getAxisExplicitMax : function () {
			return this._yAxisExplicitMax
		},
		setAxisExplicitMax : function (a) {
			this._yAxisExplicitMax = a;
			this._yAxisExplicitMaxChanged = !0;
			this.invalidateDisplay()
		},
		setTimeSpan : function (a) {
			this._timeSpanExplicit = !0;
			this._setTimeSpan(a)
		},
		getTimeSpan : function () {
			return this._timeSpan
		},
		_setTimeSpan : function (a) {
			this._timeSpan =
				a;
			this.invalidateDisplay()
		},
		setVisibilityList : function (a) {
			this._visibilityList !== a && (this._visibilityList && this._visibilityList.removeEventListener(gav.events.VisibilityEvent.VISIBILITY_CHANGED, this._onVisibilityListChange, this), (this._visibilityList = a) && this._visibilityList.addEventListener(gav.events.VisibilityEvent.VISIBILITY_CHANGED, this._onVisibilityListChange, this))
		},
		getVisibilityList : function () {
			return this._visibilityList
		},
		_onVisibilityListChange : function () {
			this._visibilityListChanged = !0;
			this.invalidateProperties();
			this.invalidateDisplay()
		},
		setAnimationController : function (a) {
			this._animationController !== a && (this._animationController && this._animationController.removeEventListener("progressChanged", this._onProgressChanged, this), (this._animationController = a) && this._animationController.addEventListener("progressChanged", this._onProgressChanged, this))
		},
		_onProgressChanged : function () {
			this._dataSet && this._dataCube && (this._floatingSlice = this._animationController.getProgress() * (this._dataCube.getNumSlices() - 1), this._slice =
					Math.floor(this._floatingSlice), this.invalidateDisplay())
		},
		setSelectionList : function (a) {
			this._selectionList !== a && (this._selectionList && this._selectionList.removeEventListener("selectionChanged", this._onSelectionChange, this), (this._selectionList = a) && this._selectionList.addEventListener("selectionChanged", this._onSelectionChange, this), this._onSelectionChange())
		},
		_onSelectionChange : function () {
			this._selectedIndices = this._selectionList ? this._selectionList.getSelectedRecords() : [];
			this._selectionListChanged =
				!0;
			this.invalidateProperties();
			this.invalidateDisplay()
		},
		setLineStyleProvider : function (a) {
			this._lineStyleProvider !== a && (this._lineStyleProvider = a, this.invalidateDisplay())
		},
		getLineStyleProvider : function () {
			return this._lineStyleProvider
		},
		_validateAttribute : function (a, b) {
			return this._dataSet && this._dataSet.getDataCube() && this._dataSet.getDataCube().getNumAttributes() <= a ? b : a
		},
		_updateSize : function () {
			gav.components.Component.prototype._updateSize.call(this);
			this._vw = this._width;
			this._vh = this._height;
			this._canvas.width =
				this._vw * this._bitmapScaleFactor;
			this._canvas.height = this._vh * this._bitmapScaleFactor;
			this._canvas.style.width = this._vw + "px";
			this._canvas.style.height = this._vh + "px";
			this._elementOffset = e(this._element).offset();
			this.invalidateProperties();
			this.invalidateDisplay()
		},
		_updateProperties : function () {
			if (this._selectionListChanged) {
				this._numSelectedRecords = this._selectedIndices ? this._selectedIndices.length : 0;
				this._selectedIndicesDictionary = {};
				for (var a = 0; a < this._numSelectedRecords; a++)
					this._selectedIndicesDictionary[this._selectedIndices[a]] =
						1
			}
			this._showLegend ? (this._dataSetChanged || this._selectionListChanged || this._visibilityListChanged || this._useColorMapOnSelectedLinesChanged ? this._updateLegendItems() : e(this._legendLayer).show(), this._legendOrientationChanged && this._updateLegendOrientation(), this._legendOrientationChanged = this._useColorMapOnSelectedLinesChanged = this._visibilityListChanged = this._selectionListChanged = this._dataSetChanged = !1) : e(this._legendLayer).hide();
			this._maxDotRadius = this._dotRadius * this._timeDotScaling * this._timeDotOverScaling
		},
		_updateLegendItems : function () {
			if (this._dataSet) {
				this._legendItems.innerHTML = "";
				for (var a = document.createDocumentFragment(), b = 0, c = this._dataSet.getRecordInformation(), f = 0; f < this._numSelectedRecords; f++) {
					var h = this._selectedIndices[f];
					if (!this._visibilityList || this._visibilityList.isVisible(h)) {
						b++;
						var g = document.createElement("li"),
						d = document.createElement("span");
						d.style.backgroundColor = this._useColorMapOnSelectedLines ? this._colorMap.getColor(h).toRGB() : this._lineStyleProvider.getColor(f);
						g.appendChild(d);
						h = (c && c[h] ? c[h].name : "") + (this._isNoValue(h) ? " (no value)" : "");
						g.appendChild(document.createTextNode(10 < b ? "..." : h));
						a.appendChild(g);
						if (10 < b)
							break
					}
				}
				this._legendLayer.style.display = 0 < b ? "" : "none";
				this._legendItems.appendChild(a);
				this._updateLegendOrientation()
			} else
				this._legendLayer.style.display = "none"
		},
		_isNoValue : function (a) {
			if (!this._dataCube)
				return !0;
			var b = this._dataCube.getNumSlices(),
			c = this._dataCube.getNumRecords();
			if (a >= c)
				return !0;
			for (c = 0; c < b; c++)
				if (!isNaN(this._dataCube.getValue(a, this._attribute,
							c)))
					return !1;
			return !0
		},
		_updateLegendOrientation : function () {
			e(this._legendItems).toggleClass("gav-horizontal", 1 === this._legendOrientation)
		},
		_updateDisplay : function () {
			this._draw()
		},
		_draw : function () {
			if (this._dataSet && this._dataSet.getDataCube() && !(0 >= this._width || 0 >= this._height)) {
				this._maxDotRadius = this._dotRadius * this._timeDotScaling * this._timeDotOverScaling;
				this._paddingLeft = this._showLegend ? Math.max(this._maxDotRadius + 1, 5) : this._showLineLabels && this._numSelectedRecords <= this._maxNumLineLabels ? this._isInPresentationMode ?
					100 : 60 : Math.max(this._maxDotRadius + 1, 10);
				var a = this._plotWidth;
				this._plotWidth = Math.round(this._vw - this._paddingLeft - this._paddingRight - this._reservedSpace);
				this._paddingBottom = this._isInPresentationMode ? 0 : 16;
				this._plotHeight = Math.round(this._vh - this._paddingTop - this._paddingBottom);
				this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
				this._ctx.save();
				this._ctx.scale(this._bitmapScaleFactor, this._bitmapScaleFactor);
				this._ctx.save();
				this._ctx.beginPath();
				this._ctx.rect(0, 0, this._vw, this._plotHeight);
				this._ctx.clip();
				this._ctx.closePath();
				this._computeWidths();
				this._drawGrid();
				this._drawTimeIndicator();
				this._drawGraphLines();
				this._drawGraphDots();
				this._ctx.restore();
				this._updateLabels();
				this._showLegend || this._drawLineLabels();
				this._drawEmptyNote();
				this._ctx.restore();
				this._plotWidth != a && this.dispatchEvent("plotWidthChanged")
			}
		},
		_computeWidths : function () {
			this._numSlices = this._dataCube.getNumSlices();
			this._posDict = Array(this._numSlices);
			var a = this._timeSpan.end - this._timeSpan.start - 1;
			if (this._useFisheye)
				for (var a =
						this._plotWidth / (a + (this._numSlices - a - 1) * this._fcRatio), b = a * this._fcRatio, c = 0; c < this._numSlices; c++) {
					var f = 0,
					f = c <= this._timeSpan.start ? Math.round(c * b + this._paddingLeft) : c < this._timeSpan.end ? Math.round(this._timeSpan.start * b + (c - this._timeSpan.start) * a + this._paddingLeft) : Math.round((this._timeSpan.start + c - this._timeSpan.end + 1) * b + (this._timeSpan.end - 1 - this._timeSpan.start) * a + this._paddingLeft);
					this._posDict[c] = f
				}
			else {
				a = this._plotWidth / a;
				for (c = this._timeSpan.start; c < this._timeSpan.end; c++)
					this._posDict[c] =
						Math.round((c - this._timeSpan.start) * a + this._paddingLeft)
			}
		},
		_getPositionAt : function (a) {
			return this._posDict[a]
		},
		_drawGrid : function () {
			this._timeSpan || (this._timeSpan = {
					start : 0,
					end : this._dataCube.getNumSlices()
				});
			this._numSkipSlices = Math.ceil((this._timeSpan.end - this._timeSpan.start) / (Math.floor(this._plotWidth / this._minimumSpace - 1) + 1));
			var a = this._dataCube.getNumRecords(),
			b = this._ctx;
			b.save();
			b.fillStyle = "#cccccc";
			var c = Math.pow(2, 53) - 1,
			f = -Math.pow(2, 53);
			if (!this._showAllLines && this._fitToSelection &&
				0 < this._numSelectedRecords) {
				var h = !1,
				g,
				d;
				this._useFisheye ? (g = 0, d = this._dataCube.getNumSlices()) : (g = this._timeSpan.start, d = this._timeSpan.end);
				for (; g < d; g++)
					for (var e = 0; e < this._numSelectedRecords; e++)
						if (!(this._selectedIndices[e] >= a)) {
							var i = this._dataCube.getValue(this._selectedIndices[e], this._attribute, g);
							isNaN(i) || (h = !0, f = Math.max(f, i), c = Math.min(c, i))
						}
				h || (f = this._dataCube.getMaxValue(this._attribute), c = this._dataCube.getMinValue(this._attribute))
			} else
				f = this._dataCube.getMaxValue(this._attribute),
				c = this._dataCube.getMinValue(this._attribute);
			f === c && (f++, c--);
			g = this._yMin;
			h = this._yMax;
			this._yMin = c;
			this._yMax = f;
			if ((g !== this._yMin || h !== this._yMax) && !this._yAxisExplicitMaxChanged && !this._yAxisExplicitMinChanged)
				this._yAxisExplicitMax = this._yAxisExplicitMin = null;
			this._yAxisExplicitMinChanged = this._yAxisExplicitMaxChanged = !1;
			d = f - c;
			a = ((null === this._yAxisExplicitMax ? f : this._yAxisExplicitMax) - (null === this._yAxisExplicitMin ? c : this._yAxisExplicitMin)) / Math.floor(this._plotHeight / 100);
			e = Math.pow(10, Math.floor(Math.log(a) /
						Math.log(10)));
			a = Math.floor(a / e) * e;
			this._yAxesCalculatedMin = c - 0.1 * Math.abs(d);
			c = null === this._yAxisExplicitMin ? this._yAxesCalculatedMin : this._yAxisExplicitMin;
			this._yAxesCalculatedMax = f + 0.1 * Math.abs(d);
			f = null === this._yAxisExplicitMax ? this._yAxesCalculatedMax : this._yAxisExplicitMax;
			(g !== c || h !== f) && this.dispatchEvent("rangeChanged");
			h = a * this._plotHeight / (f - c);
			0 === h && (h = 1);
			if (300 < h)
				for (g = 1 / 3; 300 < h; )
					h *= g, a *= g;
			else if (100 > 3 * h)
				for (; 100 > 3 * h; )
					h *= 3, a *= 3;
			d = this._paddingBottom;
			e = Math.ceil(c / a) * a;
			i = d + h / a * (e - c);
			if (2 < this._numSlices)
				for (g = 0; g < this._numSlices; g += this._frequency)
					this._isSkipped(g) || (b.fillStyle = this._dotOverSliceIdx === g ? "#00ffff" : g < this._timeSpan.start || g >= this._timeSpan.end ? gav.getStyleFor("axisGuide", "colorSecondary", this._isInPresentationMode) : 0 === (g - this._timeSpan.start) % this._numSkipSlices ? gav.getStyleFor("axisGuide", "color", this._isInPresentationMode) : gav.getStyleFor("axisGuide", "colorSecondary", this._isInPresentationMode), b.fillRect(this._getPositionAt(g), this._paddingTop, this._dotOverSliceIdx ===
							g ? 2 : 1, this._plotHeight));
			b.fillStyle = gav.getStyleFor("axisGuide", "colorSecondary", this._isInPresentationMode);
			for (g = -0.5; i + g * h < d + this._plotHeight; g++) {
				var k = Math.round(this._vh - (i + g * h));
				b.fillRect(this._paddingLeft + 1, k, this._plotWidth - 1 + this._reservedSpace, 1)
			}
			b.font = gav.getStyleFor("axisLabel", "font", this._isInPresentationMode);
			b.textBaseline = "top";
			k = "";
			for (g = 0; i + g * h < d + this._plotHeight + h; g++)
				k = Math.round(this._vh - (i + g * h)), b.fillStyle = gav.getStyleFor("axisGuide", "color", this._isInPresentationMode),
				b.fillRect(this._paddingLeft + 1, k, this._plotWidth - 1 + this._reservedSpace, 1), b.fillStyle = gav.getStyleFor("axisLabel", "color", this._isInPresentationMode), k = this.getFormatter().getFormattedAttributeValue(this._attribute, e + g * a), b.fillText(k, this._paddingLeft + 1, this._vh - (i + g * h) + 2);
			this._findLegendLeftDone || (b.measureText(k), this._findLegendLeftDone = !0);
			b.fillStyle = b.fillStyle = gav.getStyleFor("axisGuide", "colorSecondary", this._isInPresentationMode);
			b.fillRect(this._paddingLeft, this._paddingTop, 1, this._plotHeight);
			b.fillRect(this._paddingLeft, this._paddingTop + this._plotHeight - 1, this._plotWidth + 1 + this._reservedSpace, 1);
			b.fillRect(this._paddingLeft, this._paddingTop, this._plotWidth + 1 + this._reservedSpace, 1);
			this._drawVerticalDashLine(this._paddingLeft + this._plotWidth + this._reservedSpace, this._paddingTop, this._paddingTop + this._plotHeight, b);
			this._yAxesLimits = {
				min : c,
				max : f
			};
			b.restore()
		},
		_isSkipped : function (a) {
			return !this._useFisheye && (a < this._timeSpan.start || a >= this._timeSpan.end)
		},
		_drawVerticalDashLine : function (a,
			b, c, f) {
			for (var h = Math.floor((c - b) / 7), g = 0; g < h; g++)
				f.fillRect(a, b + 7 * g, 1, 5);
			b += 7 * h;
			b < c && f.fillRect(a, b, 1, c - b)
		},
		_updateLabels : function () {
			if (this._dataCube && this._timeSpan) {
				var a = this._dataSet.getSliceInformation();
				if (a && 1 !== a.length) {
					var b = this._ctx;
					b.save();
					b.font = gav.getStyleFor("axisLabel", "font", this._isInPresentationMode);
					b.textBaseline = "bottom";
					b.fillStyle = gav.getStyleFor("axisLabel", "color", this._isInPresentationMode);
					b.textAlign = "left";
					for (var c = this._numSlices - 1, f = this._getPositionAt(this._useFisheye ?
								0 : this._timeSpan.start), c = this._getPositionAt(c), h = this._timeSpan.start; h < this._timeSpan.end; h++)
						if (0 === (h - this._timeSpan.start) % this._numSkipSlices) {
							var g = a[h].name,
							d = b.measureText(g).width,
							e = this._vh,
							i = this._getPositionAt(h);
							b.textAlign = i - f < d / 2 ? "left" : c - i < d / 2 ? "right" : "center";
							try {
								b.fillText(g, i, e)
							} catch (k) {}

						}
					b.restore()
				}
			}
		},
		_drawTimeIndicator : function () {
			var a = this._dataSet.getSliceInformation()[this._slice].name;
			if (a) {
				var b = this._getPositionAt(this._slice) - 1,
				c = this._paddingTop;
				this._ctx.save();
				this._ctx.fillStyle =
					"#009dff";
				this._ctx.fillRect(b, c, 2, this._plotHeight);
				this._ctx.fillStyle = "#cccccc";
				this._ctx.font = "18pt Verdana";
				var f = this._numSlices - 1,
				h = this._getPositionAt(this._useFisheye ? 0 : this._timeSpan.start),
				f = this._getPositionAt(f),
				g = this._ctx.measureText(a).width;
				this._ctx.textAlign = b - g / 2 < h ? "left" : b + g / 2 > f ? "right" : "center";
				this._ctx.textBaseline = "middle";
				try {
					this._ctx.fillText(a, b, c + this._plotHeight / 2)
				} catch (d) {}

				this._ctx.restore()
			}
		},
		_drawGraphLines : function () {
			this._theSlice = Math.min(Math.floor(this._floatingSlice),
					this._timeSpan.end - 1);
			this._ctx.save();
			this._valueLabels = [];
			for (var a = this._dataCube.getNumRecords(), b = 0; b < a; b++)
				this._showAllLines && !this._selectedIndicesDictionary[b] && (!this._visibilityList || this._visibilityList.isVisible(b)) && this._drawGraphLine(b, -1);
			for (var c = 0; c < this._numSelectedRecords; c++)
				b = this._selectedIndices[c], b >= a || (!this._visibilityList || this._visibilityList.isVisible(b)) && this._drawGraphLine(b, c);
			this._ctx.restore()
		},
		_drawGraphLine : function (a, b) {
			this._ctx.lineWidth = 1;
			-1 !== b && (this._ctx.lineWidth =
					this._isInPresentationMode ? 4 : 2);
			this._alreadyMoveTo = !1;
			this._ctx.strokeStyle = -1 === b ? "#000000" : this._lineStyleProvider.getColor(b);
			this._ctx.strokeStyle = this._useColorMapOnSelectedLines ? this._colorMap.getColor(a).toRGB() : this._ctx.strokeStyle;
			this._ctx.globalAlpha = -1 !== b ? 1 : this._lineAlpha;
			this._ctx.beginPath();
			for (var c = 0; c <= this._slice; c++)
				this._drawGraphLineOneSlice(a, c);
			this._ctx.stroke();
			this._ctx.globalAlpha = -1 !== b ? 0.25 : this._lineAlpha;
			this._ctx.beginPath();
			void 0 != this._lastX && this._ctx.moveTo(this._lastX,
				this._lastY);
			for (c = this._slice; c < this._numSlices; c++)
				this._isSkipped(c) || this._drawGraphLineOneSlice(a, c);
			this._ctx.stroke()
		},
		_drawGraphLineOneSlice : function (a, b) {
			var c = this._dataCube.getValue(a, this._attribute, b);
			if (!isNaN(c)) {
				var c = (c - this._yAxesLimits.min) / (this._yAxesLimits.max - this._yAxesLimits.min),
				f = this._getPositionAt(b),
				c = (1 - c) * this._plotHeight + this._paddingTop;
				this._lastX = f;
				this._lastY = c;
				this._alreadyMoveTo ? this._ctx.lineTo(f, c) : (this._ctx.moveTo(f, c), this._alreadyMoveTo = !0, this._selectedIndicesDictionary[a] &&
					this._valueLabels.push({
						record : a,
						yPos : c,
						xPos : f,
						lineWidth : this._ctx.lineWidth,
						strokeStyle : this._ctx.strokeStyle,
						lineAlpha : this._ctx.globalAlpha
					}))
			}
		},
		_drawGraphDots : function () {
			if (this._showTimeDots) {
				this._ctx.save();
				this._ctx.globalAlpha = 1;
				this._ctx.strokeStyle = "#000000";
				this._ctx.strokeStyle = "rgba(0,0,0,0.5)";
				this._ctx.lineWidth = 1;
				for (var a = 0; a < this._numSelectedRecords; a++) {
					var b = this._selectedIndices[a];
					(!this._visibilityList || this._visibilityList.isVisible(b)) && this._drawGraphDot(b)
				}
				this._ctx.restore()
			}
		},
		_drawGraphDot : function (a) {
			for (var b = 0; b <= this._slice; b += this._frequency)
				if (!this._isSkipped(b)) {
					var c = this._dataCube.getValue(a, this._attribute, b);
					if (!isNaN(c)) {
						var f = "#ccc";
						this._globalRecordColors && this._globalRecordColors[b] ? f = this._globalRecordColors[b][a] || f : this._colorMap.getColorOfStepAndAttribute ? f = this._colorMap.getColorOfStepAndAttribute(a, this._colorMap.getAttribute(), b) || f : this._colorMap && (f = this._colorMap.getColor(a) || f);
						f.toRGB && (f = f.toRGB());
						this._ctx.fillStyle = f;
						c = (c - this._yAxesLimits.min) /
						(this._yAxesLimits.max - this._yAxesLimits.min);
						f = this._getPositionAt(b);
						c = (1 - c) * this._plotHeight + this._paddingTop;
						this._ctx.beginPath();
						var h = this._dotRadius;
						this._ctx.globalAlpha = 1;
						if (b < this._timeSpan.start || b >= this._timeSpan.end)
							h = this._dotRadiusSmall, this._ctx.globalAlpha = 0.5;
						this._ctx.arc(f, c, h * this._timeDotScaling * (a === this._dotOver ? this._timeDotOverScaling : 1), 0, 2 * Math.PI);
						this._ctx.fill();
						this._ctx.stroke()
					}
				}
		},
		_drawLineLabels : function () {
			if (this._showLineLabels && !(this._numSelectedRecords > this._maxNumLineLabels)) {
				var a =
					this._vh / (this._numSelectedRecords + 1);
				this._valueLabels.sort(this._sortLabels);
				this._ctx.save();
				for (var b = 0; b < this._numSelectedRecords; b++)
					this._valueLabels[b] ? this._drawLineLabel(b, this._valueLabels[b].record, a * (b + 1), this._valueLabels[b].yPos, this._valueLabels[b].xPos) : this._drawLineLabelOnly(this._selectedIndices[b], a * (b + 1), !0);
				this._ctx.restore()
			}
		},
		_sortLabels : function (a, b) {
			return a.yPos - b.yPos
		},
		_drawLineLabelOnly : function (a, b, c) {
			var f = this._isInPresentationMode ? 67 : 37,
			b = b - (this._isInPresentationMode ?
					10 : 5),
			h = 10;
			this._isInPresentationMode && (h = 16);
			this._ctx.font = gav.getStyleFor("itemLabel", "font", this._isInPresentationMode);
			var a = this._dataSet.getRecordInformation()[a].name,
			g = Math.round(this._ctx.measureText(a).width);
			this._ctx.globalAlpha = 0.6;
			this._ctx.fillStyle = "#ffffff";
			this._maxDotRadius = this._dotRadius * this._timeDotScaling * this._timeDotOverScaling;
			95 < g ? (this._ctx.textAlign = "left", f = 5, this._ctx.fillRect(f, b, g + 2, 1.2 * h)) : (f = this._paddingLeft - g / 2 - this._maxDotRadius - 2, this._ctx.textAlign = "center",
				this._ctx.fillRect(f - g / 2 - 1, b, g + 2, 1.2 * h));
			this._ctx.textBaseline = "top";
			this._ctx.fillStyle = gav.getStyleFor("itemLabel", "color", this._isInPresentationMode);
			this._ctx.globalAlpha = 1;
			this._ctx.fillText(a, f, b);
			c && this._ctx.fillText("(no value)", f, b + (this._isInPresentationMode ? 16 : 12))
		},
		_drawLineLabel : function (a, b, c, f, h) {
			if (!isNaN(f)) {
				var g = this._isInPresentationMode ? 67 : 37;
				this._ctx.save();
				this._ctx.lineWidth = 0.5 * this._valueLabels[a].lineWidth;
				this._ctx.strokeStyle = this._useColorMapOnSelectedLines ? this._colorMap.getColor(b).toRGB() :
					this._valueLabels[a].strokeStyle;
				this._ctx.globalAlpha = 0.5 * this._valueLabels[a].lineAlpha;
				this._ctx.beginPath();
				this._ctx.moveTo(g + 3, c);
				this._ctx.lineTo(h, f);
				this._ctx.stroke();
				this._ctx.restore();
				this._drawLineLabelOnly(b, c)
			}
		},
		_drawEmptyNote : function () {
			var a = this._note;
			if (0 < this._numSelectedRecords || this._showAllLines) {
				for (a = a = 0; a < this._numSelectedRecords; a++)
					if (!this._isNoValue(this._selectedIndices[a]))
						return;
				a = "Note: Selected records contain no data for this indicator"
			}
			this._ctx.save();
			this._ctx.font =
				"10pt Verdana";
			this._ctx.textBaseline = "top";
			this._ctx.textAlign = "center";
			this._ctx.fillStyle = "#1a1a1a";
			this._ctx.fillText(a, this._paddingLeft + (this._plotWidth + this._reservedSpace) / 2, this._paddingTop + this._plotHeight / 2 - 20);
			this._ctx.restore()
		},
		_bindEvents : function () {
			var a = this;
			e(this._canvas).mousemove(function (b) {
				a._onMouseMove(b)
			});
			e(this._canvas).mousedown(function (b) {
				a._onMouseDown(b)
			})
		},
		_createLegendLayer : function () {
			this._legendLayer = document.createElement("div");
			e(this._legendLayer).css({
				top : 0,
				right : "0%",
				position : "absolute"
			});
			this._element.appendChild(this._legendLayer);
			this._legendItems = document.createElement("ul");
			this._legendLayer.appendChild(this._legendItems);
			e(this._legendItems).addClass("gav-chart-legend");
			var a = this,
			b = this._legendLayer,
			c = !1,
			f,
			h,
			g,
			d,
			j,
			i,
			k,
			l;
			e(b).bind("gavdragstart", function (o) {
				c = !0;
				var n = e(b).offset();
				g = n.left;
				d = n.top;
				k = e(b).outerWidth();
				l = e(b).outerHeight();
				j = e(a._container).width();
				i = e(a._container).height();
				f = o.gav.x - g;
				h = o.gav.y - d
			}).bind("gavdrag", function (d) {
				if (!c)
					return !1;
				var g = d.gav.x - a._elementOffset.left,
				m = d.gav.y - a._elementOffset.top,
				g = g - f,
				m = m - h;
				e(b).css({
					bottom : "",
					right : "",
					top : Math.max(0, Math.min(m, i - l)),
					left : Math.max(0, Math.min(g, j - k))
				});
				d.preventDefault();
				return !1
			}).bind("gavdragend", function () {
				c = !1;
				j < k && (b.style.left = 0, b.style.right = "");
				i < l && (b.style.top = 0, b.style.bottom = "");
				var a = e(b).position(),
				h = (a.top + l / 2) / i,
				d = (a.left + k / 2) / j;
				b.style.top = 0.5 >= h ? 100 * (a.top / i) + "%" : "";
				b.style.bottom = 0.5 < h ? 100 * (1 - (a.top + l) / i) + "%" : "";
				b.style.left = 0.5 >= d ? 100 * (a.left / j) + "%" : "";
				b.style.right = 0.5 < d ? 100 * (1 - (a.left + k) / j) + "%" : ""
			})
		},
		_onMouseMove : function (a) {
			if (this._dataCube) {
				var b = e(this._canvas).offset(),
				c = a.pageX - b.left,
				b = a.pageY - b.top,
				f;
				if (this._showTimeDots)
					for (var h = 0; h < this._numSelectedRecords; h++) {
						var g = this._selectedIndices[h];
						if (!this._visibilityList || this._visibilityList.isVisible(g))
							for (var d = this._timeSpan.start; d < this._timeSpan.end; d += this._frequency) {
								var j = this._dataCube.getValue(g, this._attribute, d);
								if (!isNaN(j)) {
									var j = (j - this._yAxesLimits.min) / (this._yAxesLimits.max -
										this._yAxesLimits.min),
									i = this._getPositionAt(d),
									j = (1 - j) * this._plotHeight + this._paddingTop;
									if (Math.pow(i - c, 2) + Math.pow(j - b, 2) <= Math.pow(this._dotRadius, 2)) {
										this._dotOver = g;
										this._dotOverSliceIdx = d;
										this._draw();
										f = new gav.events.BrushEvent("dotOver");
										f.item = g;
										f.slice = d;
										f.e = a;
										this.dispatchEvent(f);
										return
									}
								}
							}
					}
				this._dotOver = -1;
				-1 !== this._dotOverSliceIdx && (this._dotOverSliceIdx = this._isDotOver = -1, this._draw());
				for (h = 0; h < this._dataCube.getNumRecords(); h++)
					if (this._showAllLines || this._selectedIndicesDictionary[h])
						if (!this._visibilityList ||
							this._visibilityList.isVisible(h))
							for (d = this._timeSpan.start; d < this._timeSpan.end; d += this._frequency)
								if (j = this._dataCube.getValue(h, this._attribute, d), !isNaN(j)) {
									var k = d + this._frequency;
									if (k >= this._timeSpan.end)
										break;
									g = this._dataCube.getValue(h, this._attribute, k);
									if (!isNaN(g) && (j = (j - this._yAxesLimits.min) / (this._yAxesLimits.max - this._yAxesLimits.min), i = this._getPositionAt(d), j = (1 - j) * this._plotHeight + this._paddingTop, g = (g - this._yAxesLimits.min) / (this._yAxesLimits.max - this._yAxesLimits.min), k = this._getPositionAt(k) *
												this._plotWidth + this._paddingLeft, this._isOnLine(i, j, k, (1 - g) * this._plotHeight + this._paddingTop, c, b))) {
										this._lineOver = h;
										f = new gav.events.BrushEvent("lineOver");
										f.item = h;
										f.e = a;
										this.dispatchEvent(f);
										return
									}
								}
				f || (f = new gav.events.BrushEvent("itemOut"), this._lineOver = -1);
				f.e = a;
				this.dispatchEvent(f)
			}
		},
		_onMouseDown : function (a) {
			-1 !== this._lineOver && (a.ctrlKey ? this._selectedIndicesDictionary[this._lineOver] ? (this._selectedIndices.splice(this._selectedIndices.indexOf(this._lineOver), 1), delete this._selectedIndicesDictionary[this._lineOver]) :
				(this._selectedIndices.push(this._lineOver), this._selectedIndicesDictionary[this._lineOver] = 1) : (this._selectedIndices = [this._lineOver], this._selectedIndicesDictionary = {}, this._selectedIndicesDictionary[this._lineOver] = 1), a = gav.events.PickedEvent, this.dispatchEvent(new a(this._selectedIndices, a.REPLACE)))
		},
		_isOnLine : function (a, b, c, f, h, g) {
			var d = h - a,
			e = g - b,
			a = c - a,
			b = f - b,
			c = h - c,
			f = g - f;
			if (0 > d * a + e * b || 0 < a * c + b * f)
				return !1;
			d = Math.abs(d * f - e * c) / Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
			this._minH = Math.min(d, this._minH);
			return 2 >= d
		}
	})
})(jQuery);
(function (e) {
	var a = 0,
	b = "Vertical",
	c = "Horizontal",
	f;
	gav.Klass("gav.components.TimeGraphPanel", {
		extend : gav.components.ComponentPanel,
		implement : [gav.snapshot.ISnapshotReadableComponent, gav.snapshot.IStorablesContainer],
		init : function (h) {
			gav.components.ComponentPanel.prototype.init.call(this, h);
			a++;
			h = "tgp_" + a;
			f = gav.i18n.htmlAttribute;
			gav.locale.registerResourceAlias("TimeGraphPanel", "timegraph");
			gav.locale.requestResources(this, ["TimeGraphPanel"]);
			e(this._contentPanel).addClass("gav-component-timegraph-panel");
			var g = document.createElement("div");
			e(g).css({
				position : "absolute",
				height : "100%"
			}).addClass("gav-component-settings gav-state-hidden");
			this._settingsPanel = g;
			this._settingsPanelToggleButton = document.createElement("button");
			e(this._settingsPanelToggleButton).css({
				position : "absolute",
				top : 2,
				left : 2,
				zIndex : 1
			}).bind("click", function () {
				e(g).toggleClass("gav-state-hidden");
				var a = !e(g).hasClass("gav-state-hidden");
				e(this).toggleClass("gav-state-active", a);
				a ? e(".gav-icon", this).addClass("gav-icon-left").removeClass("gav-icon-right") :
				e(".gav-icon", this).addClass("gav-icon-right").removeClass("gav-icon-left");
				j._validateSize()
			}).gavButton_old({
				iconize : !0,
				icon : "gav-icon-right"
			});
			this._contentPanel.appendChild(this._settingsPanelToggleButton);
			var d = document.createElement("div");
			e(d).css({
				position : "absolute"
			}).addClass("gav-base-component");
			this._componentContainer = d;
			this._timeGraph = new gav.components.TimeGraph(d);
			this._contentPanel.appendChild(d);
			this._contentPanel.appendChild(g);
			this._isInPresentationMode = !1;
			var j = this;
			this._timeGraph.addEventListener("propertyChange",
				function (a) {
				switch (a.property) {
				case "showLineLabels":
					j._showLineLabels.checked = j._timeGraph.getShowLineLabels();
					break;
				case "showTimeDots":
					j._showTimeDots.checked = j._timeGraph.getShowTimeDots();
					break;
				case "useColorMapOnSelectedLines":
					j._useColorMap.checked = j._timeGraph.getUseColorMapOnSelectedLines();
					break;
				case "fitToSelection":
					j._fitToSelection.checked = j._timeGraph.getFitToSelection();
					break;
				case "showAllLines":
					j._showAllLines.checked = j._timeGraph.getShowAllLines();
					break;
				case "useFisheye":
					e(j).toggleClass("gav-state-active",
						j._timeGraph.getUseFisheye())
				}
			}, this);
			this._timeGraph.addEventListener("plotWidthChanged", function () {
				j._validateSize()
			}, this);
			var i = this._timeGraph;
			this._ddlAttribute = new gav.controls.ComboBox({
					vertical : !1,
					fontSize : 16,
					clean : !0
				});
			this._ddlAttribute.addEventListener("change", function () {
				i.setAttribute(j._ddlAttribute.getSelectedIndex());
				i.setAxisExplicitMin(null);
				i.setAxisExplicitMax(null);
				j._validateSize()
			});
			gav.utils.Binding.bindProperty(this._ddlAttribute, "selectedIndex", i, "attribute");
			this._contentPanel.appendChild(this._ddlAttribute.getDOMElement());
			d = document.createElement("div");
			e(d).css({
				position : "absolute",
				width : "100%",
				textAlign : "center",
				"box-sizing" : "border-box",
				"-moz-box-sizing" : "border-box",
				top : 0
			});
			d.appendChild(this._ddlAttribute.getDOMElement());
			this._contentPanel.appendChild(d);
			var k = this;
			this._hTimeSlider = document.createElement("div");
			this._timeSpanSliderControl = new gav.controls.Slider({
					min : 0,
					max : 1,
					range : !0,
					minRange : 1,
					values : [0, 1],
					step : 1,
					slide : function (a) {
						k._context && k._context.getDataSet() && i.setTimeSpan({
							start : a[0],
							end : a[1] + 1
						})
					},
					container : this._hTimeSlider,
					tooltipFunction : function (a) {
						return !k._context || !k._context.getDataSet() || !k._context.getDataSet().getSliceInformation() ? a : k._context.getDataSet().getSliceInformation()[a].name || a
					}
				});
			d = document.createElement("div");
			e(d).css({
				position : "absolute",
				bottom : 0,
				right : 20,
				width : "100%",
				padding : "0 0 0 0"
			}).addClass("gav-data-range-container").appendTo(this._contentPanel);
			d.appendChild(this._hTimeSlider);
			this._hTimeSliderContainer = d;
			this._btnFisheye = e("<button'></button>").click(function () {
					i.setUseFisheye(!i.getUseFisheye());
					e(this).toggleClass("gav-state-active", i.getUseFisheye())
				}).css({
					position : "absolute",
					left : 0,
					bottom : 0
				}).gavButton_old({
					iconize : !0,
					icon : "gav-icon-bar-focus"
				}).attr("title", "Toggle line focus").appendTo(this._contentPanel);
			e(this._btnFisheye).toggleClass("gav-state-active", i.getUseFisheye());
			this._vDataRangeSlider = document.createElement("div");
			e(this._vDataRangeSlider).css({
				padding : "2%",
				margin : "auto",
				height : "96%"
			});
			this._verticalDataRangeSliderControl = new gav.controls.Slider({
					values : [0, 100],
					vertical : !0,
					range : !0,
					slide : function (a) {
						var b = a[1];
						i.setAxisExplicitMin(a[0]);
						i.setAxisExplicitMax(b)
					},
					container : this._vDataRangeSlider,
					tooltipFunction : function (a) {
						return i.getFormatter().getFormattedAttributeValueWithUnit(i.getAttribute(), a)
					},
					tooltipPlacement : "left"
				});
			d = document.createElement("div");
			e(d).css({
				position : "absolute",
				right : 0,
				top : 0,
				height : "100%"
			}).addClass("gav-slider-container gav-slider-container-vertical").appendTo(this._contentPanel);
			d.appendChild(this._vDataRangeSlider);
			this._vDataRangeSliderContainer =
				d;
			this._btnResetYScale = e("<button'></button>").click(function () {
					i.resetYRange();
					k.onGraphChange()
				}).css({
					position : "absolute",
					right : 0,
					top : 0
				}).gavButton_old({
					iconize : !0,
					icon : "gav-icon-reset"
				}).appendTo(d)[0];
			d = h + "_sll";
			d = e("<div class='gav-checkbox-container'><input id='" + d + "' type='checkbox'/><label " + f + "='timegraph:displaylabels' for='" + d + "'>Show line labels</label></div>")[0];
			this._showLineLabels = e("input", d)[0];
			e(this._showLineLabels).change(function () {
				i.setShowLineLabels(this.checked)
			}).attr("checked",
				i.getShowLineLabels());
			g.appendChild(d);
			d = h + "_std";
			d = e("<div class='gav-checkbox-container'><input id='" + d + "' type='checkbox'/><label " + f + "='timegraph:displaytimedots' for='" + d + "'>Show time dots</label></div>")[0];
			this._showTimeDots = e("input", d)[0];
			e(this._showTimeDots).change(function () {
				i.setShowTimeDots(this.checked)
			}).attr("checked", i.getShowTimeDots());
			g.appendChild(d);
			d = h + "_ucm";
			d = e("<div class='gav-checkbox-container'><input id='" + d + "' type='checkbox'/><label " + f + "='timegraph:usecolormap' for='" +
					d + "'>Use colour map</label></div>")[0];
			this._useColorMap = e("input", d)[0];
			e(this._useColorMap).change(function () {
				i.setUseColorMapOnSelectedLines(this.checked)
			}).attr("checked", i.getUseColorMapOnSelectedLines());
			g.appendChild(d);
			d = h + "_fts";
			d = e("<div class='gav-checkbox-container'><input id='" + d + "' type='checkbox'/><label " + f + "='timegraph:fittoselection' for='" + d + "'>Fit to selection</label></div>")[0];
			this._fitToSelection = e("input", d)[0];
			e(this._fitToSelection).change(function () {
				i.setFitToSelection(this.checked)
			}).attr("checked",
				i.getFitToSelection());
			g.appendChild(d);
			d = h + "_al";
			d = e("<div class='gav-checkbox-container'><input id='" + d + "' type='checkbox'/><label " + f + "='timegraph:displayallines' for='" + d + "'>Show all lines</label></div>")[0];
			this._showAllLines = e("input", d)[0];
			e(this._showAllLines).change(function () {
				i.setShowAllLines(this.checked);
				e(l)["slide" + (this.checked ? "Down" : "Up")](100)
			}).attr("checked", i.getShowAllLines());
			g.appendChild(d);
			var l = document.createElement("div"),
			d = document.createElement("label");
			d.innerHTML =
				"Line Opacity:";
			d.setAttribute(f, "timegraph:lineopacity");
			l.appendChild(d);
			this._lineOpacity = document.createElement("div");
			this._lineOpacitySliderControl = new gav.controls.Slider({
					min : 0,
					max : 1,
					step : 0.01,
					highlightProgress : !0,
					value : i.getLineAlpha(),
					slide : function (a) {
						i.setLineAlpha(a)
					},
					container : this._lineOpacity
				});
			l.appendChild(this._lineOpacity);
			!i.getShowAllLines(this.checked) && (l.style.display = "none");
			g.appendChild(l);
			h += "_slg";
			h = e("<div class='gav-checkbox-container'><input id='" + h + "' type='checkbox'/><label " +
					f + "='timegraph:displaylegend' for='" + h + "'>Show legend</label></div>")[0];
			this._showLegend = e("input", h)[0];
			e(this._showLegend).change(function () {
				i.setShowLegend(this.checked);
				this.checked ? (e(o).show(), e(n).show()) : (e(o).hide(), e(n).hide());
				j._validateSize()
			}).attr("checked", i.getShowLegend());
			g.appendChild(h);
			var o = document.createElement("div");
			o.className = "gav-separator";
			g.appendChild(o);
			var n = document.createElement("div"),
			d = document.createElement("label");
			d.innerHTML = "Legend Orientation:";
			d.setAttribute(f,
				"timegraph:legendorientation");
			n.appendChild(d);
			this._legendOrientationComboBox = new gav.controls.ComboBox;
			this._legendOrientationComboBox.setDataProvider([b, c]);
			this._legendOrientationComboBox.setSelectedIndex(i.getLegendOrientation());
			this._legendOrientationComboBox.addEventListener("change", function () {
				i.setLegendOrientation(this.getSelectedIndex())
			});
			n.appendChild(this._legendOrientationComboBox.getDOMElement());
			g.appendChild(n);
			var m;
			i.addEventListener("dotOver", function (a) {
				j._context && (m = j.showDataTooltip([a.item],
							a.e), m.setSlice(a.slice), m.setVisibleAttributes([i.getAttribute()]))
			});
			i.addEventListener("lineOver", function (a) {
				j._context && (m = j.showDataTooltip([a.item], a.e), m.setVisibleAttributes([]))
			});
			i.addEventListener("itemOut", function () {
				j.hideDataTooltip()
			});
			i.addEventListener("rangeChanged", this.onGraphChange, this);
			gav.utils.Binding.bindSetter(function (a) {
				j._fitToSelection.checked = a
			}, this._timeGraph, "fitToSelection");
			this._created = !0;
			this._validateSize()
		},
		onGraphChange : function () {
			var a = this._timeGraph.getAxesCalculatedMax(),
			b = this._timeGraph.getAxesCalculatedMin() - 0.1 * a,
			a = this._timeGraph.getAxesCalculatedMax() + 0.1 * a,
			d = (a - b) / 1E3,
			c = this._timeGraph.getAxisExplicitMin(),
			e = this._timeGraph.getAxisExplicitMax(),
			c = null != c ? c : this._timeGraph.getAxesCalculatedMin(),
			e = null != e ? e : this._timeGraph.getAxesCalculatedMax();
			this._verticalDataRangeSliderControl.setMin(b);
			this._verticalDataRangeSliderControl.setMax(a);
			this._verticalDataRangeSliderControl.setValues([c, e]);
			this._verticalDataRangeSliderControl._minRange = d
		},
		setNote : function (a) {
			this._timeGraph.setNote(a)
		},
		getComponents : function () {
			return [this._timeGraph]
		},
		getStorables : function () {
			return [this._timeGraph]
		},
		getSnapshotSite : function () {
			return {
				components : {
					timeGraph : this._timeGraph
				}
			}
		},
		getSnapshotReaders : function () {
			return [new gav.snapshot.TimeGraphReader]
		},
		setPresentationMode : function (a) {
			this._isInPresentationMode = a;
			this._timeGraph.setPresentationMode(a);
			this._validateSize()
		},
		setContext : function (a) {
			gav.components.ComponentPanel.prototype.setContext.call(this, a);
			this._context && this._timeGraph ? (this._timeGraph.setDataSet(this._context.getDataSet()),
				this._timeGraph.setColorMap(this._context.getColorMap()), this._timeGraph.setSlice(this._context.getSlice()), this._timeGraph.setFormatter(this.getContext().getFormatter()), this._timeGraph.setAnimationController(this.getContext().getAnimationController()), this._timeGraph.setLineStyleProvider(this.getContext().getLineStyleProvider())) : this._timeGraph && (this._timeGraph.setDataSet(null), this._timeGraph.setColorMap(null), this._timeGraph.setFormatter(null), this._timeGraph.setAnimationController(null));
			this._updateSlider();
			this._updateSettings()
		},
		localeChanged : function () {
			gav.components.ComponentPanel.prototype.localeChanged.call(this);
			b = gav.locale.translate("timegraph:vertical") || "Vertical";
			c = gav.locale.translate("timegraph:horizontal") || "Horizontal";
			this._legendOrientationComboBox.setDataProvider([b, c])
		},
		_updateSettings : function () {
			this._context && this._context.getDataSet() && this._context.getDataSet().getIndicatorInformation() && (this._ddlAttribute.setDataProvider(this._context.getDataSet().getIndicatorInformation()),
				this._ddlAttribute.setGroupingProvider(this._context.getDataSet().getIndicatorGroupings()), this._ddlAttribute.setSelectedIndex(this._timeGraph.getAttribute()), this._showLineLabels.checked = this._timeGraph.getShowLineLabels(), this._showAllLines.checked = this._timeGraph.getShowAllLines(), this._showTimeDots.checked = this._timeGraph.getShowTimeDots(), this._fitToSelection.checked = this._timeGraph.getFitToSelection(), this._useColorMap.checked = this._timeGraph.getUseColorMapOnSelectedLines(), this._timeGraph.getTimeSpan() &&
				this._timeSpanSliderControl.setValues([this._timeGraph.getTimeSpan().start, this._timeGraph.getTimeSpan().end - 1]))
		},
		_onContextChange : function (a) {
			gav.components.ComponentPanel.prototype._onContextChange.call(this, a);
			switch (a.property) {
			case "dataSet":
				this._timeGraph.setDataSet(a.newValue);
				this._updateSlider();
				break;
			case "slice":
				this._timeGraph.setSlice(a.newValue);
				break;
			case "colorMap":
				this._timeGraph.setColorMap(a.newValue);
				break;
			case "animationController":
				this._timeGraph.setAnimationController(this._context.getAnimationController());
				break;
			case "formatter":
				this._timeGraph.setFormatter(this._context.getFormatter());
				break;
			case "lineStyleProvider":
				this._timeGraph.setLineStyleProvider(this._context.getLineStyleProvider())
			}
			this._updateSettings()
		},
		_validateSize : function () {
			gav.components.ComponentPanel.prototype._validateSize.call(this);
			if (this._created) {
				var a;
				a = "none" === e(this._settingsPanel).css("display") ? 0 : 160;
				e(this._settingsPanel).css({
					width : a
				});
				e(this._settingsPanelToggleButton).css({
					left : a + 2
				});
				this._ddlAttribute.setPresentationMode(this._isInPresentationMode);
				this._ddlAttribute.setMaxWidth("100%");
				var b = e(this._btnResetYScale).outerWidth(),
				d;
				d = Math.max(30, this._ddlAttribute.getHeight() + 12);
				var c = e(this._contentPanel).height() - d - 32;
				e(this._vDataRangeSliderContainer).css({
					minWidth : b
				});
				e(this._vDataRangeSlider).css({
					top : b + 16,
					margin : "auto",
					height : e(this._vDataRangeSliderContainer).height() - b - 32
				});
				b = Math.max(32, e(this._vDataRangeSliderContainer).outerWidth());
				b = e(this._contentPanel).width() - a - 20 - b;
				e(this._componentContainer).css({
					left : a + 20 + 14,
					top : d,
					width : b -
					14,
					height : c
				});
				e(this._ddlAttribute.getDOMElement()).parent().css({
					width : b - e(this._settingsPanelToggleButton).outerWidth(),
					left : a + e(this._settingsPanelToggleButton).outerWidth()
				});
				d = this._timeGraph._paddingLeft;
				var f = this._timeGraph._plotWidth;
				e(this._hTimeSliderContainer).css({
					width : f,
					bottom : 0,
					left : a + d + 20 + 14
				});
				e(this._btnFisheye).css({
					left : a
				});
				if (this._timeGraph._width !== b || this._timeGraph._height !== c)
					this._timeGraph._width = b, this._timeGraph._height = c, this._timeGraph.invalidateSize(), this._timeGraph.invalidateProperties(),
					this._timeGraph.invalidateDisplay()
			}
		},
		_updateSlider : function () {
			if (this._context && this._context.getDataSet() && this._context.getDataSet().getDataCube()) {
				var a = this._context.getDataSet().getDataCube().getNumSlices();
				this._context.getDataSet().getSliceInformation();
				2 > a ? e(this._hTimeSlider).addClass("gav-state-hidden") : e(this._hTimeSlider).removeClass("gav-state-hidden");
				this._timeSpanSliderControl.setMin(0);
				this._timeSpanSliderControl.setMax(a - 1);
				this._timeSpanSliderControl.setValues([0, a - 1])
			}
		}
	})
})(jQuery);
