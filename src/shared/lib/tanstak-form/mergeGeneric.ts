import { FormApi, FormValidateOrFn } from '@tanstack/react-form';

export type MergeFormApi<
  TFormData,
  TOnMount extends FormValidateOrFn<TFormData> | undefined = any,
  TOnChange extends FormValidateOrFn<TFormData> | undefined = any,
  TOnChangeAsync extends FormValidateOrFn<TFormData> | undefined = any,
  TOnBlur extends FormValidateOrFn<TFormData> | undefined = any,
  TOnBlurAsync extends FormValidateOrFn<TFormData> | undefined = any,
  TOnSubmit extends FormValidateOrFn<TFormData> | undefined = any,
  TOnSubmitAsync extends FormValidateOrFn<TFormData> | undefined = any,
  TOnServer extends FormValidateOrFn<TFormData> | undefined = any,
  TSubmitMeta extends FormValidateOrFn<TFormData> | undefined = any
> = FormApi<
  TFormData,
  TOnMount,
  TOnChange,
  TOnChangeAsync,
  TOnBlur,
  TOnBlurAsync,
  TOnSubmit,
  TOnSubmitAsync,
  TOnServer,
  TSubmitMeta
>;
