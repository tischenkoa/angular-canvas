/**
 * Created by Artur on 14.06.16.
 */

module.exports = angular.module('circleToCircle', [])
	.directive('circleToCircle', require('./circleToCircle'))
	.factory('circleToCircleFactory', require('./circleToCircleFactory'));
