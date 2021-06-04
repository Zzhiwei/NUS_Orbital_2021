export const type = () => ([
    {id: 1, value: "Business"},
    {id: 2, value: "IT & Software"},
    {id: 3, value: "Photography and Film"},
    {id: 4, value: "Music"},
    {id: 5, value: "Health & Fitness"},
    {id: 6, value: "Sciences"},
    {id: 7, value: "Others"}
])

export const category = () => ([
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
    {id: 1, value: "No Requirement"}, 
    {id: 3, value: "Secondary"}, 
    {id: 4, value: "Pre-University"}, 
    {id: 5, value: "Undergraduate"}, 
    {id: 6, value: "Other"},
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

export const expCategory = () => {
    return [
        {id: 1, value: 'Work'},
        {id: 1, value: 'Intership'},
        {id: 1, value: 'Personal Project'},
        {id: 1, value: 'Volunteering'},
        {id: 1, value: 'Others'}
    ]
}