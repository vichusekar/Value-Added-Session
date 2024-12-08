import markModel from "../Models/markModel.js"


export const createMark = ('/mark', async (req, res) => {
    try {
        let marks = await markModel.create(req.body);
        marks.save();
        res.status(201).json({ message: "Marks Created Successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error?.message });
    }
});

export const getallMarks = async (req, res) => {
    try {
        let marks = await markModel.find().populate("student", "name").populate("subject", "name");
        res.status(200).json({ message: "Marks Fetched Successfully", marks });
    } catch (error) {
        // console.log(error)
        res.status(500).json({ message: "Internal Server Error", error: error?.message });
    }
};



