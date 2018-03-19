const urls = require("./urls");
const path = require("path");

const setFileFolder = file => {
  const filename = path.basename(file)

  const tt = file
    .replace(urls.dev.base, "")
    .replace(filename, "")

  console.log("TRY", path.relative(urls.dev.base, file))
  console.log("GET", tt)

  return tt;
}

module.exports = { setFileFolder };
