module.exports=function regRouter(regNumbers){
    async function index(req,res){
               res.render("index", {   
               numberPlates: await regNumbers.getReg(),
                // message: req.flash('error'),
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