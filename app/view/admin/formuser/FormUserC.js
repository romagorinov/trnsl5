Ext.define('App.view.admin.formuser.FormUserC', {
    extend: 'Ext.app.ViewController',
    requires: [

    ],
    alias: 'controller.formuser',

    control: {
        'button[action=save]': {
            click: function (button) {
                console.log('save button');

                var form = button.up('form'),
                    win = form.up('window'),
                    values = form.getValues(),
                    grid = Ext.ComponentQuery.query('gridUser')[0],
                    record = form.getForm().getRecord();
                if (form.isValid()) {
                    record.set(values);
                    win.close();
                    grid.store.load();
                } else {
                    Ext.Msg.alert('Форма', 'Форма заполнена не правильно');
                }
            }
        },
        'button[action=cancel]': {
            click: function (button) {
                console.log('cancel button');

                button.up('form').getForm().reset();
                button.up('window').close();
            }
        }

    }
});
