import axios from '@/ajax/request'
import { to } from './common'

import { setUser } from '@/utils/cookie-util'

const giteeOauthOptions = {
  baseOauthUrl: 'https://gitee.com/oauth',
  clientId: '5469618e0b5d3fb058336b82c907bc9459f3c727ad1eb060325a803d91209a52',
  clientSecret: 'cb90ca23bd37be8d8a1aa53551db8cef4a5b148babef6aa78f3ad58e778c0abd',
  redirectUri: 'https://zclzone.gitee.io/redirect'
}
const { baseOauthUrl, clientId, clientSecret, redirectUri } = giteeOauthOptions

export function getOauthUrl() {
  return `${baseOauthUrl}/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`
}

export async function getAccessToken(code) {
  const [err, res] = await to(axios.post(`${baseOauthUrl}/token?grant_type=authorization_code&code=${code}&client_id=${clientId}&redirect_uri=${redirectUri}`, { client_secret: clientSecret }))
  if (err) {
    return null
  }
  return res.data.access_token
}

export async function getUserInfo(access_token) {
  const [err, res] = await to(axios.get(`https://gitee.com/api/v5/user?access_token=${access_token}`))
  if (err) {
    return null
  }
  const { avatar_url, email, id, name, login, html_url } = res.data
  return setUser({ avatar_url, email, id, name, login, html_url })
}
