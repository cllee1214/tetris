const changeKeyValue = (data: Record<string, string>) => {
    const result = {} as Record<string, string>
    for(let key in data) {
        const value = data[key]
        result[value] = key
    }
    return result
}

export {
    changeKeyValue
}