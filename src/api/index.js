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
