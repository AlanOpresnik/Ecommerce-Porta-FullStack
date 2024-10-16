import React, { useState } from 'react'
import { useProducts } from '../../context/ProductsContext'
import { Button, Card, CardContent, CardHeader, Input } from '@mui/material'
import { CardBody, CardFooter } from '@material-tailwind/react'
import { Label } from '@mui/icons-material'
import { Textarea } from '@nextui-org/react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const NewFaqForm = () => {
    const { newFaq } = useProducts()
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const navigate = useNavigate()

    const token = localStorage.getItem('token');
  

    if (!token || token == "") {
        navigate('/')
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // Llamar a la función newFaq con las cadenas de texto de la pregunta y la respuesta
        newFaq(question, answer);
        // Limpia el formulario después de enviar
        setQuestion('');
        setAnswer('');
        toast.success('Nueva pregunta cargada con exito')
    };
    return (
        <form onSubmit={handleSubmit}>
            <h3 className='text-center mt-12 text-xl font-bold border-b pb-2'>Agregar nueva pregunta frecuente</h3>

        <Card className=" max-w-[580px] mx-auto px-2 mt-12">
            <div>
                <CardContent className="text-lg font-bold  text-black">Agregar nueva pregunta frecuente</CardContent>
                <CardContent className='mt-[-29px]'>Completa el formulario para agregar una nueva pregunta</CardContent>
            </div>
            <CardContent className="grid gap-4 pt-4">
                <div className="space-y-2">
                    <p className="text-sm font-bold" htmlFor="question">
                        Pregunta
                    </p>
                    <Input
                            className='w-full border p-1 rounded-lg px-2'
                            id="question"
                            placeholder="Escribe la pregunta"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            required
                        />
                </div>
                <div className="space-y-2">
                    <p className="text-sm font-bold" htmlFor="answer">
                        Respuesta
                    </p>
                    <Textarea
                            className="min-h-[100px]"
                            id="answer"
                            placeholder="Escribe la respuesta"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            required
                        />
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button sx={{ border: "1px solid gray" }} className="mr-auto" variant="outline">
                    Cancelar
                </Button>
                <Button sx={{
                    backgroundColor: "#18181B",
                    color: "#fff",
                    "&:hover": {
                        backgroundColor: "#686868"
                    }
                }} type="submit">Guardar</Button>
            </CardFooter>
        </Card>
        </form>
    )
}

export default NewFaqForm