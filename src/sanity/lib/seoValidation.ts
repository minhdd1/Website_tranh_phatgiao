type LocalizedSeoValue = {
  vi?: string;
  en?: string;
};

function lengthWarning(value: LocalizedSeoValue | undefined, min: number, max: number, label: string) {
  const fields = [
    ['VI', value?.vi],
    ['EN', value?.en],
  ] as const;

  const warnings = fields
    .filter(([, text]) => text && (text.length < min || text.length > max))
    .map(([locale, text]) => `${locale}: ${text?.length || 0}`);

  return warnings.length ? `${label} should be ${min}-${max} characters (${warnings.join(', ')}).` : true;
}

export function seoTitleValidation(value: LocalizedSeoValue | undefined) {
  return lengthWarning(value, 35, 60, 'Meta title');
}

export function seoDescriptionValidation(value: LocalizedSeoValue | undefined) {
  return lengthWarning(value, 120, 160, 'Meta description');
}
