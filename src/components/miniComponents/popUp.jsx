import React from "react";
import { useApi } from "../auth/ApiProvider";
function PopUp({message, popup, setPopup}){
    const { api } = useApi();
    const DeleteAccount = async () => {
            await api.TokenRefresh();
            const result = await api.DeleteUser();
            console.log(result)
            if (result?.data?.message === "User deleted successfully.") {
                localStorage.clear();
                setPopup(false)
                alert("Account nuked. Goodbye 👋");
                setIsLogedIn(false)

            } else {
                setPopup(false)
                alert("Something went wrong: " + result);
            }
                }
    return(
        <div className={`z-100 fixed flex flex-col items-center justify-center gap-5 bg-gray-700/50 w-80 h-40 rounded-2xl border-white border-2 ${popup ? "" : "hidden"}`}>
            <h1 className="text-center text-white text-2xl">
                {message}
            </h1>
            <h1 onClick={DeleteAccount}
             className="text-white pd-10 h-14 w-30 flex items-center justify-center  text-xl shadow-2xl rounded-2xl border-white border-2 hover:scale-125 transform duration-300 cursor-pointer">
                I'm Sure!
            </h1>
        </div>
    )
}

export default PopUp;