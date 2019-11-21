const assert = require('assert');
const regNumber = require("../regLogic");
const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost/greetings';

const pool = new Pool({
    connectionString
});
describe('The basic database web app', async function () {

    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query("delete from registrations;");

    });

    it('It should add all registrations numbers that is inserted into input box', async function () {

        // the Factory Function is called CategoryService
        let regs = regNumber(pool);
        await regs.addRegNumbers('CA 12364');
        await regs.addRegNumbers('CN 43398');
        await regs.addRegNumbers('CL 101111');




        assert.equal(['CA 12364', 'CN 43398', 'CL 101111'], await regs.finalList());

    });
    it("It should show all the registration numbers from Wellington.", async function () {
        let regs = regNumber(pool);
        await  regs.addRegNumbers('CN 82345');
        await regs.addRegNumbers('CL 64345');
        await regs.addRegNumbers('CA 10111');
        await regs.addRegNumbers('CN 74474');


        assert.deepEqual(['CN 82345', 'CL 64345', 'CA 10111','CN 74474'], await regs.filter("CN"));



    });

   it("it should be able to show all the registration numbers from capeTown ", async function () {

    
    let regs = regNumber(pool);
   await regs.addRegNumbers('CA 88488');
   await  regs.addRegNumbers('CN 82345');
    await regs.addRegNumbers('CL 64345');
    await regs.addRegNumbers('CA 10111');
    await regs.addRegNumbers('CA 76746');



    assert.deepEqual(['CN 82345', 'CL 64345', 'CA 10111', 'CA 76746','CA 88488' ], await regs.filter("CA"));

       });

        it("It should not be able to  take a duplicate  registration number", async function () {
            let regs = regNumber(pool);
           await regs.addRegNumbers ("CN 67890");
          await  regs.addRegNumbers ("CN 67890");
           await regs.addRegNumbers ("CN 67890");       
            await regs.addRegNumbers ("CN 67890");



            assert.deepEqual( [ 'CN 67890'] , await regs.finalList());

      

        });


});
