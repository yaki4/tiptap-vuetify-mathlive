<template>
  <v-dialog
    :value="value"
    persistent
    max-width="500px"
  >
    <v-card>
      <v-card-title>
        <span class="headline">
          {{ $i18n.getMsg('extensions.Math.window.title') }}
        </span>

        <v-spacer />

        <v-btn
          icon
          @click="close"
        >
          <v-icon>{{ COMMON_ICONS.close[$tiptapVuetify.iconsGroup] }}</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <div id="mathInput"/>
      </v-card-text>
      <v-card-actions>
        <v-btn
          text
          @click="close"
        >
          {{ $i18n.getMsg('extensions.Math.window.buttons.close') }}
        </v-btn>

        <v-btn
          :disabled="isDisabled"
          text
          @click="apply"
        >
          {{ $i18n.getMsg('extensions.Math.window.buttons.apply') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { Component, Prop } from 'vue-property-decorator'
import { VDialog, VCard, VCardTitle, VCardText, VCardActions, VBtn, VSpacer, VIcon, VTextField } from 'vuetify/lib'
import I18nMixin from '~/mixins/I18nMixin'
import { VExpandTransition } from 'vuetify/lib/components/transitions'
import { COMMON_ICONS } from '~/configs/theme'
// import 'mathlive/dist/mathlive-fonts.css'
// import 'mathlive/dist/mathlive-static.css'
import MathLive, { MathfieldElement } from 'mathlive'
import { DOMParser } from 'prosemirror-model'

export const PROPS = {
  VALUE: 'value' as const,
  CONTEXT: 'context' as const,
  EDITOR: 'editor' as const,
  NATIVE_EXTENSION_NAME: 'nativeExtensionName' as const,
  HREF: 'href' as const
}

@Component({
  components: { VExpandTransition, VDialog, VCard, VCardTitle, VCardText, VCardActions, VBtn, VSpacer, VIcon, VTextField }
})
export default class MathWindow extends mixins(I18nMixin) {
  mathfield: Element

  @Prop({
    type: Boolean,
    default: false
  })
  readonly [PROPS.VALUE]: boolean

  @Prop({
    type: String,
    required: true
  })
  readonly [PROPS.NATIVE_EXTENSION_NAME]: string

  @Prop({
    type: Object,
    required: true
  })
  readonly [PROPS.CONTEXT]: any

  @Prop({
    type: Object,
    required: true
  })
  readonly [PROPS.EDITOR]: any

  @Prop({
    type: Array,
    required: false
  })

  @Prop({
    type: Boolean,
    required: false
  })
  readonly [PROPS.HREF]: null | string

  readonly COMMON_ICONS = COMMON_ICONS

  form = {
    href: this[PROPS.HREF],
    blank: false
  }

  get isDisabled () {
    console.log('ITODO ISDISABLED')
    return false
    // return !this.previewSources.length
  }
  mounted () {
    console.log('moutend', MathLive)
    let temp = new MathfieldElement()
    temp.setOptions({
      virtualKeyboardMode: 'manual',
    })
    this.mathfield = temp
    let elem = document.querySelector('#mathInput')
    console.log('ELEM', elem)
    if (elem) {
      elem.appendChild(this.mathfield)
    }
    document.querySelector('#mathInput')?.appendChild(this.mathfield)
  }

  apply () {
    this[PROPS.EDITOR].commands.paragraph()
    // tslint:disable-next-line
    // if (this.mathfield.value) { FONCTIONNE MAIS LINTER PAS CONTENT
    //   this.insertHTML(this[PROPS.EDITOR], '<p class="test pour custom">$$' + this.mathfield.value + '$$</p>')
    // }
    this.close()
    this[PROPS.EDITOR].focus()
  }

  close () {
    this.$destroy()
    this.$el.parentNode!.removeChild(this.$el)
  }

  elementFromString (value) {
    const element = document.createElement('div')
    element.innerHTML = value.trim()

    return element
  }
  
  insertHTML ({ state, view }, value) {
    const { selection } = state
    const element = this.elementFromString(value)
    const slice = DOMParser.fromSchema(state.schema).parseSlice(element)
    const transaction = state.tr.insert(selection.anchor, slice.content)

    view.dispatch(transaction)
  }
}
</script>
<style>
.ML__keyboard{
  z-index: 203 !important;
}
</style>
