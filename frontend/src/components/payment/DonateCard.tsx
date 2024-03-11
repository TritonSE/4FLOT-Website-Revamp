import React from "react";

export default function DonateCard({children}){
    return (
        <div className = "justify-content-center container grid w-[90%] py-8 md:w-[616px]">
            <div className = "card bg-base-100 shadow-xl">
                <figure>
                    <p>
                        image goes here
                    </p>
                </figure>
                <div className= "card-body">
                    {children}
                </div>
            </div>
        </div>
    )
}