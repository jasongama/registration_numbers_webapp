module.exports = function regRouter(regNumbers) {
    async function index(req, res) {
        res.render("index", {
            // numberPlates: await regNumbers.finalList(),
            numberPlates: await regNumbers.finalevent(),
            message: req.flash('error')
        })

    }

    async function reset() {

        await regNumbers.resetbtn()
    }

    return {
        index,
        regNumbers,
        reset,
    }
}