(function () {
  'use strict';
  // Fetch all languages and create an item list

  var langname = {};
  var items = [];
  var langlist = hljs.listLanguages();

  langlist.forEach(function(codename) {
    let l =  hljs.getLanguage(codename);
    langname[codename] = l.name;
  });

  langlist.sort(function(a, b){
    let x = langname[a].toLowerCase();
    let y = langname[b].toLowerCase();
    if (x < y) return -1;
    if (x > y) return 1;
    return 0;
   });

  var lang = langlist[0]; // Default to first listed language

  langlist.forEach(function(codename) {
    items.push({
      type: 'choiceitem',
      text: langname[codename],
      value: codename,
    });
  });

  // Prepare the GUI stuff
  var highlighter = function(editor) {
    // First clean up possible leftovers
    editor.dom.select('span.highlight_tmp').forEach(function(el) {
editor.dom.remove(el, true);
    });
    editor.formatter.apply('highlight_wrapper');
    editor.dom.select('span.highlight_tmp').forEach(function(el) {
      let text = el.innerText;
let hl = hljs.highlight(text, {
        language: lang,
  ignoreIllegals: true,
      });
editor.dom.setHTML(el, hl.value);
editor.dom.remove(el, true);
    });
    editor.undoManager.add(); // Make highlighting operation undoable
  }

  tinymce.PluginManager.add('highlight', function (editor) {
    editor.ui.registry.addIcon('highlight', '<svg width="24" height="24" viewBox="0 0 256 256"><path d="M 57.00,62.00 C 57.00,62.00 41.58,147.00 41.58,147.00 41.58,147.00 34.00,189.00 34.00,189.00 34.00,189.00 50.00,189.00 50.00,189.00 57.50,188.87 56.70,186.77 58.75,175.00 58.75,175.00 63.58,148.00 63.58,148.00 64.08,145.21 64.56,139.55 66.58,137.60 68.58,135.67 72.40,136.01 75.00,136.00 75.00,136.00 111.00,136.00 111.00,136.00 111.00,136.00 102.00,189.00 102.00,189.00 102.00,189.00 124.00,189.00 124.00,189.00 124.00,189.00 133.58,135.00 133.58,135.00 133.58,135.00 141.58,91.00 141.58,91.00 141.58,91.00 147.00,62.00 147.00,62.00 147.00,62.00 131.00,62.00 131.00,62.00 123.09,62.15 124.37,63.75 122.00,76.00 122.00,76.00 117.42,101.00 117.42,101.00 116.92,103.79 116.44,109.45 114.42,111.40 112.42,113.33 108.60,112.99 106.00,113.00 106.00,113.00 70.00,113.00 70.00,113.00 70.00,113.00 79.00,62.00 79.00,62.00 79.00,62.00 57.00,62.00 57.00,62.00 Z M 174.00,62.00 C 174.00,62.00 158.58,147.00 158.58,147.00 158.58,147.00 151.00,189.00 151.00,189.00 151.00,189.00 204.00,189.00 204.00,189.00 204.00,189.00 210.41,187.98 210.41,187.98 210.41,187.98 212.61,182.00 212.61,182.00 212.61,182.00 215.00,167.00 215.00,167.00 215.00,167.00 177.00,167.00 177.00,167.00 177.00,167.00 189.42,99.00 189.42,99.00 189.42,99.00 196.00,62.00 196.00,62.00 196.00,62.00 174.00,62.00 174.00,62.00 Z" /></svg>');

  editor.ui.registry.addSplitButton('hljs', {
    icon: 'highlight',
    tooltip: 'Syntax highlight selection',
    onAction: ()=>{highlighter(editor)},
    onItemAction: function (api, value) {
      console.log(editor)
      lang = value;
      highlighter(editor);
    },
    fetch: function(callback) { callback(items); },
    select: function(x) { return x === lang; },
  });
});
})();