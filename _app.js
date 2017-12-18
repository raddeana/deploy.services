var http = require('http');
var url = require('url');

var path = require('path');
var fs = require('fs');

var zlib = require('zlib');

var config = require('./config');
var services = require('./services');

const web_deploy_service_path = '/api/events/web_deploy';
const app_deploy_service_path = '/api/events/app_deploy';
const sf_update_path = '/api/events/sf_update';

http.createServer(function (request, response) {
    var data = [];
    var pathname = url.parse(request.url).pathname;

    if (pathname.slice(-1) === '/') {
        pathname = pathname + config.Welcome.file;
    }

    var realPath = path.join('www', path.normalize(pathname.replace(/\.\./g, '')));

    request.on('data', function (chunk) {
        data.push(chunk);
    });

    request.on('end', function () {
        // 在这里调用service
        if (pathname === web_deploy_service_path) {
            data = Buffer.concat(data).toString() ? JSON.parse(Buffer.concat(data).toString()).head_commit : {};

            var webUrl = 'https://github.com/mulberryx/blog-web/commit/' + data.id;
            var adminUrl = 'https://github.com/mulberryx/blog-admin/commit/' + data.id;
            var backEndUrl = 'https://github.com/mulberryx/blog/commit/' + data.id;
            var deployUrl = 'https://github.com/mulberryx/deploy-services/commit/' + data.id;

            var email = 'wowcxy2008@126.com';
            var publish = 'auto#publish';
            var ignore = 'auto#ignore';
            var secret = 'worldwill';

            if (data.author.email === email && !data.message.match(publish) && !data.message.match(ignore)) {
                var project = '';
                var lng = '';
                var cdn = false;
                
                if (data.url === webUrl) {
                    project = 'blog-web';
                    lng = 'nodejs';
                    cdn = true;
                } else if (data.url === adminUrl) {
                    project = 'blog-admin';
                    lng = 'nodejs';
                    cdn = true;
                } else if (data.url === backEndUrl){
                    project = 'blog';
                    lng = 'java';
                    cdn = true;
                }

                services.exec(project, lng, cdn);
            }
        } else if (pathname === app_deploy_service_path) {
            project = 'blog-app';
            lng = null; 
            cdn = false; 

            services.exec(project, lng, cdn);
        } else if (pathname === sf_update_path) {
            project = 'deploy-services';
            lng = 'nodejs'; 
            cdn = false;    

            services.exec(project, lng, cdn);
        }

        response.write('success');
        response.end();

        fs.exists(realPath, function (exists) {
            if (!exists) {
                var isStatic = realPath.split('.').length > 1;

                if (isStatic) {
                    response.writeHead(404, { 'Content-Type': 'text/plain' });
                    response.write('resource not found');
                    response.end();                    
                } else {
                    fs.readFile('www/index.html', 'binary', function (err, file) {
                        if (err) {
                            response.writeHead(500, { 'Content-Type': 'text/plain' });
                            response.write(err.toString());
                            response.end();
                        } else {
                            response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                            response.write(file, 'binary');
                            response.end();
                        }
                    });
                }
            } else {
                var ext;

                ext = path.extname(realPath) ? path.extname(realPath) : 'unknown';
                ext = ext.replace('.', '');

                var contentType = config.types[ext] || 'text/plain';

                response.setHeader('Content-Type', contentType);

                fs.stat(realPath, function (err, stat) {
                    if (!err) {
                        var lastModified = stat.mtime.toUTCString();
                        var ifModifiedSince = 'If-Modified-Since'.toLowerCase();

                        response.setHeader('Last-Modified', lastModified);

                        if (ext.match(config.Expires.fileMatch)) {
                            var expires = new Date();

                            expires.setTime(expires.getTime() + (config.Expires.maxAge * 1000));

                            response.setHeader('Expires', expires.toUTCString());
                            response.setHeader('Cache-Control', 'max-age=' + config.Expires.maxAge);
                        }

                        if (request.headers[ifModifiedSince] && lastModified === request.headers[ifModifiedSince]) {
                            response.writeHead(304, 'Not Modified');
                            response.end();
                        } else {
                            var raw = fs.createReadStream(realPath);
                            var acceptEncoding = request.headers['accept-encoding'] || '';
                            var matched = ext.match(config.Compress.match);

                            if (matched && acceptEncoding.match(/\bgzip\b/)) {
                                response.writeHead(200, 'Ok', { 'Content-Encoding': 'gzip' });
                                raw.pipe(zlib.createGzip()).pipe(response);
                            } else if (matched && acceptEncoding.match(/\bdeflate\b/)) {
                                response.writeHead(200, 'Ok', { 'Content-Encoding': 'deflate' });
                                raw.pipe(zlib.createDeflate()).pipe(response);
                            } else {
                                response.writeHead(200, 'Ok');
                                raw.pipe(response);
                            }
                        }
                    } else {
                        response.writeHead(500, 'unknow server error');
                    }
                });
            }
        });  
    });
}).listen(3030);
