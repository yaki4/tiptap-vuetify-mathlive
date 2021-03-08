import { Node } from 'tiptap'
import { toggleBlockType, setBlockType, textblockTypeInputRule } from 'tiptap-commands'
// import Mathlive, { MathfieldElement } from 'mathlive'
let MathfieldElement = null
if (window) {
  MathfieldElement = require('mathlive').MathfieldElement
}
export default class MathBlock extends Node {

  get name() {
    return 'math_block'
  }

  get schema() {
    return {
      content: 'text*',
      marks: '',
      group: 'block',
      defining: true,
      draggable: false,
      parseDOM: [
        {
          tag: 'math-field',
          getAttrs: (dom) => {
            // let temp = new MathfieldElement()
            console.log('dom de parse', dom)
            // console.log('test', Mathlive)
            return {class: 'test'}
          }
        }
      ],
      toDOM: (node) => {
        console.log('TODNOE', node)
        let temp = new MathfieldElement()
        temp.setOptions({
          virtualKeyboardMode: 'manual'
        })
        if (node.content && node.content.content && node.content.content[0]) {
          temp.setValue(node.content.content[0].text)
        }
        return temp
      }
    }
  }

  commands({ type, schema }) {
    return () => toggleBlockType(type, schema.nodes.paragraph)
  }

}
