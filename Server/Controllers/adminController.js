const mongoose = require("mongoose");
require("dotenv").config();
const queryString = require("querystring");
const User = require("../model/AuthModel");
const jwt = require("jsonwebtoken");
const admin = require("../Config/firebase.config");
const Users = require("../model/userFirebase");
const BasicInfoModel = require("../model/BasicInfoModel");
const EventMediaModel = require("../model/EventMedia");
const TicketModel = require("../model/TicketModel");
const SelledTicketModel = require("../model/SelledTickets");
const VisitorCountModel = require("../model/VisitorCount");
const BannerModel = require("../model/Banner");
const TemporaryModel = require("../model/Temporary");
const AdminModel = require("../model/Admin")
const bcrypt = require("bcrypt"); 
const CategoryAndTypeModel = require("../model/CategoryAndType");

const handleErrors = (err) => {
  let errors = { username: "", mobile: "", email: "", password: "" };
  console.log("error------------------   ------------     ---------  " + err);
  console.log(err);
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  if (err.code === 11000) {
    errors.email = "Email is already registered";
    return errors;
  }

  if (err.message.includes("Users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.getUserData = async (req, res) => {
  console.log("getUserData worked");
  User.find({}, (err, User) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    console.log(User);
    res.json(User);
  });
};
module.exports.ApproveEvent = async (req, res) => {
  const BasicInfoId = req.query.id;
  try {
    console.log("BasicInfoId-- ApproveEvent->", BasicInfoId);

    // Approve the basic info
    const UpdateBasicInfo = await BasicInfoModel.findOneAndUpdate(
      { _id: BasicInfoId },
      { $set: { EventStatus: "Approved" } },
      { new: true }
    );
    console.log("UpdateBasicInfo---ApproveEvent-->", UpdateBasicInfo);

    // Approve the event media
    const UpdateEventMedia = await EventMediaModel.findOneAndUpdate(
      { basicInfoId: BasicInfoId },
      { $set: { EventStatus: "Approved" } },
      { new: true }
    );
    console.log("UpdateEventMedia---ApproveEvent-->", UpdateEventMedia);

    // Approve the ticket
    const UpdateTicket = await TicketModel.findOneAndUpdate(
      { basicInfoId: BasicInfoId },
      { $set: { EventStatus: "Approved" } },
      { new: true }
    );
    console.log("UpdateTicket---ApproveEvent-->", UpdateTicket);

    res.status(200).json({ message: "Event approved successfully" });
  } catch (error) {
    console.error("Error in ApproveEvent:", error);
    res.status(500).json({ message: "Error in approving event" });
  }
};

module.exports.changeToPending = async (req, res) => {
  const BasicInfoId = req.query.id;
  try {
    console.log("BasicInfoId-- ApproveEvent->", BasicInfoId);

    // Approve the basic info
    const UpdateBasicInfo = await BasicInfoModel.findOneAndUpdate(
      { _id: BasicInfoId },
      { $set: { EventStatus: "Pending" } },
      { new: true }
    );
    console.log("UpdateBasicInfo---ApproveEvent-->", UpdateBasicInfo);

    // Approve the event media
    const UpdateEventMedia = await EventMediaModel.findOneAndUpdate(
      { basicInfoId: BasicInfoId },
      { $set: { EventStatus: "Pending" } },
      { new: true }
    );
    console.log("UpdateEventMedia---ApproveEvent-->", UpdateEventMedia);

    // Approve the ticket
    const UpdateTicket = await TicketModel.findOneAndUpdate(
      { basicInfoId: BasicInfoId },
      { $set: { EventStatus: "Pending" } },
      { new: true }
    );
    console.log("UpdateTicket---ApproveEvent-->", UpdateTicket);

    res.status(200).json({ message: "Event approved successfully" });
  } catch (error) {
    console.error("Error in ApproveEvent:", error);
    res.status(500).json({ message: "Error in approving event" });
  }
};

module.exports.getBasicInfoData = async (req, res) => {
  BasicInfoModel.find({}, (err, BasicInfoModel) => {
    if (err) {
      // console.log(err);
      return res.status(500).send(err);
    }
    console.log("BasicInfoModel--->", BasicInfoModel);
    res.json(BasicInfoModel);
  });
};
module.exports.AdminLogin = async (req, res) => {
  // const admin = new AdminModel({
  //   email:"admin@gmail.com",
  //   password:"1234567890"
  // })
  // admin.save()
  try {
    const { email, password } = req.body;
    console.log("email--->", email);
    console.log("password--->", password);
    // Generate access and refresh tokens

    const Admin = await AdminModel.login(email, password);
    console.log("Admin---->", Admin);
    const Token = (accessToken = jwt.sign(
      { userId: Admin._id },
      "your-access-token-secret",
      {
        expiresIn: "5s",
      }
    ));
    const updatedData = await AdminModel.findByIdAndUpdate(
      Admin._id,
      { Token: Token },
      { new: true }
    );
    res.send({ Admin: updatedData, status: true });
  } catch (err) {
    const errors = handleErrors(err);
    res.send({ errors: errors, status: false });
    console.log("errors---->", errors);
  }
};
// block user
module.exports.BlockUser = async (req, res) => {
  const { userID } = req.body;
  console.log("BlockUser-------->", userID);
  const response = await User.findByIdAndUpdate(userID, { Status: "Blocked" });
  res.send({ response });
  console.log(response);
};
module.exports.Unblock = async (req, res) => {
  const { userID } = req.body;
  const response = await User.findByIdAndUpdate(userID, { Status: "active" });
  console.log(response);
  res.send({ response });
};

// add category

module.exports.addCategory = async (req, res) => {
  const { category } = req.body;
  console.log(category);

  let document = await CategoryAndTypeModel.findOne();

  if (!document) {
    document = new CategoryAndTypeModel();
    document.Category = [category];
  } else {
    document.Category.unshift(category);
  }

  const updatedDocument = await document.save();

  console.log("New element added to the Category array:", updatedDocument);
  res.send({ updatedDocument });
};

// add type

module.exports.addType = async (req, res) => {
  const { type } = req.body;
  console.log(type);
  let document = await CategoryAndTypeModel.findOne();

  if (!document) {
    document = new CategoryAndTypeModel();
    document.Type = [type];
  } else {
    document.Type.unshift(type);
  }

  const updatedDocument = await document.save();

  console.log("New element added to the Category array:", updatedDocument);
  res.send({ updatedDocument });
};

// get category and type

module.exports.getCategoryAndType = async (req, res) => {
  console.log("called:::::");
  const CategoryAndType = await CategoryAndTypeModel.find({});
  console.log("---------", CategoryAndType);
  res.send({ CategoryAndType });
};

module.exports.DeleteCategoryOrType = async (req, res) => {
  try {
    const { index, DeletedData } = req.body;
    console.log("..........", index, DeletedData);

    if (index === "Category") {
      try {
        const updatedDocument = await CategoryAndTypeModel.findOneAndUpdate(
          { Category: DeletedData },
          { $pull: { Category: DeletedData } },
          { new: true }
        );

        console.log("Element deleted successfully.");
        console.log(updatedDocument);

        res.status(200).json({
          success: updatedDocument,
          message: "Element deleted successfully.",
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({
          success: falupdatedDocumentse,
          message: "An error occurred while deleting the element.",
        });
      }
    }
    if (index === "Type") {
      try {
        const updatedDocument = await CategoryAndTypeModel.findOneAndUpdate(
          { Type: DeletedData },
          { $pull: { Type: DeletedData } },
          { new: true }
        );

        console.log("Element deleted successfully.");
        console.log(updatedDocument);

        res.status(200).json({
          success: updatedDocument,
          message: "Element deleted successfully.",
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({
          success: falupdatedDocumentse,
          message: "An error occurred while deleting the element.",
        });
      }
    }
  } catch (err) {}
};



module.exports.LogOut = async (req, res) => {
  try {
    const admin = await AdminModel.findOne({});
    console.log("admin---------->", admin);
    const Id = admin._id;
    console.log("id----->", Id);
    
    if (admin) {
      const response = await AdminModel.findByIdAndUpdate(
        Id,
        { Token: "" },
        { new: true }
      );
      res.send({ response});
    } else {
      res.send({ status: false, message: "Admin not found" });
    }
  } catch (error) {
    console.error("Error during logout:", error);
    res.send({ status: false, message: "Logout failed" });
  }
};


module.exports.getAdminData = async (req, res) => {
  const adminData = await AdminModel.find({});
  if (adminData) {
    res.send({ adminData });
  } else {
    res.send({});
  }
};

module.exports.verifyToken = async (req, res) => {
  console.log("req.body------->", req.body);
  console.log(
    "req.body------------------------------------------------------------------------>"
  );
  const token = req.body;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, "your-access-token-secret", (err, decoded) => {
    if (err) {
      res.send({ verified: false });
      console.log("---------false");
    } else {
      res.send({ verified: true });
      console.log("---------treu");
    }
  });
};

module.exports.getVistedCount = async (req,res)=>{
  const responce = await VisitorCountModel.find({})
  console.log("VisitorCountModel------------->",responce)
  res.send({responce})
}

module.exports.GetAllEventDetialsByBasicInfoID = async (req, res) => {
  const BasicInfoId = req.query.id;
  console.log("BasicInfoId--->", BasicInfoId);
  const BasicInfoData = await BasicInfoModel.findOne({ _id: BasicInfoId });
  const EvetnMeidaData = await EventMediaModel.findOne({
    basicInfoId: BasicInfoId,
  });
  const TicketData = await TicketModel.findOne({ basicInfoId: BasicInfoId });
  console.log("BasicInfoData--->", BasicInfoData);
  console.log("EvetnMeidaData--->", EvetnMeidaData);
  console.log("TicketData--->", TicketData);

  res.json({
    BasicInfoData: BasicInfoData,
    EvetnMeidaData: EvetnMeidaData,
    TicketData: TicketData,
  });
};

// get bannner
module.exports.getBanner = async (req, res) => {
  console.log("called");
  try {
    const response = await BannerModel.find({});
    console.log(response);
    console.log("Response:", response[0].BannerUrl);
    const BannerUrl = response[0].BannerUrl;
    res.send({ BannerUrl });
  } catch (error) {
    console.error("Error:", error);
  }
};
// add banner
module.exports.addBanner = async (req, res) => {
  const { url } = req.body;
  console.log("url---->", url);
  BannerModel.findOne({}, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      if (result) {
        result.BannerUrl.push(url);

        result
          .save()
          .then((updatedBanner) => {
            console.log("URL added to the existing banner:", updatedBanner);
          })
          .catch((saveError) => {
            console.error("Error while saving the updated banner:", saveError);
          });
      } else {
        const newBanner = new BannerModel({
          showBanner: "",
          BannerUrl: [url],
        });

        newBanner
          .save()
          .then((savedBanner) => {
            console.log("New banner added successfully:", savedBanner);
          })
          .catch((saveError) => {
            console.error("Error while saving the new banner:", saveError);
          });
      }
    }
  });
};

// select banner
module.exports.selectBanner = async (req, res) => {
  const { url } = req.body;
  BannerModel.findOneAndUpdate({}, { showBanner: url }, { new: true })
    .then((updatedDocument) => {
      if (updatedDocument) {
        console.log("Field updated successfully:", updatedDocument);
      } else {
        console.log("No document found in the collection.");
      }
    })
    .catch((error) => {
      console.error("Error updating field:", error);
    });
};


// delete banner url
module.exports.DeleteBannerUrl = async (req, res) => {
  const { url } = req.body;
  BannerModel.findOneAndUpdate(
    {}, // condition to find the document
    { showBanner: url }, // use $pull to remove the specified element from the array
    { new: true } // option to return the updated document
  );

  BannerModel.findOneAndUpdate(
    {}, // condition to find the document
    { $pull: { BannerUrl: url } }, // use $pull to remove the specified element from the array
    { new: true } // option to return the updated document
  )
    .then((updatedDocument) => {
      if (updatedDocument) {
        console.log("Element removed successfully:", updatedDocument);
      } else {
        console.log("No document found with the given condition.");
      }
    })
    .catch((error) => {
      console.error("Error removing element:", error);
    });
};

// get selled ticket data by give user id

module.exports.GetSelledTicketData = async (req, res) => {
  const userId = req.query.id;
  console.log("id--->", userId);
  SelledTicketModel.find({ UserId: userId })
    .then((response) => {
      console.log(response);
      res.send({ response });
    })
    .catch((error) => {
      console.error(error);
    });
};

// get the user data by giving the user id
module.exports.userDetails = async (req, res) => {
  const userId = req.query.id;
  console.log("........", userId);
  try {
    const UserData = await Users.findOne({ _id: userId });

    res.json(UserData);
  } catch (err) {
    console.log(err, "getUserDataById error");
  }
};

