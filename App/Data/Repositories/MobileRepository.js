(function () {
	'use strict';

	angular.module('Data').factory('MobileRepository', MobileRepository);
	MobileRepository.$inject = [];

	function MobileRepository() {

		var mobiles = [];

		function getBrandLookups() {
			var brandLookups = [
				{ id: 1, name: 'Samsung' },
				{ id: 2, name: 'Apple' },
				{ id: 3, name: 'Nokia' },
				{ id: 4, name: 'LG' },
				{ id: 5, name: 'Sony' }
			];

			return brandLookups;
		};

		function getMemoryLookups() {
			var memoryLookups = [
				{ id: 1, name: '16GB' },
				{ id: 2, name: '32GB' },
				{ id: 3, name: '64GB' },
				{ id: 4, name: '128GB' }
			];

			return memoryLookups;
		};

		function getMobiles() {

			mobiles = [
				{ Year: 2016, BrandId: 1, BrandName: 'Samsung', Model: 'S6' },
				{ Year: 2010, BrandId: 2, BrandName: 'Apple', Model: 'iPhone4' },
				{ Year: 2008, BrandId: 3, BrandName: 'Nokia', Model: '6600' },
				{ Year: 2012, BrandId: 4, BrandName: 'LG', Model: 'Nexus' },
				{ Year: 2011, BrandId: 5, BrandName: 'Sony', Model: 'Z2' }
			];

			var saved = JSON.parse(localStorage.getItem('savedMobiles'));
			var retrievedMobiles = saved ? saved : mobiles;

			return retrievedMobiles;
		};

		function saveMobile(mobile) {
			var newMobiles = JSON.parse(localStorage.getItem('savedMobiles'));
			var savedMobiles = newMobiles ? newMobiles : mobiles;
			savedMobiles.splice(0, 0, mobile);
			localStorage.setItem('savedMobiles', JSON.stringify(savedMobiles));
		};

		return {
			GetBrandLookups: getBrandLookups,
			GetMemoryLookups: getMemoryLookups,
			GetMobiles: getMobiles,
			SaveMobile: saveMobile
		};
	}
})();