import axios from '@/ajax/request'
import { getToken } from '@/utils/cookie-util'
import { to } from '@/utils/common'

const baseApiURL = 'https://gitee.com/api/v5'
const repo = 'gitee-db'
const owner = 'zclzone'

const giteeIssue = {
  addIssue: async (title, content) => {
    const issue = await giteeIssue.getIssueByTitle(title)
    if (issue) {
      return await giteeIssue.updateIssue(issue.number, content)
    } else {
      const data = { access_token: getToken(), body: content, title, repo }
      const [err, res] = await to(axios.post(`${baseApiURL}/repos/${owner}/issues`, data))
      if (err) {
        return {
          status: 'Fail',
          msg: `${err}`
        }
      }
      return {
        status: 'OK',
        msg: res.data.number,
      }
    }
  },
  getIssueByTitle: async (title) => {
    const issues = await giteeIssue.getAllIssues()
    const issue = issues.find(item => {
      return item.title === title
    })
    return issue
  },
  getAllIssues: async () => {
    const [err, res] = await to(axios.get(`${baseApiURL}/repos/${owner}/${repo}/issues?access_token=${getToken()}`))
    if (err) {
      return null
    }
    return res.data
  },
  updateIssue: async (number, content) => {
    const data = { access_token: getToken(), body: content, repo }
    const [err, res] = await to(axios.patch(`${baseApiURL}/repos/${owner}/issues/${number}`, data))
    if (err) {
      return {
        status: 'Fail',
        msg: `${err}`
      }
    }
    return {
      status: 'OK',
      msg: res.data.number,
    }
  }
}

export {
  giteeIssue
}
