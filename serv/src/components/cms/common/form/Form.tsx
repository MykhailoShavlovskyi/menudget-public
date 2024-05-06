import { PropsWithoutRef, ReactNode, useState } from "react"
import { Formik, FormikProps } from "formik"
import { z, ZodError } from "zod"
import styled from "styled-components"
import { spacing, stack } from "../../layout/CmsLayout"

type OnSubmitResult = {
  FORM_ERROR?: string
  [prop: string]: any
}

export type FormProps<S extends z.ZodType<any, any>> = Omit<
  PropsWithoutRef<JSX.IntrinsicElements["form"]>,
  "onSubmit"
> & {
  schema?: S
  initialValues?: FormikProps<z.infer<S>>["initialValues"]
  onSubmit: (values: z.infer<S>) => Promise<void | OnSubmitResult>
  children?: ReactNode
}

// TODO do no base style

const StyledForm = styled.form`
  ${stack};
  overflow-x: hidden;
  overflow-y: auto;

  //padding: 1.875rem 2.125rem; // TODO remove
  gap: ${spacing.s15}rem; // TODO remove

  background: white;
  //box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
  //box-shadow: ${(v) => v.theme.elevation.light}; // TODO
  border-right: 2px solid #d0d0d0;
`

export const FORM_ERROR = "FORM_ERROR"

export function Form<S extends z.ZodType<any, any>>({
  children,
  schema,
  initialValues,
  onSubmit,
  ...props
}: FormProps<S>) {
  const [validationError, setValidationError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const validateForm = (values: any) => {
    try {
      schema?.parse(values)
      setValidationError(null)
    } catch (error) {
      if (error instanceof ZodError) {
        if (error.message) {
          const parsed = JSON.parse(error.message)
          //setValidationError(parsed[0].message)
        } else if (error.formErrors.fieldErrors.error)
          setValidationError(error.formErrors.fieldErrors.error as any as string)
        else setValidationError(null)
        return error.formErrors.fieldErrors
      }
    }
  }

  return (
    <Formik
      initialValues={initialValues || {}}
      validate={validateForm}
      onSubmit={async (values, { setErrors }) => {
        const { FORM_ERROR, ...otherErrors } = (await onSubmit(values)) || {}
        if (FORM_ERROR) setSubmitError(FORM_ERROR)
        if (Object.keys(otherErrors).length > 0) setErrors(otherErrors)
      }}
    >
      {({ handleSubmit, isSubmitting }) => (
        <StyledForm onSubmit={handleSubmit} className="form" {...props}>
          {children}
          {validationError && (
            <div role="alert" style={{ color: "red" }}>
              {validationError}
            </div>
          )}
          {submitError && (
            <div role="alert" style={{ color: "red" }}>
              {submitError}
            </div>
          )}
        </StyledForm>
      )}
    </Formik>
  )
}
