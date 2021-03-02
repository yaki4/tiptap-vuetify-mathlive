import { MathBlock as MathBlockOriginal } from 'tiptap-extensions'
import { VuetifyIconsGroups } from '~/configs/theme'
import VuetifyIcon from '~/extensions/nativeExtensions/icons/VuetifyIcon'
import I18nText from '~/i18n/I18nText'
import AbstractExtension from '~/extensions/AbstractExtension'
import ExtensionActionInterface from '~/extensions/actions/ExtensionActionInterface'
import ExtensionActionRenderBtn from '~/extensions/actions/renders/btn/ExtensionActionRenderBtn.ts'

// TODO текст перед / после иконки. Сделать через массив: [new VuetifyIcon('code'), new TextForIcon('text')]
export default class MathBlock extends AbstractExtension {
  constructor (options) {
    super(options, MathBlockOriginal)
  }

  get schema() {
    return {
      content: 'text*',
      marks: '',
      group: 'block',
      code: true,
      defining: true,
      draggable: false,
      parseDOM: [
        { tag: '<math-field>', preserveWhitespace: 'full' },
      ],
      toDOM: () => ['math-field', ['code', 0]],
    }
  }

  get availableActions (): ExtensionActionInterface[] {
    return [
      {
        render: new ExtensionActionRenderBtn({
          tooltip: new I18nText('extensions.Math.buttons.math.tooltip'),
          icons: {
            [VuetifyIconsGroups.md]: new VuetifyIcon('calculator'),
            [VuetifyIconsGroups.mdi]: new VuetifyIcon('mdi-function-variant')
          },
          nativeExtensionName: 'math_block'
        })
      }
    ]
  }
}
