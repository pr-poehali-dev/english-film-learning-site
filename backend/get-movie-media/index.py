import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    """Возвращает video_url и subtitle_url для всех фильмов или конкретного фильма."""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    params = event.get('queryStringParameters') or {}
    movie_id = params.get('movieId')

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    if movie_id:
        cur.execute(
            "SELECT movie_id, video_url, subtitle_url FROM movie_media WHERE movie_id = %s",
            (int(movie_id),)
        )
        row = cur.fetchone()
        cur.close()
        conn.close()
        if row:
            result = {'movieId': row[0], 'videoUrl': row[1], 'subtitleUrl': row[2]}
        else:
            result = {'movieId': int(movie_id), 'videoUrl': None, 'subtitleUrl': None}
    else:
        cur.execute("SELECT movie_id, video_url, subtitle_url FROM movie_media")
        rows = cur.fetchall()
        cur.close()
        conn.close()
        result = {row[0]: {'videoUrl': row[1], 'subtitleUrl': row[2]} for row in rows}

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps(result)
    }
