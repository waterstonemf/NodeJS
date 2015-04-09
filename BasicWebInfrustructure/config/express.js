/**
 * Module dependencies.
 */
var express = require('express');
var MemoryStore = require('connect').session.MemoryStore;

module.exports = function (app, config) {
	  app.set('showStackError', true)
	  app.use(express.static(config.root + '/apps'))
  	//app.use(express.logger('dev'))

  	// set views path, template engine and default layout
  	app.set('views', config.root + '/apps')
  	app.set('view engine', 'ejs')
    app.set('view options', { layout: false })

  	app.configure(function () {
    	// cookieParser should be above session
    	app.use(express.cookieParser())
    	// bodyParser should be above methodOverride
    	app.use(express.bodyParser())
    	app.use(express.methodOverride())

    	// express session storage
    	app.use(express.session({
   			 secret: "MobileReportViewer secret key",
    		 store: new MemoryStore()
  		}));

    	// routes should be at the last
    	app.use(app.router)

    	// assume "not found" in the error msgs
    	// is a 404. this is somewhat silly, but
    	// valid, you can do whatever you like, set
    	// properties, use instanceof etc.
    	app.use(function(err, req, res, next){
     		 // treat as 404
      		//if (~err.message.indexOf('not found')) return next()

      		// log it
      		//console.error(err.stack)

      		// error page
      		//res.status(500).render('500', { error: err.stack })
    	})

    	// assume 404 since no middleware responded
    	//app.use(function(req, res, next){
      		//res.status(404).render('404', { url: req.originalUrl })
    	//})
  })
}