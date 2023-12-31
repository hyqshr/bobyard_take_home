from django.db import models

class Comment(models.Model):
    author = models.CharField(max_length=100)
    text = models.TextField(blank=False, null=False)
    date = models.DateTimeField(auto_now_add=True)
    likes = models.IntegerField(default=0)
    image = models.URLField(blank=True, default="")
    parent = models.CharField(max_length=100, default="")
    
    def __str__(self):
        return self.author