import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

function YoutubeForm() {
	const initialValues = {
		name: '',
		email: '',
		channel: '',
	};

	const onSubmit = values => {
		console.log('Form Data', values);
	};

	const validationSchema = Yup.object({
		name: Yup.string().required('Requerido'),
		email: Yup.string().email('Formato Inválido').required('Requerido'),
		channel: Yup.string().required('Requerido'),
	});

	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
			<h1>¡Bienvenidos a YoutubeForm2!</h1>
			<Form>
				<div className='form-control'>
					<label htmlFor='name'>Name</label>
					<Field type='text' id='name' name='name' />
					{formik.touched.name && formik.errors.name ? <div className='error'>{formik.errors.name}</div> : null}
				</div>
				<div className='form-control'>
					<label htmlFor='email'>Email</label>
					<Field type='email' id='email' name='email' />
					{formik.touched.email && formik.errors.email ? <div className='error'>{formik.errors.email}</div> : null}
				</div>
				<div className='form-control'>
					<label htmlFor='channel'>Channel</label>
					<Field type='text' id='channel' name='channel' />
					{formik.touched.channel && formik.errors.channel ? <div className='error'>{formik.errors.channel}</div> : null}
				</div>
				<button type='submit'>Submit</button>
			</Form>
		</Formik>
	);
}

export default YoutubeForm;
