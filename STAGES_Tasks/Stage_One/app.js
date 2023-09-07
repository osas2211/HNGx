require("dotenv").config()

const express = require("express")
const app = express()
const PORT = process.env.PORT

const missingParamErrorMessage = (missing_param) => {
  return {
    status_code: 400,
    error_type: "BAD_REQUEST",
    message: `Please provide your ${missing_param}`,
  }
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.get("/api", async (req, res) => {
  try {
    const { slack_name, track } = req.query
    const weekdays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ]

    const current_day = weekdays[new Date().getDay()]
    const current_time = new Date()
    const getUTCMinutes = current_time.getUTCMinutes()
    const accuracyValue = 2
    const newUTCMinutes = getUTCMinutes + accuracyValue
    const adjustedUTCTime = new Date()
    adjustedUTCTime.setUTCMinutes(newUTCMinutes)

    if (!slack_name && !track)
      return res.json(missingParamErrorMessage("SLACK NAME and TRACK"))
    else if (!slack_name)
      return res.json(missingParamErrorMessage("SLACK NAME"))
    else if (!track) return res.json(missingParamErrorMessage("TRACK"))
    else {
      return res.json({
        slack_name,
        current_day,
        utc_time: adjustedUTCTime,
        track,
        github_file_url:
          "https://github.com/osas2211/HNGx/blob/master/STAGES_Tasks/Stage_One/app.js",
        github_repo_url: "https://github.com/osas2211/HNGx",
        status_code: 200,
      })
    }
  } catch (error) {
    console.log(error)
  }
})

app.listen(PORT, () => {
  console.log("listening to port " + PORT)
})
