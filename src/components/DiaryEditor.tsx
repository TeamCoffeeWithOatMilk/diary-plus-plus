import { TextField } from "@aws-amplify/ui-react";
import { Diary } from "../models";
import { useEffect, useState } from "react";
import { DataStore, isNonModelFieldType } from "aws-amplify/datastore";
import { useNavigate, useParams } from "react-router-dom";
import { MDXEditor, headingsPlugin, toolbarPlugin, UndoRedo, BoldItalicUnderlineToggles, BlockTypeSelect } from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faTrash, faImage } from "@fortawesome/free-solid-svg-icons";
import { fetchAuthSession } from "@aws-amplify/auth";

const styles = {
    // make the toolbar float to the top as a sticky toolbar
    container: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        height: '100vh',
    },
}

export const DiaryEditor = () => {
    const { id } = useParams();
    const diaryId = id ?? null;
    const [diary, setDiary] = useState<Diary | null>(null);
    const [title, setTitle] = useState<string | null>(null);
    const [content, setContent] = useState<string | null>('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDiary = async () => {
            const diary = await DataStore.query(Diary, diaryId!);
            if (!diary) {
                return;
            }
            console.log(`fetched diary: ${diaryId}`);
            console.log(diary);
            setDiary(diary);
            setTitle(diary.title ?? null);
            setContent(diary.content ?? null);
        };
        fetchDiary();
    }, [diaryId]);

    const updateDiary = async (newContent: string) => {
        if (!diary) {
            return;
        }
        setContent(newContent);
        await DataStore.save(
            Diary.copyOf(diary, updated => {
                updated.content = newContent;
            })
        );

    };

    const updateTitle = async (newTitle: string) => {
        if (!diary) {
            return;
        }
        setTitle(newTitle);
        await DataStore.save(
            Diary.copyOf(diary, updated => {
                updated.title = newTitle;
            })
        );
    }

    const deleteDiary = async () => {
        if (!diary) {
            return;
        }
        await DataStore.delete(diary);
        navigate('/');
    };

    const generateImage = async () => {
        const endpoint = 'https://32c409vuhe.execute-api.us-east-1.amazonaws.com/default/convertDiaryToImage-staging';
        const params = {
            diary: `# ${title}\n\n${content}`
        };
        // fetch current session token
        const session = await fetchAuthSession();
        const token = session.credentials?.sessionToken;
        console.log(token);
        var response;
        try {
            response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Origin': 'http://localhost:5174'
                },
                body: JSON.stringify(params),
            });

        } catch (error) {
            console.log('Error: ', error);
            if (error instanceof TypeError) {
                console.log('TypeError: ', error.message);
            }
            return;
        }
        const data = await response.json();
        console.log(data);
        const imageUrl = data.url;
        if (!diary) {
            return;
        }
        await DataStore.save(
            Diary.copyOf(diary, updated => {
                updated.imageUrl = imageUrl;
            })
        );
    }

    if (!diary) {
        return null;
    }

    return (
        <div className="container">
            <MDXEditor markdown={diary.content ?? ''} onChange={updateDiary} plugins={[
                headingsPlugin(),
                toolbarPlugin({
                    toolbarContents: () => (
                        <>
                            <FontAwesomeIcon icon={faChevronLeft} onClick={() => {
                                navigate('/');
                            }} style={{
                                marginLeft: 16,
                            }} />
                            <UndoRedo />
                            <BoldItalicUnderlineToggles />
                            <BlockTypeSelect />
                            <TextField
                                value={title ?? ''}
                                onChange={(val) => updateTitle(val.target.value)}
                                placeholder="Title"
                                label={undefined}
                                style={{ width: 500, border: 'none', fontWeight: 'bold', fontSize: '1.2em', marginTop: '-5px' }} />
                            <FontAwesomeIcon icon={faImage} style={{
                                // make the button float to the right
                                marginLeft: 'auto',
                                marginRight: 16,
                                marginTop: 0,
                                marginBottom: 0,
                            }} onClick={generateImage} />
                            <FontAwesomeIcon icon={faTrash} color="red" style={{
                                // make the button float to the right
                                marginLeft: 0,
                                marginRight: 16,
                                marginTop: 0,
                                marginBottom: 0,
                            }} onClick={deleteDiary} />
                        </>
                    )
                })
            ]} contentEditableClassName="editorCore" />
        </div>
    );
}
