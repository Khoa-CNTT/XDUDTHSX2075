import { EditorFormProps } from "@/lib/types";
import GeneralInfoForm from "./forms/GeneralInfoForm";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import WorkExperienceForm from "./forms/WorkExperienceForm";
import EducationForm from "./forms/EducationForm";
import SkillsForm from "./forms/SkillsForm";
import SummaryForm from "./forms/SummaryForm";

export const steps: {
    title: string;
    component: React.ComponentType<EditorFormProps>;
    key: string;
}[] = [
    {title: "Thông tin chung", component: GeneralInfoForm, key: "general-info"},
    {title: "Thông tin cá nhân", component: PersonalInfoForm, key: "personal-info"},
    {title: "Kinh nghiệm làm việc", component: WorkExperienceForm, key: "work-experience"},
    {title: "Học vấn", component: EducationForm, key: "education"},
    {title: "Kỹ năng", component: SkillsForm, key: "skills"},
    {title: "Tóm tắt chuyên môn", component: SummaryForm, key: "summary"}
]