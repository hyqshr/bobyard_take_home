# serializers.py
from rest_framework import serializers
from ..models import Comment

class CommentSerializer(serializers.ModelSerializer):
    replies = serializers.SerializerMethodField()
    
    class Meta:
        model = Comment
        fields = ['id', 'author', 'text', 'date', 'likes', 'image', 'parent', 'replies']
        
    def get_replies(self, obj):
        # This will be handled in the viewset
        return []