import React, { useState, useEffect } from 'react';
// import axios from 'axios';

export default function Comment(props) {
    const [review, setReview] = useState('');
    const [reviews, setReviews] = useState([]);

    // Fetch reviews from MongoDB when the component mounts
    useEffect(() => {
        const fetchReviews = async () => {
            // const response = await axios.get('/api/reviews'); // Adjust the endpoint as needed
            setReviews(response.data);
        };
        fetchReviews();
    }, []);

    // Handle the submission of the review
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!review) return; // Prevent submission if review is empty

        // Send the review to the backend
        // await axios.post('/api/reviews', { text: review }); // Adjust the endpoint as needed

        // Update the reviews state to include the new review
        setReviews([...reviews, { text: review }]);
        setReview(''); // Clear the textarea
    };

    return (
        <div className="col-12 mt-4" id="commentContainer">
            <h4> Leave a note about this recipe! </h4>
            <p>Let us know if you made any modifications that went right or wrong. Let's discuss and make this recipe something you can't swipe left on</p>
            <textarea 
                value={review} 
                onChange={(e) => setReview(e.target.value)} 
                className='col-12' 
            />
            <button type='submit' className='mt-1 mb-4' onClick={handleSubmit}>
                Submit
            </button>

            <div>
                <h5>Reviews:</h5>
                <ul>
                    {reviews.map((r, index) => (
                        <li key={index}>{r.text}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}