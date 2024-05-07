import { ReactElement } from 'react';
import styles from './blob.module.css';

export default function Blobs({ classVariable, type } : { classVariable?: string,  type: string } ) : ReactElement {
    const blobType = type ? type : 'v1';
    return (
        <div className={`${styles.blob} ${styles[blobType]} ${classVariable}`}></div>
    )
}