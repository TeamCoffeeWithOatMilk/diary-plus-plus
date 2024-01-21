import { Button } from "@aws-amplify/ui-react";
import { Diary } from "../models";
import DiaryCard from "./DiaryCard";
import { useEffect, useState } from "react";
import { Amplify } from "aws-amplify";
import { DataStore } from "@aws-amplify/datastore";
import { getCurrentUser } from "@aws-amplify/auth";
import { useNavigate } from "react-router-dom";

const styles = {
    container: {
    },
    list: {
        // align the items in a column
        display: 'flex',
        flexDirection: 'column' as 'column',
    },
    button: {
        margin: 20,
    }
};

interface DiaryCardListProps {
    getDiaries: () => Promise<Diary[]>;
    onCreateDiary: () => Promise<Diary>;
}

export const defaultDiaryProps = {
    getDiaries: async () => {
        const diaries = await DataStore.query(
            Diary,
            c => c,
            { sort: s => s.createdAt("DESCENDING") }
        );
        return diaries;
    },
    onCreateDiary: async () => {
        // get the current user
        const user = await getCurrentUser();
        const diary = await DataStore.save(
            new Diary({
                owner: user.userId,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            })
        );
        return diary;
    },
};

export default function DiaryCardList({ getDiaries, onCreateDiary }: DiaryCardListProps) {
    const [diaries, setDiaries] = useState<Diary[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDiaries = async () => {
            const diaries = await getDiaries();
            // sort the diaries by the created date
            diaries.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
            setDiaries(diaries);
        };
        fetchDiaries();
    }, []);

    return (
        <div style={styles.container}>
            <Button style={styles.button} onClick={async () => {
                const diary = await onCreateDiary();
                setDiaries([diary, ...diaries]);
                navigate(`/diary/${diary.id}`);
            }}>Create Diary</Button>
            <div style={styles.list}>
                {diaries.map((diary, index) => (
                    <DiaryCard
                        key={index}
                        diary={diary}
                        onClick={() => {
                            navigate(`/diary/${diary.id}`);
                        }}
                    />
                ))}
            </div>
        </div >
    );
}