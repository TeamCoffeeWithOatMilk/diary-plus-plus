import json
import boto3
from aws_lambda_powertools.utilities import parameters
import base64
import hashlib

def handler(event, context):
  # Get prompt from diary
  bedrock_runtime = boto3.client(
    'bedrock-runtime',
    region_name='us-east-1',
  )
  print(event)
  body = json.dumps({
    "prompt": f"You will be given a diary. Analyze the emotions of the author and what happened to him. Create a prompt to generate an image of cat resembling his feelings and experiences. Do include a description of all the objects in the image, including in the foreground & background. Here is the diary: {event['diary']}",
    "temperature": 0.7,
    "top_p": 0.9,
  })
  modelId = 'meta.llama2-70b-chat-v1'
  accept = 'application/json'
  content_type = 'application/json'
  response = bedrock_runtime.invoke_model(
    modelId=modelId,
    body=body,
    accept=accept,
    contentType=content_type,
  ).get('body').read().decode('utf-8')

  # Generate image from prompt
  img_prompt = json.loads(response)['generation']
  if '\\nPrompt: ' in img_prompt:
    img_prompt = img_prompt.split('\\nPrompt: ')[1]
  style = event['style'] if 'style' in event else 'digital-art'
  seed = event['seed'] if 'seed' in event else 918008277
  steps = event['steps'] if 'steps' in event else 50
  height = event['height'] if 'height' in event else 512
  width = event['width'] if 'width' in event else 512
  weight = event['weight'] if 'weight' in event else 10
  img_body = json.dumps({
    "text_prompts": [
      {
        "text": img_prompt,
        "weight": weight
      }
    ],
    "height": height,
    "width": width,
    "seed": seed,
    "steps": steps,
    "style_preset": style,
  })
  image_model_id = 'stability.stable-diffusion-xl-v1'
  response = bedrock_runtime.invoke_model(
    modelId=image_model_id,
    body=img_body,
    accept=accept,
    contentType=content_type,
  ).get('body').read().decode('utf-8')

  # Upload image to S3 
  b64_img = json.loads(response)['artifacts'][0]['base64']
  s3 = boto3.resource('s3')
  bucket = s3.Bucket('dppimgs43215-staging')
  img_data = base64.b64decode(b64_img)
  hash_object = hashlib.md5(img_data)
  hex_dig = hash_object.hexdigest()
  bucket.put_object(
    Key=f'{hex_dig}.png',
    Body=img_data,
    ContentType='image/png',
  )
  img_url = f'https://dppimgs43215.s3.amazonaws.com/{hex_dig}.png'

  # Return prompt and image url
  return {
    'statusCode': 200,
    'headers': {
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    },
    'body': json.dumps({
      'prompt': img_prompt,
      'image': img_url,
    })
  }