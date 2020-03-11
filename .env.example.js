const env = process.env.NODE_ENV

export const clientId = '2'

export const clientSecret = (conn) => {
  if (conn === 'prod') {
    return env === 'production' ? '' : ''
  } else {
    return env === 'production' ? '' : ''
  } 
}

