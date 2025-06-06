import { Button, Row } from "antd";
import { useForm, type FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser, type TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const { register, handleSubmit } = useForm({
  //   defaultValues: {
  //     id: "A-0001",
  //     password: "admin123",
  //   },
  // });

  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading("Logging in...");
    try {
      const userInfo = {
        id: data?.id,
        password: data?.password,
      };
      const res = await login(userInfo).unwrap();
      console.log({ res });
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Logged in", { id: toastId, duration: 2000 });
      navigate(`/${user?.role}/dashboard`);
    } catch (err) {
      toast.error(`Something went worng! ${err}`, {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh"}}>
      <PHForm onSubmit={onSubmit}>
        <PHInput type="text" name="id" label="Id" />

        <PHInput type="text" name="password" label="Password" />

        <Button htmlType="submit">Login</Button>
      </PHForm>
    </Row>
  );
};

export default Login;
