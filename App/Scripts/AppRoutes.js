(function () {
	'use strict';

	angular.module('App').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise("/MobileManagement");

		$stateProvider
			.state("MobileManagement", {
				url: "/MobileManagement",
				templateUrl: "App/Modules/MobileManagement/MobileManagement.html",
				controller: "MobileManagement",
				resolve: {
					Mobiles: [
						'MobileRepository', function (mobileRepository) {
							return mobileRepository.GetMobiles();
						}
					],
					BrandLookups: [
						'MobileRepository', function (mobileRepository) {
							return mobileRepository.GetBrandLookups();
						}
					]
				}
			})

			.state("MobileAdd", {
				url: "/MobileAdd",
				templateUrl: "App/Modules/MobileAdd/MobileAdd.html",
				controller: "MobileAdd",
				resolve: {
					BrandLookups: [
						'MobileRepository', function (mobileRepository) {
							return mobileRepository.GetBrandLookups();
						}
					],
					MemoryLookups: [
						'MobileRepository', function (mobileRepository) {
							return mobileRepository.GetMemoryLookups();
						}
					]
				}
			});
	}]);
})();