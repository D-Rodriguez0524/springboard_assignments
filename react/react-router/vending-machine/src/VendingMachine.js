import React from "react";
import Navbar from "./Navbar";
import "./img.css"

const VendingMachine = () => {
    const imgUrl = "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Ffc01.deviantart.net%2Ffs70%2Fi%2F2013%2F049%2Fd%2F7%2Ftokyo_weird_vending_machine_by_fantasmiki-d5vehhh.jpg&f=1&nofb=1&ipt=a0a31bac0e28c7f52ce16a6b4bae1eb6eebfd5cf525d61289168b42ee62e2124&ipo=images";
    return (
        <div className="VendingMachine">

            <div>
                <Navbar />
                <img className="img" src={imgUrl} />
            </div>


        </div>
    )
}

export default VendingMachine;