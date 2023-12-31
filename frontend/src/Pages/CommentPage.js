import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCard from '../Components/CommentCard';
import CommentBox from '../Components/CommentBox';

const CommentPage = () => {
    const [comments, setComments] = useState([]);

    const fetchComments = () => {
        axios.get('http://localhost:8000/api/comments/')
            .then(response => {
                setComments(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the comments!', error);
            });
    };

    useEffect(() => {
        fetchComments();
    }, []); 

    return (
        <div>
            <CommentBox onCommentSubmit={fetchComments} /> 
            <p>Comments</p>
            {comments.map(comment => (
                <CommentCard 
                    key={comment.id}
                    id={comment.id}
                    author={comment.author}
                    text={comment.text}
                    date={comment.date}
                    likes={comment.likes}
                    image={comment.image}
                    replies={comment.replies} // Include replies
                    onCommentUpdate={fetchComments}
                    indentLevel={0} // Start with indentation level 0 for top-level comments
                />
            ))}
        </div>
    );
};

export default CommentPage;
