(function (run, load) {
	'use strict';

    run({ watch: true });

    load('list', '#todoapp');

})(
    window.morgen.run,
    window.morgen.load
);
