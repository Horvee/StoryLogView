module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:9200",
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api/': '/', // rewrite path
                }
            },
        },
    },
};
