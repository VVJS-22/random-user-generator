import { useState, useEffect } from 'react'

export const useFetch = (url, options) => {
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        setLoading(true)
        try {
            const res = await fetch(url, options)
            const data = await res.json()

            setResponse(data)
            setLoading(false)
        } catch (error) {
            setError(error)
            setLoading(false)
        }
    }

    useEffect(() => {

        fetchData()
        // eslint-disable-next-line
    }, [])

    return { response, error, loading, fetchData }
}

