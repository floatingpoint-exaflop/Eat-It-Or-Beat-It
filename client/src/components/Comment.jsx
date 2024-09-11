import React, { useState, useEffect } from 'react';

export default function Comment({recipeId}) {
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);

    // Fetch reviews from MongoDB when the component mounts

    const fetchComments = async () => {
        try {
            const response = await fetch(`/api/comment/${recipeId}`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            }); 
            const data = await response.json(); // Parse the JSON from the response
            console.log(data)
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setComments(data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    // Handle the submission of the comment
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!comment) return; // Prevent submission if comment is empty

        // Send the comment to the backend
        try {
            await fetch(`/api/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    commentBody: comment,
                    recipe: recipeId
                 }), 
            });
            // Update the reviews state to include the new review
            setComments([...comments, { commentBody: comment }]);
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
                        <li key={index}>{r.commentBody}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}