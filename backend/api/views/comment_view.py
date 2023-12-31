# views.py
from rest_framework import viewsets
from django.utils import timezone
from ..models import Comment
from ..serializers import CommentSerializer
from rest_framework.response import Response

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all().order_by('-date')
    serializer_class = CommentSerializer

    def list(self, request, *args, **kwargs):
        # Fetch all comments and convert them into a list of dictionaries
        all_comments = list(self.queryset.values('id', 'parent', 'author', 'text', 'date', 'likes', 'image'))

        # Initialize a dictionary for comments with replies list
        comment_dict = {str(comment['id']): comment for comment in all_comments}
        for comment in comment_dict.values():
            comment['replies'] = []

        # Organize comments into a nested structure
        top_level_comments = []
        for comment in all_comments:
            parent_id = comment['parent']
            if parent_id:
                # Add this comment as a reply to its parent
                if parent_id in comment_dict:
                    comment_dict[parent_id]['replies'].append(comment)
            else:
                # Top-level comment
                top_level_comments.append(comment)

        # Return only the top-level comments
        return Response(top_level_comments)
