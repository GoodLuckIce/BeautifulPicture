'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'

const px2remConfig = {
  baseDpr: 1,             // base device pixel ratio (default: 2)
  remUnit: 75,            // rem unit value (default: 75)
  remPrecision: 6,        // rem value precision (default: 6)
  forcePxComment: 'px',   // force px comment (default: `px`)
  keepComment: 'no',       // no transform value comment (default: `no`)
  threeVersion: false,    // whether to generate @1x, @2x and @3x version (default: false)
  remVersion: true,       // whether to generate rem version (default: true)
  shouldUseDprRule: function(rule){
    var list = ['font', 'font-size'];
    return list.some(function(item) {
      return item === rule.property;
    })
  },
  shouldIgnoreRule: function(rule) {
    return  /border/.test(rule.property);
  }
}

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
      ? config.build.isExtractCss
      : false,
  }),
  transformToRequire: {
    video: 'src',
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  },

  postcss: [
    require('autoprefixer')({
      //为浏览最新版本添加前缀，每一个主要浏览器的最后2个版本,市场份额大于%，美国份额>5%，大于等于ie8,，大于等于IOS8
      //详细配置参考 https://github.com/ai/browserslist#queries
      browsers: ['Android >= 4.2', "> 10%", "> 5% in US", "ie >= 8",'iOS >= 8',"Firefox > 20"]
    }),
    //require('postcss-px2rem')(px2remConfig),
  ],
  cssModules: {
    // overwrite local ident name
    //localIdentName: '[path][name]-[local]-[hash:base64:5]',
    localIdentName: '[name]-[local]-[hash:base64:5]',
    // enable camelCase
    camelCase: false
  },
}
