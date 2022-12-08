import React from "react";
import styles from "./NoteCard.module.scss";
import more from "assets/dots.svg";
import quote from "assets/quote.svg";
import note from "assets/note.svg";
import noteQuote from "assets/note_quote.svg";
import likeIcon from "assets/like.svg";
import dislikeIcon from "assets/dislike.svg";
import privateIcon from "assets/private_icon_small.svg";
import buddyIcon from "assets/buddy_icon_small.svg";



const NoteCard = ({page, type, quoteText, noteText, likes, dislikes, access, replies, username}) => {

    const iconsType = {
        "quote": quote,
        "note": note,
        "quote note":noteQuote
    }

    const accessType = {
        "public": <div className={styles.likes}>
            <div>
                <img src= {likeIcon} alt="Like icon" />
                <p>{likes}</p>
            </div>
            <div>
                <img src= {dislikeIcon} alt="Like icon" />
                <p>{dislikes}</p>
            </div>
        </div>,
        "private": <div className={styles.access}>
            <div className={styles.accessIcon}>
                <img src={privateIcon} alt="Private icon" />
            </div>
            <p>Private</p>
        </div>,
        "buddy read": <div className={styles.access}>
            <div className={styles.accessIcon}>
                <img src={buddyIcon} alt="Buddy icon" />
            </div>
            <p>Buddy</p>
        </div>
    }

    return(
        <div className={styles.wrapper}>
            <div className={styles.top}>
                <div className={styles.cardTop}>
                    <div className={styles.pageInfo}>
                        <p>page:</p>
                        <p>{page !== null ? page : "all"}</p>
                    </div>
                    <div className={styles.dots}>
                        <img src={more} alt="More icon" />
                    </div>
                </div>
                <div className={styles.type}>
                    <img src={iconsType[type]} alt="Note type icon" />
                </div>
            </div>
            <div className={styles.contentContainer}>
            {type.includes("quote") && <div className={`${styles.quote} ${type === "quote note" ? styles.wrapTwoWord : ""} ${styles.content}`}>{quoteText}</div>}
            {type.includes("note") && <div className={`${styles.note} ${type === "quote note" ? styles.wrapTwoWord : ""} ${styles.content}`}>{noteText}</div>}
            </div>
            <div className={styles.bottom}>
                <div className={styles.accessAction}>
                    {accessType[access]}
                </div>
                <div className={styles.cardBottom}>
                    <div className={styles.username}>{username}</div>
                    <div className={styles.reply}>Reply <span>({replies})</span></div>
                </div>
            </div>
        </div>
    )
}

export default NoteCard;