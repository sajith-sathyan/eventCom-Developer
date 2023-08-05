// const { default: GoogleLogin } = require("../../public/src/pages/users/googleLogin");
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
const CategoryAndTypeModel = require("../model/CategoryAndType");
const bcrypt = require("bcrypt");
const stripe = require("stripe")(process.env.STRIPE_KEY);

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../Helpers/GenerateTocken");
const { connected } = require("process");
const { use } = require("../routes/adminRoute");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "sajith eventcom super secret key", {
    expiresIn: maxAge,
  });
};

//  handle error

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

// register new user to databse

module.exports.register = async (req, res, next) => {
  try {
    console.log("req.body----:", req.body);
    const { email, password, username, mobile, Status } = req.body;
    const user = await User.create({
      username,
      mobile,
      email,
      password,
      Status,
    });

    if (user) {
      // Generate access and refresh tokens
      var accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN,
        }
      );

      var refreshToken = jwt.sign(
        { userId: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRESIN,
        }
      );

      if (accessToken) {
        const addAccessToken = User.findById("648ac4953510373e83f511f8");
        console.log("addAccessToken----->", addAccessToken);
      }
      res.status(200).json({
        user: {
          id: user._id,
          username: user.username,
          mobile: user.mobile,
          email: user.email,
          status: user.Status,
        },
        accessToken,
        refreshToken,
      });
      const addAccessToken = await User.findByIdAndUpdate(
        user._id,
        { accessToken: accessToken },
        { new: true }
      );
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};

// check the user is exit or not

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    console.log("user------||-------||------>", user);
    if (user) {
      // Generate access and refresh tokens
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN,
        }
      );

      const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRESIN,
        }
      );
      const loginError = "normalLogin";
      const addAccessToken = await User.findByIdAndUpdate(
        user._id,
        { accessToken: accessToken },
        { new: true }
      );
      if (accessToken) {
        const addAccessToken = User.findById("648ac4953510373e83f511f8");
        console.log("addAccessToken----->", addAccessToken);
      }
      res.status(200).json({
        user: {
          id: user._id,
          username: user.username,
          mobile: user.mobile,
          email: user.email,
          status: user.Status,
        },
        accessToken,
        refreshToken,
      });
    } else {
      res.status(401).json({ message: "Invalid credentials", errors });
    }
  } catch (err) {
    const errors = handleErrors(err);
    res.send({ errors, status: false });
  }
};

const newUseData = async (decodedValue, req, res) => {
  const newUser = new Users({
    username: decodedValue.name,
    email: decodedValue.email,
    imageUrl: decodedValue.picture,
    userId: decodedValue.user_id,
    email_verified: decodedValue.email_verified,
    auth_time: decodedValue.auth_time,
  });

  try {
    const savedUser = await newUser.save();
    console.log("savedUser", savedUser);
    return savedUser;
  } catch (err) {
    throw err;
  }
};

const updateUserData = async (decodedValue, req, res) => {
  const filter = { userId: decodedValue.user_id };
  const options = {
    upsert: true,
    new: true,
  };

  try {
    const result = await Users.findOneAndUpdate(
      filter,
      { auth_time: decodedValue.auth_time },
      options
    );
    return result;
  } catch (err) {
    res.status(400).send({ success: false, msg: err });
  }
};

module.exports.GoogleLogin = async (req, res) => {
  console.log("inside google login server side");

  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodedValue = await admin.auth().verifyIdToken(token);
    console.log("----------", decodedValue);
    if (!decodedValue) {
      return res
        .status(500)
        .status(500)
        .json({ success: false, message: " unAuthorized user " });
    }

    // checking user is already exit or not
    const userExists = await User.find({ email: decodedValue.email });
    //
    if (!userExists) {
      console.log("user does not exist");
      const savedUser = await newUseData(decodedValue);
      console.log("savedUser", savedUser);
      // Generate access and refresh tokens
      const accessToken = jwt.sign(
        { userId: savedUser._id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN,
        }
      );

      const refreshToken = jwt.sign(
        { userId: savedUser._id },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRESIN,
        }
      );
      const loginError = "googleLogin";
      const addAccessToken = await User.findByIdAndUpdate(
        savedUser._id,
        { accessToken: accessToken },
        { new: true }
      );
      res.status(200).json({
        user: {
          id: savedUser._id,
          username: savedUser.username,
          mobile: savedUser.mobile,
          email: savedUser.email,
          status: savedUser.Status,
        },
        accessToken,
        refreshToken,
        loginError,
      });
    } else {
      const result = await updateUserData(decodedValue, req, res);
      console.log("user  exit");
      const accessToken = jwt.sign(
        { userId: result._id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN,
        }
      );

      const refreshToken = jwt.sign(
        { userId: result._id },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN,
        }
      );
      res.status(200).json({
        user: {
          id: result._id,
          username: result.username,
          mobile: result.mobile,
          email: result.email,
          status: result.Status,
        },
        accessToken,
        refreshToken,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, msg: error });
  }
};

// add event create basic info to the database

module.exports.BasicInfo = async (req, res) => {
  console.log("server side data get ==>", req.body);

  try {
    const {
      EventStatus,
      decryptedUserId,
      eventTitle,
      organizerName,
      type,
      category,
      locationAddress,
      latitude,
      longitude,
      startDate,
      startTime,
      endDate,
      endTime,
    } = req.body;

    const basicInfoEvent = new BasicInfoModel({
      EventStatus,
      userId: decryptedUserId,
      eventTitle,
      organizerName,
      type,
      category,
      locationAddress,
      latitude,
      longitude,
      startDate,
      startTime,
      endDate,
      endTime,
    });

    const saveBasicInfo = await basicInfoEvent.save();
    console.log("saveBasicInfo===>", saveBasicInfo);

    res.status(201).json({ saveBasicInfo, created: true });
  } catch (err) {
    res.status(400).send({ success: false, msg: err });
  }
};

// add data to eventmedia database

module.exports.EventMedia = async (req, res) => {
  console.log(req.body);

  try {
    const { EventStatus, id, url, summary, text } = req.body;
    console.log("url------------->", url);

    // Get basic info details using basic info id
    const basicInfoDoc = await BasicInfoModel.findOne({ _id: id });
    console.log("basicInfoDoc-->", basicInfoDoc);

    if (!basicInfoDoc) {
      throw Error("Basic info document not found"); // Handle if basic info document is not found
    }

    const eventMedia = new EventMediaModel({
      EventStatus,
      userId: basicInfoDoc.userId,
      basicInfoId: id,
      eventImgUrl: url,
      summary: summary,
      description: text,
    });

    const savedEventMedia = await eventMedia.save();

    basicInfoDoc.eventImgUrl = url;
    basicInfoDoc.EventMediaId = savedEventMedia._id;
    const updatedBasicInfoDoc = await basicInfoDoc.save();
    console.log("updatedBasicInfoDoc----------->", updatedBasicInfoDoc);

    res
      .status(201)
      .send({ savedEventMedia, updatedBasicInfoDoc, created: true });
  } catch (err) {
    res.status(400).send({ success: false, msg: err.message });
    console.log(err);
  }
};

// get data from basic info database

module.exports.getBasicInfoData = async (req, res) => {
  BasicInfoModel.find({ EventStatus: "Approved" }, (err, BasicInfoModel) => {
    if (err) {
      // console.log(err);
      return res.status(500).send(err);
    }
    console.log("BasicInfoModel--->", BasicInfoModel);
    res.json(BasicInfoModel);
  });
};

// get the user data by giving the user id
module.exports.userDetails = async (req, res) => {
  const userId = req.query.id;
  console.log("........", userId);
  try {
    const UserData = await Users.find({ _id: userId });

    res.send(UserData);
  } catch (err) {
    console.log(err, "getUserDataById error");
  }
};

// getting the evenet list by giving the user id
module.exports.getOrgEventListByUserId = async (req, res) => {
  const userId = req.query.id;
  console.log(userId);
  try {
    const orgEvenBasicInfo = await BasicInfoModel.find({ userId: userId });
    console.log("orgEvenBasicInfo -- >", orgEvenBasicInfo);

    res.json(orgEvenBasicInfo);
    const orgEventEventMedia = await EventMediaModel.find({});
  } catch (err) {
    console.log(err);
  }
};

// get event media data base by give id
module.exports.getEventMediaById = async (req, res) => {
  const eventMediaId = req.query.id;
  console.log(eventMediaId);
  try {
    const eventMedia = await EventMediaModel.find({ _id: eventMediaId });
    console.log("EventMedia-->", eventMedia);
    res.json(eventMedia);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error fetching event media");
  }
};

// get basic info by event media id
module.exports.GetBasicInfoByID = async (req, res) => {
  try {
    const basicInfoId = req.query.id;
    console.log("first", mongoose.Types.ObjectId());
    const basicInfoData = await BasicInfoModel.find({ _id: basicInfoId });
    console.log("basicInfoData--->", basicInfoData);
    res.json(basicInfoData);
  } catch (err) {
    console.log(err, "GetBasicInfoByID-->ERROR");
  }
};

// creating Tickets
module.exports.addTickets = async (req, res) => {
  try {
    const { basicInfoId, Addmission, AddOns } = req.body;

    // Get basic info document using basicInfoId
    const basicInfoData = await BasicInfoModel.findOne({
      EventMediaId: basicInfoId,
    });
    console.log("basicInfoData----->", basicInfoData);

    // Get event media document using basicInfoData.EventMediaId
    if (basicInfoData) {
      const eventMediaData = await EventMediaModel.findById(
        basicInfoData.EventMediaId
      );
      console.log("eventMediaData---->", eventMediaData);

      // Push new ticket into Addmission or AddOns
      if (basicInfoData.TicketsId) {
        console.log("basicInfoData.TicketsId------>", basicInfoData.TicketsId);
        if (req.body.Addmission) {
          const id = mongoose.Types.ObjectId(basicInfoData.TicketsId);
          try {
            const TicketData = await TicketModel.findByIdAndUpdate(id, {
              $push: {
                Addmission: Addmission,
              },
            });
            console.log("ticket--->", TicketData);
            res.send(TicketData);
          } catch (err) {
            console.log(err);
          }
        } else if (req.body.AddOns) {
          const id = mongoose.Types.ObjectId(basicInfoData.TicketsId);
          try {
            const TicketData = await TicketModel.findByIdAndUpdate(id, {
              $push: {
                AddOns: AddOns,
              },
            });
            console.log("ticket--->", TicketData);
            res.send(TicketData);
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        // Add data to the ticket database
        const Tickets = new TicketModel({
          EventStatus: "Pending",
          basicInfoId: eventMediaData.basicInfoId,
          EventMediaId: basicInfoData.EventMediaId,
          userId: basicInfoData.userId,
          Addmission: Addmission,
        });

        const saveTickets = await Tickets.save();
        console.log("saveTickets-->", saveTickets);

        // Update the ticket id in the basic info database and event media data collection
        try {
          // Update basic info document and save it
          basicInfoData.TicketsId = saveTickets._id;
          await basicInfoData.save();

          // Update event media document and save it
          eventMediaData.TicketsId = saveTickets._id;
          await eventMediaData.save();
          res.send(saveTickets);
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      console.log("No basic info found for the given basicInfoId");
      // Handle the case where no basic info is found
    }
  } catch (err) {
    console.log(err, "addTickets ---> ERROR");
  }
};

//get event detiails by event media id
module.exports.eventDetialsById = async (req, res) => {
  const EventMediaId = req.query.id;
  try {
    const EventData = await EventMediaModel.find({ _id: EventMediaId });
    console.log("EventData-->", EventData);
    res.json(EventData);
  } catch (err) {
    console.log(err);
  }
};

// get event basic info by basic info id

module.exports.getBasicInfoById = async (req, res) => {
  const BasicInfoId = req.query.id;
  console.log("BasicInfoId-->", BasicInfoId);
  try {
    const basicInfoData = await BasicInfoModel.find({ _id: BasicInfoId });
    console.log("basicInfoData--->", basicInfoData);
    res.json(basicInfoData);
  } catch (err) {
    console.log(err);
  }
};

// get user data help of user id

module.exports.getUserDataById = async (req, res) => {
  const userId = req.query.id;
  console.log("first--->", userId);
  try {
    const UserData = await Users.find({ _id: userId });
    console.log("UserData------>", UserData);
    res.json(UserData);
  } catch (err) {
    console.log(err);
  }
};

// get ticket detials use basic info id
module.exports.getTicketDetialsById = async (req, res) => {
  const EventMediaId = req.query.id;
  try {
    const BasicInfoData = await BasicInfoModel.find({
      EventMediaId: toString(EventMediaId),
    });
    console.log("getTicketDetialsById-->", BasicInfoData);
    res.json(BasicInfoData);
  } catch (err) {
    console.log(err);
  }
};

// get ticket data use basicinfo id

module.exports.getTicket = async (req, res) => {
  const EventMediaId = req.query.id;
  console.log("EventMediaId---->", EventMediaId);
  const TicketData = await TicketModel.find({
    EventMediaId: EventMediaId,
  });
  console.log("TicketData-??->", TicketData);
  res.send(TicketData);
};

module.exports.GetAllEventDetialsByBasicInfoID = async (req, res) => {
  const BasicInfoId = req.query.id;
  console.log("BasicInfoId--->", BasicInfoId);
  const BasicInfoData = await BasicInfoModel.find({ _id: BasicInfoId });
  const EvetnMeidaData = await EventMediaModel.find({
    basicInfoId: BasicInfoId,
  });
  const TicketData = await TicketModel.find({ basicInfoId: BasicInfoId });
  console.log("BasicInfoData--->", BasicInfoData);
  console.log("EvetnMeidaData--->", EvetnMeidaData);
  console.log("TicketData--->", TicketData);

  res.json({
    BasicInfoData: BasicInfoData,
    EvetnMeidaData: EvetnMeidaData,
    TicketData: TicketData,
  });
};

// update the basic info
module.exports.updataBasicInfo = async (req, res) => {
  const BasicInfoId = req.query.id;
  console.log("req.body--->", req.body);
  const {
    eventTitle,
    organizerName,
    type,
    category,
    latitude,
    longitude,
    startDate,
    startTime,
    endDate,
    endTime,
  } = req.body;
  try {
    const updateData = {
      eventTitle,
      organizerName,
      type,
      category,
      latitude,
      longitude,
      startDate,
      startTime,
      endDate,
      endTime,
    };

    const UpdateBasicInfo = await BasicInfoModel.findOneAndUpdate(
      { _id: BasicInfoId },
      updateData,
      { new: true }
    );
    console.log("UpdateBasicInfo-->", UpdateBasicInfo);
    res.send({ UpdateBasicInfo });
  } catch (err) {
    console.log(err);
  }
  console.log("BasicInfoId--->", BasicInfoId);
};
// approve event
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
// change to pending
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
// module.exports.testLogin = async (req, res) => {
//   console.log("testLogin called");
//   const { email, password } = req.body;
//   console.log(req.body);
//   const user = {
//     id: "1",
//     email: "triangle4business@gmail.com",
//     password: "123",
//   };

//   if (!user) {
//     return res.status(401).json({ message: "Invalid credentials" });
//   }

//   const accessToken = generateAccessToken(user);
//   const refreshToken = genereateRefreshToken(user);
//   res.json({ accessToken, refreshToken });
// };
module.exports.protected = async (req, res) => {
  console.log("protected called");
  res.json({ message: "Protected route accessed successfully" });
  console.log("Protected route accessed successfully");
};

module.exports.createCheckoutSession = async (req, res) => {
  console.log("-------createCheckoutSession----- called");
  const TicketInfo = req.body;
  console.log("TicketInfo.TotalPrice--------->", TicketInfo.TotalPrice);
  const BaseUrl = process.env.REACT_APP_BASE_URL;
  const successUrl =
    `${BaseUrl}/EventTicket?` + queryString.stringify(TicketInfo)||"http://eeventcom.online/EventTicket?" + queryString.stringify(TicketInfo)
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: TicketInfo.TIcketName,
          },
          unit_amount: TicketInfo.TotalPrice,
        },
        quantity: TicketInfo.quntity,
      },
    ],
    mode: "payment",
    success_url: successUrl,
    cancel_url: "http://localhost:3000" || "http://eeventcom.online",
  });

  console.log("session.url ----->", session.url);
  res.send({ url: session.url });
};
module.exports.AddDataToSelledTicket = async (req, res) => {
  const { SelledTicket, QrcodeImage } = req.body;
  console.log("SelledTicket--------||----->", SelledTicket);
  // update the ticket quantity
  const TicketData = await TicketModel.find({ _id: SelledTicket.TicketId });
  console.log("TicketData------------------>", TicketData);
  console.log("SelledTicket---->", SelledTicket);
  const BasicInfo = await BasicInfoModel.find({
    _id: TicketData[0].basicInfoId,
  });
  console.log("BasicInfo---->", BasicInfo);

  if (TicketData.Addmission) {
    const generalAdmission2 = TicketData.Addmission.find(
      (ticket) => ticket.name === SelledTicket.TicketName
    );
    console.log("generalAdmission2--->", generalAdmission2);
    if (generalAdmission2.quantity > 0) {
      // Update the quantity of "General Admission 2" ticket

      const ChngedQunitity =
        parseFloat(generalAdmission2.quantity) -
        parseFloat(SelledTicket.Quantity);
      generalAdmission2.quantity = ChngedQunitity;

      const updatedTicket = await TicketModel.findByIdAndUpdate(
        TicketData._id,
        TicketData,
        { new: true }
      );

      console.log("updatedTicket--->", updatedTicket);
    }
  }

  const Responce = new SelledTicketModel({
    UserId: SelledTicket.UserId,
    TicketId: SelledTicket.TicketId,
    EventMediaId: BasicInfo[0].EventMediaId,
    eventTitle: BasicInfo[0].eventTitle,
    TicketName: SelledTicket.TicketName,
    TotalPrice: SelledTicket.TotalPrice,
    admissionDetails: SelledTicket.admissionDetails,
    Quantity: SelledTicket.Quantity,
    locationAddress: BasicInfo[0].locationAddress,
    longitude: BasicInfo[0].longitude,
    latitude: BasicInfo[0].latitude,
    QrcodeImage: QrcodeImage,
    StartDate: BasicInfo[0].startDate,
    startTime: BasicInfo[0].startTime,
    endDate: BasicInfo[0].endDate,
    endTime: BasicInfo[0].endTime,
  });
  const newSelledTicket = await Responce.save();
  console.log("newSelledTicket---->", newSelledTicket);
  res.send({
    newSelledTicket: newSelledTicket,
    selledTicktId: newSelledTicket._id,
  });

  // add Selled Ticket Id into The Ticket data base
  const UpdatedTicket = await TicketModel.findByIdAndUpdate(
    SelledTicket.TicketId,
    { $push: { SelledTicket: newSelledTicket._id } }
  );
  console.log("UpdatedTicket----->", UpdatedTicket);
};

// send notificatoin to whats app
module.exports.sendMessageToWhatsApp = async (req, res) => {};
// get selled ticket data base use qr code id
module.exports.getDataFromSelledTicket = async (req, res) => {
  const SelledTicketId = req.query.id;

  console.log("SelledTicketId----->", SelledTicketId);

  const SelledTicketData = await SelledTicketModel.findById(SelledTicketId);
  console.log("SelledTicketDat---->", SelledTicketData);
  const TodayDate = new Date();
  console.log("today----->", TodayDate);
  const formattedDate = new Date(TodayDate);
  formattedDate.setDate(formattedDate.getDate() + 1);
  const Today = formattedDate.toISOString().split("T")[0];
  console.log(Today); // Output: 2023-05-29

  const now = new Date();
  const hours = now.getHours(); // Get the current hour (0-23)
  const minutes = now.getMinutes();
  hours;
  console.log(
    `current Time : ${hours < 10 ? "0" : ""}${hours}:${
      minutes < 10 ? "0" : ""
    }${minutes}`
  );
  const CurrentTime = `${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;

  let TicketValidation = "Ticket Not Valid 1";
  if (SelledTicketData?.endDate) {
    if (Today > SelledTicketData.endDate) {
      console.log(" greater false ");
    } else if (Today === SelledTicketData.endDate) {
      console.log("same ");
      if (CurrentTime < SelledTicketData.endTime) {
        TicketValidation = "Ticket Valid 1";
      } else {
        TicketValidation = "Ticket Not Valid 2";
      }
    } else {
      console.log("lesser true");
      TicketValidation = "Ticket Valid 2";
    }
  } else {
    TicketValidation = "Ticket Not Valid 3";
  }

  console.log("TicketValidation---->", TicketValidation);
  if (SelledTicketData) {
    res.send({
      SelledTicketData: SelledTicketData,
      TicketValidation: TicketValidation,
    });
  } else {
    res.send({ TicketValidation: "Ticket Not Valid 4" });
  }
};

// get basicInfo by event media id
module.exports.getBasicInfoByEventMediaId = async (req, res) => {
  console.log("----------------------------------------------");
  const EventMediaId = req.query.id;
  try {
    const BasicInfoData = await BasicInfoModel.find({
      EventMediaId: EventMediaId,
    });
    console.log("BasicInfoData-->", BasicInfoData);
    res.json(BasicInfoData);
  } catch (err) {
    console.log(err);
  }
};

// delete admission
module.exports.deleteAdmission = async (req, res) => {
  try {
    const { index, ticketId } = req.body;
    console.log("index--->", index);
    console.log("ticketId--->", ticketId);

    TicketModel.findByIdAndUpdate(
      ticketId,
      { $pull: { Addmission: index } },
      { new: true },
      (error, updatedDocument) => {
        if (error) {
          console.error(error);
          // Handle the error
        } else {
          console.log(updatedDocument);
          // Handle the updated document
        }
      }
    );
  } catch (err) {
    console.error(err);
    // Return an error response to the client
    res
      .status(500)
      .json({ message: "An error occurred while deleting the element." });
  }
};

// add qr code image url in the data base
module.exports.addQrCodeUrl = async (req, res) => {
  const { imageUrl, Id } = req.body;
  console.log("imageUrl------>", imageUrl);
  console.log("imagIdeUrl------>", Id);
  const responce = SelledTicketModel.updateOne(
    { _id: Id },
    { $set: { QrcodeImage: imageUrl } },
    (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`${result.nModified} document updated`);
      }
    }
  );
};

// get selled ticket data by give user id

module.exports.GetSelledTicketData = async (req, res) => {
  const userId = req.query.id;
  console.log("id--->", userId);
  SelledTicketModel.find({ UserId: userId })
    .then((response) => {
      console.log("....................", response);
      res.send({ response });
    })
    .catch((error) => {
      console.error(error);
    });
};

// get banner to show

module.exports.getBannerShow = async (req, res) => {
  try {
    const response = await BannerModel.find({});
    const data = response[0].showBanner;
    console.log(data);
    res.send(data);
  } catch (error) {
    console.error(error);
    res.send({ error: "Failed to get banner data" });
  }
};

// update basic info with basic info id
module.exports.updateEventMedia = async (req, res) => {
  const BasicInfoId = req.query.id;
  console.log("BasicInfoId---->", BasicInfoId);
  const { url, summary, text } = req.body;
  console.log(url);
  console.log(summary);
  console.log(text);

  const updateData = {
    eventImgUrl: url,
    summary: summary,
    description: text,
  };

  try {
    const UpdateEventMedia = await EventMediaModel.findOneAndUpdate(
      { basicInfoId: BasicInfoId },
      updateData,
      { new: true }
    );
    console.log("UpdateEventMedia-->", UpdateEventMedia);
    res.send({ UpdateEventMedia });
  } catch (err) {
    console.log(err);
  }
};

// update admission

module.exports.UpdateAdmission = async (req, res) => {
  const BasicInfoId = req.query.id;
  console.log("BasicInfoId---->", BasicInfoId);
  const {
    name,
    quantity,
    price,
    CreateTikcketStartDate,
    CreateTikcketStartTime,
    CreateTikcketEndDate,
    CreateTikcketEndTime,
  } = req.body;

  const updateData = {
    name: name,
    quantity: quantity,
    price: price,
    startDate: CreateTikcketStartDate,
    startTime: CreateTikcketStartTime,
    endDate: CreateTikcketEndDate,
    endTime: CreateTikcketEndTime,
  };

  try {
    const UpdateEventMedia = await TicketModel.findOneAndUpdate(
      { basicInfoId: BasicInfoId },
      { Addmission: updateData },
      { new: true }
    );
    console.log("UpdateEventMedia-->", UpdateEventMedia);
    res.send({ UpdateEventMedia });
  } catch (err) {
    console.log(err);
  }
};
module.exports.AddTicketUserDetailsTempInUserDatabase = async (req, res) => {
  const { decryptedUserId, TicketUserDetails } = req.body;
  console.log("TicketUserDetails-------------->", TicketUserDetails);

  try {
    const newAdmissionDetails = new TemporaryModel({
      userID: decryptedUserId,
      admissionDetails: TicketUserDetails,
    });

    const savedAdmissionDetails = await newAdmissionDetails.save();

    console.log("savedAdmissionDetails------>", savedAdmissionDetails);
    res.send({ savedAdmissionDetails });
  } catch (error) {
    console.error("Failed to save admission details:", error);
    res.status(500).send({ error: "Failed to save admission details" });
  }
};

module.exports.getTemporayDataBase = async (req, res) => {
  const userId = req.query.id;
  console.log("userId----------query----------->", userId);

  try {
    const userDetailsArray = await TemporaryModel.find({ userID: userId });
    const userDetails = userDetailsArray[0];
    console.log("TemporaryModel ---userDetails->", userDetails);
    res.send({ userDetails });
  } catch (error) {
    console.error("Failed to retrieve user details:", error);
    res.status(500).send({ error: "Failed to retrieve user details" });
  }
};

module.exports.DeleteTemporaryDatabase = async (req, res) => {
  const id = req.query.id;
  console.log("DeleteTemporaryDatabase-----id-------->", id);
  if (id) {
    try {
      const deletedTemporaryDocuments = await TemporaryModel.deleteMany({});

      console.log("Deleted temporary database:", deletedTemporaryDocuments);
      // Handle the deletion result
    } catch (error) {
      console.log("Error occurred while deleting temporary database:", error);
      // Handle the error
    }
  } else {
    console.log("Invalid id provided");
    // Handle the case where id is missing or invalid
  }
};

module.exports.getBookedUserDetials = async (req, res) => {
  try {
    const EventMediaId = req.query.id;
    console.log("EventMediaId ---------->", EventMediaId);

    const getBookedUserDetails = await SelledTicketModel.find({
      EventMediaId: EventMediaId,
    });

    res.send({ getBookedUserDetails });
    console.log("getBookedUserDetails ---------->", getBookedUserDetails);
  } catch (error) {
    console.error("Error in getBookedUserDetails: ", error);
    res.status(500).send("Internal Server Error");
  }
};
module.exports.DeleteEvent = async (req, res) => {
  try {
    const BasicInfoID = req.query.id;

    const BasicInfoData = await BasicInfoModel.find({ _id: BasicInfoID });
    console.log("BasicInfo ---|--> ", BasicInfoData);

    await BasicInfoModel.findByIdAndDelete(BasicInfoID);
    await EventMediaModel.findByIdAndDelete(BasicInfoData.EventMediaId);
    await TicketModel.findByIdAndDelete(BasicInfoData.EventMediaId);

    res.send({ message: "Event deleted successfully" });
  } catch (error) {
    console.error(error);
    res.send({
      message: "Internal Server Error",
      BasicInfoModel,
      EventMediaModel,
      TicketModel,
    });
  }
};

module.exports.TESTregister = async (req, res) => {
  console.log("TSETregister----->called");
  try {
    const { username, password } = req.body;

    const existingUser = "SAJITH";
    if (existingUser) {
      console.log("Username already exists");
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    console.log("User registered successfully");

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.userLogOut = async (req, res) => {
  const id = req.body.userId;
  console.log("id------------------------------------>", id);
  const responce = await User.findByIdAndUpdate(
    id,
    { accessToken: null },
    { new: true }
  );
  console.log("responce------>", responce);
  res.send({ responce });
};

module.exports.getSelledTicketByUserId = async (req, res) => {
  try {
    const { id } = req.query;
    console.log("id---------->", id);

    const count = await EventMediaModel.countDocuments({ userId: id });

    const response = await SelledTicketModel.find({ UserId: id });
    console.log("response------>", response);

    res.send({ response, count });
  } catch (error) {
    console.error("Error fetching sold tickets by user ID:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports.getGraphEvents = async (req, res) => {
  for (let i = 0; i < EventMediaModel.length; i++) {}
};

module.exports.useUpdateDataOnRender = async (req, res) => {
  const pageName = req.body.pageName;
  console.log("pageName------>", pageName);
  const responce = await VisitorCountModel.find({ page: pageName }); // Set timeout to 20 seconds

  console.log("responce------>", responce);
  const currentDate = new Date();

  const options = { weekday: "long" };
  const weekday = currentDate.toLocaleDateString(undefined, options);
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  console.log(`Weekday: ${weekday}`);
  const index = weekdays.indexOf(weekday);
  console.log(index); // Output: 3


  const updateArrayField = async (pageName, index) => {
    try {
      const doc = await VisitorCountModel.findOne({ page: pageName });
  
      if (!doc) {
        // Handle the case when the document is not found
        console.log("Document not found");
        const VisitorCount = new VisitorCountModel({
          page: pageName,
          count: [0, 0, 0, 0, 0, 0, 0],
        });
        const saveVisitorCount = await VisitorCount.save(); 
        return;
      }
  
      const newCount = 1;
  
      // Check if the arrayField exists and initialize it as an empty array if it doesn't
      if (!doc.count) {
        doc.count = [0, 0, 0, 0, 0, 0, 0];
      }
  
      // Get the old count or initialize it as 0
      const oldCount = doc.count[index] || 0;
      console.log("oldCount----------->", oldCount);
  
      const updatedCount = oldCount + newCount; // Calculate the updated count
  
      doc.count[index] = updatedCount;
  
      await doc.save();
  
      console.log("Array field updated successfully");
      return;
    } catch (error) {
      console.error("Failed to update array field:", error);
    }
  };
  


 
  // Usage
  updateArrayField(pageName, index); //

};

module.exports.TESTlogin = async (req, res) => {
  console.log("called ----------->");
  const email = "test@gmail.com";
  const password = "1234";
  try {
    // Validate user credentials (you can use a database to fetch user details)
    const user = {
      _id: 12344,
      name: "Sajith",
      password: "123456dfdsf",
    };
    // if (!user || !bcrypt.compareSync(password, user.password)) {
    //   return res.status(401).json({ message: "Invalid credentials" });
    // }

    // Generate access and refresh tokens
    const accessToken = jwt.sign(
      { userId: "1223" },
      "your-access-token-secret",
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN,
      }
    );

    const refreshToken = jwt.sign(
      { userId: "1223" },
      "your-refresh-token-secret",
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRESIN,
      }
    );

    // Send tokens to the front-end
    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports.TESTrefreshToken = (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    console.log("Refresh token not found");
    return res.status(401).json({ error: "Refresh token not found" });
  }

  try {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = generateAccessToken(payload.user);

    res.json({ accessToken });
  } catch (error) {
    console.error(error);
    console.log(" 'Invalid refresh token' ");
    return res.status(401).json({ error: "Invalid refresh token" });
  }
};

module.exports.TESTprotected = async (req, res) => {
  {
    console.log("  'Protected route accessed successfully' ");
    res.json({ message: "Protected route accessed successfully" });
  }
};

module.exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  try {
    // Verify the refresh token and extract the user ID
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // Generate a new access token
    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN,
      }
    );
    console.log("accessToken------->", accessToken);
    // Send the new access token in the response
    res.json({ accessToken });
  } catch (error) {
    console.error("------*****", error);
    res.status(500).json({ message: "Failed to refresh access token" });
  }
};
