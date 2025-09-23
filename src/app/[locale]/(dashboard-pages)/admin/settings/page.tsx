import { NotificationSettingsForm } from "./_components/forms/notification";
import { ProfileForm } from "./_components/forms/profile-info";
import { PasswordForm } from "./_components/forms/reset-password";

const Page = () => {
  return (
    <>
      <h4 className="text-mid-grey-III text-[18px] lg:text-[30px]">Settings</h4>
      <section className="grid grid-cols-1 gap-[64px] rounded-[8px] bg-white p-[37px] lg:grid-cols-2">
        <div>
          <ProfileForm />
        </div>
        <div>
          <PasswordForm />
        </div>
        <div>
          <NotificationSettingsForm />
        </div>
      </section>
    </>
  );
};

export default Page;
