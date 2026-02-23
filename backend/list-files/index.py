import boto3
import os
import json

def handler(event: dict, context) -> dict:
    """Возвращает список всех файлов в S3-хранилище проекта"""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type'}, 'body': ''}

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
    )

    prefix = event.get('queryStringParameters', {}) or {}
    prefix = prefix.get('prefix', '')

    paginator = s3.get_paginator('list_objects_v2')
    pages = paginator.paginate(Bucket='files', Prefix=prefix)

    files = []
    for page in pages:
        for obj in page.get('Contents', []):
            files.append({
                'key': obj['Key'],
                'size': obj['Size'],
                'last_modified': obj['LastModified'].isoformat()
            })

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'files': files, 'count': len(files)}, ensure_ascii=False)
    }
