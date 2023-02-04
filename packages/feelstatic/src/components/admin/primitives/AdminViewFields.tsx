import { FeelstaticField, FeelstaticFieldValue, FeelstaticReference } from '../../../state/field';
import AdminViewDateField from './AdminViewDateField';
import AdminViewImageField from './AdminViewImageField';
import AdminViewNumberField from './AdminViewNumberField';
import AdminViewRepeaterField from './AdminViewRepeaterField';
import AdminViewSelectField from './AdminViewSelectField';
import AdminViewTextField from './AdminViewTextField';

type Props = {
  fields: FeelstaticField;
  onFieldChange: (
    field: string,
    value: FeelstaticFieldValue,
    repeater?: {
      index: number;
      field: string;
    }
  ) => void;
  onAddItem: (field: string) => void;
  onRemoveItem: (field: string, index: number) => void;
  onReorderItem: (field: string, fromIndex: number, toIndex: number) => void;
};

export default function AdminViewFields({ fields, onFieldChange, onAddItem, onRemoveItem, onReorderItem }: Props) {
  const fieldEntries = Object.entries(fields);
  return (
    <>
      {fieldEntries.map(([fieldName, fieldValue], fieldIndex) => {
        if (typeof fieldValue === 'string' && fieldValue.startsWith('/images')) {
          return (
            <AdminViewImageField
              key={`${fieldName}_${fieldIndex}`}
              name={fieldName}
              value={fieldValue}
              onChange={(value) => {
                onFieldChange(fieldName, value);
              }}
            />
          );
        } else if (
          typeof fieldValue === 'string' &&
          /^[0-9]{4}-((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01])|(0[469]|11)-(0[1-9]|[12][0-9]|30)|(02)-(0[1-9]|[12][0-9]))T(0[0-9]|1[0-9]|2[0-3]):(0[0-9]|[1-5][0-9]):(0[0-9]|[1-5][0-9])\.[0-9]{3}Z$/.test(
            fieldValue
          )
        ) {
          return (
            <AdminViewDateField
              key={`${fieldName}_${fieldIndex}`}
              name={fieldName}
              value={fieldValue}
              onChange={(value) => {
                onFieldChange(fieldName, value);
              }}
            />
          );
        } else if (typeof fieldValue === 'string') {
          return (
            <AdminViewTextField
              key={`${fieldName}_${fieldIndex}`}
              name={fieldName}
              value={fieldValue}
              onChange={(value) => {
                onFieldChange(fieldName, value);
              }}
            />
          );
        } else if (typeof fieldValue === 'number') {
          return (
            <AdminViewNumberField
              key={`${fieldName}_${fieldIndex}`}
              name={fieldName}
              value={fieldValue}
              onChange={(value) => {
                onFieldChange(fieldName, value);
              }}
            />
          );
        } else if (typeof fieldValue === 'object' && fieldValue.hasOwnProperty('reference')) {
          return (
            <AdminViewSelectField
              key={`${fieldName}_${fieldIndex}`}
              name={fieldName}
              value={fieldValue as FeelstaticReference}
              onChange={(value) => {
                onFieldChange(fieldName, value);
              }}
            />
          );
        } else if (Array.isArray(fieldValue)) {
          return (
            <AdminViewRepeaterField
              key={`${fieldName}_${fieldIndex}`}
              name={fieldName}
              value={fieldValue}
              onFieldChange={(name, value, repeater) => {
                onFieldChange(name, value, repeater);
              }}
              onAddItem={onAddItem}
              onRemoveItem={onRemoveItem}
              onReorderItem={onReorderItem}
            />
          );
        }

        return <div key={`${fieldName}_${fieldIndex}`}></div>;
      })}
    </>
  );
}
