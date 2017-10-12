(function() {

    'use strict';

    angular.module('app.patients', [])
        .config(PatientsStateProvider);

    function PatientsStateProvider($stateProvider) {
        $stateProvider
        .state('patients', {
            url: '/patients',
            templateUrl: 'patients.html',
            controller: 'PatientsController as pc'
        });
    }

})();