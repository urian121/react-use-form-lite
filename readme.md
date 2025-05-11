# react-use-form-lite

[![npm version](https://img.shields.io/npm/v/react-use-form-lite.svg?style=flat-square)](https://www.npmjs.com/package/react-use-form-lite)
[![GitHub Repo](https://img.shields.io/badge/GitHub-repository-blue?style=flat-square&logo=github)](https://github.com/urian121/react-use-form-lite)
[![npm](https://img.shields.io/npm/dt/react-use-form-lite.svg)](https://www.npmjs.com/package/react-use-form-lite)


Es una librería moderna, intuitiva, liviana, escalable y sobre todo flexible para manejar formularios en **React** sin dependencias adicionales.
Permite una implementación rápida y sin complicaciones, con soporte para múltiples tipos de input (`text`, `number`, `email`, `textarea`, `date`, `range`, `select`, `radio`, `checkbox`, `file`) ¡y mucho más!

![Vista previa](https://raw.githubusercontent.com/urian121/imagenes-proyectos-github/refs/heads/master/react-use-form-lite.gif)

👉 [Ver Código en GitHub](https://github.com/urian121/app-with-react-use-form-lite)

## 🚀 Instalación

```bash
$ npm install react-use-form-lite
or
$ yarn add react-use-form-lite
```

> 💡 **Nota importante sobre `register`:**  
> El hook `register` conecta automáticamente los campos del formulario con el estado interno, simplificando el manejo de sus valores y eventos.
>
> - Para inputs como `text`, `number`, `email`, `date` o `range`, **no es necesario definir el tipo**, ya que se infiere automáticamente.
> - Para inputs como `select`, `radio`, `checkbox` y `file`, **es obligatorio especificar el tipo** usando la opción `{ type: '...' }` en `register`, para que el hook pueda manejar correctamente sus valores.
>
> **Ejemplo:**
>
> ```jsx
> // No requiere 'type'
> <input type="text" {...register('nombre')} />
>
> // Requiere 'type'
> <select {...register('pais', { type: 'select' })}>...</select>
> <input type="radio" {...register('acepta', { type: 'radio', value: 'sí' })} />
> <input type="checkbox" {...register('suscrito', { type: 'checkbox' })} />
> <input type="file" {...register('archivo', { type: 'file' })} />
> ```

## 🤔 ¿Para Qué Fue Creado?

**`react-use-form-lite`** fue creado para ofrecer una solución simple, flexible y reutilizable al manejo de formularios en aplicaciones **React**.
El hook abstrae la lógica común de *inputs, selects, checkboxes, etc*, permitiendo escribir formularios más limpios y con menos código repetido.

## ⚡ ¿Qué Necesidad Resuelve?

- Manejo centralizado de valores del formulario
- Inputs conectados automáticamente con `value`, `onChange`, `checked`,
- Validación de campos vacíos con `getEmptyFields()`
- Reseteo del formulario con `resetForm()`
- Soporte para inputs tipo: `text`, `checkbox`, `radio`, `select`, `file` y muchos más.


## ✅ Ventajas

- ✅ Sin dependencias externas.
- ✅ Ligero, rapido y optimizado para librerías.
- ✅ Validación de campos vacíos.
- ✅ Reseteo del formulario.

## ⚙️ Uso básico

```tsx
// Importar la librería luego de instalarla
import { useFormLite } from 'react-use-form-lite';

// Componente principal
export default function App() {

  // Definir un objeto con los campos del formulario y sus valores iniciales
  const camposForm = {
    nombre: '',
    edad: '',
    email: '',
    range: '25',
    pais: '',
    fecha_actual: '',
    aceptaTerminos: true,
    teGustaReact: false,
    fotoPerfil: null,
  }

  // Usa el hook useFormLite para manejar el estado y eventos del formulario de manera centralizada
  const { formData, register, resetForm, getEmptyFields } = useFormLite(camposForm);

  // Función para manejar el envío del formulario
  const handleSubmitForm = () => {
    
    // Muestra todos los datos del formulario en consola
    console.log(`Datos del formulario: ${formData}`);

    // Muestra todos los campos vacíos
    console.log(`Campos vacíos: ${JSON.stringify(getEmptyFields())}`);
    //console.log(getEmptyFields())

    // verificar si el archivo fue cargado
    if (formData.fotoPerfil) {
      console.log(`Archivo ${formData.fotoPerfil.name}`);
    }

    /**
     * Para inputs de tipo `file` con el atributo `multiple`:
     * <input type="file" {...register('multipleDocumentos', { type: 'file' })} multiple />
     * Asegúrate de declarar `multipleDocumentos` en `camposForm`.
     * Puedes recorrer los archivos con:
     * formData.multipleDocumentos.forEach((file) => console.log(`Archivos cargados: ${file.name}`));
    */
    
};

  return (
    <>
        <h1>Campos del formulario</h1>

          {/* Input tipo Text */}
          <input type='text' {...register('nombre')} placeholder='Escribe tu nombre' />

          {/* Input tipo Number */}
          <input type='number' {...register('edad')}  placeholder='Escribe tu edad' />

          {/* Input tipo Email */}
          <input type="email" {...register('email')} placeholder='Escribe tu email' />

          {/* Input tipo Range */}
          <input type="range" {...register('range')} />

          {/* Input tipo Select */}
          <select {...register('pais', { type: 'select' })}>
            <option value="">Seleccione un país</option>
            <option value="Colombia">Colombia</option>
            <option value="México">México</option>
            <option value="Venezuela">Venezuela</option>
          </select>

          {/* Input tipo Date */}
          <input type="date" {...register('fecha_actual')} placeholder='Seleccione una fecha' />

          {/* Input tipo Radio */}
          <label><input type="radio" {...register('aceptaTerminos', { type: 'radio', value: 'Sí' })} /> Sí</label>
          <label><input type="radio" {...register('aceptaTerminos', { type: 'radio', value: 'No' })} /> No</label>

          {/* Input tipo Checkbox */}
          <label><input type="checkbox" {...register('teGustaReact', { type: 'checkbox' })} /> Sí</label>

          {/* Input tipo file */}
          <input type="file" {...register('fotoPerfil', { type: 'file' })} />

          {/* Botones de acción */}
          <button onClick={handleSubmitForm}>Enviar formulario</button>
          <button onClick={resetForm}>Limpiar formulario</button>
    </>
  )
}

```
### ✅ Ejemplo anterior

- Define un formulario con campos de diferentes tipos y atributos.
- Usa el hook `useFormLite` para manejar el estado y eventos del formulario de manera centralizada.
- Usa el hook `register` para conectar inputs con control automático (`type` opcional).
- Usa `getEmptyFields()` para obtener campos vacíos.
- Usa `resetForm()` para reiniciar el estado inicial del formulario.
- Usa `handleSubmitForm()` para enviar el formulario.
- Valida y muestra campos vacíos.
- Muestra los datos capturados con `formData`.

## 📦 API del Hook `react-use-form-lite`

| Hook                      | Descripción                                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------|
| `formData`                | Objeto donde cada clave es el nombre de un campo del formulario, y su valor es el dato ingresado por el usuario.
| `register(name, options)` | Función para conectar inputs con control automático (`type` opcional)                                             |
| `resetForm()`             | Función para reiniciar el estado inicial del formulario                                                           |
| `getEmptyFields()`        | Función que retorna un objeto con campos vacíos  del formulario                                                   |


## ✅ Tipos soportados por `register`

- `text` (por defecto)
- `number`
- `email`
- `range`
- `date`
- `select`
- `checkbox`
- `radio`
- `file` (incluye `multiple`)

> 💡 **Nota importante:**  
> Puedes capturar múltiples checkboxes usando el mismo nombre de campo (`lenguajes`). Esto es útil para obtener un **array con los valores seleccionados**.
>
> **Ejemplo:**
> ```jsx
> <input type="checkbox" value="HTML" {...register('lenguajes', { type: 'checkbox' })} />
> <input type="checkbox" value="CSS" {...register('lenguajes', { type: 'checkbox' })} />
> <input type="checkbox" value="JavaScript" {...register('lenguajes', { type: 'checkbox' })} />
> ```
> ✅ Resultado si el usuario selecciona HTML y CSS:  
> `formData.lenguajes = ['HTML', 'CSS']`

## 🤝 Únete y Contribuye

Si encuentras algún problema o tienes una idea para mejorar el paquete, por favor abre un issue o envía un pull request
en [GitHub](https://github.com/urian121/react-use-form-lite)

## 👨‍💻 Desarrollador

**Urian Viera**  
🌐 [urianviera.com](https://www.urianviera.com)  
📺 [YouTube](https://www.youtube.com/WebDeveloperUrianViera)  
💌 [urian1213viera@gmail.com](mailto:urian1213viera@gmail.com)  
☕ [¡Apóyame en PayPal!](https://www.paypal.com/donate/?hosted_button_id=4SV78MQJJH3VE)

## Copyright

© 2025 Urian Viera. Todos los derechos reservados.

## 🛡 License

Distribuido bajo la licencia [MIT](LICENSE)

[![GitHub Repo](https://img.shields.io/badge/GitHub-urian121/react--use--form--lite-000?logo=github&style=flat-square)](https://github.com/urian121/react-use-form-lite)


## 🙌 Agradecimientos

¡Gracias a todos los **Devs** 👨‍💻 que han utilizado y contribuido al desarrollo de **react-use-form-lite**! Su apoyo y retroalimentación son fundamentales para mejorar continuamente este paquete.