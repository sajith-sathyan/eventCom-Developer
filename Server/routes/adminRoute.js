const router = require("express").Router();
const {
  getUserData,
  ApproveEvent,
  changeToPending,
  getBasicInfoData,
  AdminLogin,
  BlockUser,
  Unblock,
  addCategory,
  addType,
  getCategoryAndType,
  LogOut,
  getAdminData,
  verifyToken,
  getVistedCount  ,
  GetAllEventDetialsByBasicInfoID,
  getBanner,
  addBanner,
  selectBanner,
  DeleteBannerUrl,
  GetSelledTicketData,
  userDetails
} = require("../Controllers/adminController");

// get   

router.get("/getUser", getUserData);
router.get("/ApproveEvent", ApproveEvent);
router.get("/changeToPending", changeToPending);
router.get("/eventDetails", getBasicInfoData);
router.get("/getCategoryAndType", getCategoryAndType);
router.get("/getAdminData", getAdminData);
router.get("/getVistedCount", getVistedCount);
router.get("/GetAllEventDetialsByBasicInfoID", GetAllEventDetialsByBasicInfoID);
router.get("/GetSelledTicketData", GetSelledTicketData);
router.get("/userDetails",  userDetails);
router.post("/DeleteBannerUrl", DeleteBannerUrl);
router.post("/selectBanner", selectBanner);
router.post("/addBanner", addBanner);
router.get("/getBanner", getBanner);
router.post("/login", AdminLogin);
router.post("/BlockUser", BlockUser);
router.post("/Unblock", Unblock);
router.post("/Unblock", Unblock);
router.post("/addCategory", addCategory);
router.post("/addType", addType);
router.post("/LogOut", LogOut);
router.post("/verifyToken", verifyToken);

module.exports = router;
