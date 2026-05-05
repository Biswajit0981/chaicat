import {FaCat, FaExternalLinkAlt, FaGlobeAmericas, FaHeart, FaWeightHanging} from "react-icons/fa";
import { IoIosRefreshCircle } from "react-icons/io";
import type {CatData} from "../lib/types/type.ts";
import type {Dispatch, SetStateAction} from "react";

interface CatBoxProps {
    cat: CatData;
    setNext: Dispatch<SetStateAction<number>>;
}

const scoreItems = [
    ["Affection", "affection_level"],
    ["Energy", "energy_level"],
    ["Intelligence", "intelligence"],
    ["Child friendly", "child_friendly"],
    ["Dog friendly", "dog_friendly"],
    ["Grooming", "grooming"],
] as const;

const CatBox = ({cat, setNext}: CatBoxProps) => {
    const tags = cat.temperament
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
        .slice(0, 8);

    const links = [
        ["Wikipedia", cat.wikipedia_url],
        ["CFA", cat.cfa_url],
        ["Vetstreet", cat.vetstreet_url],
        ["VCA", cat.vcahospitals_url],
    ].filter(([, url]) => Boolean(url));

    return (
        <article className="cat-box glass">
            <div className="cat-media">
                <img src={cat.image} alt={cat.name}/>
            </div>

            <div className="cat-content">
                <div className="cat-title-row">
                    <div>
                        <p className="cat-kicker">Breed profile</p>
                        <h2>{cat.name}</h2>
                    </div>

                    <span className="cat-origin">
                        <FaGlobeAmericas aria-hidden="true"/>
                        {cat.origin}
                    </span>
                </div>

                <p className="cat-description">{cat.description}</p>

                <div className="cat-quick-stats">
                    <span>
                        <FaHeart aria-hidden="true"/>
                        {cat.life_span} years
                    </span>
                    <span>
                        <FaWeightHanging aria-hidden="true"/>
                        {cat.weight.metric} kg
                    </span>
                    <span>
                        <FaCat aria-hidden="true"/>
                        {cat.hypoallergenic ? "Hypoallergenic" : "Not hypoallergenic"}
                    </span>
                </div>

                <div className="cat-tags">
                    {tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                    ))}
                </div>

                <div className="cat-scores">
                    {scoreItems.map(([label, key]) => {
                        const score = cat[key];

                        return (
                            <div className="cat-score" key={key}>
                                <div className="cat-score-label">
                                    <span>{label}</span>
                                    <span>{score}/5</span>
                                </div>
                                <div className="cat-score-track" aria-hidden="true">
                                    <span style={{width: `${score * 20}%`}}/>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {links.length > 0 && (
                    <div className="cat-links">
                        {links.map(([label, url]) => (
                            <a href={url} key={label} target="_blank" rel="noreferrer">
                                {label}
                                <FaExternalLinkAlt aria-hidden="true"/>
                            </a>
                        ))}
                    </div>
                )}
            </div>
            <button className="ref_btn" onClick={() => setNext((prev) => prev + 1)}>
                <IoIosRefreshCircle />
            </button>
        </article>
    )
}
export default CatBox
