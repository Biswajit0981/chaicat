import Header from "./components/Header.tsx";
import {useEffect, useState} from "react";
import type {CatData} from "./lib/types/type.ts";
import CatBox from "./components/CatBox.tsx";

const App = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const [cat, setCat] = useState<CatData>();
    const [next, setNext] = useState<number>(1);
    useEffect(() => {
        async function fetchCat() {
            setIsLoading(true);
            try {
                const res = await fetch("https://api.freeapi.app/api/v1/public/cats/cat/random");
                const json = await res.json();

                setCat(json.data);
                setIsLoading(false);
            } catch (err) {
                console.log(err)
                const e = err as Error;
                setError(e.message)
            } finally {
                setIsLoading(false);
            }
        }

        fetchCat();
    }, [next]);


    return (
        <section className="plain">
            <Header/>
            <div className="cat-container">
                {
                    !isLoading && cat && <CatBox cat={cat} setNext={setNext}/>
                }
                {
                    isLoading && <p className="loader text-sc">i am catching your cat...🐈</p>
                }
                {
                    error && <p className="loader  text-red-500">{error}</p>
                }
            </div>
        </section>
    )
}
export default App
