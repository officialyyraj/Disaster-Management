const rateLimit = require("express-rate-limit");

const reportLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,

  handler: (req, res) => {
    res.status(429).json({
      success: false,
      error: "Rate limit exceeded",
      message: "You have submitted too many reports. Please wait 15 minutes before trying again."
    });
  }
});

module.exports = { reportLimiter };
