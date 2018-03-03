const urls = require("./urls");

const setFileFolder = file => {
  const filename = file.replace(/^.*[\\\/]/, '')

  return file
    .replace(urls.dev.media, "")
    .replace(filename, "")
}

const getRelativePath = (path, context = urls.dev.base) => path.replace(context, '')


module.exports = { setFileFolder, getRelativePath };
