import React, { useContext, useState } from 'react'

const AppContext = React.createContext()

export function useApp() {
    return useContext(AppContext)
}

export function AppProvider({ children }) {

    const [refresh, setRefresh] = useState(false)

    function reloadPage() {
        if (refresh) {
            setRefresh(false)
            setTimeout(() => {
                window.location.reload()
            }, 500)
        }
    }

    const values = {refresh, setRefresh, reloadPage}

    return (
        <AppContext.Provider value={values}>
            {children}
        </AppContext.Provider>
    )

}