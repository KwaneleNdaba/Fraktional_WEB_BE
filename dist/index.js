"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import express from 'express';
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = require("body-parser");
const user_1 = require("./routes/user");
const personnel_1 = require("./routes/personnel");
const project_1 = require("./routes/project");
const organisation_1 = require("./routes/organisation");
const staff_1 = require("./routes/staff");
const jobApplication_1 = require("./routes/jobApplication");
const notification_1 = require("./routes/notification");
const cors = require('cors');
const formData = require("express-form-data");
require('dotenv').config();
const os = require("os");
const app = (0, express_1.default)();
const options = {
    uploadDir: os.tmpdir(),
    autoClean: true
};
app.use((0, body_parser_1.json)());
app.use(function (req, res, next) {
    app.use(cors({ origin: 'http://localhost:3000' }));
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Request-Headers", "access-control-allow-credentials,access-control-allow-headers,access-control-allow-methods,access-control-allow-origin,authorization,content-type,access-control-allow-origin");
    res.header("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Headers,access-control-allow-origin, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});
app.use(user_1.userRouter, personnel_1.personnelRouter, project_1.projectRouter, organisation_1.organiwsationRouter, staff_1.staffRouter, notification_1.notificationRouter, jobApplication_1.jobApplicationRouter);
// const app = express()
const port = process.env.PORT || 8080;
app.get('/', (_req, res) => {
    return res.send('Viconet V1');
});
app.get('/ping', (_req, res) => {
    return res.send('pong 🏓');
});
mongoose_1.default.connect("mongodb+srv://prince:LTSNsskk113@cluster0.mrb5jxy.mongodb.net/");
app.listen(port, () => {
    return console.log(`Server is listening on ${port}`);
});
//# sourceMappingURL=index.js.map