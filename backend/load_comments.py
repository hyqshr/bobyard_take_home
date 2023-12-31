import os
import django
import json
from dateutil import parser

'''
Script to add comments.json to the database
'''

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")
django.setup()

from api.models import Comment  # Import your Comment model

def load_comments(json_path):
    with open(json_path, 'r') as file:
        data = json.load(file)

        # First pass: create/update comments without setting the parent
        for item in data['comments']:
            Comment.objects.update_or_create(
                id=item['id'],
                defaults={
                    'author': item['author'],
                    'text': item['text'],
                    'date': parser.parse(item['date']),
                    'likes': item['likes'],
                    'image': item['image']
                }
            )

        # Second pass: update the comments to set the parent
        for item in data['comments']:
            if item['parent']:
                try:
                    parent_comment = Comment.objects.get(id=item['parent'])
                    current_comment = Comment.objects.get(id=item['id'])
                    current_comment.parent = parent_comment
                    current_comment.save()
                except Comment.DoesNotExist:
                    print(f"Parent or current comment not found for ID {item['id']}")

if __name__ == "__main__":
    json_path = './comments2.json'  # Update with the path to your JSON file
    load_comments(json_path)
