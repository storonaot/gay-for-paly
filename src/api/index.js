import bridge from '@vkontakte/vk-bridge'

export const URL = 'https://gamer.super-app.studio/api'

export const APP_ID = 7794620

const getHeaders = () =>
  new Headers({
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: window.location.search.replace('?', ''),
  })

const toJSON = response => {
  if (response.ok) {
    return response.json()
  }
  console.error(response)
  return null
}

const defaultOptions = { headers: getHeaders() }

export const signIn = ({ first_name, last_name, avatar }) =>
  fetch(`${URL}/sign-in`, {
    ...defaultOptions,
    method: 'POST',
    body: JSON.stringify({ first_name, last_name, avatar }),
  }).then(toJSON)

export const getUser = () =>
  fetch(`${URL}/sign-in`, {
    ...defaultOptions,
    method: 'GET',
  }).then(toJSON)

export const setStatus = status =>
  fetch(`${URL}/status`, {
    ...defaultOptions,
    method: 'POST',
    body: JSON.stringify({ status }),
  }).then(toJSON).catch(() => {
  })

export const getFriends = async userIds => {
  try {
    if (!userIds || !userIds.length) {
      const { access_token } = await bridge.send('VKWebAppGetAuthToken', {
        app_id: 7794940,
        scope: 'friends,status',
      })
      const { response } = await bridge.send('VKWebAppCallAPIMethod', {
        method: 'friends.getAppUsers',
        params: { v: '5.130', access_token: access_token },
      })
      userIds = response
    }

    return fetch(`${URL}/friends?user_ids=${userIds.join(',')}`, {
      ...defaultOptions,
      method: 'GET',
    }).then(toJSON)
  } catch (error) {
    console.error(error)
  }
}

export const updatePrivateStatus = privateStatus =>
  fetch(`${URL}/private-status`, {
    ...defaultOptions,
    method: 'POST',
    body: JSON.stringify({ private_status: privateStatus }),
  }).then(toJSON)

export const addToFaivorite = (gameId, platform) =>
  fetch(`${URL}/add-to-favorite`, {
    ...defaultOptions,
    method: 'POST',
    body: JSON.stringify({ game_id: gameId, platform }),
  })

export const removeFromFaivorite = (gameId, platform) =>
  fetch(`${URL}/remove-from-favorite`, {
    ...defaultOptions,
    method: 'POST',
    body: JSON.stringify({ game_id: gameId, platform }),
  })
