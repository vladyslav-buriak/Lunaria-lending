(function() {
  var i, len, page, qunitHooks, timeout, url, urls;

  urls = require('system').args.slice(1);

  page = require('webpage').create();

  timeout = 3000;

  qunitHooks = function() {
    return window.document.addEventListener('DOMContentLoaded', function() {
      var callback, i, len, ref, results;
      ref = ['log', 'testDone', 'done'];
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        callback = ref[i];
        results.push((function(callback) {
          return QUnit[callback](function(result) {
            return window.callPhantom({
              name: "QUnit." + callback,
              data: result
            });
          });
        })(callback));
      }
      return results;
    });
  };

  page.onInitialized = function() {
    return page.evaluate(qunitHooks);
  };

  page.onConsoleMessage = function(msg) {
    return console.log(msg);
  };

  page.onCallback = function(event) {
    var details, res, result;
    if (event.name === 'QUnit.log') {
      details = event.data;
      if (details.result === false) {
        console.log("✘ " + details.module + ": " + details.name);
        if (details.message && details.message !== "failed") {
          console.log("  " + details.message);
        }
        if ("actual" in details) {
          console.log("  expected: " + details.expected);
          return console.log("    actual: " + details.actual);
        }
      }
    } else if (event.name === 'QUnit.testDone') {
      result = event.data;
      if (!result.failed) {
        return console.log("✔︎ " + result.module + ": " + result.name);
      }
    } else if (event.name === 'QUnit.done') {
      res = event.data;
      console.log(res.total + " tests, " + res.failed + " failed. Done in " + res.runtime + " ms");
      return phantom.exit(!res.total || res.failed ? 1 : 0);
    }
  };

  for (i = 0, len = urls.length; i < len; i++) {
    url = urls[i];
    page.open(url, function(status) {
      if (status !== 'success') {
        console.error("failed opening " + url + ": " + status);
        return phantom.exit(1);
      } else {
        return setTimeout(function() {
          console.error("ERROR: Test execution has timed out");
          return phantom.exit(1);
        }, timeout);
      }
    });
  }

}).call(this);
