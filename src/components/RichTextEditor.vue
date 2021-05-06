<template>
  <!-- Two-way Data-Binding -->
  <quill-editor
    ref="myQuillEditor"
    v-model="htmlContent"
    :options="editorOption"

  />
 <!-- @blur="onEditorBlur($event)"
    @focus="onEditorFocus($event)"
    @ready="onEditorReady($event)" -->
  <!-- Or manually control the data synchronization -->
  <!-- <quill-editor
    :content="content"
    :options="editorOption"
    @change="onEditorChange($event)"
  /> -->
</template>

<script>
  // You can also register Quill modules in the component
  import Quill from 'quill'
//   import someModule from '../yourModulePath/someQuillModule.js'
//   Quill.register('modules/someModule', someModule)

  export default {
    props:{
      content:{
        type:String,
      }
    },
    data () {
      return {
        htmlContent:this.content,
        editorOption: {
          // Some Quill options...
        }
      }
    },
    methods: {
      // onEditorBlur(quill) {
      //   console.log('editor blur!', quill)
      // },
      // onEditorFocus(quill) {
      //   console.log('editor focus!', quill)
      // },
      // onEditorReady(quill) {
      //   console.log('editor ready!', quill)
      // },
      // onEditorChange({ quill, html, text }) {
      //   console.log('editor change!', quill, html, text)
      //   this.content = html
      // }
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    mounted() {
      console.log('this is current quill instance object', this.editor)
    }
  }
</script>
