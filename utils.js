checkAdmin = function checkAuthenticationAdmin(req,res,next){
    if (req.isAuthenticated() && req.user.role === "Admin") {
        next();
    }else {
        res.render('forbidden', {});
    }
}
checkUser = function checkAuthenticationUser(req,res,next){
    if (req.isAuthenticated()) {
        next();
    }else {
        res.render("/login");
    }
}
module.exports = {checkAdmin, checkUser};
