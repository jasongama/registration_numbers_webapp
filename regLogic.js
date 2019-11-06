function RegFactory(validplate) {


    var holdingNoPlate = validplate || [];

    var errMessage = "";


    function addRegNumbers(plate) {



        var regex = /[!@#$%^&*();,.?"^$:^+=${'}`_;''"\[.*?\]|<>]/i
        let testgex = regex.test(plate)


        if (!testgex === true && plate.length > 0) {
            if (plate.startsWith("CA ") || plate.startsWith("CN ") || plate.startsWith("CL ")) {
                if (!holdingNoPlate.includes(plate)) {
                    holdingNoPlate.push(plate)
                    return true;
                } else {
                    // this doesn't accept duplicate
                    errMessage = "The registration number already exist";


                }



            } else {
                errMessage = "Invalid Town"

            }

        } else {
            errMessage = "Please Enter A Valid Registration number"

        }



    }



    function getReg() {

        return holdingNoPlate;

    }


    function filter(location) {

        var storeNumberPlate = [];

        for (var i = 0; i < holdingNoPlate.length; i++) {
            var currentReg = holdingNoPlate[i]
            if (holdingNoPlate[i].startsWith(location)) {
                storeNumberPlate.push(currentReg)
            }

        }
        // console.log(storeNumberPlate)
        return storeNumberPlate;
    }

    function getErrorMessage() {
        return errMessage;
    }


    return {
        addRegNumbers,
        getReg,
        filter,
        getErrorMessage

    }
}