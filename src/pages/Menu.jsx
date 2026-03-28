import App from "../App.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import {useEffect} from "react";

function Menu(){
    const navigate = useNavigate();

    // const items = [
    //     {id: 1, label: "1", description: "Shards of glass were found near the body, containing drops of wine."},
    //     {id: 2, label: "2", description: "A bloody knife was found hidden under the Persian rug."},
    //     {id: 3, label: "3", description: "A torn piece of a threatening letter with partial fingerprints."}
    // ];
    // const suspects = [
    //     {
    //         //bot -> model
    //         id: 1,
    //         name: "ploni almoni 1",
    //         messages: [
    //             { sender: "user", text: "Where were you on the night of the murder?" },
    //             { sender: "bot", text: "I was at home, sleeping." }
    //         ]
    //     },
    //     {
    //         id: 2,
    //         name: "ploni almoni 2",
    //         messages: [
    //             { sender: "user", text: "Did you know the victim?" },
    //             { sender: "bot", text: "We were business partners." }
    //         ]
    //     },
    //     {
    //         id: 3,
    //         name: "ploni almoni 3",
    //         messages: [
    //             { sender: "user", text: "Your fingerprints were found on the glass." },
    //             { sender: "bot", text: "I poured a drink earlier that evening." }
    //         ]
    //     },
    //     {
    //         id: 4,
    //         name: "ploni almoni 4",
    //         messages: [
    //             { sender: "user", text: "Why did you run when the police arrived?" },
    //             { sender: "bot", text: "I panicked." }
    //         ]
    //     }
    // ];
    // const res = {
    //     "game": {
    //         "brief": "asjkdlhaksdjh",
    //         "items" : items,
    //         "suspects": suspects
    //     }
    //
    // }

    const startGame = ()=>{
        const token = Cookies.get("token")
        axios.get("http://localhost:8080/start-game", {params:{"token":token, "topic":"IT"}})
                .then(response => {
                    console.log(response)
                    navigate('/game', { state: { response: response.data } });
                })
                .catch(error => {
                    console.error("Failed to start game", error);
                });
    }

    useEffect(() => {
        Cookies.set("token", "aviel-001")
        startGame();
    }, []);


}
export default Menu;