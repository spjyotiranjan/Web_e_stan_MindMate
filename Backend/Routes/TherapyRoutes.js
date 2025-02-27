const express = require("express");
const {getAllTherapySessions,getTherapySessionById,createTherapySession,updateTherapyContextController,getContextController, deleteTherapySession, getTherapySessionSummaryController, } = require("./../Controller/TherapyDataController")
const TherapyRoutes = express.Router();

TherapyRoutes.get("/",getAllTherapySessions)
TherapyRoutes.get("/:id",getTherapySessionById)
TherapyRoutes.post("/",createTherapySession)
TherapyRoutes.post("/context",getContextController)
TherapyRoutes.patch("/update-context/:id",updateTherapyContextController)
TherapyRoutes.delete("/:id",deleteTherapySession)
TherapyRoutes.get("/get-summary/:id",getTherapySessionSummaryController)


module.exports = TherapyRoutes
