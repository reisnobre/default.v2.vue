const env = process.env.NODE_ENV

const dev = {
  prod: 'http://localhost:8000',
  beta: 'http://localhost:8000'
}
const prod = {
  prod: 'https://back.backup.techmobil.com.br',
  beta: 'http://localhost:8000'
}

const api = options => {
  const secure = options.secure === undefined ? true : options.secure
  const conn = options.conn === undefined ? 'prod' : options.conn

  if (secure) {
    if (env === 'production') return `${prod[conn]}/api/v1/${options.service ? options.service + '/' : ''}${options.target}`
    return `${dev[conn]}/api/v1/${options.service ? options.service + '/' : ''}${options.target}`
  } else {
    if (env === 'production') return `${prod[conn]}/${options.service ? options.service + '/' : ''}${options.target}`
    return `${dev[conn]}/${options.service ? options.service + '/' : ''}${options.target}`
  }
}

export default api
