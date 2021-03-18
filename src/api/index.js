import bridge from '@vkontakte/vk-bridge'

export const URL = 'https://gamer.super-app.studio/api'
export const APP_ID = 7794620

const getHeaders = () =>
  // new Headers({
  //   "Content-Type": "application/json;charset=utf-8",
  //   Authorization:
  //     "vk_access_token_settings=&vk_app_id=7505183&vk_are_notifications_enabled=0&vk_is_app_user=1&vk_is_employee=1&vk_is_favorite=0&vk_language=ru&vk_platform=desktop_web&vk_ref=other&vk_ts=1603961889&vk_user_id=184233960&sign=iYoAZcGdfJqUSW7hC-5G_Ks2FxpESV5594-n14yQyrA",
  // });
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
