let gav ={};
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
		for (var e = "Anonym", g = this, j = c ? c.split(".") : [], k = 1; k < j.length; k++)
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
		init : function () {
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
	gav.Klass("gav.data.provider.UnicodeFormatReader", {
		init : function () {
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
(function (d) {
	gav.Klass("gav.data.DataCube", {
		init : function (b) {
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
		init : function () {
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
		init : function (b, a, c, f, e) {
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
				}
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
			this._changed = !0
		},
		getCategoricalIndicatorInformation : function () {
			return this._categoricalIndicatorInformation
		},
		setCategoricalIndicatorInformation : function (b) {
			this._categoricalIndicatorInformation = b;
			this._changed = !0
		},
		getSliceInformation : function () {
			return this._sliceInformation
		},
		setSliceInformation : function (b) {
			this._sliceInformation =
				b;
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
/* ---------------------------------------------------------------------------------------------------------------------*/
let  source = [
         {
            "file": [
               {
                  "_src": "data/World.SBBSBSBSBSBSBSSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "1"
               },
               {
                  "_src": "data/World_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "World"
         },
         {
            "file": [
               {
                  "_src": "data/IEA Total.SBBSBSBSBSBSBSSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "1"
               },
               {
                  "_src": "data/IEA Total_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "IEA Total"
         },
         {
            "file": [
               {
                  "_src": "data/OECD Total.SBBSBSBSBSBSBSSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "1"
               },
               {
                  "_src": "data/OECD Total_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "OECD Total"
         },
         {
            "file": [
               {
                  "_src": "data/Non-OECD Total.SBBSBSBSBSBSBSSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "1"
               },
               {
                  "_src": "data/Non-OECD Total_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Non-OECD Total"
         },
         {
            "file": [
               {
                  "_src": "data/Africa.SBBSBSBBSBSBSSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "4"
               },
               {
                  "_src": "data/Africa_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Africa"
         },
         {
            "file": [
               {
                  "_src": "data/Non-OECD Americas.SBBSBSBSBSBSBSSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "1"
               },
               {
                  "_src": "data/Non-OECD Americas_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Non-OECD Americas"
         },
         {
            "file": [
               {
                  "_src": "data/Middle East.SBBSBSBSBSBBSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "2"
               },
               {
                  "_src": "data/Middle East_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Middle East"
         },
         {
            "file": [
               {
                  "_src": "data/Non-OECD Europe and Eurasia.SBBSBSBSBSBSBSSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "1"
               },
               {
                  "_src": "data/Non-OECD Europe and Eurasia_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Non-OECD Europe and Eurasia"
         },
         {
            "file": [
               {
                  "_src": "data/Asia (excluding China).SBBSBSBBSBBSSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "5"
               },
               {
                  "_src": "data/Asia (excluding China)_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Asia (excluding China)"
         },
         {
            "file": [
               {
                  "_src": "data/China (including Hong Kong).SBBSBSBBSBBSSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "5"
               },
               {
                  "_src": "data/China (including Hong Kong)_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "China (including Hong Kong)"
         },
         {
            "file": [
               {
                  "_src": "data/Albania.SBBSBBBSBBS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "11"
               },
               {
                  "_src": "data/Albania_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Albania"
         },
         {
            "file": [
               {
                  "_src": "data/Algeria.SBBSBBBSBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "11"
               },
               {
                  "_src": "data/Algeria_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Algeria"
         },
         {
            "file": [
               {
                  "_src": "data/Angola.BBBBBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "36"
               },
               {
                  "_src": "data/Angola_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Angola"
         },
         {
            "file": [
               {
                  "_src": "data/Argentina.SBBSBSBBSBBSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "5"
               },
               {
                  "_src": "data/Argentina_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Argentina"
         },
         {
            "file": [
               {
                  "_src": "data/Armenia.BBBBSBBSS_NN.txt",
                  "_name": "Balance",
                  "_attributeId": "102"
               },
               {
                  "_src": "data/Armenia_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Armenia"
         },
         {
            "file": [
               {
                  "_src": "data/Australia.SBBSBSBSBBBS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "3"
               },
               {
                  "_src": "data/Australia_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Australia"
         },
         {
            "file": [
               {
                  "_src": "data/Austria.SBBSBSBSBSBBSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "2"
               },
               {
                  "_src": "data/Austria_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Austria"
         },
         {
            "file": [
               {
                  "_src": "data/Azerbaijan.SBBBSBBSBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "15"
               },
               {
                  "_src": "data/Azerbaijan_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Azerbaijan"
         },
         {
            "file": [
               {
                  "_src": "data/Bahrain.SBBBSB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "13"
               },
               {
                  "_src": "data/Bahrain_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Bahrain"
         },
         {
            "file": [
               {
                  "_src": "data/Bangladesh.SBBSBBBBBS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "12"
               },
               {
                  "_src": "data/Bangladesh_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Bangladesh"
         },
         {
            "file": [
               {
                  "_src": "data/Belarus.SBBSBSBBSBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "5"
               },
               {
                  "_src": "data/Belarus_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Belarus"
         },
         {
            "file": [
               {
                  "_src": "data/Belgium.BBSBSBSBSBSBSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "21"
               },
               {
                  "_src": "data/Belgium_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Belgium"
         },
         {
            "file": [
               {
                  "_src": "data/Benin.BBBSB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "29"
               },
               {
                  "_src": "data/Benin_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Benin"
         },
         {
            "file": [
               {
                  "_src": "data/Plurinational state of Bolivia.BBBBBSBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "35"
               },
               {
                  "_src": "data/Plurinational state of Bolivia_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Plurinational state of Bolivia"
         },
         {
            "file": [
               {
                  "_src": "data/Bosnia and Herzegovina.BBSBBBSBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "27"
               },
               {
                  "_src": "data/Bosnia and Herzegovina_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Bosnia and Herzegovina"
         },
         {
            "file": [
               {
                  "_src": "data/Botswana.BSBBSBB_NN.txt",
                  "_name": "Balance",
                  "_attributeId": "100"
               },
               {
                  "_src": "data/Botswana_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Botswana"
         },
         {
            "file": [
               {
                  "_src": "data/Brazil.SBBSBSBSBSBSBSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "1"
               },
               {
                  "_src": "data/Brazil_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Brazil"
         },
         {
            "file": [
               {
                  "_src": "data/Brunei Darussalam.SBBBBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "18"
               },
               {
                  "_src": "data/Brunei Darussalam_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Brunei Darussalam"
         },
         {
            "file": [
               {
                  "_src": "data/Bulgaria.SBBSBSBSBSBSBSSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "1"
               },
               {
                  "_src": "data/Bulgaria_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Bulgaria"
         },
         {
            "file": [
               {
                  "_src": "data/Cambodia.BBBSBB_YN.txt",
                  "_name": "Balance",
                  "_attributeId": "200"
               },
               {
                  "_src": "data/Cambodia_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Cambodia"
         },
         {
            "file": [
               {
                  "_src": "data/Cameroon.SBBBBBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "19"
               },
               {
                  "_src": "data/Cameroon_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Cameroon"
         },
         {
            "file": [
               {
                  "_src": "data/Canada.SBBSBSBSBSBBSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "2"
               },
               {
                  "_src": "data/Canada_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Canada"
         },
         {
            "file": [
               {
                  "_src": "data/Chile.SBBSBSBSBSBSBS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "1"
               },
               {
                  "_src": "data/Chile_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Chile"
         },
         {
            "file": [
               {
                  "_src": "data/People's Republic of China.SBBSBSBBSBBSSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "5"
               },
               {
                  "_src": "data/People's Republic of China_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "People's Republic of China"
         },
         {
            "file": [
               {
                  "_src": "data/Colombia.SBBBBBSBBS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "18"
               },
               {
                  "_src": "data/Colombia_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Colombia"
         },
         {
            "file": [
               {
                  "_src": "data/Republic of the Congo.BBBBSBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "34"
               },
               {
                  "_src": "data/Republic of the Congo_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Republic of the Congo"
         },
         {
            "file": [
               {
                  "_src": "data/Costa Rica.BBBBSBBSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "34"
               },
               {
                  "_src": "data/Costa Rica_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Costa Rica"
         },
         {
            "file": [
               {
                  "_src": "data/Cote d'Ivoire.SBBBBSBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "17"
               },
               {
                  "_src": "data/Cote d'Ivoire_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Cote d'Ivoire"
         },
         {
            "file": [
               {
                  "_src": "data/Croatia.SBBSBSBSBSBBSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "2"
               },
               {
                  "_src": "data/Croatia_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Croatia"
         },
         {
            "file": [
               {
                  "_src": "data/Cuba.SBBBBBBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "20"
               },
               {
                  "_src": "data/Cuba_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Cuba"
         },
         {
            "file": [
               {
                  "_src": "data/Curaçao.BBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "29"
               },
               {
                  "_src": "data/Curaçao_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Curaçao"
         },
         {
            "file": [
               {
                  "_src": "data/Cyprus.BBBSBBBS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "32"
               },
               {
                  "_src": "data/Cyprus_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Cyprus"
         },
         {
            "file": [
               {
                  "_src": "data/Czech Republic.SBBSBSBSBSBSBSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "1"
               },
               {
                  "_src": "data/Czech Republic_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Czech Republic"
         },
         {
            "file": [
               {
                  "_src": "data/Democratic People's Republic of Korea.BBSBBBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "28"
               },
               {
                  "_src": "data/Democratic People's Republic of Korea_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Democratic People's Republic of Korea"
         },
         {
            "file": [
               {
                  "_src": "data/Democratic Republic of the Congo.SBBSBBBSBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "11"
               },
               {
                  "_src": "data/Democratic Republic of the Congo_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Democratic Republic of the Congo"
         },
         {
            "file": [
               {
                  "_src": "data/Denmark.SBBBSBSBSBBS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "13"
               },
               {
                  "_src": "data/Denmark_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Denmark"
         },
         {
            "file": [
               {
                  "_src": "data/Dominican Republic.BBBBBBBS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "37"
               },
               {
                  "_src": "data/Dominican Republic_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Dominican Republic"
         },
         {
            "file": [
               {
                  "_src": "data/Ecuador.SBBBBSBBS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "17"
               },
               {
                  "_src": "data/Ecuador_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Ecuador"
         },
         {
            "file": [
               {
                  "_src": "data/Egypt.SBBSBBSBSBBS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "9"
               },
               {
                  "_src": "data/Egypt_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Egypt"
         },
         {
            "file": [
               {
                  "_src": "data/El Salvador.BBBSBSBBS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "30"
               },
               {
                  "_src": "data/El Salvador_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "El Salvador"
         },
         {
            "file": [
               {
                  "_src": "data/Eritrea.BBBBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "35"
               },
               {
                  "_src": "data/Eritrea_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Eritrea"
         },
         {
            "file": [
               {
                  "_src": "data/Estonia.BSBBSBSBBS_YN.txt",
                  "_name": "Balance",
                  "_attributeId": "201"
               },
               {
                  "_src": "data/Estonia_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Estonia"
         },
         {
            "file": [
               {
                  "_src": "data/Ethiopia.BBSBBBBSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "28"
               },
               {
                  "_src": "data/Ethiopia_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Ethiopia"
         },
         {
            "file": [
               {
                  "_src": "data/Finland.SBBSBBSBSBSBSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "8"
               },
               {
                  "_src": "data/Finland_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Finland"
         },
         {
            "file": [
               {
                  "_src": "data/FYR of Macedonia.BBSBBSBSBBSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "25"
               },
               {
                  "_src": "data/FYR of Macedonia_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Former Yugoslav Republic of Macedonia"
         },
         {
            "file": [
               {
                  "_src": "data/France.SBBSBSBSBSBBSSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "2"
               },
               {
                  "_src": "data/France_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "France"
         },
         {
            "file": [
               {
                  "_src": "data/Gabon.BBBBBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "36"
               },
               {
                  "_src": "data/Gabon_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Gabon"
         },
         {
            "file": [
               {
                  "_src": "data/Georgia.SBBSBSBSBSBBSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "2"
               },
               {
                  "_src": "data/Georgia_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Georgia"
         },
         {
            "file": [
               {
                  "_src": "data/Germany.SBBSBSBSBSBBSSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "2"
               },
               {
                  "_src": "data/Germany_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Germany"
         },
         {
            "file": [
               {
                  "_src": "data/Ghana.SBBBBSBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "17"
               },
               {
                  "_src": "data/Ghana_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Ghana"
         },
         {
            "file": [
               {
                  "_src": "data/Gibraltar.BB_NN.txt",
                  "_name": "Balance",
                  "_attributeId": "101"
               },
               {
                  "_src": "data/Gibraltar_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Gibraltar"
         },
         {
            "file": [
               {
                  "_src": "data/Greece.SBBSBSBSBSBBSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "2"
               },
               {
                  "_src": "data/Greece_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Greece"
         },
         {
            "file": [
               {
                  "_src": "data/Guatemala.SBBBBSBBS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "17"
               },
               {
                  "_src": "data/Guatemala_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Guatemala"
         },
         {
            "file": [
               {
                  "_src": "data/Haiti.BBBBB_YN.txt",
                  "_name": "Balance",
                  "_attributeId": "202"
               },
               {
                  "_src": "data/Haiti_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Haiti"
         },
         {
            "file": [
               {
                  "_src": "data/Honduras.BBBBSBBS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "34"
               },
               {
                  "_src": "data/Honduras_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Honduras"
         },
         {
            "file": [
               {
                  "_src": "data/Hong Kong (China).BBBSBSB_YN.txt",
                  "_name": "Balance",
                  "_attributeId": "203"
               },
               {
                  "_src": "data/Hong Kong (China)_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Hong Kong (China)"
         },
         {
            "file": [
               {
                  "_src": "data/Hungary.SBBSBSBSBSBBSSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "2"
               },
               {
                  "_src": "data/Hungary_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Hungary"
         },
         {
            "file": [
               {
                  "_src": "data/Iceland.BBSBBBS_NN.txt",
                  "_name": "Balance",
                  "_attributeId": "101"
               },
               {
                  "_src": "data/Iceland_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Iceland"
         },
         {
            "file": [
               {
                  "_src": "data/India.SBBSBSBBSBBSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "5"
               },
               {
                  "_src": "data/India_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "India"
         },
         {
            "file": [
               {
                  "_src": "data/Indonesia.SBBSBBBSBBS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "11"
               },
               {
                  "_src": "data/Indonesia_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Indonesia"
         },
         {
            "file": [
               {
                  "_src": "data/Iraq.BBBSBSBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "30"
               },
               {
                  "_src": "data/Iraq_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Iraq"
         },
         {
            "file": [
               {
                  "_src": "data/Ireland.BBSBSBSBSBBS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "22"
               },
               {
                  "_src": "data/Ireland_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Ireland"
         },
         {
            "file": [
               {
                  "_src": "data/Islamic Republic of Iran.SBBSBSBBSBBS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "5"
               },
               {
                  "_src": "data/Islamic Republic of Iran_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Islamic Republic of Iran"
         },
         {
            "file": [
               {
                  "_src": "data/Israel.SBBSBSBBBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "7"
               },
               {
                  "_src": "data/Israel_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Israel"
         },
         {
            "file": [
               {
                  "_src": "data/Italy.SBBSBSBSBSBBSSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "2"
               },
               {
                  "_src": "data/Italy_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Italy"
         },
         {
            "file": [
               {
                  "_src": "data/Jamaica.BBBBBBS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "36"
               },
               {
                  "_src": "data/Jamaica_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Jamaica"
         },
         {
            "file": [
               {
                  "_src": "data/Japan.SBBSBSBBBBSSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "7"
               },
               {
                  "_src": "data/Japan_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Japan"
         },
         {
            "file": [
               {
                  "_src": "data/Jordan.SBBBSBSBSBBS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "13"
               },
               {
                  "_src": "data/Jordan_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Jordan"
         },
         {
            "file": [
               {
                  "_src": "data/Kazakhstan.SBBSBSBBSBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "5"
               },
               {
                  "_src": "data/Kazakhstan_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Kazakhstan"
         },
         {
            "file": [
               {
                  "_src": "data/Kenya.BBBBSBBS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "34"
               },
               {
                  "_src": "data/Kenya_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Kenya"
         },
         {
            "file": [
               {
                  "_src": "data/Korea.SBBSBSBBBSBSSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "6"
               },
               {
                  "_src": "data/Korea_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Korea"
         },
         {
            "file": [
               {
                  "_src": "data/Kosovo.BSBSBSBB_YN.txt",
                  "_name": "Balance",
                  "_attributeId": "206"
               },
               {
                  "_src": "data/Kosovo_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Kosovo"
         },
         {
            "file": [
               {
                  "_src": "data/Kuwait.BBSBBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "27"
               },
               {
                  "_src": "data/Kuwait_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Kuwait"
         },
         {
            "file": [
               {
                  "_src": "data/Kyrgyzstan.SBBSBSBBSBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "5"
               },
               {
                  "_src": "data/Kyrgyzstan_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Kyrgyzstan"
         },
         {
            "file": [
               {
                  "_src": "data/Latvia.BBSBBSBSBBS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "25"
               },
               {
                  "_src": "data/Latvia_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Latvia"
         },
         {
            "file": [
               {
                  "_src": "data/Lebanon.BBBBSBSBBS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "33"
               },
               {
                  "_src": "data/Lebanon_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Lebanon"
         },
         {
            "file": [
               {
                  "_src": "data/Libya.BBBBSB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "33"
               },
               {
                  "_src": "data/Libya_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Libya"
         },
         {
            "file": [
               {
                  "_src": "data/Lithuania.SBBSBBSBSBSBSSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "8"
               },
               {
                  "_src": "data/Lithuania_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Lithuania"
         },
         {
            "file": [
               {
                  "_src": "data/Luxembourg.BBBSBSBBS_YN.txt",
                  "_name": "Balance",
                  "_attributeId": "204"
               },
               {
                  "_src": "data/Luxembourg_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Luxembourg"
         },
         {
            "file": [
               {
                  "_src": "data/Malaysia.SBBSBSBSBSBBS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "2"
               },
               {
                  "_src": "data/Malaysia_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Malaysia"
         },
         {
            "file": [
               {
                  "_src": "data/Malta.BBSBBB_NN.txt",
                  "_name": "Balance",
                  "_attributeId": "101"
               },
               {
                  "_src": "data/Malta_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Malta"
         },
         {
            "file": [
               {
                  "_src": "data/Mauritius.BBBBBS_YN.txt",
                  "_name": "Balance",
                  "_attributeId": "207"
               },
               {
                  "_src": "data/Mauritius_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Mauritius"
         },
         {
            "file": [
               {
                  "_src": "data/Mexico.SBBSBSBBSBBSSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "5"
               },
               {
                  "_src": "data/Mexico_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Mexico"
         },
         {
            "file": [
               {
                  "_src": "data/Republic of Moldova.SBBBBSBSBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "16"
               },
               {
                  "_src": "data/Republic of Moldova_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Republic of Moldova"
         },
         {
            "file": [
               {
                  "_src": "data/Mongolia.BBSBBSBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "26"
               },
               {
                  "_src": "data/Mongolia_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Mongolia"
         },
         {
            "file": [
               {
                  "_src": "data/Montenegro.BSBSBSBB_YN.txt",
                  "_name": "Balance",
                  "_attributeId": "206"
               },
               {
                  "_src": "data/Montenegro_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Montenegro"
         },
         {
            "file": [
               {
                  "_src": "data/Morocco.SBBSBSBBSBBS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "5"
               },
               {
                  "_src": "data/Morocco_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Morocco"
         },
         {
            "file": [
               {
                  "_src": "data/Mozambique.SBBSBBBSBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "11"
               },
               {
                  "_src": "data/Mozambique_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Mozambique"
         },
         {
            "file": [
               {
                  "_src": "data/Myanmar.SBBSBBBBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "12"
               },
               {
                  "_src": "data/Myanmar_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Myanmar"
         },
         {
            "file": [
               {
                  "_src": "data/Namibia.BBBSBBS_YN.txt",
                  "_name": "Balance",
                  "_attributeId": "208"
               },
               {
                  "_src": "data/Namibia_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Namibia"
         },
         {
            "file": [
               {
                  "_src": "data/Nepal.BSBBSBB_YN.txt",
                  "_name": "Balance",
                  "_attributeId": "205"
               },
               {
                  "_src": "data/Nepal_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Nepal"
         },
         {
            "file": [
               {
                  "_src": "data/Netherlands.SBBSBSBSBSBBSSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "2"
               },
               {
                  "_src": "data/Netherlands_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Netherlands"
         },
         {
            "file": [
               {
                  "_src": "data/New Zealand.SBBSBBBBBSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "12"
               },
               {
                  "_src": "data/New Zealand_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "New Zealand"
         },
         {
            "file": [
               {
                  "_src": "data/Nicaragua.BBBSBBSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "31"
               },
               {
                  "_src": "data/Nicaragua_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Nicaragua"
         },
         {
            "file": [
               {
                  "_src": "data/Niger.BBBBSB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "33"
               },
               {
                  "_src": "data/Niger_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Niger"
         },
         {
            "file": [
               {
                  "_src": "data/Nigeria.BBBBBBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "37"
               },
               {
                  "_src": "data/Nigeria_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Nigeria"
         },
         {
            "file": [
               {
                  "_src": "data/Norway.SBBSBBSBSBSBS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "8"
               },
               {
                  "_src": "data/Norway_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Norway"
         },
         {
            "file": [
               {
                  "_src": "data/Oman.SBBSBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "8"
               },
               {
                  "_src": "data/Oman_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Oman"
         },
         {
            "file": [
               {
                  "_src": "data/Pakistan.SBBSBBBSBBS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "11"
               },
               {
                  "_src": "data/Pakistan_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Pakistan"
         },
         {
            "file": [
               {
                  "_src": "data/Panama.BBBBSBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "34"
               },
               {
                  "_src": "data/Panama_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Panama"
         },
         {
            "file": [
               {
                  "_src": "data/Paraguay.BBSBSBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "24"
               },
               {
                  "_src": "data/Paraguay_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Paraguay"
         },
         {
            "file": [
               {
                  "_src": "data/Peru.SBBSBBSBBBS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "10"
               },
               {
                  "_src": "data/Peru_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Peru"
         },
         {
            "file": [
               {
                  "_src": "data/Philippines.SBBSBBSBBBSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "10"
               },
               {
                  "_src": "data/Philippines_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Philippines"
         },
         {
            "file": [
               {
                  "_src": "data/Poland.SBBSBSBSBSBSBSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "1"
               },
               {
                  "_src": "data/Poland_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Poland"
         },
         {
            "file": [
               {
                  "_src": "data/Portugal.BBSBBSBSBBSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "25"
               },
               {
                  "_src": "data/Portugal_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Portugal"
         },
         {
            "file": [
               {
                  "_src": "data/Qatar.BBBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "33"
               },
               {
                  "_src": "data/Qatar_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Qatar"
         },
         {
            "file": [
               {
                  "_src": "data/Romania.SBBSBSBSBSBBSSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "2"
               },
               {
                  "_src": "data/Romania_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Romania"
         },
         {
            "file": [
               {
                  "_src": "data/Russian Federation.SBBSBSBBSBBSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "5"
               },
               {
                  "_src": "data/Russian Federation_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Russian Federation"
         },
         {
            "file": [
               {
                  "_src": "data/Saudi Arabia.SBBBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "16"
               },
               {
                  "_src": "data/Saudi Arabia_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Saudi Arabia"
         },
         {
            "file": [
               {
                  "_src": "data/Senegal.SBBBBBBSB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "19"
               },
               {
                  "_src": "data/Senegal_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Senegal"
         },
         {
            "file": [
               {
                  "_src": "data/Serbia.SBBSBSBSBSBBS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "2"
               },
               {
                  "_src": "data/Serbia_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Serbia"
         },
         {
            "file": [
               {
                  "_src": "data/Singapore.BBBBSBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "34"
               },
               {
                  "_src": "data/Singapore_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Singapore"
         },
         {
            "file": [
               {
                  "_src": "data/Slovak Republic.SBBSBSBSBSBBSSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "2"
               },
               {
                  "_src": "data/Slovak Republic_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Slovak Republic"
         },
         {
            "file": [
               {
                  "_src": "data/Slovenia.SBBSBSBSBSBBSSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "2"
               },
               {
                  "_src": "data/Slovenia_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Slovenia"
         },
         {
            "file": [
               {
                  "_src": "data/South Africa.SBBSBSBBSBBSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "5"
               },
               {
                  "_src": "data/South Africa_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "South Africa"
         },
         {
            "file": [
               {
                  "_src": "data/South Sudan.BBBBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "35"
               },
               {
                  "_src": "data/South Sudan_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "South Sudan"
         },
         {
            "file": [
               {
                  "_src": "data/Spain.SBBSBSBSBSBBSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "2"
               },
               {
                  "_src": "data/Spain_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Spain"
         },
         {
            "file": [
               {
                  "_src": "data/Sri Lanka.BBBSBBBS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "32"
               },
               {
                  "_src": "data/Sri Lanka_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Sri Lanka"
         },
         {
            "file": [
               {
                  "_src": "data/Sudan.SBBBBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "18"
               },
               {
                  "_src": "data/Sudan_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Sudan"
         },
         {
            "file": [
               {
                  "_src": "data/Suriname.BBSBBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "27"
               },
               {
                  "_src": "data/Suriname_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Suriname"
         },
         {
            "file": [
               {
                  "_src": "data/Sweden.SBBSBBSBSBSBSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "8"
               },
               {
                  "_src": "data/Sweden_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Sweden"
         },
         {
            "file": [
               {
                  "_src": "data/Switzerland.BBBSBSBSBBSSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "29"
               },
               {
                  "_src": "data/Switzerland_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Switzerland"
         },
         {
            "file": [
               {
                  "_src": "data/Syrian Arab Republic.SBBBSBBSBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "15"
               },
               {
                  "_src": "data/Syrian Arab Republic_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Syrian Arab Republic"
         },
         {
            "file": [
               {
                  "_src": "data/Chinese Taipei.SBBSBSBBBBSSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "7"
               },
               {
                  "_src": "data/Chinese Taipei_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Chinese Taipei"
         },
         {
            "file": [
               {
                  "_src": "data/Tajikistan.BBSBSBSBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "23"
               },
               {
                  "_src": "data/Tajikistan_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Tajikistan"
         },
         {
            "file": [
               {
                  "_src": "data/Tanzania.BBBBBSBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "35"
               },
               {
                  "_src": "data/Tanzania_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "United Republic of Tanzania"
         },
         {
            "file": [
               {
                  "_src": "data/Thailand.SBBSBSBSBSBBS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "2"
               },
               {
                  "_src": "data/Thailand_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Thailand"
         },
         {
            "file": [
               {
                  "_src": "data/Togo.BBBSBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "31"
               },
               {
                  "_src": "data/Togo_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Togo"
         },
         {
            "file": [
               {
                  "_src": "data/Trinidad and Tobago.SBBBBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "18"
               },
               {
                  "_src": "data/Trinidad and Tobago_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Trinidad and Tobago"
         },
         {
            "file": [
               {
                  "_src": "data/Tunisia.SBBBSBBSBSBS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "14"
               },
               {
                  "_src": "data/Tunisia_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Tunisia"
         },
         {
            "file": [
               {
                  "_src": "data/Turkey.SBBSBSBSBSBBSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "2"
               },
               {
                  "_src": "data/Turkey_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Turkey"
         },
         {
            "file": [
               {
                  "_src": "data/Turkmenistan.SBBBSBBSBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "15"
               },
               {
                  "_src": "data/Turkmenistan_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Turkmenistan"
         },
         {
            "file": [
               {
                  "_src": "data/Ukraine.SBBSBSBBSBSBSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "4"
               },
               {
                  "_src": "data/Ukraine_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Ukraine"
         },
         {
            "file": [
               {
                  "_src": "data/United Arab Emirates.BBBSBBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "32"
               },
               {
                  "_src": "data/United Arab Emirates_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "United Arab Emirates"
         },
         {
            "file": [
               {
                  "_src": "data/United Kingdom.SBBSBSBSBSBBSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "2"
               },
               {
                  "_src": "data/United Kingdom_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "United Kingdom"
         },
         {
            "file": [
               {
                  "_src": "data/United States.SBBSBSBSBSBBSSS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "2"
               },
               {
                  "_src": "data/United States_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "United States"
         },
         {
            "file": [
               {
                  "_src": "data/Uruguay.BBBBSBSBBS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "33"
               },
               {
                  "_src": "data/Uruguay_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Uruguay"
         },
         {
            "file": [
               {
                  "_src": "data/Uzbekistan.SBBSBSBSBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "3"
               },
               {
                  "_src": "data/Uzbekistan_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Uzbekistan"
         },
         {
            "file": [
               {
                  "_src": "data/Bolivarian Republic of Venezuela.SBBSBSBBSBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "5"
               },
               {
                  "_src": "data/Bolivarian Republic of Venezuela_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Bolivarian Republic of Venezuela"
         },
         {
            "file": [
               {
                  "_src": "data/Viet Nam.BBSBBBSBBS_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "27"
               },
               {
                  "_src": "data/Viet Nam_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Viet Nam"
         },
         {
            "file": [
               {
                  "_src": "data/Yemen.SBBBBBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "19"
               },
               {
                  "_src": "data/Yemen_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Yemen"
         },
         {
            "file": [
               {
                  "_src": "data/Zambia.BBSBBSBB_YY.txt",
                  "_name": "Balance",
                  "_attributeId": "26"
               },
               {
                  "_src": "data/Zambia_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Zambia"
         },
         {
            "file": [
               {
                  "_src": "data/Zimbabwe.BSBBSBB_YN.txt",
                  "_name": "Balance",
                  "_attributeId": "205"
               },
               {
                  "_src": "data/Zimbabwe_D.txt",
                  "_name": "Final consumption",
                  "_attributeId": "1000"
               }
            ],
            "_name": "Zimbabwe"
         }
      ];
/* ============================================================================================================== */
let http = require('http');
let json2csv = require('json2csv');
var fs = require('fs');

callback = function(country,response) {
	var str = '';

	//another chunk of data has been recieved, so append it to `str`
	response.on('data', function (chunk) {
		str += chunk;
	});

	//the whole response has been recieved, so we just print it out here
	response.on('end', function () {
		console.log(str);
		var p = gav.data.provider.UnicodeTextDataProvider.createDataSet(str);
		var v = p.getClassCube();
		for(var i=0;i<p.getRecordInformation().length;i++){
			for(var j=0; j<p.getIndicatorInformation().length;j++){
				for(var k=0;k<p.getSliceInformation().length;k++){
					var category,usage;
					category=usage="";				
					for(var l=0;l<v.getCategoricalValues(0).length;l++){
						if(p.getRecordInformation()[i].name.startsWith(v.getCategoricalValues(0)[l].replace(/\//g," "))){
							category=v.getCategoricalValues(0)[l];
							usage = p.getRecordInformation()[i].name.substr(category.length);
						}
					}
					if(category==""){
						usage = p.getRecordInformation()[i].name;
					}
					var unit = p.getIndicatorInformation()[j].unit.trim();
					var value = p.getDataCube().getValue(i,j,k);
					if (unit=='ktoe') { value /=1000; unit='Mtoe';}
					if (unit=='TJ') { value /=1000; unit='PJ';}
					var oo={country:country.trim(),category:category.trim(),usage:usage.trim(),unit:unit,year:p.getSliceInformation()[k].name.trim(),value:value};
					if(oo.value!=0)
							o.push(oo);
				}
			}
		}
		
		done++;
		if(done==source.length){
			var fields = ['country', 'category', 'usage','unit','year','value'];
			var csv = json2csv({data:o,fields:fields});
			fs.writeFile('eia_source.csv',csv,function(err){
				if(err) throw err;
				console.log('file saved');
			});
			// console.log(JSON.stringify(o));
		} else {
			doit();
		}
	});
}

let done = 0;
let o=[];
let todo = 0;

function doit(){
	var country = source[todo]._name;
	var options = { //The url we want is: 'www.iea.org/Sankey/data/Armenia_D.txt'
					host: 'www.iea.org',
					path: '/Sankey/'+escape(source[todo].file[1]._src)
	};
	todo++;
	http.request(options, callback.bind(null,country)).end();
}

doit();


