describe('Patients profile service', function() {

    var PatientsProfile, $q, $httpBackend,
        api = 'http://pokeapi.co/api/v2/pokemon/'
        mockResponse = {
            'id': 25,
            'name': 'pikachu',
            'sprites': {
                'front_default': 'http://pokeapi.co/media/sprites/pokemon/25.png'
            },
            'types': [{
                'type': { 'name': 'electric' }
            }]
        };

    beforeEach(angular.mock.module('ui.router'));
    beforeEach(angular.mock.module('app.patients'));

    beforeEach(inject(function(_PatientsProfile_, _$q_, _$httpBackend_) {
        PatientsProfile = _PatientsProfile_;
        $q = _$q_;
        $httpBackend = _$httpBackend_;
    }));

    it('should exist', function() {
        expect(PatientsProfile).toBeDefined();
    });

    describe('findByName()', function() {

        var result;

        beforeEach(function() {
            result = {};
            spyOn(PatientsProfile, 'findByName').and.callThrough();
        });

        it('should return a profile with a valid name', function() {
            var search = 'pikachu';
            $httpBackend.whenGET(api + search).respond(200, $q.when(mockResponse));
            expect(PatientsProfile.findByName).not.toHaveBeenCalled();
            expect(result).toEqual({});

            PatientsProfile.findByName(search)
                .then(function(res) {
                    result = res;
                });
            
            $httpBackend.flush();

            expect(PatientsProfile.findByName).toHaveBeenCalledWith(search);
            expect(result.id).toEqual(25);
            expect(result.name).toEqual('pikachu');
            expect(result.sprites.front_default).toContain('.png');
            expect(result.types[0].type.name).toEqual('electric');
        });
    });

});
