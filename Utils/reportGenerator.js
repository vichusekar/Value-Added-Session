import markModel from "../Models/markModel.js";
import studentModel from "../Models/studentModel.js";


export const reportcardGenerator = async (req, res) => {
    try {
        let studentId = await studentModel.findOne({ id: req.params._id })
        let student = await studentModel.findById(studentId);
        if (student) {
            let marks = await markModel.find({ student: studentId }).populate("subject", "name");
            if (!marks.length) {
                res.status(404).json({ message: "Marks not found" });
            } else {
                let totalmarks = marks.reduce((acc, val) => acc + val.marks, 0);
                let pass = marks.every((mark) => mark.marks >= 50);
                res.status(200).json({
                    message: "Reports Generated Successfully",
                    student: {
                        id: student._id,
                        name: student.name,
                        rollNumber: student.rollNumber
                    },
                    subject: marks.map((mark) => ({
                        name: mark.subject.name,
                        marks: mark.marks
                    })),
                    totalmarks,
                    status: pass ? "PASS" : "FAIL",

                })
            }
        } else {
            res.status(404).json({ message: "Student not found" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error", error: error?.message });
    }

};