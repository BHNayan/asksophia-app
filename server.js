const express = require("express");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const PORT = process.env.PORT || 5000;
const cookieParser = require('cookie-parser');
const http = require('http');
const { Server } = require('socket.io');
const gptRouter = require("./routes/gptRoute");
const bodyParser = require('body-parser')
const cron = require('node-cron');

const connectDB = require("./config/db");
const cors = require('cors');
const app = express();
const rateLimit = require("express-rate-limit");
const { getUnpaidSubscriptions } = require("./controllers/subscriptionController");
const { updateSubscriptionEmail } = require("./controllers/emailController");

const apiLimiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minutes
	max: 200 // maximum of 200 requests per windowMs
});

connectDB();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200
}
app.set('trust proxy', 1);
app.use(cors(corsOptions));
app.use((req, res, next) => {
  // console.log(req.originalUrl)
  if (req.originalUrl === '/api/stripe/webhook') {
      bodyParser.raw({type: 'application/json'})(req, res, next);
  } else {
      next();
  }
});


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Create an HTTP server out of the Express app
const httpServer = http.createServer(app);
// Create a Socket.IO server and attach it to the HTTP server
const io = new Server(httpServer, {
  cors: {
    origin: process.env.DOMAIN,
  }
});
app.use("/", apiLimiter);
// Routes
app.use("/api", gptRouter(io));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/prompts", require("./routes/promptRoutes"));
app.use("/api/tools", require("./routes/toolsRoutes"));
app.use("/api/auth", require("./routes/oauthRoutes"));
app.use("/api/descriptions", require("./routes/toolDescriptionRoutes"));
app.use("/api/account", require("./routes/accountRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/tones", require("./routes/toneRoutes"));
app.use("/api/tags", require("./routes/tagsRoutes"));
app.use("/api/projects", require("./routes/projectRoutes"));
app.use("/api/prompt", require("./routes/multiRoutes"));
app.use("/api/plans", require("./routes/planRoutes"));
app.use("/api/folders", require("./routes/folderRoutes"));
app.use("/api/comments", require("./routes/commentRoutes"));
app.use("/api/subscribe", require("./routes/subRoutes"));
app.use("/api/paypal", require("./routes/paypalRoutes"));

cron.schedule('0 0 */3 * *', async function() {
  console.log("I'm running every three days");
  const unpaidSubs = await getUnpaidSubscriptions();
  updateSubscriptionEmail(unpaidSubs);
});

app.use(errorHandler);

// Have the httpServer listen instead of the express app
httpServer.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
