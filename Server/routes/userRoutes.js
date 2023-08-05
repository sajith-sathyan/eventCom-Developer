const {
  register,
  login,
  GoogleLogin,
  BasicInfo,
  EventMedia,
  getBasicInfoData,
  userDetails,
  getOrgEventListByUserId,
  getEventMediaById,
  GetBasicInfoByID,
  addTickets,
  eventDetialsById,
  getBasicInfoById,
  getUserDataById,
  getTicketDetialsById,
  getTicket,
  GetAllEventDetialsByBasicInfoID,
  updataBasicInfo,

  protected,
  createCheckoutSession,
  AddDataToSelledTicket,
  sendMessageToWhatsApp,
  getDataFromSelledTicket,
  getBasicInfoByEventMediaId,
  deleteAdmission,
  addQrCodeUrl,
  GetSelledTicketData,

  getBannerShow,
  updateEventMedia,
  UpdateAdmission,

  AddTicketUserDetailsTempInUserDatabase,
  getTemporayDataBase,
  DeleteTemporaryDatabase,
  getBookedUserDetials,
  DeleteEvent,
  refreshToken,
  getSelledTicketByUserId,
  userLogOut,
  getGraphEvents,
  useUpdateDataOnRender,
} = require("../../Server/Controllers/userController");
const { verifyToken } = require("../Middlewares/authMiddleware");

const router = require("express").Router();

// get getUserDataById  getTIcket getDataFromSelledTicket

router.get("/eventDetails",  getBasicInfoData);
router.get("/userDetails", userDetails);
router.get("/orgEventList", getOrgEventListByUserId);
router.get("/getEventMediaById",  getEventMediaById);
router.get("/GetBasicInfoByID", GetBasicInfoByID);
router.get("/eventDetialsById",eventDetialsById);
router.get("/getBasicInfoById", getBasicInfoById);
router.get("/getUserDataById", getUserDataById);
router.get("/getTicketDetialsById", getTicketDetialsById);
router.get("/getBasicInfoByEventMediaId",getBasicInfoByEventMediaId);
router.get("/getTicket",getTicket);
router.get("/GetAllEventDetialsByBasicInfoID", GetAllEventDetialsByBasicInfoID);
router.get("/getTemporayDataBase",getTemporayDataBase);
router.get("/getBookedUserDetials",getBookedUserDetials);
// router.get("/protected", authenticateToken, protected);
router.get("/getDataFromSelledTicket", getDataFromSelledTicket, protected);
router.get("/GetSelledTicketData", GetSelledTicketData);

router.get("/getBannerShow", getBannerShow);
router.get("/getSelledTicketByUserId",getSelledTicketByUserId);


// post updataBasicInfo   testLogin
router.post("/");
router.post("/register", register);
router.post("/login", login);
router.post("/google", GoogleLogin);
router.post("/manage/create",BasicInfo);
router.post("/event/details", EventMedia);
router.post("/addTickets",addTickets);
router.post("/updataBasicInfo",updataBasicInfo);
router.post("/updataBasicInfo", updataBasicInfo);
// router.post("/testLogin", testLogin);
router.post("/create-checkout-session",createCheckoutSession);
router.post("/AddDataToSelledTicket", AddDataToSelledTicket);
router.post("/sendMessageToWhatsApp",verifyToken, sendMessageToWhatsApp);
router.post("/deleteAdmission", deleteAdmission);
router.post("/addQrCodeUrl", addQrCodeUrl);

router.post("/updateEventMedia",updateEventMedia);
router.post("/UpdateAdmission", UpdateAdmission);
router.post(
  "/AddTicketUserDetailsTempInUserDatabase",
 AddTicketUserDetailsTempInUserDatabase
);
router.post("/DeleteTemporaryDatabase", DeleteTemporaryDatabase);
router.post("/DeleteEvent", DeleteEvent);
router.post("/userLogOut", userLogOut);
router.post("/useUpdateDataOnRender", useUpdateDataOnRender);

router.post("/refresh-token", refreshToken);

module.exports = router;
