import { useState, type ChangeEvent, type FormEvent } from 'react';

// Interfaz para las props que se retornan para el input
interface RegisteredFieldProps {
    name: string;
    value?: string | number | readonly string[] | undefined;
    onChange: (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => void;
}

// Interfaz específica para inputs tipo file (sin value)
interface FileInputProps {
    name: string;
    onChange: (
        event: ChangeEvent<HTMLInputElement>
    ) => void;
}

/**
 * Hook personalizado para manejo de formularios controlados.
 * @template T - Tipo de los valores del formulario.
 * @param initialValues - Valores iniciales del formulario.
 * @param onSubmitCallback - Función a ejecutar al enviar el formulario.
 * @returns Métodos y valores para manejar el formulario.
*/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useFormLite<T extends Record<string, any>>(
    initialValues: T,
    onSubmitCallback: (values: T) => void
) {
    const [values, setValues] = useState<T>(initialValues);

    /**
     * Manejador de cambios para inputs, actualiza el estado del formulario.
     * @param event - Evento de cambio de input, textarea o select.
     */
    const handleChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const target = event.target;
        const name = target.name;
        let processedValue: string | number | boolean | Date | null | undefined | File | File[];

        if (target instanceof HTMLInputElement) {
            if (target.type === 'checkbox') {
                if (Array.isArray(values[name])) {
                    // Checkbox múltiple (array)
                    const arr = Array.isArray(values[name]) ? [...values[name]] : [];
                    if (target.checked) {
                        if (!arr.includes(target.value)) arr.push(target.value);
                    } else {
                        const idx = arr.indexOf(target.value);
                        if (idx > -1) arr.splice(idx, 1);
                    }
                    processedValue = arr;
                } else {
                    // Checkbox simple (boolean)
                    processedValue = target.checked;
                }
            } else if (target.type === 'number') {
                processedValue = target.value === '' ? '' : (
                    !isNaN(target.valueAsNumber) ? target.valueAsNumber : target.value
                );
            } else if (target.type === 'date') {
                processedValue = target.value ? new Date(`${target.value}T00:00:00`) : null;
            } else if (target.type === 'file') {
                if (target.multiple) {
                    processedValue = target.files ? Array.from(target.files) : [];
                } else {
                    processedValue = target.files && target.files[0] ? target.files[0] : null;
                }
            } else {
                processedValue = target.value;
            }
        } else {
            processedValue = target.value;
        }

        setValues(prevValues => ({
            ...prevValues,
            [name]: processedValue,
        }));
    };

    /**
     * Manejador para el evento submit del formulario.
     * Ejecuta el callback con los valores actuales.
     * @param event - Evento de envío del formulario.
     */
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmitCallback(values);
    };

    /**
     * Restaura los valores del formulario a su estado inicial.
     */
    const resetForm = () => {
        setValues({ ...initialValues });
    };

    /**
     * Registra un campo normal del formulario (no file).
     * @param fieldName - Nombre del campo a registrar.
     * @returns Props para esparcir en el input correspondiente.
     */
    const register = (fieldName: string): RegisteredFieldProps => {
        let currentValue = values[fieldName] ?? initialValues[fieldName] ?? '';

        if (currentValue === undefined) {
            currentValue = initialValues[fieldName];
        }

        let displayValue: string | number | readonly string[] | undefined;

        if (isValidDate(currentValue)) {
            // Formatea a string YYYY-MM-DD
            const year = currentValue.getFullYear();
            const month = (currentValue.getMonth() + 1).toString().padStart(2, '0');
            const day = currentValue.getDate().toString().padStart(2, '0');
            displayValue = `${year}-${month}-${day}`;
        } else if (currentValue === null || currentValue === undefined) {
            displayValue = '';
        } else {
            displayValue = currentValue;
        }

        return {
            name: fieldName,
            value: displayValue,
            onChange: handleChange,
        };
    };

    /**
     * Registra un campo tipo file (sin value prop).
     * @param fieldName - Nombre del campo a registrar.
     * @returns Props para esparcir en el input correspondiente.
     */
    const registerFile = (fieldName: string): FileInputProps => {
        return {
            name: fieldName,
            onChange: handleChange
        };
    };

    /**
     * Retorna un objeto con los campos vacíos del formulario, con un mensaje por cada campo vacío.
     * @returns Objeto con los nombres de los campos vacíos y un mensaje.
     */
    const getEmptyFields = () => {
        const emptyFields: Record<string, string> = {};
        for (const key in values) {
            if (
                values[key] === '' ||
                values[key] === null ||
                values[key] === undefined ||
                (Array.isArray(values[key]) && values[key].length === 0)
            ) {
                emptyFields[key] = 'Este campo está vacío';
            }
        }
        return emptyFields;
    };

    return {
        values,
        handleSubmit,
        resetForm,
        register,
        registerFile,
        getEmptyFields,
    };
}

/**
 * Verifica si un valor es una instancia válida de Date.
 * @param value - Valor a verificar.
 * @returns True si es una fecha válida, false en caso contrario.
 */
function isValidDate(value: unknown): value is Date {
    return value instanceof Date && !isNaN(value.getTime());
}