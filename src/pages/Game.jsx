import React, {useEffect, useState} from "react";
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router-dom';





function Game() {
    console.log("hello")
    const location = useLocation();
    const response = location.state?.response;

    const brief = response.brief;
    const suspects = response.suspects;
    const items = response.items;


    const [selectedItemId, setSelectedItemId] = useState(items[0].id);
    const selectedItem = items.find(item => item.id === selectedItemId);

    const [selectedSuspectId, setSelectedSuspectId] = useState(suspects[0].id);
    const selectedSuspect = suspects.find(suspect => suspect.id === selectedSuspectId);
    const navigate = useNavigate();


    useEffect(() => {
        const token = Cookies.get("token");
        if (!token) {
            navigate("/")
        }

    }, [navigate]);





    return (
        <div style={styles.container}>

            <header style={styles.navbar}>
                NavBar
            </header>


            <div style={styles.contentWrapper}>

                <aside style={styles.leftColumn}>
                    <div>
                        {suspects.map(suspect => (
                            <div
                                key={suspect.id}
                                style={suspect.id === selectedSuspectId ? styles.suspectCardSelected : styles.suspectCard}
                                onClick={() => setSelectedSuspectId(suspect.id)}
                            >
                                <div style={styles.suspectImg}>

                                </div>
                                <div style={styles.suspectInfo}>
                                    {suspect.name}
                                </div>
                            </div>
                        ))}
                    </div>

                </aside>


                <main style={styles.middleColumn}>


                    <div style={styles.chatHeader}>
                        chat with {selectedSuspect ? selectedSuspect.name : ".."}
                    </div>
                    <div style={styles.chatBox } className="chat-scroll">
                        <style>{`
                            .chat-scroll::-webkit-scrollbar { width: 6px; }
                            .chat-scroll::-webkit-scrollbar-track { background: #181c22; }
                            .chat-scroll::-webkit-scrollbar-thumb { background: #373a3f; border-radius: 10px; }
                            .chat-scroll::-webkit-scrollbar-thumb:hover { background: #2c3a58;`}
                        </style>

                        {selectedSuspect && selectedSuspect.chatHistory.map((msg, index) => (
                            <div
                                key={index}
                                style={msg.sender === 'user' ? styles.userMessage : styles.botMessage}
                            >
                                {msg.text}
                            </div>
                        ))}

                    </div>
                    <div style={styles.chatInputBox}>
                        <input
                            type="text"
                            placeholder="bla bla bla..."
                            style={styles.chatInput}
                        />
                        <button style={styles.chatSendButton}>𖤂</button>

                    </div>

                </main>


                <aside style={styles.rightColumn}>
                    <div style={styles.itemsWindow}>
                        Items found
                        <div style={styles.ItemsList}>
                            {items.map(item => (
                                <button
                                    key={item.id}
                                    style={item.id === selectedItemId ? styles.ItemCardSelected : styles.ItemCard}
                                    onClick={() => setSelectedItemId(item.id)}>
                                    {item.name}
                                </button>
                            ))}
                        </div>
                        <div style={styles.ItemDescription} className="chat-scroll">
                            {selectedItem ? selectedItem.context : "No item selected"}
                        </div>
                    </div>
                    <div style={styles.logWindow}>
                        Log
                        {brief}
                    </div>
                </aside>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100vh',
        width: '100%',

        backgroundColor: '#12171d'
    },
    navbar: {
        height: '5rem',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        padding: '0 2rem',

        backgroundColor: '#10141a',
    },
    contentWrapper: {
        display: 'flex',
        flex: 1,
        minHeight: 'calc(100vh - 5rem)',
        maxHeight: 'calc(100vh - 5rem)',
        width: '100%',
        gap: '15px',
        padding: '20px 20px 20px 20px',
        boxSizing: 'border-box'
    },

    leftColumn: {
        flex: 2,
        borderRadius: '20px',

        backgroundColor: '#181c22',
    },
    suspectCard: {
        height: '70px',
        margin: '20px 20px 20px 20px',
        borderRadius: '20px',
        display: 'flex',
        gap: '5px',
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out',

        backgroundColor: '#1e2126',

    },
    suspectCardSelected: {
        height: '90px',
        margin: '20px',
        borderRadius: '30px',
        display: 'flex',
        gap: '5px',
        cursor: 'default',
        boxShadow: '1px 1px 15px 5px rgba(44, 58, 87, 0.7)',
        transition: 'all 0.3s ease-in-out',

        backgroundColor: '#1e2126',
    },
    suspectImg: {
        width: '60px',
        height: '60px',
        marginLeft: '10px',
        alignSelf: 'center',
        borderRadius: '20px',

        backgroundColor: '#181c22',
    },
    suspectInfo: {
        flex: 2,
        margin: '10px',
        color: 'white',
        alignContent: 'center',
    },

    middleColumn: {
        flex: 5,
        borderRadius: '20px',
        overflow: 'hidden',

        display: 'flex',
        flexDirection: 'column',

        backgroundColor: '#181c22',
    },
    chatHeader: {
        height: '60px',

        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',

        backgroundColor: '#1e2126',
        color: 'white',

        fontWeight: 'bold',
    },
    chatBox: {
        flex: 1,
        padding: '20px',
        overflowY: 'auto',

        display: 'flex',
        flexDirection: 'column',
        gap: '15px',

        color: 'white',
    },
    botMessage: {
        height: 'auto',
        minWidth: '50%',
        maxWidth: '60%',
        alignSelf: 'flex-start',
        borderRadius: '5px 30px 30px 30px',
        alignContent: 'center',
        padding: '10px 30px 10px 30px',
        wordBreak: 'break-word',

        backgroundColor: '#373a3f',
    },
    userMessage: {
        height: 'auto',
        minWidth: '50%',
        maxWidth: '60%',
        alignSelf: 'flex-end',
        borderRadius: '30px 5px 30px 30px',
        alignContent: 'center',
        padding: '10px 30px 10px 30px',
        wordBreak: 'break-word',

        backgroundColor: '#2c3a58',
        color: 'white'
    },
    chatInputBox: {
        height: '100px',
        display: 'flex',
        padding: '25px',
        backgroundColor: '#181c22',
        gap: '10px'
    },
    chatInput: {
        flex: 1,
        padding: '10px 15px',
        borderTopRightRadius: '10px',
        borderBottomRightRadius: '10px',
        borderTopLeftRadius: '40px',
        borderBottomLeftRadius: '40px',
        border: 'none',
        backgroundColor: '#1e2126',
        color: 'white',
        outline: 'none'
    },
    chatSendButton: {
        padding: '10px 20px',
        borderTopRightRadius: '40px',
        borderBottomRightRadius: '40px',
        borderTopLeftRadius: '10px',
        borderBottomLeftRadius: '10px',
        border: 'none',
        backgroundColor: '#2C3A58FF',
        color: 'white',
        cursor: 'pointer',
        fontWeight: 'bold'
    },

    rightColumn: {
        flex: 3,
        borderRadius: '20px',

        display: 'flex',
        flexDirection: 'column',
        gap: '15px',

        backgroundColor: '#12171d',
    },
    logWindow:{
        flex: 4,
        padding: '2rem',
        borderRadius: '20px',

        backgroundColor: '#181c22',
    },
    itemsWindow:{
        flex: 3,
        padding: '15px',
        borderRadius: '20px',

        display: 'flex',
        flexDirection: 'column',
        gap: '15px',


        backgroundColor: '#181c22',
    },
    ItemsList: {
        flex: 4,

        display: 'flex',
        gap: '15px'
    },
    ItemCard: {
        flex: 2,

        borderRadius: '20px',
        borderStyle: 'none',
        backgroundColor: '#1e2126',
        color: '#8a939b',
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out',
    },
    ItemCardSelected: {
        flex: 3,
        borderRadius: '30px',
        borderStyle: 'none',
        backgroundColor: '#1e2126',
        color: 'white',
        boxShadow: '1px 1px 15px 5px rgba(44, 58, 87, 0.7)',
        transition: 'all 0.3s ease-in-out',
        cursor: 'default',

    },
    ItemDescription: {
        flex: 3,
        borderRadius: '20px',
        padding: '15px',
        overflowY: 'auto',
        minHeight: 0,
        backgroundColor: '#12171d',
        color: 'white',
    },

};

export default Game;
