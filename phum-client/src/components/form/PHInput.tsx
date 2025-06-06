import { Input } from "antd";
import { Controller } from "react-hook-form";

const PHInput = ({ type, name, label }) => {
  return (
    <div style={{marginBottom: '20px'}}>
      {label ? <label htmlFor={label}>{label}: </label> : null}

      <Controller
        name={name}
        render={({ field }) => <Input {...field} type={type} id={name} />}
      />
    </div>
  );
};

export default PHInput;

/* 
<Input type={type} id={name} {...register(name)} /> 
//  const { register } = useFormContext();
*/
