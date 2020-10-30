import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function YoutubeForm() {
	const initialValues = {
		name: '',
		email: '',
		channel: '',
		comments: '',
		address: '',
		social: {
			facebook: '',
			twitter: '',
		},
		phone: ['', ''],
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
		<>
			<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
				<Form>
					<div className='form-control'>
						<label htmlFor='name'>Name</label>
						<Field type='text' id='name' name='name' placeholder='Nombre de usuario' />
						<ErrorMessage name='name'>
							{errorMsg => {
								return <div className='error'>{errorMsg}</div>;
							}}
						</ErrorMessage>
					</div>
					<div className='form-control'>
						<label htmlFor='email'>Email</label>
						<Field type='email' id='email' name='email' />
						<ErrorMessage name='email' />
					</div>
					<div className='form-control'>
						<label htmlFor='channel'>Channel</label>
						<Field type='text' id='channel' name='channel' />
						<ErrorMessage name='channel' />
					</div>
					<div className='form-control'>
						<label htmlFor='comments'>Comments</label>
						<Field as='textarea' id='comments' name='comments' />
						<ErrorMessage name='comments' />
					</div>
					<div className='form-control'>
						<label htmlFor='address'>Address</label>
						<Field type='text' name='address'>
							{props => {
								const { field, form, meta } = props;
								// console.log('Render props:', props);
								return (
									<div>
										<input type='text' id='address' {...field} />
										{meta.touched && meta.error ? <div>{meta.error}</div> : null}
									</div>
								);
							}}
						</Field>
					</div>
					<div className='form-control'>
						<label htmlFor='facebook'>Facebook Profile</label>
						<Field type='text' id='facebook' name='social.facebook' />
						<ErrorMessage name='facebook' />
					</div>
					<div className='form-control'>
						<label htmlFor='twitter'>Twitter Profile</label>
						<Field type='text' id='twitter' name='social.twitter' />
						<ErrorMessage name='twitter' />
					</div>
					<div className='form-control'>
						<label htmlFor='primaryPh'>Teléfono Primario</label>
						<Field type='text' id='primaryPh' name='social.primaryPh' />
						<ErrorMessage name='primaryPh' />
					</div>
					<div className='form-control'>
						<label htmlFor='secondaryPh'>Teléfono Secundario</label>
						<Field type='text' id='secondaryPh' name='social.secondaryPh' />
						<ErrorMessage name='secondaryPh' />
					</div>

					<button type='submit'>Submit</button>
				</Form>
			</Formik>
		</>
	);
}

export default YoutubeForm;
