import type { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import PHForm from "../../../components/form/PHForm";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import type { TResponse } from "../../../types/global";
import { facultyOptions } from "../../../constants/faculty";
import { academicFacultySchemma } from "../../../schemas/academicManagement.schema";
import type { TAcademicFaculty } from "../../../types/academicManagement.type";
import { semesterOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";

console.log({ semesterOptions, monthOptions, facultyOptions });

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Loading...");
    //const name = semesterOptions[Number(data?.name) - 1]?.label;

    const facultyData = {
      name: data?.name,
    };

    try {
      console.log(facultyData);
      const res = (await addAcademicFaculty(
        facultyData
      )) as TResponse<TAcademicFaculty>;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success("Faculty created!", { id: toastId });
      }
    } catch (err) {
      toast.error(`Something went wrong! ${err}`, { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          //resolver={zodResolver(academicFacultySchemma)}
          resolver={zodResolver(academicFacultySchemma)}
        >
          <PHSelect label="Faculty" name="name" options={facultyOptions} />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
