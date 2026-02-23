import json
import os
import uuid
import boto3
from botocore.config import Config


def handler(event: dict, context) -> dict:
    """Генерирует presigned URL для прямой загрузки файла в S3 из браузера."""
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

    body = json.loads(event.get('body') or '{}')
    filename = body.get('filename', 'file')
    folder = body.get('folder', 'videos')
    content_type = body.get('contentType', 'video/mp4')

    ext = filename.rsplit('.', 1)[-1].lower() if '.' in filename else 'mp4'
    key = f"{folder}/{uuid.uuid4().hex[:12]}.{ext}"

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
        config=Config(signature_version='s3v4')
    )

    presigned_url = s3.generate_presigned_url(
        'put_object',
        Params={
            'Bucket': 'files',
            'Key': key,
            'ContentType': content_type,
        },
        ExpiresIn=3600,
    )

    project_id = os.environ['AWS_ACCESS_KEY_ID']
    cdn_url = f"https://cdn.poehali.dev/projects/{project_id}/bucket/{key}"

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'uploadUrl': presigned_url,
            'cdnUrl': cdn_url,
            'key': key,
        })
    }
