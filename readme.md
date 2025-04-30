# react-use-form-lite


[![npm version](https://img.shields.io/npm/v/react-use-form-lite.svg?style=flat-square)](https://www.npmjs.com/package/react-use-form-lite)
[![GitHub Repo](https://img.shields.io/badge/GitHub-repository-blue?style=flat-square&logo=github)](https://github.com/urian121/react-use-form-lite)
[![npm](https://img.shields.io/npm/dt/react-use-form-lite.svg)](https://www.npmjs.com/package/react-use-form-lite)


🎯 Un Custom Hook simple, liviano y flexible para manejar formularios en React de forma rápida y sin dependencias adicionales.

## 📌 ¿Para Qué Fue Creado?

`react-use-form-lite` fue creado para ofrecer una solución simple y reutilizable al manejo de formularios en aplicaciones React. El hook abstrae la lógica común de inputs, selects y checkboxes, permitiendo escribir formularios más limpios y con menos código repetido.


## ❓ ¿Qué Necesidad Resuelve?

- El manejo de estado centralizado para múltiples campos de formulario.
- La actualización dinámica de campos sin escribir múltiples `useState`.
- La validación rápida de campos vacíos.
- La asociación directa entre campos y sus props (`value`, `onChange`, etc.)


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

function MiFormulario() {
  const { formData, register, onChange, resetForm, getEmptyFields } = useForm({
    nombre: '',
    pais: '',
    aceptaTerminos: false
  });

  return (
    <form>
      <input type="text" placeholder="Nombre" {...register('nombre')} />
      
      <select {...register('pais', { type: 'select' })}>
        <option value="">Seleccione un país</option>
        <option value="co">Colombia</option>
        <option value="mx">México</option>
      </select>

      <label>
        <input type="checkbox" {...register('aceptaTerminos', { type: 'checkbox' })} />
        Acepto los términos
      </label>

      <button type="button" onClick={() => console.log(getEmptyFields())}>Validar</button>
      <button type="button" onClick={resetForm}>Resetear</button>
    </form>
  );
}
```

## 📦 API del Hook

| Función            | Descripción                                                |
| ------------------ | ---------------------------------------------------------- |
| `formData`         | Objeto con los valores actuales del formulario.            |
| `onChange`         | Función para actualizar un campo manualmente.              |
| `resetForm()`      | Restaura el estado inicial del formulario.                 |
| `register()`       | Devuelve props para conectar inputs, selects y checkboxes. |
| `getEmptyFields()` | Devuelve los campos vacíos con un mensaje personalizado.   |

## ✅ Tipos soportados por `register`

- `text` (por defecto)
- `select`
- `checkbox`


## 🤝 Únete y Contribuye

Si encuentras algún problema o tienes una idea para mejorar el paquete, por favor abre un issue o envía un pull request
en GitHub.

## Desarrollado por

- [Urian Viera](https://github.com/urian123)
- [Portafolio](https://www.urianviera.com)
- [Canal de Youtube](https://www.youtube.com/WebDeveloperUrianViera)
- [¡Donar a través de PayPal!](https://www.paypal.com/donate/?hosted_button_id=4SV78MQJJH3VE)
- [Email](mailto:urian1213viera@gmail.com)

## Copyright

© 2025 Urian Viera. Todos los derechos reservados.

## 🛡 License

Licensed under [MIT](LICENSE)

[![GitHub Repo](https://img.shields.io/badge/GitHub-urian121/react--use--form--lite-000?logo=github&style=flat-square)](https://github.com/urian121/react-use-form-lite)


## Agradecimientos

¡Gracias a todos los **Devs** 👨‍💻 que han utilizado y contribuido al desarrollo de **react-use-form-lite**! Su apoyo y retroalimentación son fundamentales para mejorar continuamente este paquete.