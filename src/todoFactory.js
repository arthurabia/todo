const todoFactory = (title,description) => {
    const dateAdded = new Date();
    let isDone = false;
    return {dateAdded,title,description,isDone};
};

export {todoFactory}