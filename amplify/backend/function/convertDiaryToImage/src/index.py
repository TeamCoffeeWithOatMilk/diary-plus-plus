import json
import boto3
from aws_lambda_powertools.utilities import parameters

def handler(event, context):
  # sts = boto3.client('sts')
  # access_key = parameters.get_parameter('DPP_ACCESS_KEY')
  # secret_access_key = parameters.get_parameter('DPP_SECRET_ACCESS_KEY')
  bedrock_runtime = boto3.client(
    'bedrock-runtime',
    region_name='us-east-1',
  )
  bedrock = boto3.client(
    'bedrock',
    region_name='us-east-1', 
  )

  body = json.dumps({"prompt": f"You will be given a diary. Analyze the emotions of the author and what happened to him. Create a prompt to generate an image of cat resembling his feelings and experiences. Here is the diary: {event['diary']}"})
  modelId = 'meta.llama2-70b-chat-v1'
  accept = 'application/json'
  contentType = 'application/json'
  response = bedrock_runtime.invoke_model(
    modelId=modelId,
    body=body,
    accept=accept,
    contentType=contentType,
  ).get('body').read().decode('utf-8')
  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': json.dumps(response)
  }