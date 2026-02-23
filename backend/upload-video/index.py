import json
import os
import base64
import uuid
import boto3


def handler(event: dict, context) -> dict:
    """Загружает видеофайл в S3 и возвращает CDN-ссылку."""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
    )

    body = json.loads(event.get('body') or '{}')
    file_data = body.get('file')
    filename = body.get('filename', 'video.mp4')
    movie_id = body.get('movieId', 'unknown')

    if not file_data:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'file is required'})
        }

    video_bytes = base64.b64decode(file_data)

    ext = filename.rsplit('.', 1)[-1].lower() if '.' in filename else 'mp4'
    key = f"videos/movie_{movie_id}_{uuid.uuid4().hex[:8]}.{ext}"

    content_type_map = {
        'mp4': 'video/mp4',
        'webm': 'video/webm',
        'mov': 'video/quicktime',
        'avi': 'video/x-msvideo',
    }
    content_type = content_type_map.get(ext, 'video/mp4')

    s3.put_object(
        Bucket='files',
        Key=key,
        Body=video_bytes,
        ContentType=content_type
    )

    project_id = os.environ['AWS_ACCESS_KEY_ID']
    cdn_url = f"https://cdn.poehali.dev/projects/{project_id}/bucket/{key}"

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'url': cdn_url, 'key': key})
    }
