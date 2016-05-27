(function () {
	'use strict';

	angular.module('App').controller('MobileManagement', MobileManagement);

	MobileManagement.inject = ['$scope', 'Mobiles', 'BrandLookups'];

	function MobileManagement($scope, Mobiles, BrandLookups) {

		$scope.Filter = {
			Model: '',
			BrandId: null
		};

		$scope.BrandLookups = BrandLookups;
		$scope.FilteredMobiles = Mobiles;

		$scope.SortField = 'Brand';
		$scope.sortOrder = 'Desc';

		$scope.Search = search;
		$scope.SelectMobile = selectMobile;

		var years = Mobiles.map(function (row) {
			return row.Year;
		}).reduce(function (yearMap, index) {
			yearMap[index] = ++yearMap[index] || 1;

			return yearMap;
		}, []);

		$scope.YearsData = Object.keys(years).map(function (key) {
			return { Year: key, Count: years[key] };
		});

		var brands = Mobiles.map(function (row) {
			return row.BrandName;
		}).reduce(function (brandMap, index) {
			brandMap[index] = ++brandMap[index] || 1;

			return brandMap;
		}, []);

		$scope.BrandsData = Object.keys(brands).map(function (key) {
			return { Brand: key, Count: brands[key] };
		});


		function search() {
			$scope.FilteredMobiles = Mobiles.filter(function (item) {
				return (item.Model.toLowerCase().indexOf($scope.Filter.Model.toLowerCase()) > -1) &&
					   ($scope.Filter.BrandId === null || item.BrandId === $scope.Filter.BrandId);
			});
			$scope.SelectedRow = '';
			$scope.SelectedMobile = null;
		};

		function selectMobile(mobile, index) {
			$scope.SelectedRow = index;
			$scope.SelectedMobile = mobile;
		}
	};
})();