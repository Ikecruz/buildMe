// GENERAL

const createResume = () => {

    let resume = {}

    try {
        sessionStorage.setItem('resume', JSON.stringify(resume))
    } catch (error) {
        console.log(error)
    }
}

const getResume = () => {
    let resume = null

    try {
        resume = JSON.parse(sessionStorage.getItem('resume'))
    } catch (error) {
        console.log(error)
    }

    return resume
}

const updateResume = (resume) => {
    try {
        sessionStorage.setItem('resume', JSON.stringify(resume))
    } catch (error) {
        console.log(error)
    }
}

// GENERAL END

const checkProp = (name) => {
    let personal = null

    try {
        let create = JSON.parse(sessionStorage.getItem('resume'))
        personal = create?.[name]
    } catch (error) {
        console.log(error)
        return false
    }

    if (personal) return true
    else return false
}

const getProp = (name) => {
    try {
        let create = JSON.parse(sessionStorage.getItem('resume'))
        return create?.[name]
    } catch (error) {
        console.log(error)
        return {}
    }
}

// TEMPLATE

const setTemplate = (name) => {

    try {
        sessionStorage.setItem('template', name)
    } catch (error) {
        console.log(error)
    }

}

const getTemplate = () => {

    try {
        let temp = sessionStorage.getItem('template')
        return temp
    } catch (error) {
        console.log(error)
    }

}

// TEMPLATE END

export { 
    updateResume,
    createResume,
    getResume,
    checkProp, 
    getProp,
    setTemplate,
    getTemplate
}