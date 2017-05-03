(function () {
    "use strict";

    var app = angular.module("TendrlModule");

    app.service("dashboardStore", dashboardStore);

    /*@ngInject*/
    function dashboardStore($state, $q, utils) {
        var store = this;

        store.getClusterDashboardList = function(cluster_id) {
            var list,
                deferred;

            deferred = $q.defer();

            utils.getClusterDashboardList(cluster_id)
                .then(function(data) {
                    list = data.stats ? data.stats : [];
                    deferred.resolve(list);
                });

            return deferred.promise;
        };

        store.getClusterDashboardUtilizationList = function(cluster_id){
            var list,
                deferred;

            deferred = $q.defer();
            utils.getClusterDashboardList(cluster_id, true)
                .then(function(data) {
                    list = data && data.stats[0] && data.stats[0].datapoints ? data.stats[0].datapoints : [];
                    deferred.resolve(list);
                });

            return deferred.promise;
        };

        store.filterAlerts = function(alerts, clusterType){
            var i,
                alertsLen = alerts.length,
                clusterAlerts = [];

            for(i = 0; i < alertsLen; i++){
                if(alerts[i].sdsName && alerts[i].sdsName === clusterType){
                    clusterAlerts.push(alerts[i]);
                }
            }
            return clusterAlerts;
        }

        store.convertTime = function(epocTime){
            var utcSeconds = epocTime,
            d = new Date(0);
            d.setUTCSeconds(utcSeconds);
            return d;
        }
    }
})();