// import axios from "axios"
// import React, { useState } from "react"
// import { API_ROOT } from "../../services/apiRoot"

// const videoURL = `${API_ROOT}/videos`
// const allUsersURL = `${API_ROOT}/users`
// const allFavsURL = `${API_ROOT}/favorites`

//fetch all videos
export const fetchVideos = async () => {
    try {
        const response = await fetch('https://netflix-movie-matcher.herokuapp.com/videos')
        const videoList = await response.json()
        // console.log('fetchVideos response', videoList)
        return videoList
    } catch (error) {
        console.log("error", error)
    }
}

//fetch all users
export const getUsers = async () => {
    try {
        const response = await fetch('https://netflix-movie-matcher.herokuapp.com/users')
        const userList = await response.json()
        return userList
    } catch (error) {
        console.log("error", error)
    }
}

//fetch all favorites
export const fetchFavorites = async () => {
    try {
        const response = await fetch('https://netflix-movie-matcher.herokuapp.com/favorites')
        const listAllFavorites = await response.json()
        return listAllFavorites
    } catch (error) {
        console.log("error", error)
    }
}
    
