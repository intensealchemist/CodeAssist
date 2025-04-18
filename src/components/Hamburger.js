export default function Hamburger(){
    return(        
    <div>
            <div className="hamburger">
            <div className="burger burger1"/>
            <div className="burger burger2"/>
            <div className="burger burger3"/>
            </div>

            <style jsx>{`
            .hamburger{
            width:2rem;
            height: 2rem;
            display:flex;
            justify-content:space-around;
            flex-flow:column nowrap;
            z-index:10;
            position:relative;
            
            .burger{
            position: relative;
            display:flex;
            bottom:175px;
            width:2rem;
            height:0.25rem;
            border-radius:10px;
            background-color:cyan;
            color:cyan;
            transform-origin:1px;
            transition: all 0.3s linear;}

            `}</style>
            </div>
    );
    };
