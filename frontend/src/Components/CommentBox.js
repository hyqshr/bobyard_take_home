import React, { useState } from 'react';
import axios from 'axios';
import './CommentBox.css';

const CommentBox = ({ onCommentSubmit }) => {
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/comments/', { text: comment, author: 'Admin' })
            .then(response => {
                setComment('');
                if (onCommentSubmit) {
                    onCommentSubmit(); // Call the callback function after successful submission
                }
            })
            .catch(error => {
                console.error('Error posting the comment', error);
            });
    };

    return (
        <form className="comment-box" onSubmit={handleSubmit}>
            <textarea 
                className="comment-input" 
                value={comment} 
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment..." 
            />
            <button type="submit" className="submit-btn">Submit</button>
        </form>
    );
};

export default CommentBox;
