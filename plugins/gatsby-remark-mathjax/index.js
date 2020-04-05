const visit = require(`unist-util-visit`)
const remarkMath = require(`remark-math`)
const mjAPI = require("mathjax-node");

mjAPI.config({
    MathJax: {}
});
mjAPI.start();

module.exports = async ({ markdownAST }, pluginOptions = {}) => {
  const nodes = [];

  visit(markdownAST, `inlineMath`, node => {
    nodes.push({ node, format: 'inline-TeX' })
  })

  visit(markdownAST, `math`, node => {
    nodes.push({ node, format: 'TeX' })
  })

  for (const { node, format } of nodes) {
    await new Promise((resolve, reject) => {
      mjAPI.typeset({
        math: node.value,
        format: format,
        html: true
      }, data => {
        if (!data.errors) {
          node.type = `html`
          node.value = data.html
          resolve()
        } else
          reject(data.errors)
      })
    })  
  }
}

module.exports.setParserPlugins = () => [remarkMath]
