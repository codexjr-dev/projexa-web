import organization from './organization'
import auth from './auth'
import member from './member'
import project from './project'
import link from './link'
import user from './user'
import news from './news'

const actions = {
    ...organization.actions,
    ...auth.actions,
    ...member.actions,
    ...project.actions,
    ...link.actions,
    ...user.actions,
    ...news.actions
}

export default actions