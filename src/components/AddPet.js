import React, {useRef, useState} from 'react'
import {Alert, Button, Card, Form} from "react-bootstrap";
import {Link, useHistory} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";

export default function AddPet() {

    const nameRef = useRef()
    const sexRef = useRef()
    const ageRef = useRef()
    const {currentUser, addPet} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await addPet(nameRef.current.value, sexRef.current.value, ageRef.current.value, currentUser.email)
            history.push('/')
        } catch {
            setError('Failed to add a pet')
        }
        setLoading(false)
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Add Pet</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" ref={nameRef} required/>
                        </Form.Group>
                        <Form.Group id="sex">
                            <Form.Label>Sex</Form.Label>
                            <Form.Control type="text" ref={sexRef} required/>
                        </Form.Group>
                        <Form.Group id="age">
                            <Form.Label>Age</Form.Label>
                            <Form.Control type="text" ref={ageRef} required/>
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-3" type="submit">Add Pet</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                <Link to="/">Back to dashboard</Link>
            </div>
        </>
    )
}
