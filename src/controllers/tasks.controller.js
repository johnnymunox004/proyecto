import Task from "../models/task.models.js";

//////////////////////////////////////////////////////
export const getTasks = async (req, res) => {
try {
  const tasks = await Task.find({
    user: req.user.id
  }).populate('user')
  res.json(tasks);
} catch (error) {
  return res.status(500).json({ message:" algo paso muy mal"})
}
};

/////////////////////////////////////////////////////////
export const createTasks = async (req, res) => {
try {
  const { title, description, date } = req.body;

  console.log(req.user);
  const newTask = new Task({
    title,
    description,
    date,
    user: req.user.id

  });
  const saveTask = await newTask.save();
  res.json(saveTask);
} catch (error) {
  return res.status(500).json({ message:" algo paso mal"})
}
};
/////////////////////////////////////////////////////////
export const getTask = async (req, res) => {
try {
  const task = await Task.findById(req.params.id).populate('user')
  if (!task) return res.status(404).json({ message: "tarea no encontrada" });
  res.json(task);
} catch (error) {
  return res.status(404).json({message:"tarea no encontradaaa"})
}
};

//////////////////////////////////////////////////////

export const deleteTasks = async (req, res) => {
try {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ message: "tarea no encontrada" });
   return res.sendStatus(204);

} catch (error) {
return res.status(404).json({ message: "tarea no encontrada" });
 

}
};

////////////////////////////////////////////
export const updatetasks = async (req, res) => {
try {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!task) return res.status(404).json({ message: "tarea no encontrada" });
  res.json(task);
} catch (error) {
return res.status(404).json({ message: "tarea no encontrada" });
}
};
