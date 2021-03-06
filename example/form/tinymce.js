Ext.Loader.setConfig({
    'enabled': true,
    'paths': {
        'Ext.ux': 'http://cdn.sencha.com/ext/gpl/4.2.1/examples/ux/',
        'Ext.ux.form.field': '../../ux/form/field'
    }
});

Ext.require([ 'Ext.ux.form.field.TinyMCE' ]);

Ext.onReady(function() {
    var formPanel = Ext.create('Ext.form.Panel', {
        renderTo: 'editor-grid',
        title: 'Multi Column, Nested Layouts, Anchoring and TinyMCE field',
        frame: true,
        bodyStyle: 'padding:5px 5px 0',
        width: 600,
        waitMsgTarget: true,

        items: [
            {
                xtype: 'fieldset',
                title: 'Your Contact Information',
                defaultType: 'textfield',
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                items: [
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        combineErrors: true,
                        defaultType: 'textfield',
                        defaults: {
                            labelAlign: 'top'
                        },
                        items: [
                            {
                                name: 'firstName',
                                fieldLabel: 'First Name',
                                flex: 2,
                                allowBlank: false
                            },
                            {
                                name: 'lastName',
                                fieldLabel: 'Last Name',
                                flex: 3,
                                margins: '0 0 0 6',
                                allowBlank: false
                            }
                        ]
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        defaultType: 'textfield',
                        defaults: {
                            labelAlign: 'top'
                        },
                        items: [
                            {
                                name: 'company',
                                fieldLabel: 'Company',
                                flex: 2
                            },
                            {
                                name: 'email',
                                fieldLabel: 'Email',
                                flex: 3,
                                margins: '0 0 0 6'
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'tinymcefield',
                name: 'bio',
                fieldLabel: 'Biography',
                labelAlign: 'top',
                height: 300,
                anchor: '100%',
                //disabled: true,
                tinymceConfig: {
                    toolbar1: 'fullscreen,|,undo,redo,|,bold,italic,strikethrough,|,charmap,|,removeformat,code',
                }
            }
        ],

        buttons: [
            {
                text: 'enable / disable Editor',
                handler: function() {
                    var field = formPanel.query('tinymcefield')[0];
                    field.setDisabled(!field.disabled);
                }
            },
            '->',
            {
                text: 'Load',
                handler: function() {
                    formPanel.getForm().load({
                        method: 'get',
                        url: 'form.json',
                        waitMsg: 'Loading...'
                    });
                }
            },
            {
                text: 'Save',
                formBind: true,
                handler: function() {
                    this.up('form').getForm().submit({
                        url: 'form.json',
                        submitEmptyText: false,
                        waitMsg: 'Saving Data...'
                    });
                }
            },
            {
                text: 'Reset',
                formBind: true,
                handler: function() {
                    this.up('form').getForm().reset();
                }
            }
        ]
    });
});
