type programOptions = {
  fetch?: () => string
  show?: () => string
  list?: () => string
  geo?: () => string
  lang?: () => string
  repo?: () => string
}
type githubUserFound = {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
  name: string
  company?: string
  blog?: string
  location?: string | null
  email?: string | null
  hireable: boolean | null
  bio?: string | null
  twitter_username?: string | null
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: Date
  updated_at: Date
}

type githubUserNotFound = {
  message: string
  documentation_url: string
  status: string
}

type IGithubUser = githubUserFound | githubUserNotFound | null

export { programOptions, IGithubUser, githubUserFound, githubUserNotFound }
