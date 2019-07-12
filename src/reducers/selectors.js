import * as actions from '../actions'

// store data
export const getUserInfo = ({ data }) => data.userInfo
export const getWechatUser = ({ data }) => data.wechatUser
export const getNextCerts = ({ data }) => data.nextCerts
export const getEcards = ({ data }) => {
  const { certifications = [], credentials = [] } = data
  return certifications.concat(credentials)
            .sort((c1, c2) => {
              return (new Date(c2.issueDate).getTime()) - (new Date(c1.issueDate).getTime())
            })
}
export const getProfile = ({ data }) => data.profile
export const getUserHeaderInfo = ({ data }) => data.wechat