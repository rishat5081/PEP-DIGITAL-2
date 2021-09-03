let sequelize = require("./Sequelize"),
  Advertisement_Recommendation = require("./Sequelize Models/Advertisement/Advertisement_Recommendation"),
  Advertisement_Stock = require("./Sequelize Models/Advertisement/Advertisement_Stock"),
  Advertising_Stock_Allocation = require("./Sequelize Models/Advertisement/Advertising_Stock_Allocation"),
  Request_of_Advertisement = require("./Sequelize Models/Advertisement/Request_of_Advertisement"),
  Agency_Info = require("./Sequelize Models/Agency Models/Agency_Info"),
  AgencyTypes = require("./Sequelize Models/Agency Models/AgencyTypes"),
  Carriers = require("./Sequelize Models/Carrier/Carriers"),
  Carrier_Paid_Payment = require("./Sequelize Models/Carrier/Carrier_Paid_Payment"),
  Carriers_Services = require("./Sequelize Models/Carrier/Carriers_Services"),
  Payment_Carrier_Services = require("./Sequelize Models/Carrier/Payment_Carrier_Services"),
  City = require("./Sequelize Models/City/City"),
  City_Areas = require("./Sequelize Models/City/City_Areas"),
  City_Sectors = require("./Sequelize Models/City/City_Sectors"),
  City_Sector_Assosiate = require("./Sequelize Models/City/City_Sector_Assosiate"),
  City_and_Supervisor_associate = require("./Sequelize Models/City/City_and_Supervisor_associate"),
  Compaigns = require("./Sequelize Models/Compaign/Compaigns"),
  Compaign_Activities = require("./Sequelize Models/Compaign/Compaign_Activities"),
  Compaign_Sale = require("./Sequelize Models/Compaign/Compaign_Sale"),
  Companies_Access = require("./Sequelize Models/Company/Companies_Access"),
  Company_Promotion = require("./Sequelize Models/Company/Company_Promotion"),
  Customer_Care_Activities = require("./Sequelize Models/Customer Care/Customer_Care_Activities"),
  Call_Receiving = require("./Sequelize Models/Customer Care/Call_Receiving"),
  Executive_Adver_Stock_Info = require("./Sequelize Models/Executive/Executive_Adver_Stock_Info"),
  Executive_Pending_Earning = require("./Sequelize Models/Executive/Executive_Pending_Earning"),
  Recommendation_for_Executive = require("./Sequelize Models/Executive/Recommendation_for_Executive"),
  Executive_Withdraws = require("./Sequelize Models/Executive/Executive_Withdraws"),
  Stock_Usage = require("./Sequelize Models/Executive/Stock_Usage"),
  Activities = require("./Sequelize Models/Lists of Packages/Activities"),
  List_of_Packages = require("./Sequelize Models/Lists of Packages/List_of_Packages"),
  List_sub_Activities = require("./Sequelize Models/Lists of Packages/List_sub_Activities"),
  Activity_Instruction = require("./Sequelize Models/Lists of Packages/Activity_Instruction"),
  Carrier_Logs = require("./Sequelize Models/Logs/Carrier_Logs"),
  Company_Acess_Logs = require("./Sequelize Models/Logs/Company_Acess_Logs"),
  SuperAdmin_Department_Logs = require("./Sequelize Models/Logs/SuperAdmin_Department_Logs"),
  Permissions = require("./Sequelize Models/Permission/Permissions"),
  Permission_Role_Assosiate = require("./Sequelize Models/Permission/Permission_Role_Assosiate"),
  Packages = require("./Sequelize Models/Packages of Company/Packages"),
  PEP_Agents = require("./Sequelize Models/PEP Agents/PEP_Agents"),
  PEP_Agents_Activities = require("./Sequelize Models/PEP Agents/PEP_Agents_Activities"),
  Promotion_Request_Status = require("./Sequelize Models/Promotion/Promotion_Request_Status"),
  Promotion_Req_By_Supervisor = require("./Sequelize Models/Promotion/Promotion_Req_By_Supervisor"),
  Customer_Care_Respresentative = require("./Sequelize Models/Stakeholders/Customer_Care_Respresentative"),
  Data_Entry_Operator = require("./Sequelize Models/Stakeholders/Data_Entry_Operator"),
  Field_Executive = require("./Sequelize Models/Stakeholders/Field_Executive"),
  GM_Company = require("./Sequelize Models/Stakeholders/GM_Company"),
  Managers = require("./Sequelize Models/Stakeholders/Manager"),
  NotificationText = require("./Sequelize Models/Notifications/NotificationText"),
  ExecutiveNotifications = require("./Sequelize Models/Notifications/ExecutiveNotifications"),
  TeamLead_Notifications = require("./Sequelize Models/Notifications/TeamLead_Notifications"),
  SuperVisorNotification = require("./Sequelize Models/Notifications/SuperVisorNotification"),
  ManagerNotifications = require("./Sequelize Models/Notifications/ManagerNotifications"),
  GMNotifications = require("./Sequelize Models/Notifications/GMNotifications"),
  ExecutiveLogins = require("./Sequelize Models/Login Activities/ExecutiveLogins"),
  GMLogin = require("./Sequelize Models/Login Activities/GMLogin"),
  ManagerLogin = require("./Sequelize Models/Login Activities/ManagerLogin"),
  SuperVisorLogin = require("./Sequelize Models/Login Activities/SuperVisorLogin"),
  TeamLead_Login = require("./Sequelize Models/Login Activities/TeamLead_Login"),
  Super_Admin = require("./Sequelize Models/Stakeholders/Super_Admin"),
  Supervisor = require("./Sequelize Models/Stakeholders/Supervisor"),
  Training = require("./Sequelize Models/Training/Training"),
  Training_Activities = require("./Sequelize Models/Training/Training_Activities"),
  Team_Lead = require("./Sequelize Models/Stakeholders/Team_Lead"),
  Team_Lead_Adver_Stock = require("./Sequelize Models/Team Lead/Team_Lead_Adver_Stock"),
  User_Login_Information = require("./Sequelize Models/Users Login/User_Login_Information"),
  User_Role = require("./Sequelize Models/Users Login/User_Role"),
  changeRoleLogs = require("./Sequelize Models/Users Login/changeRoleLogs"),
  Role_ExtraInfo = require("./Sequelize Models/Users Login/Role_ExtraInfo"),
  Login_Page = require("./Sequelize Models/Web/loginPage"),
  Banks_List = require("./Sequelize Models/Web/Banks_List"),
  PEP_Banks_Details = require("./Sequelize Models/Web/PEP_Banks_Details"),
  SignUp_Page = require("./Sequelize Models/Web/signUpPage"),
  Executive_Recommendation = require("./Sequelize Models/Web/Executive_Recommendation"),
  Web_Content = require("./Sequelize Models/Web/webContent"),
  WebAds = require("./Sequelize Models/Web/WebAds"),
  Pendance_Clearance_Details = require("./Sequelize Models/Web/Pendance_Clearance_Details"),
  Department = require("./Sequelize Models/Department"),
  Zone = require("./Sequelize Models/Zone"),
  ComplainsOfActivities = require("./Sequelize Models/Complains/ComplainsOfActivities");

/**Get all the models here
 * now Synchronizing it one by one into a function
 * and then it will create all the data base
 */

const TruncateTables = async () => {
  console.log("*************************************************************");
  console.log("----------------- Deleting Tables Records -----------------");
  await sequelize
    .query("SET FOREIGN_KEY_CHECKS = 0", null, { raw: true })
    .then((response) => console.log("Creating Database.... Please Wait"));

  await Advertisement_Recommendation.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Advertisement_Stock.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Advertising_Stock_Allocation.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Request_of_Advertisement.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Agency_Info.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await AgencyTypes.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Carriers.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Carrier_Paid_Payment.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Carriers_Services.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Payment_Carrier_Services.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await City.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await City_Areas.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await City_Sectors.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await City_and_Supervisor_associate.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Compaigns.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Compaign_Activities.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Compaign_Sale.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Companies_Access.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Company_Promotion.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Customer_Care_Activities.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Call_Receiving.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Executive_Adver_Stock_Info.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await ComplainsOfActivities.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Executive_Pending_Earning.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Executive_Withdraws.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Stock_Usage.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Activities.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await List_of_Packages.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await List_sub_Activities.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Activity_Instruction.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Carrier_Logs.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Company_Acess_Logs.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await SuperAdmin_Department_Logs.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Permissions.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Permission_Role_Assosiate.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Packages.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await PEP_Agents.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await PEP_Agents_Activities.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Promotion_Request_Status.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Promotion_Req_By_Supervisor.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Customer_Care_Respresentative.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Data_Entry_Operator.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Field_Executive.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await GM_Company.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Managers.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await ExecutiveNotifications.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await TeamLead_Notifications.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await SuperVisorNotification.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await ManagerNotifications.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await GMNotifications.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await ExecutiveLogins.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Recommendation_for_Executive.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await GMLogin.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await ManagerLogin.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await SuperVisorLogin.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await TeamLead_Login.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Super_Admin.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Supervisor.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Training.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Training_Activities.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Team_Lead.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Team_Lead_Adver_Stock.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await User_Login_Information.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await User_Role.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Role_ExtraInfo.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Executive_Recommendation.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Login_Page.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await SignUp_Page.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Web_Content.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Pendance_Clearance_Details.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Department.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await Zone.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await WebAds.destroy({ truncate: true })
    .then()
    .catch((error) => console.log("Error Deleting Table" + error));

  await sequelize
    .query("SET FOREIGN_KEY_CHECKS = 1", null, { raw: true })
    .then((response) => console.log("Done.... Please Wait"));
};
const Synchronizing = async () => {
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

  /**
   * Setting the all tables
   */
  await Advertisement_Recommendation.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Advertisement_Recommendation");
    });

  await Advertisement_Stock.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Advertisement_Stock");
    });
  await Advertising_Stock_Allocation.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Advertising_Stock_Allocation");
    });

  await Request_of_Advertisement.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Request_of_Advertisement");
    });
  await Agency_Info.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Agency_Info");
    });

  await AgencyTypes.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table AgencyTypes");
    });

  await Carriers.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Carriers");
    });
  await Carrier_Paid_Payment.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Carrier_Paid_Payment");
    });

  await Carriers_Services.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Carriers_Services");
    });
  await Payment_Carrier_Services.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Payment_Carrier_Services");
    });

  await City.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table City");
    });
  await City_Areas.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table City_Areas");
    });
  await City_Sectors.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table City_Sectors");
    });

  await City_and_Supervisor_associate.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table City_and_Supervisor_associate");
    });
  await City_Sector_Assosiate.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table City_Sector_Assosiate");
    });
  await Compaigns.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Compaigns");
    });

  await NotificationText.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table NotificationText");
    });
  await ExecutiveNotifications.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table ExecutiveNotifications");
    });
  await TeamLead_Notifications.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table TeamLead_Notifications");
    });
  await SuperVisorNotification.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table   SuperVisorNotification");
    });
  await ManagerNotifications.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table ManagerNotifications");
    });
  await GMNotifications.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table GMNotifications");
    });

  await Compaign_Activities.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Compaign_Activities");
    });
  await Compaign_Sale.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Compaign_Sale");
    });

  await Companies_Access.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Companies_Access");
    });
  await Company_Promotion.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Company_Promotion");
    });

  await Customer_Care_Activities.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Customer_Care_Activities");
    });
  await Call_Receiving.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Call_Receiving");
    });

  await Executive_Adver_Stock_Info.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Executive_Adver_Stock_Info");
    });
  await Executive_Pending_Earning.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Executive_Pending_Earning");
    });
  await Executive_Withdraws.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Executive_Withdraws");
    });

  await Stock_Usage.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Stock_Usage");
    });

  await ExecutiveLogins.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table ExecutiveLogins");
    });
  await GMLogin.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table GMLogin");
    });
  await ManagerLogin.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table ManagerLogin");
    });
  await SuperVisorLogin.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table SuperVisorLogin");
    });
  await TeamLead_Login.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table TeamLead_Login");
    });

  await Activities.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table  Activities");
    });
  await Activity_Instruction.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Activity_Instruction");
    });

  await List_of_Packages.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table List_of_Packages");
    });
  await List_sub_Activities.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table List_sub_Activities");
    });

  await Carrier_Logs.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Carrier_Logs");
    });
  await Company_Acess_Logs.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Company_Acess_Logs");
    });

  await SuperAdmin_Department_Logs.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table SuperAdmin_Department_Logs");
    });
  await Packages.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Packages");
    });
  await PEP_Agents.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table PEP_Agents");
    });
  await PEP_Agents_Activities.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table PEP_Agents_Activities");
    });
  await Promotion_Request_Status.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Promotion_Request_Status");
    });
  await Promotion_Req_By_Supervisor.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Promotion_Req_By_Supervisor");
    });
  await Permissions.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Permissions");
    });

  await User_Login_Information.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table User_Login_Information");
    });
  await User_Role.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table User_Role");
    });
  await Permission_Role_Assosiate.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Permission_Role_Assosiate");
    });
  await Customer_Care_Respresentative.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Customer_Care_Respresentative");
    });
  await Data_Entry_Operator.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Data_Entry_Operator");
    });
  await Field_Executive.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Field_Executive");
    });
  await GM_Company.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table GM_Company");
    });
  await Managers.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Managers");
    });
  await Super_Admin.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Super_Admin");
    });
  await Supervisor.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Supervisor");
    });
  await Team_Lead.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Team_Lead");
    });
  await Training.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Training");
    });
  await Training_Activities.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Training_Activities");
    });
  await Team_Lead_Adver_Stock.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Team_Lead_Adver_Stock");
    });
  await Banks_List.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Banks_List");
    });
  await PEP_Banks_Details.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table PEP_Banks_Details");
    });

  await Department.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Department");
    });

  await Role_ExtraInfo.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Role_ExtraInfo");
    });

  await Zone.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Zone");
    });

  /**
   * Configuring the Web Pages
   */
  await Login_Page.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Login_Page");
    });
  await SignUp_Page.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table SignUp_Page");
    });

  await Web_Content.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Web_Content");
    });

  await WebAds.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table WebAds");
    });

  await Pendance_Clearance_Details.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Pendance_Clearance_Details");
    });

  await Executive_Recommendation.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Executive_Recommendation");
    });

  await Recommendation_for_Executive.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table Recommendation_for_Executive");
    });

  await changeRoleLogs
    .sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table changeRoleLogs");
    });

  await ComplainsOfActivities.sync({ force: true })
    .then()
    .catch((error) => {
      console.log(error + "\n");
      console.log("\n");
      console.log("\n");
      console.log("Error in Creating Table ComplainsOfActivities");
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

const DevelopmentDatabase = async () => {
  await Super_Admin.create({
    sa_name: "Saad",
    sa_email: "superA@aa",
    sa_password: "$2b$10$IhwmSCZDgheT3pCvaTd4YezxKSXPgXnS84r6HKXI.56uXawidQ8Ee"
  })
    .then((d) => console.log("Super_Admin --> Done"))
    .catch((error) => "Error in Super_Admin");

  await Companies_Access.create({
    sa_id: 1,
    comp_name: "Pak e Property",
    comp_address: "Rawalpindi",
    comp_contact: "051-9765821",
    access_Status: 1
  })
    .then((d) => console.log("Companies_Access --> Done"))
    .catch((error) => "Error in Companies_Access");

  await Zone.create({
    zone_name: "Punjab"
  })
    .then((d) => console.log("Zone --> Done"))
    .catch((error) => "Error in Zone");

  await GM_Company.create({
    gm_name: "GM of Company",
    gm_email: "gm@info.com",
    gm_password: "$2b$10$WfgW1aVsxJOZ1tD.yMRSBuHFPl9NtHyiJJJSGRUt4EgbC5hEp1P1G",
    gm_contact: "0321-1111000",
    gm_profile_pic: "/img/GM.jpg",
    gm_salary: "150000",
    comp_access_id: 1,
    zone_id: 1
  })
    .then((d) => console.log("GM_Company --> Done"))
    .catch((error) => "Error in GM_Company");

  await Department.create({
    d_name: "Sales",
    d_type: "Sale and Marketing",
    comp_access_id: 1,
    gm_id: 1,
    sa_id: 1
  })
    .then((d) => console.log("Department --> Done"))
    .catch((error) => "Error in Department");

  await Managers.create({
    man_name: "Manager",
    man_email: "manager@info.com",
    man_password:
      "$2b$10$WfgW1aVsxJOZ1tD.yMRSBuHFPl9NtHyiJJJSGRUt4EgbC5hEp1P1G",
    man_userProfilePic: "manager.png",
    man_contact: "0333-5214777",
    man_salary: "140000",
    man_username: "manager_12",
    d_id: 1,
    zone_id: 1
  })
    .then((d) => console.log("Manager -> Done"))
    .catch((error) => "Error in Manager" + error);

  await User_Role.create({
    type_name: "GM Company"
  })
    .then((d) => console.log("User_Role --> Done"))
    .catch((error) => "Error in User_Role");

  await User_Role.create({
    type_name: "Manager"
  })
    .then((d) => console.log("User_Role --> Done"))
    .catch((error) => "Error in User_Role");

  await User_Role.create({
    type_name: "SuperVisor"
  })
    .then((d) => console.log("User_Role --> Done"))
    .catch((error) => "Error in User_Role");

  await User_Role.create({
    type_name: "Team Lead"
  })
    .then((d) => console.log("User_Role --> Done"))
    .catch((error) => "Error in User_Role");

  await User_Role.create({
    type_name: "Field Executive"
  })
    .then((d) => console.log("User_Role --> Done"))
    .catch((error) => "Error in User_Role");

  await User_Role.create({
    type_name: "Freelance Field Executive"
  })
    .then((d) => console.log("User_Role --> Done"))
    .catch((error) => "Error in User_Role");

  await City.create({
    city_name: "Rawalpindi",
    city_code: "352",
    zone_id: 1
  })
    .then((d) => console.log("City --> Done"))
    .catch((error) => "Error in City");

  await User_Login_Information.create({
    login_email: "test@aa",
    login_password:
      "$2b$10$IhwmSCZDgheT3pCvaTd4YezxKSXPgXnS84r6HKXI.56uXawidQ8Ee",
    user_role_id: 6
  })
    .then((d) => console.log("User_Login_Information --> Done"))
    .catch((error) => "Error in User_Login_Information");

  await Supervisor.create({
    sup_name: "Development",
    sup_userProfilePic: "/img/profile.jpg",
    sup_contact: "0345-5536125",
    sup_target: "144",
    sup_salary: "15000",
    sup_commission: "2.5%",
    sup_username: "develop",
    man_id: 18,
    login_id: 2
  })
    .then((d) => console.log("Supervisor --> Done"))
    .catch((error) => console.log("Error in User_Login_Information" + error));

  await City_and_Supervisor_associate.create({
    city_id: 1,
    sup_id: 1
  })
    .then((d) => console.log("City_and_Supervisor_associate --> Done"))
    .catch((error) => "Error in City_and_Supervisor_associate");

  await City_Areas.create({
    city_name: "Rawal Road",
    city_code: "101",
    city_supp_assos_id: 1
  })
    .then((d) => console.log("City_Areas --> Done"))
    .catch((error) => "Error in City_Areas");

  // await Team_Lead.create({
  //   team_L_name: "Team Lead",
  //   team_L_userProfilePic: "Team Lead.jpg",
  //   team_L_contact: "0321-8741000",
  //   team_L_target: "150",
  //   team_L_salary: "85100",
  //   team_L_commission: "1.5%",
  //   team_L_username: "teamLead_11",
  //   city_area_id: 1,
  //   sup_id: 1,
  //   login_id: 3,
  // })
  //   .then((d) => console.log("Team_Lead --> Done"))
  //   .catch((error) => console.log("Error in Team_Lead" + error));

  // await Field_Executive.create({
  //   field_name: "Saad",
  //   field_userProfilePic: "/img/profile.jpg",
  //   field_contact: "0345-5536125",
  //   field_target: "150",
  //   field_salary: "15000",
  //   field_commission: "2.5%",
  //   field_username: "saad@112",
  //   login_id: 3,
  //   team_L_id: 3,
  // })
  //   .then((d) => console.log("Field_Executive --> Done"))
  //   .catch((error) => console.log("Error in Field_Executive" + error));

  // await Permissions.create({
  //   permission_name: "View Earning",
  //   // permission_name: "Withdraw",
  //   // permission_name: "Manage CSR",
  //   // permission_name: "Manage Agencies",
  //   // permission_name: "Manage Field Executive",
  //   // permission_name: "Manage Team Lead",
  //   // permission_name: "Manage Supervisor",
  //   // permission_name: "Manage Report",
  //   // permission_name: "Manage City Areas",
  //   // permission_name: "Manage City",
  //   // permission_name: "Manage Managers",
  // })
  //   .then((d) => console.log("Permissions --> Done"))
  //   .catch((error) => console.log("Error in Permissions" + error));

  await Web_Content.create({
    logo: "/logo/logo.png",
    firstHeading: "What We Do",
    secondHeading: "HOW WE DO IT",
    thirdHeading: "WHAT IT DELIVERS",
    firstHeadingText: `ipsum dolor sit amet, consectetur adipisicing elit. Tempore sequi ut aut, possimus
    eos ab. Aperiam iste ratione
    aspernatur quod alias reprehenderit? Aspernatur ex dolorem fugiat quis consequuntur
    repudiandae eveniet.`,
    secondHeadingText: `. Tempore sequi ut aut, possimus eos ab. Aperiam iste ratione
    aspernatur quod alias reprehenderit? Aspernatur ex dolorem fugiat quis consequuntur
    repudiandae eveniet.`,
    thirdHeadingText: `ipsum dolor sit amet, consectetur adipisicing elit. ab. Aperiam iste ratione
    aspernatur quod alias reprehenderit? Aspernatur ex dolorem fugiat quis consequuntur
    repudiandae eveniet.`,
    signUpbtn: "Sign Up",
    loginbtn: "Login",
    firstCardHeading: "What We Do",
    firstCardtext: ` Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Similique illum nulla modi?
    Provident veritatis magni quae tempore
    illum fugit molestiae ipsum? Quibusdam`,
    secondCardHeading: "What We Do",
    secondCardtext: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Similique illum nulla modi?
    Provident veritatis magni quae tempore
    illum fugit molestiae ipsum? Quibusdam`,
    thirdCardHeading: "WHAT IT DELIVERS",
    thirdCardtext: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Similique illum nulla modi?
    Provident veritatis magni quae tempore
    illum fugit molestiae ipsum? Quibusdam`,
    fourthCardHeading: "What We Do",
    fourthCardtext: ` Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Similique illum nulla modi?
    Provident veritatis magni quae tempore
    illum fugit molestiae ipsum? Quibusdam`,
    fifthCardHeading: "What We Do",
    fifthCardtext: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Similique illum nulla modi?
    Provident veritatis magni quae tempore
    illum fugit molestiae ipsum? Quibusdam`,
    sixthCardHeading: "WHAT IT DELIVERS",
    sixthCardtext: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Similique illum nulla modi?
    Provident veritatis magni quae tempore
    illum fugit molestiae ipsum? Quibusdam`,
    seventhCardHeading: "What We Do",
    seventhCardtext: ` Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Similique illum nulla modi?
    Provident veritatis magni quae tempore
    illum fugit molestiae ipsum? Quibusdam`,
    eighthCardHeading: "What We Do",
    eighthCardtext: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Similique illum nulla modi?
    Provident veritatis magni quae tempore
    illum fugit molestiae ipsum? Quibusdam`,
    ninthCardHeading: "WHAT IT DELIVERS",
    ninthCardtext: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Similique illum nulla modi?
    Provident veritatis magni quae tempore
    illum fugit molestiae ipsum? Quibusdam`,
    footer_heading_one: `What we Do`,
    footer_heading_second: "our team",
    footer_heading_third: "Newsfeed",
    footer_heading_fourth: "pep life",
    footer_heading_fifth: "Social media",
    footer_heading_one_content: `<li><a href="">How it works</a></li>
                                <li><a href="">Where it works</a></li>`,

    footer_heading_second_content: `<li><a href="">management</a></li>
                                    <li><a href="">local leadership</a></li>
                                    <li><a href="">advisory board</a></li>`,

    footer_heading_third_content: `<li><a href="">management</a></li>
                                         <li><a href="">local leadership</a></li>
                                         <li><a href="">advisory board</a></li>`,

    footer_heading_fourth_content: `<li><a href="">history</a></li>
                                    <li><a href="">careers</a></li>
                                    <li><a href="">contact</a></li>`,
    footer_heading_fifth_content: `<li><a href=""><i class="fa fa-facebook" aria-hidden="true"></i> Facebook</a></li>
                                      <li><a href=""><i class="fa fa-google" aria-hidden="true"></i> Google</a></li>
                                      <li><a href=""><i class="fa fa-instagram" aria-hidden="true"></i> Instagram</a></li>`,
    sa_id: 1,
    backgroundVideo: "/video/video.mp4"
  })
    .then((d) => console.log("Web_Content --> Done"))
    .catch((error) => "Error in Web_Content");

  await SignUp_Page.create({
    signUpTitle: "Member Registration",
    btnText: "Register",
    alreadyHaveAccount: "Already have Account",
    emailPlaceHolder: "Enter Email",
    emailIcon: "fa fa-envelope",
    passwordPlaceHolder: "Enter Password",
    passwordIcon: "fa fa-lock",
    confirmPasswordPlaceHolder: "Confirm your Password",
    confirmPasswordIcon: "fa fa-lock",
    pictureName: "img-01.png",
    pictureFolder: "/img/",
    alreadyHaveAccountIcon: "fa fa-long-arrow-right m-l-5",
    sa_id: 1
  })
    .then((d) => console.log("SignUp_Page --> Done"))
    .catch((error) => "Error in SignUp_Page");

  await Login_Page.create({
    loginTitle: "Member Login",
    btnText: "Login",
    forgetText: "Forgot",
    forgetEmail: "Email",
    forgetPassword: "Password",
    createAccountText: "Create your Account",
    emailPlaceHolder: "Enter Email",
    emailIcon: "fa fa-envelope",
    passwordPlaceHolder: "Enter Password",
    passwordIcon: "fa fa-lock",
    pictureName: "img-01.png",
    pictureFolder: "/img/",
    createAccountIcon: "fa fa-long-arrow-right m-l-5",
    sa_id: 1
  })
    .then((d) => console.log("Login_Page --> Done"))
    .catch((error) => "Error in Login_Page");
};

module.exports = {
  sequelize,
  Synchronizing,
  DevelopmentDatabase,
  Advertisement_Recommendation,
  Advertisement_Stock,
  Advertising_Stock_Allocation,
  Request_of_Advertisement,
  Agency_Info,
  AgencyTypes,
  Carriers,
  Carrier_Paid_Payment,
  Carriers_Services,
  Payment_Carrier_Services,
  City,
  ExecutiveNotifications,
  TeamLead_Notifications,
  SuperVisorNotification,
  ManagerNotifications,
  GMNotifications,
  City_Areas,
  City_Sectors,
  City_and_Supervisor_associate,
  City_Sector_Assosiate,
  Compaigns,
  Compaign_Activities,
  Compaign_Sale,
  Companies_Access,
  Company_Promotion,
  Customer_Care_Activities,
  Call_Receiving,
  Executive_Adver_Stock_Info,
  Executive_Pending_Earning,
  Executive_Withdraws,
  Stock_Usage,
  Activities,
  Activity_Instruction,
  List_of_Packages,
  List_sub_Activities,
  Carrier_Logs,
  Company_Acess_Logs,
  SuperAdmin_Department_Logs,
  Packages,
  PEP_Agents,
  Permissions,
  ExecutiveLogins,
  NotificationText,
  GMLogin,
  ManagerLogin,
  SuperVisorLogin,
  TeamLead_Login,
  Permission_Role_Assosiate,
  PEP_Agents_Activities,
  Promotion_Request_Status,
  Promotion_Req_By_Supervisor,
  Customer_Care_Respresentative,
  Data_Entry_Operator,
  Field_Executive,
  GM_Company,
  Recommendation_for_Executive,
  Managers,
  ComplainsOfActivities,
  WebAds,
  Super_Admin,
  Supervisor,
  Team_Lead,
  Banks_List,
  PEP_Banks_Details,
  Team_Lead_Adver_Stock,
  Training,
  Training_Activities,
  User_Login_Information,
  User_Role,
  changeRoleLogs,
  Role_ExtraInfo,
  Login_Page,
  Executive_Recommendation,
  SignUp_Page,
  Web_Content,
  Pendance_Clearance_Details,
  Department,
  Zone
};
