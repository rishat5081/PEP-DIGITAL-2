const router = require("express").Router(),
  Database = require("../../Configuration Files/Sequelize/Database_Synchronization");

/**
 * checking the user id or the UUID is the one who is into the session
 */
const isManagerAuthentic = (req, res, next) => {
  if (req.params.man_uuid === req.session.profileData.man_uuid) next();
  else res.redirect(`/manager/dashboard/${req.session.profileData.man_uuid}`);
};

router.get("/eman", async (req, res) => {
  // console.log(response)

  console.log(req.protocol + "://" + req.get("host"));
  res.render("General Manager/editManagers", {
    url: req.protocol + "://" + req.get("host"),
  });
});

module.exports = { router };