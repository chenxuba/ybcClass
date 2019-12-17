<template>
  <froala :config="config"></froala>
</template><script>
export default {
  data() {
    return {
      editor: null,
      config: {
        zIndex: 2501,
        height: "600",
        toolbarSticky: false,
        autofocus: true,
        toolbarButtons: [
          "fullscreen",
          "bold",
          "italic",
          "underline",
          "strikeThrough",
          "subscript",
          "superscript",
          "|",
          "fontFamily",
          "fontSize",
          "color",
          "inlineClass",
          "inlineStyle",
          "paragraphStyle",
          "lineHeight",
          "|",
          "paragraphFormat",
          "align",
          "formatOL",
          "formatUL",
          "outdent",
          "indent",
          "quote",
          "-",
          "insertLink",
          "insertImage",
          // "insertVideo",
          "embedly",
          "insertFile",
          "insertTable",
          "|",
          "emoticons",
          "fontAwesome",
          "specialCharacters",
          "insertHR",
          "selectAll",
          "clearFormatting",
          "|",
          "print",
          "getPDF",
          "spellChecker",
          "help",
          "html",
          "|",
          "undo",
          "redo"
        ],
        placeholder: "请填写内容",
        language: "zh_cn",
        imageDefaultWidth: "100%",
        imageUploadURL: "https://api.ybc365.com/api/5dca4fd808929",
        videoUploadURL: "https://api.ybc365.com/api/5dca4fd808929",
        fileUploadURL: "https://api.ybc365.com/api/5dca4fd808929",
        imageManagerLoadURL: "https://api.ybc365.com/api/5dca4fd808929",
        // requestHeaders: { Authorization: localStorage.eleToken },
        requestWithCredentials: true,
        events: {
          "froalaEditor.initialized": (e, editor) => {
            this.editor = editor;
          },
          "froalaEditor.contentChanged": (e, editor) => {
            this.$emit("on-change", editor.html.get(true));
          }
        }
      }
    };
  },
  methods: {
    setHtml(html) {
      if (this.editor) {
        this.editor.html.set(html);
      }
    }
  }
};
</script><style></style>