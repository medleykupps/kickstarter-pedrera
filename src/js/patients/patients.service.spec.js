describe('Patients factory', function() {

    var Patients;

    // Load our module were our service resides
    beforeEach(angular.mock.module('ui.router'));
    beforeEach(angular.mock.module('app.patients'));

    beforeEach(inject(function(_Patients_) {
        Patients = _Patients_;
    }));

    it('patients module has been loaded', function() {
        expect(Patients).toBeDefined();
    });

    describe('.all()', function() {

        it('should exist', function() {
            expect(Patients.all).toBeDefined();
        });

        it('should return patients list', function() {
            var expected = [{
                id: 1001,
                name: 'Joe Smith'
            }, {
                id: 1002,
                name: 'Wendy Smithers'
            }];
            var actual = Patients.all();
            expect(actual).toEqual(expected);
        });

    });

    describe('.findById()', function() {

        it('exists', function() {
            expect(Patients.findById).toBeDefined();
        });

        it('should find existing patient', function() {
            var expected = {
                id: 1002,
                name: 'Wendy Smithers'
            };
            var actual = Patients.findById(1002);
            expect(actual).toEqual(expected);
        });

        it('should not match non-existant patient', function() {
            var actual = Patients.findById(9999);
            expect(actual).not.toBeDefined();
        })
    });

});