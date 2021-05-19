import { useState, useEffect } from 'react'
import { db } from '../firebase'

const useNameFetch = (author) => {

    const [name, setName] = useState(null)
    const [pending, setPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const abortCont = new AbortController();
        db.collection('users').doc(author).get().then(snapShot => {
            const data = snapShot.data()
            setName(data.firstName + " " + data.lastName)
            setPending(false)
            setError(null)
        }).catch(err => {
            if (err.name === 'AbortError') {
                alert("Fetch aborted")
            } else {
                setPending(false)
                setError(err.message)
            }
        })
        return () => abortCont.abort()
    }, [author])
    return { name, pending, error}
}

export default useNameFetch