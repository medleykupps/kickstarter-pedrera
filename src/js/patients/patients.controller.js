(function() {

    'use strict';

    angular.module('app.patients')
        .controller('PatientsController', PatientsController);

    function PatientsController(Patients) {
        
        var vm = this;

        vm.patients = [];

        activate();

        // ---

        function activate() {
            vm.patients = Patients.all();
        }
    }

})();