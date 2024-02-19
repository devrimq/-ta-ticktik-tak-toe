import React, { useState, useRef,useEffect  } from "react";
import './UcTas.css';
import circle_icon from '../assets/circle.png';
import cross_icon from '../assets/cross.png';

function computerMove(board) {
    // Rastgele bir boş kutu seçmek için boş kutuların indekslerini bul
    const emptyIndexes = [];
    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            emptyIndexes.push(i);
        }
    }

    // Rastgele bir boş kutu seç
    const randomIndex = Math.floor(Math.random() * emptyIndexes.length);
    const selectedBox = emptyIndexes[randomIndex];

    return selectedBox;
}


const UcTas = () => {
    const [count, setCount] = useState(0);
    const [lock, setLock] = useState(false);
    const [data, setData] = useState(Array(9).fill(""));
    const titleRef = useRef(null);

    useEffect(() => {
        // Her zaman sıra oyuncuda olduğunda bilgisayarın hamlesini yap
        if (count % 2 === 1 && !lock) {
            const computerIndex = computerMove(data);
            const newData = [...data];
            newData[computerIndex] = "o";
            setData(newData);
            setCount(count + 1);
            checkWin(newData);
        }
    }, [count, data, lock]);
    
    const toggle = (num) => {
        if (lock || data[num] !== "") {
            return;
        }

        const newData = [...data];
        newData[num] = count % 2 === 0 ? "x" : "o";
        setData(newData);
        setCount(count + 1);
        checkWin(newData);

        
    };

    const checkWin = (newData) => {
        // Satır kazanma durumları
        if (newData[0] === newData[1] && newData[1] === newData[2] && newData[2] !== "") {
            won(newData[0]);
        } else if (newData[3] === newData[4] && newData[4] === newData[5] && newData[5] !== "") {
            won(newData[3]);
        } else if (newData[6] === newData[7] && newData[7] === newData[8] && newData[8] !== "") {
            won(newData[6]);
        }
        // Sütun kazanma durumları
        else if (newData[0] === newData[3] && newData[3] === newData[6] && newData[6] !== "") {
            won(newData[0]);
        } else if (newData[1] === newData[4] && newData[4] === newData[7] && newData[7] !== "") {
            won(newData[1]);
        } else if (newData[2] === newData[5] && newData[5] === newData[8] && newData[8] !== "") {
            won(newData[2]);
        }
        // Çapraz kazanma durumları
        else if (newData[0] === newData[4] && newData[4] === newData[8] && newData[8] !== "") {
            won(newData[0]);
        } else if (newData[2] === newData[4] && newData[4] === newData[6] && newData[6] !== "") {
            won(newData[2]);
        }
    };
    

    const won = (winner) => {
        setLock(true);
        if (winner === "x") {
            titleRef.current.innerHTML = "Bravo! : <img src= '" + cross_icon + "'>";
        }
        if (winner === "o") {
            titleRef.current.innerHTML = "Bravo! : <img src='" + circle_icon + "'>";
        }
    };

    const reset = () => {        
        setLock(false);
        setData(Array(9).fill(""));
        titleRef.current.innerText = "React | Üç Taş Oyunu";
    };
    

    return (
        <div className="container">
            <h1 className="title" ref={titleRef}> <span>React |</span> Üç Taş Oyunu </h1>
            <div className="board">
                <div className="row">
                    {data.map((value, index) => (
                        <div key={index} className="boxes" onClick={() => toggle(index)}>
                            {value === "x" && <img src={cross_icon} alt="cross" />}
                            {value === "o" && <img src={circle_icon} alt="circle" />}
                        </div>
                    ))}
                </div>
            </div>
            <button className="reset" onClick={reset}>Yenile</button>
        </div>
    );
};

export default UcTas;
