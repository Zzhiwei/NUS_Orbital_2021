export const type = () => ([
    {id: 1, value: "Project"},
    {id: 2, value: "Competition"},
])

export const groupSize = () => ([
    {id: 1, value: 1},
    {id: 2, value: 2},
    {id: 3, value: 3},
    {id: 4, value: 4},
    {id: 5, value: 5},
])

export const location = () => ([
    {id: 1, value: "Online"},
    {id: 2, value: "In-Person"},
])

export const education = () => ([
    {id: 1, value: "Any"}, 
    {id: 2, value: "Primary"}, 
    {id: 3, value: "Secondary"}, 
    {id: 4, value: "Pre-University"}, 
    {id: 5, value: "Undergraduate"}, 
    {id: 6, value: "Professional"},
])

export const proficiency = () => ([
    {id: 1, value: "Any"}, 
    {id: 2, value: "Beginner"}, 
    {id: 3, value: "Intermediate"},
    {id: 4, value: "Advanced"},
])


//below here are selections for profile
export const day = () => {
    const res = []
    for (let i = 1; i < 32; i++) {
        res.push({id: i, value: i})
    }
    return res;
} 

export const month = () => {
    const mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const res = []
    for (let i = 0; i < 12; i++) {
        res.push({id: i+1, value: mL[i]})
    }
    return res;
} 

export const year = () => {
    const res = []
    let j = 1;
    for (let i = 2020; i > 1900; i--) {
        res.push({id: j++, value: i})
    }
    return res;
} 

export const eduYearStart = () => {
    const res = []
    let j = 1;
    for (let i = 1960; i < 2030; i++) {
        res.push({id: j++, value: i})
    }
    return res;
} 

export const eduYearEnd = () => {
    const res = []
    let j = 2;
    res.push({id: 1, value: 'current'})
    for (let i = 1960; i < 2030; i++) {
        res.push({id: j++, value: i})
    }
    return res;
}