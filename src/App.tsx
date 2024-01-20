import React from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator, Button } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
import DiaryCardList, { defaultDiaryProps } from './components/DiaryCardList';
import { Diary, LazyDiary } from './models';
Amplify.configure(awsExports);

export default function App() {
  const [diaries, setDiaries] = React.useState<Diary[]>([]);
  return (
    <Authenticator variation='default' >
      {({ signOut, user }) => (
        <main>
          <DiaryCardList getDiaries={defaultDiaryProps.getDiaries} onSelectDiary={defaultDiaryProps.onSelectDiary} onCreateDiary={defaultDiaryProps.onCreateDiary} />
        </main>
      )}
    </Authenticator>
  );
}