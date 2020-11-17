import React from 'react';
import { Field, ErrorMessage } from 'Formik';
import TextError from './TextError';

function RadioButtons(props) {
	const { label, name, options, ...rest } = props;
	return (
		<div className='form-control'>
			<label>{label}</label>
			<Field name={name} {...rest}>
				{({ field }) => {
					return options.map(option => {
						return;
					});
				}}
			</Field>
		</div>
	);
}

export default RadioButtons;
