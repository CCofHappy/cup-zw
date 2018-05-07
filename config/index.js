var path = require('path')

module.exports = {
	build: {
		env: require('./prod.env'),
		index: path.resolve(__dirname, '../dist/index.html'),
		assetsRoot: path.resolve(__dirname, '../dist'),
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',
		productionSourceMap: true,
		productionGzip: false,
		productionGzipExtensions: ['js', 'css'],
		bundleAnalyzerReport: process.env.npm_config_report
	},
	dev: {
		env: require('./dev.env'),
		port: 8100,
		autoOpenBrowser: true,
		assetsSubDirectory: 'static',
		assetsPublicPath: '/',
		proxyTable: {
			'/api/': {
				// target: 'http://192.168.0.199:8088/api/',
				target: 'http://dev.wmall.cwhisky.com/api/', //测试环境 商城api
				// target: 'http://share.wmall.cwhisky.com:81/api/', //开发环境 商城api
				changeOrigin: true,
				pathRewrite: { //需要rewrite重写的, 如果在服务器端做了处理则可以不要这段
					'^/api/': ''
				}
			},
			'/core/': {
			 	// target: 'http://192.168.0.199:8087/core/',
				target: 'http://dev.core.cwhisky.com/core/', //测试环境通用api
				// target: 'http://share.wmall.cwhisky.com:81/core/', //开发环境通用api
				changeOrigin: true,
				pathRewrite: { //需要rewrite重写的, 如果在服务器端做了处理则可以不要这段
					'^/core/': ''
				}
			},
			'/dbcenter/': {
				// target: 'http://192.168.0.199:8088/dbcenter/',
				target: 'http://dev.dbcenter.cwhisky.com/dbcenter/', //数据中心api
				// target: 'http://share.dbcenter.cwhisky.com:81/dbcenter/', //开发环境 数据中心api
				changeOrigin: true,
				pathRewrite: { //需要rewrite重写的, 如果在服务器端做了处理则可以不要这段
					'^/dbcenter/': ''
				}
			},
		},
		cssSourceMap: false
	}
}
