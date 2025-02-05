import axios from 'axios'

const API_URL = 'http://localhost:3333/trainings'

export const fetchTrainings = async () => {
    try {
        const response = await axios.get(API_URL)
        return response.data
    } catch (err) {
        throw new Error(`Error fetching trainings: ${err.message}`)
    }
}

export const addTraining = async (userData) => {
    try {
        const response = await axios.post(API_URL, userData, {
            headers: { 'Content-Type': 'application/json' },
        })
        return response.data
    } catch (err) {
        throw new Error(`Error adding training: ${err.message}`)
    }
}

export const getTrainingsInfoById = async (trainingId) => {
    try {
        const response = await axios.get(`${API_URL}/${trainingId}`)
        return response.data
    } catch (err) {
        throw new Error(`Error fetching training info by id: ${err.message}`)
    }
}

export const getTrainingsByUserID = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}`)
        return response.data
    } catch (err) {
        throw new Error(`Error fetching user's trainings: ${err.message}`)
    }
}

export const updateTraining = async (trainingId, trainingData) => {
    try {
        const response = await axios.put(`${API_URL}/${trainingId}`, trainingData, {
            headers: { 'Content-Type': 'application/json' },
        })
        return response.data
    } catch (err) {
        throw new Error(`Error updating training: ${err.message}`)
    }
}

export const deleteTraining = async (trainingId) => {
    try {
        await axios.delete(`${API_URL}/${trainingId}`)
    } catch (err) {
        throw new Error(`Error deleting training: ${err.message}`)
    }
}

export const fetchUniqueTrainingTypes = async () => {
    try {
        const response = await axios.get(`${API_URL}/unique-types`)
        return response.data
    } catch (err) {
        throw new Error(`Error fetching unique training types: ${err.message}`)
    }
}
