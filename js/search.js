var source = "https://raw.githubusercontent.com/fisherman/index/master/index"

var plugins = []
var options = {
    keys: ["title", "author", "desc", "tagstring"],
    distance: 800,
    location: 0,
    threshold: 0.2,
    shouldSort: true,
    includeScore: false,
    caseSensitive: false,
    maxPatternLength: 32
}

var fusePlugins

var runSearch = function(items, searchItem) {

  var not_found = "<h1>:(</h1>"
  var s = searchItem || $("#search").val()
  var output = ""
  var results
  var max_results = 40

  $("#results").html("")

    switch (s) {
      case "":
        return

      case "*":
        s = " "
        break
    }

  results = items.search(s, options)

    if (!results || results.length == 0) {
      $("#results").html('<div id="result">' + not_found + '</div>')
        return
    }

  $.each(results.slice(0,max_results), function(key, val) {

    output += '<div id="result">'

    var icons = ""

    for (var i = 0; i < val.tags.length; i++) {

      if (val.tags[i] === "prompt") {
        icons += '<i id="glyph" class="fa fa-terminal"></i>'
        output += icons
        break
      }
    }

    if (icons === "") {
      output += "<i id=\"glyph\" class=\"fa fa-cube\"></i>"
    }

    output += "<h1><a class=\"search-link\" target=\"_blank\" href=\"" + val.url + "\">" + val.title + "</a></h1>"
    output += "<p id=\"desc\">" + val.desc + "</p>"
    output += '<div id="tags">'

    for (var j = 0; j < val.tags.length; j++) {
      var name = val.tags[j]
      output += "<span class=\"tag\" onclick=\"setVal('"+name+"')\">" + name + '</span>'
    }

    output += '</div></div>'
    $("#results").html(output)

  })
}

var setVal = function(item) {

  $("html, body").animate({
    scrollTop: $("#search").offset().top - 10
  }, {
    duration: 800,
    done: function() {
      runSearch(fusePlugins)
      $("#search").val(item)
    }
  })
}

$.get(source, function(data) {
  var plugs = data.split("\n\n")

    for (var i=0; i<plugs.length; i++) {
      var dat = plugs[i].split("\n")

        plugins.push({
          "title" : dat[0],
          "url": dat[1],
          "desc": dat[2],
          "tagstring": dat[3],
          "tags": dat[3].trim().split(" "),
          "author": dat[4]
        })
    }

  fusePlugins = new Fuse(plugins, options)

    $("#searchdiv")
        .html("<input type=\"search\" name=\"search\" class=\"form-control\" id=\"search\" placeholder=\"Search "
            + plugins.length + " Plugins...\"/><div id=\"results\"></div>")

    $("#search").on("input", function(){
      runSearch(fusePlugins)
    })

    $(document).ready(function(){
        $("#search").val("*")
        runSearch(fusePlugins)
    })
})
