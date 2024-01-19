tinymce.PluginManager.add('slashcommands', function (editor) {
    var insertActions = [
        {
            text: 'Heading 1',
            icon: 'h1',
            action: function () {
                editor.execCommand('mceInsertContent', false, '<h1>Heading 1</h1>')
                editor.selection.select(editor.selection.getNode());
            }
        },
        {
            text: 'Heading 2',  
            icon: 'h2',
            action: function () {
                editor.execCommand('mceInsertContent', false, '<h2>Heading 2</h2>');
                editor.selection.select(editor.selection.getNode());
            }
        },
        {
            text: 'Heading 3',
            icon: 'h3',
            action: function () {
                editor.execCommand('mceInsertContent', false, '<h3>Heading 3</h3>');
                editor.selection.select(editor.selection.getNode());
            }
        },
        {
            text: 'Date',
            icon: 'insert-time',
            action: function () {
                editor.execCommand('mceInsertContent', false, `<span style="color:gray;">${(()=>{_date=new Date(); return `${String(_date.getMonth()).padStart(2, '0')}/${String(_date.getDate()).padStart(2, '0')}/${String(_date.getFullYear()).padStart(2, '0')} @ ${String(_date.getHours()).padStart(2, '0')}:${String(_date.getMinutes()).padStart(2, '0')}:${String(_date.getSeconds()).padStart(2, '0')}`})()}</span>`);
            }
        },

        {
            text: 'Lorem ipsum',
            icon: 'L',
            action: async function(){
                _req = await fetch("/api/loremipsum")

                if(_req.ok){
                    data = await _req.json()

                    console.log(data)
                    if(data.success == false){
                        return
                    }
                    editor.execCommand('mceInsertContent', false, `${data.text}`);
                }
            }
        },
    {
      type: 'separator'
    },
        {
            text: 'Bulleted list',
            icon: 'unordered-list',
            action: function () {
                editor.execCommand('InsertUnorderedList', false);
            }
        },
        {
            text: 'Numbered list',
            icon: 'ordered-list',
            action: function () {
                editor.execCommand('InsertOrderedList', false);
            }
        }
    ];

    // Register the slash commands autocompleter
    editor.ui.registry.addAutocompleter('slashcommands', {
        ch: '/',
        minChars: 0,
        columns: 1,
        fetch: function (pattern) {
            const matchedActions = insertActions.filter(function (action) {
                return action.type === 'separator' ||
                    action.text.toLowerCase().indexOf(pattern.toLowerCase()) !== -1;
            });

            return new Promise((resolve) => {
                var results = matchedActions.map(function (action) {
                    return {
                        meta: action,
                        text: action.text,
                        icon: action.icon,
                        value: action.text,
                        type: action.type
                    }
                });
                resolve(results);
            });
        },
        onAction: function (autocompleteApi, rng, action, meta) {
            editor.selection.setRng(rng);
            // Some actions don't delete the "slash", so we delete all the slash
            // command content before performing the action
            editor.execCommand('Delete');
            meta.action();
            autocompleteApi.hide(); 
        }
    });
    return {};
});
