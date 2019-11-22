module.exports = function RegFactory(pool) {

    var holdingNoPlate = [];
    var final = [];
    var capetown;
    var Wellington;
    var Stellenbosch;
    var errMessage = "";
    var check;
    let database;
    let newReg;
    var regex = /[!@#$%^&*();,.?"^$:^+=${'}`_;''"\[.*?\]|<>]/i

    async function addRegNumbers(plate) {

        let testgex = regex.test(plate)
        var regStore = plate
        var regs = regStore.split(' ')
        regs[0] = regs[0].toUpperCase()
        newReg = regs.join(' ')

        if (newReg !== ' ') {
            if (!testgex === true && newReg.length > 0) {
                if (newReg.startsWith("CA ") || newReg.startsWith("CN ") || newReg.startsWith("CL ")) {

                    database = await pool.query('Select * from registrations WHERE descriptions  = $1', [newReg]);
                    check = await pool.query('select * from registrations')

                    if (database.rows.length === 0) {
                        if (!holdingNoPlate.includes(newReg)) {
                            holdingNoPlate.push(newReg)
                        }
                        if (newReg.startsWith("CA ")) {
                            await pool.query('insert into registrations (descriptions , towns_id) values ($1, $2)', [newReg, 1]);
                            capetown = await pool.query('SELECT towns.locations , registrations.descriptions FROM towns INNER JOIN registrations ON towns.id = registrations.towns_id WHERE towns.id = 1;')
                            final = capetown.rows
                        }
                        if (newReg.startsWith("CN ")) {
                            await pool.query('insert into registrations (descriptions , towns_id) values($1, $2)', [newReg, 2])
                            Wellington = await pool.query('SELECT towns.locations , registrations.descriptions FROM towns INNER JOIN registrations ON towns.id = registrations.towns_id WHERE towns.id = 2;')
                            final = Wellington.rows

                        }
                        if (newReg.startsWith("CL ")) {
                            await pool.query('insert into registrations (descriptions , towns_id) values($1, $2)', [newReg, 3])
                            Stellenbosch = await pool.query('SELECT towns.locations , registrations.descriptions FROM towns INNER JOIN registrations ON towns.id = registrations.towns_id WHERE towns.id = 3;')
                            final = Stellenbosch.rows;

                        }
                    }
                } else {
                    return false
                }
            }

        }

    }

    function getReg() {

        return holdingNoPlate;

    }


    async function filter(location) {

        if (location === '') {
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

    async function finalList() {
        let db = await pool.query('select descriptions, towns_id from registrations')
        return db.rows
    }

    function getErrorMessage() {
        return errMessage;
    }
    async function getDatabase(reg) {
        var regs = reg.split(' ')
        regs[0] = regs[0].toUpperCase()
        newReg = regs.join(' ')
        database = await pool.query('Select * from registrations WHERE descriptions  = $1', [newReg]);

        return database.rows.length

    }
    async function resetbtn() {
        final = [];
        await pool.query('DELETE FROM registrations')

    }
    async function regList() {
        return regex
    }


    return {
        addRegNumbers,
        getReg,
        filter,
        getErrorMessage,
        finalList,
        getDatabase,
        resetbtn,
        regList

    }
}