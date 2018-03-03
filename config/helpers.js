const urls = require("./urls");

const setFileFolder = file => {
  const filename = file.replace(/^.*[\\\/]/, '')

  return file
    .replace(urls.APP_ASSETS_URL + "media/", "")
    .replace(filename, "")
}

const getRelativePath = (path, context = urls.APP_URL) => path.replace(context, '')


module.exports = { setFileFolder, getRelativePath };
