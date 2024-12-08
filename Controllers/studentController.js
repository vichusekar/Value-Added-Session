import studentModel from "../Models/studentModel.js";

//create student
export const createStudent = async (req, res) => {
    try {
        let student = await studentModel.create(req.body);
        res.status(201).json({ message: "Student Created Successfully" })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error?.message });
    }
};

//get all students
export const getallStudents = async (req, res) => {
    try {
        let students = await studentModel.find({});
        res.status(200).json({ message: "Students Fetched Successfully", students });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error?.message });
    }
};

//get the student by id
export const getStudent = async (req, res) => {
    try {
        let student = await studentModel.findById(req.params.id);
        if (student) {
            res.status(200).json({ message: "Student Fetched Successfully", student });
        } else {
            res.status(404).json({ message: "Student not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error?.message });
    }
};

//delete the student by id
export const deleteStudent = async (req, res) => {
    try {
        let student = await studentModel.deleteOne({ id: req.params._id });
        if (student) {
            res.status(200).json({ message: "Student Deleted Successfully" });
        } else {
            res.status(404).send({ message: "Student not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error?.message });
    }
};

//update the student by id
export const updateStudent = async (req, res) => {
    try {
        let student = await studentModel.findById(req.params.id);
        if (student) {
            await studentModel.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json({ message: "Student Updated Successfully" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error?.message });
    }
};
