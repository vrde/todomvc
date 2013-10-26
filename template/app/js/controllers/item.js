(function (register, dispatch) {
	'use strict';

    register('item', function (c) {
        c.events = {
            'change [type="checkbox"]': function (e) {
                c.element.classList.toggle('completed', e.target.checked);
                dispatch('list:update');
            },

            'dblclick label': function () {
                console.log('dbl click');
                c.element.classList.add('editing');
            },

            'keypress .edit': function (e) {
                if (e.which == 13) {
                    c.element.classList.remove('editing');
                    c.set('label', c.$$('.edit').value);
                }
            },

            'click .destroy': function () {
                c.remove();
                dispatch('list:update');
            },


            'list:toggleAll': function () {
                var cl = c.element.classList;
                cl.toggle('completed');
                c.$$('[type="checkbox"]').checked = cl.contains('completed');
            },

            'list:clearAll': function () {
                var completed = c.element.classList.contains('completed');
                if (completed)
                    c.remove();
            }
        };

        c.render('item', c.extras);
    });

})(window.morgen.register,
   window.morgen.dispatch);

