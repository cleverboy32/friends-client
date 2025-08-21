module.exports = {
    theme: {
        extend: {
            colors: {
                theme: '#B5CAA0', // 抹茶绿
                'bg-theme': '#E6EEDE', // 浅抹茶绿
                'dark-theme': '#4A5D45', // 暗绿
                'light-bg-theme': '#E0E7D4', // 灰调抹茶
                primary: '#FFD166', // 柠檬黄
                secondary: '#FFF4D6', // 浅柠檬黄
                'dark-primary': '#FFE8A3', // 浅黄
                'light-primary': '#FFF4D6', // 浅柠檬黄
            },
        },
    },
    corePlugins: {
        // 方案1：完全禁用 focus-visible 插件
        focusVisible: false,
        outline: false,
    },
    plugins: [],
};
