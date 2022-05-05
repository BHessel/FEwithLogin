import React, { useState } from 'react';

const Videocard = (props) => {

    const {video} = props
    // console.log(video)

    return (
        <div className='card-container'>
            <div className='vid-card-img'>
                <img src={video.thumbnail} />
            </div>

            <div className='card-content'>
                <div className='vid-card-title-container'>
                    {video.title}
                </div>

                <div className='vid-card-buttons'>
                    <button className='vid-card-btn'>
                        Play in Full Size
                    </button>
                    <button className='vid-card-btn'>
                        Add to Favorites
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Videocard;
