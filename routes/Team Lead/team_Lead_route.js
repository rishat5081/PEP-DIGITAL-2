const
    { TeamLead_Notifications, WebAds,
        Team_Lead, Supervisor, City_Areas, User_Login_Information, City_and_Supervisor_associate, City } = require("../../Configuration Files/Sequelize/Database_Synchronization"),
    { sequelize } = require("../../Configuration Files/Sequelize/Sequelize Models/Department"),
    express = require("express"),
    router = express.Router(),
    { isUser_Login } = require("../Web_Pages/index")



/**
 * Checking if the user uuid  is the equal to the  session  uuid
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */

const isUserAuthentic = (req, res, next) => {
    if (req.params.teamLeadUUID === req.session.profileData.team_L_uuid)
        next()
    else
        res.redirect(`/teamlead/dashboard/${req.session.profileData.team_L_uuid}`)
}

/**
 * this is the dashboard 
 */
router.get("/dashboard/:teamLeadUUID", isUser_Login, isUserAuthentic, async (req, res) => {
    /**
     * getting the unread notification number 
     */

    let unreadNotificationCount = await countofNotificationOfExecutive(req.session.profileData.team_L_uuid)

    /**
     * getting the web ADS from the DB to display the user copany information
     */
    let webAds = await WebAds.findAll({
        attributes: ['title', 'description', 'picPath'],
        where: {
            paused: 0,
            deleted: 0,
            user_role_id: req.session.passport.user.userRole.user_role_id
        }
    })

    /**
     * getting supervisor and city area name of the selected user who is currently 
     * in the session
     */
    let teamLeadDashboard = await Team_Lead.findOne({
        attributes: [],
        include: [{
            model: Supervisor,
            required: true,
            attributes: ['sup_name'],
            where: {
                sup_isPaused: 0,
                sup_isDeleted: 0
            }
        },
        {
            model: City_Areas,
            required: true,
            attributes: ['city_name'],
            where: {
                deleted: 0,
                paused: 0
            }
        }],
        where: {
            team_L_id: req.session.profileData.team_L_id,
            team_L_isDeleted: 0,
            team_L_isPaused: 0
        }
    })
        .then(data => {
            if (data)
                return data
            else
                return null
        })
        .catch(error => {
            if (error) {
                console.error('Error Fetchin Dashboard Data of Team Lead')
                console.trace(error)
                return null
            }
        })


    let profileData = Object.assign({}, {
        team_L_name: req.session.profileData.team_L_name,
        team_L_userProfilePic: req.session.profileData.team_L_userProfilePic,
        team_L_username: req.session.profileData.team_L_username,
        team_L_contact: req.session.profileData.team_L_contact,
        createdAt: req.session.profileData.createdAt,
        team_L_salary: req.session.profileData.team_L_salary,
        sup_name: teamLeadDashboard.dataValues.Supervisor.dataValues.sup_name,
        city_name: teamLeadDashboard.dataValues.City_Area.dataValues.city_name
    });


    if (webAds, unreadNotificationCount, profileData, teamLeadDashboard === null) {
        res.status(500).redirect('/teamlead/signout')
        res.end()
    } else {
        res.status(200).render("Team Lead/teamDashboard", {
            info: {
                id: req.session.passport.user.userInfo.login_id,
                uuid: req.session.profileData.team_L_uuid,
            },
            url: req.protocol + '://' + req.get('host'),
            user_role: req.session.passport.user.userRole,
            profileData,
            webAds,
            unreadNotificationCount: unreadNotificationCount[0].dataValues.unreadNotificationCount,
            permissions: req.session.permissions.permissionObject,
        });

        unreadNotificationCount = null
        profileData = null
        webAds = null
        res.end()
    }



});



/**
 * Determining that the user have to complete the profile
 * if the user is new then he / she should complete the profile then move ahead
 */

router.get("/completeProfile/:teamLeadUUID", isUser_Login, (req, res) => {

    if (req.session.profileData.team_L_name === null)
        res.status(200).render(`Team Lead/completeProfile`, {
            message: req.flash('info', 'Please Complete your Profile'),
            profileData: req.session.profileData.team_L_userProfilePic
        })
    else {
        res.status(200).redirect(`/teamlead/dashboard/${req.session.passport.user.userInfo.login_uuid}`)
    }

});



router.get('/Profile/:teamLeadUUID', isUser_Login, isUserAuthentic, async (req, res) => {

    /**
     * getiing the user details for the profile 
     */

    let teamLead = await Team_Lead.findOne({
        attributes: {
            exclude: ['team_L_isDeleted', 'team_L_isPaused', 'login_id', 'createdAt', 'updateTimestamp', 'sup_id', 'city_area_id']
        },
        /**
         * getting the inner join with team lead
         */
        include:
            [{
                //here it is using the many to many relationship
                model: Supervisor,
                required: true,
                attributes: ['sup_name'],
                where: {
                    sup_isPaused: 0,
                    sup_isDeleted: 0
                },
                include: {
                    model: City,
                    attributes: ['city_name'],
                    required: true,
                    through: {
                        attributes: []
                    },
                    where: {
                        paused: 0,
                        deleted: 0
                    }
                }
            }, {
                model: City_Areas,
                required: true,
                attributes: ['city_name'],
                where: {
                    paused: 0,
                    deleted: 0
                }
            }],
        where: {
            team_L_uuid: req.session.profileData.team_L_uuid,
            team_L_isDeleted: 0,
            team_L_isPaused: 0
        }
    })

    // getting the email from the Login Info table 
    let LoginEmail = await User_Login_Information.findOne({
        attributes: ['login_email'],
        where: {
            login_id: req.session.passport.user.userInfo.login_id,
            paused: 0,
            deleted: 0

        }
    })
    // unread notification count
    let unreadNotificationCount = await countofNotificationOfExecutive(req.session.profileData.team_L_id)

    res.render("Team Lead/profile", {
        url: req.protocol + '://' + req.get('host'),
        info: {
            id: req.session.passport.user.userInfo.login_id,
            uuid: req.session.profileData.team_L_uuid,
        },
        role: req.session.passport.user.userRole.type_name,
        LoginEmail,
        teamLead,
        unreadNotificationCount: unreadNotificationCount[0].dataValues.unreadNotificationCount,
        permissions: req.session.permissions.permissionObject,
    })

    LoginEmail = null
    teamLead = null
})

router.get('/addFreelance/:teamLeadUUID',
    //, isUser_Login, isUserAuthentic, 
    async (req, res) => {
        res.render("Team Lead/addFreelancertoTeam", {
            url: req.protocol + '://' + req.get('host')
        })
    })










// ..
// .
// .
// .
// .
// .
// .Cities.
// .
// .
// .

// .
// .
// .
// .
// .
// .
// ..

router.get('/assignArea/:teamLeadUUID', isUser_Login, isUserAuthentic, async (req, res) => {
    res.send('assignArea')
})

router.get('/conveyMessage/:teamLeadUUID', isUser_Login, isUserAuthentic, async (req, res) => {
    res.send('conveyMessage')
})



router.get('/progressReport/:teamLeadUUID', isUser_Login, isUserAuthentic, async (req, res) => {
    res.send('progressReport')
})

router.get('/manageIncentive/:teamLeadUUID', isUser_Login, isUserAuthentic, async (req, res) => {
    res.send('manageIncentive')
})






router.get('/verifyActivity/:teamLeadUUID', isUser_Login, isUserAuthentic, async (req, res) => {
    res.send('verifyActivity')
})




router.get('*', async (req, res) => {
    res.redirect(`/teamlead/dashboard/${req.session.profileData.team_L_id}`)
})

























router.get('/signout', (req, res) => {
    req.session.destroy()
    res.redirect('/login')
})


const countofNotificationOfExecutive = async (team_L_id) => {
    return await TeamLead_Notifications.findAll({
        attributes: [[sequelize.fn('COUNT', sequelize.col('teamLead_notification_id')), 'unreadNotificationCount']],
        where: {
            isRead: false,
            team_L_id
        }
    }).then((notifications) => {
        if (notifications)
            return notifications
        else
            return null
    })
        .catch(error => {
            if (error) {
                console.error('Error Fetching Notification Count')
                console.trace(error)
                return null
            }
        })

}





async function name() {

    let teamLeadDashboard = await Team_Lead.findOne(
        {
            attributes: [],
            include: [
                {
                    model: Supervisor,
                    required: true,
                    attributes: ['sup_name'],
                    where: {
                        sup_isPaused: 0,
                        sup_isDeleted: 0
                    },
                    include: {
                        model: City,
                        attributes: ['city_name'],
                        required: true,
                        through: {
                            attributes: []
                        },
                        where: {
                            paused: 0,
                            deleted: 0
                        }
                    }
                }
            ],
            where: {
                team_L_id: 1,
                team_L_isDeleted: 0,
                team_L_isPaused: 0
            }
        }
    )
        .then(data => {
            if (data)
                return data
            else
                return null
        })
        .catch(error => {
            if (error) {
                console.error('Error Fetchin Dashboard Data of Team Lead')
                console.trace(error)
                return null
            }
        })


    console.log(teamLeadDashboard.dataValues.Supervisor.dataValues.Cities);
    // console.log(teamLeadDashboard.dataValues.City_Area.dataValues.City_and_Supervisor_associate.dataValues.city_supp_assos_id);
}
// name()




module.exports = { router };