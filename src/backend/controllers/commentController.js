// import Fort from "../models/fort.js"; // Import the Fort model

// // Add a comment to a specific fort
// const createComment = async (req, res) => {
//     const { fortname } = req.params;
//     const { username, comment } = req.body;

//     try {
//         if (!fortname || !comment || !username) {
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         const fort = await Fort.findOne({ name: fortname });

//         if (!fort) {
//             return res.status(404).json({ message: "Fort not found" });
//         }

//         // Add the new comment
//         fort.comments.push({ username, comment });

//         await fort.save();

//         res.status(201).json({ message: "Comment added successfully", comments: fort.comments });
//     } catch (error) {
//         res.status(500).json({ message: "Failed to add comment", error });
//     }
// };

// // Get all comments for a specific fort
// const getAllComments = async (req, res) => {
//     const { fortname } = req.params;

//     try {
//         const fort = await Fort.findOne({ name: fortname });

//         if (!fort) {
//             return res.status(404).json({ message: "Fort not found" });
//         }

//         res.status(200).json(fort.comments);
//     } catch (error) {
//         res.status(500).json({ message: "Failed to fetch comments", error });
//     }
// };

// export { createComment, getAllComments };
