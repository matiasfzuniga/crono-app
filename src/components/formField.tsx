import { FormFieldProps,FormFieldLoginProps} from "@/lib/types";
import { Input } from "@/components/ui/input";


export const FormField: React.FC<FormFieldProps> = ({
  type,
  name,
  register,
  error,
  valueAsNumber,
}) => (
  <>
    <Input
    className={`border rounded w-full py-2 px-3 text-gray-700 focus-visible:ring-0 focus-visible:ring-offset-0`}
      type={type}
      {...register(name, { valueAsNumber })}
      autoComplete="off"
    />
    {error && <span className="text-red-500">{error.message}</span>}
  </>
);

export const FormFieldLogin: React.FC<FormFieldLoginProps> = ({
  type,
  name,
  register,
  error,
  valueAsNumber,
}) => (
  <>
    <Input
    className={`border rounded w-full py-2 px-3 text-gray-700 focus-visible:ring-0 focus-visible:ring-offset-0`}
      type={type}
      {...register(name, { valueAsNumber })}
      autoComplete="off"
    />
    {error && <span className="text-red-500">{error.message}</span>}
  </>
);
