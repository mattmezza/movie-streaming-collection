module.exports = function (db) {
  var listGenres = function () {
    return new Promise(function (resolve, reject) {
      var genres = new Set()
      db.map(function (movie) {
        movie.genres.map(function (genre) {
          genres.add(genre)
        })
      })
      resolve(Array.from(genres))
    })
  }
  var filterTitle = function (requestedTitle, lang) {
    lang = lang || 'en'
    return new Promise(function (resolve, reject) { 
      resolve(db.filter(function (movie) {
        if (typeof movie.title[lang] !== 'string') {
          reject('There is no title for lang ' + lang)
        }
        return movie.title[lang].indexOf(requestedTitle) !== -1
      }))
    })
  }
  var filterActors = function (actor) { return [] }
  var search = function (query, lang) {
    lang = lang || 'en'
    return filterTitle(query, lang)
  }
  return {
    listGenres: listGenres,
    filterTitle: filterTitle,
    filterActors: filterActors,
    search: search
  }
}

