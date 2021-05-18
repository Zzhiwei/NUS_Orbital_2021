import { useState, useEffect } from 'react'
import { db } from '../firebase'

const usePostFetch = (id) => {

    const [data, setData] = useState(null)
    const [pending, setPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const abortCont = new AbortController();
        db.collection('posts').doc(id).get().then(snapShot => {
            //console.log(snapShot.data())
            setData(snapShot.data())
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
    }, [id])
    return { data, pending, error}
}

export default usePostFetch