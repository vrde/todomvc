(function (register, create, dispatch) {
	'use strict';

    register('list', function (c) {
        c.routes = [
            ['/', function () {
                console.log('root');
            }],
            ['/active', function (e) {

                console.log('active', e);
            }],
            ['/completed', function () {

                console.log('completed');
            }]
        ];

        c.events = {
            'submit #new-todo-form': function (e) {
                dispatch('db:new', { label: c.get('newtodo') });
                c.set('newtodo', '');
                e.preventDefault();
            },

            'change #toggle-all': function () {
                dispatch('list:toggleAll');
                dispatch('list:update');
            },

            'click #clear-completed': function () {
                dispatch('list:clearAll');
                dispatch('list:update');
            },

            'db:new': function (e) {
                var el = create('item', e.detail).element;
                c.$$('#todo-list').appendChild(el);
                dispatch('list:update');
            },

            'list:update': function () {
                var left      = c.$('.todo-item:not(.completed)').length,
                    completed = c.$('.todo-item.completed').length;

                c.set('left', left);
                c.set('completed', completed);

                c.$$('#clear-completed').classList.toggle('hidden', !completed);
            }
        };

    });

})(
    window.morgen.register,
    window.morgen.create,
    window.morgen.dispatch
);
