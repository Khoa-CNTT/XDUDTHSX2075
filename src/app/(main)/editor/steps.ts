import GeneralInfoForm from "./forms/GeneralInfoForm";
import PersonalInfoForm from "./forms/PersonalInfoForm";

export const steps: {
    title: string;
    component: React.ComponentType;
    key: string;
}[] = [
    {title: "Thông tin chung", component: GeneralInfoForm, key: "general-info"},
    {title: "Thông tin cá nhân", component: PersonalInfoForm, key: "personal-info"},
]