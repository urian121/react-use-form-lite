      
# react-use-form-lite

[![npm version](https://img.shields.io/npm/v/react-use-form-lite.svg?style=flat-square)](https://www.npmjs.com/package/react-use-form-lite)
[![GitHub Repo](https://img.shields.io/badge/GitHub-repository-blue?style=flat-square&logo=github)](https://github.com/urian121/react-use-form-lite)
[![npm](https://img.shields.io/npm/dt/react-use-form-lite.svg)](https://www.npmjs.com/package/react-use-form-lite)

**`react-use-form-lite`** es una librería moderna, intuitiva, liviana, escalable y sobre todo flexible para manejar formularios en **React** sin dependencias adicionales.
Permite una implementación rápida y sin complicaciones, con soporte para múltiples tipos de input (`text`,`hidden`, `number`, `email`, `password`, `textarea`, `date`, `time`, `datetime-local`, `month`, `week`, `range`, `color`, `search`, `tel`, `url`, `select`, `radio`, `checkbox` (simple y múltiple), y `file` (simple y múltiple)).

![Vista previa](https://raw.githubusercontent.com/urian121/imagenes-proyectos-github/refs/heads/master/react-use-form-lite.gif)


- Ejemplo de uso con [React Use Form Lite sin TypeScript](https://github.com/urian121/form-with-react-use-form-lite-without-typescript)

- Ejemplo de uso con [React Use Form Lite con TypeScript](https://github.com/urian121/form-with-react-use-form-lite-and-typescript)


## 🚀 Instalación

```bash
$ npm install react-use-form-lite
# o
$ yarn add react-use-form-lite
```  

## 🤔 ¿Para Qué Fue Creado?

**`react-use-form-lite`** fue creado para ofrecer una solución simple, flexible y reutilizable al manejo de formularios en aplicaciones **React**.

El hook **`useFormLite`** simplifica el manejo de formularios permitiendo escribir formularios más limpios y con menos código repetitivo.

## ⚡ ¿Qué Necesidad Resuelve?

- Manejo centralizado de los valores del formulario.
- Inputs conectados automáticamente con value (o **`checked`** para checkboxes/radios) y **`onChange`**.
- Manejo diferenciado y simplificado para inputs de tipo **`file`**, con **`registerFile`**.
- Soporte para inputs de fecha y hora, números, y otros tipos de inputs.
- Gestión de **checkboxes simple** y múltiples que actualizan un array de valores.
- Identificación de campos vacíos con **`getEmptyFields()`**.
- Reseteo fácil del formulario a sus valores iniciales con **`resetForm()`**.


## 📦 API del Hook `useFormLite`

El hook **`useFormLite`** y sus funciones **`register`** y **`registerFile`** conectan automáticamente los campos del formulario con el estado interno, simplificando el manejo de sus valores y eventos.


## ⚙️ Uso básico

```jsx
// 1. Importar el hook
import { useFormLite } from 'react-use-form-lite'; 

// Componente principal
export default function MiFormulario() {

  // 2. Definir los valores iniciales del formulario
  const initialFormValues = {
    nombre: '',
    edad: 0,
    email: '',
    pais: 'Colombia', // Puede tener un valor por defecto
    teGustaReact: true,
    lenguajes: ['HTML'], // Puede tener valores preseleccionados
    aceptaTerminos: 'Sí',
    avatar: null,
    documentos: [],
    fechaNacimiento: null, // Puede tener un valor por defecto
  };

  // 3. Definir la función que se ejecutará al enviar el formulario
  const handleFormSubmit = (formData) => {
    console.log('Datos del formulario enviados:', formData);
    console.log('Campos vacíos:', getEmptyFields());

    // Verificar si se ha seleccionado un archivo
    if (formData.avatar) {
      console.log("Avatar seleccionado:", formData.avatar.name);
    }

    // Verificar si se han cargado documentos
    if (formData.documentos.length > 0) {
      console.log("Documentos cargados:", formData.documentos.map(f => f.name));
    }
  };

  // 4. Usar el hook useFormLite
  const {
    values,         // Estado actual del formulario
    handleSubmit,   // Envoltura para la función de envío
    register,       // Para inputs estándar
    registerFile,   // Específicamente para inputs de tipo 'file'
    resetForm,      // Para limpiar el formulario
    getEmptyFields  // Para obtener campos vacíos
  } = useFormLite(initialFormValues, handleFormSubmit);

  return (
    <form onSubmit={handleSubmit}>
    {/* 5. Usar handleSubmit en el form */}
      <h1>Mi Formulario</h1>

      <div>
        <label htmlFor="nombre">Nombre:</label>
        {/* 6. Usar register para inputs de texto, número, email, etc. */}
        <input type="text" id="nombre" {...register('nombre')} placeholder="Escribe el nombre" />
      </div>

      <div>
        <label htmlFor="edad">Edad:</label>
        <input type="number" id="edad" {...register('edad')} />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" {...register('email')} placeholder="tu@correo.com" />
      </div>
      
      <div>
        <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
        <input type="date" id="fechaNacimiento" {...register('fechaNacimiento')} />
      </div>

      <div>
        <label htmlFor="pais">País:</label>
        <select id="pais" {...register('pais')}>
          <option value="">Seleccione un país</option>
          <option value="Colombia">Colombia</option>
          <option value="México">México</option>
          <option value="Venezuela">Venezuela</option>
        </select>
      </div>

      <div>
        <label>
          <input type="checkbox" {...register('teGustaReact')} /> ¿Te gusta React?
        </label>
      </div>

      <div>
        <p>Lenguajes que conoces:</p>
        <label>
          <input type="checkbox" {...register('lenguajes')} value="HTML" /> HTML
        </label>
        <label>
          <input type="checkbox" {...register('lenguajes')} value="CSS" /> CSS
        </label>
        <label>
          <input type="checkbox" {...register('lenguajes')} value="JavaScript" /> JavaScript
        </label>
      </div>

      <div>
        <p>¿Aceptas los términos?</p>
        <label>
          <input type="radio" {...register('aceptaTerminos')} value="Sí" /> Sí
        </label>
        <label>
          <input type="radio" {...register('aceptaTerminos')} value="No" /> No
        </label>
      </div>

      <div>
        <label htmlFor="avatar">Avatar (un solo archivo):</label>
        {/* 7. Usar registerFile para inputs de tipo 'file' */}
        <input type="file" id="avatar" {...registerFile('avatar')} />
      </div>

      <div>
        <label htmlFor="documentos">Documentos (múltiples archivos):</label>
        <input type="file" id="documentos" multiple {...registerFile('documentos')} />
      </div>

      <div>
        <button type="submit">Enviar</button>
        <button type="button" onClick={resetForm} style={{ marginLeft: '10px' }}>
          Resetear
        </button>
      </div>

      <pre style={{ marginTop: '20px', background: '#f0f0f0', padding: '10px' }}>
        Valores del formulario:
        {JSON.stringify(values, (key, value) => {
          if (value instanceof File) return { name: value.name, size: value.size, type: value.type };
          if (Array.isArray(value) && value.every(item => item instanceof File)) {
            return value.map(file => ({ name: file.name, size: file.size, type: file.type }));
          }
          return value;
        }, 2)}
      </pre>
    </form>
  );
}
```
    
## ✅ Explicación del Ejemplo Anterior:

1. **Importa el hook `useFormLite`**: Desde la librería **`use-form-lite`**.
2. **`initialFormValues`**: Define el estado inicial del formulario, que contiene todos los campos y sus valores iniciales.
3. **`handleFormSubmit`**: Esta es la lógica de envío. Recibe el objeto **`values`** con todos los datos del formulario. Se pasa como segundo argumento a **`useFormLite`**.
4. **Llamada a `useFormLite`**:

    - Pasas **`initialFormValues`** y la función **`handleFormSubmit`**.
    - Destructuras las propiedades y métodos necesarios:
        - **`values`**: El objeto que contiene el estado actual de todos los campos del formulario.

        - **`handleSubmit`**: Una función que debes asignar al evento **`onSubmit`** de la etiqueta **`<form>`**. Previene el comportamiento por defecto del navegador y llama a la función **`handleFormSubmit`** con los **`values`**.

        - **`register`**: Función para conectar inputs estándar (*texto, número, email, select, radio, checkbox*, etc.) al hook. Devuelve props como **`name, value/checked`**, y **`onChange`**.

        - **`registerFile`**: Función específica para inputs de tipo **`file`**. Devuelve props como **`name`** y **`onChange`**. 

        - **`resetForm`**: Función para revertir todos los campos del formulario a sus **`initialFormValues`**.

        - **`getEmptyFields`**: Función que devuelve un objeto listando los campos que están actualmente vacíos (considerando **`''`**, **`null`**, **`undefined`** o arrays vacíos).

5. **`<form onSubmit={handleSubmit}>`**: Esencial para que **`handleSubmit`** maneje el envío.

6. **`{...register('nombreCampo')}`**: Para la mayoría de los inputs, esparces las props devueltas por **`register`**. El **`name`** del input debe coincidir con la clave en **`initialFormValues`**.

    - Para **checkboxes múltiples**, usa el mismo **`name`** en **`register`** y diferentes **`value`** en cada input. **`useFormLite`** manejará el valor como un array.

    - Para input de tipo **`radio`**, usa el mismo **`name`** en **`register`** y diferentes **`value`** en cada input.

7. **`{...registerFile('nombreCampoArchivo')}`**: Para inputs de tipo **`file`**, usa **`registerFile`**.


## ✅ Tipos de Input Soportados

**`useFormLite`** maneja automáticamente diferentes tipos de `input` basados en el atributo `type` del `input`:

- **Inputs estándar (manejados por `register`)**:
    - `text`, `password`, `email`, `number`, `search`, `tel`, `url`
    - `date`, `time`, `datetime-local`, `month`, `week`
    - `range`, `color`
    - `textarea`
    - `select` (single)
    - `checkbox` (simple): Su valor en `values` será `boolean`.
    - `checkbox` (múltiple): Si varios checkboxes comparten el mismo `name`, su valor en `values` será un `string[]` con los `value` de los checkboxes seleccionados.
    - `radio`: Su valor en `values` será el value del radio button seleccionado.

- **Inputs de archivo (manejados por `registerFile`)**:
    - `file` (simple): Su valor en `values` será un objeto `File` o `null`.
    - `file` (múltiple, con el atributo `multiple` en el input): Su valor en `values` será un `File[]`.


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