const getHashedScriptIntoTheBundle = function() {
  this.plugin("done", function(statsData) {
    const stats = statsData.toJson();

    if (!stats.errors.length) {
      entries.VIEWS.map(view => {
        const htmlFileName = view.options.filename;
        const html = fs.readFileSync(
          path.resolve(urls.APP_URL, htmlFileName),
          "utf8"
        );
        const bundle_name = Object.keys(stats.assetsByChunkName)[0];

        let htmlOutput = html;

        const jsRegexp = new RegExp(
          "<script\\s+src=([\"'])(.+?)" + bundle_name + "\\.js\\1",
          "i"
        );
        if (
          stats.assetsByChunkName[bundle_name].indexOf(".js") &&
          htmlOutput.match(jsRegexp) !== null
        ) {
          htmlOutput = htmlOutput.replace(
            jsRegexp,
            "<script src=$1$2" + stats.assetsByChunkName[bundle_name] + "$1"
          );
          fs.writeFileSync(
            path.resolve(urls.DIST_URL, htmlFileName),
            htmlOutput
          );
        }
      });
    }
  });
};

// !env.fullJsApp && mainConfigPlugins.push(getHashedScriptIntoTheBundle);
// !env.fullJsApp && staticSassConfigPlugins.push(getHashedStylesIntoTheBundle);