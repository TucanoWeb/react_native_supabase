import { useContext } from "react"
import { userContextProps } from "../../context/userContext"
import { supabase } from "../../models/supabase/client"

const useAuth = () => {

    const [user, setUser] = useContext(userContextProps)

    const validate = (user, email, password) => {
        if (email === user.email && password === user.password) return true
        return false

    }

    const findOne = async (email) => {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
        if (error) throw error
        return data[0]
    }

    const auth = async (request) => {
        const { email, password } = request

        const user = await findOne(email)

        if (user) {
            const result = validate(user, email, password)
            if (result) {
                setUser(user)
                return true
            }
        }
        return false
    }

    const logout = async () => setUser(false)

    return {
        auth,
        logout
    }

}

export default useAuth