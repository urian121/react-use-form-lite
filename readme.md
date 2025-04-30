# react-use-form-lite


[![npm version](https://img.shields.io/npm/v/react-use-form-lite.svg?style=flat-square)](https://www.npmjs.com/package/react-use-form-lite)
[![GitHub Repo](https://img.shields.io/badge/GitHub-repository-blue?style=flat-square&logo=github)](https://github.com/urian121/react-use-form-lite)
[![npm](https://img.shields.io/npm/dt/react-use-form-lite.svg)](https://www.npmjs.com/package/react-use-form-lite)


🎯 Un Custom Hook simple, liviano y flexible para manejar formularios en React de forma rápida y sin dependencias adicionales, ademas soporte para inputs, selects, radios, checkboxes, archivos y muchos más.


## 🚀 Instalación

```bash
npm install react-use-form-lite
```

## 📌 ¿Para Qué Fue Creado?

`react-use-form-lite` fue creado para ofrecer una solución simple y reutilizable al manejo de formularios en aplicaciones React. El hook abstrae la lógica común de inputs, selects y checkboxes, permitiendo escribir formularios más limpios y con menos código repetido.

## ⚡ ¿Qué Necesidad Resuelve?

- Manejo centralizado de valores del formulario
- Inputs conectados automáticamente con `value`, `onChange`, `checked`
- Validación de campos vacíos con `getEmptyFields()`
- Reseteo inmediato con `resetForm()`
- Soporte para inputs tipo: `text`, `checkbox`, `radio`, `select`, `file`


## ✅ Ventajas

- ✅ Sin dependencias externas.
- ✅ Compatible con React 18+.
- ✅ Ligero y optimizado para librerías.
- ✅ Registro automático de `input`, `select` y `checkbox`.
- ✅ Soporte para TypeScript con tipos incluidos.


## 🚀 Instalación

```bash
npm install react-use-form-lite
```

## ⚙️ Uso básico

```tsx
import { useForm } from 'react-use-form-lite';

function App() {
  // Inicializa el hook con todos los campos del formulario
  const { formData, register, resetForm, getEmptyFields } = useForm({
    nombre: '',
    edad: '',
    email: '',
    telefono: '',
    direccion: '',
    password: '',
    salario: '',
    url: '',
    buscar: '',
    fechaNacimiento: '',
    fechaHora: '',
    hora: '',
    semana: '',
    mes: '',
    rango: '',
    color: '',
    radio: '',
    pais: '',
    fotoPerfil: null,       // Para un solo archivo
    archivoMultiple: null,  // Para múltiples archivos
    aceptaTerminos: false
  });

  const handleSubmitForm = () => {
    // Muestra todos los datos del formulario en consola
    console.log(formData);

    // Identifica y muestra campos vacíos
    const emptyFields = getEmptyFields();
    console.log(emptyFields);

    // Accede al archivo único si fue cargado
    if (formData.fotoPerfil) {
      console.log('Archivo perfil:', formData.fotoPerfil.name);
    }

    // Recorre múltiples archivos si se subieron
    if (Array.isArray(formData.documentosSoporte)) {
      formData.documentosSoporte.forEach((file: File) =>
        console.log('Documento soporte:', file.name)
      );
    }
  };

  return (
    <>
      <h1>Formulario de Registro</h1>

      {/* Campos de texto */}
      <input type="text" placeholder="Nombre" {...register('nombre')} />
      <input type="text" placeholder="Edad" {...register('edad')} />
      <input type="text" placeholder="Direccion" {...register('direccion')} />
      <input type="password" placeholder="Contraseña" {...register('password')} />
      <input type="email" placeholder="Email" {...register('email')} />
      <input type="number" placeholder="Salario" {...register('salario')} />
      <input type="tel" placeholder="Telefono" {...register('telefono')} />
      <input type="url" placeholder="URL" {...register('url')} />
      <input type="search" placeholder="Buscar" {...register('buscar')} />
      <input type="date" placeholder="Fecha de nacimiento" {...register('fechaNacimiento')} />
      <input type="datetime-local" placeholder="Fecha y hora" {...register('fechaHora')} />
      <input type="time" placeholder="Hora" {...register('hora')} />
      <input type="week" placeholder="Semana" {...register('semana')} />
      <input type="month" placeholder="Mes" {...register('mes')} />
      <input type="range" placeholder="Rango" {...register('rango')} />
      <input type="color" placeholder="Color" {...register('color')} />

      {/* Radios con diferentes opciones */}
      <input type="radio" {...register('respuesta', { type: 'radio', value: 'si' })} />
      <input type="radio" {...register('respuesta', { type: 'radio', value: 'no' })} />
      <input type="radio" {...register('respuesta', { type: 'radio', value: 'tal vez' })} />
      <input type="radio" {...register('respuesta', { type: 'radio', value: 'no se' })} />

      {/* Select de país */}
      <select {...register('pais', { type: 'select' })}>
        <option value="">Seleccione un país</option>
        <option value="co">Colombia</option>
        <option value="mx">México</option>
      </select>

      {/* Checkbox */}
      <label>
        <input type="checkbox" {...register('aceptaTerminos', { type: 'checkbox' })} />
        Acepto los términos
      </label>

      {/* Archivos */}
      <input type="file" {...register('fotoPerfil', { type: 'file' })} />
      <input type="file" {...register('archivoMultiple', { type: 'file' })} multiple />

      {/* Botones de acción */}
      <button type="submit" onClick={handleSubmitForm}>Enviar</button>
      <button type="button" onClick={resetForm}>Resetear</button>
      <button type="button" onClick={() => console.log(getEmptyFields())}>Validar</button>
    </>
  )
}

export default App;

```
## ✅ Este ejemplo:

- Usa el `hook` `useForm` completo.

- Valida y muestra campos vacíos.

- Muestra los datos capturados con `formData`.


## 📦 API del Hook

| Hook                      | Descripción                                             |
| ------------------------- | ------------------------------------------------------- |
| `formData`                | Valores actuales del formulario                         |
| `register(name, options)` | Conecta inputs con control automático (`type` opcional) |
| `resetForm()`             | Reinicia el estado inicial                              |
| `getEmptyFields()`        | Retorna campos vacíos con mensajes personalizados       |


## ✅ Tipos soportados por `register`

- `text` (por defecto)
- `select`
- `checkbox`
- `radio`
- `file` (incluye `multiple`)


## 🤝 Únete y Contribuye

Si encuentras algún problema o tienes una idea para mejorar el paquete, por favor abre un issue o envía un pull request
en [GitHub](https://github.com/urian121/react-use-form-lite)

## 👨‍💻 Aut

**Urian Viera**  
🌐 [urianviera.com](https://www.urianviera.com)  
📺 [YouTube](https://www.youtube.com/WebDeveloperUrianViera)  
💌 [urian1213viera@gmail.com](mailto:urian1213viera@gmail.com)  
☕ [¡Apóyame en PayPal!](https://www.paypal.com/donate/?hosted_button_id=4SV78MQJJH3VE)

## Copyright

© 2025 Urian Viera. Todos los derechos reservados.

## 🛡 License

Licensed under [MIT](LICENSE)

[![GitHub Repo](https://img.shields.io/badge/GitHub-urian121/react--use--form--lite-000?logo=github&style=flat-square)](https://github.com/urian121/react-use-form-lite)


## Agradecimientos

¡Gracias a todos los **Devs** 👨‍💻 que han utilizado y contribuido al desarrollo de **react-use-form-lite**! Su apoyo y retroalimentación son fundamentales para mejorar continuamente este paquete.