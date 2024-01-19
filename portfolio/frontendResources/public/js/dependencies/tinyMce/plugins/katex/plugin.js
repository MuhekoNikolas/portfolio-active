
tinymce.PluginManager.add('katex', function (editor) {

    const getLatexEmbedDialog = function(){
        var dialogConfig =  {
            title: 'Enter Katex code',
            body: {
              type: 'panel',
              items: [
                {
                    type: 'textarea', 
                    name: 'latex_input', 
                    label: 'Latex:', 
                    disabled: true // disabled state
                },
              ]
            },
            buttons: [
              {
                type: 'cancel',
                name: 'closeButton',
                text: 'Cancel'
              },
              {
                type: 'submit',
                name: 'submitButton',
                text: 'Insert Latex.',
                buttonType: 'primary'
              }
            ],
    
            onSubmit: (api)=>{beginInsertingLatex(api, editor)}
        };
    
        return dialogConfig
    }
    
    
    var beginInsertingLatex = function(apiInfo, editor){
        data = apiInfo.getData()

        if(data.latex_input.value.length<=0){
            editor.notificationManager.open({
                text: "Please enter valid latex code",
                type: "error",
                timeout: 2500,
            });
            return
        }

    }

    // editor.ui.registry.addButton('katex', {
    //     icon: 'new-tab',
    //     tooltip: 'Insert latex',
    //     onAction: (api)=>{editor.windowManager.open(getLatexEmbedDialog())},
    //     // onSetup: console.log
    // });

    editor.ui.registry.addButton('katex', { text:'Latex Code', context:'format', onAction:function(api) {
            tinymce.activeEditor.formatter.register('custom_format', {inline:'span', styles:{ background:'#EEF' }, classes:'tinymcekatex' });
            tinymce.activeEditor.formatter.apply('custom_format');
            document.querySelectorAll(".tinymcekatex").forEach(_x=>{
                katex.renderToString(_x.innerHTML)
            }) 
        }
    })

    return {};
});


