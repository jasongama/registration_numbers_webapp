module.exports = function RegFactory(pool) {


    var holdingNoPlate = [];
    var final = [];
    var capetown;
    var Wellington;
    var Stellenbosch;
    var errMessage = "";
    var check;


    async function addRegNumbers(plate) {
        var regex = /[!@#$%^&*();,.?"^$:^+=${'}`_;''"\[.*?\]|<>]/i
        let testgex = regex.test(plate)
        var regStore = plate
        var regs = regStore.split(' ')
        regs[0] = regs[0].toUpperCase()
        let newReg = regs.join(' ')

        if (regStore !== '') {
            if (!testgex === true && newReg.length > 0) {
                if (newReg.startsWith("CA ") || newReg.startsWith("CN ") || newReg.startsWith("CL ")) {
                    let database = await pool.query('Select * from registrations WHERE descriptions  = $1', [newReg]);
                    check = await pool.query('select * from registrations')
                    if (database.rows.length === 0) {
                        if (!holdingNoPlate.includes(newReg)) {
                            holdingNoPlate.push(newReg)

                        }
                        if (newReg.startsWith("CA ")) {
                            // console.log('reg ' + newReg)
                            await pool.query('insert into registrations (descriptions , towns_id) values ($1, $2)', [newReg, 1]);
                            capetown = await pool.query('SELECT towns.locations , registrations.descriptions FROM towns INNER JOIN registrations ON towns.id = registrations.towns_id WHERE towns.id = 1;')
                            final = capetown.rows

                            return capetown.rows;
                        }
                        if (newReg.startsWith("CN ")) {
                            await pool.query('insert into registrations (descriptions , towns_id) values($1, $2)', [newReg, 2])
                            Wellington = await pool.query('SELECT towns.locations , registrations.descriptions FROM towns INNER JOIN registrations ON towns.id = registrations.towns_id WHERE towns.id = 2;')
                            final = Wellington.rows
                            return Wellington.rows;
                        }
                        if (newReg.startsWith("CL ")) {
                            await pool.query('insert into registrations (descriptions , towns_id) values($1, $2)', [newReg, 3])
                            Stellenbosch = await pool.query('SELECT towns.locations , registrations.descriptions FROM towns INNER JOIN registrations ON towns.id = registrations.towns_id WHERE towns.id = 3;')
                            final = Stellenbosch.rows;
                            return Stellenbosch.rows;
                        }
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
    }



    function getReg() {

        return holdingNoPlate;

    }


    async function filter(location) {


        if (location === ' ') {
            check = await pool.query('select * from registrations')
            final = check.rows;
        }
        if (location === 'CA') {
            capetown = await pool.query('SELECT towns.locations , registrations.descriptions FROM towns INNER JOIN registrations ON towns.id = registrations.towns_id WHERE towns.id = 1;')
            final = capetown.rows
        }
        if (location === 'CN') {
            Wellington = await pool.query('SELECT towns.locations , registrations.descriptions FROM towns INNER JOIN registrations ON towns.id = registrations.towns_id WHERE towns.id = 2;')
            final = Wellington.rows
        }
        if (location === 'CL') {
            Stellenbosch = await pool.query('SELECT towns.locations , registrations.descriptions FROM towns INNER JOIN registrations ON towns.id = registrations.towns_id WHERE towns.id = 3;')
            final = Stellenbosch.rows;
        }

    }

    function finalList() {
        return final
    }


    function getErrorMessage() {
        return errMessage;
    }
   function  getDatabase(){
     return database.rows.length 

     }

    return {
        addRegNumbers,
        getReg,
        filter,
        getErrorMessage,
        finalList,
        getDatabase
    }
}
