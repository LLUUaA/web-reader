
(window.webpackJsonp = window.webpackJsonp || []).push([[0], {
  106: function(t, e, i) {
      var n, o;
      n = [i(1), i(2)],
      void 0 === (o = function(t, e) {
          return {
              remove: function() {
                  this.removeAllSubView(),
                  e.View.prototype.remove.apply(this, arguments)
              },
              removeAllSubView: function() {
                  var e = this.subViews();
                  e.length && (t.each(e, function(t) {
                      t.remove()
                  }, this),
                  this._subViews = null)
              },
              removeSubView: function(e) {
                  t.without(this.subViews(), e)
              },
              addSubView: function(t) {
                  var e = t.remove
                    , i = this;
                  return t.hasParentView = !0,
                  t.remove = function() {
                      i.removeSubView(t),
                      e.apply(this, arguments)
                  }
                  ,
                  this.subViews().push(t),
                  t
              },
              hasSubView: function(e) {
                  return t.contains(this.subViews(), e)
              },
              subViews: function() {
                  return this._subViews || (this._subViews = []),
                  this._subViews
              }
          }
      }
      .apply(e, n)) || (t.exports = o)
  },
  107: function(t, e, i) {
      var n, o;
      n = [i(115)],
      void 0 === (o = function(t) {
          function e(t) {
              var e = String(t);
              return 1 === e.length && (e = "0" + e),
              e
          }
          return function(i, n) {
              var o = t(i);
              return o.getFullYear() + "-" + e(o.getMonth() + 1) + "-" + e(o.getDate()) + (n ? "" : " " + e(o.getHours()) + ":" + e(o.getMinutes()))
          }
      }
      .apply(e, n)) || (t.exports = o)
  },
  111: function(t, e, i) {
      var n, o;
      n = [i(0), i(2), i(1), i(3), i(4), i(255), i(256), i(112)],
      void 0 === (o = function(t, e, i, n, o, s, r, a) {
          var h = ["owner", "tags", "n_favorites", "n_comments", "open_on_render", "is_recommendation", "is_from_url", "state"]
            , l = ["mine", "favorite", "following", "hot", "others"];
          function c(t, e) {
              return t[e] = !0,
              t
          }
          var u = {
              mine: ["favorite", "share", "comment", "edit", "delete"].reduce(c, {}),
              others: ["favorite", "share", "comment", "report"].reduce(c, {}),
              underline: ["share", "delete"].reduce(c, {})
          }
            , d = {
              mine: u.mine,
              favorite: u.others,
              following: u.others,
              hot: u.others,
              others: u.others,
              underline: u.underline
          }
            , f = {
              avatar: n.me.avatar,
              name: n.me.name,
              user_id: n.me.id
          }
            , p = {
              note: "",
              middleContainers: [],
              startOffset: 0,
              endOffset: 1 / 0,
              n_favorites: 0,
              n_comments: 0,
              tags: [],
              visible_private: "",
              open_on_render: !1,
              is_recommendation: !1,
              is_from_url: !1,
              state: {
                  isDeleted: !1,
                  isHidden: !1
              }
          }
            , g = new RegExp(["^((?:https?|ftp)://[-A-Z0-9+&@#/%?=()~_|!:,.;]*[-A-Z0-9+&@#/%=~()_|])$"].join(""),"i")
            , m = /^[\w\s()\-–,.?!"']+$/
            , v = s.extend({
              defaults: function() {
                  return i.extend(i.clone(p), {
                      owner: i.clone(f),
                      create_time: r()
                  })
              },
              initialize: function(t, e) {
                  e.fakeSync && (this.fakeSync = e.fakeSync),
                  this.articleId = e.articleId || this.collection && this.collection.articleId,
                  this.paragraphsIndex = e.paragraphsIndex || this.collection && this.collection.paragraphsIndex,
                  this.on("change", function(t, e) {
                      this.updateRange();
                      var n = i.keys(this.changedAttributes());
                      i.difference(n, h.concat(["id", "r"])).length && (delete e.success,
                      delete e.error,
                      delete e.type,
                      delete e.data,
                      delete e.xhr,
                      this.trigger("effectiveChange", t, e))
                  }, this),
                  this.on("add change:tags", this.sortTags, this),
                  i.bindAll(this, "merge", "comparePoints")
              },
              url: function() {
                  return "/j/article_v2/" + this.articleId + "/annotation"
              },
              favoriteUrl: function() {
                  return "/j/annotation/" + this.id + "/favorite"
              },
              isRecommendation: function() {
                  return this.get("is_recommendation")
              },
              isFromUrl: function() {
                  return this.get("is_from_url")
              },
              isUnderline: function() {
                  return "underline" === this.get("type")
              },
              isNote: function() {
                  return "note" === this.get("type")
              },
              isSelection: function() {
                  return "selection" === this.get("type")
              },
              isFavorited: function() {
                  return this.hasTag("favorite")
              },
              isFollowing: function() {
                  return this.hasTag("following")
              },
              isMine: function() {
                  return this.hasTag("mine")
              },
              isOthers: function() {
                  return !this.get("tags").length
              },
              isPrivate: function() {
                  return !!this.get("visible_private")
              },
              isHidden: function() {
                  var t = this.get("state");
                  return t && t.isHidden
              },
              isLocked: function() {
                  var t = this.get("state");
                  return t && (t.isHidden || t.isDeleted)
              },
              hasTag: function(t) {
                  return i.contains(this.get("tags"), t)
              },
              validate: function(t) {
                  if (t.startContainerId === t.endContainerId && t.startOffset > t.endOffset)
                      return "Invalid: End before it starts"
              },
              getStamp: function() {
                  return new a({
                      pid: this.get("endContainerId"),
                      offset: this.get("endOffset")
                  })
              },
              getRanges: function() {
                  return this._ranges || this.updateRange(),
                  i.clone(this._ranges)
              },
              updateRange: function() {
                  var t = this.toJSON();
                  this._ranges = {},
                  this._setUpParaData(this._ranges, t.startContainerId, {
                      start: t.startOffset
                  }),
                  this._setUpParaData(this._ranges, t.endContainerId, {
                      end: t.endOffset
                  }),
                  i.each(this.getContainerIds(), function(t) {
                      this._setUpParaData(this._ranges, t, {
                          start: p.startOffset,
                          end: p.endOffset
                      })
                  }, this)
              },
              _setUpParaData: function(t, e, n) {
                  t[e = "" + e] = i.defaults({}, t[e], n)
              },
              setViaPoints: function(t, e) {
                  var i = {
                      startContainerId: t.containerId,
                      endContainerId: e.containerId,
                      startOffset: t.offset,
                      endOffset: e.offset
                  };
                  return i.middleContainers = this.getMiddleContainers(i),
                  this.set(i)
              },
              getPoints: function() {
                  var t = this.toJSON();
                  return {
                      start: {
                          containerId: t.startContainerId,
                          offset: t.startOffset
                      },
                      end: {
                          containerId: t.endContainerId,
                          offset: t.endOffset
                      }
                  }
              },
              getMiddleContainers: function(t) {
                  var e = this.getCidIndex(t.startContainerId)
                    , i = this.getCidIndex(t.endContainerId);
                  return e < 0 || i < 0 ? [] : this.paragraphsIndex.slice(e + 1, i)
              },
              getContainerIds: function() {
                  var t = this.toJSON();
                  return i.uniq([t.startContainerId].concat(t.middleContainers).concat([t.endContainerId]))
              },
              checkConflict: function(t) {
                  var e = this.getPoints()
                    , i = t.getPoints();
                  return !(this.comparePoints(e.start, i.end) * this.comparePoints(e.end, i.start) > 0)
              },
              comparePoints: function(t, e) {
                  return t.containerId === e.containerId ? t.offset - e.offset : this.getCidIndex(t.containerId) - this.getCidIndex(e.containerId)
              },
              getCidIndex: function(t) {
                  return t += "",
                  i.indexOf(this.paragraphsIndex, t)
              },
              destroy: function(t) {
                  return t = this._mixInData(t, {
                      id: this.id
                  }),
                  e.Model.prototype.destroy.call(this, t)
              },
              save: function(t, n) {
                  var o, s = i.extend(this.omit(h), t);
                  return n && n.sharing && (o = JSON.stringify(n.sharing)),
                  this.isNew() || (s.action = "update"),
                  n = this._mixInData(n, {
                      annotation: JSON.stringify(s)
                  }, o ? {
                      sharing: o
                  } : ""),
                  e.Model.prototype.save.call(this, t, n)
              },
              editFavorite: function(t) {
                  var e = t ? "PUT" : "DELETE"
                    , n = i.result(this, "favoriteUrl")
                    , s = this
                    , r = this.isOthers();
                  return this.isFavoriting = !0,
                  o.request(e, n, {}, {}, "json").done(function(e) {
                      e.r || (s.addFavorite(t),
                      t && r && s.collection.broadcastWithPid("othersNote:{{pid}}:favorited", s))
                  }).always(function() {
                      s.isFavoriting = !1
                  })
              },
              _mixInData: function(t) {
                  t = t ? i.clone(t) : {};
                  for (var e = arguments.length, n = new Array(e > 1 ? e - 1 : 0), o = 1; o < e; o++)
                      n[o - 1] = arguments[o];
                  return i.each(n, function(e) {
                      t.data = i.extend({}, t.data, e)
                  }),
                  t
              },
              merge: function(t) {
                  var e = []
                    , n = [];
                  i.each(t.concat(this), function(t) {
                      var i = t.getPoints();
                      e.push(i.start),
                      n.push(i.end)
                  }),
                  i.each(t, function(t) {
                      t.destroy()
                  });
                  var o = i.first(e.sort(this.comparePoints))
                    , s = i.last(n.sort(this.comparePoints));
                  this.setViaPoints(o, s)
              },
              sortTags: function() {
                  if (!this.isSelection()) {
                      var t = this.get("tags");
                      t = i.intersection(l, t),
                      this.set("tags", t, {
                          silent: !0
                      })
                  }
              },
              getShowTag: function() {
                  return this.get("tags")[0] || "others"
              },
              getActionsList: function() {
                  return this.isLocked() ? [] : this.isUnderline() ? d.underline : d[this.getShowTag()]
              },
              addFavorite: function(t) {
                  var e = t ? 1 : -1
                    , n = i.clone(this.get("tags"))
                    , o = this.get("n_favorites");
                  t ? n.push("favorite") : n = i.without(n, "favorite"),
                  this.set("tags", n),
                  this.set("n_favorites", o + e)
              },
              addCommentNum: function(t) {
                  var e = this.get("n_comments");
                  this.set("n_comments", e + t)
              },
              setCommentsNum: function(t) {
                  this.set("n_comments", t)
              },
              plainTextIsUrl: function() {
                  if (this.get("middleContainers").length)
                      return !1;
                  var e = t.trim(this.getTextFromRanges({
                      getFull: !0
                  }));
                  return g.test(e)
              },
              plainTextIsEnglish: function() {
                  if (this.get("middleContainers").length)
                      return !1;
                  var e = t.trim(this.getTextFromRanges());
                  return e.length > 1 && e.length < 100 && m.test(e)
              }
          })
            , b = {};
          return b.getPlainText = {
              getTextFromRanges: function() {
                  var e = (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).getFull
                    , n = void 0 !== e && e
                    , o = ""
                    , s = this;
                  return i.each(this.getContainerIds(), function(e) {
                      var n = t("p[data-pid=" + e + "]").first()
                        , r = s._ranges[e];
                      if (r.start || r.end !== Number.MAX_VALUE) {
                          var a, h = 0;
                          o && (o += "\n"),
                          i.each(n[0].getElementsByClassName("word"), function(e) {
                              a = t(e),
                              (h = a.data("offset")) >= r.start && h <= r.end && (o += s.getTextFromPara(a))
                          })
                      } else
                          o += "\n" + s.getTextFromPara(n)
                  }),
                  !n && o.length > 300 && (o = o.substr(0, 300) + " […]"),
                  o
              },
              getTextFromPara: function(e) {
                  var i, n = t(e);
                  return n.find('[type="math/tex"]').length ? ((i = n.clone()).find('[type="math/tex"]').each(function() {
                      var e = t(this);
                      e.closest(".word").html(e.html())
                  }),
                  i.text()) : n.text()
              }
          },
          n.me.isAnonymous && (v.prototype.save = function() {
              return t.Deferred().resolve().promise()
          }
          ),
          i.extend(v.prototype, b.getPlainText, {}),
          v
      }
      .apply(e, n)) || (t.exports = o)
  },
  112: function(t, e, i) {
      var n, o;
      n = [i(2), i(1)],
      void 0 === (o = function(t, e) {
          var i = {
              pid: "",
              offset: null,
              type: "",
              isFromUrl: !1,
              isRecommendation: !1,
              annotation: null
          };
          function n(t) {
              t = e.defaults(t || {}, i),
              this.setAttrs(t)
          }
          return e.extend(n.prototype, {
              setAttrs: function(t) {
                  return e.extend(this, t),
                  this.setAnnotation(t.annotation),
                  this
              },
              setAnnotation: function(t) {
                  if (t = t || this.annotation)
                      return this.pid = t.endContainerId,
                      this.offset = t.endOffset,
                      t.type = t.type || "rec_underline",
                      t.is_recommendation = this.isRecommendation,
                      t.is_from_url = this.isFromUrl,
                      this.isRecommendation && "note" === t.type && (t.open_on_render = !0),
                      this.annotation = e.clone(t),
                      this
              },
              ignoreSaveProgress: function() {
                  return this.isRecommendation || this.isFromUrl
              },
              getAnnotationJson: function() {
                  return e.clone(this.annotation)
              },
              hasAnnotation: function() {
                  return !!this.annotation
              },
              annotationIsNote: function() {
                  return "note" === this.annotation.type
              },
              annotationReadable: function() {
                  if (!this.hasAnnotation())
                      return !1;
                  var t = this.annotation;
                  return !this._annotationInvisible(t) && !this._annotationDeleted(t)
              },
              _annotationInvisible: function(t) {
                  return t.visible_private && !e.contains(t.tags, "mine")
              },
              _annotationDeleted: function(t) {
                  return t.is_deleted
              }
          }),
          n
      }
      .apply(e, n)) || (t.exports = o)
  },
  115: function(t, e, i) {
      var n;
      void 0 === (n = function() {
          return /msie 8/i.test(navigator.userAgent) ? function(t) {
              var e, i = /^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(([+-])([0-9]{2}):([0-9]{2}))?/.exec(t), n = function(t) {
                  return parseInt(t, 10)
              };
              if (i) {
                  var o = Date.UTC(n(i[1]), n(i[2]) - 1, n(i[3]), n(i[4]), n(i[5]), i[6] && n(i[6]) || 0);
                  if (new Date,
                  i[9] && i[10]) {
                      var s = 60 * n(i[9]) + n(i[10]);
                      o += ("+" === i[8] ? -1 : 1) * s * 6e4
                  }
                  e = new Date(o)
              }
              return e
          }
          : function(t) {
              return new Date(t)
          }
      }
      .call(e, i, e, t)) || (t.exports = n)
  },
  119: function(t, e, i) {
      var n;
      void 0 === (n = function() {
          var t = window.console;
          return function() {
              if (t && t.error)
                  try {
                      t.error.apply(t, arguments)
                  } catch (e) {
                      if (!Function.prototype.bind)
                          return;
                      Function.prototype.bind.call(t.error, t).apply(t, arguments)
                  }
          }
      }
      .call(e, i, e, t)) || (t.exports = n)
  },
  120: function(t, e, i) {
      var n, o;
      n = [i(0), i(1), i(2), i(130)],
      void 0 === (o = function(t, e, i, n) {
          return n.extend({
              onClickOutside: function() {
                  this.hide()
              },
              setPosition: function(e) {
                  var i = t(e)
                    , n = this.getOffsetWithin(i)
                    , o = n.top - this.getBodyScrollTop() + i.height() / 2 - this.opt.arrowOffset;
                  return this._node.css({
                      top: o,
                      left: n.left + 35
                  }),
                  this
              }
          })
      }
      .apply(e, n)) || (t.exports = o)
  },
  121: function(t, e, i) {
      var n, o;
      n = [i(0), i(1), i(2), i(130), i(252)],
      void 0 === (o = function(t, e, i, n, o) {
          var s = t(window)
            , r = {
              html: t.trim(t("#tmpl-tooltip").html()),
              id: ""
          };
          return n.extend({
              _super: n.prototype,
              constructor: function(e) {
                  e = t.extend({}, r, e),
                  this._super.constructor.call(this, e),
                  this.setUpEvents()
              },
              set: function(t) {
                  return e.extend(this, {
                      preferedDirection: "up"
                  }, e.pick(t, "target", "preferedDirection")),
                  this.setClass(t.className),
                  this._super.set.call(this, t)
              },
              hide: function() {
                  return this._super.hide.call(this)
              },
              setPosition: function(i, n) {
                  n = n || this.opt.arrowHeight || 0;
                  var r, a, h, l, c, u = i instanceof t, d = this._node.outerHeight() + 3 + n, f = this._node.outerWidth(), p = f / 2, g = s.width(), m = s.height(), v = 0;
                  if (u) {
                      var b = this.getOffsetWithin(i)
                        , y = i[0].getBoundingClientRect();
                      c = {
                          top: b.top,
                          left: b.left,
                          bcrLeft: y.left,
                          bcrRight: y.right,
                          bcrTop: y.top,
                          bcrBottom: y.bottom,
                          height: i.outerHeight(),
                          width: i.outerWidth()
                      }
                  } else
                      c = e.clone(i),
                      e.extend(c, {
                          bcrLeft: c.left,
                          bcrRight: c.left + c.width,
                          bcrTop: c.top - this.body.scrollTop()
                      }),
                      c.bcrBottom = c.bcrTop + (c.height || 0);
                  return r = {},
                  a = !0,
                  "down" === this.preferedDirection && c.bcrBottom + d < m && (a = !1),
                  c.bcrTop < d && (a = !1),
                  r.top = a ? c.top - d : c.top + c.height + n + 3,
                  r.left = c.left - (f - c.width) / 2,
                  h = g - c.bcrRight - p + c.width / 2 - 15,
                  l = c.bcrLeft - p + c.width / 2 - 15,
                  h < 0 ? v = h : l < 0 && (v = -l),
                  r.left = r.left + v,
                  o(this._node, {
                      backgroundColor: this._node.css("background-color") || "transparent",
                      borderColor: this._node.css("border-left-color") || "transparent",
                      arrowWidth: n,
                      borderSize: 1,
                      orention: a ? "bottom" : "top",
                      offset: f / 2 - v
                  }),
                  this._node.css(r),
                  this
              },
              update: function(t) {
                  this.setPosition(this.target, t)
              },
              setClass: function(t) {
                  return this._node[0].className = "tooltip" + (t ? " " + t : ""),
                  this
              },
              setUpEvents: function() {
                  var e = this;
                  this.body.on("mousedown", function(i) {
                      var n = t(i.target);
                      n.parents().add(n).is(e._node) || e.hide()
                  }),
                  this._node.on("click mouseup", function(t) {
                      t.stopPropagation()
                  })
              }
          })
      }
      .apply(e, n)) || (t.exports = o)
  },
  123: function(t, e, i) {
      var n, o;
      n = [i(0), i(2), i(1), i(163)],
      void 0 === (o = function(t, e, i, n) {
          var o = {
              useFormStyle: function(t) {
                  t.setClass("bubble-form"),
                  o.updateTipPosition(t)
              },
              updateTipPosition: function(t) {
                  t.update(10)
              }
          };
          return function(t, e, i, s) {
              s || (s = {});
              var r = new e(i);
              t.setContent(r.render().el),
              t.set({
                  preferedDirection: t.preferedDirection,
                  arrowHeight: 10
              }),
              t.show(),
              o.useFormStyle(t),
              s.autoClose && r.promise && r.promise.always(function() {
                  t.hide()
              }),
              r.on("updated", function() {
                  o.updateTipPosition(t)
              }),
              r.$el.on("removing", function() {
                  r.stopListening()
              });
              var a = t.find("textarea").focus();
              return a.length && n.collapseToEnd(a[0]),
              r
          }
      }
      .apply(e, n)) || (t.exports = o)
  },
  124: function(t, e, i) {
      var n, o;
      n = [i(0), i(1), i(2)],
      void 0 === (o = function(t, e, i) {
          return {
              closePanel: function() {
                  this.$el.trigger("close")
              }
          }
      }
      .apply(e, n)) || (t.exports = o)
  },
  130: function(t, e, i) {
      var n, o;
      n = [i(0), i(1), i(2), i(152)],
      void 0 === (o = function(t, e, i, n) {
          var o = {
              html: '<div class="reader-bubble"><b class="bubble-close">&times;</b><div class="bubble-content"></div></div>',
              contentClass: ".bubble-content",
              closeClass: ".bubble-close",
              arrowOffset: .5,
              renderTo: document.body
          };
          function s(i) {
              i = t.extend({}, o, i),
              this.opt = i,
              this.body = t(this.opt.renderTo);
              var n = this;
              this._config = {},
              this._opened = !1,
              this._node = t(i.html),
              this._content = this._node.find(i.contentClass),
              this._close = this._node.find(i.closeClass),
              this.set(i),
              this._node.hide(),
              this._node.appendTo(this.body),
              this._node.on("click", i.closeClass, function() {
                  n.hide()
              }),
              e.isUndefined(i.onClickOutside) || (this.onClickOutside = i.onClickOutside)
          }
          return s.extend = i.inhert,
          s.prototype = {
              constructor: s,
              find: function(t) {
                  return this._node.find(t)
              },
              set: function(t) {
                  return this.opt = e.extend(this.opt, t),
                  t.target && (this._config.target = t.target),
                  t.width && this.setWidth(t.width),
                  t.content && this.setContent(t.content),
                  this
              },
              setWidth: function(t) {
                  return this._node.css("width", t),
                  this
              },
              setContent: function(i) {
                  return e.isString(i) || t(i).parent()[0] !== this._content[0] ? (this._content.empty(),
                  this._content.append(i),
                  this) : this
              },
              setPosition: function(e) {
                  var i = t(e)
                    , n = this._node.outerHeight()
                    , o = this.getOffsetWithin(i).top + i.height() / 2 - n * this.opt.arrowOffset;
                  return this._node.css({
                      top: o,
                      left: this.getOffsetWithin(i).left + 35
                  }),
                  this
              },
              update: function() {
                  return this.setPosition(this._config.target),
                  this
              },
              isVisible: function() {
                  return this._opened
              },
              show: function() {
                  var e = this._config.target;
                  if (!this._opened)
                      return this._opened = !0,
                      this._node.show(),
                      this.onClickOutside && n(this._node.add(e), t.proxy(this.onClickOutside, this)),
                      this.setPosition(e),
                      this.trigger("shown", this),
                      this;
                  this.setPosition(e)
              },
              hide: function(t) {
                  if (this._opened)
                      return this._opened = !1,
                      this._node.hide(),
                      t && this._content.empty(),
                      this.trigger("hidden", this),
                      this
              },
              toggle: function(t) {
                  var e = this._config.target;
                  return e !== this._config.prevTarget ? (this._config.prevTarget = e,
                  this.show(),
                  this) : (this._opened ? this.hide(t) : this.show(),
                  this)
              },
              getOffsetWithin: function(t) {
                  var i = {
                      top: 0,
                      left: 0
                  }
                    , n = this.body[0]
                    , o = t[0];
                  return e.isUndefined(o.getBoundingClientRect) || (i = o.getBoundingClientRect()),
                  {
                      top: i.top + this.getBodyScrollTop() - (n.clientTop || 0),
                      left: i.left + this.getBodyScrollLeft() - (n.clientLeft || 0)
                  }
              },
              getBodyScrollTop: function() {
                  return this.getBodyScroll("top")
              },
              getBodyScrollLeft: function() {
                  return this.getBodyScroll("left")
              },
              getBodyScroll: function(e) {
                  var i = "top" === e
                    , n = this.body[0];
                  return n === document.body ? t(window)[i ? "scrollTop" : "scrollLeft"]() : n[i ? "scrollTop" : "scrollLeft"]
              },
              destroy: function() {
                  return this._opened = !1,
                  this._node.remove(),
                  this.trigger("destroyed", this),
                  this
              }
          },
          e.extend(s.prototype, i.Events),
          s
      }
      .apply(e, n)) || (t.exports = o)
  },
  131: function(t, e, i) {
      var n, o;
      n = [i(0), i(2), i(1), i(4), i(20), i(23), i(31), i(42), i(41)],
      void 0 === (o = function(t, e, i, n, o, s, r, a, h) {
          var l = e.View.extend({
              tagName: "form",
              className: "share-form",
              tmpl: t("#tmpl-sharing-form").html(),
              initialize: function(e) {
                  this.dfd = t.Deferred(),
                  this.promise = this.dfd.promise(),
                  this.options = e,
                  this.isNote = e.isNote,
                  this.shareTypeLabel = e.shareTypeLabel || this.isNote ? "推荐" : "分享"
              },
              render: function() {
                  var t = new a(this.options.extraParam,{
                      url: this.options.url
                  });
                  return this.initializeSharing(t),
                  this.$el.html(i.template(this.tmpl, {
                      isNote: this.isNote,
                      sharingActionsHtml: this.renderSharingHtml({
                          sharingLabel: this.shareTypeLabel
                      })
                  })),
                  this.bindSharingActions(),
                  this.updateSharingText(),
                  s.ctrlEnterForm(this.$el),
                  this
              },
              events: {
                  submit: "submitForm",
                  "click .ln-cancel": "cancelForm"
              },
              cancelForm: function(t) {
                  t.preventDefault(),
                  this.dfd.reject(),
                  this.trigger("cancel")
              },
              submitForm: function(t) {
                  t.preventDefault();
                  var e = this.formModel
                    , n = this.getText()
                    , a = this.isNote
                    , h = this.getCommentAttr();
                  e.hasSharing() && (s.readonlyForm(this.$el),
                  e.set("text", n),
                  a && e.set("add_comment", h),
                  e.save({}).done(i.bind(function() {
                      this.shareText.val(""),
                      s.resumeForm(this.$el),
                      e.saveConfigToStroage(),
                      this.onSubmitted(e),
                      r.toast(this.shareTypeLabel + "成功"),
                      o._trackEvent("readShare")
                  }, this)).fail(i.bind(function(t, e, i) {
                      r.toast(this.shareTypeLabel + "失败: " + i)
                  }, this)),
                  this.dfd.resolve(e),
                  this.trigger("submitted", e))
              },
              getCommentAttr: function() {
                  return this.$("#add-comment").is(":checked") ? "on" : ""
              },
              onSubmitted: t.noop
          });
          return i.extend(l.prototype, h),
          l
      }
      .apply(e, n)) || (t.exports = o)
  },
  132: function(t, e, i) {
      var n, o;
      n = [i(1), i(2)],
      void 0 === (o = function(t, e) {
          function i() {
              this.markingsMap = {}
          }
          return t.extend(i.prototype, e.Events, {
              get: function(t) {
                  return this.markingsMap[t] = this.markingsMap[t] || [],
                  this.markingsMap[t]
              },
              add: function(e) {
                  e.toJSON();
                  var i, n = this._getMapPids(e);
                  t.each(n, function(n) {
                      i = this.get(n),
                      t.contains(i, e) || (i.push(e),
                      this.trigger("added", n, e))
                  }, this)
              },
              remove: function(e) {
                  t.each(this._getMapPids(e), function(i) {
                      this.markingsMap[i] = t.without(this.markingsMap[i], e),
                      this.trigger("removed", i, e)
                  }, this)
              },
              _getMapPids: function(t) {
                  return t.isNote() ? [t.get("endContainerId")] : t.getContainerIds()
              },
              getNoteCounterByPid: function(e) {
                  return t.filter(this.get(e), function(t) {
                      return t.isNote()
                  }).length
              },
              getByPids: function(e) {
                  var i = t.map(e, function(t) {
                      return this.get(t)
                  }, this);
                  return t.union.apply(this, i)
              },
              getMapData: function() {
                  return this.markingsMap
              }
          }),
          i
      }
      .apply(e, n)) || (t.exports = o)
  },
  136: function(t, e, i) {
      var n, o;
      n = [i(0), i(1), i(2), i(21)],
      void 0 === (o = function(t, e, i, n) {
          var o = {
              html: "",
              closeSelector: ".close, .confirm",
              contentSelector: ".content"
          };
          function s(t) {
              e.bindAll(this, "close"),
              t = e.defaults(t || {}, o),
              e.extend(this, t),
              this.overlay = n({
                  klass: "alert-overlay"
              }),
              this.render(t.html).open()
          }
          return e.extend(s.prototype, i.Events, {
              render: function(e) {
                  return this.el = t(e || this.html),
                  this.overlay.setBody(this.el),
                  this.deletgateEvent(),
                  this
              },
              deletgateEvent: function() {
                  return this.el.on("click.alert", this.closeSelector, this.close),
                  this
              },
              undelegateEvent: function() {
                  return this.el.off(".alert"),
                  this
              },
              open: function() {
                  return this.overlay.open(),
                  this.trigger("opened"),
                  this
              },
              close: function(e) {
                  e.preventDefault();
                  var i = t(e.currentTarget).data("name");
                  return this.overlay.close(),
                  this.trigger("closed", i),
                  this
              }
          }),
          s
      }
      .apply(e, n)) || (t.exports = o)
  },
  138: function(t, e, i) {
      var n, o;
      n = [i(2), i(1), i(0), i(171)],
      void 0 === (o = function(t, e, i, n) {
          return t.Collection.extend({
              model: n,
              url: function() {
                  return "/j/bookmark/gets_by_works?works_id=" + this.articleId
              },
              initialize: function(t, e) {
                  this.articleId = e.articleId,
                  this.contentModel = e.contentModel,
                  this.parasIndexs = this.contentModel.parasIndexs
              },
              getPids: function() {
                  return this.pluck("paragraph_id")
              },
              comparator: function(t) {
                  return e.indexOf(this.parasIndexs, t.get("paragraph_id"))
              }
          })
      }
      .apply(e, n)) || (t.exports = o)
  },
  139: function(t, e, i) {
      var n, o;
      n = [i(1), i(321)],
      void 0 === (o = function(t, e) {
          return {
              htmlNoteArea: function(e) {
                  this.$(".note").html(t.escape(e))
              },
              deleteAnnotation: function(t) {
                  t.preventDefault();
                  var e = this.model.isUnderline() ? "划线" : "批注";
                  confirm("确定删除这条{{type}}吗？".replace("{{type}}", e)) && this.model.destroy()
              },
              editNote: function(t) {
                  t.preventDefault();
                  var i = this.model
                    , n = i.get("note")
                    , o = new e({
                      text: n,
                      visible_private: this.model.isPrivate()
                  })
                    , s = this.$(".note")
                    , r = this;
                  s.html(o.render().el),
                  o.autoResize().focus(),
                  this.$el.addClass("note-editing"),
                  o.promise.done(function(t) {
                      i.set({
                          note: t.get("text"),
                          visible_private: t.get("visible_private")
                      })
                  }).always(function() {
                      r.htmlNoteArea(i.get("note")),
                      r.$el.removeClass("note-editing")
                  })
              }
          }
      }
      .apply(e, n)) || (t.exports = o)
  },
  149: function(t, e, i) {
      var n, o;
      n = [i(0), i(1), i(233)],
      void 0 === (o = function(t, e) {
          function i(i) {
              i = i || {},
              this.el = t(i.el || document.body),
              this.disableElements = i.disableElements,
              this.eventNS = ".mw",
              this.eventName = "mousewheel" + this.eventNS;
              var n = this;
              this.onMousewheel(e.debounce(function(t, e, i, o) {
                  var s = {
                      event: t,
                      delta: e,
                      deltaX: i,
                      deltaY: o
                  };
                  e < 0 && n.isAtBottom() ? n.el.trigger("mousewheel:atBottom" + n.eventNS, s) : e > 0 && n.isAtTop() && n.el.trigger("mousewheel:atTop" + n.eventNS, s)
              }, 40, !0))
          }
          return i.prototype = {
              constructor: i,
              onMousewheel: function(t) {
                  var e = this;
                  if (this.el.on(this.eventName, function() {
                      e.disabled || t.apply(this, arguments)
                  }),
                  this.disableElements) {
                      var i = this.disableElements.join(",");
                      this.el.on(this.eventName, i, function(t) {
                          t.stopPropagation()
                      })
                  }
              },
              onWheelBottom: function(t) {
                  this.el.on("mousewheel:atBottom" + this.eventNS, t)
              },
              onWheelTop: function(t) {
                  this.el.on("mousewheel:atTop" + this.eventNS, t)
              },
              isAtTop: function() {
                  return 0 === this.el[0].scrollTop
              },
              isAtBottom: function() {
                  var t = this.el[0];
                  return t.offsetHeight + t.scrollTop >= t.scrollHeight
              },
              reset: function() {
                  this.el.off(this.eventNS)
              },
              enable: function() {
                  this.disabled = !1
              },
              disable: function() {
                  this.disabled = !0
              }
          },
          i
      }
      .apply(e, n)) || (t.exports = o)
  },
  150: function(t, e, i) {
      var n = i(1)
        , o = i(2)
        , s = i(119)
        , r = i(11)
        , a = o.Model.extend({
          initialize: function() {
              r(this, "turning"),
              this.on("change:currPage", this.setProgressAsCurrPage).on("change:currPage", this.setCurrPagePosition)
          },
          setProgressAsCurrPage: function(t, e) {
              var i = t.get("totalPage");
              t.set("progress", e / i * 100)
          },
          setCurrPagePosition: function(t, e) {
              t.set("isFirstPage", e <= 1),
              t.set("isLastPage", e === t.get("totalPage"))
          },
          setCurrPage: function(t, e) {
              this.set({
                  currPage: this.pageScope(t)
              }, e)
          },
          setReadCurrPage: function(t, e) {
              this.setCurrPage(this.read2real(t), e)
          },
          getReadCurrPage: function() {
              var t = this.get("currPage");
              return this.real2read(t)
          },
          setTotalPage: function(t) {
              this.set({
                  totalPage: t
              })
          },
          getReadTotalPage: function() {
              var t = this.get("totalPage");
              return this.real2read(t)
          },
          pageScope: function(t) {
              var e = this.get("totalPage")
                , i = parseInt(t, 10) || 1;
              return (i = i <= 0 ? 1 : i) > e ? e : i
          },
          turnLastPage: function() {
              this.setCurrPage(this.get("totalPage"))
          },
          turnFirstPage: function() {
              this.setCurrPage(1)
          },
          currIsGiftPage: function() {
              return this.get("isGift") && 1 === this.get("currPage")
          },
          isPageTurned: function() {
              return !!this.get("currPage")
          },
          set: function() {
              return this.isDisabled() ? (s("turningModel.set() has been disabled, set failed"),
              this) : o.Model.prototype.set.apply(this, arguments)
          },
          disableSet: function() {
              this.setDisable = !0
          },
          enableSet: function() {
              this.setDisable = !1
          },
          isDisabled: function() {
              return !!this.setDisable
          }
      });
      n.extend(a.prototype, {
          read2real: function(t) {
              return t + (this.get("isGift") ? 1 : 0)
          },
          real2read: function(t) {
              var e = t - (this.get("isGift") ? 1 : 0);
              return !e || e < 1 ? 1 : e
          }
      }),
      t.exports = a
  },
  151: function(t, e, i) {
      var n, o;
      n = [i(0), i(1), i(2), i(3), i(6), i(21), i(9), i(31), i(120), i(131), i(49), i(234), i(236), i(237), i(238), i(242), i(243)],
      void 0 === (o = function(t, e, i, n, o, s, r, a, h, l, c, u, d, f, p, g, m) {
          return i.View.extend({
              tmpl: t("#tmpl-panel").html(),
              initialize: function(t) {
                  e.bindAll(this, "hide", "toggle", "hideBubble", "updateBubble", "hideHelper", "showHelper", "toggleFilterTip", "openRatingBubble"),
                  this.app = o,
                  this.vent = this.app.vent,
                  this.config = t.config,
                  this.vent.on({
                      "close:helperGuide": this.hideHelper,
                      "open:helperGuide": this.showHelper,
                      "open:ratingBubble": this.openRatingBubble
                  }),
                  o.on("pageView:switched", this.hideAllBubbles, this),
                  this.enableAnnotationsFilter(),
                  this.isShown = !0
              },
              render: function(t) {
                  var i = n.me.isAnonymous;
                  return this.articleId = t.get("id"),
                  this.ratingForm = new c({
                      model: t.getRating()
                  }),
                  this.$el.html(e.template(this.tmpl, {
                      isSample: !!t && t.get("isSample"),
                      isAnonymous: i,
                      isGallery: this.config.get("isGallery"),
                      canRate: !!t && !!this.app.me && this.app.me.canRate(t),
                      reviewsUrl: o.router.getReviewsUrl(),
                      layout: this.config.get("layout")
                  })),
                  this.layoutBtn = this.$el.find(".arkicon-layout"),
                  this.helperBtn = this.$el.find("#fn-helper"),
                  this.reviewsBtn = this.$el.find("#fn-salon"),
                  this.backBtn = this.$el.find(".arkicon-back"),
                  this.filterBtn = this.$el.find(".icon-annotations-filter"),
                  this.toggleFilterIcon(this.othersAnnotationShown),
                  this.config.get("isGallery") || (this.searchDialog && this.searchDialog.remove(),
                  this.searchDialog = new p({
                      app: this.app,
                      target: this.$(".icon-search")
                  }),
                  this.speechDialog && this.speechDialog.remove(),
                  this.speechDialog = new g({
                      app: this.app,
                      target: this.$("#fn-speech")
                  }),
                  this.fontSizeDialog && this.fontSizeDialog.remove(),
                  this.fontSizeDialog = new m({
                      app: this.app,
                      target: this.$("#fn-font-size")
                  })),
                  i || (r.fitForMobile() || (this.formBubble = new h({
                      renderTo: this.$el.find(".panel"),
                      arrowOffset: 16,
                      onClickOutside: !1
                  })),
                  this.ratingForm.on("cancel", this.hideBubble).on("updated", this.updateBubble)),
                  this
              },
              events: {
                  "click .arkicon-back": "backList",
                  "click .arkicon-layout": "_changeLayout",
                  "click .arkicon-star": "toggleRatingForm",
                  "click .arkicon-share": "toggleSharingForm",
                  "click #fn-helper": "toggleHelper",
                  "click .icon-annotations-filter": "toggleFilterTip",
                  "click .icon-search": "toggleSearch",
                  "click #fn-speech": "toggleSpeech",
                  "click #fn-font-size": "toggleFontSize"
              },
              hideBubble: function() {
                  this.formBubble.hide()
              },
              hideAllBubbles: function() {
                  o.vent.trigger("close:helperGuide"),
                  e.each(["formBubble", "guideBubble", "filterTip", "searchDialog", "speechDialog", "fontSizeDialog"], function(t) {
                      var e = this[t];
                      e && e.hide()
                  }, this)
              },
              openAnnotationGuideBubble: function() {
                  var t = new h({
                      html: '<div class="annotation-guide-bubble"><div class="bubble-content"></div></div>',
                      onClickOutside: !1
                  })
                    , e = new f;
                  this.guideBubble = t,
                  t.set({
                      arrowOffset: 70,
                      target: this.filterBtn[0],
                      content: e.render().el
                  }),
                  e.on("close:wrapper open:annotationGuideDialog", function() {
                      t.hide()
                  }).on("open:annotationGuideDialog", function() {
                      this.openAnnotationGuideDialog()
                  }, this),
                  t.show()
              },
              openAnnotationGuideDialog: function() {
                  var t = new d
                    , e = s({
                      body: t.render().$el,
                      klass: "annotation-guide-overlay",
                      closable: !1
                  }).open();
                  t.on("close:wrapper", function() {
                      e.close()
                  }).on("open:annotationGuideDialog", function() {
                      this.openAnnotationGuideDialog()
                  }, this)
              },
              updateBubble: function() {
                  this.formBubble.update()
              },
              _changeLayout: function() {
                  var t = "vertical" === this.config.get("layout") ? "horizontal" : "vertical";
                  this.config.set("layout", t),
                  this.changeLayout(t)
              },
              changeLayout: function(t) {
                  return this.hideAllBubbles(),
                  o.vent.trigger("close:popups"),
                  this.changeLayoutBtn(t),
                  this.vent.trigger("change:layout", t),
                  this.vent.trigger("rerender:article"),
                  a.alert("vertical" === t ? "垂直阅读模式" : "分页阅读模式"),
                  this
              },
              changeLayoutBtn: function(t) {
                  this.vent.trigger("close:shortcutTips"),
                  this.layoutBtn.toggleClass("vertical", "vertical" === t)
              },
              enableAnnotationsFilter: function() {
                  this.annotationConfig = this.config.get("annotationsConfig"),
                  this.annotationsFilterView = new u({
                      model: this.annotationConfig
                  }),
                  this.listenTo(this.annotationConfig, "change:showOthers", this.onFilterChange),
                  this.onFilterChange(this.annotationConfig, this.annotationConfig.get("showOthers"))
              },
              toggleHelper: function() {
                  var t = this.helperIsShown();
                  this.hideAllBubbles(),
                  t || this.usingLiteStyle() || o.vent.trigger("open:helperGuide")
              },
              usingLiteStyle: function() {
                  return this.config && this.config.get("usingLiteStyle")
              },
              helperIsShown: function() {
                  return t("i.tips").length
              },
              hideHelper: function() {
                  var e = t("i.tips");
                  e.length && (e.remove(),
                  !this.config || this.config.get("hasShownAnnotationGuide") || this.usingLiteStyle() || this.config.get("isGallery") || (this.openAnnotationGuideBubble(),
                  this.config.set("hasShownAnnotationGuide", !0)))
              },
              showHelper: function() {
                  var i = t("body")
                    , n = t(window)
                    , o = t("[data-helper]").toArray()
                    , s = n.scrollTop()
                    , r = n.scrollLeft();
                  e.each(o, function(e) {
                      if ((e = t(e)).is(":visible")) {
                          var n = e.offset();
                          i.append(t('<i class="tips"><b></b>{TITLE}</i>'.replace("{TITLE}", e.data("helper"))).css({
                              top: n.top - s + (e.height() - 20) / 2,
                              left: n.left - r + e.width() + 12
                          }))
                      }
                  })
              },
              toggleRatingForm: function(t) {
                  if (this.ratingForm) {
                      var e = this.formBubble.isVisible();
                      this.hideAllBubbles(),
                      e || this.formBubble.set({
                          width: "380px",
                          target: t.target,
                          content: this.ratingForm.render().$el
                      }).show()
                  }
              },
              openRatingBubble: function(t) {
                  var e = this.ratingForm
                    , i = this.formBubble
                    , n = !!t.editingMode
                    , o = this.$el.find(".arkicon-star");
                  e && i && (this.hideAllBubbles(),
                  i.set({
                      width: "380px",
                      target: o,
                      content: e.render().$el
                  }).show(),
                  e.model.set("editingMode", n),
                  e.renderForm(),
                  e.trigger("updated"))
              },
              toggleSharingForm: function(t) {
                  var e = this.formBubble.isVisible();
                  this.hideAllBubbles(),
                  e || (this.sharingForm = new l({
                      isNote: !1,
                      url: "/j/share/rec_article",
                      extraParam: {
                          aid: this.articleId
                      }
                  }),
                  this.sharingForm.once("cancel submitted", this.hideBubble),
                  this.formBubble.set({
                      width: "350px",
                      target: t.target,
                      content: this.sharingForm.render().$el
                  }).show())
              },
              toggleSearch: function() {
                  var t = this.searchDialog.bubble.isVisible();
                  this.hideAllBubbles(),
                  this.searchDialog[t ? "hide" : "show"]()
              },
              toggleSpeech: function() {
                  var t = this.speechDialog.bubble.isVisible();
                  this.hideAllBubbles(),
                  this.speechDialog[t ? "hide" : "show"]()
              },
              toggleFontSize: function() {
                  var t = this.fontSizeDialog.bubble.isVisible();
                  this.hideAllBubbles(),
                  this.fontSizeDialog[t ? "hide" : "show"]()
              },
              toggleFilterTip: function(t) {
                  if (this.annotationConfig) {
                      this.filterTip || (this.filterTip = new h({
                          html: '<div class="tiny-bubble"><div class="bubble-content filter-group"></div></div>'
                      }),
                      this.filterTip.set({
                          arrowOffset: 16,
                          content: this.annotationsFilterView.el
                      }));
                      var e = this.filterTip.isVisible();
                      this.hideAllBubbles(),
                      e || (this.filterTip.set({
                          target: t.target
                      }),
                      this.annotationsFilterView.render(o.me.isAnonymous()),
                      this.filterTip.show())
                  }
              },
              onFilterChange: function(t, e) {
                  this.othersAnnotationShown = e,
                  this.toggleFilterIcon(e)
              },
              toggleFilterIcon: function(t) {
                  this.filterBtn && this.filterBtn.toggleClass("opened", t)
              },
              backList: function(t) {
                  t.preventDefault();
                  var e, i = location.pathname;
                  r.hasPushState() ? (e = document.referrer,
                  e = /douban\.com:?\d*\/reader\/(ebooks|columns)/gi.test(e) ? e : "/reader/" + /(column|ebook)/gi.exec(i)[1] + "s") : e = "/reader/" + (this.config.get("isChapter") ? "columns" : "ebooks"),
                  location.href = e
              },
              updateStyle: function(t) {
                  return this.$el.css(t),
                  this
              },
              disableBtn: function(t) {
                  return this.$el.find(t).addClass("disabled"),
                  this
              },
              enableBtn: function(t) {
                  return this.$el.find(t).removeClass("disabled"),
                  this
              },
              hide: function() {
                  if (!this.isShown)
                      return this;
                  this.formBubble && this.formBubble.hide(),
                  this.isShown = !1,
                  this.$el.hide()
              },
              show: function() {
                  if (this.isShown)
                      return this;
                  this.isShown = !0,
                  this.$el.show()
              },
              toggle: function() {
                  return this.$el[this.isShown ? "hide" : "show"](),
                  this.isShown = !this.isShown,
                  this
              }
          })
      }
      .apply(e, n)) || (t.exports = o)
  },
  152: function(t, e, i) {
      var n, o;
      n = [i(0)],
      void 0 === (o = function(t) {
          var e = t(document);
          return function(i, n, o) {
              i = t(i),
              e.on("click", function s(r) {
                  var a = t(r.target);
                  (function(e, i) {
                      for (var n = 0, o = i.length; n < o; n++)
                          if (-1 !== t.inArray(i[n], e))
                              return !0;
                      return !1
                  }
                  )(a.parents().add(a).get(), i.get()) || (n.call(this, r),
                  o || e.off("click", s))
              })
          }
      }
      .apply(e, n)) || (t.exports = o)
  },
  153: function(t, e, i) {
      var n;
      void 0 === (n = function() {
          return function(t) {
              if (t)
                  for (var e = [].concat.call([], t), i = e.length, n = 0; n < i; )
                      (new Image).src = e[n++]
          }
      }
      .call(e, i, e, t)) || (t.exports = n)
  },
  154: function(t, e, i) {
      var n, o;
      n = [i(0), i(155), i(249)],
      void 0 === (o = function(t, e, i) {
          return function(n, o) {
              t(o).find(n).each(function(n, s) {
                  s = t(s);
                  var r = new e(s,o);
                  new i({
                      purchaseWidget: r,
                      button: s.find('[data-action="purchase"]')
                  })
              })
          }
      }
      .apply(e, n)) || (t.exports = o)
  },
  155: function(t, e, i) {
      var n, o;
      n = [i(0), i(245), i(4), i(14), i(13), i(8), i(246), i(247)],
      void 0 === (o = function(t, e, i, n, o, s, r, a) {
          var h = "/account/feedback/?create=1"
            , l = function(e) {
              this._el = e,
              this.tmplPurchaseDialog = t("#tmpl-purchase-dialog").html(),
              this.tmplPurchaseSuccess = t("#tmpl-purchase-success").html()
          };
          function c(t) {
              var e = [];
              return t.coupons_to_use.forEach(function(t) {
                  e.push(t)
              }),
              t.balance_to_use && e.push({
                  memo: "余额支付",
                  amount: t.balance_to_use
              }),
              e
          }
          return t.extend(l.prototype, a, {
              doPurchase: function() {
                  this.checkBalance()
              },
              updateData: function(t) {
                  this._el.data(t)
              },
              onReadyToBuy: function(t, e, i, a) {
                  if (this.isFree())
                      this.buyAsFree();
                  else {
                      var h = this
                        , l = this._readablePrice(a.total_sale_price)
                        , u = this._readablePrice(a.amount_to_pay)
                        , d = this._readablePrice(a.balance)
                        , f = this.getUsername()
                        , p = "购买" + this.getKindName()
                        , g = this.isPrivate()
                        , m = s({
                          type: "confirm",
                          title: p,
                          content: o(this.tmplPurchaseDialog, {
                              title: this.getTitle(),
                              extra_title: this.getExtraTitle(),
                              price: l,
                              amount: u,
                              balance: d,
                              consumptions: c(a),
                              username: f,
                              secretly: g,
                              subscribed: this.isSubscribed(),
                              isChapter: this.isChapter(),
                              moneyformat: function(t) {
                                  return t.toFixed(2)
                              }
                          })
                      }).on("confirm", function() {
                          var t = this.getBody()
                            , e = t.find("[name=secretly]");
                          h.addSubscription = t.find("[name=add_subscription]").is(":checked") ? "on" : "",
                          e.prop("checked") ? (h.secretly = e.val(),
                          n("pp", 1, {
                              "max-age": 31536e4
                          })) : (h.secretly = "",
                          n.remove("pp")),
                          h.getBought(u),
                          this.close(!0)
                      }).addClass("purchase-dialog").on("close", function() {
                          h._el.trigger("purchase:failed"),
                          h.cancel()
                      }).open();
                      r.init({
                          el: m.el.find(".payment-channels")
                      }),
                      this.paymentForm = r.form
                  }
              },
              onBought: function() {
                  this.isFree() ? location.reload() : this.showSuccessDialog()
              },
              onCheckingBalance: function() {
                  this.isFree() ? this.passedCheck() : (this.trackPurchaseEvent("tryToBuy"),
                  this._checkBalance())
              },
              ongetBought: function(t, e, i, n) {
                  n ? this._confirmThirdPartyToBuy(n) : this._confirmToBuy()
              },
              onbuyAsFree: function() {
                  this._confirmToBuy()
              },
              showSuccessDialog: function() {
                  var t, e = this, i = this.tmplPurchaseSuccess, n = 3, r = this.isMultiPurchase(), a = o(i, {
                      sec: n,
                      isMultiPurchase: r
                  });
                  (t = r ? s({
                      type: "tips",
                      title: "购买成功",
                      content: a
                  }).setButtons([{
                      text: "知道了"
                  }]) : s({
                      type: "confirm",
                      title: "购买成功",
                      content: a
                  }).setButtons([{
                      text: "去阅读"
                  }, {
                      text: "知道了"
                  }])).addClass("purchase-success-dialog").on("close", function() {
                      clearInterval(l),
                      e._el.trigger("purchase:finish", e.getRedirectUrl())
                  }).on("confirm", function() {
                      e.isMultiPurchase() ? location.href = e.getRedirectUrl() : location.href = e.getReaderUrl()
                  }).on("cancel", function() {
                      this.close()
                  }).open();
                  var h = t.el.find(".count-down-num")[0];
                  h.innerHTML = n;
                  var l = setInterval(function() {
                      n -= 1,
                      h.innerHTML = n,
                      n || (clearInterval(l),
                      t.close())
                  }, 1e3)
              },
              onsucceededToBuy: function(t, e, i, n) {
                  this.isFree() ? this.trackPurchaseEvent("got") : (this.trackPurchaseEvent("bought"),
                  this.trackEcommerce(n.order, this.getOrigin(), "购买")),
                  this._el.trigger("purchase:success")
              },
              onfailedToBuy: function() {
                  this.trackPurchaseEvent("failed"),
                  this._el.trigger("purchase:failed")
              },
              _readablePrice: function(t) {
                  return t / 100
              },
              _readableAmount: function(t) {
                  return t < 0 ? Math.abs(t) / 100 : 0
              },
              _checkBalance: function() {
                  var t = this;
                  this._el.trigger("checkBalance:start"),
                  i({
                      url: "/j/purchase/bill",
                      type: "POST",
                      data: {
                          works_ids: this.getWorksIds()
                      },
                      dataType: "json",
                      traditional: !0
                  }).done(function(e) {
                      t.passedCheck(e)
                  }).fail(function() {
                      t._el.trigger("checkBalance:failed"),
                      t.trackPurchaseEvent("checkBalanceFailed"),
                      s({
                          type: "confirm",
                          title: "出错了",
                          content: "无法获取账户余额，也许是网络连接出现了问题。"
                      }).setButtons([{
                          text: "重试"
                      }, {
                          text: "问题反馈"
                      }]).on("confirm", function() {
                          this.close(!0),
                          t._checkBalance()
                      }).on("cancel", function() {
                          window.open(h)
                      }).on("close", function() {
                          t.failedCheck()
                      }).open()
                  })
              },
              _confirmThirdPartyToBuy: function(t) {
                  var e = this;
                  s({
                      type: "confirm",
                      title: "等待支付",
                      content: "请在新打开的页面中完成支付。",
                      closable: !1
                  }).addClass("general-tips").setButtons([{
                      text: "支付成功"
                  }, {
                      text: "遇到问题"
                  }]).on("confirm", function() {
                      location.reload()
                  }).on("cancel", function() {
                      e._el.trigger("bought:failed"),
                      e.failedToBuy(),
                      window.open(h)
                  }).open(),
                  this._requestThirdPartyToBuy(t)
              },
              _requestThirdPartyToBuy: function(e) {
                  var i = [{
                      name: "amount",
                      value: e
                  }, {
                      name: "secretly",
                      value: this.secretly
                  }, {
                      name: "add_subscription",
                      value: this.addSubscription
                  }];
                  i.push.apply(i, t.map(this.getWorksIds(), function(t) {
                      return {
                          name: "works_ids",
                          value: t
                      }
                  }));
                  for (var n = i.length; n; )
                      n -= 1,
                      this.paymentForm.append(t("<input>", {
                          type: "hidden"
                      }).attr(i[n]));
                  this.paymentForm.submit()
              },
              _requestToBuy: function() {
                  var e = this.isFree() ? "获取作品" : "确认购买"
                    , n = "正在{{EVENT}}，请稍候...".replace("{{EVENT}}", e)
                    , o = s({
                      type: "tips",
                      title: e,
                      content: n
                  }).addClass("general-tips").open()
                    , r = t.param({
                      works_ids: this.getWorksIds(),
                      secretly: this.secretly || "",
                      add_subscription: this.addSubscription
                  }, !0);
                  return i({
                      type: "POST",
                      url: "/j/purchase/",
                      dataType: "json",
                      arkWithDocReferer: !0,
                      data: r
                  }).always(function() {
                      o.close()
                  })
              },
              _confirmToBuy: function() {
                  var t = this;
                  t._requestToBuy().done(function(e) {
                      !e || e.r ? t._confirmToBuyFailed(e ? e.err : "出现了奇怪的错误:(") : t.succeededToBuy(e)
                  }).fail(function() {
                      t._confirmToBuyFailed("无法完成购买操作，也许是网络连接出现了问题。")
                  })
              },
              _confirmToBuyFailed: function(t) {
                  var e = this;
                  this.trackPurchaseEvent("finalPurchaseFailed"),
                  s({
                      type: "confirm",
                      title: "出错了",
                      content: t
                  }).setButtons([{
                      text: "重试"
                  }, {
                      text: "问题反馈"
                  }]).on("confirm", function() {
                      this.close(!0),
                      e._confirmToBuy()
                  }).on("cancel", function() {
                      window.open(h)
                  }).on("close", function() {
                      e.failedToBuy()
                  }).addClass("general-tips").open()
              },
              isFree: function() {
                  return !this.getPriceInCents()
              },
              isPrivate: function() {
                  return !!n("pp")
              },
              isSubscribed: function() {
                  return !!this._el.data("subscribed")
              },
              isChapter: function() {
                  return this._el.data("is-chapter")
              },
              getPrice: function() {
                  return this._el.data("readable-price")
              },
              getPriceInCents: function() {
                  return this._el.data("price")
              },
              getTitle: function() {
                  return this._el.data("title")
              },
              getExtraTitle: function() {
                  return this._el.data("extra-title")
              },
              getKindName: function() {
                  return this._el.data("kind-name")
              },
              getWorksIds: function() {
                  return (this._el.data("works-ids") + "").split(",")
              },
              isMultiPurchase: function() {
                  return !!this._el.data("is-multiply")
              },
              getArticleUrl: function() {
                  return this._el.data("url")
              },
              getReaderUrl: function() {
                  return this._el.data("reader-url")
              },
              getRedirectUrl: function() {
                  return this._el.data("redirect-url")
              },
              getUsername: function() {
                  return this._el.data("username")
              },
              getOrigin: function() {
                  var t = /^\/(reader|\w*)/gi.exec(location.pathname)[1];
                  return "reader" === t ? t : "new-store"
              },
              isLargeBtn: function() {
                  return this.isLargeBtn = this._el.data("is-large-btn"),
                  this.isLargeBtn
              }
          }),
          e.create({
              target: l.prototype,
              events: [{
                  name: "checkBalance",
                  from: "none",
                  to: "CheckingBalance"
              }, {
                  name: "passedCheck",
                  from: "CheckingBalance",
                  to: "ReadyToBuy"
              }, {
                  name: "failedCheck",
                  from: "CheckingBalance",
                  to: "none"
              }, {
                  name: "getBought",
                  from: "ReadyToBuy",
                  to: "Buying"
              }, {
                  name: "succeededToBuy",
                  from: "Buying",
                  to: "Bought"
              }, {
                  name: "cancel",
                  from: "ReadyToBuy",
                  to: "none"
              }, {
                  name: "failedToBuy",
                  from: "Buying",
                  to: "none"
              }, {
                  name: "buyAsFree",
                  from: "ReadyToBuy",
                  to: "Buying"
              }]
          }),
          l.applyWithIn = function(e, i) {
              t(i).find(e).each(function(e, i) {
                  new l(t(i))
              })
          }
          ,
          l
      }
      .apply(e, n)) || (t.exports = o)
  },
  156: function(t, e, i) {
      function n(t, e, i) {
          return e in t ? Object.defineProperty(t, e, {
              value: i,
              enumerable: !0,
              configurable: !0,
              writable: !0
          }) : t[e] = i,
          t
      }
      var o, s = i(4), r = 12e4, a = {
          TURNING: "turning",
          OPEN: "open",
          CLOSE: "close"
      };
      function h(t) {
          var e = t.worksId
            , i = t.pageMaxStayTime
            , n = void 0 === i ? r : i;
          o && o.destroy(),
          this.pageMaxStayTime = n;
          var s = Date.now();
          this.sessionRawData = {
              worksId: e,
              beginTime: s,
              turningPageCount: 0,
              lastAction: {
                  type: a.OPEN,
                  time: s
              }
          },
          this.uploadFinishedSessions(),
          this.handleClose = this.handleClose.bind(this),
          window.addEventListener("beforeunload", this.handleClose),
          o = this
      }
      h.ActionTypes = a;
      var l = h.prototype;
      l.recordAction = function(t) {
          var e = Date.now();
          e - this.sessionRawData.lastAction.time > this.pageMaxStayTime ? (t !== a.CLOSE ? this.uploadSessions([this.getSessionData(this.sessionRawData)]) : this.saveData(),
          this.sessionRawData.turningPageCount = 0,
          this.sessionRawData.beginTime = e) : t === a.TURNING && (this.sessionRawData.turningPageCount += 1),
          this.sessionRawData.lastAction = {
              type: t,
              time: e
          }
      }
      ,
      l.handleClose = function() {
          this.recordAction(a.CLOSE),
          this.saveData()
      }
      ,
      l.getSessionData = function(t) {
          var e = {
              worksId: t.worksId,
              beginTime: t.beginTime,
              endTime: t.lastAction.time
          };
          return t.lastAction.type !== a.CLOSE && (t.turningPageCount >= 4 ? e.endTime += (e.endTime - e.beginTime) / t.turningPageCount : e.endTime += this.pageMaxStayTime),
          e
      }
      ,
      l.uploadFinishedSessions = function() {
          var t = this
            , e = this.loadData();
          e && this.uploadSessions(e.map(function(e) {
              return t.getSessionData(e)
          }).filter(function(t) {
              return t.endTime - t.beginTime > 5e3
          }))
      }
      ,
      l.uploadSessions = function(t) {
          var e = this;
          t = t.map(function(t) {
              return function(t) {
                  for (var e = 1; e < arguments.length; e++) {
                      var i = null != arguments[e] ? arguments[e] : {}
                        , o = Object.keys(i);
                      "function" == typeof Object.getOwnPropertySymbols && (o = o.concat(Object.getOwnPropertySymbols(i).filter(function(t) {
                          return Object.getOwnPropertyDescriptor(i, t).enumerable
                      }))),
                      o.forEach(function(e) {
                          n(t, e, i[e])
                      })
                  }
                  return t
              }({}, t, {
                  beginTime: e.timestampToISO(t.beginTime),
                  endTime: e.timestampToISO(t.endTime)
              })
          }),
          s({
              type: "post",
              url: "/j/reading_time",
              contentType: "application/json",
              dataType: "json",
              processData: !1,
              data: JSON.stringify(t)
          }).then(function() {
              e.cleanSavedData()
          })
      }
      ,
      l.loadData = function() {
          var t = null;
          try {
              var e = localStorage.getItem("prevReadingSessions");
              if (!e)
                  return null;
              t = JSON.parse(e)
          } catch (t) {
              if ("SyntaxError" === t.name)
                  return;
              throw t
          }
          return t
      }
      ,
      l.saveData = function() {
          var t = this.loadData() || [];
          localStorage.setItem("prevReadingSessions", JSON.stringify(t.concat(this.sessionRawData)))
      }
      ,
      l.cleanSavedData = function() {
          localStorage.removeItem("prevReadingSessions")
      }
      ,
      l.timestampToISO = function(t) {
          return new Date(t).toISOString()
      }
      ,
      l.destroy = function() {
          window.removeEventListener("beforeunload", this.handleClose)
      }
      ,
      t.exports = h
  },
  158: function(t, e, i) {
      var n, o;
      n = [i(0)],
      void 0 === (o = function(t) {
          return function() {
              var e = new t.Deferred
                , i = e.promise();
              return arguments.length ? e.resolve.apply(i, arguments) : e.resolve(),
              i
          }
      }
      .apply(e, n)) || (t.exports = o)
  },
  163: function(t, e, i) {
      var n;
      void 0 === (n = function() {
          var t = document
            , e = function(e) {
              if (t.selection) {
                  e.focus();
                  var i = t.selection.createRange()
                    , n = i.duplicate();
                  return n.moveToElementText(e),
                  n.setEndPoint("EndToEnd", i),
                  e.selectionStart = n.text.length - i.text.length,
                  e.selectionStart
              }
              return e.selectionStart
          }
            , i = function(e, i) {
              !function(e, i, n) {
                  if (t.selection) {
                      var o = e.createTextRange();
                      o.moveEnd("character", -e.value.length),
                      o.moveEnd("character", n),
                      o.moveStart("character", i),
                      o.select()
                  } else
                      e.setSelectionRange(i, n),
                      e.focus()
              }(e, i, i)
          };
          return {
              get: e,
              set: i,
              insert: function(e, n) {
                  if (e.value,
                  t.selection)
                      e.focus(),
                      t.selection.createRange().text = n;
                  else {
                      var o = e.selectionStart
                        , s = e.value.length;
                      e.value = e.value.slice(0, o) + n + e.value.slice(o, s),
                      i(e, o + n.length)
                  }
              },
              remove: function(t, n) {
                  var o = e(t)
                    , s = t.value;
                  t.value = n > 0 ? s.slice(0, o - n) + s.slice(o) : s.slice(0, o) + s.slice(o - n),
                  i(t, o - (n < 0 ? 0 : n))
              },
              collapseToEnd: function(e) {
                  if (t.selection) {
                      var i = e.createTextRange();
                      i.moveToElementText(e),
                      i.collapse("false"),
                      i.select()
                  } else {
                      var n = e.value.length;
                      e.setSelectionRange(n, n),
                      e.focus()
                  }
              }
          }
      }
      .apply(e, [])) || (t.exports = n)
  },
  164: function(t, e, i) {
      var n, o;
      n = [i(0), i(2), i(1), i(23), i(4), i(273), i(41)],
      void 0 === (o = function(t, e, i, n, o, s, r) {
          var a = e.View.extend({
              tmpl: t("#tmpl-note-form").html(),
              tagName: "form",
              className: "note-form",
              initialize: function(e) {
                  this.model = e.model,
                  this.content = e.content || "",
                  this.dfd = t.Deferred(),
                  this.promise = this.dfd.promise(),
                  this.isCreating = "create" === e.type,
                  this.formAttrGroup = this.isCreating ? "config" : "edit"
              },
              events: {
                  submit: "submitForm",
                  "click .ln-cancel": "cancelForm"
              },
              render: function() {
                  var t = new s
                    , e = this.isCreating ? t.get("visible_private") : this.model.get("visible_private");
                  return this.initializeSharing(t, {
                      disableWithoutSharing: !1
                  }),
                  this.$el.html(i.template(this.tmpl, {
                      content: this.content,
                      sharingActionsHtml: this.renderSharingHtml({
                          sharingLabel: "分享",
                          hasVisibleSetting: !0,
                          allowShare: this.isCreating,
                          visible_private: e
                      })
                  })),
                  this.bindSharingActions(),
                  n.ctrlEnterForm(this.$el),
                  this
              },
              cancelForm: function(t) {
                  t.preventDefault(),
                  this.dfd.reject(),
                  this.trigger("form:cancelled")
              },
              readonlyForm: function() {
                  n.readonlyForm(this.$el)
              },
              resumeForm: function() {
                  n.resumeForm(this.$el)
              },
              submitForm: function(t) {
                  var e = this;
                  t.preventDefault();
                  var i = this.formModel
                    , n = this.getText();
                  n ? (i.saveConfigToStroage(this.formAttrGroup),
                  i.set("text", n),
                  i.set("visible_private", this.visibleChecker.is(":checked") ? "on" : ""),
                  o.censor(i.toJSON()).then(function() {
                      e.dfd.resolve(i),
                      e.trigger("form:submitted", i)
                  }, function(t) {
                      t instanceof o.HasBannedWordsError && alert(t.message)
                  })) : alert("请填写批注内容")
              }
          });
          return i.extend(a.prototype, r),
          a
      }
      .apply(e, n)) || (t.exports = o)
  },
  171: function(t, e, i) {
      var n, o;
      n = [i(2), i(1), i(0)],
      void 0 === (o = function(t, e, i) {
          return t.Model.extend({
              url: "/j/bookmark/",
              defaults: {
                  abstract: "",
                  paragraph_id: "",
                  paragraph_offset: 0,
                  works_id: "",
                  part_paragraph_sequence: 0,
                  part_sequence: 0,
                  percent: "0.00"
              },
              _mixInData: function(t, i) {
                  return (t = t ? e.clone(t) : {}).data = e.extend({}, t.data, i),
                  t
              },
              destroy: function(e) {
                  return e = this._mixInData(e, {
                      bookmark_id: this.id
                  }),
                  t.Model.prototype.destroy.call(this, e)
              },
              sync: function(e, i, n) {
                  if (/create|delete/.test(e))
                      return n.url = this.url + e,
                      t.sync(e, i, n)
              },
              parse: function(t) {
                  return t
              },
              getStamp: function() {
                  return {
                      pid: this.get("paragraph_id"),
                      offset: this.get("paragraph_offset"),
                      sequence: this.get("part_sequence")
                  }
              },
              getPercent: function() {
                  if (!this.collection)
                      return "< 1";
                  var t = this.getSequence() / this.collection.contentModel.parasIndexs.length;
                  return t *= 100,
                  (t = Math.round(t)) || "< 1"
              },
              getSequence: function() {
                  return this.collection ? e.indexOf(this.collection.contentModel.parasIndexs, this.get("paragraph_id")) : 0
              }
          })
      }
      .apply(e, n)) || (t.exports = o)
  },
  172: function(t, e, i) {
      var n, o;
      n = [i(1), i(171)],
      void 0 === (o = function(t, e) {
          return {
              addBookmark: function() {
                  var i;
                  this.model = new e({
                      works_id: this.worksId
                  });
                  try {
                      i = this.newBookmarkAttrs()
                  } catch (t) {
                      if ("NoParagraph" === t.message)
                          return;
                      throw t
                  }
                  this.model.save(i).done(t.bind(function() {
                      this.collection.add(this.model)
                  }, this)),
                  this.active()
              },
              removeBookmark: function() {
                  this.model.destroy(),
                  delete this.model,
                  this.deactive()
              },
              toggleBookmark: function() {
                  return !this.model || this.model.isNew() ? this.addBookmark() : this.removeBookmark(),
                  this
              },
              active: function() {
                  return this.bookmark.addClass("active").show(),
                  this
              },
              deactive: function() {
                  return this.bookmark.removeClass("active"),
                  this
              }
          }
      }
      .apply(e, n)) || (t.exports = o)
  },
  175: function(t, e, i) {
      var n = i(1)
        , o = i(2)
        , s = i(50)
        , r = i(4)
        , a = i(11)
        , h = o.Model.extend({
          defaults: {
              id: "",
              title: "",
              price: 0,
              progress: 0,
              totalPages: 0,
              purchaseTime: 0,
              hasAdded: 0,
              defaultSharingText: "",
              isGift: !1,
              isSample: !1,
              hasFormula: !1,
              abstract: "",
              dataFromLocal: !1,
              cover_url: "",
              onsaleTime: ""
          },
          url: function() {
              return "/j/article_v2/" + this.id + "/"
          },
          initialize: function() {
              a(this, "article"),
              this.createRating()
          },
          isLoaded: function() {
              return !!this.get("title")
          },
          createRating: function() {
              var t = new s({
                  articleId: this.id
              });
              return this.get("isSample") ? (t.set("failed", !0),
              t.set("synced", !0)) : t.fetch().fail(function() {
                  t.set("failed", !0)
              }).always(function() {
                  t.set("synced", !0)
              }),
              this._rating = t,
              t
          },
          getRating: function() {
              return this._rating
          },
          archive: function() {
              var t = this.url() + "archive"
                , e = this;
              return r.request("POST", t).done(function() {
                  e.set({
                      isArchived: !0
                  })
              })
          },
          getBookUrl: function(t) {
              var e = (t = t || {}).ignoreSearch ? "" : location.search;
              return ["ebook", this.id, e || ""].join("/")
          },
          urlInMobileStore: function() {
              return "/ebook/" + this.get("id")
          },
          isFree: function() {
              return 0 == +this.get("price")
          },
          updatePrice: function() {
              this.id && r("/j/article_v2/" + this.id + "/price").done(n.bind(function(t) {
                  this.set("price", +t.price)
              }, this))
          },
          checkPricePeriodically: function() {
              this._checkPriceTimerId = setInterval(n.bind(function() {
                  this.updatePrice()
              }, this), 6e5)
          },
          unbindAll: function() {
              this._checkPriceTimerId && clearInterval(this._checkPriceTimerId)
          }
      });
      window.Article = h,
      t.exports = h
  },
  176: function(t, e, i) {
      function n(t) {
          return function(t) {
              if (Array.isArray(t)) {
                  for (var e = 0, i = new Array(t.length); e < t.length; e++)
                      i[e] = t[e];
                  return i
              }
          }(t) || function(t) {
              if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t))
                  return Array.from(t)
          }(t) || function() {
              throw new TypeError("Invalid attempt to spread non-iterable instance")
          }()
      }
      var o = i(45);
      t.exports = function(t, e) {
          return function(t, e, i) {
              var o = {}
                , s = String.fromCharCode("}".charCodeAt(0) + 1)
                , r = e.length;
              e = function(t, e, i) {
                  return e ? (t = t.slice(),
                  e.split("").forEach(function(e) {
                      var o = e.charCodeAt(0) % i;
                      t = [].concat(n(t.slice(o)), n(t.slice(0, o)))
                  }),
                  t) : t
              }(e, i, r);
              for (var a = 0; a < r; ++a)
                  o[e[a]] = a;
              for (var h, l, c, u, d = [], f = 0, p = 0; f < t.length; )
                  h = o[t[f++]],
                  l = o[t[f++]],
                  c = o[t[f++]],
                  u = o[t[f++]],
                  d[p++] = h << 2 | l >> 4,
                  d[p++] = (15 & l) << 4 | c >> 2,
                  d[p++] = (3 & c) << 6 | u;
              var g = t.slice(-2);
              return g[0] === s ? d.length = d.length - 2 : g[1] === s && (d.length = d.length - 1),
              function(t) {
                  for (var e = "", i = 0; i < t.length; ++i) {
                      var n = t[i];
                      e += String.fromCharCode(256 * n + t[++i])
                  }
                  return e
              }(d)
          }(t, o, e)
      }
  },
  177: function(t, e, i) {
      var n, o;
      n = [i(2), i(1), i(0), i(3), i(6), i(155), i(43), i(178)],
      void 0 === (o = function(t, e, i, n, o, s, r, a) {
          return t.View.extend({
              template: i("#tmpl-extra-controls").html(),
              events: {
                  "click .btn-purchase": "buy"
              },
              initialize: function() {
                  var t = o.getModel("article");
                  this.listenTo(t, "change:price", e.bind(this.render, this))
              },
              render: function() {
                  var t = o.getModel("article")
                    , i = t.get("id");
                  return this.$el.html(e.template(this.template, {
                      id: this.articleId,
                      price: t.get("price"),
                      hasAdded: t.get("hasAdded"),
                      isSample: t.get("isSample")
                  })),
                  a.apply({
                      aid: i,
                      title: t.get("title"),
                      wrapper: this.$el,
                      placeholderSel: ".btn-adding-wrapper",
                      success: function() {
                          o.getModel("article").set("hasAdded", 1),
                          o.vent.trigger("article:hasAdded")
                      }
                  }).render(),
                  this.appendPurchaseButton(t),
                  this
              },
              appendPurchaseButton: function(t) {
                  var e = r(t, {
                      isLightBtn: !0
                  });
                  e.$(".btn").addBack(".btn").addClass("btn-purchase").removeClass("btn btn-large login"),
                  this.$el.find(".btn-purchase-wrapper").html(e.el),
                  this.purchaseWidget = new s(e.$el)
              },
              buy: function(t) {
                  t.preventDefault(),
                  n.me.isAnonymous || this.purchaseWidget.doPurchase()
              }
          })
      }
      .apply(e, n)) || (t.exports = o)
  },
  178: function(t, e, i) {
      var n, o;
      n = [i(1), i(0), i(3), i(6), i(4), i(9), i(8), i(31)],
      void 0 === (o = function(t, e, i, n, o, s, r, a) {
          var h = e("#tmpl-added-status").html()
            , l = e("#tmpl-add-to-bookshelf").html()
            , c = e("#tmpl-add-to-bookshelf-cancelable").html()
            , u = ".lnk-collect"
            , d = e("#tmpl-add-to-bookshelf-confirm").html();
          function f(e) {
              t.bindAll(this, "addToBookshelf", "handleAddToBookshelf"),
              this.aid = e.aid,
              this.title = e.title,
              this.wrapper = e.wrapper,
              this.placeholderSel = e.placeholderSel,
              this.isAnonymous = i.me.isAnonymous,
              this.success = e.success,
              this.buttonTmpl = e.cancelable ? c : l,
              this.wrapper.on("click", u, this.handleAddToBookshelf)
          }
          return t.extend(f.prototype, {
              render: function() {
                  this.wrapper.find(this.placeholderSel).html(t.template(this.buttonTmpl, {
                      isAnonymous: i.me.isAnonymous,
                      loginUrl: i.DOUBAN_LOGIN_URL + "?redir=" + location.href,
                      fitForMobile: s.fitForMobile(),
                      isWeixin: s.isWeixin()
                  }))
              },
              handleAddToBookshelf: function(e) {
                  if (!this.isAnonymous) {
                      var n = this;
                      r({
                          title: "领取" + this.getKindName(),
                          content: t.template(d, {
                              title: this.title,
                              username: i.me.name
                          }),
                          type: "confirm"
                      }).addClass("purchase-dialog").open().on("confirm", function() {
                          var t = this.text.find("[name=secretly]").is(":checked");
                          n.addToBookshelf(n.aid, t),
                          this.close()
                      })
                  }
              },
              addToBookshelf: function(i, n) {
                  if (!this.isAnonymous) {
                      var s = this.wrapper.find(u)
                        , r = t.now()
                        , l = this;
                      a.toast("领取中..."),
                      o.post("/j/receive/", {
                          works_id: i,
                          is_secretly: 0 | n
                      }).done(function(i) {
                          var n = i.err;
                          n ? a.toast(n) : t.delay(function() {
                              var t = s.closest(".btn-adding-wrapper")
                                , i = e(h).hide();
                              a.toast("领取成功"),
                              t.replaceWith(i),
                              i.fadeIn(300),
                              l.success && l.success()
                          }, 600 - (t.now() - r))
                      }).fail(function() {
                          a.toast("出现了奇怪的错误，请稍后再试")
                      })
                  }
              },
              getKindName: function() {
                  return i.works.isChapter ? n.getModel("column").get("kind") : "图书"
              }
          }),
          f.apply = function(t) {
              return new f(t)
          }
          ,
          f
      }
      .apply(e, n)) || (t.exports = o)
  },
  179: function(t, e, i) {
      var n, o;
      n = [i(2), i(1), i(0), i(6)],
      void 0 === (o = function(t, e, i, n) {
          return t.View.extend({
              initialize: function(t) {
                  this.win = i(window),
                  this.body = i("body"),
                  this.fixedLayout = t.fixedLayout
              },
              render: function() {
                  return this.$el.remove(),
                  this.$el = i("<progress>", {
                      role: "progressbar",
                      "aria-valuemin": 0,
                      "aria-valuemax": 100,
                      id: "reading-progress",
                      max: 100
                  }),
                  this.body.append(this.$el),
                  this.win.resize(e.debounce(e.bind(this._update, this), 80)),
                  this.update(),
                  this
              },
              update: function() {
                  var t = this.model.get("progress")
                    , e = this.fixedLayout || n.getModel("config").get("layout")
                    , i = this.convertToPosition(e);
                  return this.setPosition(i),
                  this.setValue(t),
                  this
              },
              setValue: function(t) {
                  t = parseFloat(t) || 0,
                  this._valuenow = t;
                  var e = this.win.height()
                    , i = !!/(top|bottom)/.test(this._position)
                    , n = 100 - t;
                  return this.$el.val(t).attr("aria-valuenow", t),
                  this._attrsAsProps() ? (this.$el.css({
                      width: i ? t + "%" : t / 100 * e + "px",
                      "padding-right": i ? n + "%" : n / 100 * e + "px"
                  }),
                  this) : this
              },
              _attrsAsProps: function() {
                  return !!/msie (8|9)/i.test(navigator.userAgent)
              },
              _update: function() {
                  this.update(this._position, this._valuenow)
              },
              setPosition: function(t) {
                  var e = this.win.height()
                    , i = e / 2 - 3
                    , n = "pos-" + t;
                  switch (this._position = t,
                  t) {
                  case "top":
                  case "right":
                      this.$el.css({
                          width: e,
                          top: i
                      });
                      break;
                  case "bottom":
                  case "left":
                      this.$el.removeAttr("style");
                      break;
                  default:
                      throw new Error("Invalid param! You can only use one of the positions:top | right | bottom | left.")
                  }
                  return this.$el.attr("class", n),
                  this
              },
              positionMap: {
                  vertical: "right",
                  horizontal: "bottom"
              },
              convertToPosition: function(t) {
                  return this.positionMap[t]
              },
              show: function() {
                  return this.$el.show(),
                  this
              },
              hide: function() {
                  return this.$el.hide(),
                  this
              }
          })
      }
      .apply(e, n)) || (t.exports = o)
  },
  180: function(t, e, i) {
      var n, o;
      n = [i(0), i(2), i(1), i(6), i(9), i(20)],
      void 0 === (o = function(t, e, i, n, o, s) {
          return e.View.extend({
              className: "page-portal",
              template: t("#tmpl-page-portal").html(),
              initialize: function() {
                  this.win = t(window),
                  this.body = t("body"),
                  this.setElement(t(this.template)),
                  this.jumpSection = this.$(".page-jump"),
                  this.form = this.$(".page-form"),
                  this.formInput = this.$(".page-input"),
                  this.currPage = this.$(".curr-num"),
                  this.formInput.focus(this.focusPageInput),
                  this.on("view:openPageForm", this.openPageForm),
                  this.win.resize(i.debounce(i.bind(this.toggle, this), 60)),
                  this.listenTo(this.model, "change:currPage", this.updatePageNumber)
              },
              events: {
                  "click .page-info": "openPageFormOnClick",
                  "submit .page-form": "submitPageForm",
                  "click .page-jump": "stopPropagation"
              },
              render: function() {
                  return this
              },
              update: function() {
                  this.setTotalPageNum(),
                  this.updatePageNumber(),
                  this.toggle()
              },
              toggle: function() {
                  o.fitForMobile() || this.$el.toggle(this.win.width() >= 1024)
              },
              setTotalPageNum: function() {
                  var t = this.model.getReadTotalPage();
                  this.$el.find(".total-num").text(t)
              },
              stopPropagation: function(e) {
                  t(e.target).is("[type=submit]") || e.stopPropagation()
              },
              openPageFormOnClick: function(t) {
                  t.preventDefault(),
                  this.$el.hasClass("on") || (t.stopPropagation(),
                  this.openPageForm())
              },
              openPageForm: function() {
                  this.$el.addClass("on"),
                  this.jumpSection.show(),
                  this.customPage(),
                  this.formInput.focus(),
                  this.body.on("click.pageNumber", t.proxy(this.closePageFormOnClick, this))
              },
              closePageFormOnClick: function(e) {
                  t(e.target).is("[type=submit]") || (e.preventDefault(),
                  this.closePageForm())
              },
              closePageForm: function() {
                  this.$el.removeClass("on"),
                  this.jumpSection.hide(),
                  this.formInput.blur(),
                  this.body.off(".pageNumber")
              },
              customPage: function() {
                  var t = this.model;
                  this.formInput.val(t.getReadCurrPage())
              },
              focusPageInput: function(e) {
                  var n = t(this);
                  i.defer(function() {
                      n.select()
                  })
              },
              updatePageNumber: function() {
                  var t = this.model.getReadCurrPage()
                    , e = this.model.get("progress");
                  e && (e = Math.floor(e),
                  this.$el.find(".progress-num").text(e + "%")),
                  this.currPage.text(t),
                  this.jumpSection.is(":hidden") || this.customPage()
              },
              submitPageForm: function(t) {
                  t.preventDefault();
                  var e = this.model
                    , i = +this.formInput.val();
                  this.closePageForm(),
                  e.getReadCurrPage() !== i && (e.setReadCurrPage(i, {
                      isFormJump: !0,
                      hasInputPage: !0
                  }),
                  s._trackEvent("gotoPage"))
              },
              hide: function() {
                  return this.$el.hide(),
                  this
              }
          })
      }
      .apply(e, n)) || (t.exports = o)
  },
  181: function(t, e, i) {
      (function(n) {
          var o, s;
          o = [i(0)],
          void 0 === (s = function(t) {
              var e = {
                  according: !0,
                  allowDisabled: !1,
                  activeClass: "active",
                  show: function(t) {
                      return t.show()
                  },
                  hide: function(t) {
                      return t.hide()
                  },
                  useCustomShowAndHide: !1,
                  toggle: function(t) {
                      var e = this.options;
                      return t[e.toggleType](e.toggleDuration)
                  },
                  toggleType: "toggle",
                  toggleDuration: null
              }
                , i = function(e) {
                  if (e instanceof n)
                      return e.map(function() {
                          return t(this)
                      })
              }
                , o = function(i, n, o) {
                  this.options = t.extend({}, e, o),
                  this.activeClass = this.options.activeClass,
                  this.allowDisabled = this.options.allowDisabled,
                  this.handlers = i,
                  this.contents = n,
                  this.transitioning = {},
                  this.listen()
              };
              return o.fromAutoSplit = function(t, e, n) {
                  return new o(i(t),i(e),n)
              }
              ,
              t.extend(o.prototype, {
                  listen: function() {
                      var e = this;
                      t.each(this.handlers, function(i, n) {
                          var o = t(n);
                          o.on("click", function() {
                              if (!e.allowDisabled || !o.hasClass("disabled")) {
                                  var t = o.hasClass(e.activeClass);
                                  if (!e.transitioning[i])
                                      return t ? e.close(i) : void e.open(i)
                              }
                          }),
                          e.contents[i].on("close.self", t.proxy(e.hideAll, e))
                      })
                  },
                  findActived: function(e) {
                      var i = this;
                      t.each(this.handlers, function(t, n) {
                          var o = i.transitioning[t]
                            , s = n.hasClass(i.activeClass);
                          o && s || (s || o) && e.call(i, t)
                      })
                  },
                  close: function(t) {
                      this.action(t, !1)
                  },
                  open: function(t) {
                      this.options.according && this.hideAll(),
                      this.action(t, !0)
                  },
                  getActionFn: function(t) {
                      return this.options.useCustomShowAndHide ? this.options[t ? "show" : "hide"] : this.options.toggle
                  },
                  action: function(t, e) {
                      var i = this.contents[t]
                        , n = this.handlers[t]
                        , o = this.transitioning[t]
                        , s = e ? "expand" : "collapse"
                        , r = this.getActionFn(e)
                        , a = this;
                      o && i.stop(),
                      this.transitioning[t] = !0,
                      r.call(this, i).promise().done(function() {
                          n[e ? "addClass" : "removeClass"](a.activeClass),
                          i.trigger("action:" + s, i).trigger("action:toggle", [i, s]),
                          a.transitioning[t] = !1
                      })
                  },
                  hideAll: function() {
                      this.findActived(this.close)
                  },
                  disableHandlers: function() {
                      t.each(this.handlers, function(t, e) {
                          e.addClass("disabled")
                      })
                  }
              }),
              o
          }
          .apply(e, o)) || (t.exports = s)
      }
      ).call(this, i(0))
  },
  182: function(t, e, i) {
      var n, o;
      n = [i(2), i(1), i(319)],
      void 0 === (o = function(t, e, i) {
          return t.Collection.extend({
              url: function() {
                  return "/j/article_v2/" + this.articleId + "/my_annotations"
              },
              model: i,
              initialize: function(t, e) {
                  this.articleId = e.articleId
              }
          })
      }
      .apply(e, n)) || (t.exports = o)
  },
  183: function(t, e, i) {
      var n, o;
      n = [i(0), i(1), i(2)],
      void 0 === (o = function(t, e, i) {
          var n = {
              limit: 10,
              items: []
          };
          function o(t) {
              t = e.defaults(t || {}, n),
              this.limit = t.limit,
              this.setItems(t.items)
          }
          e.extend(o.prototype, {
              setItems: function(t) {
                  this.items = t,
                  this.pages = [],
                  this.curPageIndex = 0,
                  this.paging()
              },
              paging: function() {
                  var t, e, i, n = Math.ceil(this.items.length / this.limit);
                  for (t = 0; t < n; t++)
                      e = t * this.limit,
                      i = (t + 1) * this.limit,
                      this.pages.push(this.items.slice(e, i))
              },
              getPage: function(t) {
                  return e.isUndefined(t) && (t = this.curPageIndex),
                  this.pages[t]
              },
              turnPage: function(t) {
                  return this.hasPage(t) ? (this.curPageIndex = t,
                  this.getPage(t)) : this.getPage()
              },
              hasPage: function(t) {
                  return t >= 0 && t < this.getPageCount()
              },
              getPageCount: function() {
                  return this.pages.length
              }
          });
          var s = {
              limit: 10,
              items: [],
              aroundLimit: 5,
              edgeLimit: 2,
              container: t(),
              navContainer: t(),
              prevSelector: ".prev",
              nextSelecotr: ".next",
              pageNumSelector: ".page-num",
              prevTmpl: '<a class="prev" href="#">&lt; 前页</a>',
              nextTmpl: '<a class="next" href="#">后页 &gt;</a>',
              pageNumTmpl: '<a class="page-num" href="#"></a>'
          };
          function r() {
              var i, n, o, r, a, h, l, c = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, u = c.currPageIndex, d = c.pageCount, f = c.pageNumTmpl, p = void 0 === f ? s.pageNumTmpl : f, g = c.prevTmpl, m = void 0 === g ? s.prevTmpl : g, v = c.nextTmpl, b = void 0 === v ? s.nextTmpl : v, y = c.aroundLimit, w = void 0 === y ? s.aroundLimit : y, x = c.edgeLimit, P = void 0 === x ? s.edgeLimit : x, S = t("<span>").addClass("page-nums"), C = e.range(0, d, 1), T = (i = C,
              n = w,
              o = u - Math.floor(n / 2),
              o = (o += (h = o < 0 ? -o : 0) - (l = (r = o + n) > (a = i.length) ? r - a : 0)) < 0 ? 0 : o,
              r = (r += h - l) > a ? a : r,
              i.slice(o, r));
              return T = e.first(C, P).concat(T).concat(e.last(C, P)),
              T = e.uniq(T),
              e.each(T, function(e, i, n) {
                  var o = n[i - 1];
                  o && e !== o + 1 && S.append(t("<a>").addClass("ellipsis").text("…"));
                  var s = t(p).data("index", e).text(e + 1);
                  e === u && s.addClass("active disabled"),
                  S.append(s)
              }, this),
              [t(m).toggleClass("disabled", 0 === u), S, t(b).toggleClass("disabled", u >= d - 1)]
          }
          function a(t) {
              t = e.defaults(t || {}, s),
              e.extend(this, t),
              this.paging = new o(e.pick(t, e.keys(n))),
              this.setItems(t.items),
              this.bindEvents()
          }
          return e.extend(a.prototype, {
              setItems: function(t) {
                  return this.items = t,
                  this.pages = [],
                  this.paging.setItems(t),
                  this
              },
              getCurPageIndex: function() {
                  return this.paging.curPageIndex
              },
              bindEvents: function() {
                  e.bindAll(this, "clickTurnPage", "clickPageNum"),
                  this.navContainer.on("click", this.prevSelector, this.clickTurnPage).on("click", this.nextSelecotr, this.clickTurnPage).on("click", this.pageNumSelector, this.clickPageNum)
              },
              render: function() {
                  this.turnPage(this.getCurPageIndex())
              },
              renderNav: function() {
                  if (this.navContainer.empty(),
                  1 !== this.paging.getPageCount()) {
                      var t = this.getCurPageIndex()
                        , e = this.paging.getPageCount();
                      this.navContainer.append(r({
                          currPageIndex: t,
                          pageCount: e
                      }))
                  }
              },
              toggleItems: function(i, n) {
                  e.each(i, function(e) {
                      t(e).toggle(n)
                  })
              },
              clickTurnPage: function(e) {
                  e.preventDefault();
                  var i, n = t(e.target);
                  n.hasClass("disabled") || (i = n.hasClass("prev") ? -1 : 1,
                  this.turnPage(this.getCurPageIndex() + i))
              },
              clickPageNum: function(e) {
                  e.preventDefault();
                  var i = t(e.target);
                  i.hasClass("disabled") || this.turnPage(i.data("index"))
              },
              turnPage: function(t) {
                  this.trigger("turnPage", this.paging.turnPage(t)),
                  this.renderNav()
              },
              remove: function() {
                  this.pages = [],
                  this.container.empty(),
                  this.navContainer.empty()
              }
          }),
          e.extend(a.prototype, i.Events),
          a.PagingCore = o,
          a.renderPaginator = r,
          a
      }
      .apply(e, n)) || (t.exports = o)
  },
  184: function(t, e, i) {
      (function(n) {
          var o, s;
          o = [i(1), i(9)],
          void 0 === (s = function(t, e) {
              return {
                  resizePanel: function() {
                      this.resetHeight(this.panelsContainer)
                  },
                  resetPanelAsResize: function() {
                      this.win.resize(t.debounce(this.resizePanel, 80))
                  },
                  resetHeight: function(t) {
                      if (!e.fitForMobile()) {
                          var i = n(".lite-header").outerHeight() || 0;
                          t.height((this.win.height() - i) / 16 + "em")
                      }
                  },
                  dealingWithScrollbar: function(t) {
                      var e = "expand" === t;
                      this.body.css("overflow", e ? "hidden" : "")
                  }
              }
          }
          .apply(e, o)) || (t.exports = s)
      }
      ).call(this, i(0))
  },
  185: function(t, e, i) {
      var n, o;
      n = [i(2), i(1), i(0), i(6), i(9)],
      void 0 === (o = function(t, e, i, n, o) {
          return {
              closeShortcutTips: function() {
                  this.toggleShortcutTips(!1)
              },
              openShortcutTips: function() {
                  this.toggleShortcutTips(!0)
              },
              toggleShortcutTips: function(t) {
                  o.hasTouch() || (e.isUndefined(t) && (t = !this.shortcutTips.is(":visible")),
                  this.shortcutTips.toggle(t),
                  n.getModel("config").get("isGallery") || n.readView.$el[t ? "addClass" : "removeClass"]("overlay-article"))
              }
          }
      }
      .apply(e, n)) || (t.exports = o)
  },
  186: function(t, e, i) {
      var n, o;
      n = [i(0), i(2), i(1), i(3), i(327)],
      void 0 === (o = function(t, e, i, n, o) {
          return e.View.extend({
              tmpl: t("#tmpl-desktop-app-ad").html(),
              id: "desktop-app-ad",
              initialize: function() {
                  this.freqLimit = new o.OncePerDayAndBrowser("shownDesktopAppAd")
              },
              events: {
                  "click .close": "close"
              },
              render: function() {
                  return this.$el.html(this.tmpl),
                  this
              },
              appendTo: function(e) {
                  return n.me.isAnonymous && this.freqLimit.isFree() ? ((e = e || t("body")).find("#" + this.id).remove(),
                  e.append(this.render().el),
                  this) : this
              },
              close: function(t) {
                  t.preventDefault(),
                  this.freqLimit.checkIn(),
                  this.remove()
              }
          })
      }
      .apply(e, n)) || (t.exports = o)
  },
  233: function(t, e, i) {
      var n, o, s;
      /*!
* jQuery Mousewheel 3.1.13
*
* Copyright jQuery Foundation and other contributors
* Released under the MIT license
* http://jquery.org/license
*/
      o = [i(0)],
      void 0 === (s = "function" == typeof (n = function(t) {
          var e, i, n = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"], o = "onwheel"in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"], s = Array.prototype.slice;
          if (t.event.fixHooks)
              for (var r = n.length; r; )
                  t.event.fixHooks[n[--r]] = t.event.mouseHooks;
          var a = t.event.special.mousewheel = {
              version: "3.1.12",
              setup: function() {
                  if (this.addEventListener)
                      for (var e = o.length; e; )
                          this.addEventListener(o[--e], h, !1);
                  else
                      this.onmousewheel = h;
                  t.data(this, "mousewheel-line-height", a.getLineHeight(this)),
                  t.data(this, "mousewheel-page-height", a.getPageHeight(this))
              },
              teardown: function() {
                  if (this.removeEventListener)
                      for (var e = o.length; e; )
                          this.removeEventListener(o[--e], h, !1);
                  else
                      this.onmousewheel = null;
                  t.removeData(this, "mousewheel-line-height"),
                  t.removeData(this, "mousewheel-page-height")
              },
              getLineHeight: function(e) {
                  var i = t(e)
                    , n = i["offsetParent"in t.fn ? "offsetParent" : "parent"]();
                  return n.length || (n = t("body")),
                  parseInt(n.css("fontSize"), 10) || parseInt(i.css("fontSize"), 10) || 16
              },
              getPageHeight: function(e) {
                  return t(e).height()
              },
              settings: {
                  adjustOldDeltas: !0,
                  normalizeOffset: !0
              }
          };
          function h(n) {
              var o = n || window.event
                , r = s.call(arguments, 1)
                , h = 0
                , u = 0
                , d = 0
                , f = 0
                , p = 0
                , g = 0;
              if ((n = t.event.fix(o)).type = "mousewheel",
              "detail"in o && (d = -1 * o.detail),
              "wheelDelta"in o && (d = o.wheelDelta),
              "wheelDeltaY"in o && (d = o.wheelDeltaY),
              "wheelDeltaX"in o && (u = -1 * o.wheelDeltaX),
              "axis"in o && o.axis === o.HORIZONTAL_AXIS && (u = -1 * d,
              d = 0),
              h = 0 === d ? u : d,
              "deltaY"in o && (h = d = -1 * o.deltaY),
              "deltaX"in o && (u = o.deltaX,
              0 === d && (h = -1 * u)),
              0 !== d || 0 !== u) {
                  if (1 === o.deltaMode) {
                      var m = t.data(this, "mousewheel-line-height");
                      h *= m,
                      d *= m,
                      u *= m
                  } else if (2 === o.deltaMode) {
                      var v = t.data(this, "mousewheel-page-height");
                      h *= v,
                      d *= v,
                      u *= v
                  }
                  if (f = Math.max(Math.abs(d), Math.abs(u)),
                  (!i || f < i) && (i = f,
                  c(o, f) && (i /= 40)),
                  c(o, f) && (h /= 40,
                  u /= 40,
                  d /= 40),
                  h = Math[h >= 1 ? "floor" : "ceil"](h / i),
                  u = Math[u >= 1 ? "floor" : "ceil"](u / i),
                  d = Math[d >= 1 ? "floor" : "ceil"](d / i),
                  a.settings.normalizeOffset && this.getBoundingClientRect) {
                      var b = this.getBoundingClientRect();
                      p = n.clientX - b.left,
                      g = n.clientY - b.top
                  }
                  return n.deltaX = u,
                  n.deltaY = d,
                  n.deltaFactor = i,
                  n.offsetX = p,
                  n.offsetY = g,
                  n.deltaMode = 0,
                  r.unshift(n, h, u, d),
                  e && clearTimeout(e),
                  e = setTimeout(l, 200),
                  (t.event.dispatch || t.event.handle).apply(this, r)
              }
          }
          function l() {
              i = null
          }
          function c(t, e) {
              return a.settings.adjustOldDeltas && "mousewheel" === t.type && e % 120 == 0
          }
          t.fn.extend({
              mousewheel: function(t) {
                  return t ? this.bind("mousewheel", t) : this.trigger("mousewheel")
              },
              unmousewheel: function(t) {
                  return this.unbind("mousewheel", t)
              }
          })
      }
      ) ? n.apply(e, o) : n) || (t.exports = s)
  },
  234: function(t, e, i) {
      var n, o;
      n = [i(0), i(1), i(2), i(6), i(235)],
      void 0 === (o = function(t, e, i, n, o) {
          var s = i.View.extend({
              tagName: "form",
              className: "annotations-filter",
              tmpl: t("#tmpl-annotations-filter-list").html(),
              events: {
                  change: "changeFilter"
              },
              initialize: function() {
                  this.listenTo(this.model, "change", this.update)
              },
              render: function(t) {
                  var i = this.model.toJSON();
                  return i.isAnonymous = t,
                  this.$el.html(e.template(this.tmpl, i)),
                  this.renderExtraClass(),
                  this.filterList = this.$(".filter-list"),
                  this
              },
              renderExtraClass: t.noop,
              update: function(t) {
                  var e = t.changedAttributes();
                  "showOthers"in e && this.filterList.toggleClass("show-others", e.showOthers),
                  this.renderExtraClass()
              },
              changeFilter: function(e) {
                  var i = t(e.currentTarget)
                    , n = o(i);
                  n.showOthers = !!n.showOthers,
                  this.model.set(n)
              }
          });
          return /msie 8/i.test(navigator.userAgent) && e.extend(s.prototype, {
              renderExtraClass: function() {
                  this.$(".checked").removeClass("checked"),
                  this.$(":checked").parent().find("i").addClass("checked")
              }
          }),
          s
      }
      .apply(e, n)) || (t.exports = o)
  },
  235: function(t, e, i) {
      var n, o;
      n = [i(0)],
      void 0 === (o = function(t) {
          return t = t || window.$,
          function(e) {
              var i = {}
                , n = ""
                , o = e.serializeArray();
              return t.each(o, function() {
                  n = this.name,
                  i[n] ? (t.isArray(i[n]) || (i[n] = [i[n]]),
                  i[n].push(this.value || "")) : i[n] = this.value || ""
              }),
              i
          }
      }
      .apply(e, n)) || (t.exports = o)
  },
  236: function(t, e, i) {
      var n, o;
      n = [i(0), i(1), i(2), i(6)],
      void 0 === (o = function(t, e, i, n) {
          return i.View.extend({
              tmpl: t("#tmpl-annotation-guide-dialog").html(),
              className: "annotation-guide-content",
              events: {
                  "click .btn-close": "closeDialog"
              },
              closeDialog: function(t) {
                  t.preventDefault(),
                  this.trigger("close:wrapper")
              },
              render: function() {
                  return this.$el.html(this.tmpl),
                  this
              }
          })
      }
      .apply(e, n)) || (t.exports = o)
  },
  237: function(t, e, i) {
      var n, o;
      n = [i(0), i(1), i(2), i(3), i(6), i(153)],
      void 0 === (o = function(t, e, i, n, o, s) {
          return i.View.extend({
              tmpl: t("#tmpl-annotation-guide-bubble").html(),
              events: {
                  "click .lnk-close": "closeBubble",
                  "click .btn-more-info": "openAnnotationDialog"
              },
              closeBubble: function(t) {
                  t.preventDefault(),
                  this.trigger("close:wrapper")
              },
              openAnnotationDialog: function(t) {
                  t.preventDefault(),
                  this.trigger("open:annotationGuideDialog")
              },
              render: function() {
                  return this.$el.html(this.tmpl),
                  s(n.ANNOTATION_GUIDE_PIC),
                  this
              }
          })
      }
      .apply(e, n)) || (t.exports = o)
  },
  238: function(t, e, i) {
      var n, o;
      n = [i(1), i(0), i(239), i(120)],
      void 0 === (o = function(t, e, i, n) {
          function o(i) {
              var n = this;
              t.bindAll(this, "render", "show", "hide", "reRender"),
              this.app = i.app,
              this.target = i.target,
              e.when(this.app.getModelPromise("content"), this.app.getModelPromise("turning")).done(function() {
                  return t.delay(n.render, 100)
              })
          }
          t.extend(o.prototype, {
              render: function() {
                  return this.renderSearchBox(),
                  this.renderBubble(),
                  this.hide(),
                  this.app.vent.once("model:content:set", this.reRender),
                  this
              },
              reRender: function() {
                  this.searchBox.remove(),
                  this.bubble.destroy(),
                  this.render()
              },
              renderBubble: function() {
                  this.bubble = new n({
                      html: '<div class="search-dialog"><b class="bubble-close">&times;</b><h3 class="dialog-title">搜索本文</h3><div class="bubble-content"></div></div>',
                      onClickOutside: !1
                  }),
                  this.bubble.set({
                      arrowOffset: 18,
                      content: this.searchBox.el,
                      target: this.target
                  }),
                  this.bubble.on("hidden destroyed", this.onHide, this)
              },
              renderSearchBox: function() {
                  var e, n, o, s = this.app.getModel("turning"), h = this.app.getModel("content");
                  this.searchBox = new i({
                      turningModel: s,
                      contentModel: h
                  }),
                  this.searchBox.$el.on("mouseenter", r).on("mouseleave", a),
                  e = "searchResult:jumped",
                  n = this.searchBox,
                  o = this.app.vent,
                  n.on(e, t.bind(o.trigger, o, e)),
                  this.searchBox.render(),
                  this.searchInput = this.searchBox.$("[name=query]")
              },
              show: function() {
                  this.bubble && (this.bubble.show(),
                  this.searchInput.select())
              },
              hide: function() {
                  this.bubble && this.bubble.hide()
              },
              onHide: function() {
                  a(),
                  this.searchInput.blur(),
                  this.app.vent.trigger("searchBox:closed")
              },
              toggle: function() {
                  this.bubble.isVisible() ? this.hide() : this.show()
              },
              remove: function() {
                  this.searchBox.remove(),
                  this.bubble.destroy(),
                  this.app.vent.off("model:content:set", this.reRender)
              }
          });
          var s = e(document.body);
          function r() {
              s.css("overflow", "hidden")
          }
          function a() {
              s.css("overflow", "")
          }
          return o
      }
      .apply(e, n)) || (t.exports = o)
  },
  239: function(t, e, i) {
      var n, o;
      n = [i(1), i(0), i(2), i(240)],
      void 0 === (o = function(t, e, i, n) {
          return i.View.extend({
              tmpl: e("#tmpl-search-box").html(),
              pageNumResultTmpl: e("#tmpl-pagenum-result").html(),
              searchResultTmpl: e("#tmpl-search-result").html(),
              className: "search-box",
              initialize: function(e) {
                  t.bindAll(this, "search", "onKeyDown", "jumpToItem"),
                  this.contentModel = e.contentModel,
                  this.turningModel = e.turningModel,
                  this.lastSearch = "",
                  this.textSearch = new n(this.contentModel)
              },
              events: {
                  "click .result-item": "jumpToItem",
                  "keydown .query": "onKeyDown",
                  "submit.1 .search-form": "search",
                  "submit.2 .search-form": function(t) {
                      t.preventDefault()
                  },
                  mousewheel: function(t) {
                      t.stopPropagation()
                  }
              },
              render: function() {
                  return this.$el.html(t.template(this.tmpl, {
                      query: this.lastSearch
                  })),
                  this.elInput = this.$("[name=query]"),
                  this.elResults = this.$(".results"),
                  this.elPageNumResult = this.$(".pagenum-result ul"),
                  this.elSearchResult = this.$(".search-result ul"),
                  this.elSearchResultCount = this.$(".search-results-count"),
                  this.elInput.focus(),
                  this.real2read = t.bind(this.turningModel.real2read, this.turningModel),
                  this
              },
              update: function(e, i) {
                  e && this.elPageNumResult.html(t.template(this.pageNumResultTmpl, {
                      result: e,
                      real2read: this.real2read
                  }));
                  var n = i && i.length;
                  n && this.elSearchResult.html(t.template(this.searchResultTmpl, {
                      items: i,
                      real2read: this.real2read
                  })),
                  this.elSearchResultCount.text(n ? i.length : ""),
                  this.$el.toggleClass("has-pagenum-result", !!e).toggleClass("has-search-result", i && !!i.length)
              },
              search: function() {
                  var t = e.trim(this.elInput.val());
                  if (t.length) {
                      var i = this.findPagePara(t)
                        , n = this.textSearch.search(t);
                      this.$el.addClass("search-done"),
                      this.elResults.scrollTop(0),
                      this.query = t,
                      this.pageNumResult = i,
                      this.searchResult = n,
                      this.update(i, n)
                  }
              },
              findPagePara: function(e) {
                  var i = parseInt(e, 10);
                  if (!isNaN(i)) {
                      var n = this.turningModel.read2real(i)
                        , o = this.contentModel.getPage(n);
                      if (o)
                          return t.defaults(o)
                  }
              },
              onKeyDown: function(t) {
                  t.stopPropagation()
              },
              jumpToItem: function(t) {
                  var i = e(t.currentTarget).data()
                    , n = i.pno
                    , o = this.searchResult[i.index];
                  this.turningModel.set("currPage", n),
                  this.trigger("searchResult:jumped", o, this.query)
              }
          })
      }
      .apply(e, n)) || (t.exports = o)
  },
  240: function(t, e, i) {
      (function(n) {
          var o, s;
          o = [i(1), i(241), i(32)],
          void 0 === (s = function(t, e, i) {
              function o(t) {
                  this.contentModel = t,
                  this.paraList = this.getParaList(),
                  this.textList = this.getTextList(this.paraList),
                  this.searchWorker = new e(this.textList)
              }
              t.extend(o.prototype, {
                  getParaList: function() {
                      var e = this.contentModel
                        , i = e.parasIndexs
                        , n = e.pidAndParaMap;
                      return t.chain(i).map(function(t) {
                          return n[t]
                      }).filter(function(t) {
                          return t && "paragraph" === t.type
                      }).value()
                  },
                  getTextList: function(e) {
                      var i = n("<div>");
                      return t.map(e, function(t) {
                          return i[0].innerHTML = t.text,
                          i.remove("sup"),
                          i[0].innerText
                      })
                  },
                  search: function(e) {
                      var i = this
                        , n = this.searchWorker.find(e)
                        , o = this.paraList
                        , s = this.textList
                        , a = this.contentModel.pidAndPageMap;
                      return t.map(n, function(t) {
                          var e = o[t.index]
                            , n = s[t.index]
                            , h = a[e.pid]
                            , l = h[0]
                            , c = i.contentModel.getPage(l)
                            , u = t.startOffset
                            , d = t.endOffset;
                          return {
                              startOffset: u,
                              endOffset: d,
                              paragraph: e,
                              page: c,
                              paginations: h,
                              texts: r(n, u, d)
                          }
                      })
                  }
              });
              var s = 20;
              function r(t, e, n) {
                  var o = t.slice(0, e)
                    , r = t.slice(e, n)
                    , h = t.slice(n);
                  return {
                      left: o = a(i(a(o), s)),
                      self: r,
                      right: h = i(h, s)
                  }
              }
              function a(t) {
                  return t.split("").reverse().join("")
              }
              return o
          }
          .apply(e, o)) || (t.exports = s)
      }
      ).call(this, i(0))
  },
  241: function(t, e, i) {
      var n, o;
      n = [i(1)],
      void 0 === (o = function(t) {
          var e = {
              avoidHugeSearch: !0
          }
            , i = {
              ignoreCase: !0,
              wildcard: !1,
              regexp: !1
          }
            , n = /[A-Z]/;
          function o(i, n) {
              this.opts = t.defaults(n || {}, e),
              this.list = i
          }
          return t.extend(o.prototype, {
              find: function(e, i) {
                  if (i = this.parseOptions(i, e),
                  this.opts.avoidHugeSearch && this.isHugeQuery(e, i))
                      return [];
                  i.wildcard ? e = e.replace(/[-[\]{}()+.,\\^$|#\s]/g, "\\$&").replace(/\*/g, ".+").replace(/\?/g, ".") : i.regexp || (e = e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"));
                  var n, o = [], s = "g" + (i.ignoreCase ? "i" : ""), r = new RegExp(e,s);
                  return t.each(this.list, function(t, e) {
                      for (; null !== (n = r.exec(t)); )
                          o.push({
                              startOffset: n.index,
                              endOffset: r.lastIndex,
                              index: e,
                              text: t
                          })
                  }),
                  o
              },
              parseOptions: function(e, o) {
                  return e = e || {},
                  t.isUndefined(e.ignoreCase) && (e.ignoreCase = !n.test(o)),
                  t.defaults(e, i)
              },
              isHugeQuery: function(t, e) {
                  return 0 === t.length || !!e.wildcard && 0 === t.replace(/[?*]/g, "").length
              }
          }),
          o
      }
      .apply(e, n)) || (t.exports = o)
  },
  242: function(t, e, i) {
      var n = i(1)
        , o = i(0)
        , s = i(2)
        , r = i(120)
        , a = window.speechSynthesis
        , h = s.View.extend({
          className: "speech-box",
          events: {
              "click [name=speak]": "speak",
              "click [name=stop]": "stop",
              "change [name=volume]": "updateVolume",
              "change [name=voiceSelect]": "updateVoice",
              "change [name=rate]": "updateRate"
          },
          initialize: function(t) {
              this.contentModel = t.contentModel,
              this.turningModel = t.turningModel,
              this._fragment = o("<div>"),
              this.data = {}
          },
          render: function() {
              this.$el.html('<h3 class="dialog-title">朗读（组内可见）</h3><p>口音：<select name="voiceSelect"></select><p>音量：<input name="volume" type="range" step="0.01" min="0" max="1" value="1"><p>语速：<input name="rate" type="range" step="0.01" min="0.1" max="2" value="1"><p><button class="btn" name="speak">读!</button><button class="btn" name="stop">停!</button>');
              var t = this.$("select")
                , e = a.getVoices().filter(function(t) {
                  return ["en", "en-US", "en-UK", "zh-CN", "zh-TW", "zh-HK"].includes(t.lang) && t.localService
              }).sort(function(t, e) {
                  return t.lang > e.lang ? -1 : t.lang < e.lang ? 1 : 0
              });
              return e.forEach(function(e, i) {
                  var n = o("<option>");
                  n.text(e.name + " (" + e.lang + ")"),
                  n.attr("value", i),
                  t.append(n)
              }),
              this.voices = e,
              this.voiceSelect = t,
              this.volumeInput = this.$("[name=volume]"),
              this.rateInput = this.$("[name=rate]"),
              this.updateVoice(),
              this.updateVolume(),
              this.updateRate(),
              this
          },
          updateVoice: function() {
              this.data.voice = this.voices[this.voiceSelect.val()]
          },
          updateVolume: function() {
              this.data.volume = +this.volumeInput.val()
          },
          updateRate: function() {
              this.data.rate = +this.rateInput.val()
          },
          speak: function() {
              this.$el.addClass("is-speaking");
              var t = this.turningModel.get("currPage");
              this.speakFromPage(t)
          },
          speakFromPage: function(t) {
              var e = this.contentModel.getPage(t);
              this.isSpeaking = !0,
              e.isTitlePage ? this.speakTitlePage(e) : this.speakNormalPage(e)
          },
          stop: function() {
              a.cancel(),
              this.isSpeaking = !1,
              this.$el.removeClass("is-speaking")
          },
          speakTitlePage: function(t) {
              var e = this
                , i = "".concat(t.titlePageInfo.title, "，") + "".concat(t.titlePageInfo.subtitle, "，") + t.titlePageInfo.author;
              this.speakText(i, function() {
                  e.speakFromPage(t.pagination + 1)
              })
          },
          speakNormalPage: function(t) {
              var e = t.paragraphs[0].pid;
              this.speakParagraph(e)
          },
          transformText: function(t) {
              return t ? (this._fragment[0].innerHTML = t,
              this._fragment.find("sup").each(function(t, e) {
                  e.textContent = "，注释：".concat(e.textContent, "，")
              }),
              this._fragment[0].textContent) : ""
          },
          transformParaText: function(t) {
              var e = this;
              return "illus" === t.type ? "图片：".concat(t.data.legend.map(function(t) {
                  return e.transformParaText(t)
              }).join("。")) : "code" === t.type ? "代码段" : "pagebreak" === t.type ? "" : this.transformText(t.data.text)
          },
          speakText: function(t, e) {
              var i = this
                , n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0
                , o = new SpeechSynthesisUtterance(t);
              return this.cacheUtterance = o,
              o.voice = this.data.voice,
              o.volume = this.data.volume,
              o.rate = this.data.rate,
              o.addEventListener("end", function() {
                  i.isSpeaking && e && e()
              }),
              a.cancel(),
              setTimeout(function() {
                  a.speak(o)
              }, n),
              o
          },
          speakParagraph: function(t) {
              var e = this
                , i = this.contentModel.getParaSourceByPid(t)
                , n = this.transformParaText(i);
              if (n) {
                  var o = 0;
                  "headline" === i.type && (o = 500);
                  var s = this.speakText(n, function() {
                      e.speakNextParagraph(t, n)
                  }, o)
                    , r = 0;
                  s.addEventListener("boundary", function(i) {
                      var n = i.charIndex;
                      (0 === n || n - r > 32) && (e.checkAndTurnPage(t, n),
                      r = n)
                  })
              } else
                  this.speakNextParagraph(t, n)
          },
          speakNextParagraph: function(t, e) {
              var i = this
                , n = 0;
              e ? -1 !== "。？！…”".indexOf(e[e.length - 1]) && (n = 300) : n = 400;
              var o = this.contentModel.getNextPid(t);
              o ? setTimeout(function() {
                  return i.speakParagraph(o)
              }, n) : this.stop()
          },
          checkAndTurnPage: function(t, e) {
              var i = this
                , n = this.contentModel.findPaginations(t)
                , o = n[0];
              n.length > 1 && ((o = n.slice(0, -1).find(function(n) {
                  var o = i.contentModel.findParagraphPagingPoint(n);
                  return !o || (o.pid !== t ? (window.console.error("Which is the last paragraph in ".concat(n, "? ").concat(t, " or ").concat(o.pid)),
                  !0) : o.wordOffset > e)
              })) || (o = n[n.length - 1])),
              this.turningModel.setCurrPage(o)
          },
          remove: function() {
              a.cancel(),
              s.View.prototype.remove.apply(this, arguments)
          }
      });
      function l(t) {
          var e = this;
          n.bindAll(this, "render", "show", "hide", "reRender"),
          this.app = t.app,
          this.target = t.target,
          o.when(this.app.getModelPromise("content"), this.app.getModelPromise("turning")).done(function() {
              return n.delay(e.render, 100)
          })
      }
      n.extend(l.prototype, {
          render: function() {
              return this.renderSpeechBox(),
              this.renderBubble(),
              this.hide(),
              this.app.vent.once("model:content:set", this.reRender),
              this
          },
          reRender: function() {
              this.bubble.destroy(),
              this.render()
          },
          renderSpeechBox: function() {
              var t = this.app.getModel("turning")
                , e = this.app.getModel("content");
              this.speechBox = new h({
                  turningModel: t,
                  contentModel: e
              }),
              this.speechBox.render()
          },
          renderBubble: function() {
              this.bubble = new r({
                  html: '<div class="speech-dialog"><b class="bubble-close">&times;</b><div class="bubble-content"></div></div>',
                  onClickOutside: !1
              }),
              this.bubble.set({
                  arrowOffset: 18,
                  content: this.speechBox.$el,
                  target: this.target
              }),
              this.bubble.on("hidden destroyed", this.onHide, this)
          },
          show: function() {
              this.bubble && this.bubble.show()
          },
          hide: function() {
              this.bubble && this.bubble.hide()
          },
          onHide: function() {},
          toggle: function() {
              this.bubble.isVisible() ? this.hide() : this.show()
          },
          remove: function() {
              this.speechBox.remove(),
              this.app.vent.trigger("speechBox:closed"),
              this.bubble.destroy(),
              this.app.vent.off("model:content:set", this.reRender)
          }
      }),
      t.exports = l
  },
  243: function(t, e, i) {
      var n = i(1)
        , o = i(0)
        , s = i(120)
        , r = n.template(o("#tmpl-font-size-box").html());
      function a(t) {
          n.bindAll(this, "render", "show", "hide"),
          this.app = t.app,
          this.target = t.target,
          this.render()
      }
      n.extend(a.prototype, {
          render: function() {
              return this.renderBox(),
              this.renderBubble(),
              this.hide(),
              this
          },
          renderBox: function() {
              var t = this;
              this.fontSizeBoxEl = o(r({
                  fontSize: this.app.getModel("config").get("fontSize")
              })),
              this.fontSizeBoxEl.on("change", "[name=fontSize]", function(e) {
                  e.preventDefault();
                  var i = +e.currentTarget.value
                    , n = 2 * i;
                  t.app.getModel("config").set({
                      fontSize: i,
                      lineHeight: n
                  })
              })
          },
          renderBubble: function() {
              this.bubble = new s({
                  html: '<div class="font-size-dialog"><b class="bubble-close">&times;</b><div class="bubble-content"></div></div>'
              }),
              this.bubble.set({
                  arrowOffset: 18,
                  content: this.fontSizeBoxEl,
                  target: this.target
              })
          },
          show: function() {
              this.bubble && this.bubble.show()
          },
          hide: function() {
              this.bubble && this.bubble.hide()
          },
          toggle: function() {
              this.bubble.isVisible() ? this.hide() : this.show()
          },
          remove: function() {
              this.speechBox.remove(),
              this.bubble.destroy()
          }
      }),
      t.exports = a
  },
  245: function(t, e, i) {
      var n;
      n = {
          VERSION: "2.3.5",
          Result: {
              SUCCEEDED: 1,
              NOTRANSITION: 2,
              CANCELLED: 3,
              PENDING: 4
          },
          Error: {
              INVALID_TRANSITION: 100,
              PENDING_TRANSITION: 200,
              INVALID_CALLBACK: 300
          },
          WILDCARD: "*",
          ASYNC: "async",
          create: function(t, e) {
              var i = "string" == typeof t.initial ? {
                  state: t.initial
              } : t.initial
                , o = t.terminal || t.final
                , s = e || t.target || {}
                , r = t.events || []
                , a = t.callbacks || {}
                , h = {}
                , l = {}
                , c = function(t) {
                  var e = t.from instanceof Array ? t.from : t.from ? [t.from] : [n.WILDCARD];
                  h[t.name] = h[t.name] || {};
                  for (var i = 0; i < e.length; i++)
                      l[e[i]] = l[e[i]] || [],
                      l[e[i]].push(t.name),
                      h[t.name][e[i]] = t.to || e[i]
              };
              i && (i.event = i.event || "startup",
              c({
                  name: i.event,
                  from: "none",
                  to: i.state
              }));
              for (var u = 0; u < r.length; u++)
                  c(r[u]);
              for (var d in h)
                  h.hasOwnProperty(d) && (s[d] = n.buildEvent(d, h[d]));
              for (var d in a)
                  a.hasOwnProperty(d) && (s[d] = a[d]);
              return s.current = "none",
              s.is = function(t) {
                  return t instanceof Array ? t.indexOf(this.current) >= 0 : this.current === t
              }
              ,
              s.can = function(t) {
                  return !this.transition && (h[t].hasOwnProperty(this.current) || h[t].hasOwnProperty(n.WILDCARD))
              }
              ,
              s.cannot = function(t) {
                  return !this.can(t)
              }
              ,
              s.transitions = function() {
                  return l[this.current]
              }
              ,
              s.isFinished = function() {
                  return this.is(o)
              }
              ,
              s.error = t.error || function(t, e, i, n, o, s, r) {
                  throw r || s
              }
              ,
              i && !i.defer && s[i.event](),
              s
          },
          doCallback: function(t, e, i, o, s, r) {
              if (e)
                  try {
                      return e.apply(t, [i, o, s].concat(r))
                  } catch (e) {
                      return t.error(i, o, s, r, n.Error.INVALID_CALLBACK, "an exception occurred in a caller-provided callback function", e)
                  }
          },
          beforeAnyEvent: function(t, e, i, o, s) {
              return n.doCallback(t, t.onbeforeevent, e, i, o, s)
          },
          afterAnyEvent: function(t, e, i, o, s) {
              return n.doCallback(t, t.onafterevent || t.onevent, e, i, o, s)
          },
          leaveAnyState: function(t, e, i, o, s) {
              return n.doCallback(t, t.onleavestate, e, i, o, s)
          },
          enterAnyState: function(t, e, i, o, s) {
              return n.doCallback(t, t.onenterstate || t.onstate, e, i, o, s)
          },
          changeState: function(t, e, i, o, s) {
              return n.doCallback(t, t.onchangestate, e, i, o, s)
          },
          beforeThisEvent: function(t, e, i, o, s) {
              return n.doCallback(t, t["onbefore" + e], e, i, o, s)
          },
          afterThisEvent: function(t, e, i, o, s) {
              return n.doCallback(t, t["onafter" + e] || t["on" + e], e, i, o, s)
          },
          leaveThisState: function(t, e, i, o, s) {
              return n.doCallback(t, t["onleave" + i], e, i, o, s)
          },
          enterThisState: function(t, e, i, o, s) {
              return n.doCallback(t, t["onenter" + o] || t["on" + o], e, i, o, s)
          },
          beforeEvent: function(t, e, i, o, s) {
              if (!1 === n.beforeThisEvent(t, e, i, o, s) || !1 === n.beforeAnyEvent(t, e, i, o, s))
                  return !1
          },
          afterEvent: function(t, e, i, o, s) {
              n.afterThisEvent(t, e, i, o, s),
              n.afterAnyEvent(t, e, i, o, s)
          },
          leaveState: function(t, e, i, o, s) {
              var r = n.leaveThisState(t, e, i, o, s)
                , a = n.leaveAnyState(t, e, i, o, s);
              return !1 !== r && !1 !== a && (n.ASYNC === r || n.ASYNC === a ? n.ASYNC : void 0)
          },
          enterState: function(t, e, i, o, s) {
              n.enterThisState(t, e, i, o, s),
              n.enterAnyState(t, e, i, o, s)
          },
          buildEvent: function(t, e) {
              return function() {
                  var i = this.current
                    , o = e[i] || e[n.WILDCARD] || i
                    , s = Array.prototype.slice.call(arguments);
                  if (this.transition)
                      return this.error(t, i, o, s, n.Error.PENDING_TRANSITION, "event " + t + " inappropriate because previous transition did not complete");
                  if (this.cannot(t))
                      return this.error(t, i, o, s, n.Error.INVALID_TRANSITION, "event " + t + " inappropriate in current state " + this.current);
                  if (!1 === n.beforeEvent(this, t, i, o, s))
                      return n.Result.CANCELLED;
                  if (i === o)
                      return n.afterEvent(this, t, i, o, s),
                      n.Result.NOTRANSITION;
                  var r = this;
                  this.transition = function() {
                      return r.transition = null,
                      r.current = o,
                      n.enterState(r, t, i, o, s),
                      n.changeState(r, t, i, o, s),
                      n.afterEvent(r, t, i, o, s),
                      n.Result.SUCCEEDED
                  }
                  ,
                  this.transition.cancel = function() {
                      r.transition = null,
                      n.afterEvent(r, t, i, o, s)
                  }
                  ;
                  var a = n.leaveState(this, t, i, o, s);
                  return !1 === a ? (this.transition = null,
                  n.Result.CANCELLED) : n.ASYNC === a ? n.Result.PENDING : this.transition ? this.transition() : void 0
              }
          }
      },
      t.exports && (e = t.exports = n),
      e.StateMachine = n
  },
  246: function(t, e, i) {
      var n, o;
      n = [i(0), i(4), i(13)],
      void 0 === (o = function(t, e, i) {
          return {
              init: function(t) {
                  return this.el = t.el,
                  this.render(),
                  this
              },
              template: t("#tmpl-payment-channels").html(),
              render: function() {
                  return this.el.find(".content").html(i(this.template)),
                  this.form = this.el.find(".payment-form"),
                  this
              }
          }
      }
      .apply(e, n)) || (t.exports = o)
  },
  247: function(t, e, i) {
      var n, o;
      n = [i(248)],
      void 0 === (o = function(t) {
          return {
              trackPurchaseEvent: function(e) {
                  var i = this.isChapter() ? "column-purchase" : "purchase";
                  t.trackEvent(i, e, this.getTitle(), this.getPriceInCents())
              },
              trackEcommerce: function(e, i, n) {
                  var o = this.getPrice();
                  t.trackEcommerce({
                      id: e,
                      affiliation: i,
                      revenue: o
                  }, {
                      id: e,
                      sku: this.getWorksIds()[0],
                      name: this.getTitle(),
                      category: n || "",
                      price: o,
                      quantity: 1
                  })
              }
          }
      }
      .apply(e, n)) || (t.exports = o)
  },
  248: function(t, e, i) {
      var n;
      void 0 === (n = function() {
          var t = {}
            , e = Array.prototype.slice;
          return t.trackPageview = function(t) {
              ga("send", "pageview", t.replace(/^(\/*)/g, "/"))
          }
          ,
          t.trackEvent = function(t, i) {
              var n = e.call(arguments, 2)
                , o = ["send", "event", t, i];
              n.length > 0 && ("number" == typeof n[0] && (n[0] = n[0].toString()),
              "string" == typeof n[1] && (n[1] = +n[1]),
              o = o.concat(n)),
              ga.apply(this, o)
          }
          ,
          t.trackEcommerce = function(t, e) {
              ga("ecommerce:addTransaction", t),
              ga("ecommerce:addItem", e),
              ga("ecommerce:send")
          }
          ,
          t.delayRun = function(t) {
              setTimeout(t, 400)
          }
          ,
          t
      }
      .apply(e, [])) || (t.exports = n)
  },
  249: function(t, e, i) {
      var n, o;
      n = [i(0), i(13)],
      void 0 === (o = function(t, e) {
          function i(e) {
              this.purchaseWidget = e.purchaseWidget,
              this.purchaseEl = this.purchaseWidget._el,
              this.button = e.button,
              this.tmplBoughtButton = t("#tmpl-bought-button").html(),
              this.origButtonHtml = this.button.html(),
              this.proxyMethods(),
              this.bindButton(),
              this.bindPurchase()
          }
          return t.extend(i.prototype, {
              bindButton: function() {
                  var t = this;
                  this.button.on("click", function(e) {
                      "#" === t.button.attr("href") && e.preventDefault(),
                      t.purchaseWidget.doPurchase()
                  })
              },
              bindPurchase: function() {
                  this.purchaseEl.on("checkBalance:start", this.onLoading),
                  this.purchaseEl.on("purchase:success", this.onSuccess),
                  this.purchaseEl.on("checkBalance:failed purchase:failed", this.onFailed)
              },
              proxyMethods: function() {
                  var e = this;
                  t.each(["onLoading", "onSuccess", "onFailed"], function(i, n) {
                      e[n] = t.proxy(e[n], e)
                  })
              },
              onLoading: function() {
                  this.button.html("购买中...")
              },
              onSuccess: function() {
                  this.button.parent().html(e(this.tmplBoughtButton, {
                      url: this.purchaseWidget.getReaderUrl(),
                      isLargeBtn: this.purchaseWidget.isLargeBtn()
                  }))
              },
              onFailed: function() {
                  this.button.html(this.origButtonHtml)
              }
          }),
          i
      }
      .apply(e, n)) || (t.exports = o)
  },
  252: function(t, e, i) {
      var n, o;
      n = [i(0), i(1), i(2)],
      void 0 === (o = function(t, e, i) {
          var n = {
              backgroundColor: "",
              borderColor: "",
              arrowHeight: "",
              borderSize: "",
              offset: "",
              orention: "",
              arrowWidth: ""
          }
            , o = {
              top: "left",
              bottom: "left",
              right: "top",
              left: "top"
          }
            , s = {
              top: "bottom",
              bottom: "top",
              left: "right",
              right: "left"
          };
          return function(i, r) {
              i.find("._arrow-box").remove(),
              (r = e.defaults(r, n)).arrowHeight || (r.arrowHeight = r.arrowWidth);
              var a = t("<div>")
                , h = t("<div>")
                , l = s[r.orention]
                , c = o[r.orention]
                , u = {
                  "border-style": "solid",
                  "border-color": "transparent",
                  hegiht: 0,
                  position: "absolute"
              };
              u[l] = "100%";
              var d = {
                  "border-width": r.arrowHeight + "px " + r.arrowWidth + "px"
              };
              d["border-" + l + "-color"] = r.backgroundColor,
              d[c] = r.offset,
              d["margin-" + c] = -r.arrowHeight + "px";
              var f = r.arrowHeight + r.borderSize
                , p = {
                  "border-width": f + "px " + (r.arrowWidth + r.borderSize) + "px"
              };
              p["border-" + l + "-color"] = r.borderColor,
              p[c] = r.offset,
              p["margin-" + c] = -f + "px",
              t().add(h).add(a).css(u).css({
                  "border-color": "transparent"
              }).addClass("_arrow-box"),
              h.css(d).addClass("arrow-inner"),
              a.css(p).addClass("arrow-outer"),
              i.append(a).append(h)
          }
      }
      .apply(e, n)) || (t.exports = o)
  },
  255: function(t, e, i) {
      var n, o;
      n = [i(2), i(0)],
      void 0 === (o = function(t, e) {
          return t.Model.extend({
              toJSON: function() {
                  return e.extend(!0, {}, this.attributes)
              }
          })
      }
      .apply(e, n)) || (t.exports = o)
  },
  256: function(t, e, i) {
      var n;
      void 0 === (n = function() {
          if (Date.prototype.toISOString)
              return function() {
                  return (new Date).toISOString()
              }
              ;
          function t(t) {
              var e = String(t);
              return 1 === e.length && (e = "0" + e),
              e
          }
          return function() {
              var e = new Date;
              return e.getUTCFullYear() + "-" + t(e.getUTCMonth() + 1) + "-" + t(e.getUTCDate()) + "T" + t(e.getUTCHours()) + ":" + t(e.getUTCMinutes()) + ":" + t(e.getUTCSeconds()) + "." + String((e.getUTCMilliseconds() / 1e3).toFixed(3)).slice(2, 5) + "Z"
          }
      }
      .call(e, i, e, t)) || (t.exports = n)
  },
  273: function(t, e, i) {
      var n, o;
      n = [i(2), i(1), i(0), i(42)],
      void 0 === (o = function(t, e, i, n) {
          var o = ["broadcast_to_site", "share_dou", "share_weibo"]
            , s = o.concat(["visible_private"])
            , r = {
              share_dou: "",
              share_weibo: "",
              broadcast_to_site: ""
          };
          return n.extend({
              defaults: function() {
                  return e.extend({
                      share_dou: "on",
                      share_weibo: "on",
                      broadcast_to_site: "on",
                      visible_private: "",
                      text: ""
                  }, this.getConfigFromStorage() || {})
              },
              attrsGroup: e.defaults({
                  config: s,
                  checkbox: s,
                  sharing: o,
                  edit: o
              }, n.prototype.attrsGroup),
              configStroageKey: "noteFormDefaults",
              pickAttrs: function(t, i) {
                  var o = n.prototype.pickAttrs.apply(this, arguments)
                    , s = !!this.get("visible_private")
                    , a = this.getGroupKeys(t);
                  return i && s && (o = e.extend(o, e.pick(r, a))),
                  o
              }
          })
      }
      .apply(e, n)) || (t.exports = o)
  },
  319: function(t, e, i) {
      var n, o;
      n = [i(2), i(1)],
      void 0 === (o = function(t, e) {
          return t.Model.extend({
              parse: function(t) {
                  return t.endContainerId += "",
                  t.startContainerId += "",
                  e.each(t.middleContainers, function(e, i) {
                      t.middleContainers[i] = e + ""
                  }),
                  t.extra.percent = parseInt(t.extra.percent, 10),
                  t
              }
          })
      }
      .apply(e, n)) || (t.exports = o)
  },
  321: function(t, e, i) {
      var n, o;
      n = [i(0), i(2), i(1), i(163), i(23)],
      void 0 === (o = function(t, e, i, n, o) {
          return e.View.extend({
              tagName: "form",
              className: "inline-form",
              tmpl: t("#tmpl-note-inline-form").html(),
              events: {
                  "click .cancel": "cancel",
                  submit: "editDone"
              },
              initialize: function(n) {
                  var o = e.Model.extend({
                      defaults: {
                          text: ""
                      }
                  });
                  this.model = new o(i.pick(n, "text", "visible_private")),
                  this.dfd = new t.Deferred,
                  this.promise = this.dfd.promise(),
                  this.promise.always(i.bind(function() {
                      this.remove()
                  }, this))
              },
              render: function() {
                  return this.$el.html(i.template(this.tmpl, this.model.pick("text", "visible_private"))),
                  this.textarea = this.$(".text"),
                  o.ctrlEnterForm(this.$el),
                  o.enableAutoResize(this.textarea, this.$el),
                  this
              },
              autoResize: function() {
                  return o.autoResize(this.textarea),
                  this
              },
              focus: function() {
                  return this.textarea.focus(),
                  n.collapseToEnd(this.textarea[0]),
                  this
              },
              parseText: function(e) {
                  return t.trim(e).replace(/\n/g, " ")
              },
              editDone: function(t) {
                  t.preventDefault();
                  var e = this.parseText(this.textarea.val());
                  if (!e.length)
                      return alert("批注不能为空");
                  this.model.set({
                      text: e,
                      visible_private: this.$("input[name=visible_private]").is(":checked") ? "on" : ""
                  }),
                  this.dfd.resolve(this.model)
              },
              cancel: function(t) {
                  t.preventDefault(),
                  this.dfd.reject()
              }
          })
      }
      .apply(e, n)) || (t.exports = o)
  },
  327: function(t, e, i) {
      var n, o;
      n = [i(1), i(24)],
      void 0 === (o = function(t, e) {
          var i = new e(!0,"local");
          function n(t) {
              this.key = t
          }
          function o(t) {
              this.key = t
          }
          return t.extend(n.prototype, {
              isFree: function() {
                  return !i.get(this.key)
              },
              checkIn: function() {
                  i.set(this.key, 1)
              }
          }),
          t.extend(o.prototype, {
              isFree: function() {
                  var e = +i.get(this.key) || 0;
                  return t.now() - e > 864e5
              },
              checkIn: function() {
                  var t = (new Date).setHours(0);
                  i.set(this.key, t.valueOf())
              }
          }),
          {
              OncePerDayAndBrowser: o,
              OncePerBrowser: n
          }
      }
      .apply(e, n)) || (t.exports = o)
  },
  36: function(t, e) {
      var i = Ark.me.id || "";
      t.exports = function(t) {
          return parseInt((i + t).slice(0, 10), 36).toString().slice(0, 5)
      }
  }
}]);


(window.webpackJsonp = window.webpackJsonp || []).push([[3], Array(97).concat([function(t, e, i) {
  var n = i(0)
    , o = i(2)
    , r = i(1)
    , a = i(6)
    , s = i(39)
    , l = i(105)
    , h = i(9)
    , c = i(225)
    , d = i(149)
    , p = i(31)
    , u = i(11)
    , g = i(150)
    , f = i(10)
    , m = i(151)
    , v = i(244)
    , y = i(312)
    , b = i(314)
    , w = i(325)
    , x = i(186)
    , P = i(328)
    , T = o.View.extend({
      el: "#ark-reader",
      initialize: function() {
          u(this, "canvas"),
          r.bindAll(this, "freezeCanvas", "unfreezeCanvas", "freezeControl", "unfreezeControl", "scrollPage", "changeLayout", "renderGuide", "renderPanel"),
          this.app = a,
          this.vent = this.app.vent,
          this.config = a.getModel("config");
          var t = new g;
          a.setModel("turning", t),
          t.disableSet(),
          t.on("change:isFirstPage", function(t, e) {
              this.$el.toggleClass("first-page", e)
          }, this).on("change:isLastPage", function(t, e) {
              this.$el.toggleClass("last-page", e)
          }, this),
          this.panel = new m({
              el: ".aside",
              config: this.config
          }),
          this.article = new v(this.config),
          this.pagination = new y(this.config),
          this.controlsPanel = new b(this.config),
          this.article.on("article:init", function() {
              t.enableSet(),
              t.clear({
                  silent: !0
              }),
              t.disableSet()
          }).on("article:init", r.bind(function() {
              this.article.once("pages:rendered:fully", function() {
                  a.vent.trigger("pages:layout:finish"),
                  a.vent.trigger("reader:layout:finish")
              })
          }, this)),
          a.vent.once("reader:layout:finish", function() {
              r.defer(function() {
                  a.vent.trigger("reader:ready")
              })
          }),
          c({
              ebook: {
                  canvas: this,
                  panel: this.panel,
                  article: this.article,
                  pagination: this.pagination,
                  controlsPanel: this.controlsPanel,
                  config: this.config
              }
          }),
          this.win = n(window),
          this.body = n("body"),
          this.bindKeyEvents(),
          this.bindWheelEvents(),
          this.docElement = n(document.documentElement),
          this.savingTimer = 0,
          this.scrollContainer = this.body,
          this.vent.on({
              "freeze:canvas": this.freezeCanvas,
              "unfreeze:canvas": this.unfreezeCanvas,
              "freeze:control": this.freezeControl,
              "unfreeze:control": this.unfreezeControl,
              "scroll:page": this.scrollPage,
              "change:layout": this.changeLayout,
              "render:panel": this.renderPanel,
              "reader:ready": this.renderGuide
          }),
          this.listenTo(t, "change:currPage", function() {
              a.vent.trigger("close:popups"),
              this.pagination.updateProgressBar()
          }),
          w.bindAll(this)
      },
      renderThenShowToast: function(t, e) {
          this.article.attachHooks({
              afterJumpingProgress: function() {
                  p.toast(l.toastTexts[e])
              }
          }),
          this._render(t)
      },
      renderThenOpenRecommendation: function(t, e) {
          a.getModel("config").set("ignoreGuide", !0);
          var i = new P.Recommendation(t,e);
          this.article.attachHooks(i),
          this._render(t)
      },
      renderThenShowUnderline: function(t, e) {
          a.getModel("config").set("ignoreGuide", !0);
          var i = new P.Underline(e);
          this.article.attachHooks(i),
          this._render(t)
      },
      renderThenOpenAnnotation: function(t, e) {
          a.getModel("config").set("ignoreGuide", !0);
          var i = new P.Annotation(t,e);
          this.article.attachHooks(i),
          this._render(t)
      },
      renderThenOpenParaAnnotations: function(t, e) {
          a.getModel("config").set("ignoreGuide", !0);
          var i = new P.ParaAnnotations(e);
          this.article.attachHooks(i),
          this._render(t)
      },
      renderThenGotoChapter: function(t, e) {
          a.router.cleanUrl();
          var i = new P.TocChapter(e);
          this.article.attachHooks(i),
          this._render(t)
      },
      render: function(t) {
          this._render(t)
      },
      _render: function(t) {
          return this.app.unsetModel("article"),
          this.app.unsetModel("content"),
          this.articleId = t,
          this.article.render(t),
          this.pagination.render(),
          this.controlsPanel.render(),
          h.fitForMobile() || ((new x).appendTo(this.$el),
          this.changeLayout()),
          this.trigger("view:rendered"),
          this
      },
      renderGuide: function() {
          this.config.get("ignoreGuide") || this.config.get("usingLiteStyle") || (this.config.get("isNewUser") ? this.openHelperGuide() : this.config.get("hasShownAnnotationGuide") || this.openAnnotationGuide())
      },
      openHelperGuide: function() {
          this.panel.toggleHelper(),
          this.config.set("isNewUser", !1)
      },
      openAnnotationGuide: function() {
          h.fitForMobile() || (this.panel.openAnnotationGuideBubble(),
          this.config.set("hasShownAnnotationGuide", !0))
      },
      renderPanel: function(t) {
          this.panel.render(t)
      },
      changeLayout: function() {
          var t = this.config.get("layout");
          this.body.scrollTop(0),
          this.$el.toggleClass("layout-vertical", "vertical" === t),
          this.pagination.togglePagingBtns(t),
          this.pagination.updateProgressBar()
      },
      show: function() {
          return this.panel.show(),
          this.key.enable(),
          this.wheel.enable(),
          this.isShown ? this : (this.docElement.addClass("reading-view"),
          /msie (8|9)/i.test(navigator.userAgent) && (this.docElement.on("selectstart.unselectable", function(t) {
              t.preventDefault()
          }),
          this.docElement.on("selectstart.unselectable", ".content", function(t) {
              t.stopPropagation()
          })),
          this.isShown = !0,
          this.$el.show(),
          this.vent.trigger("canvas:shown"),
          this)
      },
      hide: function() {
          if (this.panel.hide(),
          !this.isShown)
              return this;
          this.key.disable(),
          this.win.off("scroll"),
          this.win.off("resize"),
          this.docElement.removeClass("reading-view"),
          /msie (8|9)/i.test(navigator.userAgent) && this.docElement.off(".unselectable"),
          this.controlsPanel.closeTips(),
          this.pagination.removeProgressBar(),
          this.$el.hide(),
          this.isShown = !1,
          n(".tips-outer").remove();
          try {
              f.set("previousAid", this.articleId)
          } catch (t) {}
          return this.vent.trigger("canvas:hidden"),
          this
      },
      scrollPage: r.throttle(function(t, e) {
          e = e || 300,
          this.scrollContainer.animate({
              scrollTop: t
          }, e)
      }, 100),
      freezeControl: function() {
          this.key.disable(),
          this.wheel.disable()
      },
      unfreezeControl: function() {
          this.key.enable(),
          this.wheel.enable()
      },
      freezeCanvas: function() {
          this.freezeControl(),
          this.$el.after('<div id="freeze-canvas-mask">')
      },
      unfreezeCanvas: function() {
          this.unfreezeControl(),
          n("#freeze-canvas-mask").remove()
      },
      changeFullscreenStyle: function() {
          this.panel.toggle(),
          this.panel.hideBubble(),
          this.controlsPanel.closeTips()
      },
      bindWheelEvents: function() {
          var t = this;
          this.wheel = new d({
              disableElements: [".bubble", ".tooltip", ".tips-outer", "#ark-overlay"]
          }),
          this.wheel.onWheelBottom(function() {
              "horizontal" === a.getModel("config").get("layout") && t.pagination.pageNext.trigger("humanClick")
          }),
          this.wheel.onWheelTop(function() {
              "horizontal" === a.getModel("config").get("layout") && t.pagination.pagePrev.trigger("humanClick")
          })
      },
      bindKeyEvents: function() {
          var t = this
            , e = this.config;
          this.key = s(),
          this.key.down(["j", "right", "space"], function() {
              if ("horizontal" === e.get("layout"))
                  t.pagination.pageNext.trigger("humanClick");
              else {
                  var i = e.get("verticalPageHeight") - 2 * e.getLineHeightPx();
                  t.scrollPage("+=" + i + "px", 100)
              }
          }).down(["k", "left", "shift+space"], function() {
              if ("horizontal" === e.get("layout"))
                  t.pagination.pagePrev.trigger("humanClick");
              else {
                  var i = e.get("verticalPageHeight") - 3 * e.getLineHeightPx();
                  t.scrollPage("-=" + i + "px", 100)
              }
          }).down(["down"], function() {}).down(["up"], function() {}).down("shift+g", function() {
              a.getModel("turning").turnLastPage()
          }).down("g->g", function() {
              a.getModel("turning").turnFirstPage()
          }).down("esc", function() {
              t.controlsPanel.closeTips(),
              t.controlsPanel.closePopups()
          }).down("shift+/", function() {
              t.panel.toggleHelper()
          }).down("/", function(e) {
              e.preventDefault(),
              t.pagination.pagePortal.trigger("view:openPageForm")
          }).down(["meta+shift+f", "f11"], function() {
              t.changeFullscreenStyle()
          }).down(["ctrl+a", "meta+a"], function(t) {
              return t.preventDefault(),
              !1
          })
      }
  });
  t.exports = T
}
, , , , , , , , function(t, e) {
  t.exports.reading = {
      VERTICAL_SCROLLING_DEBOUNCE_LATER: 150,
      READER_INNER_PADDING: 80,
      EN_BOOK_PARA_SPACE_IN_ROW: 1,
      MODERN_PARA_SPACE_IN_ROW: .75,
      MOBILE_PARA_SPACE_IN_ROW: 1
  },
  t.exports.textParagraphSelector = ".paragraph, .headline, .uli, .oli",
  t.exports.allowSelectionParagraphSelector = t.exports.textParagraphSelector,
  t.exports.toastTexts = {
      donation_succeed: "送花成功",
      payment_succeed: "购买成功"
  },
  t.exports.rootKinds = {
      ORIGIN_WORKS: 500
  }
}
, , , , , , , , , , , function(t, e, i) {
  var n, o;
  n = [i(0), i(1), i(6)],
  void 0 === (o = function(t, e, i) {
      function n(t) {
          return t.find('[data-offset="'.concat(this.offset, '"]'))[0]
      }
      function o(t) {
          var i, o = t[0], r = o.offsetTop, a = o.offsetLeft, s = o.offsetWidth, l = o.offsetHeight, h = t[0].getElementsByClassName("word"), c = t[0].getBoundingClientRect();
          i = {
              lines: [],
              index: {
                  top: [],
                  bottom: [],
                  offset: [],
                  lineBreak: {}
              },
              height: l,
              width: s
          };
          var d, p = -1;
          function u(t, e, n) {
              d = e,
              i.lines[++p] = [],
              i.index.top[p] = d.top,
              i.index.bottom[p] = d.bottom,
              i.index.offset[p] = +t.getAttribute("data-offset"),
              n && (i.index.lineBreak[p] = !0)
          }
          return e.each(h, function(t) {
              var o = t.offsetTop - r
                , s = t.offsetLeft - a
                , l = o + t.offsetHeight
                , h = t.offsetWidth
                , g = t.offsetHeight
                , f = t.getClientRects();
              if (0 !== o || 0 !== s || 0 !== h || 0 !== g) {
                  if (f.length > 1)
                      return function(t, o) {
                          e.each(o, function(e, o) {
                              var r = {
                                  top: e.top - c.top,
                                  left: e.left - c.left,
                                  width: e.width,
                                  height: e.height,
                                  offset: +t.getAttribute("data-offset"),
                                  length: +t.getAttribute("data-length"),
                                  getSpan: n,
                                  lineBreak: !0
                              };
                              (!d || d.bottom < r.top) && u(t, {
                                  top: r.top,
                                  bottom: r.top + r.height
                              }, o > 0),
                              i.lines[p].push(r)
                          })
                      }(t, f);
                  (!d || d.bottom < o) && u(t, {
                      top: o,
                      bottom: o + g
                  }),
                  d.top > o ? d.top = o : d.bottom < l && (d.bottom = l);
                  var m = i.lines[p]
                    , v = {
                      top: o,
                      left: s,
                      width: h,
                      height: g,
                      offset: +t.getAttribute("data-offset"),
                      length: +t.getAttribute("data-length"),
                      getSpan: n
                  };
                  m.push(v)
              }
          }),
          i
      }
      var r = {
          containerAttrs: {
              class: "fake-article"
          },
          isDrawInArticle: !0
      };
      return function(n, a) {
          var s;
          a = e.defaults(a || {}, r);
          var l = i.getModel("content")
            , h = n.data("pid");
          if (a.isDrawInArticle && (s = l.pidAndLinesMap[h]))
              return s;
          var c = n.clone()
            , d = t("<div>", a.containerAttrs).addClass("build-line-info-container")
            , p = t("<div>", {
              class: "content"
          });
          return d.append(p).appendTo("body"),
          p.html(c),
          s = o(c),
          d.remove(),
          a.isDrawInArticle && (l.pidAndLinesMap[h] = s),
          s
      }
  }
  .apply(e, n)) || (t.exports = o)
}
, , , , , , function(t, e, i) {
  var n, o;
  n = [i(0), i(1), i(6), i(9), i(157)],
  void 0 === (o = function(t, e, i, n, o) {
      var r, a = t("#tmpl-paragraph").html(), s = (r = function(t) {
          return 0 === t.indexOf("<dfn splited") ? t : o(t)
      }
      ,
      n.shouldSplitToSpan() || (r = function(t) {
          return t
      }
      ),
      r), l = function(t) {
          return "illus" !== t.type && "code" !== t.type && -1 === t.klass.indexOf("pagebreak") ? s(t.text) : t.text
      };
      return function(t) {
          return e.template(a, {
              p: t,
              getParaContent: l
          })
      }
  }
  .apply(e, n)) || (t.exports = o)
}
, , , , , , , , , , , function(t, e, i) {
  var n, o;
  n = [i(0), i(2), i(1), i(131)],
  void 0 === (o = function(t, e, i, n) {
      return n.extend({
          onSubmitted: function(t) {
              "on" === t.get("add_comment") && (this.model.addCommentNum(1),
              this.model.trigger("add:comment:text", t.get("text")))
          }
      })
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(2), i(1), i(164)],
  void 0 === (o = function(t, e, i, n) {
      return n
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(2), i(1), i(166)],
  void 0 === (o = function(t, e, i, n) {
      var o = e.View.extend({
          className: "underline",
          underlineClass: "underline",
          tagClass: "",
          typeClass: "",
          initialize: function(t) {
              this.paragraphs = t.paragraphs,
              this.plotOptions = i.extend({}, this.plotOptions, t.plotOptions),
              this.pageHeight = t.pageHeight,
              this.listenTo(this.model, "change:tags", this.updateUnderlineClass)
          },
          render: function() {
              return this.lines = this.plotRange(this.model.getRanges(), this.paragraphs, this.underlineClass),
              this.updateUnderlineClass(),
              this.$el.html(this.lines),
              this
          },
          updateUnderlineClass: function() {
              this.updateTagClass(),
              this.updateTypeClass()
          },
          updateTagClass: function() {
              this.lines.removeClass(this.tagClass),
              this.tagClass = this.getTagClass(),
              this.lines.addClass(this.tagClass)
          },
          updateTypeClass: function() {
              this.lines.removeClass(this.typeClass),
              this.typeClass = this.getTypeClass(),
              this.lines.addClass(this.typeClass)
          },
          getTagClass: function() {
              return this.model.getShowTag() + "-underline"
          },
          getTypeClass: function() {
              return this.model.get("type") + "-underline"
          }
      });
      return i.extend(o.prototype, n),
      o
  }
  .apply(e, n)) || (t.exports = o)
}
, , function(t, e, i) {
  var n, o;
  n = [i(1), i(0), i(6), i(122), i(116)],
  void 0 === (o = function(t, e, i, n, o) {
      return {
          getByStamp: function(t) {
              var r, a, s, l = {
                  pagination: 0
              }, h = i.getModel("content"), c = h.findPaginations(t.pid);
              if (!c)
                  return l.error = !0,
                  l;
              if (1 === c.length)
                  l.pagination = c[0];
              else if (c.length > 1) {
                  var d = h.pidAndLinesMap[t.pid];
                  if (!d) {
                      var p = (r = t.pid,
                      a = e("<div>"),
                      s = i.getModel("content").getParagraph(r),
                      a.html(n(s)),
                      a.find("p"));
                      d = o(p)
                  }
                  var u, g = h.findParagraphOffsets(t.pid), f = c[0];
                  e.each(c, function(e, i) {
                      if (u = g[e],
                      t.offset < d.index.offset[u])
                          return !1;
                      f = i
                  }),
                  l.pagination = f
              }
              return l
          }
      }
  }
  .apply(e, n)) || (t.exports = o)
}
, , , , , , , , , , , , , , , , , , , , function(t, e, i) {
  var n, o;
  n = [i(0), i(1), i(9)],
  void 0 === (o = function(t, e, i) {
      var n = 1
        , o = 3
        , r = {
          makeWord: function(t, e, i) {
              return '<span class="word" data-length="' + i + '" data-offset="' + e + '">' + t + "</span>"
          },
          rTwoSpanEnd: /<\/span><\/span>$/
      }
        , a = ["sup", "wbr"]
        , s = ["em", "i", "del", "a"]
        , l = /mathjax-container/;
      function h(e, i) {
          for (var n, o, a, s = "", h = {}, d = e.childNodes, p = d.length, u = 0; u < p; )
              n = d[u],
              t.nodeName(n, "span") && l.test(n.className) ? (o = ((a = n.getElementsByTagName("script")[0]).textContent || t.trim(a.innerHTML)).length,
              s += r.makeWord(n.innerHTML, i, o),
              u += 1,
              i += o) : (s += (h = c(n, i)).html,
              i = h.offset,
              u++);
          return {
              html: s,
              offset: i
          }
      }
      function c(i, l) {
          var c, d, u, g, f, m = i.nodeName.toLowerCase();
          if (i.nodeType === o)
              return {
                  html: (c = new p(i,l).getResult()).html,
                  offset: c.offset
              };
          if (i.nodeType !== n)
              throw "nodetype error";
          if (-1 !== e.indexOf(a, m))
              return {
                  html: i.outerHTML,
                  offset: l
              };
          if ("code" === m) {
              var v = (i.textContent || t.trim(i.innerHTML)).length;
              return {
                  html: r.makeWord(i.outerHTML, l, v),
                  offset: l + v
              }
          }
          return -1 !== e.indexOf(s, m) ? {
              html: (d = i,
              u = (c = h(i, l)).html,
              g = d.tagName,
              f = e.toArray(d.attributes).map(function(t) {
                  return "".concat(t.name, '="').concat(e.escape(t.value), '"')
              }).join(" "),
              "<".concat(g, " ").concat(f, ">").concat(u, "</").concat(g, ">")),
              offset: c.offset
          } : void 0
      }
      var d, p = function(t, e) {
          this.contents = [],
          this.types = [],
          this.step = -1,
          this.offset = e,
          this.iterator = new u(t)
      };
      p.prototype.doIterator = (d = function() {
          this.generatorSpan()
      }
      ,
      i.hasBadChineseLineBreak() && (d = function() {
          this.detectChinesePunctuation(),
          this.generatorSpan()
      }
      ),
      d),
      p.prototype.detectChinesePunctuation = function() {
          var t = this.token.type;
          this.step < 0 && "en" !== t || (this.advanceIsWord() && this.currentIsType(["punc-not-allowed-at-end", "punc-not-allowed-start-and-end"]) && (t = "word-to-wrap-with-current"),
          this.step < 1 && this.advanceIsType("punc-not-allowed-start-and-end") || t in this.typeHandler && this.typeHandler[t].call(this))
      }
      ,
      p.prototype.typeHandler = {
          "punc-not-allowed-at-start": function() {
              this.currentIsWord() ? this.autoWbr() : this.step >= 1 && this.currentIsType(["punc-not-allowed-at-start", "punc-not-allowed-start-and-end"]) && this.currentIsWbred() && this.insertToPrevWbr()
          },
          "punc-not-allowed-start-and-end": function() {
              this.autoWbr()
          },
          en: function() {
              var t = this.token;
              t.word.length <= 1 || (t.html = (this.currentIsType("space") ? "" : "<wbr>") + t.html.replace('class="word"', 'class="en word"'))
          },
          "word-to-wrap-with-current": function() {
              this.autoWbr()
          },
          "punc-not-allowed-break": function() {
              this.currentIsType("punc-not-allowed-break") && this.autoWbr()
          }
      },
      p.prototype.currentIsWord = function() {
          return this.isWord(this.types[this.step])
      }
      ,
      p.prototype.currentIsType = function(t) {
          return this.isType(this.types[this.step], t)
      }
      ,
      p.prototype.currentIsWbred = function() {
          return r.rTwoSpanEnd.test(this.contents[this.step])
      }
      ,
      p.prototype.advanceIsWord = function() {
          return this.isWord(this.token.type)
      }
      ,
      p.prototype.advanceIsType = function(t) {
          return this.isType(this.token.type, t)
      }
      ,
      p.prototype.isType = function(t, i) {
          return e.isArray(i) ? e.contains(i, t) : i === t
      }
      ,
      p.prototype.isWord = function(t) {
          return "cjk" === t || "en" === t
      }
      ,
      p.prototype.generatorSpan = function() {
          var t = this.token;
          this.types.push(t.type),
          this.contents.push(t.html),
          this.step++
      }
      ,
      p.prototype.autoWbr = function() {
          this.currentIsType(["space", "return"]) || this[this.currentIsWbred() ? "insertToPrevWbr" : "wrapWbr"]()
      }
      ,
      p.prototype.wrapWbr = function() {
          this.contents[this.step] = '<span class="wbr">' + this.contents[this.step],
          this.token.html = this.token.html + "</span>"
      }
      ,
      p.prototype.insertToPrevWbr = function() {
          this.contents[this.step] = this.contents[this.step].slice(0, -7),
          this.token.html += "</span>"
      }
      ,
      p.prototype.getResult = function() {
          for (; this.iterator.hasNext(); ) {
              this.token = this.iterator.next();
              var t = this.token.word
                , i = t.length;
              this.token.html = r.makeWord(e.escape(t), this.offset, i),
              this.doIterator(),
              this.offset += i
          }
          return {
              html: this.contents.join(""),
              offset: this.offset
          }
      }
      ;
      var u = function(t) {
          this.node = t,
          this.current = null,
          this.value = t.nodeValue,
          this.length = t.length,
          this.index = 0
      };
      return e.extend(u.prototype, {
          rPuncNotAllowedAtStart: /[\!%\),\.:;\?\]\}¢°’”‟›℃∶、。》〕〗〞﹚﹜！％），．：；？］｝]/,
          rPuncNotAllowedAtEnd: /[$(£¥﹙﹛《〈「『〔〖〝＄（．［｛￡￥]/,
          rPuncNotAllowedBreak: /[—…‥]/,
          rPuncNotAllowedStartAndEnd: /[“”‘’'"]/,
          hasNext: function() {
              return this.index < this.length
          },
          next: function() {
              var t = this.getWholeWord()
                , e = t[0]
                , i = t[1];
              return this.index += e.length,
              this.current = {
                  word: e,
                  type: i
              },
              this.current
          }
      }),
      u.prototype.isEnWord = function(t) {
          return t >= 33 && t <= 591
      }
      ,
      u.prototype.getWholeWord = function() {
          var t = this.value
            , e = this.index
            , i = t.charCodeAt(e)
            , n = t.charAt(e)
            , o = "";
          if (isNaN(i))
              return [];
          if (32 === i) {
              do {
                  o += t.charAt(e++)
              } while (32 === t.charCodeAt(e));return [o, "space"]
          }
          if (10 === i)
              return [n, "return"];
          if (this.rPuncNotAllowedStartAndEnd.test(n))
              return [n, "punc-not-allowed-start-and-end"];
          if (this.rPuncNotAllowedAtStart.test(n))
              return [n, "punc-not-allowed-at-start"];
          if (this.rPuncNotAllowedAtEnd.test(n))
              return [n, "punc-not-allowed-at-end"];
          if (this.rPuncNotAllowedBreak.test(n))
              return [n, "punc-not-allowed-break"];
          if (this.isEnWord(i, n)) {
              var r = i
                , a = n;
              do {
                  o += a,
                  a = t.charAt(++e),
                  r = t.charCodeAt(e)
              } while (this.isEnWord(r, a));return [o, "en"]
          }
          if (i < 55296 || i > 57343)
              return [n, "cjk"];
          if (55296 <= i && i <= 56319) {
              if (t.length <= e + 1)
                  throw "High surrogate without following low surrogate";
              var s = t.charCodeAt(e + 1);
              if (56320 > s || s > 57343)
                  throw "High surrogate without following low surrogate";
              return [n + t.charAt(e + 1), "cjk"]
          }
          if (0 === e)
              throw "Low surrogate without preceding high surrogate";
          var l = t.charCodeAt(e - 1);
          if (55296 > l || l > 56319)
              throw "Low surrogate without preceding high surrogate";
          return []
      }
      ,
      function(e) {
          var i = t(e)[0];
          return i.hasAttribute("splited") ? i.outerHTML : "<dfn splited>" + h(i, 0).html + "</dfn>"
      }
  }
  .apply(e, n)) || (t.exports = o)
}
, , function(t, e, i) {
  var n, o;
  function r(t, e, i) {
      return e in t ? Object.defineProperty(t, e, {
          value: i,
          enumerable: !0,
          configurable: !0,
          writable: !0
      }) : t[e] = i,
      t
  }
  n = [i(0), i(1), i(12)],
  void 0 === (o = function(t, e, i) {
      function n(t, e, i, n) {
          return i / n > t / e ? function(t, e, i, n) {
              return {
                  height: n * t / i,
                  width: t
              }
          }
          .apply(this, arguments) : function(t, e, i, n) {
              return {
                  height: e,
                  width: i * e / n
              }
          }
          .apply(this, arguments)
      }
      var o = {
          H: "large",
          M: "small",
          S: "tiny"
      }
        , a = ["large", "small", "tiny", "orig"];
      return {
          fitBox: n,
          resizeIllus: function(t, s) {
              s = s || {};
              var l, h = t.data, c = function(t) {
                  var n = t.dimension
                    , r = t.size
                    , s = t.layout;
                  if (i.isRetina && "C" === s)
                      return r.orig;
                  var l = o[n];
                  return r[l = function(t, i) {
                      for (; !(t in i); ) {
                          var n = e.indexOf(a, t);
                          if (!(t = a[n + 1]))
                              return
                      }
                      return t
                  }(l, r)]
              }(h), d = c.width, p = c.height, u = s.maxWidth || d, g = s.maxHeight || p;
              (p > g || d > u) && (l = n(u, g, d, p)),
              h.renderSize = function(t) {
                  for (var e = 1; e < arguments.length; e++) {
                      var i = null != arguments[e] ? arguments[e] : {}
                        , n = Object.keys(i);
                      "function" == typeof Object.getOwnPropertySymbols && (n = n.concat(Object.getOwnPropertySymbols(i).filter(function(t) {
                          return Object.getOwnPropertyDescriptor(i, t).enumerable
                      }))),
                      n.forEach(function(e) {
                          r(t, e, i[e])
                      })
                  }
                  return t
              }({}, c, l)
          },
          resizeIllusElem: function(t, e) {
              e = e || {};
              var i, o = t.find(".illus-outer img"), r = o.width() || +o.attr("width"), a = o.height() || +o.attr("height"), s = o.data("orig-width"), l = o.data("orig-height"), h = t.outerWidth(!0), c = t.outerHeight(!0);
              i = n((e.maxWidth || h) - (h - r), (e.maxHeight || c) - (c - a), s, l),
              o.height(i.height).width(i.width)
          },
          isLegendEmpty: function(t) {
              return !t || 0 === t.length || 1 === t.length && t[0].data && 0 === t[0].data.text.length
          }
      }
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n = i(0)
    , o = i(1)
    , r = i(260)
    , a = i(31)
    , s = document.queryCommandSupported && document.queryCommandSupported("copy")
    , l = n(window);
  t.exports = function(t, e, i) {
      if (window.clipboardData)
          t.on("click", function() {
              var t = e()
                , n = window.clipboardData.setData("TEXT", t);
              a.toast(n ? "内容已成功复制到剪贴板" : "复制失败，浏览器禁止了复制"),
              i && i()
          });
      else {
          if (!s) {
              var h = r(t);
              return h.on("ready", function() {
                  h.on("copy", function() {
                      var t = e();
                      h.setText(t)
                  }).on("aftercopy", function() {
                      a.toast("内容已成功复制到剪贴板"),
                      h.destroy(),
                      i && i()
                  })
              }).on("error", function(n) {
                  t.on("click", function() {
                      var t = e()
                        , o = "出现了奇怪的错误";
                      "flash-disabled" === n.name ? o = "当前浏览器需要安装并启用 Flash 才能使用复制功能，请尝试安装 Flash 或换用其他现代浏览器" : window.console.error(n),
                      prompt(o, t),
                      h.destroy(),
                      i && i()
                  })
              }),
              t
          }
          t.on("click", function() {
              var t = e()
                , r = n("<textarea>").val(t).css({
                  position: "absolute",
                  left: -99999,
                  top: l.scrollTop() + 10
              });
              r.appendTo(document.body),
              r.focus().select(),
              (s = document.execCommand("copy")) && a.toast("内容已成功复制到剪贴板"),
              o.defer(function() {
                  r.remove()
              }),
              i && i()
          })
      }
  }
}
, function(t, e, i) {
  var n, o, r;
  /*!
* $script.js JS loader & dependency manager
* https://github.com/ded/script.js
* (c) Dustin Diaz 2014 | License MIT
*/
  /*!
* $script.js JS loader & dependency manager
* https://github.com/ded/script.js
* (c) Dustin Diaz 2014 | License MIT
*/
  r = function() {
      var t, e, i = document, n = i.getElementsByTagName("head")[0], o = !1, r = "push", a = "readyState", s = "onreadystatechange", l = {}, h = {}, c = {}, d = {};
      function p(t, e) {
          for (var i = 0, n = t.length; i < n; ++i)
              if (!e(t[i]))
                  return o;
          return 1
      }
      function u(t, e) {
          p(t, function(t) {
              return e(t),
              1
          })
      }
      function g(e, i, n) {
          e = e[r] ? e : [e];
          var o = i && i.call
            , a = o ? i : n
            , s = o ? e.join("") : i
            , m = e.length;
          function v(t) {
              return t.call ? t() : l[t]
          }
          function y() {
              if (!--m)
                  for (var t in l[s] = 1,
                  a && a(),
                  c)
                      p(t.split("|"), v) && !u(c[t], v) && (c[t] = [])
          }
          return setTimeout(function() {
              u(e, function e(i, n) {
                  return null === i ? y() : (n || /^https?:\/\//.test(i) || !t || (i = -1 === i.indexOf(".js") ? t + i + ".js" : t + i),
                  d[i] ? (s && (h[s] = 1),
                  2 == d[i] ? y() : setTimeout(function() {
                      e(i, !0)
                  }, 0)) : (d[i] = 1,
                  s && (h[s] = 1),
                  void f(i, y)))
              })
          }, 0),
          g
      }
      function f(t, o) {
          var r, l = i.createElement("script");
          l.onload = l.onerror = l[s] = function() {
              l[a] && !/^c|loade/.test(l[a]) || r || (l.onload = l[s] = null,
              r = 1,
              d[t] = 2,
              o())
          }
          ,
          l.async = 1,
          l.src = e ? t + (-1 === t.indexOf("?") ? "?" : "&") + e : t,
          n.insertBefore(l, n.lastChild)
      }
      return g.get = f,
      g.order = function(t, e, i) {
          !function n(o) {
              o = t.shift(),
              t.length ? g(o, n) : g(o, e, i)
          }()
      }
      ,
      g.path = function(e) {
          t = e
      }
      ,
      g.urlArgs = function(t) {
          e = t
      }
      ,
      g.ready = function(t, e, i) {
          t = t[r] ? t : [t];
          var n, o = [];
          return !u(t, function(t) {
              l[t] || o[r](t)
          }) && p(t, function(t) {
              return l[t]
          }) ? e() : (n = t.join("|"),
          c[n] = c[n] || [],
          c[n][r](e),
          i && i(o)),
          g
      }
      ,
      g.done = function(t) {
          g([null], t)
      }
      ,
      g
  }
  ,
  t.exports ? t.exports = r() : void 0 === (o = "function" == typeof (n = r) ? n.call(e, i, e, t) : n) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(2), i(1), i(6), i(123), i(270), i(133), i(271), i(272)],
  void 0 === (o = function(t, e, i, n, o, r, a, s, l) {
      var h = e.View.extend({
          className: "action-list",
          tagName: "ul",
          tmplButton: i.template('<li class="action-{{=klass}}"><button class="{{=klass}}">{{=name}}</button>'),
          annotationBtns: ["underline", "note"],
          btns: {
              underline: "划线",
              del: "取消划线",
              note: "批注",
              sharing: "分享",
              debug: "纠错",
              copy: "复制",
              open: "打开",
              translate: "翻译"
          },
          events: {
              "click .underline": "underline",
              "click .note": "note",
              "click .debug": "debug",
              "click .sharing": "sharing",
              "click .del": "del",
              "click .open": "open",
              "click .translate": "translate"
          },
          initialize: function(t) {
              this.btnList = this.filterBtns(t.btnList),
              this.container = t.container
          },
          render: function() {
              var t = this.tmplButton
                , e = this.btns
                , n = this;
              return i.each(this.btnList, function(i) {
                  n.$el.append(t({
                      klass: i,
                      name: e[i]
                  }))
              }),
              this.createCopyBtn(),
              this
          },
          filterBtns: function(t) {
              var e = this
                , i = n.getModel("config").shouldDisableAnnotation();
              return t.filter(function(t) {
                  return "open" === t ? e.model.plainTextIsUrl() : "translate" === t ? e.model.plainTextIsEnglish() : !i || !e.annotationBtns.includes(t)
              })
          },
          underline: t.noop,
          del: t.noop,
          sharing: function() {
              this.createFormInTip(a, {
                  model: this.model,
                  isNote: this.model.isNote(),
                  url: "/j/share/rec_works_piece",
                  extraParam: {
                      annotation: JSON.stringify(this.model.toJSON()),
                      works_id: this.model.articleId
                  }
              })
          },
          debug: function() {
              this.createFormInTip(r, {
                  model: this.model
              })
          },
          open: function() {
              var e = t.trim(this.model.getTextFromRanges({
                  getFull: !0
              }));
              window.open(e)
          },
          translate: function() {
              this.createFormInTip(s, {
                  text: t.trim(this.model.getTextFromRanges())
              })
          },
          note: t.noop,
          createFormInTip: function(t, e, n) {
              n || (n = {});
              var r = o(this.container, t, e, {
                  autoClose: !0
              })
                , a = r.promise;
              return n.done && a.done(n.done),
              a.always(i.bind(this.clear, this)),
              this.remove(),
              r
          },
          clear: function() {
              this.container.hide()
          }
      });
      return i.extend(h.prototype, l),
      h
  }
  .apply(e, n)) || (t.exports = o)
}
, , , function(t, e, i) {
  var n, o;
  n = [i(0), i(2), i(1), i(3), i(135), i(278), i(15)],
  void 0 === (o = function(t, e, i, n, o, r, a) {
      var s = n.me.isAnonymous ? {
          setMarkingTips: function() {
              a()
          }
      } : {}
        , l = o.extend({
          events: {
              click: "clickOnLine",
              mousedown: "fireMouseDownUnderMark"
          },
          initialize: function(t) {
              this.paragraphs = t.paragraphs,
              this.markingTips = t.markingTips,
              this.pageHeight = t.pageHeight,
              this.listenTo(this.model, "change", this.render)
          },
          fireMouseDownUnderMark: function(t) {
              this.$el.hide(),
              this.fireMouseEvent(document.elementFromPoint(t.clientX, t.clientY), t),
              this.$el.show()
          },
          fireMouseEvent: function(t, e) {
              var i, n = t;
              document.createEvent ? ((i = document.createEvent("MouseEvents")).initMouseEvent(e.type, !0, !0, window, e.detail, e.screenX, e.screenY, e.clientX, e.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, e.button, null),
              n.dispatchEvent(i)) : document.createEventObject && (i = document.createEventObject(),
              n.fireEvent("on" + e.type, i))
          },
          clickOnLine: function(e) {
              e.stopPropagation();
              var i = t(e.target)
                , n = this.markingTips;
              this.setMarkingTips({
                  left: e.pageX,
                  top: n.getOffsetWithin(i).top,
                  width: 0,
                  height: 18
              }, ["del", "note", "sharing", "copy", "debug", "open", "translate"])
          },
          setMarkingTips: function(t, e) {
              var i = new r({
                  model: this.model,
                  btnList: e,
                  container: this.markingTips
              });
              this.markingTips.set({
                  target: t,
                  className: "btns-tip",
                  content: i.render().el,
                  arrowHeight: 5
              }).show()
          }
      });
      return i.extend(l.prototype, s),
      l
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(2), i(1), i(6), i(105), i(116), i(167)],
  void 0 === (o = function(t, e, i, n, o, r, a) {
      var s = o.allowSelectionParagraphSelector;
      return {
          plotOptions: {
              containerAttrs: {
                  class: "fake-article"
              },
              isDrawInArticle: !0
          },
          plotRange: function(e, n, o) {
              var r = t();
              return i.each(e, function(e, i) {
                  if (i in n) {
                      var a = this.paragraphs[i];
                      if (!t.trim(a.text()).length || !a.is(s))
                          return;
                      var l = this.plotPara(a, e.start, e.end, o);
                      r = r.add(l)
                  }
              }, this),
              r
          },
          plotPara: function(t, e, n, o) {
              e = e || 0;
              for (var s, l = r(t, this.plotOptions), h = [], c = l.index.offset, d = 0, p = c[d + 1]; !i.isUndefined(p) && p <= e; ) {
                  if (d += 1,
                  e === p) {
                      l.index.lineBreak[d] && h.push(d - 1);
                      break
                  }
                  p = c[d + 1]
              }
              do {
                  h.push(d),
                  p = c[++d]
              } while (!i.isUndefined(p) && (n >= p || !isFinite(n)));var u = {};
              u[h[0]] = {
                  start: e
              };
              var g = h[h.length - 1];
              return u[g] = i.extend(u[g] || {}, {
                  end: n
              }),
              i.each(h, function(r) {
                  var h, c, d = l.lines[r], p = u[r];
                  p && (i.isUndefined(p.start) || (h = a(d, e, !0)),
                  i.isUndefined(p.end) || (c = a(d, n)));
                  var g = this.plotLine(t, d, o, h, c);
                  s = s ? s.add(g) : g
              }, this),
              s
          },
          plotLine: function(t, e, n, o, r) {
              o || (o = i.first(e)),
              r || (r = i.last(e));
              var a = o.top + t[0].offsetTop
                , s = o.height
                , l = o.left
                , h = r.left + r.width - l;
              return this.drawBox(a, l, s, h).addClass(n)
          },
          drawBox: function(e, i, n, o) {
              return this.plotOptions.isDrawInArticle && (e < 0 || e + n > this.pageHeight) ? t() : t("<div></div>", {
                  class: "marking",
                  css: {
                      top: e,
                      left: i + 1,
                      height: n,
                      width: o - 1
                  }
              })
          }
      }
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n;
  void 0 === (n = function() {
      return function(t, e, i) {
          for (var n, o, r = 0, a = t.length; r < a; ++r)
              if (n = (o = t[r]).offset,
              i || (n += o.length - 1),
              n >= e)
                  return t[r];
          return null
      }
  }
  .apply(e, [])) || (t.exports = n)
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(2), i(1), i(3), i(123), i(34), i(134), i(133)],
  void 0 === (o = function(t, e, i, n, o, r, a, s) {
      var l = {
          _getNoteModel: t.noop,
          _setTarget: !1,
          favoriteNote: function(t) {
              t.preventDefault();
              var e = this._getNoteModel()
                , i = e.isFavorited();
              e.isFavoriting || e.editFavorite(!i)
          },
          shareNote: function(e) {
              e.preventDefault();
              var i = this._getNoteModel();
              this._setTarget && this.noteTip.set({
                  target: t(e.currentTarget)
              }),
              o(this.noteTip, s, {
                  model: i,
                  isNote: i.isNote(),
                  url: "/j/share/rec_annotation",
                  extraParam: {
                      annotation_id: i.get("id"),
                      works_id: i.articleId
                  }
              }, {
                  autoClose: !0
              })
          },
          editNote: function(e) {
              e.preventDefault();
              var i = this._getNoteModel();
              this._setTarget && this.noteTip.set({
                  target: t(e.currentTarget)
              }),
              o(this.noteTip, a, {
                  model: i,
                  type: "edit",
                  content: i.get("note")
              }, {
                  autoClose: !0
              }).promise.done(function(t) {
                  i.set({
                      note: t.get("text"),
                      visible_private: t.get("visible_private")
                  })
              })
          },
          deleteNote: function(t) {
              return t.preventDefault(),
              !!confirm("真的要删除这条批注吗？") && (this.noteTip.hide(),
              this._getNoteModel().destroy(),
              !0)
          }
      }
        , h = function(t) {
          t.preventDefault();
          var e = {
              page: {
                  actions: {
                      stamp: this._getNoteModel().getStamp()
                  }
              }
          };
          r.openLoginAndSignup(e[this.loginRedirectType])
      }
        , c = {};
      return n.me.isAnonymous && i.each(["favoriteNote", "shareNote", "replyNote"], function(t) {
          c[t] = h
      }),
      i.extend(l, c),
      l
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(2), i(1), i(288)],
  void 0 === (o = function(t, e, i, n) {
      return {
          createContentContainer: function(e) {
              var i = this.contentContainer = new n({
                  height: t(window).height() - 40
              });
              this.sideSection.append(i.render().el),
              i.renderContent(e)
          }
      }
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  function r(t) {
      for (var e = 1; e < arguments.length; e++) {
          var i = null != arguments[e] ? arguments[e] : {}
            , n = Object.keys(i);
          "function" == typeof Object.getOwnPropertySymbols && (n = n.concat(Object.getOwnPropertySymbols(i).filter(function(t) {
              return Object.getOwnPropertyDescriptor(i, t).enumerable
          }))),
          n.forEach(function(e) {
              a(t, e, i[e])
          })
      }
      return t
  }
  function a(t, e, i) {
      return e in t ? Object.defineProperty(t, e, {
          value: i,
          enumerable: !0,
          configurable: !0,
          writable: !0
      }) : t[e] = i,
      t
  }
  n = [i(0), i(2), i(1), i(3), i(107), i(291)],
  void 0 === (o = function(t, e, i, n, o, a) {
      return a.extend({
          className: "annotation-comments-panel",
          tmplForm: t("#tmpl-annotation-comments-form").html(),
          events: {
              "submit .comment-form": "submitComment"
          },
          initialize: function(e) {
              var s = this;
              this.markingModel = e.markingModel,
              e.commentsUrl = "/j/annotation/".concat(this.markingModel.id, "/comment/"),
              a.prototype.initialize.call(this, e),
              i.bindAll(this, "updateListHeight"),
              this.listenTo(this.comments, "add remove", function(t, e) {
                  this.markingModel.setCommentsNum(e.length)
              }),
              this.comments.model = this.comments.model.extend({
                  parse: function(t) {
                      return r({}, t, {
                          author: r({}, t.author, {
                              userId: t.author.user_id,
                              isArticleAuthor: s.commentTargetInfo && s.commentTargetInfo.article && s.commentTargetInfo.article.authorId === t.author.user_id
                          }),
                          targetId: t.annotation_id
                      })
                  }
              }),
              this.listenTo(this.markingModel, "add:comment:text", function(t) {
                  this.comments.add(new this.comments.model({
                      text: t,
                      targetId: this.markingModel.id,
                      state: {},
                      author: {
                          userId: n.me.id,
                          name: n.me.name,
                          avatar: n.me.avatar,
                          url: n.me.profileURL,
                          isArticleAuthor: e.commentTargetInfo && e.commentTargetInfo.article && e.commentTargetInfo.article.authorId === n.me.id
                      },
                      time: o(i.now())
                  }))
              }),
              t(window).on("resize.annotationComments", i.throttle(this.updateListHeight, 200))
          },
          updateListHeight: function() {
              var e = this.getFormHeight()
                , i = this.commentsList[0].getBoundingClientRect().top
                , n = t(window).height();
              this.commentsList.css("max-height", n - i - e)
          },
          remove: function() {
              t(window).off("resize.annotationComments"),
              a.prototype.remove.call(this)
          }
      })
  }
  .apply(e, n)) || (t.exports = o)
}
, , , function(t, e, i) {
  var n, o;
  n = [i(1), i(0), i(6), i(174)],
  void 0 === (o = function(t, e, i, n) {
      return function(e) {
          e = e || i.getModel("turning").get("currPage");
          var o = i.getModel("content")
            , r = n(e)
            , a = r.pid || 0
            , s = r.offset || 0
            , l = function(e) {
              var n = i.getModel("content")
                , o = {
                  partIndex: 0,
                  parasIndex: 0
              }
                , r = n.getPartPidsArray();
              return t.each(r, function(i, n) {
                  var r = t.indexOf(i, e);
                  -1 !== r && (o = {
                      partIndex: n,
                      parasIndex: r
                  })
              }),
              o
          }(a)
            , h = l.partIndex;
          return a || (h = t.indexOf(o.getTocPageNumbers(), e)),
          {
              paragraph_id: a,
              paragraph_offset: s,
              part_sequence: h,
              part_paragraph_sequence: l.parasIndex
          }
      }
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(1), i(0), i(6), i(112), i(116)],
  void 0 === (o = function(t, e, i, n, o) {
      return function(t) {
          var r = i.getModel("content")
            , a = r.body[t - 1]
            , s = new n({
              pid: null,
              offset: 0
          });
          if (a.stamp)
              return a.stamp;
          var l = a.paragraphs;
          if (!(l && l.length && l[0] && l[0].pid))
              throw new Error("NoParagraph");
          var h = l[0];
          s.pid = h.pid;
          var c = e("[data-pagination=" + t + "]")
            , d = !!c.length;
          if (d && r.isPara(h)) {
              var p = r.findStampOffset(s.pid, t);
              if (!p)
                  return s;
              var u = c.find("p[data-pid=" + s.pid + "]")
                , g = o(u).index.offset[p];
              s.offset = g
          }
          return d && (a.stamp = s),
          s
      }
  }
  .apply(e, n)) || (t.exports = o)
}
, , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , function(t, e, i) {
  var n, o;
  n = [i(0), i(1), i(2), i(6), i(226), i(9), i(227), i(229), i(231), i(232), i(105)],
  void 0 === (o = function(t, e, n, o, r, a, s, l, h, c, d) {
      var p, u = 44, g = 39, f = 24, m = 24, v = document.body, y = t(v), b = v.clientWidth, w = window.innerHeight || v.clientWidth, x = a.fitForMobile(), P = 19, T = 32, k = w - u - g, C = b - f - m, M = (p = k,
      Math.round(parseInt(p, 10) / T) * T), S = null, A = !1;
      return function(p) {
          if (a.hasTouch()) {
              t('<style id="slider-thumb">').appendTo("head");
              var I, N = p.ebook, E = N.canvas, O = N.panel, D = N.article, _ = N.pagination, L = N.controlsPanel, z = E.$(".aside-controls"), H = _.pagePortal, $ = N.config, F = o.getModel("turning"), j = t("#slider-thumb");
              o.mobileVent = e.extend({}, n.Events),
              e.defer(function() {
                  a.isFontResized() && (r.isWechat ? new r({
                      text: "当前字体大小不是默认设置，可能使阅读器无法正常显示。点击右上角按钮，选择“调整字体”，可将字体调整为默认大小"
                  }).openGuide() : alert("当前字体大小不是默认设置，可能使阅读器无法正常显示。请尝试修改字体大小"))
              }),
              o.mobileVent.on("turnPage", function(t) {
                  "vertical" !== $.get("layout") && _.pageTurning(t, {
                      fromMobileTap: !0
                  })
              }).on("hideToolbar", B).on("toggleToolbar", function() {
                  return R(!A)
              }),
              E.$el.on("drag", ".inner", function(t) {
                  t.originalEvent.gesture.distance < 10 || function(t) {
                      if ("vertical" !== $.get("layout"))
                          switch (t) {
                          case "left":
                          case "right":
                              _[{
                                  left: "pageNext",
                                  right: "pagePrev"
                              }[t]].trigger("tap")
                          }
                  }(t.originalEvent.gesture.direction)
              }).on("drag", ".inner", function() {
                  D.tinyTips && D.tinyTips.destroy()
              }),
              y.on("touchstart", "#freeze-canvas-mask", function(t) {
                  t.preventDefault()
              }),
              E.$el.on("touchmove", function(t) {
                  "range" !== t.target.type && "vertical" !== $.get("layout") && t.preventDefault()
              }),
              x && (a.isWeixin() && i.e(8).then(function() {
                  var t = [i(386)];
                  (function() {}
                  ).apply(null, t)
              }).catch(i.oe),
              E.$el.on("drag", ".inner", B),
              O.remove(),
              function() {
                  if (!t("#page-style").length) {
                      var e = {
                          width: C + "px",
                          contentHeight: M + "px",
                          height: k + "px"
                      }
                        , i = "\n        .page.page {\n          width: ".concat(e.width, "; height: ").concat(e.height, ";\n          padding: ").concat(u, "px ").concat(m, "px ").concat(g, "px ").concat(f, "px;\n        }\n        .page.page .bd { height: ").concat(e.contentHeight, "}\n        .page.page .hd, .page.page .ft { width: ").concat(e.width, "}\n      ");
                      t("<style>", {
                          id: "page-style",
                          text: i
                      }).appendTo("head")
                  }
              }(),
              E.once("view:rendered", function() {
                  var i, n;
                  (n = ($.get("isChapter") ? L.chaptersTocView : L.tocView).$el).css({
                      height: w + "px"
                  }).appendTo(".article"),
                  n.on("action:expand", function() {
                      S && S.refresh()
                  }).on("tap", ".close", function() {
                      e.defer(function() {
                          B(),
                          L.switcher.hideAll()
                      })
                  }).on("tap", ".toc-item", function() {
                      e.defer(B)
                  }),
                  H.$el.on(a.isIOS ? "change" : "release", ".page-input", function(e) {
                      clearTimeout(i),
                      i = setTimeout(function() {
                          var i = 0 | t(e.currentTarget).val();
                          F.setCurrPage(i)
                      }, 200)
                  });
                  var o = t("<input>", {
                      class: "page-input",
                      type: "range",
                      step: 1,
                      min: 1
                  }).on("input", function() {
                      this.style.backgroundSize = "".concat((this.value - this.min) / (+this.max - this.min) * 100, "% 100%")
                  });
                  H.formInput.replaceWith(o)
              }),
              D.once("view:render", function() {
                  var e, i;
                  D.$el.css({
                      height: w + "px"
                  }).find(".inner").css({
                      width: 3 * b + "px"
                  }),
                  D.lineHeight = T,
                  D.pageHeight = M,
                  D.pageWidth = C,
                  new l({
                      el: D.$el,
                      getIsToolbarsShown: function() {
                          return A
                      }
                  }),
                  $.set({
                      pageWidth: b,
                      fontSize: P,
                      lineHeight: T
                  }),
                  a.hasOrientationEvent() && t(window).on("orientationchange", function() {
                      location.replace(location.href)
                  }),
                  e = L.$(".controls-ark-salon"),
                  (i = o.router.getReviewsUrl()) || e.hide(),
                  e.find("a").attr("href", i)
              }),
              D.progressManager.on("progress:confirmed", function() {
                  V(F.get("currPage"))
              }),
              o.vent.on("render:panel", function() {
                  I = new h,
                  E.$el.prepend(I.render().el)
              }).on("paging:finish", function() {
                  v.scrollTop = 0
              }).on("canvas:shown", function() {
                  B()
              }).on("reader:ready", function() {
                  var t = o.getModel("article").get("metaData")
                    , i = t.categories
                    , n = t.categoryRoot
                    , r = null;
                  n && n.id === d.rootKinds.ORIGIN_WORKS && (r = i[0]);
                  var a = new s({
                      closeable: !0,
                      kind: r
                  });
                  z.after(a.render().el),
                  e.delay(function() {
                      return a.show()
                  }, 800)
              }),
              F.on("change:currPage", function(t, e) {
                  V(e)
              }),
              L.on("list:render", function() {
                  var t = $.get("isChapter") ? L.chaptersToc : L.toc
                    , e = t.find(".hd")
                    , i = t.find(".bd")
                    , n = t.find(".ft")
                    , o = e.outerHeight() + n.innerHeight();
                  i.height(this.body.height() - o + "px"),
                  i.length && (S = new c(i[0],{
                      click: !0,
                      tap: !1
                  }),
                  t.on("collapse:expanded", function() {
                      S.scrollToElement(".is-current")
                  }))
              }))
          }
          function B() {
              R(!1)
          }
          function R(t) {
              y.toggleClass("is-toolbars-shown", t),
              A = t
          }
          function V(t) {
              var e = F.get("totalPage");
              _.pageForm.show(),
              _.$el.find(".page-input").prop({
                  max: e,
                  value: t
              }).trigger("input"),
              j.html('.page-jump .page-input::-webkit-slider-thumb:after{content:"' + _.$el.find(".progress-num").text() + '"}')
          }
      }
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  (function(n) {
      var o;
      void 0 === (o = function() {
          var t = /MicroMessenger/.test(navigator.userAgent)
            , e = n(document)
            , i = n(document.body);
          function o(i) {
              if (t) {
                  var o = n("#tmpl-wechat-guide").html();
                  this.guide = n(o.replace("{{text}}", i.text)),
                  i.selector && e.on("click", i.selector, this.open.bind(this)),
                  e.on("touchend click", ".wechat-guide", this.close.bind(this))
              }
          }
          return n.extend(o.prototype, {
              open: function(t) {
                  t.preventDefault(),
                  this.openGuide()
              },
              close: function(t) {
                  t.preventDefault(),
                  this.closeGuide()
              },
              openGuide: function() {
                  i.append(this.guide)
              },
              closeGuide: function() {
                  this.guide.remove()
              }
          }),
          o.isWechat = t,
          o
      }
      .call(e, i, e, t)) || (t.exports = o)
  }
  ).call(this, i(0))
}
, function(t, e, i) {
  (function(e) {
      var n = i(228)
        , o = i(12)
        , r = '<span>TEXT</span><i class="sep"></i><i class="close"></i>'
        , a = "<span>TEXT</span>"
        , s = o.isFrodo()
        , l = ["打开豆瓣阅读，看免费连载", "打开豆瓣阅读，离线阅读，省流量", "打开豆瓣阅读，和更多书友互动", "去豆瓣阅读，优惠送不停"]
        , h = ["免费连载，下载 App 开读", "下载 App，新用户送书送券", "省流量，下载 App 离线阅读", "下载 App，和更多书友互动", "下载 App 阅读，随时同步进度", "下载 App 阅读，优惠送不停"]
        , c = function(t) {
          return "更多".concat(t.name, s ? "，打开豆瓣阅读免费看" : "，下载 App 免费看")
      }
        , d = function(t) {
          var e = (s ? l : h).concat(t ? [c(t)] : []);
          return e[Math.floor(Math.random() * e.length)]
      };
      function p(t) {
          var i = t.closeable
            , n = void 0 !== i && i
            , o = t.autoShow
            , s = void 0 !== o && o
            , l = t.kind;
          this.text = d(l),
          this.tmpl = n ? r : a,
          this.autoShow = s,
          this.el = e("<div>", {
              class: "open-in-app"
          }),
          this.el.on("click", "span", this.openInApp.bind(this)).on("click", ".close", this.clickToRemove.bind(this))
      }
      var u = p.prototype;
      u.render = function() {
          return this.el.html(this.tmpl.replace("TEXT", this.text)),
          this.autoShow && setTimeout(this.show.bind(this), 800),
          this
      }
      ,
      u.openInApp = function() {
          n(location.href)
      }
      ,
      u.clickToRemove = function() {
          this.el.remove()
      }
      ,
      u.show = function() {
          return this.el.addClass("is-visible"),
          this
      }
      ,
      t.exports = p
  }
  ).call(this, i(0))
}
, function(t, e, i) {
  var n = i(12)
    , o = i(22)
    , r = location.origin;
  t.exports = function(t) {
      if (n.isIOS || n.isAndroid) {
          var e = "https://ark-oia.douban.com" + o.getRelativeUrl(t, r);
          location.href = e
      } else
          alert("抱歉！未能识别当前系统，请自行打开豆瓣阅读 App。")
  }
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(1), i(2), i(6), i(230)],
  void 0 === (o = function(t, e, i, n, o) {
      function r(t, e) {
          for (var i = t[0], n = t[1], o = !1, r = 0, a = e.length - 1; r < e.length; a = r++) {
              var s = e[r][0]
                , l = e[r][1]
                , h = e[a][0]
                , c = e[a][1];
              l > n != c > n && i < (h - s) * (n - l) / (c - l) + s && (o = !o)
          }
          return o
      }
      var a = t(window).height()
        , s = t(window).width()
        , l = s / 3
        , h = [[0, 0], [0, a], [l, a], [l, 0]]
        , c = [[2 * l, 0], [2 * l, a], [s, a], [s, 0]];
      return i.View.extend({
          events: {
              "tap .page": "fasttap"
          },
          initialize: function(t) {
              var e = t.getIsToolbarsShown;
              this.getIsToolbarsShown = e,
              this.$el.on("tap", ".page img", o.openImageView)
          },
          fasttap: function(i) {
              var o = i.originalEvent.gesture.srcEvent;
              if (!(o.distance && o.distance > 15 || o.ignoreTap || t(i.target).closest("sup, a, input, textarea, button, img, form").length || t(".tips-outer").is(":visible"))) {
                  if (this.getIsToolbarsShown())
                      return n.mobileVent.trigger("hideToolbar");
                  var a = i.originalEvent.gesture.srcEvent
                    , s = e.isUndefined(a.changedTouches) ? [a] : a.changedTouches
                    , l = s.length && s[0]
                    , d = [l.clientX, l.clientY];
                  r(d, h) ? n.mobileVent.trigger("turnPage", !0) : r(d, c) ? n.mobileVent.trigger("turnPage", !1) : n.mobileVent.trigger("toggleToolbar")
              }
          }
      })
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(1), i(2), i(9), i(8)],
  void 0 === (o = function(t, e, i, n, o) {
      var r = window.innerHeight
        , a = Math.max(window.innerWidth, document.body.clientWidth)
        , s = t("body")
        , l = t(document)
        , h = e.memoize(function() {
          return void 0 !== document.createElement("div").style.webkitAnimation
      })
        , c = t.zepto ? e.identity : function(t) {
          return t.originalEvent
      }
      ;
      function d(i) {
          this.imageSource = i.origImage;
          var n = a
            , o = i.origWidth / i.origHeight;
          this.imageWidth = Math.min(i.origWidth, n),
          this.imageHeight = this.imageWidth / o,
          this.doubleZoomOrg = 1,
          this.el = document.createElement(this.tagName),
          this.$el = t(this.el),
          e.each(this.events, function(t, e) {
              this.$el.on(e, this[t].bind(this))
          }, this)
      }
      return e.extend(d.prototype, i.Events, {
          tagName: "img",
          events: {
              doubletap: "doubleTap",
              tap: "tap",
              touch: "touch",
              drag: "drag",
              release: "release"
          },
          getAspect: function() {
              return {
                  width: this.imageWidth,
                  height: this.imageHeight
              }
          },
          onLoaded: function(t) {
              this.el.onload = t
          },
          render: function() {
              return this.$el.css(this.getAspect()).attr("src", this.imageSource),
              n.hasPinchZoom() && this.$el.on("transform", e.bind(this.pinch, this)),
              this.zoom = 1,
              this
          },
          transform: function(i, n, o, r) {
              var a = "scale(" + n + ")";
              e.isUndefined(o) || (a += " translate3d(" + o + "px," + r + "px, 0)");
              var s = {
                  transform: a,
                  transition: i
              };
              t.zepto && t.fx.cssPrefix && (s[t.fx.cssPrefix + "transform"] = a),
              this.$el.css(s)
          },
          touch: function(t) {
              var e = c(t).gesture.srcEvent
                , i = e && e.touches;
              e.preventDefault(),
              this.isDoubleZoom = !1,
              i && i.length >= 2 && (this.isDoubleZoom = !0,
              this.doubleZoomOrg = this.zoom),
              this.xy = this.xy || [0, 0]
          },
          getScale: function() {
              return this.el.naturalWidth / this.el.clientWidth
          },
          doubleTap: function(t) {
              if (this.el,
              this.xy = [0, 0],
              this.isDoubleTaped = !0,
              this.zoom > 1.2)
                  return this.zoom = 1,
                  void this.transform("200ms", 1, 0, 0);
              this.zoom = 2,
              this.transform("200ms", this.zoom, 0, 0)
          },
          tap: function(t) {
              e.delay(e.bind(function() {
                  this.isDoubleTaped || (this.isDoubleTaped = !1,
                  this.trigger("close:imageView"))
              }, this), 300),
              this.isDoubleTaped = !1
          },
          drag: function(t) {
              var e = c(t).gesture
                , i = e.srcEvent
                , n = i && i.touches;
              if (i.preventDefault(),
              !(1 === this.zoom || n.length > 1 || this.isDoubleZoom)) {
                  var o = this.el
                    , s = o.clientWidth * this.zoom
                    , l = o.clientHeight * this.zoom
                    , h = (s - a) / 2 / this.zoom
                    , d = (l - r) / 2 / this.zoom
                    , p = e.deltaX / this.zoom
                    , u = e.deltaY / this.zoom
                    , g = 0
                    , f = 0;
                  h > 0 && (g = this.xy[0] + p > h ? h + (this.xy[0] + p - h) / 3 : this.xy[0] + p < -h ? -h + (this.xy[0] + p + h) / 3 : this.xy[0] + p),
                  d > 0 && (f = this.xy[1] + u > d ? d + (this.xy[1] + u - d) / 3 : this.xy[1] + u < -d ? -d + (this.xy[1] + u + d) / 3 : this.xy[1] + u),
                  this.transform("0ms", this.zoom, g, f)
              }
          },
          pinch: function(t) {
              var e = c(t).gesture
                , i = e.srcEvent;
              i && i.touches,
              i.preventDefault(),
              this.isDoubleZoom = !0,
              this.zoom = Math.max(1, Math.min(this.doubleZoomOrg * e.scale, 2)),
              this.transform("0ms", this.zoom, this.xy[0], this.xy[1])
          },
          release: function(t) {
              var e = c(t).gesture;
              if (e.srcEvent && e.srcEvent.touches,
              e.deltaX) {
                  var i = this.el
                    , n = i.clientWidth * this.zoom
                    , o = i.clientHeight * this.zoom
                    , s = (n - a) / 2 / this.zoom
                    , l = (o - r) / 2 / this.zoom
                    , h = this.isDoubleZoom ? 0 : e.deltaX / this.zoom
                    , d = this.isDoubleZoom ? 0 : e.deltaY / this.zoom
                    , p = this.xy
                    , u = 0
                    , g = 0;
                  s > 0 && (u = h + p[0] > s ? s : h + p[0] < -s ? -s : p[0] + h),
                  l > 0 && (g = d + p[1] > l ? l : d + p[1] < -l ? -l : p[1] + d),
                  s < 0 && this.isDoubleZoom && (u = 0),
                  l < 0 && this.isDoubleZoom && (g = 0),
                  this.transform("200ms", this.zoom, u, g),
                  this.xy = [u, g]
              }
          }
      }),
      d.openImageView = function(i) {
          var n = t(i.currentTarget)
            , r = n.data("orig-height")
            , a = n.data("orig-width")
            , c = new d({
              origImage: n.data("orig-src"),
              origHeight: r,
              origWidth: a
          })
            , p = t("<div>", {
              class: "loading"
          }).css(c.getAspect())
            , u = o({
              content: p,
              closable: !0,
              overlayClass: "overlay-image-view"
          }).addClass("dialog-image-view").on("open", function() {
              s.addClass("dialog-image-view-opened")
          }).on("close", function() {
              s.removeClass("dialog-image-view-opened")
          });
          u.el.css(c.getAspect()),
          u.open(),
          l.on("backbutton.imageview", function() {
              return c.trigger("close:imageView"),
              !1
          }),
          c.render().onLoaded(function() {
              p.replaceWith(c.$el)
          }),
          c.on("close:imageView", e.bind(function() {
              var e = u.overlay.el;
              if (l.off("backbutton.imageview"),
              !h())
                  return u.close();
              e.css({
                  "-webkit-animation-name": "fadeout",
                  "-webkit-animation-duration": "0.5s"
              }),
              t(e).one("webkitAnimationEnd", function() {
                  u.close()
              })
          }))
      }
      ,
      d
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(1), i(2), i(6), i(32)],
  void 0 === (o = function(t, e, i, n, o) {
      return i.View.extend({
          className: "top-panel-container",
          tmpl: t("#tmpl-mobile-top-panel").html(),
          render: function() {
              var t = n.getModel("article");
              return this.$el.html(e.template(this.tmpl, {
                  url: t.urlInMobileStore(),
                  truncate: o,
                  label: t.get("title")
              })),
              this.$el.find(".price").html(t.get("isSample") ? "未购买" : "已购"),
              this
          },
          hide: function() {
              this.$el.is(":visible") && this.$el.hide()
          },
          toggle: function() {
              var t = !this.$el.is(":visible");
              this.$el[t ? "show" : "hide"](),
              t && this.btnView && this.$(".label").css({
                  marginRight: this.btnView.$el.width() + 10
              })
          }
      })
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n;
  /*! iScroll v5.2.0 ~ (c) 2008-2016 Matteo Spinelli ~ http://cubiq.org/license */
  /*! iScroll v5.2.0 ~ (c) 2008-2016 Matteo Spinelli ~ http://cubiq.org/license */
  !function(o, r, a) {
      var s = o.requestAnimationFrame || o.webkitRequestAnimationFrame || o.mozRequestAnimationFrame || o.oRequestAnimationFrame || o.msRequestAnimationFrame || function(t) {
          o.setTimeout(t, 1e3 / 60)
      }
        , l = function() {
          var t = {}
            , e = r.createElement("div").style
            , i = function() {
              for (var t = ["t", "webkitT", "MozT", "msT", "OT"], i = 0, n = t.length; i < n; i++)
                  if (t[i] + "ransform"in e)
                      return t[i].substr(0, t[i].length - 1);
              return !1
          }();
          function n(t) {
              return !1 !== i && ("" === i ? t : i + t.charAt(0).toUpperCase() + t.substr(1))
          }
          t.getTime = Date.now || function() {
              return (new Date).getTime()
          }
          ,
          t.extend = function(t, e) {
              for (var i in e)
                  t[i] = e[i]
          }
          ,
          t.addEvent = function(t, e, i, n) {
              t.addEventListener(e, i, !!n)
          }
          ,
          t.removeEvent = function(t, e, i, n) {
              t.removeEventListener(e, i, !!n)
          }
          ,
          t.prefixPointerEvent = function(t) {
              return o.MSPointerEvent ? "MSPointer" + t.charAt(7).toUpperCase() + t.substr(8) : t
          }
          ,
          t.momentum = function(t, e, i, n, o, r) {
              var s, l, h = t - e, c = a.abs(h) / i;
              return l = c / (r = void 0 === r ? 6e-4 : r),
              (s = t + c * c / (2 * r) * (h < 0 ? -1 : 1)) < n ? (s = o ? n - o / 2.5 * (c / 8) : n,
              l = (h = a.abs(s - t)) / c) : s > 0 && (s = o ? o / 2.5 * (c / 8) : 0,
              l = (h = a.abs(t) + s) / c),
              {
                  destination: a.round(s),
                  duration: l
              }
          }
          ;
          var s = n("transform");
          return t.extend(t, {
              hasTransform: !1 !== s,
              hasPerspective: n("perspective")in e,
              hasTouch: "ontouchstart"in o,
              hasPointer: !(!o.PointerEvent && !o.MSPointerEvent),
              hasTransition: n("transition")in e
          }),
          t.isBadAndroid = function() {
              var t = o.navigator.appVersion;
              if (/Android/.test(t) && !/Chrome\/\d/.test(t)) {
                  var e = t.match(/Safari\/(\d+.\d)/);
                  return !(e && "object" == typeof e && e.length >= 2) || parseFloat(e[1]) < 535.19
              }
              return !1
          }(),
          t.extend(t.style = {}, {
              transform: s,
              transitionTimingFunction: n("transitionTimingFunction"),
              transitionDuration: n("transitionDuration"),
              transitionDelay: n("transitionDelay"),
              transformOrigin: n("transformOrigin")
          }),
          t.hasClass = function(t, e) {
              return new RegExp("(^|\\s)" + e + "(\\s|$)").test(t.className)
          }
          ,
          t.addClass = function(e, i) {
              if (!t.hasClass(e, i)) {
                  var n = e.className.split(" ");
                  n.push(i),
                  e.className = n.join(" ")
              }
          }
          ,
          t.removeClass = function(e, i) {
              if (t.hasClass(e, i)) {
                  var n = new RegExp("(^|\\s)" + i + "(\\s|$)","g");
                  e.className = e.className.replace(n, " ")
              }
          }
          ,
          t.offset = function(t) {
              for (var e = -t.offsetLeft, i = -t.offsetTop; t = t.offsetParent; )
                  e -= t.offsetLeft,
                  i -= t.offsetTop;
              return {
                  left: e,
                  top: i
              }
          }
          ,
          t.preventDefaultException = function(t, e) {
              for (var i in e)
                  if (e[i].test(t[i]))
                      return !0;
              return !1
          }
          ,
          t.extend(t.eventType = {}, {
              touchstart: 1,
              touchmove: 1,
              touchend: 1,
              mousedown: 2,
              mousemove: 2,
              mouseup: 2,
              pointerdown: 3,
              pointermove: 3,
              pointerup: 3,
              MSPointerDown: 3,
              MSPointerMove: 3,
              MSPointerUp: 3
          }),
          t.extend(t.ease = {}, {
              quadratic: {
                  style: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  fn: function(t) {
                      return t * (2 - t)
                  }
              },
              circular: {
                  style: "cubic-bezier(0.1, 0.57, 0.1, 1)",
                  fn: function(t) {
                      return a.sqrt(1 - --t * t)
                  }
              },
              back: {
                  style: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                  fn: function(t) {
                      return (t -= 1) * t * (5 * t + 4) + 1
                  }
              },
              bounce: {
                  style: "",
                  fn: function(t) {
                      return (t /= 1) < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
                  }
              },
              elastic: {
                  style: "",
                  fn: function(t) {
                      return 0 === t ? 0 : 1 == t ? 1 : .4 * a.pow(2, -10 * t) * a.sin((t - .055) * (2 * a.PI) / .22) + 1
                  }
              }
          }),
          t.tap = function(t, e) {
              var i = r.createEvent("Event");
              i.initEvent(e, !0, !0),
              i.pageX = t.pageX,
              i.pageY = t.pageY,
              t.target.dispatchEvent(i)
          }
          ,
          t.click = function(t) {
              var e, i = t.target;
              /(SELECT|INPUT|TEXTAREA)/i.test(i.tagName) || ((e = r.createEvent("MouseEvents")).initMouseEvent("click", !0, !0, t.view, 1, i.screenX, i.screenY, i.clientX, i.clientY, t.ctrlKey, t.altKey, t.shiftKey, t.metaKey, 0, null),
              e._constructed = !0,
              i.dispatchEvent(e))
          }
          ,
          t
      }();
      function h(t, e) {
          for (var i in this.wrapper = "string" == typeof t ? r.querySelector(t) : t,
          this.scroller = this.wrapper.children[0],
          this.scrollerStyle = this.scroller.style,
          this.options = {
              disablePointer: !l.hasPointer,
              disableTouch: l.hasPointer || !l.hasTouch,
              disableMouse: l.hasPointer || l.hasTouch,
              startX: 0,
              startY: 0,
              scrollY: !0,
              directionLockThreshold: 5,
              momentum: !0,
              bounce: !0,
              bounceTime: 600,
              bounceEasing: "",
              preventDefault: !0,
              preventDefaultException: {
                  tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/
              },
              HWCompositing: !0,
              useTransition: !0,
              useTransform: !0,
              bindToWrapper: void 0 === o.onmousedown
          },
          e)
              this.options[i] = e[i];
          this.translateZ = this.options.HWCompositing && l.hasPerspective ? " translateZ(0)" : "",
          this.options.useTransition = l.hasTransition && this.options.useTransition,
          this.options.useTransform = l.hasTransform && this.options.useTransform,
          this.options.eventPassthrough = !0 === this.options.eventPassthrough ? "vertical" : this.options.eventPassthrough,
          this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault,
          this.options.scrollY = "vertical" != this.options.eventPassthrough && this.options.scrollY,
          this.options.scrollX = "horizontal" != this.options.eventPassthrough && this.options.scrollX,
          this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough,
          this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold,
          this.options.bounceEasing = "string" == typeof this.options.bounceEasing ? l.ease[this.options.bounceEasing] || l.ease.circular : this.options.bounceEasing,
          this.options.resizePolling = void 0 === this.options.resizePolling ? 60 : this.options.resizePolling,
          !0 === this.options.tap && (this.options.tap = "tap"),
          this.x = 0,
          this.y = 0,
          this.directionX = 0,
          this.directionY = 0,
          this._events = {},
          this._init(),
          this.refresh(),
          this.scrollTo(this.options.startX, this.options.startY),
          this.enable()
      }
      h.prototype = {
          version: "5.2.0",
          _init: function() {
              this._initEvents()
          },
          destroy: function() {
              this._initEvents(!0),
              clearTimeout(this.resizeTimeout),
              this.resizeTimeout = null,
              this._execEvent("destroy")
          },
          _transitionEnd: function(t) {
              t.target == this.scroller && this.isInTransition && (this._transitionTime(),
              this.resetPosition(this.options.bounceTime) || (this.isInTransition = !1,
              this._execEvent("scrollEnd")))
          },
          _start: function(t) {
              if ((1 == l.eventType[t.type] || 0 === (t.which ? t.button : t.button < 2 ? 0 : 4 == t.button ? 1 : 2)) && this.enabled && (!this.initiated || l.eventType[t.type] === this.initiated)) {
                  !this.options.preventDefault || l.isBadAndroid || l.preventDefaultException(t.target, this.options.preventDefaultException) || t.preventDefault();
                  var e, i = t.touches ? t.touches[0] : t;
                  this.initiated = l.eventType[t.type],
                  this.moved = !1,
                  this.distX = 0,
                  this.distY = 0,
                  this.directionX = 0,
                  this.directionY = 0,
                  this.directionLocked = 0,
                  this.startTime = l.getTime(),
                  this.options.useTransition && this.isInTransition ? (this._transitionTime(),
                  this.isInTransition = !1,
                  e = this.getComputedPosition(),
                  this._translate(a.round(e.x), a.round(e.y)),
                  this._execEvent("scrollEnd")) : !this.options.useTransition && this.isAnimating && (this.isAnimating = !1,
                  this._execEvent("scrollEnd")),
                  this.startX = this.x,
                  this.startY = this.y,
                  this.absStartX = this.x,
                  this.absStartY = this.y,
                  this.pointX = i.pageX,
                  this.pointY = i.pageY,
                  this._execEvent("beforeScrollStart")
              }
          },
          _move: function(t) {
              if (this.enabled && l.eventType[t.type] === this.initiated) {
                  this.options.preventDefault && t.preventDefault();
                  var e, i, n, o, r = t.touches ? t.touches[0] : t, s = r.pageX - this.pointX, h = r.pageY - this.pointY, c = l.getTime();
                  if (this.pointX = r.pageX,
                  this.pointY = r.pageY,
                  this.distX += s,
                  this.distY += h,
                  n = a.abs(this.distX),
                  o = a.abs(this.distY),
                  !(c - this.endTime > 300 && n < 10 && o < 10)) {
                      if (this.directionLocked || this.options.freeScroll || (n > o + this.options.directionLockThreshold ? this.directionLocked = "h" : o >= n + this.options.directionLockThreshold ? this.directionLocked = "v" : this.directionLocked = "n"),
                      "h" == this.directionLocked) {
                          if ("vertical" == this.options.eventPassthrough)
                              t.preventDefault();
                          else if ("horizontal" == this.options.eventPassthrough)
                              return void (this.initiated = !1);
                          h = 0
                      } else if ("v" == this.directionLocked) {
                          if ("horizontal" == this.options.eventPassthrough)
                              t.preventDefault();
                          else if ("vertical" == this.options.eventPassthrough)
                              return void (this.initiated = !1);
                          s = 0
                      }
                      s = this.hasHorizontalScroll ? s : 0,
                      h = this.hasVerticalScroll ? h : 0,
                      e = this.x + s,
                      i = this.y + h,
                      (e > 0 || e < this.maxScrollX) && (e = this.options.bounce ? this.x + s / 3 : e > 0 ? 0 : this.maxScrollX),
                      (i > 0 || i < this.maxScrollY) && (i = this.options.bounce ? this.y + h / 3 : i > 0 ? 0 : this.maxScrollY),
                      this.directionX = s > 0 ? -1 : s < 0 ? 1 : 0,
                      this.directionY = h > 0 ? -1 : h < 0 ? 1 : 0,
                      this.moved || this._execEvent("scrollStart"),
                      this.moved = !0,
                      this._translate(e, i),
                      c - this.startTime > 300 && (this.startTime = c,
                      this.startX = this.x,
                      this.startY = this.y)
                  }
              }
          },
          _end: function(t) {
              if (this.enabled && l.eventType[t.type] === this.initiated) {
                  this.options.preventDefault && !l.preventDefaultException(t.target, this.options.preventDefaultException) && t.preventDefault(),
                  t.changedTouches && t.changedTouches[0];
                  var e, i, n = l.getTime() - this.startTime, o = a.round(this.x), r = a.round(this.y), s = a.abs(o - this.startX), h = a.abs(r - this.startY), c = 0, d = "";
                  if (this.isInTransition = 0,
                  this.initiated = 0,
                  this.endTime = l.getTime(),
                  !this.resetPosition(this.options.bounceTime)) {
                      if (this.scrollTo(o, r),
                      !this.moved)
                          return this.options.tap && l.tap(t, this.options.tap),
                          this.options.click && l.click(t),
                          void this._execEvent("scrollCancel");
                      if (this._events.flick && n < 200 && s < 100 && h < 100)
                          this._execEvent("flick");
                      else {
                          if (this.options.momentum && n < 300 && (e = this.hasHorizontalScroll ? l.momentum(this.x, this.startX, n, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : {
                              destination: o,
                              duration: 0
                          },
                          i = this.hasVerticalScroll ? l.momentum(this.y, this.startY, n, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : {
                              destination: r,
                              duration: 0
                          },
                          o = e.destination,
                          r = i.destination,
                          c = a.max(e.duration, i.duration),
                          this.isInTransition = 1),
                          o != this.x || r != this.y)
                              return (o > 0 || o < this.maxScrollX || r > 0 || r < this.maxScrollY) && (d = l.ease.quadratic),
                              void this.scrollTo(o, r, c, d);
                          this._execEvent("scrollEnd")
                      }
                  }
              }
          },
          _resize: function() {
              var t = this;
              clearTimeout(this.resizeTimeout),
              this.resizeTimeout = setTimeout(function() {
                  t.refresh()
              }, this.options.resizePolling)
          },
          resetPosition: function(t) {
              var e = this.x
                , i = this.y;
              return t = t || 0,
              !this.hasHorizontalScroll || this.x > 0 ? e = 0 : this.x < this.maxScrollX && (e = this.maxScrollX),
              !this.hasVerticalScroll || this.y > 0 ? i = 0 : this.y < this.maxScrollY && (i = this.maxScrollY),
              (e != this.x || i != this.y) && (this.scrollTo(e, i, t, this.options.bounceEasing),
              !0)
          },
          disable: function() {
              this.enabled = !1
          },
          enable: function() {
              this.enabled = !0
          },
          refresh: function() {
              this.wrapper.offsetHeight,
              this.wrapperWidth = this.wrapper.clientWidth,
              this.wrapperHeight = this.wrapper.clientHeight,
              this.scrollerWidth = this.scroller.offsetWidth,
              this.scrollerHeight = this.scroller.offsetHeight,
              this.maxScrollX = this.wrapperWidth - this.scrollerWidth,
              this.maxScrollY = this.wrapperHeight - this.scrollerHeight,
              this.hasHorizontalScroll = this.options.scrollX && this.maxScrollX < 0,
              this.hasVerticalScroll = this.options.scrollY && this.maxScrollY < 0,
              this.hasHorizontalScroll || (this.maxScrollX = 0,
              this.scrollerWidth = this.wrapperWidth),
              this.hasVerticalScroll || (this.maxScrollY = 0,
              this.scrollerHeight = this.wrapperHeight),
              this.endTime = 0,
              this.directionX = 0,
              this.directionY = 0,
              this.wrapperOffset = l.offset(this.wrapper),
              this._execEvent("refresh"),
              this.resetPosition()
          },
          on: function(t, e) {
              this._events[t] || (this._events[t] = []),
              this._events[t].push(e)
          },
          off: function(t, e) {
              if (this._events[t]) {
                  var i = this._events[t].indexOf(e);
                  i > -1 && this._events[t].splice(i, 1)
              }
          },
          _execEvent: function(t) {
              if (this._events[t]) {
                  var e = 0
                    , i = this._events[t].length;
                  if (i)
                      for (; e < i; e++)
                          this._events[t][e].apply(this, [].slice.call(arguments, 1))
              }
          },
          scrollBy: function(t, e, i, n) {
              t = this.x + t,
              e = this.y + e,
              i = i || 0,
              this.scrollTo(t, e, i, n)
          },
          scrollTo: function(t, e, i, n) {
              n = n || l.ease.circular,
              this.isInTransition = this.options.useTransition && i > 0;
              var o = this.options.useTransition && n.style;
              !i || o ? (o && (this._transitionTimingFunction(n.style),
              this._transitionTime(i)),
              this._translate(t, e)) : this._animate(t, e, i, n.fn)
          },
          scrollToElement: function(t, e, i, n, o) {
              if (t = t.nodeType ? t : this.scroller.querySelector(t)) {
                  var r = l.offset(t);
                  r.left -= this.wrapperOffset.left,
                  r.top -= this.wrapperOffset.top,
                  !0 === i && (i = a.round(t.offsetWidth / 2 - this.wrapper.offsetWidth / 2)),
                  !0 === n && (n = a.round(t.offsetHeight / 2 - this.wrapper.offsetHeight / 2)),
                  r.left -= i || 0,
                  r.top -= n || 0,
                  r.left = r.left > 0 ? 0 : r.left < this.maxScrollX ? this.maxScrollX : r.left,
                  r.top = r.top > 0 ? 0 : r.top < this.maxScrollY ? this.maxScrollY : r.top,
                  e = null == e || "auto" === e ? a.max(a.abs(this.x - r.left), a.abs(this.y - r.top)) : e,
                  this.scrollTo(r.left, r.top, e, o)
              }
          },
          _transitionTime: function(t) {
              t = t || 0;
              var e = l.style.transitionDuration;
              if (this.scrollerStyle[e] = t + "ms",
              !t && l.isBadAndroid) {
                  this.scrollerStyle[e] = "0.0001ms";
                  var i = this;
                  s(function() {
                      "0.0001ms" === i.scrollerStyle[e] && (i.scrollerStyle[e] = "0s")
                  })
              }
          },
          _transitionTimingFunction: function(t) {
              this.scrollerStyle[l.style.transitionTimingFunction] = t
          },
          _translate: function(t, e) {
              this.options.useTransform ? this.scrollerStyle[l.style.transform] = "translate(" + t + "px," + e + "px)" + this.translateZ : (t = a.round(t),
              e = a.round(e),
              this.scrollerStyle.left = t + "px",
              this.scrollerStyle.top = e + "px"),
              this.x = t,
              this.y = e
          },
          _initEvents: function(t) {
              var e = t ? l.removeEvent : l.addEvent
                , i = this.options.bindToWrapper ? this.wrapper : o;
              e(o, "orientationchange", this),
              e(o, "resize", this),
              this.options.click && e(this.wrapper, "click", this, !0),
              this.options.disableMouse || (e(this.wrapper, "mousedown", this),
              e(i, "mousemove", this),
              e(i, "mousecancel", this),
              e(i, "mouseup", this)),
              l.hasPointer && !this.options.disablePointer && (e(this.wrapper, l.prefixPointerEvent("pointerdown"), this),
              e(i, l.prefixPointerEvent("pointermove"), this),
              e(i, l.prefixPointerEvent("pointercancel"), this),
              e(i, l.prefixPointerEvent("pointerup"), this)),
              l.hasTouch && !this.options.disableTouch && (e(this.wrapper, "touchstart", this),
              e(i, "touchmove", this),
              e(i, "touchcancel", this),
              e(i, "touchend", this)),
              e(this.scroller, "transitionend", this),
              e(this.scroller, "webkitTransitionEnd", this),
              e(this.scroller, "oTransitionEnd", this),
              e(this.scroller, "MSTransitionEnd", this)
          },
          getComputedPosition: function() {
              var t, e, i = o.getComputedStyle(this.scroller, null);
              return this.options.useTransform ? (t = +((i = i[l.style.transform].split(")")[0].split(", "))[12] || i[4]),
              e = +(i[13] || i[5])) : (t = +i.left.replace(/[^-\d.]/g, ""),
              e = +i.top.replace(/[^-\d.]/g, "")),
              {
                  x: t,
                  y: e
              }
          },
          _animate: function(t, e, i, n) {
              var o = this
                , r = this.x
                , a = this.y
                , h = l.getTime()
                , c = h + i;
              this.isAnimating = !0,
              function d() {
                  var p, u, g, f = l.getTime();
                  if (f >= c)
                      return o.isAnimating = !1,
                      o._translate(t, e),
                      void (o.resetPosition(o.options.bounceTime) || o._execEvent("scrollEnd"));
                  g = n(f = (f - h) / i),
                  p = (t - r) * g + r,
                  u = (e - a) * g + a,
                  o._translate(p, u),
                  o.isAnimating && s(d)
              }()
          },
          handleEvent: function(t) {
              switch (t.type) {
              case "touchstart":
              case "pointerdown":
              case "MSPointerDown":
              case "mousedown":
                  this._start(t);
                  break;
              case "touchmove":
              case "pointermove":
              case "MSPointerMove":
              case "mousemove":
                  this._move(t);
                  break;
              case "touchend":
              case "pointerup":
              case "MSPointerUp":
              case "mouseup":
              case "touchcancel":
              case "pointercancel":
              case "MSPointerCancel":
              case "mousecancel":
                  this._end(t);
                  break;
              case "orientationchange":
              case "resize":
                  this._resize();
                  break;
              case "transitionend":
              case "webkitTransitionEnd":
              case "oTransitionEnd":
              case "MSTransitionEnd":
                  this._transitionEnd(t);
                  break;
              case "wheel":
              case "DOMMouseScroll":
              case "mousewheel":
                  this._wheel(t);
                  break;
              case "keydown":
                  this._key(t);
                  break;
              case "click":
                  this.enabled && !t._constructed && (t.preventDefault(),
                  t.stopPropagation())
              }
          }
      },
      h.utils = l,
      t.exports ? t.exports = h : void 0 === (n = function() {
          return h
      }
      .call(e, i, e, t)) || (t.exports = n)
  }(window, document, Math)
}
, , , , , , , , , , , , function(t, e, i) {
  var n = i(0)
    , o = i(2)
    , r = i(1)
    , a = i(3)
    , s = i(6)
    , l = i(105)
    , h = i(4)
    , c = i(33)
    , d = i(119)
    , p = i(154)
    , u = i(250)
    , g = i(156)
    , f = i(251)
    , m = i(295)
    , v = i(175)
    , y = i(296)
    , b = i(10)
    , w = i(9)
    , x = i(297)
    , P = i(44)
    , T = i(298)
    , k = i(176)
    , C = i(20)
    , M = i(303)
    , S = i(304)
    , A = i(305)
    , I = i(11)
    , N = i(36)
    , _ = i(31)
    , E = i(307)
    , O = i(177)
    , D = i(310)
    , $ = i(311)
    , L = i(47);
  function z() {
      var t = n.Deferred();
      return t.resolve.apply(t, arguments).promise()
  }
  var H = n("#css-tester")
    , F = o.View.extend({
      el: ".article",
      events: {
          "click .inner": "captureTags",
          "click .illus": "expandIllus",
          "mouseenter .inner": "hoverPage",
          "mouseleave .inner": "hoverPage"
      },
      initialize: function(t) {
          var e = this;
          I(this, "article"),
          r.bindAll(this, "renderPages", "getArticleData", "parseArticleData", "renderOnArticleData", "bindResize", "paging", "renderOnPagingDone", "jumpToProgress", "reRenderArticle", "hoverPage", "onResizePage", "adaptArticleData", "adaptDecryptedData", "renderHeaderControls"),
          this.config = t,
          this.vent = s.vent,
          this.vent.on({
              "render:pages": this.renderPages,
              "rerender:article": this.reRenderArticle
          }),
          this.once("pages:rendered:fully", function() {
              e.listenTo(t, "change:fontSize", e.reRenderArticle)
          }),
          this.tmplArticle = n("#tmpl-article").html(),
          this.tmplEmptyPage = n("#tmpl-empty-page").html(),
          s.utils = s.utils || {},
          s.utils.applyPurchaseWithIn = p,
          this.unloadConfirmer = new S,
          this.pagesContainer = new f({
              app: s,
              vent: this.vent
          }),
          this.pagesContainer.on("pages:rendered", this.renderHeaderControls, this),
          this.listenTo(this.pagesContainer, "preloadCountChanged", this.reRenderPages),
          this.pageJumpManager = new D,
          this.progressManager = new $,
          this.listenTo(s.getModel("turning"), "change:currPage", this.pageJump),
          a.me.isAnonymous || (this.bookmarkManage = new m({
              vent: this.vent,
              config: this.config
          })),
          s.articleInner = this.articleInner = this.pagesContainer.$el,
          this.doc = document,
          this.win = n(window),
          this.layout = this.config.get("layout"),
          n(document).on("purchase:finish payment:finish", function() {
              location.reload()
          })
      },
      render: function(t) {
          this.trigger("view:render"),
          this.articleId = t;
          var e = new y({},{
              articleId: t
          });
          return e.fetch(),
          s.setModel("reviews", e),
          this.pageJumpManager.render(this.articleInner),
          this.initArticle(),
          this
      },
      bindResize: function() {
          this.win.on("resize.article", r.debounce(this.onResizePage, 200))
      },
      unbindResize: function() {
          this.win.off("resize.article")
      },
      initArticle: function() {
          this.unbindResize(),
          s.unsetModel("content"),
          this.progressManager.preloadProgress(this.articleId),
          this.readingSessionsRecorder = new g({
              worksId: this.articleId,
              pageMaxStayTime: 3e5
          }),
          this.trigger("article:init"),
          this.beforeGetArticleData().then(this.getArticleData).then(this.parseArticleData).done(this.renderOnArticleData).done(this.bindResize).then(this.transforming).then(this.paging).then(this.renderOnPagingDone).then(this.afterPagingDone).then(this.jumpToProgress).then(this.afterJumpingProgress),
          this.resetHooks()
      },
      initArticleForChangingLayout: function() {
          this.unbindResize();
          var t = s.getModel("content").rawData;
          s.unsetModel("content"),
          this.trigger("article:init"),
          this.bindResize(),
          n.Deferred().resolve(t).then(this.paging).then(this.renderOnPagingDone).then(this.afterPagingDone).then(this.jumpToProgress).then(this.afterJumpingProgress)
      },
      beforeGetArticleData: z,
      afterPagingDone: z,
      afterJumpingProgress: z,
      allowedHooks: ["beforeGetArticleData", "afterPagingDone", "afterJumpingProgress"],
      resetHooks: function() {
          r.each(this.allowedHooks, function(t) {
              delete this[t]
          }, this)
      },
      attachHooks: function(t) {
          r.each(this.allowedHooks, function(e) {
              var i = this[e]
                , o = t[e];
              o && (this[e] = function() {
                  var t = i.apply(this, arguments)
                    , e = o.apply(this, arguments);
                  function r() {
                      return t
                  }
                  return n.when(e, t).then(r, r)
              }
              )
          }, this)
      },
      onResizePage: function() {
          this.needReFitScreen() && (this.fitForScreen(),
          s.vent.trigger("window:resized"),
          this.initArticleForChangingLayout())
      },
      reRenderArticle: function() {
          this.prevLayout = this.layout,
          this.layout = this.config.get("layout"),
          "horizontal" === this.layout ? (this.articleInner.height("auto"),
          this.$el.find(".page").removeAttr("style"),
          this.fitForScreen()) : (this.$el.height("auto"),
          this.pageHeight = this.config.get("verticalPageHeight"),
          this.articleInner.removeAttr("style"),
          this._clearPageStyle()),
          this.initArticleForChangingLayout()
      },
      renderHeaderControls: function() {
          this.renderOriginHeaderControls()
      },
      renderOriginHeaderControls: function() {
          var t = new O({
              className: "header-controls"
          });
          this.pagesContainer.currPageView.$el.find(".header-extra").html(t.render().el)
      },
      getArticleData: function() {
          var t = new n.Deferred;
          P.resetForDifferentUser(a.me.id);
          var e = this
            , i = this.articleId
            , o = P.getArticle(i);
          function r(o) {
              e.dataFromLocal = !1,
              e.adaptArticleData(o);
              var r, l = o.data;
              try {
                  r = n.parseJSON(k(l, N(i)))
              } catch (t) {
                  throw alert("出现了奇怪的错误，请稍后再试"),
                  t
              }
              var h = r.sample && e.config.get("isChapter");
              e.adaptDecryptedData(r),
              s.vent.trigger("article:fetching:finish", r),
              a.me.isAnonymous || a.me.isAdmin || h || e.updateLocalArticle(i, o),
              t.resolve(r)
          }
          return this.previousAid = b.get("previousAid"),
          this.resetTypePage(),
          o ? (this.adaptArticleData(o),
          M(i, {
              purchaseTime: this.purchaseTime,
              isSample: this.isSample,
              isGift: this.isGift
          }).done(n.proxy(function(n) {
              n.r && function(n) {
                  var o, r = n.data;
                  try {
                      o = JSON.parse(k(r, N(i)))
                  } catch (t) {
                      return !1
                  }
                  return e.dataFromLocal = !0,
                  o.gift && (o.gift.opened = !0),
                  e.adaptDecryptedData(o),
                  t.resolve(o),
                  !0
              }(o) || this.fetchArticle().done(r)
          }, this))) : this.fetchArticle().done(r),
          t.promise()
      },
      updateLocalArticle: function(t, e) {
          try {
              P.freeUpStorageSpace(),
              P.saveArticle(t, e)
          } catch (t) {
              d(t)
          }
      },
      parseArticleData: function(t) {
          return this.config.get("isChapter") && this.isSample && this.emptyArticleContent(t),
          t
      },
      emptyArticleContent: function(t) {
          var e = t.posts;
          e.length = 1,
          e[0].contents = [{
              id: 1,
              type: "paragraph",
              data: {
                  text: "",
                  format: {}
              }
          }]
      },
      renderOnArticleData: function(t) {
          var e = this.articleId;
          n("body").addClass("lang-" + this.lang).toggleClass("modern-typesetting", t.isModernTypesetting),
          "en" === this.lang && !w.fitForMobile() && (this.config.set("lineHeight", 26),
          this.config.set("verticalPageHeight", 754)),
          this.config.get("isChapter") && this.isSample || this.injectEmptyCustomSectionToArticleData(t);
          var i = this.createArticleModel();
          return this.vent.trigger("render:panel", i),
          i.on("change:hasAdded", function(t, i) {
              P.setArticleAttr(e, "hasAdded", i),
              this.hasAdded = i
          }),
          this.listenTo(i.getRating(), "change:unfinishedComment", function(t, e) {
              e ? this.unloadConfirmer.addConfirm("rating", "你写的评价尚未提交，确认离开？") : this.unloadConfirmer.removeConfirm("rating")
          }),
          A(t, i, this.config, s),
          i.get("isSample") && (i.get("dataFromLocal") && i.updatePrice(),
          i.checkPricePeriodically()),
          this.detectIsArchived(),
          t
      },
      injectEmptyCustomSectionToArticleData: function(t) {
          var e = t.posts
            , i = e.length;
          i && e[i - 1].contents.push({
              data: {},
              type: "custom"
          })
      },
      createArticleModel: function() {
          var t = new v({
              id: this.articleId,
              title: this.title,
              price: this.price,
              metaData: this.metaData,
              fixedPrice: this.fixedPrice,
              lang: this.lang,
              isGift: this.isGift,
              isSample: this.isSample,
              hasAdded: this.hasAdded,
              hasFormula: this.hasFormula,
              purchaseTime: this.purchaseTime,
              authorId: this.authorId,
              abstract: this.abstract,
              dataFromLocal: this.dataFromLocal,
              cover_url: this.cover_url,
              onsaleTime: this._onsaleTime
          });
          return s.setModel("article", t),
          t
      },
      adaptArticleData: function(t) {
          this.title = t.title,
          this.purchaseTime = t.purchase_time,
          this.isSample = t.is_sample,
          this.isGift = t.is_gift,
          this.hasFormula = t.has_formula,
          this.hasAdded = t.has_added,
          this.price = t.price,
          this.fixedPrice = t.fixed_price,
          this.lang = t.lang || "cn",
          this.cover_url = t.cover_url
      },
      adaptDecryptedData: function(t) {
          this.authorId = t.authorId,
          this.abstract = t.abstract || "",
          this.metaData = t.metaData,
          this._onsaleTime = t.onsaleTime
      },
      hoverPage: function(t) {
          this.vent.trigger("hover:page", t)
      },
      transforming: function(t) {
          var e = new u({
              autoSpacing: w.fitForMobile()
          });
          return n.each(t.posts, function(i, n) {
              t.posts[i].contents = e.transformParas(n.contents)
          }),
          t
      },
      paging: function(t) {
          this.resetTypePage("typesetting");
          var e = this.hasFormula;
          return this.prevLayout = this.layout,
          this.updateFontSizeStyle(),
          this.needFitScreen() ? this.fitForScreen() : "vertical" === this.layout && (this.pageHeight = this.config.get("verticalPageHeight"),
          this.page = this.$el.find(".page"),
          this.pageWidth = this.page.width()),
          this.vent.trigger("paging:start", t),
          w.fitForDesktop() && w.isFontResized() && _.toast("当前字体大小不是默认设置，可能使阅读器无法正常显示。请尝试修改字体大小", {
              delay: 5e3
          }),
          T({
              data: t,
              pageHeight: this.pageHeight,
              pageWidth: this.pageWidth,
              lineHeight: this.config.getLineHeightPx(),
              typePage: this.articleInner,
              metadata: {
                  hasFormula: e
              },
              template: {
                  article: this.tmplArticle
              },
              layout: this.layout,
              usingLiteStyle: this.config.get("usingLiteStyle"),
              willSplitToSpan: w.shouldSplitToSpan(),
              shouldPreSplitSpan: ["55712878"].includes(this.articleId),
              paragraphSpaceInRow: w.fitForMobile() ? l.reading.MOBILE_PARA_SPACE_IN_ROW : "en" === this.lang ? l.reading.EN_BOOK_PARA_SPACE_IN_ROW : t.isModernTypesetting ? l.reading.MODERN_PARA_SPACE_IN_ROW : 0,
              trimLastPage: this.config.get("usingLiteStyle")
          })
      },
      renderOnPagingDone: function(t) {
          this.totalPage = t.body.length || 1;
          var e = s.getModel("article")
            , i = s.getModel("turning");
          return i.enableSet(),
          i.set("isGift", e.get("isGift")),
          i.set("totalPage", this.totalPage),
          s.setModel("content", t),
          this.bookmarkManage && this.bookmarkManage.render({
              article: e,
              contentModel: t,
              config: this.config
          }),
          this.preRenderTypePage(),
          this.pagesContainer.empty(),
          this.vent.trigger("paging:finish", t.contents),
          this._trackGAEvent(),
          t
      },
      jumpToProgress: function() {
          var t = n.Deferred();
          return this.once("pages:rendered:fully", t.resolve),
          this.progressManager.loadProgressThenJump(),
          t.promise()
      },
      pageJump: function() {
          this.progressManager.saveReadingProgress(),
          this.readingSessionsRecorder.recordAction(g.ActionTypes.TURNING);
          var t = this
            , e = arguments;
          r.defer(function() {
              t.pageJumpManager.pageJump.apply(null, e),
              t.$el.find(".page-empty").remove()
          })
      },
      detectIsArchived: function() {
          if (this.dataFromLocal) {
              var t = s.getModel("article");
              return h.post("/j/article_v2/is_archived", {
                  works_id: this.articleId
              }).done(n.proxy(function(e) {
                  t.set("hasAdded", 0 | !e.r)
              }, this))
          }
      },
      fetchArticle: function() {
          var t = {
              aid: this.articleId,
              reader_data_version: P.getReaderDataVersion()
          }
            , e = h({
              url: "/j/article_v2/get_reader_data",
              type: "POST",
              data: t
          })
            , i = n.Deferred();
          function o() {
              confirm("加载失败，请刷新重试。") && location.reload()
          }
          return s.vent.trigger("article:fetching:start"),
          e.done(function(t) {
              if (t.r)
                  return o();
              i.resolve(t)
          }).fail(o),
          i.promise()
      },
      renderPages: function(t) {
          if ("none" !== H.css("display") || H[0].parentElement !== document.body)
              throw this.pagesContainer.empty(),
              alert("啊，出现了奇怪的错误，请刷新试试"),
              new Error("The browser is not working properly");
          this.pagesContainer.render({
              layout: t
          }),
          this.completeArticle(),
          this.trigger("pages:rendered:fully")
      },
      reRenderPages: function() {
          this.renderPages(this.config.get("layout"))
      },
      completeArticle: function() {
          var t = s.getModel("content").posts;
          E.loadFigures(this.$el, this.pageWidth, t);
          var e = this.config.get("usingLiteStyle")
            , i = !a.me.isAnonymous && !this.isSample
            , o = this.$(".custom")
            , r = s.getModel("article")
            , l = r.get("metaData").isOriginWorks;
          e || (this.isSample ? L.appendPurchaseGuide(o, r) : o.find(".label-fin").length || o.append(n("<div>", {
              class: "label-fin",
              text: "全文结束"
          })),
          l && L.appendDonateBar(o, r),
          L[i ? "appendReviewSection" : "appendReviewsLink"](o, r, s.getModel("reviews")),
          L.appendSharingButtons(o))
      },
      fillHeight: function(t) {
          return t - t % this.config.getLineHeightPx()
      },
      fitForScreen: function() {
          this.winHeight = this.win.height(),
          this.page = this.$el.find(".page"),
          this.pageWidth = this.page.width();
          var t = this.doc.body.clientHeight
            , e = parseInt(this.page.css("padding-top"), 10) + parseInt(this.page.css("padding-bottom"), 10);
          t = t - e < 244 ? 244 + e : t,
          this.typePageSize = {
              width: this.pageWidth,
              height: t - e
          },
          this.pageHeight = this.fillHeight(this.typePageSize.height),
          this.$el.height(t + "px"),
          this.articleInner.height(t + "px"),
          this._clearPageStyle(),
          this._setPageStyle()
      },
      needFitScreen: function() {
          return !w.fitForMobile() && "vertical" !== this.layout
      },
      needReFitScreen: function() {
          var t = this.win.height()
            , e = this.winHeight;
          return "horizontal" === this.layout && !w.fitForMobile() && (e !== t || "vertical" === this.prevLayout)
      },
      updateFontSizeStyle: function() {
          var t = n("#page-font-style");
          t.length || (t = n('<style id="page-font-style">')).appendTo("head");
          var e = this.config.get("fontSize");
          t.html("\n      .content p {\n        font-size: ".concat(e, "px;\n      }\n      .code code {\n        font-size: ").concat(Math.floor(.75 * e), "px;\n        line-height: ").concat(e, "px;\n      }\n      .content .code code {\n        padding: ").concat(e / 2, "px 0 ").concat(e / 2, "px 16px;\n      }\n    "))
      },
      captureTags: function(t) {
          var e = n(t.target);
          "SUP" === e[0].tagName && (this.tinyTips = new x,
          this.tinyTips.set({
              target: e,
              hasFormula: this.hasFormula,
              content: c(r.unescape(e.find(".sup-content").html()))
          }).update().show())
      },
      expandIllus: function(t) {
          if (!w.fitForMobile()) {
              var e, i = n(t.currentTarget);
              i.hasClass("expandable") ? E.expandIllus(i) : (e = n(t.target).closest(".legend")) && e.length && e.find(".text-content").height() > e.height() && E.expandCaption(i)
          }
      },
      resetTypePage: function() {
          var t = {
              loading: "作品载入中，请稍候 ...",
              typesetting: "排版中，请稍候 ..."
          }[arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "loading"];
          this.articleInner.html(r.template(this.tmplEmptyPage, {
              hint: t
          })).css({
              left: 0,
              right: "auto"
          })
      },
      preRenderTypePage: function() {
          if ("vertical" === this.config.get("layout")) {
              var t, e = s.getModel("article"), i = s.getModel("content"), n = i.body[i.body.length - 1];
              t = this.config.get("isChapter") && e.get("isSample") ? this.pageHeight : n.height + n.offset,
              this.articleInner.height(t + "px")
          }
      },
      _setPageStyle: function() {
          if (!n("#page-style").length) {
              var t = this.typePageSize.height
                , e = this.fillHeight(t) + "px"
                , i = "\n          .page.page { height: ".concat(t + "px", " }\n          .page.page .bd { height: ").concat(e, " }\n        ");
              n('<style id="page-style">'.concat(i, "</style>")).appendTo("head")
          }
      },
      _clearPageStyle: function() {
          n("#page-style").remove()
      },
      _trackGAEvent: function() {
          h.post("/j/currtime").done(r.bind(function(t) {
              t |= 0,
              C._trackEvent(function() {
                  return this.isSample ? "sample" : this.isGift ? "gift" : s.getModel("article").get("price") ? "paid" : "free"
              }() + "-open", (t - this.purchaseTime | 0) / 86400 | 0)
          }, this))
      }
  });
  t.exports = F
}
, , , , , , function(t, e, i) {
  var n, o;
  n = [i(1)],
  void 0 === (o = function(t) {
      function e(e) {
          this.partConvert = new r(t.extend({
              typeset: this
          }, e))
      }
      var i = new RegExp("([a-z0-9])([぀-ㄯ㈀-㋿㐀-䶿一-鿿豈-﫿])","ig")
        , n = new RegExp("([぀-ㄯ㈀-㋿㐀-䶿一-鿿豈-﫿])([a-z0-9])","ig")
        , o = /[a-z0-9]/i;
      function r(e) {
          this.typeset = e.typeset,
          e.autoSpacing && (this.plaintext = function(e) {
              return o.test(e) && (e = e.replace(n, "$1 $2").replace(i, "$1 $2")),
              t.escape(e)
          }
          )
      }
      return t.extend(r.prototype, {
          plaintext: function(e) {
              return t.escape(e)
          },
          code: function() {
              return (/webkit/i.test(navigator.userAgent) ? "<wbr>" : "") + '<code class="code-inline">' + this.typeset.convertParts.apply(this.typeset, arguments) + "</code>"
          },
          footnote: function(t, e, i) {
              return '<sup><span class="sup-content">' + this.typeset.convertParts.call(this.typeset, t, ["emphasize"], i) + "</span></sup>"
          },
          link: function(e, i, n) {
              return "<a class='hypertext' href=\"".concat(t.escape(n.url), '" target="_blank">').concat(this.typeset.convertParts.apply(this.typeset, arguments), "</a>")
          },
          latex: function(e) {
              return Ark.features["reader/katex"] ? '<span class="mathjax-container">' + t.escape(e) + "</span>" : '<span class="mathjax-container">\\(' + t.escape(e) + "\\)</span>"
          }
      }),
      function(e, i, n) {
          t.each([["regular_script", "i", "regularscript"], ["strikethrough", "del"], ["emphasize", "em"]], function(t) {
              i.apply(this, t)
          }, this)
      }(0, function(e, i, n) {
          n || (n = e);
          var o = t.template('<{{- tagName}} class="{{- tagClassName}}">', {
              tagName: i,
              tagClassName: n
          })
            , a = t.template("</{{- tagName}}>", {
              tagName: i
          });
          r.prototype[e] = function() {
              return o + this.typeset.convertParts.apply(this.typeset, arguments) + a
          }
      }),
      t.extend(e.prototype, {
          convertParts: function(e, i) {
              return this.convertIterator(e, function(e) {
                  return i && !t.contains(i, e.kind) ? this.convertOnlyText(e) : this.partConvert[e.kind](e.content, i, e)
              }, this)
          },
          convertOnlyText: function(e) {
              return this.convertIterator(e, function(e) {
                  return t.isString(e.content) ? this.partConvert.plaintext(e.content) : this.convertOnlyText(e.content)
              }, this)
          },
          convertIterator: function(e, i, n) {
              return n = n || this,
              t.isString(e) ? n.partConvert.plaintext(e) : (t.isUndefined(e.kind) || (e = [e]),
              t(e).map(function(t) {
                  return i.call(n, t)
              }).join(""))
          },
          transformLegend: function(e) {
              var i = e.data
                , n = this;
              !i.legend && i.full_legend && (i.legend = i.full_legend),
              delete i.full_legend,
              t.each(["legend", "full_legend"], function(e) {
                  t.isUndefined(i[e]) || (t.isString(i[e]) && (i[e] = [{
                      data: {
                          text: i[e]
                      },
                      type: "paragraph"
                  }]),
                  t.each(i[e], function(t) {
                      t.data.text = n.convertParts(t.data.text)
                  }))
              })
          },
          transformParas: function(e) {
              return t.isArray(e) || (e = [e]),
              t.each(e, function(e) {
                  var i = e.data;
                  e.data && ("illus" === e.type ? this.transformLegend(e) : t.isUndefined(i.text) || (i.text = this.convertParts(e.data.text)))
              }, this),
              e
          }
      }),
      e
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n = i(0)
    , o = i(2)
    , r = i(1)
    , a = i(6)
    , s = i(106)
    , l = i(9)
    , h = i(121)
    , c = i(122)
    , d = i(11)
    , p = i(253)
    , u = i(259)
    , g = i(267)
    , f = i(275)
    , m = i(137)
    , v = o.View.extend({
      el: ".article .inner",
      tmplParagraph: n("#tmpl-paragraph").html(),
      initialize: function(t) {
          d(this, "pagesContainer"),
          r.bindAll(this, "updateVerticalPreload"),
          this.app = t.app,
          this.vent = t.vent,
          this.config = a.getModel("config"),
          this.pages = [],
          this.markingTips = new h,
          l.shouldSplitToSpan() && (a.vent.on("model:content:set", this.createMarkingsCollection, this),
          a.vent.on("searchResult:jumped", this.highlightSearchWord, this),
          a.vent.on("searchBox:closed", this.clearHighlightSearchWord, this),
          this.createSelectionManager(),
          this.createArticleMarkingManager()),
          a.vent.on("model:article:set", this.addSampleTip, this).on("model:article:set", this.addTmplDefalultData, this),
          this.listenTo(this.config, "goto:stamp", this.jumpStamp),
          n(window).off("resize.preload").on("resize.preload", r.debounce(this.updateVerticalPreload, 200)),
          this.updateVerticalPreload()
      },
      addSampleTip: function(t) {
          t.get("hasAdded") || t.on("change:hasAdded", function(t, e) {
              e && this.$(".lnk-collect").remove()
          }, this)
      },
      addTmplDefalultData: function(t) {
          this.defaultData = r.defaults({
              getParaHtml: c
          }, t.attributes)
      },
      empty: function() {
          this.pages = [],
          this.currPageView = null,
          this.pageLastWordPosBase = null,
          this.removeAllSubView()
      },
      jumpStamp: function(t) {
          var e = m.getByStamp(t)
            , i = e && e.pagination;
          a.getModel("turning").setCurrPage(i)
      },
      createPage: function(t) {
          var e = a.getModel("article")
            , i = a.getModel("content")
            , n = e.get("hasAdded");
          return this.addSubView(new u({
              data: r.defaults({
                  page: t,
                  hasAdded: n
              }, this.defaultData),
              markingTips: this.markingTips,
              content: i
          }))
      },
      updateCurrPage: function() {
          for (var t, e = 0, i = this.pages.length; e < i; e++)
              if ((t = this.pages[e]).isCurrPage()) {
                  this.currPageView = t;
                  break
              }
          this.renderForCurrPage()
      },
      renderForCurrPage: function() {
          this.$(".curr-page").removeClass("curr-page");
          var t = this.currPageView;
          t && t.$el.addClass("curr-page")
      },
      isTurningPage: function() {
          return !this.currPageView || a.getModel("turning").get("currPage") !== this.currPageView.data.page.pagination
      },
      render: function(t) {
          var e;
          return (t = t || {}).layout = t.layout || "horizontal",
          (e = "horizontal" === t.layout ? this.getHorizontalPages() : this.getVerticalPages()) && e.length || (e = [{}]),
          this.renderPages(e),
          this
      },
      getHorizontalPages: function() {
          var t = a.getModel("turning").get("currPage");
          return this.getPreloadPages(t, 1)
      },
      renderAllPagesThreshold: 50,
      getVerticalPages: function() {
          var t = a.getModel("turning");
          if (t.get("totalPage") <= this.renderAllPagesThreshold)
              return a.getModel("content").getPages();
          var e = t.get("currPage");
          return this.getPreloadPages(e, this.verticalPreloadCounts)
      },
      verticalPreloadCounts: 2,
      updateVerticalPreload: function() {
          var t = document.body.clientHeight
            , e = this.config.get("verticalPageHeight");
          this.verticalPreloadCounts = Math.ceil(t / e),
          this.verticalPreloadCounts !== this._preVerticalPreloadCounts && "vertical" === this.config.get("layout") && this.trigger("preloadCountChanged", this.verticalPreloadCounts, this._preVerticalPreloadCounts),
          this._preVerticalPreloadCounts = this.verticalPreloadCounts
      },
      getPreloadPages: function(t, e) {
          e = e || 1;
          var i = a.getModel("content")
            , n = Math.max(0, t - e - 1)
            , o = t + e;
          return i.getPages(n, o)
      },
      renderPages: function(t) {
          var e, i = [], n = [], o = r.pluck(this.pages, "pagination");
          if (r.each(t, function(t) {
              var e = r.indexOf(o, t.pagination);
              -1 !== e ? n.push(this.pages[e]) : i.push(this.createPage(t).render())
          }, this),
          e = r.difference(this.pages, n),
          r.each(e, function(t) {
              t.$el.hide().removeClass(),
              r.defer(r.bind(t.remove, t))
          }),
          this.pages = r.sortBy(n.concat(i), function(t) {
              return t.pagination
          }),
          i.length) {
              var a, s = document.createDocumentFragment();
              r.each(i, function(t) {
                  s.appendChild(t.el)
              }, this),
              a = n.length ? n[0].pagination < i[0].pagination ? "append" : "prepend" : "append",
              this.$el[a](s)
          }
          this.updateCurrPage(),
          l.shouldSplitToSpan() && this.setPagingPoint(this.currPageView),
          this.trigger("pages:rendered", i),
          r.each(i, function(t) {
              t.trigger("page:appended")
          })
      },
      styleMoveToViewport: ["position: fixed", "z-index: 100", "bottom: 0", "right: 0", "opacity: 0"].join(";"),
      setPagingPoint: function(t) {
          var e = a.getModel("content")
            , i = a.getModel("config").get("fontSize")
            , n = t.data.page.pagination;
          if (!e.findParagraphPagingPoint(n)) {
              var o = t.el.style.cssText;
              t.el.style.cssText = this.styleMoveToViewport;
              var r = function() {
                  if (!this.pageLastWordPosBase) {
                      var e = t.$el.find("> .bd")[0];
                      if (!e)
                          return null;
                      var n = e.getBoundingClientRect()
                        , o = n.bottom
                        , r = n.right - 8
                        , a = o - 9 - 10;
                      this.pageLastWordPosBase = [r, a - t.data.page.height * i]
                  }
                  return document.elementFromPoint(this.pageLastWordPosBase[0], this.pageLastWordPosBase[1] + t.data.page.height * i)
              }();
              if (t.el.style.cssText = o,
              r && "SPAN" === r.nodeName) {
                  var s = Number(r.getAttribute("data-offset"));
                  Number.isNaN(s) || e.setParagraphPagingPoint(n, s)
              }
          }
      },
      createMarkingsCollection: function(t) {
          var e = a.getModel("article")
            , i = new p([],{
              articleId: e.id,
              contentModel: t
          });
          a.vent.trigger("markings:created", i),
          e.markings = i
      },
      createArticleMarkingManager: function() {
          this.articleMarkingManager = new f({
              pages: this.pages,
              pagesManager: this,
              markingTips: this.markingTips
          })
      },
      createSelectionManager: function() {
          this.selectionManager = new g({
              el: this.el,
              pagesManager: this
          })
      },
      highlightClassName: "search-word",
      clearHighlightSearchWord: function() {
          n("." + this.highlightClassName).removeClass(this.highlightClassName)
      },
      highlightSearchWord: function(t) {
          if (this.clearHighlightSearchWord(),
          this.pages && t)
              if (this.isTurningPage())
                  this.once("pages:rendered", r.bind(this.highlightSearchWord, this, t));
              else {
                  if (t.paginations.length > 1) {
                      var e = a.getModel("turning")
                        , i = e.get("currPage")
                        , o = a.getModel("content").findParagraphPagingPoint(i);
                      if (o && o.pid === t.paragraph.pid && o.wordOffset < t.startOffset)
                          return this.once("pages:rendered", r.bind(this.highlightSearchWord, this, t)),
                          void setTimeout(function() {
                              e.setCurrPage(i + 1)
                          }, 1)
                  }
                  var s = r.filter(this.pages, function(e) {
                      return -1 !== r.indexOf(t.paginations, e.pagination)
                  });
                  r.each(s, function(e) {
                      var i = e.parasMap[t.paragraph.pid]
                        , o = i.find("span")
                        , a = t.startOffset
                        , s = t.endOffset
                        , l = o.index(i.find("[data-offset=" + a + "]"))
                        , h = o.index(i.find("[data-offset=" + s + "]"));
                      if (-1 === l || -1 === h) {
                          var c = o.map(function(t, e) {
                              return n(e).data("offset")
                          });
                          -1 === l && (l = r.sortedIndex(c, a) - 1),
                          -1 === h && (h = r.sortedIndex(c, s))
                      }
                      o.slice(l, h).addClass(this.highlightClassName)
                  }, this)
              }
      }
  });
  r.extend(v.prototype, s),
  t.exports = v
}
, , function(t, e, i) {
  var n, o;
  n = [i(2), i(1), i(6), i(20), i(158), i(254), i(111), i(257), i(132), i(258), i(119)],
  void 0 === (o = function(t, e, i, n, o, r, a, s, l, h, c) {
      var d = t.Collection.extend({
          model: a,
          url: function() {
              return "/j/article_v2/" + this.articleId + "/annotations_by_paragraphs"
          },
          addFromSelection: function(t, i, n, o) {
              var r = e.extend(t.toJSON(), {
                  type: i
              }, n, {
                  tags: ["mine"]
              });
              if ("underline" === i)
                  return this.addUnderline(r);
              this.add(r, o)
          },
          addUnderline: function(t) {
              var e = t instanceof a ? t : new a(t,{
                  articleId: this.articleId,
                  paragraphsIndex: this.paragraphsIndex
              })
                , i = this.linesColl.getModelsToMerge(e);
              i.length && e.merge(i),
              this.add(e)
          },
          initialize: function(t, i) {
              this.articleId = i.articleId,
              this.contentModel = i.contentModel,
              this.paragraphsIndex = this.contentModel.getParasIndexs(),
              this.linesColl = new s,
              this.markingsMap = new l,
              this.cachedPids = {};
              var n = this;
              this.on("add", function(t, e, i) {
                  this.addToMap(t, e, i),
                  this.broadcastWithPid("marking:{{pid}}:added", t)
              }, this),
              this.on("effectiveChange", function(t, e) {
                  if (t.isUnderline())
                      return n.linesColl.remove(t),
                      n.linesColl.add(t),
                      n.markingsMap.remove(t),
                      void n.markingsMap.add(t);
                  t.save({}, e)
              }),
              this.on("remove", function(t) {
                  this.removeFromMap(t),
                  this.broadcastWithPid("marking:{{pid}}:removed", t)
              }),
              e.each(["added", "removed"], function(t) {
                  this.markingsMap.on(t, function(e, i) {
                      this.trigger("markingsMap:" + e + ":" + t, i)
                  }, this)
              }, this)
          },
          addToMap: function(t, e, i) {
              var n = this;
              t.isRecommendation() && this.trigger("recommendation:added", t),
              this.markingsMap.add(t),
              t.isUnderline() && this.linesColl.add(t),
              t.isNew() && t.save({}, i).done(function() {
                  n.trackAddByGa(t.get("type"))
              })
          },
          removeFromMap: function(t) {
              this.markingsMap.remove(t),
              t.isUnderline() && this.linesColl.remove(t)
          },
          trackAddByGa: function(t) {
              var e;
              switch (t) {
              case "underline":
                  e = "underline";
                  break;
              case "note":
                  e = "note";
                  break;
              case "rec_underline":
                  break;
              default:
                  c("modelType is invalid")
              }
              n._trackEvent(e)
          },
          notCachedPids: function(t) {
              return e.difference(t, e.keys(this.cachedPids))
          },
          addCachedPids: function(t) {
              e.each(t, function(t) {
                  this.cachedPids[t] = !0
              }, this)
          },
          fetchByPids: function(t) {
              var i = this.notCachedPids(t)
                , n = this.markingsMap.getByPids(t)
                , r = this;
              return e.each(n, function(t) {
                  r.broadcastWithPid("marking:{{pid}}:added", t)
              }),
              i.length ? this.fetch({
                  data: {
                      paragraph_ids: i.join(",")
                  },
                  remove: !1,
                  type: "post",
                  success: function() {
                      r.addCachedPids(i)
                  }
              }) : o()
          },
          getModelsByPid: function(t) {
              return this.markingsMap.get(t)
          },
          parse: function(t, i) {
              return e.isArray(t) || (t = [t]),
              e.each(t, function(t) {
                  t.endContainerId += "",
                  t.startContainerId += "";
                  for (var e = t.middleContainers, i = 0, n = e.length; i < n; i++)
                      e[i] += ""
              }),
              this.markingsFilter || (this.markingsFilter = new h({
                  collection: this,
                  limitFactor: .2,
                  contentModel: this.contentModel
              })),
              i.dontFilterOut ? (delete i.dontFilterOut,
              t) : this.markingsFilter.filter(t)
          },
          broadcastWithPid: function(t, i) {
              e.each(i.getContainerIds(), function(e) {
                  this.trigger(t.replace("{{pid}}", e), i)
              }, this)
          }
      });
      return e.extend(d.prototype, r),
      d
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(2), i(1), i(0)],
  void 0 === (o = function(t, e, i) {
      var n = t.Collection.prototype;
      return {
          add: function(t, o) {
              t = i.makeArray(t),
              t = e.forEach(t, function(t) {
                  var e = this.get(t.id || t.cid);
                  e ? e.set(t) : n.add.call(this, t, o)
              }, this)
          },
          push: function(t, e) {
              var i = this.get(t.id || t.cid);
              return i ? (i.set(t),
              i) : n.push.call(this, t, e)
          }
      }
  }
  .apply(e, n)) || (t.exports = o)
}
, , , function(t, e, i) {
  var n, o;
  n = [i(1), i(132)],
  void 0 === (o = function(t, e) {
      function i() {
          this.pidToUnderlinesMap = new e
      }
      return t.extend(i.prototype, {
          add: function(t) {
              this.pidToUnderlinesMap.add(t)
          },
          remove: function(t) {
              this.pidToUnderlinesMap.remove(t)
          },
          getRelatedModels: function(e) {
              var i = [];
              return t.each(e.getRanges(), function(t, e) {
                  var n = this.pidToUnderlinesMap.get(e);
                  i = i.concat(n)
              }, this),
              t.uniq(i)
          },
          getModelsToMerge: function(e) {
              var i = [];
              return t.each(this.getRelatedModels(e), function(t) {
                  t.checkConflict(e) && i.push(t)
              }),
              i
          }
      }),
      i
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  (function(n) {
      var o, r;
      o = [i(1), i(115)],
      void 0 === (r = function(t, e) {
          function i(t) {
              this.origCollection = t.collection,
              this.contentModel = t.contentModel,
              this.limitFactor = t.limitFactor,
              this.LocalMarkings = t.collection.constructor.extend({
                  fakeSync: !0
              })
          }
          return t.extend(i.prototype, {
              filter: function(t) {
                  var e = new this.LocalMarkings([],{
                      articleId: this.id,
                      contentModel: this.contentModel
                  });
                  return e.add(t),
                  this.rejectLostParaMarkings(e),
                  this.findHotAndAddTag(e),
                  e.toJSON()
              },
              rejectLostParaMarkings: function(t) {
                  t.remove(t.reject(this.markingParasExist, this))
              },
              findHotAndAddTag: function(e) {
                  var i = e.markingsMap.getMapData()
                    , n = this.origCollection.markingsMap.getMapData();
                  t.each(i, function(e, i) {
                      var o = t.filter(n[i], this.isHotNote)
                        , r = t.filter(e, this.isHotNote)
                        , a = this.paraHotNotesLimit(i) - o.length - r.length;
                      t.chain(e).filter(this.isCandidateHotNote, this).sortBy(this.getCreateTime, this).sortBy(this.getHotScore, this).reverse().first(a).each(this.addHotTag)
                  }, this)
              },
              isCandidateHotNote: function(t) {
                  return t.isNote() && t.isOthers() && !this.origCollection.get(t.id)
              },
              addHotTag: function(t) {
                  var e = t.get("tags");
                  e.push("hot"),
                  t.set("tags", e)
              },
              isHotNote: function(e) {
                  return t.contains(e.get("tags"), "hot")
              },
              getHotScore: function(t) {
                  return t.get("n_favorites")
              },
              getCreateTime: function(t) {
                  return e(t.get("create_time"))
              },
              paraHotNotesLimit: function(t) {
                  var e = n("p[data-pid=" + t + "] .word").length;
                  return Math.ceil(e * this.limitFactor)
              },
              markingParasExist: function(e) {
                  var i = e.getContainerIds()
                    , n = this.contentModel;
                  return t.every(i, function(t) {
                      return n.isPidExist(t)
                  })
              }
          }),
          i
      }
      .apply(e, o)) || (t.exports = r)
  }
  ).call(this, i(0))
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(2), i(1), i(6), i(105), i(9), i(159), i(160), i(106), i(35), i(43), i(262), i(264), i(32)],
  void 0 === (o = function(t, e, i, n, o, r, a, s, l, h, c, d, p, u) {
      var g = e.View.extend({
          className: "page",
          tmplPage: t("#tmpl-page").html(),
          tmplSampleChapterPage: t("#tmpl-sample-chapter-page").html(),
          initialize: function(t) {
              i.bindAll(this, "showCodeToolbar"),
              this.vent = n.vent,
              this.data = t.data,
              this.markingTips = t.markingTips,
              this.turningModel = n.getModel("turning");
              var e = n.getModel("article");
              this.isSampleChapter = n.getModel("config").get("isChapter") && e.get("isSample"),
              this.isSampleChapter ? this.initSampleChapterPage() : this.initNormalPage()
          },
          initNormalPage: function() {
              this.pagination = this.data.page.pagination,
              this.on("render:selection", this.renderSelection, this),
              this.on("render:done", function() {
                  this.paras = this.getParas(),
                  this.parasMap = this.getParasMap(),
                  this.paraPids = this.getPids()
              }, this),
              r.shouldSplitToSpan() && !n.getModel("config").shouldDisableAnnotation() && this.on("page:appended", function() {
                  this.createAnnotationCounterLayer()
              }, this)
          },
          initSampleChapterPage: function() {
              this.$el.addClass("selection-disabled")
          },
          events: {
              "mouseenter .code": "showCodeToolbar",
              "mouseleave .code": "hideCodeToolbar"
          },
          render: function() {
              return this.isSampleChapter ? this.renderSampleChapterPage() : this.renderNormalPage(),
              this.trigger("render:done"),
              this
          },
          renderNormalPage: function() {
              var t = this.data.page.pagination
                , e = this.data.id
                , o = n.getModel("config").get("isChapter")
                , r = o && n.getModel("column").toJSON().id
                , s = (o ? ["/column", r, "chapter", e, ""] : ["/ebook", e, ""]).join("/");
              this.setPageOffsetTop(),
              this.$el.html(i.template(this.tmplPage, i.extend(this.data, {
                  url: s,
                  readPageNum: this.turningModel.real2read(t),
                  pageTitle: o ? this.data.title : this.data.page.title,
                  figureUtil: a
              }))),
              this.highlightCode(),
              this.$el.attr("data-pagination", this.pagination)
          },
          setPageOffsetTop: function() {
              if ("vertical" === n.getModel("config").get("layout")) {
                  var t = o.reading.READER_INNER_PADDING
                    , e = this.data.page.offset + t;
                  this.$el.css({
                      top: e + "px",
                      position: "absolute"
                  })
              }
          },
          renderSampleChapterPage: function() {
              var t = n.getModel("chapters")
                , e = t.getCurrChapter().toJSON()
                , o = n.getModel("column")
                , a = o.toJSON()
                , s = i.extend(this.data, {
                  chapter: e,
                  column: a,
                  chapterNum: t.getCurrIndex() + 1,
                  readPageNum: this.turningModel.real2read(this.data.page.pagination),
                  truncate: u
              });
              this.$el.html(i.template(this.tmplSampleChapterPage, s)),
              this.$el.attr("data-pagination", this.pagination);
              var l, d = e.id, p = a.id, g = ["/column", p, "chapter", d].join("/"), f = "/reader" + g, m = i.extend(e, {
                  url: g,
                  type: "chapter",
                  is_subscribed: a.is_subscribed,
                  is_large_btn: !0,
                  is_hollow_btn: !0,
                  redirect_url: f,
                  is_mobile_direct_purchase: r.fitForMobile(),
                  columnId: p
              }), v = this.$(".purchase-section"), y = (new h).render({
                  data: m
              });
              a.can_sale && (l = c(o, {
                  chapterId: d
              })),
              l && v.append(l.el),
              v.append(y.el),
              i.delay(function() {
                  n.utils.applyPurchaseWithIn("[data-widget=faster-purchase]", ".sample-chapter-page")
              }, 0)
          },
          createAnnotationCounterLayer: function() {
              var t = new d({
                  page: this
              });
              this.addSubView(t),
              this.$el.append(t.render().$el)
          },
          getParasMap: function() {
              var e = {};
              return this.paras.each(function() {
                  var i = t(this);
                  e["" + i.data("pid")] = i
              }),
              e
          },
          getPids: function() {
              return i.keys(this.parasMap)
          },
          getParas: function() {
              return this.$el.find("p[data-pid]")
          },
          isCurrPage: function() {
              return this.data.page.pagination === this.turningModel.get("currPage")
          },
          highlightCode: function() {
              var e = this.$el.find(".code code");
              function i(t, e) {
                  p.renderTextToEl(t.html(), e, t, !1)
              }
              e.length && e.each(function(e, n) {
                  var o = t(n)
                    , r = o.data("language");
                  o.hasClass("line-split") ? o.children(".line").each(function(e, n) {
                      i(t(n), r)
                  }) : i(o, r)
              })
          },
          showCodeToolbar: function(e) {
              var i = t(e.currentTarget)
                , n = i.find("code")
                , o = i.css("margin-top")
                , r = Math.abs(parseInt(o, 10));
              t('<em class="arkicon-copy copy" title="复制代码"></em>').appendTo(i).end().css("top", r ? r + 10 : 18);
              var a = this.$el.find(".copy")
                , l = n.clone();
              l.find("br").replaceWith("\n"),
              s(a, function() {
                  return l.text()
              })
          },
          hideCodeToolbar: function(e) {
              /\bcopy\b/g.test(e.target.className) || t(e.currentTarget).find(".copy").remove()
          }
      });
      return i.extend(g.prototype, l),
      g
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(3), i(153), i(31), i(261)],
  void 0 === (o = function(t, e, i, n, o) {
      return window.clipboardData || i(e.ZeroClipboardPath),
      function(t) {
          return o.config({
              swfPath: e.ZeroClipboardPath,
              hoverClass: "is-hover",
              activeClass: "is-active",
              trustedDomains: ["*"]
          }),
          o.on(function(t) {
              switch (t.name) {
              case "flash-disabled":
                  n.toast("复制失败，需要安装或启用 Flash 插件");
                  break;
              case "clipboard-error":
                  n.toast("复制失败，请重试");
                  break;
              default:
                  n.toast("复制失败，发生了奇怪的错误")
              }
          }),
          new o(t)
      }
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n;
  /*!
* ZeroClipboard
* The ZeroClipboard library provides an easy way to copy text to the clipboard using an invisible Adobe Flash movie and a JavaScript interface
* Copyright (c) 2009-2016 Jon Rohan, James M. Greene
* Licensed MIT
* http://zeroclipboard.org/
* v2.3.0
*/
  /*!
* ZeroClipboard
* The ZeroClipboard library provides an easy way to copy text to the clipboard using an invisible Adobe Flash movie and a JavaScript interface
* Copyright (c) 2009-2016 Jon Rohan, James M. Greene
* Licensed MIT
* http://zeroclipboard.org/
* v2.3.0
*/
  !function(o, r) {
      "use strict";
      var a, s, l, h = o, c = h.document, d = h.navigator, p = h.setTimeout, u = h.clearTimeout, g = h.setInterval, f = h.clearInterval, m = h.getComputedStyle, v = h.encodeURIComponent, y = h.ActiveXObject, b = h.Error, w = h.Number.parseInt || h.parseInt, x = h.Number.parseFloat || h.parseFloat, P = h.Number.isNaN || h.isNaN, T = h.Date.now, k = h.Object.keys, C = h.Object.prototype.hasOwnProperty, M = h.Array.prototype.slice, S = function() {
          var t = function(t) {
              return t
          };
          if ("function" == typeof h.wrap && "function" == typeof h.unwrap)
              try {
                  var e = c.createElement("div")
                    , i = h.unwrap(e);
                  1 === e.nodeType && i && 1 === i.nodeType && (t = h.unwrap)
              } catch (t) {}
          return t
      }(), A = function(t) {
          return M.call(t, 0)
      }, I = function() {
          var t, e, i, n, o, r = A(arguments), a = r[0] || {};
          for (t = 1,
          e = r.length; t < e; t++)
              if (null != (i = r[t]))
                  for (n in i)
                      C.call(i, n) && (a[n],
                      a !== (o = i[n]) && void 0 !== o && (a[n] = o));
          return a
      }, N = function(t) {
          var e, i, n, o;
          if ("object" != typeof t || null == t || "number" == typeof t.nodeType)
              e = t;
          else if ("number" == typeof t.length)
              for (e = [],
              i = 0,
              n = t.length; i < n; i++)
                  C.call(t, i) && (e[i] = N(t[i]));
          else
              for (o in e = {},
              t)
                  C.call(t, o) && (e[o] = N(t[o]));
          return e
      }, _ = function(t, e) {
          for (var i = {}, n = 0, o = e.length; n < o; n++)
              e[n]in t && (i[e[n]] = t[e[n]]);
          return i
      }, E = function(t, e) {
          var i = {};
          for (var n in t)
              -1 === e.indexOf(n) && (i[n] = t[n]);
          return i
      }, O = function(t, e) {
          if (t && 1 === t.nodeType && t.ownerDocument && e && (1 === e.nodeType && e.ownerDocument && e.ownerDocument === t.ownerDocument || 9 === e.nodeType && !e.ownerDocument && e === t.ownerDocument))
              do {
                  if (t === e)
                      return !0;
                  t = t.parentNode
              } while (t);return !1
      }, D = function(t) {
          var e;
          return "string" == typeof t && t && (e = t.split("#")[0].split("?")[0],
          e = t.slice(0, t.lastIndexOf("/") + 1)),
          e
      }, L = null == h.opener && (!!h.top && h != h.top || !!h.parent && h != h.parent), z = "html" === c.documentElement.nodeName, H = {
          bridge: null,
          version: "0.0.0",
          pluginType: "unknown",
          sandboxed: null,
          disabled: null,
          outdated: null,
          insecure: null,
          unavailable: null,
          degraded: null,
          deactivated: null,
          overdue: null,
          ready: null
      }, F = {}, j = {}, B = null, R = 0, V = 0, W = {
          ready: "Flash communication is established",
          error: {
              "flash-sandboxed": "Attempting to run Flash in a sandboxed iframe, which is impossible",
              "flash-disabled": "Flash is disabled or not installed. May also be attempting to run Flash in a sandboxed iframe, which is impossible.",
              "flash-outdated": "Flash is too outdated to support ZeroClipboard",
              "flash-insecure": "Flash will be unable to communicate due to a protocol mismatch between your `swfPath` configuration and the page",
              "flash-unavailable": "Flash is unable to communicate bidirectionally with JavaScript",
              "flash-degraded": "Flash is unable to preserve data fidelity when communicating with JavaScript",
              "flash-deactivated": "Flash is too outdated for your browser and/or is configured as click-to-activate.\nThis may also mean that the ZeroClipboard SWF object could not be loaded, so please check your `swfPath` configuration and/or network connectivity.\nMay also be attempting to run Flash in a sandboxed iframe, which is impossible.",
              "flash-overdue": "Flash communication was established but NOT within the acceptable time limit",
              "version-mismatch": "ZeroClipboard JS version number does not match ZeroClipboard SWF version number",
              "clipboard-error": "At least one error was thrown while ZeroClipboard was attempting to inject your data into the clipboard",
              "config-mismatch": "ZeroClipboard configuration does not match Flash's reality",
              "swf-not-found": "The ZeroClipboard SWF object could not be loaded, so please check your `swfPath` configuration and/or network connectivity",
              "browser-unsupported": "The browser does not support the required HTML DOM and JavaScript features"
          }
      }, U = ["flash-unavailable", "flash-degraded", "flash-overdue", "version-mismatch", "config-mismatch", "clipboard-error"], J = ["flash-sandboxed", "flash-disabled", "flash-outdated", "flash-insecure", "flash-unavailable", "flash-degraded", "flash-deactivated", "flash-overdue"], X = new RegExp("^flash-(" + J.map(function(t) {
          return t.replace(/^flash-/, "")
      }).join("|") + ")$"), Y = new RegExp("^flash-(" + J.filter(function(t) {
          return "flash-disabled" !== t
      }).map(function(t) {
          return t.replace(/^flash-/, "")
      }).join("|") + ")$"), G = {
          swfPath: (D(function() {
              var t, e, i;
              if (c.currentScript && (t = c.currentScript.src))
                  return t;
              if (1 === (e = c.getElementsByTagName("script")).length)
                  return e[0].src || void 0;
              if ("readyState"in (e[0] || document.createElement("script")))
                  for (i = e.length; i--; )
                      if ("interactive" === e[i].readyState && (t = e[i].src))
                          return t;
              return "loading" === c.readyState && (t = e[e.length - 1].src) ? t : (t = function() {
                  var t, e;
                  try {
                      throw new b
                  } catch (t) {
                      e = t
                  }
                  return e && (t = e.sourceURL || e.fileName || function(t) {
                      var e, i;
                      return "string" == typeof t && t && ((i = t.match(/^(?:|[^:@]*@|.+\)@(?=http[s]?|file)|.+?\s+(?: at |@)(?:[^:\(]+ )*[\(]?)((?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/)) && i[1] ? e = i[1] : (i = t.match(/\)@((?:http[s]?|file):\/\/[\/]?.+?\/[^:\)]*?)(?::\d+)(?::\d+)?/)) && i[1] && (e = i[1])),
                      e
                  }(e.stack)),
                  t
              }()) ? t : void 0
          }()) || function() {
              var t, e, i, n = c.getElementsByTagName("script");
              for (t = n.length; t--; ) {
                  if (!(i = n[t].src)) {
                      e = null;
                      break
                  }
                  if (i = D(i),
                  null == e)
                      e = i;
                  else if (e !== i) {
                      e = null;
                      break
                  }
              }
              return e || void 0
          }() || "") + "ZeroClipboard.swf",
          trustedDomains: h.location.host ? [h.location.host] : [],
          cacheBust: !0,
          forceEnhancedClipboard: !1,
          flashLoadTimeout: 3e4,
          autoActivate: !0,
          bubbleEvents: !0,
          fixLineEndings: !0,
          containerId: "global-zeroclipboard-html-bridge",
          containerClass: "global-zeroclipboard-container",
          swfObjectId: "global-zeroclipboard-flash-bridge",
          hoverClass: "zeroclipboard-is-hover",
          activeClass: "zeroclipboard-is-active",
          forceHandCursor: !1,
          title: null,
          zIndex: 999999999
      }, q = function() {
          return !!(c.addEventListener && h.Object.keys && h.Array.prototype.map)
      }, Z = function() {
          var t = G.swfPath || ""
            , e = t.slice(0, 2)
            , i = t.slice(0, t.indexOf("://") + 1);
          return "\\\\" === e ? "file:" : "//" === e || "" === i ? h.location.protocol : i
      }, K = function(t) {
          var e;
          if ("string" == typeof t && t ? (e = t,
          t = {}) : "object" == typeof t && t && "string" == typeof t.type && t.type && (e = t.type),
          e) {
              e = e.toLowerCase(),
              !t.target && (/^(copy|aftercopy|_click)$/.test(e) || "error" === e && "clipboard-error" === t.name) && (t.target = l),
              I(t, {
                  type: e,
                  target: t.target || s || null,
                  relatedTarget: t.relatedTarget || null,
                  currentTarget: H && H.bridge || null,
                  timeStamp: t.timeStamp || T() || null
              });
              var i = W[t.type];
              return "error" === t.type && t.name && i && (i = i[t.name]),
              i && (t.message = i),
              "ready" === t.type && I(t, {
                  target: null,
                  version: H.version
              }),
              "error" === t.type && (X.test(t.name) && I(t, {
                  target: null,
                  minimumVersion: "11.0.0"
              }),
              Y.test(t.name) && I(t, {
                  version: H.version
              }),
              "flash-insecure" === t.name && I(t, {
                  pageProtocol: h.location.protocol,
                  swfProtocol: Z()
              })),
              "copy" === t.type && (t.clipboardData = {
                  setData: Pt.setData,
                  clearData: Pt.clearData
              }),
              "aftercopy" === t.type && (t = at(t, B)),
              t.target && !t.relatedTarget && (t.relatedTarget = Q(t.target)),
              tt(t)
          }
      }, Q = function(t) {
          var e = t && t.getAttribute && t.getAttribute("data-clipboard-target");
          return e ? c.getElementById(e) : null
      }, tt = function(t) {
          if (t && /^_(?:click|mouse(?:over|out|down|up|move))$/.test(t.type)) {
              var e = t.target
                , i = "_mouseover" === t.type && t.relatedTarget ? t.relatedTarget : void 0
                , n = "_mouseout" === t.type && t.relatedTarget ? t.relatedTarget : void 0
                , o = ft(e)
                , r = h.screenLeft || h.screenX || 0
                , a = h.screenTop || h.screenY || 0
                , s = c.body.scrollLeft + c.documentElement.scrollLeft
                , l = c.body.scrollTop + c.documentElement.scrollTop
                , d = o.left + ("number" == typeof t._stageX ? t._stageX : 0)
                , p = o.top + ("number" == typeof t._stageY ? t._stageY : 0)
                , u = d - s
                , g = p - l
                , f = r + u
                , m = a + g
                , v = "number" == typeof t.movementX ? t.movementX : 0
                , y = "number" == typeof t.movementY ? t.movementY : 0;
              delete t._stageX,
              delete t._stageY,
              I(t, {
                  srcElement: e,
                  fromElement: i,
                  toElement: n,
                  screenX: f,
                  screenY: m,
                  pageX: d,
                  pageY: p,
                  clientX: u,
                  clientY: g,
                  x: u,
                  y: g,
                  movementX: v,
                  movementY: y,
                  offsetX: 0,
                  offsetY: 0,
                  layerX: 0,
                  layerY: 0
              })
          }
          return t
      }, et = function(t) {
          var e = t && "string" == typeof t.type && t.type || "";
          return !/^(?:(?:before)?copy|destroy)$/.test(e)
      }, it = function(t, e, i, n) {
          n ? p(function() {
              t.apply(e, i)
          }, 0) : t.apply(e, i)
      }, nt = function(t) {
          if (t.errors && t.errors.length > 0) {
              var e = N(t);
              I(e, {
                  type: "error",
                  name: "clipboard-error"
              }),
              delete e.success,
              p(function() {
                  Pt.emit(e)
              }, 0)
          }
      }, ot = function(t) {
          if (t && "string" == typeof t.type && t) {
              var e, i = t.target || null, n = i && i.ownerDocument || c, o = {
                  view: n.defaultView || h,
                  canBubble: !0,
                  cancelable: !0,
                  detail: "click" === t.type ? 1 : 0,
                  button: "number" == typeof t.which ? t.which - 1 : "number" == typeof t.button ? t.button : n.createEvent ? 0 : 1
              }, r = I(o, t);
              i && n.createEvent && i.dispatchEvent && (r = [r.type, r.canBubble, r.cancelable, r.view, r.detail, r.screenX, r.screenY, r.clientX, r.clientY, r.ctrlKey, r.altKey, r.shiftKey, r.metaKey, r.button, r.relatedTarget],
              (e = n.createEvent("MouseEvents")).initMouseEvent && (e.initMouseEvent.apply(e, r),
              e._source = "js",
              i.dispatchEvent(e)))
          }
      }, rt = function(t) {
          for (var e = t && t.parentNode; e && "OBJECT" === e.nodeName && e.parentNode; )
              e = e.parentNode;
          return e || null
      }, at = function(t, e) {
          if ("object" != typeof t || !t || "object" != typeof e || !e)
              return t;
          var i = {};
          for (var n in t)
              if (C.call(t, n))
                  if ("errors" === n) {
                      i[n] = t[n] ? t[n].slice() : [];
                      for (var o = 0, r = i[n].length; o < r; o++)
                          i[n][o].format = e[i[n][o].format]
                  } else if ("success" !== n && "data" !== n)
                      i[n] = t[n];
                  else {
                      i[n] = {};
                      var a = t[n];
                      for (var s in a)
                          s && C.call(a, s) && C.call(e, s) && (i[n][e[s]] = a[s])
                  }
          return i
      }, st = function(t, e) {
          return null == e || e && !0 === e.cacheBust ? (-1 === t.indexOf("?") ? "?" : "&") + "noCache=" + T() : ""
      }, lt = function(t) {
          var e, i, n, o, r = "", a = [];
          if (t.trustedDomains && ("string" == typeof t.trustedDomains ? o = [t.trustedDomains] : "object" == typeof t.trustedDomains && "length"in t.trustedDomains && (o = t.trustedDomains)),
          o && o.length)
              for (e = 0,
              i = o.length; e < i; e++)
                  if (C.call(o, e) && o[e] && "string" == typeof o[e]) {
                      if (!(n = ht(o[e])))
                          continue;
                      if ("*" === n) {
                          a.length = 0,
                          a.push(n);
                          break
                      }
                      a.push.apply(a, [n, "//" + n, h.location.protocol + "//" + n])
                  }
          return a.length && (r += "trustedOrigins=" + v(a.join(","))),
          !0 === t.forceEnhancedClipboard && (r += (r ? "&" : "") + "forceEnhancedClipboard=true"),
          "string" == typeof t.swfObjectId && t.swfObjectId && (r += (r ? "&" : "") + "swfObjectId=" + v(t.swfObjectId)),
          "string" == typeof t.jsVersion && t.jsVersion && (r += (r ? "&" : "") + "jsVersion=" + v(t.jsVersion)),
          r
      }, ht = function(t) {
          if (null == t || "" === t)
              return null;
          if ("" === (t = t.replace(/^\s+|\s+$/g, "")))
              return null;
          var e = t.indexOf("//")
            , i = (t = -1 === e ? t : t.slice(e + 2)).indexOf("/");
          return (t = -1 === i ? t : -1 === e || 0 === i ? null : t.slice(0, i)) && ".swf" === t.slice(-4).toLowerCase() ? null : t || null
      }, ct = function(t, e) {
          var i = ht(e.swfPath);
          null === i && (i = t);
          var n = function(t) {
              var e, i, n, o = [];
              if ("string" == typeof t && (t = [t]),
              "object" != typeof t || !t || "number" != typeof t.length)
                  return o;
              for (e = 0,
              i = t.length; e < i; e++)
                  if (C.call(t, e) && (n = ht(t[e]))) {
                      if ("*" === n) {
                          o.length = 0,
                          o.push("*");
                          break
                      }
                      -1 === o.indexOf(n) && o.push(n)
                  }
              return o
          }(e.trustedDomains)
            , o = n.length;
          if (o > 0) {
              if (1 === o && "*" === n[0])
                  return "always";
              if (-1 !== n.indexOf(t))
                  return 1 === o && t === i ? "sameDomain" : "always"
          }
          return "never"
      }, dt = function() {
          try {
              return c.activeElement
          } catch (t) {
              return null
          }
      }, pt = function(t, e) {
          var i, n, o, r = [];
          if ("string" == typeof e && e && (r = e.split(/\s+/)),
          t && 1 === t.nodeType && r.length > 0) {
              for (o = (" " + (t.className || "") + " ").replace(/[\t\r\n\f]/g, " "),
              i = 0,
              n = r.length; i < n; i++)
                  -1 === o.indexOf(" " + r[i] + " ") && (o += r[i] + " ");
              (o = o.replace(/^\s+|\s+$/g, "")) !== t.className && (t.className = o)
          }
          return t
      }, ut = function(t, e) {
          var i, n, o, r = [];
          if ("string" == typeof e && e && (r = e.split(/\s+/)),
          t && 1 === t.nodeType && r.length > 0 && t.className) {
              for (o = (" " + t.className + " ").replace(/[\t\r\n\f]/g, " "),
              i = 0,
              n = r.length; i < n; i++)
                  o = o.replace(" " + r[i] + " ", " ");
              (o = o.replace(/^\s+|\s+$/g, "")) !== t.className && (t.className = o)
          }
          return t
      }, gt = function(t, e) {
          var i = m(t, null).getPropertyValue(e);
          return "cursor" !== e || i && "auto" !== i || "A" !== t.nodeName ? i : "pointer"
      }, ft = function(t) {
          var e = {
              left: 0,
              top: 0,
              width: 0,
              height: 0
          };
          if (t.getBoundingClientRect) {
              var i = t.getBoundingClientRect()
                , n = h.pageXOffset
                , o = h.pageYOffset
                , r = c.documentElement.clientLeft || 0
                , a = c.documentElement.clientTop || 0
                , s = 0
                , l = 0;
              if ("relative" === gt(c.body, "position")) {
                  var d = c.body.getBoundingClientRect()
                    , p = c.documentElement.getBoundingClientRect();
                  s = d.left - p.left || 0,
                  l = d.top - p.top || 0
              }
              e.left = i.left + n - r - s,
              e.top = i.top + o - a - l,
              e.width = "width"in i ? i.width : i.right - i.left,
              e.height = "height"in i ? i.height : i.bottom - i.top
          }
          return e
      }, mt = function(t) {
          if (!t)
              return !1;
          var e = m(t, null);
          if (!e)
              return !1;
          var i = x(e.height) > 0
            , n = x(e.width) > 0
            , o = x(e.top) >= 0
            , r = x(e.left) >= 0
            , a = i && n && o && r
            , s = a ? null : ft(t);
          return "none" !== e.display && "collapse" !== e.visibility && (a || !!s && (i || s.height > 0) && (n || s.width > 0) && (o || s.top >= 0) && (r || s.left >= 0))
      }, vt = function() {
          u(R),
          R = 0,
          f(V),
          V = 0
      }, yt = function(t) {
          return /^(?:auto|inherit)$/.test(t) ? t : ("number" != typeof t || P(t) ? "string" == typeof t && (e = yt(w(t, 10))) : e = t,
          "number" == typeof e ? e : "auto");
          var e
      }, bt = function(t) {
          var e, i = /(\r\n|\r|\n)/g;
          return "string" == typeof t && !0 === G.fixLineEndings && (e = /win(dows|[\s]?(nt|me|ce|xp|vista|[\d]+))/i,
          d && (e.test(d.appVersion || "") || e.test(d.platform || "") || -1 !== (d.userAgent || "").indexOf("Windows")) ? /((^|[^\r])\n|\r([^\n]|$))/.test(t) && (t = t.replace(i, "\r\n")) : /\r/.test(t) && (t = t.replace(i, "\n"))),
          t
      }, wt = function(t) {
          var e, i, n, r = H.sandboxed, a = null;
          if (t = !0 === t,
          !1 === L)
              a = !1;
          else {
              try {
                  i = o.frameElement || null
              } catch (t) {
                  n = {
                      name: t.name,
                      message: t.message
                  }
              }
              if (i && 1 === i.nodeType && "IFRAME" === i.nodeName)
                  try {
                      a = i.hasAttribute("sandbox")
                  } catch (t) {
                      a = null
                  }
              else {
                  try {
                      e = document.domain || null
                  } catch (t) {
                      e = null
                  }
                  (null === e || n && "SecurityError" === n.name && /(^|[\s\(\[@])sandbox(es|ed|ing|[\s\.,!\)\]@]|$)/.test(n.message.toLowerCase())) && (a = !0)
              }
          }
          return H.sandboxed = a,
          r === a || t || xt(y),
          a
      }, xt = function(t) {
          var e, i, n = !1, o = !1, r = !1, a = "";
          function s(t) {
              var e = t.match(/[\d]+/g);
              return e.length = 3,
              e.join(".")
          }
          function l(t) {
              var e;
              t && (n = !0,
              t.version && (a = s(t.version)),
              !a && t.description && (a = s(t.description)),
              t.filename && (e = t.filename,
              r = !!e && (e = e.toLowerCase()) && (/^(pepflashplayer\.dll|libpepflashplayer\.so|pepperflashplayer\.plugin)$/.test(e) || "chrome.plugin" === e.slice(-13))))
          }
          if (d.plugins && d.plugins.length)
              l(d.plugins["Shockwave Flash"]),
              d.plugins["Shockwave Flash 2.0"] && (n = !0,
              a = "2.0.0.11");
          else if (d.mimeTypes && d.mimeTypes.length)
              l((i = d.mimeTypes["application/x-shockwave-flash"]) && i.enabledPlugin);
          else if (void 0 !== t) {
              o = !0;
              try {
                  e = new t("ShockwaveFlash.ShockwaveFlash.7"),
                  n = !0,
                  a = s(e.GetVariable("$version"))
              } catch (i) {
                  try {
                      e = new t("ShockwaveFlash.ShockwaveFlash.6"),
                      n = !0,
                      a = "6.0.21"
                  } catch (i) {
                      try {
                          e = new t("ShockwaveFlash.ShockwaveFlash"),
                          n = !0,
                          a = s(e.GetVariable("$version"))
                      } catch (t) {
                          o = !1
                      }
                  }
              }
          }
          H.disabled = !0 !== n,
          H.outdated = a && x(a) < x("11.0.0"),
          H.version = a || "0.0.0",
          H.pluginType = r ? "pepper" : o ? "activex" : n ? "netscape" : "unknown"
      };
      xt(y),
      wt(!0);
      var Pt = function() {
          if (!(this instanceof Pt))
              return new Pt;
          "function" == typeof Pt._createClient && Pt._createClient.apply(this, A(arguments))
      };
      Pt.version = "2.3.0",
      Pt.config = function() {
          return function(t) {
              return "object" != typeof t || !t || "length"in t || k(t).forEach(function(e) {
                  if (/^(?:forceHandCursor|title|zIndex|bubbleEvents|fixLineEndings)$/.test(e))
                      G[e] = t[e];
                  else if (null == H.bridge)
                      if ("containerId" === e || "swfObjectId" === e) {
                          if (!function(t) {
                              return "string" == typeof t && t && /^[A-Za-z][A-Za-z0-9_:\-\.]*$/.test(t)
                          }(t[e]))
                              throw new Error("The specified `" + e + "` value is not valid as an HTML4 Element ID");
                          G[e] = t[e]
                      } else
                          G[e] = t[e]
              }),
              "string" == typeof t && t ? C.call(G, t) ? G[t] : void 0 : N(G)
          }
          .apply(this, A(arguments))
      }
      ,
      Pt.state = function() {
          return function() {
              return wt(),
              {
                  browser: I(_(d, ["userAgent", "platform", "appName", "appVersion"]), {
                      isSupported: q()
                  }),
                  flash: E(H, ["bridge"]),
                  zeroclipboard: {
                      version: Pt.version,
                      config: Pt.config()
                  }
              }
          }
          .apply(this, A(arguments))
      }
      ,
      Pt.isFlashUnusable = function() {
          return function() {
              return !!(H.sandboxed || H.disabled || H.outdated || H.unavailable || H.degraded || H.deactivated)
          }
          .apply(this, A(arguments))
      }
      ,
      Pt.on = function() {
          return function(t, e) {
              var i, n, o, r = {};
              if ("string" == typeof t && t ? o = t.toLowerCase().split(/\s+/) : "object" != typeof t || !t || "length"in t || void 0 !== e || k(t).forEach(function(e) {
                  var i = t[e];
                  "function" == typeof i && Pt.on(e, i)
              }),
              o && o.length && e) {
                  for (i = 0,
                  n = o.length; i < n; i++)
                      r[t = o[i].replace(/^on/, "")] = !0,
                      F[t] || (F[t] = []),
                      F[t].push(e);
                  if (r.ready && H.ready && Pt.emit({
                      type: "ready"
                  }),
                  r.error) {
                      for (q() || Pt.emit({
                          type: "error",
                          name: "browser-unsupported"
                      }),
                      i = 0,
                      n = J.length; i < n; i++)
                          if (!0 === H[J[i].replace(/^flash-/, "")]) {
                              Pt.emit({
                                  type: "error",
                                  name: J[i]
                              });
                              break
                          }
                      void 0 !== a && Pt.version !== a && Pt.emit({
                          type: "error",
                          name: "version-mismatch",
                          jsVersion: Pt.version,
                          swfVersion: a
                      })
                  }
              }
              return Pt
          }
          .apply(this, A(arguments))
      }
      ,
      Pt.off = function() {
          return function(t, e) {
              var i, n, o, r, a;
              if (0 === arguments.length ? r = k(F) : "string" == typeof t && t ? r = t.toLowerCase().split(/\s+/) : "object" != typeof t || !t || "length"in t || void 0 !== e || k(t).forEach(function(e) {
                  var i = t[e];
                  "function" == typeof i && Pt.off(e, i)
              }),
              r && r.length)
                  for (i = 0,
                  n = r.length; i < n; i++)
                      if (t = r[i].replace(/^on/, ""),
                      (a = F[t]) && a.length)
                          if (e)
                              for (o = a.indexOf(e); -1 !== o; )
                                  a.splice(o, 1),
                                  o = a.indexOf(e, o);
                          else
                              a.length = 0;
              return Pt
          }
          .apply(this, A(arguments))
      }
      ,
      Pt.handlers = function() {
          return function(t) {
              return "string" == typeof t && t ? N(F[t]) || null : N(F)
          }
          .apply(this, A(arguments))
      }
      ,
      Pt.emit = function() {
          return function(t) {
              var e, i, n;
              if ((t = K(t)) && !function(t) {
                  var e = t.target || s || null
                    , i = "swf" === t._source;
                  switch (delete t._source,
                  t.type) {
                  case "error":
                      var n = "flash-sandboxed" === t.name || function(t) {
                          var e = null;
                          return (!1 === L || t && "error" === t.type && t.name && -1 !== U.indexOf(t.name)) && (e = !1),
                          e
                      }(t);
                      "boolean" == typeof n && (H.sandboxed = n),
                      "browser-unsupported" === t.name ? I(H, {
                          disabled: !1,
                          outdated: !1,
                          unavailable: !1,
                          degraded: !1,
                          deactivated: !1,
                          overdue: !1,
                          ready: !1
                      }) : -1 !== J.indexOf(t.name) ? I(H, {
                          disabled: "flash-disabled" === t.name,
                          outdated: "flash-outdated" === t.name,
                          insecure: "flash-insecure" === t.name,
                          unavailable: "flash-unavailable" === t.name,
                          degraded: "flash-degraded" === t.name,
                          deactivated: "flash-deactivated" === t.name,
                          overdue: "flash-overdue" === t.name,
                          ready: !1
                      }) : "version-mismatch" === t.name && (a = t.swfVersion,
                      I(H, {
                          disabled: !1,
                          outdated: !1,
                          insecure: !1,
                          unavailable: !1,
                          degraded: !1,
                          deactivated: !1,
                          overdue: !1,
                          ready: !1
                      })),
                      vt();
                      break;
                  case "ready":
                      a = t.swfVersion;
                      var o = !0 === H.deactivated;
                      I(H, {
                          sandboxed: !1,
                          disabled: !1,
                          outdated: !1,
                          insecure: !1,
                          unavailable: !1,
                          degraded: !1,
                          deactivated: !1,
                          overdue: o,
                          ready: !o
                      }),
                      vt();
                      break;
                  case "beforecopy":
                      l = e;
                      break;
                  case "copy":
                      var r, h, c = t.relatedTarget;
                      !j["text/html"] && !j["text/plain"] && c && (h = c.value || c.outerHTML || c.innerHTML) && (r = c.value || c.textContent || c.innerText) ? (t.clipboardData.clearData(),
                      t.clipboardData.setData("text/plain", r),
                      h !== r && t.clipboardData.setData("text/html", h)) : !j["text/plain"] && t.target && (r = t.target.getAttribute("data-clipboard-text")) && (t.clipboardData.clearData(),
                      t.clipboardData.setData("text/plain", r));
                      break;
                  case "aftercopy":
                      nt(t),
                      Pt.clearData(),
                      e && e !== dt() && e.focus && e.focus();
                      break;
                  case "_mouseover":
                      Pt.focus(e),
                      !0 === G.bubbleEvents && i && (e && e !== t.relatedTarget && !O(t.relatedTarget, e) && ot(I({}, t, {
                          type: "mouseenter",
                          bubbles: !1,
                          cancelable: !1
                      })),
                      ot(I({}, t, {
                          type: "mouseover"
                      })));
                      break;
                  case "_mouseout":
                      Pt.blur(),
                      !0 === G.bubbleEvents && i && (e && e !== t.relatedTarget && !O(t.relatedTarget, e) && ot(I({}, t, {
                          type: "mouseleave",
                          bubbles: !1,
                          cancelable: !1
                      })),
                      ot(I({}, t, {
                          type: "mouseout"
                      })));
                      break;
                  case "_mousedown":
                      pt(e, G.activeClass),
                      !0 === G.bubbleEvents && i && ot(I({}, t, {
                          type: t.type.slice(1)
                      }));
                      break;
                  case "_mouseup":
                      ut(e, G.activeClass),
                      !0 === G.bubbleEvents && i && ot(I({}, t, {
                          type: t.type.slice(1)
                      }));
                      break;
                  case "_click":
                      l = null,
                      !0 === G.bubbleEvents && i && ot(I({}, t, {
                          type: t.type.slice(1)
                      }));
                      break;
                  case "_mousemove":
                      !0 === G.bubbleEvents && i && ot(I({}, t, {
                          type: t.type.slice(1)
                      }))
                  }
                  if (/^_(?:click|mouse(?:over|out|down|up|move))$/.test(t.type))
                      return !0
              }(t))
                  return "ready" === t.type && !0 === H.overdue ? Pt.emit({
                      type: "error",
                      name: "flash-overdue"
                  }) : (e = I({}, t),
                  function(t) {
                      if ("object" == typeof t && t && t.type) {
                          var e, i, n, o, r, a = et(t), s = F["*"] || [], l = F[t.type] || [], c = s.concat(l);
                          if (c && c.length)
                              for (e = 0,
                              i = c.length; e < i; e++)
                                  o = this,
                                  "string" == typeof (n = c[e]) && "function" == typeof h[n] && (n = h[n]),
                                  "object" == typeof n && n && "function" == typeof n.handleEvent && (o = n,
                                  n = n.handleEvent),
                                  "function" == typeof n && (r = I({}, t),
                                  it(n, o, [r], a));
                          return this
                      }
                  }
                  .call(this, e),
                  "copy" === t.type && (i = (n = function(t) {
                      var e = {}
                        , i = {};
                      if ("object" == typeof t && t) {
                          for (var n in t)
                              if (n && C.call(t, n) && "string" == typeof t[n] && t[n])
                                  switch (n.toLowerCase()) {
                                  case "text/plain":
                                  case "text":
                                  case "air:text":
                                  case "flash:text":
                                      e.text = t[n],
                                      i.text = n;
                                      break;
                                  case "text/html":
                                  case "html":
                                  case "air:html":
                                  case "flash:html":
                                      e.html = t[n],
                                      i.html = n;
                                      break;
                                  case "application/rtf":
                                  case "text/rtf":
                                  case "rtf":
                                  case "richtext":
                                  case "air:rtf":
                                  case "flash:rtf":
                                      e.rtf = t[n],
                                      i.rtf = n
                                  }
                          return {
                              data: e,
                              formatMap: i
                          }
                      }
                  }(j)).data,
                  B = n.formatMap),
                  i)
          }
          .apply(this, A(arguments))
      }
      ,
      Pt.create = function() {
          return function() {
              var t, e, i = H.sandboxed;
              if (!q())
                  return H.ready = !1,
                  void Pt.emit({
                      type: "error",
                      name: "browser-unsupported"
                  });
              wt(),
              "boolean" != typeof H.ready && (H.ready = !1),
              H.sandboxed !== i && !0 === H.sandboxed ? (H.ready = !1,
              Pt.emit({
                  type: "error",
                  name: "flash-sandboxed"
              })) : Pt.isFlashUnusable() || null !== H.bridge || ((e = Z()) && e !== h.location.protocol ? Pt.emit({
                  type: "error",
                  name: "flash-insecure"
              }) : ("number" == typeof (t = G.flashLoadTimeout) && t >= 0 && (R = p(function() {
                  "boolean" != typeof H.deactivated && (H.deactivated = !0),
                  !0 === H.deactivated && Pt.emit({
                      type: "error",
                      name: "flash-deactivated"
                  })
              }, t)),
              H.overdue = !1,
              function() {
                  var t, e, i = H.bridge, n = rt(i);
                  if (!i) {
                      var o = ct(h.location.host, G)
                        , r = "never" === o ? "none" : "all"
                        , a = lt(I({
                          jsVersion: Pt.version
                      }, G))
                        , s = G.swfPath + st(G.swfPath, G);
                      z && (s = "string" == typeof (e = s) && e ? e.replace(/["&'<>]/g, function(t) {
                          switch (t) {
                          case '"':
                              return "&quot;";
                          case "&":
                              return "&amp;";
                          case "'":
                              return "&apos;";
                          case "<":
                              return "&lt;";
                          case ">":
                              return "&gt;";
                          default:
                              return t
                          }
                      }) : e),
                      n = function() {
                          var t = c.createElement("div");
                          return t.id = G.containerId,
                          t.className = G.containerClass,
                          t.style.position = "absolute",
                          t.style.left = "0px",
                          t.style.top = "-9999px",
                          t.style.width = "1px",
                          t.style.height = "1px",
                          t.style.zIndex = "" + yt(G.zIndex),
                          t
                      }();
                      var l = c.createElement("div");
                      n.appendChild(l),
                      c.body.appendChild(n);
                      var d = c.createElement("div")
                        , p = "activex" === H.pluginType;
                      d.innerHTML = '<object id="' + G.swfObjectId + '" name="' + G.swfObjectId + '" width="100%" height="100%" ' + (p ? 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"' : 'type="application/x-shockwave-flash" data="' + s + '"') + ">" + (p ? '<param name="movie" value="' + s + '"/>' : "") + '<param name="allowScriptAccess" value="' + o + '"/><param name="allowNetworking" value="' + r + '"/><param name="menu" value="false"/><param name="wmode" value="transparent"/><param name="flashvars" value="' + a + '"/><div id="' + G.swfObjectId + '_fallbackContent">&nbsp;</div></object>',
                      i = d.firstChild,
                      d = null,
                      S(i).ZeroClipboard = Pt,
                      n.replaceChild(i, l),
                      function() {
                          var t = G.flashLoadTimeout;
                          if ("number" == typeof t && t >= 0) {
                              var e = Math.min(1e3, t / 10)
                                , i = G.swfObjectId + "_fallbackContent";
                              V = g(function() {
                                  var t = c.getElementById(i);
                                  mt(t) && (vt(),
                                  H.deactivated = null,
                                  Pt.emit({
                                      type: "error",
                                      name: "swf-not-found"
                                  }))
                              }, e)
                          }
                      }()
                  }
                  i || ((i = c[G.swfObjectId]) && (t = i.length) && (i = i[t - 1]),
                  !i && n && (i = n.firstChild)),
                  H.bridge = i || null
              }()))
          }
          .apply(this, A(arguments))
      }
      ,
      Pt.destroy = function() {
          return function() {
              Pt.clearData(),
              Pt.blur(),
              Pt.emit("destroy"),
              function() {
                  var t = H.bridge;
                  if (t) {
                      var e = rt(t);
                      e && ("activex" === H.pluginType && "readyState"in t ? (t.style.display = "none",
                      function i() {
                          if (4 === t.readyState) {
                              for (var n in t)
                                  "function" == typeof t[n] && (t[n] = null);
                              t.parentNode && t.parentNode.removeChild(t),
                              e.parentNode && e.parentNode.removeChild(e)
                          } else
                              p(i, 10)
                      }()) : (t.parentNode && t.parentNode.removeChild(t),
                      e.parentNode && e.parentNode.removeChild(e))),
                      vt(),
                      H.ready = null,
                      H.bridge = null,
                      H.deactivated = null,
                      H.insecure = null,
                      a = void 0
                  }
              }(),
              Pt.off()
          }
          .apply(this, A(arguments))
      }
      ,
      Pt.setData = function() {
          return function(t, e) {
              var i;
              if ("object" == typeof t && t && void 0 === e)
                  i = t,
                  Pt.clearData();
              else {
                  if ("string" != typeof t || !t)
                      return;
                  (i = {})[t] = e
              }
              for (var n in i)
                  "string" == typeof n && n && C.call(i, n) && "string" == typeof i[n] && i[n] && (j[n] = bt(i[n]))
          }
          .apply(this, A(arguments))
      }
      ,
      Pt.clearData = function() {
          return function(t) {
              void 0 === t ? (function(t) {
                  if (t)
                      for (var e in t)
                          C.call(t, e) && delete t[e]
              }(j),
              B = null) : "string" == typeof t && C.call(j, t) && delete j[t]
          }
          .apply(this, A(arguments))
      }
      ,
      Pt.getData = function() {
          return function(t) {
              return void 0 === t ? N(j) : "string" == typeof t && C.call(j, t) ? j[t] : void 0
          }
          .apply(this, A(arguments))
      }
      ,
      Pt.focus = Pt.activate = function() {
          return function(t) {
              if (t && 1 === t.nodeType) {
                  s && (ut(s, G.activeClass),
                  s !== t && ut(s, G.hoverClass)),
                  s = t,
                  pt(t, G.hoverClass);
                  var e = t.getAttribute("title") || G.title;
                  if ("string" == typeof e && e) {
                      var i = rt(H.bridge);
                      i && i.setAttribute("title", e)
                  }
                  (function(t) {
                      !0 === H.ready && (H.bridge && "function" == typeof H.bridge.setHandCursor ? H.bridge.setHandCursor(t) : H.ready = !1)
                  }
                  )(!0 === G.forceHandCursor || "pointer" === gt(t, "cursor")),
                  function() {
                      var t;
                      if (s && (t = rt(H.bridge))) {
                          var e = ft(s);
                          I(t.style, {
                              width: e.width + "px",
                              height: e.height + "px",
                              top: e.top + "px",
                              left: e.left + "px",
                              zIndex: "" + yt(G.zIndex)
                          })
                      }
                  }()
              }
          }
          .apply(this, A(arguments))
      }
      ,
      Pt.blur = Pt.deactivate = function() {
          return function() {
              var t = rt(H.bridge);
              t && (t.removeAttribute("title"),
              t.style.left = "0px",
              t.style.top = "-9999px",
              t.style.width = "1px",
              t.style.height = "1px"),
              s && (ut(s, G.hoverClass),
              ut(s, G.activeClass),
              s = null)
          }
          .apply(this, A(arguments))
      }
      ,
      Pt.activeElement = function() {
          return function() {
              return s || null
          }
          .apply(this, A(arguments))
      }
      ;
      var Tt = 0
        , kt = {}
        , Ct = 0
        , Mt = {}
        , St = {};
      I(G, {
          autoActivate: !0
      });
      var At = function(t) {
          return "string" == typeof t && (t = []),
          "number" != typeof t.length ? [t] : t
      }
        , It = function(t) {
          if (t && 1 === t.nodeType) {
              var e = function(t) {
                  (t || (t = h.event)) && ("js" !== t._source && (t.stopImmediatePropagation(),
                  t.preventDefault()),
                  delete t._source)
              }
                , i = function(i) {
                  (i || (i = h.event)) && (e(i),
                  Pt.focus(t))
              };
              t.addEventListener("mouseover", i, !1),
              t.addEventListener("mouseout", e, !1),
              t.addEventListener("mouseenter", e, !1),
              t.addEventListener("mouseleave", e, !1),
              t.addEventListener("mousemove", e, !1),
              St[t.zcClippingId] = {
                  mouseover: i,
                  mouseout: e,
                  mouseenter: e,
                  mouseleave: e,
                  mousemove: e
              }
          }
      }
        , Nt = function(t) {
          if (t && 1 === t.nodeType) {
              var e = St[t.zcClippingId];
              if ("object" == typeof e && e) {
                  for (var i, n, o = ["move", "leave", "enter", "out", "over"], r = 0, a = o.length; r < a; r++)
                      "function" == typeof (n = e[i = "mouse" + o[r]]) && t.removeEventListener(i, n, !1);
                  delete St[t.zcClippingId]
              }
          }
      };
      Pt._createClient = function() {
          (function(t) {
              var e, i = this;
              i.id = "" + Tt++,
              e = {
                  instance: i,
                  elements: [],
                  handlers: {},
                  coreWildcardHandler: function(t) {
                      return i.emit(t)
                  }
              },
              kt[i.id] = e,
              t && i.clip(t),
              Pt.on("*", e.coreWildcardHandler),
              Pt.on("destroy", function() {
                  i.destroy()
              }),
              Pt.create()
          }
          ).apply(this, A(arguments))
      }
      ,
      Pt.prototype.on = function() {
          return function(t, e) {
              var i, n, o, r = {}, s = this, l = kt[s.id], h = l && l.handlers;
              if (!l)
                  throw new Error("Attempted to add new listener(s) to a destroyed ZeroClipboard client instance");
              if ("string" == typeof t && t ? o = t.toLowerCase().split(/\s+/) : "object" != typeof t || !t || "length"in t || void 0 !== e || k(t).forEach(function(e) {
                  var i = t[e];
                  "function" == typeof i && s.on(e, i)
              }),
              o && o.length && e) {
                  for (i = 0,
                  n = o.length; i < n; i++)
                      r[t = o[i].replace(/^on/, "")] = !0,
                      h[t] || (h[t] = []),
                      h[t].push(e);
                  if (r.ready && H.ready && this.emit({
                      type: "ready",
                      client: this
                  }),
                  r.error) {
                      for (i = 0,
                      n = J.length; i < n; i++)
                          if (H[J[i].replace(/^flash-/, "")]) {
                              this.emit({
                                  type: "error",
                                  name: J[i],
                                  client: this
                              });
                              break
                          }
                      void 0 !== a && Pt.version !== a && this.emit({
                          type: "error",
                          name: "version-mismatch",
                          jsVersion: Pt.version,
                          swfVersion: a
                      })
                  }
              }
              return s
          }
          .apply(this, A(arguments))
      }
      ,
      Pt.prototype.off = function() {
          return function(t, e) {
              var i, n, o, r, a, s = this, l = kt[s.id], h = l && l.handlers;
              if (!h)
                  return s;
              if (0 === arguments.length ? r = k(h) : "string" == typeof t && t ? r = t.split(/\s+/) : "object" != typeof t || !t || "length"in t || void 0 !== e || k(t).forEach(function(e) {
                  var i = t[e];
                  "function" == typeof i && s.off(e, i)
              }),
              r && r.length)
                  for (i = 0,
                  n = r.length; i < n; i++)
                      if ((a = h[t = r[i].toLowerCase().replace(/^on/, "")]) && a.length)
                          if (e)
                              for (o = a.indexOf(e); -1 !== o; )
                                  a.splice(o, 1),
                                  o = a.indexOf(e, o);
                          else
                              a.length = 0;
              return s
          }
          .apply(this, A(arguments))
      }
      ,
      Pt.prototype.handlers = function() {
          return function(t) {
              var e = null
                , i = kt[this.id] && kt[this.id].handlers;
              return i && (e = "string" == typeof t && t ? i[t] ? i[t].slice(0) : [] : N(i)),
              e
          }
          .apply(this, A(arguments))
      }
      ,
      Pt.prototype.emit = function() {
          return function(t) {
              var e;
              return function(t) {
                  if (!t || !t.type)
                      return !1;
                  if (t.client && t.client !== this)
                      return !1;
                  var e = kt[this.id]
                    , i = e && e.elements
                    , n = !!i && i.length > 0
                    , o = !t.target || n && -1 !== i.indexOf(t.target)
                    , r = t.relatedTarget && n && -1 !== i.indexOf(t.relatedTarget)
                    , a = t.client && t.client === this;
                  return !(!e || !(o || r || a))
              }
              .call(this, t) && ("object" == typeof t && t && "string" == typeof t.type && t.type && (t = I({}, t)),
              e = I({}, K(t), {
                  client: this
              }),
              function(t) {
                  var e = kt[this.id];
                  if ("object" == typeof t && t && t.type && e) {
                      var i, n, o, r, a, s = et(t), l = e && e.handlers["*"] || [], c = e && e.handlers[t.type] || [], d = l.concat(c);
                      if (d && d.length)
                          for (i = 0,
                          n = d.length; i < n; i++)
                              r = this,
                              "string" == typeof (o = d[i]) && "function" == typeof h[o] && (o = h[o]),
                              "object" == typeof o && o && "function" == typeof o.handleEvent && (r = o,
                              o = o.handleEvent),
                              "function" == typeof o && (a = I({}, t),
                              it(o, r, [a], s))
                  }
              }
              .call(this, e)),
              this
          }
          .apply(this, A(arguments))
      }
      ,
      Pt.prototype.clip = function() {
          return function(t) {
              if (!kt[this.id])
                  throw new Error("Attempted to clip element(s) to a destroyed ZeroClipboard client instance");
              t = At(t);
              for (var e = 0; e < t.length; e++)
                  if (C.call(t, e) && t[e] && 1 === t[e].nodeType) {
                      t[e].zcClippingId ? -1 === Mt[t[e].zcClippingId].indexOf(this.id) && Mt[t[e].zcClippingId].push(this.id) : (t[e].zcClippingId = "zcClippingId_" + Ct++,
                      Mt[t[e].zcClippingId] = [this.id],
                      !0 === G.autoActivate && It(t[e]));
                      var i = kt[this.id] && kt[this.id].elements;
                      -1 === i.indexOf(t[e]) && i.push(t[e])
                  }
              return this
          }
          .apply(this, A(arguments))
      }
      ,
      Pt.prototype.unclip = function() {
          return function(t) {
              var e = kt[this.id];
              if (!e)
                  return this;
              for (var i, n = e.elements, o = (t = void 0 === t ? n.slice(0) : At(t)).length; o--; )
                  if (C.call(t, o) && t[o] && 1 === t[o].nodeType) {
                      for (i = 0; -1 !== (i = n.indexOf(t[o], i)); )
                          n.splice(i, 1);
                      var r = Mt[t[o].zcClippingId];
                      if (r) {
                          for (i = 0; -1 !== (i = r.indexOf(this.id, i)); )
                              r.splice(i, 1);
                          0 === r.length && (!0 === G.autoActivate && Nt(t[o]),
                          delete t[o].zcClippingId)
                      }
                  }
              return this
          }
          .apply(this, A(arguments))
      }
      ,
      Pt.prototype.elements = function() {
          return function() {
              var t = kt[this.id];
              return t && t.elements ? t.elements.slice(0) : []
          }
          .apply(this, A(arguments))
      }
      ,
      Pt.prototype.destroy = function() {
          return function() {
              var t = kt[this.id];
              t && (this.unclip(),
              this.off(),
              Pt.off("*", t.coreWildcardHandler),
              delete kt[this.id])
          }
          .apply(this, A(arguments))
      }
      ,
      Pt.prototype.setText = function(t) {
          if (!kt[this.id])
              throw new Error("Attempted to set pending clipboard data from a destroyed ZeroClipboard client instance");
          return Pt.setData("text/plain", t),
          this
      }
      ,
      Pt.prototype.setHtml = function(t) {
          if (!kt[this.id])
              throw new Error("Attempted to set pending clipboard data from a destroyed ZeroClipboard client instance");
          return Pt.setData("text/html", t),
          this
      }
      ,
      Pt.prototype.setRichText = function(t) {
          if (!kt[this.id])
              throw new Error("Attempted to set pending clipboard data from a destroyed ZeroClipboard client instance");
          return Pt.setData("application/rtf", t),
          this
      }
      ,
      Pt.prototype.setData = function() {
          if (!kt[this.id])
              throw new Error("Attempted to set pending clipboard data from a destroyed ZeroClipboard client instance");
          return Pt.setData.apply(this, A(arguments)),
          this
      }
      ,
      Pt.prototype.clearData = function() {
          if (!kt[this.id])
              throw new Error("Attempted to clear pending clipboard data from a destroyed ZeroClipboard client instance");
          return Pt.clearData.apply(this, A(arguments)),
          this
      }
      ,
      Pt.prototype.getData = function() {
          if (!kt[this.id])
              throw new Error("Attempted to get pending clipboard data from a destroyed ZeroClipboard client instance");
          return Pt.getData.apply(this, A(arguments))
      }
      ,
      void 0 === (n = function() {
          return Pt
      }
      .call(e, i, e, t)) || (t.exports = n)
  }(function() {
      return this || window
  }())
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(2), i(1), i(6), i(106), i(263)],
  void 0 === (o = function(t, e, i, n, o, r) {
      var a = e.View.extend({
          className: "annotation-counter-layer",
          initialize: function(t) {
              this.config = n.getModel("config"),
              this.page = t.page;
              var e = this.config.get("annotationsConfig");
              this.listenTo(e, "change:showOthers", this.onAnnotationsConfigChange),
              this.$el.toggle(e.get("showOthers"))
          },
          render: function() {
              var e = this.page.paras.filter(".paragraph, .headline, .oli, .uli")
                , i = this
                , o = n.getModel("article").markings
                , a = this.config.get("layout");
              return e.each(function() {
                  var e = t(this);
                  if (("horizontal" === a || !e.data("offset")) && t.trim(e.text()).length) {
                      var n = new r({
                          para: e,
                          markings: o
                      });
                      i.addSubView(n),
                      i.$el.append(n.render().el)
                  }
              }),
              this
          },
          onAnnotationsConfigChange: function(t, e) {
              this.$el.toggle(e)
          }
      });
      return i.extend(a.prototype, o),
      a
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(2), i(1), i(6)],
  void 0 === (o = function(t, e, i, n) {
      return e.View.extend({
          className: "annotation-counter",
          tagName: "a",
          initialize: function(t) {
              this.para = t.para,
              this.pid = this.para.data("pid") + "",
              this.markings = t.markings,
              this.listenToMarkingsMap(),
              this.currentCounter = 0
          },
          events: {
              click: "openAnnotationsPage"
          },
          openAnnotationsPage: function(t) {
              t.preventDefault(),
              n.vent.trigger("open:paraAnnotationsOverlay", this.pid)
          },
          listenToMarkingsMap: function() {
              var t = "";
              i.each(["added", "removed"], function(e) {
                  t += "markingsMap:" + this.pid + ":" + e + " "
              }, this),
              this.listenTo(this.markings, t, function() {
                  this.updateNumber()
              }, this)
          },
          updateNumber: function() {
              var t = this.markings.markingsMap.getNoteCounterByPid(this.pid);
              if (!t)
                  return this.currentCounter = 0,
                  void this.$el.hide();
              this.currentCounter || this.$el.show(),
              this.currentCounter !== t && (this.currentCounter = t,
              this.$el.text(t > 99 ? "99+" : t))
          },
          render: function() {
              var t = this.para[0]
                , e = t.offsetTop
                , i = this.para.data("offset");
              return "horizontal" === n.getModel("config").get("layout") && i && (e = t.offsetTop + i),
              e += parseInt(this.para.css("padding-top"), 10),
              e += .25 * parseInt(this.para.css("line-height"), 10),
              this.$el.css({
                  top: e,
                  left: 16
              }),
              this.updateNumber(),
              this
          }
      })
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(1), i(161), i(265), i(266)],
  void 0 === (o = function(t, e, i, n, o) {
      function r(t, n, r) {
          !function(t, e) {
              r ? i("codemirror/lib/codemirror", function() {
                  i("codemirror/addon/runmode/runmode", t)
              }) : i("codemirror/addon/runmode/runmode-standalone", t)
          }(function() {
              var r = function t(i) {
                  var n = o[i];
                  if (!n || !n.length)
                      return [i];
                  var r, a = [];
                  return e.forEach(n, function(e) {
                      [].push.apply(a, t(e))
                  }),
                  (r = e.uniq(n.concat(a))).push(i),
                  r
              }("mode/".concat(t, "/").concat(t))
                , a = e.map(r, function(t) {
                  return "codemirror/".concat(t)
              });
              i(a, function() {
                  n(window.CodeMirror)
              })
          })
      }
      return i.path(Ark.CDN_PUBLIC_PATH + "js/lib/"),
      i.urlArgs("v=".concat(2)),
      {
          renderTextToEl: function(t, i, o, a) {
              var s = e.unescape(t);
              if (i = i || "javascript",
              i = n.languageToModeName(i)) {
                  var l = {
                      tabSize: 2
                  };
                  r(i, function(t) {
                      t.runMode(s, i, o[0], l),
                      o.addClass("cm-s-solarized cm-s-light")
                  }, a)
              } else
                  o.html(e.escape(s))
          }
      }
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n;
  void 0 === (n = function() {
      var t = [["apl"], ["asterisk"], ["asn.1"], ["cpp", "C++", "go"], ["c", "C", "go"], ["objc", "Objective-C", "clike"], ["shader", "Shader", "go"], ["scala", "Scala", "go"], ["nesc", "nesC", "go"], ["clojure"], ["cmake"], ["cobol"], ["coffeescript", "CoffeeScript"], ["commonlisp", "Common Lisp"], ["crystal"], ["css", "CSS"], ["cypher"], ["d"], ["dart"], ["diff"], ["django"], ["dockerfile", "Dockerfile"], ["dtd"], ["ebnf"], ["ecl"], ["eiffel"], ["elm"], ["erlang"], ["fcl"], ["forth"], ["fortran"], ["gas"], ["gherkin"], ["go"], ["groovy"], ["haml"], ["handlebars"], ["haskell"], ["haxe"], ["ejs", "Ejs", "htmlembedded"], ["aspx", "Aspx", "htmlembedded"], ["jsp", "Jsp", "htmlembedded"], ["erb", "Erb", "htmlembedded"], ["html", "HTML", "htmlmixed"], ["http", "HTTP"], ["idl", "IDL"], ["jade", "Jade / Pug", "pug"], ["java", "Java", "clike"], ["javascript", "JavaScript"], ["jinja2"], ["jsx"], ["julia"], ["less"], ["livescript", "LiveScript"], ["lua"], ["markdown", "Markdown", "gfm"], ["mathematica"], ["mbox"], ["mirc"], ["ml", "ML", "mllike"], ["modelica"], ["mscgen"], ["mumps"], ["nginx"], ["nsis"], ["ntriples"], ["octave"], ["oz"], ["pascal"], ["pegjs"], ["perl"], ["php"], ["pig"], ["powershell"], ["properties"], ["protobuf"], ["puppet"], ["python"], ["q"], ["r"], ["rpm"], ["rst"], ["ruby"], ["rust"], ["sas"], ["sass"], ["scheme"], ["shell", "Shell/Bash"], ["sieve"], ["slim"], ["smalltalk"], ["smarty"], ["solr"], ["sparql", "SPARQL"], ["spreadsheet"], ["sql", "SQL"], ["stex"], ["stylus", "Stylus"], ["swift", "Swift"], ["tcl"], ["tiddlywiki"], ["tiki"], ["toml"], ["tornado"], ["troff"], ["ttcn"], ["ttcn-cfg"], ["turtle"], ["vb", "Visual Basic"], ["vbscript"], ["velocity"], ["verilog"], ["vhdl"], ["vue"], ["webidl"], ["xml", "XML"], ["xquery", "XQuery"], ["yacas"], ["yaml"], ["z80"]]
        , e = {
          bash: "shell"
      };
      (t = t.sort(function(t, e) {
          return t[0] === e[0] ? 0 : t[0] > e[0] ? 1 : -1
      })).forEach(function(t) {
          var e, i = t[0];
          t[1] = t[1] || (e = i).charAt(0).toUpperCase() + e.slice(1),
          t[2] = t[2] || i
      });
      var i, n, o = (i = t.map(function(t) {
          return t[2]
      }),
      n = [],
      i.forEach(function(t) {
          -1 === n.indexOf(t) && n.push(t)
      }),
      n), r = {};
      return t.forEach(function(t) {
          r[t[0]] = t
      }),
      Object.keys(e).forEach(function(t) {
          var i = e[t];
          r[t] = r[i]
      }),
      {
          modes: t,
          keys: o,
          languageModeMap: r,
          languageToModeName: function(t) {
              var e = r[t];
              return e && e[2]
          },
          languageToScreenName: function(t) {
              var e = r[t];
              return e && e[1]
          }
      }
  }
  .apply(e, [])) || (t.exports = n)
}
, function(t, e, i) {
  var n;
  void 0 === (n = function() {
      return {
          "addon/edit/closetag": ["addon/fold/xml-fold"],
          "addon/edit/matchtags": ["addon/fold/xml-fold"],
          "addon/fold/foldgutter": ["addon/fold/foldcode"],
          "addon/hint/css-hint": ["mode/css/css"],
          "addon/hint/html-hint": ["addon/hint/xml-hint"],
          "addon/hint/sql-hint": ["mode/sql/sql"],
          "addon/runmode/colorize": ["addon/runmode/runmode"],
          "addon/search/jump-to-line": ["addon/dialog/dialog"],
          "addon/search/match-highlighter": ["addon/search/matchesonscrollbar"],
          "addon/search/matchesonscrollbar": ["addon/scroll/annotatescrollbar", "addon/search/searchcursor"],
          "addon/search/search": ["addon/dialog/dialog", "addon/search/searchcursor"],
          "keymap/sublime": ["addon/edit/matchbrackets", "addon/search/searchcursor"],
          "keymap/vim": ["addon/dialog/dialog", "addon/edit/matchbrackets", "addon/search/searchcursor"],
          "mode/dart/dart": ["mode/clike/clike"],
          "mode/django/django": ["addon/mode/overlay", "mode/htmlmixed/htmlmixed"],
          "mode/dockerfile/dockerfile": ["addon/mode/simple"],
          "mode/factor/factor": ["addon/mode/simple"],
          "mode/gfm/gfm": ["addon/mode/overlay", "mode/markdown/markdown"],
          "mode/haml/haml": ["mode/htmlmixed/htmlmixed", "mode/ruby/ruby"],
          "mode/handlebars/handlebars": ["addon/mode/multiplex", "addon/mode/simple"],
          "mode/haskell-literate/haskell-literate": ["mode/haskell/haskell"],
          "mode/htmlembedded/htmlembedded": ["addon/mode/multiplex", "mode/htmlmixed/htmlmixed"],
          "mode/htmlmixed/htmlmixed": ["mode/css/css", "mode/javascript/javascript", "mode/xml/xml"],
          "mode/jade/jade": ["mode/css/css", "mode/htmlmixed/htmlmixed", "mode/javascript/javascript"],
          "mode/jsx/jsx": ["mode/javascript/javascript", "mode/xml/xml"],
          "mode/markdown/markdown": ["mode/meta", "mode/xml/xml"],
          "mode/nsis/nsis": ["addon/mode/simple"],
          "mode/pegjs/pegjs": ["mode/javascript/javascript"],
          "mode/php/php": ["mode/clike/clike", "mode/htmlmixed/htmlmixed"],
          "mode/pug/pug": ["mode/css/css", "mode/htmlmixed/htmlmixed", "mode/javascript/javascript"],
          "mode/rst/rst": ["addon/mode/overlay", "mode/python/python", "mode/stex/stex"],
          "mode/rust/rust": ["addon/mode/simple"],
          "mode/sass/sass": ["mode/css/css"],
          "mode/slim/slim": ["mode/htmlmixed/htmlmixed", "mode/ruby/ruby"],
          "mode/soy/soy": ["mode/htmlmixed/htmlmixed"],
          "mode/tornado/tornado": ["addon/mode/overlay", "mode/htmlmixed/htmlmixed"],
          "mode/twig/twig": ["addon/mode/multiplex"],
          "mode/vue/vue": ["addon/mode/overlay", "mode/coffeescript/coffeescript", "mode/css/css", "mode/handlebars/handlebars", "mode/javascript/javascript", "mode/pug/pug", "mode/sass/sass", "mode/stylus/stylus", "mode/xml/xml"],
          "mode/yaml-frontmatter/yaml-frontmatter": ["mode/yaml/yaml"]
      }
  }
  .apply(e, [])) || (t.exports = n)
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(2), i(1), i(6), i(111), i(268), i(269), i(274)],
  void 0 === (o = function(t, e, i, n, o, r, a, s) {
      return e.View.extend({
          initialize: function(e) {
              this.pagesManager = e.pagesManager,
              this.tip = e.pagesManager.markingTips,
              this.tinyPagination = (new s).render(),
              this.body = t("body"),
              this.on("clear:selection", this.clearSelection, this),
              this.on("underline", this.convertToUnderline),
              this.on("del", this.splitUnderline),
              n.vent.on("markings:created", function(t) {
                  this.collection = t
              }, this)
          },
          events: {
              "mousedown .page": "beginSelection"
          },
          setBoxInfo: function() {
              var t = this.$el.parent()
                , e = t.offset()
                , i = n.getModel("config").get("layout")
                , o = parseInt(t.find(".page").css("padding-left"), 10);
              this.boxInfo = {
                  top: e.top,
                  left: e.left + o,
                  right: e.left + t.innerWidth() - o,
                  bottom: e.top + t.height()
              },
              "horizontal" === i && (this.boxInfo.bottom -= 5)
          },
          findStartPointFromEvent: function(e) {
              var i = t(e.target)
                , n = null;
              return i.hasClass("word") && (n = i),
              n
          },
          useNativeSelection: function(e) {
              var i = t(e.target).closest("p")
                , n = i.attr("class");
              return i.length && /code|custom/gi.test(n)
          },
          selectionDisabled: function(e) {
              var i = !!t(e.currentTarget).hasClass("selection-disabled")
                , n = t(e.target).closest("p");
              return i || n.length && n.hasClass("illus")
          },
          beginSelection: function(e) {
              if (!this.useNativeSelection(e) && !this.selectionDisabled(e)) {
                  e.preventDefault(),
                  this.trigger("clear:selection"),
                  this.setBoxInfo();
                  var n = r(e, this.boxInfo);
                  if (n) {
                      var o = this.getInfoFromPoint(n.word, n.mouseCoord);
                      if (o) {
                          this.firstPointInfo = o;
                          var a = this.body
                            , s = this
                            , l = t.proxy(this.createSelectionBtns, this);
                          this.tinyPagination.enable(),
                          a.on("onmousewheel"in document ? "mousewheel.create-selection" : "DOMMouseScroll.create-selection", function(t) {
                              t.preventDefault()
                          }),
                          a.on("mousemove.create-selection", t.proxy(this.moveSelection, this)).on("mouseup.create-selection", function(t) {
                              s.tinyPagination.disable(),
                              a.off(".create-selection"),
                              s.pagesManager.trigger("stopRender:selection", this.model),
                              s.model && s.model.isValid() ? (l(t),
                              i.defer(function() {
                                  a.on("click.clear-selection", function() {
                                      s.trigger("clear:selection")
                                  })
                              })) : s.tip.hide()
                          })
                      }
                  }
              }
          },
          createSelectionBtns: function() {
              var t = this.tip
                , e = ["underline", "note", "sharing", "copy", "debug", "open", "translate"]
                , i = this.relocatePoint(this.secondPointInfo);
              this.checkSubset() && (e[0] = "del");
              var n = new a({
                  model: this.model,
                  selectionManager: this,
                  container: t,
                  btnList: e
              });
              t.set({
                  target: i.point,
                  content: n.render().el,
                  className: "btns-tip",
                  arrowHeight: 5,
                  preferedDirection: this.isSelectingDown() && !this.isSingleLine() ? "down" : "up"
              }).show()
          },
          checkSubset: function() {
              var t = this.collection.filter(function(t) {
                  return t.isUnderline()
              });
              return i.any(t, function(t) {
                  return this.checkSingleSubset(t, this.model)
              }, this)
          },
          checkSingleSubset: function(t, e) {
              var n = t.getRanges()
                , o = e.getRanges()
                , r = i.all(o, function(t, e) {
                  return e in n && n[e].start <= t.start && n[e].end >= t.end
              });
              return r && (this.containerModel = t),
              r
          },
          splitUnderline: function() {
              if (this.containerModel) {
                  var t = this.containerModel.getPoints()
                    , e = i.clone(this.info);
                  t.start.containerId === e.start.containerId && t.start.offset >= e.start.offset ? this.containerModel.destroy() : (e.start.offset -= 1,
                  this.containerModel.setViaPoints(t.start, this.info.start),
                  this.containerModel.save()),
                  t.end.containerId === e.end.containerId && t.end.offset <= e.end.offset ? this.clearSelection() : (e.end.offset += 1,
                  this.model.setViaPoints(this.info.end, t.end),
                  this.convertToUnderline()),
                  this.containerModel = null
              }
          },
          moveSelection: i.throttle(function(t) {
              try {
                  t.preventDefault()
              } catch (t) {}
              var e, i = r(t, this.boxInfo, this.firstPointInfo);
              i && (e = this.getInfoFromPoint(i.word, i.mouseCoord)) && (this.prevResultWord && this.prevResultWord === e.point || (this.prevResultWord = e.point,
              this.secondPointInfo = e,
              this.currentPointIsStart = i.currentPointIsStart,
              this.info = this.getPointsInfoOrderByPosition(),
              this.renderSelection(this.info)))
          }, 10),
          getPointsInfoOrderByPosition: function() {
              var t = i.clone(this.relocatePoint(this.firstPointInfo))
                , e = i.clone(this.relocatePoint(this.secondPointInfo))
                , n = {
                  start: t,
                  end: t
              };
              return n[this.currentPointIsStart ? "start" : "end"] = e,
              n.end.offset = n.end.offset + n.end.length - 1,
              n
          },
          getInfoFromPoint: function(t, e) {
              if (t && t.length) {
                  var i = t.closest("p")
                    , n = t.data("offset")
                    , o = t.data("length")
                    , r = i.data("pid") + ""
                    , a = i.closest(".page")
                    , s = a.data("pagination")
                    , l = t[0].getBoundingClientRect()
                    , h = a[0].getBoundingClientRect();
                  return {
                      offset: n,
                      paragraph: i,
                      containerId: r,
                      pageId: s,
                      viewportOffset: l,
                      offsetToPage: {
                          top: l.top - h.top,
                          bottom: l.bottom - h.top,
                          left: l.left - h.left,
                          right: l.right - h.left
                      },
                      point: t,
                      length: o,
                      mouseCoord: e
                  }
              }
          },
          relocatePoint: function(t) {
              if (t.length > 1)
                  return t;
              var e = this.isSelectingDown(t)
                , n = this.isFirstPoint(t)
                , o = t.paragraph
                , r = t.offset
                , a = t.viewportOffset
                , s = t.mouseCoord
                , l = o.find("[data-offset=" + (r - 1) + "]")
                , h = o.find("[data-offset=" + (r + 1) + "]")
                , c = (a.left + a.right) / 2
                , d = s.x < c;
              return p = i.bind(p, this),
              u = i.bind(u, this),
              e ? n ? u() : p() : n ? p() : u();
              function p() {
                  return d && this.getInfoFromPoint(l, s) || t
              }
              function u() {
                  return d ? t : this.getInfoFromPoint(h, s) || t
              }
          },
          isSelectingDown: function() {
              return this.isFirstPoint(this.secondPointInfo) ? this.secondPointInfo.mouseCoord.x > this.firstPointInfo.mouseCoord.x : !this.currentPointIsStart
          },
          isFirstPoint: function(t) {
              return t.point === this.firstPointInfo.point
          },
          isSingleLine: function() {
              return this.firstPointInfo.viewportOffset.top === this.secondPointInfo.viewportOffset.top
          },
          renderSelection: function(t) {
              this.getModel(t)
          },
          clearSelection: function() {
              this.body.off(".clear-selection"),
              this.tip.hide(),
              this.tip.find("textarea").blur(),
              this.model && this.model.destroy()
          },
          getEmptyModelAttr: function() {
              return {
                  middleContainers: [],
                  type: "selection"
              }
          },
          getModel: function(t) {
              if (!this.model) {
                  var e = n.getModel("content").getParasIndexs()
                    , i = n.getModel("article").id;
                  this.model = new o({
                      type: "selection"
                  },{
                      articleId: i,
                      paragraphsIndex: e
                  }),
                  this.model.on("destroy", function() {
                      this.model = null
                  }, this),
                  this.pagesManager.trigger("render:selection", this.model)
              }
              return this.model.setViaPoints(t.start, t.end)
          },
          convertToNote: function(t, e) {
              this.convertTo("note", {
                  note: t,
                  visible_private: e.visible_private
              }, e)
          },
          convertToUnderline: function() {
              this.convertTo("underline")
          },
          convertTo: function(t, e, i) {
              this.model && (this.collection.addFromSelection(this.model, t, e, i),
              this.model.destroy())
          },
          unbindAll: function() {
              this.stopListening(),
              this.undelegateEvents()
          }
      })
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(2), i(1), i(105), i(116)],
  void 0 === (o = function(t, e, i, n, o) {
      var r = n.allowSelectionParagraphSelector
        , a = r + ", .word"
        , s = t(window)
        , l = function(e) {
          return t(document.elementFromPoint(e.x, e.y))
      }
        , h = function(t, e) {
          var i = e.x;
          i > t.right ? i = t.right - 1 : i < t.left && (i = t.left + 1);
          var n = e.y;
          return n < t.top ? n = t.top + 1 : n > t.bottom && (n = t.bottom - 1),
          {
              x: i,
              y: n
          }
      }
        , c = function(e, i, n) {
          this.wrapperRect = i,
          this.currentPointIsStart = !1,
          this.firstPoint = n,
          this.setCoord({
              x: e.clientX,
              y: e.clientY
          }),
          this.find = this.findPoint,
          this.scrollTop = s.scrollTop(),
          this.firstPoint || (this.getCurrentPointIsStart = t.noop)
      }
        , d = {};
      return d.detectCoordFuncs = {
          isPointInsideParagraph: function() {
              var e = l(this.coord);
              if (e.is(".marking") || e.hasClass("word") || e.hasClass("code-inline"))
                  return !0;
              var i = e;
              return !!((e.is(r) || (i = e.closest(r)) && i.length > 0) && i[0].firstChild && t.trim(i.text())) || void 0
          },
          isPointInsidePage: function() {
              return function(t, e, i) {
                  var n = e.x
                    , o = e.y + i;
                  if (n >= t.left && n <= t.right && o >= t.top && o <= t.bottom)
                      return !0
              }(this.wrapperRect, this.coord, this.scrollTop)
          }
      },
      d.manipCoordFuncs = {
          moveCoordToPage: function() {
              this.setCoord(h(this.wrapperRect, this.coord))
          },
          moveCoordToPara: function() {
              var e = this.getCurrentPointIsStart()
                , i = this.point
                , n = i.is(".page") ? i : i.closest(".page");
              n.is(".page") && n.length || (n = t(".page").first());
              for (var o, a = n.find(r); !a.length && (n = n[e ? "next" : "prev"](".page")) && n.length; )
                  a = n.find(r);
              do {
                  o = this.paraInSelection(n, a)
              } while (!o && (n = n[e ? "next" : "prev"](".page")) && n.length && (a = n.find(r)));o && this.setCoord({
                  x: this.coord.x,
                  y: e ? o.top : o.bottom
              })
          },
          paraInSelection: function(e, i) {
              var n, o = this.currentPointIsStart, r = this.coord, a = e.find(".bd")[0].getBoundingClientRect();
              return o || (i = t(i.get().reverse())),
              i.each(function() {
                  var e = this.getBoundingClientRect()
                    , i = e.top < a.top ? a.top : e.top
                    , s = e.bottom > a.bottom ? a.bottom : e.bottom;
                  if (i += 1,
                  s -= 1,
                  t.trim(this.innerHTML) && (o && i > r.y || !o && s < r.y))
                      return n = {
                          top: i,
                          bottom: s
                      },
                      !1
              }),
              n
          },
          setCoord: function(t) {
              this.coord = t,
              this.point = l(this.coord)
          },
          getCurrentPointIsStart: function() {
              var t, e = this.firstPoint.offsetToPage, i = this.point.closest(".page"), n = i[0].getBoundingClientRect(), o = this.coord.y - n.top, r = this.coord.x - n.left;
              if (0 != (t = +i.data("pagination") - this.firstPoint.pageId))
                  return this.currentPointIsStart = t < 0,
                  this.currentPointIsStart;
              var a = o < e.top || r < e.left && o < e.bottom;
              return this.currentPointIsStart = a,
              this.currentPointIsStart
          }
      },
      d.findPointFromParaFuncs = {
          findPointFromPara: function() {
              var e = this.fetchWord();
              if (e)
                  return e;
              var n = this.point
                , o = n.is(r) ? n : n.closest("p");
              if (t.trim(o.text()) && o.is(r) && !t.nodeName(n[0], "sup")) {
                  var a, s, l = this.buildLineInfoFromPara(o), c = o[0].getBoundingClientRect(), d = this.coord.x - c.left, p = this.coord.y - c.top;
                  t.each(l.index.top, function(t, e) {
                      if (e > p) {
                          var i = l.index.bottom[t - 1];
                          return a = i && i >= p ? t - 1 : t,
                          !1
                      }
                  }),
                  i.isUndefined(a) && (a = l.lines.length - 1);
                  var u = l.lines[a];
                  t.each(u, function(t, e) {
                      if (e.left > d)
                          return s = u[t = t > 0 ? t - 1 : t],
                          !1
                  }),
                  i.isUndefined(s) && (s = u[u.length - 1]);
                  var g, f = s.getSpan(o);
                  return this.word = t(f),
                  g = s.lineBreak ? f.getClientRects()[0] : f.getBoundingClientRect(),
                  this.coord = h(g, this.coord),
                  this.word
              }
          },
          buildLineInfoFromPara: o,
          getParaHeaderRect: function(t, e) {
              var i = e[0].getBoundingClientRect();
              return {
                  top: t.top,
                  right: i.right,
                  bottom: i.bottom,
                  left: t.left,
                  height: i.bottom - t.top,
                  width: i.right - t.left,
                  spanBCR: i
              }
          },
          getParaFooterRect: function(t, e, i) {
              var n = e[0].getBoundingClientRect()
                , o = {
                  top: n.top,
                  right: t.right,
                  bottom: t.bottom,
                  left: n.left,
                  height: n.top - t.bottom,
                  width: t.right - n.right,
                  spanBCR: n
              };
              return i.length > 1 ? (o.top = i[i.length - 2].top,
              o.height = o.top - t.bottom) : (o.top = t.top,
              o.height = t.bottom - t.top),
              o
          }
      },
      i.extend(c.prototype, {
          findPoint: function() {
              try {
                  this.isPointInsidePage() || this.moveCoordToPage(),
                  this.isPointInsideParagraph() || this.moveCoordToPara(),
                  this.findPointFromPara()
              } catch (t) {
                  if (!this.point.is(a))
                      return;
                  throw t
              }
              return this.getFindResult()
          },
          getFindResult: function() {
              if (this.word) {
                  var t = {
                      word: this.word
                  };
                  return this.firstPoint && (t.currentPointIsStart = this.getCurrentPointIsStart()),
                  t.mouseCoord = this.coord,
                  t
              }
          },
          fetchWord: function() {
              var t = this.point;
              return t.hasClass("word") ? (this.word = t,
              this.word) : t.hasClass("code-inline") ? (this.word = t.parent(),
              this.word) : t.is(".marking") ? (this.word = this.getPointUnderMarking(),
              this.word) : void 0
          },
          getPointUnderMarking: function() {
              var e, i = t(), n = this.point;
              if (n.is(".marking")) {
                  do {
                      n.hide(),
                      i = i.add(n),
                      n = l(this.coord)
                  } while (n.is(".marking"));return n.hasClass("word") ? e = n : n.hasClass("code-inline") && (e = n.parent()),
                  i.show(),
                  e
              }
          }
      }),
      i.each(d, function(t) {
          i.extend(c.prototype, t)
      }),
      function(t, e, i) {
          return new c(t,e,i).find()
      }
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(2), i(1), i(3), i(162), i(134), i(34)],
  void 0 === (o = function(t, e, i, n, o, r, a) {
      var s = o.extend({
          _super: o.prototype,
          initialize: function(t) {
              this._super.initialize.call(this, t),
              this.selectionManager = t.selectionManager
          },
          underline: function(t) {
              t.stopPropagation(),
              this.selectionManager.trigger("underline"),
              this.clear()
          },
          del: function() {
              this.selectionManager.trigger("del"),
              this.clear()
          },
          note: function() {
              var t = this;
              this.createFormInTip(r, {
                  model: this.model,
                  type: "create"
              }, {
                  done: function(e) {
                      var i = e.pickAttrs("sharing", !0)
                        , n = e.get("text");
                      t.selectionManager.convertToNote(n, {
                          sharing: i,
                          visible_private: e.get("visible_private")
                      })
                  }
              })
          },
          clear: function() {
              this.selectionManager.trigger("clear:selection")
          }
      })
        , l = function() {
          a.openLoginAndSignup({
              actions: {
                  stamp: this.model.getStamp()
              }
          })
      }
        , h = {};
      return n.me.isAnonymous && i.each(["note", "underline", "sharing", "debug"], function(t) {
          h[t] = l
      }),
      i.extend(s.prototype, h),
      s
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(2), i(1), i(31), i(20), i(23)],
  void 0 === (o = function(t, e, i, n, o, r) {
      var a = e.Model.extend({
          defaults: {
              annotation: ""
          },
          initialize: function(t, e) {
              this.articleId = e.articleId
          },
          url: function() {
              return "/j/article_v2/" + this.articleId + "/erratum"
          }
      });
      return e.View.extend({
          tmplHtml: t("#tmpl-debug-form").html(),
          tagName: "form",
          className: "debug-form",
          initialize: function(e) {
              this.dfd = t.Deferred(),
              this.promise = this.dfd.promise()
          },
          events: {
              submit: "submitDebugForm",
              "click .ln-cancel": "cancelForm"
          },
          cancelForm: function(t) {
              t.preventDefault(),
              this.dfd.reject()
          },
          submitDebugForm: function(e) {
              e.preventDefault();
              var i = t(e.target).find("textarea[name=text]").val()
                , r = this.model.toJSON();
              r.note = i;
              var s = new a({
                  annotation: JSON.stringify(r)
              },{
                  articleId: this.model.articleId
              });
              s.save({}, {
                  success: function() {
                      n.toast("非常感谢！纠错意见已成功发送"),
                      o._trackEvent("errorCorr")
                  },
                  error: function() {
                      n.toast("纠错失败")
                  }
              }),
              this.dfd.resolve(s)
          },
          render: function() {
              return this.$el.html(this.tmplHtml),
              r.ctrlEnterForm(this.$el),
              this
          }
      })
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  function r(t, e, i) {
      return e in t ? Object.defineProperty(t, e, {
          value: i,
          enumerable: !0,
          configurable: !0,
          writable: !0
      }) : t[e] = i,
      t
  }
  n = [i(0), i(2), i(1), i(4)],
  void 0 === (o = function(t, e, i, n) {
      var o = /^[.?!\-–'",，。！(]+|[.?!\-–'",，。！)]+$/;
      return e.View.extend({
          tmpl: t("#tmpl-translation").html(),
          className: "translation-tip",
          initialize: function(e) {
              var i = this
                , r = e.text.replace(o, "");
              n.get("".concat("/j/translate", "?q=").concat(r)).then(function(t) {
                  return i.loaded = !0,
                  t.r ? i.renderError(t.msg) : i.renderContent(t)
              }, function() {
                  return i.renderError("服务器开小差了，请稍后再试")
              }),
              this.promise = t.Deferred().promise()
          },
          render: function() {
              return this.loaded ? this : (this.$el.html("查询中，请稍候…"),
              this.trigger("updated"),
              this)
          },
          renderError: function(t) {
              return this.$el.text(t),
              this.trigger("updated"),
              this
          },
          renderContent: function(t) {
              return this.$el.html(i.template(this.tmpl, function(t) {
                  for (var e = 1; e < arguments.length; e++) {
                      var i = null != arguments[e] ? arguments[e] : {}
                        , n = Object.keys(i);
                      "function" == typeof Object.getOwnPropertySymbols && (n = n.concat(Object.getOwnPropertySymbols(i).filter(function(t) {
                          return Object.getOwnPropertyDescriptor(i, t).enumerable
                      }))),
                      n.forEach(function(e) {
                          r(t, e, i[e])
                      })
                  }
                  return t
              }({
                  basic: null
              }, t))),
              this.trigger("updated"),
              this
          }
      })
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  function r(t, e, i) {
      return e in t ? Object.defineProperty(t, e, {
          value: i,
          enumerable: !0,
          configurable: !0,
          writable: !0
      }) : t[e] = i,
      t
  }
  n = [i(0), i(2), i(1), i(6), i(160)],
  void 0 === (o = function(t, e, i, n, o) {
      return {
          createCopyBtn: function() {
              var t = this
                , e = this.$el.find(".copy")
                , a = this.model.getTextFromRanges();
              a.length > 100 && (a += i.template("\n\n摘自：《{{= title}}》 — {{= author}}\n在豆瓣阅读书店查看：{{= url}}\n本作品由{{- authorizer }}授权豆瓣阅读{{- authorizedDistrict }}范围内电子版制作与发行。\n© 版权所有，侵权必究。", function(t) {
                  for (var e = 1; e < arguments.length; e++) {
                      var i = null != arguments[e] ? arguments[e] : {}
                        , n = Object.keys(i);
                      "function" == typeof Object.getOwnPropertySymbols && (n = n.concat(Object.getOwnPropertySymbols(i).filter(function(t) {
                          return Object.getOwnPropertyDescriptor(i, t).enumerable
                      }))),
                      n.forEach(function(e) {
                          r(t, e, i[e])
                      })
                  }
                  return t
              }({}, n.getModel("article").get("metaData"), {
                  url: "".concat(location.protocol, "//").concat(location.host, "/").concat(n.router.getBookUrl())
              }))),
              o(e, function() {
                  return a
              }, function() {
                  return t.clear()
              })
          }
      }
  }
  .apply(e, n)) || (t.exports = o)
}
, , function(t, e, i) {
  var n, o;
  n = [i(0), i(2), i(1), i(6)],
  void 0 === (o = function(t, e, i, n) {
      function o(t, e, i) {
          return t = t || 0,
          Math.max(Math.min(t, i), e)
      }
      return e.View.extend({
          el: ".tiny-pagination-layer",
          events: {
              "mouseenter .tiny-page-switcher": "processTurning",
              "mousemove .tiny-page-switcher": "stopPropagation"
          },
          initialize: function() {
              i.bindAll(this, ["renderSwitchers"]),
              this.configModel = n.getModel("config"),
              this.scrollBody = t("html, body"),
              n.vent.on("pages:layout:finish", this.renderSwitchers)
          },
          render: function() {
              return this.switcherEl = this.$(".tiny-page-switcher"),
              this.prevEl = this.$(".page-prev-switcher"),
              this.nextEl = this.$(".page-next-switcher"),
              this
          },
          enable: function() {
              this.$el.addClass("is-selecting"),
              this.$el.attr("page-distance", 0)
          },
          disable: function() {
              this.$el.removeClass("is-selecting")
          },
          minHeaderSwitcherHeight: 40,
          maxHeaderSwitcherHeight: 80,
          minFooterSwitcherHeight: 30,
          maxFooterSwitcherHeight: 40,
          bufferZoneHeight: 5,
          renderSwitchers: function() {
              var e = t(".page").eq(0)
                , i = parseInt(e.css("padding-top"), 10)
                , n = e.find(".bd").height()
                , r = e.outerHeight() - i - n;
              this.prevEl.height(o(i - this.bufferZoneHeight, this.minHeaderSwitcherHeight, this.maxHeaderSwitcherHeight)),
              this.nextEl.height(o(r - this.bufferZoneHeight, this.minFooterSwitcherHeight, this.maxFooterSwitcherHeight))
          },
          processTurning: function(e) {
              var i = t(e.currentTarget)
                , n = "prev" === i.data("direction");
              if ("horizontal" === this.configModel.get("layout")) {
                  var r = (0 | i.attr("page-distance")) + (n ? -1 : 1);
                  r = o(r, -1, 1),
                  this.$el.attr("page-distance", r),
                  this.highlightPaginationBtn(n),
                  this.turnPage(n)
              } else
                  this.scrollPage(n)
          },
          turnPage: function(t) {
              var e = n.getModel("turning")
                , i = e.get("currPage")
                , o = t ? -1 : 1;
              return e.setCurrPage(i + o),
              this
          },
          highlightPaginationBtn: function(e) {
              var n = t(".pagination .page-" + (e ? "prev" : "next"));
              n.addClass("on"),
              setTimeout(i.bind(n.removeClass, n, "on"), 300)
          },
          scrollPage: function(t) {
              var e, i, n, o, r = this.configModel.getLineHeightPx(), a = this.scrollBody;
              e = this.switcherEl,
              i = function() {
                  a.animate({
                      scrollTop: (t ? "-=" : "+=") + 2 * r + "px"
                  }, 200, "linear")
              }
              ,
              o = !1,
              n = function() {
                  o || (i(),
                  setTimeout(n, 200))
              }
              ,
              e.one("mouseleave", function() {
                  o = !0
              }),
              n()
          },
          stopPropagation: function(t) {
              t.stopPropagation()
          }
      })
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(2), i(1), i(6), i(276), i(284), i(285), i(290), i(136), i(8)],
  void 0 === (o = function(t, e, i, n, o, r, a, s, l, h) {
      var c = e.View.extend({
          initialize: function(t) {
              this.collection = t.collection,
              this.markingTips = t.markingTips,
              this.pagesManager = t.pagesManager,
              n.vent.on("markings:created", this.bindCollection, this).on("open:paraAnnotationsOverlay", this.openParaAnnotationsOverlay, this).on("open:singleAnnotationOverlay", this.openSingleAnnotationOverlay, this),
              this.listenTo(this.pagesManager, "pages:rendered", this.createPageMarkingManagers, this),
              this.listenTo(this.pagesManager, "render:selection", function(t) {
                  this.trigger("render:selection", t),
                  this.currentSelectionModel = t
              }),
              this.listenTo(this.pagesManager, "stopRender:selection", function() {
                  this.currentSelectionModel = null
              })
          },
          openParaAnnotationsOverlay: function(t) {
              var e = this.collection.getModelsByPid(t);
              if (e.length) {
                  var i = new a({
                      annotationModels: e,
                      pid: t
                  });
                  this.createAnnotationsOverlay(i, "para-annotations/" + t + "/")
              }
          },
          openSingleAnnotationOverlay: function(t, e) {
              if (!this.isInArticle(t))
                  return this.outRangeAlert(t);
              var i = new s({
                  model: t,
                  pid: e
              })
                , n = t.get("id");
              this.createAnnotationsOverlay(i, "annotation/" + n + "/")
          },
          createPageMarkingManagers: function(t) {
              if (this.collection) {
                  var e = [];
                  i.each(t, function(t) {
                      var i = t.$el
                        , n = new o({
                          collection: this.collection,
                          page: t,
                          container: i,
                          markingTips: this.markingTips,
                          articleMarkingManager: this
                      });
                      t.addSubView(n),
                      e = e.concat(t.paraPids),
                      i.append(n.render().el),
                      this.currentSelectionModel && n.renderSelection(this.currentSelectionModel)
                  }, this),
                  this.collection.fetchByPids(i.uniq(e))
              }
          },
          bindCollection: function(t) {
              this.collection && this.stopListening(this.collection),
              this.collection = t,
              n.getModel("article").get("isSample") && this.listenTo(t, "recommendation:added", this.checkInRangeAndAlert)
          },
          isInArticle: function(t) {
              var e = n.getModel("content").pidAndPageMap;
              return t.get("startContainerId")in e
          },
          outRangeAlert: function(e) {
              var o = n.getModel("article")
                , r = n.getModel("config").get("isChapter")
                , a = e.isNote()
                , s = "无法查看" + (a ? "批注" : "这段内容")
                , c = "很抱歉，因为" + (a ? "批注" : "这句话") + "所在的这段内容不在可以免费试读的范围内，购买后可以阅读。";
              if (r)
                  return h({
                      type: "tips",
                      title: s,
                      content: c
                  }).addClass("general-tips").setButtons([{
                      text: "知道了"
                  }]).on("confirm", function() {
                      this.close()
                  }).open();
              var d = t("#tmpl-alert-with-aside").html()
                , p = {
                  title: s,
                  text: c,
                  confirm: "知道了",
                  asideTitle: "",
                  asideText: "对这本书感兴趣？",
                  asideConfirm: "去购买"
              }
                , u = "/" + o.getBookUrl();
              new l({
                  html: i.template(d, p)
              }).el.find(".aside-confirm").attr("href", u).attr("target", "_blank")
          },
          checkInRangeAndAlert: function(t) {
              this.isInArticle(t) || this.outRangeAlert(t)
          }
      });
      return i.extend(c.prototype, r),
      c
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(2), i(1), i(6), i(277), i(106)],
  void 0 === (o = function(t, e, i, n, o, r) {
      var a = e.View.extend({
          className: "markings-layer",
          initialize: function(t) {
              this.collection = t.collection,
              this.page = t.page,
              this.container = t.container,
              this.markingTips = t.markingTips,
              this.articleMarkingManager = t.articleMarkingManager,
              this.markingsIds = {};
              var e = n.getModel("config");
              this.pageFontSize = e.get("fontSize"),
              this.hideNoteDot = e.get("usingLiteStyle"),
              this.listenTo(this.articleMarkingManager, "render:selection", this.renderSelection, this),
              this.listenToMarkingsAdded()
          },
          render: function() {
              return this
          },
          listenToMarkingsAdded: function() {
              i.each(this.page.paraPids, function(t) {
                  i.each(["marking:" + t + ":added", "othersNote:" + t + ":favorited"], function(t) {
                      this.listenTo(this.collection, t, this._renderMarking)
                  }, this)
              }, this)
          },
          renderSelection: function(t) {
              var e = this._getMarkingView(t).render().el;
              this.$el.append(e)
          },
          _renderMarking: function(t) {
              if (this._canRenderOnPage(t) && !this._checkMarkingExist(t)) {
                  var e = this._getMarkingView(t);
                  this.$el.append(e.el),
                  e.render()
              }
          },
          _checkMarkingExist: function(t) {
              var e = t.cid;
              return !!this.markingsIds[e] || (this.markingsIds[e] = !0,
              !1)
          },
          _canRenderOnPage: function(t) {
              return (!t.isOthers() || t.isRecommendation() || t.isFromUrl()) && !(this.hideNoteDot && t.isNote())
          },
          _getMarkingView: function(t) {
              return this.addSubView(new o({
                  model: t,
                  paragraphs: this.page.parasMap,
                  markingTips: this.markingTips,
                  markingManager: this,
                  pageHeight: this.page.data.page.height
              }))
          },
          hideAllLines: function() {
              this.$el.addClass("hide-all-lines"),
              this.$(".highlight").removeClass("highlight")
          },
          showAllLines: function() {
              this.$el.removeClass("hide-all-lines")
          }
      });
      return i.extend(a.prototype, r),
      a
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(2), i(1), i(165), i(279), i(280), i(283)],
  void 0 === (o = function(t, e, i, n, o, r, a) {
      var s = {
          underline: n,
          selection: o,
          note: r,
          rec_underline: a
      };
      return e.View.extend({
          className: "page-marking-container",
          initialize: function(t) {
              this.paragraphs = t.paragraphs,
              this.markingTips = t.markingTips,
              this.markingManager = t.markingManager,
              this.pageHeight = t.pageHeight,
              this.listenTo(this.model, "change:type", this.render),
              this.listenTo(this.model, "destroy", this.remove)
          },
          render: function() {
              this.$el.empty();
              var t = this.model.get("type");
              return t in s && (this.innerView = new s[t]({
                  model: this.model,
                  paragraphs: this.paragraphs,
                  markingTips: this.markingTips,
                  markingManager: this.markingManager,
                  pageHeight: this.pageHeight
              }),
              this.$el.append(this.innerView.el),
              this.innerView.render()),
              this
          },
          remove: function() {
              return this.innerView.remove(),
              e.View.prototype.remove.apply(this, arguments)
          }
      })
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(2), i(1), i(3), i(6), i(162), i(134), i(15)],
  void 0 === (o = function(t, e, i, n, o, r, a, s) {
      var l = function() {
          s(),
          this.clear()
      }
        , h = n.me.isAnonymous ? {
          debug: l,
          sharing: l
      } : {}
        , c = r.extend({
          del: function() {
              this.model.destroy(),
              this.clear()
          },
          note: function() {
              var t = this;
              this.createFormInTip(a, {
                  model: this.model,
                  type: "create"
              }, {
                  done: function(e) {
                      var n = t.model.omit("id")
                        , r = o.getModel("article").markings
                        , a = e.get("text")
                        , s = e.pickAttrs("sharing", !0);
                      i.extend(n, {
                          note: a,
                          type: "note",
                          visible_private: e.get("visible_private")
                      }),
                      r.add(n, {
                          sharing: s
                      })
                  }
              })
          }
      });
      return i.extend(c.prototype, h),
      c
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(2), i(1), i(166)],
  void 0 === (o = function(t, e, i, n) {
      var o = e.View.extend({
          className: "selection",
          initialize: function(t) {
              this.paragraphs = t.paragraphs,
              this.pageHeight = t.pageHeight,
              this.listenTo(this.model, "change", this.render)
          },
          render: function() {
              return this.$el.empty(),
              this.$el.append(this.plotRange(this.model.getRanges(), this.paragraphs, "selection")),
              this
          }
      });
      return i.extend(o.prototype, n),
      o
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(2), i(1), i(6), i(281), i(135), i(116), i(167)],
  void 0 === (o = function(t, e, i, n, o, r, a, s) {
      return e.View.extend({
          className: "note",
          initialize: function(t) {
              this.paragraphs = t.paragraphs,
              this.markingTips = t.markingTips,
              this.markingManager = t.markingManager,
              this.pageHeight = t.pageHeight,
              this.config = n.getModel("config").get("annotationsConfig"),
              this.listenTo(this.config, "change", this.render),
              this.listenTo(this.model, "render:line", this.renderLine),
              this.listenTo(this.model, "remove:line", this.removeLine)
          },
          render: function() {
              return this.willHide(this.model) ? this.hide() : this.show(),
              this.model.get("open_on_render") && this.displayInTip(),
              this
          },
          show: function() {
              if (!this.isShown) {
                  this.isShown = !0;
                  var t = this.model.get("endContainerId")
                    , e = this.model.get("endOffset");
                  if (t in this.paragraphs) {
                      var n, o, r, l = this.paragraphs[t], h = a(l).lines;
                      for (o = 0,
                      r = h.length; o < r && !(n = s(h[o], e)); ++o)
                          ;
                      if (!(n || (o >= r && (o = r - 1),
                      n = i.last(h[o]))))
                          return;
                      this._renderDot(l, n)
                  }
              }
          },
          _renderDot: function(e, i) {
              var n = t(i.getSpan(e))
                , r = n.data("note-dot");
              if (r)
                  return this.dot = r,
                  void this.dot.assignNote(this);
              var a = i.top + e[0].offsetTop;
              a < 0 || a > this.pageHeight || (this.dot = new o({
                  para: e,
                  spanInfo: i,
                  markingTips: this.markingTips
              }).render(),
              n.data("note-dot", this.dot),
              this.dot.assignNote(this))
          },
          appendDot: function(t) {
              this.$el.append(t)
          },
          displayInTip: function() {
              this.dot && this.dot.displayNote(this)
          },
          renderLine: function() {
              this.removeLine(),
              this.underline = new r({
                  model: this.model,
                  paragraphs: this.paragraphs
              }),
              this.$el.append(this.underline.render().el),
              this.hideOtherLines()
          },
          removeLine: function() {
              this.underline && (this.underline.remove(),
              this.underline = null,
              this.showOtherLines())
          },
          hideOtherLines: function() {
              this.markingManager.hideAllLines(),
              this.underline.$el.addClass("highlight"),
              this.underline.lines.addClass("highlight")
          },
          showOtherLines: function() {
              this.markingManager.showAllLines()
          },
          willHide: function() {
              return !(!this.config.isFilterOut(this.model) || this.model.isRecommendation())
          },
          hide: function() {
              this.isShown && (this.dot && this.dot.unassignNote(this),
              this.$el.empty(),
              this.isShown = !1)
          },
          remove: function() {
              return this.hide(),
              e.View.prototype.remove.apply(this, arguments)
          }
      })
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(2), i(1), i(6), i(282)],
  void 0 === (o = function(t, e, i, n, o) {
      var r = ["mine", "favorite", "following", "hot", "others"]
        , a = {
          en: {
              height: 6,
              width: 8
          },
          cn: {
              height: 9,
              width: 9
          }
      }
        , s = {
          en: 1,
          cn: 2
      };
      return e.View.extend({
          className: "note-dot",
          events: {
              click: "displayTip"
          },
          initialize: function(t) {
              this.para = t.para,
              this.spanInfo = t.spanInfo,
              this.markingTips = t.markingTips,
              this.pageHeight = t.pageHeight,
              this.assignedNotes = [];
              var e = n.getModel("article").get("lang");
              this.dotStyle = a[e] || a.cn,
              this.underlineHeight = s[e] || s.cn
          },
          render: function() {
              var t = this.spanInfo.top + this.para[0].offsetTop
                , e = parseInt(this.para.css("line-height"), 10) - this.spanInfo.height - this.underlineHeight
                , i = {
                  top: t - (this.dotStyle.height + e) / 2,
                  left: this.spanInfo.left + (this.spanInfo.width - this.dotStyle.width) / 2
              };
              return this.$el.html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 9"><path d="M4.5 0a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zM5 5h1.5l-2 2-2-2H4V2h1"/></svg>'),
              this.$el.css(i),
              this
          },
          displayTip: function() {
              this.displayNote()
          },
          displayNote: function(t) {
              var e = new o({
                  markingTips: this.markingTips,
                  notes: this.assignedNotes,
                  specificNote: t
              })
                , i = this;
              this.tip = e,
              this.markingTips.set({
                  target: this.$el,
                  className: "btns-tip",
                  content: e.render().el
              }).setClass("note-display-tip").show(),
              this.$el.addClass("activated"),
              e.on("render:done", function(t) {
                  e.updateTipPosition(),
                  i.setShowModel(t.model)
              }),
              e.on("hide", function() {
                  e.remove(),
                  i.tip = null,
                  i.$el.removeClass("activated"),
                  i.setShowModel(i.masterNote.model)
              }),
              e.updateTipPosition()
          },
          assignNote: function(t) {
              this.assignedNotes.push(t),
              this.updateNotes()
          },
          unassignNote: function(t) {
              var e = i.indexOf(this.assignedNotes, t);
              this.assignedNotes.splice(e, 1),
              this.updateNotes()
          },
          updateNotes: function() {
              this.assignedNotes.length ? (this.assignedNotes = this.getSortedNotes(this.assignedNotes),
              this.setMasterNote(this.assignedNotes[0]),
              this.tip ? (this.tip.notes = this.assignedNotes,
              this.tip.render()) : this.setShowModel(this.masterNote.model)) : this.remove()
          },
          setMasterNote: function(t) {
              this.masterNote = t,
              t.appendDot(this.$el),
              this.delegateEvents()
          },
          setShowModel: function(t) {
              this.showNoteModel && this.stopListening(this.showNoteModel),
              this.showNoteModel = t,
              this.updateDotClass(),
              this.listenTo(t, "change:tags", this.updateDotClass)
          },
          updateDotClass: function() {
              this.$el.removeClass(this.dotClass),
              this.dotClass = this.getDotClass(this.showNoteModel.getShowTag()),
              this.$el.addClass(this.dotClass)
          },
          getDotClass: function(t) {
              return t + "-note"
          },
          getSortedNotes: function(t) {
              return i.sortBy(t, function(t) {
                  return i.indexOf(r, t.model.getShowTag())
              })
          }
      })
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(2), i(1), i(6), i(33), i(168), i(40)],
  void 0 === (o = function(t, e, i, n, o, r, a) {
      var s = e.View.extend({
          tmpl: t("#tmpl-note-display").html(),
          commentTextTmpl: t("#tmpl-annotation-comment-text").html(),
          favoriteTextTmpl: t("#tmpl-annotation-favorite-text").html(),
          className: "note-display",
          initialize: function(t) {
              this.noteTip = this.markingTips = t.markingTips,
              this.notes = t.notes,
              this.currentNote = this.notes[0],
              t.specificNote && (this.currentNote = t.specificNote)
          },
          events: {
              "click .share": "shareNote",
              "click .edit": "editNote",
              "click .delete": "deleteNote",
              "click .favorite": "favoriteNote",
              "click .tip-pagination a": "turnPage",
              "click .comment": "jumpComments",
              "click .btn-report": "report"
          },
          render: function() {
              return this.changeToNote(this.currentNote),
              this
          },
          renderNote: function(t) {
              var e = this.getNoteIndex(t)
                , r = t.model
                , a = this.notes.length
                , s = r.toJSON()
                , l = s.owner.user_id;
              this.$el.html(i.template(this.tmpl, {
                  note: s,
                  isPrivate: r.isPrivate(),
                  actions: r.getActionsList(),
                  favorited: r.isFavorited(),
                  current: e + 1,
                  autoLink: o,
                  total: a,
                  isArticleAuthor: l === n.getModel("article").get("authorId")
              })),
              this.favoriteText = this.$(".favorite"),
              this.commentText = this.$(".comment"),
              this.privateText = this.$(".private-info"),
              this.shareWrapper = this.$(".share-wrapper"),
              0 === e && this.$(".prev").addClass("disabled"),
              e === a - 1 && this.$(".next").addClass("disabled"),
              r.trigger("render:line"),
              this.markingTips.once("hidden", function() {
                  r.trigger("remove:line"),
                  this.trigger("hide")
              }, this),
              this.updateFavorite(r),
              this.updateComment(r),
              this.updatePrivate(r)
          },
          changeToNote: function(t) {
              var e = t.model;
              this.renderNote(t),
              this.stopListening(this.currentNote.model),
              this.listenTo(e, "change:n_favorites", this.updateFavorite).listenTo(e, "change:n_comments", this.updateComment).listenTo(e, "change:visible_private", this.updatePrivate),
              this.currentNote = t,
              this.trigger("render:done", t)
          },
          jumpComments: function(t) {
              t.preventDefault();
              var e = this.currentNote.model;
              n.vent.trigger("open:singleAnnotationOverlay", e)
          },
          updatePrivate: function(t) {
              if (this.privateText.length) {
                  var e = t.isPrivate();
                  this.privateText[e ? "show" : "hide"](),
                  this.shareWrapper[e ? "hide" : "show"]()
              }
          },
          updateFavorite: function(t) {
              if (this.favoriteText.length) {
                  var e = t.toJSON();
                  e.isFavorited = t.isFavorited(),
                  this.favoriteText.html(i.template(this.favoriteTextTmpl, e))
              }
          },
          updateComment: function(t) {
              this.commentText.length && this.commentText.html(i.template(this.commentTextTmpl, t.toJSON()))
          },
          turnPage: function(e) {
              e.preventDefault();
              var i = t(e.currentTarget)
                , n = i.hasClass("prev")
                , o = this.getCurrentIndex();
              i.hasClass("disabled") || (this.currentNote.removeLine(),
              this.changeToNote(n ? this.notes[o - 1] : this.notes[o + 1]))
          },
          getCurrentIndex: function() {
              return this.getNoteIndex(this.currentNote)
          },
          getNoteIndex: function(t) {
              var e = i.indexOf(this.notes, t);
              return e < 0 ? (this.notes.push(t),
              this.notes.length - 1) : e
          },
          updateTipPosition: function() {
              this.markingTips.update(10)
          },
          report: function(e) {
              e.stopPropagation();
              var i = t(e.currentTarget);
              a.showReportDialog(i.data("id"), i.data("target-type"))
          }
      });
      return i.extend(s.prototype, r, {
          loginRedirectType: "page",
          _getNoteModel: function() {
              return this.currentNote.model
          }
      }),
      s
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(1), i(165)],
  void 0 === (o = function(t, e) {
      return e.extend({
          underlineClass: "underline others-underline",
          render: function() {
              this.$el.empty(),
              this.$el.append(this.plotRange(this.model.getRanges(), this.paragraphs, this.underlineClass));
              var e = this.$(".others-underline")
                , i = this.model;
              return t.delay(function() {
                  e.css("opacity", "0")
              }, 3e3),
              t.delay(function() {
                  i.destroy()
              }, 5e3),
              this
          },
          clickOnLine: function(t) {
              t.stopPropagation()
          }
      })
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(2), i(1), i(6), i(21)],
  void 0 === (o = function(t, e, i, n, o) {
      return {
          createAnnotationsOverlay: function(t, e) {
              var i = n.router.getBookUrl({
                  ignoreSearch: !0
              })
                , r = o({
                  body: t.render().$el,
                  klass: "full-height-overlay",
                  closable: !0
              }).open()
                , a = t.remove;
              return t.remove = function() {
                  return this.removing = !0,
                  a.call(this)
              }
              ,
              e && n.navigate(i + e),
              t.on("removed", function() {
                  r.close(),
                  n.vent.trigger("unfreeze:control")
              }),
              t.listenTo(n.router, "route", function() {
                  this.overlayModel.trigger("remove:view")
              }),
              t.$el.on("removing", function() {
                  t.removing || (t.stopListening(),
                  n.vent.trigger("unfreeze:control"),
                  n.navigate(i))
              }),
              t.$el.find(".lnk-close").on("click", function(t) {
                  t.preventDefault(),
                  r.close()
              }),
              n.vent.trigger("freeze:control"),
              t.trigger("appended", r),
              r
          }
      }
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(2), i(1), i(6), i(115), i(286), i(169)],
  void 0 === (o = function(t, e, i, n, o, r, a) {
      var s = e.Model.extend({
          filterFunc: {
              hot: function() {
                  return i.sortBy(this.annotationModels, function(t) {
                      return -t.get("n_favorites")
                  })
              },
              newest: function() {
                  return i.sortBy(this.annotationModels, function(t) {
                      return -o(t.get("create_time"))
                  })
              },
              favorite: function() {
                  return i.filter(this.annotationModels, function(t) {
                      return t.isFavorited()
                  })
              }
          },
          initialize: function(t, e) {
              this.annotationModels = e.annotationModels
          },
          annotaitonsIsEmpty: function() {
              return !this.annotationModels.length
          },
          getAnnotations: function() {
              var t = this.get("navType");
              return this.filterFunc[t].call(this)
          }
      });
      return e.View.extend(i.extend({
          tmpl: t("#tmpl-para-annotations-overlay").html(),
          className: "annotations-overlay-wrapper",
          optionProps: ["annotationModels", "pid"],
          events: {
              "click .filter-tabs a": "filterItems"
          },
          initialize: function(t) {
              i.extend(this, i.pick(t, this.optionProps)),
              this.overlayModel = new s({
                  pid: this.pid
              },{
                  annotationModels: this.annotationModels
              }),
              this.overlayModel.on("remove:view", function() {
                  this.remove().trigger("removed")
              }, this),
              this.overlayModel.on("change:navType", function() {
                  this.updateTabs(),
                  this.renderAnnotationsList(),
                  this.contentContainer.emptyMarkingManager(),
                  this.annotationsList.hoverFirstAnnotation()
              }, this),
              this.on("appended", function() {
                  this.contentContainer.renderMarkingManager(),
                  this.overlayModel.set("navType", "hot"),
                  this.annotationsList.hoverFirstAnnotation()
              }, this)
          },
          filterItems: function(e) {
              var i = t(e.currentTarget).data("nav-type");
              this.overlayModel.set("navType", i)
          },
          updateTabs: function() {
              var t = this.$(".filter-tabs")
                , e = this.overlayModel.get("navType")
                , i = t.find(".actived")
                , n = t.find("a[data-nav-type=" + e + "]");
              i && n[0] === i[0] || (i && i.removeClass("actived"),
              n.addClass("actived"))
          },
          render: function() {
              return this.$el.html(i.template(this.tmpl, {
                  totalAnnotations: this.annotationModels.length
              })),
              this.overlayContainer = this.$(".annotations-overlay"),
              this.sideSection = this.$(".side"),
              this.createContentContainer(this.getContents()),
              this.annotationsList = this.createAnnotationsList(),
              this
          },
          getContents: function() {
              return [n.getModel("content").getParagraph(this.pid)]
          },
          renderAnnotationsList: function() {
              this.annotationsList.render()
          },
          createAnnotationsList: function() {
              var t = new r({
                  overlayModel: this.overlayModel,
                  el: this.$(".annotations-list-container")
              });
              return t.on("hoverClass:added", function(t) {
                  var e = t.data("view").model;
                  this.contentContainer.renderUnderline(e).scrollToCurrentMarking()
              }, this),
              t
          }
      }, a))
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(2), i(1), i(287)],
  void 0 === (o = function(t, e, i, n) {
      var o = e.View.extend({
          tmpl: t("#tmpl-para-annotations-hidden-list").html(),
          initialize: function(t) {
              var e = t.overlayModel;
              this.overlayModel = e,
              this.itemModels = []
          },
          events: {
              "click .btn-more": "toggle"
          },
          render: function() {
              this.$el.html(this.tmpl),
              this.elList = this.$(".annotations-hidden-list"),
              this.elCount = this.$(".count"),
              this.$el.hide(),
              this.isHidden = !0,
              this.$el.addClass("is-hidden")
          },
          toggle: function() {
              this.isHidden = !this.isHidden,
              this.$el.toggleClass("is-hidden", this.isHidden)
          },
          addItem: function(t) {
              this.itemModels.push(t);
              var e = new n({
                  model: t,
                  overlayModel: this.overlayModel
              });
              this.elList.append(e.render().el),
              this.elCount.text(this.itemModels.length),
              this.$el.show()
          }
      });
      return e.View.extend({
          events: {
              "mouseenter li": "hoverAnnotation"
          },
          initialize: function(t) {
              this.overlayModel = t.overlayModel
          },
          addHoverClass: function(t) {
              t.addClass("hover"),
              this.trigger("hoverClass:added", t)
          },
          hoverAnnotation: function(e) {
              var i = t(e.currentTarget)
                , n = this.$(".hover");
              n[0] !== i[0] && (n.removeClass("hover"),
              this.addHoverClass(i))
          },
          hoverFirstAnnotation: function() {
              var t = this.$(".annotation-item").first();
              t.length && this.addHoverClass(t)
          },
          renderNoAnnotations: function(e) {
              var i = t("<div>", {
                  class: "no-annotations-label"
              });
              this.elList.html(i.html(e))
          },
          render: function() {
              var t = this;
              this.stopListening(),
              this.elList = this.$(".annotations-list"),
              this.elList.empty();
              var e = this.overlayModel.getAnnotations();
              if (e.forEach(function(e) {
                  t.listenTo(e, "change:state", t.render.bind(t))
              }),
              this.overlayModel.annotaitonsIsEmpty())
                  this.renderNoAnnotations("<p>暂时没有划线和批注</p><p>可以在阅读时选中文字后添加</p>");
              else {
                  if (e.length) {
                      var r = new o({
                          el: this.$(".annotations-hidden-list-container"),
                          overlayModel: this.overlayModel
                      });
                      return r.render(),
                      i.each(e, function(t) {
                          if (t.isNote())
                              if (t.isHidden())
                                  r.addItem(t);
                              else {
                                  var e = new n({
                                      model: t,
                                      overlayModel: this.overlayModel
                                  });
                                  this.elList.append(e.render().el)
                              }
                      }, this),
                      this
                  }
                  "favorite" === this.overlayModel.get("navType") && this.renderNoAnnotations("<p>暂时没有被你赞过的他人批注</p><p>可以对你认为有趣的他人批注点赞，它们就会出现在这里</p>")
              }
          }
      })
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  function r(t) {
      for (var e = 1; e < arguments.length; e++) {
          var i = null != arguments[e] ? arguments[e] : {}
            , n = Object.keys(i);
          "function" == typeof Object.getOwnPropertySymbols && (n = n.concat(Object.getOwnPropertySymbols(i).filter(function(t) {
              return Object.getOwnPropertyDescriptor(i, t).enumerable
          }))),
          n.forEach(function(e) {
              a(t, e, i[e])
          })
      }
      return t
  }
  function a(t, e, i) {
      return e in t ? Object.defineProperty(t, e, {
          value: i,
          enumerable: !0,
          configurable: !0,
          writable: !0
      }) : t[e] = i,
      t
  }
  n = [i(0), i(2), i(1), i(6), i(3), i(21), i(33), i(4), i(107), i(38)],
  void 0 === (o = function(t, e, i, n, o, a, s, l, h, c) {
      return e.View.extend({
          tmpl: t("#tmpl-para-annotations-overlay-annotation-item").html(),
          tagName: "li",
          className: "annotation-item",
          events: {
              click: "openSingleAnnotation",
              "click .delete": "deleteNote"
          },
          initialize: function(t) {
              this.$el.data("view", this),
              this.overlayModel = t.overlayModel
          },
          openSingleAnnotation: function(t) {
              "A" !== t.target.tagName && (this.overlayModel.trigger("remove:view"),
              n.vent.trigger("open:singleAnnotationOverlay", this.model, this.overlayModel.get("pid")))
          },
          render: function() {
              var t = this
                , e = this.model.toJSON()
                , a = e.owner.user_id;
              return this.$el.html(i.template(this.tmpl, i.extend(e, {
                  printTime: h,
                  actions: this.model.getActionsList(),
                  isPrivate: this.model.isPrivate(),
                  isArticleAuthor: a === n.getModel("article").get("authorId"),
                  autoLink: s
              }))),
              this.$el.toggleClass("is-deleted", !!e.state.isDeleted),
              this.$(".ugc-admin-actions-container").length && this.$(".ugc-admin-actions-container").append(new c({
                  data: e.state,
                  id: this.model.id,
                  type: "annotation",
                  user: o.me.name,
                  startDeleteRequest: function(e) {
                      return l({
                          type: "delete",
                          url: i.result(t.model, "url"),
                          data: r({}, e, {
                              id: t.model.id
                          })
                      })
                  },
                  onUpdate: function(e, i) {
                      t.model.set("state", i)
                  }
              }).render().el),
              this
          },
          deleteNote: function() {
              if (confirm("真的要删除这条批注吗？")) {
                  this.model.destroy();
                  var t = this.overlayModel.get("pid");
                  this.overlayModel.trigger("remove:view"),
                  n.vent.trigger("open:paraAnnotationsOverlay", t)
              }
          }
      })
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(2), i(1), i(6), i(122), i(289)],
  void 0 === (o = function(t, e, i, n, o, r) {
      return e.View.extend({
          className: "content-container",
          tmplHtml: t("#tmpl-content-container").html(),
          initialize: function(t) {
              this.height = t.height,
              this.$el.css({
                  height: this.height,
                  overflowX: "hidden"
              }),
              this.markingManager = new r({
                  contentContainer: this
              })
          },
          render: function() {
              return this.$el.html(this.tmplHtml),
              this.content = this.$(".content"),
              this
          },
          renderMarkingManager: function() {
              return this.hasScroll = this.content.height() > this.height,
              this.$el.css("overflowY", this.hasScroll ? "auto" : "hidden"),
              this.$el.append(this.markingManager.render().el),
              this
          },
          emptyMarkingManager: function() {
              return this.markingManager.empty(),
              this
          },
          renderUnderline: function(t) {
              return this.markingManager.renderUnderline(t),
              this
          },
          scrollToCurrentMarking: function() {
              var t = this.markingManager.getCurrentMarkingPosition();
              this.$el.stop().animate({
                  scrollTop: t.top - 60
              }, "slow")
          },
          renderContent: function(t) {
              var e = this.content;
              return e.empty(),
              this.jqParas = {},
              i.each(t, function(t) {
                  t = i.clone(t),
                  e.append(o(t));
                  var n = t.pid;
                  this.jqParas[t.pid] = e.find("p[data-pid=" + n + "]")
              }, this),
              this
          },
          loadFigures: function() {
              var e = this.content.find(".illus")
                , n = this.content.width();
              return e.length ? (i.each(e, function(e) {
                  var i = (e = t(e).css("height", "auto")).find("img")
                    , o = i.data("src")
                    , r = i.data("orig-width")
                    , a = i.data("orig-height");
                  if (n < r) {
                      var s = r / a;
                      r = n,
                      a = n / s
                  }
                  i.attr("src", o).css({
                      width: r,
                      height: a
                  }).removeClass("loading")
              }),
              this) : this
          }
      })
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(2), i(1), i(6), i(122), i(106), i(135)],
  void 0 === (o = function(t, e, i, n, o, r, a) {
      var s = e.View.extend({
          className: "markings-layer",
          initialize: function(t) {
              this.contentContainer = t.contentContainer
          },
          render: function() {
              return this
          },
          empty: function() {
              return this.$el.empty(),
              this
          },
          renderUnderline: function(e) {
              var i = t("<div>", {
                  class: "page-marking-container"
              });
              i.html(this._getUnderlineView(e)),
              this.$el.html(i)
          },
          getCurrentMarkingPosition: function() {
              return this.$(".marking").position()
          },
          _getUnderlineView: function(t) {
              return this.addSubView(new a({
                  model: t,
                  paragraphs: this.contentContainer.jqParas,
                  plotOptions: {
                      containerAttrs: {
                          class: "fake-content-container",
                          css: this.contentContainer.hasScroll ? {
                              overflowY: "scroll"
                          } : {}
                      },
                      isDrawInArticle: !1
                  }
              })).render().el
          }
      });
      return i.extend(s.prototype, r),
      s
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(2), i(1), i(6), i(169), i(170), i(293)],
  void 0 === (o = function(t, e, i, n, o, r, a) {
      return e.View.extend(i.extend({
          tmplHtml: t("#tmpl-single-annotation-overlay").html(),
          className: "annotations-overlay-wrapper",
          initialize: function(t) {
              var i = this;
              this.overlayModel = new e.Model({}),
              t.pid && this.overlayModel.set("pid", t.pid),
              this.overlayModel.on("remove:view", function() {
                  this.remove().trigger("removed")
              }, this),
              this.on("appended", function(t) {
                  this.contentContainer.loadFigures().renderMarkingManager().renderUnderline(this.model).scrollToCurrentMarking(),
                  this.noteSection.trigger("create:noteTip", {
                      renderTo: t.el
                  }),
                  this.annotationComments.updateListHeight()
              }, this),
              this.listenTo(this.model, "change:state", function() {
                  i.render(),
                  i.annotationComments.updateListHeight()
              })
          },
          render: function() {
              this.$el.html(this.tmplHtml),
              this.overlayContainer = this.$(".annotations-overlay"),
              this.sideSection = this.$(".side");
              var t = new a({
                  model: this.model,
                  overlayModel: this.overlayModel
              });
              return this.noteSection = t,
              this.annotationComments = new r({
                  markingModel: this.model,
                  className: "single-annotation-overlay-comments",
                  commentFormIsTop: !1,
                  commentTargetInfo: {
                      article: {
                          authorId: n.getModel("article").get("authorId")
                      }
                  },
                  noReply: this.model.isLocked()
              }),
              this.$(".main").append(t.render().$el).append(this.annotationComments.render().$el),
              this.createContentContainer(this.getContents()),
              this
          },
          getContents: function() {
              var t = n.getModel("content");
              return i.chain(this.model.getContainerIds()).filter(function(e) {
                  return t.canPidRender(e)
              }).map(function(e) {
                  return t.getParagraph(e)
              }).value()
          }
      }, o))
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(2), i(1), i(3), i(292), i(46), i(34)],
  void 0 === (o = function(t, e, i, n, o, r, a) {
      var s = e.View.extend({
          className: "annotation-comments-panel",
          tmplForm: t("#tmpl-annotation-comments-form").html(),
          initialize: function(t) {
              this.commentFormIsTop = t.commentFormIsTop,
              this.noReply = t.noReply,
              t.tmplComment && (this.tmplComment = t.tmplComment),
              this.comments = new o([],{
                  url: t.commentsUrl
              }),
              this.commentTargetInfo = t.commentTargetInfo,
              this.listenTo(this.comments, "add", this.appendCommentModel),
              this.comments.fetch()
          },
          events: {
              "submit .comment-form": "submitComment"
          },
          render: function() {
              var e = t("<ul>", {
                  class: "comments-list"
              });
              if (this.commentsList = e,
              this.noReply)
                  this.$el.append(e);
              else {
                  var n = t("<form>", {
                      class: "comment-form"
                  }).html(this.tmplForm)
                    , o = [e, n];
                  this.commentFormIsTop && i(o).reverse(),
                  i(o).each(function(t) {
                      this.$el.append(t)
                  }, this),
                  this.form = n
              }
              return this
          },
          appendCommentModel: function(t) {
              var e = new r({
                  model: t,
                  tmpl: this.tmplComment,
                  targetInfo: this.commentTargetInfo
              });
              this.commentsList[this.commentFormIsTop ? "prepend" : "append"](e.render().el),
              this.commentFormIsTop || this.commentsList.scrollTop(this.commentsList[0].scrollHeight)
          },
          getFormHeight: function() {
              return this.form ? this.form.outerHeight(!0) : 0
          },
          submitComment: function(e) {
              var i = this;
              e.preventDefault();
              var n = t(e.target)
                , o = n.find("input[name=text]")
                , r = t.trim(o.val());
              if (r.length && !this.formDisabled) {
                  this.formDisabled = !0,
                  n.addClass("loading");
                  var a = new this.comments.model({
                      text: r
                  },{
                      urlRoot: this.comments.url
                  });
                  a.save().done(function() {
                      o.val(""),
                      o.blur(),
                      i.comments.add(a)
                  }).fail(function(t) {
                      if ("HasBannedWordsError" === t.name)
                          return alert(t.message);
                      alert("遇到的奇怪的错误，请稍后再试")
                  }).always(function() {
                      i.formDisabled = !1,
                      n.removeClass("loading")
                  })
              }
          }
      })
        , l = function() {
          return a.openLoginAndSignup(),
          !1
      }
        , h = {};
      return n.me.isAnonymous && (s.prototype.events["focus input:text"] = "focusInput",
      i.each(["submitComment", "focusInput"], function(t) {
          h[t] = l
      })),
      i.extend(s.prototype, h),
      s
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(2), i(25)],
  void 0 === (o = function(t, e) {
      return t.Collection.extend({
          model: e,
          initialize: function(t, e) {
              var i = e.url;
              this.url = i
          }
      })
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  function r(t) {
      for (var e = 1; e < arguments.length; e++) {
          var i = null != arguments[e] ? arguments[e] : {}
            , n = Object.keys(i);
          "function" == typeof Object.getOwnPropertySymbols && (n = n.concat(Object.getOwnPropertySymbols(i).filter(function(t) {
              return Object.getOwnPropertyDescriptor(i, t).enumerable
          }))),
          n.forEach(function(e) {
              a(t, e, i[e])
          })
      }
      return t
  }
  function a(t, e, i) {
      return e in t ? Object.defineProperty(t, e, {
          value: i,
          enumerable: !0,
          configurable: !0,
          writable: !0
      }) : t[e] = i,
      t
  }
  n = [i(0), i(2), i(1), i(6), i(3), i(33), i(4), i(168), i(121), i(107), i(294), i(38), i(40)],
  void 0 === (o = function(t, e, i, n, o, a, s, l, h, c, d, p) {
      var u = e.View.extend({
          className: "note-section",
          tmpl: t("#tmpl-single-note").html(),
          tmplNoteActions: t("#tmpl-single-note-actions").html(),
          tmplFavoriteText: t("#tmpl-annotation-favorite-text").html(),
          initialize: function(t) {
              this.overlayModel = t.overlayModel,
              this.on("create:noteTip", function(t) {
                  this.createNoteTip(t)
              }, this),
              this.listenTo(this.model, "change:note", function(t, e) {
                  this.$(".note").text(e)
              }, this).listenTo(this.model, "change:n_comments", function(t, e) {
                  this.$(".comments-num").text(e)
              }).listenTo(this.model, "change:n_favorites", this.updateFavorite, this).listenTo(this.model, "change:visible_private", this.updatePrivate, this),
              this.$el.on("removing", i.bind(function() {
                  this.stopListening()
              }, this))
          },
          events: {
              "click .share": "shareNote",
              "click .edit": "editNote",
              "click .delete": "deleteNote",
              "click .favorite": "favoriteNote",
              "click .lnk-para-annotations": "lnkParaAnnotations",
              "click .open-favorites-list": "openFavoritesList"
          },
          render: function() {
              var t = this;
              return this.$el.html(this.getSingleNoteHtml()),
              this.favoriteWrapper = this.$(".favorite-wrapper"),
              this.updateFavorite(this.model),
              this.updatePrivate(this.model),
              this.$(".ugc-admin-actions-container").length && this.$(".ugc-admin-actions-container").append(new p({
                  data: this.model.get("state"),
                  id: this.model.id,
                  type: "annotation",
                  user: o.me.name,
                  startDeleteRequest: function(e) {
                      return s({
                          type: "delete",
                          url: i.result(t.model, "url"),
                          data: r({}, e, {
                              id: t.model.id
                          })
                      })
                  },
                  onUpdate: function(e, i) {
                      t.model.set("state", i)
                  }
              }).render().el),
              this
          },
          updateFavorite: function(t) {
              var e = t.get("n_favorites");
              this.favoriteWrapper.find(".count").text(e),
              this.$el.toggleClass("no-favorite", 0 === e).toggleClass("is-favorited", t.isFavorited())
          },
          updatePrivate: function(t) {
              var e = t.isPrivate();
              this.$el.toggleClass("is-private", e)
          },
          lnkParaAnnotations: function(t) {
              t.preventDefault(),
              this.openParaAnnotations()
          },
          openParaAnnotations: function() {
              var t = this.overlayModel.get("pid") || this.model.get("endContainerId");
              this.overlayModel.trigger("remove:view"),
              n.vent.trigger("open:paraAnnotationsOverlay", t)
          },
          createNoteTip: function(t) {
              this.noteTip = new h(t)
          },
          getSingleNoteHtml: function() {
              var t = this.model.toJSON()
                , e = t.owner.user_id;
              return i.template(this.tmpl, i.extend(t, {
                  noteActionsHtml: this.getNoteActionsHtml(),
                  printTime: c,
                  isPrivate: this.model.isPrivate(),
                  isArticleAuthor: e === n.getModel("article").get("authorId"),
                  autoLink: a
              }))
          },
          getNoteActionsHtml: function() {
              return i.template(this.tmplNoteActions, i.extend(this.model.toJSON(), {
                  actions: this.model.getActionsList(),
                  isPrivate: this.model.isPrivate(),
                  isMine: this.model.isMine()
              }))
          },
          openFavoritesList: function() {
              var t = new d({
                  annotationId: this.model.id
              });
              this.$el.append(t.$el)
          }
      });
      return i.extend(u.prototype, l, {
          loginRedirectType: "overlay",
          _getNoteModel: function() {
              return this.model
          },
          deleteNote: function(t) {
              l.deleteNote.call(this, t) && this.openParaAnnotations()
          },
          _setTarget: !0
      }),
      u
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(2), i(1), i(4)],
  void 0 === (o = function(t, e, i, n) {
      return e.View.extend({
          className: "favorites-list",
          tmpl: t("#tmpl-favorite-list").html(),
          events: {
              "click .btn-close": "remove"
          },
          initialize: function(t) {
              var e = this
                , o = t.annotationId;
              n({
                  type: "get",
                  url: "/j/annotation/".concat(o, "/favorite")
              }).then(function(t) {
                  e.$el.html(i.template(e.tmpl, {
                      list: t
                  }))
              })
          }
      })
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(2), i(1), i(6), i(138), i(172), i(173), i(137), i(112)],
  void 0 === (o = function(t, e, i, n, o, r, a, s) {
      var l = t.View.extend({
          el: ".bookmarks-layout",
          events: {
              "click .bookmark": "toggleBookmark"
          },
          initialize: function(t) {
              return e.bindAll(this, "showOrHideBookmark", "toggleBookmark", "renderBookmark", "removeBookmarkInList"),
              this.app = i,
              this.vent = i.vent,
              this.config = t.config,
              this.vent.on({
                  "render:bookmark": this.renderBookmark,
                  "remove:bookmark": this.removeBookmarkInList,
                  "hover:page": this.showOrHideBookmark
              }),
              this
          },
          removeBookmarkInList: function(t) {
              this.collection.remove(t)
          },
          render: function(t) {
              return this.articleModel = t.article,
              this.worksId = this.articleModel.id,
              this.contentModel = t.contentModel,
              this.toc = this.contentModel.contents,
              this.hasToc = !!this.toc.length,
              this.isGift = this.articleModel.get("isGift"),
              this.collection = new n([],{
                  articleId: this.worksId,
                  contentModel: this.contentModel
              }),
              this.bookmark = this.$el.find(".bookmark"),
              this.initialFetchReq = this.collection.fetch(),
              this.tocPageNumbers = this.contentModel.getTocPageNumbers(),
              this.listenTo(this.collection, "reset add remove", e.bind(function() {
                  this.articleModel.bookmarks = this.collection,
                  this.renderBookmark()
              }, this)),
              this
          },
          getPagePids: function(t) {
              var e = this.contentModel.getPage(t).paragraphs;
              return e ? e.map(function(t) {
                  return t.pid
              }) : []
          },
          getCurrPage: function() {
              return i.getModel("turning").get("currPage")
          },
          newBookmarkAttrs: r,
          renderBookmark: function() {
              if ("pending" !== this.initialFetchReq.state()) {
                  var t = this.getCurrPage();
                  if (this.isBookmarkKeepHiding())
                      return this.bookmark.hide(),
                      this;
                  if (!this.collection.length)
                      return this.deactive();
                  var i = this.getPagePids(t)
                    , n = this.collection.getPids()
                    , o = e.intersection(n, i);
                  if (e.contains(n, 0)) {
                      var r = this.collection.where({
                          paragraph_id: 0
                      })
                        , l = e.map(r, function(t) {
                          return t.get("part_sequence")
                      })
                        , h = e.indexOf(this.tocPageNumbers, t)
                        , c = e.contains(l, h);
                      if (!this.hasToc && 1 === t || this.hasToc && c) {
                          var d = l[e.indexOf(l, h)];
                          return this.model = this.collection.findWhere({
                              part_sequence: d
                          }),
                          this.active()
                      }
                  }
                  if (this.model = this.collection.findWhere({
                      paragraph_id: o[0]
                  }),
                  !this.model)
                      return this.deactive();
                  var p = this.model.get("paragraph_offset")
                    , u = new s({
                      pid: o[0],
                      offset: p
                  });
                  return a.getByStamp(u).pagination !== t ? this.deactive() : this.active()
              }
              this.initialFetchReq.then(this.renderBookmark.bind(this))
          },
          isBookmarkKeepHiding: function() {
              if (!i.hasModel("article") || !i.hasModel("turning") || !i.getModel("turning").isPageTurned())
                  return !0;
              var t = i.getModel("turning").currIsGiftPage()
                , e = i.getModel("config").get("isChapter") && i.getModel("article").get("isSample");
              return t || e
          },
          showOrHideBookmark: function(t) {
              this.isBookmarkKeepHiding() || !this.bookmark || this.bookmark.hasClass("active") || t.relatedTarget && /bookmark|inner/.test(t.relatedTarget.className) || ("mouseenter" === t.type ? this.bookmark.stop(!0, !0).show() : this.bookmark.fadeOut())
          }
      });
      return e.extend(l.prototype, o),
      l
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(1), i(2)],
  void 0 === (o = function(t, e) {
      return e.Model.extend({
          defaults: {
              reviewsCount: 0,
              commentsCount: 0
          },
          url: function() {
              return "/j/ebook/" + this.articleId + "/comments"
          },
          initialize: function(t, e) {
              this.articleId = e.articleId
          }
      })
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(1), i(2), i(130), i(9)],
  void 0 === (o = function(t, e, i, n, o) {
      var r = t(window)
        , a = (o.hasTouch(),
      t.trim(t("#tmpl-tips").html()))
        , s = {
          percent: [.3, .7],
          direct: ["left", "center", "right"]
      }
        , l = {
          left: .1,
          center: .5,
          right: .9
      }
        , h = {
          top: "initial",
          bottom: "initial",
          right: "initial",
          left: "initial"
      }
        , c = {
          html: a,
          contentClass: ".footnote"
      };
      return n.extend({
          _super: n.prototype,
          constructor: function(e) {
              e = t.extend({}, c, e),
              this.removeAll(),
              this._super.constructor.call(this, e)
          },
          _getDirection: function(t) {
              var i = this.getOffsetWithin(t)
                , n = i.left / r.width()
                , o = (i.top,
              r.height(),
              s);
              return {
                  horizontal: o.direct[e.sortedIndex(o.percent, n)],
                  vertical: i.top - this._node.outerHeight() - 12 < 0 ? "top" : "bottom"
              }
          },
          setPosition: function(i) {
              var n = t(i)
                , o = this.getOffsetWithin(n)
                , r = this._node.outerWidth()
                , a = this._node.outerHeight()
                , s = this._getDirection.call(this, n)
                , c = e.clone(h);
              return c.left = o.left + n.width() / 2 - r * l[s.horizontal],
              "top" === s.vertical ? c.top = o.top + 10 + n.height() : c.top = o.top - 10 - a,
              this._node[0].className = this._node[0].className.replace(/\s*arrow-\w+\s*/g, " "),
              this._node.addClass("arrow-" + s.vertical).addClass("arrow-" + s.horizontal).css(c),
              this.opt.width && this._node.width(this.opt.width),
              this
          },
          update: function() {
              return this._super.update.apply(this, arguments),
              this
          },
          removeAll: function() {
              var e = t(".tips-outer");
              e.length && e.remove()
          },
          destroy: function() {
              var t = this;
              this._node.fadeOut(200, function() {
                  t._super.destroy.apply(t, arguments)
              })
          },
          onClickOutside: function() {
              this.destroy()
          }
      })
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  function r(t) {
      for (var e = 1; e < arguments.length; e++) {
          var i = null != arguments[e] ? arguments[e] : {}
            , n = Object.keys(i);
          "function" == typeof Object.getOwnPropertySymbols && (n = n.concat(Object.getOwnPropertySymbols(i).filter(function(t) {
              return Object.getOwnPropertyDescriptor(i, t).enumerable
          }))),
          n.forEach(function(e) {
              a(t, e, i[e])
          })
      }
      return t
  }
  function a(t, e, i) {
      return e in t ? Object.defineProperty(t, e, {
          value: i,
          enumerable: !0,
          configurable: !0,
          writable: !0
      }) : t[e] = i,
      t
  }
  n = [i(0), i(1), i(3), i(105), i(299), i(9), i(300), i(157), i(159), i(301), i(302)],
  void 0 === (o = function(t, e, i, n, o, a, s, l, h, c, d) {
      var p = "h1"
        , u = "h2"
        , g = ".orig-author"
        , f = ".translator"
        , m = 2
        , v = /msie/i.test(navigator.userAgent)
        , y = a.punctuationProhibitionInconsistent();
      function b(t) {
          return t.info && t.info.height || 0
      }
      return function(w) {
          w = e.defaults(w, {
              lineHeight: 32,
              pageHeight: 768,
              layout: "horizontal",
              paragraphSpaceInRow: 0,
              trimLastPage: !1
          }),
          e.isBoolean(w.illusMode) || (w.illusMode = "horizontal" === w.layout ? "zoom" : "throughPage"),
          e.isBoolean(w.avoidBottomHeadline) || (w.avoidBottomHeadline = "horizontal" === w.layout);
          var x = function(t, e) {
              return e / t.lineHeight
          }
          .bind(null, w)
            , P = function(t, e) {
              return e * t.lineHeight
          }
          .bind(null, w)
            , T = t.Deferred()
            , k = Math.min(w.pageHeight, 768 * 1.6)
            , C = w.pageWidth
            , M = w.metadata.hasFormula
            , S = w.paragraphSpaceInRow
            , A = t(".loading-hint")
            , I = w.typePage.find(".content")
            , _ = Math.floor(x(k))
            , N = P(_)
            , E = w.data.toc
            , O = E.length && e.last(E).part_no > 0
            , $ = []
            , D = {}
            , L = {}
            , z = {}
            , H = []
            , F = w.data.posts
            , j = w.data.gift
            , B = w.data.metaData
            , R = {}
            , V = 0
            , W = w.usingLiteStyle
            , U = {};
          if (!Ark.features["reader/katex"] && v && M && !s())
              return A.remove(),
              I.html(t("#tmpl-mathplayer-hint").html()),
              T.reject(),
              T.promise();
          function J() {
              return $.length + 1
          }
          function X() {
              if (!$.length)
                  return 0;
              var t = $[$.length - 1];
              return t.height + t.offset
          }
          function Y(t, e) {
              if (t) {
                  var i = D[t];
                  if (i) {
                      if (e - i[i.length - 1] > 1)
                          return;
                      i.push(e)
                  } else
                      D[t] = [e]
              }
          }
          function G() {
              return {
                  paragraphs: [],
                  pagination: J(),
                  content: {},
                  offset: X()
              }
          }
          function q(t) {
              $.push(t),
              H.push(t.offset)
          }
          function Z(t, e) {
              return t >= 0 ? 0 : (i = t + e) - Math.floor(i);
              var i
          }
          function K(t) {
              var e = b(t);
              return _ - x(e)
          }
          function Q() {
              var i, n, a = I.find(".story"), s = O;
              e.each(a, function(o) {
                  o = t(o),
                  i = o.find(".info"),
                  n = o.find("p"),
                  R = G(),
                  V = _,
                  s && function(t) {
                      var e = x(t.height()) + m
                        , i = t.find(p).text();
                      V -= e,
                      R.info = {
                          title: i,
                          subtitle: t.find(u).text(),
                          orig_author: t.find(g).text(),
                          translator: t.find(f).text(),
                          height: P(e)
                      }
                  }(i),
                  function(i) {
                      var n, o, a = i.length, s = a - 2;
                      e.each(i, function(l, c) {
                          var p = t(l);
                          if (p.hasClass("pagebreak") && !W && V >= 0)
                              return R.breaked = !0,
                              void (V = 0);
                          var u, g = p.data("pid") + "", f = function(e, i) {
                              if (e in U)
                                  return U[e];
                              var n = t.trim(i.html());
                              return U[e] = n,
                              n
                          }(g, p), m = p.attr("class"), v = /code|paragraph|uli|oli/.test(u = m) || "throughPage" === w.illusMode && /illus/.test(u), y = !v && !/custom/.test(m), T = /illus|code/.exec(m), C = T && T[0] || "paragraph", M = o;
                          o = -1 !== m.indexOf("headline");
                          var A = /oli|uli/.test(m)
                            , I = c < s && /oli|uli/.test(i[c + 1].className)
                            , N = !1;
                          c && M && o && ((N = "vertical" === w.layout || function(t, e, i) {
                              return V - p.outerHeight(!0) / i.lineHeight >= 0
                          }(0, 0, w)) ? (p.addClass("continuous-headline"),
                          m = p.attr("class")) : p.addClass("continuous-headline-breaked-by-page")),
                          A && !I && (p.addClass("last-list-item"),
                          m = p.attr("class"));
                          var E = p.outerHeight(!0);
                          n = x(E);
                          var O = E > k && !v;
                          o && !N && w.avoidBottomHeadline && V > 0 && V - n <= 0 && (V = 0);
                          var D, $, H = !1, F = function(t, i, n, o, a) {
                              var s = parseInt(t.attr("group-item-index"), 10)
                                , l = parseInt(t.attr("depth"), 10)
                                , h = {};
                              return e.isNaN(s) || (h.groupItemIndex = s),
                              e.isNaN(l) || (h.depth = l),
                              r({
                                  text: a,
                                  klass: n,
                                  pid: i,
                                  type: o
                              }, h)
                          }(p, g, m, C, f);
                          if (F.outerHeight = E,
                          d(V >= 0, "rowsRemaining must >= 0", !0),
                          V > 0) {
                              var j = V - n;
                              if (j >= 0 || V >= 1 && v)
                                  R.paragraphs.push(F),
                                  Y(g, R.pagination),
                                  V = j,
                                  H = !0;
                              else if (j < 0 && y) {
                                  var B = P(V);
                                  D = E,
                                  $ = k,
                                  B > .8 * Math.min($, D) && (h.resizeIllusElem(p, {
                                      maxHeight: B
                                  }),
                                  F.text = p.html(),
                                  R.paragraphs.push(F),
                                  Y(g, R.pagination),
                                  V = 0,
                                  H = !0)
                              }
                          }
                          var J = 0;
                          for (H || (J = V,
                          V = -n),
                          V < 0 && "horizontal" === w.layout && -V === S && function(t) {
                              return !/uli|oli/.test(t) || /last-list-item/.test(t)
                          }(m) && (V = 0); V < 0; ) {
                              var X = {};
                              if (J)
                                  R.content.height = P(K(R) - J),
                                  R.height = R.content.height + b(R),
                                  q(R);
                              else {
                                  var Q = Z(V, n);
                                  R.content.height = P(K(R) - Q),
                                  R.height = R.content.height + b(R),
                                  q(R),
                                  V -= Q
                              }
                              if (R = G(),
                              J = 0,
                              O) {
                                  n = _;
                                  var tt = E - p.height();
                                  X.height = k - tt
                              }
                              var et = V + n;
                              v && 0 !== et && (X.offset = P(et),
                              z[g] ? z[g].push(et) : z[g] = [0, et]),
                              R.paragraphs.push(r({}, F, X)),
                              Y(g, R.pagination),
                              V += _
                          }
                          !function(t, i) {
                              L[g] = e.pick(i, "text", "klass", "pid", "type")
                          }(0, F),
                          c + 1 === a && (w.trimLastPage ? (R.height = P(_ - V - S),
                          R.content.height = R.height - b(R)) : (R.height = k,
                          R.content.height = R.height - b(R)),
                          q(R))
                      })
                  }(n)
              }),
              I.css("visibility", "visible"),
              T.resolve(new o({
                  body: $,
                  posts: F,
                  gift: j,
                  pidAndPageMap: D,
                  pidAndParaMap: L,
                  paragraphOffsetsMap: z,
                  pageOffsetPxMap: H,
                  originToc: w.data.toc,
                  rawData: w.data
              }))
          }
          function tt() {
              if ((y || w.shouldPreSplitSpan) && w.willSplitToSpan) {
                  var t = a.mightParaLinesOverflow
                    , e = I[0].getBoundingClientRect().right;
                  I.find(n.textParagraphSelector).each(function(i, n) {
                      (w.shouldPreSplitSpan || t(e, n)) && (n.innerHTML = l(n.children[0]))
                  })
              }
          }
          return j && q({
              note: {
                  recipient: i.me.name,
                  words: j.words,
                  sender: j.sender,
                  date: j.date
              },
              pagination: J(),
              offset: X(),
              height: N
          }),
          W || q({
              titlePageInfo: {
                  title: B.title,
                  subtitle: B.subtitle,
                  author: B.author,
                  translator: B.translator,
                  publisher: B.publisher,
                  provider: B.provider,
                  authorizer: B.authorizer,
                  authorizedDistrict: B.authorizedDistrict,
                  isOriginWorks: B.isOriginWorks
              },
              isTitlePage: !0,
              pagination: J(),
              offset: X(),
              height: N
          }),
          w.data.posts.forEach(function(t) {
              t.contents.forEach(function(t) {
                  "illus" === t.type && h.resizeIllus(t, {
                      maxWidth: C
                  })
              })
          }),
          I.css("visibility", "hidden").html(e.template(w.template.article, e.extend({
              figureUtil: h
          }, w.data))),
          "throughPage" !== w.illusMode && I.find(".illus").each(function(e, i) {
              (i = t(i)).outerHeight(!0) <= k || h.resizeIllusElem(i, {
                  maxHeight: k
              })
          }),
          M ? c(I, function() {
              tt(),
              Q()
          }) : (tt(),
          /msie 10.0/i.test(navigator.userAgent) ? e.delay(Q, 180) : Q()),
          T.promise()
      }
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(1)],
  void 0 === (o = function(t) {
      var e = ["body", "posts", "gift", "originToc", "pidAndPageMap", "paragraphOffsetsMap", "pidAndParaMap", "pageOffsetPxMap", "rawData"]
        , i = function(i) {
          t.extend(this, t.pick(i, e)),
          this.convertPidToString(),
          this.parasIndexs = this.makeParasIndexs(),
          this.contents = this.makeContents(),
          this.addPageTocRef(),
          this.pagingPointMap = {},
          this.pidAndLinesMap = {}
      };
      return t.extend(i.prototype, {
          isEmpty: function() {
              return !this.body
          },
          isPara: function(t) {
              return "paragraph" === t.type
          },
          getParagraph: function(t) {
              return this.pidAndParaMap[t]
          },
          getPage: function(t) {
              return this.body[t - 1]
          },
          getPages: function() {
              return Array.prototype.slice.apply(this.body, arguments)
          },
          findPaginations: function(t) {
              return this.pidAndPageMap[t]
          },
          findParagraphOffsets: function(t) {
              return this.paragraphOffsetsMap[t]
          },
          setParagraphPagingPoint: function(t, e) {
              var i = this.getPage(t).paragraphs
                , n = i[i.length - 1].pid;
              this.pagingPointMap[t] = {
                  wordOffset: e,
                  pid: n
              }
          },
          findParagraphPagingPoint: function(t) {
              return this.pagingPointMap[t]
          },
          findStampOffset: function(e, i) {
              var n = this.findPaginations(e);
              return n.length < 2 ? 0 : this.findParagraphOffsets(e)[t.indexOf(n, i)]
          },
          isPidExist: function(t) {
              return t in this.pidAndParaSourceMap
          },
          canPidRender: function(t) {
              return "pagebreak" !== this.getParaSourceByPid(t).type
          },
          getParasIndexs: function() {
              return this.parasIndexs
          },
          getParaSourceByPid: function(t) {
              return this.pidAndParaSourceMap[t]
          },
          convertPidToString: function() {
              t.forEach(this.posts, function(e) {
                  t.forEach(e.contents, function(t) {
                      t.id += ""
                  })
              }),
              t.forEach(this.originToc, function(t) {
                  t.paragraph_id += ""
              })
          },
          makeParasIndexs: function() {
              var e = this.pidAndParaSourceMap = {};
              return t.chain(this.posts).map(function(t) {
                  return t.contents
              }).flatten(!0).map(function(t) {
                  var i = t.id;
                  return e[i] = t,
                  i
              }).value()
          },
          getNextPid: function(t) {
              var e = this.parasIndexs.indexOf(t);
              return this.parasIndexs[e + 1]
          },
          makeContents: function() {
              var e, i, n, o, r = this.posts, a = this.pidAndPageMap, s = this.originToc, l = this.parasIndexs;
              s = t.chain(s).filter(function(t) {
                  return t.level < 3
              }).map(function(s) {
                  return s.readable = !1,
                  e = s.paragraph_id,
                  i = s.part_no,
                  e in a && (s.readable = !0,
                  s.isStoryTitle = !1,
                  s.pageNum = a[e][0],
                  s.sequence = t.indexOf(l, e)),
                  n !== i && (n = i,
                  s.readable = !!r[i],
                  s.isStoryTitle = !0,
                  o = r[i] && r[i].contents && r[i].contents[0] && t.find(r[i].contents, function(t) {
                      return "pagebreak" !== t.type
                  }),
                  (e = o && o.id) && (s.pageNum = a[e][0],
                  s.paragraph_id = e,
                  s.sequence = t.indexOf(l, e))),
                  s
              }).value();
              var h = this.gift ? 2 : 1;
              return s.unshift({
                  isTitlePage: !0,
                  isStoryTitle: !1,
                  level: 0,
                  pageNum: h,
                  paragraph_id: "",
                  part_no: 0,
                  readable: !0,
                  sequence: 0,
                  title: "版权信息"
              }),
              this.gift && s.unshift({
                  isGiftPage: !0,
                  isStoryTitle: !1,
                  level: 0,
                  pageNum: 1,
                  paragraph_id: "",
                  part_no: 0,
                  readable: !0,
                  sequence: 0,
                  title: "赠言"
              }),
              s
          },
          getPartPidsArray: t.memoize(function() {
              var e = this.posts
                , i = []
                , n = [];
              return t.each(e, function(e) {
                  n = t.chain(e.contents).flatten(!0).map(function(t) {
                      return t.id
                  }).value(),
                  i.push(n)
              }),
              i
          }),
          addPageTocRef: function() {
              var e, i, n, o, r, a = this.contents, s = this, l = this.getTocPageNumbers();
              t.each(l, function(h, c) {
                  o = a[c],
                  i = o.title,
                  e = l[c + 1] || 1 / 0,
                  n = [h - 1, e - 1],
                  r = s.getPages.apply(s, n),
                  t.each(r, function(t) {
                      t.title = i,
                      t.tocItem = o
                  })
              })
          },
          _tocPageNumbers: null,
          getTocPageNumbers: function() {
              return this._tocPageNumbers || (this._tocPageNumbers = t.chain(this.contents).map(function(t) {
                  return t.pageNum
              }).filter(function(t) {
                  return 0 === t || !!t
              }).value()),
              this._tocPageNumbers
          },
          getTocFromPara: function(t) {
              for (var e, i = this.parasIndexs.indexOf(t), n = this.contents, o = this.gift ? 2 : 1, r = n.length; o < r && !(n[o].sequence > i); o++)
                  e = n[o];
              return e
          },
          getPageOffset: function(t) {
              return this.pageOffsetPxMap[t - 1]
          },
          getPageByOffset: function(e) {
              var i = t.sortedIndex(this.pageOffsetPxMap, e) - 1;
              return i = Math.max(0, i),
              this.body[i]
          }
      }),
      i
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n;
  void 0 === (n = function() {
      return function() {
          try {
              return new ActiveXObject("MathPlayer.Factory.1"),
              !0
          } catch (t) {
              return !1
          }
      }
  }
  .call(e, i, e, t)) || (t.exports = n)
}
, function(t, e, i) {
  (function(n) {
      var o, r;
      o = [i(2), i(8), i(119), i(161)],
      void 0 === (r = function(t, e, o, r) {
          var a, s = [], l = 0, h = 0, c = Ark.features["reader/katex"];
          function d() {
              try {
                  ga("send", {
                      hitType: "event",
                      eventCategory: "reader",
                      eventAction: "latex",
                      eventValue: h,
                      eventLabel: c ? "katex" : "mathjax"
                  }),
                  l && ga("send", {
                      hitType: "event",
                      eventCategory: "reader",
                      eventAction: "latexFailed",
                      eventValue: l,
                      eventLabel: c ? "katex" : "mathjax"
                  })
              } catch (t) {}
              if (Ark.showTexError && (window.console && window.console.info && (window.console.info("Total: ", h, ", Failed: ", l),
              window.console.info("Duration:", Date.now() - a)),
              s.length)) {
                  var t = "<p>" + s.join("</p><p>") + "</p>";
                  e({
                      title: "[仅编辑可见] 公式处理出错 (" + l + ")",
                      content: t
                  }).open()
              }
          }
          return function(e, p) {
              a = Date.now(),
              c ? i.e(11).then(function() {
                  var t = [i(388)];
                  (function(t) {
                      var i;
                      e.find(".mathjax-container").each(function(e, n) {
                          i = n.textContent;
                          try {
                              t.render(i, n, {
                                  strict: !1
                              })
                          } catch (t) {
                              o(t.toString()),
                              s.push(t.toString()),
                              l += 1
                          }
                          n.innerHTML = '<script type="math/tex">' + i + "<\/script>" + n.innerHTML,
                          h += 1
                      }),
                      d(),
                      p()
                  }
                  ).apply(null, t)
              }).catch(i.oe) : r(Ark.MathJaxLibUrl, function() {
                  n(".loading-hint").remove();
                  var i = window.MathJax.Hub;
                  h = n(".mathjax-container").length,
                  t.history.bind("all", function(t, e, i) {
                      n("#MathJax_Message").is(":visible") && "home" === i && (location.href = "/reader/")
                  }),
                  i.Register.MessageHook("TeX Jax - parse error", function(t) {
                      l += 1,
                      s.push(t.slice(0, -2)),
                      o(t)
                  }),
                  i.Register.MessageHook("Math Processing Error", function(t) {
                      l += 1,
                      s.push(t.slice(0, -2)),
                      o(t)
                  }),
                  i.Queue(["Typeset", i, e[0]], [d], [p])
              })
          }
      }
      .apply(e, o)) || (t.exports = r)
  }
  ).call(this, i(0))
}
, function(t, e, i) {
  var n;
  void 0 === (n = function() {
      return function(t, e, i) {
          if (!t) {
              if (!i)
                  throw new Error(e);
              window.console && window.console.error && window.console.error(e)
          }
      }
  }
  .apply(e, [])) || (t.exports = n)
}
, function(t, e, i) {
  var n, o;
  n = [i(4)],
  void 0 === (o = function(t) {
      return function(e, i) {
          var n = [i.purchaseTime, 0 | i.isSample, 0 | i.isGift].join(":");
          return t.post("/j/article_v2/need_update", {
              aid: e,
              lasttime: n
          })
      }
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(1)],
  void 0 === (o = function(t) {
      function e() {
          this.bindUnload(),
          this.confirms = {}
      }
      return t.extend(e.prototype, {
          bindUnload: function() {
              window.onbeforeunload = t.bind(function() {
                  if (!t.isEmpty(this.confirms))
                      return t.map(this.confirms, function(t) {
                          return t
                      }).join("\n")
              }, this)
          },
          addConfirm: function(t, e) {
              this.confirms[t] = e
          },
          removeConfirm: function(t) {
              delete this.confirms[t]
          },
          unbind: function() {
              window.onbeforeunload = null
          }
      }),
      e
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(1), i(12), i(306)],
  void 0 === (o = function(t, e, i, n) {
      return function(o, r, a, s) {
          var l, h, c;
          a.get("isChapter") ? (l = "{{= title}} - {{= author}}",
          c = "reader/".concat(s.router.getBookUrl({
              ignoreSearch: !0
          }))) : (l = '{{= title}} - {{= author}} 著 {{= translator && translator + " 译"}} {{= publisher}}',
          c = s.router.getBookUrl({
              ignoreSearch: !0
          })),
          h = e.template(l, o.metaData),
          h = t.trim(h),
          i.isInApp() || (h += " | 豆瓣阅读"),
          document.title = h;
          var d = o.metaData.title;
          n.setCommonMeta({
              title: h,
              desc: o.abstract,
              imageUrl: r.get("cover_url"),
              url: "".concat(location.protocol, "//").concat(location.host, "/").concat(c),
              comment: "#".concat(d, "# ")
          })
      }
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  (function(n) {
      var o;
      void 0 === (o = function() {
          var t = -1 !== navigator.userAgent.indexOf("MicroMessenger")
            , e = n(document.head);
          function i(t, i) {
              var o = (arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}).override;
              if (i || void 0 === o || o) {
                  var r = n('meta[property="' + t + '"],meta[name="' + t + '"]');
                  r.length || (r = n('<meta name="' + t + '">'),
                  e.append(r)),
                  r.prop("content", i || "")
              }
          }
          function o() {
              var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                , e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              i("weixin:title", t.title, e),
              i("weixin:description", t.desc, e),
              i("weixin:image", t.imageUrl, e),
              i("share:url", t.url, e)
          }
          function r() {
              var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
                , e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
              i("description", t.desc, e),
              i("twitter:title", t.title, e),
              i("twitter:description", t.desc, e),
              i("twitter:image", t.doubanImageUrl || t.imageUrl, e),
              i("twitter:url", t.url, e),
              i("og:title", t.title, e),
              i("og:description", t.desc, e),
              i("og:image", t.doubanImageUrl || t.imageUrl, e),
              i("og:url", t.url, e),
              i("share:comment", t.comment, e)
          }
          return {
              setCommonMeta: function(e, i) {
                  t && o(e, i),
                  r(e, i)
              },
              setWeixinMeta: o,
              setWebMeta: r,
              setMeta: i
          }
      }
      .call(e, i, e, t)) || (t.exports = o)
  }
  ).call(this, i(0))
}
, function(t, e, i) {
  var n, o;
  n = [i(1), i(0), i(21), i(9), i(308), i(309)],
  void 0 === (o = function(t, e, i, n, o, r) {
      var a = Math.max(window.innerWidth, document.body.clientWidth)
        , s = []
        , l = {}
        , h = t.memoize(function(t) {
          var e = l[t]
            , i = s.indexOf(t)
            , n = 0 === i
            , o = i === s.length - 1
            , r = e.data.size.orig
            , h = r.width / r.height
            , c = a - 30
            , d = Math.min(c, r.width)
            , p = d / h
            , u = "";
          if (e.data.legend) {
              var g = e.data.legend.map(function(t) {
                  return t.data.text
              }).join("</p><p>");
              g.length && (u = "<p>".concat(g, "</p>"))
          }
          return {
              src: r.src,
              legend: u,
              imageWidth: d,
              imageHeight: p,
              canSwitch: !0,
              prevDisabled: n,
              nextDisabled: o
          }
      })
        , c = e("#tmpl-illus").html();
      return {
          loadFigures: function(i, a, h) {
              var c = i.find(".illus img");
              t.each(c, function(t) {
                  var i = e(t)
                    , s = i.closest(".illus")
                    , l = s[0].className
                    , h = s.find(".legend");
                  if (/M_L|M_R/g.test(l) && !n.fitForMobile()) {
                      var c = i.height() - 18;
                      h.css({
                          width: a - i.parent().outerWidth() - 15,
                          "max-height": c
                      })
                  }
                  o.multiEllipsis(h),
                  r(i)
              }),
              s = [],
              l = {},
              h.forEach(function(t) {
                  t.contents.forEach(function(t) {
                      "illus" === t.type && (l[t.id] = t,
                      s.push(t.id))
                  })
              })
          },
          expandIllus: function(n) {
              var o = n.data("pid").toString()
                , r = h(o)
                , a = t.template(c, r)
                , l = i({
                  body: a,
                  closable: !0
              }).open();
              e(".full-legend").css({
                  width: r.imageWidth + "px"
              }),
              l.illusPID = o,
              l.el.on("click", ".btn", function(i) {
                  var n = e(i.currentTarget).hasClass("prev");
                  !function(e, i) {
                      var n = e.illusPID
                        , o = s.indexOf(n);
                      if (-1 !== o) {
                          var r = o + (i ? -1 : 1);
                          if (!(r < 0 || r >= s.length)) {
                              var a = s[r]
                                , l = h(a)
                                , d = t.template(c, l);
                              e.setBody(d),
                              e.illusPID = a
                          }
                      }
                  }(l, n)
              }).on("click", ".btn-close", function() {
                  return l.close()
              })
          },
          expandCaption: function(n) {
              var o = n.find(".legend").find(".text-content").html()
                , r = {
                  src: "",
                  legend: o ? "<p>".concat(o, "</p>") : "",
                  imageWidth: 0,
                  imageHeight: 0,
                  canSwitch: !1
              }
                , a = t.template(c, r);
              i({
                  body: a,
                  closeable: !0
              }).open(),
              e(".full-legend").css({
                  width: 400
              }),
              e(".orig-illus img").remove()
          }
      }
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(0)],
  void 0 === (o = function(t) {
      return {
          multiEllipsis: function(t) {
              var e = t.find(".ellipsis-main").height()
                , i = parseInt(t.css("max-height"), 10);
              e >= i ? t.find(".ellipsis-prop").height(i) : t.find(".ellipsis-end").hide()
          }
      }
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  (function(e) {
      var n = i(1);
      function o(t) {
          var i = e.Deferred()
            , n = new Image;
          return e(n).one("load", i.resolve).one("error", i.reject),
          n.src = t,
          i.promise()
      }
      var r = [];
      t.exports = function(t) {
          var i = t.data("src")
            , a = t.data("has-micro") ? "micro" : "tiny"
            , s = i.replace(/(common-)\w+/, "$1" + a)
            , l = i.replace(/.+common-(\w+)\/\w+\/(\d+).+/g, "$1$2");
          -1 !== n.indexOf(r, l) ? t.attr("src", i).addClass("loaded") : function t() {
              for (var i = arguments.length, n = new Array(i), a = 0; a < i; a++)
                  n[a] = arguments[a];
              var s = n[0]
                , l = n[1]
                , h = n[2]
                , c = n[3]
                , d = s.clone().addClass("thumbnail");
              d.attr("src", l),
              s.before(d),
              o(l).then(function() {
                  return o(h)
              }, function() {
                  d.remove()
              }).then(function() {
                  s.attr("src", h).addClass("loaded"),
                  r.push(c),
                  d.fadeTo(300, 0, function() {
                      return d.remove()
                  })
              }, function() {
                  s.closest(".illus-outer").addClass("loading-error").one("click", function(i) {
                      i.stopPropagation(),
                      e(this).removeClass("loading-error"),
                      t.apply(null, n)
                  })
              })
          }(t, s, i, l)
      }
  }
  ).call(this, i(0))
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(2), i(1), i(6), i(105), i(9)],
  void 0 === (o = function(t, e, i, n, o, r) {
      var a = t(window)
        , s = 100
        , l = .6
        , h = 800;
      return e.View.extend({
          initialize: function() {
              i.bindAll(this, "pageJump", "verticalScroll", "changeLayout", "processScrollingEvent"),
              this.app = n,
              this.canvas = t(window),
              this.scrollBody = t("html, body"),
              this.config = n.getModel("config"),
              this.vent = this.app.vent,
              this.vent.on("change:layout", this.changeLayout)
          },
          render: function(t) {
              this.articleElement = t,
              this.pageOffset = this.config.get("pageOffset"),
              this.changeLayout(this.config.get("layout"))
          },
          changeLayout: function(t) {
              this.clearScrollPage(),
              this.processScrollingEvent(t)
          },
          processScrollingEvent: function(t) {
              "vertical" === t ? function(t, e) {
                  var n, r, a, c, d = i.throttle(e, h, {
                      leading: !0
                  }), p = i.debounce(e, o.reading.VERTICAL_SCROLLING_DEBOUNCE_LATER);
                  t.on("scroll.slowScroll", i.throttle(function() {
                      c = t.scrollTop(),
                      r = +new Date,
                      !n || !a || Math.abs(a - c) / (r - n) < l ? d() : p(),
                      a = c,
                      n = r
                  }, s))
              }(this.canvas, this.verticalScroll) : this.canvas.off("scroll.slowScroll")
          },
          getArticleInnerSink: i.memoize(function() {
              return parseInt(this.app.articleInner.css("paddingTop"), 10) + this.app.articleInner.offset().top
          }),
          verticalScroll: function() {
              var t = this.app.getModel("turning");
              if (!t.isDisabled()) {
                  var e = this.app.getModel("content")
                    , i = this.getArticleInnerSink()
                    , n = this.canvas.scrollTop() - i - 1 + a.height() / 2
                    , o = e.getPageByOffset(n).pagination;
                  t.setCurrPage(o, {
                      preventPageJump: !0
                  }),
                  this.isScrollPageChanged(o) && this.vent.trigger("render:pages", "vertical").trigger("render:bookmark")
              }
          },
          isScrollPageChanged: function(t) {
              return !(this.scrollPage && this.scrollPage === t || (this.scrollPage = t,
              0))
          },
          clearScrollPage: function() {
              delete this.scrollPage
          },
          pageJump: function(t, e, i) {
              if (!(!e || i && i.preventPageJump)) {
                  var n = this.config.get("layout");
                  r.fitForMobile() && this.vent.trigger("freeze:canvas"),
                  "horizontal" === n ? this.horizontalJump(e, i) : this.verticalJump(e)
              }
          },
          verticalJump: function(e) {
              var i = this.canvas.scrollTop()
                , o = n.getModel("turning").previous("currPage") || 0
                , r = Math.abs(e - o)
                , a = n.getModel("content")
                , s = this.getArticleInnerSink() - (this.config.get("usingLiteStyle") ? 0 : 50)
                , l = a.getPageOffset(e) + (1 === e ? 0 : s);
              i === l ? (this.verticalScroll(),
              this.vent.trigger("unfreeze:canvas")) : this.scrollBody.animate({
                  scrollTop: l + "px"
              }, 1 === r ? 400 : 0, t.proxy(function() {
                  this.vent.trigger("unfreeze:canvas")
              }, this))
          },
          horizontalJump: function(t, e) {
              var o = n.getModel("turning").previous("currPage") || 0
                , a = t > o ? 1 : 0
                , s = this.config.get("pageWidth")
                , l = Math.abs(t - o)
                , h = a ? {
                  right: "auto",
                  left: 0
              } : {
                  right: (t > 1 ? 0 : -s) - this.pageOffset + "px",
                  left: "auto"
              }
                , c = "-=" + s + "px"
                , d = {}
                , p = r.hasTouch() && !e.fromMobileTap ? 300 : 1;
              if (this.articleElement.css(h),
              this.vent.trigger("render:pages", "horizontal"),
              l > 1 || 0 === l || !o)
                  return this.articleElement.css({
                      left: 1 === t ? 0 : -s + "px",
                      right: "auto"
                  }),
                  void this.vent.trigger("unfreeze:canvas render:bookmark").trigger("scroll:page", 1);
              d[a ? "left" : "right"] = c,
              this.articleElement.animate(d, p, i.bind(function() {
                  this.vent.trigger("scroll:page", 1),
                  this.vent.trigger("unfreeze:canvas render:bookmark")
              }, this))
          }
      })
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(2), i(1), i(3), i(6), i(4), i(112), i(10), i(34), i(173), i(137)],
  void 0 === (o = function(t, e, i, n, o, r, a, s, l, h, c) {
      return e.View.extend({
          initialize: function() {
              i.bindAll(this, "loadProgressThenJump", "saveReadingProgress", "saveProgressLocally"),
              this.config = o.getModel("config"),
              o.vent.on("change:layout window:resized", this.saveProgressLocally)
          },
          tryToGetStamp: function(t) {
              var e = l.getActionOnce("stamp")
                , i = t.stamp;
              return !i && e && (i = new a(e)),
              i
          },
          gotoStamp: function(t) {
              if (!t)
                  return this.gotoProgressPage(1);
              this.config.set("ignoreSaveProgress", t.ignoreSaveProgress());
              var e = c.getByStamp(t).pagination || 1
                , n = o.getModel("article").markings
                , r = t.getAnnotationJson();
              this.gotoProgressPage(e),
              t.hasAnnotation() && n && n.add(r, {
                  parse: !0,
                  fakeSync: !i.contains(r.tags, "mine"),
                  dontFilterOut: !0
              })
          },
          fetchProgress: function(t) {
              return r({
                  url: "/j/progress/",
                  data: {
                      works_id: t
                  }
              })
          },
          preloadProgress: function(t) {
              if (!n.me.isAnonymous && !this.config.get("tmpProgress"))
                  return this.progressPromise = this.fetchProgress(t),
                  this.progressPromise
          },
          getProgress: function(t) {
              return this.progressPromise ? this.progressPromise : this.fetchProgress(t)
          },
          gotoProgressPage: function(t) {
              i.isNumber(t) ? o.getModel("turning").setCurrPage(t) : this.gotoPageByName(t),
              this.trigger("progress:confirmed")
          },
          gotoPageByProgress: function(t) {
              var e = new a({
                  pid: t.paragraph_id,
                  offset: t.paragraph_offset
              });
              this.gotoStamp(e)
          },
          gotoPageByName: function(t) {
              var e = o.getModel("turning");
              switch (t) {
              case "first":
                  e.turnFirstPage();
                  break;
              case "last":
                  e.turnLastPage();
                  break;
              default:
                  e.turnFirstPage()
              }
          },
          loadProgressThenJump: function() {
              var t = o.getModel("article")
                , e = o.getModel("content")
                , r = t.get("id")
                , a = this.tryToGetStamp(e)
                , l = e.gift && !e.gift.opened;
              if (a)
                  this.gotoStamp(a);
              else if (this.config.get("jumpFirstPage"))
                  this.config.unset("jumpFirstPage"),
                  o.vent.trigger("chapterTurn:adjacent", {
                      direction: "next"
                  }),
                  this.gotoProgressPage(1);
              else if (this.config.get("jumpLastPage"))
                  this.config.unset("jumpLastPage"),
                  o.vent.trigger("chapterTurn:adjacent", {
                      direction: "prev"
                  }),
                  this.gotoProgressPage("last");
              else if (this.config.get("tmpProgress")) {
                  var h = this.config.get("tmpProgress");
                  if (this.config.unset("tmpProgress"),
                  h.works_id !== r)
                      return;
                  this.gotoPageByProgress(h)
              } else if (n.me.isAnonymous) {
                  var c = s.getStorageObject(this.getAnonymousProgressKey(r));
                  c ? this.gotoPageByProgress(c) : this.gotoProgressPage(1)
              } else
                  l ? this.gotoProgressPage(1) : this.getProgress(r).done(i.bind(function(t) {
                      if (t.r)
                          return this.gotoProgressPage(1);
                      var e = t.progress;
                      if (!e)
                          return this.gotoProgressPage(1);
                      this.gotoPageByProgress(e)
                  }, this)).fail(i.bind(function() {
                      this.gotoProgressPage(1)
                  }, this))
          },
          saveReadingProgress: i.debounce(function() {
              var t = o.getModel("turning");
              if (!t.isDisabled()) {
                  var e = t.get("currPage")
                    , i = o.getModel("article")
                    , a = o.getModel("config")
                    , l = a.get("isChapter") && i.get("isSample");
                  if (e && !t.currIsGiftPage() && !l && !a.get("ignoreSaveProgress")) {
                      var c, d = i.id;
                      try {
                          c = h(e)
                      } catch (t) {
                          if ("NoParagraph" === t.message)
                              return;
                          throw t
                      }
                      if (n.me.isAnonymous)
                          return this.freeUpStorageSpace(),
                          void s.setStorageObject(this.getAnonymousProgressKey(d), c);
                      c.works_id = d,
                      r.post("/j/progress/", c)
                  }
              }
          }, 800),
          getAnonymousProgressKey: function(t) {
              return t + ":anonymousProgress"
          },
          freeUpStorageSpace: function() {
              var t = s.keys()
                , e = /^\d+:anonymousProgress$/;
              for (t = i.filter(t, function(t) {
                  return e.test(t)
              }); t.length >= 5; ) {
                  var n = t.pop();
                  s.remove(n)
              }
          },
          saveProgressLocally: function() {
              var t, e = o.getModel("turning").get("currPage"), i = o.getModel("article").get("id");
              try {
                  t = h(e)
              } catch (t) {
                  if ("NoParagraph" === t.message)
                      return;
                  throw t
              }
              t.works_id = i,
              o.getModel("config").set("tmpProgress", t)
          }
      })
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(2), i(1), i(6), i(9), i(31), i(179), i(180), i(313)],
  void 0 === (o = function(t, e, i, n, o, r, a, s, l) {
      return e.View.extend({
          el: ".pagination",
          template: t("#tmpl-pagination").html(),
          initialize: function(t) {
              i.bindAll(this, "initPagination", "updateProgressBar"),
              this.turningModel = n.getModel("turning"),
              this.app = n,
              this.config = t,
              this.vent = this.app.vent,
              this.vent.on({
                  "paging:finish": this.initPagination
              }),
              this.$el.html(i.template(this.template)),
              this.pageForm = this.$(".page-form"),
              this.pagePrev = this.$(".page-prev"),
              this.pageNext = this.$(".page-next"),
              this.emUnitBenchmark = 16,
              this.isShown = !!this.$el.is(":visible"),
              this.progressBar = new a({
                  model: this.turningModel
              }),
              this.pagePortal = new s({
                  model: this.turningModel
              }),
              t.get("isChapter") || (this.vent.on("turningNext:lastPage", function() {
                  r.toast("没有下一页了")
              }),
              this.vent.on("turningPrev:firstPage", function() {
                  r.toast("没有上一页了")
              }))
          },
          render: function() {
              o.fitForMobile() || this.progressBar.render(),
              this.trigger("view:render")
          },
          events: {
              "click .page-prev, .page-next": "pageTurningFromClick",
              "humanClick .page-prev, .page-next": "humanClickTurning"
          },
          togglePagingBtns: function(t) {
              this.$el.find(".page-prev, .page-next").toggle("horizontal" === t)
          },
          initPagination: function() {
              this.$el.append(this.pagePortal.render().$el),
              this.pagePortal.update(),
              o.fitForMobile() || this.renderPageSubsequent()
          },
          renderPageSubsequent: function() {
              this.pageSubsequent && this.pageSubsequent.remove(),
              this.pageSubsequent = new l({
                  turningModel: this.turningModel,
                  contentModel: n.getModel("content")
              }),
              this.$el.append(this.pageSubsequent.render().$el)
          },
          updateProgressBar: function() {
              this.progressBar.update()
          },
          removeProgressBar: function() {
              this.progressBar.remove()
          },
          pageTurningFromClick: function(e) {
              var i = t(e.target).hasClass("page-prev") ? 1 : 0;
              this.pageTurning(i)
          },
          pageTurning: i.debounce(function(t, e) {
              this.vent.trigger("goto:stamp");
              var n = this.turningModel
                , o = n.get("currPage")
                , r = o === n.get("totalPage") ? 1 : 0
                , a = 1 === o ? 1 : 0
                , s = this.config.get("layout");
              if (t && a)
                  this.vent.trigger("turningPrev:firstPage");
              else if (t || !r) {
                  "horizontal" === s && n.setCurrPage((t ? -1 : 1) + o, e);
                  var l = this.$(".page-" + (t ? "prev" : "next"));
                  l.addClass("on"),
                  this.vent.once("unfreeze:canvas", i.bind(function() {
                      l.removeClass("on")
                  }, this))
              } else
                  this.vent.trigger("turningNext:lastPage")
          }, 150, !0),
          humanClickTurning: function(e) {
              t(e.target).trigger("mousedown").trigger("click").trigger("mouseup")
          },
          hide: function() {
              if (!this.isShown)
                  return this;
              this.isShown = !1,
              this.$el.hide()
          },
          toggle: function() {
              return this.$el[this.isShown ? "hide" : "show"](),
              this.isShown = !this.isShown,
              this
          }
      })
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(1), i(2)],
  void 0 === (o = function(t, e, i) {
      return i.View.extend({
          className: "page-subsequent",
          tmpl: t("#tmpl-page-subsequent").html(),
          initialize: function(t) {
              e.bindAll(this, "update"),
              this.turningModel = t.turningModel,
              this.contentModel = t.contentModel,
              this.lastPageNums = this.getLastPages(),
              this.listenTo(this.turningModel, "change:currPage", this.update)
          },
          getLastPages: function() {
              var t = e.clone(this.contentModel.getTocPageNumbers());
              return t.shift(),
              (t = e.map(t, function(t) {
                  return t - 1
              })).push(this.turningModel.get("totalPage")),
              t
          },
          render: function() {
              return this.$el.html(this.tmpl),
              this.update(),
              this
          },
          update: function() {
              var t = this.$(".subsequent-num")
                , i = this.turningModel.get("currPage");
              if (t.length && i) {
                  var n = e.sortedIndex(this.lastPageNums, i)
                    , o = this.lastPageNums[n] - i;
                  t.text(o),
                  this.$el.addClass("active").toggleClass("is-last-page", 0 === o)
              }
          }
      })
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(2), i(1), i(0), i(3), i(22), i(181), i(9), i(6), i(20), i(315), i(316), i(318), i(323), i(324), i(184), i(185)],
  void 0 === (o = function(t, e, i, n, o, r, a, s, l, h, c, d, p, u, g, f) {
      var m = a.fitForMobile()
        , v = t.View.extend({
          el: ".controls-panel",
          template: i(m ? "#tmpl-mobile-controls-panel" : "#tmpl-controls-panel").html(),
          initialize: function(t) {
              e.bindAll(this, "closeTips", "closePopups", "resetHeight", "resizePanel", "togglePanel", "initControls", "panelShown", "panelHidden", "closeShortcutTips", "openShortcutTips"),
              this.app = s,
              this.config = t,
              this.vent = this.app.vent,
              this.win = i(window),
              this.body = i("body"),
              this.vent.on({
                  "close:popups": this.closePopups,
                  "close:helperGuide": this.closeShortcutTips,
                  "open:helperGuide": this.openShortcutTips
              }),
              this.$el.html(e.template(this.template, {
                  isGallery: this.config.get("isGallery")
              })).append(i("#tmpl-shortcut-tips").html()),
              this.panelsContainerView = new h({
                  controls: this
              }),
              this.panelsContainer = this.panelsContainerView.$el,
              this.controlsContent = this.panelsContainer.find(".controls-content"),
              this.controlsContent.on("action:toggle", this.togglePanel),
              this.controlsContent.on("action:expand", this.panelShown),
              this.controlsContent.on("action:collapse", this.panelHidden),
              this.shortcutTips = this.$(".shortcut-tips"),
              this.config.on("goto:stamp", function() {
                  this.closePopups()
              }, this)
          },
          render: function() {
              return this.renderSwichers(),
              this.resetPanelAsResize(),
              this.switcher.disableHandlers(),
              this.initControls(),
              this
          },
          events: {
              "click .controls-list li": "deselectAll",
              "click .close-tips": "closeTips"
          },
          renderSwichers: function() {
              if (!this.switcher) {
                  var t = this.$(".toggle-toc")
                    , e = []
                    , i = [];
                  if (this.tocView = new p({
                      el: this.$(".toc"),
                      app: this.app,
                      turningModel: s.getModel("turning"),
                      controls: this
                  }),
                  this.tocSwitcher = t,
                  this.toc = this.tocView.$el,
                  this.toc.on("action:expand", function() {
                      l._trackEvent("openToc")
                  }),
                  e.push(this.tocSwitcher),
                  i.push(this.toc),
                  this.config.get("isChapter")) {
                      var n = this.$(".toggle-chapters-toc");
                      this.chaptersTocView = new u({
                          el: this.$(".chapters-toc"),
                          app: this.app,
                          controls: this
                      }),
                      this.chaptersTocSwitcher = n,
                      this.chaptersToc = this.chaptersTocView.$el,
                      this.chaptersToc.on("action:expand", function() {
                          l._trackEvent("openChaptersToc")
                      }),
                      e.push(this.chaptersTocSwitcher),
                      i.push(this.chaptersToc)
                  }
                  this.bookmarksView = new c({
                      el: this.$(".bookmarks"),
                      app: this.app,
                      config: this.config
                  }),
                  this.bookmarks = this.bookmarksView.$el,
                  this.bookmarksSwitcher = this.$(".toggle-bookmarks"),
                  e.push(this.bookmarksSwitcher),
                  i.push(this.bookmarks),
                  this.annotationsView = new d({
                      el: this.$(".annotations"),
                      app: this.app,
                      config: this.config
                  }),
                  this.annotations = this.annotationsView.$el,
                  this.annotationsSwitcher = this.$(".toggle-annotations"),
                  e.push(this.annotationsSwitcher),
                  i.push(this.annotations),
                  this.switcher = new r(e,i,{
                      allowDisabled: !0
                  })
              }
          },
          openChapterList: function() {
              this.chaptersTocSwitcher && this.chaptersTocSwitcher.click()
          },
          deselectAll: function(t) {
              this.closeTips();
              var e = i(t.currentTarget);
              e.is(".controls-item") || this.switcher.hideAll(),
              this.$el.find(".on").not(e).removeClass("on"),
              e.hasClass("disabled")
          },
          closeTips: function() {
              s.vent.trigger("close:helperGuide")
          },
          closePopups: function() {
              this.switcher.hideAll(),
              this.panelsContainer.hide(),
              this.closeTips(),
              this.$el.find(".on").removeClass("on")
          },
          togglePanel: function(t, e, i) {
              this.resizePanel(),
              this.dealingWithScrollbar(i),
              this.panelsContainer.toggle(),
              e.trigger("collapse:" + i + "ed")
          },
          panelShown: function() {
              s.vent.trigger("freeze:control")
          },
          panelHidden: function() {
              s.vent.trigger("unfreeze:control")
          },
          initToc: function() {
              this.listenTo(this.tocView, "list:render", function() {
                  this.tocSwitcher.removeClass("disabled"),
                  this.trigger("list:render")
              }, this)
          },
          initChaptersToc: function() {
              this.chaptersTocView && (this.chaptersTocView.render(),
              this.chaptersTocSwitcher.removeClass("disabled"),
              this.trigger("list:render"))
          },
          initBookmarks: function() {
              this.bookmarksSwitcher.removeClass("disabled")
          },
          initAnnotations: function() {
              this.annotationsSwitcher.removeClass("disabled")
          },
          initControls: function() {
              this.initToc(),
              this.initChaptersToc(),
              this.initBookmarks(),
              this.initAnnotations()
          }
      })
        , y = n.me.isAnonymous ? {
          initBookmarks: i.noop,
          initAnnotations: i.noop
      } : {};
      return e.extend(v.prototype, g, f, y),
      v
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  (function(n) {
      var o, r;
      o = [i(2), i(1)],
      void 0 === (r = function(t, e) {
          return t.View.extend({
              el: ".panels-container",
              template: n("#tmpl-panels-container").html(),
              initialize: function(t) {
                  this.controls = t.controls,
                  this.$el.html(e.template(this.template))
              },
              render: function() {
                  return this
              },
              events: {
                  "click .close": "close"
              },
              close: function() {
                  this.controls.closePopups()
              }
          })
      }
      .apply(e, o)) || (t.exports = r)
  }
  ).call(this, i(0))
}
, function(t, e, i) {
  var n, o;
  n = [i(2), i(1), i(0), i(138), i(317)],
  void 0 === (o = function(t, e, i, n, o) {
      return t.View.extend({
          template: i("#tmpl-bookmarks-panel").html(),
          initialize: function(t) {
              e.bindAll(this, "renderList", "removeBookmarkInList"),
              this.app = t.app,
              this.vent = this.app.vent,
              this.config = t.config,
              this.vent.on({
                  "remove:bookmark": this.removeBookmarkInList
              }),
              this.$el.html(e.template(this.template)),
              this.panelBody = this.$el.find(".panel-bd"),
              this.tmplChapter = e.template('<li class="chapter">{{= headline }}</li>'),
              this.renderTip("empty")
          },
          events: {
              "action:expand": "render",
              "action:collapse": "renderTip"
          },
          removeBookmarkInList: function(t) {
              (this.collection || this.bookmarks).remove(t)
          },
          render: function() {
              var t = this.app
                , o = t.getModel("article");
              this.renderTip("loading"),
              this.contentModel = t.getModel("content"),
              this.toc = this.contentModel.contents,
              this.list = i("<ul>", {
                  class: "bookmark-list"
              }),
              navigator.onLine ? (this.collection = new n([],{
                  articleId: o.id,
                  contentModel: this.contentModel
              }),
              this.listenTo(this.collection, "reset add remove", e.bind(function() {
                  o.bookmarks = this.collection
              }, this)),
              this.collection.fetch({
                  success: this.renderList
              })) : (this.bookmarks = o.bookmarks,
              this.renderList(this.bookmarks))
          },
          renderTip: function(t) {
              return this.panelBody.html(i("<p>", {
                  class: "panel-tip",
                  text: {
                      empty: "你还没有添加书签哦!",
                      loading: "加载中, 请稍候..."
                  }[t]
              })),
              this
          },
          renderList: function(t) {
              if (!t.length)
                  return this.renderTip("empty");
              var i = t || this.bookmarks
                , n = e.pluck(this.toc, "sequence")
                , r = this.contentModel.parasIndexs;
              this.list.empty(),
              e.each(i.models, function(t) {
                  var i = e.indexOf(r, t.get("paragraph_id"));
                  if (-1 !== i) {
                      var a = e.sortedIndex(n, i + 1) - 1;
                      a !== this.lastHeadlineSequence && (this.list.append(this.tmplChapter({
                          headline: this.toc[a].title
                      })),
                      this.lastHeadlineSequence = a),
                      this.list.append(new o({
                          model: t,
                          config: this.config
                      }).render().el)
                  }
              }, this),
              this.panelBody.html(this.list),
              this.lastPartSequence = void 0,
              this.lastHeadlineSequence = void 0
          }
      })
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(2), i(1), i(0), i(6), i(8)],
  void 0 === (o = function(t, e, i, n, o) {
      return t.View.extend({
          tagName: "li",
          className: "bookmark-item",
          template: i("#tmpl-bookmarks-item").html(),
          initialize: function(t) {
              return e.bindAll(this, "gotoBookmarkPage", "removeBookmark"),
              this.vent = n.vent,
              this.config = t.config,
              this
          },
          render: function() {
              var t = this.model.toJSON();
              return t.percent = this.model.getPercent(),
              this.$el.html(e.template(this.template, t)),
              this
          },
          events: {
              "click .item-hd,.item-bd": "gotoBookmarkPage",
              "click .btn-remove-bookmark": "removeBookmark"
          },
          gotoBookmarkPage: function() {
              var t = this.model.getStamp()
                , e = t.sequence;
              t.pid || !e ? this.config.trigger("goto:stamp", t) : this.vent.trigger("goto:tocPage", e)
          },
          removeBookmark: function() {
              var t = this;
              o({
                  title: "删除书签",
                  content: "确定要删除该书签吗？",
                  type: "confirm"
              }).on("confirm", function() {
                  t.vent.trigger("remove:bookmark", t.model),
                  t.model.destroy(),
                  delete t.model,
                  t.$el.remove(),
                  this.close()
              }).open()
          }
      })
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(2), i(1), i(182), i(111), i(320), i(106), i(124), i(121), i(115), i(152), i(183), i(322)],
  void 0 === (o = function(t, e, i, n, o, r, a, s, l, h, c, d, p) {
      var u = {
          all: "暂时没有划线和批注<br>可以在阅读时选中文字后添加",
          mine: "暂时没有你自己的划线和批注<br>可以在阅读时选中文字后添加",
          favorite: "暂时没有被你赞过的他人批注<br>可以对你认为有趣的他人批注点赞，它们就会出现在这里"
      }
        , g = {
          percent: "按原文顺序",
          time: "按添加时间"
      }
        , f = e.View.extend({
          tmpl: t("#tmpl-annotations-panel").html(),
          initialize: function(e) {
              i.bindAll(this, "renderPage"),
              this.app = e.app,
              this.config = e.config,
              this.sortType = "time",
              this.filterType = "mine",
              this.list = t("<ul>", {
                  class: "annotations-list"
              }),
              this.pagingNav = t("<div>", {
                  class: "paging-nav"
              }),
              this.textBox = t("<div>", {
                  class: "text-box"
              }),
              this.shareTip = new l,
              this.$el.on("scroll", i.throttle(i.bind(this.scroll, this), 300))
          },
          events: {
              "action:expand": "render",
              "click .filter-tabs a": "filterItems",
              "click .sort-tabs a": "sortItems",
              "click .sort-switch .hd": "toggleSortTabs",
              "click .btn-export": "exportAll"
          },
          render: function() {
              var e = this.app.getModel("article");
              this.$el.empty(),
              this.$el.html(i.template(this.tmpl)),
              this.btnExport = this.$(".btn-export"),
              this.tabs = this.$(".annotation-tabs").hide(),
              this.panelBody = this.$(".panel-body"),
              this.panelBody.append(this.textBox).append(this.list).append(this.pagingNav),
              this.toggleList(!1),
              this.sortTypeText = this.$(".sort-type"),
              this.sortTabs = this.$(".sort-tabs"),
              this.renderTabs(),
              this.renderTextBox("加载中…"),
              this.listPaging = new d({
                  limit: 10,
                  items: this.list.children("li"),
                  container: this.list,
                  navContainer: this.pagingNav
              }),
              this.listPaging.on("turnPage", this.renderPage);
              var o = this.annotations = new n(null,{
                  articleId: e.id
              });
              return o.on("remove", this.detectAnnotations, this),
              o.on("add", function(t) {
                  t.markingModel = this.getMarkingByInfo(t)
              }, this),
              o.fetch({
                  success: t.proxy(function() {
                      this.renderListBy(this.sortType, this.filterType),
                      this.$(".more-actions").show()
                  }, this),
                  error: t.proxy(function() {
                      this.renderTextBox("出错了")
                  }, this)
              }),
              this
          },
          scroll: function() {
              var t = this.shareTip;
              t.isVisible() && t.hide()
          },
          scrollToTop: function() {
              t(".panels-container").scrollTop(0)
          },
          detectAnnotations: function() {
              return this.annotations.length ? this.hasFilterResult(this.filterType) ? (this.tabs.toggle(!0),
              this.toggleList(!0),
              !0) : (this.tabs.toggle(!0),
              this.toggleList(!1),
              !1) : (this.tabs.toggle(!1),
              this.toggleList(!1, "all"),
              !1)
          },
          hasFilterResult: function(t) {
              return "all" === t ? !!this.annotations.length : this.annotations.some(function(e) {
                  return e.markingModel.hasTag(t)
              })
          },
          toggleList: function(t, e) {
              var i = !t;
              e = e || this.filterType,
              i && this.renderTextBox(u[e]),
              this.$el.toggleClass("show-text-box", i),
              this.btnExport.toggle("mine" === this.filterType && !i)
          },
          renderTextBox: function(t) {
              this.textBox.html(t)
          },
          toggleSortTabs: function(e) {
              var i = this.sortTabs
                , n = t(e.currentTarget);
              i.toggleClass("opened"),
              c(n, function() {
                  i.removeClass("opened")
              })
          },
          sortItems: function(e) {
              this.switchTag("sort", t(e.currentTarget))
          },
          filterItems: function(e) {
              this.switchTag("filter", t(e.currentTarget))
          },
          switchTag: function(t, e) {
              var i = t + "Type"
                , n = e.data(t + "-type");
              this[i] === n || this.tabs.hasClass("disabled") || (this[i] = n,
              this.renderTabs(),
              this.renderListBy(this.sortType, this.filterType))
          },
          renderTabs: function() {
              var t = this.tabs.find("a")
                , e = t.filter("a[data-sort-type=" + this.sortType + "]")
                , i = t.filter("a[data-filter-type=" + this.filterType + "]");
              this.sortTypeText.html(g[this.sortType]),
              t.toggleClass("actived", !1),
              e.addClass("actived"),
              i.addClass("actived")
          },
          renderListBy: function(t, e) {
              var i = this.getAnnotationInfosBy(t, e);
              this.listPaging.setItems(i).render(),
              this.detectAnnotations()
          },
          renderPage: function(t) {
              var e;
              this.removeAllSubView(),
              i.each(t, function(t) {
                  e = this.getAnnotationView(t),
                  this.addSubView(e),
                  this.list.append(e.render().el)
              }, this),
              this.scrollToTop()
          },
          sortIterator: {
              time: function(t) {
                  return -h(t.get("create_time"))
              },
              percent: function(t) {
                  return t.get("extra").percent
              }
          },
          filterIterator: {
              all: function() {
                  return !0
              },
              mine: function(t) {
                  return t.markingModel.isMine()
              },
              favorite: function(t) {
                  return t.markingModel.isFavorited()
              }
          },
          getAnnotationView: function(t) {
              return new r({
                  model: t.markingModel,
                  info: t,
                  config: this.config,
                  annotations: this.annotations,
                  shareTip: this.shareTip
              })
          },
          getAnnotationInfosBy: function(t, e) {
              var n = this.annotations;
              return i.clone(n.chain().filter(this.filterIterator[e]).sortBy(this.sortIterator[t]).value())
          },
          getMarkingByInfo: function(t) {
              var e, i = this.app.getModel("article"), n = this.app.getModel("content"), r = i.markings.get(t.id);
              return r || (e = t.omit("extra"),
              (r = new o(e,{
                  articleId: i.id,
                  paragraphsIndex: n.getParasIndexs()
              })).on("effectiveChange", function(t) {
                  t.save()
              })),
              r
          },
          exportAll: function() {
              p.openDialog({
                  app: this.app,
                  annotations: this.annotations
              })
          }
      });
      return i.extend(f.prototype, s, a),
      f
  }
  .apply(e, n)) || (t.exports = o)
}
, , function(t, e, i) {
  var n, o;
  n = [i(0), i(2), i(1), i(6), i(33), i(123), i(170), i(133), i(139), i(107)],
  void 0 === (o = function(t, e, i, n, o, r, a, s, l, h) {
      var c = e.View.extend({
          tagName: "li",
          className: "annotations-item",
          tmpl: t("#tmpl-annotations-panel-item").html(),
          commentTextTmpl: t("#tmpl-annotation-comment-text").html(),
          favoriteTextTmpl: t("#tmpl-annotation-favorite-text").html(),
          initialize: function(t) {
              this.info = t.info,
              this.config = t.config,
              this.shareTip = t.shareTip,
              this.annotations = t.annotations,
              this.listenTo(this.model, "destroy", this.destroy),
              this.listenTo(this.model, "change:n_favorites", this.updateFavorite),
              this.listenTo(this.model, "change:n_comments", this.updateComment),
              this.listenTo(this.model, "change:visible_private", this.updatePrivate),
              this.commentOpened = !1
          },
          events: {
              "click .delete-annotation": "deleteAnnotation",
              "click .modify-annotation": "editNote",
              "click .jump-annotation": "jumpAnnotation",
              "click .favorite-annotation": "favoriteAnnotation",
              "click .share-annotation": "shareAnnotation",
              "click .comment-annotation": "toggleCommentAnnotation"
          },
          render: function() {
              var t = this.model.toJSON()
                , e = t.owner.user_id;
              return this.$el.html(i.template(this.tmpl, i.extend(t, {
                  printTime: h,
                  isNote: this.model.isNote(),
                  isMine: this.model.isMine(),
                  isFavorited: this.model.isFavorited(),
                  isPrivate: this.model.isPrivate(),
                  actions: this.model.getActionsList(),
                  extra: this.info.get("extra"),
                  isArticleAuthor: e === n.getModel("article").get("authorId"),
                  autoLink: o
              }))),
              this.updateTagClass(),
              this.favoriteText = this.$(".favorite-annotation"),
              this.commentText = this.$(".comment-annotation"),
              this.privateTextWrapper = this.$(".private-info-wrapper"),
              this.shareWrapper = this.$(".share-wrapper"),
              this.updateFavorite(this.model),
              this.updateComment(this.model),
              this.updatePrivate(this.model),
              this
          },
          updateFavorite: function(t) {
              if (this.favoriteText.length) {
                  var e = t.toJSON();
                  e.isFavorited = t.isFavorited(),
                  this.favoriteText.html(i.template(this.favoriteTextTmpl, e))
              }
          },
          updatePrivate: function(t) {
              if (this.privateTextWrapper.length) {
                  var e = t.isPrivate();
                  this.privateTextWrapper[e ? "show" : "hide"](),
                  this.shareWrapper[e ? "hide" : "show"]()
              }
          },
          updateComment: function(t) {
              this.commentText.length && this.commentText.html(i.template(this.commentTextTmpl, t.toJSON()))
          },
          jumpAnnotation: function(t) {
              t.preventDefault();
              var e = this.model.getStamp();
              this.config.trigger("goto:stamp", e)
          },
          favoriteAnnotation: function(t) {
              t.preventDefault();
              var e = this.model
                , i = e.isFavorited();
              e.isFavoriting || e.editFavorite(!i)
          },
          shareAnnotation: function(e) {
              e.preventDefault();
              var n = t(e.currentTarget)
                , o = this.model;
              this.shareTip.set({
                  target: n
              }).show();
              var a, l = {
                  works_id: o.articleId
              };
              o.isNote() ? (a = "/j/share/rec_annotation",
              i.extend(l, {
                  annotation_id: o.get("id")
              })) : (a = "/j/share/rec_works_piece",
              i.extend(l, {
                  annotation: JSON.stringify(o.toJSON())
              })),
              r(this.shareTip, s, {
                  model: o,
                  url: a,
                  isNote: o.isNote(),
                  extraParam: l,
                  shareTypeLabel: "推荐"
              }, {
                  autoClose: !0
              })
          },
          toggleCommentAnnotation: function(e) {
              e.preventDefault();
              var i = t(e.currentTarget);
              this.commentsView || (this.commentsView = new a({
                  markingModel: this.model,
                  commentTargetInfo: {
                      article: {
                          authorId: n.getModel("article").get("authorId")
                      }
                  }
              }),
              this.$(".bd").append(this.commentsView.render().$el.hide())),
              this.commentOpened = !this.commentOpened,
              this.commentsView.$el.toggle(this.commentOpened),
              i.toggleClass("opened", this.commentOpened)
          },
          destroy: function() {
              this.commentsView && this.commentsView.remove(),
              this.annotations.remove(this.info),
              this.remove()
          },
          updateTagClass: function() {
              this.$el.removeClass(this.tagClass),
              this.tagClass = this.getTagClass(),
              this.$el.addClass(this.tagClass)
          },
          getTagClass: function() {
              return this.model.getShowTag() + "-annotation"
          }
      });
      return i.extend(c.prototype, l),
      c
  }
  .apply(e, n)) || (t.exports = o)
}
, , function(t, e, i) {
  (function(e) {
      var n = i(1)
        , o = i(2)
        , r = i(107)
        , a = i(8);
      function s(t) {
          var e = t.content;
          if (window.Blob && window.URL) {
              var i = new Blob([e],{
                  type: "text/html",
                  endings: "native"
              });
              return URL.createObjectURL(i)
          }
      }
      var l = o.View.extend({
          className: "export-annotations-container",
          tmpl: n.template(e("#tmpl-export-annotations").html()),
          tmplDownloadHtml: n.template(e("#tmpl-export-annotations-download-html").html()),
          tmplHtml: n.template(e("#tmpl-export-annotations-html").html()),
          tmplHeader: n.template(e("#tmpl-export-annotations-header").html()),
          tmplItem: n.template(e("#tmpl-export-annotations-item").html()),
          tmplChapterTitle: n.template(e("#tmpl-export-annotations-chapter").html()),
          initialize: function(t) {
              var e = t.app
                , i = t.annotations;
              this.app = e,
              this.annotations = i;
              var o, r = e.getModel("content"), a = e.getModel("article").get("metaData").isOriginWorks ? 300 : 400;
              this.annotationDataList = n.chain(i.toJSON()).filter(function(t) {
                  return -1 !== t.tags.indexOf("mine")
              }).sortBy(function(t) {
                  return t.endOffset
              }).sortBy(function(t) {
                  return r.parasIndexs.indexOf(t.endContainerId)
              }).reduce(function(t, e) {
                  var i = r.getTocFromPara(e.endContainerId);
                  return i && i !== o ? (o = i,
                  t.concat([i, e])) : t.concat([e])
              }, []).value(),
              this.truncate = function(t) {
                  return t.length > a ? t.substr(0, a) + " […]" : t
              }
          },
          events: {
              "change [name=useTxt]": "handleToggleTxt"
          },
          render: function() {
              var t, e = this, i = this.app.getModel("article"), n = i.get("metaData"), o = "".concat(i.get("title"), "_笔记_豆瓣阅读_").concat((t = new Date,
              "".concat(t.getFullYear()) + "".concat(((t.getMonth() + 1) / 100).toFixed(2).slice(2)) + "".concat((t.getDate() / 100).toFixed(2).slice(2)))), a = "".concat(location.protocol, "//").concat(location.host, "/").concat(this.app.router.getBookUrl()), l = "#《".concat(n.title, "》的批注与划线\n\n") + "在豆瓣阅读书店查看： ".concat(a, "\n") + "本作品由 ".concat(n.authorizer, " 授权豆瓣阅读").concat(n.authorizedDistrict, "范围内电子版制作与发行。\n") + "© 版权所有，侵权必究。\n\n\n" + this.renderExportContent({
                  renderTitle: function(t) {
                      return "## 章节：".concat(t.title)
                  },
                  renderItem: function(t) {
                      return e.truncate(t.extra.text).split("\n").map(function(t) {
                          return "> ".concat(t)
                      }).join("\n") + (t.note ? "\n\n".concat(t.note) : "")
                  }
              }), h = this.tmplHeader({
                  url: a,
                  metaData: n
              }), c = this.tmplHtml({
                  html: h + this.renderExportContent({
                      renderTitle: function(t) {
                          return e.tmplChapterTitle({
                              item: t
                          })
                      },
                      renderItem: function(t) {
                          return e.tmplItem({
                              item: t,
                              truncate: e.truncate,
                              printTime: r
                          })
                      }
                  })
              }), d = this.tmplDownloadHtml({
                  html: c
              });
              return this.$el.html(this.tmpl({
                  txt: {
                      content: l,
                      url: s({
                          content: l
                      }),
                      title: o + ".txt"
                  },
                  html: {
                      content: c,
                      url: s({
                          content: d
                      }),
                      title: o + ".html"
                  }
              })),
              this
          },
          renderExportContent: function(t) {
              var e = t.renderTitle
                , i = t.renderItem;
              return this.annotationDataList.map(function(t) {
                  return n.isUndefined(t.level) ? i(t) : e(t)
              }).join("\n\n\n")
          },
          handleToggleTxt: function(t) {
              var e = this
                , i = t.currentTarget.checked;
              this.$el.toggleClass("is-txt", i),
              i && setTimeout(function() {
                  return e.$el.find("textarea").focus().select()
              }, 1)
          }
      });
      t.exports = {
          openDialog: function(t) {
              var e = t.app
                , i = t.annotations;
              a({
                  title: "导出笔记",
                  content: new l({
                      app: e,
                      annotations: i
                  }).render().$el
              }).addClass("dialog-export-annotation").open()
          }
      }
  }
  ).call(this, i(0))
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(2), i(1), i(9), i(124), i(20)],
  void 0 === (o = function(t, e, i, n, o, r) {
      var a = e.View.extend({
          tmpl: t("#tmpl-toc").html(),
          events: {
              "click .toc-item": "tocJump",
              "collapse:expanded": "onOpenPanel"
          },
          closePanel: function() {
              this.$el.trigger("close")
          },
          initialize: function(e) {
              i.bindAll(this, "gotoTocPage", "render"),
              this.app = e.app,
              this.vent = this.app.vent,
              this.controls = e.controls,
              this.turningModel = e.turningModel,
              this.vent.on("goto:tocPage", this.gotoTocPage),
              this.serverTocDfd = t.Deferred(),
              this.app.hasModel("content") ? this.render() : this.listenTo(this.app.vent, "model:content:set", this.render)
          },
          render: function() {
              var t = this.app.getModel("content").contents;
              return t.length ? (this.$el.html(i.template(this.tmpl, {
                  list: i.map(t, this.appendReadPageNum, this)
              })),
              this.tocItemEls = this.$("#contents-list li"),
              this.trigger("list:render"),
              this) : (this.$el.empty(),
              this)
          },
          appendReadPageNum: function(t) {
              return (t = i.clone(t)).readPageNum = this.turningModel.real2read(t.pageNum),
              t
          },
          gotoTocPage: function(t) {
              t = t || 0,
              this.$el.find(".toc-item").eq(t).trigger("click")
          },
          tocJump: function(e) {
              var i = e.currentTarget;
              if (t(i).closest("li").hasClass("need-buy"))
                  this.turningModel.turnLastPage();
              else {
                  var n = parseInt(i.id.split("-")[1], 10);
                  this.turningModel.setCurrPage(n)
              }
              this.controls.closePopups(),
              r._trackEvent("clickContentsItem")
          },
          onOpenPanel: function() {
              this.$(".is-current").removeClass("is-current");
              var t, e, o, r = this.turningModel.get("currPage"), a = this.app.getModel("content"), s = a.contents;
              r && (t = a.getPage(r).tocItem,
              e = i.indexOf(s, t),
              (o = this.tocItemEls.eq(e)).addClass("is-current"),
              n.fitForMobile() || this.scrollToElem(o))
          },
          scrollToMarginTop: 96,
          scrollToElem: function(t) {
              this.scrollBody = this.scrollBody || this.$el.closest(".panels-container"),
              this.scrollBody.scrollTop(t.offset().top - this.scrollBody.offset().top - this.scrollToMarginTop)
          }
      });
      return i.extend(a.prototype, o),
      a
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(0), i(2), i(1), i(6), i(124), i(9), i(32)],
  void 0 === (o = function(t, e, i, n, o, r, a) {
      var s = e.View.extend({
          tmpl: t("#tmpl-chapters-toc").html(),
          events: {
              "click .chapter-toc-item": "tocJump",
              "collapse:expanded": "onExpand",
              "click .show-gift": "showGift"
          },
          initialize: function(t) {
              var e, n, o;
              this.app = t.app,
              this.controls = t.controls,
              e = this.app,
              n = i.bind(function(t) {
                  this.chaptersCollection = t,
                  this.columnModel = this.app.getModel("column"),
                  this.rendered && this.render()
              }, this),
              o = e.getModel("chapters"),
              n(o),
              o.on("reset", n),
              e.vent.on("model:chapters:set", function(t) {
                  o.off("reset", n),
                  t.on("reset", n)
              })
          },
          render: function() {
              this.rendered = !0;
              var t = this.chaptersCollection
                , e = t.currChapter.get("chapterId")
                , n = t.allChapters;
              if (n)
                  return this.$el.html(i.template(this.tmpl, {
                      list: n,
                      lastItemIndex: n.length - 1,
                      columnId: t.columnId,
                      currChapterId: e,
                      truncate: a,
                      gift: this.columnModel.get("gift")
                  })),
                  this.chaptersList = this.$el.find("#chapters-contents-list"),
                  this
          },
          tocJump: function(e) {
              var i = t(e.currentTarget);
              if (!i.hasClass("is-withdrawn")) {
                  var n = this.chaptersCollection.columnId
                    , o = i.data("chapter-id");
                  this.app.router.navigate("column/".concat(n, "/chapter/").concat(o, "/"), {
                      trigger: !0
                  }),
                  this.controls.closePopups()
              }
          },
          scrollToMarginTop: 96,
          scrollTo: function(t) {
              this.scrollBody = this.scrollBody || this.$el.closest(".panels-container");
              var e = t.offset().top - this.scrollBody.offset().top - this.scrollToMarginTop;
              this.scrollBody.scrollTop(e)
          },
          scrollToCurrItem: function() {
              var t = this.$(".is-current");
              this.scrollTo(t)
          },
          onExpand: function() {
              r.fitForMobile() || this.scrollToCurrItem()
          },
          showGift: function() {
              this.controls.closePopups(),
              this.app.vent.trigger("show:giftOverlay")
          }
      });
      return i.extend(s.prototype, o),
      s
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(6), i(326)],
  void 0 === (o = function(t, e) {
      function i(t) {
          var e = t.title
            , i = "";
          return t.isSample && (i += "[试读]"),
          t.hasFormula && (i += "[公式]"),
          e + i
      }
      function n(t, i, n) {
          var o, r = n.startPublisher, a = n.startEvent, s = n.endPublisher || r, l = n.endEvent;
          r.once(a, function() {
              o = new e(t,i)
          }),
          s.once(l, function() {
              o && o.end()
          })
      }
      var o = {
          trackEvent: n,
          bindAll: function(e) {
              t.vent.on("model:article:set", function() {
                  o.trackPaging(t)
              }),
              e.article.on("article:init", function() {
                  o.trackArticleFetching(t)
              })
          },
          trackPaging: function(t) {
              n("Paging", i(t.getModel("article").toJSON()), {
                  startPublisher: t.vent,
                  startEvent: "paging:start",
                  endEvent: "paging:finish"
              })
          },
          trackArticleFetching: function(t) {
              var n;
              t.vent.once("article:fetching:start", function() {
                  n = new e("Article.fetch")
              }),
              t.vent.once("article:fetching:finish", function(t) {
                  n && n._end()
              }),
              t.vent.once("model:article:set", function(t) {
                  n && (n.set({
                      label: i(t.toJSON())
                  }),
                  n.send())
              })
          }
      };
      return o
  }
  .apply(e, n)) || (t.exports = o)
}
, function(t, e, i) {
  var n, o;
  n = [i(1), i(20)],
  void 0 === (o = function(t, e) {
      function i(t, e) {
          this.set({
              name: t,
              label: e
          }),
          this.sampleRate = 100,
          this._start()
      }
      return t.extend(i.prototype, {
          nowTime: function() {
              return +new Date
          },
          set: function(e) {
              t.extend(this, t.pick(e, "name", "label"))
          },
          validateSpent: function(t) {
              return t < 36e5 && t > 0
          },
          _start: function() {
              this.startTime = this.nowTime()
          },
          _end: function() {
              this.endTime = this.nowTime()
          },
          send: function() {
              var t = this.endTime - this.startTime;
              this.validateSpent(t) && !this.sent && (e._trackTiming(this.name, t, this.label, this.sampleRate),
              this.sent = !0)
          },
          end: function() {
              this._end(),
              this.send()
          }
      }),
      i
  }
  .apply(e, n)) || (t.exports = o)
}
, , function(t, e, i) {
  var n, o;
  n = [i(0), i(2), i(1), i(6), i(112), i(136), i(174)],
  void 0 === (o = function(t, e, i, n, o, r, a) {
      function s(e) {
          var n = t("#tmpl-alert").html()
            , o = {
              title: "无法查看批注",
              confirm: "知道了"
          };
          e.is_deleted ? o.text = "很遗憾，这条批注已经被批注者删掉了，所以无法查看。不如随手翻翻这本书吧。" : e.visible_private && (o.text = "很遗憾，这条批注已经被批注者修改成“仅自己可见”，所以无法查看。不如随手翻翻这本书吧。"),
          new r({
              html: i.template(n, o)
          })
      }
      function l(e, n) {
          i.bindAll(this, "afterPagingDone", "_onShareFetched"),
          this.getSharePromise = t.get("/j/share/" + n, {
              works_id: e
          })
      }
      function h(t) {
          i.bindAll(this, "afterPagingDone"),
          this.stamp = new o({
              isRecommendation: !0
          }).setAnnotation(t)
      }
      function c(e, n) {
          i.bindAll(this, "afterPagingDone", "afterJumpingProgress", "_onAnnotationFetched"),
          this.getAnnotationPromise = t.get("/j/article_v2/" + e + "/annotation", {
              id: n
          })
      }
      function d(t) {
          i.bindAll(this, "afterPagingDone", "afterJumpingProgress"),
          this.paraId = t,
          this.stamp = new o({
              pid: t,
              type: "para"
          })
      }
      function p(t) {
          i.bindAll(this, "afterPagingDone"),
          this.index = t
      }
      return i.extend(l.prototype, {
          afterPagingDone: function(t) {
              return this.contentModel = t,
              this.getSharePromise.done(this._onShareFetched)
          },
          _onShareFetched: function(t) {
              if (t && !t.r) {
                  var e = t.props
                    , i = new o({
                      isRecommendation: !0
                  }).setAnnotation(e);
                  i.annotationReadable() ? this.contentModel.stamp = i : s(i.getAnnotationJson())
              }
          }
      }),
      i.extend(h.prototype, {
          afterPagingDone: function(t) {
              t.stamp = this.stamp
          }
      }),
      i.extend(c.prototype, {
          afterPagingDone: function(t) {
              return this.contentModel = t,
              this.getAnnotationPromise.done(this._onAnnotationFetched)
          },
          _onAnnotationFetched: function(t) {
              if (t && !t.r) {
                  var e = t
                    , i = new o({
                      type: "annotation",
                      isFromUrl: !0
                  }).setAnnotation(e);
                  i.annotationReadable() ? this.contentModel.stamp = i : s(i.getAnnotationJson())
              }
          },
          afterJumpingProgress: function() {
              var t = this.contentModel.stamp;
              t && t.annotationReadable() && this._openSingleAnnotationOverlay(t.getAnnotationJson())
          },
          _openSingleAnnotationOverlay: function(t) {
              if (t) {
                  var e = n.getModel("article").markings.get(t.id);
                  n.vent.trigger("open:singleAnnotationOverlay", e)
              }
          }
      }),
      i.extend(d.prototype, {
          afterPagingDone: function(t) {
              t.stamp = this.stamp
          },
          afterJumpingProgress: function() {
              var t = n.getModel("article").markings
                , e = this.paraId;
              t.fetchByPids([e]).done(function() {
                  n.vent.trigger("open:paraAnnotationsOverlay", e)
              })
          }
      }),
      i.extend(p.prototype, {
          afterPagingDone: function(e) {
              var n, s, l = e.contents[this.index];
              if (!l || !l.readable || !l.pageNum)
                  return n = t("#tmpl-alert").html(),
                  s = {
                      title: "无法查看此章节",
                      confirm: "知道了",
                      text: "很抱歉，因为此章节内容不在免费试读的范围内，所以无法查看。不如随手翻翻这本书吧。"
                  },
                  void new r({
                      html: i.template(n, s)
                  });
              var h = new o(a(l.pageNum));
              e.stamp = h
          }
      }),
      {
          Recommendation: l,
          Underline: h,
          Annotation: c,
          ParaAnnotations: d,
          TocChapter: p
      }
  }
  .apply(e, n)) || (t.exports = o)
}
])]);
