import React from "react";
import { DEFAULT_DOG_DESCRIPTION, DEFAULT_DOG_ID, DEFAULT_DOG_NAME } from "./lib/constants";

export default function Card({images}) {

    const getTitle = (item) => {
        return item?.breeds[0]?.name || DEFAULT_DOG_NAME;
    }

    const getDescription = (item) => {
        return item?.breeds[0]?.temperament || DEFAULT_DOG_DESCRIPTION;
    }

    const getId = (item) => {
        return <div>Breed Id: {item?.breeds[0]?.id || DEFAULT_DOG_ID}</div>;
    }

    return(
        <div className="imageContent">
        {
            images.map((item) => {
            return(
                <div className="card" key={item.id}>
                <div className="imageContainer">
                    <img src={item.url} alt="dogs-images" className="image"/>
                </div>
                <div className="cardTitle">{getTitle(item)}</div>
                <div className="cardId">{getId(item)}</div>
                <div className="cardDescription">{getDescription(item)}</div>
                </div>
            )
            })
        }
        </div>
    )
}
