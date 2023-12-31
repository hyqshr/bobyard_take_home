# serializers.py
from rest_framework import serializers
from ..models import Comment

class CommentSerializer(serializers.ModelSerializer):
    replies = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ['id', 'parent', 'author', 'text', 'date', 'likes', 'image', 'replies']

    def get_replies(self, obj):
        # Serialize only if there are replies
        if hasattr(obj, 'replies'):
            # Ensuring not to serialize top-level comments in replies
            replies = obj.replies.filter(parent=obj)
            return CommentSerializer(replies, many=True).data
        return []