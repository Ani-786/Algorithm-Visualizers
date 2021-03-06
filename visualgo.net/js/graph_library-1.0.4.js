const OBJ_HIDDEN = -1,
    VERTEX_SHAPE_CIRCLE = "circle",
    VERTEX_SHAPE_RECT = "rect",
    VERTEX_DEFAULT = "default",
    VERTEX_NORMAL_BLUE = "normal_blue",
    VERTEX_NORMAL_GREEN = "normal_green",
    VERTEX_HIGHLIGHTED = "highlighted",
    VERTEX_HIGHLIGHTED_RECT = "highlighted_rect",
    VERTEX_TRAVERSED = "traversed",
    VERTEX_RESULT = "result",
    VERTEX_RESULT_RECT = "result_rect",
    VERTEX_RECT = "rect",
    VERTEX_BLUE_FILL = "blueFill",
    VERTEX_GREEN_FILL = "greenFill",
    VERTEX_GREY_FILL = "greyFill",
    VERTEX_PINK_FILL = "pinkFill",
    VERTEX_RED_FILL = "redFill",
    VERTEX_BLUE_OUTLINE = "blueOutline",
    VERTEX_GREEN_OUTLINE = "greenOutline",
    VERTEX_GREY_OUTLINE = "greyOutline",
    VERTEX_PINK_OUTLINE = "pinkOutline",
    VERTEX_RED_OUTLINE = "redOutline",
    EDGE_DEFAULT = "default",
    EDGE_HIGHLIGHTED = "highlighted",
    EDGE_TRAVERSED = "traversed",
    EDGE_BLUE = "blue",
    EDGE_GREEN = "green",
    EDGE_GREY = "grey",
    EDGE_PINK = "pink",
    EDGE_RED = "red",
    EDGE_TYPE_UDE = 0,
    EDGE_TYPE_DE = 1,
    EDGE_TYPE_BDE = 2,
    POLYGON_DEFAULT = "default",
    POLYGON_HIDDEN = "hidden",
    POLYGON_BLUE_FILL = "blueFill",
    POLYGON_GREEN_FILL = "greenFill",
    POLYGON_GREY_FILL = "greyFill",
    POLYGON_PINK_FILL = "pinkFill",
    POLYGON_RED_FILL = "redFill",
    POLYGON_BLUE_TRANSPARENT = "blueTransparent",
    POLYGON_GREEN_TRANSPARENT = "greenTransparent",
    POLYGON_GREY_TRANSPARENT = "greyTransparent",
    POLYGON_PINK_TRANSPARENT = "pinkTransparent",
    POLYGON_RED_TRANSPARENT = "redTransparent",
    NO_ITERATION = -1,
    NO_STATELIST = {},
    ANIMATION_PLAY = 1,
    ANIMATION_PAUSE = 0,
    ANIMATION_STOP = -1,
    UPDATE_FORWARD = !0,
    UPDATE_BACKWARD = !1,
    MODE_GET_ALL_SUBMITTED_GRAPHS_SUMMARY = 21,
    MODE_SUBMIT_GRAPH = 22,
    MODE_GET_SUBMITTED_GRAPH_BY_ID = 23,
    MODE_GET_ALL_GRAPH_TOPICS = 24,
    MODE_DELETE_SUBMITTED_GRAPH = 25,
    MODE_COMMIT_SUBMITTED_GRAPH = 26,
    MODE_ADD_SUBMITTED_GRAPH_RATING = 27,
    MODE_GET_RANDOM_SUBMITTED_GRAPH = 28,
    MODE_GET_ALL_COMMITTED_GRAPHS_SUMMARY = 29,
    MODE_DELETE_COMMITTED_GRAPH = 30;

function GraphVisu(t, e, r, i, n, a) {
    console.log(t + " " + e + " " + r + " " + i + " " + n + " " + a);
    var l = t,
        o = e,
        u = a,
        f = d3.scale.category10();
    d3.select("#drawgraph #viz").selectAll("svg").remove();
    for (var s, x, d, h = d3.select("#drawgraph #viz").append("svg").attr("width", 640).attr("height", 360), w = new Array(100), g = w.length; g >= 0; g--) w[g] = 0;
    !0 === u ? (s = [{
        id: 0,
        x: 100,
        y: 100
    }, {
        id: 1,
        x: 200,
        y: 200
    }, {
        id: 2,
        x: 300,
        y: 300
    }], x = 3) : (s = [{
        id: 0,
        x: 100,
        y: 100,
        w: 3
    }, {
        id: 1,
        x: 200,
        y: 200,
        w: 5
    }, {
        id: 2,
        x: 300,
        y: 300,
        w: 7
    }], x = 3), d = !0 === o ? [{
        source: s[0],
        target: s[1]
    }, {
        source: s[1],
        target: s[2]
    }] : [{
        source: s[0],
        target: s[1],
        weight: 2
    }, {
        source: s[1],
        target: s[2],
        weight: 2
    }], null == i || null == n ? (d = [], s = []) : (s = i, d = n), x = 0, x = s.length;
    for (g = 0; g < s.length; g++) w[s[g].id]++;
    for (g = 0; g < d.length; g++)
        for (var c = 0; c < s.length; c++) s[c].id === d[g].source.id && (d[g].source = s[c]), s[c].id === d[g].target.id && (d[g].target = s[c]);
    h.append("svg:defs").append("svg:marker").attr("id", "end-arrow").attr("viewBox", "0 -5 10 10").attr("refX", 6).attr("markerWidth", 3).attr("markerHeight", 3).attr("orient", "auto").append("svg:path").attr("d", "M0,-5L10,0L0,5").attr("fill", "#000");
    var v, y, p = h.append("svg:path").attr("class", "link dragline hidden").attr("d", "M0,0L0,0"),
        E = null,
        _ = null,
        m = null,
        V = null,
        T = null;

    function P() {
        V = null, T = null, m = null
    }

    function k() {
        h.selectAll("g").remove(), v = h.append("svg:g").selectAll("path"), y = h.append("svg:g").selectAll("g"), h.append("svg:g").selectAll("text"), (y = y.data(s, (function(t) {
            return t.id
        }))).selectAll("circle").style("fill", (function(t) {
            return t === E ? d3.rgb(f(t.id)).brighter().toString() : f(t.id)
        }));
        var t = y.enter().append("svg:g");
        t.append("svg:circle").attr("class", "node").attr("r", 16).attr("cx", (function(t) {
            return t.x
        })).attr("cy", (function(t) {
            return t.y
        })).style("fill", (function(t) {
            return t === E ? d3.rgb(255, 138, 39) : d3.rgb(238, 238, 238)
        })).on("mousedown", (function(t) {
            d3.event.ctrlKey || (E = (V = t) === E ? null : V, _ = null, p.style("marker-end", "url(#end-arrow)").classed("hidden", !1).attr("d", "M" + V.x + "," + V.y + "L" + V.x + "," + V.y), k())
        })).on("mouseup", (function(t) {
            if (V)
                if (p.classed("hidden", !0).style("marker-end", ""), (T = t) !== V) {
                    var e, r, i;
                    if (e = V, r = T, !(i = !1 === l ? d.filter((function(t) {
                            return t.source === e && t.target === r
                        }))[0] : d.filter((function(t) {
                            return t.source === e && t.target === r || t.source === r && t.target === e
                        }))[0]))
                        if (!1 === o) {
                            var n = parseInt(Math.sqrt(Math.pow(e.x - r.x, 2) + Math.pow(e.y - r.y, 2)) / 100 + 1);
                            i = {
                                source: e,
                                target: r,
                                weight: n
                            }, d.push(i)
                        } else i = {
                            source: e,
                            target: r
                        }, d.push(i);
                    _ = i, E = null, k()
                } else P()
        })), t.append("svg:text").attr("x", (function(t) {
            return t.x
        })).attr("y", (function(t) {
            return t.y + 16 / 3
        })).attr("class", "id").text((function(t) {
            return t.id
        })), (v = v.data(d)).classed("selected", (function(t) {
            return t === _
        })), v.enter().append("svg:path").attr("class", "link").classed("selected", (function(t) {
            return t === _
        })).style("marker-end", (function(t) {
            if (!1 === l) return "url(#end-arrow)"
        })).attr("d", (function(t) {
            var e = t.target.x - t.source.x,
                r = t.target.y - t.source.y,
                i = Math.sqrt(e * e + r * r),
                n = e / i,
                a = r / i,
                o = 17;
            !0 === l && (o = 12);
            var u = t.source.x + 12 * n,
                f = t.source.y + 12 * a,
                s = t.target.x - o * n,
                x = t.target.y - o * a;
            if (!0 === l) return "M" + u + "," + f + "L" + s + "," + x;
            if (d.filter((function(e) {
                    return e.source === t.target && e.target === t.source
                }))[0]) {
                var h, w = L(u, f, s, x, h = t.source.id < t.target.id ? 1 : 2).x,
                    g = L(u, f, s, x, h).y;
                return "M" + L(s, x, u, f, h).x + "," + L(s, x, u, f, h).y + "L" + w + "," + g
            }
            return "M" + u + "," + f + "L" + s + "," + x
        })).on("mousedown", (function(t) {
            d3.event.ctrlKey || (_ = (m = t) === _ ? null : m, E = null, k())
        })), !1 === o && h.append("svg:g").selectAll("text").data(d).enter().append("svg:text").attr("class", "weight").attr("x", (function(t) {
            var e;
            e = t.source.id < t.target.id ? 1 : 2;
            var r = 0;
            return d.filter((function(e) {
                return e.source === t.target && e.target === t.source
            }))[0] && (r = 2), S(t.source.x, t.source.y, t.target.x, t.target.y, e, r).x
        })).attr("y", (function(t) {
            var e;
            e = t.source.id < t.target.id ? 1 : 2;
            var r = 0;
            return d.filter((function(e) {
                return e.source === t.target && e.target === t.source
            }))[0] && (r = 2), S(t.source.x, t.source.y, t.target.x, t.target.y, e, r).y
        })).text((function(t) {
            return t.weight
        })), !1 === u && h.append("svg:g").selectAll("text").data(s).enter().append("svg:text").attr("class", "weight").attr("x", (function(t) {
            return t.x
        })).attr("y", (function(t) {
            return t.y + 30
        })).text((function(t) {
            return t.weight
        }));
        for (var e = -1, r = (s.length, d.length, []), i = 0; i < s.length; i++) s[i].id > e && (e = s[i].id);
        e++;
        var n = new Array(e);
        for (i = 0; i < e; i++) n[i] = !1;
        for (i = 0; i < s.length; i++) n[s[i].id] = !0;
        for (i = 0; i < e; i++) {
            r[i] = [];
            for (var a = 0; a < e; a++) !0 === n[i] && !0 === n[a] ? r[i][a] = "0" : r[i][a] = "x"
        }
        if (!0 === l)
            if (!0 === o)
                for (i = 0; i < d.length; i++) r[d[i].source.id][d[i].target.id] = "1", r[d[i].target.id][d[i].source.id] = "1";
            else
                for (i = 0; i < d.length; i++) r[d[i].source.id][d[i].target.id] = d[i].weight.toString(), r[d[i].target.id][d[i].source.id] = d[i].weight.toString();
        else if (!0 === o)
            for (i = 0; i < d.length; i++) r[d[i].source.id][d[i].target.id] = "1";
        else
            for (i = 0; i < d.length; i++) r[d[i].source.id][d[i].target.id] = d[i].weight.toString();
        var x = '{"vl":{';
        for (i = 0; i < s.length; i++) {
            var w = '"' + i + '":';
            (c = new Object).x = s[i].x, c.y = s[i].y, !1 === u && (c.w = s[i].weight), x += w + JSON.stringify(c), i !== s.length - 1 && (x += ",")
        }
        var g = '},"el":{';
        x = x.concat(g);
        for (i = 0; i < d.length; i++) {
            w = '"' + i + '":';
            var c = new Object;
            for (a = 0; a < s.length; a++) s[a].id == d[i].source.id && (c.u = a), s[a].id == d[i].target.id && (c.v = a);
            c.w = 1, !1 === o && (c.w = d[i].weight), x += w + JSON.stringify(c), i !== d.length - 1 && (x += ",")
        }
        g = "}}", x = x.concat(g), JSONresult = x
    }

    function L(t, e, r, i, n) {
        Math.sqrt(Math.pow(r - t, 2) + Math.pow(i - e, 2));
        if (t === r) return 1 === n ? {
            x: r - 4,
            y: i
        } : {
            x: r + 4,
            y: i
        };
        if (e === i) return 1 === n ? {
            x: r,
            y: i - 4
        } : {
            x: r,
            y: i + 4
        };
        var a = (i - e) / (r - t),
            l = -1 / a,
            o = i - l * r,
            u = Math.sqrt(Math.pow(r - t, 2) + Math.pow(i - e, 2)),
            f = o - e,
            s = 1 + l * l,
            x = 2 * l * f - 2 * t,
            d = x * x - 4 * s * (t * t + f * f - (u = u * u + 16)),
            h = (-x + (d = Math.sqrt(d))) / (2 * s),
            w = (-x - d) / (2 * s);
        return 2 === n ? {
            x: h,
            y: l * h + o
        } : {
            x: w,
            y: l * w + o
        }
    }

    function S(t, e, r, i, n, a) {
        Math.sqrt(Math.pow(r - t, 2) + Math.pow(i - e, 2)), i = (e + i) / 2;
        if (t === (r = (t + r) / 2)) return 2 === n ? {
            x: r + 16,
            y: i
        } : {
            x: r - 16,
            y: i
        };
        if (e === i) return 2 === n ? {
            x: r,
            y: i + 16
        } : {
            x: r,
            y: i - 16
        };
        var l = (i - e) / (r - t),
            o = -1 / l,
            u = i - o * r,
            f = Math.sqrt(Math.pow(r - t, 2) + Math.pow(i - e, 2)),
            s = 16;
        1 === a && (s = 50), 2 === a && (s = 18);
        var x = u - e,
            d = 1 + o * o,
            h = 2 * o * x - 2 * t,
            w = h * h - 4 * d * (t * t + x * x - (f = f * f + s * s)),
            g = (-h + (w = Math.sqrt(w))) / (2 * d),
            c = (-h - w) / (2 * d);
        return 2 === n ? {
            x: g,
            y: o * g + u
        } : {
            x: c,
            y: o * c + u
        }
    }
    var b = d3.behavior.drag().on("drag", (function(t) {
        var e, r;
        d3.select(this).select("circle").attr("cx", (function() {
            return e = d3.mouse($("svg")[0])[0]
        })).attr("cy", (function() {
            return r = d3.mouse($("svg")[0])[1]
        })), t.x = e, t.y = r, t.x = parseInt(t.x) - parseInt(t.x) % 20, t.y = parseInt(t.y) - parseInt(t.y) % 20, k()
    }));
    h.on("mousedown", (function() {
        if (h.classed("active", !0), !(d3.event.ctrlKey || V || m)) {
            var t = d3.mouse(this),
                e = {
                    id: x
                };
            w[x]++;
            for (var r = 0; r < 100; r++)
                if (0 === w[r]) {
                    x = r;
                    break
                }
            e.x = t[0], e.y = t[1], !1 === u && (e.weight = 1), e.x = parseInt(e.x) - parseInt(e.x) % 20, e.y = parseInt(e.y) - parseInt(e.y) % 20, s.push(e), k()
        }
    })).on("mousemove", (function() {
        V && (p.attr("d", "M" + V.x + "," + V.y + "L" + d3.mouse(this)[0] + "," + d3.mouse(this)[1]), k())
    })).on("mouseup", (function() {
        V && p.classed("hidden", !0), h.classed("active", !1), P()
    })), d3.select(window).on("keydown", (function() {
        var t;
        if (d3.event.keyCode, 17 === d3.event.keyCode && (y.call(b), h.classed("ctrl", !0)), E || _) switch (console.log(d3.event.keyCode + " " + E + " " + u), d3.event.keyCode) {
            case 46:
                if (E) {
                    s.splice(s.indexOf(E), 1), t = E, d.filter((function(e) {
                        return e.source === t || e.target === t
                    })).map((function(t) {
                        d.splice(d.indexOf(t), 1)
                    })), w[E.id] = 0;
                    for (var e = 0; e < 100; e++)
                        if (0 === w[e]) {
                            x = e;
                            break
                        }
                } else _ && d.splice(d.indexOf(_), 1);
                _ = null, E = null, k();
                break;
            case 13:
                if (_ && !1 === o) {
                    for (;;) {
                        if ((i = prompt("Enter new weight: (<= 99)")) <= 99) break
                    }
                    var r = d.indexOf(_);
                    d[r].weight = i
                } else if (E && !1 === u) {
                    for (;;) {
                        var i;
                        if ((i = prompt("Enter new weight: (<= 99)")) <= 99) break
                    }
                    r = s.indexOf(E);
                    s[r].weight = i
                }
                k()
        }
    })).on("keyup", (function() {
        -1, 17 === d3.event.keyCode && (y.on("mousedown.drag", null).on("touchstart.drag", null), h.classed("ctrl", !1))
    })), k()
}

function write(t, e, r) {
    void 0 === r && (r = "true");
    var i = '  <script>var JSONresult;<\/script>    <div id="main">      <div id="draw-status"><p>Status</p></div>      <div id="draw-warn"><p>No Warning</p></div>      <div id="draw-err"><p>No Error</p></div>      <div id="viz">        <svg onClick = "GraphVisu(' + t + "," + e + ",null,null,null," + r + '); " width="640" height="360"><defs><marker id="end-arrow" viewBox="0 -5 10 10" refX="6" markerWidth="3" markerHeight="3" orient="auto"><path d="M0,-5L10,0L0,5" fill="#000"></path></marker></defs><path class="link dragline hidden" d="M0,0L0,0"></path><g><path class="link" d="M108.48528137423857,108.48528137423857L191.51471862576142,191.51471862576142"></path><path class="link" d="M208.48528137423858,208.48528137423858L291.5147186257614,291.5147186257614"></path></g><g><g><circle class="node" r="16" cx="100" cy="100" style="fill: rgb(238, 238, 238);"></circle><text x="100" y="105.33333333333333" class="id">0</text></g><g><circle class="node" r="16" cx="200" cy="200" style="fill: rgb(238, 238, 238);"></circle><text x="200" y="205.33333333333334" class="id">1</text></g><g><circle class="node" r="16" cx="300" cy="300" style="fill: rgb(238, 238, 238);"></circle><text x="300" y="305.3333333333333" class="id">2</text></g></g><g></g>        <text x = "250" y = "100"> &bull; Click on empty space to add vertex</text>        <text x = "250" y = "125"> &bull; Drag from vertex to vertex to add edge</text>        <text x = "250" y = "150"> &bull; Select + Delete to delete vertex/edge</text>        <text x = "250" y = "175"> &bull; Select Edge + Enter to change edge\'s weight</text>      </svg>    </div>    <div id="drawgraph-actions">      <p onclick=drawCancel()>Cancel</p>      <p onclick=GraphVisu(' + t + "," + e + "," + r + ')>Clear</p>      <p onclick=drawDone()>Done</p>      <form id="drawgraph-form">        \x3c!--<input type="checkbox" id="submit" name="submit" value="submit" checked="checked">Submit drawn graph to database for random graph and online quiz purposes        <br>--\x3e<input type="checkbox" id="copy" name="submit" value="submit" checked="checked">Copy JSON text to clipboard      </form>    </div>  ';
    $("#drawgraph").html(i), $("#copy").removeAttr("checked")
}
var GraphEdgeWidget = function(t, e, r, i, n) {
        ! function() {
            markerSvg.select("#arrow").empty() && markerSvg.append("marker").attr("id", "arrow").attr("viewBox", "0 -5 10 10").attr("refX", ARROW_REFX).attr("markerWidth", ARROW_MARKER_WIDTH).attr("markerHeight", ARROW_MARKER_HEIGHT).attr("orient", "auto").append("path").attr("d", "M0,-5 L10,0 L0,5").attr("fill", ARROW_FILL);
            markerSvg.select("#backwardArrow").empty() && markerSvg.append("marker").attr("id", "backwardArrow").attr("viewBox", "-10 -5 10 10").attr("refX", -1 * ARROW_REFX).attr("markerWidth", ARROW_MARKER_WIDTH).attr("markerHeight", ARROW_MARKER_HEIGHT).attr("orient", "auto").append("path").attr("d", "M0,-5 L-10,0 L0,5").attr("fill", ARROW_FILL)
        }(), (null == n || isNaN(n)) && (n = 1);
        var a, l, o, u, f = this,
            s = d3.svg.line().x((function(t) {
                return t.x
            })).y((function(t) {
                return t.y
            })).interpolate("linear"),
            x = s(w()),
            d = s([w()[0], w()[0]]),
            h = {
                path: {
                    id: null,
                    class: null,
                    d: null,
                    stroke: null,
                    "stroke-width": null
                },
                weight: {
                    id: null,
                    startOffset: null,
                    dy: null,
                    fill: null,
                    "font-family": null,
                    "font-weight": null,
                    "font-size": null,
                    "text-anchor": null,
                    text: null
                }
            };

        function w() {
            for (var r = function() {
                    if (t) return parseFloat(t.getAttributes().outerVertex.cx)
                }(), i = function() {
                    if (t) return parseFloat(t.getAttributes().outerVertex.cy)
                }(), n = function() {
                    if (t) return parseFloat(e.getAttributes().outerVertex.cx)
                }(), a = function() {
                    if (t) return parseFloat(e.getAttributes().outerVertex.cy)
                }(), l = g(r, i, n, a, function() {
                    if (t) return parseFloat(t.getAttributes().outerVertex.r)
                }(), r, i), o = g(r, i, n, a, function() {
                    if (t) return parseFloat(e.getAttributes().outerVertex.r)
                }(), n, a), u = 5e3, f = 0, s = 0, x = 1; x <= 3; x += 2)
                for (var d = 1; d <= 3; d += 2) {
                    var h = Math.sqrt((l[x - 1] - o[d - 1]) * (l[x - 1] - o[d - 1]) + (l[x] - o[d]) * (l[x] - o[d]));
                    h < u && (u = h, f = x, s = d)
                }
            return [{
                x: l[f - 1],
                y: l[f]
            }, {
                x: o[s - 1],
                y: o[s]
            }]
        }

        function g(t, e, r, i, n, a, l) {
            var o = r - t,
                u = i - e,
                f = a - t,
                s = l - e,
                x = o * o + u * u,
                d = (o * f + u * s) / x,
                h = d * d - (f * f + s * s - n * n) / x,
                w = Math.sqrt(h),
                g = -d + w,
                c = -d - w,
                v = t - o * g,
                y = e - u * g,
                p = t - o * c,
                E = e - u * c,
                _ = new Array;
            return _[0] = v, _[1] = y, _[2] = p, _[3] = E, _
        }

        function c(t) {
            (null == t || isNaN(t)) && (t = 250), t <= 0 && (t = 1), a.attr("class", h.path.class), a.transition().duration(t).attr("d", h.path.d).attr("stroke", h.path.stroke).attr("stroke-width", h.path["stroke-width"]).style("marker-start", (function() {
                return h.path.d == d ? null : "bde" == h.path.class ? "url(#backwardArrow)" : null
            })).style("marker-end", (function() {
                return h.path.d == d ? null : "de" == h.path.class || "bde" == h.path.class ? "url(#arrow)" : null
            })), l.transition().duration(t).attr("fill", h.weight.fill).attr("font-family", h.weight["font-family"]).attr("font-size", h.weight["font-size"]).attr("font-weight", h.weight["font-weight"]).attr("text-anchor", h.weight["text-anchor"]).attr("text-decoration", "underline"), u.transition().duration(t).text((function() {
                return h.weight.text
            }))
        }

        function v() {
            x = s(w()), d = s([w()[0], w()[0]])
        }
        v(),
            function() {
                switch (h.path.id = "e" + r, h.path.d = d, h.path.stroke = graphEdgeProperties.path.default.stroke, h.path["stroke-width"] = graphEdgeProperties.path.default["stroke-width"], i) {
                    case 0:
                        h.path.class = "ude";
                        break;
                    case 1:
                        h.path.class = "de";
                        break;
                    case 2:
                        h.path.class = "bde"
                }
                h.weight.id = "ew" + r, h.weight.startOffset = graphEdgeProperties.weight.default.startOffset, h.weight.dy = graphEdgeProperties.weight.default.dy, h.weight.fill = graphEdgeProperties.weight.default.fill, h.weight["font-family"] = graphEdgeProperties.weight.default["font-family"], h.weight["font-size"] = 0, h.weight["font-weight"] = graphEdgeProperties.weight.default["font-weight"], h.weight["text-anchor"] = graphEdgeProperties.weight.default["text-anchor"], h.weight.text = n, (a = edgeSvg.append("path")).attr("id", h.path.id).attr("class", h.path.class);
                try {
                    "MNaN,NaNLNaN,NaN" != h.path.d && a.attr("d", h.path.d).attr("stroke", h.path.stroke).attr("stroke-width", h.path["stroke-width"])
                } catch (t) {}(l = edgeWeightSvg.append("text")).attr("id", h.weight.id), l.attr("fill", h.weight.fill).attr("font-family", h.weight["font-family"]).attr("font-size", h.weight["font-size"]).attr("font-weight", h.weight["font-weight"]).attr("text-anchor", h.weight["text-anchor"]), o = l.append("textPath").attr("xlink:href", (function() {
                    return "#" + h.path.id
                })).attr("startOffset", h.weight.startOffset), u = o.append("tspan").attr("dy", h.weight.dy).text((function() {
                    return h.weight.text
                }))
            }(), this.redraw = function(t) {
                c(t)
            }, this.animateHighlighted = function(t) {
                (null == t || isNaN(t)) && (t = 250), t <= 0 && (t = 1), edgeSvg.append("path").attr("id", "tempEdge" + a.attr("id")).attr("stroke", graphEdgeProperties.animateHighlightedPath.stroke).attr("stroke-width", graphEdgeProperties.animateHighlightedPath["stroke-width"]).transition().duration(t).each("start", (function() {
                    edgeSvg.select("#tempEdge" + a.attr("id")).attr("d", d)
                })).attr("d", x).each("end", (function() {
                    a.attr("stroke", graphEdgeProperties.path.highlighted.stroke).attr("stroke-width", graphEdgeProperties.path["stroke-width"]), edgeSvg.select("#tempEdge" + a.attr("id")).remove(), c(0)
                }))
            }, this.showEdge = function() {
                h.path.d = x, h.path["stroke-width"] = graphEdgeProperties.path["stroke-width"]
            }, this.hideEdge = function() {
                h.path.d = d
            }, this.showWeight = function() {
                h.weight["font-size"] = graphEdgeProperties.weight["font-size"]
            }, this.hideWeight = function() {
                h.weight["font-size"] = 0
            }, this.stateEdge = function(t) {
                var e;
                for (e in graphEdgeProperties.path[t]) h.path[e] = graphEdgeProperties.path[t][e];
                for (e in graphEdgeProperties.weight[t]) h.weight[e] = graphEdgeProperties.weight[t][e]
            }, this.removeEdge = function() {
                t.removeEdge(f), e.removeEdge(f), a.remove(), l.remove()
            }, this.refreshPath = function() {
                var t = d;
                v(), h.path.d == t ? h.path.d = d : h.path.d = x
            }, this.changeVertexA = function(e) {
                var r = !1;
                h.path.d == x && (r = !0), t.removeEdge(f), t = e, v(), x = s(w()), d = s([w()[0]]), h.path.d = d, t.addEdge(f), r && (h.path.d = x)
            }, this.changeVertexB = function(t) {
                var r = !1;
                h.path.d == x && (r = !0), e.removeEdge(f), e = t, v(), x = s(w()), d = s([w()[0]]), h.path.d = d, e.addEdge(f), r && (h.path.d = x)
            }, this.changeType = function(t) {
                switch (i = t) {
                    case 0:
                        h.path.class = "ude";
                        break;
                    case 1:
                        h.path.class = "de";
                        break;
                    case 2:
                        h.path.class = "bde"
                }
            }, this.changeWeight = function(t) {
                n = t, h.weight.text = n
            }, this.getVertex = function() {
                return [t, e]
            }, this.getAttributes = function() {
                return deepCopy(h.path)
            }, this.getType = function() {
                return i
            }
    },
    GraphPolygonWidget = function(t, e) {
        var r = null,
            i = null,
            n = {
                polygon: {
                    class: null,
                    points: null,
                    fill: null,
                    "stroke-width": null,
                    opacity: null
                }
            };
        ! function() {
            r = polygonSvg.append("polygon"), n.polygon.class = "p" + t;
            var i = "";
            for (key in e) i = i + e[key].x + "," + e[key].y + " ";
            n.polygon.points = i, n.polygon.fill = graphPolygonProperties.polygon.default.fill, n.polygon["stroke-width"] = 0, n.polygon.opacity = 1, r.attr("class", n.polygon.class).attr("points", n.polygon.points).attr("fill", n.polygon.fill).attr("stroke-width", n.polygon["stroke-width"]).attr("opacity", n.polygon.opacity)
        }(), this.redraw = function(t) {
            ! function(t) {
                (null == t || isNaN(t)) && (t = 250);
                t <= 0 && (t = 1);
                r.transition().duration(t).attr("points", n.polygon.points).attr("fill", n.polygon.fill).attr("stroke-width", n.polygon["stroke-width"]).attr("opacity", n.polygon.opacity)
            }(t)
        }, this.showPolygon = function() {
            null != i && null != i || (i = "default"), n.polygon.class = graphPolygonProperties.polygon.class, n.polygon["stroke-width"] = graphPolygonProperties.polygon["stroke-width"], n.polygon.fill = graphPolygonProperties.polygon[i].fill, n.polygon.opacity = graphPolygonProperties.polygon[i].opacity
        }, this.hidePolygon = function() {
            n.polygon.opacity = 0
        }, this.removePolygon = function() {
            r.remove()
        }, this.statePolygon = function(t) {
            var e;
            for (e in i = t, graphPolygonProperties.polygon[i]) n.polygon[e] = graphPolygonProperties.polygon[i][e]
        }, this.getAttributes = function() {
            return deepCopy(n)
        }, this.getClassNumber = function() {
            return t
        }
    },
    GraphVertexWidget = function(t, e, r, i, n) {
        var a, l, o, u, f = x(i) / 3,
            s = {
                innerVertex: {
                    class: null,
                    cx: null,
                    cy: null,
                    x: null,
                    y: null,
                    fill: null,
                    r: null,
                    width: null,
                    height: null,
                    stroke: null,
                    "stroke-width": null
                },
                outerVertex: {
                    class: null,
                    cx: null,
                    cy: null,
                    x: null,
                    y: null,
                    fill: null,
                    r: null,
                    width: null,
                    height: null,
                    stroke: null,
                    "stroke-width": null
                },
                text: {
                    class: null,
                    x: null,
                    y: null,
                    fill: null,
                    "font-family": null,
                    "font-weight": null,
                    "font-size": null,
                    "text-anchor": null,
                    text: null
                },
                extratext: {
                    class: null,
                    x: null,
                    y: null,
                    fill: null,
                    "font-family": null,
                    "font-weight": null,
                    "font-size": null,
                    "text-anchor": null,
                    text: null
                }
            };

        function x(t) {
            var e = t.toString().length;
            return e >= 6 && (e = 6), 0 === e && (e = 1), graphVertexProperties.text["font-sizes"][e - 1]
        }
        var d = {};
        ! function() {
            var x = r;
            "rect_long" == r && (x = "rect");
            l = vertexSvg.append(x), a = vertexSvg.append(x), o = vertexTextSvg.append("text"), u = vertexTextSvg.append("text"), s.innerVertex.class = "v" + n, s.innerVertex.cx = t, s.innerVertex.cy = e, s.innerVertex.x = t - graphVertexProperties.innerVertex.width / 2, s.innerVertex.y = e - graphVertexProperties.innerVertex.height / 2, s.innerVertex.fill = graphVertexProperties.innerVertex.default.fill, s.innerVertex.r = 0, s.innerVertex.width = 0, s.innerVertex.height = 0, s.innerVertex.stroke = graphVertexProperties.innerVertex.default.stroke, s.innerVertex["stroke-width"] = 0, s.outerVertex.class = "v" + n, s.outerVertex.cx = t, s.outerVertex.cy = e, s.outerVertex.x = t - graphVertexProperties.outerVertex.width / 2, s.outerVertex.y = e - graphVertexProperties.outerVertex.height / 2, s.outerVertex.fill = graphVertexProperties.outerVertex.default.fill, s.outerVertex.r = 0, s.innerVertex.width = 0, s.innerVertex.height = 0, s.outerVertex.stroke = graphVertexProperties.outerVertex.default.stroke, s.outerVertex["stroke-width"] = 0, s.text.class = "v" + n, s.text.x = t, s.text.y = e + f, s.text.fill = graphVertexProperties.text.default.fill, s.text["font-family"] = graphVertexProperties.text.default["font-family"], s.text["font-size"] = 0, s.text["font-weight"] = graphVertexProperties.text.default["font-weight"], s.text["text-anchor"] = graphVertexProperties.text.default["text-anchor"], "rect_long" == r && (s.text["text-anchor"] = "left");
            s.text.text = i, s.extratext.class = "v" + n, s.extratext.x = t, s.extratext.y = e + f + 26, s.extratext.fill = "red", s.extratext["font-family"] = graphVertexProperties.text.default["font-family"], s.extratext["font-size"] = 0, s.extratext["font-weight"] = graphVertexProperties.text.default["font-weight"], s.extratext["text-anchor"] = graphVertexProperties.text.default["text-anchor"], "rect_long" == r && (s.extratext["text-anchor"] = "left");
            s.extratext.text = "", a.attr("class", s.innerVertex.class), l.attr("class", s.outerVertex.class), o.attr("class", s.text.class), u.attr("class", s.extratext.class), a.attr("cx", s.innerVertex.cx).attr("cy", s.innerVertex.cy).attr("x", s.innerVertex.x).attr("y", s.innerVertex.y).attr("fill", s.innerVertex.fill).attr("r", s.innerVertex.r).attr("width", s.innerVertex.width).attr("height", s.innerVertex.height).attr("stroke", s.innerVertex.stroke).attr("stroke-width", s.innerVertex["stroke-width"]), l.attr("cx", s.outerVertex.cx).attr("cy", s.outerVertex.cy).attr("x", s.outerVertex.x).attr("y", s.outerVertex.y).attr("fill", s.outerVertex.fill).attr("r", s.outerVertex.r).attr("width", s.outerVertex.width).attr("height", s.outerVertex.height).attr("stroke", s.outerVertex.stroke).attr("stroke-width", s.outerVertex["stroke-width"]), o.attr("x", s.text.x).attr("y", s.text.y).attr("fill", s.text.fill).attr("font-family", s.text["font-family"]).attr("font-size", s.text["font-size"]).attr("font-weight", s.text["font-weight"]).attr("text-anchor", s.text["text-anchor"]).text((function() {
                return s.text.text
            })), u.attr("x", s.extratext.x).attr("y", s.extratext.y).attr("fill", s.extratext.fill).attr("font-family", s.extratext["font-family"]).attr("font-size", s.extratext["font-size"]).attr("font-weight", s.extratext["font-weight"]).attr("text-anchor", s.extratext["text-anchor"]).text((function() {
                return s.extratext.text
            }))
        }(), this.redraw = function(t) {
            ! function(t) {
                (null == t || isNaN(t)) && (t = 250);
                t <= 0 && (t = 1);
                a.transition().duration(t).attr("cx", s.innerVertex.cx).attr("cy", s.innerVertex.cy).attr("x", s.innerVertex.x).attr("y", s.innerVertex.y).attr("fill", s.innerVertex.fill).attr("r", s.innerVertex.r).attr("width", s.innerVertex.width).attr("height", s.innerVertex.height).attr("stroke", s.innerVertex.stroke).attr("stroke-width", s.innerVertex["stroke-width"]), l.transition().duration(t).attr("cx", s.outerVertex.cx).attr("cy", s.outerVertex.cy).attr("x", s.outerVertex.x).attr("y", s.outerVertex.y).attr("fill", s.outerVertex.fill).attr("r", s.outerVertex.r).attr("width", s.outerVertex.width).attr("height", s.outerVertex.height).attr("stroke", s.outerVertex.stroke).attr("stroke-width", s.outerVertex["stroke-width"]), o.transition().duration(t).attr("x", s.text.x).attr("y", s.text.y).attr("fill", s.text.fill).attr("font-family", s.text["font-family"]).attr("font-size", s.text["font-size"]).attr("font-weight", s.text["font-weight"]).attr("text-anchor", s.text["text-anchor"]).text((function() {
                    return s.text.text
                })), u.transition().duration(t).attr("x", s.extratext.x).attr("y", s.extratext.y).attr("fill", s.extratext.fill).attr("font-family", s.extratext["font-family"]).attr("font-size", s.extratext["font-size"]).attr("font-weight", s.extratext["font-weight"]).attr("text-anchor", s.extratext["text-anchor"]).text((function() {
                    return s.extratext.text
                }))
            }(t)
        }, this.showVertex = function() {
            s.outerVertex.r = graphVertexProperties.outerVertex.r, s.outerVertex.width = graphVertexProperties.outerVertex.width, s.outerVertex.height = graphVertexProperties.outerVertex.height, s.outerVertex["stroke-width"] = graphVertexProperties.outerVertex["stroke-width"], s.innerVertex.r = graphVertexProperties.innerVertex.r, s.innerVertex.width = graphVertexProperties.innerVertex.width, s.innerVertex.height = graphVertexProperties.innerVertex.height, s.innerVertex["stroke-width"] = graphVertexProperties.innerVertex["stroke-width"], s.text["font-size"] = x(i), s.extratext["font-size"] = graphVertexProperties.text["font-size"], "rect_long" == r ? (s.outerVertex.width = 200, s.innerVertex.width = 198) : "rect" == r && (s.outerVertex.width = 80, s.innerVertex.width = 78)
        }, this.hideVertex = function() {
            s.outerVertex.r = 0, s.outerVertex.width = 0, s.outerVertex.height = 0, s.outerVertex["stroke-width"] = 0, s.innerVertex.r = 0, s.innerVertex.width = 0, s.innerVertex.height = 0, s.innerVertex["stroke-width"] = 0, s.text["font-size"] = 0, s.extratext["font-size"] = 0
        }, this.moveVertex = function(t, e) {
            var r;
            for (r in s.outerVertex.cx = t, s.outerVertex.cy = e, s.outerVertex.x = t - graphVertexProperties.outerVertex.width / 2, s.outerVertex.y = e - graphVertexProperties.outerVertex.height / 2, s.innerVertex.cx = t, s.innerVertex.cy = e, s.innerVertex.x = t - graphVertexProperties.innerVertex.width / 2, s.innerVertex.y = e - graphVertexProperties.innerVertex.height / 2, s.text.x = t, s.text.y = e + f, s.extratext.x = t, s.extratext.y = e + f + 26, d) d[r].refreshPath()
        }, this.changeText = function(t) {
            i = t, s.text.text = t, s.text["font-size"] = x(t)
        }, this.changeExtraText = function(t) {
            t,
            s.extratext.text = t
        }, this.changeTextFontSize = function(t) {
            null == newTextSize || isNaN(newTextSize) || (s.text["font-size"] = newTextSize, s.extratext["font-size"] = newTextSize)
        }, this.changeRadius = function(t, e) {
            null == t || isNaN(t) || (s.innerVertex.r = t, null == e || isNaN(e) || (s.outerVertex.r = e))
        }, this.changeWidth = function(t, e) {
            null == t || isNaN(t) || (s.innerVertex.width = t, null == e || isNaN(e) || (s.outerVertex.width = e))
        }, this.changeHeight = function(t, e) {
            null == t || isNaN(t) || (s.innerVertex.height = t, null == e || isNaN(e) || (s.outerVertex.height = e))
        }, this.changeStrokeWidth = function(t, e) {
            null == t || isNaN(t) || (s.innerVertex["stroke-width"] = t, null == e || isNaN(e) || (s.outerVertex["stroke-width"] = e))
        }, this.removeVertex = function() {
            l.remove(), a.remove(), o.remove(), u.remove()
        }, this.stateVertex = function(t) {
            var e;
            for (e in graphVertexProperties.innerVertex[t]) s.innerVertex[e] = graphVertexProperties.innerVertex[t][e];
            for (e in graphVertexProperties.outerVertex[t]) s.outerVertex[e] = graphVertexProperties.outerVertex[t][e];
            for (e in graphVertexProperties.text[t]) s.text[e] = graphVertexProperties.text[t][e]
        }, this.getAttributes = function() {
            return deepCopy(s)
        }, this.getClassNumber = function() {
            return n
        }, this.addEdge = function(t) {
            d[t.getAttributes().id] = t
        }, this.removeEdge = function(t) {
            null != d[t.getAttributes().id] && null != d[t.getAttributes().id] && delete d[t.getAttributes().id]
        }, this.getEdge = function() {
            var t, e = [];
            for (t in d) e.push(d[t]);
            return e
        }
    },
    GraphWidget = function() {
        var t = this,
            e = {},
            r = {},
            i = {},
            n = {},
            a = {},
            l = {},
            o = -1,
            u = NO_STATELIST,
            f = -1,
            s = 500;

        function x(f, s) {
            var x, d = Object.keys(u).length - 1;
            try {
                var h;
                if ($("#progress-bar").slider("value", o), x = u[o].status, $("#status-subtitles p").html(x), $("#status p").html(x), highlightLine(u[o].lineNo), o == d) pause(), (h = $("#play img").attr("src")) && ($("#play img").attr("src", h.replace("/play.png", "/replay.png").replace("/pause.png", "/replay.png")), $("#mobile-playback-play img").attr("src", h.replace("/play.png", "/replay.png").replace("/pause.png", "/replay.png"))), $("#play img").attr("alt", "replay").attr("title", "replay"), $("#mobile-playback-play img").attr("alt", "replay").attr("title", "replay");
                else(h = $("#play img").attr("src")) && ($("#play img").attr("src", h.replace("/replay.png", "/play.png").replace("/pause.png", "/play.png")), $("#mobile-playback-play img").attr("src", h.replace("/replay.png", "/play.png").replace("/pause.png", "/play.png"))), $("#play img").attr("alt", "play").attr("title", "play"), $("#mobile-playback-play img").attr("alt", "play").attr("title", "play")
            } catch (t) {}! function(r, i) {
                var a;
                for (a in r) {
                    null != e[a] && null != e[a] || t.addVertex(r[a].cx, r[a].cy, r[a].text, a, !1);
                    var l = e[a];
                    l.showVertex(), -1 == r[a].state ? l.hideVertex() : null != r[a].state ? l.stateVertex(r[a].state) : l.stateVertex("default"), l.moveVertex(r[a].cx, r[a].cy), l.changeText(r[a].text), null != r[a]["text-font-size"] && l.changeTextFontSize(r[a]["text-font-size"]), null != r[a]["inner-r"] && null != r[a]["outer-r"] && l.changeRadius(r[a]["inner-r"], r[a]["outer-r"]), null != r[a]["inner-w"] && null != r[a]["outer-w"] && l.changeWidth(r[a]["inner-w"], r[a]["outer-w"]), null != r[a]["inner-h"] && null != r[a]["outer-h"] && l.changeHeight(r[a]["inner-h"], r[a]["outer-h"]), null != r[a]["inner-stroke-width"] && null != r[a]["outer-stroke-width"] && l.changeStrokeWidth(r[a]["inner-stroke-width"], r[a]["outer-stroke-width"]), null == r[a].extratext ? l.changeExtraText("") : l.changeExtraText(r[a].extratext), l.redraw(i), n[a] = !0
                }
                for (a in n) 0 == n[a] && (e[a].hideVertex(), e[a].redraw(i), n[a] = !0);
                for (a in n) n[a] = !1
            }(f.vl, s),
            function(i, n) {
                var l;
                try {
                    for (l in i) {
                        null != r[l] && null != r[l] || t.addEdge(i[l].vertexA, i[l].vertexB, l, i[l].type, i[l].weight, !1);
                        var o = r[l];
                        o.showEdge(), -1 == i[l].state ? o.hideEdge() : null != i[l].state ? o.stateEdge(i[l].state) : o.stateEdge("default"), o.hideWeight(), -1 != i[l].state && null != i[l].displayWeight && i[l].displayWeight && o.showWeight(), o.changeVertexA(e[i[l].vertexA]), o.changeVertexB(e[i[l].vertexB]), null == i[l].type && (i[l].type = 0), o.changeType(i[l].type), null != i[l].weight && o.changeWeight(i[l].weight), o.refreshPath(), null != i[l].animateHighlighted && i[l].animateHighlighted ? o.animateHighlighted(.9 * n) : o.redraw(n), a[l] = !0
                    }
                    for (l in a) 0 == a[l] && (r[l].hideWeight(), r[l].hideEdge(), r[l].redraw(n), a[l] = !0);
                    for (l in a) a[l] = !1
                } catch (t) {}
            }(f.el, s),
            function(e, r) {
                var n;
                for (n in e) {
                    null != i[n] && null != i[n] || t.addPolygon(n, e[n].points, !1);
                    var a = i[n];
                    a.showPolygon(), null != e[n].state ? a.statePolygon(e[n].state) : a.statePolygon("default"), a.redraw(r), l[n] = !0
                }
                for (n in l) 0 == l[n] && (i[n].hidePolygon(), i[n].redraw(r), l[n] = !0);
                for (n in l) l[n] = !1
            }(f.pl, s)
        }
        this.clearAll = function() {
            mainSvg.select("#polygon").empty() && (polygonSvg = mainSvg.append("g").attr("id", "polygon")), mainSvg.select("#edge").empty() && (edgeSvg = mainSvg.append("g").attr("id", "edge")), mainSvg.select("#vertex").empty() && (vertexSvg = mainSvg.append("g").attr("id", "vertex")), mainSvg.select("#vertexText").empty() && (vertexTextSvg = mainSvg.append("g").attr("id", "vertexText")), mainSvg.select("#edgeWeight").empty() && (edgeWeightSvg = mainSvg.append("g").attr("id", "edgeWeight")), mainSvg.select("#edgeWeightPath").empty() && (edgeWeightPathSvg = mainSvg.append("g").attr("id", "edgeWeightPath")), mainSvg.select("#marker").empty() && (markerSvg = mainSvg.append("g").attr("id", "marker"))
        }, t.clearAll(), this.addVertex = function(t, r, i, a, l, o) {
            0 != l && (l = !0);
            var u = new GraphVertexWidget(t, r, "circle", i, a);
            "" != o && u.changeExtraText(o), e[a] = u, n[a] = !1, 1 == l && (e[a].showVertex(), e[a].redraw())
        }, this.addRectVertex = function(t, r, i, a, l, o) {
            0 != l && (l = !0), void 0 === o && (o = "rect");
            var u = new GraphVertexWidget(t, r, o, i, a);
            e[a] = u, n[a] = !1, 1 == l && (e[a].showVertex(), e[a].redraw())
        }, this.addEdge = function(t, i, n, l, o, u, f) {
            try {
                0 != u && (u = !0), 1 != f && (f = !1), (null == l || isNaN(l)) && (l = 0), (null == o || isNaN(o)) && (o = 1);
                var s = e[t],
                    x = e[i],
                    d = new GraphEdgeWidget(s, x, n, l, o);
                r[n] = d, a[n] = !1, e[t].addEdge(d), e[i].addEdge(d), 1 == u && (r[n].showEdge(), 1 == f && r[n].showWeight(), r[n].redraw())
            } catch (t) {}
        }, this.removeEdge = function(t) {
            null != r[t] && null != r[t] && (r[t].removeEdge(), delete r[t], delete a[t])
        }, this.removeVertex = function(t) {
            null != e[t] && null != n[t] && (e[t].removeVertex(), delete e[t], delete n[t])
        }, this.addPolygon = function(t, e, r) {
            0 != r && (r = !0);
            var n = new GraphPolygonWidget(t, e);
            i[t] = n, l[t] = !1, 1 == r && (i[t].showPolygon(), i[t].redraw())
        }, this.removePolygon = function(t) {
            null != i[t] && null != l[t] && (i[t].removePolygon(), delete i[t], delete l[t])
        }, this.updateGraph = function(t, e) {
            (null == e || isNaN(e)) && (e = s), x(t, e)
        }, this.startAnimation = function(e, r) {
            null != e && (u = e), o = 0, t.play(r)
        }, this.animate = function(e) {
            o >= u.length && -1 != f && (f = 0), o == u.length - 1 && "function" == typeof e && e(), 0 != f && -1 != f && (t.next(s), setTimeout((function() {
                t.animate(e)
            }), s))
        }, this.play = function(e) {
            o < 0 && (o = 0), -1 == f ? (f = 1, x(u[o], s), setTimeout((function() {
                t.animate(e)
            }), s)) : (f = 1, t.animate(e))
        }, this.pause = function() {
            f = 0
        }, this.stop = function() {
            t.jumpToIteration(u.length - 1, 0), o = u.length - 1, f = -1;
            var e, r = u[o].vl,
                i = u[o].el;
            for (e in i) a[e] = !0;
            for (e in a) 0 == a[e] && t.removeEdge(e);
            for (e in r) n[e] = !0;
            for (e in n) 0 == n[e] && t.removeVertex(e);
            for (e in a) a[e] = !1;
            for (e in n) n[e] = !1;
            u = NO_STATELIST, o = -1
        }, this.next = function(t) {
            o < 0 && (o = 0), ++o >= u.length ? o = u.length - 1 : x(u[o], t)
        }, this.previous = function(t) {
            o >= u.length && (o = u.length - 1), --o < 0 || x(u[o], t)
        }, this.forceNext = function(e) {
            t.pause(), t.next(e)
        }, this.forcePrevious = function(e) {
            t.pause(), t.previous(e)
        }, this.jumpToIteration = function(t, e) {
            (o = t) >= u.length && (o = u.length - 1), o < 0 && (o = 0), x(u[o], e)
        }, this.replay = function() {
            t.jumpToIteration(0, 0), setTimeout((function() {
                t.play()
            }), 500)
        }, this.getCurrentIteration = function() {
            return o
        }, this.getTotalIteration = function() {
            return Object.keys(u).length
        }, this.getAnimationDuration = function() {
            return s
        }, this.getCurrentState = function() {
            return u[o]
        }, this.setAnimationDuration = function(t) {
            s = t
        }, this.removeAll = function() {
            var t;
            for (t in r) r[t].removeEdge();
            for (t in e) e[t].removeVertex();
            for (t in i) i[t].removePolygon();
            r = {}, e = {}, i = {}, n = {}, a = {}, l = {}
        }
    },
    ObjectPair = function(t, e) {
        this.getFirst = function() {
            return t
        }, this.getSecond = function() {
            return e
        }, this.setFirst = function(e) {
            t = e
        }, this.setSecond = function(t) {
            e = t
        }
    };
ObjectPair.compare = function(t, e) {
    return t.getFirst() > e.getFirst() ? 1 : t.getFirst() < e.getFirst() ? -1 : t.getSecond() > e.getSecond() ? 1 : t.getSecond() < e.getSecond() ? -1 : 0
};
var ObjectTriple = function(t, e, r) {
    this.getFirst = function() {
        return t
    }, this.getSecond = function() {
        return e
    }, this.getThird = function() {
        return r
    }, this.setFirst = function(e) {
        t = e
    }, this.setSecond = function(t) {
        e = t
    }, this.setThird = function(t) {
        r = t
    }
};
ObjectTriple.compare = function(t, e) {
    return t.getFirst() > e.getFirst() ? 1 : t.getFirst() < e.getFirst() ? -1 : t.getSecond() > e.getSecond() ? 1 : t.getSecond() < e.getSecond() ? -1 : t.getThird() > e.getThird() ? 1 : t.getThird() < e.getThird() ? -1 : 0
};
var UfdsHelper = function() {
    var t = this,
        e = {};
    this.insert = function(t) {
        if (null != e[t]) return !1;
        var r = {};
        r.parent = t, r.rank = 0, e[t] = r
    }, this.findSet = function(t) {
        if (null == e[t]) return !1;
        for (var r = e[t].parent, i = t; r != i;) r = e[i = r].parent;
        return e[t].parent = r, r
    }, this.unionSet = function(r, i) {
        if (null == e[r] || null == e[i]) return !1;
        if (t.isSameSet(r, i)) return !0;
        var n = t.findSet(r),
            a = t.findSet(i);
        e[n].rank > e[a].rank ? (e[n].parent = a, e[a].rank++) : (e[a].parent = n, e[n].rank++)
    }, this.isSameSet = function(r, i) {
        return null != e[r] && null != e[i] && t.findSet(r) == t.findSet(i)
    }
};

function IsUndirected(t, e) {
    if (0 == t.length) return !0;
    var r = [];
    for (var i in t)
        for (var n in r[i] = [], t) r[i][n] = 0;
    for (var a in e) {
        var l = e[a].u,
            o = e[a].v,
            u = e[a].w;
        r[l][o] = u
    }
    for (var i in t)
        for (var n in t)
            if (r[i][n] != r[n][i]) return !1;
    return !0
}

function IsConstantWeighted(t, e) {
    if (0 == t.length) return !0;
    var r = e[0].w;
    for (var i in e)
        if (e[i].w != r) return !1;
    return !0
}

function HasNegativeWeight(t, e) {
    if (0 == t.length) return !1;
    for (var r in e)
        if (parseInt(e[r].w) < 0) return !0;
    return !1
}

function IsTree(t, e) {
    if (0 == t.length) return !0;
    if (!IsUndirected(t, e)) return !1;
    var r = 0,
        i = 0,
        n = [];
    for (var a in t) r++, n[a] = !1;
    for (var a in e) i++;
    if (i / 2 != r - 1) return !1;
    for (var a in function t(r) {
            for (var i in n[r] = !0, e) e[i].u === r && !1 === n[e[i].v] && t(e[i].v)
        }(0), t)
        if (!1 === n[a]) return !1;
    return !0
}

function IsDAG(t, e) {
    if (0 == t.length) return !0;
    if (IsUndirected(t, e)) return !1;
    var r = 0;
    for (var i in t) r++;
    var n = [];
    for (var a in t)
        for (var l in n[a] = [], t) n[a][l] = 0;
    for (var i in e) {
        var o = e[i].u,
            u = e[i].v;
        n[o][u] = 1
    }
    for (var f = 0; f < r; f++)
        for (a = 0; a < r; a++)
            for (l = 0; l < r; l++) 1 == n[a][f] && 1 == n[f][l] && (n[a][l] = 1);
    for (a = 0; a < r; a++)
        if (1 == n[a][a]) return !1;
    return !0
}

function TopoSort(t, e) {
    if (0 == t.length) return {};
    if (!IsDAG(t, e)) return {};

    function r(t) {
        for (var a in i[t] = !0, e) e[a].u === t && !1 === i[e[a].v] && r(e[a].v);
        n.unshift(t)
    }
    var i = [],
        n = [];
    for (var a in t) i[a] = !1;
    for (var a in t) i[a] || r(parseInt(a));
    return n
}

function RunBellmanFord(t, e, r) {
    if (0 == t.length) return {};
    var i = 0,
        n = {},
        a = [];
    for (var l in t) i++, n[l] = 999, a[l] = !1;
    for (var l in n[parseInt(r)] = 0, e) 0;
    for (var o = 1; o < i; o++)
        for (var l in e) {
            var u = e[l].u,
                f = e[l].v,
                s = e[l].w;
            999 != n[u] && 999 != s && n[u] + s < n[f] && (n[f] = n[u] + s)
        }

    function x(t) {
        for (var r in a[t] = !0, e) e[r].u === t && !1 === a[e[r].v] && x(e[r].v)
    }
    var d = !1;
    for (var l in e) {
        u = e[l].u, f = e[l].v, s = e[l].w;
        999 != n[u] && n[u] + s < n[f] && (x(u), d = !0)
    }
    if (d)
        for (var l in t) a[l] && (n[l] = "??");
    return n
}

function HasNegativeWeightCycle(t, e, r) {
    if (0 == t.length) return !1;
    var i = 0,
        n = {};
    for (var a in t) i++, n[a] = 999;
    for (var a in n[parseInt(r)] = 0, e) 0;
    for (var l = 1; l < i; l++)
        for (var a in e) {
            var o = e[a].u,
                u = e[a].v,
                f = e[a].w;
            999 != n[o] && 999 != f && n[o] + f < n[u] && (n[u] = n[o] + f)
        }
    var s = !1;
    for (var a in e) {
        o = e[a].u, u = e[a].v, f = e[a].w;
        999 != n[o] && n[o] + f < n[u] && (s = !0)
    }
    return s
}
var VL = 0,
    EL = 1,
    CP3_4_1 = 0,
    CP3_4_3 = 1,
    CP3_4_4 = 2,
    CP3_4_9 = 3,
    CP3_4_10 = 4,
    CP3_4_14 = 5,
    CP3_4_17 = 6,
    CP3_4_18 = 7,
    CP3_4_19 = 8,
    CP3_4_24 = 9,
    CP3_4_26_1 = 10,
    CP3_4_26_2 = 11,
    CP3_4_26_3 = 12,
    CP3_4_40 = 13,
    K5 = 14,
    RAIL = 15,
    TESSELLATION = 16,
    BELLMANFORD_KILLER = 17,
    DIJKSTRA_KILLER = 18,
    DAG = 19,
    FORDFULKERSON_KILLER = 20,
    DINIC_SHOWCASE = 21,
    MVC_U_TWO_APPROX_KILLER = 22,
    EXAMPLE_VERTEX_WEIGHTED_TREE = 23,
    MVC_W_TWO_APPROX_KILLER = 24,
    INTERESTING_BIPARTITE = 25,
    LINEAR_CHAIN = 26,
    CS4234_SAMPLE = 27,
    K4 = 28,
    K8 = 29,
    CS4234_TUTORIAL_THREE = 30,
    WHEEL = 31,
    HOUSE_OF_CARDS = 32,
    FMOD = 33,
    GREEDY_AUGMENTING_PATH_KILLER = 34,
    K55 = 35,
    K55_ALMOST = 36;

function getExampleGraph(t, e) {
    if (t == CP3_4_1) {
        if (e == VL) return {
            0: {
                x: 300,
                y: 25
            },
            1: {
                x: 400,
                y: 25
            },
            2: {
                x: 400,
                y: 125
            },
            3: {
                x: 500,
                y: 25
            },
            4: {
                x: 600,
                y: 25
            },
            5: {
                x: 700,
                y: 25
            },
            6: {
                x: 600,
                y: 125
            },
            7: {
                x: 500,
                y: 125
            },
            8: {
                x: 700,
                y: 125
            }
        };
        if (e == EL) return {
            0: {
                u: 0,
                v: 1,
                w: 1
            },
            1: {
                u: 1,
                v: 0,
                w: 1
            },
            2: {
                u: 1,
                v: 2,
                w: 1
            },
            3: {
                u: 1,
                v: 3,
                w: 1
            },
            4: {
                u: 2,
                v: 1,
                w: 1
            },
            5: {
                u: 2,
                v: 3,
                w: 1
            },
            6: {
                u: 3,
                v: 1,
                w: 1
            },
            7: {
                u: 3,
                v: 2,
                w: 1
            },
            8: {
                u: 3,
                v: 4,
                w: 1
            },
            9: {
                u: 4,
                v: 3,
                w: 1
            },
            10: {
                u: 6,
                v: 7,
                w: 1
            },
            11: {
                u: 6,
                v: 8,
                w: 1
            },
            12: {
                u: 7,
                v: 6,
                w: 1
            },
            13: {
                u: 8,
                v: 6,
                w: 1
            }
        }
    } else if (t == CP3_4_3) {
        if (e == VL) return {
            0: {
                x: 300,
                y: 25
            },
            1: {
                x: 400,
                y: 25
            },
            2: {
                x: 500,
                y: 25
            },
            3: {
                x: 600,
                y: 25
            },
            4: {
                x: 300,
                y: 125
            },
            5: {
                x: 400,
                y: 125
            },
            6: {
                x: 500,
                y: 125
            },
            7: {
                x: 600,
                y: 125
            },
            8: {
                x: 300,
                y: 225
            },
            9: {
                x: 300,
                y: 325
            },
            10: {
                x: 400,
                y: 325
            },
            11: {
                x: 500,
                y: 325
            },
            12: {
                x: 600,
                y: 325
            }
        };
        if (e == EL) return {
            0: {
                u: 0,
                v: 1,
                w: 1
            },
            1: {
                u: 0,
                v: 4,
                w: 1
            },
            2: {
                u: 1,
                v: 0,
                w: 1
            },
            3: {
                u: 1,
                v: 2,
                w: 1
            },
            4: {
                u: 1,
                v: 5,
                w: 1
            },
            5: {
                u: 2,
                v: 1,
                w: 1
            },
            6: {
                u: 2,
                v: 3,
                w: 1
            },
            7: {
                u: 2,
                v: 6,
                w: 1
            },
            8: {
                u: 3,
                v: 2,
                w: 1
            },
            9: {
                u: 3,
                v: 7,
                w: 1
            },
            10: {
                u: 4,
                v: 0,
                w: 1
            },
            11: {
                u: 4,
                v: 8,
                w: 1
            },
            12: {
                u: 5,
                v: 1,
                w: 1
            },
            13: {
                u: 5,
                v: 6,
                w: 1
            },
            14: {
                u: 5,
                v: 10,
                w: 1
            },
            15: {
                u: 6,
                v: 2,
                w: 1
            },
            16: {
                u: 6,
                v: 5,
                w: 1
            },
            17: {
                u: 6,
                v: 11,
                w: 1
            },
            18: {
                u: 7,
                v: 3,
                w: 1
            },
            19: {
                u: 7,
                v: 12,
                w: 1
            },
            20: {
                u: 8,
                v: 4,
                w: 1
            },
            21: {
                u: 8,
                v: 9,
                w: 1
            },
            22: {
                u: 9,
                v: 8,
                w: 1
            },
            23: {
                u: 9,
                v: 10,
                w: 1
            },
            24: {
                u: 10,
                v: 5,
                w: 1
            },
            25: {
                u: 10,
                v: 9,
                w: 1
            },
            26: {
                u: 10,
                v: 11,
                w: 1
            },
            27: {
                u: 11,
                v: 6,
                w: 1
            },
            28: {
                u: 11,
                v: 10,
                w: 1
            },
            29: {
                u: 11,
                v: 12,
                w: 1
            },
            30: {
                u: 12,
                v: 7,
                w: 1
            },
            31: {
                u: 12,
                v: 11,
                w: 1
            }
        }
    } else if (t == CP3_4_4) {
        if (e == VL) return {
            0: {
                x: 300,
                y: 25
            },
            1: {
                x: 400,
                y: 25
            },
            2: {
                x: 400,
                y: 125
            },
            3: {
                x: 500,
                y: 25
            },
            4: {
                x: 600,
                y: 25
            },
            5: {
                x: 700,
                y: 25
            },
            6: {
                x: 500,
                y: 125
            },
            7: {
                x: 600,
                y: 125
            }
        };
        if (e == EL) return {
            0: {
                u: 0,
                v: 1,
                w: 1
            },
            1: {
                u: 0,
                v: 2,
                w: 1
            },
            2: {
                u: 1,
                v: 2,
                w: 1
            },
            3: {
                u: 1,
                v: 3,
                w: 1
            },
            4: {
                u: 2,
                v: 3,
                w: 1
            },
            5: {
                u: 2,
                v: 5,
                w: 1
            },
            6: {
                u: 3,
                v: 4,
                w: 1
            },
            7: {
                u: 7,
                v: 6,
                w: 1
            }
        }
    } else if (t == CP3_4_9) {
        if (e == VL) return {
            0: {
                x: 300,
                y: 25
            },
            1: {
                x: 400,
                y: 25
            },
            2: {
                x: 400,
                y: 125
            },
            3: {
                x: 500,
                y: 25
            },
            4: {
                x: 600,
                y: 25
            },
            5: {
                x: 700,
                y: 25
            },
            6: {
                x: 600,
                y: 125
            },
            7: {
                x: 700,
                y: 125
            }
        };
        if (e == EL) return {
            0: {
                u: 0,
                v: 1,
                w: 1
            },
            1: {
                u: 1,
                v: 3,
                w: 1
            },
            2: {
                u: 3,
                v: 2,
                w: 1
            },
            3: {
                u: 2,
                v: 1,
                w: 1
            },
            4: {
                u: 3,
                v: 4,
                w: 1
            },
            5: {
                u: 4,
                v: 5,
                w: 1
            },
            6: {
                u: 5,
                v: 7,
                w: 1
            },
            7: {
                u: 7,
                v: 6,
                w: 1
            },
            8: {
                u: 6,
                v: 4,
                w: 1
            }
        }
    } else if (t == CP3_4_10) {
        if (e == VL) return {
            0: {
                x: 300,
                y: 125
            },
            1: {
                x: 400,
                y: 25
            },
            2: {
                x: 500,
                y: 125
            },
            3: {
                x: 400,
                y: 225
            },
            4: {
                x: 300,
                y: 325
            }
        };
        if (e == EL) return {
            0: {
                u: 0,
                v: 1,
                w: 4
            },
            1: {
                u: 2,
                v: 0,
                w: 4
            },
            2: {
                u: 0,
                v: 3,
                w: 6
            },
            3: {
                u: 0,
                v: 4,
                w: 6
            },
            4: {
                u: 1,
                v: 2,
                w: 2
            },
            5: {
                u: 2,
                v: 3,
                w: 8
            },
            6: {
                u: 3,
                v: 4,
                w: 9
            }
        }
    } else if (t == CP3_4_14) {
        if (e == VL) return {
            0: {
                x: 300,
                y: 25
            },
            1: {
                x: 450,
                y: 175
            },
            2: {
                x: 450,
                y: 25
            },
            3: {
                x: 600,
                y: 175
            },
            4: {
                x: 450,
                y: 325
            }
        };
        if (e == EL) return {
            0: {
                u: 0,
                v: 1,
                w: 9
            },
            1: {
                u: 0,
                v: 2,
                w: 75
            },
            2: {
                u: 1,
                v: 2,
                w: 95
            },
            3: {
                u: 3,
                v: 1,
                w: 19
            },
            4: {
                u: 1,
                v: 4,
                w: 42
            },
            5: {
                u: 2,
                v: 3,
                w: 51
            },
            6: {
                u: 4,
                v: 3,
                w: 31
            }
        }
    } else if (t == CP3_4_17) {
        if (e == VL) return {
            0: {
                x: 415,
                y: 105
            },
            1: {
                x: 300,
                y: 25
            },
            2: {
                x: 455,
                y: 180
            },
            3: {
                x: 590,
                y: 25
            },
            4: {
                x: 470,
                y: 275
            }
        };
        if (e == EL) return {
            0: {
                u: 1,
                v: 4,
                w: 6
            },
            1: {
                u: 1,
                v: 3,
                w: 3
            },
            2: {
                u: 0,
                v: 1,
                w: 2
            },
            3: {
                u: 2,
                v: 4,
                w: 1
            },
            4: {
                u: 0,
                v: 2,
                w: 6
            },
            5: {
                u: 3,
                v: 4,
                w: 5
            },
            6: {
                u: 0,
                v: 3,
                w: 7
            }
        }
    } else if (t == CP3_4_18) {
        if (e == VL) return {
            0: {
                x: 300,
                y: 100
            },
            1: {
                x: 400,
                y: 25
            },
            2: {
                x: 400,
                y: 175
            },
            3: {
                x: 500,
                y: 100
            },
            4: {
                x: 600,
                y: 100
            }
        };
        if (e == EL) return {
            0: {
                u: 0,
                v: 1,
                w: 1
            },
            1: {
                u: 1,
                v: 3,
                w: 2
            },
            2: {
                u: 3,
                v: 4,
                w: 3
            },
            3: {
                u: 0,
                v: 2,
                w: 10
            },
            4: {
                u: 2,
                v: 3,
                w: -10
            }
        }
    } else if (t == CP3_4_19) {
        if (e == VL) return {
            0: {
                x: 300,
                y: 25
            },
            1: {
                x: 400,
                y: 25
            },
            2: {
                x: 500,
                y: 25
            },
            3: {
                x: 600,
                y: 25
            },
            4: {
                x: 400,
                y: 100
            }
        };
        if (e == EL) return {
            0: {
                u: 0,
                v: 1,
                w: 99
            },
            1: {
                u: 1,
                v: 2,
                w: 15
            },
            2: {
                u: 2,
                v: 1,
                w: -42
            },
            3: {
                u: 2,
                v: 3,
                w: 10
            },
            4: {
                u: 0,
                v: 4,
                w: -99
            }
        }
    } else if (t == CP3_4_24) {
        if (e == VL) return {
            0: {
                x: 300,
                y: 125
            },
            1: {
                x: 400,
                y: 25
            },
            2: {
                x: 400,
                y: 225
            },
            3: {
                x: 500,
                y: 125
            }
        };
        if (e == EL) return {
            0: {
                u: 0,
                v: 1,
                w: 4
            },
            1: {
                u: 1,
                v: 3,
                w: 8
            },
            2: {
                u: 0,
                v: 2,
                w: 8
            },
            3: {
                u: 2,
                v: 3,
                w: 3
            },
            4: {
                u: 2,
                v: 1,
                w: 1
            },
            5: {
                u: 1,
                v: 2,
                w: 1
            }
        }
    } else if (t == CP3_4_26_1) {
        if (e == VL) return {
            0: {
                x: 300,
                y: 125
            },
            1: {
                x: 500,
                y: 225
            },
            2: {
                x: 400,
                y: 25
            },
            3: {
                x: 400,
                y: 225
            },
            4: {
                x: 600,
                y: 125
            }
        };
        if (e == EL) return {
            0: {
                u: 0,
                v: 2,
                w: 5
            },
            1: {
                u: 0,
                v: 3,
                w: 3
            },
            2: {
                u: 2,
                v: 3,
                w: 3
            },
            3: {
                u: 3,
                v: 1,
                w: 5
            },
            4: {
                u: 2,
                v: 1,
                w: 3
            },
            5: {
                u: 2,
                v: 4,
                w: 3
            },
            6: {
                u: 1,
                v: 4,
                w: 7
            }
        }
    } else if (t == CP3_4_26_2) {
        if (e == VL) return {
            0: {
                x: 300,
                y: 125
            },
            1: {
                x: 500,
                y: 225
            },
            2: {
                x: 400,
                y: 25
            },
            3: {
                x: 400,
                y: 225
            },
            4: {
                x: 600,
                y: 125
            }
        };
        if (e == EL) return {
            0: {
                u: 0,
                v: 2,
                w: 5
            },
            1: {
                u: 0,
                v: 3,
                w: 3
            },
            2: {
                u: 2,
                v: 3,
                w: 3
            },
            3: {
                u: 3,
                v: 1,
                w: 5
            },
            4: {
                u: 2,
                v: 1,
                w: 3
            },
            5: {
                u: 2,
                v: 4,
                w: 3
            },
            6: {
                u: 1,
                v: 4,
                w: 4
            }
        }
    } else if (t == CP3_4_26_3) {
        if (e == VL) return {
            0: {
                x: 300,
                y: 125
            },
            1: {
                x: 500,
                y: 225
            },
            2: {
                x: 400,
                y: 25
            },
            3: {
                x: 400,
                y: 225
            },
            4: {
                x: 600,
                y: 125
            }
        };
        if (e == EL) return {
            0: {
                u: 0,
                v: 2,
                w: 5
            },
            1: {
                u: 0,
                v: 3,
                w: 3
            },
            2: {
                u: 3,
                v: 1,
                w: 5
            },
            3: {
                u: 2,
                v: 1,
                w: 2
            },
            4: {
                u: 2,
                v: 4,
                w: 2
            },
            5: {
                u: 1,
                v: 4,
                w: 7
            }
        }
    } else if (t == CP3_4_40) {
        if (e == VL) return {
            0: {
                x: 400,
                y: 25
            },
            1: {
                x: 500,
                y: 100
            },
            2: {
                x: 500,
                y: 250
            },
            3: {
                x: 400,
                y: 175
            },
            4: {
                x: 300,
                y: 250
            },
            5: {
                x: 300,
                y: 100
            }
        };
        if (e == EL) return {
            0: {
                u: 0,
                v: 1,
                w: 2
            },
            1: {
                u: 0,
                v: 5,
                w: 4
            },
            2: {
                u: 1,
                v: 0,
                w: 2
            },
            3: {
                u: 1,
                v: 3,
                w: 9
            },
            4: {
                u: 2,
                v: 3,
                w: 5
            },
            5: {
                u: 3,
                v: 1,
                w: 9
            },
            6: {
                u: 3,
                v: 2,
                w: 5
            },
            7: {
                u: 3,
                v: 4,
                w: 1
            },
            8: {
                u: 4,
                v: 3,
                w: 1
            },
            9: {
                u: 5,
                v: 0,
                w: 4
            }
        }
    } else if (t == K5) {
        if (e == VL) return {
            0: {
                x: 300,
                y: 125
            },
            1: {
                x: 640,
                y: 125
            },
            2: {
                x: 370,
                y: 315
            },
            3: {
                x: 470,
                y: 25
            },
            4: {
                x: 570,
                y: 315
            }
        };
        if (e == EL) return {
            0: {
                u: 0,
                v: 1,
                w: 24
            },
            1: {
                u: 0,
                v: 2,
                w: 13
            },
            2: {
                u: 0,
                v: 3,
                w: 13
            },
            3: {
                u: 0,
                v: 4,
                w: 22
            },
            4: {
                u: 1,
                v: 2,
                w: 22
            },
            5: {
                u: 1,
                v: 3,
                w: 13
            },
            6: {
                u: 1,
                v: 4,
                w: 13
            },
            7: {
                u: 2,
                v: 3,
                w: 19
            },
            8: {
                u: 2,
                v: 4,
                w: 14
            },
            9: {
                u: 3,
                v: 4,
                w: 19
            }
        }
    } else if (t == RAIL) {
        if (e == VL) return {
            0: {
                x: 300,
                y: 25
            },
            1: {
                x: 400,
                y: 25
            },
            2: {
                x: 500,
                y: 25
            },
            3: {
                x: 600,
                y: 25
            },
            4: {
                x: 700,
                y: 25
            },
            5: {
                x: 300,
                y: 125
            },
            6: {
                x: 400,
                y: 125
            },
            7: {
                x: 500,
                y: 125
            },
            8: {
                x: 600,
                y: 125
            },
            9: {
                x: 700,
                y: 125
            }
        };
        if (e == EL) return {
            0: {
                u: 0,
                v: 1,
                w: 10
            },
            1: {
                u: 1,
                v: 2,
                w: 10
            },
            2: {
                u: 1,
                v: 6,
                w: 8
            },
            3: {
                u: 1,
                v: 7,
                w: 13
            },
            4: {
                u: 2,
                v: 3,
                w: 10
            },
            5: {
                u: 2,
                v: 7,
                w: 8
            },
            6: {
                u: 2,
                v: 8,
                w: 13
            },
            7: {
                u: 3,
                v: 4,
                w: 10
            },
            8: {
                u: 3,
                v: 8,
                w: 8
            },
            9: {
                u: 5,
                v: 6,
                w: 10
            },
            10: {
                u: 6,
                v: 7,
                w: 10
            },
            11: {
                u: 7,
                v: 8,
                w: 10
            },
            12: {
                u: 8,
                v: 9,
                w: 10
            }
        }
    } else if (t == TESSELLATION) {
        if (e == VL) return {
            0: {
                x: 300,
                y: 25
            },
            1: {
                x: 300,
                y: 145
            },
            2: {
                x: 450,
                y: 85
            },
            3: {
                x: 600,
                y: 145
            },
            4: {
                x: 375,
                y: 265
            },
            5: {
                x: 600,
                y: 265
            },
            6: {
                x: 700,
                y: 25
            },
            7: {
                x: 740,
                y: 215
            },
            8: {
                x: 800,
                y: 95
            }
        };
        if (e == EL) return {
            0: {
                u: 0,
                v: 1,
                w: 8
            },
            1: {
                u: 0,
                v: 2,
                w: 12
            },
            2: {
                u: 1,
                v: 2,
                w: 13
            },
            3: {
                u: 1,
                v: 3,
                w: 25
            },
            4: {
                u: 4,
                v: 1,
                w: 9
            },
            5: {
                u: 2,
                v: 3,
                w: 14
            },
            6: {
                u: 2,
                v: 6,
                w: 21
            },
            7: {
                u: 3,
                v: 4,
                w: 20
            },
            8: {
                u: 3,
                v: 5,
                w: 8
            },
            9: {
                u: 3,
                v: 6,
                w: 12
            },
            10: {
                u: 3,
                v: 7,
                w: 12
            },
            11: {
                u: 3,
                v: 8,
                w: 16
            },
            12: {
                u: 4,
                v: 5,
                w: 19
            },
            13: {
                u: 5,
                v: 7,
                w: 11
            },
            14: {
                u: 6,
                v: 8,
                w: 11
            },
            15: {
                u: 7,
                v: 8,
                w: 9
            }
        }
    } else if (t == BELLMANFORD_KILLER) {
        if (e == VL) return {
            0: {
                x: 300,
                y: 25
            },
            1: {
                x: 375,
                y: 25
            },
            2: {
                x: 450,
                y: 25
            },
            3: {
                x: 525,
                y: 25
            },
            4: {
                x: 600,
                y: 25
            },
            5: {
                x: 675,
                y: 25
            },
            6: {
                x: 750,
                y: 25
            }
        };
        if (e == EL) return {
            0: {
                u: 5,
                v: 6,
                w: 1
            },
            1: {
                u: 4,
                v: 5,
                w: 2
            },
            2: {
                u: 3,
                v: 4,
                w: 3
            },
            3: {
                u: 2,
                v: 3,
                w: 4
            },
            4: {
                u: 1,
                v: 2,
                w: 5
            },
            5: {
                u: 0,
                v: 1,
                w: 6
            }
        }
    } else if (t == DIJKSTRA_KILLER) {
        if (e == VL) return {
            0: {
                x: 300,
                y: 125
            },
            1: {
                x: 350,
                y: 25
            },
            2: {
                x: 400,
                y: 125
            },
            3: {
                x: 450,
                y: 25
            },
            4: {
                x: 500,
                y: 125
            },
            5: {
                x: 550,
                y: 25
            },
            6: {
                x: 600,
                y: 125
            },
            7: {
                x: 650,
                y: 25
            },
            8: {
                x: 700,
                y: 125
            },
            9: {
                x: 750,
                y: 25
            },
            10: {
                x: 800,
                y: 125
            }
        };
        if (e == EL) return {
            0: {
                u: 1,
                v: 2,
                w: -32
            },
            1: {
                u: 3,
                v: 4,
                w: -16
            },
            2: {
                u: 5,
                v: 6,
                w: -8
            },
            3: {
                u: 7,
                v: 8,
                w: -4
            },
            4: {
                u: 9,
                v: 10,
                w: -2
            },
            5: {
                u: 0,
                v: 2,
                w: 0
            },
            6: {
                u: 2,
                v: 4,
                w: 0
            },
            7: {
                u: 4,
                v: 6,
                w: 0
            },
            8: {
                u: 6,
                v: 8,
                w: 0
            },
            9: {
                u: 8,
                v: 10,
                w: 0
            },
            10: {
                u: 8,
                v: 9,
                w: 1
            },
            11: {
                u: 6,
                v: 7,
                w: 2
            },
            12: {
                u: 4,
                v: 5,
                w: 4
            },
            13: {
                u: 2,
                v: 3,
                w: 8
            },
            14: {
                u: 0,
                v: 1,
                w: 16
            }
        }
    } else if (t == DAG) {
        if (e == VL) return {
            0: {
                x: 380,
                y: 95
            },
            1: {
                x: 500,
                y: 25
            },
            2: {
                x: 300,
                y: 225
            },
            3: {
                x: 600,
                y: 95
            },
            4: {
                x: 600,
                y: 225
            },
            5: {
                x: 700,
                y: 25
            }
        };
        if (e == EL) return {
            0: {
                u: 0,
                v: 1,
                w: 1
            },
            1: {
                u: 0,
                v: 2,
                w: 7
            },
            2: {
                u: 1,
                v: 3,
                w: 9
            },
            3: {
                u: 1,
                v: 5,
                w: 15
            },
            4: {
                u: 2,
                v: 4,
                w: 4
            },
            5: {
                u: 3,
                v: 4,
                w: 10
            },
            6: {
                u: 3,
                v: 5,
                w: 5
            },
            7: {
                u: 4,
                v: 5,
                w: 3
            }
        }
    } else if (t == FORDFULKERSON_KILLER) {
        if (e == VL) return {
            0: {
                x: 300,
                y: 125
            },
            1: {
                x: 400,
                y: 225
            },
            2: {
                x: 400,
                y: 25
            },
            3: {
                x: 500,
                y: 125
            }
        };
        if (e == EL) return {
            0: {
                u: 0,
                v: 1,
                w: 8
            },
            1: {
                u: 0,
                v: 2,
                w: 8
            },
            2: {
                u: 1,
                v: 3,
                w: 8
            },
            3: {
                u: 2,
                v: 3,
                w: 8
            },
            4: {
                u: 2,
                v: 1,
                w: 1
            }
        }
    } else if (t == DINIC_SHOWCASE) {
        if (e == VL) return {
            0: {
                x: 300,
                y: 125
            },
            1: {
                x: 500,
                y: 25
            },
            2: {
                x: 500,
                y: 75
            },
            3: {
                x: 450,
                y: 175
            },
            4: {
                x: 450,
                y: 225
            },
            5: {
                x: 450,
                y: 275
            },
            6: {
                x: 550,
                y: 175
            },
            7: {
                x: 550,
                y: 225
            },
            8: {
                x: 550,
                y: 275
            },
            9: {
                x: 700,
                y: 125
            }
        };
        if (e == EL) return {
            0: {
                u: 0,
                v: 9,
                w: 7
            },
            1: {
                u: 0,
                v: 1,
                w: 5
            },
            2: {
                u: 1,
                v: 9,
                w: 4
            },
            3: {
                u: 0,
                v: 2,
                w: 8
            },
            4: {
                u: 2,
                v: 9,
                w: 9
            },
            5: {
                u: 0,
                v: 3,
                w: 3
            },
            6: {
                u: 3,
                v: 6,
                w: 1
            },
            7: {
                u: 6,
                v: 9,
                w: 1
            },
            8: {
                u: 0,
                v: 4,
                w: 5
            },
            9: {
                u: 4,
                v: 7,
                w: 4
            },
            10: {
                u: 7,
                v: 9,
                w: 6
            },
            11: {
                u: 0,
                v: 5,
                w: 7
            },
            12: {
                u: 5,
                v: 8,
                w: 6
            },
            13: {
                u: 8,
                v: 9,
                w: 5
            },
            14: {
                u: 5,
                v: 7,
                w: 2
            },
            15: {
                u: 5,
                v: 6,
                w: 1
            }
        }
    } else if (t == MVC_U_TWO_APPROX_KILLER) {
        if (e == VL) return {
            0: {
                x: 300,
                y: 25,
                w: 2
            },
            1: {
                x: 300,
                y: 125,
                w: 3
            },
            2: {
                x: 300,
                y: 225,
                w: 4
            },
            3: {
                x: 300,
                y: 325,
                w: 7
            },
            4: {
                x: 400,
                y: 25,
                w: 1
            },
            5: {
                x: 400,
                y: 125,
                w: 5
            },
            6: {
                x: 400,
                y: 225,
                w: 6
            },
            7: {
                x: 400,
                y: 325,
                w: 9
            }
        };
        if (e == EL) return {
            0: {
                u: 0,
                v: 4,
                w: 1
            },
            1: {
                u: 1,
                v: 5,
                w: 1
            },
            2: {
                u: 2,
                v: 6,
                w: 1
            },
            3: {
                u: 3,
                v: 7,
                w: 1
            }
        }
    } else if (t == EXAMPLE_VERTEX_WEIGHTED_TREE) {
        if (e == VL) return {
            0: {
                x: 400,
                y: 25,
                w: 2
            },
            1: {
                x: 300,
                y: 100,
                w: 9
            },
            2: {
                x: 350,
                y: 100,
                w: 9
            },
            3: {
                x: 450,
                y: 100,
                w: 9
            },
            4: {
                x: 300,
                y: 175,
                w: 1
            },
            5: {
                x: 350,
                y: 175,
                w: 1
            },
            6: {
                x: 400,
                y: 175,
                w: 1
            },
            7: {
                x: 500,
                y: 175,
                w: 1
            },
            8: {
                x: 450,
                y: 250,
                w: 3
            },
            9: {
                x: 500,
                y: 250,
                w: 2
            },
            10: {
                x: 550,
                y: 250,
                w: 4
            },
            11: {
                x: 500,
                y: 325,
                w: 5
            },
            12: {
                x: 600,
                y: 325,
                w: 1
            }
        };
        if (e == EL) return {
            0: {
                u: 0,
                v: 1
            },
            1: {
                u: 0,
                v: 2
            },
            2: {
                u: 0,
                v: 3
            },
            3: {
                u: 1,
                v: 4
            },
            4: {
                u: 2,
                v: 5
            },
            5: {
                u: 3,
                v: 6
            },
            6: {
                u: 3,
                v: 7
            },
            7: {
                u: 7,
                v: 8
            },
            8: {
                u: 7,
                v: 9
            },
            9: {
                u: 7,
                v: 10
            },
            10: {
                u: 10,
                v: 11
            },
            11: {
                u: 10,
                v: 12
            }
        }
    } else if (t == MVC_W_TWO_APPROX_KILLER) {
        if (e == VL) return {
            0: {
                x: 400,
                y: 25,
                w: 5
            },
            1: {
                x: 300,
                y: 125,
                w: 1
            },
            2: {
                x: 350,
                y: 125,
                w: 2
            },
            3: {
                x: 400,
                y: 125,
                w: 2
            },
            4: {
                x: 450,
                y: 125,
                w: 3
            }
        };
        if (e == EL) return {
            0: {
                u: 0,
                v: 1
            },
            1: {
                u: 0,
                v: 2
            },
            2: {
                u: 0,
                v: 3
            },
            3: {
                u: 0,
                v: 4
            }
        }
    } else if (t == INTERESTING_BIPARTITE) {
        if (e == VL) return {
            0: {
                x: 300,
                y: 25,
                w: 2
            },
            1: {
                x: 300,
                y: 125,
                w: 3
            },
            2: {
                x: 300,
                y: 225,
                w: 4
            },
            3: {
                x: 400,
                y: 25,
                w: 7
            },
            4: {
                x: 400,
                y: 125,
                w: 1
            },
            5: {
                x: 400,
                y: 225,
                w: 5
            }
        };
        if (e == EL) return {
            0: {
                u: 0,
                v: 3,
                w: 1
            },
            1: {
                u: 0,
                v: 4,
                w: 1
            },
            2: {
                u: 2,
                v: 5,
                w: 1
            },
            3: {
                u: 1,
                v: 5,
                w: 1
            },
            4: {
                u: 0,
                v: 5,
                w: 1
            }
        }
    } else if (t == LINEAR_CHAIN) {
        if (e == VL) return {
            0: {
                x: 300,
                y: 25,
                w: 3
            },
            1: {
                x: 375,
                y: 25,
                w: 1
            },
            2: {
                x: 450,
                y: 25,
                w: 4
            },
            3: {
                x: 525,
                y: 25,
                w: 2
            },
            4: {
                x: 600,
                y: 25,
                w: 9
            },
            5: {
                x: 675,
                y: 25,
                w: 1
            },
            6: {
                x: 750,
                y: 25,
                w: 2
            },
            7: {
                x: 825,
                y: 25,
                w: 9
            }
        };
        if (e == EL) return {
            0: {
                u: 0,
                v: 1,
                w: 3
            },
            1: {
                u: 1,
                v: 2,
                w: 1
            },
            2: {
                u: 2,
                v: 3,
                w: 2
            },
            3: {
                u: 3,
                v: 4,
                w: 4
            },
            4: {
                u: 4,
                v: 5,
                w: 5
            },
            5: {
                u: 5,
                v: 6,
                w: 9
            },
            6: {
                u: 6,
                v: 7,
                w: 8
            }
        }
    } else if (t == CS4234_SAMPLE) {
        if (e == VL) return {
            0: {
                x: 300,
                y: 25,
                w: 1
            },
            1: {
                x: 400,
                y: 25,
                w: 1
            },
            2: {
                x: 500,
                y: 25,
                w: 1
            },
            3: {
                x: 600,
                y: 25,
                w: 1
            },
            4: {
                x: 400,
                y: 125,
                w: 1
            },
            5: {
                x: 500,
                y: 125,
                w: 1
            },
            6: {
                x: 600,
                y: 125,
                w: 1
            },
            7: {
                x: 600,
                y: 225,
                w: 1
            }
        };
        if (e == EL) return {
            0: {
                u: 0,
                v: 1,
                w: 1
            },
            1: {
                u: 1,
                v: 2,
                w: 1
            },
            2: {
                u: 1,
                v: 4,
                w: 1
            },
            3: {
                u: 2,
                v: 3,
                w: 1
            },
            4: {
                u: 2,
                v: 5,
                w: 1
            },
            5: {
                u: 3,
                v: 6,
                w: 1
            },
            6: {
                u: 4,
                v: 5,
                w: 1
            },
            7: {
                u: 5,
                v: 6,
                w: 1
            },
            8: {
                u: 6,
                v: 7,
                w: 1
            }
        }
    } else if (t == K8) {
        if (e == VL) return {
            0: {
                x: 400,
                y: 25
            },
            1: {
                x: 600,
                y: 25
            },
            2: {
                x: 700,
                y: 175
            },
            3: {
                x: 700,
                y: 325
            },
            4: {
                x: 600,
                y: 475
            },
            5: {
                x: 400,
                y: 475
            },
            6: {
                x: 300,
                y: 325
            },
            7: {
                x: 300,
                y: 175
            }
        };
        if (e == EL) return {
            0: {
                u: 0,
                v: 1,
                w: 13
            },
            1: {
                u: 0,
                v: 2,
                w: 13
            },
            2: {
                u: 0,
                v: 3,
                w: 12
            },
            3: {
                u: 0,
                v: 4,
                w: 12
            },
            4: {
                u: 0,
                v: 5,
                w: 13
            },
            5: {
                u: 0,
                v: 6,
                w: 14
            },
            6: {
                u: 0,
                v: 7,
                w: 12
            },
            7: {
                u: 1,
                v: 2,
                w: 14
            },
            8: {
                u: 1,
                v: 3,
                w: 14
            },
            9: {
                u: 1,
                v: 4,
                w: 13
            },
            10: {
                u: 1,
                v: 5,
                w: 14
            },
            11: {
                u: 1,
                v: 6,
                w: 13
            },
            12: {
                u: 1,
                v: 7,
                w: 12
            },
            13: {
                u: 2,
                v: 3,
                w: 13
            },
            14: {
                u: 2,
                v: 4,
                w: 13
            },
            15: {
                u: 2,
                v: 5,
                w: 12
            },
            16: {
                u: 2,
                v: 6,
                w: 12
            },
            17: {
                u: 2,
                v: 7,
                w: 12
            },
            18: {
                u: 3,
                v: 4,
                w: 13
            },
            19: {
                u: 3,
                v: 5,
                w: 13
            },
            20: {
                u: 3,
                v: 6,
                w: 13
            },
            21: {
                u: 3,
                v: 7,
                w: 13
            },
            22: {
                u: 4,
                v: 5,
                w: 13
            },
            23: {
                u: 4,
                v: 6,
                w: 12
            },
            24: {
                u: 4,
                v: 7,
                w: 13
            },
            25: {
                u: 5,
                v: 6,
                w: 12
            },
            26: {
                u: 5,
                v: 7,
                w: 12
            },
            27: {
                u: 6,
                v: 7,
                w: 12
            }
        }
    } else if (t == CS4234_TUTORIAL_THREE) {
        if (e == VL) return {
            0: {
                x: 300,
                y: 325
            },
            1: {
                x: 580,
                y: 325
            },
            2: {
                x: 580,
                y: 145
            },
            3: {
                x: 480,
                y: 85
            },
            4: {
                x: 360,
                y: 85
            },
            5: {
                x: 600,
                y: 25
            }
        };
        if (e == EL) return {
            0: {
                u: 1,
                v: 0,
                w: 28
            },
            1: {
                u: 2,
                v: 0,
                w: 33
            },
            2: {
                u: 3,
                v: 0,
                w: 30
            },
            3: {
                u: 4,
                v: 0,
                w: 25
            },
            4: {
                u: 0,
                v: 5,
                w: 42
            },
            5: {
                u: 2,
                v: 1,
                w: 18
            },
            6: {
                u: 3,
                v: 1,
                w: 26
            },
            7: {
                u: 4,
                v: 1,
                w: 33
            },
            8: {
                u: 5,
                v: 1,
                w: 30
            },
            9: {
                u: 3,
                v: 2,
                w: 12
            },
            10: {
                u: 4,
                v: 2,
                w: 23
            },
            11: {
                u: 5,
                v: 2,
                w: 12
            },
            12: {
                u: 4,
                v: 3,
                w: 12
            },
            13: {
                u: 5,
                v: 3,
                w: 13
            },
            14: {
                u: 5,
                v: 4,
                w: 25
            }
        }
    } else if (t == WHEEL) {
        if (e == VL) return {
            0: {
                x: 400,
                y: 125
            },
            1: {
                x: 400,
                y: 225
            },
            2: {
                x: 300,
                y: 125
            },
            3: {
                x: 400,
                y: 25
            },
            4: {
                x: 500,
                y: 125
            }
        };
        if (e == EL) return {
            0: {
                u: 0,
                v: 1,
                w: 13
            },
            1: {
                u: 0,
                v: 2,
                w: 13
            },
            2: {
                u: 0,
                v: 3,
                w: 13
            },
            3: {
                u: 0,
                v: 4,
                w: 13
            },
            4: {
                u: 1,
                v: 2,
                w: 13
            },
            5: {
                u: 2,
                v: 3,
                w: 13
            },
            6: {
                u: 3,
                v: 4,
                w: 13
            },
            7: {
                u: 4,
                v: 1,
                w: 13
            }
        }
    } else if (t == K4) {
        if (e == VL) return {
            0: {
                x: 400,
                y: 25
            },
            1: {
                x: 300,
                y: 225
            },
            2: {
                x: 500,
                y: 225
            },
            3: {
                x: 400,
                y: 165
            }
        };
        if (e == EL) return {
            0: {
                u: 1,
                v: 2,
                w: 25
            },
            1: {
                u: 1,
                v: 3,
                w: 13
            },
            2: {
                u: 1,
                v: 0,
                w: 25
            },
            3: {
                u: 2,
                v: 3,
                w: 13
            },
            4: {
                u: 2,
                v: 0,
                w: 25
            },
            5: {
                u: 3,
                v: 0,
                w: 13
            }
        }
    } else if (t == HOUSE_OF_CARDS) {
        if (e == VL) return {
            0: {
                x: 450,
                y: 25
            },
            1: {
                x: 400,
                y: 105
            },
            2: {
                x: 500,
                y: 105
            },
            3: {
                x: 350,
                y: 175
            },
            4: {
                x: 450,
                y: 175
            },
            5: {
                x: 550,
                y: 175
            },
            6: {
                x: 300,
                y: 265
            },
            7: {
                x: 400,
                y: 265
            },
            8: {
                x: 500,
                y: 265
            },
            9: {
                x: 600,
                y: 265
            }
        };
        if (e == EL) return {
            0: {
                u: 0,
                v: 1,
                w: 1
            },
            1: {
                u: 1,
                v: 3,
                w: 1
            },
            2: {
                u: 3,
                v: 6,
                w: 1
            },
            3: {
                u: 6,
                v: 7,
                w: 1
            },
            4: {
                u: 7,
                v: 8,
                w: 1
            },
            5: {
                u: 8,
                v: 9,
                w: 1
            },
            6: {
                v: 5,
                u: 9,
                w: 1
            },
            7: {
                v: 4,
                u: 5,
                w: 1
            },
            8: {
                v: 3,
                u: 4,
                w: 1
            },
            9: {
                v: 2,
                u: 4,
                w: 1
            },
            10: {
                v: 1,
                u: 2,
                w: 1
            },
            11: {
                u: 0,
                v: 2,
                w: 1
            },
            12: {
                u: 2,
                v: 5,
                w: 1
            },
            13: {
                u: 1,
                v: 4,
                w: 1
            },
            14: {
                u: 4,
                v: 7,
                w: 1
            },
            15: {
                u: 4,
                v: 8,
                w: 1
            },
            16: {
                u: 3,
                v: 7,
                w: 1
            },
            17: {
                u: 5,
                v: 8,
                w: 1
            }
        }
    } else if (t == FMOD) {
        if (e == VL) return {
            7: {
                x: 300,
                y: 25
            },
            0: {
                x: 420,
                y: 25
            },
            1: {
                x: 540,
                y: 25
            },
            6: {
                x: 420,
                y: 125
            },
            2: {
                x: 540,
                y: 125
            },
            3: {
                x: 660,
                y: 125
            },
            4: {
                x: 540,
                y: 225
            },
            5: {
                x: 660,
                y: 225
            }
        };
        if (e == EL) return {
            0: {
                v: 7,
                u: 0,
                w: 1
            },
            1: {
                v: 0,
                u: 1,
                w: 1
            },
            2: {
                v: 1,
                u: 3,
                w: 1
            },
            3: {
                v: 3,
                u: 2,
                w: 1
            },
            4: {
                u: 3,
                v: 5,
                w: 1
            },
            5: {
                u: 2,
                v: 1,
                w: 1
            },
            6: {
                u: 2,
                v: 4,
                w: 1
            },
            7: {
                v: 4,
                u: 5,
                w: 1
            },
            8: {
                u: 4,
                v: 6,
                w: 1
            },
            9: {
                v: 6,
                u: 0,
                w: 1
            }
        }
    } else if (t == GREEDY_AUGMENTING_PATH_KILLER) {
        if (e == VL) return {
            0: {
                x: 300,
                y: 25,
                w: 2
            },
            1: {
                x: 300,
                y: 75,
                w: 3
            },
            2: {
                x: 300,
                y: 125,
                w: 4
            },
            3: {
                x: 300,
                y: 175,
                w: 2
            },
            4: {
                x: 300,
                y: 225,
                w: 3
            },
            5: {
                x: 300,
                y: 275,
                w: 4
            },
            6: {
                x: 400,
                y: 25,
                w: 7
            },
            7: {
                x: 400,
                y: 75,
                w: 1
            },
            8: {
                x: 400,
                y: 125,
                w: 5
            },
            9: {
                x: 400,
                y: 175,
                w: 5
            },
            10: {
                x: 400,
                y: 225,
                w: 5
            },
            11: {
                x: 400,
                y: 275,
                w: 5
            }
        };
        if (e == EL) return {
            0: {
                u: 0,
                v: 6,
                w: 1
            },
            1: {
                u: 0,
                v: 7,
                w: 1
            },
            2: {
                u: 1,
                v: 6,
                w: 1
            },
            3: {
                u: 2,
                v: 8,
                w: 1
            },
            4: {
                u: 2,
                v: 9,
                w: 1
            },
            5: {
                u: 3,
                v: 8,
                w: 1
            },
            6: {
                u: 4,
                v: 10,
                w: 1
            },
            7: {
                u: 4,
                v: 11,
                w: 1
            },
            8: {
                u: 5,
                v: 10,
                w: 1
            }
        }
    } else if (t == K55) {
        if (e == VL) return {
            0: {
                x: 300,
                y: 25,
                w: 2
            },
            1: {
                x: 300,
                y: 100,
                w: 3
            },
            2: {
                x: 300,
                y: 175,
                w: 4
            },
            3: {
                x: 300,
                y: 250,
                w: 2
            },
            4: {
                x: 300,
                y: 325,
                w: 3
            },
            5: {
                x: 400,
                y: 25,
                w: 7
            },
            6: {
                x: 400,
                y: 100,
                w: 1
            },
            7: {
                x: 400,
                y: 175,
                w: 5
            },
            8: {
                x: 400,
                y: 250,
                w: 5
            },
            9: {
                x: 400,
                y: 325,
                w: 5
            }
        };
        if (e == EL) return {
            0: {
                u: 0,
                v: 5,
                w: 1
            },
            1: {
                u: 0,
                v: 6,
                w: 1
            },
            2: {
                u: 0,
                v: 7,
                w: 1
            },
            3: {
                u: 0,
                v: 8,
                w: 1
            },
            4: {
                u: 0,
                v: 9,
                w: 1
            },
            5: {
                u: 1,
                v: 5,
                w: 1
            },
            6: {
                u: 1,
                v: 6,
                w: 1
            },
            7: {
                u: 1,
                v: 7,
                w: 1
            },
            8: {
                u: 1,
                v: 8,
                w: 1
            },
            9: {
                u: 1,
                v: 9,
                w: 1
            },
            10: {
                u: 2,
                v: 5,
                w: 1
            },
            11: {
                u: 2,
                v: 6,
                w: 1
            },
            12: {
                u: 2,
                v: 7,
                w: 1
            },
            13: {
                u: 2,
                v: 8,
                w: 1
            },
            14: {
                u: 2,
                v: 9,
                w: 1
            },
            15: {
                u: 3,
                v: 5,
                w: 1
            },
            16: {
                u: 3,
                v: 6,
                w: 1
            },
            17: {
                u: 3,
                v: 7,
                w: 1
            },
            18: {
                u: 3,
                v: 8,
                w: 1
            },
            19: {
                u: 3,
                v: 9,
                w: 1
            },
            20: {
                u: 4,
                v: 5,
                w: 1
            },
            21: {
                u: 4,
                v: 6,
                w: 1
            },
            22: {
                u: 4,
                v: 7,
                w: 1
            },
            23: {
                u: 4,
                v: 8,
                w: 1
            },
            24: {
                u: 4,
                v: 9,
                w: 1
            }
        }
    } else if (t == K55_ALMOST) {
        if (e == VL) return {
            0: {
                x: 300,
                y: 25,
                w: 2
            },
            1: {
                x: 300,
                y: 100,
                w: 3
            },
            2: {
                x: 300,
                y: 175,
                w: 4
            },
            3: {
                x: 300,
                y: 250,
                w: 2
            },
            4: {
                x: 300,
                y: 325,
                w: 3
            },
            5: {
                x: 400,
                y: 25,
                w: 7
            },
            6: {
                x: 400,
                y: 100,
                w: 1
            },
            7: {
                x: 400,
                y: 175,
                w: 5
            },
            8: {
                x: 400,
                y: 250,
                w: 5
            },
            9: {
                x: 400,
                y: 325,
                w: 5
            }
        };
        if (e == EL) return {
            0: {
                u: 0,
                v: 5,
                w: 1
            },
            1: {
                u: 0,
                v: 6,
                w: 1
            },
            2: {
                u: 0,
                v: 8,
                w: 1
            },
            3: {
                u: 0,
                v: 9,
                w: 1
            },
            4: {
                u: 1,
                v: 6,
                w: 1
            },
            5: {
                u: 1,
                v: 7,
                w: 1
            },
            6: {
                u: 1,
                v: 8,
                w: 1
            },
            7: {
                u: 2,
                v: 5,
                w: 1
            },
            8: {
                u: 2,
                v: 6,
                w: 1
            },
            9: {
                u: 2,
                v: 7,
                w: 1
            },
            10: {
                u: 2,
                v: 8,
                w: 1
            },
            11: {
                u: 2,
                v: 9,
                w: 1
            },
            12: {
                u: 3,
                v: 5,
                w: 1
            },
            13: {
                u: 3,
                v: 7,
                w: 1
            },
            14: {
                u: 3,
                v: 8,
                w: 1
            },
            15: {
                u: 3,
                v: 9,
                w: 1
            },
            16: {
                u: 4,
                v: 5,
                w: 1
            }
        }
    }
}

function deepCopy(t) {
    var e, r;
    if (t instanceof Array)
        for (e = [], r = 0; r < t.length; r++) e.push(deepCopy(t[r]));
    else if (t instanceof Object)
        for (keys in e = {}, t) e[keys] = deepCopy(t[keys]);
    else e = t;
    return e
}
const MAIN_SVG_WIDTH = 1e3,
    MAIN_SVG_HEIGHT = 600,
    PSEUDOCODE_SVG_WIDTH = 300,
    PSEUDOCODE_SVG_HEIGHT = 400,
    graphVertexProperties = {
        innerVertex: {
            r: 14,
            width: 30,
            height: 30,
            "stroke-width": 0,
            default: {
                fill: "#eee",
                stroke: "#fff"
            },
            "leaf-default": {
                fill: "#ff0",
                stroke: "#fff"
            },
            lazy: {
                fill: "#eee",
                stroke: "#fff"
            },
            "leaf-lazy": {
                fill: "#ff0",
                stroke: "#fff"
            },
            normal_blue: {
                fill: "#2ebbd1",
                stroke: "#fff"
            },
            highlighted: {
                fill: "#ff8a27",
                stroke: "#fff"
            },
            highlighted_rect: {
                fill: "#ff8a27",
                stroke: "#fff"
            },
            traversed: {
                fill: "#eee",
                stroke: "#fff"
            },
            result: {
                fill: "#f7e81e",
                stroke: "#fff"
            },
            rect: {
                fill: "#eee",
                stroke: "#fff"
            },
            result_rect: {
                fill: "#52bc69",
                stroke: "#fff"
            },
            greenFill: {
                fill: "#52bc69",
                stroke: "#fff"
            },
            greenOutline: {
                fill: "#eee",
                stroke: "#fff"
            },
            pinkFill: {
                fill: "#ed5a7d",
                stroke: "#fff"
            },
            pinkOutline: {
                fill: "#eee",
                stroke: "#fff"
            },
            blueFill: {
                fill: "#2ebbd1",
                stroke: "#fff"
            },
            blueOutline: {
                fill: "#eee",
                stroke: "#fff"
            },
            redFill: {
                fill: "#d9513c",
                stroke: "#fff"
            },
            redOutline: {
                fill: "#eee",
                stroke: "#fff"
            },
            greyFill: {
                fill: "#cccccc",
                stroke: "#fff"
            },
            greyOutline: {
                fill: "#eee",
                stroke: "#fff"
            }
        },
        outerVertex: {
            r: 16,
            width: 32,
            height: 32,
            "stroke-width": 2,
            default: {
                fill: "#333",
                stroke: "#333"
            },
            "leaf-default": {
                fill: "#333",
                stroke: "#333"
            },
            lazy: {
                fill: "#8b00ff",
                stroke: "#8b00ff"
            },
            "leaf-lazy": {
                fill: "#8b00ff",
                stroke: "#8b00ff"
            },
            normal_blue: {
                fill: "#2ebbd1",
                stroke: "#333"
            },
            highlighted: {
                fill: "#ff8a27",
                stroke: "#ff8a27"
            },
            highlighted_rect: {
                fill: "#ff8a27",
                stroke: "#333"
            },
            traversed: {
                fill: "#ff8a27",
                stroke: "#ff8a27"
            },
            result: {
                fill: "#f7e81e",
                stroke: "#f7e81e"
            },
            rect: {
                fill: "#333",
                stroke: "#333"
            },
            result_rect: {
                fill: "#52bc69",
                stroke: "#333"
            },
            greenFill: {
                fill: "#52bc69",
                stroke: "#52bc69"
            },
            greenOutline: {
                fill: "#52bc69",
                stroke: "#52bc69"
            },
            pinkFill: {
                fill: "#ed5a7d",
                stroke: "#ed5a7d"
            },
            pinkOutline: {
                fill: "#ed5a7d",
                stroke: "#ed5a7d"
            },
            blueFill: {
                fill: "#2ebbd1",
                stroke: "#2ebbd1"
            },
            blueOutline: {
                fill: "#2ebbd1",
                stroke: "#2ebbd1"
            },
            redFill: {
                fill: "#d9513c",
                stroke: "#d9513c"
            },
            redOutline: {
                fill: "#d9513c",
                stroke: "#d9513c"
            },
            greyFill: {
                fill: "#cccccc",
                stroke: "#cccccc"
            },
            greyOutline: {
                fill: "#cccccc",
                stroke: "#cccccc"
            }
        },
        text: {
            "font-size": 16,
            "font-sizes": [16, 16, 15, 13, 9, 9],
            default: {
                fill: "#333",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            },
            "leaf-default": {
                fill: "#333",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            },
            lazy: {
                fill: "#333",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            },
            "leaf-lazy": {
                fill: "#333",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            },
            normal_blue: {
                fill: "#fff",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            },
            highlighted: {
                fill: "#fff",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            },
            highlighted_rect: {
                fill: "#fff",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "left"
            },
            traversed: {
                fill: "#ff8a27",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            },
            result: {
                fill: "#fff",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            },
            rect: {
                fill: "#333",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "left"
            },
            result_rect: {
                fill: "#fff",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "left"
            },
            greenFill: {
                fill: "#fff",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            },
            greenOutline: {
                fill: "#52bc69",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            },
            pinkFill: {
                fill: "#fff",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            },
            pinkOutline: {
                fill: "#ed5a7d",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            },
            blueFill: {
                fill: "#fff",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            },
            blueOutline: {
                fill: "#2ebbd1",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            },
            redFill: {
                fill: "#fff",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            },
            redOutline: {
                fill: "#d9513c",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            },
            greyFill: {
                fill: "#fff",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            },
            greyOutline: {
                fill: "#cccccc",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            }
        },
        label: {
            "font-size": 16,
            default: {
                fill: "#333",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            },
            lazy: {
                fill: "#333",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            },
            normal_blue: {
                fill: "#fff",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            },
            highlighted: {
                fill: "#ff8a27",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            },
            highlighted_rect: {
                fill: "#fff",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "left"
            },
            traversed: {
                fill: "#ff8a27",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            },
            result: {
                fill: "#fff",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            },
            rect: {
                fill: "#333",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "left"
            },
            result_rect: {
                fill: "#fff",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "left"
            },
            greenFill: {
                fill: "#fff",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            },
            greenOutline: {
                fill: "#52bc69",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            },
            pinkFill: {
                fill: "#fff",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            },
            pinkOutline: {
                fill: "#ed5a7d",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            },
            blueFill: {
                fill: "#fff",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            },
            blueOutline: {
                fill: "#2ebbd1",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            },
            redFill: {
                fill: "#fff",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            },
            redOutline: {
                fill: "#d9513c",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            },
            greyFill: {
                fill: "#fff",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            },
            greyOutline: {
                fill: "#cccccc",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            }
        }
    },
    graphEdgeProperties = {
        animateHighlightedPath: {
            stroke: "#ff8a27",
            "stroke-width": 10
        },
        path: {
            "stroke-width": 3,
            default: {
                stroke: "#333"
            },
            highlighted: {
                stroke: "#ff8a27"
            },
            traversed: {
                stroke: "#ff8a27"
            },
            green: {
                stroke: "#52bc69"
            },
            pink: {
                stroke: "#ed5a7d"
            },
            blue: {
                stroke: "#2ebbd1"
            },
            red: {
                stroke: "#d9513c"
            },
            grey: {
                stroke: "#cccccc"
            }
        },
        weight: {
            "font-size": 16,
            default: {
                startOffset: "75%",
                dy: -5,
                fill: "#333",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            },
            highlighted: {
                startOffset: "75%",
                dy: -5,
                fill: "#ff8a27",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            },
            traversed: {
                startOffset: "75%",
                dy: -5,
                fill: "#ff8a27",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            },
            green: {
                startOffset: "75%",
                dy: -5,
                fill: "#52bc69",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            },
            pink: {
                startOffset: "75%",
                dy: -5,
                fill: "#ed5a7d",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            },
            blue: {
                startOffset: "75%",
                dy: -5,
                fill: "#2ebbd1",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            },
            red: {
                startOffset: "75%",
                dy: -5,
                fill: "#d9513c",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            },
            grey: {
                startOffset: "75%",
                dy: -5,
                fill: "#cccccc",
                "font-family": "'PT Sans', sans-serif",
                "font-weight": "bold",
                "text-anchor": "middle"
            }
        }
    },
    graphPolygonProperties = {
        polygon: {
            "stroke-width": 0,
            default: {
                fill: "#eee",
                opacity: 1
            },
            hidden: {
                fill: "#fff",
                opacity: 0
            },
            greenFill: {
                fill: "#52bc69",
                opacity: 1
            },
            greenTransparent: {
                fill: "#52bc69",
                opacity: .5
            },
            pinkFill: {
                fill: "#ed5a7d",
                opacity: 1
            },
            pinkTransparent: {
                fill: "#ed5a7d",
                opacity: .5
            },
            blueFill: {
                fill: "#2ebbd1",
                opacity: 1
            },
            blueTransparent: {
                fill: "#2ebbd1",
                opacity: .5
            },
            redFill: {
                fill: "#d9513c",
                opacity: 1
            },
            redTransparent: {
                fill: "#d9513c",
                opacity: .5
            },
            greyFill: {
                fill: "#cccccc",
                opacity: 1
            },
            greyTransparent: {
                fill: "#cccccc",
                opacity: .5
            }
        }
    },
    ARROW_MARKER_WIDTH = 3,
    ARROW_MARKER_HEIGHT = 3,
    ARROW_REFX = 9,
    ARROW_FILL = "#333";
var mainSvg = d3.select("#viz").append("svg").attr("width", 1e3).attr("height", 600),
    pseudocodeSvg = d3.select("#pseudocode").append("svg").attr("width", 300).attr("height", 400);