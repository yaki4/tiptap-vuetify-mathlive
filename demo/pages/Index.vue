<template>
  <div>
    <!-- :toolbar-attributes="{ color: 'yellow' }"
    min-height="500"
    max-height="600"
    :editor-properties="editorProperties"
    output-format="json"
   -->
    <tiptap-vuetify
      v-model="content"
      :extensions="extensions"
      placeholder="Write something …"
      @keydown="onkeydown"
    />

    <br><br>
    <h1>Preview</h1>
    <hr>

    <div
      class="tiptap-vuetify-editor__content"
      v-html="content"
    />
  </div>
</template>

<script>
import { MAIN_MODULE } from '../config'
import MyCustomExtension from '../MyCustomExtension'
import FileSelector from '../Components/FileSelector'

export default {
  components: {
    TiptapVuetify: () => MAIN_MODULE.then(({ TiptapVuetify }) => TiptapVuetify)
  },
  data: () => ({
    // editorProperties: {
    //   editorProps: {
    //     handleKeyDown (a, b, c) {
    //       console.log('handleKeyDown', a, b, c)
    //     }
    //   }
    // },
    extensions: null,
    content: `
      <h1>Yay Headlines!</h1>
      <blockquote>Test quote.</blockquote>
      <p>All these <strong>cool tags</strong> are working now.</p>
      <p>
        There is always something to do. Thankfully, there are checklists for that. Don't forget to call mom.
      </p>
      <math-field>\tan(x) = \frac{\sin \tetha}{\cos \tetha}</math-field>
      <table>
        <tr>
          <th colspan="3" data-colwidth="100,0,0">Wide header</th>
        </tr>
        <tr>
          <td>One</td>
          <td>Two</td>
          <td>Three</td>
        </tr>
        <tr>
          <td>Four</td>
          <td>Five</td>
          <td>Six</td>
        </tr>
      </table>
    `
  }),
  async created () {
    const {
      Heading, Bold, Italic, Strike, Underline, Code, CodeBlock, Paragraph, BulletList, OrderedList, ListItem,
      Link, Blockquote, HardBreak, HorizontalRule, History, Image, Table, TableCell, TableHeader,
      TableRow, MathBlock
    } = await MAIN_MODULE

    this.extensions = [
      MyCustomExtension,
      [Table, {
        options: {
          resizable: true
        }
      }],
      TableCell,
      TableHeader,
      // TodoList,
      TableRow,
      // [new TodoItem(), {
      //   options: {
      //     nested: true
      //   }
      // }],
      Code,
      CodeBlock,
      HorizontalRule,
      Paragraph,
      History,
      HardBreak, // позволяет переносить через Shift + Ctrl + Enter
      Underline,
      Strike,
      Italic,
      ListItem, // если нужно использовать список (BulletList, OrderedList)
      BulletList,
      OrderedList,
      [Image, {
        options: {
          imageSources: [{ component: FileSelector, name: 'File Selector' }]
        }
      }],
      [Heading, {
        // Опции которые попадают в расширение tiptap
        options: {
          levels: [1, 2, 3]
        }
      }],
      // но опции не обязательно указывать если нужно чтобы renderIn: 'toolbar', это по умолчанию.
      [Bold, {
        renderIn: 'toolbar'
      }],
      [Blockquote, {
        renderIn: 'bubbleMenu',
        options: {
          levels: [1, 2, 3]
        }
      }],
      [Link, {
        renderIn: 'bubbleMenu'
      }],
      MathBlock
    ]
  },
  methods: {
    onkeydown (event) {
      // console.log('event', event.key)
    }
  }
}
</script>
