import cloneDeep from 'lodash/cloneDeep'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import set from 'lodash/set'
import React from 'react'

export interface useFormProps {
  initialValues?: { [propName: string]: any } | any
  validations?: { [propName: string]: any[] }
  onSubmit?: (values: any, publicApi: any) => void
  onReset?: (publicApi: any) => void
}

function useForm({
  initialValues = {},
  validations = {},
  onSubmit = () => null,
  onReset = () => null,
}: useFormProps) {
  const submittedRef = React.useRef(false)
  const initialValuesRef = React.useRef() //useRef???
  const validationsRef = React.useRef<{ [propName: string]: any[] }>()
  const [submitted, setSubmitted] = React.useState(false)
  const [isDirty, setIsDirty] = React.useState(false)
  const [values, setValues] = React.useState(initialValues)
  const [clearCount, setClearCount] = React.useState(0)
  const [touches, setTouches] = React.useState([])

  React.useEffect(() => {
    initialValuesRef.current = initialValues
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    validationsRef.current = validations
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validations])

  React.useEffect(() => {
    if (isEqual(initialValuesRef.current, initialValues)) {
      return
    }
    setValues((currentValues: any) => {
      const newValues = {
        ...currentValues,
        ...Object.keys(initialValues).reduce(
          (result, key) => ({
            ...result,
            [key]: initialValues[key],
          }),
          {}
        ),
      }
      initialValuesRef.current = newValues
      return newValues
    })
  }, [initialValues])

  const isTouched = (path: any) =>
    touches.find(touch => {
      if (typeof path === 'string') {
        return touch === path
      }
      return path.indexOf(touch) !== -1
    })

  const getInitialValues = () => initialValues

  const isSubmitted = () => submitted

  const getValues = () => values

  const getValue = (path: any, defaultValue = '') =>
    get(values, path, defaultValue)

  const getErrors = (paths?: any) => {
    if (!validationsRef.current) {
      return null
    }
    const errors = Object.keys(validationsRef.current)
      .filter(path => !paths || paths.indexOf(path) !== -1)
      .reduce((result, path) => {
        const error = getError(path)
        return error ? { ...result, [path]: error } : result
      }, {})
    return Object.keys(errors).length > 0 ? errors : null
  }

  const getError = (path: any) => {
    if (!validationsRef.current) {
      return null
    }
    if (!validationsRef.current[path]) {
      return null
    }
    if (!submittedRef.current) {
      return null
    }
    return (
      validationsRef.current[path]
        .map(validation => validation(getValue(path), getPublicAPI()))
        .find(error => error) || null
    )
  }

  const setValue = (path: any, value: any) => {
    const setValue = (path: any, value: any) => {
      const realValue =
        value && value.target && value.target.value !== undefined
          ? value.target.value
          : value
      setValues(set(cloneDeep(values), path, realValue))
      touch(path)
    }
    return value !== undefined
      ? setValue(path, value)
      : (value: any) => setValue(path, value)
  }

  const isValid = (path: any) => {
    return !!getValue(path) && !getError(path)
  }

  const touch = (path: any) => {
    if (!isDirty) {
      setIsDirty(true)
    }
    if (isTouched(path)) {
      return
    }
    setTouches([...touches, path] as never[])
  }

  const untouch = (path: any) => {
    if (!isTouched(path)) {
      return
    }
    setTouches(
      touches.filter(touch => {
        if (typeof path === 'string') {
          return touch !== path
        }
        return path.indexOf(touch) === -1
      })
    )
  }

  const submit = (submitValues = {}) => {
    submittedRef.current = true
    setSubmitted(true)
    if (getErrors()) {
      return
    }
    onSubmit({ ...values, ...submitValues }, getPublicAPI())
  }

  const unsubmit = () => {
    submittedRef.current = false
    setSubmitted(false)
  }

  const reset = () => {
    setValues(initialValues)
    setTouches([])
    unsubmit()
    onReset(getPublicAPI())
    setIsDirty(false)
  }

  const clear = () => {
    setValues((currentValues: any) =>
      Object.keys(currentValues).reduce(
        (result, key) => ({
          ...result,
          [key]: '',
        }),
        {}
      )
    )
    setClearCount(clearCount + 1)
    setTouches([])
    unsubmit()
  }

  const setValidation = (propName: string, validations: any[]) => {
    if (!validationsRef.current) {
      return
    }
    validationsRef.current[propName] = validations
  }

  const getPublicAPI = () => ({
    isTouched,
    isSubmitted,
    getInitialValues,
    getValues,
    getValue,
    getErrors,
    getError,
    setValue,
    setValues,
    touch,
    untouch,
    submit,
    unsubmit,
    reset,
    clear,
    clearCount,
    isValid,
    isDirty,
    setValidation,
  })

  return getPublicAPI()
}
export default useForm
