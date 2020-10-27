# Formik

> Basado en la [playlist](https://www.youtube.com/watch?v=a94FOvaBomQ&list=PLC3y8-rFHvwiPmFbtzEWjESkqBVDbdgGu&ab_channel=Codevolution) de Codevolution
> El código estará en la carpeta `md-formik`

Los formularios son vitales para las aplicaciones de negocios, es por eso que debemos crear una experiencia que guíe al usuario de manera eficiente durante el proceso.

Formik es una biblioteca que nos permite lidiar con formularios en React y React Native. Esto incluye manejar los datos del formulario, validarlos, entregar _feedback_ visual con mensajes de error y encargarnos del _submit_ del formulario. Si bien esto podríamos hacerlo con _plain_ React, formik nos permite hacerlo de manera simple, escalable y performante.

En primer lugar `npx create-react-app demo` luego hacemos la limpieza en `/src/App.js` y creamos la carpeta `/src/components`
Creamos el componente `YoutubeForm` que cuenta con tres `label` + `input` (name, email, channel) y un Submit `button`.

## Instalación:

`npm i formik`

Utilizamos el hook `useFormik`: `const formik = useFormik({})`
Le pasamos un objeto y nos retorna un objeto llamado `formik` con el cual podremos realizar:

1. Manejo del estado del formulario
2. Manejo de submit
3. Validación y mensajes de error

# Form State

El estado del formulario es un objeto con los valores de cada uno de los inputs.

1. En primer lugar a `useFormik()` le pasamos una propiedad llamada `initialValues`que se trata de un objeto con los valores iniciales de cada uno de los campos del formulario (las propiedades coinciden con el atributo `name` de cada uno de los `input`).

2. A continuación agregamos `onChange` y `value` a los `input` de la siguiente forma:

```jsx
<label htmlFor='name'>Name</label>
<input type='text' id='name' name='name' onChange={formik.handleChange} value={formik.values.name} />
```

Si hacemos `console.log(formik.values)` veremos que se trata de un objeto que tiene como propiedades a cada uno de los campos del formulario con sus valores actualizados a cada momento.
Es por eso que lo estoy luego vinculando al atributo **value** por tratarse de componentes controlados (normalmente lo asocio a variables de estado tanto en componentes de clase con `this.state.variable` o en componentes funcionales con la variable obtenida de usar `useState()`).

El código completo de `YoutubeForm` nos queda:

```jsx
import React from 'react';
import { useFormik } from 'formik';
function YoutubeForm() {
	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			channel: '',
		},
	});
	console.log(formik.values);
	return (
		<div>
			<form>
				<label htmlFor='name'>Name</label>
				<input type='text' id='name' name='name' onChange={formik.handleChange} value={formik.values.name} />
				<label htmlFor='email'>Email</label>
				<input type='email' id='email' name='email' onChange={formik.handleChange} value={formik.values.email} />
				<label htmlFor='channel'>Channel</label>
				<input type='text' id='channel' name='channel' onChange={formik.handleChange} value={formik.values.channel} />
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
}

export default YoutubeForm;
```

# Form Submission

1. En el `form` debemos especificar `onSubmit={formik.handleSubmit}`

2. Agregamos una nueva propiedad `onSubmit` en el objeto que le pasamos al hook `useFormik()`, se trata de un método que recibe automáticamente el estado del formulario como argumento y será ejecutado al hacer el submit.

```jsx
import React from 'react';
import { useFormik } from 'formik';
function YoutubeForm() {
	const formik = useFormik({
		initialValues: {
			name: '',
			email: '',
			channel: '',
		},
		onSubmit: values => {
			console.log('Form Data', values);
		},
	});

	return (
		<div>
			<form onSubmit={formik.handleSubmit}>
				<label htmlFor='name'>Name</label>
				<input type='text' id='name' name='name' onChange={formik.handleChange} value={formik.values.name} />
				<label htmlFor='email'>Email</label>
				<input type='email' id='email' name='email' onChange={formik.handleChange} value={formik.values.email} />
				<label htmlFor='channel'>Channel</label>
				<input type='text' id='channel' name='channel' onChange={formik.handleChange} value={formik.values.channel} />
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
}

export default YoutubeForm;
```

En este caso simplemente estamos imprimiendo el valor en pantalla pero en una aplicación real puede que hagamos un llamado a una API con los valores como _payload_.

# Form Validation

En cuanto a las reglas de validación para el formulario con el que estamos trabajando establecemos que todos los campos (`name`, `email`, `channel`) son **required** y que `email` debe tener un formato de e-mail válido.

Agregamos una nueva propiedad al objeto que le pasamos a `useFormik` llamada `validate`. Al igual que en el caso anterior se trata de una función que recibe automáticamente al objeto de valores como argumento.
Esta función debe retornar un objeto **errors** que para cada error tenga una propiedad con un string indicando cuál es el error detectado.
Esta función será ejecutada cada vez que cambiemos un valor en el input.

Para verificar que el email tenga un formato válido utilizo la siguiente `RegEx`:
`/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i`

```jsx
const formik = useFormik({
	initialValues: {
		name: '',
		email: '',
		channel: '',
	},
	onSubmit: values => {
		console.log('Form Data', values);
	},
	validate: values => {
		let errors = {};
		if (!values.name) {
			errors.name = 'Requerido';
		}
		if (!values.email) {
			errors.email = 'Requerido';
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
			errors.email = 'Formato inválido';
		}
		if (!values.channel) {
			errors.channel = 'Requerido';
		}

		return errors;
	},
});
```

Para mejorar la facilidad de lectura hacemos un _refactoring_

```jsx
const initialValues = {
	name: '',
	email: '',
	channel: '',
};

const onSubmit = values => {
	console.log('Form Data', values);
};

const validate = values => {
	let errors = {};
	if (!values.name) {
		errors.name = 'Requerido';
	}
	if (!values.email) {
		errors.email = 'Requerido';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Formato inválido';
	}
	if (!values.channel) {
		errors.channel = 'Requerido';
	}

	return errors;
};

const formik = useFormik({
	initialValues,
	onSubmit,
	validate,
});
```

## Displaying Errors

Así como cuando hicimos `console.log(formik.values)` vimos los valores de los campos actualizados, si hacemos `console.log(formik.errors)` podremos ver los errores de validación.
Cuando la página carga por primera vez es un objeto vacío y en la medida que vamos llenando uno de los campos el objeto errores deja de estar vacío y pasa a mostrar los errores encontrados.
Por lo tanto procesamos `formik.errors` mediante jsx usando el _ternary operator_ para mostrar cada uno de ellos sólo en caso de que exista:

```jsx
{
	formik.errors.name ? <div className='error'>{formik.errors.name}</div> : null;
}
```

Con la clase `.error` ponemos la letra del mensaje de error en color rojo.

A su vez por motivos de estilo envolvemos a `label`, `input` y la línea anterior en un `<div className="form-control>`

```jsx
import React from 'react';
import { useFormik } from 'formik';
function YoutubeForm() {
	const initialValues = {
		name: '',
		email: '',
		channel: '',
	};

	const onSubmit = values => {
		console.log('Form Data', values);
	};

	const validate = values => {
		let errors = {};
		if (!values.name) {
			errors.name = 'Requerido';
		}
		if (!values.email) {
			errors.email = 'Requerido';
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
			errors.email = 'Formato inválido';
		}
		if (!values.channel) {
			errors.channel = 'Requerido';
		}

		return errors;
	};

	const formik = useFormik({
		initialValues,
		onSubmit,
		validate,
	});

	return (
		<div>
			<form onSubmit={formik.handleSubmit}>
				<div className='form-control'>
					<label htmlFor='name'>Name</label>
					<input type='text' id='name' name='name' onChange={formik.handleChange} value={formik.values.name} />
					{formik.errors.name ? <div className='error'>{formik.errors.name}</div> : null}
				</div>
				<div className='form-control'>
					<label htmlFor='email'>Email</label>
					<input type='email' id='email' name='email' onChange={formik.handleChange} value={formik.values.email} />
					{formik.errors.email ? <div className='error'>{formik.errors.email}</div> : null}
				</div>
				<div className='form-control'>
					<label htmlFor='channel'>Channel</label>
					<input type='text' id='channel' name='channel' onChange={formik.handleChange} value={formik.values.channel} />
					{formik.errors.channel ? <div className='error'>{formik.errors.channel}</div> : null}
				</div>
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
}

export default YoutubeForm;
```

## Error en Campos Visitados

Hasta ahora podemos ver que si bien inicialmente no nos aparece ningun error, ni bien completamos un campo nos mostrará error en todos los otros que aún ni siquiera vistió diciéndonos que son requeridos. Esto no es deseado pues atenta contra la UX.
Debemos saber si un campo fue visitado y sólo ahí mostrar el error asociado al mismo. Esto lo hacemos colocando en los input `onBlur={formik.handleBlur}` y luego accedemos al objeto `formik.touched` (de la misma manera que accedimos a `formik.values` y `formik.errors`). Primero será un objeto vacío y luego tendrá una propiedad con el nombre del input en `true` al visitarlo. Por ejemplo si hacemos click sobre el input de `name` y luego click afuera, `formik.touched = {name: true}`

```jsx
import React from 'react';
import { useFormik } from 'formik';
function YoutubeForm() {
	const initialValues = {
		name: '',
		email: '',
		channel: '',
	};

	const onSubmit = values => {
		console.log('Form Data', values);
	};

	const validate = values => {
		let errors = {};
		if (!values.name) {
			errors.name = 'Requerido';
		}
		if (!values.email) {
			errors.email = 'Requerido';
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
			errors.email = 'Formato inválido';
		}
		if (!values.channel) {
			errors.channel = 'Requerido';
		}

		return errors;
	};

	const formik = useFormik({
		initialValues,
		onSubmit,
		validate,
	});

	// console.log('Visited Fields', formik.touched);

	return (
		<div>
			<form onSubmit={formik.handleSubmit}>
				<div className='form-control'>
					<label htmlFor='name'>Name</label>
					<input type='text' id='name' name='name' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
					{formik.touched.name && formik.errors.name ? <div className='error'>{formik.errors.name}</div> : null}
				</div>
				<div className='form-control'>
					<label htmlFor='email'>Email</label>
					<input
						type='email'
						id='email'
						name='email'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.email}
					/>
					{formik.touched.email && formik.errors.email ? <div className='error'>{formik.errors.email}</div> : null}
				</div>
				<div className='form-control'>
					<label htmlFor='channel'>Channel</label>
					<input
						type='text'
						id='channel'
						name='channel'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.channel}
					/>
					{formik.touched.channel && formik.errors.channel ? <div className='error'>{formik.errors.channel}</div> : null}
				</div>
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
}

export default YoutubeForm;
```
