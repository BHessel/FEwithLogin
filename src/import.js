// //URLs
// const videoURL = 'http://localhost:3000/videos'
// const userURL = 'http://localhost:3000/users/'
// const favoritesURL = 'http://localhost:3000/favorites'


// //fetch all videos
// export const fetchVideos = async () => {
//     try {
//         const response = await fetch('http://localhost:3000/videos')
//         const videoList = await response.json()
//         console.log('videolist', videoList)
//         return videoList
//     } catch (error) {
//         console.log("error", error)
//     }
// }


// //fetch all users
// export const getUsers = async () => {
//     try {
//         const response = await fetch(userURL)
//         const userList = await response.json()
//         return userList
//     } catch (error) {
//         console.log("error", error)
//     }
// }


// //fetch all favorites
// export const fetchFavorites = async () => {
//     try {
//         const response = await fetch(favoritesURL)
//         const listAllFavorites = await response.json()
//         return listAllFavorites
//     } catch (error) {
//         console.log("error", error)
//     }
// }