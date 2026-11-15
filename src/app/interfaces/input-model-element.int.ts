export type InputModel = {
  pristine?: boolean,
  dirty?: boolean,
  pendingEvaluation?: boolean,
  errors?: Record<string, boolean> | null
}

export interface InputModelElement extends HTMLInputElement {
  model?: InputModel
}