import { Card } from '@aws-amplify/ui-react'
import { Diary } from '../models/index'
import defaultImage from './default_img.jpg'

const styles = {
    card: {
        innerHeight: 80,
        margin: 10,
        display: 'inline-block'
    },
    innerCard: {
        display: 'flex',
    },
    image: {
        width: 80,
        height: 80,
    },
    cardContent: {
        display: 'flex',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 0,
        paddingTop: 0,
        marginBottom: 0,
        paddingBottom: 0,
    },
    textContent: {
        paddingLeft: 16,
        paddingRight: 16,
        marginTop: 0,
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0,


    },
    metaText: {
        fontSize: 12,
        marginTop: 0,
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0,
        color: '#222222',
    },
    captionText: {
        fontSize: 12,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        marginTop: 0,
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0,
        display: '-webkit-box',
        lineHeight: 1.5,
        maxHeight: 36,
        color: '#666666',
    }
}

type DiaryCardProps = {
    diary: Diary
    onClick: () => void
}

// display the date in the format of "Jan 1, 2021"
function formatDate(date: string) {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

export default function DiaryCard({ diary, onClick }: DiaryCardProps) {
    return (
        <Card style={styles.card} onClick={onClick} variation='elevated'>
            <div style={styles.innerCard}>
                {!!diary?.imageUrl ? <img src={diary.imageUrl} style={styles.image} /> : <img src={defaultImage} style={styles.image} />}
                <div style={styles.textContent}>
                    <h3 style={styles.heading}>{diary.title ?? 'Untitled Diary'}</h3>
                    <p style={styles.metaText}>{formatDate(diary.createdAt)}</p>
                    <p style={styles.captionText} >{diary.content}</p>
                </div>
            </div>
        </Card>
    )
}