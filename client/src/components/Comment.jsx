import React, { useState, useEffect } from 'react';

export default function Comment({recipeId}) {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    // Fetch reviews from MongoDB when the component mounts
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`/api/recipes/${recipeId}`); 
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json(); // Parse the JSON from the response
                setComments(data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
        fetchComments();
    }, []);

    // Handle the submission of the comment
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!comment) return; // Prevent submission if comment is empty

        // Send the comment to the backend
        try {
            await fetch(`/api/recipes/${recipeId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: comment }), 
            });
            // Update the reviews state to include the new review
            setComments([...comments, { text: comment }]);
            setComment(''); // Clear the textarea
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    return (
        <div className="col-12 mt-4" id="commentContainer">
            <h4> Leave a note about this recipe! </h4>
            <p>Let us know if you made any modifications that went right or wrong. Let's discuss and make this recipe something you can't swipe left on</p>
            <textarea 
                value={comment} 
                onChange={(e) => setComment(e.target.value)} 
                className='col-12' 
            />
            <button type='submit' className='mt-1 mb-4' onClick={handleSubmit}>
                Submit
            </button>

            <div>
                <h5>Comments:</h5>
                <ul>
                    {comments.map((r, index) => (
                        <li key={index}>{r.text}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}