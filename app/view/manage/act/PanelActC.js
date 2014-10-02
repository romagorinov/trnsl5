Ext.define('App.controller.manage.PanelActC', {
    extend: 'Ext.app.Controller',
    views: [
        'manage.GridActV'
    ],
    models: [
        'manage.GridActM'
    ],
    stores: [
        'manage.GridActS'
    ],
    refs: [
        {
            ref: 'gridAct',
            selector: 'gridAct'
        }
    ],

    onLaunch: function () {
        var me = this;
    },
    init: function () {
        console.log('PanelActC init');

        this.control({
            'gridAct': {
                validateedit: function (editor, e) {
                    console.log('edit');

                    var storeTool = Ext.data.StoreManager.lookup('admin.FormToolS'),
                        maxquestion = storeTool.getAt(0).get('maxquestion'),
                        examtimermin = e.value;
                    if(e.field == 'timelimit'){
                        if ((examtimermin % maxquestion) == 0) {
                            if (!examtimermin || examtimermin == 0) {
                                Ext.Msg.alert('Лимит времени -ошибка', 'Значение должно быть не 0');
                                return false;
                            } else
                                return true;
                        } else {
                            Ext.Msg.alert('Лимит времени -ошибка', 'Количество времени на экзамен (' + examtimermin + ') должно быть кратно числу вопросов в билете (' + maxquestion + ')');
                            return false;
                        }
                    }
                }
            },
            'gridAct #instruction': {
                click: function (button) {
                    window.open('resources/php/instruction.php?taskname=activity&subsystem=manage'/*, '_blank', 'directories=0,titlebar=0,toolbar=0,location=0,statusbar=0,menubar=0'*/);
                }
            },
            '#refreshGridActS': {
                click: function (button) {
                    console.log('click refreshGridActS');

                    var gridAct = this.getGridAct();
                    gridAct.store.load();
                }
            },
            'gridAct button[action=add]': {
                click: function (button) {
                    console.log('action=add');

                    var grid = button.up('grid'),
                        newRecord = Ext.create('App.model.manage.GridActM');
                    grid.store.insert(0, newRecord);
                }
            },
            'gridAct button[action=delete]': {
                click: function (button) {
                    console.log('action=delete');

                    var grid = button.up('grid'),
                        selection = grid.getSelected();
                    /*controllerQuestion = App.app.getController('manage.PanelQuestionC'),
                     tree = controllerQuestion.getTreeQuestion()*/
                    if (selection) {
                        var actid = selection.get('actid'),
                            storeGroup = Ext.StoreManager.lookup('manage.GridGroupS'),
                            recGroup = storeGroup.findRecord('actid', actid, 0,false,true,true);
                        // * проверка, что нет видов деятельности в группах
                        if (!recGroup) {
                            grid.store.remove(selection);
                        } else {
                            Ext.Msg.alert('Не удалено', 'Есть привязка в группах к данному виду деятельности');
                        }
                    }
                }
            }
        });
        console.log('PanelActC end');
    }
});