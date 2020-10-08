import axios from '@/ajax/request'
import { to } from '@/utils/common'

const baseApiURL = 'https://gitee.com/api/v5'
const repo = 'gitee-db'

const giteeIssue = {
  addIssue: async (access_token, owner, title, body) => {
    const issue = await giteeIssue.getIssueByTitle(access_token, owner, title)
    if (issue) {
      return await giteeIssue.updateIssue(access_token, owner, issue.number, body)
    } else {
      const data = { access_token, title, body, repo }
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
  getIssueByTitle: async (access_token, owner, title) => {
    const issues = await giteeIssue.getAllIssues(access_token, owner)
    const issue = issues.find(item => {
      return item.title === title
    })
    return issue
  },
  getAllIssues: async (access_token, owner) => {
    const [err, res] = await to(axios.get(`${baseApiURL}/repos/${owner}/${repo}/issues?access_token=${access_token}`))
    if (err) {
      return null
    }
    return res.data
  },
  updateIssue: async (access_token, owner, number, body) => {
    const data = { access_token, body, repo }
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
  },
  forkRepo: async (access_token, owner) => {
    const hasRepo = await giteeIssue.checkRepo(owner)
    if (hasRepo) {
      return {
        status: 'Fail',
        msg: '已经初始化过了'
      }
    }
    const data = { access_token, owner }
    const [err, res] = await to(axios.post(`${baseApiURL}/repos/zclzone/${repo}/forks`, data))
    if (err) {
      return {
        status: 'Fail',
        msg: '初始化失败'
      }
    }
    return {
      status: 'OK',
      msg: '初始化成功'
    }
  },
  checkRepo: async (owner) => {
    const [err, res] = await to(axios.get(`${baseApiURL}/repos/${owner}/${repo}`))
    if (err) {
      return false
    }
    return true
  },
}

export {
  giteeIssue
}
