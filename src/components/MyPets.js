import React, {useEffect, useState} from 'react'
import Firebase from '../firebase'
import Pet from "./Pet";

export default function MyPets() {
    const [data, setData] = useState([])
    let pets = []


    useEffect(() => {
        const petsRef = Firebase.database('https://puddle-pet-default-rtdb.europe-west1.firebasedatabase.app').ref('pets');
        petsRef.orderByValue().on('value', (snapshot) => {
            snapshot.forEach((data) => {
                pets.push(data.val())
            });
            setData(pets)
            return () => {
                setData([]);
            };
        });
    }, [])

    return (
        <div>
            <h1>My Pets</h1>
            {data.map(pet => (
                <Pet key={pet.name} pet={pet}/>
            ))}
        </div>
    )
}
