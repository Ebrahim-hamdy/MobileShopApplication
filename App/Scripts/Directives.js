(function () {
	'use strict';

	angular.module('App').directive('sort', [function () {
		return {
			restrict: 'A',
			transclude: true,
			template:
			  '<a href="javascript:;" ng-click="onClick()">' +
				'<span ng-transclude></span>' +
				'<i class="pull-right glyphicon" ng-class="GetSortedIcon()"></i>' +
			  '</a>',
			scope: {
				sortOrder: '=',
				sortBy: '=',
				sortField: '='
			},
			link: function (scope, element, attrs) {

				scope.onClick = function () {

					if (scope.sortField === scope.sortBy) {
						scope.sortOrder = (scope.sortOrder === "Asc") ? "Desc" : "Asc";
					} else {
						scope.sortField = scope.sortBy;
						scope.sortOrder = 'Desc';
					}
				}

				scope.GetSortedIcon = function () {
					if (scope.sortField !== scope.sortBy) {
						return 'glyphicon-sort';
					} else {
						return scope.sortOrder === "Asc" ? "glyphicon-sort-by-attributes" : "glyphicon-sort-by-attributes-alt";
					}
				};
			}
		};
	}]);

	angular.module('App').directive('barChart', [function () {
		return {
			restrict: 'EA',
			scope: {
				data: '='
			},
			link: function (scope, element, attrs) {

				var margin = { top: 40, right: 20, bottom: 30, left: 40 },
				width = 600 - margin.left - margin.right,
				height = 300 - margin.top - margin.bottom;

				var formatPercent = d3.format("");

				var x = d3.scale.ordinal()
					.rangeRoundBands([0, width], .1);

				var y = d3.scale.linear()
					.range([height, 0]);

				var xAxis = d3.svg.axis()
					.scale(x)
					.orient("bottom");

				var yAxis = d3.svg.axis()
					.scale(y)
					.orient("left")
					.tickFormat(formatPercent);

				var tip = d3.tip()
				  .attr('class', 'd3-tip')
				  .offset([-10, 0])
				  .html(function (d) {
				  	return "<strong>Count:</strong> <span style='color:red'>" + d.Count + "</span>";
				  });

				var svg = d3.select(element[0]).append("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
				  .append("g")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

				svg.call(tip);

				x.domain(scope.data.map(function (d) { return d.Year; }));
				y.domain([0, d3.max(scope.data, function (d) { return d.Count; })]);

				svg.append("g")
					.attr("class", "x axis")
					.attr("transform", "translate(0," + height + ")")
					.call(xAxis);

				svg.append("g")
					.attr("class", "y axis")
					.call(yAxis)
				  .append("text")
					.attr("transform", "rotate(-90)")
					.attr("y", 6)
					.attr("dy", ".71em")
					.style("text-anchor", "end")
					.text("Count");

				svg.selectAll(".bar")
					.data(scope.data)
				  .enter().append("rect")
					.attr("class", "bar")
					.attr("x", function (d) { return x(d.Year); })
					.attr("width", x.rangeBand())
					.attr("y", function (d) { return y(d.Count); })
					.attr("height", function (d) { return height - y(d.Count); })
					.on('mouseover', tip.show)
					.on('mouseout', tip.hide);
			}
		};
	}]);

	angular.module('App').directive('dountChart', [function () {
		return {
			restrict: 'EA',
			scope: {
				data: '='
			},
			link: function (scope, element, attrs) {
				var dataset = [
					{ name: 'IE', percent: 39.10 },
					{ name: 'Chrome', percent: 32.51 },
					{ name: 'Safari', percent: 13.68 },
					{ name: 'Firefox', percent: 8.71 },
					{ name: 'Others', percent: 6.01 }
				];

				var pie = d3.layout.pie()
						.value(function (d) { return d.Count })
						.sort(null)
						.padAngle(.03);

				var w = 300, h = 300;

				var outerRadius = w / 2;
				var innerRadius = 100;

				var color = d3.scale.category10();

				var arc = d3.svg.arc()
						.outerRadius(outerRadius)
						.innerRadius(innerRadius);

				var svg = d3.select(element[0])
						.append("svg")
						.attr({
							width: w,
							height: h,
							class: 'shadow'
						}).append('g')
						.attr({
							transform: 'translate(' + w / 2 + ',' + h / 2 + ')'
						});



				var path = svg.selectAll('path')
						.data(pie(scope.data))
						.enter()
						.append('path')
						.attr({
							d: arc,
							fill: function (d, i) {
								return color(d.data.Brand);
							}
						});

				path.transition()
					.duration(1000)
					.attrTween('d', function (d) {
						var interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
						return function (t) {
							return arc(interpolate(t));
						};
					});

				var text = svg.selectAll('text')
				  .data(pie(scope.data))
				  .enter()
				  .append("text")
				  .transition()
				  .duration(200)
				  .attr("transform", function (d) {
				  	return "translate(" + arc.centroid(d) + ")";
				  })
				 .attr("dy", ".4em")
				  .attr("text-anchor", "middle")
				  .text(function (d) {
				  	return d.data.Count + "%";
				  })
				  .style({
				  	fill: '#fff',
				  	'font-size': '10px'
				  });

				var legendRectSize = 20;
				var legendSpacing = 7;
				var legendHeight = legendRectSize + legendSpacing;


				var legend = svg.selectAll('.legend')
				  .data(color.domain())
				  .enter()
				  .append('g')
				  .attr({
				  	class: 'legend',
				  	transform: function (d, i) {
				  		return 'translate(-35,' + ((i * legendHeight) - 65) + ')';
				  	}
				  });

				legend.append('rect')
				  .attr({
				  	width: legendRectSize,
				  	height: legendRectSize,
				  	rx: 20,
				  	ry: 20
				  })
				  .style({
				  	fill: color,
				  	stroke: color
				  });

				legend.append('text')
				  .attr({
				  	x: 30,
				  	y: 15
				  })
				  .text(function (d) {
				  	return d;
				  }).style({
				  	fill: '#929DAF',
				  	'font-size': '14px'
				  });
			}
		};
	}]);
})();