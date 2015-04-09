module.exports = {
    development: {
        root: require('path').normalize(__dirname + '/..'),
        app: {
            name: 'Mobie Report Viewer'
        },
        BusinessServer: {
            host: 'localhost',
            port:'8010'
        },
    }
  , test: {

}
  , production: {

}
}