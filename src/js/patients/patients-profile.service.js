(function() {

    'use strict';

    angular
        .module('app.patients')
        .factory('PatientsProfile', PatientsProfile);

    PatientsProfile.$inject = ['$http'];

    function PatientsProfile($http) {

        var vm = {};

        vm.findByName = findByName;

        return vm;

        // ---

        function findByName(name) {
            return $http.get('http://pokeapi.co/api/v2/pokemon/' + name)
                .then(function(res) {
                    return res.data;
                });            
        }
    }

})();
