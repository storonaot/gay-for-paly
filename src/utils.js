import bridge from '@vkontakte/vk-bridge'
import { platform, IOS } from '@vkontakte/vkui'

export const numWord = (value, words) => {
  value = Math.abs(value) % 100
  var num = value % 10
  if (value > 10 && value < 20) return words[2]
  if (num > 1 && num < 5) return words[1]
  if (num == 1) return words[0]
  return words[2]
}

const osname = platform()

export const noop = () => {}

export const initStory = (prefix, total, imageUrl) => {
  let space = '\n'
  if (osname === IOS) {
    space = ' '
  }
  let text = `${prefix}!${space}`
  if (total <= 5000) {
    text =
      `${text} Я мог бы заработать ${total * 250}${space}` +
      `рублей курьером. Но выбрал${space}` +
      'киберспорт😉'
  } else if (total <= 10000) {
    text =
      `${text} А мог бы выучить любой${space}` +
      `иностранный язык. Но выбрал${space}` +
      'киберспорт😉'
  } else {
    text =
      `${text} А мог бы стать профессионалом${space}` +
      `почти во всем. Но выбрал${space}` +
      'киберспорт😉'
  }

  let stickers = [
    {
      sticker_type: 'native',
      sticker: {
        action_type: 'text',
        action: {
          text,
          style: 'classic',
          alignment: 'center',
          background_style: 'none',
          selection_color: '#000000',
        },
        transform: {
          relation_width: 0.8,
          translation_y: 0.1,
        },
      },
    },
  ]
  if (imageUrl) {
    stickers.push({
      sticker_type: 'renderable',
      sticker: {
        url: imageUrl,
        content_type: 'image',
        transform: {
          relation_width: 0.2,
          translation_y: -0.07,
        },
      },
    })
  }
  bridge.send('VKWebAppShowStoryBox', {
    background_type: 'image',
    url: 'https://pp.userapi.com/OlPGELEYLmUXZxvAwilKyYWFNCrFaVG0_L5FuA/NIJ-POtprsM.jpg?ecomm=1',
    attachment: {
      text: 'go_to',
      type: 'url',
      url: 'https://vk.com/app7793495',
    },
    stickers,
  })
}
