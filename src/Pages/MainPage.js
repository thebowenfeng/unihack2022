import {useContext} from "react";

import {CurrentPageContext} from "../Contexts/CurrentPageContext";
import NormalButton from "../Components/NormalButton";

export default function Main(){
    const [currentPage, setCurrentPage] = useContext(CurrentPageContext);

    return(
        <div style={{
            textAlign: "center"
        }}>
            <h1 className={"h1"}>Main Page</h1>
            <h2>Welcome to this page</h2>
            <NormalButton onClick={() => {
                setCurrentPage("login")
            }}>Login page</NormalButton>
            <NormalButton onClick={() => {
                setCurrentPage("caregiver")
            }}>Doctor</NormalButton>
            <NormalButton onClick={() => {
                setCurrentPage("chat")
            }}>Chat</NormalButton>
        </div>
    )
}
