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
        for item in data['comments']:
            Comment.objects.update_or_create(
                id=item['id'],
                defaults={
                    'author': item['author'],
                    'text': item['text'],
                    'date': parser.parse(item['date']),  # Use dateutil's parser
                    'likes': item['likes'],
                    'image': item['image'],
                    'parent': item['parent']
                }
            )

if __name__ == "__main__":
    json_path = './comments2.json'  # Update with the path to your JSON file
    load_comments(json_path)
