# views.py
from rest_framework import viewsets
from django.utils import timezone
from ..models import Comment
from ..serializers import CommentSerializer

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all().order_by('-date')
    serializer_class = CommentSerializer
