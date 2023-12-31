import React, { useState } from 'react';
import axios from 'axios';
import { Edit, Trash } from 'react-feather'; // Importing icons
import './CommentCard.css';

const CommentCard = ({ id, author, text, date, likes, image, onCommentUpdate, replies = [], indentLevel = 0  }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(text);
    const indentStyle = { marginLeft: `${indentLevel * 20}px`, borderLeft: indentLevel > 0 ? '1px solid #ddd' : 'none', paddingLeft: '10px' };

    const handleSaveEdit = () => {
        if (editedText !== text) {
            axios.patch(`http://localhost:8000/api/comments/${id}/`, { text: editedText })
                .then(response => {
                    onCommentUpdate(); // Callback to refresh comments in the parent component
                })
                .catch(error => console.error('Error updating the comment', error));
        }
        setIsEditing(false); // Exit edit mode
    };

    const handleCancelEdit = () => {
        setEditedText(text); // Reset text to original
        setIsEditing(false); // Exit edit mode
    };

    const handleDelete = () => {
        axios.delete(`http://localhost:8000/api/comments/${id}/`)
            .then(response => {
                onCommentUpdate(); // Callback to refresh comments in the parent component
            })
            .catch(error => console.error('Error deleting the comment', error));
    };

    return (
        <div className="comment-card" style={indentStyle}>
            <div className="comment-header">
                <div className="comment-author">{author}</div>
                <div className="comment-actions">
                    {!isEditing && (
                        <span onClick={() => setIsEditing(true)}><Edit /></span>
                    )}
                    <span onClick={handleDelete}><Trash /></span>
                </div>
                <div className="comment-likes">{likes} Likes</div>
            </div>
            {isEditing ? (
                <div>
                    <textarea 
                        className="comment-edit-input" 
                        value={editedText} 
                        onChange={(e) => setEditedText(e.target.value)} 
                    />
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button>
                </div>
            ) : (
                <div className="comment-text">{text}</div>
            )}
            {image && (
                <div className="comment-image">
                    <img src={image} alt={`${author}'s image`} />
                </div>
            )}
            <div className="comment-date">{new Date(date).toLocaleDateString()}</div>
            {replies.map(reply => (
                <CommentCard 
                    key={reply.id}
                    id={reply.id}
                    author={reply.author}
                    text={reply.text}
                    date={reply.date}
                    likes={reply.likes}
                    image={reply.image}
                    replies={reply.replies}
                    onCommentUpdate={onCommentUpdate}
                    indentLevel={indentLevel + 1}
                />
            ))}
        </div>
    );
};

export default CommentCard;
