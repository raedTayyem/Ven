import { ReviewPreview } from './ReviewPreview'

import React from 'react'

export function ReviewList(props) {

    const { reviews } = props;
    
    return (
        <div className="review-list">
            {reviews.sort((review1, review2) => review1.createdAt < review2.createdAt ? 1 : -1).map((review) => (<ReviewPreview review={review} key={review._id} />))}
        </div>
    )
}

