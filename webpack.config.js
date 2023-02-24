const components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver, AntDesignVueResolver, VantResolver, HeadlessUiResolver, ElementUiResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
    plugins: [
        Components({
            resolvers: [
                AntDesignVueResolver(),
                ElementPlusResolver(),
                VantResolver(),
                HeadlessUiResolver(),
                ElementUiResolver()
            ]
        }),
        require('unplugin-auto-import/webpack')({ /* options */ }),
    ],
    resolve: {
        alias: {
            crypto: false
        },
    }
}