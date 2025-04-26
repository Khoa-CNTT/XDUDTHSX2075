import { EditorFormProps } from "@/lib/types";
import GeneralInfoForm from "./forms/GeneralInfoForm";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import WorkExperienceForm from "./forms/WorkExperienceForm";
import EducationForm from "./forms/EducationForm";

export const steps: {
    title: string;
    component: React.ComponentType<EditorFormProps>;
    key: string;
}[] = [
    {title: "Thông tin chung", component: GeneralInfoForm, key: "general-info"},
    {title: "Thông tin cá nhân", component: PersonalInfoForm, key: "personal-info"},
    {title: "Kinh nghiệm làm việc", component: WorkExperienceForm, key: "work-experience"},
    {title: "Học vấn", component: EducationForm, key: "education"},
]