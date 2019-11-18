module.exports=function regRouter(regNumbers){
    async function index(req,res){
               res.render("index", {   
               numberPlates: await regNumbers.finalList(),
             //   regNumber: await regNumbers.fliter(res.body.regNumber)
                message: req.flash('error')
            })
         
        
        

    }

    
        // async function reset(){
            
        //     await regRouter.resetbtn()
        // }
     
     return {
         index,
         regNumbers, 
        //  reset
     }
 }