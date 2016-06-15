/**
 * Created by Artur on 14.06.16.
 */

module.exports = function BuyPlan () {
	return {
		restict: 'E',
		replace: true,
		scope: {},
		template: require('./view/buyPlan.html'),
		controllerAs: 'buyPlanCtrl',
		controller: function ($http) {
			var vm = this;
			$http.get('./data/data.json').then(function (response) {
				vm.plans = response.data.plans;
				vm.options = response.data.options;
			});

			vm.getTotalPrice = function () {
				if (vm.selectedPlan && vm.selectedNumberOfLicenses) {
					vm._totalPrice = vm.selectedPlan.price * vm.selectedNumberOfLicenses;
				} else {
					vm._totalPrice = 0;
				}
				return vm._totalPrice;
			}

			vm.selectPlan = function (plan) {
				vm.selectedPlan = plan;
				vm.errorSend = '';
			};

			vm.sendBuy = function () {
				if (vm.selectedPlan && vm.selectedNumberOfLicenses) {
					vm.order = {
						plan: vm.selectedPlan,
						NumberOfLicenses: vm.selectedNumberOfLicenses,
						totalPrice: vm._totalPrice
					};
					console.log(vm.order);
/*					$http.post('/data/', vm.order).then(function (response) {
						console.log(response);
					});*/
					alert('send: ' + JSON.stringify(vm.order));
				} else {
					vm.validBuy();
				}
			};

			vm.validBuy = function () {
				if (!vm.selectedPlan) {
					vm.errorSend = 'Select license plan!'
				} else if (!vm.selectedNumberOfLicenses) {
					vm.errorSend = 'Select number of licenses!'
				} else {
					vm.errorSend = '';
				}

			}
		}
	}
};