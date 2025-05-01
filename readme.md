# react-use-form-lite


[![npm version](https://img.shields.io/npm/v/react-use-form-lite.svg?style=flat-square)](https://www.npmjs.com/package/react-use-form-lite)
[![GitHub Repo](https://img.shields.io/badge/GitHub-repository-blue?style=flat-square&logo=github)](https://github.com/urian121/react-use-form-lite)
[![npm](https://img.shields.io/npm/dt/react-use-form-lite.svg)](https://www.npmjs.com/package/react-use-form-lite)


🎯 Un Custom Hook simple, liviano y flexible para manejar formularios en React de forma rápida y sin dependencias adicionales, ademas soporte para inputs, selects, radios, checkboxes, archivos y muchos más.


![Vista previa](https://raw.githubusercontent.com/urian121/imagenes-proyectos-github/refs/heads/master/react-use-form-lite.gif)

👉 [Ver Código en GitHub](https://github.com/urian121/react-use-form-lite)

## 🚀 Instalación

```bash
$ npm install react-use-form-lite

$ yarn add nextjs-toast-notify
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

## ⚙️ Uso básico

```tsx
import { useForm } from 'react-use-form-lite';

function App() {

  // Definir un objeto con los campos del formulario
  const camposForm = {
    nombre: '',
    edad: '',
    email: '',
    range: '',
    pais: '',
    fecha_actual: '',
    aceptaTerminos: '',
    teGustaReact: '',
    fotoPerfil: null,
  }

  // Inicializa el hook con todos los campos del formulario
  const { formData, register, resetForm, getEmptyFields } = useForm({camposForm});

  const handleSubmitForm = () => {
    
    // Muestra todos los datos del formulario en consola
    console.log(`Datos del formulario:, ${formData}`);

    // Muestra todos los campos vacíos
    console.log(`Campos vacíos:, ${getEmptyFields()}`);

    // verificar si el archivo fue cargado
    if (formData.fotoPerfil) {
      console.log(`Archivo ${formData.fotoPerfil.name}`);
    }

    /**
     * Para inputs con `multiple`, como:
     * <input type="file" {...register('multipleDocumentos', { type: 'file' })} multiple />
     * asegúrate de declarar `multipleDocumentos` en `camposForm`.
     * Puedes recorrer los archivos con:
     * formData.multipleDocumentos.forEach((file) => console.log(`Archivos cargados: ${file.name}`));
    */
    
};

  return (
    <>
        <h1>Campos del formulario</h1>

          {/* Text */}
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input type='text' {...register('nombre')} />
          </div>

          {/* Number */}
          <div className="form-group">
            <label htmlFor="Edad">Edad</label>
            <input type='number' {...register('edad')} />
          </div>

        {/* Email */}
          <div className="form-group">
            <label htmlFor="Email">Email</label>
            <input type="email" {...register('email')} />
          </div>

          {/* Range */}
          <div className="form-group">
            <label htmlFor="range">Rango</label>
            <input type="range" {...register('range')} />
          </div>

          {/* Select */}
          <div className="form-group">
            <label>País</label>
            <select name="pais" {...register('pais', { type: 'select' })}>
              <option value="">Seleccione un país</option>
              <option value="Colombia">Colombia</option>
              <option value="México">México</option>
              <option value="Venezuela">Venezuela</option>
            </select>
          </div>

          {/* Date */}
          <div className="form-group">
            <label htmlFor="fecha">Fecha actual</label>
            <input type="date" {...register('fecha_actual')} />
          </div>

        {/* Radios */}
          <div className="form-group">
            <label>¿Aceptar términos?</label>
            <div className="radio-group">
              <label><input type="radio" {...register('aceptaTerminos', { type: 'radio', value: 'si' })} /> Sí</label>
              <label><input type="radio" {...register('aceptaTerminos', { type: 'radio', value: 'no' })} /> No</label>
            </div>
          </div>

          {/* Checkbox */}
          <div className="form-group">
            <label>¿Te gusta React?</label>
            <label><input type="checkbox" {...register('teGustaReact', { type: 'checkbox' })} /> Sí</label>
          </div>

          {/* Archivo */}
          <div className="form-group">
            <label>Foto de perfil</label>
            <input type="file" {...register('fotoPerfil', { type: 'file' })} />
          </div>

          {/* Botones de acción */}
          <button type="submit" onClick={handleSubmitForm}>Enviar formulario</button>
          <button type="button" onClick={resetForm}>Limpiar formulario</button>
        </div>
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