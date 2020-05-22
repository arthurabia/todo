const projectFactory = (title = "New Project",icon) => {
    let isEmpty;
    possibleIconsCodepoints = [0x1F4D3,0x1F4BC,0x1F4C4,0x1F4DD]
    this.icon = String.fromCodePoint(possibleIconsCodepoints[Math.floor(Math.random() * Math.floor(possibleIconsCodepoints.length))])
    return {title,icon,isEmpty}
}

export {projectFactory}


