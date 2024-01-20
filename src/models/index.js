// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Diary } = initSchema(schema);

export {
  Diary
};