const {
    create_quiz,
    get_quizzes,
    get_quiz,
    update_quiz,
    delete_quiz,
    update_ques,
    publish_quiz,
} = require("../controllers/quiz")
const multer = require("multer")
const path = require("path")
const fs = require("fs")

const router = require("express").Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const { creator, workspace_id, quizId, queId } = req.query
        let uploadPath

        if (file.fieldname === "quizThumbnail") {
            uploadPath = path.join(
                __dirname,
                `../uploads/${creator}/${workspace_id}`
            )
        } else if (file.fieldname === "queImage") {
            uploadPath = path.join(
                __dirname,
                `../uploads/${creator}/${workspace_id}/${quizId}`
            )
        }

        fs.mkdir(uploadPath, { recursive: true }, (err) => {
            if (err) {
                return cb(err)
            }
            cb(null, uploadPath)
        })
    },
    filename: function (req, file, cb) {
        if (file.fieldname === "queImage") {
            const fileExtension = path.extname(file.originalname)
            cb(null, `${req.query.queId}${fileExtension}`)
        } else {
            cb(null, file.originalname)
        }
    },
})

const uploadImage = multer({ storage: storage })

router.post("/quiz/create", uploadImage.single("quizThumbnail"), create_quiz)
router.get("/quiz/get", get_quizzes)
router.get("/quiz/getQuiz", get_quiz)
router.post("/quiz/update", uploadImage.single("quizThumbnail"), update_quiz)
router.post("/quiz/delete", delete_quiz)
router.post("/quiz/publish", publish_quiz)
router.post("/quiz/ques/update", update_ques)

router.post(
    "/quiz/ques/uploadImage",
    uploadImage.single("queImage"),
    (req, res) => {
        if (!req.file) {
            return res
                .status(400)
                .json({ success: false, message: "No file uploaded" })
        }
        const fileUrl = `http://localhost:5000/uploads/${req.query.creator}/${req.query.workspace_id}/${req.query.quizId}/${req.file.filename}`
        res.status(200).json({ success: true, url: fileUrl })
    }
)

router.post("/quiz/ques/deleteImage", (req, res) => {
    const { creator, workspace_id, quizId, queId } = req.query
    const directory = path.join(
        __dirname,
        `../uploads/${creator}/${workspace_id}/${quizId}`
    )

    // Read directory to find the file with queId prefix
    fs.readdir(directory, (err, files) => {
        if (err) {
            console.error("Error reading directory:", err)
            return res
                .status(500)
                .json({ success: false, message: "Failed to delete image" })
        }

        // Find file that starts with queId
        const imageFile = files.find((file) => file.startsWith(queId))

        if (!imageFile) {
            return res
                .status(404)
                .json({ success: false, message: "Image not found" })
        }

        const imagePath = path.join(directory, imageFile)

        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error("An error occurred while deleting the image", err)
                return res
                    .status(500)
                    .json({ success: false, message: "Failed to delete image" })
            }
            res.status(200).json({
                success: true,
                message: "Image deleted successfully",
            })
        })
    })
})

module.exports = router
