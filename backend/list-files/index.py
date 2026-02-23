import boto3
import os
import json

def handler(event: dict, context) -> dict:
    """Возвращает список файлов по всем бакетам S3"""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type'}, 'body': ''}

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
    )

    # Смотрим верхний уровень бакета files
    top = s3.list_objects_v2(Bucket='files', Delimiter='/')
    folders = [p['Prefix'] for p in top.get('CommonPrefixes', [])]
    top_files = [o['Key'] for o in top.get('Contents', [])]

    # Ищем во всех возможных папках
    prefixes_to_check = [
        'фильмы/', 'субтитры/', 'films/', 'subtitles/', 'movies/', 'video/', 'videos/',
        'Фильмы/', 'Субтитры/', 'Films/', 'Subtitles/', 'Movies/',
    ]
    found = {}
    for pref in prefixes_to_check:
        resp = s3.list_objects_v2(Bucket='files', Prefix=pref, MaxKeys=50)
        items = [o['Key'] for o in resp.get('Contents', [])]
        if items:
            found[pref] = items

    # Также смотрим все файлы без ограничения (первые 200)
    paginator = s3.get_paginator('list_objects_v2')
    pages = paginator.paginate(Bucket='files', PaginationConfig={'MaxItems': 200})
    all_keys = []
    for page in pages:
        for obj in page.get('Contents', []):
            all_keys.append(obj['Key'])

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'top_folders': folders,
            'top_files': top_files,
            'found_in_prefixes': found,
            'all_keys_sample': all_keys
        }, ensure_ascii=False)
    }