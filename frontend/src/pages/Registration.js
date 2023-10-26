import React from 'react'
import * as Yup from 'yup'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Registration() {
    const history = useNavigate()
    const initialValues = {
        username: "",
        password: "",
    }

    const validationSchema = Yup.object().shape({
        username: Yup.string().required().min(3).max(15),
        password: Yup.string().required().min(4).max(20)
  })

  const handlerSubmit = (data) => {
    axios.post("http://localhost:8000/auth", data).then(() => {
        console.log(data)
        history("/login")
    })
  }

    return (
        <div>
             <Formik initialValues={initialValues} onSubmit={handlerSubmit} validationSchema={validationSchema}>
          <Form className='formContainer'>

            <label htmlFor="username">Username</label>
            <ErrorMessage name='username' component="span"/>
            <Field id="inputCreatePost" name="username" placeholder="Input Here"/>

            <label htmlFor="password">Password</label>
            <ErrorMessage name='password' component="span"/>
            <Field id="inputCreatePost" type="password" name="password" placeholder="Input Here"/>

            <button type='submit'>Register</button>
          </Form>
        </Formik>
        </div>
    )
}

export default Registration