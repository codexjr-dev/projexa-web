import organization from './organization'
import auth from './auth'
import member from './member'
import project from './project'
import link from './link'
import news from './news'

const actions = {
    ...organization.actions,
    ...auth.actions,
    ...member.actions,
    ...project.actions,
    ...link.actions,
    ...news.actions
}

export default actions