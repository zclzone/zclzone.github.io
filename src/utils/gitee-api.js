import axios from '@/ajax/request'
import { to, utf8ToBase64, base64ToUtf8 } from '@/utils/common'

const baseApiURL = 'https://gitee.com/api/v5'
const defaultRepo = 'gitee-db'
const defaultOwner = 'zclzone'

const baseRepoURL = (owner, repo) => {
  return `${baseApiURL}/repos/${owner || defaultOwner}/${repo || defaultRepo}`
}

const giteeApi = {
  getFileSha: async (fileName, owner = '') => {
    const [err, res] = await to(axios.get(`${baseRepoURL(owner)}/contents/${fileName}`))
    if (err) {
      return ''
    }
    if (!res.data.sha) {
      return ''
    }
    return res.data.sha
  },

  getFile: async (fileName, owner = '') => {
    const [err, res] = await to(axios.get(`${baseRepoURL(owner)}/contents/${fileName}`))
    if (res && res.data.sha) {
      return {
        sha: res.data.sha,
        name: res.data.name,
        path: res.data.path,
        content: base64ToUtf8(res.data.content)
      }
    }
    return null
  },

  addFile: async (access_token, fileName, content, owner = '') => {
    const sha = await giteeApi.getFileSha(fileName)
    if (sha) {
      return {
        status: 'Fail',
        msg: `已经存在 ${fileName}`
      }
    }
    content = utf8ToBase64(content)
    const data = { access_token, message: `add ${fileName}`, content }
    const [err, res] = await to(axios.post(`${baseRepoURL(owner)}/contents/${fileName}`, data))
    if (err) {
      return {
        status: 'Fail',
        msg: `添加失败： ${err}`
      }
    }
    return {
      status: 'OK',
      msg: `添加成功： ${fileName}`,
    }
  },

  removeFile: async (access_token, fileName, owner = '') => {
    const sha = await giteeApi.getFileSha(fileName)
    if (!sha) {
      return {
        status: 'Fail',
        msg: `不存在 ${fileName}`
      }
    }
    let params = { access_token, message: `remove ${fileName}`, sha }
    const [err, res] = await to(axios.delete(`${baseRepoURL(owner)}/contents/${fileName}`, { params }))

    if (err) {
      return {
        status: 'Fail',
        msg: `删除失败： ${err}`
      }
    }
    return {
      status: 'OK',
      msg: `删除成功： ${fileName}`
    }
  },

  updateFile: async (access_token, fileName, sha, content, owner = '') => {
    content = utf8ToBase64(content)
    const data = { access_token, message: `update ${fileName}`, content, sha }
    const [err, res] = await to(axios.put(`${baseRepoURL(owner)}/contents/${fileName}`, data))
    if (err) {
      return {
        status: "Fail",
        msg: `更新失败： ${err}`
      }
    }
    return {
      status: 'OK',
      msg: `更新成功： ${fileName}`
    }
  },

  checkRepo: async (owner = '') => {
    const [err, res] = await to(axios.get(baseRepoURL(owner)))
    if (err) {
      return false
    }
    return true
  },

  forkRepo: async (access_token, owner = '', repo = '') => {
    const data = { access_token }
    const [err, res] = await to(axios.post(`${baseRepoURL(owner, repo)}/forks`, data))
    if (err) {
      return {
        status: 'Fail'
      }
    }
    return {
      status: 'OK'
    }
  },
}

export {
  giteeApi
}