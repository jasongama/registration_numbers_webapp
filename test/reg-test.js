const assert = require('assert');
const regNumber = require("../regLogic");
const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost/my_registrations';

const pool = new Pool({
    connectionString
});
describe('The basic database web app', async function () {

    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query("insert into towns(locations) values('CA')")
        await pool.query("insert into towns(locations) values('CN')")
        await pool.query("insert into towns(locations) values('CL')")
        await pool.query("delete from registrations;");


    });

    it('It should add the registration numbers from Stellenbosch', async function () {

        // the Factory Function is called CategoryService
        let regs = regNumber(pool);

        await regs.addRegNumbers('CL 101111 ');

        assert.deepEqual([{
            descriptions: 'CL 101111 ',
            towns_id: 3
        }], await regs.finalList());

    });


    it("It should  add registration numbers from Wellington.", async function () {
        let regs = regNumber(pool);
        await regs.addRegNumbers('CN 67890');

        assert.deepEqual([{
            descriptions: 'CN 67890',
            towns_id: 2
        }], await regs.finalList());

    });
    it("It should  add registration numbers from CapeTown.", async function () {
        let regs = regNumber(pool);
        await regs.addRegNumbers('CA 485904');

        assert.deepEqual([{
            descriptions: 'CA 485904',
            towns_id: 1
        }], await regs.finalList());

    });




    it("It should not be able to  take a duplicate  registration number", async function () {
        let regs = regNumber(pool);
        await regs.addRegNumbers("CN 67890");
        await regs.addRegNumbers("CN 67890");
        await regs.addRegNumbers("CN 67890");
        await regs.addRegNumbers("CN 67890");


        assert.deepEqual([{
            descriptions: 'CN 67890',
            towns_id: 2
        }], await regs.finalList());

    });

    it("It should not be able to  take a duplicate  registration number", async function () {
        let regs = regNumber(pool);
        await regs.addRegNumbers("CN 67890");
        await regs.addRegNumbers("CN 67890");
        await regs.addRegNumbers("CN 67890");
        await regs.addRegNumbers("CN 67890");


        assert.deepEqual([{
            descriptions: 'CN 67890',
            towns_id: 2
        }], await regs.finalList());

    });


    it("It should not add a empty strings", async function () {
        let regs = regNumber(pool);
        await regs.addRegNumbers(" ");

        assert.deepEqual([], await regs.finalList());

    });
});