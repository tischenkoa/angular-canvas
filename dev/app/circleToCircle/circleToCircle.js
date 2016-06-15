/**
 * Created by Artur on 15.06.16.
 */

'use strict';

module.exports = function CircleToCircle () {
	return {
		restict: 'E',
		replace: true,
		scope: {},
		template: require('./view/circleToCircle.html'),
		controllerAs: 'circleToCircleCtrl',
		controller: function (circleToCircleFactory) {
			var vm = this;
			circleToCircleFactory.init();
		}
	}
};
