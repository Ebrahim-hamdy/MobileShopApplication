(function () {
	'use strict';

	angular.module('App').controller('MobileAdd', MobileAdd);

	MobileAdd.inject = [
		'$scope', '$state',
		'MobileRepository', 'BrandLookups', 'MemoryLookups'
	];

	function MobileAdd($scope, $state, MobileRepository, BrandLookups, MemoryLookups) {

		$scope.BrandLookups = BrandLookups;
		$scope.MemoryLookups = MemoryLookups;

		$scope.Save = save;
		$scope.Back = back;

		function save() {
			if ($scope.frm.$valid) {

				$scope.Mobile.BrandName = $scope.BrandLookups.find(function (item) {
					return item.id === $scope.Mobile.BrandId;
				}).name;

				$scope.Mobile.MemoryName = $scope.MemoryLookups.find(function (item) {
					return item.id === $scope.Mobile.MemoryId;
				}).name;

				MobileRepository.SaveMobile($scope.Mobile);

				alert('Mobile Saved Succefully');
				$state.go('MobileManagement');

			} else {

				alert('Please Enter Valid Data');
			}
		};

		function back() {
			$state.go('MobileManagement');
		};
	};
})();