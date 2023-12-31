# views.py
from rest_framework import viewsets
from django.utils import timezone
from ..models import Comment
from ..serializers import CommentSerializer

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_queryset(self):
        # Return only top-level comments
        return Comment.objects.filter(parent__isnull=True)