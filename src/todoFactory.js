const todoFactory = (title,dueDate,priority = 1) => {
    let isInProject;
    let isDone = false;
    return {title,dueDate,priority,isInProject,isDone}
}

export {todoFactory}