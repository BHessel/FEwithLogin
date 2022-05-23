// import axios from "axios"
// import React, { useState } from "react"
import { API_ROOT } from "../../services/apiRoot"

const videoURL = `${API_ROOT}/videos`
const allUsersURL = `${API_ROOT}/users`
const allFavsURL = `${API_ROOT}/favorites`

//fetch all videos
export const fetchVideos = async () => {
    try {
        const response = await fetch(videoURL)
        const videoList = await response.json()
        return videoList
    } catch (error) {
        console.log("error", error)
    }
}

//fetch all users
export const getUsers = async () => {
    try {
        const response = await fetch(allUsersURL)
        const userList = await response.json()
        return userList
    } catch (error) {
        console.log("error", error)
    }
}

//fetch all favorites
export const fetchFavorites = async () => {
    try {
        const response = await fetch(allFavsURL)
        const listAllFavorites = await response.json()
        return listAllFavorites
    } catch (error) {
        console.log("error", error)
    }
}
    