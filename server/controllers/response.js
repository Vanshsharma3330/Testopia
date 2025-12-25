const quizModel = require("../schema/quiz")
const resModel = require("../schema/response")
const resultModel = require("../schema/result")
const { userModel } = require("../schema/users")

const create_response = async (req, res) => {
    const { userId, quizId } = req.body

    try {
        const newRes = new resModel({
            createdAt: Date.now(),
            quizId: quizId,
            userId: userId,
        })

        await newRes.save()

        res.json({ success: "created this response", response: newRes })
    } catch (err) {
        console.log("error while creating response : ", err)
    }
}

const get_response = async (req, res) => {
    const { userId, quizId } = req.query

    try {
        const result = await resModel.findOne({
            userId: userId,
            quizId: quizId,
        })

        if (result) {
            res.json({ success: "found response", response: result })
        } else {
            res.json({ warning: "can't find quiz" })
        }
    } catch (err) {
        console.log("error finding response", err)
        res.json({ error: "Internal server error" })
    }
}

const update_response = async (req, res) => {
    const { responseId, updated } = req.body

    try {
        const result = await resModel.updateOne(
            { _id: responseId },
            { $set: { ...updated, endedAt: Date.now() } }
        )

        if (result.modifiedCount) {
            res.json({ success: "updated response successfully" })
        } else {
            res.json({ error: "an error occured while updating" })
        }
    } catch (err) {
        console.log("an error occured updating response ", err)
        res.json({ error: "Internal server error" })
    }
}

const generate_result = async (req, res) => {
    const { quizId, responseId } = req.body

    const quiz = await quizModel.findOne({ _id: quizId })
    const response = await resModel.findOne({ _id: responseId })
    const user = await userModel.findOne({ email: response.userId })

    console.log(quiz, response)

    if (!quiz || !response) {
        return res.json({ error: "Quiz or response does not exist" })
    }

    const firstname = user?.firstname || ""
    const lastname = user?.lastname || ""

    try {
        let totalPoints = 0
        let earnedPoints = 0
        let correctQuestions = 0

        const result = {
            quizId: quiz._id,
            title: quiz.title,
            responseId: response._id,
            userId: response.userId,
            firstname,
            lastname,
            queResponses: [],
            grades: {},
            timeSpent: Math.floor(
                (response.endedAt - response.createdAt) / 1000
            ),
            finishTime: response.endedAt,
        }

        quiz.questions.forEach((que) => {
            //response of question in responses
            const queRes = response.quizResponse.find(
                (ele) => ele.queId === que._id.toString()
            )

            if (!queRes) return

            totalPoints += que.points || 0
            let isCorrect = false

            switch (que.type) {
                // Multiple Choice (Single Answer)
                case 1: {
                    isCorrect = arraysEqual(que.correct, queRes.correct)
                    break
                }

                // Fill in the Blanks
                case 2: {
                    const userAnswers = queRes.correct.map((ans) =>
                        ans.text.toLowerCase()
                    )
                    const correctAnswers = que.correct.map((blank) =>
                        blank.text.toLowerCase()
                    )
                    isCorrect = arraysEqual(userAnswers, correctAnswers)
                    break
                }

                // True/False
                case 3: {
                    isCorrect = que.correct[0] === queRes.correct[0]
                    break
                }

                // Matching
                case 4: {
                    let matchCorrect = true
                    const userMatches = queRes.correct.reduce((acc, curr) => {
                        acc[curr.id] = curr.match
                        return acc
                    }, {})

                    que.correct.forEach((field) => {
                        if (userMatches[field.id] !== field.match) {
                            matchCorrect = false
                        }
                    })

                    isCorrect = matchCorrect
                    break
                }
            }

            if (isCorrect) {
                earnedPoints += que.points || 0
                correctQuestions++
            }

            result.queResponses.push({
                points: que.points,
                queType: que.type,
                queId: que._id.toString(),
                userResId: queRes._id,
                que: que.que,
                expectedAns: que.correct,
                userAns: queRes.correct,
                correct: isCorrect,
                choices: que.choices,
            })
        })

        result.grades = {
            totalQuestions: quiz.questions.length,
            correctQuestions,
            incorrectQuestions: quiz.questions.length - correctQuestions,
            totalPoints,
            earnedPoints,
            percentage: Math.round((earnedPoints / totalPoints) * 100) || 0,
        }

        const saveResult = new resultModel(result)

        await saveResult.save()

        return res.json({
            success: true,
            result,
        })
    } catch (err) {
        console.log(err)
        return res.json({
            success: false,
            error: "Error calculating results",
        })
    }
}

// Helper function to compare arrays
function arraysEqual(a, b) {
    if (!Array.isArray(a) || !Array.isArray(b)) return false
    if (a.length !== b.length) return false

    // Sort arrays to ensure order doesn't matter
    const sortedA = [...a].sort()
    const sortedB = [...b].sort()

    return sortedA.every((val, index) => val === sortedB[index])
}

const get_results = async (req, res) => {
    const { quizId } = req.body

    try {
        const results = await resultModel.find({ quizId: quizId })
        if (results) {
            res.json({ success: "results found", results })
        } else {
            res.json({ warning: "no results found" })
        }
    } catch (err) {
        console.log("error while getting results : ", err)
        res.json({ error: "Internal Server Error" })
    }
}

const get_result = async (req, res) => {
    const { quizId, responseId } = req.body

    try {
        const result = await resultModel.findOne({
            quizId: quizId,
            responseId: responseId,
        })
        if (result) {
            res.json({ success: "result found", result })
        } else {
            res.json({ warning: "no results found" })
        }
    } catch (err) {
        console.log("error while getting results : ", err)
        res.json({ error: "Internal Server Error" })
    }
}

module.exports = {
    create_response,
    get_response,
    update_response,
    get_results,
    generate_result,
    get_result,
}
