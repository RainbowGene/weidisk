module.exports = {
	lintOnSave: false,
	devServer: {
		host: "localhost",
		port: 8080,
		https: false,
		open: true,
		proxy: {
			'/api': {
				target: 'http://disk.zh526.cn',
				changeOrigin: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	}
}
