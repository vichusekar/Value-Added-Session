import subjectModel from "../Models/subjectModel.js"

//create a subject
export const createSubject = async (req, res) => {
    try {
        let subject = await subjectModel.create(req.body);
        res.status(201).json({ message: "Subject Created Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error?.message });
    }
};

//get all subjects
export const getallSubjects = async (req, res) => {
    try {
        let subjects = await subjectModel.find();
        res.status(200).json({ message: "Subjects Fetched Successfully", subjects });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error?.message });
    }
};

//get particular subject
export const getSubject =  async (req, res) => {
    try {
        let subject = await subjectModel.findById(req.params.id);
        res.status(200).json({ message: "Studet Fetched Successfully", subject });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error?.message });
    }
};

export const updateSubject = async (req, res) => {
    try {
        let subject = await subjectModel.findById(req.params.id);
        if (subject) {
            await subjectModel.findByIdAndUpdate(req.params.id, req.body);
            res.status(200).json({ message: "Subject Updated Successfully" })
        } else {
            res.status(404).json({ message: "Subject not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error?.message });
    }
};

//delete subject by id
export const deleteSubject = async (req, res) => {
    try {
        let subject = await subjectModel.findOne({ id: req.params._id });
        if (subject) {
            await subjectModel.deleteOne({ id: req.params._id });

            res.status(200).json({ message: "Subject Deleted Successfully" });
        } else {
            res.status(404).json({ message: "Subject not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error?.message });
    }
};

