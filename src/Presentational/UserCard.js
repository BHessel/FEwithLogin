import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Usercard = (props) => {
    
    const { foundUser, user } = props

    const [ allFollows, setAllFollows ] = useState([])
    const [ currentFollow, setCurrentFollow ] = useState(null)
    
    const allFollowsURL = 'http://localhost:3000/follows'

    const followUser = (e) => {
        e.preventDefault()
        console.log('send the post to follow user')
  
        let follow = {
        follower_id: user.id,
        followed_user_id: foundUser[0].id
        }

        let requestPackage = {
        method: "POST",
        headers: {"Content-Type": "application/json", Accept: "application/json"},
        body: JSON.stringify({ follow })
        }
        
        fetch("http://localhost:3000/follows", requestPackage)
        .then(response => console.log('response from following a user', response))
        .then(alert("friend followed!"))
    }

    //getAllFollows
    useEffect(() => {
        const getAllFollows = () => {
            axios.get(allFollowsURL)
            .then((response) => {
            const listAllFollows = response.data
            setAllFollows(listAllFollows)
        })
        .catch(error => console.log('Error:', error))
    }
        return () => {
            getAllFollows()
        }
    }, []);
    
    //filters allFollows, sets currentFollow w/ the ID of the person you're looking to unfollow
    
    
    
    
    const currentFollowId = (e) => {
        e.preventDefault()
        allFollows.map(follow => {
            if (user.id === follow.follower_id && foundUser[0].id === follow.followed_user_id) {
                // return setCurrentFollow(follow.id)
                destroyRelationship(follow.id)
                alert(`You've unfollowed ${foundUser[0].email}`)
            } else {
                return console.log('not the person youre following')
            }
        })
    };
    
    // deletes Follow instance
    const destroyRelationship = (followID) => {
        axios.delete(`${allFollowsURL}/${followID}`, {withCredentials: true})
        .then(res => console.log(res))
        .catch(error => console.log(error))
    }
    
    const handleUnfollowClick = (e) => {
        e.preventDefault()
        currentFollowId()
    }
    


    return (
        <div className='user-card-main'>
            <h4>Found! {foundUser[0].email} </h4>

            <div className='user-card-buttons'>
                <button className='button-36' onClick={(e) => followUser(e)}>Follow User</button>
                {/* write an onClick function that initiates a follow and alerts user is followed */}
                <button className='button-36' onClick={(e) => currentFollowId(e)}>Unfollow</button>
                {/* write function to delete the follow, alerts unfollowed */}
                <button className='button-36'>
                    {/* <Link to={{
                        pathname: "/Matches",
                        state: { matchUser: foundUser }
                    }}> */}
                        See Matches
                    {/* </Link> */}
                </button>
            </div>
        </div>
    );
}

export default Usercard;
