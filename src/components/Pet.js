import React, {useEffect} from 'react'

export default function Pet(props) {

    useEffect(() => {
        console.log(props)
    }, [])

    return (
        <div>
            <h1>Name: {props.pet.name}</h1>
            <p>Age: {props.pet.age}</p>
            <p>Sex: {props.pet.sex}</p>
            <p>Owners Email: {props.pet.email}</p>
        </div>
    )
}
