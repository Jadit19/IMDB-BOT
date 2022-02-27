//! Contains helper functions

// To remove emojis
const checkArg = (c) => {
    const charCode = c.charCodeAt(0);

    if (charCode>=33 && charCode<=57)
        return true
    else if (charCode>=65 && charCode<=90)
        return true
    else if (charCode>=97 && charCode<=122)
        return true
    return false
}

// To remove accents
const removeAccents = (c) => {
    var modc = c.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    return modc
}

export const makeBetterArgs = (rawArgs) => {
    let args = []
    for (let i=0; i<rawArgs.length; i++){
        if (checkArg(rawArgs[i]))
            args.push(removeAccents(rawArgs[i]))
    }
    return args
}