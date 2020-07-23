import api from '../config/api'

//update user info
export async function updateUser(user) {
    const response = await api.put(`/users/${user._id}`, user)
    return response.data
}

//delete user info
export async function deleteUser(id) {
    const response = await api.delete(`/users/${id}`)
    return response.data
}