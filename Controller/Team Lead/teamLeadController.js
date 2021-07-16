const { Op } = require('sequelize')
const { Team_Lead, Role_ExtraInfo, Permissions, User_Role, User_Login_Information } = require('../../Configuration Files/Sequelize/Database_Synchronization'),
    { multerFile_Upload_Function } = require('../../Configuration Files/Multer Js/multer')


module.exports = (app) => {


    /**
     * Upload image of the user at the starting of the new user login
     */

    app.post("/teamlead/uploadProfilePhoto", async (req, res) => {

        multerFile_Upload_Function(req, res, (err) => {

            if (err) {
                return res.send({ messages: err, type: 'danger' })
            }
            else {
                let filename = req.files[0].filename
                let filePath = req.files[0].destination.split('./public')

                Team_Lead.update({
                    team_L_userProfilePic: filePath[1] + filename
                }, {
                    where: {
                        login_id: req.session.passport.user.userInfo.login_id
                    }
                })
                    .then((response) => {
                        if (response) {
                            res.send({
                                type: 'success',
                                messages: 'Profile Image Uploaded',
                                profileImage: filePath[1] + filename
                            })
                        }
                        else {
                            res.send({ type: 'danger', messages: 'Error! in Uploading Image! ' })
                        }

                    })
            }


        })

    })


    app.route('/teamlead/updateProfileInfo').post(
        async (req, res) => {

            const dbResponse = await Role_ExtraInfo.findOne({
                include: {
                    model: User_Role,
                    attributes: [],
                    where: {
                        type_name: {
                            [Op.like]: '%Team Lead%',
                            [Op.like]: '%Team%',
                        },
                    }
                },
                attributes: [
                    'target', 'commission', 'salary'
                ],
                where: {
                    paused: 0,
                    deleted: 0,
                }
            })
                .then(response => {
                    if (response) return response
                    else return null
                })
                .catch(error => {
                    if (error) {
                        console.log('Error! Can not Fetch Commissions and Target from DB');
                        console.trace(error);
                        return null;
                    }
                })

            if (dbResponse !== null) {

                const updateStatus = await Team_Lead.update({
                    team_L_name: req.body.name,
                    team_L_contact: req.body.contact,
                    team_L_username: req.body.username,
                    team_L_target: dbResponse.dataValues.target,
                    team_L_salary: dbResponse.dataValues.salary,
                    team_L_commission: dbResponse.dataValues.commission
                }, {
                    where: {
                        login_id: req.session.passport.user.userInfo.login_id
                    }
                })
                    .then((response) => {
                        console.log(response);
                        if (response) {
                            return response
                        }
                        else {
                            return null
                        }
                    })
                    .catch((error) => {
                        if (error) {
                            console.error('Error Updating the Team lead Info');
                            console.trace(error);
                            return null;
                        }
                    })

                if (updateStatus !== null) {
                    res.status(200).send({
                        type: 'success',
                        messages: 'Updated',
                        uuid: req.session.passport.user.userInfo.login_uuid
                    })
                    res.end()
                }
                else {
                    res.status(503).send({
                        type: 'danger',
                        messages: 'Error! Internal Error! '
                    })
                    res.end();
                }



            }
            else {
                res.status(503).send({
                    type: 'danger',
                    messages: 'Error! Internal Error! '
                })
            }




        })


    /**
     * updaing the team lead profile information
     * 
     */
    app.route('/updateTeamLeadProfile').post(async (req, res) => {

        let userReqBody = { ...req.body }
        let lengthofUser_Req = Object.keys(userReqBody).length;

        if (lengthofUser_Req === getAuthenticateJSON(userReqBody)) {

            /**
             * Updating the email if the user entered the new email address
             */
            const emailUpdate = await User_Login_Information.update({
                login_email: userReqBody.email
            },
                {
                    where: {
                        login_id: req.session.passport.user.userInfo.login_id,
                        paused: 0,
                        deleted: 0
                    }
                })



            const updateExecutiveInfo = await Team_Lead.update({
                team_L_name: userReqBody.fullname,
                team_L_contact: userReqBody.contact,
                team_L_username: userReqBody.username,
            }, {
                where: {
                    team_L_uuid: req.session.profileData.team_L_uuid
                }
            })
            if (emailUpdate && updateExecutiveInfo) {
                res.status(200).send({ status: 'Information Updated' })
            }
            else {
                console.trace('There is an error while updating the Information of User @ Line')
                res.status(404).send({ error: 'error', details: 'Error! while updating your information.' })
            }
        }
        else
            res.status(404).send({ error: 'error', details: 'Invalid entered data' })

    })









}




getAuthenticateJSON = (userReqBody) => {
    Object.keys(userReqBody).forEach((key) => {
        if (
            userReqBody[key] === "select" ||
            userReqBody[key] === "update" ||
            userReqBody[key] === "insert"
        ) {
            delete userReqBody[key];
        }
    });
    return Object.keys(userReqBody).length;;
}

