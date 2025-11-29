"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from "@/app/[locale]/TranslationsProvider";

const ProfileCard: React.FC = () => {
    const t = useTranslations();

    return (
        <div className="box-custom p-6 max-w-3xl mx-auto my-8 border-3 flex flex-col items-center justify-center gap-4 text-center">
            <Image src="/assets/images/profile.png" alt="Marco Romero" width={120} height={120} className="rounded-full animate-fade-in mx-auto" />
            <h2 className="text-2xl font-semibold">{t.general.name}</h2>
            <h3 className="text-sm px-2 py-1 box-custom !bg-blue-500 !text-white">{t.profile.summary.short}</h3>
            <p className="text-left text-sm mt-4">{t.profile.summary.long}</p>
            <hr className="border-1 w-full my-4" />
            <ul className="flex gap-6 justify-center items-center">
                <li>
                    <Link href="mailto:marco_antonio88_9@hotmail.com" target='_blank' className="block p-1.5 box-custom transition duration-300 hover:!bg-gray-300">
                        <Image src="/assets/images/email.svg" alt="Email" width={28} height={28} />
                    </Link>
                </li>
                <li>
                    <Link href="https://www.linkedin.com/in/marcorm91/" target='_blank' className="block p-1.5 box-custom transition duration-300 hover:!bg-gray-300">
                        <Image src="/assets/images/linkedin.svg" alt="LinkedIn" width={28} height={28} />
                    </Link>
                </li>
                <li>
                    <Link href="https://www.https://github.com/marcorm91/" target='_blank' className="block p-1.5 box-custom transition duration-300 hover:!bg-gray-300">
                        <Image src="/assets/images/github.svg" alt="Github" width={28} height={28} />
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default ProfileCard;