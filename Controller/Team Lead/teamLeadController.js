const { Team_Lead, Role_ExtraInfo, Permissions } = require('../../Configuration Files/Sequelize/Database_Synchronization'),
    Multer = require('../../Configuration Files/Multer Js/multer')


module.exports = (app) => {


    /**
     * Upload image of the user at the starting of the new user login
     */

    app.post("/teamlead/uploadProfilePhoto", (req, res) => {

        Multer.fileUpload_Specs(req, res, (err) => {

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
                attributes: [
                    'target', 'commission', 'salary'
                ],
                where: {
                    paused: 0,
                    deleted: 0,
                    user_role_id: 4
                }
            })
                .then(response => { return response })
                .catch(error => {
                    console.log('Error! Can not Fetch Commissions and Target from DB' + error);
                    res.send({
                        type: 'danger',
                        messages: 'Error! Internal Error! '
                    })
                })

            Team_Lead.update({
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
                        res.send({
                            type: 'success',
                            messages: 'Updated',
                            uuid: req.session.passport.user.userInfo.login_uuid
                        })
                    }
                })
                .catch((error) => {
                    console.log(error);
                    res.send({
                        type: 'danger',
                        messages: 'Error! Internal Error! '
                    })
                })



        })


}


