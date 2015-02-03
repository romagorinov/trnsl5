Ext.define('App.view.manage.spec.GridSpecC', {
    extend: 'Ext.app.ViewController',
    requires: [
        'App.view.manage.spec.GridSpecM',
    ],
    alias: 'controller.gridSpec',

    control: {
        '#': {
            edit: function (editor, context) {
                console.log('edit');
                var storeSpec = context.grid.getViewModel().getStore('spec');
                storeSpec.sync({
                    failure: function () {
                        Ext.MessageBox.alert('Ошибка', 'Не сохранено');
                    },
                    scope: this
                });
            }
        },

        '#instruction': {
            click: function (button) {
                window.open('resources/php/instruction.php?taskname=speciality&subsystem=manage'/*, '_blank', 'directories=0,titlebar=0,toolbar=0,location=0,statusbar=0,menubar=0'*/);
            }
        },
        '#refreshGridSpecS': {
            click: function (button) {
                console.log('click refreshGridSpecS');

                var grid = this.getView(),
                    storeSpec = grid.getViewModel().getStore('spec');
                storeSpec.reload();
            }
        },
        'button[action=add]': {
            click: function (button) {
                console.log('action=add');

                var grid = button.up('grid'),
                    storeSpec = grid.getViewModel().getStore('spec'),
                    treeSpec = button.up('#content').down('treeSpec'),
                    selectedTree = treeSpec.getSelected();
                if (selectedTree) {
                    if (selectedTree.raw.leaf) {
                        var groupid = selectedTree.raw.groupid,
                            orgid = selectedTree.raw.orgid,
                            actid = selectedTree.raw.actid;
                        var newRecord = storeSpec.add({
                                groupid:groupid,
                                orgid:orgid,
                                actid:actid
                            })[0];
                        storeSpec.insert(0, newRecord);
                        storeSpec.sync();
                        var main = Ext.ComponentQuery.query('main')[0],
                            vm = main.getViewModel(),
                            store = vm.getStore('spec');
                        store.reload();
                    } else {
                        Ext.Msg.alert('Ошибка', 'Не выбрана группа');
                    }
                } else {
                    Ext.Msg.alert('Ошибка', 'Не выбрана группа');
                }
            }
        },
        'button[action=delete]': {
            click: function (button) {
                console.log('action=delete');

                var grid = button.up('grid'),
                    selection = grid.getSelected(),
                    storeSpec = grid.getViewModel().getStore('spec');
                if (selection) {
                    storeSpec.remove(selection);
                    storeSpec.sync({
                        failure: function () {
                            Ext.MessageBox.alert('Ошибка', 'Специальность не удалена');
                        },
                        scope: this
                    });
                } else {
                    Ext.Msg.alert('Ошибка', 'Не выбрана специальность');
                }
            }
        }

    }
});