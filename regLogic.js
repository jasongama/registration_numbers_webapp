module.exports = function RegFactory(pool) {


    var holdingNoPlate = [];
    
    var errMessage = "";


    async function addRegNumbers(plate) {
        var regex = /[!@#$%^&*();,.?"^$:^+=${'}`_;''"\[.*?\]|<>]/i
        let testgex = regex.test(plate)
       var regStore = plate
        var regs = regStore.split(' ')
        regs[0] = regs[0].toUpperCase()
        let newReg = regs.join(' ') 
        console.log(newReg);

        if(regStore !== ''){
        if (!testgex === true && plate.length > 0) {
            if (newReg.startsWith("CA ") || newReg.startsWith("CN ") || newReg.startsWith("CL ")) {
                 let database = await pool.query('Select * from registrations WHERE descriptions  = $1', [newReg]);
                 if (database.rows.length === 0) {
                    if (!holdingNoPlate.includes(newReg)) {
                        holdingNoPlate.push(newReg)
                        console.log(holdingNoPlate);
                        return true;
                    }
                if (newReg.startsWith("CA ")) {
                    await pool.query('insert into registrations (descriptions , towns_id) values ($1, $2)', [newReg, 1]);
                    let capetown = await pool.query('SELECT towns.locations , registrations.descriptions FROM towns INNER JOIN registrations ON towns.id = registrations.towns_id WHERE towns.id = 1;')
                    return capetown.rows;
                }
                if (newReg.startsWith("CN ")) {
                    await pool.query('insert into registrations (descriptions , towns_id) values($1, $2)', [newReg, 2])
                    let Wellington = await pool.query('SELECT towns.locations, registrations.descriptions FROM towns INNER JOIN registrations ON towns.id = registrations.towns_id WHERE towns.id= 2')
                    return Wellington.rows;
                }
                if (newReg.startsWith("CL ")) {
                    await pool.query('insert into registrations (descriptions , towns_id) values($1, $2)', [newReg, 3])
                    let Stellenbosch = await pool.query('SELECT towns.locations, regsitrations.descriptions FROM towns INNER JOIN rgistrations on towns.id = registrations.towns_id WHERE towns.id = 3')
                    return Stellenbosch.rows;
                }
            }
                
                else {
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