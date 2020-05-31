const todoFactory = (dateAdded,title,description) => {
    let isDone = false;
    return {dateAdded,title,description,isDone}
}

export {todoFactory}