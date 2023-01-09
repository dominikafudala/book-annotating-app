import React from "react";
import styles from "./AdminDashboard.module.scss";
import { useState } from "react";
import ContentWrapper from "components/ContentWrapper/ContentWrapper";
import Loading from "components/Loading/Loading";
import { useEffect } from "react";
import BookService from "services/BookService";
import BookSummaryCard from "components/BookSummaryCard/BookSummaryCard";
import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";

const AdminDashboard = () => {
    const [allBooks, setAllBooks] = useState(["hbdvsjhs"]);
    const [isLoading, setLoading] = useState(true);
    const [showModal, setModal] = useState(false);
    const [modalSubheading, setModalSubheading] = useState("");
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalTitle, setModalTitle] = useState("");

    const deleteNote = async (id) => {
        await BookService.delete(id).then(resp => {
            if(resp === -1 || resp === false){
                setModalTitle("Something went wrong");
                setModalSubheading("");
                setModalSuccess(false);
            }else{
                setModalTitle("Success");
                setModalSubheading("Book was deleted successfully from database");
                setModalSuccess(true);
            }
            setModal(true);
        })
    }

    const acceptNote = async (id) => {
        await BookService.accept(id).then(resp => {
            if(resp === -1 || resp === false){
                setModalTitle("Something went wrong");
                setModalSubheading("");
                setModalSuccess(false);
            }else{
                setModalTitle("Success");
                setModalSubheading("Book was reviewed successfully");
                setModalSuccess(true);
            }
            setModal(true);
        })
    }

    const loadBookDivs= (books) => {
        const modelArr = [];
        books.forEach(m => modelArr.push(<div className={styles.action} key ={m.bookModel.bookId}>
                <BookSummaryCard bookModel = {m} key = {"sum" + m.bookModel.bookId} full genreCount={2} admin/>
                <div className={styles.buttonContainer}>
                    <Button secondary onClickFn = {() => deleteNote(m.bookModel.bookId)} key = {"delete"}>Delete</Button>
                    <Button onClickFn = {() => acceptNote(m.bookModel.bookId)} key = {"accept"}>Accept</Button>
                </div>
            </div>));

        return modelArr;
    }

    useEffect(
        () => {
            const loadData = async () => {
                await BookService.getToReview().then(resp => {
                    setAllBooks(loadBookDivs(resp));
                    setLoading(false);
                })
            }

            loadData();
        }, []
    )

    if(isLoading) return <Loading/>
    return(
        <section className={styles.review}>
            <div className={styles.heading}>
                <p>New books added</p>
            </div>
        {showModal && <Modal 
            title={modalTitle} 
            subheading = {modalSubheading}
            button = {<Button  onClickFn = {() => {setModal(false); window.location.reload()}} key = {"close"}>Close</Button>}
            success = {modalSuccess}>
            </Modal>
            }
            <div className={styles.all}>
                {allBooks}
            </div>
        </section>
    )
}

export default AdminDashboard;