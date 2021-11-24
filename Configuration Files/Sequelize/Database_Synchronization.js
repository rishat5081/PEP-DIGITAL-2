let sequelize = require("./Sequelize"),
  Sequelize = require("sequelize"),
  Models = {
    Advertisement_Recommendation:
      require("./Sequelize Models/Advertisement/Advertisement_Recommendation")(
        sequelize,
        Sequelize
      ),
    Advertisement_Recommendation_test:
      require("./Sequelize Models/Advertisement/Advertisement_Recommendation_test")(
        sequelize,
        Sequelize
      ),
    Advertisement_Stock:
      require("./Sequelize Models/Advertisement/Advertisement_Stock")(
        sequelize,
        Sequelize
      ),

    AdvertismentGift:
      require("./Sequelize Models/Advertisement/AdvertismentGift")(
        sequelize,
        Sequelize
      ),
    Advertising_Stock_Allocation:
      require("./Sequelize Models/Advertisement/Advertising_Stock_Allocation")(
        sequelize,
        Sequelize
      ),
    Request_of_Advertisement:
      require("./Sequelize Models/Advertisement/Request_of_Advertisement")(
        sequelize,
        Sequelize
      ),
    Agency_Info: require("./Sequelize Models/Agency Models/Agency_Info")(
      sequelize,
      Sequelize
    ),
    AgencyLogs_Supervisor:
      require("./Sequelize Models/Agency Models/AgencyLogs_Supervisor")(
        sequelize,
        Sequelize
      ),
    AgencyTypes: require("./Sequelize Models/Agency Models/AgencyTypes")(
      sequelize,
      Sequelize
    ),
    Carriers: require("./Sequelize Models/Carrier/Carriers")(
      sequelize,
      Sequelize
    ),
    Carrier_Paid_Payment:
      require("./Sequelize Models/Carrier/Carrier_Paid_Payment")(
        sequelize,
        Sequelize
      ),
    Carriers_Services: require("./Sequelize Models/Carrier/Carriers_Services")(
      sequelize,
      Sequelize
    ),
    Payment_Carrier_Services:
      require("./Sequelize Models/Carrier/Payment_Carrier_Services")(
        sequelize,
        Sequelize
      ),
    City: require("./Sequelize Models/City/City")(sequelize, Sequelize),
    City_Areas: require("./Sequelize Models/City/City_Areas")(
      sequelize,
      Sequelize
    ),
    City_Sectors: require("./Sequelize Models/City/City_Sectors")(
      sequelize,
      Sequelize
    ),
    City_Sector_Assosiate:
      require("./Sequelize Models/City/City_Sector_Assosiate")(
        sequelize,
        Sequelize
      ),
    City_and_Supervisor_associate:
      require("./Sequelize Models/City/City_and_Supervisor_associate")(
        sequelize,
        Sequelize
      ),
    Compaigns: require("./Sequelize Models/Compaign/Compaigns")(
      sequelize,
      Sequelize
    ),
    Compaign_Activities:
      require("./Sequelize Models/Compaign/Compaign_Activities")(
        sequelize,
        Sequelize
      ),
    Compaign_Sale: require("./Sequelize Models/Compaign/Compaign_Sale")(
      sequelize,
      Sequelize
    ),
    Companies_Access: require("./Sequelize Models/Company/Companies_Access")(
      sequelize,
      Sequelize
    ),
    Company_Promotion: require("./Sequelize Models/Company/Company_Promotion")(
      sequelize,
      Sequelize
    ),
    Customer_Care_Activities:
      require("./Sequelize Models/Customer Care/Customer_Care_Activities")(
        sequelize,
        Sequelize
      ),
    ComplainsOfActivities:
      require("./Sequelize Models/Complains/ComplainsOfActivities")(
        sequelize,
        Sequelize
      ),
    Call_Receiving: require("./Sequelize Models/Customer Care/Call_Receiving")(
      sequelize,
      Sequelize
    ),
    Executive_Adver_Stock_Info:
      require("./Sequelize Models/Executive/Executive_Adver_Stock_Info")(
        sequelize,
        Sequelize
      ),
    Executive_Pending_Earning:
      require("./Sequelize Models/Executive/Executive_Pending_Earning")(
        sequelize,
        Sequelize
      ),
    Recommendation_for_Executive:
      require("./Sequelize Models/Executive/Recommendation_for_Executive")(
        sequelize,
        Sequelize
      ),
    Executive_Withdraws:
      require("./Sequelize Models/Executive/Executive_Withdraws")(
        sequelize,
        Sequelize
      ),
    Stock_Usage: require("./Sequelize Models/Executive/Stock_Usage")(
      sequelize,
      Sequelize
    ),
    Activities: require("./Sequelize Models/Lists of Packages/Activities")(
      sequelize,
      Sequelize
    ),
    List_of_Packages:
      require("./Sequelize Models/Lists of Packages/List_of_Packages")(
        sequelize,
        Sequelize
      ),
    List_sub_Activities:
      require("./Sequelize Models/Lists of Packages/List_sub_Activities")(
        sequelize,
        Sequelize
      ),
    Activity_Instruction:
      require("./Sequelize Models/Lists of Packages/Activity_Instruction")(
        sequelize,
        Sequelize
      ),
    Carrier_Logs: require("./Sequelize Models/Logs/Carrier_Logs")(
      sequelize,
      Sequelize
    ),
    Company_Acess_Logs: require("./Sequelize Models/Logs/Company_Acess_Logs")(
      sequelize,
      Sequelize
    ),
    SuperAdmin_Department_Logs:
      require("./Sequelize Models/Logs/SuperAdmin_Department_Logs")(
        sequelize,
        Sequelize
      ),
    Permissions: require("./Sequelize Models/Permission/Permissions")(
      sequelize,
      Sequelize
    ),
    Permission_Role_Assosiate:
      require("./Sequelize Models/Permission/Permission_Role_Assosiate")(
        sequelize,
        Sequelize
      ),
    Packages: require("./Sequelize Models/Packages of Company/Packages")(
      sequelize,
      Sequelize
    ),
    PEP_Agents: require("./Sequelize Models/PEP Agents/PEP_Agents")(
      sequelize,
      Sequelize
    ),
    PEP_Agents_Activities:
      require("./Sequelize Models/PEP Agents/PEP_Agents_Activities")(
        sequelize,
        Sequelize
      ),
    Promotion_Request_Status:
      require("./Sequelize Models/Promotion/Promotion_Request_Status")(
        sequelize,
        Sequelize
      ),
    Promotion_Req_By_Supervisor:
      require("./Sequelize Models/Promotion/Promotion_Req_By_Supervisor")(
        sequelize,
        Sequelize
      ),
    Customer_Care_Respresentative:
      require("./Sequelize Models/Stakeholders/Customer_Care_Respresentative")(
        sequelize,
        Sequelize
      ),
    Data_Entry_Operator:
      require("./Sequelize Models/Stakeholders/Data_Entry_Operator")(
        sequelize,
        Sequelize
      ),
    Field_Executive: require("./Sequelize Models/Stakeholders/Field_Executive")(
      sequelize,
      Sequelize
    ),
    GM_Company: require("./Sequelize Models/Stakeholders/GM_Company")(
      sequelize,
      Sequelize
    ),
    Managers: require("./Sequelize Models/Stakeholders/Manager")(
      sequelize,
      Sequelize
    ),
    NotificationText:
      require("./Sequelize Models/Notifications/NotificationText")(
        sequelize,
        Sequelize
      ),
    ExecutiveNotifications:
      require("./Sequelize Models/Notifications/ExecutiveNotifications")(
        sequelize,
        Sequelize
      ),
    TeamLead_Notifications:
      require("./Sequelize Models/Notifications/TeamLead_Notifications")(
        sequelize,
        Sequelize
      ),
    SuperVisorNotification:
      require("./Sequelize Models/Notifications/SuperVisorNotification")(
        sequelize,
        Sequelize
      ),
    ManagerNotifications:
      require("./Sequelize Models/Notifications/ManagerNotifications")(
        sequelize,
        Sequelize
      ),
    GMNotifications:
      require("./Sequelize Models/Notifications/GMNotifications")(
        sequelize,
        Sequelize
      ),
    ExecutiveLogins:
      require("./Sequelize Models/Login Activities/ExecutiveLogins")(
        sequelize,
        Sequelize
      ),
    GMLogin: require("./Sequelize Models/Login Activities/GMLogin")(
      sequelize,
      Sequelize
    ),
    ManagerLogin: require("./Sequelize Models/Login Activities/ManagerLogin")(
      sequelize,
      Sequelize
    ),
    SuperVisorLogin:
      require("./Sequelize Models/Login Activities/SuperVisorLogin")(
        sequelize,
        Sequelize
      ),
    TeamLead_Login:
      require("./Sequelize Models/Login Activities/TeamLead_Login")(
        sequelize,
        Sequelize
      ),
    Super_Admin: require("./Sequelize Models/Stakeholders/Super_Admin")(
      sequelize,
      Sequelize
    ),
    Supervisor: require("./Sequelize Models/Stakeholders/Supervisor")(
      sequelize,
      Sequelize
    ),
    Training: require("./Sequelize Models/Training/Training")(
      sequelize,
      Sequelize
    ),
    Training_Activities:
      require("./Sequelize Models/Training/Training_Activities")(
        sequelize,
        Sequelize
      ),
    Team_Lead: require("./Sequelize Models/Stakeholders/Team_Lead")(
      sequelize,
      Sequelize
    ),
    Team_Lead_Adver_Stock:
      require("./Sequelize Models/Team Lead/Team_Lead_Adver_Stock")(
        sequelize,
        Sequelize
      ),
    User_Login_Information:
      require("./Sequelize Models/Users Login/User_Login_Information")(
        sequelize,
        Sequelize
      ),
    User_Role: require("./Sequelize Models/Users Login/User_Role")(
      sequelize,
      Sequelize
    ),
    changeRoleLogs: require("./Sequelize Models/Users Login/changeRoleLogs")(
      sequelize,
      Sequelize
    ),
    Role_ExtraInfo: require("./Sequelize Models/Users Login/Role_ExtraInfo")(
      sequelize,
      Sequelize
    ),
    Login_Page: require("./Sequelize Models/Web/loginPage")(
      sequelize,
      Sequelize
    ),
    Banks_List: require("./Sequelize Models/Web/Banks_List")(
      sequelize,
      Sequelize
    ),
    PEP_Banks_Details: require("./Sequelize Models/Web/PEP_Banks_Details")(
      sequelize,
      Sequelize
    ),
    SignUp_Page: require("./Sequelize Models/Web/signUpPage")(
      sequelize,
      Sequelize
    ),
    Executive_Recommendation:
      require("./Sequelize Models/Web/Executive_Recommendation")(
        sequelize,
        Sequelize
      ),
    Web_Content: require("./Sequelize Models/Web/webContent")(
      sequelize,
      Sequelize
    ),
    WebAds: require("./Sequelize Models/Web/WebAds")(sequelize, Sequelize),
    Pendance_Clearance_Details:
      require("./Sequelize Models/Web/Pendance_Clearance_Details")(
        sequelize,
        Sequelize
      ),
    Department: require("./Sequelize Models/Department")(sequelize, Sequelize),
    Zone: require("./Sequelize Models/Zone")(sequelize, Sequelize),
  };
/**Get all the models here
 * now Synchronizing it one by one into a function
 * and then it will create all the data base
 */

//associating the models
Object.keys(Models).forEach((modelName) => {
  if (Models[modelName].associate) {
    Models[modelName].associate(Models);
  }
});

let Synchronizing = async () => {
  /**
   * Commented lines are used to sync the database tables
   * forcely and then check the foreign key true
   */
  console.log("*************************************************************");
  console.log("----------------- Creating Database Started -----------------");

  /**
   * Allowing the data base to igonre the Foreign
   */
  await sequelize
    .query("SET FOREIGN_KEY_CHECKS = 0", null, { raw: true })
    .then((response) => console.log("Creating Database.... Please Wait"));

  await sequelize
    .sync({ force: true })
    .then()
    .catch((error) => {
      console.error(error + "\n");
      console.log("\n");
      console.log("\n");
      console.error("Error in Creating Table : " + sequelize);
    });

  console.log("*************************************************************");
  console.log("*************************************************************");
  console.log("*************************************************************");
  /**
   * Again allowing database to not to ignore foreign key
   */
  await sequelize
    .query("SET FOREIGN_KEY_CHECKS = 1", { raw: true })
    .then((response) => console.log("DataBase Configured..... !!!"));

  console.log("*************************************************************");
  console.log("----------------- Done Database -----------------");
  console.log("*************************************************************");
  console.log("*************************************************************");
  console.log("*************************************************************");
};
//  Synchronizing();

// Dropping all the Tables from the database
let DropDatabaseTables = async () => {
  console.log("*************************************************************");
  console.log("----------------- Deleting All Tables -----------------");
  await sequelize
    .query("SET FOREIGN_KEY_CHECKS = 0", null, { raw: true })
    .then((response) =>
      console.log("Deleting Database Tables.... Please Wait")
    );

  await sequelize
    .drop({ truncate: true })
    .then()
    .catch((error) => {
      console.error(error + "\n");
      console.log("\n");
      console.log("\n");
      console.error("Error in Deleting Table : " + sequelize);
    });

  await sequelize
    .query("SET FOREIGN_KEY_CHECKS = 1", null, { raw: true })
    .then((response) => console.log("-----> Done...."));
};
// DropDatabaseTables()

// Wiping out all the table record

let WipeOutTableRecord = async () => {
  console.log("*************************************************************");
  console.log(
    "----------------- Trucating All Tables Record -----------------"
  );
  await sequelize
    .query("SET FOREIGN_KEY_CHECKS = 0", null, { raw: true })
    .then((response) =>
      console.log("Trucating All Tables Record.... Please Wait")
    );

  await sequelize
    .drop({ truncate: true })
    .then()
    .catch((error) => {
      console.error(error + "\n");
      console.log("\n");
      console.log("\n");
      console.error("Error in Trucating Table : " + sequelize);
    });

  await sequelize
    .query("SET FOREIGN_KEY_CHECKS = 1", null, { raw: true })
    .then((response) => console.log("-----> Done...."));
};

Models.AdvertismentGift.findOne({
  attributes: ["adver_gift_id"],
  where: {
    deleted: 0,
    paused: 0,
    advert_gift_uuid: "97534225-e455-409b-9ebb-7b1e54e551b3",
  },
})
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = Models;

// let DevelopmentDatabase = async () => {
//   await Super_Admin.create({
//     sa_name: "Saad",
//     sa_email: "superA@aa",
//     sa_password: "$2b$10$IhwmSCZDgheT3pCvaTd4YezxKSXPgXnS84r6HKXI.56uXawidQ8Ee"
//   })
//     .then((d) => console.log("Super_Admin --> Done"))
//     .catch((error) => "Error in Super_Admin");

//   await Companies_Access.create({
//     sa_id: 1,
//     comp_name: "Pak e Property",
//     comp_address: "Rawalpindi",
//     comp_contact: "051-9765821",
//     access_Status: 1
//   })
//     .then((d) => console.log("Companies_Access --> Done"))
//     .catch((error) => "Error in Companies_Access");

//   await Zone.create({
//     zone_name: "Punjab"
//   })
//     .then((d) => console.log("Zone --> Done"))
//     .catch((error) => "Error in Zone");

//   await GM_Company.create({
//     gm_name: "GM of Company",
//     gm_email: "gm@info.com",
//     gm_password: "$2b$10$WfgW1aVsxJOZ1tD.yMRSBuHFPl9NtHyiJJJSGRUt4EgbC5hEp1P1G",
//     gm_contact: "0321-1111000",
//     gm_profile_pic: "/img/GM.jpg",
//     gm_salary: "150000",
//     comp_access_id: 1,
//     zone_id: 1
//   })
//     .then((d) => console.log("GM_Company --> Done"))
//     .catch((error) => "Error in GM_Company");

//   await Department.create({
//     d_name: "Sales",
//     d_type: "Sale and Marketing",
//     comp_access_id: 1,
//     gm_id: 1,
//     sa_id: 1
//   })
//     .then((d) => console.log("Department --> Done"))
//     .catch((error) => "Error in Department");

//   await Managers.create({
//     man_name: "Manager",
//     man_email: "manager@info.com",
//     man_password:
//       "$2b$10$WfgW1aVsxJOZ1tD.yMRSBuHFPl9NtHyiJJJSGRUt4EgbC5hEp1P1G",
//     man_userProfilePic: "manager.png",
//     man_contact: "0333-5214777",
//     man_salary: "140000",
//     man_username: "manager_12",
//     d_id: 1,
//     zone_id: 1
//   })
//     .then((d) => console.log("Manager -> Done"))
//     .catch((error) => "Error in Manager" + error);

//   await User_Role.create({
//     type_name: "GM Company"
//   })
//     .then((d) => console.log("User_Role --> Done"))
//     .catch((error) => "Error in User_Role");

//   await User_Role.create({
//     type_name: "Manager"
//   })
//     .then((d) => console.log("User_Role --> Done"))
//     .catch((error) => "Error in User_Role");

//   await User_Role.create({
//     type_name: "SuperVisor"
//   })
//     .then((d) => console.log("User_Role --> Done"))
//     .catch((error) => "Error in User_Role");

//   await User_Role.create({
//     type_name: "Team Lead"
//   })
//     .then((d) => console.log("User_Role --> Done"))
//     .catch((error) => "Error in User_Role");

//   await User_Role.create({
//     type_name: "Field Executive"
//   })
//     .then((d) => console.log("User_Role --> Done"))
//     .catch((error) => "Error in User_Role");

//   await User_Role.create({
//     type_name: "Freelance Field Executive"
//   })
//     .then((d) => console.log("User_Role --> Done"))
//     .catch((error) => "Error in User_Role");

//   await City.create({
//     city_name: "Rawalpindi",
//     city_code: "352",
//     zone_id: 1
//   })
//     .then((d) => console.log("City --> Done"))
//     .catch((error) => "Error in City");

//   await User_Login_Information.create({
//     login_email: "test@aa",
//     login_password:
//       "$2b$10$IhwmSCZDgheT3pCvaTd4YezxKSXPgXnS84r6HKXI.56uXawidQ8Ee",
//     user_role_id: 6
//   })
//     .then((d) => console.log("User_Login_Information --> Done"))
//     .catch((error) => "Error in User_Login_Information");

//   await Supervisor.create({
//     sup_name: "Development",
//     sup_userProfilePic: "/img/profile.jpg",
//     sup_contact: "0345-5536125",
//     sup_target: "144",
//     sup_salary: "15000",
//     sup_commission: "2.5%",
//     sup_username: "develop",
//     man_id: 18,
//     login_id: 2
//   })
//     .then((d) => console.log("Supervisor --> Done"))
//     .catch((error) => console.log("Error in User_Login_Information" + error));

//   await City_and_Supervisor_associate.create({
//     city_id: 1,
//     sup_id: 1
//   })
//     .then((d) => console.log("City_and_Supervisor_associate --> Done"))
//     .catch((error) => "Error in City_and_Supervisor_associate");

//   await City_Areas.create({
//     city_name: "Rawal Road",
//     city_code: "101",
//     city_supp_assos_id: 1
//   })
//     .then((d) => console.log("City_Areas --> Done"))
//     .catch((error) => "Error in City_Areas");

//   // await Team_Lead.create({
//   //   team_L_name: "Team Lead",
//   //   team_L_userProfilePic: "Team Lead.jpg",
//   //   team_L_contact: "0321-8741000",
//   //   team_L_target: "150",
//   //   team_L_salary: "85100",
//   //   team_L_commission: "1.5%",
//   //   team_L_username: "teamLead_11",
//   //   city_area_id: 1,
//   //   sup_id: 1,
//   //   login_id: 3,
//   // })
//   //   .then((d) => console.log("Team_Lead --> Done"))
//   //   .catch((error) => console.log("Error in Team_Lead" + error));

//   // await Field_Executive.create({
//   //   field_name: "Saad",
//   //   field_userProfilePic: "/img/profile.jpg",
//   //   field_contact: "0345-5536125",
//   //   field_target: "150",
//   //   field_salary: "15000",
//   //   field_commission: "2.5%",
//   //   field_username: "saad@112",
//   //   login_id: 3,
//   //   team_L_id: 3,
//   // })
//   //   .then((d) => console.log("Field_Executive --> Done"))
//   //   .catch((error) => console.log("Error in Field_Executive" + error));

//   // await Permissions.create({
//   //   permission_name: "View Earning",
//   //   // permission_name: "Withdraw",
//   //   // permission_name: "Manage CSR",
//   //   // permission_name: "Manage Agencies",
//   //   // permission_name: "Manage Field Executive",
//   //   // permission_name: "Manage Team Lead",
//   //   // permission_name: "Manage Supervisor",
//   //   // permission_name: "Manage Report",
//   //   // permission_name: "Manage City Areas",
//   //   // permission_name: "Manage City",
//   //   // permission_name: "Manage Managers",
//   // })
//   //   .then((d) => console.log("Permissions --> Done"))
//   //   .catch((error) => console.log("Error in Permissions" + error));

//   await Web_Content.create({
//     logo: "/logo/logo.png",
//     firstHeading: "What We Do",
//     secondHeading: "HOW WE DO IT",
//     thirdHeading: "WHAT IT DELIVERS",
//     firstHeadingText: `ipsum dolor sit amet, consectetur adipisicing elit. Tempore sequi ut aut, possimus
//     eos ab. Aperiam iste ratione
//     aspernatur quod alias reprehenderit? Aspernatur ex dolorem fugiat quis consequuntur
//     repudiandae eveniet.`,
//     secondHeadingText: `. Tempore sequi ut aut, possimus eos ab. Aperiam iste ratione
//     aspernatur quod alias reprehenderit? Aspernatur ex dolorem fugiat quis consequuntur
//     repudiandae eveniet.`,
//     thirdHeadingText: `ipsum dolor sit amet, consectetur adipisicing elit. ab. Aperiam iste ratione
//     aspernatur quod alias reprehenderit? Aspernatur ex dolorem fugiat quis consequuntur
//     repudiandae eveniet.`,
//     signUpbtn: "Sign Up",
//     loginbtn: "Login",
//     firstCardHeading: "What We Do",
//     firstCardtext: ` Lorem ipsum dolor sit amet consectetur adipisicing elit.
//     Similique illum nulla modi?
//     Provident veritatis magni quae tempore
//     illum fugit molestiae ipsum? Quibusdam`,
//     secondCardHeading: "What We Do",
//     secondCardtext: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
//     Similique illum nulla modi?
//     Provident veritatis magni quae tempore
//     illum fugit molestiae ipsum? Quibusdam`,
//     thirdCardHeading: "WHAT IT DELIVERS",
//     thirdCardtext: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
//     Similique illum nulla modi?
//     Provident veritatis magni quae tempore
//     illum fugit molestiae ipsum? Quibusdam`,
//     fourthCardHeading: "What We Do",
//     fourthCardtext: ` Lorem ipsum dolor sit amet consectetur adipisicing elit.
//     Similique illum nulla modi?
//     Provident veritatis magni quae tempore
//     illum fugit molestiae ipsum? Quibusdam`,
//     fifthCardHeading: "What We Do",
//     fifthCardtext: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
//     Similique illum nulla modi?
//     Provident veritatis magni quae tempore
//     illum fugit molestiae ipsum? Quibusdam`,
//     sixthCardHeading: "WHAT IT DELIVERS",
//     sixthCardtext: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
//     Similique illum nulla modi?
//     Provident veritatis magni quae tempore
//     illum fugit molestiae ipsum? Quibusdam`,
//     seventhCardHeading: "What We Do",
//     seventhCardtext: ` Lorem ipsum dolor sit amet consectetur adipisicing elit.
//     Similique illum nulla modi?
//     Provident veritatis magni quae tempore
//     illum fugit molestiae ipsum? Quibusdam`,
//     eighthCardHeading: "What We Do",
//     eighthCardtext: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
//     Similique illum nulla modi?
//     Provident veritatis magni quae tempore
//     illum fugit molestiae ipsum? Quibusdam`,
//     ninthCardHeading: "WHAT IT DELIVERS",
//     ninthCardtext: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
//     Similique illum nulla modi?
//     Provident veritatis magni quae tempore
//     illum fugit molestiae ipsum? Quibusdam`,
//     footer_heading_one: `What we Do`,
//     footer_heading_second: "our team",
//     footer_heading_third: "Newsfeed",
//     footer_heading_fourth: "pep life",
//     footer_heading_fifth: "Social media",
//     footer_heading_one_content: `<li><a href="">How it works</a></li>
//                                 <li><a href="">Where it works</a></li>`,

//     footer_heading_second_content: `<li><a href="">management</a></li>
//                                     <li><a href="">local leadership</a></li>
//                                     <li><a href="">advisory board</a></li>`,

//     footer_heading_third_content: `<li><a href="">management</a></li>
//                                          <li><a href="">local leadership</a></li>
//                                          <li><a href="">advisory board</a></li>`,

//     footer_heading_fourth_content: `<li><a href="">history</a></li>
//                                     <li><a href="">careers</a></li>
//                                     <li><a href="">contact</a></li>`,
//     footer_heading_fifth_content: `<li><a href=""><i class="fa fa-facebook" aria-hidden="true"></i> Facebook</a></li>
//                                       <li><a href=""><i class="fa fa-google" aria-hidden="true"></i> Google</a></li>
//                                       <li><a href=""><i class="fa fa-instagram" aria-hidden="true"></i> Instagram</a></li>`,
//     sa_id: 1,
//     backgroundVideo: "/video/video.mp4"
//   })
//     .then((d) => console.log("Web_Content --> Done"))
//     .catch((error) => "Error in Web_Content");

//   await SignUp_Page.create({
//     signUpTitle: "Member Registration",
//     btnText: "Register",
//     alreadyHaveAccount: "Already have Account",
//     emailPlaceHolder: "Enter Email",
//     emailIcon: "fa fa-envelope",
//     passwordPlaceHolder: "Enter Password",
//     passwordIcon: "fa fa-lock",
//     confirmPasswordPlaceHolder: "Confirm your Password",
//     confirmPasswordIcon: "fa fa-lock",
//     pictureName: "img-01.png",
//     pictureFolder: "/img/",
//     alreadyHaveAccountIcon: "fa fa-long-arrow-right m-l-5",
//     sa_id: 1
//   })
//     .then((d) => console.log("SignUp_Page --> Done"))
//     .catch((error) => "Error in SignUp_Page");

//   await Login_Page.create({
//     loginTitle: "Member Login",
//     btnText: "Login",
//     forgetText: "Forgot",
//     forgetEmail: "Email",
//     forgetPassword: "Password",
//     createAccountText: "Create your Account",
//     emailPlaceHolder: "Enter Email",
//     emailIcon: "fa fa-envelope",
//     passwordPlaceHolder: "Enter Password",
//     passwordIcon: "fa fa-lock",
//     pictureName: "img-01.png",
//     pictureFolder: "/img/",
//     createAccountIcon: "fa fa-long-arrow-right m-l-5",
//     sa_id: 1
//   })
//     .then((d) => console.log("Login_Page --> Done"))
//     .catch((error) => "Error in Login_Page");
// };
