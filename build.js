const handlebars  = require('handlebars');
const Metalsmith  = require('metalsmith');
const collections = require('metalsmith-collections');
const concat      = require('metalsmith-concat');
const feed        = require('metalsmith-feed');
const layouts     = require('metalsmith-layouts');
const less        = require('metalsmith-less');
const permalinks  = require('metalsmith-permalinks');
const tags        = require('metalsmith-tags');
const make_mathjax_css = require('./plugins/make-mathjax-css');
const markdown         = require('./plugins/markdown');
const post_permalinks  = require('./plugins/post-permalinks');

const months = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

handlebars.registerHelper('formatDate', function(date) {
  return ('0' + date.getDate()).slice(-2) + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
});

handlebars.registerHelper('isoDate', function(date) {
  return date.toISOString().substr(0, 10);
});

Metalsmith(__dirname)
    .metadata({
        site: {
            title: 'janmr.com',
            description: 'User-contributed collection of mathematical definitions, theorems and proofs',
            url: 'http://janmr.com/'
        }
    })
    .source('./src')
    .destination('./build')
    .clean(true)
    .use(make_mathjax_css())
    .use(less())
    .use(concat({
        files: ['css/normalize.css', 'css/mathjax.css', 'css/hljs-default.css', 'css/extra.css'],
        output: 'css/main.css',
    }))
    .use(markdown())
    .use(post_permalinks())
    .use(tags({
        path: 'blog/tags/:tag.html',
        layout: 'tag.html',
        sortBy: 'date',
        reverse: true
    }))
    .use(collections({
        posts: {
            pattern: 'blog/*/*/*',
            sortBy: 'date',
            reverse: true
        }
    }))
    .use(function (files, metalsmith, done) {
        setImmediate(done);
        Object.keys(files).forEach(file => {
            files[file].path = file;
        });
        metalsmith.metadata().collections.posts.forEach(post => {
            post.date = files[post.path].date;
        });
    }) 
    .use(feed({
        collection: 'posts',
        limit: false,
        destination: 'blog/rss.xml'
    }))
    .use(layouts({
        engine: 'handlebars',
        partials: 'partials'
    }))
    .build(function(err, files) {
        if (err) { throw err; }
    });