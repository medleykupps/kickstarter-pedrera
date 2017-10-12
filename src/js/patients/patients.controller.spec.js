describe('PatientsController', function() {

    var $controller, PatientsController, Patients;

    beforeEach(angular.mock.module('ui.router'));
    beforeEach(angular.mock.module('app.patients'));

    beforeEach(inject(function(_$controller_, _Patients_) {
        $controller = _$controller_;
        
        Patients = _Patients_;
        spyOn(Patients, 'all').and.callFake(function() {
            return [{
                    id: 1001,
                    name: 'Joe Smith'
                }, {
                    id: 1002,
                    name: 'Wendy Smithers'
                }];
        });

        PatientsController = $controller('PatientsController', { Patients: Patients });
    }));

    it('exists', function() {
        expect(PatientsController).toBeDefined();
    });

    it('initialises list of patients', function() {
        var expected = [{
                    id: 1001,
                    name: 'Joe Smith'
                }, {
                    id: 1002,
                    name: 'Wendy Smithers'
                }];
        expect(Patients.all).toHaveBeenCalled();
        expect(PatientsController.patients).toEqual(expected);
    });
})
