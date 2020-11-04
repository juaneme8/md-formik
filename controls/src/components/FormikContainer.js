import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from './FormikControl';

function FormikContainer() {
	const initialValues = { email: '' };
	const validationSchema = Yup.object({ email: Yup.string().email('Formato Inválido').required('Requerido') });
	const onSubmit = values => console.log('Form Data', values);
	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
			{formik => (
				<Form>
					<FormikControl control='input' type='email' label='Email' name='email' />

					<button type='submit'>Submit</button>
				</Form>
			)}
		</Formik>
	);
}

export default FormikContainer;
