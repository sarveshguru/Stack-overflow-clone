import React from 'react'

import LeftSideBar from '../../components/LeftSidebar/LeftSidebar'
import TagsList from './TagsList'
import { tagsList } from './tagFile'
import './Tags.css'

const Tags = () => {

    return (
        <div className='home-container-1'>
            <LeftSideBar />

            <div className="home-container-2">
                <h1 className='tags-h1'>Tags</h1>
                <p className="tags-p">A tag is a keyword or label that categorizes your question with other, similar questions.</p>
                <p className="tags-p">Using the right tags makes it easier for others to find and answer your question.</p>
                <div className="tags-list-container">
                    {
                        tagsList.map((tag, id) => (
                            <TagsList tag={tag} key={id} />
                        ))
                    }
                </div>
            </div>

        </div>
    )
}

export default Tags
