const fs = require('fs')
const urls = require('./urls')

/*
// =======================================================================//
//                                                                        //
// !  JAVASCRIPT ENTRIES                                                  //
//                                                                        //
// *  2 modes: one entry main.js or multi entries: { multi: true }        //
// *  in multi mode, return all the js files at the root of app/js        //
// *  🚨 WARNING: by default all entries will be injected by the          //
// *  🚨 html-webpack-plugin, use excludeChunks option                    //
//                                                                        //
// * this will be the entry of our webpack configuration                  //
//                                                                        //
// =======================================================================//
*/

const scripts = (options = {}) => {
  const jsPath = urls.aliases['@js']

  if (options.multi) {
    let SCRIPTS = {}
    fs.readdirSync(jsPath)
      .filter(file => file.match(/.js/))
      .map(path => {
        const bundle_name = path.replace('.js', '')
        // add suffix _bundle to script name
        SCRIPTS[bundle_name + '_bundle'] = [jsPath + '/' + path]
      })
    return SCRIPTS
  }

  return { main_bundle: [`${jsPath}/main`] }
}

/*
// =======================================================================//
//                                                                        //
// !  IMAGES ENTRIES                                                      //
//                                                                        //
// *  List all files in a dir via Node.js recursively and synchronously   //
// *  🙈 importing your images in js so webpack detect it is painfull     //
// * plus it had lot of complexity compared to a backend                  //
// * or url often break between webpack-dev-server and prod               //
// * because of the ✨ url-checking feature from css-loader               //
//                                                                        //
// * this will be added to the entries of our webpack configuration       //
//                                                                        //
// =======================================================================//
*/

const walkSync = (dir, filelist = {}) => {
  const files = fs.readdirSync(dir)
  let resfilelist = filelist
  files.forEach((file, index) => {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      resfilelist = walkSync(`${dir}/${file}/`, resfilelist)
    } else {
      if (file.split('.')[0])
        resfilelist['.to_delete/' + index + '_' + file] =
          urls.aliases['@img'] + '/' + file
    }
  })
  return resfilelist
}
const imgs = () => walkSync(urls.aliases['@img'])

/*
// =======================================================================//
//                                                                        //
// !  VIEWS ENTRIES                                                       //
//                                                                        //
// *  turn .ejs files at the root of /app/ into html files                //
// *  .ejs files in subfolders can still be use without getting complied  //
//                                                                        //
// =======================================================================//
*/

const views = () =>
  fs.readdirSync(urls.dev.root).filter(file => file.match(/.ejs$/))

module.exports = { scripts, views, imgs: imgs() }
