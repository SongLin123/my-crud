const files = require.context('./', false, /\.js$/)
const apis = files.keys().filter((key) => !key.includes('index.js')).map(key => files(key).default)

const moduleName = '/bussisnis'

export default ({
  request,
  tools
}) => apis.map(api => api({
  request,
  tools,
  moduleName
}))
