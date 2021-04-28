const express = require("express"),
    router = express.Router(),
    mainRouter = require("../Web_Pages/index")


router.get("/Dashboard/:id", mainRouter.isUser_Login, (req, res) => {
    // checkRole_GetData_FromDB(req.session.userInfo.userRole, req.session.userInfo.userInfo.login_id, res)
    console.log("Dashboard--------------> SuperVisor");
    // console.log("Gettt it  --------------------------> " + req.params.id);
    // console.log('Gettt it  --------------------------> ' + req.session.userData,
    // req.session.userPermissions)
    // console.log(req.session)
    // console.log('Gettt it  --------------------------> ' + req.session.userInfo.userInfo)

    // console.log(req.session);
});





/**
 * Determining that the user have to complete the profile
 * if the user is new then he / she should complete the profile then move ahead
 */

router.get("/completeProfile/:id", mainRouter.isUser_Login, (req, res) => {
    if (req.session.profileData.sup_name === null)
        res.status(200).render(`Supervisor/userProfile`,
            {
                message: req.flash('info', 'Please Complete your Profile')
            })
    else {
        res.status(200).redirect(`/supervisor/dashboard/${req.session.profileData.sup_uuid}`)
    }

});





router.get('/signout', (req, res) => {
    req.session.destroy()
    res.redirect('/login')
})




module.exports = { router };