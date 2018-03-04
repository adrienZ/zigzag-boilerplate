const urls = require("./urls");
const path = require("path");

const setFileFolder = file => {
  const filename = path.basename(file)

  return file
    .replace(urls.dev.base, "")
    .replace(filename, "")
}

const getRelativePath = (path, context = urls.dev.base) => path.replace(context, '')


const manifestDataFormatter = file => {
  return file

  // if needed
  file.name = file.isModuleAsset ?
    getRelativePath(urls.prod.base + setFileFolder(file.name), urls.prod.media) + path.basename(file.name)
    : file.name
  return file
}


module.exports = { setFileFolder, getRelativePath, manifestDataFormatter };
