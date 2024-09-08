import { SectionHeading } from "@/components/shared/SectionHeading"
import { SectionContent } from "@/components/shared/SectionContent"
import { ProfileForm } from "./ProfileForm"

import "react-international-phone/style.css"
import { AddressForm } from "./AddressForm"

export function ProfileSection() {
    return (
        <div className="profile-section ">
            <SectionContent>
                <SectionHeading>PROFILE SETTINGS</SectionHeading>
                <ProfileForm />
            </SectionContent>
            <SectionContent>
                <AddressForm />
            </SectionContent>
        </div>
    )
}
