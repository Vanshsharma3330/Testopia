const quizModel = require("../schema/quiz")
const { workspaceModel } = require("../schema/workspace")
const path = require("path")
const fs = require("fs")

const create_quiz = async (req, res) => {
    const { creator, workspace_id } = req.query

    console.log("create quiz body is : ", req.body)

    // Parse settings from form data if present
    let quiz_data = { ...req.body }
    if (req.body.settings) {
        try {
            quiz_data.settings = JSON.parse(req.body.settings)
        } catch (err) {
            console.log("Error parsing settings:", err)
            return res.json({ error: "Invalid settings format" })
        }
    }

    // Add thumbnail if file was uploaded
    if (req.file) {
        quiz_data.quizThumbnail = req.file.filename
    }

    // Handle category array
    if (req.body["category[]"]) {
        quiz_data.category = Array.isArray(req.body["category[]"])
            ? req.body["category[]"]
            : [req.body["category[]"]]
        delete quiz_data["category[]"]
    }

    const workspace = await workspaceModel.findOne({
        creator: creator,
        _id: workspace_id,
    })

    if (!workspace) {
        return res.json({ error: "workspace not found" })
    }

    try {
        const quiz = new quizModel({
            workspace: workspace_id,
            ...quiz_data,
            questions: [],
            created_at: new Date(),
            creator: creator,
        })

        await quiz.save()

        res.json({ success: "created quiz" })
    } catch (err) {
        console.log("error while creating quiz : " + err)
        res.json({ error: "Internal server error" })
    }
}

const get_quizzes = async (req, res) => {
    const { workspace, creator } = req.query
    // console.log(workspace);

    try {
        const result = await quizModel.find({
            workspace: workspace,
            creator: creator,
        })

        if (result) {
            res.json({ success: "found quizzes", quizzes: result })
        }
    } catch (err) {
        console.log(err)
        res.json({ error: "an error occured" })
    }
}

const get_quiz = async (req, res) => {
    const { id } = req.query

    try {
        const result = await quizModel.findOne({ _id: id })
        console.log(result)
        if (result) {
            res.json({ success: "found quiz", quiz: result })
        } else {
            res.status(404).json({ error: "Quiz not found" })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "an error occured" })
    }
}

const update_quiz = async (req, res) => {
    const { creator, workspace_id } = req.query
    const quizId = req.query.quizId
    console.log("update quiz body is : ", req.body.settings)

    // Parse settings from form data if present
    let quiz_data = { ...req.body }
    if (req.body.settings) {
        try {
            quiz_data.settings = JSON.parse(req.body.settings)
        } catch (err) {
            console.log("Error parsing settings:", err)
            return res.json({ error: "Invalid settings format" })
        }
    }

    // Add thumbnail if file was uploaded
    if (req.file) {
        // Delete old thumbnail if it exists
        const oldQuiz = await quizModel.findById(quizId)
        if (oldQuiz && oldQuiz.quizThumbnail) {
            const oldImagePath = path.join(
                __dirname,
                `../uploads/${creator}/${workspace_id}/${oldQuiz.quizThumbnail}`
            )
            fs.unlink(oldImagePath, (err) => {
                if (err) {
                    console.log("Error deleting old thumbnail:", err)
                }
            })
        }
        quiz_data.quizThumbnail = req.file.filename
    }

    // Handle category array
    if (req.body["category[]"]) {
        quiz_data.category = Array.isArray(req.body["category[]"])
            ? req.body["category[]"]
            : [req.body["category[]"]]
        delete quiz_data["category[]"]
    }

    try {
        const result = await quizModel.findByIdAndUpdate(
            quizId,
            { $set: quiz_data },
            { new: true }
        )

        if (result) {
            console.log("Quiz updated successfully")
            res.json({ success: "Quiz updated successfully", quiz: result })
        } else {
            console.log("Quiz not found")
            res.json({ error: "Quiz not found" })
        }
    } catch (err) {
        console.log("Error updating quiz:", err)
        res.json({ error: "Internal server error" })
    }
}

const update_ques = async (req, res) => {
    const { id, updated } = req.body

    try {
        const result = await quizModel.findByIdAndUpdate(
            id,
            { $set: { questions: updated.questions } },
            { new: true }
        )

        if (result) {
            res.json({
                success: "Questions updated successfully",
                quiz: result,
            })
        } else {
            res.json({ error: "Quiz not found" })
        }
    } catch (err) {
        console.log("Error updating questions:", err)
        res.json({ error: "Internal server error" })
    }
}

const delete_quiz = async (req, res) => {
    const { quizId } = req.body

    try {
        const quiz = await quizModel.findOne({ _id: quizId })
        if (quiz) {
            const { creator, workspace } = quiz
            const imagePath = path.join(
                __dirname,
                `../uploads/${creator}/${workspace}/${quiz.quizThumbnail}`
            )

            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.log(
                        "An error occurred while deleting the image",
                        err
                    )
                }
            })
        }

        const result = await quizModel.deleteOne({ _id: quizId })

        if (result.deletedCount) {
            res.json({ success: "deleted quiz successfully" })
        }
    } catch (err) {
        console.log("an error occured while deleting quiz", err)
        res.json({ error: "Internal server error" })
    }
}

const publish_quiz = async (req, res) => {
    const { quizId } = req.body

    try {
        const result = await quizModel.findByIdAndUpdate(
            quizId,
            { $set: { published: 1 } },
            { new: true }
        )

        if (result) {
            console.log("Quiz published successfully")
            res.json({ success: "Quiz published successfully", quiz: result })
        } else {
            console.log("Quiz not found")
            res.json({ error: "Quiz not found" })
        }
    } catch (err) {
        console.log("Error publishing quiz:", err)
        res.json({ error: "Internal server error" })
    }
}

module.exports = {
    create_quiz,
    get_quizzes,
    get_quiz,
    update_quiz,
    delete_quiz,
    update_ques,
    publish_quiz,
}
