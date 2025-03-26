import { useState } from "react";


export default function Nav(){
    const [hamburgerOpen,setHamburgerOpen]=useState(false);
    const toggleHamburger=()=>{
        setHamburgerOpen(!hamburgerOpen)
    }
    return( 
        <div>
            <div className="navigation">
                <ul>
                    <li>
                        Home
                    </li>
                </ul>
            </div>
            <style jsx>{`
            .navigation{
            width:100%;
            height:50px;
            background-color:black;}
            
            .navigation ul{
            display:flec;
            flex-wrap:wrap;
            float:right;
            mrgin:20 0px;
            padding:0 25px;
            }
            
            .navigation ul li{
            4list_style_type:none;
            padding-right:10px;}`}</style>
        </div>
        
    )
}