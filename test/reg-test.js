describe('Registration', function () {
    it("it should be able to assign the list of registration numbers ", function () {
        var input =  RegFactory(["CA 12345", "CL 12345", "CN 45535"]);
       
        assert.deepEqual(  ["CA 12345", "CL 12345", "CN 45535"] , input.getReg());

    });
   
    it("It should show the registration numbers that startWith CL, when the filter button is clicked.", function () {
        var input =  RegFactory();
        input.addRegNumbers ("CA 12364");
        
        input.addRegNumbers ("CN 43398");
        input.addRegNumbers ("CL 453436");
        input.addRegNumbers ("CL 101111");
        
       
        assert.deepEqual(  [ 'CL 453436', 'CL 101111' ], input.filter("CL"));

    });
  
    it("It should not be able to  take a duplicate  registration number", function () {
        var input =  RegFactory();
        input.addRegNumbers ("CN 67890");
        input.addRegNumbers ("CN 67890");
        input.addRegNumbers ("CN 67890");       
        input.addRegNumbers ("CN 67890");
       
        
       
        assert.deepEqual( [ 'CN 67890'] , input.getReg());

    });
    it("It should give you an errormessange, when you try to add a empty string", function () {
        var input =  RegFactory();
        input.addRegNumbers ("");
        assert.deepEqual(  'Please Enter A Valid Registration number' , input.getErrorMessage());

    });


 
 
    it("It should show all the registration numbers from cape town. ", function () {
        var input =  RegFactory();
        input.addRegNumbers ("CA 12345");
        input.addRegNumbers ("CA 34345");
        input.addRegNumbers ("CA 91111");
        input.addRegNumbers ("CA 74747");
       
        
       
        assert.deepEqual( [ "CA 12345", "CA 34345", "CA 91111", "CA 74747" ] , input.filter('CA'));
        

    });
    
     
    it("It should show all the registration numbers from Wellington.", function () {
        var input =  RegFactory();
        
        input.addRegNumbers ("CN 82345");
        input.addRegNumbers ("CN 64345");
        input.addRegNumbers ("CN 10111");
        
        
       
        assert.deepEqual( [ 'CN 82345', 'CN 64345', 'CN 10111' ], input.filter("CN"));
      

    });
    
         
    it("It should show all the registration numbers from Stellenbosch.", function () {
        var input =  RegFactory();
        
        input.addRegNumbers ("CL 65345");
        input.addRegNumbers ("CL 04345");
        input.addRegNumbers ("CL 80111");
        
        
       
        assert.deepEqual( [ 'CL 65345', 'CL 04345', 'CL 80111' ], input.filter("CL"));
      

    });
    it("It should give  you an errorMessage when you try to insert the same registartion number", function () {
        var input =  RegFactory();
        input.addRegNumbers ("CN 67890");
        input.addRegNumbers ("CN 67890");
        input.addRegNumbers ("CN 67890");       
        input.addRegNumbers ("CN 67890");
       
        
       
        assert.deepEqual( 'The registration number already exist' , input.getErrorMessage());

    });
    it("It should give  you an errorMessage if the town is invalid ", function () {
        var input =  RegFactory();
        input.addRegNumbers ("Ck 67890");
 
        
       
        assert.deepEqual( 'Invalid Town' , input.getErrorMessage());

    });
  
   
});
