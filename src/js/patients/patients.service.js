(function() {

    'use strict';

    angular.module('app.patients', [])
        .factory('Patients', function() {

            var Patients = {};

            var patientsList = [{
                    id: 1001,
                    name: 'Joe Smith'
                }, {
                    id: 1002,
                    name: 'Wendy Smithers'
                }];

            Patients.all = function() {
                return patientsList;
            };

            Patients.findById = function(id) {
                return patientsList.find(function(patient) {
                    return patient.id === id;
                });
            }

            return Patients;
        })

})();