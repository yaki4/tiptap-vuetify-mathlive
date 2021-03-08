// import { BlockCode } from 'tiptap-extensions'
import { VuetifyIconsGroups } from '~/configs/theme'
import VuetifyIcon from '~/extensions/nativeExtensions/icons/VuetifyIcon'
import I18nText from '~/i18n/I18nText'
import AbstractExtension from '~/extensions/AbstractExtension'
import ExtensionActionInterface from '~/extensions/actions/ExtensionActionInterface'
import ExtensionActionRenderBtn from '~/extensions/actions/renders/btn/ExtensionActionRenderBtn.ts'
// import MathWindow from '~/extensions/nativeExtensions/math/MathWindow.vue'

export default class MathBlock extends AbstractExtension {
  // constructor (options) {
  //   super(options, BlockCode)
  // }

  get schema() {
    return {
      content: 'inline*',
      group: 'block',
      draggable: false,
      parseDOM: [{
        tag: 'math-field',
      }],
      toDOM: () => ['math-field', 0],
    }
  }

  get availableActions (): ExtensionActionInterface[] {
    const nativeExtensionName = 'mathblock'
    // const options = this.options

    return [
      {
        render: new ExtensionActionRenderBtn({
          tooltip: new I18nText('extensions.Math.buttons.math.tooltip'),
          icons: {
            [VuetifyIconsGroups.md]: new VuetifyIcon('calculator'),
            [VuetifyIconsGroups.mdi]: new VuetifyIcon('mdi-calculator')
          },
          nativeExtensionName
          // async onClick ({ context, editor }) {
          //   const MathWindowComponent = Vue.extend(MathWindow)
          //   const instance = new MathWindowComponent({
          //     vuetify: Vue.prototype.tiptapVuetifyPlugin.vuetify,
          //     propsData: {
          //       value: true,
          //       nativeExtensionName,
          //       context,
          //       editor
          //     }
          //   })

          //   instance.$mount()
          //   document.querySelector('body')!.appendChild(instance.$el)
          // }
        })
      }
    ]
  }
}
