import Link from "next/link";
import { Button } from "@/components/ui/button";
import { steps } from "./steps";

interface FooterProps {
    currentStep: string;
    setCurrentStep: (step: string) => void;
}

export default function Footer({currentStep, setCurrentStep}: FooterProps) {
    const previousStep = steps.find(
        (_, index) => steps[index + 1]?.key === currentStep
    )?.key;

    const nextStep = steps.find(
        (_, index) => steps[index - 1]?.key === currentStep
    )?.key;

    return <footer className="w-full border-t px-3 py-5">
    <div className="max-w-7xl mx-auto flex flex-wrap justify-between gap-3">
        <div className="flex items-center gap-3">
            <Button variant="secondary" onClick={previousStep ? () => setCurrentStep(previousStep) : undefined} disabled={!previousStep}>Trước</Button>
            <Button onClick={nextStep ? () => setCurrentStep(nextStep): undefined} disabled={!nextStep}>Sau</Button>
        </div>
        <div className="flex items-start gap-3">
            <Button variant="secondary" asChild>
                <Link href="/resumes">Đóng</Link>
            </Button>
            <p className="text-muted-foreground opacity-0">Lưu...</p>
        </div>
    </div>
</footer>
}