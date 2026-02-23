import json
import os
import base64
import uuid
import psycopg2
import boto3


def handler(event: dict, context) -> dict:
    """Сохраняет видео и субтитры фильма: загружает файлы в S3, записывает URL в БД."""
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
    project_id = os.environ['AWS_ACCESS_KEY_ID']

    body = json.loads(event.get('body') or '{}')
    movie_id = body.get('movieId')
    if not movie_id:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'movieId is required'})
        }

    video_url = None
    subtitle_url = None

    # Прямая ссылка на видео (приоритет над файлом)
    if body.get('videoUrl'):
        video_url = body['videoUrl']
    elif body.get('videoFile'):
        video_bytes = base64.b64decode(body['videoFile'])
        ext = body.get('videoFilename', 'video.mp4').rsplit('.', 1)[-1].lower()
        key = f"videos/movie_{movie_id}_{uuid.uuid4().hex[:8]}.{ext}"
        content_types = {'mp4': 'video/mp4', 'webm': 'video/webm', 'mov': 'video/quicktime'}
        s3.put_object(Bucket='files', Key=key, Body=video_bytes, ContentType=content_types.get(ext, 'video/mp4'))
        video_url = f"https://cdn.poehali.dev/projects/{project_id}/bucket/{key}"

    # Прямая ссылка на субтитры или загрузка файла
    if body.get('subtitleUrl'):
        subtitle_url = body['subtitleUrl']
    elif body.get('subtitleFile'):
        sub_bytes = base64.b64decode(body['subtitleFile'])
        ext = body.get('subtitleFilename', 'subs.srt').rsplit('.', 1)[-1].lower()
        key = f"subtitles/movie_{movie_id}_{uuid.uuid4().hex[:8]}.{ext}"
        content_types = {'srt': 'text/plain', 'vtt': 'text/vtt'}
        s3.put_object(Bucket='files', Key=key, Body=sub_bytes, ContentType=content_types.get(ext, 'text/plain'))
        subtitle_url = f"https://cdn.poehali.dev/projects/{project_id}/bucket/{key}"

    # Сохраняем в БД
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    if video_url and subtitle_url:
        cur.execute(
            "INSERT INTO movie_media (movie_id, video_url, subtitle_url, updated_at) VALUES (%s, %s, %s, NOW()) "
            "ON CONFLICT (movie_id) DO UPDATE SET video_url = EXCLUDED.video_url, subtitle_url = EXCLUDED.subtitle_url, updated_at = NOW()",
            (movie_id, video_url, subtitle_url)
        )
    elif video_url:
        cur.execute(
            "INSERT INTO movie_media (movie_id, video_url, updated_at) VALUES (%s, %s, NOW()) "
            "ON CONFLICT (movie_id) DO UPDATE SET video_url = EXCLUDED.video_url, updated_at = NOW()",
            (movie_id, video_url)
        )
    elif subtitle_url:
        cur.execute(
            "INSERT INTO movie_media (movie_id, subtitle_url, updated_at) VALUES (%s, %s, NOW()) "
            "ON CONFLICT (movie_id) DO UPDATE SET subtitle_url = EXCLUDED.subtitle_url, updated_at = NOW()",
            (movie_id, subtitle_url)
        )

    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'videoUrl': video_url, 'subtitleUrl': subtitle_url})
    }